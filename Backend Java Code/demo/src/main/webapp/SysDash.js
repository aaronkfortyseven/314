// FETCH from the server
async function fetchUsers() {
    const response = await fetch(`/myapp/ViewUserBoundary`);
    const users = await response.json();
    console.log(users);
    return users;
}

// SEARCH
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

//ADD USER ACCOUNT
async function createUser(event) {
    const newUser = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        role: document.getElementById('role').value,
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






function logout() {
    //clears session username
    sessionStorage.removeItem('username');
    window.location.href = "login.jsp";
}

//Buttons
document.getElementById('logoutBtn').addEventListener('click', logout);

document.getElementById('createUserBtn').addEventListener('click', function() {
    document.getElementById('addUserForm').style.display = 'block';
});

document.getElementById('addUserSubmitButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    createUser();
});

document.getElementById('viewUsersBtn').addEventListener('click', displayUsers);

document.getElementById('searchAccBtn').addEventListener('click', searchUsers);
