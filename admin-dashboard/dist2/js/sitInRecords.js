export function fetchSitInRecords() {
    fetch('/api/sit-in-records')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displaySitInRecords(data);
        })
        .catch(error => {
            console.error('Error fetching sit-in records:', error);
        });
}

function displaySitInRecords(records) {
    const recordsContainer = document.getElementById('sit-in-records-container');
    recordsContainer.innerHTML = '';

    records.forEach(record => {
        const recordElement = document.createElement('div');
        recordElement.classList.add('record');
        recordElement.innerHTML = `
            <p><strong>ID:</strong> ${record.id}</p>
            <p><strong>Student Name:</strong> ${record.studentName}</p>
            <p><strong>Date:</strong> ${record.date}</p>
            <p><strong>Status:</strong> ${record.status}</p>
        `;
        recordsContainer.appendChild(recordElement);
    });
}