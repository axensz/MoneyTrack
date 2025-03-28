import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { register } from "../utils/auth";
import "../styles/register.scss";
import "../styles/modal.scss";

function Register() {
  const [username, setUsername] = useState(""); // Estado para el nombre de usuario
  const [email, setEmail] = useState("");       // Estado para el correo electrónico
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [question, setQuestion] = useState(null); // Estado para la pregunta de seguridad
  const [answer, setAnswer] = useState("");     // Estado para la respuesta de seguridad
  const [message, setMessage] = useState("");   // Estado para el mensaje del modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const navigate = useNavigate();

  const questionOptions = [
    { value: "1", label: "¿Cuál es el nombre de tu mascota?" },
    { value: "2", label: "¿Cuál es tu ciudad de nacimiento?" },
    { value: "3", label: "¿Cuál es tu comida favorita?" },
    { value: "4", label: "¿Cuál es el nombre de tu mejor amigo de la infancia?" },
  ];

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: '350px',
    }),
    control: (provided) => ({
      ...provided,
      width: '350px',
      minHeight: '30px',
      padding: '10px',
      color: 'black',
      fontWeight: 'semibold',
    }),
    singleValue: (provided) => ({
      ...provided,
      whiteSpace: 'normal',
      wordBreak: 'break-word',
    }),
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const result = register(username, email, password, question?.value, answer);

    setMessage(result.message);
    setIsModalOpen(true);

    // Restablecer los campos de nombre de usuario y contraseña
    setUsername("");
    setPassword("");

    const timeoutDuration = result.success ? 3000 : 2000;

    setTimeout(() => {
      setIsModalOpen(false);
      if (result.success) {
        navigate("/login");
      }
    }, timeoutDuration);
  };

  return (
    <>
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

          <Select
            placeholder="Selecciona una pregunta de seguridad"
            options={questionOptions}
            value={question}
            onChange={setQuestion}
            styles={customStyles}
            isSearchable={false}
          />

          <input
            type="text"
            placeholder="Respuesta"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />

          <button type="submit">Registrarme</button>
        </form>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <p>{message}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Register;
