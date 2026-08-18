// ============================================
// BACKGROUND-PARTICLES.JS - Animated Background
// ============================================

let particleCanvas = null;
let particleCtx = null;
let particles = [];
let particleAnimationId = null;
let mouseX = 0;
let mouseY = 0;

function initBackgroundParticles() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    
    particleCanvas = canvas;
    particleCtx = canvas.getContext('2d');
    
    resizeParticleCanvas();
    createParticles(80);
    animateParticles();
    
    window.addEventListener('resize', resizeParticleCanvas);
    window.addEventListener('mousemove', handleParticleMouseMove);
    window.addEventListener('touchmove', handleParticleTouchMove);
}

function resizeParticleCanvas() {
    if (!particleCanvas) return;
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

function createParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * particleCanvas.width,
            y: Math.random() * particleCanvas.height,
            size: 2 + Math.random() * 4,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: 0.3 + Math.random() * 0.5,
            color: `hsl(${200 + Math.random() * 25}, 70%, ${55 + Math.random() * 20}%)`
        });
    }
}

function animateParticles() {
    if (!particleCtx || !particleCanvas) return;
    
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    particles.forEach((p, i) => {
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around
        if (p.x < 0) p.x = particleCanvas.width;
        if (p.x > particleCanvas.width) p.x = 0;
        if (p.y < 0) p.y = particleCanvas.height;
        if (p.y > particleCanvas.height) p.y = 0;
        
        // Draw particle
        particleCtx.beginPath();
        particleCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        particleCtx.fillStyle = p.color;
        particleCtx.globalAlpha = p.opacity;
        particleCtx.fill();
        particleCtx.globalAlpha = 1;
        
        // Draw glow
        const gradient = particleCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, `rgba(77, 166, 255, ${p.opacity * 0.35})`);
        gradient.addColorStop(1, 'rgba(77, 166, 255, 0)');
        particleCtx.fillStyle = gradient;
        particleCtx.beginPath();
        particleCtx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        particleCtx.fill();
        
        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[j].x - p.x;
            const dy = particles[j].y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const opacity = 0.15 * (1 - distance / 150);
                particleCtx.beginPath();
                particleCtx.moveTo(p.x, p.y);
                particleCtx.lineTo(particles[j].x, particles[j].y);
                particleCtx.strokeStyle = `rgba(77, 166, 255, ${opacity * 0.85})`;
                particleCtx.lineWidth = 1;
                particleCtx.stroke();
            }
        }
    });
    
    // Mouse interaction - draw connection to mouse
    if (mouseX && mouseY) {
        particles.forEach(p => {
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const opacity = 0.3 * (1 - distance / 200);
                particleCtx.beginPath();
                particleCtx.moveTo(p.x, p.y);
                particleCtx.lineTo(mouseX, mouseY);
                particleCtx.strokeStyle = `rgba(77, 166, 255, ${opacity * 0.85})`;
                particleCtx.lineWidth = 2;
                particleCtx.shadowColor = 'rgba(77, 166, 255, 0.3)';
                particleCtx.shadowBlur = 10;
                particleCtx.stroke();
                particleCtx.shadowBlur = 0;
            }
        });
    }
    
    particleAnimationId = requestAnimationFrame(animateParticles);
}

function handleParticleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function handleParticleTouchMove(e) {
    const touch = e.touches[0];
    if (touch) {
        mouseX = touch.clientX;
        mouseY = touch.clientY;
    }
}

function stopBackgroundParticles() {
    if (particleAnimationId) {
        cancelAnimationFrame(particleAnimationId);
        particleAnimationId = null;
    }
}

// Expose ke global
window.initBackgroundParticles = initBackgroundParticles;
window.stopBackgroundParticles = stopBackgroundParticles;