import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { medicamentService } from '../services/api';
import { FileText, ChevronRight } from 'lucide-react';
import { FaShieldAlt, FaMoneyBillWave, FaBriefcaseMedical, FaExclamationTriangle } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total_medicaments: 0,
    total_groupes: 0,
    total_stock: 0,
    penuries: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('janvier 2022');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await medicamentService.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
            <p className="text-gray-600 mt-1">Un aperçu rapide des données de votre pharmacie</p>
          </div>
          <button className="bg-white border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FileText size={20} />
            Télécharger le rapport
          </button>
        </div>

        {/* Cartes de statistiques principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* Carte 1 - Statut de l'inventaire */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <FaShieldAlt className="text-green-500" size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">Bien</h3>
            <p className="text-gray-600 text-sm mb-3">Statut de l'inventaire</p>
            <button className="text-green-600 text-sm hover:underline flex items-center gap-1">
              Afficher le rapport détaillé
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Carte 2 - Revenu */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <FaMoneyBillWave className="text-yellow-500" size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">4.800.432 FCFA</h3>
            <div className="text-gray-600 text-sm mb-3 flex items-center gap-2">
              <span>Revenu :</span>
              <select 
                className="text-sm border-none focus:outline-none bg-transparent" 
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option>janvier 2022</option>
                <option>février 2022</option>
                <option>mars 2022</option>
              </select>
            </div>
            <button className="text-yellow-600 text-sm hover:underline flex items-center gap-1">
              Afficher le rapport détaillé
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Carte 3 - Médicaments disponibles */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <FaBriefcaseMedical className="text-blue-500" size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stats.total_medicaments}</h3>
            <p className="text-gray-600 text-sm mb-3">Médicaments disponibles</p>
            <button 
              onClick={() => navigate('/medicaments')}
              className="text-blue-600 text-sm hover:underline flex items-center gap-1"
            >
              Visiter l'inventaire
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Carte 4 - Pénurie de médicaments */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <FaExclamationTriangle className="text-red-500" size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stats.penuries}</h3>
            <p className="text-gray-600 text-sm mb-3">Pénurie de médicaments</p>
            <button className="text-red-600 text-sm hover:underline flex items-center gap-1">
              Résoudre maintenant
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Section Inventaire et Rapport rapide */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* Inventaire */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Inventaire</h2>
              <button className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                Allez dans Configuration
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-4xl font-bold text-gray-800">{stats.total_medicaments}</p>
                <p className="text-gray-600 text-sm mt-2">Nombre total de médicaments</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gray-800">{stats.total_groupes}</p>
                <p className="text-gray-600 text-sm mt-2">Groupes de médecine</p>
              </div>
            </div>
          </div>

          {/* Rapport rapide */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Rapport rapide</h2>
              <select className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#7DD3FC]">
                <option>janvier 2022</option>
                <option>février 2022</option>
                <option>mars 2022</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-4xl font-bold text-gray-800">70 856</p>
                <p className="text-gray-600 text-sm mt-2">Quantité de médicaments vendus</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gray-800">5 288</p>
                <p className="text-gray-600 text-sm mt-2">Factures générées</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Ma pharmacie et Clients */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Ma pharmacie */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Ma pharmacie</h2>
              <button className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                Accédez à la gestion des utilisateurs
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-4xl font-bold text-gray-800">04</p>
                <p className="text-gray-600 text-sm mt-2">Nombre total de fournisseurs</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gray-800">05</p>
                <p className="text-gray-600 text-sm mt-2">Nombre total d'utilisateurs</p>
              </div>
            </div>
          </div>

          {/* Clients */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Clients</h2>
              <button className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                Aller à la page clients
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-4xl font-bold text-gray-800">845</p>
                <p className="text-gray-600 text-sm mt-2">Nombre total de clients</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gray-800">Adalimumab</p>
                <p className="text-gray-600 text-sm mt-2">Article fréquemment acheté</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;