import React, { useState, useEffect } from 'react';
import { Search, Globe } from 'lucide-react';

const Header = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Format de la date : 14 janvier 2022
      const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = now.toLocaleDateString('fr-FR', dateOptions);
      
      // Format de l'heure : 22:45:04
      const formattedTime = now.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
      
      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); // Mise à jour chaque seconde

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-200 border-b border-gray-300 py-3 px-8">
      <div className="flex items-center justify-between">
        {/* Barre de recherche */}
        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Recherchez n'importe quoi ici."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3FC] text-sm"
          />
        </div>

        {/* Section droite : Langue, Date, Heure */}
        <div className="flex items-center gap-6">
          {/* Sélecteur de langue */}
          <div className="flex items-center gap-2">
            <Globe size={20} className="text-gray-600" />
            <select className="bg-transparent border-none text-sm text-gray-700 focus:outline-none cursor-pointer">
              <option value="fr">Français (France)</option>
              <option value="en">English (US)</option>
              <option value="es">Español</option>
            </select>
          </div>

          {/* Date et Heure */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">Bonjour</p>
              <p className="text-xs text-gray-600">{currentDate} · {currentTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;