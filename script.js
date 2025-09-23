// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Simple smooth scrolling function (global)
window.smoothScrollTo = function(targetId) {
    const target = document.querySelector(targetId);
    if (!target) {
        console.error('Target element not found:', targetId);
        return;
    }

    // Prefer native scrollIntoView with CSS scroll-padding-top
    if (typeof target.scrollIntoView === 'function') {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Re-align shortly after in case layout shifts due to images/fonts loading
        setTimeout(() => target.scrollIntoView({ behavior: 'auto', block: 'start' }), 400);
    } else {
        // Fallback
        const y = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo(0, y);
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        console.log('Anchor clicked:', targetId);
        
        // Close mobile menu if open
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Scroll to target
        smoothScrollTo(targetId);
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.research-card, .team-card, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effects to research cards
document.querySelectorAll('.research-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const scienceIcon = document.querySelector('.science-icon');
    
    if (hero && scienceIcon) {
        const rate = scrolled * -0.5;
        scienceIcon.style.transform = `translateY(${rate}px)`;
    }
});

// Add click tracking for analytics (placeholder)
function trackClick(element, action) {
    console.log(`Tracked: ${action} on ${element}`);
    // Add your analytics tracking code here
}

// Add click tracking to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        trackClick(e.target, 'button_click');
    });
});

// Add click tracking to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        trackClick(e.target, 'nav_click');
    });
});

// Lazy loading for images (if added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add loading state for dynamic content
function showLoading(element) {
    element.innerHTML = '<div class="loading-spinner">Loading...</div>';
}

function hideLoading(element, content) {
    element.innerHTML = content;
}

// Utility function for smooth animations
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElement = entry.target.querySelector('h3');
            const finalValue = parseInt(statElement.textContent);
            if (!isNaN(finalValue)) {
                animateValue(statElement, 0, finalValue, 2000);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu on escape
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('focus', () => {
        link.style.outline = '2px solid #2563eb';
        link.style.outlineOffset = '2px';
    });
    
    link.addEventListener('blur', () => {
        link.style.outline = 'none';
    });
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Navigation function for research direction pages
function navigateToPage(pageName) {
    // Add a smooth transition effect
    document.body.style.opacity = '0.8';
    document.body.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        window.location.href = pageName;
    }, 200);
}

// Add click tracking for research direction navigation
document.querySelectorAll('.research-card, .ai-category').forEach(card => {
    card.addEventListener('click', (e) => {
        // Prevent default link behavior if it's a card click
        if (e.target.closest('.learn-more')) {
            return; // Let the link handle the navigation
        }
        
        const link = card.querySelector('.learn-more');
        if (link) {
            e.preventDefault();
            trackClick(card, 'research_direction_click');
            navigateToPage(link.getAttribute('href'));
        }
    });
});

// Debug: Log when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, smooth scrolling initialized');
    
    // Test if sections exist
    const researchSection = document.querySelector('#research');
    const contactSection = document.querySelector('#contact');
    console.log('Sections found:', {
        research: !!researchSection,
        contact: !!contactSection
    });
});

// Add keyboard support for research cards
document.querySelectorAll('.research-card, .ai-category').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Click to learn more about this research direction');
    
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});
