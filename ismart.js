document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');  // Select the navbar element
    const navLinks = document.querySelectorAll('.nav-links a'); // Select individual nav links
    const heroText = document.querySelector('.hero-content h1');
    const heroSection = document.querySelector('.product-hero-section');
    const animatedSections = document.querySelectorAll('.about-container, .features-list, .testimonials-list, .contact-form');

    // Function to reset typewriter animation
    function resetTypewriterAnimation() {
        heroText.style.animation = 'none';
        setTimeout(() => {
            heroText.style.animation = '';
        }, 10);  // Short delay to re-trigger animation
    }

    // Trigger the initial animation on page load
    resetTypewriterAnimation();

    // Scroll event listener to detect scroll position and add the 'scrolled' class
    let lastScrollTop = 0; // Track the last scroll position
    window.addEventListener('scroll', function () {
        const currentScroll = window.scrollY;

        // Navbar scroll effect
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            navLinks.forEach(link => link.classList.add('scrolled'));  // Apply 'scrolled' class to each link
        } else {
            navbar.classList.remove('scrolled');
            navLinks.forEach(link => link.classList.remove('scrolled'));  // Remove 'scrolled' class from each link
        }

        // Check if the hero section is in the viewport
        const bounding = heroSection.getBoundingClientRect();
        if (bounding.top >= 0 && bounding.bottom <= window.innerHeight) {
            resetTypewriterAnimation();  // Re-trigger animation if hero is in view
        }

        // Handle section animations based on scroll direction
        animatedSections.forEach(section => {
            const sectionPos = section.getBoundingClientRect();
            if (currentScroll > lastScrollTop) {
                // Scrolling down
                if (sectionPos.top < window.innerHeight && sectionPos.bottom >= 0) {
                    section.classList.remove('slide-out'); // Ensure it's not sliding out
                    section.classList.add('slide-left-in'); // Slide in from the left
                } else {
                    section.classList.remove('slide-left-in'); // Remove slide-in from left class
                    section.classList.add('slide-out'); // Slide out to the right
                }
            } else {
                // Scrolling up
                if (sectionPos.top < window.innerHeight && sectionPos.bottom >= 0) {
                    section.classList.remove('slide-out'); // Ensure it's not sliding out
                    section.classList.add('slide-right-in'); // Slide in from the right
                } else {
                    section.classList.remove('slide-right-in'); // Remove slide-in from right class
                    section.classList.add('slide-out'); // Slide out to the right
                }
            }
        });

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    });

    // FAQ toggle functionality
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement; // Get the parent FAQ item
            faqItem.classList.toggle('active'); // Toggle the active class
        });
    });
});
