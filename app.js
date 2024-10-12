function login() {
    const employeeId = document.getElementById('employeeId').value;

    // Check if the employee ID is valid
    if (employeeId === '162721' || employeeId === '834868' || employeeId === '091827') {
        localStorage.setItem('currentUser', JSON.stringify({ id: employeeId }));
        window.location.href = 'dashboard.html'; // Redirect to the dashboard
    } else {
        alert('Invalid Employee ID. Please try again.');
    }
}
