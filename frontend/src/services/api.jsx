import axios from 'axios';

// Configuration de base d'axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Service d'authentification
export const authService = {
  // Inscription
  register: (userData) => api.post('/register', userData),
  
  // Connexion
  login: (credentials) => api.post('/login', credentials),
  
  // Déconnexion
  logout: () => api.post('/logout'),
  
  // Obtenir l'utilisateur connecté
  getUser: () => api.get('/user'),
};

// Service des médicaments
export const medicamentService = {
  // Liste avec recherche et filtres
  getAll: (params) => api.get('/medicaments', { params }),
  
  // Détails d'un médicament
  getOne: (id) => api.get(`/medicaments/${id}`),
  
  // Créer un médicament
  create: (data) => api.post('/medicaments', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  
  // Mettre à jour un médicament
  update: (id, data) => api.put(`/medicaments/${id}`, data),
  
  // Supprimer un médicament
  delete: (id) => api.delete(`/medicaments/${id}`),
  
  // Statistiques
  getStats: () => api.get('/medicaments/stats/dashboard'),
};

export default api;