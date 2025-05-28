// focus the cursor on the email-address input
const emailField = document.getElementById("email-address-input");
emailField.focus({
  preventScroll: true,
});

// Store feedback in localStorage
let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create feedback object
    const feedback = {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
    };
    
    // Add to feedbacks array
    feedbacks.unshift(feedback);
    
    // Store in localStorage
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    
    // Update display
    displayFeedbacks();
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Show success message
    alert('Thank you for your feedback!');
    
    return false;
}

// Display feedbacks
function displayFeedbacks() {
    const feedbackList = document.getElementById('feedbackList');
    if (!feedbackList) return;
    
    feedbackList.innerHTML = feedbacks.map(feedback => `
        <div class="feedback-item">
            <h3>${feedback.subject}</h3>
            <p>${feedback.message}</p>
            <p><strong>${feedback.name}</strong></p>
            <div class="timestamp">${new Date(feedback.timestamp).toLocaleString()}</div>
        </div>
    `).join('');
}

// Display feedbacks when page loads
document.addEventListener('DOMContentLoaded', displayFeedbacks);
