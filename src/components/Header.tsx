import React, { useState } from 'react';
import { Zap, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGetStarted = () => {
    // Pour l'instant, on redirige vers les plans (section pricing)
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogin = () => {
    // Pour l'instant, on peut juste afficher une alerte
    // Plus tard, on redirigera vers /auth/login.html
    window.location.href = '/auth/login.html';
  };

  return (
    <header className="bg-slate-900 sticky top-0 z-50 backdrop-blur-sm bg-slate-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="text-white font-bold text-xl">ReviewBoost</span>
          </div>
          
          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Tarifs</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Témoignages</a>
            <button 
              onClick={handleLogin}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Connexion
            </button>
            <button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              Commencer
            </button>
          </nav>
          
          {/* Bouton menu mobile */}
          <button 
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-800 py-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Fonctionnalités
              </a>
              <a 
                href="#pricing" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tarifs
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Témoignages
              </a>
              <button 
                onClick={() => {
                  handleLogin();
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                Connexion
              </button>
              <button 
                onClick={() => {
                  handleGetStarted();
                  setIsMenuOpen(false);
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium text-center"
              >
                Commencer
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
