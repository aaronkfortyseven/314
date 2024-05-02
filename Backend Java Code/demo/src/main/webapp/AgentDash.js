//current session's username
const username = sessionStorage.getItem('username');

// Function to fetch properties from the server
async function fetchProperties() {
    console.log('fetchProperties called');
    const response = await fetch(`/myapp/ViewPropertyBoundary?username=${username}`);
    const properties = await response.json();
    console.log(properties);
    return properties;
}

// Function to display properties on the dashboard
async function displayProperties() {
    console.log('displayProperties called');
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = ''; // Clear existing content
    
    const properties = await fetchProperties();

    properties.forEach(property => {
        const propertyDiv = document.createElement('div');
        propertyDiv.classList.add('property');

        propertyDiv.innerHTML = `
            <h2>${property.title}</h2>
            <p>Description: ${property.description}</p>
            <p>Price: ${property.price}</p>
            <p>Status: ${property.status}</p>
            <button onclick="removeProperty('${property.title}')">Remove</button>
            <button onclick="updateProperty('${property.title}')">Update</button>
        `;

        dashboard.appendChild(propertyDiv);
    });
}

// Function to search properties based on title
async function searchProperties() {
    const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
    const properties = await fetchProperties();
    const filteredProperties = properties.filter(property => property.title.toLowerCase().startsWith(searchValue));
    
    if (filteredProperties.length > 0) {
        displayProperties(filteredProperties); // Display only the found properties
    } else {
        alert("Property not found.");
        displayProperties();
    }
}

// Function to remove a property
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

// Function to show the add property form
function showAddPropertyForm() {
    document.getElementById('addPropertyForm').style.display = 'block';
    document.getElementById('submitButton').addEventListener('click', addProperty);
}

// ADD a new property
async function addProperty(event) {


    const newProperty = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        location: document.getElementById('location').value,
        type: document.getElementById('type').value,
        agent: document.getElementById('agent').value,
    };

    const response = await fetch(`/myapp/CreatePropertyBoundary?username=${encodeURIComponent(username)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProperty),
    });

    if (response.ok) {
        displayProperties();
    } else {
        alert('Failed to add property.');
    }
}

function logout() {
    //clears session username
    sessionStorage.removeItem('username');
    window.location.href = "login.jsp";
}

// Display initial properties on page load
displayProperties();

// Event listener for logout button
document.getElementById('logoutBtn').addEventListener('click', logout);

// Event listener for search button
document.getElementById('searchBtn').addEventListener('click', searchProperties);

// Event listener for view all properties button
document.getElementById('viewAllPropertiesBtn').addEventListener('click', function() {
    displayProperties();
});

// Event listener for add property button
document.getElementById('addPropertyBtn').addEventListener('click', showAddPropertyForm);

