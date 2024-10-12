const employees = [
    { id: '162721', name: 'Ryder' },
    { id: '834868', name: 'Mia' },
    { id: '091827', name: 'Emma' },
    // Add more employees as needed
];

const announcements = [
    "Welcome to the Employee Hub!",
    "Reminder: Team meeting on Friday at 10 AM.",
];

let currentUser = null;

function login() {
    const employeeId = document.getElementById('employeeId').value;
    const employee = employees.find(emp => emp.id === employeeId);
    
    if (employee) {
        currentUser = employee;
        alert(`Welcome, ${employee.name}`);
        displayAnnouncements();
        document.getElementById('login').style.display = 'none';
    } else {
        alert('Invalid Employee ID');
    }
}

function displayAnnouncements() {
    const announcementList = document.getElementById('announcementList');
    announcementList.innerHTML = announcements.map(ann => `<p>${ann}</p>`).join('');
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (currentUser && chatInput.value) {
        chatMessages.innerHTML += `<p><strong>${currentUser.name}:</strong> ${chatInput.value}</p>`;
        chatInput.value = '';
    } else {
        alert('Please log in to send messages.');
    }
}
