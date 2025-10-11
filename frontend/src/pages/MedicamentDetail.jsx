import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Header from '../components/Header'; // Importing the Header
import { medicamentService } from '../services/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MedicamentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicament, setMedicament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicament();
  }, [id]);

  const fetchMedicament = async () => {
    try {
      const response = await medicamentService.getOne(id);
      setMedicament(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération du médicament:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-8 flex justify-center items-center h-screen">
          <p className="text-gray-600 text-xl">Chargement...</p>
        </div>
      </Layout>
    );
  }

  if (!medicament) {
    return (
      <Layout>
        <div className="p-8">
          <p className="text-red-600">Médicament non trouvé</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <button 
            onClick={() => navigate('/medicaments')}
            className="hover:text-gray-800"
          >
            Médicaments
          </button>
          <span className="mx-2">›</span>
          <span className="text-gray-800">Tous les détails</span>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Image du médicament */}
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg relative">
              <button className="absolute left-4 p-2 bg-white rounded-full shadow hover:bg-gray-50">
                <ChevronLeft size={24} />
              </button>
              
              {medicament.image ? (
                <img 
                  src={`http://localhost:8000/storage/${medicament.image}`}
                  alt={medicament.nom}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <p className="text-gray-400 text-lg">Aucune image disponible</p>
                </div>
              )}
              
              <button className="absolute right-4 p-2 bg-white rounded-full shadow hover:bg-gray-50">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Informations du médicament */}
          <div className="space-y-6">
            {/* Titre */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {medicament.nom}
              </h1>
            </div>

            {/* Composition */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Composition</h2>
              <p className="text-gray-600">{medicament.composition || 'Non spécifié'}</p>
            </div>

            {/* Fabriquant/Commerçant */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Fabriquant/commerçant</h2>
              <p className="text-gray-600">{medicament.fabriquant || 'Non spécifié'}</p>
            </div>

            {/* Type de consommation */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Type de consommation</h2>
              <p className="text-gray-600">{medicament.type_consommation || 'Non spécifié'}</p>
            </div>

            {/* Date d'expiration */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Date d'expiration</h2>
              <p className="text-gray-600">
                {medicament.date_expiration 
                  ? new Date(medicament.date_expiration).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })
                  : 'Non spécifié'}
              </p>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Description :</h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                {medicament.description ? (
                  medicament.description.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>Aucune description disponible</p>
                )}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => navigate('/medicaments')}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Retour à la liste
              </button>
              <button
                onClick={() => {
                  // Fonction pour modifier le médicament
                  alert('Fonctionnalité de modification à implémenter');
                }}
                className="flex-1 px-6 py-3 bg-[#7DD3FC] text-white rounded-lg hover:bg-[#5BC0DE] transition-colors"
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MedicamentDetail;