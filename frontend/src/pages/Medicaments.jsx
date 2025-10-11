import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { medicamentService } from '../services/api';
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const Medicaments = () => {
  const navigate = useNavigate();
  const [medicaments, setMedicaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroupe, setSelectedGroupe] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);

  // Formulaire pour nouveau médicament
  const [newMedicament, setNewMedicament] = useState({
    nom: '',
    groupe: '',
    stock_quantite: '',
    prix: '',
    composition: '',
    fabriquant: '',
    type_consommation: '',
    date_expiration: '',
    description: '',
    image: null,
    prix: '',  // Ajout du prix
  });

  useEffect(() => {
    fetchMedicaments();
  }, [searchTerm, selectedGroupe, currentPage]);

  const fetchMedicaments = async () => {
    setLoading(true);
    try {
      const response = await medicamentService.getAll({
        search: searchTerm,
        groupe: selectedGroupe,
        page: currentPage,
      });
      setMedicaments(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error('Erreur lors de la récupération des médicaments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleAddMedicament = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(newMedicament).forEach(key => {
      if (newMedicament[key]) {
        formData.append(key, newMedicament[key]);
      }
    });

    try {
      await medicamentService.create(formData);
      setShowAddModal(false);
      fetchMedicaments();
      // Réinitialiser le formulaire
      setNewMedicament({
        nom: '',
        groupe: '',
        stock_quantite: '',
        prix: '',
        composition: '',
        fabriquant: '',
        type_consommation: '',
        date_expiration: '',
        description: '',
        image: null,
        prix: '',  // Réinitialiser le prix
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du médicament:', error);
      alert('Erreur lors de l\'ajout du médicament');
    }
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">médicaments ({medicaments.length})</h1>
          <p className="text-gray-600">Liste des médicaments disponibles à la vente.</p>
        </div>

        {/* Barre de recherche et actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Recherche */}
            <div className="flex-1 relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher dans l'inventaire des médicaments."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3FC]"
              />
            </div>

            {/* Filtre par groupe */}
            <div className="relative w-full sm:w-auto">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedGroupe}
                onChange={(e) => {
                  setSelectedGroupe(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3FC] appearance-none w-full sm:w-auto"
              >
                <option value="">Sélectionnez un groupe</option>
                <option value="Médecine générique">Médecine générique</option>
                <option value="Diabète">Diabète</option>
                <option value="Cardiologie">Cardiologie</option>
                <option value="Pédiatrie">Pédiatrie</option>
              </select>
            </div>

            {/* Bouton Nouveau médicament */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-white border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              <Plus size={20} />
              <span>Nouveau médicament</span>
            </button>
          </div>
        </div>

        {/* Table des médicaments */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nom du médicament</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID du médicament</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nom de groupe</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stock en quantité</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    Chargement...
                  </td>
                </tr>
              ) : medicaments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    Aucun médicament trouvé
                  </td>
                </tr>
              ) : (
                medicaments.map((medicament) => (
                  <tr key={medicament.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800">{medicament.nom}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{medicament.id_medicament}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{medicament.groupe}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{medicament.stock_quantite}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => navigate(`/medicaments/${medicament.id}`)}
                        className="text-blue-600 hover:underline"
                      >
                        Voir tous les détails »
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Affichage de {(currentPage - 1) * 10 + 1} à {Math.min(currentPage * 10, medicaments.length)} résultats sur {medicaments.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="px-4 py-2 bg-gray-100 rounded">
                Page {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Ajouter un médicament */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Header du modal */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Nouveau médicament</h2>
            </div>
            
            <form onSubmit={handleAddMedicament} className="p-6">
              {/* Section Upload d'image */}
              <div className="mb-8">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
                  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    {newMedicament.image ? (
                      <img
                        src={URL.createObjectURL(newMedicament.image)}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Plus size={48} className="text-gray-400" />
                    )}
                  </div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">Ajouter une image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewMedicament({...newMedicament, image: e.target.files[0]})}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Cliquez pour sélectionner une image
                  </label>
                </div>
              </div>

              {/* Section Obligatoire */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-1">Obligatoire</h3>
                <p className="text-sm text-gray-500 mb-4">Donnez plus de détails possible</p>

                <div className="grid grid-cols-2 gap-6">
                  {/* Nom du médicament */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du médicament
                    </label>
                    <input
                      type="text"
                      placeholder="Nom du médicament"
                      value={newMedicament.nom}
                      onChange={(e) => setNewMedicament({...newMedicament, nom: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3FC]"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      placeholder="Description"
                      value={newMedicament.description}
                      onChange={(e) => setNewMedicament({...newMedicament, description: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3FC]"
                    />
                  </div>

                  {/* Dosage */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dosage
                    </label>
                    <input
                      type="text"
                      placeholder="Dosage"
                      value={newMedicament.composition}
                      onChange={(e) => setNewMedicament({...newMedicament, composition: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3FC]"
                    />
                  </div>

                  {/* Prix */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix
                    </label>
                    <input
                      type="number"
                      placeholder="Prix"
                      value={newMedicament.prix || ''}
                      onChange={(e) => setNewMedicament({...newMedicament, prix: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3FC]"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Boutons */}
              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setNewMedicament({
                      nom: '',
                      groupe: '',
                      stock_quantite: '',
                      prix: '',  
                      composition: '',
                      fabriquant: '',
                      type_consommation: '',
                      date_expiration: '',
                      description: '',
                      image: null,
                      prix: '',  // Réinitialisation du prix
                    });
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#7DD3FC] text-white rounded-lg hover:bg-[#5BC0DE] transition-colors font-medium"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Medicaments;
