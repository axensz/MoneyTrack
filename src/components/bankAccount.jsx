import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import "../styles/bankAccount.scss";
import { formatNumber } from "../utils/transactions";

const BankAccount = () => {
  const { bankName } = useParams();
  // Decodificamos y normalizamos el nombre para compararlo correctamente
  const decodedBankName = decodeURIComponent(bankName).trim().toLowerCase();

  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    console.log("🆔 Bank Name en la URL:", bankName);
    console.log("🔍 Bank Name después de decodeURIComponent:", decodedBankName);

    // Obtener todas las transacciones agrupadas por mes (objeto)
    const transaccionesObj = JSON.parse(localStorage.getItem("transacciones")) || {};
    console.log("📌 Objeto de transacciones:", transaccionesObj);
    
    // Aplanar todas las transacciones en un solo array
    const todasTransacciones = Object.values(transaccionesObj).flat();
    console.log("🔍 Todas las transacciones aplanadas:", todasTransacciones);

    // Filtrar las transacciones para la cuenta bancaria especificada
    const transaccionesFiltradas = todasTransacciones.filter(
      (t) => t.cuenta.trim().toLowerCase() === decodedBankName
    );
    console.log("🔍 Transacciones filtradas para:", decodedBankName, transaccionesFiltradas);

    setTransactions(transaccionesFiltradas);

    // Calcular ingresos, gastos y total
    let ingresos = 0, gastos = 0;
    transaccionesFiltradas.forEach(({ monto, tipo }) => {
      const montoNumerico = parseFloat(monto || 0);
      if (tipo === "ingreso") ingresos += montoNumerico;
      if (tipo === "gasto") gastos += montoNumerico;
    });

    console.log("💰 Total ingresos:", ingresos, "💸 Total gastos:", gastos);

    setIncome(ingresos);
    setExpenses(gastos);
    setTotalAmount(ingresos - gastos);
  }, [decodedBankName, bankName]);

  return (
    <div className="bank-account-container">
        <a href="/home" className="back-arrow"></a>
      <h1 className="bank-title">{bankName}</h1>

      <div className="summary">
        <div className="summary-item ingreso">
          <span>Ingresos:</span> ${formatNumber(income)}
        </div>
        <div className="summary-item gasto">
          <span>Gastos:</span> ${formatNumber(expenses)}
        </div>
      </div>

      <div className="divider"></div>

      <div id="listaTransacciones">
        {transactions.length > 0 ? (
          transactions.map(({ titulo, monto, tipo }, index) => (
            <div key={index} className="transaction">
              <div className="transaction-info">
                <strong>{titulo}</strong>
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
          <p className="empty-message">No hay transacciones registradas.</p>
        )}
      </div>

      <div className="total-container">
        <strong>Total:</strong> <span>${formatNumber(totalAmount)}</span>
      </div>

    </div>
  );
};

export default BankAccount;
