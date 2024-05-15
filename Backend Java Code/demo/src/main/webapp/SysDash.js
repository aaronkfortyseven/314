//USER ACCOUNT--------------------------------------------------
async function fetchUsers() {
    const response = await fetch(`/myapp/ViewUserBoundary`);
    const users = await response.json();
    console.log(users);
    return users;
}

async function searchUsers() {
    const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
    const users = await fetchUsers();
    const filteredUsers = users.filter(user => user.username.trim().toLowerCase().includes(searchValue));
    
    if (filteredUsers.length > 0) {
        displayUsers(filteredUsers); // Display only the found users
    } else {
        alert("User not found.");
    }
}

async function displayUsers(filteredUsers = null) {
    console.log('displayUsers called');
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = ''; // Clear existing content
    
    const users = filteredUsers ? filteredUsers : await fetchUsers();
    console.log(users); 

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');

        userDiv.innerHTML = `
            <h2>${user.username}</h2>
            <p>Role: ${user.role}</p>
            <p>Suspended: ${user.suspended}</p>
            <button onclick="showUpdateUserForm('${user.username}')">Update</button>
            <button onclick="suspendUser('${user.username}')">Suspend</button>
            <button onclick="unsuspendUser('${user.username}')">Unsuspend</button>
        `;

        dashboard.appendChild(userDiv);
    });
}

async function createUser(event) {
    const newUser = {
        username: document.getElementById('accUsername').value,
        password: document.getElementById('password').value,
        role: document.getElementById('accRole').value,
    };

    const response = await fetch(`/myapp/CreateUserBoundary`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });

    if (response.ok) {
        document.getElementById('addUserForm').style.display = 'none';
        displayUsers(); // Assuming you have a function to display users
        alert('User added successfully.');
    } else {
        alert('Failed to add user.');
    }
}

async function showUpdateUserForm(username) {
    // Fetch the data for the specific user
    const response = await fetch(`/myapp/ViewUserBoundary?username=${encodeURIComponent(username)}`);
    const user = await response.json();

    // Pre-fill the form with the current user values
    document.getElementById('username').value = user.username;
    document.getElementById('role').value = user.role;

    // Show the form
    document.getElementById('updateUserForm').style.display = 'block';

    // Add an event listener to the submit button
    document.getElementById('updateUserSubmitButton').addEventListener('click', function(event) {
        event.preventDefault();
        updateUser(username);
    });
}

async function updateUser(username) {
    const updatedUser = {
        username: document.getElementById('updateUsername').value,
        role: document.getElementById('updateRole').value,
    };

    const response = await fetch(`/myapp/UpdateUserBoundary?username=${encodeURIComponent(username)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
        document.getElementById('updateUserForm').style.display = 'none';
        alert('User updated')
        displayUsers();
    } else {
        alert('Failed to update user.');
    }
}

async function suspendUser(username) {
    const response = await fetch('/myapp/SuspendUserBoundary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${encodeURIComponent(username)}`
    });

    if (response.ok) {
        alert('User suspended successfully');
    } else {
        alert('Failed to suspend user');
    }

    // Refresh the user list
    displayUsers();
}

async function unsuspendUser(username) {
    const response = await fetch('/myapp/UnsuspendUserBoundary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${encodeURIComponent(username)}`
    });

    if (response.ok) {
        alert('User unsuspended successfully');
    } else {
        alert('Failed to unsuspend user');
    }

    // Refresh the user list
    displayUsers();
}






//USER PROFILE--------------------------------------------------

async function fetchProfiles() {
    const response = await fetch(`/myapp/ViewProfileBoundary`);
    const profiles = await response.json();
    console.log(profiles);
    return profiles;
}

// SEARCH
async function searchProfiles() {
    const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
    const profiles = await fetchProfiles();
    const filteredProfiles = profiles.filter(profile => profile.username.trim().toLowerCase().includes(searchValue));
    
    if (filteredProfiles.length > 0) {
        displayProfiles(filteredProfiles); // Display only the found profiles
    } else {
        alert("Profile not found.");
    }
}

// DISPLAY
async function displayProfiles(filteredProfiles = null) {
    console.log('displayProfiles called');
    const dashboard = document.getElementById('profileList');
    dashboard.innerHTML = ''; // Clear existing content
    
    const profiles = filteredProfiles ? filteredProfiles : await fetchProfiles();

    profiles.forEach(profile => {
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');
    
        profileDiv.innerHTML = `
            <h2>${profile.username}</h2>
            <p>Email: ${profile.email}</p>
            <p>Name: ${profile.name}</p>
            ${profile.favProperties ? `<p>Favourite Properties: ${profile.favProperties.join(', ')}</p>` : ''}
            <p>Suspended: ${profile.suspended}</p>
            <button onclick="showUpdateProfileForm('${profile.username}')">Update</button>
            <button onclick="suspendProfile('${profile.username}')">Suspend</button>
            <button onclick="unsuspendProfile('${profile.username}')">Unsuspend</button>
        `;
    
        dashboard.appendChild(profileDiv);
    });
}

//PROFILE CREATION--------------------------------------------------
async function createProfile(event) {
    const newProfile = {
        username: document.getElementById('profileUsername').value,
        email: document.getElementById('profileEmail').value,
        name: document.getElementById('profileName').value,
        favProperties: [],
        suspended: false,
    };

    const response = await fetch(`/myapp/CreateProfileBoundary`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProfile),
    });

    if (response.ok) {
        document.getElementById('addProfileForm').style.display = 'none';
        displayProfiles(); // Assuming you have a function to display profiles
        alert('Profile added successfully.');
    } else {
        alert('Failed to add profile.');
    }
}

//PROFILE UPDATE--------------------------------------------------
async function showUpdateProfileForm(username) {
    // Fetch the data for the specific profile
    const response = await fetch(`/myapp/ViewProfileBoundary?username=${encodeURIComponent(username)}`);
    const profile = await response.json();

    // Pre-fill the form with the current profile values
    document.getElementById('profileUsername').value = profile.username;
    document.getElementById('profileEmail').value = profile.email;
    document.getElementById('profileName').value = profile.name;
    document.getElementById('profileFavProperties').value = profile.favProperties;
    document.getElementById('profileSuspended').value = profile.suspended;

    // Show the form
    document.getElementById('updateProfileForm').style.display = 'block';

    // Add an event listener to the submit button
    document.getElementById('updateProfileSubmitButton').addEventListener('click', function(event) {
        event.preventDefault();
        updateProfile(username);
    });
}

async function updateProfile(username) {
    const updatedProfile = {
        username: document.getElementById('updateProfileUsername').value,
        email: document.getElementById('updateProfileEmail').value,
        name: document.getElementById('updateProfileName').value,
        favProperties: document.getElementById('updateProfileFavProperties').value,
        suspended: document.getElementById('updateProfileSuspended').value,
    };

    const response = await fetch(`/myapp/UpdateProfileBoundary?username=${encodeURIComponent(username)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
    });

    if (response.ok) {
        document.getElementById('updateProfileForm').style.display = 'none';
        alert('Profile updated')
        displayProfiles();
    } else {
        alert('Failed to update profile.');
    }
}

//PROFILE SUSPEND--------------------------------------------------
async function suspendProfile(username) {
    const response = await fetch('/myapp/SuspendProfileBoundary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${encodeURIComponent(username)}`
    });

    if (response.ok) {
        alert('Profile suspended successfully');
    } else {
        alert('Failed to suspend profile');
    }

    // Refresh the profile list
    displayProfiles();
}

//PROFILE UNSUSPEND--------------------------------------------------
async function unsuspendProfile(username) {
    const response = await fetch('/myapp/UnsuspendProfileBoundary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${encodeURIComponent(username)}`
    });

    if (response.ok) {
        alert('Profile unsuspended successfully');
    } else {
        alert('Failed to unsuspend profile');
    }

    // Refresh the profile list
    displayProfiles();
}




//Buttons USERACCOUNT
document.getElementById('logoutBtn').addEventListener('click', logout);

document.getElementById('createUserBtn').addEventListener('click', function() {
    document.getElementById('addUserForm').style.display = 'block';
});

document.getElementById('addUserSubmitButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    createUser();
});

//document.getElementById('viewUsersBtn').addEventListener('click', displayUsers());
document.getElementById('viewUsersBtn').addEventListener('click', function(event) {
    displayUsers();
});

document.getElementById('searchAccBtn').addEventListener('click', searchUsers);




//BUTTONSPROFIle--------------------------------------------------

document.getElementById('createProfileButton').addEventListener('click', function() {
    document.getElementById('addProfileForm').style.display = 'block';
});

document.getElementById('addProfileSubmitButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    createProfile();
});

document.getElementById('viewProfilesButton').addEventListener('click', function(event) {
    displayProfiles();
});

document.getElementById('searchProfileButton').addEventListener('click', searchProfiles);


function logout() {
    //clears session username
    sessionStorage.removeItem('username');
    window.location.href = "login.jsp";
}


