// ============================================
// ANIMATIONS.JS - Scroll & Entrance Animations
// ============================================

function initAnimations() {
    // Intersection Observer for scroll reveal
    const revealElements = document.querySelectorAll('.reveal, .timeline-item, .gallery-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        observer.observe(el);
    });

    // Typing effect for opening
    setupTypingEffect();
}

function setupTypingEffect() {
    const elements = document.querySelectorAll('.typing-effect');
    elements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        el.style.width = '0';
        el.style.display = 'inline-block';
        el.style.overflow = 'hidden';
        el.style.whiteSpace = 'nowrap';
        el.style.borderRight = '3px solid var(--primary-blue)';

        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                el.textContent += text.charAt(index);
                el.style.width = (index + 1) * 0.6 + 'em';
                index++;
            } else {
                clearInterval(interval);
                el.style.borderRight = 'none';
            }
        }, 80);
    });
}

function animateElement(element, animation, duration = 600) {
    if (!element) return;

    element.style.animation = 'none';
    // Force reflow
    void element.offsetHeight;
    element.style.animation = `${animation} ${duration}ms ease forwards`;
}

// Expose to global scope
window.initAnimations = initAnimations;
window.animateElement = animateElement;