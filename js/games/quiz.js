// ============================================
// QUIZ.JS - Guess Me Mini Game
// ============================================

let quizState = {
    currentQuestion: 0,
    score: 0,
    answered: false,
    questions: [],
    finished: false
};

const QUIZ_SUCCESS_MSGS = [
    '✅ Yes! Kamu emang paling ngerti aku. 🥰',
    '✅ Betul banget! Kamu jago deh 😆💙',
    '✅ Correct! Cieee tau banget ✨',
    '✅ Bener! Makin sayang deh sama kamu 💕'
];

const QUIZ_ERROR_MSGS = [
    '❌ Yah... coba lagi ya sayang 🥺',
    '❌ Hampir! Tapi belum tepat nih 😅',
    '❌ Eits, bukan itu jawabannya 🙈',
    '❌ Yah salah, tapi tetep gemesin kok 😚'
];

function initQuizGame() {
    const container = document.getElementById('quizContainer');
    if (!container) return;

    quizState.questions = birthdayConfig.quizQuestions || [];
    quizState.currentQuestion = 0;
    quizState.score = 0;
    quizState.finished = false;

    renderQuizQuestion();
}

function renderQuizQuestion() {
    const container = document.getElementById('quizContainer');
    if (!container) return;

    const questions = quizState.questions;
    
    if (quizState.currentQuestion >= questions.length || quizState.finished) {
        // Quiz finished
        quizState.finished = true;
        const perfect = quizState.score === questions.length;
        container.innerHTML = `
            <div class="quiz-result bounce-in">
                <span class="result-emote">${perfect ? '🏆' : '🎈'}</span>
                <h3 style="color: var(--deep-blue); margin-bottom: 8px;">Selesai! ✨</h3>
                <p>Skor kamu: <strong>${quizState.score}</strong> dari ${questions.length} 💙</p>
                <p style="color: var(--gray); font-size: 0.9rem; margin-top: 8px;">
                    ${perfect ? 'Perfect! Kamu benar-benar mengenalku luar dalam ❤️🥹' : 'Not bad! Tapi masih bisa lebih kenal aku lagi 😊💕'}
                </p>
                <button class="btn-primary wiggle-hover" style="margin-top: 16px;" id="quizContinueBtn">
                    Lanjut <span class="emote">➡️</span>
                </button>
            </div>
        `;
        
        // FIX: Gunakan event listener untuk navigasi
        document.getElementById('quizContinueBtn')?.addEventListener('click', function() {
            if (typeof unlockSection === 'function') {
                unlockSection(6);
            }
            navigateToSection(6);
        }, { once: true });
        
        return;
    }

    const q = questions[quizState.currentQuestion];
    quizState.answered = false;

    container.innerHTML = `
        <div class="quiz-question">${q.question}</div>
        <div class="quiz-options">
            ${q.options.map((opt, idx) => `
                <button class="answer-btn" data-index="${idx}">${opt}</button>
            `).join('')}
        </div>
        <div class="quiz-feedback" id="quizFeedback"></div>
        <div class="quiz-score">Skor: <span>${quizState.score}</span> / ${questions.length}</div>
    `;

    // Add event listeners
    container.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (quizState.answered) return;
            handleQuizAnswer(parseInt(this.dataset.index));
        });
    });
}

function handleQuizAnswer(index) {
    const q = quizState.questions[quizState.currentQuestion];
    const feedback = document.getElementById('quizFeedback');
    const buttons = document.querySelectorAll('.answer-btn');

    quizState.answered = true;

    // Disable buttons
    buttons.forEach(btn => btn.disabled = true);

    const isCorrect = index === q.correct;

    buttons.forEach((btn, i) => {
        if (i === q.correct) btn.classList.add('correct');
        if (i === index && !isCorrect) btn.classList.add('wrong');
    });

    if (isCorrect) {
        quizState.score++;
        feedback.textContent = QUIZ_SUCCESS_MSGS[Math.floor(Math.random() * QUIZ_SUCCESS_MSGS.length)];
        feedback.className = 'quiz-feedback success bounce-in';
        if (typeof createHeartBurst === 'function') {
            const rect = document.querySelector(`.answer-btn[data-index="${index}"]`)?.getBoundingClientRect();
            if (rect) createHeartBurst(rect.left + rect.width / 2, rect.top);
        }
    } else {
        feedback.textContent = QUIZ_ERROR_MSGS[Math.floor(Math.random() * QUIZ_ERROR_MSGS.length)];
        feedback.className = 'quiz-feedback error';
    }

    // Update score
    const scoreEl = document.querySelector('.quiz-score span');
    if (scoreEl) scoreEl.textContent = quizState.score;

    const timings = birthdayConfig.timings || { quizNext: 1300 };
    // Next question after delay
    setTimeout(() => {
        quizState.currentQuestion++;
        renderQuizQuestion();
    }, timings.quizNext || 1300);
}

// Expose ke global
window.initQuizGame = initQuizGame;