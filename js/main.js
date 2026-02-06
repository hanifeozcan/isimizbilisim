// Main JavaScript for İşimiz Bilişim Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'var(--dark-bg)';
                navLinks.style.padding = '2rem';
                navLinks.style.gap = '1.5rem';
                navLinks.style.borderTop = '1px solid var(--border-color)';
            }
        });
        
        // Close mobile menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'row';
                navLinks.style.position = 'static';
                navLinks.style.backgroundColor = 'transparent';
                navLinks.style.padding = '0';
                navLinks.style.borderTop = 'none';
            } else {
                navLinks.style.display = 'none';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active nav link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                service: document.getElementById('service').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value
            };
            
            // Simple validation
            if (!formData.name || !formData.company || !formData.service || !formData.phone) {
                alert('Lütfen zorunlu alanları doldurunuz (Ad Soyad, Kurum Adı, Hizmet, Telefon)');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Teşekkür ederiz! Talebiniz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Call button functionality
    const callButton = document.querySelector('.btn-call');
    if (callButton) {
        callButton.addEventListener('click', function() {
            const phone = document.getElementById('phone').value;
            const name = document.getElementById('name').value;
            
            if (!phone) {
                alert('Lütfen telefon numaranızı giriniz.');
                document.getElementById('phone').focus();
                return;
            }
            
            // In a real application, this would trigger a phone call or show a callback request modal
            alert(`Sayın ${name || 'Müşteri'}, telefon numaranız (${phone}) sistemimize kaydedilmiştir. En kısa sürede sizi arayacağız.`);
        });
    }
    
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Language switcher
    const languageSwitcher = document.querySelectorAll('.language-switcher span');
    languageSwitcher.forEach(span => {
        span.addEventListener('click', function() {
            languageSwitcher.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            
            // In a real application, this would change the language
            const lang = this.textContent.trim();
            console.log(`Language changed to: ${lang}`);
        });
    });
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const newsletterInput = newsletterForm.querySelector('input[type="email"]');
        const newsletterButton = newsletterForm.querySelector('button');
        
        newsletterButton.addEventListener('click', function() {
            const email = newsletterInput.value;
            
            if (!email || !isValidEmail(email)) {
                alert('Lütfen geçerli bir e-posta adresi giriniz.');
                newsletterInput.focus();
                return;
            }
            
            // In a real application, you would send this to a server
            console.log('Newsletter subscription:', email);
            alert('Bülten aboneliğiniz başarıyla tamamlandı! Teşekkür ederiz.');
            newsletterInput.value = '';
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .team-member, .client-logo');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.service-card, .team-member, .client-logo');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    animateOnScroll();
    
    // Current year in footer
    const yearSpan = document.querySelector('footer .footer-bottom p');
    if (yearSpan && yearSpan.textContent.includes('2024')) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = yearSpan.textContent.replace('2024', currentYear);
    }
    
    // Add active class to nav links on click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Initialize
    updateActiveNavLink();
});