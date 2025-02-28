export function fetchDailyStatistics() {
    fetch('/api/daily-statistics')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayDailyStatistics(data);
        })
        .catch(error => {
            console.error('Error fetching daily statistics:', error);
        });
}

function displayDailyStatistics(data) {
    // Logic to display daily statistics on the dashboard
    const statisticsContainer = document.getElementById('daily-statistics-container');
    statisticsContainer.innerHTML = ''; // Clear previous data

    data.forEach(stat => {
        const statElement = document.createElement('div');
        statElement.className = 'stat-item';
        statElement.innerHTML = `
            <h3>${stat.title}</h3>
            <p>${stat.value}</p>
        `;
        statisticsContainer.appendChild(statElement);
    });
}