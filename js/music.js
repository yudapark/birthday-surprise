// ============================================
// MUSIC.JS - Background Music Controller
// ============================================

let audio = null;
let isMusicPlaying = false;
let musicUnavailable = false;

function initMusic() {
    const toggle = document.getElementById('musicToggle');
    if (!toggle) return;
    
    try {
        audio = new Audio(birthdayConfig.music);
        audio.loop = true;
        audio.volume = 0.38;
        
        audio.addEventListener('play', () => { 
            isMusicPlaying = true; 
            updateMusicIcon(); 
        });
        audio.addEventListener('pause', () => { 
            isMusicPlaying = false; 
            updateMusicIcon(); 
        });
        audio.addEventListener('error', handleMusicError);
        audio.addEventListener('canplaythrough', () => {
            toggle.classList.remove('unavailable');
            musicUnavailable = false;
        });
    } catch (e) {
        handleMusicError();
    }
    
    toggle.addEventListener('click', toggleMusic);
    updateMusicIcon();
}

function handleMusicError() {
    const toggle = document.getElementById('musicToggle');
    musicUnavailable = true;
    isMusicPlaying = false;
    if (toggle) {
        toggle.classList.add('unavailable');
        toggle.disabled = true;
        const icon = toggle.querySelector('.music-icon');
        if (icon) icon.textContent = '🎵';
        toggle.title = 'Musik tidak tersedia';
    }
}

async function toggleMusic() {
    if (musicUnavailable) return;
    if (isMusicPlaying) {
        pauseMusic();
    } else {
        await playMusic();
    }
}

async function playMusic() {
    if (!audio || musicUnavailable) return;
    try {
        await audio.play();
    } catch (e) {
        // Autoplay diblokir browser - user harus klik manual
        isMusicPlaying = false;
        updateMusicIcon();
    }
}

function pauseMusic() {
    if (audio && !musicUnavailable) {
        audio.pause();
    }
}

function updateMusicIcon() {
    const toggle = document.getElementById('musicToggle');
    const icon = toggle?.querySelector('.music-icon');
    if (icon) {
        if (musicUnavailable) {
            icon.textContent = '🎵';
        } else {
            icon.textContent = isMusicPlaying ? '🎵' : '🔇';
        }
    }
    toggle?.classList.toggle('playing', isMusicPlaying && !musicUnavailable);
}

// Expose ke global
window.initMusic = initMusic;
window.toggleMusic = toggleMusic;
window.playMusic = playMusic;
window.pauseMusic = pauseMusic;