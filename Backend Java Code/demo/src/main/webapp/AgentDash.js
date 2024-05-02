//current session's username
const username = sessionStorage.getItem('username');

// Function to fetch properties from the server
async function fetchProperties() {
    const response = await fetch(`/myapp/AgentBoundary?username=${username}`);
    const properties = await response.json();
    console.log(properties);
    return properties;
}

// Function to display properties on the dashboard
async function displayProperties() {
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
        displayProperties(); // Display all properties if no match is found
    }
}

// Function to remove a property
async function removeProperty(title) {
    const response = await fetch(`/myapp/AgentBoundary?username=${encodeURIComponent(username)}&propertyTitle=${encodeURIComponent(title)}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        // If the server responds with a success status, remove the property from the page
        const propertyDiv = document.querySelector(`div.property:contains('${title}')`);
        propertyDiv.remove();
    } else {
        alert('Failed to remove property.');
    }
}

// Function to add a new property
async function addProperty() {
    const newProperty = {
        title: 'New Property',
        description: 'This is a new property.',
        price: 100000,
        status: 'For Sale',
        // Add other property details here
    };

    const response = await fetch(`/myapp/AgentBoundary`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProperty),
    });

    if (response.ok) {
        // If the server responds with a success status, add the new property to the page
        displayProperties();
    } else {
        alert('Failed to add property.');
    }
}

// Sample function to simulate logout
function logout() {
    //clears session username
    sessionStorage.removeItem('username');
    // Redirect the user to the login page
    window.location.href = "login.jsp";
}

// Event listener for logout button
document.getElementById('logoutBtn').addEventListener('click', logout);

// Event listener for add property button
document.getElementById('addPropertyBtn').addEventListener('click', addProperty);

// Event listener for search button
document.getElementById('searchBtn').addEventListener('click', searchProperties);

// Event listener for view all properties button
document.getElementById('viewAllPropertiesBtn').addEventListener('click', function() {
    displayProperties(); // Display all properties
});

// Display initial properties on page load
displayProperties();