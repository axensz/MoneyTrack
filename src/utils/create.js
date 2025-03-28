document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed.");
  const form = document.getElementById("accountForm");
  const nombreCuenta = document.getElementById("nombreCuenta");
  const saldoInicial = document.getElementById("saldoInicial");
  const tipoCuenta = document.getElementById("tipoCuenta");
  const colorOpciones = document.querySelectorAll(".color-option");

  let colorSeleccionado = "#9B02F4";
  let saldoNumerico = 0;

  // Selección de color
  colorOpciones.forEach(color => {
    color.addEventListener("click", () => {
      colorSeleccionado = color.getAttribute("data-color");
      console.log("Color seleccionado:", colorSeleccionado);
      colorOpciones.forEach(c => c.classList.remove("selected"));
      color.classList.add("selected");
    });
  });

  // Formateo dinámico del saldo
  saldoInicial.addEventListener("input", function() {
    let value = this.value.replace(/\D/g, "");
    saldoNumerico = value ? Math.min(Number(value), 99999999999) : 0;
    this.value = saldoNumerico.toLocaleString("es-ES");
    console.log("Saldo numérico actual:", saldoNumerico);
  });

  // Envío del formulario
  form.addEventListener("submit", e => {
    e.preventDefault();
    console.log("Formulario enviado.");
    
    let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
    console.log("Cuentas actuales:", cuentas);

    if (cuentas.length >= 4) {
      alert("No puedes crear más de 4 cuentas.");
      console.log("Error: Se alcanzó el máximo de cuentas.");
      return;
    }
    if (!nombreCuenta.value.trim() || !tipoCuenta.value) {
      alert("Todos los campos son obligatorios.");
      console.log("Error: Campos vacíos.");
      return;
    }
    if (cuentas.some(c => c.nombre.toLowerCase() === nombreCuenta.value.toLowerCase())) {
      alert("Ya existe una cuenta con ese nombre.");
      console.log("Error: Cuenta duplicada.");
      return;
    }

    const nuevaCuenta = {
      nombre: nombreCuenta.value.trim(),
      saldo: saldoNumerico,
      tipo: tipoCuenta.value,
      color: colorSeleccionado
    };
    console.log("Creando nueva cuenta:", nuevaCuenta);

    cuentas.push(nuevaCuenta);
    localStorage.setItem("cuentas", JSON.stringify(cuentas));
    console.log("Cuentas actualizadas:", cuentas);
    alert("Cuenta creada con éxito.");
    window.location.href = "inicio.html";
  });
});
