document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('budgetChart').getContext('2d');

    new Chart(ctx, {
        type: 'line', 
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril'], 
            datasets: [{
                label: 'Gastos',
                data: [500, 300, 150, 250], 
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.2)', 
                borderWidth: 1.5, // Línea más delgada
                pointRadius: 3, // Puntos más pequeños
                pointBackgroundColor: '#36A2EB',
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true, // Evita estiramiento
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false // Oculta la leyenda para más espacio
                }
            }
        }
    });
});
