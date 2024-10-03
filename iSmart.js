document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');  // Select the navbar element
    const navLinks = document.querySelectorAll('.nav-links a'); // Select individual nav links
    const heroText = document.querySelector('.hero-content h1');
    const heroSection = document.querySelector('.product-hero-section');
    const animatedSections = document.querySelectorAll('.about-container, .features-list, .testimonials-list, .contact-form');

    // Scroll event listener to detect scroll position and add the 'scrolled' class
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
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

        // Trigger animations for other sections when they come into view
        animatedSections.forEach(section => {
            const sectionPos = section.getBoundingClientRect();
            if (sectionPos.top < window.innerHeight && sectionPos.bottom >= 0) {
                section.classList.add('visible');
            }
        });
    });

    // Function to reset typewriter animation
    function resetTypewriterAnimation() {
        heroText.style.animation = 'none';
        setTimeout(() => {
            heroText.style.animation = '';
        }, 10);  // Short delay to re-trigger animation
    }

    // Trigger the initial animation on page load
    resetTypewriterAnimation();
});
