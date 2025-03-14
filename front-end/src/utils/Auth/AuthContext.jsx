import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from './AuthServices';

// Création du contexte d'authentification
const AuthContext = createContext();

// Fournisseur du contexte d'authentification
export function AuthProvider ({ children }) {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true)
                const token = AuthService.getAccessToken();
                if (token) {
                    // Si vous avez un endpoint pour vérifier le token ou obtenir les infos de l'utilisateur
                    setIsAuthenticated(true)
                }else {
                    setIsAuthenticated(false)
                }
            } catch (error) {
                console.error('Erreur lors de la vérification du token', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

   

    const logout = async () => {
        try {
            AuthService.logout();
            setIsAuthenticated(false);
            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de la connexion', error);
        }
    };
        

    return (
        <AuthContext.Provider value={ {
            loading,
            logout,
            setIsAuthenticated,
            isAuthenticated
        }}>
            { children }
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour utiliser le context
export const useAuth = () => {
    return useContext(AuthContext);
};
