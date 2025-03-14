import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSecurityQuestion, validateSecurityAnswer } from "../utils/auth";
import "../styles/forgotPassword.scss";

function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Ingresar usuario, 2: Responder pregunta
  const [username, setUsername] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserSubmit = (e) => {
    e.preventDefault();
    const retrievedQuestion = getSecurityQuestion(username);

    if (retrievedQuestion) {
      setQuestion(retrievedQuestion);
      setStep(2);
    } else {
      setModalMessage("Usuario no encontrado");
      setIsModalOpen(true);
    }
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (validateSecurityAnswer(username, answer)) {
      setModalMessage("Respuesta correcta.");
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/resetpassword");
      }, 1000);
    } else {
      setModalMessage("Respuesta incorrecta. Inténtalo de nuevo.");
      setIsModalOpen(true);
    }
  };
  
  return (
    <div className="form-container">
      <a href="/login" className="back-arrow"></a>
      <h1 className="title">¿Olvidaste tu contraseña?</h1>

      {step === 1 ? (
        <form className="forgot-password-form" onSubmit={handleUserSubmit}>
          <p>Coloca tu usuario</p>
          <div className="input-group">
            <div className="input-line">
              <img src="/src/assets/user.svg" alt="User Icon" className="input-icon" />
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      ) : (
        <form className="forgot-password-form" onSubmit={handleAnswerSubmit}>
          <p>Responde la pregunta de seguridad</p>
          <h3>{question}</h3>
          <div className="input-group">
            <div className="input-line">
              <img src="/src/assets/question.svg" alt="Question Icon" className="input-icon" />
              <input
                type="text"
                placeholder="Ingresa tu respuesta"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Verificar</button>
        </form>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            {modalMessage !== "Respuesta correcta." && (
              <button onClick={() => setIsModalOpen(false)}>Cerrar</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
