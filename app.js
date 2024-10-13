function goTo(page) {
    window.location.href = page; // Redirect to the specified page
}

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


}

// Call loadDashboard on dashboard page load
if (document.title.includes('Dashboard')) {
    loadDashboard();
}


}


// Sample data structure for conversations
let conversations = {}; // Store conversations by employee ID

function sendMessage() {
    const employeeId = document.getElementById('employeeId').value;
    const message = document.getElementById('messageInput').value;

    if (employeeId && message) {
        // Add message to conversation
        if (!conversations[employeeId]) {
            conversations[employeeId] = []; // Initialize conversation
        }
        conversations[employeeId].push({ message, sender: "Me" });

        // Clear the input fields
        document.getElementById('messageInput').value = '';
        document.getElementById('employeeId').value = '';

        // Update the conversation list
        updateConversationList(employeeId);
    } else {
        alert('Please enter both Employee ID and message.');
    }
}

function updateConversationList(employeeId) {
    const conversationList = document.getElementById('conversationList');
    conversationList.innerHTML = ''; // Clear previous messages

    if (conversations[employeeId]) {
        conversations[employeeId].forEach(msg => {
            const msgElement = document.createElement('div');
            msgElement.textContent = `${msg.sender}: ${msg.message}`;
            conversationList.appendChild(msgElement);
        });
    }
}

// Function to add a new contact (this can be expanded for real functionality)
function addContact() {
    const newContactId = prompt("Enter Employee ID to add:");
    if (newContactId) {
        alert(`Contact ${newContactId} added!`);
        // Here, you can implement logic to save the new contact
    }
}

// Function to block a user (this can be expanded for real functionality)
function blockUser(employeeId) {
    if (confirm(`Are you sure you want to block user ${employeeId}?`)) {
        // Add logic to block the user
        alert(`User ${employeeId} blocked.`);
    }
}

function goTo(page) {
    window.location.href = page; // Redirect to the specified page
}


function initiateLockdown() {
    // Change the entire site's background to red
    document.body.style.backgroundColor = 'red';
    document.body.style.color = 'white';
    
    // Disable all interactions
    disableSiteInteractions();

    // Create a custom error message
    const errorMessage = document.createElement('div');
    errorMessage.id = 'lockdownMessage';
    errorMessage.style.position = 'fixed';
    errorMessage.style.top = '50%';
    errorMessage.style.left = '50%';
    errorMessage.style.transform = 'translate(-50%, -50%)';
    errorMessage.style.padding = '20px';
    errorMessage.style.fontSize = '24px';
    errorMessage.style.zIndex = '1000'; // Ensure it's on top
    errorMessage.innerHTML = 'LOCKDOWN INITIATED!';

    document.body.appendChild(errorMessage);

    // Automatically end lockdown after 30 seconds
    setTimeout(endLockdown, 30000);
}

function disableSiteInteractions() {
    // Disable buttons and inputs
    const elements = document.querySelectorAll('button, input, textarea, select');
    elements.forEach(element => {
        element.disabled = true;
    });
}

function endLockdown() {
    // Reset site appearance
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
    
    // Remove the lockdown message
    const errorMessage = document.getElementById('lockdownMessage');
    if (errorMessage) {
        document.body.removeChild(errorMessage);
    }

    // Re-enable all interactions
    enableSiteInteractions();
}

function enableSiteInteractions() {
    // Re-enable buttons and inputs
    const elements = document.querySelectorAll('button, input, textarea, select');
    elements.forEach(element => {
        element.disabled = false;
    });
}
