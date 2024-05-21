document.addEventListener('DOMContentLoaded', () => {
    
    // FETCH from the server
    async function fetchProperties() {
        const username = sessionStorage.getItem('username');
        const response = await fetch(`/myapp/ViewPropertyBoundary?username=${username}`);
        const properties = await response.json();
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
        try {
            const dashboard = document.getElementById('dashboard');
            dashboard.innerHTML = ''; // Clear existing content
            
            const properties = filteredProperties ? filteredProperties : await fetchProperties();
    
            if (!Array.isArray(properties)) {
                console.error("Properties is not an array.");
                return; // Exit the function if properties is not an array
            }
    
            properties.forEach(property => {
                const propertyDiv = document.createElement('div');
                propertyDiv.classList.add('property');
    
                propertyDiv.innerHTML = `
                    <h2>${property.title}</h2>
                    <p>Description: ${property.description}</p>
                    <p>Price: ${property.price}</p>
                    <p>Status: ${property.status}</p>
                    <button class="remove-btn">Remove</button>
                    <button class="update-btn">Update</button>
                `;
                
                dashboard.appendChild(propertyDiv);
    
                // Attach event listener to the remove button
                propertyDiv.querySelector('.remove-btn').addEventListener('click', () => {
                    // Ask for confirmation before removing
                    const confirmRemoval = window.confirm("Are you sure you want to remove this property?");
                    if (confirmRemoval) {
                        removeProperty(property.title);
                    }
                });
    
                // Attach event listener to the update button
                propertyDiv.querySelector('.update-btn').addEventListener('click', () => {
                    showUpdatePropertyForm(property.title);
                });
            });
        } catch (error) {
            console.error(error);
            alert('Failed to display properties: ' + error.message);
        }
    }
    



    // REMOVE
    async function removeProperty(title) {
        try {
            const username = sessionStorage.getItem('username');
            if (!username) {
                throw new Error('User not authenticated.');
            }

            const response = await fetch(`/myapp/RemovePropertyBoundary?username=${encodeURIComponent(username)}&propertyTitle=${encodeURIComponent(title)}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to remove property. Server returned ' + response.status + ' ' + response.statusText);
            }

            // Refresh the list of properties after removal
            const properties = await fetchProperties();
            displayProperties(properties);
        } catch (error) {
            console.error(error);
            alert('Failed to remove property: ' + error.message);
        }
    }


    // ADD
    async function addProperty(event) {
        try {
            event.preventDefault(); // Prevent default form submission
    
            // Get the current username from session storage
            const username = sessionStorage.getItem('username');
            if (!username) {
                throw new Error('User not authenticated.');
            }
    
            // Retrieve property data from the form
            const newProperty = {
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                price: document.getElementById('price').value,
                location: document.getElementById('location').value,
                status: document.getElementById('status').value,
                agent: document.getElementById('agent') ? document.getElementById('agent').value : '', // Check if agent field exists
            };
    
            // Make a POST request to add the property
            const response = await fetch(`/myapp/CreatePropertyBoundary?username=${encodeURIComponent(username)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProperty),
            });
    
            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Failed to add property. Server returned ' + response.status + ' ' + response.statusText);
            }
    
            // Clear the form fields after successful addition
            clearForm('addPropertyForm');
    
            // Refresh the list of properties
            const properties = await fetchProperties();
            displayProperties(properties);
    
            // Optionally, display a success message
            alert('Property added successfully.');
        } catch (error) {
            console.error(error);
            alert('Failed to add property: ' + error.message);
        }
    }
    
    
    function clearForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.reset(); // Reset the form fields
        }
    }
    
    // UPDATE
    // async function showUpdatePropertyForm(title) {
    //     try {
    //         const username = sessionStorage.getItem('username');
    //         const response = await fetch(`/myapp/ViewPropertyBoundary?username=${username}&propertyTitle=${encodeURIComponent(title)}`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch property details.');
    //         }
    
    //         const property = await response.json();
    //         console.log('Fetched property:', property);
    
    //         // // Fill the form fields with property details
    //         // document.getElementById('updateTitle').value = property.title || '';
    //         // document.getElementById('updateDescription').value = property.description || '';
    //         // document.getElementById('updatePrice').value = property.price || '';
    //         // document.getElementById('updateLocation').value = property.location || '';
    //         // document.getElementById('updateStatus').value = property.status || '';
    //         // document.getElementById('updateAgent').value = property.agent || '';

    //         // Also set the originalTitle field
    //         document.getElementById('originalTitle').value = property.title || '';
    //         console.log('Original title:', document.getElementById('originalTitle').value);
    
    //         // Show the form
    //         document.getElementById('updatePropertyForm').style.display = 'block';
    
    //         // Hide other forms
    //         document.getElementById('addPropertyForm').style.display = 'none';
    
    //         // // Set focus on the first input field
    //         // document.getElementById('updateTitle').focus();
    //     } catch (error) {
    //         console.error(error);
    //         alert('Failed to fetch property details.');
    //     }
    // }


    // // Function to update a property
    // async function updateProperty(event) {
    //     try {
    //         event.preventDefault(); // Prevent default form submission
    
    //         // Get the current username from session storage
    //         const username = sessionStorage.getItem('username');
    //         if (!username) {
    //             throw new Error('User not authenticated.');
    //         }
    
    //         // Retrieve updated property data from the form
    //         const originalTitle = document.getElementById('originalTitle').value;
    //         console.log('Sending original title:', originalTitle);
    //         const updatedProperty = {
    //             title: document.getElementById('updateTitle').value,
    //             description: document.getElementById('updateDescription').value,
    //             price: document.getElementById('updatePrice').value,
    //             location: document.getElementById('updateLocation').value,
    //             status: document.getElementById('updateStatus').value,
    //             agent: document.getElementById('updateAgent').value || '', // Use empty string if agent field is not available
    //         };
    
    //         // Make a POST request to update the property
    //         const response = await fetch(`/myapp/UpdatePropertyBoundary?username=${encodeURIComponent(username)}&propertyTitle=${encodeURIComponent(originalTitle)}`, {
    //             method: 'POST', // Change method to POST
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(updatedProperty),
    //         });
    
    //         // Check if the request was successful
    //         if (!response.ok) {
    //             throw new Error('Failed to update property. Server returned ' + response.status + ' ' + response.statusText);
    //         }
    
    //         // Clear the form fields after successful update
    //         clearForm('updatePropertyForm');
    //         // Hide the update form after successful update
    //         document.getElementById('updatePropertyForm').style.display = 'none';
    
    //         // Optionally, display a success message
    //         alert('Property updated successfully.');
    
    //         // Refresh the list of properties
    //         displayProperties();
    //     } catch (error) {
    //         console.error(error);
    //         alert('Failed to update property: ' + error.message);
    //     }
    // }
    
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



    function showAddPropertyForm() {
        document.getElementById('addPropertyForm').style.display = 'block';
    }

    function logout() {
        // clears session username
        sessionStorage.removeItem('username');
        window.location.href = "login.jsp";
    }

    // Display initial properties on page load
    displayProperties();

    // Event listeners
    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('searchBtn').addEventListener('click', searchProperties);
    // Event listener for the "View All Properties" button
document.getElementById('viewAllPropertiesBtn').addEventListener('click', async () => {
    try {
        // Call displayProperties without any filters to display all properties
        await displayProperties();
    } catch (error) {
        console.error(error);
        alert('Failed to display all properties: ' + error.message);
    }
});

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