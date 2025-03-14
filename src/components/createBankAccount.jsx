import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { agregarCuenta } from "../utils/createAccount";
import "../styles/create.scss";
import "../styles/modal.scss"; // Importar los estilos del modal

const CrearCuentaBancaria = () => {
  const navigate = useNavigate();
  const [nombreCuenta, setNombreCuenta] = useState("");
  const [saldoInicial, setSaldoInicial] = useState("");
  const [tipoCuenta, setTipoCuenta] = useState("");
  const [colorCuenta, setColorCuenta] = useState("#9B02F4");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convertir el saldo a número, eliminando puntos y comas
    const saldoNumerico = parseFloat(
      saldoInicial.replace(/\./g, "").replace(",", ".")
    );

    // Validar que se hayan completado todos los campos correctamente
    if (!nombreCuenta || isNaN(saldoNumerico) || saldoNumerico < 0 || !tipoCuenta) {
      showModal("Por favor, completa todos los campos correctamente.");
      return;
    }

    // Preparar la nueva cuenta
    const nuevaCuenta = {
      nombre: nombreCuenta,
      saldo: saldoNumerico,
      tipo: tipoCuenta,
      color: colorCuenta,
    };

    // Usar la función del transactions.js para agregar la cuenta
    const resultado = agregarCuenta(nuevaCuenta);

    if (resultado.error) {
      showModal(resultado.error);
      return;
    }

    showModal(resultado.success, true);
  };

  const showModal = (message, redirect = false) => {
    setModalMessage(message);
    setIsModalOpen(true);

    if (redirect) {
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/home");
      }, 2000);
    }
  };

  const handleSaldoChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value) {
      let numericValue = Math.min(Number(value), 99999999999);
      setSaldoInicial(numericValue.toLocaleString("es-ES"));
    } else {
      setSaldoInicial("");
    }
  };

  return (
    <div className="container">
      <a href="/home" className="back-arrow"></a>
      <h1 className="title">Crear Cuenta Bancaria</h1>

      <form className="account-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nombre de la cuenta" 
          value={nombreCuenta} 
          onChange={(e) => setNombreCuenta(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Saldo inicial" 
          value={saldoInicial} 
          onChange={handleSaldoChange} 
          required 
        />
        <select 
          value={tipoCuenta} 
          onChange={(e) => setTipoCuenta(e.target.value)} 
          required
        >
          <option value="" disabled>Selecciona el tipo de cuenta</option>
          <option value="ahorros">Ahorros</option>
          <option value="corriente">Corriente</option>
          <option value="efectivo">Efectivo</option>
          <option value="otro">Otro</option>
        </select>

        <div className="color-selector-container">
          <label>Color de la cuenta:</label>
          <div className="color-options">
            {["#9B02F4", "#F2FF00", "#FF2727", "#122757", "#005C53", "#011F26"].map((color) => (
              <div 
                key={color} 
                className={`color-option ${color === colorCuenta ? "selected" : ""}`} 
                style={{ backgroundColor: color }} 
                onClick={() => setColorCuenta(color)}
              ></div>
            ))}
          </div>
        </div>

        <button type="submit">Crear Cuenta</button>
      </form>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrearCuentaBancaria;
