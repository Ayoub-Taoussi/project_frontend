import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'ReviewBoost Integration',
    version: '1.0.0',
  },
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, stripe-signature',
};

Deno.serve(async (req) => {
  try {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    // Get the signature from the header
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return new Response('No signature found', { status: 400, headers: corsHeaders });
    }

    // Get the raw body
    const body = await req.text();

    // Verify the webhook signature
    let event: Stripe.Event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, stripeWebhookSecret);
    } catch (error: any) {
      console.error(`Webhook signature verification failed: ${error.message}`);
      return new Response(`Webhook signature verification failed: ${error.message}`, { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    console.log(`Processing webhook event: ${event.type}`);

    // Process the event
    EdgeRuntime.waitUntil(handleEvent(event));

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

async function handleEvent(event: Stripe.Event) {
  const stripeData = event?.data?.object ?? {};

  if (!stripeData || !('customer' in stripeData)) {
    console.log('No customer data in event, skipping');
    return;
  }

  const { customer: customerId } = stripeData;

  if (!customerId || typeof customerId !== 'string') {
    console.error(`No customer received on event: ${JSON.stringify(event)}`);
    return;
  }

  // Handle checkout.session.completed for new subscriptions
  if (event.type === 'checkout.session.completed') {
    const session = stripeData as Stripe.Checkout.Session;
    await handleCheckoutCompleted(session, customerId);
  }

  // Handle subscription events
  if (event.type.startsWith('customer.subscription.')) {
    await syncCustomerFromStripe(customerId);
  }

  // Handle payment events
  if (event.type === 'payment_intent.succeeded' && event.data.object.invoice === null) {
    // One-time payment
    const paymentIntent = stripeData as Stripe.PaymentIntent;
    await handleOneTimePayment(paymentIntent, customerId);
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session, customerId: string) {
  try {
    console.log(`Processing checkout completion for customer: ${customerId}`);

    // Get customer details from Stripe
    const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
    const email = customer.email;
    const name = customer.name || 'ReviewBoost User';

    if (!email) {
      console.error('No email found for customer');
      return;
    }

    // Determine the plan based on the price ID
    let plan: 'starter' | 'boost' | 'pro' = 'starter';
    if (session.line_items?.data?.[0]?.price?.id) {
      const priceId = session.line_items.data[0].price.id;
      if (priceId === 'price_1RdBhb08DTKTigBID2XBJCPH') plan = 'boost';
      if (priceId === 'price_1RdBiD08DTKTigBIynIPIVMP') plan = 'pro';
    }

    // Create or get Supabase user
    let supabaseUser;
    try {
      // Try to get existing user
      const { data: existingUser } = await supabase.auth.admin.getUserByEmail(email);
      supabaseUser = existingUser.user;
    } catch {
      // Create new user if doesn't exist
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true, // Skip email confirmation
        user_metadata: { name }
      });

      if (createError) {
        console.error('Error creating Supabase user:', createError);
        return;
      }
      supabaseUser = newUser.user;
    }

    if (!supabaseUser) {
      console.error('Failed to create or retrieve Supabase user');
      return;
    }

    // Generate QR code link
    const qrLink = `${Deno.env.get('SUPABASE_URL')}/f/${supabaseUser.id}`;

    // Create or update user profile
    const { error: upsertError } = await supabase
      .from('users')
      .upsert({
        user_id: supabaseUser.id,
        email,
        name,
        plan,
        stripe_customer_id: customerId,
        qr_link: qrLink,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      });

    if (upsertError) {
      console.error('Error upserting user profile:', upsertError);
      return;
    }

    console.log(`Successfully processed checkout for user: ${supabaseUser.id}, plan: ${plan}`);

    // Sync subscription data
    await syncCustomerFromStripe(customerId);

  } catch (error) {
    console.error('Error handling checkout completion:', error);
  }
}

async function handleOneTimePayment(paymentIntent: Stripe.PaymentIntent, customerId: string) {
  try {
    // Handle one-time payments if needed
    console.log(`Processing one-time payment for customer: ${customerId}`);
    
    // You can add logic here for one-time purchases
    // For now, we'll just sync the customer data
    await syncCustomerFromStripe(customerId);
  } catch (error) {
    console.error('Error handling one-time payment:', error);
  }
}

async function syncCustomerFromStripe(customerId: string) {
  try {
    console.log(`Syncing customer data from Stripe: ${customerId}`);

    // Fetch latest subscription data from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    if (subscriptions.data.length === 0) {
      console.log(`No subscriptions found for customer: ${customerId}`);
      
      // Update subscription status to not_started
      const { error: noSubError } = await supabase.from('stripe_subscriptions').upsert(
        {
          customer_id: customerId,
          status: 'not_started',
        },
        {
          onConflict: 'customer_id',
        },
      );

      if (noSubError) {
        console.error('Error updating subscription status:', noSubError);
      }
      return;
    }

    // Get the most recent subscription
    const subscription = subscriptions.data[0];

    // Update subscription data in Supabase
    const { error: subError } = await supabase.from('stripe_subscriptions').upsert(
      {
        customer_id: customerId,
        subscription_id: subscription.id,
        price_id: subscription.items.data[0].price.id,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        ...(subscription.default_payment_method && typeof subscription.default_payment_method !== 'string'
          ? {
              payment_method_brand: subscription.default_payment_method.card?.brand ?? null,
              payment_method_last4: subscription.default_payment_method.card?.last4 ?? null,
            }
          : {}),
        status: subscription.status as any,
      },
      {
        onConflict: 'customer_id',
      },
    );

    if (subError) {
      console.error('Error syncing subscription:', subError);
      return;
    }

    // Update user plan based on subscription
    const priceId = subscription.items.data[0].price.id;
    let plan: 'starter' | 'boost' | 'pro' = 'starter';
    if (priceId === 'price_1RdBhb08DTKTigBID2XBJCPH') plan = 'boost';
    if (priceId === 'price_1RdBiD08DTKTigBIynIPIVMP') plan = 'pro';

    // Update user plan in users table
    const { error: userError } = await supabase
      .from('users')
      .update({ plan })
      .eq('stripe_customer_id', customerId);

    if (userError) {
      console.error('Error updating user plan:', userError);
    }

    console.log(`Successfully synced subscription for customer: ${customerId}`);
  } catch (error) {
    console.error(`Failed to sync subscription for customer ${customerId}:`, error);
  }
}