import React from 'react';
import { QrCode, MessageSquare, Shield, Video, Mail, TrendingUp } from 'lucide-react';

const WhySystemWorks = () => {
  const features = [
    {
      icon: QrCode,
      title: "Smart QR Code System",
      description: "Generate custom QR codes that work with our Smart QR Code system to collect reviews from your existing customers.",
      badge: null
    },
    {
      icon: MessageSquare,
      title: "Automated SMS Follow-ups",
      description: "Our proprietary system sends text messages after each service to collect reviews and prevent negative feedback.",
      badge: null
    },
    {
      icon: Shield,
      title: "Backup & Loyalty Program",
      description: "Comprehensive backup solutions and loyalty programs to keep your customers engaged and coming back.",
      badge: "Soon"
    },
    {
      icon: Video,
      title: "Video Testimonials",
      description: "Collect video testimonials that showcase your business and build trust with potential customers.",
      badge: null
    },
    {
      icon: Mail,
      title: "All-in-Email Capture",
      description: "Capture customer emails and phone numbers for follow-up marketing and review requests automatically.",
      badge: null
    },
    {
      icon: TrendingUp,
      title: "Local Influence Boost",
      description: "Boost your local search rankings and online presence with our proven review generation system.",
      badge: "Soon"
    }
  ];

  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Our System Works</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We've cracked the code on local business growth. Here's exactly how we turn every 
            customer interaction into a powerful marketing opportunity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-colors relative">
              {feature.badge && (
                <div className="absolute top-4 right-4">
                  <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {feature.badge}
                  </span>
                </div>
              )}
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
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

export default WhySystemWorks;