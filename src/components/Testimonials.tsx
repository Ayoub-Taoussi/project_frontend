import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Wilson",
      business: "Wilson's Bakery",
      rating: 5,
      text: "ReviewBoost transformed our business! We went from 12 reviews to over 200 in just 3 months. Our revenue increased by 40%.",
      avatar: "SW"
    },
    {
      name: "Mike Rodriguez",
      business: "Rodriguez Auto Repair",
      rating: 5,
      text: "The SMS system is incredible. Customers love how easy it is to leave reviews, and we've seen a huge boost in our Google ranking.",
      avatar: "MR"
    },
    {
      name: "Dr. Lisa Chen",
      business: "Chen Family Dental",
      rating: 5,
      text: "As a dental practice, getting reviews was always challenging. ReviewBoost made it effortless and our online reputation has never been better.",
      avatar: "LC"
    },
    {
      name: "David Rodriguez",
      business: "Elite Fitness Gym",
      rating: 5,
      text: "The automated follow-up system is genius. We're getting 5x more reviews than before, and they're all positive thanks to the smart filtering.",
      avatar: "DR"
    }
  ];

  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Loved by Local Businesses</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how ReviewBoost is helping businesses like yours dominate local search.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-400 text-sm">{testimonial.business}</p>
                </div>
              </div>
              
              <div className="flex text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="text-4xl font-bold text-white mb-2">10,000+</div>
            <div className="text-gray-400">Active Businesses</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">2.5M+</div>
            <div className="text-gray-400">Reviews Generated</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">98%</div>
            <div className="text-gray-400">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;