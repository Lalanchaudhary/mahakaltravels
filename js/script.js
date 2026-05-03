// Mahakal Travels - Main JavaScript

// Smooth scrolling for navigation links
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

// Mobile menu toggle (if needed in future)
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Lightbox functionality for gallery
function openLightbox(imgSrc, alt) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    lightboxImg.src = imgSrc;
    lightboxImg.alt = alt;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// WhatsApp functions
function openWhatsApp(message = 'Hello Mahakal Travels') {
    const phoneNumber = '919135165706';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

function selectPackage(packageName) {
    const message = `Hello, I am interested in ${packageName}`;
    openWhatsApp(message);
}

function openMahakalPopup() {
    const popup = document.getElementById('mahakal-popup');
    if (!popup) {
        return;
    }

    popup.classList.add('is-open');
    document.body.classList.add('popup-open');
}

function closeMahakalPopup() {
    const popup = document.getElementById('mahakal-popup');
    if (!popup) {
        return;
    }

    popup.classList.remove('is-open');
    document.body.classList.remove('popup-open');
}

// Contact form handling
function handleContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Simple validation
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! We will get back to you soon.');
    form.reset();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('mahakal-popup');
    if (popup) {
        openMahakalPopup();

        popup.querySelector('.mahakal-popup-close').addEventListener('click', closeMahakalPopup);

        popup.addEventListener('click', function(e) {
            if (e.target === popup || e.target.classList.contains('mahakal-popup-scroll')) {
                closeMahakalPopup();
            }
        });
    }

    // Add event listeners for contact form if it exists
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Add event listeners for gallery items if they exist
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });
    
    // Close lightbox when clicking outside or on close button
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('close')) {
                closeLightbox();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMahakalPopup();
        }
    });
});
