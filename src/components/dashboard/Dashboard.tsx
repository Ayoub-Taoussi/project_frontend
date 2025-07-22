import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { getProductByPriceId } from '../../stripe-config';
import { User } from '@supabase/supabase-js';
import { Zap, LogOut, CreditCard, Star, Users, TrendingUp, MessageSquare } from 'lucide-react';

interface UserSubscription {
  customer_id: string;
  subscription_id: string | null;
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

interface UserProfile {
  id: string;
  business_name: string | null;
  plan: 'starter' | 'boost' | 'pro';
  stats: {
    totalScans: number;
    totalReviews: number;
    avgRating: number;
    smsSent: number;
  };
}

interface RecentActivity {
  id: string;
  type: 'review' | 'sms' | 'scan';
  message: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Fetch user profile
        const { data: profileData } = await supabase
          .from('users')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
        
        setProfile(profileData);

        // Fetch subscription data
        const { data: subData } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .maybeSingle();
        
        setSubscription(subData);

        // Fetch recent activity (recent feedbacks)
        const { data: feedbackData } = await supabase
          .from('feedbacks')
          .select('id, rating, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (feedbackData) {
          const activities: RecentActivity[] = feedbackData.map(feedback => ({
            id: feedback.id,
            type: 'review' as const,
            message: `New ${feedback.rating}-star review received`,
            created_at: feedback.created_at
          }));
          setRecentActivity(activities);
        }
      }
      setLoading(false);
    };

    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const handleUpgrade = () => {
    window.location.href = '/pricing';
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    window.location.href = '/auth';
    return null;
  }

  const currentProduct = subscription?.price_id ? getProductByPriceId(subscription.price_id) : null;
  const stats = profile?.stats || { totalScans: 0, totalReviews: 0, avgRating: 0, smsSent: 0 };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-white font-bold text-lg">ReviewBoost</span>
              {profile?.business_name && (
                <span className="text-gray-400 text-sm">- {profile.business_name}</span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-gray-300 text-sm">
                Welcome, {user.email}
              </div>
              {(currentProduct || profile?.plan) && (
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentProduct?.name || profile?.plan} Plan
                </div>
              )}
              <button
                onClick={handleSignOut}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subscription Status */}
        <div className="mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Subscription Status</h2>
                {(subscription?.subscription_status === 'active' || profile?.plan) && (currentProduct || profile?.plan) ? (
                  <div>
                    <p className="text-gray-300">
                      You're on the <span className="font-semibold text-blue-400">{currentProduct?.name || profile?.plan}</span> plan
                    </p>
                    {subscription.current_period_end && (
                      <p className="text-gray-400 text-sm mt-1">
                        Next billing: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-300">No active subscription</p>
                    <p className="text-gray-400 text-sm">Upgrade to unlock all features</p>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-3">
                {(subscription?.subscription_status === 'active' || profile?.plan) ? (
                  <div className="flex items-center text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Active
                  </div>
                ) : (
                  <button
                    onClick={handleUpgrade}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Upgrade</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Reviews</p>
                <p className="text-2xl font-bold text-white">{stats.totalReviews}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">QR Code Scans</p>
                <p className="text-2xl font-bold text-white">{stats.totalScans}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Average Rating</p>
                <p className="text-2xl font-bold text-white">{stats.avgRating.toFixed(1)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">SMS Sent</p>
                <p className="text-2xl font-bold text-white">{stats.smsSent}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className={`flex items-center justify-between py-3 ${
                  index < recentActivity.length - 1 ? 'border-b border-slate-700' : ''
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'review' ? 'bg-green-400' :
                      activity.type === 'sms' ? 'bg-blue-400' : 'bg-purple-400'
                    }`}></div>
                    <span className="text-gray-300">{activity.message}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{formatTimeAgo(activity.created_at)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No recent activity</p>
              <p className="text-gray-500 text-sm mt-1">Start collecting reviews to see activity here</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;