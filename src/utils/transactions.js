export const monthFormatter = new Intl.DateTimeFormat("es-ES", { month: "long" });

export const monthOptions = Array.from({ length: 12 }, (_, i) => {
  const monthValue = (i + 1).toString().padStart(2, "0");
  return {
    value: monthValue,
    label: monthFormatter.format(new Date(2021, i, 1)), // El año no afecta al nombre del mes
  };
});

export const obtenerCuentas = () => {
  return JSON.parse(localStorage.getItem("cuentas")) || [];
};

export const obtenerTransacciones = (mes) => {
  const transacciones = JSON.parse(localStorage.getItem("transacciones")) || {};
  
  // Primero se intenta acceder usando la clave numérica (ej. "03")
  if (transacciones[mes]) return transacciones[mes];

  // Si no, se convierte el mes numérico a nombre en minúsculas
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  
  const mesNumero = parseInt(mes, 10);
  if (!isNaN(mesNumero) && mesNumero >= 1 && mesNumero <= 12) {
    const mesNombre = meses[mesNumero - 1];
    if (transacciones[mesNombre]) return transacciones[mesNombre];
  }
  return [];
};

export const guardarTransaccion = (titulo, monto, tipo, cuenta, fecha) => {
  const montoNumerico = parseFloat(monto.replace(/\./g, "").replace(",", "."));
  if (isNaN(montoNumerico)) {
    alert("Monto inválido");
    return;
  }
  
  const mes = new Date(fecha).getMonth() + 1;
  const mesString = mes.toString().padStart(2, "0");

  let transacciones = JSON.parse(localStorage.getItem("transacciones")) || {};
  
  localStorage.setItem("transacciones", JSON.stringify({
    ...transacciones,
    [mesString]: [...(transacciones[mesString] || []), { titulo, monto: montoNumerico, tipo, cuenta, fecha }]
  }));

  // Actualizar el saldo de la cuenta correspondiente
  let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
  cuentas = cuentas.map(acct => {
    if (acct.nombre.toLowerCase() === cuenta.toLowerCase()) {
      if (tipo === "ingreso") {
        return { ...acct, saldo: (acct.saldo || 0) + montoNumerico };
      } else if (tipo === "gasto") {
        return { ...acct, saldo: (acct.saldo || 0) - montoNumerico };
      }
    }
    return acct;
  });
  localStorage.setItem("cuentas", JSON.stringify(cuentas));

  // Emitir un evento personalizado para notificar el cambio de cuentas
  window.dispatchEvent(new CustomEvent("cuentasChanged"));
  
  // También se dispara el evento storage (útil si se usa en otras pestañas)
  window.dispatchEvent(new Event("storage"));
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat("es-ES", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(value);
};