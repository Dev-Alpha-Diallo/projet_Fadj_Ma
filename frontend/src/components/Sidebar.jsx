import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogOut, Pill, ShoppingCart } from 'lucide-react';

const Sidebar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-[#2C3E50] text-white h-screen flex flex-col">
      {/* Header avec logo */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-700">
        <div className="relative">
          <ShoppingCart className="text-[#7DD3FC]" size={32} />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">+</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold">Fadj-Ma</h1>
      </div>

      {/* Profil utilisateur */}
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#7DD3FC] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">
              {user?.prenom?.charAt(0)}{user?.nom?.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{user?.prenom} {user?.nom}</p>
            <p className="text-sm text-[#7DD3FC] truncate">{user?.role || 'Administrateur'}</p>
          </div>
        </div>
      </div>

      {/* Menu navigation */}
      <nav className="flex-1 px-4 py-6">
        <button
          onClick={() => navigate('/dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            isActive('/dashboard')
              ? 'bg-[#7DD3FC] text-white'
              : 'hover:bg-gray-700'
          }`}
        >
          <LayoutDashboard size={20} />
          <span>Tableau de bord</span>
        </button>

        <button
          onClick={() => navigate('/medicaments')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            isActive('/medicaments')
              ? 'bg-[#7DD3FC] text-white'
              : 'hover:bg-gray-700'
          }`}
        >
          <Pill size={20} />
          <span>Médicaments</span>
        </button>
      </nav>

      {/* Bouton déconnexion */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors"
        >
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 text-xs text-gray-400 text-center">
        Propulsé par Red Team © 2024 version 1.1.2
      </div>
    </div>
  );
};

export default Sidebar;