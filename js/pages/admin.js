// ============================================================
//  ZARBA — АДМИН-ПАНЕЛЬ  Apple Edition (admin.js)
// ============================================================

(function () {
    // ── Единый Firebase хелпер — импортируем один раз, кешируем ──
    let _fb = null;
    async function getFirebase() {
        if (_fb) return _fb;
        _fb = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
        return _fb;
    }

    window.renderAdmin = function (container) {
        if (!container) return;

        const styleId = 'zarba-apple-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
    --bg:          #f5f5f7;
    --surface:     #ffffff;
    --surface2:    #f5f5f7;
    --surface3:    #e8e8ed;
    --border:      rgba(0,0,0,0.08);
    --border2:     rgba(0,0,0,0.05);
    --accent:      #0071e3;
    --accent-h:    #0077ed;
    --green:       #34c759;
    --red:         #ff3b30;
    --yellow:      #ff9f0a;
    --purple:      #af52de;
    --cyan:        #32ade6;
    --pink:        #ff2d55;
    --text:        #1d1d1f;
    --text2:       #6e6e73;
    --text3:       #aeaeb2;
    --shadow-sm:   0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05);
    --shadow-md:   0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.05);
    --shadow-lg:   0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06);
    --radius:      14px;
    --radius-sm:   10px;
    --radius-xs:   7px;
    --font:        'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
}

@keyframes fadeUp   { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
@keyframes toastIn  { from { opacity:0; transform:translateY(8px) scale(.96); } to { opacity:1; transform:translateY(0) scale(1); } }
@keyframes toastOut { to   { opacity:0; transform:translateY(4px) scale(.97); } }
@keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:.45; } }
@keyframes spin     { to { transform:rotate(360deg); } }
@keyframes popIn    { from { opacity:0; transform:scale(.95); } to { opacity:1; transform:scale(1); } }

* { box-sizing:border-box; margin:0; padding:0; }

.zap-wrap {
    display:flex; height:88vh;
    background:var(--bg); border-radius:20px;
    overflow:hidden; margin-top:16px;
    font-family:var(--font);
    box-shadow:var(--shadow-lg);
    border:1px solid var(--border);
}

.zap-sidebar {
    width:230px;
    background:rgba(255,255,255,0.85);
    backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
    border-right:1px solid var(--border2);
    display:flex; flex-direction:column;
    padding:24px 12px; flex-shrink:0;
}
.zap-logo { padding:4px 12px 24px; border-bottom:1px solid var(--border); margin-bottom:16px; }
.zap-logo-name { font-size:17px; font-weight:700; color:var(--text); letter-spacing:-.3px; }
.zap-logo-name span { color:var(--accent); }
.zap-logo-sub { font-size:11px; color:var(--text3); margin-top:2px; }

.zap-nav-section { font-size:11px; font-weight:600; color:var(--text3); letter-spacing:.5px; text-transform:uppercase; padding:8px 12px 6px; margin-top:8px; }
.zap-nav-item {
    display:flex; align-items:center; gap:9px;
    padding:9px 12px; border-radius:var(--radius-sm);
    cursor:pointer; color:var(--text2); font-size:14px; font-weight:500;
    transition:all .18s; margin-bottom:2px;
    -webkit-user-select:none; user-select:none;
}
.zap-nav-item:hover { background:rgba(0,0,0,0.04); color:var(--text); }
.zap-nav-item:active { transform:scale(.98); }
.zap-nav-item.active { background:var(--surface); color:var(--accent); box-shadow:var(--shadow-sm); font-weight:600; }
.zap-nav-icon {
    width:28px; height:28px; border-radius:7px;
    display:flex; align-items:center; justify-content:center;
    font-size:14px; background:var(--surface3); flex-shrink:0; transition:.18s;
}
.zap-nav-item.active .zap-nav-icon { background:var(--accent); }
.zap-sidebar-footer { margin-top:auto; padding-top:16px; border-top:1px solid var(--border); }
.zap-status { display:flex; align-items:center; gap:7px; padding:8px 12px; font-size:12px; color:var(--text3); }
.zap-status-dot { width:7px; height:7px; background:var(--green); border-radius:50%; animation:pulse 2.5s infinite; flex-shrink:0; }

.zap-main { flex:1; overflow-y:auto; padding:32px 36px; background:var(--bg); scrollbar-width:thin; scrollbar-color:var(--surface3) transparent; }
.zap-main::-webkit-scrollbar { width:5px; }
.zap-main::-webkit-scrollbar-thumb { background:var(--surface3); border-radius:4px; }
.zap-view { animation:fadeUp .32s cubic-bezier(.4,0,.2,1); }

.zap-page-header { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:28px; }
.zap-page-title { font-size:28px; font-weight:700; color:var(--text); letter-spacing:-.6px; line-height:1; }
.zap-page-sub { font-size:14px; color:var(--text2); margin-top:5px; }
.zap-section-label { font-size:12px; font-weight:600; color:var(--text2); letter-spacing:.2px; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.zap-section-label::after { content:''; flex:1; height:1px; background:var(--border); }
.zap-section-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
.zap-section-title { font-size:17px; font-weight:700; color:var(--text); letter-spacing:-.3px; }

.zap-btn { display:inline-flex; align-items:center; gap:6px; padding:9px 18px; border:none; border-radius:var(--radius-sm); cursor:pointer; font-family:var(--font); font-weight:600; font-size:14px; transition:all .18s; white-space:nowrap; -webkit-user-select:none; user-select:none; }
.zap-btn:active { transform:scale(.97); }
.zap-btn[disabled] { opacity:.45; pointer-events:none; }
.zap-btn-primary { background:var(--accent); color:#fff; box-shadow:0 2px 8px rgba(0,113,227,.3); }
.zap-btn-primary:hover { background:var(--accent-h); box-shadow:0 4px 14px rgba(0,113,227,.4); }
.zap-btn-secondary { background:var(--surface); color:var(--text); border:1px solid var(--border); box-shadow:var(--shadow-sm); }
.zap-btn-secondary:hover { background:var(--surface2); border-color:rgba(0,0,0,.12); }
.zap-btn-danger { background:rgba(255,59,48,.08); color:var(--red); border:1px solid rgba(255,59,48,.15); font-size:13px; padding:7px 14px; }
.zap-btn-danger:hover { background:var(--red); color:#fff; box-shadow:0 3px 12px rgba(255,59,48,.3); }
.zap-btn-save { background:var(--green); color:#fff; font-weight:700; box-shadow:0 2px 8px rgba(52,199,89,.3); }
.zap-btn-save:hover { background:#30d158; box-shadow:0 4px 14px rgba(52,199,89,.4); }
.zap-btn-sm { padding:6px 12px; font-size:12px; }
.zap-spinner-btn { display:inline-block; animation:spin .7s linear infinite; }

.zap-select { background:var(--surface); border:1px solid var(--border); color:var(--text); padding:9px 14px; border-radius:var(--radius-sm); font-family:var(--font); font-size:14px; cursor:pointer; outline:none; transition:.18s; box-shadow:var(--shadow-sm); }
.zap-select:focus { border-color:var(--accent); }
.zap-input { width:100%; background:var(--surface); border:1px solid var(--border); color:var(--text); padding:9px 12px; border-radius:var(--radius-xs); font-family:var(--font); font-size:14px; outline:none; transition:.18s; margin-bottom:7px; box-shadow:var(--shadow-sm); }
.zap-input:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(0,113,227,.12); }
.zap-input::placeholder { color:var(--text3); }

.zap-table-wrap { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-sm); }
.zap-table { width:100%; border-collapse:collapse; }
.zap-table thead th { background:var(--surface2); padding:11px 16px; text-align:left; font-size:11px; font-weight:600; color:var(--text2); letter-spacing:.2px; border-bottom:1px solid var(--border); }
.zap-table tbody tr { border-bottom:1px solid var(--border2); transition:background .12s; }
.zap-table tbody tr:last-child { border-bottom:none; }
.zap-table tbody tr:hover { background:var(--surface2); }
.zap-table td { padding:13px 16px; font-size:14px; color:var(--text); vertical-align:middle; }
.zap-artist { font-weight:600; color:var(--text); font-size:14px; }
.zap-title  { font-size:12px; color:var(--text2); margin-top:2px; }

.zap-tags { display:flex; flex-wrap:wrap; gap:4px; }
.zap-tag { padding:3px 8px; border-radius:100px; font-size:10px; font-weight:600; letter-spacing:.3px; }
.zap-tag-pl     { background:var(--surface2); color:var(--text2); border:1px solid var(--border); }
.zap-tag-radio  { background:rgba(52,199,89,.1); color:var(--green); }
.zap-tag-ring   { background:rgba(255,159,10,.1); color:var(--yellow); }
.zap-tag-new    { background:rgba(50,173,230,.1); color:var(--cyan); }
.zap-tag-top    { background:rgba(175,82,222,.1); color:var(--purple); }
.zap-tag-genre  { background:rgba(255,45,85,.1); color:var(--pink); border:1px solid rgba(255,45,85,.2); }
.zap-views { font-size:13px; font-weight:600; color:var(--green); font-variant-numeric:tabular-nums; }

.zap-pl-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); gap:10px; }
.zap-pl-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:16px 14px; cursor:pointer; transition:all .2s; box-shadow:var(--shadow-sm); }
.zap-pl-card:hover { box-shadow:var(--shadow-md); transform:translateY(-2px); border-color:rgba(0,0,0,.12); }
.zap-pl-card:active { transform:scale(.97); }
.zap-pl-card-icon { width:34px; height:34px; border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:18px; margin-bottom:10px; background:var(--surface2); }
.zap-pl-card-name { font-size:12px; font-weight:700; color:var(--text); }
.zap-pl-card-sub  { font-size:11px; color:var(--text3); margin-top:3px; }

.zap-genre-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); gap:10px; margin-bottom:28px; }
.zap-genre-card {
    background:var(--surface); border:1px solid var(--border); border-radius:var(--radius);
    padding:18px 14px; cursor:pointer; transition:all .2s; box-shadow:var(--shadow-sm);
    display:flex; flex-direction:column; align-items:center; gap:8px; text-align:center;
}
.zap-genre-card:hover { box-shadow:var(--shadow-md); transform:translateY(-2px); }
.zap-genre-card:active { transform:scale(.97); }
.zap-genre-card-emoji { font-size:26px; }
.zap-genre-card-name { font-size:12px; font-weight:700; color:var(--text); letter-spacing:.3px; }
.zap-genre-card-count { font-size:11px; color:var(--text3); }

.zap-track-section { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-sm); }
.zap-track-row { display:flex; align-items:center; gap:12px; padding:12px 16px; border-bottom:1px solid var(--border2); transition:background .12s; }
.zap-track-row:last-child { border-bottom:none; }
.zap-track-row:hover { background:var(--surface2); }
.zap-track-row-info { flex:1; min-width:0; }

.zap-info-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:20px; margin-bottom:20px; box-shadow:var(--shadow-sm); display:flex; gap:14px; align-items:flex-start; }
.zap-info-icon { width:44px; height:44px; border-radius:11px; background:rgba(0,113,227,.1); display:flex; align-items:center; justify-content:center; font-size:22px; flex-shrink:0; }
.zap-info-title { font-size:15px; font-weight:600; color:var(--text); margin-bottom:5px; }
.zap-info-text  { font-size:13px; color:var(--text2); line-height:1.55; }

.zap-loading { display:flex; align-items:center; justify-content:center; padding:48px; gap:10px; color:var(--text3); font-size:13px; }
.zap-spinner { width:17px; height:17px; border:2px solid var(--surface3); border-top-color:var(--accent); border-radius:50%; animation:spin .65s linear infinite; }
.zap-empty { display:flex; flex-direction:column; align-items:center; padding:52px; gap:8px; color:var(--text3); font-size:13px; }
.zap-empty-icon { font-size:34px; opacity:.25; margin-bottom:4px; }
.zap-scan-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:56px; border:1.5px dashed var(--surface3); border-radius:var(--radius); gap:10px; color:var(--text3); font-size:13px; }
.zap-scan-bar { display:flex; align-items:center; gap:10px; margin-bottom:20px; flex-wrap:wrap; }
.zap-counter { font-size:12px; font-weight:600; padding:4px 10px; border-radius:100px; background:rgba(0,113,227,.08); color:var(--accent); border:1px solid rgba(0,113,227,.15); }

.zap-preview { display:inline-flex; align-items:center; gap:6px; padding:5px 12px; background:var(--surface2); border:1px solid var(--border); border-radius:100px; font-size:11px; font-weight:600; color:var(--text2); cursor:pointer; transition:all .18s; width:fit-content; }
.zap-preview:hover { background:var(--surface3); color:var(--text); }
.zap-preview.playing { background:rgba(52,199,89,.1); border-color:rgba(52,199,89,.3); color:var(--green); }
.zap-preview .zdot { width:7px; height:7px; border-radius:50%; background:currentColor; flex-shrink:0; }
.zap-preview.playing .zdot { animation:pulse .8s infinite; }

.zap-switch-sm { position:relative; width:28px; height:16px; flex-shrink:0; }
.zap-switch-sm input { display:none; }
.zap-switch-sm-track { position:absolute; inset:0; background:var(--surface3); border-radius:8px; cursor:pointer; transition:background .2s; }
.zap-switch-sm-track::after { content:''; position:absolute; left:2px; top:2px; width:12px; height:12px; background:#fff; border-radius:50%; box-shadow:0 1px 2px rgba(0,0,0,.2); transition:transform .2s cubic-bezier(.34,1.56,.64,1); }
.zap-switch-sm input:checked + .zap-switch-sm-track { background:var(--green); }
.zap-switch-sm input:checked + .zap-switch-sm-track::after { transform:translateX(12px); }
.zap-switch-sm.blue   input:checked + .zap-switch-sm-track { background:var(--accent); }
.zap-switch-sm.yellow input:checked + .zap-switch-sm-track { background:var(--yellow); }
.zap-switch-sm.purple input:checked + .zap-switch-sm-track { background:var(--purple); }
.zap-switch-sm.cyan   input:checked + .zap-switch-sm-track { background:var(--cyan); }
.zap-switch-sm.pink   input:checked + .zap-switch-sm-track { background:var(--pink); }

.zap-scan-table-wrap { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow-sm); }
.zap-scan-row {
    display:grid;
    grid-template-columns: 56px 170px 1fr 1fr 90px 240px 110px;
    gap:0;
    border-bottom:1px solid var(--border2);
    align-items:center;
    transition:background .12s;
    min-height:52px;
}
.zap-scan-row:last-child { border-bottom:none; }
.zap-scan-row:hover { background:rgba(0,0,0,.015); }
.zap-scan-cell { padding:8px 10px; border-right:1px solid var(--border2); height:100%; display:flex; align-items:center; }
.zap-scan-cell:last-child { border-right:none; }
.zap-scan-file { flex-direction:column; align-items:flex-start; gap:1px; }
.zap-scan-folder-badge { font-size:9px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--accent); }
.zap-scan-fname { font-size:10px; color:var(--text3); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:160px; }
.zap-scan-input { width:100%; background:transparent; border:none; outline:none; font-family:var(--font); font-size:13px; color:var(--text); padding:3px 2px; border-bottom:1px solid transparent; transition:.15s; }
.zap-scan-input:focus { border-bottom-color:var(--accent); background:rgba(0,113,227,.04); border-radius:3px; padding:3px 5px; }
.zap-scan-input::placeholder { color:var(--text3); }

.zap-genre-select {
    width:100%; background:transparent; border:none; outline:none;
    font-family:var(--font); font-size:12px; color:var(--text);
    padding:3px 2px; cursor:pointer; border-bottom:1px solid transparent; transition:.15s;
    -webkit-appearance:none; appearance:none;
}
.zap-genre-select:focus { border-bottom-color:var(--pink); background:rgba(255,45,85,.04); border-radius:3px; padding:3px 5px; }

.zap-mini-chips { display:flex; flex-wrap:wrap; gap:3px; }
.zap-mini-chip input { display:none; }
.zap-mini-chip label { display:block; padding:2px 7px; border-radius:100px; font-size:10px; font-weight:600; cursor:pointer; background:var(--surface2); border:1px solid var(--border); color:var(--text2); transition:all .13s; white-space:nowrap; -webkit-user-select:none; user-select:none; }
.zap-mini-chip label:hover { border-color:var(--accent); color:var(--accent); }
.zap-mini-chip input:checked + label { background:var(--accent); border-color:var(--accent); color:#fff; }

.zap-mini-toggles { display:flex; flex-direction:column; gap:3px; width:100%; }
.zap-mini-toggle { display:flex; align-items:center; justify-content:space-between; gap:6px; }
.zap-mini-toggle-label { font-size:10px; font-weight:500; color:var(--text2); display:flex; align-items:center; gap:3px; white-space:nowrap; }

.zap-scan-header {
    display:grid;
    grid-template-columns: 56px 170px 1fr 1fr 90px 240px 110px;
    background:var(--surface2);
    border-bottom:1px solid var(--border);
}
.zap-scan-header-cell { padding:9px 10px; font-size:10px; font-weight:600; color:var(--text2); letter-spacing:.2px; border-right:1px solid var(--border2); }
.zap-scan-header-cell:last-child { border-right:none; }

#zap-toasts { position:fixed; bottom:26px; right:26px; z-index:99999; display:flex; flex-direction:column; gap:8px; pointer-events:none; }
.zap-toast { background:rgba(255,255,255,.95); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border:1px solid var(--border); color:var(--text); padding:13px 18px; border-radius:var(--radius); box-shadow:var(--shadow-lg); animation:toastIn .28s cubic-bezier(.34,1.56,.64,1) forwards; font-size:13px; font-weight:500; display:flex; align-items:center; gap:9px; min-width:240px; max-width:360px; font-family:var(--font); }
.zap-toast.hiding { animation:toastOut .22s ease forwards; }
.zap-toast-icon { font-size:16px; flex-shrink:0; }
`;
            document.head.appendChild(style);
        }

        if (!document.getElementById('zap-toasts')) {
            const tc = document.createElement('div');
            tc.id = 'zap-toasts';
            document.body.appendChild(tc);
        }

        let currentAudio = null, currentPreviewBtn = null;

        const ZARBA_GENRES = [
            { id: 'РЭП',         emoji: '🎤', label: 'РЭП' },
            { id: 'ТРЭП',        emoji: '🔊', label: 'ТРЭП' },
            { id: 'ЛИРИКА',      emoji: '✍️',  label: 'ЛИРИКА' },
            { id: 'ПОЭТЕССА',    emoji: '🌸', label: 'ПОЭТЕССА' },
            { id: 'АНДЕРГРАУНД', emoji: '🕳️',  label: 'АНДЕРГРАУНД' },
            { id: 'ПОП',         emoji: '⭐', label: 'ПОП' },
            { id: 'ПРОДЮСЕР',    emoji: '🎛️',  label: 'ПРОДЮСЕР' },
            { id: 'КАЛЬЯННЫЙ',   emoji: '💨', label: 'КАЛЬЯННЫЙ' },
        ];

        window.ZarbaAdminCore = {
            tab: 'playlists',
            scannedFiles: [],
            realPlaylists: ['KOMPOT','UNDERGROUND','AROBA MIX','JUMBON JUMBON','OLD SCHOOL','NEW SCHOOL','POP','SAHARAK','SHAB','FITAK','PRIPEVOK'],
            r2Folders: ['All/','radio/','ringtones/','battle/','dj/','collabs/','news/','reklama/'],
            genres: ZARBA_GENRES,

            showToast(msg, type = 'success') {
                const icons = { success:'✅', error:'❌', info:'ℹ️', warn:'⚠️' };
                const c = document.getElementById('zap-toasts');
                const t = document.createElement('div');
                t.className = 'zap-toast';
                t.innerHTML = `<span class="zap-toast-icon">${icons[type]||icons.info}</span>${msg}`;
                c.appendChild(t);
                setTimeout(() => { t.classList.add('hiding'); setTimeout(() => t.remove(), 240); }, 3400);
            },

            togglePreview(audioEl, btnEl) {
                if (currentAudio && currentAudio !== audioEl) {
                    currentAudio.pause(); currentAudio.currentTime = 0;
                    if (currentPreviewBtn) { currentPreviewBtn.classList.remove('playing'); currentPreviewBtn.innerHTML = `<span class="zdot"></span>Preview`; }
                }
                if (audioEl.paused) {
                    audioEl.play(); btnEl.classList.add('playing');
                    btnEl.innerHTML = `<span class="zdot"></span>Stop`;
                    currentAudio = audioEl; currentPreviewBtn = btnEl;
                    audioEl.onended = () => { btnEl.classList.remove('playing'); btnEl.innerHTML = `<span class="zdot"></span>Preview`; currentAudio = null; currentPreviewBtn = null; };
                } else {
                    audioEl.pause(); audioEl.currentTime = 0;
                    btnEl.classList.remove('playing'); btnEl.innerHTML = `<span class="zdot"></span>Preview`;
                    currentAudio = null; currentPreviewBtn = null;
                }
            },

            setTab(t) { this.tab = t; this.render(); if (t === 'music') this.loadDatabase(); if (t === 'bulk') this.loadBulkGenres(); },

            async scanR2() {
                const btn = document.getElementById('r2-scan-btn');
                const list = document.getElementById('r2-files-list');
                const folder = document.getElementById('r2-folder-select').value;
                const workerUrl = "https://zarba-radio-logic.levakandproduction.workers.dev";
                const publicR2  = "https://pub-87fe4609510a4c3fb9a0512f837c3174.r2.dev";
                try {
                    btn.innerHTML = '<span class="zap-spinner-btn">⟳</span> Сканирование...'; btn.disabled = true;
                    list.innerHTML = `<div class="zap-loading"><div class="zap-spinner"></div>Читаем папку <b>${folder}</b>...</div>`;

                    const r = await fetch(`${workerUrl}?folder=${folder}`);
                    if (!r.ok) throw new Error('Worker error');
                    const files = await r.json();
                    if (files.error) throw new Error(files.error);

                    const fb = await getFirebase();
                    const snap = await fb.getDocs(fb.collection(window.firebaseDb, 'tracks'));
                    const existing = new Set(snap.docs.map(d => d.data().fileName));

                    this.scannedFiles = files
                        .filter(f => f.name && !existing.has(f.name))
                        .map(f => ({
                            name: f.name,
                            url: publicR2 + '/' + f.path.split('/').map(s => encodeURIComponent(s)).join('/'),
                            folder
                        }));

                    this.renderScanResults();
                    const counter = document.getElementById('scan-counter');
                    if (counter) { counter.textContent = `${this.scannedFiles.length} новых`; counter.style.display = 'inline-flex'; }
                    this.showToast(
                        this.scannedFiles.length > 0 ? `Найдено: ${this.scannedFiles.length} новых файлов` : 'Всё уже в базе',
                        this.scannedFiles.length > 0 ? 'info' : 'success'
                    );
                } catch(e) {
                    console.error('scanR2 error:', e);
                    this.showToast('Ошибка: ' + e.message, 'error');
                    list.innerHTML = `<div class="zap-empty"><span class="zap-empty-icon">☁️</span>Ошибка соединения</div>`;
                } finally { btn.innerHTML = '↓ Сканировать'; btn.disabled = false; }
            },

            renderScanResults() {
                const list = document.getElementById('r2-files-list');
                if (!this.scannedFiles.length) {
                    list.innerHTML = `<div class="zap-scan-empty"><span style="font-size:32px;opacity:.2">✓</span>Нет новых файлов в этой папке</div>`;
                    return;
                }

                const genreOptions = `<option value="">— Жанр —</option>` +
                    this.genres.map(g => `<option value="${g.id}">${g.emoji} ${g.label}</option>`).join('');

                const HIDDEN_FOLDERS = ['battle/','dj/','reklama/','news/'];
                const isHidden = this.scannedFiles.length > 0 && HIDDEN_FOLDERS.includes(this.scannedFiles[0].folder);

                const rows = this.scannedFiles.map((file, i) => {
                    const id = `tk_${i}`;
                    let artist = '', title = file.name.replace(/\.[^/.]+$/,'');
                    title = title.replace(/^\d+[.\s_]+/, '').trim();
                    title = title.replace(/_/g, ' ').trim();
                    if (title.includes(' - ')) {
                        const p = title.split(' - ');
                        artist = p[0].trim();
                        title  = p.slice(1).join(' - ').trim();
                    }

                    if (isHidden) {
                        return `
                        <div style="display:grid;grid-template-columns:56px 1fr;align-items:center;border-bottom:1px solid var(--border2);min-height:52px;" id="card-${id}">
                            <div style="padding:6px;display:flex;justify-content:center;">
                                <div style="width:40px;height:40px;border-radius:6px;background:var(--surface2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:16px;">🎵</div>
                            </div>
                            <div style="padding:8px 10px;display:flex;align-items:center;gap:16px;">
                                <div style="flex:1;min-width:0;">
                                    <div style="font-weight:600;font-size:13px;color:var(--text);">${artist || '—'}</div>
                                    <div style="font-size:11px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${file.name}</div>
                                </div>
                                <audio id="aud-${id}" src="${file.url}" preload="none"></audio>
                                <button class="zap-preview" onclick="ZarbaAdminCore.togglePreview(document.getElementById('aud-${id}'),this)"><span class="zdot"></span>Preview</button>
                            </div>
                        </div>`;
                    }

                    const chips = this.realPlaylists.map(pl =>
                        `<div class="zap-mini-chip"><input type="checkbox" id="pc-${id}-${pl.replace(/\s/g,'_')}" class="pl-${id}" value="${pl}"><label for="pc-${id}-${pl.replace(/\s/g,'_')}">${pl}</label></div>`
                    ).join('');
                    const autoRadio = file.folder === 'radio/';
                    const autoRing  = file.folder === 'ringtones/';

                    return `
                    <div class="zap-scan-row" id="card-${id}">
                        <div class="zap-scan-cell" style="padding:6px;justify-content:center;width:56px;flex-shrink:0;">
                            <img id="cover-${id}" src="" alt="" style="display:none;width:40px;height:40px;border-radius:6px;object-fit:cover;box-shadow:var(--shadow-sm);">
                            <div id="cover-ph-${id}" style="width:40px;height:40px;border-radius:6px;background:var(--surface2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:16px;">🎵</div>
                        </div>
                        <div class="zap-scan-cell zap-scan-file">
                            <span class="zap-scan-folder-badge">${file.folder}</span>
                            <span class="zap-scan-fname">${file.name}</span>
                            <audio id="aud-${id}" src="${file.url}" preload="none"></audio>
                            <button class="zap-preview" style="margin-top:3px;" onclick="ZarbaAdminCore.togglePreview(document.getElementById('aud-${id}'),this)"><span class="zdot"></span>Preview</button>
                        </div>
                        <div class="zap-scan-cell" style="flex-direction:column;align-items:stretch;gap:4px;">
                            <input class="zap-scan-input" id="title-${id}"  value="${title}"  placeholder="Название">
                            <input class="zap-scan-input" id="artist-${id}" value="${artist}" placeholder="Артист">
                        </div>
                        <div class="zap-scan-cell" style="align-items:flex-start;padding-top:10px;">
                            <div class="zap-mini-chips">${chips}</div>
                        </div>
                        <div class="zap-scan-cell" style="flex-direction:column;align-items:stretch;">
                            <select class="zap-genre-select" id="genre-${id}">${genreOptions}</select>
                        </div>
                        <div class="zap-scan-cell">
                            <div class="zap-mini-toggles">
                                <div class="zap-mini-toggle"><span class="zap-mini-toggle-label">📡 В эфире</span><label class="zap-switch-sm blue"><input type="checkbox" id="aired-${id}" ${autoRadio?'checked':''}><span class="zap-switch-sm-track"></span></label></div>
                                <div class="zap-mini-toggle"><span class="zap-mini-toggle-label">👶 Новичок</span><label class="zap-switch-sm cyan"><input type="checkbox" id="newcomer-${id}"><span class="zap-switch-sm-track"></span></label></div>
                                <div class="zap-mini-toggle"><span class="zap-mini-toggle-label">📊 Топ 10</span><label class="zap-switch-sm purple"><input type="checkbox" id="top10-${id}"><span class="zap-switch-sm-track"></span></label></div>
                                <div class="zap-mini-toggle"><span class="zap-mini-toggle-label">🔥 Топ недели</span><label class="zap-switch-sm yellow"><input type="checkbox" id="weekly-${id}"><span class="zap-switch-sm-track"></span></label></div>
                                <div class="zap-mini-toggle"><span class="zap-mini-toggle-label">🔔 Рингтон</span><label class="zap-switch-sm pink"><input type="checkbox" id="ringtone-${id}" ${autoRing?'checked':''}><span class="zap-switch-sm-track"></span></label></div>
                            </div>
                        </div>
                        <div class="zap-scan-cell" style="justify-content:center;">
                            <button class="zap-btn zap-btn-save zap-btn-sm" onclick="ZarbaAdminCore.publishTrack(${i},'${id}')">Сохранить</button>
                        </div>
                    </div>`;
                }).join('');

                list.innerHTML = isHidden ? `
                    <div style="background:rgba(0,113,227,.04);border:1px solid rgba(0,113,227,.15);border-radius:var(--radius-sm);padding:10px 14px;margin-bottom:12px;font-size:12px;color:var(--accent);font-weight:600;">
                        📡 Скрытая папка — треки играют только в радио, не показываются на сайте
                    </div>
                    <div class="zap-scan-table-wrap">${rows}</div>` : `
                    <div class="zap-scan-table-wrap">
                        <div class="zap-scan-header">
                            <div class="zap-scan-header-cell" style="width:56px;"></div>
                            <div class="zap-scan-header-cell">Файл</div>
                            <div class="zap-scan-header-cell">Название / Артист</div>
                            <div class="zap-scan-header-cell">Плейлисты</div>
                            <div class="zap-scan-header-cell">Жанр</div>
                            <div class="zap-scan-header-cell">Флаги</div>
                            <div class="zap-scan-header-cell">Действие</div>
                        </div>
                        ${rows}
                    </div>`;

                this._loadCovers();

                const sw = document.getElementById('scan-search-wrap');
                if (sw) sw.style.display = 'block';
                const si = document.getElementById('scan-search');
                if (si) {
                    si.oninput = () => {
                        const q = si.value.trim().toLowerCase();
                        document.querySelectorAll('.zap-scan-row').forEach(row => {
                            const text = row.textContent.toLowerCase();
                            row.style.display = (!q || text.includes(q)) ? '' : 'none';
                        });
                    };
                }
            },

            _loadCovers() {
                if (!window.jsmediatags) {
                    const s = document.createElement('script');
                    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js';
                    s.onload = () => this._extractCovers();
                    document.head.appendChild(s);
                } else {
                    this._extractCovers();
                }
            },

            _extractCovers() {
                this.scannedFiles.forEach((file, i) => {
                    const id = `tk_${i}`;
                    const imgEl = document.getElementById(`cover-${id}`);
                    if (!imgEl) return;
                    window.jsmediatags.read(file.url, {
                        onSuccess: (tag) => {
                            const pic = tag.tags && tag.tags.picture;
                            if (pic) {
                                const base64 = pic.data.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
                                const rawUrl = `data:${pic.format};base64,${btoa(base64)}`;
                                const tmpImg = new Image();
                                tmpImg.onload = () => {
                                    const canvas = document.createElement('canvas');
                                    canvas.width = 200; canvas.height = 200;
                                    canvas.getContext('2d').drawImage(tmpImg, 0, 0, 200, 200);
                                    const smallUrl = canvas.toDataURL('image/jpeg', 0.75);
                                    imgEl.src = smallUrl;
                                    imgEl.style.display = 'block';
                                    const ph = document.getElementById(`cover-ph-${id}`);
                                    if (ph) ph.style.display = 'none';
                                    this.scannedFiles[i].coverDataUrl = smallUrl;
                                };
                                tmpImg.src = rawUrl;
                            }
                        },
                        onError: () => {}
                    });
                });
            },

            async publishTrack(idx, id) {
                const file = this.scannedFiles[idx];
                if (!file) { this.showToast('Файл не найден', 'error'); return; }

                let title  = (document.getElementById(`title-${id}`)?.value  || '').trim();
                let artist = (document.getElementById(`artist-${id}`)?.value || '').trim();

                if (!title || title === '—' || !artist || artist === '—') {
                    let name = file.name.replace(/\.[^/.]+$/,'').replace(/_/g,' ').replace(/^\d+[.\s_]+/,'').trim();
                    if (name.includes(' - ')) {
                        const p = name.split(' - ');
                        if (!artist || artist === '—') artist = p[0].trim();
                        if (!title  || title  === '—') title  = p.slice(1).join(' - ').trim();
                    } else {
                        if (!title || title === '—') title = name;
                    }
                }
                const genre      = document.getElementById(`genre-${id}`)?.value || '';
                const isRadio    = document.getElementById(`aired-${id}`)?.checked || false;
                const isAired    = isRadio;
                const isNewcomer = document.getElementById(`newcomer-${id}`)?.checked || false;
                const isTop10    = document.getElementById(`top10-${id}`)?.checked || false;
                const isWeekly   = document.getElementById(`weekly-${id}`)?.checked || false;
                const isRingtone = document.getElementById(`ringtone-${id}`)?.checked || false;
                const playlists  = Array.from(document.querySelectorAll(`.pl-${id}:checked`)).map(c => c.value);

                const card = document.getElementById(`card-${id}`);
                const btn  = card?.querySelector('.zap-btn-save');
                if (btn) { btn.innerHTML = '<span class="zap-spinner-btn">⟳</span>'; btn.disabled = true; }

                try {
                    const fb = await getFirebase();

                    await fb.addDoc(fb.collection(window.firebaseDb, 'tracks'), {
                        fileName:           file.name,
                        folder:             file.folder,
                        title,
                        artist,
                        genre:              genre || null,
                        url:                file.url,
                        playlists,
                        isRadio,
                        isWeeklyTrack:      isAired,
                        isNewcomer,
                        isTop10,
                        isWeekly,
                        isRingtone:         isRingtone || file.folder === 'ringtones/',
                        isRadioExclusive:   isRadio && playlists.length === 0,
                        coverUrl:           file.coverDataUrl || null,
                        views:              0,
                        createdAt:          fb.serverTimestamp()
                    });

                    if (card) {
                        card.style.background  = 'rgba(52,199,89,0.08)';
                        card.style.borderLeft  = '3px solid var(--green)';
                        card.style.transition  = 'all .3s';
                    }
                    if (btn) { btn.innerHTML = '✓ Сохранено'; btn.style.background = 'var(--green)'; btn.disabled = true; }
                    this.showToast(`${artist} — ${title}${genre ? ' · ' + genre : ''}`, 'success');
                    this.loadDatabase();
                } catch(e) {
                    console.error('publishTrack error:', e);
                    if (btn) { btn.innerHTML = 'Сохранить'; btn.disabled = false; }
                    this.showToast('Ошибка сохранения: ' + e.message, 'error');
                }
            },

            parseTrack(d) {
                let artist = d.artist || '';
                let title  = d.title  || '';
                if ((!artist || !title) && d.fileName) {
                    let name = d.fileName.replace(/\.[^/.]+$/,'').replace(/_/g,' ').replace(/^\d+[.\s_]+/,'').trim();
                    if (name.includes(' - ')) {
                        const p = name.split(' - ');
                        if (!artist) artist = p[0].trim();
                        if (!title)  title  = p.slice(1).join(' - ').trim();
                    } else {
                        if (!title) title = name;
                    }
                }
                return { artist: artist || '—', title: title || d.fileName || '—' };
            },

            async loadDatabase() {
                const el = document.getElementById('database-tracks-list');
                if (!el) return;
                el.innerHTML = `<tr><td colspan="5"><div class="zap-loading"><div class="zap-spinner"></div>Загрузка...</div></td></tr>`;
                try {
                    const fb = await getFirebase();
                    const snap = await fb.getDocs(fb.query(fb.collection(window.firebaseDb,'tracks'), fb.orderBy('createdAt','desc'), fb.limit(200)));
                    if (snap.empty) { el.innerHTML=`<tr><td colspan="5"><div class="zap-empty"><span class="zap-empty-icon">🎵</span>База пуста</div></td></tr>`; return; }

                    const all = [];
                    snap.forEach(ds => all.push(ds));
                    const isUncategorized = d => !d.genre && !(d.playlists||[]).length && !d.isRadio && !d.isRingtone && !d.isNewcomer && !d.isTop10 && !d.isWeeklyTrack;
                    const uncategorized = all.filter(ds => isUncategorized(ds.data()));
                    const categorized   = all.filter(ds => !isUncategorized(ds.data()));
                    const sorted = [...uncategorized, ...categorized];

                    const badge = document.getElementById('db-new-badge');
                    if (badge && uncategorized.length > 0) {
                        badge.textContent = `⚠ ${uncategorized.length} без категории — добавь жанр/плейлист`;
                        badge.style.display = 'inline-flex';
                    }

                    const searchEl = document.getElementById('db-search');
                    const renderRows = (filter) => {
                        el.innerHTML = '';
                        sorted.forEach(ds => {
                            const d = ds.data();
                            const { artist, title } = this.parseTrack(d);
                            if (filter) {
                                const q = filter.toLowerCase();
                                if (!artist.toLowerCase().includes(q) && !title.toLowerCase().includes(q)) return;
                            }
                            const uncategorizedRow = isUncategorized(d);
                            let tags = (d.playlists||[]).map(p=>`<span class="zap-tag zap-tag-pl">${p}</span>`).join('');
                            if (d.isRadio)    tags += `<span class="zap-tag zap-tag-radio">Radio</span>`;
                            if (d.isRingtone) tags += `<span class="zap-tag zap-tag-ring">Ring</span>`;
                            if (d.isNewcomer) tags += `<span class="zap-tag zap-tag-new">New</span>`;
                            if (d.isTop10)    tags += `<span class="zap-tag zap-tag-top">Top 10</span>`;
                            const genreInfo = d.genre ? this.genres.find(g=>g.id===d.genre) : null;
                            const genreBadge = genreInfo ? `<span class="zap-tag zap-tag-genre">${genreInfo.emoji} ${genreInfo.label}</span>` : '';
                            const tr = document.createElement('tr');
                            tr.id = `db-row-${ds.id}`;
                            if (uncategorizedRow) tr.style.background = 'rgba(255,159,10,.05)';
                            tr.innerHTML = `
                                <td style="display:flex;align-items:center;gap:12px;">
                                    ${uncategorizedRow ? `<div style="width:4px;height:38px;border-radius:2px;background:var(--yellow);flex-shrink:0;"></div>` : ''}
                                    ${d.coverUrl
                                        ? `<img src="${d.coverUrl}" style="width:38px;height:38px;border-radius:6px;object-fit:cover;flex-shrink:0;box-shadow:var(--shadow-sm);">`
                                        : `<div style="width:38px;height:38px;border-radius:6px;background:var(--surface2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">🎵</div>`
                                    }
                                    <div>
                                        <div class="zap-artist">${artist}</div>
                                        <div class="zap-title">${title}</div>
                                        <audio id="dba-${ds.id}" src="${d.url}" preload="none"></audio>
                                        <button class="zap-preview" style="margin-top:6px;" onclick="ZarbaAdminCore.togglePreview(document.getElementById('dba-${ds.id}'),this)"><span class="zdot"></span>Preview</button>
                                    </div>
                                </td>
                                <td>${genreBadge || '<span style="color:var(--text3)">—</span>'}</td>
                                <td><div class="zap-tags">${tags||'<span style="color:var(--text3)">—</span>'}</div></td>
                                <td><span class="zap-views">${d.views||0}</span></td>
                                <td><button class="zap-btn zap-btn-danger zap-btn-sm" onclick="ZarbaAdminCore.deleteTrack('${ds.id}','${d.title}')">Удалить</button></td>`;
                            el.appendChild(tr);
                        });
                    };
                    renderRows('');
                    if (searchEl) {
                        searchEl.oninput = () => renderRows(searchEl.value.trim());
                    }
                } catch(e) { console.error('loadDatabase:', e); }
            },

            async deleteTrack(id, title) {
                if (!confirm(`Удалить «${title}»?`)) return;
                try {
                    const fb = await getFirebase();
                    await fb.deleteDoc(fb.doc(window.firebaseDb,'tracks',id));
                    const r = document.getElementById(`db-row-${id}`);
                    if (r) { r.style.opacity='0'; r.style.transition='.25s'; setTimeout(()=>r.remove(),260); }
                    this.showToast('Трек удалён','info');
                    setTimeout(()=>this.loadDatabase(),400);
                } catch(e) { this.showToast(e.message,'error'); }
            },

            drawGenres(v) {
                const genreCards = this.genres.map(g => `
                    <div class="zap-genre-card" onclick="ZarbaAdminCore.loadGenreTracks('${g.id}','${g.emoji} ${g.label}')">
                        <div class="zap-genre-card-emoji">${g.emoji}</div>
                        <div class="zap-genre-card-name">${g.label}</div>
                        <div class="zap-genre-card-count">Треки →</div>
                    </div>`).join('');

                v.innerHTML = `
                    <div class="zap-view">
                        <div class="zap-page-header">
                            <div><div class="zap-page-title">Жанры</div><div class="zap-page-sub">Управление треками по жанрам · ${this.genres.length} жанров</div></div>
                        </div>
                        <div class="zap-section-label">Жанры Zarba</div>
                        <div class="zap-genre-grid">${genreCards}</div>
                        <div id="genre-section" style="display:none;animation:fadeUp .3s ease;">
                            <div class="zap-section-header">
                                <div class="zap-section-title" id="genre-section-title"></div>
                                <button class="zap-btn zap-btn-secondary" onclick="document.getElementById('genre-section').style.display='none'">✕ Скрыть</button>
                            </div>
                            <div class="zap-track-section" style="margin-top:12px;"><div id="genre-list"></div></div>
                        </div>
                    </div>`;
            },

            async loadGenreTracks(genreId, genreLabel) {
                const sec   = document.getElementById('genre-section');
                const title = document.getElementById('genre-section-title');
                const list  = document.getElementById('genre-list');
                sec.style.display = 'block';
                sec.scrollIntoView({ behavior:'smooth', block:'start' });
                title.textContent = genreLabel;
                list.innerHTML = `<div class="zap-loading"><div class="zap-spinner"></div>Загрузка треков жанра ${genreLabel}...</div>`;
                try {
                    const fb = await getFirebase();
                    const snap = await fb.getDocs(fb.query(fb.collection(window.firebaseDb,'tracks'), fb.where('genre','==',genreId)));
                    if (snap.empty) { list.innerHTML=`<div class="zap-empty"><span class="zap-empty-icon">🎵</span>Нет треков в жанре ${genreLabel}</div>`; return; }
                    list.innerHTML = '';
                    snap.forEach(ds => {
                        const d = ds.data();
                        const row = document.createElement('div');
                        row.className = 'zap-track-row'; row.id = `gr-${ds.id}`;
                        row.innerHTML = `
                            <div class="zap-track-row-info">
                                <div class="zap-artist">${d.artist}</div>
                                <div class="zap-title">${d.title}</div>
                            </div>
                            <audio id="ga-${ds.id}" src="${d.url}" preload="none"></audio>
                            <button class="zap-preview" onclick="ZarbaAdminCore.togglePreview(document.getElementById('ga-${ds.id}'),this)"><span class="zdot"></span>Preview</button>
                            <span class="zap-views" style="min-width:50px;text-align:right;">${d.views||0}</span>
                            <button class="zap-btn zap-btn-danger zap-btn-sm" onclick="ZarbaAdminCore.deleteTrack('${ds.id}','${d.title}')">Удалить</button>`;
                        list.appendChild(row);
                    });
                } catch(e) { list.innerHTML=`<div class="zap-empty">Ошибка загрузки</div>`; }
            },

            async loadTracksForPlaylist(name) {
                this._showSection(name, true, ()=>this.clearPlaylist(name), async()=>{
                    const fb = await getFirebase();
                    return fb.getDocs(fb.query(fb.collection(window.firebaseDb,'tracks'), fb.where('playlists','array-contains',name)));
                }, ds=>this.removeFromPlaylist(ds.id,name));
            },
            async loadSpecialBlock(field, name) {
                this._showSection(name, true, ()=>this.clearSpecialBlock(field,name), async()=>{
                    const fb = await getFirebase();
                    return fb.getDocs(fb.query(fb.collection(window.firebaseDb,'tracks'), fb.where(field,'==',true)));
                }, ds=>this.removeSpecialFlag(ds.id,field,name));
            },
            async loadFolderTracks(folder) {
                const HIDDEN = ['battle/','dj/','reklama/','news/'];
                if (HIDDEN.includes(folder)) {
                    const WORKER    = "https://zarba-radio-logic.levakandproduction.workers.dev";
                    const PUBLIC_R2 = "https://pub-87fe4609510a4c3fb9a0512f837c3174.r2.dev";
                    const sec    = document.getElementById('pl-section');
                    const titleEl= document.getElementById('pl-title');
                    const list   = document.getElementById('pl-list');
                    const clrBtn = document.getElementById('pl-clear-btn');
                    if (!sec) return;
                    sec.style.display = 'block';
                    sec.scrollIntoView({ behavior:'smooth', block:'start' });
                    titleEl.textContent = `📁 ${folder} (R2)`;
                    clrBtn.style.display = 'none';
                    list.innerHTML = `<div class="zap-loading"><div class="zap-spinner"></div>Загружаем из R2...</div>`;
                    try {
                        const r = await fetch(WORKER + '?folder=' + folder);
                        if (!r.ok) throw new Error('Worker error');
                        const files = await r.json();
                        const audio = files.filter(f => f.name && f.name.match(/\.(mp3|wav|ogg|m4a|aac)$/i));
                        if (!audio.length) { list.innerHTML=`<div class="zap-empty"><span class="zap-empty-icon">🎵</span>Нет файлов в папке ${folder}</div>`; return; }
                        list.innerHTML = '';
                        audio.forEach(f => {
                            const path = f.path || (folder + f.name);
                            const url  = PUBLIC_R2 + '/' + path.split('/').map(s=>encodeURIComponent(s)).join('/');
                            let name = f.name.replace(/\.[^/.]+$/,'').replace(/_/g,' ').replace(/^\d+[.\s_]+/,'').trim();
                            let artist = '', title = name;
                            if (name.includes(' - ')) { const p = name.split(' - '); artist = p[0].trim(); title = p.slice(1).join(' - ').trim(); }
                            const safeId = f.name.replace(/[^a-zA-Z0-9_]/g,'_');
                            const row = document.createElement('div');
                            row.className = 'zap-track-row';
                            row.innerHTML = `
                                <div class="zap-track-row-info">
                                    <div class="zap-artist">${artist || '—'}</div>
                                    <div class="zap-title">${f.name}</div>
                                </div>
                                <audio id="fla-${safeId}" src="${url}" preload="none"></audio>
                                <button class="zap-preview" onclick="ZarbaAdminCore.togglePreview(document.getElementById('fla-${safeId}'),this)"><span class="zdot"></span>Preview</button>
                                <span class="zap-views" style="min-width:50px;text-align:right;font-size:11px;color:var(--text3);">R2</span>`;
                            list.appendChild(row);
                        });
                    } catch(e) { list.innerHTML=`<div class="zap-empty">Ошибка: ${e.message}</div>`; }
                    return;
                }
                this._showSection(`📁 ${folder}`, true, ()=>this.clearFolderTracks(folder), async()=>{
                    const fb = await getFirebase();
                    return fb.getDocs(fb.query(fb.collection(window.firebaseDb,'tracks'), fb.where('folder','==',folder)));
                }, ds=>this.deleteTrack(ds.id,ds.data().title));
            },
            async loadLatestTracks() {
                this._showSection('🆕 Новинки', false, null, async()=>{
                    const fb = await getFirebase();
                    return fb.getDocs(fb.query(fb.collection(window.firebaseDb,'tracks'), fb.orderBy('createdAt','desc'), fb.limit(20)));
                }, ds=>this.deleteTrack(ds.id,ds.data().title));
            },

            async _showSection(title, showClear, onClear, fetchFn, onDelete) {
                const sec    = document.getElementById('pl-section');
                const titleEl= document.getElementById('pl-title');
                const list   = document.getElementById('pl-list');
                const clrBtn = document.getElementById('pl-clear-btn');
                sec.style.display = 'block';
                sec.scrollIntoView({ behavior:'smooth', block:'start' });
                titleEl.textContent = title;
                list.innerHTML = `<div class="zap-loading"><div class="zap-spinner"></div>Загрузка...</div>`;
                clrBtn.style.display = showClear && onClear ? 'inline-flex' : 'none';
                if (onClear) clrBtn.onclick = onClear;
                try {
                    const snap = await fetchFn();
                    if (snap.empty) { list.innerHTML=`<div class="zap-empty"><span class="zap-empty-icon">🎵</span>Нет треков</div>`; return; }
                    list.innerHTML = '';
                    snap.forEach(ds => {
                        const d = ds.data();
                        const row = document.createElement('div');
                        row.className = 'zap-track-row'; row.id = `sr-${ds.id}`;
                        row.innerHTML = `
                            <div class="zap-track-row-info">
                                <div class="zap-artist">${d.artist}</div>
                                <div class="zap-title">${d.title}</div>
                            </div>
                            <audio id="pla-${ds.id}" src="${d.url}" preload="none"></audio>
                            <button class="zap-preview" onclick="ZarbaAdminCore.togglePreview(document.getElementById('pla-${ds.id}'),this)"><span class="zdot"></span>Preview</button>
                            <span class="zap-views" style="min-width:50px;text-align:right;">${d.views||0}</span>
                            <button class="zap-btn zap-btn-danger zap-btn-sm" id="dlbtn-${ds.id}">Убрать</button>`;
                        list.appendChild(row);
                        document.getElementById(`dlbtn-${ds.id}`).addEventListener('click', ()=>onDelete(ds));
                    });
                } catch(e) { list.innerHTML=`<div class="zap-empty">Ошибка загрузки</div>`; }
            },

            async removeFromPlaylist(id, name) {
                if (!confirm(`Убрать из «${name}»?`)) return;
                try {
                    const fb = await getFirebase();
                    const ref = fb.doc(window.firebaseDb,'tracks',id);
                    const snap = await fb.getDoc(ref);
                    if (snap.exists()) {
                        await fb.updateDoc(ref,{playlists:snap.data().playlists.filter(p=>p!==name)});
                        document.getElementById(`sr-${id}`)?.remove();
                        this.showToast(`Убрано из «${name}»`,'info');
                    }
                } catch(e) { this.showToast(e.message,'error'); }
            },
            async clearPlaylist(name) {
                if (!confirm(`Очистить плейлист «${name}»?`)) return;
                try {
                    const fb = await getFirebase();
                    const snap = await fb.getDocs(fb.query(fb.collection(window.firebaseDb,'tracks'), fb.where('playlists','array-contains',name)));
                    for (const ds of snap.docs) await fb.updateDoc(fb.doc(window.firebaseDb,'tracks',ds.id),{playlists:ds.data().playlists.filter(p=>p!==name)});
                    this.showToast(`Плейлист «${name}» очищен`,'info');
                    setTimeout(()=>this.loadTracksForPlaylist(name),400);
                } catch(e) { this.showToast(e.message,'error'); }
            },
            async removeSpecialFlag(id, field, name) {
                if (!confirm(`Убрать из «${name}»?`)) return;
                try {
                    const fb = await getFirebase();
                    await fb.updateDoc(fb.doc(window.firebaseDb,'tracks',id),{[field]:false});
                    document.getElementById(`sr-${id}`)?.remove();
                    this.showToast('Флаг снят','info');
                } catch(e) { this.showToast(e.message,'error'); }
            },
            async clearSpecialBlock(field, name) {
                if (!confirm(`Снять флаг «${name}» у всех?`)) return;
                try {
                    const fb = await getFirebase();
                    const snap = await fb.getDocs(fb.query(fb.collection(window.firebaseDb,'tracks'), fb.where(field,'==',true)));
                    for (const ds of snap.docs) await fb.updateDoc(fb.doc(window.firebaseDb,'tracks',ds.id),{[field]:false});
                    this.showToast(`Блок «${name}» очищен (${snap.size})`,'info');
                    setTimeout(()=>this.loadSpecialBlock(field,name),400);
                } catch(e) { this.showToast(e.message,'error'); }
            },
            async clearFolderTracks(folder) {
                if (!confirm(`Удалить все треки папки «${folder}» из базы?`)) return;
                try {
                    const fb = await getFirebase();
                    const snap = await fb.getDocs(fb.query(fb.collection(window.firebaseDb,'tracks'), fb.where('folder','==',folder)));
                    for (const ds of snap.docs) await fb.deleteDoc(fb.doc(window.firebaseDb,'tracks',ds.id));
                    this.showToast(`Папка «${folder}» очищена (${snap.size})`,'info');
                    setTimeout(()=>this.loadFolderTracks(folder),400);
                } catch(e) { this.showToast(e.message,'error'); }
            },

            drawBulkGenres(v) {
                const genreOptions = this.genres.map(g =>
                    `<option value="${g.id}">${g.emoji} ${g.id}</option>`
                ).join('');

                v.innerHTML = `
                    <div class="zap-view">
                        <div class="zap-page-header">
                            <div>
                                <div class="zap-page-title">Массовые жанры</div>
                                <div class="zap-page-sub">Назначь жанр сразу нескольким трекам</div>
                            </div>
                            <div style="display:flex;gap:10px;align-items:center;">
                                <select id="bulk-genre-select" class="zap-select">${genreOptions}</select>
                                <button class="zap-btn zap-btn-primary" onclick="ZarbaAdminCore.applyBulkGenre()">✓ Назначить выбранным</button>
                                <button class="zap-btn zap-btn-secondary" onclick="ZarbaAdminCore.selectAllBulk()">Выбрать все</button>
                                <button class="zap-btn zap-btn-secondary" onclick="ZarbaAdminCore.deselectAllBulk()">Снять все</button>
                            </div>
                        </div>
                        <div class="zap-info-card" style="margin-bottom:20px;">
                            <div class="zap-info-icon">🏷️</div>
                            <div>
                                <div class="zap-info-title">Как пользоваться</div>
                                <div class="zap-info-text">Отметь треки галочками → выбери жанр вверху → нажми «Назначить выбранным». Треки <b>без жанра</b> выделены жёлтым.</div>
                            </div>
                        </div>
                        <div id="bulk-counter" class="zap-counter" style="display:inline-flex;margin-bottom:14px;">Загрузка...</div>
                        <div class="zap-table-wrap">
                            <table class="zap-table">
                                <thead><tr>
                                    <th style="width:36px;"></th>
                                    <th>Артист / Название</th>
                                    <th>Текущий жанр</th>
                                    <th>Прослушивания</th>
                                </tr></thead>
                                <tbody id="bulk-list"></tbody>
                            </table>
                        </div>
                    </div>`;
                this.loadBulkGenres();
            },

            async loadBulkGenres() {
                const el = document.getElementById('bulk-list');
                const counter = document.getElementById('bulk-counter');
                if (!el) return;
                el.innerHTML = `<tr><td colspan="4"><div class="zap-loading"><div class="zap-spinner"></div>Загрузка всех треков...</div></td></tr>`;
                try {
                    const fb = await getFirebase();
                    const snap = await fb.getDocs(fb.query(fb.collection(window.firebaseDb,'tracks'), fb.orderBy('createdAt','desc')));
                    if (snap.empty) { el.innerHTML=`<tr><td colspan="4"><div class="zap-empty">База пуста</div></td></tr>`; return; }
                    let noGenreCount = 0;
                    el.innerHTML = '';
                    snap.forEach(ds => {
                        const d = ds.data();
                        const hasGenre = d.genre && d.genre !== '';
                        if (!hasGenre) noGenreCount++;
                        const genreInfo = hasGenre ? this.genres.find(g => g.id === d.genre) : null;
                        const tr = document.createElement('tr');
                        tr.id = `bulk-row-${ds.id}`;
                        if (!hasGenre) tr.style.background = 'rgba(255,159,10,.04)';
                        tr.innerHTML = `
                            <td style="text-align:center;">
                                <input type="checkbox" class="bulk-check" data-id="${ds.id}"
                                    style="width:16px;height:16px;cursor:pointer;accent-color:var(--accent);"
                                    ${!hasGenre ? 'checked' : ''}>
                            </td>
                            <td>
                                <div class="zap-artist">${d.artist || '—'}</div>
                                <div class="zap-title">${d.title || '—'}</div>
                            </td>
                            <td>
                                ${genreInfo
                                    ? `<span class="zap-tag zap-tag-genre">${genreInfo.emoji} ${genreInfo.label}</span>`
                                    : `<span style="color:var(--yellow);font-size:12px;font-weight:600;">⚠ Не задан</span>`}
                            </td>
                            <td><span class="zap-views">${d.views || 0}</span></td>`;
                        el.appendChild(tr);
                    });
                    if (counter) {
                        counter.textContent = `${snap.size} треков · ${noGenreCount} без жанра`;
                        counter.style.background   = noGenreCount > 0 ? 'rgba(255,159,10,.12)' : 'rgba(52,199,89,.08)';
                        counter.style.color        = noGenreCount > 0 ? 'var(--yellow)' : 'var(--green)';
                        counter.style.borderColor  = noGenreCount > 0 ? 'rgba(255,159,10,.3)' : 'rgba(52,199,89,.2)';
                    }
                } catch(e) { console.error('loadBulkGenres:', e); }
            },

            selectAllBulk()   { document.querySelectorAll('.bulk-check').forEach(c => c.checked = true); },
            deselectAllBulk() { document.querySelectorAll('.bulk-check').forEach(c => c.checked = false); },

            async applyBulkGenre() {
                const genre = document.getElementById('bulk-genre-select')?.value;
                if (!genre) return;
                const checked = Array.from(document.querySelectorAll('.bulk-check:checked')).map(c => c.dataset.id);
                if (!checked.length) { this.showToast('Выбери хотя бы один трек', 'warn'); return; }
                const btn = document.querySelector('[onclick="ZarbaAdminCore.applyBulkGenre()"]');
                if (btn) { btn.innerHTML = '<span class="zap-spinner-btn">⟳</span> Сохранение...'; btn.disabled = true; }
                try {
                    const fb = await getFirebase();
                    for (const id of checked) {
                        await fb.updateDoc(fb.doc(window.firebaseDb, 'tracks', id), { genre });
                    }
                    const genreInfo = this.genres.find(g => g.id === genre);
                    this.showToast(`${genreInfo?.emoji || ''} ${genre} назначен ${checked.length} трекам`, 'success');
                    this.loadBulkGenres();
                } catch(e) {
                    this.showToast('Ошибка: ' + e.message, 'error');
                } finally {
                    if (btn) { btn.innerHTML = '✓ Назначить выбранным'; btn.disabled = false; }
                }
            },

            render() {
                container.innerHTML = this.getLayout();
                document.querySelectorAll('.zap-nav-item').forEach(el => el.classList.toggle('active', el.dataset.tab === this.tab));
                const view = document.getElementById('zap-viewport');
                switch (this.tab) {
                    case 'playlists': this.drawPlaylists(view); break;
                    case 'music':     this.drawMusic(view); this.loadDatabase(); break;
                    case 'genres':    this.drawGenres(view); break;
                    case 'bulk':      this.drawBulkGenres(view); break;
                    case 'radio':     this.drawRadio(view); break;
                    case 'artists':   this.drawArtists(view); break;
                }
            },

            getLayout() {
                return `
                <div class="zap-wrap">
                    <aside class="zap-sidebar">
                        <div class="zap-logo">
                            <div class="zap-logo-name">Zarba<span>CP</span></div>
                            <div class="zap-logo-sub">Control Panel</div>
                        </div>
                        <div class="zap-nav-section">Управление</div>
                        <div class="zap-nav-item" data-tab="playlists" onclick="ZarbaAdminCore.setTab('playlists')">
                            <span class="zap-nav-icon">◫</span>Плейлисты
                        </div>
                        <div class="zap-nav-item" data-tab="music" onclick="ZarbaAdminCore.setTab('music')">
                            <span class="zap-nav-icon">♫</span>Склад & База
                        </div>
                        <div class="zap-nav-item" data-tab="genres" onclick="ZarbaAdminCore.setTab('genres')">
                            <span class="zap-nav-icon">🎭</span>Жанры
                        </div>
                        <div class="zap-nav-item" data-tab="bulk" onclick="ZarbaAdminCore.setTab('bulk')">
                            <span class="zap-nav-icon">🏷</span>Жанры (Bulk)
                        </div>
                        <div class="zap-nav-item" data-tab="radio" onclick="ZarbaAdminCore.setTab('radio')">
                            <span class="zap-nav-icon">◉</span>Радио
                        </div>
                        <div class="zap-nav-section">Люди</div>
                        <div class="zap-nav-item" data-tab="artists" onclick="ZarbaAdminCore.setTab('artists')">
                            <span class="zap-nav-icon">🎤</span>Заявки & Артисты
                        </div>
                        <div class="zap-sidebar-footer">
                            <div class="zap-status"><span class="zap-status-dot"></span>Firebase онлайн</div>
                        </div>
                    </aside>
                    <main class="zap-main" id="zap-viewport"></main>
                </div>`;
            },

            drawPlaylists(v) {
                const plCards = this.realPlaylists.map(pl => `
                    <div class="zap-pl-card" onclick="ZarbaAdminCore.loadTracksForPlaylist('${pl}')">
                        <div class="zap-pl-card-icon">🎵</div>
                        <div class="zap-pl-card-name">${pl}</div>
                        <div class="zap-pl-card-sub">Треки →</div>
                    </div>`).join('');

                const specials = [
                    {icon:'👶',name:'Новички', fn:"ZarbaAdminCore.loadSpecialBlock('isNewcomer','Новички')"},
                    {icon:'🔔',name:'Рингтоны',fn:"ZarbaAdminCore.loadSpecialBlock('isRingtone','Рингтоны')"},
                    {icon:'📡',name:'В эфире', fn:"ZarbaAdminCore.loadSpecialBlock('isWeeklyTrack','В эфире')"},
                    {icon:'📊',name:'Топ 10',  fn:"ZarbaAdminCore.loadSpecialBlock('isTop10','Топ 10')"},
                    {icon:'🆕',name:'Новинки', fn:"ZarbaAdminCore.loadLatestTracks()"},
                ].map(c=>`
                    <div class="zap-pl-card" onclick="${c.fn}">
                        <div class="zap-pl-card-icon" style="background:transparent;font-size:22px;">${c.icon}</div>
                        <div class="zap-pl-card-name">${c.name}</div>
                        <div class="zap-pl-card-sub">Треки →</div>
                    </div>`).join('');

                const folders = [
                    {folder:'battle/',  icon:'⚔️',name:'Battle'},
                    {folder:'dj/',      icon:'🎧',name:'DJ'},
                    {folder:'collabs/', icon:'🤝',name:'Collabs'},
                    {folder:'news/',    icon:'📰',name:'News'},
                    {folder:'reklama/', icon:'📣',name:'Reklama'},
                    {folder:'All/',     icon:'📁',name:'All'},
                ].map(c=>`
                    <div class="zap-pl-card" onclick="ZarbaAdminCore.loadFolderTracks('${c.folder}')">
                        <div class="zap-pl-card-icon" style="background:transparent;font-size:22px;">${c.icon}</div>
                        <div class="zap-pl-card-name">${c.name}</div>
                        <div class="zap-pl-card-sub">${c.folder} →</div>
                    </div>`).join('');

                v.innerHTML = `
                    <div class="zap-view">
                        <div class="zap-page-header">
                            <div><div class="zap-page-title">Плейлисты</div><div class="zap-page-sub">Управление контентом по категориям</div></div>
                        </div>
                        <div class="zap-section-label">Музыкальные плейлисты</div>
                        <div class="zap-pl-grid" style="margin-bottom:28px;">${plCards}</div>
                        <div class="zap-section-label">Спецблоки</div>
                        <div class="zap-pl-grid" style="margin-bottom:28px;">${specials}</div>
                        <div class="zap-section-label">Папки R2</div>
                        <div class="zap-pl-grid" style="margin-bottom:28px;">${folders}</div>
                        <div id="pl-section" style="display:none;animation:fadeUp .3s ease;">
                            <div class="zap-section-header">
                                <div class="zap-section-title" id="pl-title"></div>
                                <div style="display:flex;gap:8px;">
                                    <button id="pl-clear-btn" class="zap-btn zap-btn-danger" style="display:none;">🗑 Очистить всё</button>
                                    <button class="zap-btn zap-btn-secondary" onclick="document.getElementById('pl-section').style.display='none'">✕ Скрыть</button>
                                </div>
                            </div>
                            <div class="zap-track-section" style="margin-top:12px;"><div id="pl-list"></div></div>
                        </div>
                    </div>`;
            },

            drawMusic(v) {
                const opts = this.r2Folders.map(f=>`<option value="${f}">📁 ${f}</option>`).join('');
                v.innerHTML = `
                    <div class="zap-view">
                        <div class="zap-page-header">
                            <div><div class="zap-page-title">Склад & База</div><div class="zap-page-sub">Импорт из R2 и управление треками</div></div>
                            <button class="zap-btn zap-btn-secondary" onclick="ZarbaAdminCore.bulkUpdateCovers()" style="font-size:12px;">🖼 Обновить обложки всех треков</button>
                        </div>
                        <div class="zap-section-label">1 — Загрузка из Cloudflare R2</div>
                        <div class="zap-scan-bar">
                            <select id="r2-folder-select" class="zap-select">${opts}</select>
                            <button id="r2-scan-btn" class="zap-btn zap-btn-primary" onclick="ZarbaAdminCore.scanR2()">↓ Сканировать</button>
                            <span id="scan-counter" class="zap-counter" style="display:none;"></span>
                        </div>
                        <div style="margin-bottom:10px;display:none;" id="scan-search-wrap">
                            <input id="scan-search" class="zap-input" style="max-width:340px;margin-bottom:0;" placeholder="🔍 Поиск по отсканированным...">
                        </div>
                        <div id="r2-files-list">
                            <div class="zap-scan-empty"><span style="font-size:40px;opacity:.15">☁️</span>Выберите папку и нажмите «Сканировать»</div>
                        </div>
                        <div style="margin-top:40px;">
                            <div class="zap-section-label">2 — Последние в базе</div>
                            <div style="display:flex;gap:10px;align-items:center;margin-bottom:12px;">
                                <input id="db-search" class="zap-input" style="max-width:340px;margin-bottom:0;" placeholder="🔍 Поиск по базе (артист / название)...">
                                <span id="db-new-badge" class="zap-counter" style="display:none;background:rgba(255,159,10,.12);color:var(--yellow);border-color:rgba(255,159,10,.3);"></span>
                            </div>
                            <div class="zap-table-wrap">
                                <table class="zap-table">
                                    <thead><tr><th>Артист / Название</th><th>Жанр</th><th>Теги</th><th>Прослушивания</th><th>Действие</th></tr></thead>
                                    <tbody id="database-tracks-list"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>`;
            },

            drawRadio(v) {
                if (!this.radioFolders) this.radioFolders = { 'battle/': false, 'dj/': false, 'reklama/': false, 'news/': false };
                const FOLDERS_CONFIG = [
                    { folder: 'battle/',  icon: '⚔️',  name: 'BATTLE',  color: '#ff3b30' },
                    { folder: 'dj/',      icon: '🎧',  name: 'DJ',      color: '#af52de' },
                    { folder: 'reklama/', icon: '📣',  name: 'REKLAMA', color: '#ff9f0a' },
                    { folder: 'news/',    icon: '📰',  name: 'NEWS',    color: '#32ade6' },
                ];
                v.innerHTML = `
                    <div class="zap-view">

                        <div class="zap-page-header">
                            <div>
                                <div class="zap-page-title">📻 Радио</div>
                                <div class="zap-page-sub">Управление эфиром</div>
                            </div>
                            <button class="zap-btn zap-btn-primary" onclick="ZarbaAdminCore.loadRadioTracks()">↻ Обновить</button>
                        </div>

                        <div style="margin-bottom:28px;">
                            <div class="zap-section-label">Скрытые папки — включить в эфир</div>
                            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;" id="folder-cards">
                                ${FOLDERS_CONFIG.map(f => `
                                <div id="fcard-${f.folder.replace('/','')}"
                                    onclick="ZarbaAdminCore.toggleRadioFolder('${f.folder}')"
                                    style="background:var(--surface);border:2px solid var(--border);border-radius:var(--radius);padding:20px 16px;cursor:pointer;transition:all .2s;user-select:none;text-align:center;">
                                    <div style="font-size:32px;margin-bottom:8px;">${f.icon}</div>
                                    <div style="font-size:16px;font-weight:800;color:var(--text);margin-bottom:6px;">${f.name}</div>
                                    <div id="fcount-${f.folder.replace('/','')}" style="font-size:12px;color:var(--text3);margin-bottom:12px;">— треков</div>
                                    <div id="fbtn-${f.folder.replace('/','')}" style="display:inline-flex;align-items:center;gap:6px;padding:6px 16px;border-radius:100px;font-size:12px;font-weight:700;background:var(--surface3);color:var(--text2);transition:.2s;">
                                        <span id="fdot-${f.folder.replace('/','')}" style="width:8px;height:8px;border-radius:50%;background:var(--text3);"></span>
                                        ВЫКЛЮЧЕН
                                    </div>
                                </div>`).join('')}
                            </div>
                        </div>

                        <div style="margin-bottom:28px;">
                            <div class="zap-section-label">Расписание — автовключение по времени</div>
                            <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow-sm);">
                                <div id="schedule-rows" style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px;"></div>
                                <div style="display:flex;gap:8px;">
                                    <button class="zap-btn zap-btn-secondary" onclick="ZarbaAdminCore.addScheduleRow()">+ Добавить правило</button>
                                    <button class="zap-btn zap-btn-primary" onclick="ZarbaAdminCore.saveSchedule()">💾 Сохранить</button>
                                </div>
                                <div style="font-size:11px;color:var(--text3);margin-top:10px;">Пример: DJ с 20:00 до 22:00 каждый день — включится автоматически.</div>
                            </div>
                        </div>

                        <div>
                            <div class="zap-section-label">Что сейчас в эфире</div>
                            <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
                                <div id="radio-counter-db" style="flex:1;min-width:140px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:16px 20px;box-shadow:var(--shadow-sm);">
                                    <div style="font-size:11px;font-weight:600;color:var(--text3);margin-bottom:4px;">🗄 FIREBASE</div>
                                    <div style="font-size:28px;font-weight:800;color:var(--accent);">—</div>
                                    <div style="font-size:11px;color:var(--text3);">треков</div>
                                </div>
                                <div id="radio-counter-r2" style="flex:1;min-width:140px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:16px 20px;box-shadow:var(--shadow-sm);">
                                    <div style="font-size:11px;font-weight:600;color:var(--text3);margin-bottom:4px;">☁️ R2 ПАПКИ</div>
                                    <div style="font-size:28px;font-weight:800;color:var(--green);">—</div>
                                    <div style="font-size:11px;color:var(--text3);">треков</div>
                                </div>
                                <div id="radio-counter-all" style="flex:1;min-width:140px;background:var(--accent);border-radius:var(--radius);padding:16px 20px;box-shadow:0 4px 14px rgba(0,113,227,.3);">
                                    <div style="font-size:11px;font-weight:600;color:rgba(255,255,255,.7);margin-bottom:4px;">📻 ИТОГО В ЭФИРЕ</div>
                                    <div style="font-size:28px;font-weight:800;color:#fff;">—</div>
                                    <div style="font-size:11px;color:rgba(255,255,255,.7);">треков</div>
                                </div>
                            </div>
                            <div id="radio-track-list"></div>
                        </div>

                    </div>`;
                this.loadRadioTracks();
                this.loadSchedule();
            },

            async loadRadioTracks() {
                const WORKER    = 'https://zarba-radio-logic.levakandproduction.workers.dev';
                const PUBLIC_R2 = 'https://pub-87fe4609510a4c3fb9a0512f837c3174.r2.dev';
                const HIDDEN    = ['battle/','dj/','reklama/','news/'];

                try {
                    const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');
                    const snap = await getDoc(doc(window.firebaseDb, 'radio_settings', 'folders'));
                    if (snap.exists()) {
                        this.radioFolders = snap.data();
                    }
                } catch(e) {}

                HIDDEN.forEach(async folder => {
                    const key   = folder.replace('/','');
                    const on    = !!(this.radioFolders && this.radioFolders[folder]);
                    const card  = document.getElementById(`fcard-${key}`);
                    const btn   = document.getElementById(`fbtn-${key}`);
                    const dot   = document.getElementById(`fdot-${key}`);
                    const cnt   = document.getElementById(`fcount-${key}`);
                    if (card) {
                        card.style.borderColor  = on ? 'var(--accent)' : 'var(--border)';
                        card.style.background   = on ? 'rgba(0,113,227,.04)' : 'var(--surface)';
                    }
                    if (btn) {
                        btn.style.background = on ? 'var(--accent)' : 'var(--surface3)';
                        btn.style.color      = on ? '#fff' : 'var(--text2)';
                        btn.innerHTML = `<span style="width:8px;height:8px;border-radius:50%;background:${on ? '#fff' : 'var(--text3)'};"></span> ${on ? 'ВКЛЮЧЁН' : 'ВЫКЛЮЧЕН'}`;
                    }
                    if (cnt) {
                        try {
                            const r = await fetch(WORKER + '?folder=' + folder);
                            if (r.ok) {
                                const files = await r.json();
                                const count = Array.isArray(files) ? files.filter(f => f.name && f.name.match(/\.(mp3|wav|ogg|m4a|aac)$/i)).length : 0;
                                cnt.textContent = count + ' треков';
                                cnt.style.color = count > 0 ? 'var(--text2)' : 'var(--text3)';
                            }
                        } catch(e) {}
                    }
                });

                const listEl = document.getElementById('radio-track-list');
                const cntDb  = document.getElementById('radio-counter-db');
                const cntR2  = document.getElementById('radio-counter-r2');
                const cntAll = document.getElementById('radio-counter-all');
                if (!listEl) return;
                listEl.innerHTML = `<div class="zap-loading"><div class="zap-spinner"></div>Загружаем треки...</div>`;

                try {
                    const fb = await getFirebase();
                    const snap = await fb.getDocs(fb.query(fb.collection(window.firebaseDb,'tracks'), fb.where('isRadio','==',true)));
                    const dbTracks = [];
                    snap.forEach(ds => {
                        const d = ds.data();
                        const { artist, title } = this.parseTrack(d);
                        dbTracks.push({ id: ds.id, artist, title, url: d.url, views: d.views||0 });
                    });

                    const folderToggles = this.radioFolders || {};
                    const activeFolders = [...HIDDEN.filter(f => folderToggles[f]), 'radio/'];
                    const r2ByFolder = {};
                    for (const folder of activeFolders) {
                        try {
                            const r = await fetch(WORKER + '?folder=' + folder);
                            if (!r.ok) continue;
                            const files = await r.json();
                            if (!Array.isArray(files)) continue;
                            r2ByFolder[folder] = files.filter(f => f.name && f.name.match(/\.(mp3|wav|ogg|m4a|aac)$/i));
                        } catch(e) { r2ByFolder[folder] = []; }
                    }
                    const r2Total = Object.values(r2ByFolder).reduce((s, a) => s + a.length, 0);
                    const total   = dbTracks.length + r2Total;

                    if (cntDb)  { cntDb.querySelector('div:nth-child(2)').textContent  = dbTracks.length; }
                    if (cntR2)  { cntR2.querySelector('div:nth-child(2)').textContent  = r2Total; }
                    if (cntAll) { cntAll.querySelector('div:nth-child(2)').textContent = total; }

                    if (!total) { listEl.innerHTML = `<div class="zap-empty"><span class="zap-empty-icon">📻</span>Нет треков в ротации</div>`; return; }

                    let html = '';

                    for (const [folder, files] of Object.entries(r2ByFolder)) {
                        if (!files.length) continue;
                        html += `<div class="zap-section-label" style="margin-top:0;">☁️ ${folder.replace('/','').toUpperCase()} — ${files.length} треков</div>
                        <div class="zap-table-wrap" style="margin-bottom:20px;"><table class="zap-table"><tbody>`;
                        files.forEach(f => {
                            const path  = f.path || (folder + f.name);
                            const url   = PUBLIC_R2 + '/' + path.split('/').map(s=>encodeURIComponent(s)).join('/');
                            let name    = f.name.replace(/\.[^/.]+$/,'').replace(/_/g,' ').replace(/^\d+[\.\s_]+/,'').trim();
                            let artist  = '', title = name;
                            if (name.includes(' - ')) { const p = name.split(' - '); artist = p[0].trim(); title = p.slice(1).join(' - ').trim(); }
                            const sid   = f.name.replace(/[^a-zA-Z0-9_]/g,'_');
                            html += `<tr>
                                <td>
                                    <div class="zap-artist">${artist||'—'}</div>
                                    <div class="zap-title">${f.name}</div>
                                    <audio id="r2a-${sid}" src="${url}" preload="none"></audio>
                                    <button class="zap-preview" style="margin-top:4px;" onclick="ZarbaAdminCore.togglePreview(document.getElementById('r2a-${sid}'),this)"><span class="zdot"></span>Preview</button>
                                </td>
                                <td style="width:80px;"><span style="font-size:11px;color:var(--text3);">R2</span></td>
                                <td style="width:90px;"><span style="font-size:11px;color:var(--text3);">файл в R2</span></td>
                            </tr>`;
                        });
                        html += `</tbody></table></div>`;
                    }

                    if (dbTracks.length) {
                        html += `<div class="zap-section-label" style="margin-top:0;">🗄 Firebase — ${dbTracks.length} треков</div>
                        <div class="zap-table-wrap" style="margin-bottom:20px;"><table class="zap-table"><tbody>`;
                        dbTracks.forEach(t => {
                            const sid = t.id.replace(/[^a-zA-Z0-9_]/g,'_');
                            html += `<tr id="rr-${t.id}">
                                <td>
                                    <div class="zap-artist">${t.artist||'—'}</div>
                                    <div class="zap-title">${t.title||'—'}</div>
                                    <audio id="ra-${sid}" src="${t.url}" preload="none"></audio>
                                    <button class="zap-preview" style="margin-top:4px;" onclick="ZarbaAdminCore.togglePreview(document.getElementById('ra-${sid}'),this)"><span class="zdot"></span>Preview</button>
                                </td>
                                <td style="width:80px;"><span class="zap-views">${t.views}</span></td>
                                <td style="width:90px;"><button class="zap-btn zap-btn-danger zap-btn-sm" onclick="ZarbaAdminCore.removeRadioFlag('${t.id}','${t.title}')">Убрать</button></td>
                            </tr>`;
                        });
                        html += `</tbody></table></div>`;
                    }

                    listEl.innerHTML = html;
                } catch(e) {
                    console.error('loadRadioTracks:', e);
                    listEl.innerHTML = `<div class="zap-empty">Ошибка: ${e.message}</div>`;
                }
            },

            async bulkUpdateCovers() {
                if (!window.jsmediatags) {
                    await new Promise(res => {
                        const s = document.createElement('script');
                        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js';
                        s.onload = res; document.head.appendChild(s);
                    });
                }

                const fb = await getFirebase();
                const snap = await fb.getDocs(fb.collection(window.firebaseDb, 'tracks'));
                const tracks = [];
                snap.forEach(ds => {
                    const d = ds.data();
                    if (d.url && !d.coverUrl) tracks.push({ id: ds.id, url: d.url });
                });

                if (!tracks.length) { this.showToast('Все треки уже имеют обложки!', 'info'); return; }

                this.showToast(`Начинаем: ${tracks.length} треков без обложки`, 'info');

                let done = 0, found = 0;

                const compressImage = (rawDataUrl) => new Promise(r => {
                    const img = new Image();
                    img.onload = () => {
                        const c = document.createElement('canvas');
                        c.width = 200; c.height = 200;
                        c.getContext('2d').drawImage(img, 0, 0, 200, 200);
                        r(c.toDataURL('image/jpeg', 0.75));
                    };
                    img.onerror = () => r(null);
                    img.src = rawDataUrl;
                });

                const WORKER = 'https://zarba-radio-logic.levakandproduction.workers.dev';

                const processTrack = async (track) => {
                    try {
                        const PUBLIC_R2 = 'https://pub-87fe4609510a4c3fb9a0512f837c3174.r2.dev/';
                        const filePath = decodeURIComponent(track.url.replace(PUBLIC_R2, ''));
                        const res = await fetch(WORKER + '?file=' + encodeURIComponent(filePath));
                        if (!res.ok) return;
                        const buf = await res.arrayBuffer();

                        await new Promise(resolve => {
                            window.jsmediatags.read(new Blob([buf], { type: 'audio/mpeg' }), {
                                onSuccess: async (tag) => {
                                    const pic = tag.tags && tag.tags.picture;
                                    if (pic) {
                                        try {
                                            const b64 = btoa(pic.data.reduce((a, b) => a + String.fromCharCode(b), ''));
                                            const rawUrl = `data:${pic.format};base64,${b64}`;
                                            const small = await compressImage(rawUrl);
                                            if (small) {
                                                await fb.updateDoc(fb.doc(window.firebaseDb, 'tracks', track.id), { coverUrl: small });
                                                found++;
                                            }
                                        } catch(e) { console.warn('cover save error', e); }
                                    }
                                    resolve();
                                },
                                onError: () => resolve()
                            });
                        });
                    } catch(e) { console.warn('fetch error', track.url, e); }

                    done++;
                    if (done % 5 === 0 || done === tracks.length) {
                        this.showToast(`${done}/${tracks.length} обработано, обложек: ${found}`, 'info');
                    }
                };

                for (let i = 0; i < tracks.length; i += 2) {
                    await Promise.all(tracks.slice(i, i + 2).map(processTrack));
                }

                this.showToast(`✅ Готово! Обложек найдено: ${found} из ${tracks.length}`, 'success');
                this.loadDatabase();
            },

            toggleRadioFolder(folder) {
                if (!this.radioFolders) this.radioFolders = {};
                this.radioFolders[folder] = !this.radioFolders[folder];
                const on  = this.radioFolders[folder];
                const key = folder.replace('/','');
                const lbl   = document.getElementById(`flabel-${key}`);
                const track = document.getElementById(`ftrack-${key}`);
                const thumb = document.getElementById(`fthumb-${key}`);
                if (lbl)   { lbl.style.borderColor = on ? 'var(--accent)' : 'var(--border)'; lbl.style.background = on ? 'rgba(0,113,227,.06)' : 'var(--surface2)'; }
                if (track) track.style.background = on ? 'var(--accent)' : 'var(--surface3)';
                if (thumb) thumb.style.transform  = on ? 'translateX(12px)' : 'translateX(0)';
                (async () => {
                    try {
                        const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
                        await setDoc(doc(window.firebaseDb, 'radio_settings', 'folders'), this.radioFolders);
                        this.showToast(this.radioFolders[folder] ? `${folder.replace('/','').toUpperCase()} включён в эфир` : `${folder.replace('/','').toUpperCase()} выключен`, this.radioFolders[folder] ? 'success' : 'info');
                    } catch(e) { this.showToast('Ошибка сохранения: ' + e.message, 'error'); }
                })();
                this.loadRadioTracks();
            },

            _schedule: [],

            addScheduleRow(data) {
                const container = document.getElementById('schedule-rows');
                if (!container) return;
                const row = document.createElement('div');
                row.style.cssText = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap;';
                const folderOpts = ['battle/','dj/','reklama/','news/'].map(f =>
                    `<option value="${f}" ${data&&data.folder===f?'selected':''}>${f.replace('/','').toUpperCase()}</option>`
                ).join('');
                row.innerHTML = `
                    <select class="zap-select" style="font-size:12px;padding:6px 10px;" data-key="folder">${folderOpts}</select>
                    <span style="font-size:12px;color:var(--text2);">с</span>
                    <input type="time" class="zap-input" style="width:100px;margin-bottom:0;font-size:13px;padding:6px 10px;" data-key="from" value="${data&&data.from||'20:00'}">
                    <span style="font-size:12px;color:var(--text2);">до</span>
                    <input type="time" class="zap-input" style="width:100px;margin-bottom:0;font-size:13px;padding:6px 10px;" data-key="to" value="${data&&data.to||'22:00'}">
                    <select class="zap-select" style="font-size:12px;padding:6px 10px;" data-key="days">
                        <option value="daily" ${!data||data.days==='daily'?'selected':''}>Каждый день</option>
                        <option value="weekdays" ${data&&data.days==='weekdays'?'selected':''}>Пн–Пт</option>
                        <option value="weekends" ${data&&data.days==='weekends'?'selected':''}>Сб–Вс</option>
                    </select>
                    <button class="zap-btn zap-btn-danger zap-btn-sm" onclick="this.parentElement.remove()">✕</button>`;
                container.appendChild(row);
            },

            async saveSchedule() {
                const rows = document.querySelectorAll('#schedule-rows > div');
                const schedule = [];
                rows.forEach(row => {
                    const folder = row.querySelector('[data-key="folder"]')?.value;
                    const from   = row.querySelector('[data-key="from"]')?.value;
                    const to     = row.querySelector('[data-key="to"]')?.value;
                    const days   = row.querySelector('[data-key="days"]')?.value;
                    if (folder && from && to) schedule.push({ folder, from, to, days: days||'daily' });
                });
                try {
                    const fb = await getFirebase();
                    const { doc: sdoc, setDoc: sset } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
                    await sset(sdoc(window.firebaseDb, 'radio_settings', 'schedule'), { rules: schedule });
                    this._schedule = schedule;
                    this.showToast(`Расписание сохранено (${schedule.length} правил)`, 'success');
                } catch(e) { this.showToast('Ошибка: ' + e.message, 'error'); }
            },

            async loadSchedule() {
                try {
                    const fb = await getFirebase();
                    const snap = await fb.getDoc(fb.doc(window.firebaseDb, 'radio_settings', 'schedule'));
                    if (snap.exists()) {
                        this._schedule = snap.data().rules || [];
                        const container = document.getElementById('schedule-rows');
                        if (container) {
                            container.innerHTML = '';
                            this._schedule.forEach(r => this.addScheduleRow(r));
                        }
                    }
                } catch(e) {}
            },

            async removeRadioFlag(id, title) {
                if (!confirm(`Убрать «${title}» из ротации?`)) return;
                try {
                    const fb = await getFirebase();
                    await fb.updateDoc(fb.doc(window.firebaseDb,'tracks',id),{isRadio:false,isRadioExclusive:false});
                    document.getElementById(`rr-${id}`)?.remove();
                    this.showToast(`«${title}» убран из ротации`,'info');
                } catch(e) { this.showToast(e.message,'error'); }
            },

            // ── РАЗДЕЛ ЗАЯВОК И АРТИСТОВ ──
            drawArtists(v) {
                v.innerHTML = `
                    <div class="zap-view">
                        <div class="zap-page-header">
                            <div>
                                <div class="zap-page-title">Заявки & Артисты</div>
                                <div class="zap-page-sub">Управление профилями артистов и модерация новых заявок</div>
                            </div>
                            <button class="zap-btn zap-btn-primary" onclick="ZarbaAdminCore.drawArtistEditor()">+ Создать артиста</button>
                        </div>
                        <div class="zap-table-wrap">
                            <table class="zap-table">
                                <thead><tr>
                                    <th style="width:56px;"></th>
                                    <th>Никнейм / Статус</th>
                                    <th>Жанр / Город</th>
                                    <th>Ссылки</th>
                                    <th>Действие</th>
                                </tr></thead>
                                <tbody id="admin-artists-list"></tbody>
                            </table>
                        </div>
                    </div>`;
                this.loadArtists();
            },

            async loadArtists() {
                const list = document.getElementById('admin-artists-list');
                if (!list) return;
                list.innerHTML = `<tr><td colspan="5"><div class="zap-loading"><div class="zap-spinner"></div>Загрузка артистов...</div></td></tr>`;
                try {
                    const fb = await getFirebase();
                    // Грузим артистов (artistProfiles)
                    const snap = await fb.getDocs(fb.collection(window.firebaseDb, 'artistProfiles'));
                    if (snap.empty) { list.innerHTML = `<tr><td colspan="5"><div class="zap-empty">Нет профилей или заявок</div></td></tr>`; return; }

                    list.innerHTML = '';
                    snap.forEach(doc => {
                        const d = doc.data();
                        const isPending = d.status === 'pending' || !d.status;
                        const statusBadge = isPending
                            ? `<span class="zap-tag zap-tag-ring" style="margin-top:4px;display:inline-block;">🟡 Новая заявка</span>`
                            : `<span class="zap-tag zap-tag-radio" style="margin-top:4px;display:inline-block;">🟢 Одобрен</span>`;

                        const cover = d.cardUrl
                            ? `<img src="${d.cardUrl}" style="width:40px;height:40px;border-radius:6px;object-fit:cover;box-shadow:var(--shadow-sm);">`
                            : `<div style="width:40px;height:40px;border-radius:6px;background:var(--surface2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:16px;">👤</div>`;

                        list.innerHTML += `
                            <tr>
                                <td>${cover}</td>
                                <td>
                                    <div class="zap-artist">${d.nick || 'Без имени'}</div>
                                    ${statusBadge}
                                </td>
                                <td>
                                    <div style="font-size:13px;color:var(--text);">${d.genre || '—'}</div>
                                    <div style="font-size:12px;color:var(--text3);">${d.city || '—'}</div>
                                </td>
                                <td>
                                    <div style="font-size:11px;color:var(--text2);">IG: ${d.ig || '—'}</div>
                                    <div style="font-size:11px;color:var(--text2);">TG: ${d.tg || '—'}</div>
                                </td>
                                <td>
                                    <button class="zap-btn zap-btn-secondary zap-btn-sm" onclick="ZarbaAdminCore.drawArtistEditor('${doc.id}')">Редактировать</button>
                                    <button class="zap-btn zap-btn-danger zap-btn-sm" style="margin-left:4px;" onclick="ZarbaAdminCore.deleteArtist('${doc.id}', '${d.nick || ''}')">Удалить</button>
                                </td>
                            </tr>`;
                    });
                } catch(e) {
                    list.innerHTML = `<tr><td colspan="5"><div class="zap-empty">Ошибка загрузки</div></td></tr>`;
                }
            },

async drawArtistEditor(id = null) {
                const v = document.getElementById('zap-viewport');
                // Добавляем vertUrl в объект по умолчанию
                let d = { nick:'', city:'', genre:'', bio:'', cardUrl:'', vertUrl:'', status:'approved', ig:'', tg:'', yt:'' };
                
                if (id) {
                    v.innerHTML = `<div class="zap-loading"><div class="zap-spinner"></div>Загрузка профиля...</div>`;
                    try {
                        const fb = await getFirebase();
                        const snap = await fb.getDoc(fb.doc(window.firebaseDb, 'artistProfiles', id));
                        if (snap.exists()) d = { ...d, ...snap.data() };
                    } catch(e) { this.showToast('Ошибка загрузки: ' + e.message, 'error'); }
                }

                v.innerHTML = `
                    <div class="zap-view">
                        <div class="zap-page-header">
                            <div>
                                <div class="zap-page-title">${id ? 'Редактирование артиста' : 'Новый артист'}</div>
                            </div>
                            <button class="zap-btn zap-btn-secondary" onclick="ZarbaAdminCore.setTab('artists')">← Назад к списку</button>
                        </div>
                        
                        <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:24px;max-width:600px;box-shadow:var(--shadow-sm);">
                            
                            <div class="zap-section-label">Основная информация</div>
                            <div style="margin-bottom:12px;"><input class="zap-input" id="art-nick" placeholder="Никнейм (обязательно)" value="${d.nick || ''}"></div>
                            <div style="display:flex;gap:12px;margin-bottom:12px;">
                                <input class="zap-input" id="art-city" placeholder="Город" value="${d.city || ''}">
                                <input class="zap-input" id="art-genre" placeholder="Жанр" value="${d.genre || ''}">
                            </div>
                            
                            <div class="zap-section-label" style="margin-top:20px;">Фото артиста</div>
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
                              <div>
                                <label class="zap-lbl" style="color:var(--text2);margin-bottom:8px;text-transform:none;">Квадратное 1:1 (карточка)</label>
                                ${d.cardUrl ? `<img src="${d.cardUrl}" style="width:100%;height:130px;object-fit:cover;border-radius:8px;margin-bottom:8px;">` : ""}
                                <input type="file" id="art-card-file" accept="image/*" style="display:none" onchange="document.getElementById('art-card-name').textContent=this.files[0]?.name||''">
                                <button class="zap-btn zap-btn-secondary" style="width:100%;justify-content:center;" onclick="document.getElementById('art-card-file').click()">Выбрать фото</button>
                                <div id="art-card-name" style="font-size:11px;color:var(--green);margin-top:6px;"></div>
                              </div>
                              <div>
                                <label class="zap-lbl" style="color:var(--text2);margin-bottom:8px;text-transform:none;">Вертикальное 9:16 (модалка)</label>
                                ${d.vertUrl ? `<img src="${d.vertUrl}" style="width:100%;height:130px;object-fit:cover;border-radius:8px;margin-bottom:8px;">` : ""}
                                <input type="file" id="art-vert-file" accept="image/*" style="display:none" onchange="document.getElementById('art-vert-name').textContent=this.files[0]?.name||''">
                                <button class="zap-btn zap-btn-secondary" style="width:100%;justify-content:center;" onclick="document.getElementById('art-vert-file').click()">Выбрать фото</button>
                                <div id="art-vert-name" style="font-size:11px;color:var(--green);margin-top:6px;"></div>
                              </div>
                            </div>
                            
                            <div style="margin-bottom:12px;">
                                <textarea class="zap-input" id="art-bio" placeholder="Краткая биография" style="min-height:80px;resize:vertical;">${d.bio || ''}</textarea>
                            </div>

                            <div class="zap-section-label" style="margin-top:20px;">Соцсети</div>
                            <div style="display:flex;gap:12px;margin-bottom:12px;">
                                <input class="zap-input" id="art-ig" placeholder="Instagram" value="${d.ig || ''}">
                                <input class="zap-input" id="art-tg" placeholder="Telegram" value="${d.tg || ''}">
                                <input class="zap-input" id="art-yt" placeholder="YouTube" value="${d.yt || ''}">
                            </div>

                            <div class="zap-section-label" style="margin-top:20px;">Статус профиля</div>
                            <select class="zap-select" id="art-status" style="width:100%;margin-bottom:24px;">
                                <option value="pending" ${d.status==='pending'||!d.status?'selected':''}>🟡 Новая заявка</option>
                                <option value="approved" ${d.status==='approved'?'selected':''}>🟢 Одобрен (На сайт)</option>
                            </select>

                            <button class="zap-btn zap-btn-save" style="width:100%;justify-content:center;padding:12px;" id="art-save-btn" onclick="ZarbaAdminCore.saveArtist('${id || ''}')">
                                ${id ? '💾 Сохранить изменения' : '✅ Создать артиста'}
                            </button>
                        </div>
                    </div>`;
            },

            async saveArtist(id) {
                const nick = document.getElementById('art-nick')?.value.trim();
                if (!nick) { this.showToast('Никнейм обязателен', 'error'); return; }
                const saveBtn = document.getElementById('art-save-btn');
                if (saveBtn) { saveBtn.innerHTML = '⏳ Загрузка...'; saveBtn.disabled = true; }
                const uploadToCloudinary = async (file) => {
                    const fd = new FormData();
                    fd.append('file', file);
                    fd.append('upload_preset', 'zarba_artists');
                    fd.append('folder', 'zarba');
                    const res = await fetch('https://api.cloudinary.com/v1_1/dafzhubhq/image/upload', { method: 'POST', body: fd });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error?.message || 'Cloudinary error');
                    return data.secure_url;
                };
                try {
                    const fb = await getFirebase();
                    let cardUrl = '', vertUrl = '';
                    if (id) {
                        const snap = await fb.getDoc(fb.doc(window.firebaseDb, 'artistProfiles', id));
                        if (snap.exists()) { cardUrl = snap.data().cardUrl || ''; vertUrl = snap.data().vertUrl || ''; }
                    }
                    const cardFile = document.getElementById('art-card-file')?.files[0];
                    const vertFile = document.getElementById('art-vert-file')?.files[0];
                    if (cardFile) {
                        this.showToast('Загружаю квадратное фото...', 'info');
                        cardUrl = await uploadToCloudinary(cardFile);
                    }
                    if (vertFile) {
                        this.showToast('Загружаю вертикальное фото...', 'info');
                        vertUrl = await uploadToCloudinary(vertFile);
                    }
                    const data = {
                        nick,
                        city:   document.getElementById('art-city')?.value.trim() || '',
                        genre:  document.getElementById('art-genre')?.value.trim() || '',
                        cardUrl,
                        vertUrl,
                        bio:    document.getElementById('art-bio')?.value.trim() || '',
                        ig:     document.getElementById('art-ig')?.value.trim() || '',
                        tg:     document.getElementById('art-tg')?.value.trim() || '',
                        yt:     document.getElementById('art-yt')?.value.trim() || '',
                        status: document.getElementById('art-status')?.value || 'pending',
                        updatedAt: new Date().toISOString()
                    };
                    if (id) {
                        await fb.updateDoc(fb.doc(window.firebaseDb, 'artistProfiles', id), data);
                        this.showToast('Профиль сохранён', 'success');
                    } else {
                        data.createdAt = new Date().toISOString();
                        await fb.addDoc(fb.collection(window.firebaseDb, 'artistProfiles'), data);
                        this.showToast('Артист создан', 'success');
                    }
                    this.setTab('artists');
                } catch(e) {
                    this.showToast('Ошибка: ' + e.message, 'error');
                    if (saveBtn) { saveBtn.innerHTML = 'Сохранить'; saveBtn.disabled = false; }
                }
            },

            async deleteArtist(id, nick) {
                if (!confirm(`Точно удалить профиль «${nick}»?\nВосстановить будет невозможно.`)) return;
                try {
                    const fb = await getFirebase();
                    await fb.deleteDoc(fb.doc(window.firebaseDb, 'artistProfiles', id));
                    this.showToast('Профиль удален', 'info');
                    this.loadArtists();
                } catch(e) {
                    this.showToast('Ошибка удаления: ' + e.message, 'error');
                }
            }
        };

        window.ZarbaAdminCore.render();
    };
})();