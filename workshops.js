// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Scroll Animation for sections with the class 'container'
    const sections = document.querySelectorAll('.container');

    function revealSection() {
        sections.forEach(section => {
            const sectionPos = section.getBoundingClientRect().top;
            if (sectionPos < window.innerHeight - 150) {
                section.classList.add('visible'); // Add 'visible' class when the section is in the viewport
            }
        });
    }

    // Trigger reveal on scroll
    window.addEventListener('scroll', revealSection);
    revealSection(); // Initial call in case some sections are already in the viewport on load

    // Mobile menu toggle functionality
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    menuIcon.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Toggle navbar background on scroll
    const navbar = document.querySelector('.navbar');

    function handleScroll() {
        if (window.scrollY > 50) { // Change the scroll amount as needed
            navbar.classList.add('scrolled'); // Add class when scrolling down
        } else {
            navbar.classList.remove('scrolled'); // Remove class when scrolled back to the top
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Highlight active link based on current location
    const currentLocation = window.location.pathname;
    document.querySelectorAll('.nav-links li a').forEach(link => {
        if (link.getAttribute('href').includes(currentLocation)) {
            link.classList.add('active');
        }
    });
});

// Online/Offline Workshop Toggle
document.addEventListener('DOMContentLoaded', function() {
    const onlineBtn = document.getElementById('online-workshops-btn');
    const offlineBtn = document.getElementById('offline-workshops-btn');
    const onlineWorkshops = document.getElementById('online-workshops');
    const offlineWorkshops = document.getElementById('offline-workshops');

    // Initially hide both sections
    onlineWorkshops.style.display = 'none';
    offlineWorkshops.style.display = 'none';

    // Event listener for Online Workshops button
    onlineBtn.addEventListener('click', function() {
        onlineWorkshops.style.display = 'grid'; // Change to grid to display properly
        offlineWorkshops.style.display = 'none'; // Hide offline workshops
    });

    // Event listener for Offline Workshops button
    offlineBtn.addEventListener('click', function() {
        offlineWorkshops.style.display = 'grid'; // Change to grid to display properly
        onlineWorkshops.style.display = 'none'; // Hide online workshops
    });

    // Make it clear that the modes are clickable by adding a blinking animation
    onlineBtn.classList.add('attention');
    offlineBtn.classList.add('attention');

    // Remove the attention class after a few seconds to avoid being annoying
    setTimeout(function() {
        onlineBtn.classList.remove('attention');
        offlineBtn.classList.remove('attention');
    }, 5000);
});

// Add 'active' class based on the current page URL
document.addEventListener('DOMContentLoaded', function() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links li a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation || 
           (currentLocation.includes('workshops') && link.getAttribute('href').includes('workshops'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
