// ========================================
// PART 1: EVENT HANDLING DEMONSTRATIONS
// ========================================

// 1. Click Counter Functionality
// Demonstrates click events and state management
let counter = 0;
const counterDisplay = document.getElementById('counterDisplay');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');

// Update counter display
function updateCounter() {
    counterDisplay.textContent = counter;
    // Add animation class
    counterDisplay.classList.add('pulse');
    setTimeout(() => counterDisplay.classList.remove('pulse'), 300);
}

// Increment button click event
incrementBtn.addEventListener('click', () => {
    counter++;
    updateCounter();
});

// Decrement button click event
decrementBtn.addEventListener('click', () => {
    counter--;
    updateCounter();
});

// Reset button click event
resetBtn.addEventListener('click', () => {
    counter = 0;
    updateCounter();
});

// 2. Hover and Mouse Events
// Demonstrates mouseenter, mouseleave, and mousemove events
const hoverBox = document.getElementById('hoverBox');
const hoverStatus = document.getElementById('hoverStatus');

hoverBox.addEventListener('mouseenter', () => {
    hoverStatus.textContent = '🎯 Mouse entered the box!';
    hoverStatus.style.color = '#10b981';
});

hoverBox.addEventListener('mouseleave', () => {
    hoverStatus.textContent = '👋 Mouse left the box!';
    hoverStatus.style.color = '#ef4444';
});

hoverBox.addEventListener('mousemove', (e) => {
    // Show coordinates relative to the box
    const rect = hoverBox.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    hoverBox.querySelector('p').textContent = `Position: (${x}, ${y})`;
});

// 3. Keyboard Events
// Demonstrates keyup events and real-time input processing
const keyboardInput = document.getElementById('keyboardInput');
const keyboardDisplay = document.getElementById('keyboardDisplay');

keyboardInput.addEventListener('keyup', (e) => {
    const value = e.target.value;
    const keyPressed = e.key;
    
    keyboardDisplay.innerHTML = `
        <strong>Last key:</strong> ${keyPressed} | 
        <strong>Character count:</strong> ${value.length} | 
        <strong>Word count:</strong> ${value.trim().split(/\s+/).filter(w => w).length}
    `;
});

// ========================================
// PART 2: INTERACTIVE COMPONENTS
// ========================================

// 1. Theme Toggle (Light/Dark Mode)
// Demonstrates class manipulation and localStorage (stored in memory here)
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
let isDarkMode = false;

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    
    // Update icon
    themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
    
    // Add click animation
    themeToggle.classList.add('spin');
    setTimeout(() => themeToggle.classList.remove('spin'), 500);
});

// 2. Tabbed Interface
// Demonstrates event delegation and content switching
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding panel
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// 3. Collapsible FAQ
// Demonstrates toggle functionality and smooth transitions
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = question.nextElementSibling;
        const icon = question.querySelector('.faq-icon');
        
        // Toggle active state
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-icon').textContent = '+';
        });
        
        // If it wasn't active, open it
        if (!isActive) {
            faqItem.classList.add('active');
            icon.textContent = '−';
        }
    });
});

// ========================================
// PART 3: FORM VALIDATION
// ========================================

const form = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');

// Validation functions with regex patterns

// Validate full name (at least 2 words, letters only)
function validateName(name) {
    const namePattern = /^[A-Za-z]+\s+[A-Za-z]+.*$/;
    return {
        isValid: namePattern.test(name.trim()) && name.trim().length >= 3,
        message: 'Please enter your full name (first and last name)'
    };
}

// Validate email format
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
        isValid: emailPattern.test(email),
        message: 'Please enter a valid email address'
    };
}

// Validate phone number (various formats accepted)
function validatePhone(phone) {
    const phonePattern = /^[\d\s\-\(\)]+$/;
    const digitsOnly = phone.replace(/\D/g, '');
    return {
        isValid: phonePattern.test(phone) && digitsOnly.length >= 10,
        message: 'Please enter a valid phone number (at least 10 digits)'
    };
}

// Validate password strength
function validatePassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 8;
    
    return {
        isValid: hasUpperCase && hasLowerCase && hasNumber && hasMinLength,
        message: 'Password must be 8+ characters with uppercase, lowercase, and number'
    };
}

// Validate age
function validateAge(age) {
    const ageNum = parseInt(age);
    return {
        isValid: ageNum >= 13 && ageNum <= 120,
        message: 'Age must be between 13 and 120'
    };
}

// Show error message for a field
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    inputElement.classList.add('error');
}

// Clear error message for a field
function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);
    
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    inputElement.classList.remove('error');
    inputElement.classList.add('success');
}

// Real-time validation on input blur
const formInputs = ['fullName', 'email', 'phone', 'password', 'confirmPassword', 'age'];

formInputs.forEach(fieldId => {
    const input = document.getElementById(fieldId);
    
    // Validate on blur (when user leaves the field)
    input.addEventListener('blur', () => {
        validateField(fieldId);
    });
    
    // Clear error on focus
    input.addEventListener('focus', () => {
        clearError(fieldId);
        input.classList.remove('success');
    });
});

// Validate individual field
function validateField(fieldId) {
    const input = document.getElementById(fieldId);
    const value = input.value.trim();
    
    if (!value) {
        showError(fieldId, 'This field is required');
        return false;
    }
    
    let validation;
    
    switch(fieldId) {
        case 'fullName':
            validation = validateName(value);
            break;
        case 'email':
            validation = validateEmail(value);
            break;
        case 'phone':
            validation = validatePhone(value);
            break;
        case 'password':
            validation = validatePassword(value);
            break;
        case 'confirmPassword':
            const password = document.getElementById('password').value;
            validation = {
                isValid: value === password,
                message: 'Passwords do not match'
            };
            break;
        case 'age':
            validation = validateAge(value);
            break;
        default:
            return true;
    }
    
    if (!validation.isValid) {
        showError(fieldId, validation.message);
        return false;
    } else {
        clearError(fieldId);
        return true;
    }
}

// Form submission handler
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Clear all previous errors
    formInputs.forEach(fieldId => {
        document.getElementById(fieldId).classList.remove('error', 'success');
    });
    
    // Validate all fields
    let isFormValid = true;
    
    formInputs.forEach(fieldId => {
        if (!validateField(fieldId)) {
            isFormValid = false;
        }
    });
    
    // Validate terms checkbox
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        document.getElementById('termsError').textContent = 'You must agree to the terms';
        document.getElementById('termsError').style.display = 'block';
        isFormValid = false;
    } else {
        document.getElementById('termsError').style.display = 'none';
    }
    
    // If form is valid, show success message
    if (isFormValid) {
        form.style.display = 'none';
        successMessage.classList.remove('hidden');
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Log form data (in real app, this would be sent to server)
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            age: document.getElementById('age').value
        };
        console.log('Form submitted successfully:', formData);
        
        // Reset form after 3 seconds (for demo purposes)
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMessage.classList.add('hidden');
        }, 3000);
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Add animation class helper
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Interactive Web Page Loaded Successfully!');
    console.log('All event listeners are active and ready.');
});
