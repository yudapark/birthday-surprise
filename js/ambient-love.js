// ============================================
// AMBIENT-LOVE.JS - Ambient floating hearts/emoji
// + tap-anywhere heart burst
// ============================================

const AMBIENT_EMOTES = ['💙', '💕', '💗', '💖', '✨', '🩵', '💫', '🤍', '❤️', '💝', '🌸', '💞'];
const BURST_EMOTES = ['❤️', '💖', '💕', '💗', '✨', '💙', '💝', '💞', '🌸'];

let ambientIntervalId = null;
let ambientActive = false;

function initAmbientLove() {
    if (ambientActive) return;
    
    // Cek preferensi reduksi gerakan
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const layer = document.getElementById('ambientLayer');
    if (!layer) return;
    
    ambientActive = true;
    
    // Bersihkan layer terlebih dahulu
    layer.innerHTML = '';
    
    // Spawn emote pertama dan mulai interval
    spawnAmbientEmote(layer);
    ambientIntervalId = setInterval(() => spawnAmbientEmote(layer), 1400);

    // Tap-anywhere heart burst
    document.addEventListener('click', handleLoveClick);
}

function stopAmbientLove() {
    ambientActive = false;
    if (ambientIntervalId) {
        clearInterval(ambientIntervalId);
        ambientIntervalId = null;
    }
    const layer = document.getElementById('ambientLayer');
    if (layer) layer.innerHTML = '';
    document.removeEventListener('click', handleLoveClick);
}

function spawnAmbientEmote(layer) {
    if (!ambientActive) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    // Cek apakah modal terbuka
    const modal = document.getElementById('modalOverlay');
    if (modal?.classList.contains('active')) return;

    const el = document.createElement('span');
    el.className = 'ambient-emote';
    el.textContent = AMBIENT_EMOTES[Math.floor(Math.random() * AMBIENT_EMOTES.length)];

    const startX = Math.random() * window.innerWidth;
    const driftX = (Math.random() - 0.5) * 160;
    const rot = (Math.random() - 0.5) * 60;
    const duration = 10 + Math.random() * 8;
    const size = 14 + Math.random() * 16;

    el.style.left = startX + 'px';
    el.style.fontSize = size + 'px';
    el.style.setProperty('--drift-x', driftX + 'px');
    el.style.setProperty('--drift-rot', rot + 'deg');
    el.style.animationDuration = duration + 's';

    layer.appendChild(el);

    setTimeout(() => {
        if (el.parentNode) el.remove();
    }, duration * 1000 + 200);
}

function handleLoveClick(e) {
    // Jangan spam pada elemen interaktif
    const interactive = e.target.closest('button, a, input, textarea, .gallery-item, .modal-content, .nav-dot, .music-toggle');
    if (interactive) return;
    
    // Jangan jika modal terbuka
    const modal = document.getElementById('modalOverlay');
    if (modal?.classList.contains('active')) return;

    createHeartBurst(e.clientX, e.clientY);
}

function createHeartBurst(x, y) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const count = 8;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('span');
        particle.className = 'heart-burst-particle';
        particle.textContent = BURST_EMOTES[Math.floor(Math.random() * BURST_EMOTES.length)];

        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
        const distance = 30 + Math.random() * 40;
        const bx = Math.cos(angle) * distance;
        const by = Math.sin(angle) * distance - 20;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.fontSize = (12 + Math.random() * 10) + 'px';
        particle.style.setProperty('--bx', bx + 'px');
        particle.style.setProperty('--by', by + 'px');

        document.body.appendChild(particle);
        setTimeout(() => {
            if (particle.parentNode) particle.remove();
        }, 950);
    }
}

// Expose ke global
window.initAmbientLove = initAmbientLove;
window.stopAmbientLove = stopAmbientLove;
window.createHeartBurst = createHeartBurst;