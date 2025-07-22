import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Features from './components/Features';
import Pricing from './components/Pricing';
import WhySystemWorks from './components/WhySystemWorks';
import GrowthStats from './components/GrowthStats';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AuthPage from './components/auth/AuthPage';
import Dashboard from './components/dashboard/Dashboard';
import PricingPage from './components/pricing/PricingPage';
import SuccessPage from './components/success/SuccessPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/" element={
          <div className="min-h-screen bg-slate-900">
            <Header />
            <main>
              <Hero />
              <TrustedBy />
              <div id="features">
                <Features />
              </div>
              <div id="pricing">
                <Pricing />
              </div>
              <WhySystemWorks />
              <GrowthStats />
              <div id="testimonials">
                <Testimonials />
              </div>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
