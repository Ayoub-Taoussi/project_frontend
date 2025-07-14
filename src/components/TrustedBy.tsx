import React from 'react';
import { Check } from 'lucide-react';

const TrustedBy = () => {
  const businesses = [
    {
      name: "Cafés",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
      reviews: "+180 reviews"
    },
    {
      name: "Auto Repair",
      image: "https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=400",
      reviews: "+95 reviews"
    },
    {
      name: "Dental",
      image: "https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=400",
      reviews: "+127 reviews"
    },
    {
      name: "Hair Salons",
      image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400",
      reviews: "+203 reviews"
    },
    {
      name: "Local Shops",
      image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=400",
      reviews: "+156 reviews"
    }
  ];

  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Trusted by 50,000+ Business Owners
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From local cafés to dental practices, businesses across every industry are using 
            ReviewBoost to dominate their local market.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {businesses.map((business, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-3">
                <img 
                  src={business.image} 
                  alt={business.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-semibold text-lg mb-1">{business.name}</h3>
                  <div className="flex items-center text-blue-400 text-sm">
                    <Check className="w-4 h-4 mr-1" />
                    <span>{business.reviews}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;