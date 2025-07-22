import React from 'react';
import { Check, Star } from 'lucide-react';
import { products } from '../stripe-config';

const Pricing = () => {
  const handlePlanSelection = (priceId: string) => {
    window.location.href = `/pricing`;
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
    <section className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Choisissez votre plan</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Commencez avec ce dont vous avez besoin aujourd'hui, évoluez au fur et à mesure
          </p>
        </div>
        
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
                onClick={() => handlePlanSelection(product.priceId)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  isPopular 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'border border-gray-600 text-white hover:bg-slate-800'
                }`}
              >
                Get Started
              </button>
            </div>
          )})}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            30-day money-back guarantee • Cancel anytime • No setup fees
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
