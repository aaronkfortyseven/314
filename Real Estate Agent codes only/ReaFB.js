// Sample feedback data
const feedbackData = [
    { name: 'John Doe', rating: 5, comment: 'Great agent, very professional.' },
    { name: 'Jane Smith', rating: 4, comment: 'Highly recommend this agent.' },
    // Add more feedback data as needed
];

// Function to display feedback
function displayFeedback() {
    const feedbackList = document.getElementById('feedbackList');
    feedbackList.innerHTML = '';

    feedbackData.forEach(item => {
        const feedbackItem = document.createElement('div');
        feedbackItem.classList.add('feedback-item');
        feedbackItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Rating: ${item.rating} Stars</p>
            <p>${item.comment}</p>
            <hr>
        `;
        feedbackList.appendChild(feedbackItem);
    });
}

// Event listener for go back button
document.getElementById('goBackBtn').addEventListener('click', function() {
    // Redirect the user back to the dashboard
    window.location.href = 'ReaLogin.html';
});

// Display feedback when the page loads
displayFeedback();
