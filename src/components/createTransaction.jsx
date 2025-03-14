import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/create.scss";

const CrearTransaccion = () => {
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState("");
    const [monto, setMonto] = useState("");
    const [tipo, setTipo] = useState("");
    const [cuenta, setCuenta] = useState("");
    const [fecha, setFecha] = useState("");
    const [cuentas, setCuentas] = useState([]);

    useEffect(() => {
        // Obtener cuentas almacenadas en localStorage
        const cuentasGuardadas = JSON.parse(localStorage.getItem("cuentas")) || [];
        setCuentas(cuentasGuardadas);
    }, []);

    // Función para formatear números a formato decimal con separadores
    const formatNumber = (value) =>
        new Intl.NumberFormat("es-ES", {
            style: "decimal",
            minimumFractionDigits: 2,
        }).format(value);

    // Manejar el cambio en el monto
    const handleMontoChange = (e) => {
        let value = e.target.value.replace(/[^0-9,.]/g, ""); // Solo permite números, comas y puntos
        value = value.replace(",", "."); // Sustituir coma por punto
        setMonto(value);
    };

    // Formatear el monto al perder el foco
    const handleMontoBlur = () => {
        const montoSinSeparadores = monto.replace(/\./g, "").replace(",", ".");
        const numericValue = parseFloat(montoSinSeparadores);
        if (!isNaN(numericValue)) {
            setMonto(formatNumber(numericValue));
        } else {
            setMonto("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const montoNumerico = parseFloat(monto.replace(/\./g, "").replace(",", "."));
        if (isNaN(montoNumerico)) return alert("Monto inválido");
    
        const mes = new Date(fecha).toLocaleString("es-ES", { month: "long" }).toLowerCase();
    
        let transacciones = JSON.parse(localStorage.getItem("transacciones")) || {};
        if (!transacciones[mes]) transacciones[mes] = [];
    
        transacciones[mes].push({ titulo, monto: montoNumerico, tipo, cuenta, fecha });
        localStorage.setItem("transacciones", JSON.stringify(transacciones));
    
        navigate("/transactions");
    };

    return (
        <div className="container">
            <a href="/transactions" className="back-arrow">&larr;</a>
            <h1 className="title">Agregar Transacción</h1>
            <form id="transactionForm" className="account-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Título" 
                    value={titulo} 
                    onChange={(e) => setTitulo(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Monto" 
                    value={monto} 
                    onChange={handleMontoChange} 
                    onBlur={handleMontoBlur} 
                    required 
                />
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                    <option value="" disabled>Tipo de movimiento</option>
                    <option value="ingreso">Ingreso</option>
                    <option value="gasto">Gasto</option>
                </select>
                <select value={cuenta} onChange={(e) => setCuenta(e.target.value)} required>
                    <option value="" disabled>Cuenta</option>
                    {cuentas.map((c, index) => (
                        <option key={index} value={c.nombre}>{c.nombre}</option>
                    ))}
                </select>
                <input 
                    type="date" 
                    value={fecha} 
                    onChange={(e) => setFecha(e.target.value)} 
                    required 
                />
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default CrearTransaccion;
