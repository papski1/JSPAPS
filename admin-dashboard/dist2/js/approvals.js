// This file handles the approval process for various requests.
// It exports functions such as fetchApprovals and approveRequest.

export function fetchApprovals() {
    return fetch('/api/approvals')
        .then(response => response.json())
        .then(data => {
            // Process and return the approvals data
            return data.approvals;
        })
        .catch(error => {
            console.error('Error fetching approvals:', error);
            throw error;
        });
}

export function approveRequest(requestId) {
    return fetch(`/api/approvals/${requestId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to approve request');
        }
        return response.json();
    })
    .then(data => {
        // Handle successful approval
        return data.message;
    })
    .catch(error => {
        console.error('Error approving request:', error);
        throw error;
    });
}