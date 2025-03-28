import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Registrar solo los módulos necesarios
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, ChartDataLabels);

export function generateChart(canvas, cuentas) {
  if (!canvas || !cuentas.length) return;

  // Extraer datos
  const nombres = cuentas.map((c) => c.nombre);
  const saldos = cuentas.map((c) => c.saldo);
  const colores = cuentas.map((c) => c.color);

  // Destruir el gráfico previo si existe
  if (window.budgetChart instanceof Chart) {
    window.budgetChart.destroy();
    window.budgetChart = null;
  }

  // Formateador de números
  const formatter = new Intl.NumberFormat("es-ES", {
    style: "decimal",
    minimumFractionDigits: 2,
  });

  // Crear gráfico
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
          font: { weight: "normal", size: 14 },
          color: "#000",
          anchor: "end",
          align: "top",
          formatter: (value) => "$" + formatter.format(value),
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: Math.max(...saldos) * 1.2,
          ticks: {
            callback: (value) => formatter.format(value),
          },
        },
      },
    },
  });
}
