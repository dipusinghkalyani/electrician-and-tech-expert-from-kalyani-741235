// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate progress bars
            if (entry.target.classList.contains('skills-progress')) {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 500);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .service-card, .portfolio-item, .blog-card, .contact-card, .skills-progress').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    const location = formData.get('location');
    
    // Simple validation
    if (!name || !phone || !service || !message || !location) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Phone number validation (basic)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, '').slice(-10))) {
        alert('Please enter a valid Indian mobile number.');
        return;
    }
    
    // Show success message
    alert(`Thank you ${name}! Your message has been received. I'll contact you soon for your ${service} requirement in ${location}.`);
    
    // Reset form
    this.reset();
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, phone, service, message, location });
    
    // You can integrate with services like Formspree, Netlify Forms, or EmailJS here
    // Example with EmailJS:
    // emailjs.send('service_id', 'template_id', {
    //     name: name,
    //     phone: phone,
    //     service: service,
    //     message: message,
    //     location: location
    // });
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.classList.contains('loading')) return;
        
        // Don't add loading to form submit buttons or external links
        if (this.type === 'submit' || this.href?.startsWith('http') || this.href?.startsWith('tel:') || this.href?.startsWith('mailto:')) {
            return;
        }
        
        this.classList.add('loading');
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        setTimeout(() => {
            this.classList.remove('loading');
            this.innerHTML = originalText;
        }, 1000);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg-animation');
    if (parallax) {
        const speed = scrolled * 0.3;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Animate counters when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    stat.textContent = '0';
                    animateCounter(stat, number);
                    // Add back the suffix if it exists
                    setTimeout(() => {
                        if (text.includes('+')) {
                            stat.textContent = number + '+';
                        } else if (text.includes('/')) {
                            stat.textContent = text;
                        }
                    }, 2000);
                }
            });
        }
    });
});

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add interactive hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Typing effect for hero title (optional)
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

// Add floating animation to tech icons
document.querySelectorAll('.floating-icons i').forEach((icon, index) => {
    icon.style.animationDelay = `${index * 5}s`;
});

// Service card click tracking
document.querySelectorAll('.service-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const serviceCard = this.closest('.service-card');
        const serviceName = serviceCard.querySelector('h3').textContent;
        
        // Track service interest (you can integrate with analytics)
        console.log(`User interested in: ${serviceName}`);
        
        // You can add Google Analytics or other tracking here
        // gtag('event', 'service_interest', {
        //     'service_name': serviceName
        // });
    });
});

// Blog post click tracking
document.querySelectorAll('.blog-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Remove this when you have actual blog posts
        const blogTitle = this.closest('.blog-card').querySelector('h3').textContent;
        console.log(`User clicked on blog: ${blogTitle}`);
        
        // For now, show a message since blog posts aren't implemented yet
        alert('Blog post coming soon! Stay tuned for more tech insights and tutorials.');
    });
});

// Emergency service highlight
const emergencyBtn = document.querySelector('.service-btn.emergency');
if (emergencyBtn) {
    setInterval(() => {
        emergencyBtn.style.boxShadow = '0 0 20px rgba(245, 101, 0, 0.5)';
        setTimeout(() => {
            emergencyBtn.style.boxShadow = '';
        }, 1000);
    }, 3000);
}

// Add current year to footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2024', currentYear);
}

// Initialize AOS (Animate On Scroll) alternative
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    });
    
    elements.forEach(el => observer.observe(el));
}

// Call initialization functions
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    
    // Add some dynamic content
    const currentTime = new Date().getHours();
    const greeting = currentTime < 12 ? 'Good Morning' : currentTime < 18 ? 'Good Afternoon' : 'Good Evening';
    
    // You can use this greeting in your contact form or hero section
    console.log(`${greeting}! Welcome to Dipu Singh's website.`);
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
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
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('🚀 Dipu Singh - Kalyani Tech Expert Website Loaded Successfully!');
console.log('⚡ Ready to serve Kalyani with innovative electrical solutions!');
console.log('📱 Mobile-friendly design activated!');
console.log('🎯 All systems ready for local business growth!');