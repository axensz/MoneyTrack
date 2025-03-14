import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.scss';
import '../styles/modal.scss';
import { login } from '../utils/auth'; // Importamos la función de login

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const result = login(username, password);
    if (result.success) {
      navigate('/home');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="form-container">
    <div className="container-logo">
    <img src="src/assets/logo.svg" alt="Logo-container" className="logo-container" />
    </div>

  <div className="form-container">
    <div className="input-group">
      <div className="input-line">
        <img src="/src/assets/user.svg" alt="User Icon" className="input-icon" />
        <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
    </div>

    <div className="input-group">
      <div className="input-line">
        <img src="/src/assets/key.svg" alt="Key Icon" className="input-icon" />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <span className="forgot-password" onClick={() => navigate('/ForgotPassword')}>
        Restablecer tu contraseña
      </span>
    </div>

    {error && (
      <div className="modal">
        <div className="modal-content">
          <p>{error}</p>
          <button onClick={() => setError('')}>Cerrar</button>
        </div>
      </div>
    )}

    <div className="button-group">
      <button className="btn btn-primary" onClick={handleLogin}>
        Iniciar Sesión
      </button>
      <button className="btn btn-secondary" onClick={() => navigate('/register')}>
        Registrarse
      </button>
    </div>
  </div>
</div>
  );
}

export default Login;
