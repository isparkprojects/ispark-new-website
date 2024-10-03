// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Scroll event listener for navbar and sections
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const navLinkElements = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.two-column-section, .mission, .vision, .product-card'); // Target the sections you want to animate
    const contactBoxes = document.querySelectorAll('footer .contact-box');

    // Navbar background and text color change on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navLinkElements.forEach(link => {
            link.classList.add('scrolled');
        });
    } else {
        navbar.classList.remove('scrolled');
        navLinkElements.forEach(link => {
            link.classList.remove('scrolled');
        });
    }

    // Section animations on scroll
    sections.forEach((section, index) => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight / 1.3;

        if (sectionTop < triggerBottom) {
            if (index % 2 === 0) {
                section.classList.add('slide-in-left');
                section.classList.remove('slide-out-right');
            } else {
                section.classList.add('slide-in-right');
                section.classList.remove('slide-out-left');
            }
        } else {
            if (index % 2 === 0) {
                section.classList.add('slide-out-right');
                section.classList.remove('slide-in-left');
            } else {
                section.classList.add('slide-out-left');
                section.classList.remove('slide-in-right');
            }
        }
    });

    // Contact box animations on scroll
    contactBoxes.forEach((box, index) => {
        const boxTop = box.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight / 1.2;

        if (boxTop < triggerBottom) {
            if (index % 2 === 0) {
                box.classList.add('slide-in-left');
                box.classList.remove('slide-out-right');
            } else {
                box.classList.add('slide-in-right');
                box.classList.remove('slide-out-left');
            }
        } else {
            if (index % 2 === 0) {
                box.classList.add('slide-out-right');
                box.classList.remove('slide-in-left');
            } else {
                box.classList.add('slide-out-left');
                box.classList.remove('slide-in-right');
            }
        }
    });
});

// Add this part to track active section and highlight the corresponding nav link
const allSections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                console.log(`Section ${entry.target.id} is intersecting`); // Debugging
                navLinksArray.forEach((link) => {
                    link.classList.remove('active'); // Remove the active class from all links
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active'); // Add the active class to the current section link
                    }
                });
            }
        });
    },
    { threshold: 0.3 } // Adjust threshold for earlier activation
);

// Observe each section
allSections.forEach((section) => {
    observer.observe(section);
});

// Initial check for animations on load
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('.two-column-section, .mission, .vision, .product-card');
    sections.forEach((section, index) => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight / 1.3;

        if (sectionTop < triggerBottom) {
            if (index % 2 === 0) {
                section.classList.add('slide-in-left');
            } else {
                section.classList.add('slide-in-right');
            }
        }
    });

    const contactBoxes = document.querySelectorAll('footer .contact-box');
    contactBoxes.forEach((box, index) => {
        const boxTop = box.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight / 1.2;

        if (boxTop < triggerBottom) {
            if (index % 2 === 0) {
                box.classList.add('slide-in-left');
            } else {
                box.classList.add('slide-in-right');
            }
        }
    });
});

let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            // Perform your scroll actions here
            isScrolling = false;
        });
    }
    isScrolling = true;
});
