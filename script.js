// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileLinks = document.querySelectorAll('.mobile-link');
const themeToggle = document.getElementById('themeToggle');
const themeIconLight = document.querySelector('.theme-icon-light');
const themeIconDark = document.querySelector('.theme-icon-dark');
const accordionItems = document.querySelectorAll('.accordion-item');
const newsletterForm = document.getElementById('newsletterForm');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const cookieConsent = document.getElementById('cookieConsent');
const cookieAccept = document.getElementById('cookieAccept');
const cookieDecline = document.getElementById('cookieDecline');
const heroGradient = document.getElementById('heroGradient');

// Check if dark mode is enabled
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeIconLight.style.display = 'none';
    themeIconDark.style.display = 'block';
}

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// Close mobile menu when clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);

    if (isDark) {
        themeIconLight.style.display = 'none';
        themeIconDark.style.display = 'block';
    } else {
        themeIconLight.style.display = 'block';
        themeIconDark.style.display = 'none';
    }
});

// Accordion
accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const icon = item.querySelector('.accordion-icon');

    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all accordion items
        accordionItems.forEach(i => {
            i.classList.remove('active');
            i.querySelector('.accordion-icon').textContent = '+';
        });

        // Open clicked item if it was closed
        if (!isActive) {
            item.classList.add('active');
            icon.textContent = '-';
        }
    });
});

// Newsletter Form
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Vielen Dank für deine Anmeldung zum Newsletter!');
    newsletterForm.reset();
});

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formSuccess.style.display = 'block';
    contactForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
        formSuccess.style.display = 'none';
    }, 5000);
});

// Cookie Consent
if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
        cookieConsent.style.display = 'block';
    }, 2000);
}

cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'true');
    cookieConsent.style.display = 'none';
});

cookieDecline.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'false');
    cookieConsent.style.display = 'none';
});

// Hero Gradient Animation
function animateGradient() {
    const angle = Math.floor(Math.random() * 360);
    const x1 = Math.floor(Math.random() * 100);
    const y1 = Math.floor(Math.random() * 100);
    const x2 = Math.floor(Math.random() * 100);
    const y2 = Math.floor(Math.random() * 100);
    
    heroGradient.style.background = `linear-gradient(${angle}deg, 
        rgba(55, 114, 255, 0.05) ${x1}%, 
        rgba(55, 114, 255, 0) ${y1}%, 
        rgba(55, 114, 255, 0.08) ${x2}%)`;

    if (document.body.classList.contains('dark-mode')) {
        heroGradient.style.background = `linear-gradient(${angle}deg, 
            rgba(55, 114, 255, 0.1) ${x1}%, 
            rgba(55, 114, 255, 0.02) ${y1}%, 
            rgba(55, 114, 255, 0.15) ${x2}%)`;
    }
}

// Initial animation
animateGradient();

// Change gradient every 5 seconds
setInterval(animateGradient, 5000);

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});