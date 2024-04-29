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