/*
  # ReviewBoost Database Schema Migration from Firebase to Supabase

  1. New Tables
    - `users`: User profiles and business information
      - Stores business details, QR codes, SMS settings, and statistics
      - Links to Supabase auth.users via user_id
    
    - `feedbacks`: Customer feedback and reviews
      - Stores ratings, comments, and metadata
      - Links to users table for business association
    
    - `sms_queue`: SMS sending queue management
      - Handles delayed SMS sending with retry logic
      - Tracks delivery status and attempts
    
    - `analytics_daily`: Daily aggregated analytics
      - Pre-computed metrics for dashboard performance
      - Organized by user and date for efficient querying

  2. Security
    - Enable RLS on all tables
    - Users can only access their own data
    - Public read access for business info (QR code pages)
    - Secure SMS queue access (backend only)

  3. Indexes
    - Optimized for common query patterns
    - Composite indexes for efficient filtering and sorting
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Custom types
CREATE TYPE plan_type AS ENUM ('starter', 'boost', 'pro');
CREATE TYPE feedback_source AS ENUM ('qr', 'sms', 'wifi', 'manual');
CREATE TYPE sms_status AS ENUM ('pending', 'sent', 'failed', 'cancelled');
CREATE TYPE sentiment_type AS ENUM ('positive', 'neutral', 'negative');

-- Users table (business profiles)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  
  -- Basic info
  email text NOT NULL,
  name text NOT NULL,
  
  -- Business information
  business_name text,
  logo_url text,
  custom_color text DEFAULT '#3b82f6',
  
  -- Google Reviews integration
  google_review_link text,
  
  -- QR Code data
  qr_url text, -- Base64 or storage URL
  qr_link text, -- Public link to feedback form
  
  -- Subscription info
  plan plan_type DEFAULT 'starter',
  stripe_customer_id text,
  
  -- SMS configuration
  sms_message text DEFAULT 'Merci pour votre visite ! Votre avis nous intéresse beaucoup.',
  sms_enabled boolean DEFAULT true,
  sms_delay_hours integer DEFAULT 72,
  sms_schedule jsonb DEFAULT '{"days": ["monday", "tuesday", "wednesday", "thursday", "friday"], "timeStart": "09:00", "timeEnd": "18:00"}',
  
  -- Statistics (updated periodically)
  stats jsonb DEFAULT '{"totalScans": 0, "totalReviews": 0, "avgRating": 0, "smsSent": 0}',
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Feedbacks table
CREATE TABLE IF NOT EXISTS feedbacks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
  
  -- Customer data
  email text,
  first_name text,
  phone text,
  consent boolean DEFAULT false,
  
  -- Feedback content
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  
  -- Collection metadata
  source feedback_source NOT NULL DEFAULT 'qr',
  device_info jsonb,
  
  -- Processing status
  processed boolean DEFAULT false,
  published_to_google boolean DEFAULT false,
  sms_sent boolean DEFAULT false,
  sms_scheduled_at timestamptz,
  
  -- Sentiment analysis (future)
  sentiment sentiment_type,
  keywords text[],
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  processed_at timestamptz
);

-- SMS Queue table
CREATE TABLE IF NOT EXISTS sms_queue (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
  feedback_id uuid REFERENCES feedbacks(id) ON DELETE CASCADE,
  
  -- SMS details
  phone text NOT NULL,
  message text NOT NULL,
  business_name text NOT NULL,
  
  -- Scheduling
  scheduled_at timestamptz NOT NULL,
  status sms_status DEFAULT 'pending',
  attempts integer DEFAULT 0,
  max_attempts integer DEFAULT 3,
  
  -- Delivery tracking
  sent_at timestamptz,
  provider_id text,
  error_message text,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Daily Analytics table
CREATE TABLE IF NOT EXISTS analytics_daily (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  
  -- Main metrics
  scans integer DEFAULT 0,
  feedbacks integer DEFAULT 0,
  avg_rating numeric(3,2) DEFAULT 0,
  
  -- Rating distribution
  rating_distribution jsonb DEFAULT '{"1": 0, "2": 0, "3": 0, "4": 0, "5": 0}',
  
  -- Traffic sources
  sources jsonb DEFAULT '{"qr": 0, "sms": 0, "wifi": 0, "manual": 0}',
  
  -- SMS metrics
  sms_sent integer DEFAULT 0,
  sms_delivered integer DEFAULT 0,
  sms_failed integer DEFAULT 0,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id, date)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_daily ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Public read access for business info (for QR code pages)
CREATE POLICY "Public can read business info"
  ON users
  FOR SELECT
  TO anon
  USING (true);

-- RLS Policies for feedbacks table
CREATE POLICY "Users can view their own feedbacks"
  ON feedbacks
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own feedbacks"
  ON feedbacks
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Allow anonymous feedback creation (for QR codes)
CREATE POLICY "Anyone can create feedback"
  ON feedbacks
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- RLS Policies for sms_queue table (backend access only)
CREATE POLICY "Service role can manage SMS queue"
  ON sms_queue
  FOR ALL
  TO service_role
  USING (true);

-- RLS Policies for analytics_daily table
CREATE POLICY "Users can view their own analytics"
  ON analytics_daily
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Service role can manage analytics"
  ON analytics_daily
  FOR ALL
  TO service_role
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_user_id ON users(user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_plan ON users(plan);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

CREATE INDEX IF NOT EXISTS idx_feedbacks_user_id ON feedbacks(user_id);
CREATE INDEX IF NOT EXISTS idx_feedbacks_rating ON feedbacks(rating);
CREATE INDEX IF NOT EXISTS idx_feedbacks_source ON feedbacks(source);
CREATE INDEX IF NOT EXISTS idx_feedbacks_created_at ON feedbacks(created_at);
CREATE INDEX IF NOT EXISTS idx_feedbacks_user_created ON feedbacks(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_sms_queue_user_id ON sms_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_sms_queue_status ON sms_queue(status);
CREATE INDEX IF NOT EXISTS idx_sms_queue_scheduled_at ON sms_queue(scheduled_at);

CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics_daily(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics_daily(date);
CREATE INDEX IF NOT EXISTS idx_analytics_user_date ON analytics_daily(user_id, date DESC);

-- Functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sms_queue_updated_at
  BEFORE UPDATE ON sms_queue
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analytics_updated_at
  BEFORE UPDATE ON analytics_daily
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();