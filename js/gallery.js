// ============================================
// GALLERY.JS - Memory Gallery Controller
// ============================================
function initGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    const images = birthdayConfig.gallery || [];
    if (!images.length) {
        grid.innerHTML = `<div class="empty-state"><span>📸</span><p>${birthdayConfig.emptyGalleryMessage}</p></div>`;
        return;
    }
    grid.innerHTML = images.map((item, index) => `
        <button class="gallery-item" data-index="${index}" type="button">
            <img src="${item.src}" alt="${item.caption}" loading="lazy">
            <div class="overlay"><span>${item.caption}</span></div>
        </button>`).join('');
    grid.querySelectorAll('img').forEach(img => img.addEventListener('error', () => {
        img.parentElement.classList.add('image-missing');
        img.alt = 'Foto belum tersedia';
    }, { once: true }));
    grid.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => openGalleryModal(Number(item.dataset.index))));
}

function openGalleryModal(index) {
    const images = birthdayConfig.gallery || [];
    const item = images[index];
    if (!item) return;
    const modalBody = document.getElementById('modalBody');
    if (!modalBody) return;
    modalBody.innerHTML = `
        <img src="${item.src}" alt="${item.caption}" class="modal-gallery-image">
        <p class="caption">${item.caption}</p>
        <div class="gallery-nav">
            <button class="btn-nav" data-dir="prev" type="button" aria-label="Foto sebelumnya">‹</button>
            <span class="gallery-counter">${index + 1} / ${images.length}</span>
            <button class="btn-nav" data-dir="next" type="button" aria-label="Foto berikutnya">›</button>
        </div>`;
    const img = modalBody.querySelector('img');
    img.addEventListener('error', () => img.classList.add('image-missing'), { once: true });
    modalBody.querySelector('[data-dir="prev"]').onclick = () => openGalleryModal(index > 0 ? index - 1 : images.length - 1);
    modalBody.querySelector('[data-dir="next"]').onclick = () => openGalleryModal(index < images.length - 1 ? index + 1 : 0);
    openModal();
}
window.initGallery = initGallery;
window.openGalleryModal = openGalleryModal;
