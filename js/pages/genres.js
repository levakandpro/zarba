// ============================================================
//  ZARBA — ЖАНРЫ (genres.js)
//  window.renderGenres(container)
//  Полная страница с фильтрацией треков по жанрам из Firebase
// ============================================================

window.renderGenres = function (container) {
    container.innerHTML = '';

    // ── CSS ──────────────────────────────────────────────────
    document.getElementById('genres-styles')?.remove();
    const S = document.createElement('style');
    S.id = 'genres-styles';
    S.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@font-face { font-family: 'fut'; src: url('assets/fonts/fut.ttf') format('truetype'); }

.gnr {
    --bg:    #060606;
    --s1:    #0e0e0e;
    --s2:    #151515;
    --s3:    #1e1e1e;
    --red:   #FF4500;
    --gold:  #FFD700;
    --w:     #ffffff;
    --w70:   rgba(255,255,255,.7);
    --w40:   rgba(255,255,255,.4);
    --w15:   rgba(255,255,255,.05);
    --D:     'Bebas Neue', sans-serif;
    --M:     'fut', sans-serif;
    background: var(--bg);
    min-height: 100vh;
    color: var(--w);
    font-family: 'fut', sans-serif;
    padding-bottom: 120px;
}

/* ── HERO ── */
.gnr-hero {
    position: relative;
    padding: 72px 56px 52px;
    overflow: hidden;
    border-bottom: 1px solid rgba(255,255,255,.04);
}
.gnr-hero::before {
    content: 'GENRES';
    position: absolute; right: -20px; top: -15px;
    font-family: var(--D); font-size: 200px;
    color: rgba(255,69,0,.025); letter-spacing: 8px;
    pointer-events: none; white-space: nowrap;
}
.gnr-hero-eyebrow {
    font-family: var(--M); font-size: 10px;
    letter-spacing: 6px; color: var(--red);
    text-transform: uppercase; margin-bottom: 12px;
    display: flex; align-items: center; gap: 10px;
}
.gnr-hero-eyebrow::before { content:''; display:inline-block; width:24px; height:1px; background:var(--red); }
.gnr-hero-title {
    font-family: var(--M); font-size: clamp(64px,8vw,110px);
    letter-spacing: 4px; line-height: .9; color: var(--w);
    margin-bottom: 16px;
}
.gnr-hero-title span { color: var(--red); }
.gnr-hero-sub {
    font-size: 14px; font-weight: 500; letter-spacing: 1px;
    color: #ccc; border-left: 2px solid var(--red);
    padding-left: 14px; margin-top: 8px;
}

/* ── GENRE GRID ── */
.gnr-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 40px 56px;
}
@media(max-width:1200px) { .gnr-grid { grid-template-columns: repeat(3,1fr); padding: 32px 40px; } }
@media(max-width:800px)  { .gnr-grid { grid-template-columns: repeat(2,1fr); padding: 24px 20px; } }
@media(max-width:500px)  { .gnr-grid { grid-template-columns: 1fr; padding: 20px 16px; } }

.gnr-card {
    position: relative;
    background: var(--s1);
    border: 1px solid rgba(255,255,255,.05);
    border-radius: 14px;
    padding: 28px 22px;
    cursor: pointer;
    transition: all .35s cubic-bezier(.16,1,.3,1);
    overflow: hidden;
    animation: gnr-in .4s ease both;
}
@keyframes gnr-in { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
.gnr-card:nth-child(1)  { animation-delay:.04s }
.gnr-card:nth-child(2)  { animation-delay:.08s }
.gnr-card:nth-child(3)  { animation-delay:.12s }
.gnr-card:nth-child(4)  { animation-delay:.16s }
.gnr-card:nth-child(5)  { animation-delay:.20s }
.gnr-card:nth-child(6)  { animation-delay:.24s }
.gnr-card:nth-child(7)  { animation-delay:.28s }
.gnr-card:nth-child(8)  { animation-delay:.32s }

.gnr-card::before {
    content: '';
    position: absolute; inset: 0;
    background: var(--card-glow, rgba(255,69,0,.0));
    opacity: 0; transition: opacity .35s;
    border-radius: 14px;
}
.gnr-card:hover::before { opacity: 1; }
.gnr-card:hover {
    transform: translateY(-6px) scale(1.02);
    border-color: rgba(255,69,0,.3);
    box-shadow: 0 20px 40px rgba(0,0,0,.6), 0 0 0 1px rgba(255,69,0,.1);
}
.gnr-card.active {
    border-color: var(--red);
    box-shadow: 0 0 0 1px var(--red), 0 12px 32px rgba(255,69,0,.2);
}

.gnr-card-bg-emoji {
    position: absolute; right: 16px; top: 16px;
    font-size: 56px; opacity: .07;
    transition: opacity .35s, transform .35s;
    pointer-events: none;
}
.gnr-card:hover .gnr-card-bg-emoji { opacity: .12; transform: scale(1.1) rotate(5deg); }

.gnr-card-emoji { font-size: 32px; margin-bottom: 12px; display: block; }
.gnr-card-name {
    font-family: var(--D); font-size: 30px; letter-spacing: 2px;
    color: var(--w); line-height: 1; margin-bottom: 6px;
}
.gnr-card-count {
    font-family: var(--M); font-size: 10px; letter-spacing: 3px;
    color: var(--w40); text-transform: uppercase;
}
.gnr-card-count strong { color: var(--red); }
.gnr-card-arrow {
    position: absolute; right: 20px; bottom: 20px;
    font-size: 20px; color: var(--w40);
    transition: all .25s;
}
.gnr-card:hover .gnr-card-arrow,
.gnr-card.active .gnr-card-arrow { color: var(--red); transform: translateX(3px); }

/* ── TRACK LIST ── */
.gnr-list-section {
    padding: 0 56px 40px;
    display: none;
    animation: gnr-in .3s ease;
}
@media(max-width:800px) { .gnr-list-section { padding: 0 20px 40px; } }

.gnr-list-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 0 16px;
    border-top: 1px solid rgba(255,255,255,.05);
    margin-bottom: 4px;
}
.gnr-list-title {
    font-family: var(--D); font-size: 36px; letter-spacing: 2px;
    display: flex; align-items: center; gap: 12px;
}
.gnr-list-title-emoji { font-size: 28px; }
.gnr-list-close {
    background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1);
    color: var(--w70); padding: 8px 18px;
    font-family: var(--M); font-size: 10px; letter-spacing: 3px;
    cursor: pointer; transition: all .2s; text-transform: uppercase;
    border-radius: 4px;
}
.gnr-list-close:hover { background: rgba(255,69,0,.1); border-color: var(--red); color: var(--red); }

.gnr-track-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
}

.gnr-track-card {
    background: var(--s1);
    border: 1px solid rgba(255,255,255,.04);
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: all .25s cubic-bezier(.16,1,.3,1);
    animation: gnr-in .3s ease both;
}
.gnr-track-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255,69,0,.25);
    box-shadow: 0 12px 32px rgba(0,0,0,.6);
}
.gnr-track-card.playing {
    border-color: rgba(255,69,0,.5);
    box-shadow: 0 0 20px rgba(255,69,0,.15);
}

.gnr-track-cover {
    aspect-ratio: 1;
    background: var(--s2);
    position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-size: 36px;
}
.gnr-track-cover img {
    width:100%; height:100%; object-fit:cover; display:block;
    transition: transform .4s;
}
.gnr-track-card:hover .gnr-track-cover img { transform: scale(1.06); }
.gnr-track-overlay {
    position: absolute; inset: 0;
    background: rgba(0,0,0,.55);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity .2s;
}
.gnr-track-card:hover .gnr-track-overlay,
.gnr-track-card.playing .gnr-track-overlay { opacity: 1; }
.gnr-play-btn {
    width: 44px; height: 44px; border-radius: 50%;
    background: var(--red); border: none; color: #fff;
    font-size: 16px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: transform .15s, background .15s;
}
.gnr-play-btn:hover { transform: scale(1.1); background: #FF6B00; }

.gnr-track-info { padding: 12px 14px 14px; }
.gnr-track-title {
    font-family: var(--M); font-size: 13px; letter-spacing: .5px;
    color: var(--w); margin-bottom: 3px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.gnr-track-artist {
    font-size: 11px; color: var(--w40); letter-spacing: .5px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.gnr-track-views { font-size: 10px; color: var(--red); margin-top: 6px; }

/* ── PROGRESS BAR ── */
.gnr-prog-bar {
    height: 3px; background: rgba(255,255,255,.08);
    margin-top: 8px; border-radius: 2px; overflow: hidden;
}
.gnr-prog-fill {
    height: 100%; width: 0%; background: var(--red);
    transition: width .1s linear; border-radius: 2px;
}

/* ── LOADING / EMPTY ── */
.gnr-loading {
    display: flex; align-items: center; justify-content: center;
    gap: 12px; padding: 56px; color: var(--w40); font-size: 13px;
    letter-spacing: 2px;
}
.gnr-spinner {
    width: 18px; height: 18px; border: 2px solid rgba(255,255,255,.1);
    border-top-color: var(--red); border-radius: 50%;
    animation: gnr-spin .65s linear infinite;
}
@keyframes gnr-spin { to { transform: rotate(360deg); } }

.gnr-empty {
    display: flex; flex-direction: column; align-items: center;
    padding: 56px; gap: 10px; color: var(--w40); font-size: 13px;
}
.gnr-empty-emoji { font-size: 40px; opacity: .3; margin-bottom: 4px; }
`;
    document.head.appendChild(S);

    // ── ДАННЫЕ ЖАНРОВ ──────────────────────────────────────
    const GENRES = [
        { id: 'РЭП',         emoji: '', glow: 'rgba(255,69,0,.08)'    },
        { id: 'ТРЭП',        emoji: '', glow: 'rgba(100,50,200,.08)'  },
        { id: 'ЛИРИКА',      emoji: '',  glow: 'rgba(50,150,255,.08)'  },
        { id: 'ПОЭТЕССА',    emoji: '', glow: 'rgba(255,100,180,.08)' },
        { id: 'АНДЕРГРАУНД', emoji: '',  glow: 'rgba(80,80,80,.12)'   },
        { id: 'ПОП',         emoji: '', glow: 'rgba(255,215,0,.08)'   },
        { id: 'ПРОДЮСЕР',    emoji: '',  glow: 'rgba(0,200,100,.08)'  },
        { id: 'КАЛЬЯННЫЙ',   emoji: '', glow: 'rgba(150,200,150,.08)' },
    ];

    // ── HTML ───────────────────────────────────────────────
    container.innerHTML = `
    <div class="gnr">
        <div class="gnr-hero">
            <div class="gnr-hero-eyebrow">Zarba Music</div>
            <h1 class="gnr-hero-title">ЖАН<span>РЫ</span></h1>
            <p class="gnr-hero-sub">Выбери жанр - слушай треки из базы ZARBA</p>
        </div>

        <div class="gnr-grid" id="gnr-grid">
            ${GENRES.map(g => `
                <div class="gnr-card" data-genre="${g.id}" style="--card-glow:${g.glow}">
                    <span class="gnr-card-bg-emoji">${g.emoji}</span>
                    <span class="gnr-card-emoji">${g.emoji}</span>
                    <div class="gnr-card-name">${g.id}</div>
                    <div class="gnr-card-count"><strong id="cnt-${g.id}">···</strong> треков</div>
                    <span class="gnr-card-arrow">→</span>
                </div>
            `).join('')}
        </div>

        <div class="gnr-list-section" id="gnr-list-section">
            <div class="gnr-list-header">
                <div class="gnr-list-title">
                    <span class="gnr-list-title-emoji" id="gnr-list-emoji"></span>
                    <span id="gnr-list-title-text"></span>
                </div>
                <button class="gnr-list-close" onclick="window._gnrCloseList()">✕ ЗАКРЫТЬ</button>
            </div>
            <div class="gnr-track-grid" id="gnr-track-grid">
                <div class="gnr-loading"><div class="gnr-spinner"></div>Загрузка...</div>
            </div>
        </div>
    </div>`;

    // ── STATE ──────────────────────────────────────────────
    let activeGenre = null;
    let curAudio = null;
    let curCard = null;

    function stopCurrent() {
        if (curAudio) { curAudio.pause(); curAudio.currentTime = 0; curAudio = null; }
        if (curCard) {
            curCard.classList.remove('playing');
            const btn = curCard.querySelector('.gnr-play-btn');
            if (btn) btn.textContent = '▶';
            const fill = curCard.querySelector('.gnr-prog-fill');
            if (fill) fill.style.width = '0%';
            curCard = null;
        }
    }

    window._gnrCloseList = function () {
        const sec = container.querySelector('#gnr-list-section');
        if (sec) sec.style.display = 'none';
        container.querySelectorAll('.gnr-card').forEach(c => c.classList.remove('active'));
        stopCurrent();
        activeGenre = null;
    };

    function formatViews(n) {
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
        if (n >= 1000)    return (n / 1000).toFixed(1) + 'K';
        return n || 0;
    }

    function makeTrackCard(data, id) {
        const card = document.createElement('div');
        card.className = 'gnr-track-card';
        card.dataset.id = id;
        card.dataset.src = data.url || '';
        card.innerHTML = `
            <div class="gnr-track-cover">
                ${data.coverUrl
                    ? `<img src="${data.coverUrl}" alt="cover" loading="lazy">`
                    : `<span style="font-size:36px;opacity:.3">🎵</span>`}
                <div class="gnr-track-overlay">
                    <button class="gnr-play-btn">▶</button>
                </div>
            </div>
            <div class="gnr-track-info">
                <div class="gnr-track-title">${data.title || '—'}</div>
                <div class="gnr-track-artist">${data.artist || '—'}</div>
                <div class="gnr-track-views">▶ ${formatViews(data.views)}</div>
                <div class="gnr-prog-bar"><div class="gnr-prog-fill"></div></div>
            </div>`;

        const audio = new Audio(data.url);
        const playBtn = card.querySelector('.gnr-play-btn');
        const progFill = card.querySelector('.gnr-prog-fill');

        card.addEventListener('click', () => {
            if (curAudio === audio && !audio.paused) {
                stopCurrent();
                return;
            }
            stopCurrent();
            audio.play();
            card.classList.add('playing');
            playBtn.textContent = '⏹';
            curAudio = audio;
            curCard = card;

            audio.addEventListener('timeupdate', () => {
                if (audio.duration) {
                    progFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
                }
                // view count after 10s
                if (!audio.viewCounted && audio.currentTime > 10) {
                    audio.viewCounted = true;
                    import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js").then(({ doc, updateDoc, increment }) => {
                        updateDoc(doc(window.firebaseDb, 'tracks', id), { views: increment(1) }).catch(() => {});
                    });
                }
            });
            audio.addEventListener('ended', () => {
                card.classList.remove('playing');
                playBtn.textContent = '▶';
                progFill.style.width = '0%';
                curAudio = null; curCard = null;
            });
        });

        return card;
    }

    // ── FIREBASE LOGIC ─────────────────────────────────────
    async function loadGenreCounts() {
        if (!window.firebaseDb) return;
        try {
            const { collection, getDocs, query, where } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
            for (const g of GENRES) {
                const snap = await getDocs(query(
                    collection(window.firebaseDb, 'tracks'),
                    where('genre', '==', g.id)
                ));
                const el = container.querySelector(`#cnt-${g.id.replace(/[^a-zA-Zа-яА-Я0-9]/g, '_')}`);
                const el2 = container.querySelector(`#cnt-${g.id}`);
                if (el2) el2.textContent = snap.size;
            }
        } catch(e) { console.error('Genre counts error:', e); }
    }

    async function loadGenreTracks(genreId) {
        const grid = container.querySelector('#gnr-track-grid');
        grid.innerHTML = `<div class="gnr-loading"><div class="gnr-spinner"></div>ЗАГРУЗКА...</div>`;
        try {
            const { collection, getDocs, query, where, orderBy } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
            const snap = await getDocs(query(
                collection(window.firebaseDb, 'tracks'),
                where('genre', '==', genreId)
            ));
            grid.innerHTML = '';
            if (snap.empty) {
                grid.innerHTML = `<div class="gnr-empty"><div class="gnr-empty-emoji">🎵</div>Нет треков в жанре ${genreId}</div>`;
                return;
            }
            let idx = 0;
            snap.forEach(ds => {
                const card = makeTrackCard(ds.data(), ds.id);
                card.style.animationDelay = (idx * 0.04) + 's';
                grid.appendChild(card);
                idx++;
            });
        } catch(e) {
            grid.innerHTML = `<div class="gnr-empty"><div class="gnr-empty-emoji">⚠️</div>Ошибка загрузки</div>`;
        }
    }

    // ── GENRE CARD CLICKS ──────────────────────────────────
    container.querySelectorAll('.gnr-card').forEach(card => {
        card.addEventListener('click', () => {
            const gId = card.dataset.genre;
            const sec = container.querySelector('#gnr-list-section');
            const titleEl = container.querySelector('#gnr-list-title-text');
            const emojiEl = container.querySelector('#gnr-list-emoji');
            const gData = GENRES.find(g => g.id === gId);

            if (activeGenre === gId) {
                window._gnrCloseList();
                return;
            }
            stopCurrent();
            activeGenre = gId;
            container.querySelectorAll('.gnr-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            sec.style.display = 'block';
            sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (titleEl) titleEl.textContent = gId;
            if (emojiEl) emojiEl.textContent = gData ? gData.emoji : '';

            loadGenreTracks(gId);
        });
    });

    // ── INIT ───────────────────────────────────────────────
    function waitForFirebase(cb) {
        if (window.firebaseDb) { cb(); return; }
        let t = 0;
        const iv = setInterval(() => {
            if (window.firebaseDb) { clearInterval(iv); cb(); }
            if (++t > 25) clearInterval(iv);
        }, 300);
    }

    waitForFirebase(() => loadGenreCounts());
};