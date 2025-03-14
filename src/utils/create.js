document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("accountForm");
    const nombreCuenta = document.getElementById("nombreCuenta");
    const saldoInicial = document.getElementById("saldoInicial");
    const tipoCuenta = document.getElementById("tipoCuenta");
    const colorOpciones = document.querySelectorAll(".color-option");

    let colorSeleccionado = "#9B02F4"; // Color predeterminado

    // Manejar selección de color
    colorOpciones.forEach(color => {
        color.addEventListener("click", function () {
            colorSeleccionado = color.getAttribute("data-color");
            colorOpciones.forEach(c => c.classList.remove("selected"));
            color.classList.add("selected");
        });
    });

    // Manejar formato de saldo
    saldoInicial.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, "");
        if (value) {
            let numericValue = Math.min(Number(value), 99999999999);
            this.value = numericValue.toLocaleString("es-ES");
        } else {
            this.value = "";
        }
    });

    // Manejar envío del formulario
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];

        if (cuentas.length >= 4) {
            alert("No puedes crear más de 4 cuentas.");
            return;
        }

        if (cuentas.some(cuenta => cuenta.nombre.toLowerCase() === nombreCuenta.value.toLowerCase())) {
            alert("Ya existe una cuenta con ese nombre.");
            return;
        }

        let saldoNumerico = parseFloat(saldoInicial.value.replace(/\./g, "").replace(",", "."));

        cuentas.push({
            nombre: nombreCuenta.value,
            saldo: saldoNumerico,
            tipo: tipoCuenta.value,
            color: colorSeleccionado
        });

        localStorage.setItem("cuentas", JSON.stringify(cuentas));

        alert("Cuenta creada con éxito.");
        window.location.href = "inicio.html";
    });
});
