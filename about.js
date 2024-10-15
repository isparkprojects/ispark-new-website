// Scroll-to-section for smooth navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Navbar background and text color change on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navLinks.forEach(link => {
            link.classList.add('scrolled');
        });
    } else {
        navbar.classList.remove('scrolled');
        navLinks.forEach(link => {
            link.classList.remove('scrolled');
        });
    }
});


let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    let elements = document.querySelectorAll('.scroll-element');

    elements.forEach(function(el) {
        let elementTop = el.getBoundingClientRect().top + window.scrollY;
        let elementBottom = el.getBoundingClientRect().bottom + window.scrollY;

        if (elementTop < currentScroll + window.innerHeight && elementBottom > currentScroll) {
            // When the element is visible in the viewport
            if (currentScroll > lastScrollTop) {
                // Scrolling down - slide in from the left
                el.classList.add('show-left');
                el.classList.remove('show-right', 'hide-left', 'hide-right');
            } else {
                // Scrolling up - slide in from the right
                el.classList.add('show-right');
                el.classList.remove('show-left', 'hide-left', 'hide-right');
            }
        } else {
            // Reset to allow looping when out of view
            if (currentScroll > lastScrollTop) {
                el.classList.add('hide-left'); // Reset to off-left for scrolling down
                el.classList.remove('show-left', 'show-right', 'hide-right');
            } else {
                el.classList.add('hide-right'); // Reset to off-right for scrolling up
                el.classList.remove('show-left', 'show-right', 'hide-left');
            }
        }
    });

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});