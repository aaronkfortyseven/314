// FETCH from the server
async function fetchProperties() {
    const response = await fetch(`/myapp/ViewAllBoundary`); // Removed username from the URL
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
// DISPLAY
async function displayProperties(properties) {
    console.log('displayProperties called');
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = ''; // Clear existing content
    
    // If no properties are passed to the function, fetch all properties
    if (!properties) {
        properties = await fetchProperties();
    }

    properties.forEach(property => {
        const propertyDiv = document.createElement('div');
        propertyDiv.classList.add('property');

        propertyDiv.innerHTML = `
            <h2>${property.title}</h2>
            <p>Description: ${property.description}</p>
            <p>Price: ${property.price}</p>
            <p>Status: ${property.status}</p>
        `;

        dashboard.appendChild(propertyDiv);
    });
}

displayProperties();


document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Search button called');
    document.getElementById('searchBtn').addEventListener('click', searchProperties);
});