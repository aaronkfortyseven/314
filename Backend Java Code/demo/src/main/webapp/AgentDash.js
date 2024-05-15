// current session's username
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
    const filteredProperties = properties.filter(property => property.title.trim().toLowerCase().includes(searchValue));
    
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
            <button onclick="removeProperty('${property.title}')">Remove</button>
            <button onclick="showUpdatePropertyForm('${property.title}')">Update</button>
        `;

        dashboard.appendChild(propertyDiv);
    });
}

// REMOVE
async function removeProperty(title) {
    const confirmed = confirm("Are you sure you want to remove this property?");
    if (confirmed) {
        try {
            const response = await fetch(`/myapp/RemovePropertyBoundary?username=${encodeURIComponent(username)}&propertyTitle=${encodeURIComponent(title)}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const propertyDivs = document.querySelectorAll('.property');
                propertyDivs.forEach(propertyDiv => {
                    const propertyTitle = propertyDiv.querySelector('h2').textContent;
                    if (propertyTitle === title) {
                        propertyDiv.remove();
                    }
                });
            } else {
                throw new Error('Failed to remove property.');
            }
        } catch (error) {
            alert(error.message);
        }
    }
}

// ADD
function showAddPropertyForm() {
    document.getElementById('addPropertyForm').style.display = 'block';
}

async function addProperty(event) {
    event.preventDefault(); // Prevent default form submission
    const newProperty = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        location: document.getElementById('location').value,
        status: document.getElementById('status').value, // Get selected status from dropdown
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
        document.getElementById('addPropertyForm').style.display = 'none';
        displayProperties();
    } else {
        alert('Failed to add property.');
    }
}

// UPDATE
async function showUpdatePropertyForm(title) {
    // Fetch the data for the specific property
    const response = await fetch(`/myapp/ViewPropertyBoundary?username=${username}&propertyTitle=${encodeURIComponent(title)}`);
    const property = await response.json();

    // Pre-fill the form with the current property values
    document.getElementById('updateTitle').value = property.title;
    document.getElementById('updateDescription').value = property.description;
    document.getElementById('updatePrice').value = property.price;
    document.getElementById('updateLocation').value = property.location;
    document.getElementById('updateStatus').value = property.status;
    document.getElementById('updateAgent').value = property.agent;

    // Show the form
    document.getElementById('updatePropertyForm').style.display = 'block';
}

async function updateProperty(event) {
    event.preventDefault(); // Prevent default form submission
    const updatedProperty = {
        title: document.getElementById('updateTitle').value,
        description: document.getElementById('updateDescription').value,
        price: document.getElementById('updatePrice').value,
        location: document.getElementById('updateLocation').value,
        status: document.getElementById('updateStatus').value,
        agent: document.getElementById('updateAgent').value,
    };

    const response = await fetch(`/myapp/UpdatePropertyBoundary?username=${encodeURIComponent(username)}&propertyTitle=${encodeURIComponent(updatedProperty.title)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProperty),
    });

    if (response.ok) {
        document.getElementById('updatePropertyForm').style.display = 'none';
        displayProperties();
    } else {
        alert('Failed to update property.');
    }
}

function logout() {
    // clears session username
    sessionStorage.removeItem('username');
    window.location.href = "login.jsp";
}

// Display initial properties on page load
document.addEventListener('DOMContentLoaded', (event) => {
    displayProperties();

    // Event listeners
    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('searchBtn').addEventListener('click', searchProperties);
    document.getElementById('viewAllPropertiesBtn').addEventListener('click', displayProperties);
    document.getElementById('addPropertyBtn').addEventListener('click', showAddPropertyForm);
    document.getElementById('reviewsBtn').addEventListener('click', function() {
        window.location.href = 'PersonalReviews.html';
    });
    document.getElementById('addSubmitButton').addEventListener('click', addProperty);
    document.getElementById('updateSubmitButton').addEventListener('click', updateProperty);

    const username = sessionStorage.getItem('username');
    if (username) {
        document.getElementById('backToDashboard').style.display = 'inline';
    }
    if (username) {
        document.getElementById('loginLink').style.display = 'none';
    }
});
