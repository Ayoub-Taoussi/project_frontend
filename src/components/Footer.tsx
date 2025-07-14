import React from 'react';
import { Star, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-white font-bold text-xl">ReviewBoost</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering local businesses to dominate their market through automated review generation and smart SMS marketing.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Product</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">SMS Marketing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Review Management</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Analytics</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Training</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="text-gray-400">support@reviewboost.com</li>
              <li className="text-gray-400">+1 (555) 123-4567</li>
              <li className="text-gray-400">123 Business Ave<br />Suite 100<br />City, State 12345</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 ReviewBoost. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">GDPR</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;