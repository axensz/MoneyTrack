import { useEffect, useState, useRef } from "react";
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || "Usuario";
    setUsername(storedUser);

    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Buenos días");
    } else if (hour < 18) {
      setGreeting("Buenas tardes");
    } else {
      setGreeting("Buenas noches");
    }

    const cuentas = obtenerCuentas() || [];
    setAccounts(cuentas);
    setTotalBalance(cuentas.reduce((sum, cuenta) => sum + (cuenta.saldo || 0), 0));
  }, []);

  // Llamar a generateChart una vez que el canvas y las cuentas estén disponibles
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

  const formattedTotal = formatNumber(totalBalance);

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
            <p className="budget-total" id="totalDinero">{formattedTotal}</p>
          </div>
        </div>

        <h2 className="section-title-2">Gráfico Histórico</h2>
        <div className="chart-container">
          <canvas ref={chartRef} id="budgetChart"></canvas>
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Home;
