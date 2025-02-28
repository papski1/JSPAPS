function resetSession() {
    // Clear session data
    sessionStorage.clear();
    localStorage.clear();

    // Optionally, redirect to the login page or show a success message
    window.location.href = '/login'; // Redirect to the login page
}

// Export the resetSession function
export { resetSession };