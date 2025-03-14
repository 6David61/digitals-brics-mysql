import axios from "axios";
import AuthService from "../Auth/AuthServices";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Pour la redirection vers la page de login
import { useAuth } from "../Auth/AuthContext";
import { baseURL } from "../DataFront/eventTypes";

const baseUrl = baseURL;

// Requete GET
export const useGetData = (url) => {
  const { logout } = useAuth(); // Récupérer logout via useAuth dans chaque hook
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const accessToken = AuthService.getAccessToken();
      if (url) {
        const response = await axios.get(`${baseUrl}/${url}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setData(response.data);
        setError("");
      }else {
        console.log("Pas de url alors pas de requete");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Token expiré, déconnexion de l'utilisateur");
        await logout();
        navigate("/"); // Rediriger vers la page de login
      } else {
        console.error("Erreur lors de la récupération des données :", error);
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, logout, navigate]);

  return { data, error, loading, fetchData };
};

// Requete POST
export const usePostData = (url) => {
  const { logout } = useAuth(); // Appel de useAuth dans le contexte de ce hook
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const postData = async (data) => {
    setLoading(true);
    try {
      const accessToken = AuthService.getAccessToken();
      const res = await axios.post(`${baseUrl}/${url}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // setResponse(res);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Token expiré, déconnexion de l'utilisateur");
        await logout();
        navigate("/"); // Rediriger vers la page de login
      } else {
        console.error("Erreur lors de l'envoi des données :", error);
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, postData };
};

// Requete PUT
export const usePutData = (url) => {
  const { logout } = useAuth();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const putData = async (data) => {
    setLoading(true);
    try {
      const accessToken = AuthService.getAccessToken();
      const res = await axios.put(`${baseUrl}/${url}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setResponse(res);
      // console.log(res)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Token expiré, déconnexion de l'utilisateur");
        await logout();
        navigate("/"); // Rediriger vers la page de login
      } else {
        console.error("Erreur lors de la mise à jour des données :", error);
        setError(error.response);
      }
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, putData };
};

// Requete DELETE
export const useDeleteData = (url) => {
  const { logout } = useAuth();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const deleteData = async (id) => {
    setLoading(true);
    try {
      const accessToken = AuthService.getAccessToken();
      const res = await axios.delete(`${baseUrl}/${url}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setResponse(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Token expiré, déconnexion de l'utilisateur");
        await logout();
        navigate("/"); // Rediriger vers la page de login
      } else {
        console.error("Erreur lors de la suppression des données :", error);
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, deleteData };
};
