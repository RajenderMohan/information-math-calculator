document.addEventListener('DOMContentLoaded', () => {
    // Side Navigation Expansion
    const nav = document.getElementById('side-nav');
    const navTexts = nav.querySelectorAll('.nav-text');

    // Add 'group' class by default for initial CSS hover to work
    nav.classList.add('group'); 

    // Intersection Observer for revealing elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // Active Nav Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-item a');
    
    const highlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                   link.classList.remove('bg-sky-600');
                   // Updated for new accent color in dark mode
                   if (link.getAttribute('href').substring(1) === entry.target.id) {
                       link.classList.add('bg-[#007a82]'); // New highlight color for active nav items
                   } else {
                       // Ensure other nav links revert to appropriate hover state color
                       link.classList.remove('bg-[#007a82]');
                       link.classList.remove('bg-sky-600'); // Remove old sky-600 if present
                   }
                });
            }
        });
    }, {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Highlights when section is in middle of viewport
        threshold: 0
    });
    
    sections.forEach(section => {
        highlightObserver.observe(section);
    });

    // Scroll to Top Button Logic
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling down 300px
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll to top
        });
    });

});