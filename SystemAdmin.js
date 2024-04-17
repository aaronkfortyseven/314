// SystemAdmin.js

// Sample user data
let users = [];

// Sample user profile data
let userProfiles = [];

// Controller functions
document.getElementById('logoutBtn').addEventListener('click', logout);
document.getElementById('searchBtn').addEventListener('click', searchUsers);
document.getElementById('createUserBtn').addEventListener('click', createUser);
document.getElementById('viewUsersBtn').addEventListener('click', viewUsers);
document.getElementById('suspendUserBtn').addEventListener('click', suspendUser); // User Management
document.getElementById('searchProfileBtn').addEventListener('click', searchProfiles);
document.getElementById('createProfileBtn').addEventListener('click', createProfile);
document.getElementById('viewProfilesBtn').addEventListener('click', viewProfiles);
document.getElementById('suspendProfileBtn').addEventListener('click', suspendProfile); // User Profile Management
document.getElementById('updateProfileBtn').addEventListener('click', updateProfile); // User Profile Management
document.getElementById('updateUserBtn').addEventListener('click', updateUser); // User Management

// Sample function to simulate logout
function logout() {
    // Redirect the user to the login page
    window.location.href = "login.html";
}

// User Management Functions
function createUser() {
    const username = prompt("Enter username:");
    const email = prompt("Enter email:");
    
    const newUser = { id: users.length + 1, username: username, email: email };
    
    users.push(newUser);
    
    displayUsers(users); // Update to display all users after adding the new one
}

function displayUsers(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear existing content
    
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');

        userDiv.innerHTML = `
            <h3>Username: ${user.username}</h3>
            <p>Email: ${user.email}</p>
        `;

        userList.appendChild(userDiv);
    });
}

function searchUsers() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    
    const foundUsers = users.filter(user => user.username.toLowerCase().includes(searchInput));
    
    if (foundUsers.length > 0) {
        displayUsers(foundUsers);
    } else {
        alert("No users found matching the search criteria.");
    }
}

function viewUsers() {
    displayUsers(users);
}

function suspendUser() {
    const username = prompt("Enter the username of the user to suspend:");
    if (username) {
        const userIndex = users.findIndex(user => user.username.toLowerCase() === username.toLowerCase());
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            console.log(`User with username ${username} has been suspended.`);
            displayUsers(users);
        } else {
            alert("Invalid username.");
        }
    } else {
        alert("Invalid username.");
    }
}


function updateUser() {
    const username = prompt("Enter the username of the user to update:");
    
    const userToUpdate = users.find(user => user.username.toLowerCase() === username.toLowerCase());
    
    if (userToUpdate) {
        const newUsername = prompt("Enter the new username:");
        const newEmail = prompt("Enter the new email:");
        
        userToUpdate.username = newUsername;
        userToUpdate.email = newEmail;
        
        displayUsers(users);
        
        console.log(`User with username "${username}" has been updated.`);
    } else {
        alert("Invalid username.");
    }
}

// User Profile Management Functions
function createProfile() {
    const name = prompt("Enter name:");
    const age = prompt("Enter age:");
    
    const newProfileId = Date.now() + Math.floor(Math.random() * 1000);
    
    const newProfile = { id: newProfileId, name: name, age: age };
    
    userProfiles.push(newProfile);
    
    displayUserProfiles(userProfiles);
}

function displayUserProfiles(userProfiles) {
    const profileList = document.getElementById('profileList');
    profileList.innerHTML = ''; // Clear existing content
    
    userProfiles.forEach(profile => {
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');

        profileDiv.innerHTML = `
            <h3>Name: ${profile.name}</h3>
            <p>Age: ${profile.age}</p>
        `;

        profileList.appendChild(profileDiv);
    });
}

function searchProfiles() {
    const searchInput = document.getElementById('searchProfileInput').value.trim().toLowerCase();
    
    const foundProfiles = userProfiles.filter(profile => profile.name.toLowerCase() === searchInput);
    
    if (foundProfiles.length > 0) {
        displayUserProfiles(foundProfiles);
    } else {
        alert("No user profiles found matching the search criteria.");
        displayUserProfiles(userProfiles);
    }
}

function viewProfiles() {
    displayUserProfiles(userProfiles);
}

function suspendProfile() {
    const profileName = prompt("Enter the name of the user profile to suspend:");
    if (profileName) {
        const profileIndex = userProfiles.findIndex(profile => profile.name.toLowerCase() === profileName.toLowerCase());
        if (profileIndex !== -1) {
            userProfiles.splice(profileIndex, 1);
            console.log(`User profile with name ${profileName} has been suspended.`);
            displayUserProfiles(userProfiles);
        } else {
            alert("Invalid profile name.");
        }
    } else {
        alert("Invalid profile name.");
    }
}


function updateProfile() {
    const profileName = prompt("Enter the name of the user profile to update:");
    
    const profileToUpdate = userProfiles.find(profile => profile.name.toLowerCase() === profileName.toLowerCase());
    
    if (profileToUpdate) {
        const newName = prompt("Enter the new name:");
        const newAge = prompt("Enter the new age:");
        
        profileToUpdate.name = newName;
        profileToUpdate.age = newAge;
        
        displayUserProfiles(userProfiles);
        
        console.log(`Profile with name "${profileName}" has been updated.`);
    } else {
        alert("Invalid profile name.");
    }
}
