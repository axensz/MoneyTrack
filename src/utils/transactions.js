export const monthFormatter = new Intl.DateTimeFormat("es-ES", { month: "long" });

export const monthOptions = Array.from({ length: 12 }, (_, i) => {
  const monthValue = (i + 1).toString().padStart(2, "0");
  return {
    value: monthValue,
    label: monthFormatter.format(new Date(2021, i, 1)),
  };
});

export const obtenerCuentas = () => {
  return JSON.parse(localStorage.getItem("cuentas")) || [];
};

export const obtenerTransacciones = (mes) => {
  const transacciones = JSON.parse(localStorage.getItem("transacciones")) || {};
  
  if (transacciones[mes]) return transacciones[mes];

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

  window.dispatchEvent(new Event("storage")); // Notificar cambios en localStorage
};
