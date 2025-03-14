import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import "../styles/accountConfig.scss";

function AccountConfig() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isModified, setIsModified] = useState(false);

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

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setIsModified(true);
  };

  const handleSave = () => {
    if (isModified) {
      console.log("Datos guardados:", { name, email });

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((user) =>
        user.username === name ? { ...user, email } : user
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setIsModified(false);
    }
  };

  return (
    <div className="form-container">
      <a href="/account" className="back-arrow"></a>
      <h1 className="title">Información de la Cuenta</h1>

      <form className="register-form">
        {/* Nombre */}
        <div className="input-group">
          <label className="input-label">Nombre</label>
          <div className="input-line">
            <img src="src/assets/user.svg" alt="User Icon" className="input-icon" />
            <input type="text" value={name} disabled />
          </div>
        </div>

        {/* Correo Electrónico */}
        <div className="input-group">
          <label className="input-label">Correo Electrónico</label>
          <div className="input-line">
            <img src="src/assets/mail.svg" alt="Mail Icon" className="input-icon" />
            <input type="email" value={email} onChange={handleChange(setEmail)} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AccountConfig;
