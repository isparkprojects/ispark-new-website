// Scroll event listener for adding scrolled class to navbar and nav-links
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a'); // Select all nav links
    
    // Check if the scroll position is greater than 50px
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');

        // Apply the 'scrolled' class to each nav link
        navLinks.forEach(link => {
            link.classList.add('scrolled');
        });
    } else {
        navbar.classList.remove('scrolled');

        // Remove the 'scrolled' class from each nav link
        navLinks.forEach(link => {
            link.classList.remove('scrolled');
        });
    }
});
