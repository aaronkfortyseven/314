// Function to fetch seller's listings
function fetchListings() {
    // Replace this with actual fetching logic
    // For now, let's assume we have a sample data
    const sampleListings = [
        { id: 1, title: "Property 1", views: 100, shortlists: 20 },
        { id: 2, title: "Property 2", views: 80, shortlists: 15 },
        { id: 3, title: "Property 3", views: 120, shortlists: 25 }
    ];
    
    // Render listings on the dashboard
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = ""; // Clear existing content
    
    sampleListings.forEach(property => {
        const propertyElement = document.createElement('div');
        propertyElement.classList.add('property');
        propertyElement.innerHTML = `
            <h2>${property.title}</h2>
            <p>Views: ${property.views}</p>
            <p>Shortlists: ${property.shortlists}</p>
        `;
        dashboard.appendChild(propertyElement);
    });
}
