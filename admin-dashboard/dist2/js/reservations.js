// This file handles viewing reservations and approvals.
// It exports functions such as fetchReservations and approveReservation.

export function fetchReservations() {
    fetch('/api/reservations')
        .then(response => response.json())
        .then(data => {
            displayReservations(data);
        })
        .catch(error => console.error('Error fetching reservations:', error));
}

function displayReservations(reservations) {
    const reservationsContainer = document.getElementById('reservations-container');
    reservationsContainer.innerHTML = '';

    reservations.forEach(reservation => {
        const reservationElement = document.createElement('div');
        reservationElement.className = 'reservation-item';
        reservationElement.innerHTML = `
            <p>ID: ${reservation.id}</p>
            <p>Student: ${reservation.studentName}</p>
            <p>Date: ${reservation.date}</p>
            <button onclick="approveReservation(${reservation.id})">Approve</button>
        `;
        reservationsContainer.appendChild(reservationElement);
    });
}

export function approveReservation(reservationId) {
    fetch(`/api/reservations/${reservationId}/approve`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Reservation approved successfully!');
            fetchReservations(); // Refresh the reservations list
        } else {
            alert('Failed to approve reservation.');
        }
    })
    .catch(error => console.error('Error approving reservation:', error));
}