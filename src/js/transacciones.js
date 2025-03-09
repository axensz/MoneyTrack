document.addEventListener("DOMContentLoaded", function () {
    // Cargar elementos según la página actual
    if (document.getElementById("mesTransaccion")) {
        cargarMeses();
        cargarTransacciones();
        document.getElementById("mesTransaccion").addEventListener("change", cargarTransacciones);
        document.getElementById("tipoFiltro").addEventListener("change", cargarTransacciones);
    }

    if (document.getElementById("cuenta")) {
        cargarCuentas();
    }
});

function cargarCuentas() {
    const selectCuenta = document.getElementById("cuenta");
    if (!selectCuenta) return;

    let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
    selectCuenta.innerHTML = '<option value="" disabled selected>Selecciona Cuenta</option>';

    if (cuentas.length === 0) {
        selectCuenta.innerHTML += '<option disabled>No hay cuentas disponibles</option>';
        return;
    }

    cuentas.forEach(cuenta => {
        selectCuenta.innerHTML += `<option value="${cuenta.nombre}">${cuenta.nombre}</option>`;
    });
}

function cargarMeses() {
    const selectMes = document.getElementById("mesTransaccion");
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", 
                   "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const mesActual = new Date().toLocaleString("es-ES", { month: "long" }).toLowerCase();

    selectMes.innerHTML = meses.map(mes => `
        <option value="${mes}" ${mes === mesActual ? "selected" : ""}>
            ${mes.charAt(0).toUpperCase() + mes.slice(1)}
        </option>
    `).join("");
}

function cargarTransacciones() {
    const mesSeleccionado = document.getElementById("mesTransaccion").value;
    const tipoFiltro = document.getElementById("tipoFiltro").value;
    const transacciones = JSON.parse(localStorage.getItem("transacciones")) || {};
    const lista = document.getElementById("listaTransacciones");
    const mensajeVacio = document.getElementById("mensajeVacio");
    const totalMonto = document.getElementById("totalMonto");

    lista.innerHTML = "";
    mensajeVacio.style.display = "none";
    totalMonto.textContent = "$0.00";

    if (!transacciones[mesSeleccionado]?.length) {
        mensajeVacio.style.display = "block";
        return;
    }

    let total = 0;
    const transaccionesFiltradas = transacciones[mesSeleccionado].filter(t => 
        tipoFiltro === "todos" || t.tipo === tipoFiltro
    );

    if (!transaccionesFiltradas.length) {
        mensajeVacio.style.display = "block";
        return;
    }

    transaccionesFiltradas.forEach(t => {
        const color = t.tipo === "ingreso" ? "#4CAF50" : "#F44336";
        lista.innerHTML += `
            <div class="transaction">
                <img src="/src/assets/money.svg" class="transaction-icon">
                <div class="transaction-info">
                    <strong>${t.titulo}</strong><br>
                    <small>${t.cuenta} - ${t.tipo}</small>
                </div>
                <div class="transaction-amount" style="color: ${color};">
                    $${parseFloat(t.monto).toFixed(2)}
                </div>
            </div>
        `;
        total += parseFloat(t.monto);
    });

    totalMonto.textContent = `$${total.toFixed(2)}`;
}