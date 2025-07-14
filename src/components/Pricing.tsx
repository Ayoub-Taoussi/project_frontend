import React from 'react';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$79",
      period: "/month",
      description: "Perfect for small businesses just getting started",
      features: [
        "Up to 100 SMS messages/mo",
        "Basic review management",
        "Email support",
        "Live chat dashboard",
        "Basic analytics"
      ],
      buttonText: "Get Started",
      buttonStyle: "border border-gray-600 text-white hover:bg-slate-800"
    },
    {
      name: "Boost",
      price: "$119",
      period: "/month",
      description: "Most popular plan for growing businesses",
      features: [
        "Everything in Starter",
        "Up to 500 SMS messages/mo",
        "Advanced review automation",
        "Customer & Rep automation",
        "Priority support",
        "Custom branding",
        "Advanced analytics"
      ],
      buttonText: "Get Started",
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
      popular: true
    },
    {
      name: "Pro",
      price: "$159",
      period: "/month",
      description: "For established businesses that need more power",
      features: [
        "Everything in Boost",
        "Up to 1000 SMS messages/mo",
        "Advanced analytics and reporting",
        "Multiple location support",
        "API access",
        "Custom integrations"
      ],
      buttonText: "Get Started",
      buttonStyle: "border border-gray-600 text-white hover:bg-slate-800"
    }
  ];

  return (
    <section id="pricing" className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Start with what you need today, upgrade as you grow
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`relative bg-slate-800 rounded-2xl p-8 border ${
              plan.popular ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-700'
            } hover:border-blue-500 transition-all duration-300`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-300 text-sm">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
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