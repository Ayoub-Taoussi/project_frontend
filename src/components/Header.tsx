import React from 'react';
import { Zap, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="text-white font-bold text-xl">ReviewBoost</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#success-stories" className="text-gray-300 hover:text-white transition-colors">Success Stories</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            <button className="text-gray-300 hover:text-white transition-colors">Login</button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium">
              Get Started
            </button>
          </nav>
          
          <button className="md:hidden text-gray-300">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;