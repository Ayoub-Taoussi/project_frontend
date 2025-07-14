import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Features from './components/Features';
import Pricing from './components/Pricing';
import WhySystemWorks from './components/WhySystemWorks';
import GrowthStats from './components/GrowthStats';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <Hero />
      <TrustedBy />
      <Features />
      <Pricing />
      <WhySystemWorks />
      <GrowthStats />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;