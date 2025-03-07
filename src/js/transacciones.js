document.addEventListener("DOMContentLoaded", function () {
    cargarMeses(); // Cargar los meses en el selector
    cargarTransacciones();
    
    document.getElementById("mesTransaccion").addEventListener("change", cargarTransacciones);
    document.getElementById("tipoFiltro").addEventListener("change", cargarTransacciones);
});

function cargarMeses() {
    let selectMes = document.getElementById("mesTransaccion");
    let meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    let mesActual = new Date().toLocaleString("es-ES", { month: "long" });

    selectMes.innerHTML = "";
    meses.forEach(mes => {
        let option = document.createElement("option");
        option.value = mes;
        option.textContent = mes.charAt(0).toUpperCase() + mes.slice(1);
        if (mes === mesActual) {
            option.selected = true;
        }
        selectMes.appendChild(option);
    });
}

function cargarTransacciones() {
    let transacciones = JSON.parse(localStorage.getItem("transacciones")) || {};
    let mesSeleccionado = document.getElementById("mesTransaccion").value;
    let tipoFiltro = document.getElementById("tipoFiltro").value; // Obtiene el tipo seleccionado (todos, ingreso, gasto)
    let transaccionesContainer = document.getElementById("listaTransacciones");
    let mensajeVacio = document.getElementById("mensajeVacio");
    let totalMonto = document.getElementById("totalMonto");

    if (!transaccionesContainer) return;

    // Limpiar contenido previo
    transaccionesContainer.innerHTML = "";
    let total = 0;

    if (!transacciones[mesSeleccionado] || transacciones[mesSeleccionado].length === 0) {
        mensajeVacio.style.display = "block";
        totalMonto.textContent = "$0.00";
        return;
    }

    mensajeVacio.style.display = "none";

    transacciones[mesSeleccionado].forEach(transaccion => {
        if (tipoFiltro !== "todos" && transaccion.tipo !== tipoFiltro) return; // Filtrar por tipo

        let transaccionDiv = document.createElement("div");
        transaccionDiv.classList.add("transaction");

        let colorMonto = transaccion.tipo === "ingreso" ? "#4CAF50" : "#F44336"; // Verde para ingresos, rojo para gastos
        let tipoTexto = transaccion.tipo === "ingreso" ? "Ingreso" : "Gasto";

        transaccionDiv.innerHTML = `
            <img src="/src/assets/house.svg" class="transaction-icon" alt="icono">
            <div class="transaction-info">
                <strong>${transaccion.titulo}</strong><br>
                <small>${transaccion.cuenta} - <span class="tipo-transaccion">${tipoTexto}</span></small>
            </div>
            <div class="transaction-amount" style="color: ${colorMonto};">$${transaccion.monto.toFixed(2)}</div>
        `;

        transaccionesContainer.appendChild(transaccionDiv);

        // Sumar al total
        total += transaccion.monto;
    });

    // Mostrar total
    totalMonto.textContent = `$${total.toFixed(2)}`;

    // Si después de filtrar no hay transacciones, mostrar mensaje de vacío
    if (transaccionesContainer.innerHTML === "") {
        mensajeVacio.style.display = "block";
        totalMonto.textContent = "$0.00";
    }
}
