import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { obtenerCuentas } from "../utils/createAccount";
import { generateChart } from "../utils/generateChart";
import "../styles/home.scss";
import plusIcon from "../assets/plus.svg";
import Header from "../components/Header";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Usuario");
  const [greeting, setGreeting] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const chartRef = useRef(null);

  // Función para cargar cuentas y actualizar el total
  const loadAccounts = useCallback(() => {
    const cuentas = obtenerCuentas() || [];
    setAccounts(cuentas);
    setTotalBalance(cuentas.reduce((sum, cuenta) => sum + (cuenta.saldo || 0), 0));
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || "Usuario";
    setUsername(storedUser);

    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches"
    );

    loadAccounts();
  }, [loadAccounts]);

  // Escuchar eventos personalizados y cambios en localStorage
  useEffect(() => {
    const handleCuentasChange = () => loadAccounts();
    const handleStorageChange = (event) => {
      if (event.key === "cuentas") loadAccounts();
    };

    window.addEventListener("cuentasChanged", handleCuentasChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("cuentasChanged", handleCuentasChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadAccounts]);

  // Actualizar el gráfico cuando cambien las cuentas
  useEffect(() => {
    if (chartRef.current && accounts.length > 0) {
      generateChart(chartRef.current);
    }
  }, [accounts]);

  const formatNumber = (value) =>
    new Intl.NumberFormat("es-ES", {
      style: "decimal",
      minimumFractionDigits: 2,
    }).format(value);

  return (
    <>
      <div className="inicio-container">
        <Header />
        <h1 className="page-title" id="welcomeUser">
          {greeting}, {username}
        </h1>

        <div className="grid-container" id="cuentasContainer">
          {accounts.length > 0 ? (
            accounts.map((cuenta, index) => (
              <div
                key={index}
                className="grid-item"
                onClick={() => navigate(`/cuenta/${index}`)}
                style={{ "--account-color": cuenta.color }}
              >
                <p className="item-title">{cuenta.nombre}</p>
                <p className="item-amount">${formatNumber(cuenta.saldo)}</p>
              </div>
            ))
          ) : (
            <div className="empty-accounts">
              <p>No hay cuentas creadas.</p>
            </div>
          )}
        </div>

        {accounts.length < 4 && (
          <div className="grid-item-agregar" onClick={() => navigate("/createaccount")}>
            <p className="item-title">Agregar</p>
            <img src={plusIcon} alt="Agregar" className="plus-icon" />
          </div>
        )}

        <h2 className="section-title">Saldo Total</h2>
        <div className="budget-container">
          <div className="budget-box">
            <p className="budget-total" id="totalDinero">{formatNumber(totalBalance)}</p>
          </div>
        </div>

        <h2 className="section-title-2">Gráfico Histórico</h2>
        <div className="chart-container">
          {accounts.length > 0 ? (
            <canvas ref={chartRef} id="budgetChart"></canvas>
          ) : (
            <p className="empty-chart-message">
              Agrega al menos una cuenta bancaria <br />para visualizar el gráfico.
            </p>
          )}
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Home;