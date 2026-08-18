// ============================================
// UNLOCK.JS - Final Unlock Game
// ============================================

let unlockState = {
    unlocked: false,
    attempts: 0,
    maxAttempts: 5
};

function initUnlockGame() {
    const input = document.getElementById('unlockInput');
    const btn = document.getElementById('btnUnlock');
    const feedback = document.getElementById('unlockFeedback');
    const progress = document.getElementById('unlockProgress');
    const progressFill = document.getElementById('progressFill');

    if (!input || !btn || !feedback) return;

    // Enter key support
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            btn.click();
        }
    });

    btn.addEventListener('click', function() {
        if (unlockState.unlocked) return;

        const value = input.value.trim();
        if (!value) {
            feedback.textContent = 'Masukkan sesuatu dulu...';
            feedback.className = 'unlock-feedback error';
            return;
        }

        if (value === birthdayConfig.password) {
            // Success!
            unlockState.unlocked = true;
            feedback.textContent = '🔓 Nah. Ini baru orang yang dicari. 🥹💙';
            feedback.className = 'unlock-feedback success bounce-in';

            input.classList.add('success');
            input.disabled = true;
            btn.disabled = true;

            // Show progress
            progress.classList.remove('hidden');
            let progressValue = 0;
            const interval = setInterval(() => {
                progressValue += 2;
                progressFill.style.width = progressValue + '%';
                if (progressValue >= 100) {
                    clearInterval(interval);
                    // Navigate to letter
                    setTimeout(() => {
                        if (typeof unlockSection === 'function') {
                            unlockSection(8);
                        }
                        navigateToSection(8);
                    }, 500);
                }
            }, 30);

            // Particle effect
            createUnlockParticles();

        } else {
            unlockState.attempts++;
            feedback.textContent = '❌ Belum tepat. Coba inget-inget lagi ya sayang 🥺';
            feedback.className = 'unlock-feedback error';
            input.classList.add('error');
            input.value = '';

            setTimeout(() => {
                input.classList.remove('error');
            }, 500);

            if (unlockState.attempts >= unlockState.maxAttempts) {
                feedback.textContent = '💡 Hint: ' + (birthdayConfig.unlockHint || 'Sesuatu yang spesial antara kita berdua.');
                unlockState.attempts = 0;
            }
        }
    });
}

function createUnlockParticles() {
    const colors = ['#4DA6FF', '#1677D2', '#FF6B6B', '#FFD93D', '#6BCB77', '#FF85A2'];
    const heartEmotes = ['❤️', '💙', '💕', '✨'];

    for (let i = 0; i < 18; i++) {
        setTimeout(() => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 150 + Math.random() * 250;
            const isHeart = Math.random() < 0.3;

            const particle = document.createElement('div');
            particle.className = 'unlock-particle';

            const baseStyle = `
                left: ${50 + (Math.random() - 0.5) * 20}%;
                top: ${50 + (Math.random() - 0.5) * 20}%;
                --tx: ${Math.cos(angle) * distance}px;
                --ty: ${Math.sin(angle) * distance - 100}px;
            `;

            if (isHeart) {
                particle.textContent = heartEmotes[Math.floor(Math.random() * heartEmotes.length)];
                particle.style.cssText = baseStyle + `
                    font-size: ${14 + Math.random() * 12}px;
                    background: none;
                `;
            } else {
                const size = 6 + Math.random() * 14;
                particle.style.cssText = baseStyle + `
                    width: ${size}px;
                    height: ${size}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                    box-shadow: 0 0 20px ${colors[Math.floor(Math.random() * colors.length)]}66;
                `;
            }

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 2500);
        }, i * 50);
    }

    // Follow up with a screen-wide heart burst near the button
    if (typeof createHeartBurst === 'function') {
        const btn = document.getElementById('btnUnlock');
        if (btn) {
            const rect = btn.getBoundingClientRect();
            [0, 250, 500].forEach(delay => {
                setTimeout(() => createHeartBurst(rect.left + rect.width / 2, rect.top), delay);
            });
        }
    }
}

// Expose to global scope
window.initUnlockGame = initUnlockGame;