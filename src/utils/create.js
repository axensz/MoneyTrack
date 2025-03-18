document.addEventListener("DOMContentLoaded", () => {
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
        colorOpciones.forEach(c => c.classList.remove("selected"));
        color.classList.add("selected");
      });
    });
  
    // Formateo dinámico del saldo
    saldoInicial.addEventListener("input", function() {
      let value = this.value.replace(/\D/g, "");
      saldoNumerico = value ? Math.min(Number(value), 99999999999) : 0;
      this.value = saldoNumerico.toLocaleString("es-ES");
    });
  
    // Envío del formulario
    form.addEventListener("submit", e => {
      e.preventDefault();
  
      let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
  
      if (cuentas.length >= 4) {
        alert("No puedes crear más de 4 cuentas.");
        return;
      }
      if (!nombreCuenta.value.trim() || !tipoCuenta.value) {
        alert("Todos los campos son obligatorios.");
        return;
      }
      if (cuentas.some(c => c.nombre.toLowerCase() === nombreCuenta.value.toLowerCase())) {
        alert("Ya existe una cuenta con ese nombre.");
        return;
      }
  
      cuentas.push({
        nombre: nombreCuenta.value.trim(),
        saldo: saldoNumerico,
        tipo: tipoCuenta.value,
        color: colorSeleccionado
      });
  
      localStorage.setItem("cuentas", JSON.stringify(cuentas));
      alert("Cuenta creada con éxito.");
      window.location.href = "inicio.html";
    });
  });
  