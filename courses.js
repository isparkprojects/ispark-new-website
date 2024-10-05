document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1200,  // Duration of animations
        once: false,     // Ensures animations trigger every time you scroll down
        mirror: true,    // Reverses animations when scrolling back up
    });

    // Initialize Swiper for Courses Carousel
    const coursesSwiper = new Swiper('.courses-carousel', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.courses-carousel .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.courses-carousel .swiper-button-next',
            prevEl: '.courses-carousel .swiper-button-prev',
        },
        breakpoints: {
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 1,
            },
        },
    });

    // Initialize Swiper for Testimonials Carousel
    const testimonialsSwiper = new Swiper('.testimonials-carousel', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.testimonials-carousel .swiper-pagination',
            clickable: true,
        },
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navUl = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
    });

    // Sticky Header on Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.navbar');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.getElementById('online-courses-btn').addEventListener('click', function() {
    document.getElementById('online-courses').style.display = 'block';
    document.getElementById('offline-courses').style.display = 'none'; // Hide offline
});
document.getElementById('offline-courses-btn').addEventListener('click', function() {
    document.getElementById('offline-courses').style.display = 'block';
    document.getElementById('online-courses').style.display = 'none'; // Hide online
});
