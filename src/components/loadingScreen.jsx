// src/components/LoadingScreen.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loading.scss';

const LoadingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="loading-container">
      <img src="src/assets/logo.svg" alt="Logo" className="logo" />
      <div className="loader" />
    </div>
  );
};

export default LoadingScreen;
