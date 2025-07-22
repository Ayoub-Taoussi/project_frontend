import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { getProductByPriceId } from '../../stripe-config';

const SuccessPage: React.FC = () => {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Wait a moment for webhook to process
          setTimeout(async () => {
            const { data: subData } = await supabase
              .from('stripe_user_subscriptions')
              .select('*')
              .maybeSingle();
            
            setSubscription(subData);
            setLoading(false);
          }, 2000);
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  const currentProduct = subscription?.price_id ? getProductByPriceId(subscription.price_id) : null;

  const handleGoToDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">Payment Successful!</h1>
        
        {loading ? (
          <div className="mb-6">
            <div className="animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-slate-700 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            {currentProduct ? (
              <div>
                <p className="text-gray-300 mb-2">
                  Welcome to the <span className="font-semibold text-blue-400">{currentProduct.name}</span> plan!
                </p>
                <p className="text-gray-400 text-sm">
                  Your subscription is now active and ready to use.
                </p>
              </div>
            ) : (
              <p className="text-gray-300">
                Your payment has been processed successfully.
              </p>
            )}
          </div>
        )}

        <div className="bg-slate-700 rounded-lg p-4 mb-6">
          <h3 className="text-white font-semibold mb-3">What's next?</h3>
          <ul className="text-gray-300 text-sm space-y-2 text-left">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              Set up your business profile
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              Generate your QR codes
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              Configure SMS automation
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              Start collecting reviews
            </li>
          </ul>
        </div>

        <button
          onClick={handleGoToDashboard}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
        >
          Go to Dashboard
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;