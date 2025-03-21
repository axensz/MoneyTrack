import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { register } from "../utils/auth"; 
import "../styles/register.scss";
import "../styles/modal.scss"; 
import { color } from "chart.js/helpers";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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

    if (result.success) {
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/login");
      }, 3000);
    }
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
