// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling with confirmation message
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    
    const form = this;
    const button = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Change button state
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Send form data to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Create and show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert-success';
            successMessage.textContent = 'Message sent successfully!';
            successMessage.style.cssText = `
                background-color: #4CAF50;
                color: white;
                padding: 15px;
                margin-top: 10px;
                border-radius: 5px;
                text-align: center;
            `;
            
            form.appendChild(successMessage);
            form.reset(); // Reset form fields
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        // Create and show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert-error';
        errorMessage.textContent = 'Oops! Something went wrong. Please try again.';
        errorMessage.style.cssText = `
            background-color: #f44336;
            color: white;
            padding: 15px;
            margin-top: 10px;
            border-radius: 5px;
            text-align: center;
        `;
        
        form.appendChild(errorMessage);
        
        // Remove error message after 3 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 3000);
    })
    .finally(() => {
        // Reset button state
        button.textContent = 'Send Message';
        button.disabled = false;
    });
});

// Add animation to project cards on scroll
const observeElements = document.querySelectorAll('.project-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

observeElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});
