// This file handles the creation, editing, and deletion of announcements.

export function createAnnouncement(announcementData) {
    return fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(announcementData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Announcement created successfully!');
            return data.announcement;
        } else {
            throw new Error(data.message);
        }
    })
    .catch(error => console.error('Error creating announcement:', error));
}

export function editAnnouncement(announcementId, updatedData) {
    return fetch(`/api/announcements/${announcementId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Announcement updated successfully!');
            return data.announcement;
        } else {
            throw new Error(data.message);
        }
    })
    .catch(error => console.error('Error updating announcement:', error));
}

export function deleteAnnouncement(announcementId) {
    return fetch(`/api/announcements/${announcementId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Announcement deleted successfully!');
        } else {
            throw new Error(data.message);
        }
    })
    .catch(error => console.error('Error deleting announcement:', error));
}