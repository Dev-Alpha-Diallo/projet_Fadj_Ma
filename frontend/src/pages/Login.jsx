import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { authService } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(loginData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
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
        <div className="w-full max-w-xl">
          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'login'
                  ? 'bg-[#7DD3FC] text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Connectez-vous
            </button>
            <button
              onClick={() => navigate('/register')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'register'
                  ? 'bg-[#7DD3FC] text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Inscrivez-vous
            </button>
          </div>

          {/* Formulaire de connexion */}
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Adresse e-mail
              </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3FC]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3FC]"
                required
              />
            </div>

            <div className="text-right">
              <button type="button" className="text-gray-600 hover:text-gray-800 text-sm">
                Mot de passe oublié
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7DD3FC] text-white py-3 rounded-lg font-semibold hover:bg-[#5BC0DE] transition-colors disabled:opacity-50"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;