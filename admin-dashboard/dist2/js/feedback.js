// This file manages the viewing of feedback and reports. It exports functions like fetchFeedback and displayFeedback.

export function fetchFeedback() {
    return fetch('/api/feedback')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayFeedback(data);
        })
        .catch(error => {
            console.error('Error fetching feedback:', error);
        });
}

export function displayFeedback(feedbackData) {
    const feedbackContainer = document.getElementById('feedback-container');
    feedbackContainer.innerHTML = '';

    feedbackData.forEach(feedback => {
        const feedbackItem = document.createElement('div');
        feedbackItem.className = 'feedback-item';
        feedbackItem.innerHTML = `
            <h3>${feedback.title}</h3>
            <p>${feedback.message}</p>
            <span>${new Date(feedback.date).toLocaleDateString()}</span>
        `;
        feedbackContainer.appendChild(feedbackItem);
    });
}