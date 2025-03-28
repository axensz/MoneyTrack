import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

// Importar imágenes correctamente
import userIcon from "../assets/user.svg";
import mailIcon from "../assets/mail.svg";

function AccountConfig() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const username = localStorage.getItem("user");
    const userData = users.find((user) => user.username === username);

    if (userData) {
      setName(userData.username);
      setEmail(userData.email);
    }
  }, [navigate]);

  return (
    <div className="form-container">
      <a href="/account" className="back-arrow"></a>
      <h1 className="title">Información de la Cuenta</h1>

      <form className="register-form">
        {/* Nombre */}
        <div className="input-group">
          <label className="input-label">Nombre</label>
          <div className="input-line">
            <img src={userIcon} alt="User Icon" className="input-icon" />
            <input type="text" value={name} disabled />
          </div>
        </div>

        {/* Correo Electrónico */}
        <div className="input-group">
          <label className="input-label">Correo Electrónico</label>
          <div className="input-line">
            <img src={mailIcon} alt="Mail Icon" className="input-icon" />
            <input type="email" id="email-input" value={email} disabled />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AccountConfig;
