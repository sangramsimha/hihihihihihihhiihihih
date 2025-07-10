document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const ctaButton = document.querySelector('.cta-button');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                
                // Clone navigation links
                const navLinksClone = navLinks.cloneNode(true);
                mobileMenu.appendChild(navLinksClone);
                
                // Clone CTA button
                const ctaButtonClone = ctaButton.cloneNode(true);
                mobileMenu.appendChild(ctaButtonClone);
                
                // Insert after header
                const header = document.querySelector('header');
                header.parentNode.insertBefore(mobileMenu, header.nextSibling);
            } else {
                const mobileMenu = document.querySelector('.mobile-menu');
                mobileMenu.classList.toggle('active');
            }
        });
    }
    
    // Offering tabs
    const tabs = document.querySelectorAll('.tab');
    
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all content
                const allContent = document.querySelectorAll('.offering-content');
                allContent.forEach(content => content.classList.remove('active'));
                
                // Show selected content
                const tabId = this.getAttribute('data-tab');
                const selectedContent = document.getElementById(tabId + '-content');
                
                if (selectedContent) {
                    selectedContent.classList.add('active');
                }
            });
        });
    }
    
    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const toggle = this.querySelector('.toggle');
                
                // Toggle answer visibility
                answer.classList.toggle('active');
                
                // Update toggle symbol
                if (toggle) {
                    toggle.textContent = answer.classList.contains('active') ? '-' : '+';
                }
            });
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
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Simple testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider && testimonialSlider.children.length > 1) {
        let currentIndex = 0;
        const testimonials = testimonialSlider.children;
        const totalTestimonials = testimonials.length;
        
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        for (let i = 0; i < totalTestimonials; i++) {
            const dot = document.createElement('span');
            dot.className = i === 0 ? 'dot active' : 'dot';
            dot.dataset.index = i;
            dotsContainer.appendChild(dot);
        }
        
        testimonialSlider.parentNode.appendChild(dotsContainer);
        
        // Add click event to dots
        dotsContainer.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                showTestimonial(index);
            });
        });
        
        // Function to show testimonial by index
        function showTestimonial(index) {
            // Update current index
            currentIndex = index;
            
            // Scroll to the testimonial
            testimonials[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
            
            // Update active dot
            dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Handle scroll events to update active dot
        testimonialSlider.addEventListener('scroll', function() {
            const scrollPosition = this.scrollLeft;
            const testimonialWidth = testimonials[0].offsetWidth + 30; // Including gap
            
            const newIndex = Math.round(scrollPosition / testimonialWidth);
            
            if (newIndex !== currentIndex && newIndex < totalTestimonials) {
                currentIndex = newIndex;
                
                // Update active dot
                dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
        });
    }
    
    // Add animation on scroll
    const animateElements = document.querySelectorAll('.feature-card, .testimonial, .offering-card');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
}); 