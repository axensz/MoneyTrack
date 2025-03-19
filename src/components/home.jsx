import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { obtenerCuentas } from "../utils/createAccount";
import { obtenerTransacciones } from "../utils/transactions";
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

  // Carga las cuentas desde localStorage y recalcula el saldo basado en las transacciones
  const loadAccounts = useCallback(() => {
    const cuentas = obtenerCuentas() || [];
    const transaccionesStorage = JSON.parse(localStorage.getItem("transacciones")) || {};
    
    const cuentasActualizadas = cuentas.map(acct => {
      let total = 0;
      Object.keys(transaccionesStorage).forEach(key => {
        const transaccionesMes = transaccionesStorage[key] || [];
        transaccionesMes.forEach(t => {
          if (t.cuenta.trim().toLowerCase() === acct.nombre.trim().toLowerCase()) {
            total += t.tipo === "ingreso" ? t.monto : -t.monto;
          }
        });
      });
      return { ...acct, saldo: total };
    });
    
    setAccounts(cuentasActualizadas);
    setTotalBalance(cuentasActualizadas.reduce((sum, cuenta) => sum + (cuenta.saldo || 0), 0));
  }, []);

  // Configura el saludo del usuario y carga las cuentas al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem("user") || "Usuario";
    setUsername(storedUser);

    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches");
    
    loadAccounts();
  }, [loadAccounts]);

  // Escucha eventos de cambios en cuentas o transacciones para actualizar los datos
  useEffect(() => {
    const handleDataChange = () => {
      loadAccounts();
    };
    const handleStorageChange = (event) => {
      if (event.key === "cuentas" || event.key === "transacciones") loadAccounts();
    };

    window.addEventListener("cuentasChanged", handleDataChange);
    window.addEventListener("transaccionesChanged", handleDataChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("cuentasChanged", handleDataChange);
      window.removeEventListener("transaccionesChanged", handleDataChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadAccounts]);

  // Genera o actualiza el gráfico cuando las cuentas cambian
  useEffect(() => {
    if (chartRef.current && accounts.length > 0) {
      generateChart(chartRef.current, accounts);
    }
  }, [accounts]);

  // Formatea los valores numéricos a un formato de moneda legible
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
          <div
            className="grid-item-agregar"
            onClick={() => navigate("/createaccount")}
          >
            <p className="item-title">Agregar</p>
            <img src={plusIcon} alt="Agregar" className="plus-icon" />
          </div>
        )}

        <h2 className="section-title">Saldo Total</h2>
        <div className="budget-container">
          <div className="budget-box">
            <p className="budget-total" id="totalDinero">
              ${formatNumber(totalBalance)}
            </p>
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