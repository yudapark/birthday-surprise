// ============================================
// MAIN.JS - Entry Point with Background Particles
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Init background particles
    initBackgroundParticles();
    
    // Mulai animasi loading
    startLoaderAnimation();
    
    // Inisialisasi semua komponen
    initNavigation();
    initMusic();
    initGallery();
    initTimeline();
    initModal();
    initAnimations();
    initConfetti();
    initAmbientLove();
    initQuizGame();
    initLoveCalculator();
    initUnlockGame();
    setupOpening();
    setupQuestion();
    setupLetter();
    setupFinalSurprise();
    setupVideoFallback();
    setupSectionContinueButtons();

    document.getElementById('section-opening')?.classList.add('active');
    updateNavIndicator(0);
});

// ============================================
// LOADER ANIMATION
// ============================================

function startLoaderAnimation() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;

    // Buat floating hearts di background
    createLoaderHearts();

    const progressFill = document.getElementById('loaderProgressFill');
    const progressText = document.getElementById('loaderProgressText');
    const messages = document.querySelectorAll('.loader-message');
    
    if (!progressFill || !progressText) return;

    let progress = 0;
    let messageIndex = 0;
    const totalDuration = 3500;
    const stepDuration = 50;
    const totalSteps = totalDuration / stepDuration;
    const incrementPerStep = 100 / totalSteps;

    if (messages.length > 0) {
        messages[0].classList.add('active');
    }

    const interval = setInterval(() => {
        progress += incrementPerStep;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            progressFill.style.width = '100%';
            progressText.textContent = '100%';
            
            messages.forEach(msg => msg.classList.remove('active', 'exit'));
            if (messages.length > 0) {
                const lastMsg = messages[messages.length - 1];
                lastMsg.classList.add('active');
            }
            
            setTimeout(() => {
                hidePageLoader();
            }, 600);
            
            return;
        }

        const roundedProgress = Math.round(progress);
        progressFill.style.width = roundedProgress + '%';
        progressText.textContent = roundedProgress + '%';

        const messageStep = Math.floor(progress / (100 / messages.length));
        if (messageStep > messageIndex && messageStep < messages.length) {
            if (messages[messageIndex]) {
                messages[messageIndex].classList.remove('active');
                messages[messageIndex].classList.add('exit');
            }
            messageIndex = messageStep;
            if (messages[messageIndex]) {
                setTimeout(() => {
                    messages[messageIndex].classList.add('active');
                }, 100);
            }
        }
    }, stepDuration);
}

function createLoaderHearts() {
    const container = document.getElementById('loaderHeartsBg');
    if (!container) return;
    
    const hearts = ['💙', '💕', '💗', '💖', '💝', '❤️', '✨', '🩵'];
    const count = 10;
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('span');
        heart.className = 'loader-heart-float';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        const size = 12 + Math.random() * 18;
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 6 + Math.random() * 4;
        
        heart.style.cssText = `
            left: ${left}%;
            font-size: ${size}px;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;
        
        container.appendChild(heart);
    }
}

function hidePageLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;
    
    loader.classList.add('hidden-loader');
    setTimeout(() => {
        if (loader.parentNode) loader.remove();
    }, 800);
}

// ============================================
// OPENING SECTION
// ============================================

function setupOpening() {
    const tag = document.getElementById('openingTag');
    const line1 = document.getElementById('openingLine1');
    const line2 = document.getElementById('openingLine2');
    const btn = document.getElementById('btnOpening');
    if (!btn) return;

    [tag, line1, line2, btn].forEach((el, i) => {
        if (el) setTimeout(() => { 
            el.style.animation = `fade-up .9s cubic-bezier(0.22, 1, 0.36, 1) ${i * .22}s forwards`; 
        }, 100 + i * 150);
    });

    btn.addEventListener('click', () => {
        toggleMusic();
        createRipple(btn);
        if (typeof unlockSection === 'function') unlockSection(1);
        setTimeout(() => navigateToSection(1), 350);
    });
}

// ============================================
// QUESTION SECTION
// ============================================

function setupQuestion() {
    const options = document.querySelectorAll('.btn-option-premium');
    const feedback = document.getElementById('questionFeedback');
    const nextBtn = document.getElementById('btnAfterQuestion');
    if (!options.length || !feedback || !nextBtn) return;

    let answered = false;
    options.forEach(btn => btn.addEventListener('click', function () {
        if (answered) return;
        const correct = this.dataset.answer === 'correct';
        this.classList.add(correct ? 'correct' : 'wrong');
        feedback.textContent = correct ? 'Nah, pinter. Ternyata kamu tahu juga. 🥹' : 'Bukan itu, woi. Coba baca pertanyaannya lagi. 🤨';
        feedback.className = `question-feedback ${correct ? 'success' : 'error'}`;

        if (correct) {
            answered = true;
            options.forEach(o => o.disabled = true);
            nextBtn.classList.remove('hidden');
            if (typeof createHeartBurst === 'function') {
                const rect = this.getBoundingClientRect();
                createHeartBurst(rect.left + rect.width / 2, rect.top);
            }
            if (typeof unlockSection === 'function') unlockSection(2);
        } else {
            setTimeout(() => {
                this.classList.remove('wrong');
                feedback.textContent = '';
                feedback.className = 'question-feedback';
            }, 900);
        }
    }));

    nextBtn.addEventListener('click', () => navigateToSection(2));
}

// ============================================
// LETTER SECTION
// ============================================

let letterStarted = false;

function setupLetter() {
    const body = document.getElementById('letterBody');
    const next = document.getElementById('btnAfterLetter');
    if (!body || !next) return;
    body.innerHTML = '';
    next.classList.add('hidden');
    next.addEventListener('click', () => {
        if (typeof unlockSection === 'function') unlockSection(9);
        navigateToSection(9);
    });
}

function startLetterReveal() {
    if (letterStarted) return;
    letterStarted = true;
    const body = document.getElementById('letterBody');
    const next = document.getElementById('btnAfterLetter');
    if (!body || !next) return;

    const text = birthdayConfig.loveLetter.replace('[Sayanggmu]', birthdayConfig.yourName);
    const lines = text.split('\n');
    body.innerHTML = lines.map((line, i) =>
        line.trim() ? `<div class="line" style="animation-delay:${i * .15}s">${escapeHTML(line)}</div>` : '<br>'
    ).join('');

    const delay = Math.max(1500, lines.length * 150 + 1100);
    setTimeout(() => next.classList.remove('hidden'), delay);
}

// ============================================
// FINAL SURPRISE SECTION
// ============================================

let finalStarted = false;

function setupFinalSurprise() {
    const name = document.getElementById('finalName');
    const message = document.querySelector('.final-message');
    const photo = document.querySelector('#finalPhoto img');
    if (name) name.textContent = birthdayConfig.girlfriendName;
    if (message) message.textContent = birthdayConfig.finalMessage;
    if (photo && birthdayConfig.finalPhoto) {
        photo.src = birthdayConfig.finalPhoto;
    }
}

function startFinalSurprise() {
    if (finalStarted) return;
    finalStarted = true;
    const surprise = document.getElementById('finalSurprise');
    const prelude = document.querySelector('.final-prelude');
    const preludeDelay = document.querySelector('.final-prelude-delay');
    const signoff = document.querySelector('.final-signoff');
    if (!surprise) return;

    [prelude, preludeDelay].forEach((el, i) => {
        if (el) setTimeout(() => el.style.animation = 'fade-up 1s cubic-bezier(0.22, 1, 0.36, 1) forwards', 320 + i * 520);
    });

    setTimeout(() => {
        surprise.classList.remove('hidden');
        surprise.style.animation = 'bounce-in-love .9s cubic-bezier(.34,1.56,.64,1) forwards';
        startConfetti();
        createFloatingHearts();
        if (signoff) setTimeout(() => signoff.style.animation = 'fade-up 1s cubic-bezier(0.22, 1, 0.36, 1) forwards', 1200);
    }, 1500);
}

// ============================================
// VIDEO FALLBACK
// ============================================

function setupVideoFallback() {
    const video = document.getElementById('storyVideo');
    if (!video) return;
    video.addEventListener('error', initVideoFallback, { once: true });
}

function initVideoFallback() {
    const wrapper = document.querySelector('.video-wrapper');
    const video = document.getElementById('storyVideo');
    if (!wrapper || !video || wrapper.dataset.fallback === '1') return;
    if (video.readyState >= 2) return;
    wrapper.dataset.fallback = '1';
    wrapper.innerHTML = `<div class="video-fallback"><span>🎬</span><h3>Videonya masih malu-malu.</h3><p>${escapeHTML(birthdayConfig.videoFallbackMessage)}</p></div>`;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function createRipple(element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.className = 'ripple-effect';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width - size) / 2 + 'px';
    ripple.style.top = (rect.height - size) / 2 + 'px';
    element.appendChild(ripple);
    setTimeout(() => {
        if (ripple.parentNode) ripple.remove();
    }, 800);
}

function createFloatingHearts() {
    const hearts = ['❤️', '💕', '💗', '✨'];
    for (let i = 0; i < 8; i++) setTimeout(() => {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `position:fixed;left:${10 + Math.random()*80}%;bottom:-20px;font-size:${16+Math.random()*20}px;z-index:5;pointer-events:none;animation:float-heart ${4.5+Math.random()*3}s cubic-bezier(0.22, 1, 0.36, 1) forwards`;
        document.body.appendChild(heart);
        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, 6500);
    }, i * 250);
}

function setupSectionContinueButtons() {
    document.querySelectorAll('.section-continue').forEach(button => {
        button.addEventListener('click', () => {
            const next = Number(button.dataset.next);
            if (typeof unlockSection === 'function') unlockSection(next);
            navigateToSection(next);
        });
    });
}

function escapeHTML(value = '') {
    const div = document.createElement('div');
    div.textContent = value;
    return div.innerHTML;
}

// ============================================
// EXPOSE KE GLOBAL
// ============================================

window.startLetterReveal = startLetterReveal;
window.startFinalSurprise = startFinalSurprise;
window.initVideoFallback = initVideoFallback;