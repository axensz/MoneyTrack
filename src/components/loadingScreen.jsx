// src/components/LoadingScreen.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loading.scss';
import logo from '../assets/logo.svg'; // Importación correcta de la imagen

const LoadingScreen = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard'); // Si ya está autenticado, lo redirige sin esperar
    } else {
      const timer = setTimeout(() => {
        navigate('/login'); 
      }, 3000);

      return () => clearTimeout(timer); 
    }
  }, [navigate, user]);

  return (
    <div className="loading-container">
      <img src={logo} alt="Logo" className="logo" />
      <div className="loader" />
    </div>
  );
};

export default LoadingScreen;
