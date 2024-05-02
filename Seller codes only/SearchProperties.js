// Function to search properties
function searchProperties() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredProperties = properties.filter(property => property.title.toLowerCase().includes(searchInput));
    
    // Render filtered properties on the dashboard
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = ""; // Clear existing content
    
    filteredProperties.forEach(property => {
        const propertyElement = document.createElement('div');
        propertyElement.classList.add('property');
        propertyElement.innerHTML = `
            <h2>${property.title}</h2>
        `;
        dashboard.appendChild(propertyElement);
    });
}
