// Kickball Home - Interactive Functionality

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize website functionality
function initializeWebsite() {
    loadSidebar();
    setupSidebarNavigation();
    setupModalFunctionality();
    console.log('Kickball Home website initialized successfully!');
}

// Load sidebar from external file
function loadSidebar() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        fetch('sidebar.html')
            .then(response => response.text())
            .then(html => {
                sidebarContainer.innerHTML = html;
                markActiveMenuItem();
            })
            .catch(error => {
                console.error('Error loading sidebar:', error);
            });
    }
}

// Mark active menu item based on current page
function markActiveMenuItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.classList.remove('active');
        const link = item.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
                item.classList.add('active');
                // Add active indicator if it's the active item
                if (!item.querySelector('.active-indicator')) {
                    const indicator = document.createElement('div');
                    indicator.className = 'active-indicator';
                    item.appendChild(indicator);
                }
            }
        }
    });
}

// Sidebar navigation functionality
function setupSidebarNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the menu text for logging
            const menuText = this.querySelector('.menu-text').textContent;
            console.log(`Navigated to: ${menuText}`);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Authentication buttons functionality
function setupAuthButtons() {
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            handleLoginClick();
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            handleRegisterClick();
        });
    }
}

// Handle login button click
function handleLoginClick() {
    console.log('Login button clicked!');
    
    // Add click animation
    const button = document.querySelector('.login-btn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
    
    // Show info message
    showInfoMessage('Redirecting to sign in page...');
    
    // Simulate navigation delay
    setTimeout(() => {
        showSuccessMessage('Sign in page opened!');
    }, 1500);
}

// Handle register button click
function handleRegisterClick() {
    console.log('Register button clicked!');
    
    // Add click animation
    const button = document.querySelector('.register-btn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
    
    // Show info message
    showInfoMessage('Redirecting to sign up page...');
    
    // Simulate navigation delay
    setTimeout(() => {
        showSuccessMessage('Sign up page opened!');
    }, 1500);
}

// Notification system
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

function showInfoMessage(message) {
    showNotification(message, 'info');
}

function showErrorMessage(message) {
    showNotification(message, 'error');
}

// Create and show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set notification content based on type
    let icon, backgroundColor, borderColor;
    
    switch(type) {
        case 'success':
            icon = 'fas fa-check-circle';
            backgroundColor = 'rgba(16, 185, 129, 0.9)';
            borderColor = '#10B981';
            break;
        case 'error':
            icon = 'fas fa-exclamation-circle';
            backgroundColor = 'rgba(239, 68, 68, 0.9)';
            borderColor = '#EF4444';
            break;
        default:
            icon = 'fas fa-info-circle';
            backgroundColor = 'rgba(59, 130, 246, 0.9)';
            borderColor = '#3B82F6';
    }
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: ${backgroundColor};
        color: white;
        padding: 15px 20px;
        border-radius: 15px;
        border: 2px solid ${borderColor};
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        backdrop-filter: blur(20px);
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add notification content styles
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    `;
    
    // Add close button styles
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease;
    `;
    
    // Add hover effect to close button
    closeButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });
    
    closeButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
    });
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize for responsive design
window.addEventListener('resize', debounce(function() {
    console.log('Window resized, updating layout...');
    // Add any responsive adjustments here if needed
}, 250));

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close notifications
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
    
    // Enter key to activate focused elements
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement && (focusedElement.classList.contains('login-btn') || focusedElement.classList.contains('register-btn'))) {
            focusedElement.click();
        }
    }
});

// Add focus management for accessibility
function setupAccessibility() {
    const interactiveElements = document.querySelectorAll('.menu-item, .login-btn, .register-btn');
    
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Initialize accessibility features
setupAccessibility();

// Export functions for global access
window.showSuccessMessage = showSuccessMessage;
window.showInfoMessage = showInfoMessage;
window.showErrorMessage = showErrorMessage;

// Blog image functionality
function setupBlogImage() {
    const blogImage = document.querySelector('.blog-image img');
    const placeholder = document.querySelector('.blog-image-placeholder');
    
    if (blogImage && placeholder) {
        // Check if image loads successfully
        blogImage.addEventListener('load', function() {
            placeholder.style.display = 'none';
        });
        
        // If image fails to load, show placeholder
        blogImage.addEventListener('error', function() {
            this.style.display = 'none';
            placeholder.style.display = 'flex';
        });
    }
}

// Modal functionality
function setupModalFunctionality() {
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('auth-modal') || event.target.classList.contains('form-modal')) {
            closeAllModals();
        }
    });
    
    // Setup form submissions
    setupFormSubmissions();
}

// Open authentication options modal
function openAuthOptions() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close authentication options modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Open login form modal
function openLoginForm() {
    closeAuthModal();
    const modal = document.getElementById('loginModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close login form modal
function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Open register form modal
function openRegisterForm() {
    closeAuthModal();
    const modal = document.getElementById('registerModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close register form modal
function closeRegisterModal() {
    const modal = document.getElementById('registerModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}



// Close all modals
function closeAllModals() {
    const modals = document.querySelectorAll('.auth-modal, .form-modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Setup form submissions
function setupFormSubmissions() {
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    const googleLoginBtn = document.querySelector('.google-login-btn');
    const googleRegisterBtn = document.querySelector('.google-register-btn');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLoginFormSubmission();
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegisterFormSubmission();
        });
    }
    
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function() {
            handleGoogleLogin();
        });
    }
    
    if (googleRegisterBtn) {
        googleRegisterBtn.addEventListener('click', function() {
            handleGoogleRegister();
        });
    }
}

// Handle login form submission
function handleLoginFormSubmission() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.querySelector('input[name="remember"]').checked;
    
    console.log('Login form submitted:', { email, password, remember });
    
    // Add submit animation
    const submitBtn = document.querySelector('.login-submit-btn');
    submitBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        submitBtn.style.transform = '';
    }, 200);
    
    // Show success message
    showSuccessMessage('Signing in...');
    
    // Simulate login process
    setTimeout(() => {
        showSuccessMessage('Successfully signed in!');
        closeLoginModal();
    }, 2000);
}

// Handle register form submission
function handleRegisterFormSubmission() {
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    
    console.log('Register form submitted:', { username, email, password, confirmPassword });
    
    // Add submit animation
    const submitBtn = document.querySelector('.register-submit-btn');
    submitBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        submitBtn.style.transform = '';
    }, 200);
    
    // Show success message
    showSuccessMessage('Creating account...');
    
    // Simulate registration process
    setTimeout(() => {
        showSuccessMessage('Account created successfully!');
        closeRegisterModal();
    }, 2000);
}

// Handle Google login
function handleGoogleLogin() {
    console.log('Google login clicked!');
    
    // Add click animation
    const button = document.querySelector('.google-login-btn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
    
    // Show info message
    showInfoMessage('Redirecting to Google sign in...');
    
    // Simulate Google login process
    setTimeout(() => {
        showSuccessMessage('Successfully signed in with Google!');
        closeLoginModal();
    }, 2500);
}

// Handle Google register
function handleGoogleRegister() {
    console.log('Google register clicked!');
    
    // Add click animation
    const button = document.querySelector('.google-register-btn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
    
    // Show info message
    showInfoMessage('Redirecting to Google sign up...');
    
    // Simulate Google registration process
    setTimeout(() => {
        showSuccessMessage('Successfully signed up with Google!');
        closeRegisterModal();
    }, 2500);
}
