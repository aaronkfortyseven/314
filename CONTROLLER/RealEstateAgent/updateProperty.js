// Function to update property information based on query parameters
function updatePropertyFromQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const shouldUpdate = urlParams.get('update');

    if (shouldUpdate === 'true') {
        const id = parseInt(urlParams.get('id'));
        const newTitle = urlParams.get('newTitle');
        const newDescription = urlParams.get('newDescription');
        const newPrice = urlParams.get('newPrice');
        const newStatus = urlParams.get('newStatus');

        const property = properties.find(property => property.id === id);
        if (property) {
            property.title = newTitle;
            property.description = newDescription;
            property.price = newPrice;
            property.status = newStatus;
            displayProperties(); // Refresh dashboard
        } else {
            alert("Property not found.");
        }
    }
}

// Call function to update property information from query parameters
updatePropertyFromQueryParams();
