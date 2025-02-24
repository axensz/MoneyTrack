document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('budgetChart').getContext('2d');

    new Chart(ctx, {
        type: 'line', // Cambio a gráfico de líneas
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril'], // Etiquetas del eje X
            datasets: [{
                label: 'Gastos Mensuales',
                data: [500, 300, 150, 250], // Datos en el eje Y
                borderColor: '#36A2EB', // Color de la línea
                backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de relleno
                borderWidth: 2,
                pointRadius: 5, // Tamaño de los puntos
                pointBackgroundColor: '#36A2EB', // Color de los puntos
                tension: 0.3 // Suaviza la línea
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
