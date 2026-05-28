// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Glitch effect randomly
const glitchText = document.querySelector('.glitch');
if (glitchText) {
    setInterval(() => {
        glitchText.style.animation = 'none';
        setTimeout(() => {
            glitchText.style.animation = 'glitch 1s linear infinite';
        }, 50);
    }, 3000);
}

// Smart Mobile Navbar - Hide on scroll down, Show on scroll up
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            // Scrolling down and past the very top
            navbar.classList.add('hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('hidden');
        }
    } else {
        navbar.classList.remove('hidden'); // Ensure visible on desktop
    }
    lastScrollY = window.scrollY;
});
