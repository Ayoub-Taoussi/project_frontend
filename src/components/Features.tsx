import React from 'react';
import { MessageSquare, Users, Target, BarChart, Zap, Settings } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "SMS Loyalty",
      description: "Automated SMS campaigns that turn one-time customers into loyal repeat buyers with personalized messaging.",
      badge: "Popular",
      badgeColor: "bg-orange-500 text-white"
    },
    {
      icon: Users,
      title: "Higher Testimonial Conversion",
      description: "Convert more customers into brand advocates with our proven testimonial collection system.",
      badge: "New",
      badgeColor: "bg-green-500 text-white"
    },
    {
      icon: Target,
      title: "All-in-1 Capture Leads",
      description: "Capture leads from multiple sources and convert them into paying customers automatically.",
      badge: "Pro",
      badgeColor: "bg-purple-500 text-white"
    },
    {
      icon: BarChart,
      title: "Review Booster",
      description: "Boost your online reputation with automated review requests and management tools.",
      badge: "Essential",
      badgeColor: "bg-blue-500 text-white"
    },
    {
      icon: Zap,
      title: "Auto Pilot Hyperlocal",
      description: "Dominate local search results with our automated hyperlocal SEO and review system.",
      badge: "Advanced",
      badgeColor: "bg-yellow-500 text-black"
    },
    {
      icon: Settings,
      title: "White-Label Solution",
      description: "Complete white-label platform for agencies and enterprise businesses.",
      badge: "Soon",
      badgeColor: "bg-gray-500 text-white"
    }
  ];

  return (
    <section id="features" className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything you need to dominate local search
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${feature.badgeColor}`}>
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;