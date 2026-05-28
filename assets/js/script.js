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
