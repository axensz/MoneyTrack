import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../utils/auth";
import "../styles/forgotPassword.scss";
import "../styles/modal.scss";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("resetUser");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setModalMessage("Las contraseñas no coinciden");
      setIsModalOpen(true);
      setTimeout(() => setIsModalOpen(false), 2000);
      return;
    }

    const result = updatePassword(username, password);

    if (result.success) {
      setModalMessage("Contraseña restablecida con éxito.");
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/login");
      }, 3000);
    } else {
      setModalMessage(result.message);
      setIsModalOpen(true);
      setTimeout(() => setIsModalOpen(false), 2000);
    }
  };

  return (
    <div className="form-container">
      <a href="/login" className="back-arrow"></a>
      <h1 className="title">Restablecer Contraseña</h1>

      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="input-group">
          <label className="input-label">Nueva Contraseña</label>
          <div className="input-line">
            <img src="src/assets/lock.svg" alt="Lock Icon" className="input-icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Confirmar Contraseña</label>
          <div className="input-line">
            <img src="src/assets/lock.svg" alt="Lock Icon" className="input-icon" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">Restablecer</button>
        </div>
      </form>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
