// ============================================
// NAVIGATION.JS - Narrative Navigation Controller
// ============================================

const sections = [
    'section-opening', 
    'section-question', 
    'section-story', 
    'section-gallery',
    'section-video', 
    'section-quiz', 
    'section-lovecalc',
    'section-unlock',
    'section-letter', 
    'section-final'
];

let currentSection = 0;
let isTransitioning = false;
let highestUnlockedSection = 0;
let navInitialized = false;

function initNavigation() {
    if (navInitialized) return;
    navInitialized = true;

    const indicator = document.getElementById('navIndicator');
    if (!indicator) return;

    const visibleSections = sections.slice(1, -1);
    indicator.innerHTML = visibleSections.map((_, index) =>
        `<button class="nav-dot" data-index="${index + 1}" aria-label="Bagian ${index + 1}" type="button"></button>`
    ).join('');

    indicator.querySelectorAll('.nav-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const index = Number(dot.dataset.index);
            if (index <= highestUnlockedSection) navigateToSection(index);
        });
    });

    document.addEventListener('keydown', e => {
        const activeElement = document.activeElement;
        if (activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName)) {
            return;
        }
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentSection < highestUnlockedSection) navigateToSection(currentSection + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentSection > 0) navigateToSection(currentSection - 1);
        }
    });

    window.currentSection = 0;
    updateNavIndicator(0);
}

function unlockSection(index) {
    if (index < 0 || index >= sections.length) return;
    if (index > highestUnlockedSection) {
        highestUnlockedSection = index;
        updateNavIndicator(currentSection);
    }
}

function navigateToSection(index, force = false) {
    if (isTransitioning || index === currentSection) return;
    if (index < 0 || index >= sections.length) return;
    if (!force && index > highestUnlockedSection) return;

    isTransitioning = true;
    const currentEl = document.getElementById(sections[currentSection]);
    const targetEl = document.getElementById(sections[index]);
    if (!targetEl) { isTransitioning = false; return; }

    if (currentSection === 9 && typeof stopConfetti === 'function') {
        stopConfetti();
    }

    if (document.getElementById('modalOverlay')?.classList.contains('active')) {
    }

    currentEl?.classList.remove('active');
    targetEl.classList.add('active');
    targetEl.style.animation = 'none';
    requestAnimationFrame(() => {
        targetEl.style.animation = 'sectionEntrance 0.6s ease forwards';
    });

    currentSection = index;
    window.currentSection = currentSection;
    updateNavIndicator(index);

    if (index === 8 && typeof startLetterReveal === 'function') startLetterReveal();
    if (index === 9 && typeof startFinalSurprise === 'function') startFinalSurprise();
    if (index === 4 && typeof initVideoFallback === 'function') initVideoFallback();

    const timings = birthdayConfig.timings || { sectionTransition: 520 };
    setTimeout(() => {
        if (typeof triggerReveal === 'function') triggerReveal();
        isTransitioning = false;
    }, timings.sectionTransition || 520);
}

function updateNavIndicator(index) {
    document.querySelectorAll('.nav-dot').forEach((dot, i) => {
        const sectionIndex = i + 1;
        dot.classList.toggle('active', sectionIndex === index);
        dot.classList.toggle('done', sectionIndex < index);
        dot.disabled = sectionIndex > highestUnlockedSection;
        dot.setAttribute('aria-current', sectionIndex === index ? 'step' : 'false');
    });
}

function goToNextSection() {
    const next = currentSection + 1;
    if (next < sections.length) {
        unlockSection(next);
        navigateToSection(next);
    }
}

function goToPrevSection() {
    if (currentSection > 0) navigateToSection(currentSection - 1, true);
}

window.navigateToSection = navigateToSection;
window.goToNextSection = goToNextSection;
window.goToPrevSection = goToPrevSection;
window.unlockSection = unlockSection;
window.currentSection = currentSection;
window.initNavigation = initNavigation;