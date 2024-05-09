//current session's username
const username = sessionStorage.getItem('username');

// change to search by name 7 may maybe just do it via front end drop down,
// where if they select john, username = agent_user
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



// SHOW ADD REVIEW FORM
function showAddReviewForm() {
    document.getElementById('reviewForm').style.display = 'block';
    document.getElementById('addReviewButton').addEventListener('click', function(event) {
        event.preventDefault();
        addReview();
    });
}

// ADD REVIEW
async function addReview() {
    const reviewText = document.getElementById('reviewText').value;
    const name = document.getElementById('agentName').value;

    const newReview = {
        name: name,
        review: reviewText,
    };

    console.log(`Adding review for agent: ${name}`); // Log the agent's name

    const response = await fetch(`/myapp/CreateReviewBoundary`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
    });

    if (response.ok) {
        console.log('Review added successfully.');
        document.getElementById('reviewForm').style.display = 'none';
        alert('Review added successfully.');
    } else {
        alert('Failed to add review.');
    }
}


async function addRating() {
    const ratingValue = document.querySelector('input[name="rating"]:checked').value;
    const name = document.getElementById('agentName').value;

    const newRating = {
        name: name,
        rating: parseFloat(ratingValue),
    };

    console.log(`Adding rating for agent: ${name}`); // Log the agent's name

    const response = await fetch(`/myapp/CreateRatingBoundary`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRating),
    });

    if (response.ok) {
        console.log('Rating added successfully.');
        document.getElementById('ratingForm').reset();
        alert('Rating added successfully.');
    } else {
        alert('Failed to add rating.');
    }
}


displayReviews();

displayAverageRating(username);

showAddReviewForm();


