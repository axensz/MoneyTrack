import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/navbar";
import "../styles/transactions.scss";
import Header from "../components/Header";
import { monthOptions, obtenerTransacciones, formatNumber } from "../utils/transactions";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filterType, setFilterType] = useState("todos");

  // Inicializamos el mes seleccionado al mes actual
  useEffect(() => {
    const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
    setSelectedMonth(currentMonth);
  }, []);

  // Función optimizada para cargar transacciones
  const loadTransactions = useCallback(() => {
    if (!selectedMonth) return;
    
    // Obtener transacciones del mes seleccionado.
    // Nota: Se espera que en localStorage se guarden con claves numéricas (ej. "03").
    const transaccionesMes = obtenerTransacciones(selectedMonth);
    
    const filteredTransactions =
      filterType === "todos"
        ? transaccionesMes
        : transaccionesMes.filter((t) => t.tipo === filterType);

    setTransactions(filteredTransactions);

    // Calcular total y mostrarlo por consola para depuración
    const total = filteredTransactions.reduce((acc, { monto, tipo }) => {
      const montoNumerico = parseFloat(monto || 0);
      return tipo === "gasto" ? acc - montoNumerico : acc + montoNumerico;
    }, 0);
    
    //console.log("Total calculado:", total);
    setTotalAmount(total);
  }, [selectedMonth, filterType]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  // Escuchar cambios en localStorage
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "transacciones") {
        loadTransactions();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadTransactions]);

  return (
    <>
      <div className="transactions-container">
        <Header />

        <h1 className="page-title">Transacciones</h1>
        <div className="filters">
          <div className="month-selector">
            <label htmlFor="mesTransaccion">Mes:</label>
            <select
              id="mesTransaccion"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {monthOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="type-selector">
            <label htmlFor="tipoFiltro">Tipo:</label>
            <select
              id="tipoFiltro"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="ingreso">Ingresos</option>
              <option value="gasto">Gastos</option>
            </select>
          </div>
        </div>
        <div className="divider"></div>
        <div id="listaTransacciones">
          {transactions.length > 0 ? (
            transactions.map(({ titulo, cuenta, tipo, monto }, index) => (
              <div key={index} className="transaction">
                <div className="transaction-info">
                  <strong>{titulo}</strong>
                  <br />
                  <small>
                    {cuenta} - {tipo}
                  </small>
                </div>
                <div
                  className="transaction-amount"
                  style={{ color: tipo === "ingreso" ? "#4CAF50" : "#F44336" }}
                >
                  ${formatNumber(parseFloat(monto))}
                </div>
              </div>
            ))
          ) : (
            <p id="mensajeVacio" className="empty-message">
              No hay transacciones para este mes.
            </p>
          )}
        </div>
        <div className="total-container">
          <strong>Total:</strong>{" "}
          <span id="totalMonto">${formatNumber(totalAmount)}</span>
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Transactions;
