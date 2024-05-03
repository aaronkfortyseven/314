//current session's username
const username = sessionStorage.getItem('username');

// FETCH from the server
async function fetchProperties() {
    console.log('fetchProperties called');
    const response = await fetch(`/myapp/ViewPropertyBoundary?username=${username}`);
    const properties = await response.json();
    console.log(properties);
    return properties;
}

// DISPLAY
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
            <button onclick="showUpdatePropertyForm('${property.title}')">Update</button>

        `;

        dashboard.appendChild(propertyDiv);
    });
}

// SEARCH - !! doesn't filter out irrelavant searches
async function searchProperties() {
    const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
    const properties = await fetchProperties();
    const filteredProperties = properties.filter(property => property.title.toLowerCase().includes(searchValue));
    
    if (filteredProperties.length > 0) {
        displayProperties(filteredProperties); // Display only the found properties
    } else {
        alert("Property not found.");
        displayProperties();
    }
}

// REMOVE
async function removeProperty(title) {
    const response = await fetch(`/myapp/RemovePropertyBoundary?username=${encodeURIComponent(username)}&propertyTitle=${encodeURIComponent(title)}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const propertyDivs = document.querySelectorAll('div.property');
        const propertyDiv = Array.from(propertyDivs).find(div => div.textContent.includes(title));

        if (propertyDiv) {
            propertyDiv.remove();
            displayProperties();
        } else {
            alert('Failed to remove property.');
        }
    } else {
        alert('Failed to remove property.');
    }
}


// ADD - !!status field is bugged
function showAddPropertyForm() {
    document.getElementById('addPropertyForm').style.display = 'block';
    document.getElementById('addSubmitButton').addEventListener('click', function(event) {
        event.preventDefault();
        addProperty();
    });
}

async function addProperty(event) {


    const newProperty = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        location: document.getElementById('location').value,
        type: document.getElementById('status').value,
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
        document.getElementById('addPropertyForm').style.display = 'none';
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
    document.getElementById('title').value = property.title;
    document.getElementById('description').value = property.description;
    document.getElementById('price').value = property.price;
    document.getElementById('location').value = property.location;
    document.getElementById('status').value = property.status;
    document.getElementById('agent').value = property.agent;

    // Show the form
    document.getElementById('updatePropertyForm').style.display = 'block';

    // Add an event listener to the submit button
    document.getElementById('updateSubmitButton').addEventListener('click', function(event) {
        event.preventDefault();
        updateProperty(title);
    });
}

async function updateProperty(title) {
    const updatedProperty = {
        title: document.getElementById('updateTitle').value,
        description: document.getElementById('updateDescription').value,
        price: document.getElementById('updatePrice').value,
        location: document.getElementById('updateLocation').value,
        status: document.getElementById('updateStatus').value,
        agent: document.getElementById('updateAgent').value,
    };

    const response = await fetch(`/myapp/UpdatePropertyBoundary?username=${encodeURIComponent(username)}&propertyTitle=${encodeURIComponent(title)}`, {
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

//event listener for reviews
document.getElementById('reviewsBtn').addEventListener('click', function() {
    window.location.href = 'reviews.html';
});