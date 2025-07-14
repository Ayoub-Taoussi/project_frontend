import React from 'react';

const GrowthStats = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">The Result? Explosive Growth</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our clients typically see 300% increase in positive reviews and 60% more customers within 30 days.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="text-5xl font-bold text-white mb-2">300%</div>
            <div className="text-blue-100 text-lg">More Reviews</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="text-5xl font-bold text-white mb-2">60%</div>
            <div className="text-blue-100 text-lg">More Customers</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="text-5xl font-bold text-white mb-2">90</div>
            <div className="text-blue-100 text-lg">Days to Results</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthStats;