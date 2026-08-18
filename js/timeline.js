// ============================================
// TIMELINE.JS - Interactive Timeline
// ============================================

function initTimeline() {
    const container = document.getElementById('timelineContainer');
    if (!container) return;

    // Render timeline from config
    const items = birthdayConfig.timeline || [];
    container.innerHTML = items.map((item, index) => {
        return `
            <div class="timeline-item" data-index="${index}">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="date">${item.date}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    ${item.image ? `<img src="${item.image}" alt="${item.title}" class="timeline-img" loading="lazy" onerror="this.classList.add('image-missing')">` : ''}
                </div>
            </div>
        `;
    }).join('');

    // Trigger reveal on visible items
    setTimeout(triggerReveal, 500);
}

function triggerReveal() {
    const items = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    items.forEach(item => observer.observe(item));
}

// Expose to global scope
window.initTimeline = initTimeline;
window.triggerReveal = triggerReveal;