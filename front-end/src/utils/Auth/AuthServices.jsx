import axios from 'axios';
import { baseURL } from '../DataFront/eventTypes';


const baseUrl = baseURL;


const AuthService = {
    // Connexion de l'utilisateur
    login: async (data) => {
        try {
            const response = await axios.post(`${baseUrl}/profiles/auth`, data);
            const { accessToken } = response.data;

            console.log(accessToken)
            // Stockage du token d'accès
            localStorage.setItem('accessToken', accessToken);
            
        } catch (error) {
            // Gestion des erreurs avec un message d'erreur par défaut
            const errorMsg = error.response?.data?.error || 'Une erreur est survenue lors de la connexion.';
            console.log(errorMsg);
        }
    },

    // Déconnexion de l'utilisateur
    logout: () => {
        // Suppression du token d'accès
        localStorage.removeItem('accessToken');
        
    },

    // Obtention du token d'accès
    getAccessToken: () => {
        return localStorage.getItem('accessToken');
    },

    // Vérification si l'utilisateur est authentifié
    isAuthenticated: () => {
        return !!localStorage.getItem('accessToken');
    },
};

export default AuthService;
