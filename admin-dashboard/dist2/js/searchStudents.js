export function searchStudents(searchCriteria) {
    const url = '/api/students/search'; // Adjust the URL as needed

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ criteria: searchCriteria }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displaySearchResults(data);
    })
    .catch(error => {
        console.error('Error fetching student data:', error);
    });
}

function displaySearchResults(data) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (data.length === 0) {
        resultsContainer.innerHTML = '<p>No students found.</p>';
        return;
    }

    data.forEach(student => {
        const studentElement = document.createElement('div');
        studentElement.classList.add('student-result');
        studentElement.innerHTML = `
            <p>ID: ${student.id}</p>
            <p>Name: ${student.name}</p>
            <p>Email: ${student.email}</p>
        `;
        resultsContainer.appendChild(studentElement);
    });
}