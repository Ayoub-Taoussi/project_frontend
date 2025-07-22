import React, { useState, useEffect } from 'react';
import { Check, Star, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { products, Product } from '../../stripe-config';
import { User } from '@supabase/supabase-js';

const PricingPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleSelectPlan = async (product: Product) => {
    if (!user) {
      window.location.href = '/auth';
      return;
    }

    setLoading(product.priceId);
    setError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        window.location.href = '/auth';
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: product.priceId,
          mode: product.mode,
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/pricing`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(null);
    }
  };

  const getFeatures = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'starter':
        return [
          'Up to 100 SMS/month',
          'Basic review management',
          'Email support',
          'Real-time dashboard',
          'Basic analytics'
        ];
      case 'boost':
        return [
          'Everything in Starter',
          'Up to 500 SMS/month',
          'Advanced review automation',
          'Customer & rep automation',
          'Priority support',
          'Brand customization',
          'Advanced analytics'
        ];
      case 'pro':
        return [
          'Everything in Boost',
          'Up to 1000 SMS/month',
          'Advanced analytics & reports',
          'Multi-location support',
          'API access',
          'Custom integrations'
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Choose your plan</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Start with what you need today, scale as you grow
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => {
            const isPopular = product.name.toLowerCase() === 'boost';
            const features = getFeatures(product.name);
            
            return (
              <div key={product.id} className={`relative bg-slate-800 rounded-2xl p-8 border ${
                isPopular ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-700'
              } hover:border-blue-500 transition-all duration-300`}>
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-white">${product.price}</span>
                    <span className="text-gray-400 ml-1">/{product.interval}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{product.description}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handleSelectPlan(product)}
                  disabled={loading === product.priceId}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                    isPopular 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'border border-gray-600 text-white hover:bg-slate-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === product.priceId ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Get Started'
                  )}
                </button>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            30-day money-back guarantee • Cancel anytime • No setup fees
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;