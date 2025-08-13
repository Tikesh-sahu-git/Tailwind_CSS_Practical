document.getElementById('subscribe-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const consentCheckbox = document.getElementById('consent');
    const buttonText = document.getElementById('button-text');
    const buttonSpinner = document.getElementById('button-spinner');
    const successMessage = document.getElementById('success-message');
    const subscribeForm = document.getElementById('subscribe-form');
    
    // Reset error states
    emailError.classList.add('hidden');
    emailInput.classList.remove('border-red-500');
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailInput.classList.add('border-red-500');
        emailError.classList.remove('hidden');
        return;
    }
    
    // Validate consent
    if (!consentCheckbox.checked) {
        alert('Please agree to receive emails');
        return;
    }
    
    // Show loading state
    buttonText.textContent = 'Subscribing...';
    buttonSpinner.classList.remove('hidden');
    
    // Simulate API call
    setTimeout(() => {
        // Hide form and show success message
        subscribeForm.classList.add('hidden');
        successMessage.classList.remove('hidden');
        
        // Reset form (for demo purposes)
        setTimeout(() => {
            subscribeForm.reset();
            subscribeForm.classList.remove('hidden');
            successMessage.classList.add('hidden');
            buttonText.textContent = 'Subscribe';
            buttonSpinner.classList.add('hidden');
        }, 5000);
    }, 1500);
});
