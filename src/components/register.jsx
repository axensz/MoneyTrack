import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/auth"; // Asegúrate de que apunte al archivo correcto
import "../styles/register.scss";
import "../styles/modal.scss"; // Agrega estilos para el modal

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const result = register(username, email, password, question, answer);

    setMessage(result.message);
    setIsModalOpen(true); // Mostrar el modal

    if (result.success) {
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/login");
      }, 3000); // Cerrar el modal y redirigir
    }
  };

  return (
    <div className="container">
      <a href="/login" className="back-arrow"></a>
      <h1 className="title">Registrarme</h1>

      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={question} onChange={(e) => setQuestion(e.target.value)} required>
          <option value="" disabled>Selecciona una pregunta de seguridad</option>
          <option value="1">¿Cuál es el nombre de tu mascota?</option>
          <option value="2">¿Cuál es tu ciudad de nacimiento?</option>
          <option value="3">¿Cuál es tu comida favorita?</option>
          <option value="4">¿Cuál es el nombre de tu mejor amigo de la infancia?</option>
        </select>
        <input
          type="text"
          placeholder="Respuesta"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />

        <button type="submit">Registrarme</button>
      </form>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
