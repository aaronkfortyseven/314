// Sample properties data
let properties = [
    {
        id: 1,
        title: "Beautiful Home",
        description: "A stunning home with modern amenities.",
        price: "$500,000",
        status: "For Sale"
    },
    {
        id: 2,
        title: "Cozy Cottage",
        description: "Charming cottage in a peaceful neighborhood.",
        price: "$300,000",
        status: "Sold"
    },
    // Add more properties as needed
];

// Function to display properties on the dashboard
function displayProperties(filteredProperties = null) {
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = ''; // Clear existing content
    
    const propertiesToDisplay = filteredProperties ? filteredProperties : properties;

    propertiesToDisplay.forEach(property => {
        const propertyDiv = document.createElement('div');
        propertyDiv.classList.add('property');

        propertyDiv.innerHTML = `
            <h2>${property.title}</h2>
            <p>Description: ${property.description}</p>
            <p>Price: ${property.price}</p>
            <p>Status: ${property.status}</p>
            <button onclick="removeProperty(${property.id})">Remove</button>
            <button onclick="updateProperty(${property.id})">Update</button>
        `;

        dashboard.appendChild(propertyDiv);
    });
}

// Function to search properties based on title
function searchProperties() {
    const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
    const filteredProperties = properties.filter(property => property.title.toLowerCase().startsWith(searchValue));
    
    if (filteredProperties.length > 0) {
        displayProperties(filteredProperties); // Display only the found properties
    } else {
        alert("Property not found.");
        displayProperties(); // Display all properties if no match is found
    }
}


// Function to remove a property
function removeProperty(id) {
    const index = properties.findIndex(property => property.id === id);
    if (index !== -1) {
        // Prompt the user for confirmation
        const confirmation = confirm("Are you sure you want to remove this property?");
        if (confirmation) {
            properties.splice(index, 1);
            displayProperties(); // Refresh dashboard
        }
    }
}


// Function to update a property
function updateProperty(id) {
    // Redirect user to updateProperty.html with property id as query parameter
    window.location.href = `updateProperty.html?id=${id}`;
}


// Function to add a new property
function addProperty() {
    const newProperty = {
        id: properties.length + 1,
        title: "New Property",
        description: "Enter description here",
        price: "$0",
        status: "For Sale"
    };
    properties.push(newProperty);
    displayProperties(); // Refresh dashboard
}

// Sample function to simulate logout
function logout() {
    // Redirect the user to the login page
    window.location.href = "login.html";
}

// Function to redirect to the feedback page
function redirectToFeedbackPage() {
    // Redirect user to ReaFB.html page
    window.location.href = 'ReaFB.html';
}

// Event listener for view feedback button
document.getElementById('viewFeedbackBtn').addEventListener('click', redirectToFeedbackPage);

// Event listener for the "Back to Main" button
document.getElementById('backToMainBtn').addEventListener('click', function() {
    // Redirect the user to the main page (index.html)
    window.location.href = 'index.html';
});


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




