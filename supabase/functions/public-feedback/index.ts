import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

Deno.serve(async (req) => {
  try {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');

    // Handle GET /public-feedback/user/{userId} - Get public business info
    if (req.method === 'GET' && pathParts[2] === 'user' && pathParts[3]) {
      const userId = pathParts[3];
      
      const { data: user, error } = await supabase
        .from('users')
        .select('business_name, google_review_link, logo_url, custom_color')
        .eq('user_id', userId)
        .maybeSingle();

      if (error || !user) {
        return new Response(JSON.stringify({ error: 'User not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({
        businessName: user.business_name,
        googleReviewLink: user.google_review_link,
        logoUrl: user.logo_url,
        customColor: user.custom_color
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Handle POST /public-feedback - Submit feedback
    if (req.method === 'POST') {
      const body = await req.json();
      const { 
        userId, 
        email, 
        firstName, 
        phone, 
        rating, 
        comment, 
        consent, 
        source = 'qr' 
      } = body;

      // Validate required fields
      if (!userId || !rating || rating < 1 || rating > 5) {
        return new Response(JSON.stringify({ error: 'Invalid data' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Insert feedback
      const { data: feedback, error: feedbackError } = await supabase
        .from('feedbacks')
        .insert({
          user_id: userId,
          email: email || null,
          first_name: firstName || null,
          phone: phone || null,
          rating: parseInt(rating),
          comment: comment || null,
          consent: !!consent,
          source: source,
          device_info: {
            userAgent: req.headers.get('user-agent'),
            timestamp: new Date().toISOString()
          }
        })
        .select()
        .single();

      if (feedbackError) {
        console.error('Error inserting feedback:', feedbackError);
        return new Response(JSON.stringify({ error: 'Failed to save feedback' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Schedule SMS if phone provided and consent given
      if (phone && consent && (source === 'qr' || source === 'wifi')) {
        // Get user's SMS settings
        const { data: user } = await supabase
          .from('users')
          .select('business_name, sms_message, sms_enabled, sms_delay_hours')
          .eq('user_id', userId)
          .maybeSingle();

        if (user && user.sms_enabled) {
          const scheduledAt = new Date();
          scheduledAt.setHours(scheduledAt.getHours() + (user.sms_delay_hours || 72));

          await supabase
            .from('sms_queue')
            .insert({
              user_id: userId,
              feedback_id: feedback.id,
              phone: phone,
              message: user.sms_message || 'Merci pour votre visite ! Votre avis nous intéresse.',
              business_name: user.business_name || 'Business',
              scheduled_at: scheduledAt.toISOString()
            });
        }
      }

      // Update user stats
      const { data: currentUser } = await supabase
        .from('users')
        .select('stats')
        .eq('user_id', userId)
        .maybeSingle();

      if (currentUser) {
        const stats = currentUser.stats || { totalScans: 0, totalReviews: 0, avgRating: 0, smsSent: 0 };
        
        // Calculate new average rating
        const { data: allFeedbacks } = await supabase
          .from('feedbacks')
          .select('rating')
          .eq('user_id', userId);

        if (allFeedbacks && allFeedbacks.length > 0) {
          const totalRating = allFeedbacks.reduce((sum, f) => sum + f.rating, 0);
          const newAvgRating = totalRating / allFeedbacks.length;

          await supabase
            .from('users')
            .update({
              stats: {
                ...stats,
                totalReviews: allFeedbacks.length,
                avgRating: Math.round(newAvgRating * 10) / 10
              }
            })
            .eq('user_id', userId);
        }
      }

      return new Response(JSON.stringify({ success: true, id: feedback.id }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Error in public-feedback function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});