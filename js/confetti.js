// ============================================
// CONFETTI.JS - Confetti Particle System
// ============================================

let confettiRunning = false;
let confettiAnimationId = null;
let confettiPieces = [];
let confettiCanvas = null;
let ctx = null;

function initConfetti() {
    confettiCanvas = document.getElementById('confettiCanvas');
    if (!confettiCanvas) return;

    ctx = confettiCanvas.getContext('2d');
    resizeConfettiCanvas();

    window.addEventListener('resize', resizeConfettiCanvas);
}

function resizeConfettiCanvas() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

function startConfetti() {
    if (confettiRunning) {
        // Jika sudah berjalan, reset
        stopConfetti();
    }

    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;

    confettiCanvas = canvas;
    ctx = canvas.getContext('2d');
    resizeConfettiCanvas();

    confettiRunning = true;
    confettiPieces = [];

    const colors = ['#4DA6FF', '#7EC8FF', '#FF6B9D', '#FF4D6D', '#FFB6C1', '#87CEEB', '#FF85A2', '#A0D2F2', '#FFD700'];

    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            w: 6 + Math.random() * 8,
            h: 4 + Math.random() * 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 3,
            vy: 1.5 + Math.random() * 3,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.05,
            opacity: 0.7 + Math.random() * 0.3
        });
    }

    animateConfetti();
}

function animateConfetti() {
    if (!confettiRunning) return;

    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    let active = 0;

    confettiPieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.rotation += p.rotationSpeed;

        if (p.y > confettiCanvas.height + 50) {
            p.y = -20;
            p.x = Math.random() * confettiCanvas.width;
            p.vy = 1.5 + Math.random() * 3;
            p.vx = (Math.random() - 0.5) * 3;
        }

        if (p.y < confettiCanvas.height + 50) {
            active++;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
    });

    if (active > 0 && confettiRunning) {
        confettiAnimationId = requestAnimationFrame(animateConfetti);
    } else {
        // Hentikan jika tidak ada partikel aktif
        stopConfetti();
    }
}

function stopConfetti() {
    confettiRunning = false;
    if (confettiAnimationId) {
        cancelAnimationFrame(confettiAnimationId);
        confettiAnimationId = null;
    }
    if (ctx) {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
}

// Expose ke global
window.initConfetti = initConfetti;
window.startConfetti = startConfetti;
window.stopConfetti = stopConfetti;