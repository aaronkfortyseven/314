//current session's username
const username = sessionStorage.getItem('username');

document.getElementById('searchButton').addEventListener('click', async () => {
    const searchUsername = document.getElementById('searchBar').value;
    if (searchUsername) {
        const reviews = await fetchReviews(searchUsername);
        displayReviews(reviews);
        displayAverageRating(searchUsername);
    }
});

// FETCH from the server
async function fetchReviews(username) {
    const response = await fetch(`/myapp/ViewReviewBoundary?username=${username}`);
    const reviews = await response.json();
    return reviews;
}

// DISPLAY
async function displayReviews(filteredReviews = null) {
    const dashboard = document.getElementById('reviews');
    dashboard.innerHTML = ''; // Clear existing content
    
    const reviews = filteredReviews ? filteredReviews : await fetchReviews(username);

    if (reviews.length === 0) {
        dashboard.textContent = 'No reviews retrieved.';
        return;
    }

    reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review'; 
        reviewDiv.textContent = review; // Add the review text to the div
        dashboard.appendChild(reviewDiv); // Append the div to the dashboard
    });
}

// FETCH from the server
async function fetchAverageRating(username) {
    const response = await fetch(`/myapp/ViewRatingBoundary?username=${username}`);
    const averageRating = await response.json();
    return averageRating;
}

// DISPLAY
async function displayAverageRating(username) {
    const dashboard = document.getElementById('averageRating');
    dashboard.innerHTML = ''; // Clear existing content
    
    const averageRating = await fetchAverageRating(username);

    if (averageRating === null) {
        dashboard.textContent = 'No average rating retrieved.';
        return;
    }

    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'averageRating';
    ratingDiv.textContent = `Average Rating: ${averageRating.toFixed(2)}`; // Display the average rating
    dashboard.appendChild(ratingDiv); // Append the div to the dashboard
}



displayReviews();

displayAverageRating(username);

