import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { authService } from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    genre: 'homme',
    date_naissance: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    try {
      const response = await authService.register(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-[#2C3E50] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Bienvenue chez votre pharmacie</h1>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <ShoppingCart className="text-[#7DD3FC]" size={32} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">+</span>
              </div>
            </div>
            <span className="text-2xl font-bold">Fadj-Ma</span>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => navigate('/login')}
              className="flex-1 py-3 rounded-lg font-semibold transition-colors bg-white text-gray-700 border border-gray-300"
            >
              Connectez-vous
            </button>
            <button
              className="flex-1 py-3 rounded-lg font-semibold transition-colors bg-[#7DD3FC] text-white"
            >
              Inscrivez-vous
            </button>
          </div>

          {/* Formulaire d'inscription */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Inscription réussie ! Redirection...
              </div>
            )}

            {/* Vos coordonées */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Vos coordonées
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="genre"
                    value="homme"
                    checked={formData.genre === 'homme'}
                    onChange={handleChange}
                    className="w-5 h-5 text-[#7DD3FC]"
                  />
                  <span>Homme</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="genre"
                    value="femme"
                    checked={formData.genre === 'femme'}
                    onChange={handleChange}
                    className="w-5 h-5 text-[#7DD3FC]"
                  />
                  <span>Femme</span>
                </label>
              </div>
            </div>

            {/* Prénom et Nom */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3FC]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3FC]"
                  required
                />
              </div>
            </div>

            {/* Date de naissance */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Date de naissance</label>
              <input
                type="date"
                name="date_naissance"
                value={formData.date_naissance}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3FC]"
                required
              />
            </div>

            {/* E-mail et Mot de passe */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3FC]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3FC]"
                  required
                  minLength="8"
                />
              </div>
            </div>

            {/* Confirmer */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Confirmer</label>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3FC]"
                required
                minLength="8"
              />
            </div>

            {/* Bouton d'inscription */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7DD3FC] text-white py-3 rounded-lg font-semibold hover:bg-[#5BC0DE] transition-colors disabled:opacity-50"
            >
              {loading ? 'Inscription...' : 'S\'inscrire'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;