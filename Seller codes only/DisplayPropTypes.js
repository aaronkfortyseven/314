// Function to display types of properties sold
function displayPropertyTypes() {
    const propertyTypes = new Set(propertiesSold.map(property => property.type));
    
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = ""; // Clear existing content
    
    const propertyTypesList = document.createElement('ul');
    propertyTypesList.classList.add('property-types-list');
    
    propertyTypes.forEach(type => {
        const typeItem = document.createElement('li');
        typeItem.textContent = type;
        propertyTypesList.appendChild(typeItem);
    });
    
    dashboard.appendChild(propertyTypesList);
}
