// ============================================
// LOVE-CALCULATOR.JS - Love Calculator Game
// ============================================

let loveCalcState = {
    isCalculating: false,
    resultShown: false
};

function initLoveCalculator() {
    const container = document.getElementById('loveCalcContainer');
    if (!container) {
        console.warn('Love Calculator container not found');
        return;
    }

    const config = birthdayConfig.loveCalculator || {};
    const defaultName1 = config.defaultName1 || 'Sayangku';
    const defaultName2 = config.defaultName2 || 'Akuu';

    container.innerHTML = `
        <div class="lovecalc-box">
            <div class="lovecalc-illustration">
                <span class="lovecalc-heart-big">💕</span>
            </div>
            
            <div class="lovecalc-inputs">
                <div class="input-group">
                    <label for="loveName1">
                        <span class="input-icon">👩</span> Nama Kamu
                    </label>
                    <input type="text" id="loveName1" class="lovecalc-input" 
                           placeholder="Masukkan nama kamu..." value="${defaultName1}">
                </div>
                
                <div class="lovecalc-vs">
                    <span>💞</span>
                </div>
                
                <div class="input-group">
                    <label for="loveName2">
                        <span class="input-icon">👨</span> Nama Dia
                    </label>
                    <input type="text" id="loveName2" class="lovecalc-input" 
                           placeholder="Masukkan nama dia..." value="${defaultName2}">
                </div>
            </div>
            
            <button class="btn-primary lovecalc-btn" id="btnLoveCalc">
                <span class="btn-text">Hitung Cinta</span>
                <span class="btn-icon">💖</span>
            </button>
            
            <div class="lovecalc-result hidden" id="loveResult">
                <div class="love-result-content">
                    <div class="love-percentage-container">
                        <div class="love-number" id="loveNumber">0%</div>
                        <div class="love-bar-container">
                            <div class="love-bar">
                                <div class="love-fill" id="loveFill" style="width: 0%"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="love-message-container">
                        <div class="love-emojis" id="loveEmojis">
                            <span>💕</span>
                            <span>❤️</span>
                            <span>💗</span>
                        </div>
                        <p class="love-message" id="loveMessage">Loading...</p>
                    </div>
                    
                    <div class="love-details hidden" id="loveDetails">
                        <div class="love-detail-item">
                            <span class="detail-label">💑 Chemistry</span>
                            <span class="detail-value" id="loveChemistry">100%</span>
                        </div>
                        <div class="love-detail-item">
                            <span class="detail-label">💕 Compatibility</span>
                            <span class="detail-value" id="loveCompatibility">100%</span>
                        </div>
                        <div class="love-detail-item">
                            <span class="detail-label">🌟 Destiny</span>
                            <span class="detail-value" id="loveDestiny">100%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const btn = document.getElementById('btnLoveCalc');
    const name1 = document.getElementById('loveName1');
    const name2 = document.getElementById('loveName2');

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            btn.click();
        }
    };
    name1.addEventListener('keydown', handleEnter);
    name2.addEventListener('keydown', handleEnter);

    btn.addEventListener('click', function() {
        if (loveCalcState.isCalculating) return;
        calculateLove();
    });

    if (defaultName1 && defaultName2) {
        setTimeout(() => {
            btn.click();
        }, 500);
    }
}

function calculateLove() {
    if (loveCalcState.isCalculating) return;
    
    const name1 = document.getElementById('loveName1');
    const name2 = document.getElementById('loveName2');
    const btn = document.getElementById('btnLoveCalc');
    const result = document.getElementById('loveResult');
    
    if (!name1 || !name2 || !btn || !result) return;

    loveCalcState.isCalculating = true;
    loveCalcState.resultShown = false;
    
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-text">Menghitung...</span><span class="btn-icon">💫</span>';
    
    result.classList.add('hidden');
    
    const n1 = name1.value.trim() || 'Sayang';
    const n2 = name2.value.trim() || 'Cinta';
    
    const config = birthdayConfig.loveCalculator || {};
    const loadingMessages = config.loadingMessages || [
        'Menghitung cinta... 💭',
        'Menganalisis perasaan... 💕',
        'Melihat ke masa depan... ✨',
        'Mengecek chemistry... ❤️',
        'Memastikan jodoh... 💫'
    ];
    
    let step = 0;
    const totalSteps = loadingMessages.length;
    
    const loadingInterval = setInterval(() => {
        if (step < totalSteps) {
            const messageEl = document.querySelector('.lovecalc-illustration .lovecalc-heart-big');
            if (messageEl) {
                const emojis = ['💕', '❤️', '💗', '💖', '💝'];
                messageEl.textContent = emojis[step % emojis.length];
            }
            step++;
        } else {
            clearInterval(loadingInterval);
        }
    }, 400);
    
    const delay = birthdayConfig.timings?.loveCalcDelay || 2000;
    
    setTimeout(() => {
        clearInterval(loadingInterval);
        
        const resultData = generateLoveResult(n1, n2);
        showLoveResult(resultData);
        
        btn.disabled = false;
        btn.innerHTML = '<span class="btn-text">Hitung Lagi</span><span class="btn-icon">💖</span>';
        loveCalcState.isCalculating = false;
        loveCalcState.resultShown = true;
        
        if (typeof unlockSection === 'function') {
            unlockSection(6);
        }
        
    }, delay);
}

function generateLoveResult(name1, name2) {
    const basePercentage = 85 + Math.random() * 15;
    const percentage = Math.min(100, Math.round(basePercentage));
    
    const chemistry = Math.min(100, Math.round(percentage + (Math.random() * 10 - 5)));
    const compatibility = Math.min(100, Math.round(percentage + (Math.random() * 10 - 5)));
    const destiny = Math.min(100, Math.round(percentage + (Math.random() * 10 - 5)));
    
    const config = birthdayConfig.loveCalculator || {};
    let message;
    
    if (percentage >= 95) {
        message = config.messages?.perfect || '💕 Perfect Match! Kalian memang ditakdirkan bersama! 💕';
    } else if (percentage >= 80) {
        message = config.messages?.high || '❤️ Wow! Cinta kalian sangat kuat! ❤️';
    } else if (percentage >= 65) {
        message = config.messages?.medium || '💗 Cocok banget! Terus jaga hubungan ini ya! 💗';
    } else {
        message = config.messages?.low || '💖 Masih ada chemistry! Cinta itu butuh proses! 💖';
    }
    
    message = message.replace('Kalian', `${name1} & ${name2}`);
    
    return {
        percentage,
        chemistry,
        compatibility,
        destiny,
        message,
        name1,
        name2
    };
}

function showLoveResult(data) {
    const result = document.getElementById('loveResult');
    const numberEl = document.getElementById('loveNumber');
    const fillEl = document.getElementById('loveFill');
    const messageEl = document.getElementById('loveMessage');
    const emojisEl = document.getElementById('loveEmojis');
    const detailsEl = document.getElementById('loveDetails');
    const chemistryEl = document.getElementById('loveChemistry');
    const compatibilityEl = document.getElementById('loveCompatibility');
    const destinyEl = document.getElementById('loveDestiny');
    
    if (!result || !numberEl || !fillEl || !messageEl) return;
    
    result.classList.remove('hidden');
    
    let current = 0;
    const target = data.percentage;
    const duration = 1500;
    const steps = 30;
    const increment = target / steps;
    let step = 0;
    
    const countInterval = setInterval(() => {
        step++;
        current = Math.min(target, Math.round(step * increment));
        numberEl.textContent = current + '%';
        fillEl.style.width = current + '%';
        
        if (current >= 90) {
            fillEl.style.background = 'linear-gradient(90deg, #ff6b6b, #ff4757)';
        } else if (current >= 70) {
            fillEl.style.background = 'linear-gradient(90deg, #ff6b6b, #ff9ff3)';
        } else {
            fillEl.style.background = 'linear-gradient(90deg, #ff9ff3, #a29bfe)';
        }
        
        if (step >= steps) {
            clearInterval(countInterval);
            numberEl.textContent = target + '%';
            fillEl.style.width = target + '%';
            
            setTimeout(() => {
                messageEl.textContent = data.message;
                messageEl.classList.add('bounce-in');
                
                const config = birthdayConfig.loveCalculator || {};
                const emojis = config.resultEmojis || ['❤️', '💕', '💗', '💖', '💝'];
                emojisEl.innerHTML = emojis.map(e => `<span class="love-emoji">${e}</span>`).join('');
                
                if (detailsEl && chemistryEl && compatibilityEl && destinyEl) {
                    detailsEl.classList.remove('hidden');
                    chemistryEl.textContent = data.chemistry + '%';
                    compatibilityEl.textContent = data.compatibility + '%';
                    destinyEl.textContent = data.destiny + '%';
                    
                    document.querySelectorAll('.love-detail-item').forEach((item, i) => {
                        setTimeout(() => {
                            item.classList.add('reveal-detail');
                        }, i * 300);
                    });
                }
                
                if (typeof createHeartBurst === 'function') {
                    const rect = result.getBoundingClientRect();
                    for (let i = 0; i < 3; i++) {
                        setTimeout(() => {
                            createHeartBurst(
                                rect.left + rect.width / 2 + (Math.random() - 0.5) * 100,
                                rect.top + rect.height / 2 + (Math.random() - 0.5) * 50
                            );
                        }, i * 300);
                    }
                }
                
                if (data.percentage >= 85 && typeof startConfetti === 'function') {
                    startConfetti();
                    setTimeout(() => {
                        if (typeof stopConfetti === 'function') {
                            stopConfetti();
                        }
                    }, 3000);
                }
                
            }, 300);
        }
    }, duration / steps);
}

function resetLoveCalculator() {
    loveCalcState.isCalculating = false;
    loveCalcState.resultShown = false;
    
    const result = document.getElementById('loveResult');
    const btn = document.getElementById('btnLoveCalc');
    
    if (result) result.classList.add('hidden');
    if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<span class="btn-text">Hitung Cinta</span><span class="btn-icon">💖</span>';
    }
}

window.initLoveCalculator = initLoveCalculator;
window.calculateLove = calculateLove;
window.resetLoveCalculator = resetLoveCalculator;