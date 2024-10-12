const employees = [
    { id: '162721', name: 'Ryder' }, // Employee with permission to add announcements
    { id: '834868', name: 'Mia' },
    { id: '091827', name: 'Emma' },
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
        localStorage.setItem('currentUser', JSON.stringify(currentUser)); // Store user in local storage
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    } else {
        alert('Invalid Employee ID');
    }
}

function loadDashboard() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        displayAnnouncements();
        showSection('groupChat'); // Show group chat section by default
    } else {
        window.location.href = 'index.html'; // Redirect back to login if no user
    }
}

function showSection(sectionId) {
    document.getElementById('groupChat').style.display = sectionId === 'groupChat' ? 'block' : 'none';
    closeAnnouncements(); // Close modal if it's open
}

function displayAnnouncements() {
    const announcementList = document.getElementById('announcementList');
    announcementList.innerHTML = announcements.map(ann => `<p>${ann}</p>`).join('');
    
    // Show or hide the new announcement section based on user ID
    const newAnnouncementSection = document.getElementById('newAnnouncementSection');
    if (currentUser.id === '162721') {
        newAnnouncementSection.style.display = 'block';
    } else {
        newAnnouncementSection.style.display = 'none';
    }
}

function openAnnouncements() {
    document.getElementById('announcementList').innerHTML = '';
    displayAnnouncements(); // Refresh announcements when opening modal
    document.getElementById('announcementsModal').style.display = 'block';
}

function closeAnnouncements() {
    document.getElementById('announcementsModal').style.display = 'none';
}

function addAnnouncement() {
    const newAnnouncementInput = document.getElementById('newAnnouncement');
    const newAnnouncement = newAnnouncementInput.value;

    if (newAnnouncement) {
        announcements.push(newAnnouncement);
        newAnnouncementInput.value = ''; // Clear input
        displayAnnouncements(); // Refresh announcements display
    } else {
        alert('Please enter an announcement.');
    }
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

function logout() {
    localStorage.removeItem('currentUser'); // Clear the stored user
    window.location.href = 'index.html'; // Redirect back to login
}

// Call loadDashboard on dashboard page load
if (document.title.includes('Dashboard')) {
    loadDashboard
