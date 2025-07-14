import React from 'react';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const handlePlanSelection = (planName: string) => {
    // Pour l'instant, on redirige vers la page de checkout
    // Plus tard, on peut ajouter des paramètres pour pré-sélectionner le plan
    window.location.href = `/payment/checkout.html?plan=${planName.toLowerCase()}`;
  };

  const plans = [
    {
      name: "Starter",
      price: "$79",
      period: "/mois",
      description: "Parfait pour les petites entreprises qui débutent",
      features: [
        "Jusqu'à 100 SMS/mois",
        "Gestion basique des avis",
        "Support par email",
        "Dashboard en temps réel",
        "Analyses de base"
      ],
      buttonText: "Commencer",
      buttonStyle: "border border-gray-600 text-white hover:bg-slate-800"
    },
    {
      name: "Boost",
      price: "$119",
      period: "/mois",
      description: "Le plus populaire pour les entreprises en croissance",
      features: [
        "Tout dans Starter",
        "Jusqu'à 500 SMS/mois",
        "Automatisation avancée des avis",
        "Automatisation client & représentant",
        "Support prioritaire",
        "Personnalisation de marque",
        "Analyses avancées"
      ],
      buttonText: "Commencer",
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
      popular: true
    },
    {
      name: "Pro",
      price: "$159",
      period: "/mois",
      description: "Pour les entreprises établies qui ont besoin de plus de puissance",
      features: [
        "Tout dans Boost",
        "Jusqu'à 1000 SMS/mois",
        "Analyses et rapports avancés",
        "Support multi-emplacements",
        "Accès API",
        "Intégrations personnalisées"
      ],
      buttonText: "Commencer",
      buttonStyle: "border border-gray-600 text-white hover:bg-slate-800"
    }
  ];

  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Choisissez votre plan</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Commencez avec ce dont vous avez besoin aujourd'hui, évoluez au fur et à mesure
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`relative bg-slate-800 rounded-2xl p-8 border ${
              plan.popular ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-700'
            } hover:border-blue-500 transition-all duration-300`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    Plus populaire
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-300 text-sm">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handlePlanSelection(plan.name)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Garantie satisfait ou remboursé 30 jours • Annulation à tout moment • Aucun frais d'installation
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
