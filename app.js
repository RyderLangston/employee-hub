const employees = [
    { id: '162721', name: 'Ryder' }, // Employee with permission to add announcements
    { id: '834868', name: 'Mia' },
    { id: '091827', name: 'Emma' },
];

const announcements = [
    "Welcome to the Employee Hub!",
    "Please check your messages regularly.",
];

let currentUser = null;

function loadDashboard() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        displayAnnouncements();
    } else {
        window.location.href = 'index.html'; // Redirect back to login if no user
    }
}

function showSection(sectionId) {
    document.getElementById('announcements').style.display = sectionId === 'announcements' ? 'block' : 'none';
    document.getElementById('privateMessages').style.display = sectionId === 'privateMessages' ? 'block' : 'none';
    document.getElementById('messageArea').style.display = 'none'; // Hide message area
}

function displayAnnouncements() {
    const announcementList = document.getElementById('announcementList');
    announcementList.innerHTML = announcements.map(ann => `<p>${ann}</p>`).join('');
}

// Select user for private messaging
function selectUser(userName) {
    document.getElementById('selectedUser').innerText = userName;
    document.getElementById('messageArea').style.display = 'block'; // Show message area
    const messages = document.getElementById('messages');
    messages.innerHTML = ''; // Clear previous messages
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messages = document.getElementById('messages');

    if (currentUser && messageInput.value) {
        messages.innerHTML += `<p><strong>${currentUser.name} to ${document.getElementById('selectedUser').innerText}:</strong> ${messageInput.value}</p>`;
        messageInput.value = ''; // Clear input
    } else {
        alert('Please log in to send messages.');
    }
}

function logout() {
    localStorage.removeItem('currentUser'); // Clear the stored user
    window.location.href = 'index.html'; // Redirect back to login
}

// Call loadDashboard on dashboard page load
if (document.title.includes('Dashboard')) {
    loadDashboard();
}
