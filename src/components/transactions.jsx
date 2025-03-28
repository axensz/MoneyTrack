import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/navbar";
import Header from "../components/Header";
import "../styles/transactions.scss";
import {
  monthOptions,
  obtenerTransacciones,
  formatNumber
} from "../utils/transactions";

const Transactions = () => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    // Por defecto, mes actual con padding (ej: "07")
    return (new Date().getMonth() + 1).toString().padStart(2, "0");
  });
  const [filterType, setFilterType] = useState("todos");
  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const loadTransactions = useCallback(() => {
    console.log("loadTransactions() - Mes seleccionado:", selectedMonth);
    console.log("loadTransactions() - Filtro de tipo:", filterType);

    // Obtener las transacciones del mes
    let transaccionesMes = obtenerTransacciones(selectedMonth);
    console.log("Transacciones obtenidas para el mes:", transaccionesMes);

    if (!Array.isArray(transaccionesMes)) {
      console.warn("transaccionesMes no es un array, se asigna []");
      transaccionesMes = [];
    }

    // Filtrar por tipo
    const filteredTransactions =
      filterType === "todos"
        ? transaccionesMes
        : transaccionesMes.filter((t) => t.tipo === filterType);

    console.log("Transacciones filtradas:", filteredTransactions);
    setTransactions(filteredTransactions);

    // Calcular total
    const total = filteredTransactions.reduce((acc, { monto, tipo }) => {
      // Asegurarse de que 'monto' sea un número
      const montoNumerico = parseFloat(monto) || 0;
      // Suma o resta según sea ingreso/gasto
      return tipo === "gasto" ? acc - montoNumerico : acc + montoNumerico;
    }, 0);

    console.log("Suma final (total):", total);
    setTotalAmount(total);
  }, [selectedMonth, filterType]);

  // Cargar transacciones al montar o cambiar mes/tipo
  useEffect(() => {
    loadTransactions();
  }, [selectedMonth, filterType, loadTransactions]);

  // Escucha cambios en localStorage (evento "storage")
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "transacciones") {
        console.log("Evento storage capturado en 'transacciones':", e.newValue);
        try {
          const nuevasTransacciones = JSON.parse(e.newValue);
          if (Array.isArray(nuevasTransacciones)) {
            loadTransactions();
          }
        } catch (error) {
          console.error("Error al parsear transacciones:", error);
        }
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
              className="fixed-width" // Para que no cambie de tamaño
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
              className="fixed-width" // Para que no cambie de tamaño
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
