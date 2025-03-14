import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { obtenerDatosGrafico } from "./createAccount"; 
// Suponiendo que en createAccount.js tienes la función obtenerDatosGrafico()

export function generateChart(canvas) {
  if (!canvas) return;
  
  // Obtener datos para el gráfico: nombres, saldos y colores de las cuentas
  const { nombres, saldos, colores } = obtenerDatosGrafico();
  if (!nombres.length) return;

  // Destruir el gráfico previo si existe
  if (window.budgetChart instanceof Chart) {
    window.budgetChart.destroy();
  }

  // Crear un formateador para mostrar los saldos con dos decimales
  const formatter = new Intl.NumberFormat("es-ES", {
    style: "decimal",
    minimumFractionDigits: 2,
  });

  window.budgetChart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: nombres,
      datasets: [
        {
          label: "Saldo por cuenta",
          data: saldos,
          backgroundColor: colores,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
        datalabels: {
          color: "#000",
          anchor: "end",
          align: "top",
          formatter: (value, context) => formatter.format(value),
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
    plugins: [ChartDataLabels],
  });
}
