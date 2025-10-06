document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const servicesLink = document.querySelector('a[href="#services"]');
    const servicesSidebar = document.querySelector('.services-sidebar');
    const servicesFab = document.querySelector('.services-fab');

    // Toggle mobile navigation
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Function to toggle the services sidebar and FAB state
    const toggleServicesSidebar = () => {
        servicesSidebar.classList.toggle('visible');
        servicesFab.classList.toggle('active');
    };

    // Toggle services sidebar on mobile via the "Services" link
    if (servicesLink) {
        servicesLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                toggleServicesSidebar();
                // Close mobile nav if a link is clicked
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    }

    // Toggle services sidebar via the new floating action button
    if (servicesFab) {
        servicesFab.addEventListener('click', toggleServicesSidebar);
    }

    // Close sidebar when clicking outside of it
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992 && servicesSidebar && servicesSidebar.classList.contains('visible')) {
            // Check if the click is outside the sidebar and the elements that open it
            if (!servicesSidebar.contains(e.target) && servicesLink && !servicesLink.contains(e.target) && servicesFab && !servicesFab.contains(e.target)) {
                servicesSidebar.classList.remove('visible');
                servicesFab.classList.remove('active');
            }
        }
    });

    // Smooth scrolling for anchor links on the same page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Don't prevent default for the services link on mobile, as it has its own logic
            if (this.getAttribute('href') === '#services' && window.innerWidth <= 992) {
                return;
            }

            // If the target is on the same page, scroll smoothly
            if (document.querySelector(this.getAttribute('href'))) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Close mobile nav if a link is clicked
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
});