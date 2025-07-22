import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          name: string;
          business_name: string | null;
          logo_url: string | null;
          custom_color: string;
          google_review_link: string | null;
          qr_url: string | null;
          qr_link: string | null;
          plan: 'starter' | 'boost' | 'pro';
          stripe_customer_id: string | null;
          sms_message: string;
          sms_enabled: boolean;
          sms_delay_hours: number;
          sms_schedule: any;
          stats: any;
          created_at: string;
          updated_at: string;
          last_login: string | null;
        };
        Insert: {
          user_id: string;
          email: string;
          name: string;
          business_name?: string | null;
          logo_url?: string | null;
          custom_color?: string;
          google_review_link?: string | null;
          qr_url?: string | null;
          qr_link?: string | null;
          plan?: 'starter' | 'boost' | 'pro';
          stripe_customer_id?: string | null;
          sms_message?: string;
          sms_enabled?: boolean;
          sms_delay_hours?: number;
          sms_schedule?: any;
          stats?: any;
          last_login?: string | null;
        };
        Update: {
          email?: string;
          name?: string;
          business_name?: string | null;
          logo_url?: string | null;
          custom_color?: string;
          google_review_link?: string | null;
          qr_url?: string | null;
          qr_link?: string | null;
          plan?: 'starter' | 'boost' | 'pro';
          stripe_customer_id?: string | null;
          sms_message?: string;
          sms_enabled?: boolean;
          sms_delay_hours?: number;
          sms_schedule?: any;
          stats?: any;
          last_login?: string | null;
        };
      };
      feedbacks: {
        Row: {
          id: string;
          user_id: string;
          email: string | null;
          first_name: string | null;
          phone: string | null;
          consent: boolean;
          rating: number;
          comment: string | null;
          source: 'qr' | 'sms' | 'wifi' | 'manual';
          device_info: any | null;
          processed: boolean;
          published_to_google: boolean;
          sms_sent: boolean;
          sms_scheduled_at: string | null;
          sentiment: 'positive' | 'neutral' | 'negative' | null;
          keywords: string[] | null;
          created_at: string;
          processed_at: string | null;
        };
        Insert: {
          user_id: string;
          email?: string | null;
          first_name?: string | null;
          phone?: string | null;
          consent?: boolean;
          rating: number;
          comment?: string | null;
          source?: 'qr' | 'sms' | 'wifi' | 'manual';
          device_info?: any | null;
          processed?: boolean;
          published_to_google?: boolean;
          sms_sent?: boolean;
          sms_scheduled_at?: string | null;
          sentiment?: 'positive' | 'neutral' | 'negative' | null;
          keywords?: string[] | null;
          processed_at?: string | null;
        };
        Update: {
          email?: string | null;
          first_name?: string | null;
          phone?: string | null;
          consent?: boolean;
          rating?: number;
          comment?: string | null;
          source?: 'qr' | 'sms' | 'wifi' | 'manual';
          device_info?: any | null;
          processed?: boolean;
          published_to_google?: boolean;
          sms_sent?: boolean;
          sms_scheduled_at?: string | null;
          sentiment?: 'positive' | 'neutral' | 'negative' | null;
          keywords?: string[] | null;
          processed_at?: string | null;
        };
      };
      sms_queue: {
        Row: {
          id: string;
          user_id: string;
          feedback_id: string | null;
          phone: string;
          message: string;
          business_name: string;
          scheduled_at: string;
          status: 'pending' | 'sent' | 'failed' | 'cancelled';
          attempts: number;
          max_attempts: number;
          sent_at: string | null;
          provider_id: string | null;
          error_message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          feedback_id?: string | null;
          phone: string;
          message: string;
          business_name: string;
          scheduled_at: string;
          status?: 'pending' | 'sent' | 'failed' | 'cancelled';
          attempts?: number;
          max_attempts?: number;
          sent_at?: string | null;
          provider_id?: string | null;
          error_message?: string | null;
        };
        Update: {
          phone?: string;
          message?: string;
          business_name?: string;
          scheduled_at?: string;
          status?: 'pending' | 'sent' | 'failed' | 'cancelled';
          attempts?: number;
          max_attempts?: number;
          sent_at?: string | null;
          provider_id?: string | null;
          error_message?: string | null;
        };
      };
      analytics_daily: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          scans: number;
          feedbacks: number;
          avg_rating: number;
          rating_distribution: any;
          sources: any;
          sms_sent: number;
          sms_delivered: number;
          sms_failed: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          date: string;
          scans?: number;
          feedbacks?: number;
          avg_rating?: number;
          rating_distribution?: any;
          sources?: any;
          sms_sent?: number;
          sms_delivered?: number;
          sms_failed?: number;
        };
        Update: {
          scans?: number;
          feedbacks?: number;
          avg_rating?: number;
          rating_distribution?: any;
          sources?: any;
          sms_sent?: number;
          sms_delivered?: number;
          sms_failed?: number;
        };
      };
      stripe_customers: {
        Row: {
          id: number;
          user_id: string;
          customer_id: string;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          user_id: string;
          customer_id: string;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          user_id?: string;
          customer_id?: string;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
      };
      stripe_subscriptions: {
        Row: {
          id: number;
          customer_id: string;
          subscription_id: string | null;
          price_id: string | null;
          current_period_start: number | null;
          current_period_end: number | null;
          cancel_at_period_end: boolean;
          payment_method_brand: string | null;
          payment_method_last4: string | null;
          status: 'not_started' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused';
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          customer_id: string;
          subscription_id?: string | null;
          price_id?: string | null;
          current_period_start?: number | null;
          current_period_end?: number | null;
          cancel_at_period_end?: boolean;
          payment_method_brand?: string | null;
          payment_method_last4?: string | null;
          status: 'not_started' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused';
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          customer_id?: string;
          subscription_id?: string | null;
          price_id?: string | null;
          current_period_start?: number | null;
          current_period_end?: number | null;
          cancel_at_period_end?: boolean;
          payment_method_brand?: string | null;
          payment_method_last4?: string | null;
          status?: 'not_started' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused';
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
      };
      stripe_orders: {
        Row: {
          id: number;
          checkout_session_id: string;
          payment_intent_id: string;
          customer_id: string;
          amount_subtotal: number;
          amount_total: number;
          currency: string;
          payment_status: string;
          status: 'pending' | 'completed' | 'canceled';
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          checkout_session_id: string;
          payment_intent_id: string;
          customer_id: string;
          amount_subtotal: number;
          amount_total: number;
          currency: string;
          payment_status: string;
          status?: 'pending' | 'completed' | 'canceled';
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          checkout_session_id?: string;
          payment_intent_id?: string;
          customer_id?: string;
          amount_subtotal?: number;
          amount_total?: number;
          currency?: string;
          payment_status?: string;
          status?: 'pending' | 'completed' | 'canceled';
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
      };
    };
    Views: {
      stripe_user_subscriptions: {
        Row: {
          customer_id: string;
          subscription_id: string | null;
          subscription_status: 'not_started' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused';
          price_id: string | null;
          current_period_start: number | null;
          current_period_end: number | null;
          cancel_at_period_end: boolean;
          payment_method_brand: string | null;
          payment_method_last4: string | null;
        };
      };
      stripe_user_orders: {
        Row: {
          customer_id: string;
          order_id: number;
          checkout_session_id: string;
          payment_intent_id: string;
          amount_subtotal: number;
          amount_total: number;
          currency: string;
          payment_status: string;
          order_status: 'pending' | 'completed' | 'canceled';
          order_date: string;
        };
      };
    };
  };
};