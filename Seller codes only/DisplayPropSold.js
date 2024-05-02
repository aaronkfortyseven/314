// Function to display properties sold
function displayPropertiesSold() {
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = ""; // Clear existing content
    
    propertiesSold.forEach(property => {
        const propertyItem = document.createElement('li');
        propertyItem.innerHTML = `
            <strong>${property.title}</strong> - ${property.price}
        `;
        dashboard.appendChild(propertyItem);
    });
}
