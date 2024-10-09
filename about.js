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
