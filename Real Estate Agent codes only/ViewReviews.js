// Sample review data
const reviewData = [
    { name: 'John Doe', comment: 'Great agent, very professional.' },
    { name: 'Jane Smith', comment: 'Highly recommend this agent.' },
    // Add more review data as needed
];

// Function to display reviews
function displayReviews() {
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = '';

    reviewData.forEach(item => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.comment}</p>
            <hr>
        `;
        reviewsList.appendChild(reviewItem);
    });
}

// Event listener for go back button
document.getElementById('goBackBtn').addEventListener('click', function() {
    // Redirect the user back to the dashboard
    window.location.href = 'ReaLogin.html';
});

// Display reviews when the page loads
displayReviews();
