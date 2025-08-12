/**
 * FlexiCars - Main JavaScript File
 * Handles all interactive functionality for the car rental website
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    // Initialize navigation
    initNavigation();
    
    // Initialize search functionality
    initSearchForm();
    
    // Initialize carousels
    initCarousels();
    
    // Initialize animations
    initAnimations();
    
    // Initialize car grid for cars page
    if (document.getElementById('carsGrid')) {
        initCarsGrid();
    }
    
    // Initialize contact form
    if (document.querySelector('.contact-form')) {
        initContactForm();
    }
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize hover effects
    initHoverEffects();
}

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Handle active nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * Initialize search form functionality
 */
function initSearchForm() {
    const searchForm = document.querySelector('.search-form');
    
    if (!searchForm) return;
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const searchData = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="spinner"></span> Searching...';
        submitBtn.disabled = true;
        
        // Simulate search delay
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show search results (in a real app, this would redirect or show results)
            showSearchResults(searchData);
        }, 2000);
    });
}

/**
 * Show search results
 */
function showSearchResults(searchData) {
    // In a real application, this would handle the search results
    // For demo purposes, we'll show an alert
    alert('Search completed! In a real application, this would show available cars based on your criteria.');
    
    // Redirect to cars page
    window.location.href = 'cars.html';
}

/**
 * Initialize carousels
 */
function initCarousels() {
    // Testimonials carousel
    const testimonialsCarousel = document.getElementById('testimonialsCarousel');
    if (testimonialsCarousel) {
        const carousel = new bootstrap.Carousel(testimonialsCarousel, {
            interval: 5000,
            wrap: true
        });
    }
}

/**
 * Initialize scroll animations
 */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize cars grid for cars page
 */
function initCarsGrid() {
    const carsGrid = document.getElementById('carsGrid');
    
    // Sample car data
    const cars = [
        {
            id: 1,
            name: 'Toyota Fortuner 2023',
            price: 1800,
            rating: 4.7,
            specs: { mileage: 4000, transmission: 'Manual', seats: '7 Person', fuel: 'Electric' },
            image: 'assets/images/placeholder.svg',
            category: 'suv',
            brand: 'toyota'
        },
        {
            id: 2,
            name: 'Nissan Maxima Platinum 2024',
            price: 2300,
            rating: 4.9,
            specs: { mileage: 6000, transmission: 'Auto', seats: '4 Person', fuel: 'Electric' },
            image: 'assets/images/placeholder.svg',
            category: 'sedan',
            brand: 'nissan'
        },
        {
            id: 3,
            name: 'Skoda Kodiaq Platinum 2025',
            price: 1800,
            rating: 5.0,
            specs: { mileage: 5000, transmission: 'Auto', seats: '4 Person', fuel: 'Electric' },
            image: 'assets/images/placeholder.svg',
            category: 'suv',
            brand: 'skoda'
        },
        {
            id: 4,
            name: 'Audi Q7 Premium',
            price: 3500,
            rating: 4.8,
            specs: { mileage: 3500, transmission: 'Auto', seats: '7 Person', fuel: 'Petrol' },
            image: 'assets/images/placeholder.svg',
            category: 'luxury',
            brand: 'audi'
        },
        {
            id: 5,
            name: 'BMW M2 Sports',
            price: 4000,
            rating: 4.9,
            specs: { mileage: 2800, transmission: 'Manual', seats: '4 Person', fuel: 'Petrol' },
            image: 'assets/images/placeholder.svg',
            category: 'luxury',
            brand: 'bmw'
        },
        {
            id: 6,
            name: 'MINI Cooper Electric',
            price: 2200,
            rating: 4.6,
            specs: { mileage: 8000, transmission: 'Auto', seats: '4 Person', fuel: 'Electric' },
            image: 'assets/images/placeholder.svg',
            category: 'hatchback',
            brand: 'mini'
        }
    ];
    
    // Render cars
    renderCars(cars);
    
    // Handle filters
    initFilters(cars);
}

/**
 * Render cars in the grid
 */
function renderCars(cars) {
    const carsGrid = document.getElementById('carsGrid');
    
    carsGrid.innerHTML = cars.map(car => `
        <div class="col-lg-4 col-md-6">
            <div class="car-card fade-in">
                <div class="car-image">
                    <img src="${car.image}" alt="${car.name}" class="img-fluid">
                </div>
                <div class="car-details">
                    <h5 class="car-name">${car.name}</h5>
                    <div class="car-price">
                        <span class="price">${car.price.toLocaleString()}</span>
                        <span class="period">/day</span>
                    </div>
                    <div class="car-specs">
                        <div class="spec-item">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>${car.specs.mileage}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-cog"></i>
                            <span>${car.specs.transmission}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-users"></i>
                            <span>${car.specs.seats}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-bolt"></i>
                            <span>${car.specs.fuel}</span>
                        </div>
                    </div>
                    <div class="car-rating">
                        <span class="rating-star">★</span>
                        <span class="rating-value">${car.rating}</span>
                    </div>
                    <button class="btn btn-primary w-100 mt-3" onclick="rentCar(${car.id})">Rent Now</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-initialize animations for new elements
    initAnimations();
}

/**
 * Initialize filters
 */
function initFilters(cars) {
    const filterButtons = document.querySelectorAll('.filters-section select');
    const applyButton = document.querySelector('.filters-section .btn-primary');
    
    if (!applyButton) return;
    
    applyButton.addEventListener('click', function() {
        const categoryFilter = document.querySelector('.filters-section select:nth-child(1) option:checked').value;
        const brandFilter = document.querySelector('.filters-section select:nth-child(2) option:checked').value;
        const priceFilter = document.querySelector('.filters-section select:nth-child(3) option:checked').value;
        
        let filteredCars = cars;
        
        // Apply category filter
        if (categoryFilter !== 'All Categories') {
            filteredCars = filteredCars.filter(car => car.category === categoryFilter);
        }
        
        // Apply brand filter
        if (brandFilter !== 'All Brands') {
            filteredCars = filteredCars.filter(car => car.brand === brandFilter);
        }
        
        // Apply price filter
        if (priceFilter !== 'Price Range') {
            const [min, max] = priceFilter.split('-').map(p => p.replace(/[^\d]/g, ''));
            if (max) {
                filteredCars = filteredCars.filter(car => car.price >= parseInt(min) && car.price <= parseInt(max));
            } else {
                filteredCars = filteredCars.filter(car => car.price >= parseInt(min));
            }
        }
        
        renderCars(filteredCars);
    });
}

/**
 * Rent car functionality
 */
function rentCar(carId) {
    // In a real application, this would handle the rental process
    alert(`Rental process started for car ID: ${carId}. In a real application, this would redirect to booking page.`);
}

/**
 * Initialize contact form
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const contactData = Object.fromEntries(formData);
        
        // Validate form
        if (!validateContactForm(contactData)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            this.reset();
        }, 2000);
    });
}

/**
 * Validate contact form
 */
function validateContactForm(data) {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'subject', 'message'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Validate phone
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        alert('Please enter a valid phone number.');
        return false;
    }
    
    return true;
}

/**
 * Show success message
 */
function showSuccessMessage() {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success alert-dismissible fade show';
    successMessage.innerHTML = `
        <strong>Success!</strong> Your message has been sent. We'll get back to you soon.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert message at top of form
    const form = document.querySelector('.contact-form-container');
    form.insertBefore(successMessage, form.firstChild);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.remove();
        }
    }, 5000);
}

/**
 * Initialize smooth scrolling
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize hover effects
 */
function initHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.car-card, .brand-card, .category-card, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Utility Functions
 */

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
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

// Local storage helpers
const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    },
    
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing from localStorage:', e);
        }
    }
};

// Show loading spinner
function showLoading(element) {
    element.classList.add('loading');
}

// Hide loading spinner
function hideLoading(element) {
    element.classList.remove('loading');
}

// Create toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} toast-notification`;
    toast.textContent = message;
    
    // Style the toast
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 250px;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Page is visible - refresh data if needed
        console.log('Page is now visible');
    } else {
        // Page is hidden - pause any running processes
        console.log('Page is now hidden');
    }
});

// Handle online/offline status
window.addEventListener('online', function() {
    showToast('Internet connection restored', 'success');
});

window.addEventListener('offline', function() {
    showToast('No internet connection', 'warning');
});

// Export functions for global use
window.FlexiCars = {
    rentCar,
    formatCurrency,
    showToast,
    storage
};
