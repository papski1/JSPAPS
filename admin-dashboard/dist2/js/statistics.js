// This file handles the viewing of overall statistics.
// It exports a function fetchStatistics that retrieves statistical data.

export function fetchStatistics() {
    fetch('/api/statistics')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayStatistics(data);
        })
        .catch(error => {
            console.error('Error fetching statistics:', error);
        });
}

function displayStatistics(data) {
    // Logic to display statistics on the dashboard
    const statisticsContainer = document.getElementById('statistics-container');
    statisticsContainer.innerHTML = '';

    // Assuming data is an object with various statistics
    for (const [key, value] of Object.entries(data)) {
        const statElement = document.createElement('div');
        statElement.className = 'statistic';
        statElement.innerHTML = `<strong>${key}:</strong> ${value}`;
        statisticsContainer.appendChild(statElement);
    }
}