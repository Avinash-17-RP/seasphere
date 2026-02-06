/* ================================
   TEAMWORK - Main JavaScript
   Frontend Interactivity & Form Handling
   ================================ */

// ================================
// DOM Ready
// ================================
document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  initializeForms();
  setActiveNavLink();
});

// ================================
// Set Active Navigation Link
// ================================
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ================================
// Initialize Event Listeners
// ================================
function initializeEventListeners() {
  // Task checkbox functionality
  const taskCheckboxes = document.querySelectorAll('input[type="checkbox"][style*="accent-color"]');
  taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const taskCard = this.closest('.task-card');
      if (taskCard) {
        if (this.checked) {
          taskCard.style.opacity = '0.6';
        } else {
          taskCard.style.opacity = '1';
        }
      }
    });
  });

  // Post action buttons
  const actionButtons = document.querySelectorAll('.action-btn');
  actionButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      handlePostAction(this);
    });
  });

  // Team card interactions
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-6px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// ================================
// Handle Post Actions
// ================================
function handlePostAction(button) {
  const action = button.textContent.trim();
  const postCard = button.closest('.post-card');
  
  if (action.includes('Like')) {
    button.style.color = 'var(--primary)';
    button.textContent = '👍 Liked';
    setTimeout(() => {
      button.style.color = 'var(--gray)';
      button.textContent = '👍 Like';
    }, 500);
  } else if (action.includes('Comment')) {
    alert('Comment feature coming soon!');
  } else if (action.includes('Share')) {
    alert('Share feature coming soon!');
  }
}

// ================================
// Form Initialization & Validation
// ================================
function initializeForms() {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const createTeamForm = document.getElementById('createTeamForm');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }

  if (signupForm) {
    signupForm.addEventListener('submit', handleSignupSubmit);
  }

  if (createTeamForm) {
    createTeamForm.addEventListener('submit', handleCreateTeamSubmit);
  }
}

// ================================
// Login Form Handler
// ================================
function handleLoginSubmit(e) {
  e.preventDefault();
  
  const email = this.querySelector('input[type="email"]').value;
  const password = this.querySelector('input[type="password"]').value;

  if (!validateEmail(email)) {
    showError(this.querySelector('input[type="email"]'), 'Please enter a valid email');
    return;
  }

  if (password.length < 6) {
    showError(this.querySelector('input[type="password"]'), 'Password must be at least 6 characters');
    return;
  }

  showSuccess(this, 'Login successful! Redirecting...');
  
  setTimeout(() => {
    // Simulate successful login
    console.log('User logged in:', { email, password });
    // Redirect would happen here
  }, 1500);
}

// ================================
// Signup Form Handler
// ================================
function handleSignupSubmit(e) {
  e.preventDefault();
  
  const firstName = this.querySelector('input[placeholder*="John"]').value;
  const lastName = this.querySelector('input[placeholder*="Doe"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const accountType = this.querySelector('select').value;
  const password = this.querySelectorAll('input[type="password"]')[0].value;
  const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;

  let isValid = true;

  if (!firstName.trim()) {
    showError(this.querySelector('input[placeholder*="John"]'), 'First name is required');
    isValid = false;
  }

  if (!lastName.trim()) {
    showError(this.querySelector('input[placeholder*="Doe"]'), 'Last name is required');
    isValid = false;
  }

  if (!validateEmail(email)) {
    showError(this.querySelector('input[type="email"]'), 'Please enter a valid email');
    isValid = false;
  }

  if (password.length < 8) {
    showError(this.querySelectorAll('input[type="password"]')[0], 'Password must be at least 8 characters');
    isValid = false;
  }

  if (password !== confirmPassword) {
    showError(this.querySelectorAll('input[type="password"]')[1], 'Passwords do not match');
    isValid = false;
  }

  if (!isValid) return;

  showSuccess(this, 'Account created successfully! Redirecting...');
  
  setTimeout(() => {
    console.log('User signed up:', { firstName, lastName, email, accountType });
  }, 1500);
}

// ================================
// Create Team Form Handler
// ================================
function handleCreateTeamSubmit(e) {
  e.preventDefault();
  
  const teamName = this.querySelector('input[placeholder*="Alpha"]').value;
  const teamDescription = this.querySelector('textarea').value;
  const teamSize = this.querySelectorAll('select')[0].value;
  const primaryFocus = this.querySelectorAll('select')[1].value;
  const skills = this.querySelector('input[placeholder*="React"]').value;

  let isValid = true;

  if (!teamName.trim()) {
    showError(this.querySelector('input[placeholder*="Alpha"]'), 'Team name is required');
    isValid = false;
  }

  if (!teamDescription.trim()) {
    showError(this.querySelector('textarea'), 'Description is required');
    isValid = false;
  }

  if (!teamSize) {
    showError(this.querySelectorAll('select')[0], 'Please select team size');
    isValid = false;
  }

  if (!primaryFocus) {
    showError(this.querySelectorAll('select')[1], 'Please select primary focus');
    isValid = false;
  }

  if (!isValid) return;

  showSuccess(this, 'Team created successfully! Redirecting...');
  
  setTimeout(() => {
    console.log('Team created:', { teamName, teamDescription, teamSize, primaryFocus, skills });
  }, 1500);
}

// ================================
// Validation Helpers
// ================================
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ================================
// UI Feedback Functions
// ================================
function showError(element, message) {
  // Remove previous error if exists
  const previousError = element.parentElement.querySelector('.form-error');
  if (previousError) previousError.remove();

  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error';
  errorDiv.textContent = message;
  element.parentElement.appendChild(errorDiv);

  element.style.borderColor = 'var(--danger)';
  
  setTimeout(() => {
    element.style.borderColor = 'var(--border)';
  }, 3000);
}

function showSuccess(form, message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'form-success';
  successDiv.textContent = message;
  successDiv.style.padding = '12px 16px';
  successDiv.style.borderRadius = 'var(--radius)';
  successDiv.style.marginBottom = '16px';
  successDiv.style.backgroundColor = '#d1fae5';
  successDiv.style.border = '1px solid var(--success)';
  
  form.insertBefore(successDiv, form.firstChild);

  setTimeout(() => {
    successDiv.remove();
  }, 2500);
}

// ================================
// Smooth Scroll Behavior
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ================================
// Load More Posts
// ================================
const loadMoreBtn = document.querySelector('.btn-secondary');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', function(e) {
    if (this.textContent.includes('Load More')) {
      alert('Loading more posts...');
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 1000);
    }
  });
}

// ================================
// Responsive Navbar Menu (Mobile)
// ================================
function initializeMobileMenu() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');

  // Create mobile menu toggle if needed
  if (window.innerWidth <= 768) {
    if (!navbar.querySelector('.mobile-menu-toggle')) {
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'mobile-menu-toggle';
      toggleBtn.innerHTML = '☰';
      toggleBtn.style.display = 'none';
      toggleBtn.style.background = 'none';
      toggleBtn.style.border = 'none';
      toggleBtn.style.fontSize = '24px';
      toggleBtn.style.cursor = 'pointer';
      
      toggleBtn.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'none' ? 'flex' : 'none';
      });

      navbar.appendChild(toggleBtn);
    }
  }
}

// Initialize mobile menu
window.addEventListener('load', initializeMobileMenu);
window.addEventListener('resize', initializeMobileMenu);

// ================================
// Log Analytics Events
// ================================
function trackEvent(eventName, eventData) {
  console.log(`Event: ${eventName}`, eventData);
  // This would connect to analytics service in production
}

// Track page view
trackEvent('page_view', {
  page: window.location.pathname,
  timestamp: new Date().toISOString()
});

// ================================
// Utility Functions
// ================================

// Copy to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Copied to clipboard:', text);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

// Format date
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Debounce function for search
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

// ================================
// Search Functionality
// ================================
const searchInputs = document.querySelectorAll('input[placeholder*="Search"]');
searchInputs.forEach(input => {
  input.addEventListener('input', debounce(function() {
    const searchTerm = this.value.toLowerCase();
    console.log('Searching for:', searchTerm);
    // Implement actual search logic here
  }, 300));
});

// ================================
// Filter Functionality
// ================================
const filterSelects = document.querySelectorAll('.form-select');
filterSelects.forEach(select => {
  select.addEventListener('change', function() {
    const filterValue = this.value;
    console.log('Filter changed to:', filterValue);
    // Implement actual filter logic here
  });
});

// ================================
// Pagination
// ================================
const paginationButtons = document.querySelectorAll('.btn.outline');
paginationButtons.forEach(btn => {
  if (btn.textContent.includes('←') || btn.textContent.includes('→') || /^\d+$/.test(btn.textContent)) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Navigate to page:', this.textContent);
    });
  }
});

console.log('✅ TeamWork Frontend Initialized');
