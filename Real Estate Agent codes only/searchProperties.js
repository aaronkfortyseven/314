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
