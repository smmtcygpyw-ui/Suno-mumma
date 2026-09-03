document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. MUSIC PLAYER HANDLER
    ========================================== */
    const bgAudio = document.getElementById('bgAudio');
    const musicToggle = document.getElementById('musicToggle');
    const musicWave = document.getElementById('musicWave');
    const musicStatus = musicToggle.querySelector('.music-status');
    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgAudio.pause();
            musicWave.classList.remove('playing');
            musicStatus.textContent = "Play Music";
            isPlaying = false;
        } else {
            bgAudio.play().then(() => {
                musicWave.classList.add('playing');
                musicStatus.textContent = "Playing";
                isPlaying = true;
            }).catch(err => {
                console.log("Audio playback error or file missing:", err);
                alert("Audio file 'mom-song.mp3' missing or blocked by browser.");
            });
        }
    });

    /* ==========================================
       2. SCROLL REVEAL (INTERSECTION OBSERVER)
    ========================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================
       3. NAVIGATION BUTTONS
    ========================================== */
    document.getElementById('openBtn').addEventListener('click', () => {
        document.getElementById('disclaimer').scrollIntoView({ behavior: 'smooth' });
        createHeartBurst();
    });

    document.getElementById('disclaimerBtn').addEventListener('click', () => {
        document.getElementById('apology').scrollIntoView({ behavior: 'smooth' });
    });

    /* ==========================================
       4. BAGGU MINI GAME LOGIC
    ========================================== */
    const bagguActor = document.getElementById('bagguActor');
    const uncleActors = document.getElementById('uncleActors');
    const gameDialogue = document.getElementById('gameDialogue');
    const gameStatus = document.getElementById('gameStatus');

    document.getElementById('btnPlayBaggu').addEventListener('click', () => {
        bagguActor.style.transform = "scale(1.3) rotate(10deg)";
        uncleActors.style.display = "none";
        gameDialogue.textContent = '"YAYYYYY 😭🐻❤️ Mumma game shuru!"';
        gameStatus.textContent = 'Result: Baggu is extremely happy!';
        setTimeout(() => bagguActor.style.transform = "scale(1)", 500);
    });

    document.getElementById('btnHugBaggu').addEventListener('click', () => {
        bagguActor.style.transform = "scale(1.1)";
        uncleActors.style.display = "none";
        gameDialogue.textContent = '"Baggu happy ho gaya! Big hug! 🥹🐻❤️"';
        gameStatus.textContent = 'Result: Loved level 100%';
        setTimeout(() => bagguActor.style.transform = "scale(1)", 500);
    });

    document.getElementById('btnSendUncles').addEventListener('click', () => {
        uncleActors.style.display = "block";
        gameDialogue.textContent = '"Fine! Main unclon ke saath jaa raha hoon patte khelne! 🃏😭"';
        gameStatus.textContent = 'Baggu is joining the uncle gang...';

        setTimeout(() => {
            uncleActors.style.display = "none";
            gameDialogue.textContent = '"Wait... Mumma ko chhod ke nahi jaa sakta! 😂❤️"';
            gameStatus.textContent = 'Result: Baggu returned to Mumma!';
        }, 2500);
    });

    /* ==========================================
       5. FORGIVENESS EXPERIENCE LOGIC
    ========================================== */
    const btnForgive = document.getElementById('btnForgive');
    const btnNeedTime = document.getElementById('btnNeedTime');
    const forgivenessResult = document.getElementById('forgivenessResult');

    btnForgive.addEventListener('click', () => {
        forgivenessResult.style.display = "block";
        forgivenessResult.innerHTML = `
            <h3 style="color: #e11d48; font-size: 1.8rem; margin-bottom: 10px;">MUMMAAAAAA 🥹❤️</h3>
            <p style="font-size: 1.1rem;">Thank you so much!</p>
            <p style="font-weight: 700; margin-top: 8px;">Ab Baggu game karein? 🐻😂</p>
            <p style="color: #6b5c65; margin-top: 5px;">Main aapko phir se irritate kar sakta hoon? 😭</p>
        `;
        createHeartBurst();
    });

    btnNeedTime.addEventListener('click', () => {
        forgivenessResult.style.display = "block";
        forgivenessResult.innerHTML = `
            <h3 style="color: #7c3aed; font-size: 1.5rem; margin-bottom: 10px;">Okay Mumma. ❤️</h3>
            <p style="font-size: 1.05rem;">Take your time. Main samajhta hoon.</p>
            <p style="margin-top: 8px;">Bas ek cheez yaad rakhna...</p>
            <p style="font-weight: 700; color: #db2777; font-size: 1.2rem; margin-top: 5px;">I love you!</p>
        `;
    });

    /* ==========================================
       6. SECRET MODAL POPUP LOGIC
    ========================================== */
    const secretBtn = document.getElementById('secretBtn');
    const secretModal = document.getElementById('secretModal');
    const modalClose = document.getElementById('modalClose');
    const secretText = document.getElementById('secretText');
    const secretNextBtn = document.getElementById('secretNextBtn');

    let secretStep = 0;
    const secretSteps = [
        "Sorry Mumma. 🥺",
        "Okay last time... Sorryyyyyyyyyyy. 😭❤️",
        "Okay genuinely last time.",
        "Love you, Padori! 😂❤️"
    ];

    secretBtn.addEventListener('click', () => {
        secretStep = 0;
        secretText.textContent = secretSteps[secretStep];
        secretModal.style.display = "flex";
    });

    secretNextBtn.addEventListener('click', () => {
        secretStep++;
        if (secretStep < secretSteps.length) {
            secretText.textContent = secretSteps[secretStep];
        } else {
            secretModal.style.display = "none";
        }
    });

    modalClose.addEventListener('click', () => secretModal.style.display = "none");

    /* ==========================================
       7. FLOATING HEART PARTICLES
    ========================================== */
    function createHeartBurst() {
        const container = document.getElementById('particle-container');
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.textContent = ['💖', '🌸', '✨', '🐻', '💗'][Math.floor(Math.random() * 5)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.zIndex = '9999';
            heart.style.pointerEvents = 'none';
            heart.style.transition = 'transform 3s ease-out, opacity 3s ease-out';
            container.appendChild(heart);

            setTimeout(() => {
                heart.style.transform = `translateY(-110vh) rotate(${Math.random() * 360}deg)`;
                heart.style.opacity = '0';
            }, 50);

            setTimeout(() => heart.remove(), 3200);
        }
    }
});

/* ==========================================
   8. LIGHTBOX FUNCTIONS
========================================== */
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}
