import React from 'react';
import { Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Turn Every Customer Into a{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">5-Star Review</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              The complete system that automatically captures positive reviews, 
              prevents negative ones, and grows your local business through 
              smart SMS marketing and social proof.
            </p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center text-green-400">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>No tech skills needed</span>
              </div>
              <div className="flex items-center text-green-400">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Setup in 5 minutes</span>
              </div>
              <div className="flex items-center text-green-400">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Works for any business</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-gray-300">4.9/5 from 2,847 reviews</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 relative overflow-hidden">
              {/* Green notification badge */}
              <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                +127 Reviews This Week
              </div>
              
              {/* Review card */}
              <div className="bg-white rounded-2xl p-6 mb-8 mt-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                    <img 
                      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" 
                      alt="Sarah M." 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Sarah M.</h3>
                    <p className="text-gray-600 text-sm">Local Café Owner</p>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "ReviewBoost helped us go from 12 to 180+ Google reviews in just 3 
                  months. Our revenue increased by 40%!"
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 text-center text-white">
                <div>
                  <div className="text-3xl font-bold mb-1">+60%</div>
                  <div className="text-blue-100 text-sm">More Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">50K+</div>
                  <div className="text-blue-100 text-sm">Trusted Owners</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1 flex items-center justify-center">
                    4.9<Star className="w-6 h-6 fill-current text-yellow-400 ml-1" />
                  </div>
                  <div className="text-blue-100 text-sm">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;