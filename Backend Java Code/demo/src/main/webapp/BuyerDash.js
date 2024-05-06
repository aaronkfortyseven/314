//current session's username
const username = sessionStorage.getItem('username');

// FETCH from the server
async function fetchProperties() {
    const response = await fetch(`/myapp/ViewPropertyBoundary?username=${username}`);
    const properties = await response.json();
    console.log(properties);
    return properties;
}

// SEARCH
async function searchProperties() {
    const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
    const properties = await fetchProperties();
    const filteredProperties = properties.filter(property => property.title.trim().toLowerCase().startsWith(searchValue));
    
    if (filteredProperties.length > 0) {
        displayProperties(filteredProperties); // Display only the found properties
    } else {
        alert("Property not found.");
    }
}

// DISPLAY
async function displayProperties(filteredProperties = null) {
    console.log('displayProperties called');
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = ''; // Clear existing content
    
    const properties = filteredProperties ? filteredProperties : await fetchProperties();

    properties.forEach(property => {
        const propertyDiv = document.createElement('div');
        propertyDiv.classList.add('property');

        propertyDiv.innerHTML = `
            <h2>${property.title}</h2>
            <p>Description: ${property.description}</p>
            <p>Price: ${property.price}</p>
            <p>Status: ${property.status}</p>
            <button onclick="removeProperty('${property.title}')">Remove from saved</button>
        `;

        dashboard.appendChild(propertyDiv);
    });
}

// REMOVE
async function removeProperty(title) {
    const response = await fetch(`/myapp/RemovePropertyBoundary?username=${encodeURIComponent(username)}&propertyTitle=${encodeURIComponent(title)}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const propertyDiv = document.querySelector(`div.property:contains('${title}')`);
        propertyDiv.remove();
        displayProperties();
    } else {
        alert('Failed to remove property.');
    }
}

function logout() {
    //clears session username
    sessionStorage.removeItem('username');
    window.location.href = "login.jsp";
}

//Buttons
document.getElementById('logoutBtn').addEventListener('click', logout);

document.getElementById('searchBtn').addEventListener('click', searchProperties);

document.getElementById('viewAllPropertiesBtn').addEventListener('click', function() {
    displayProperties();
});

document.getElementById('reviewsBtn').addEventListener('click', function() {
    window.location.href = 'PersonalReviews.html';
});
