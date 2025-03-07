document.addEventListener("DOMContentLoaded", function () {
    cargarTransacciones();
});

function cargarTransacciones() {
    let transacciones = JSON.parse(localStorage.getItem("transacciones")) || {};
    let transaccionesContainer = document.querySelector(".transactions-container");

    // Limpiar contenido previo
    transaccionesContainer.innerHTML = "<h1 class='page-title'>Transacciones</h1>";

    Object.keys(transacciones).forEach(mes => {
        let totalGastos = transacciones[mes].reduce((acc, t) => acc + (t.tipo === "gasto" ? t.monto : 0), 0);

        // Agregar mes
        let mesDiv = document.createElement("div");
        mesDiv.classList.add("month-title");
        mesDiv.textContent = `${mes} - Total Gastos: $${totalGastos.toFixed(2)}`;
        transaccionesContainer.appendChild(mesDiv);

        // Agregar transacciones del mes
        transacciones[mes].forEach(transaccion => {
            let transaccionDiv = document.createElement("div");
            transaccionDiv.classList.add("transaction");

            transaccionDiv.innerHTML = `
                <img src="/src/assets/house.svg" class="transaction-icon" alt="icono">
                <div class="transaction-info">${transaccion.titulo}</div>
                <div class="transaction-amount">$${transaccion.monto.toFixed(2)}</div>
            `;
            transaccionesContainer.appendChild(transaccionDiv);
        });

        // Separador
        let divider = document.createElement("div");
        divider.classList.add("divider");
        transaccionesContainer.appendChild(divider);
    });
}
