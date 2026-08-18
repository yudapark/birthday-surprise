// ============================================
// MODAL.JS - Shared Modal Controller
// ============================================

let modalCleanup = null;
let ambientWasRunning = false;

function initModal() {
    const overlay = document.getElementById('modalOverlay');
    const close = document.getElementById('modalClose');
    if (!overlay) return;
    
    close?.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openModal(cleanup) {
    const overlay = document.getElementById('modalOverlay');
    if (!overlay) return;
    
    // Hentikan ambient hearts saat modal terbuka
    const ambientLayer = document.getElementById('ambientLayer');
    if (ambientLayer && ambientLayer.children.length > 0) {
        ambientWasRunning = true;
        // Hapus semua ambient emote yang floating
        ambientLayer.innerHTML = '';
        // Hentikan interval
        if (typeof stopAmbientLove === 'function') stopAmbientLove();
    }
    
    modalCleanup?.();
    modalCleanup = cleanup || null;
    overlay.classList.add('active');
    document.body.classList.add('modal-open');
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (!overlay) return;
    
    overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    
    modalCleanup?.();
    modalCleanup = null;
    
    // Restart ambient hearts jika sebelumnya berjalan
    if (ambientWasRunning && typeof initAmbientLove === 'function') {
        initAmbientLove();
        ambientWasRunning = false;
    }
}

// Expose ke global
window.initModal = initModal;
window.openModal = openModal;
window.closeModal = closeModal;