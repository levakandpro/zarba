// ============================================================
//  ZARBA — PROFILE v3.1  mobile + web  (FIXED)
// ============================================================

const THEMES = {
    classic: { main: '#ff0055', glow: 'rgba(255,0,85,0.25)',   bg: '#080808' },
    gold:    { main: '#f5c842', glow: 'rgba(245,200,66,0.25)', bg: '#080800' },
    cyber:   { main: '#00e5ff', glow: 'rgba(0,229,255,0.25)',  bg: '#020a0f' },
    blood:   { main: '#ff2222', glow: 'rgba(255,34,34,0.25)',  bg: '#080000' }
};

const USERNAME_MIN   = 3;
const USERNAME_MAX   = 10;
const USERNAME_REGEX = /^[a-z0-9]+$/;

// ── CSS ──────────────────────────────────────────────────────
function injectProfileCSS() {
    if (document.getElementById('zp-css')) return;
    const s = document.createElement('style');
    s.id = 'zp-css';
    s.textContent = `
    .zp { font-family: -apple-system,'Helvetica Neue',Arial,sans-serif; color:#fff; }
    .zp * { box-sizing: border-box; }
    @keyframes zpIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
    .zp { animation: zpIn .4s ease; }

    /* GLASS CARD */
    .zp-card {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px;
        padding: 24px;
    }

    /* BUTTONS */
    .zp-btn { display:inline-flex;align-items:center;gap:8px;padding:11px 22px;border-radius:50px;border:none;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;letter-spacing:.3px; }
    .zp-btn-accent { background:var(--zm);color:#fff; }
    .zp-btn-accent:hover { filter:brightness(1.2);transform:scale(1.03); }
    .zp-btn-ghost { background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.12); }
    .zp-btn-ghost:hover { background:rgba(255,255,255,.14); }

    /* TABS — FIXED: закрытый блок + overflow */
    .zp-tabs { display:flex;gap:4px;padding:5px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.20);border-radius:50px;overflow-x:auto;margin-bottom:20px; }
    .zp-tabs::-webkit-scrollbar { display:none; }
    .zp-tab { flex-shrink:0;padding:9px 20px;border-radius:30px;border:none;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;color:rgba(255,255,255,.8);background:transparent;white-space:nowrap; }
    .zp-tab.on { background:rgba(255,255,255,.18);color:#fff; }

    /* AVATAR */
    .zp-av { position:relative;flex-shrink:0;cursor:pointer;width:130px;height:130px; }
    .zp-av img { width:130px;height:130px;border-radius:50%;object-fit:cover;border:3px solid var(--zm);box-shadow:0 0 35px var(--zg);transition:filter .25s;display:block; }
    .zp-av:hover img { filter:brightness(.45); }
    .zp-av-ov { position:absolute;inset:0;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;transition:opacity .25s;pointer-events:none;gap:3px; }
    .zp-av:hover .zp-av-ov { opacity:1; }

    /* BADGE */
    .zp-badge { display:inline-block;padding:3px 13px;border-radius:30px;font-size:10px;font-weight:900;letter-spacing:1.2px;text-transform:uppercase;background:var(--zm);color:#fff; }

    /* INPUT */
    .zp-inp { width:100%;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.11);border-radius:14px;padding:14px 18px;color:#fff;font-size:15px;outline:none;transition:border .2s,box-shadow .2s; }
    .zp-inp:focus { border-color:var(--zm);box-shadow:0 0 0 3px var(--zg); }
    .zp-inp::placeholder { color:rgba(255,255,255,.22); }
    textarea.zp-inp { resize:vertical; }

    /* LABEL */
    .zp-lbl { font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.32);margin-bottom:7px;display:block; }

    /* MODAL */
    .zp-modal { position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(16px); }
    .zp-mbox { background:#111;border:1px solid rgba(255,255,255,.1);border-radius:26px;padding:36px;width:100%;max-width:460px;position:relative;max-height:90vh;overflow-y:auto; }
    .zp-mclose { position:absolute;top:16px;right:16px;background:rgba(255,255,255,.08);border:none;color:#fff;width:32px;height:32px;border-radius:50%;font-size:16px;cursor:pointer; }

    /* TRACK ROW */
    .zp-trow { display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:14px;transition:background .2s;cursor:pointer; }
    .zp-trow:hover { background:rgba(255,255,255,.06); }
    .zp-tcover { width:44px;height:44px;border-radius:10px;object-fit:cover;background:#222;flex-shrink:0; }

    /* YT THUMB */
    .zp-yt { aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:#111;border:1px solid rgba(255,255,255,.07);position:relative; }
    .zp-yt iframe { width:100%;height:100%;border:none; }

    /* SOCIAL */
    .zp-soc { display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);text-decoration:none;color:#fff;transition:.2s; }
    .zp-soc:hover { background:rgba(255,255,255,.1);transform:translateX(3px); }

    /* DROPZONE */
    .zp-drop { border:2px dashed rgba(255,255,255,.13);border-radius:18px;padding:36px 20px;text-align:center;cursor:pointer;transition:.3s; }
    .zp-drop:hover { border-color:var(--zm);background:rgba(255,255,255,.03); }

    /* PROGRESS */
    .zp-prog { height:3px;background:rgba(255,255,255,.08);border-radius:3px;overflow:hidden; }
    .zp-prog-bar { height:100%;background:var(--zm);border-radius:3px;width:0;transition:width .35s; }

    /* STATS */
    .zp-stat { text-align:center;padding:16px 20px; }
    .zp-stat-n { font-size:28px;font-weight:900;letter-spacing:-1px;color:var(--zm); }
    .zp-stat-l { font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.3);margin-top:3px; }

    /* SCROLLBAR */
    ::-webkit-scrollbar { width:4px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:rgba(255,255,255,.13);border-radius:4px; }

    /* MOBILE */
    @media (max-width:680px) {
        .zp-hero { flex-direction:column !important; align-items:center !important; text-align:center !important; padding:30px 16px 24px !important; }
        .zp-hero-info { min-width:unset !important; align-items:center !important; }
        .zp-hero-btns { justify-content:center !important; }
        .zp-stats-box { align-self:center !important; width:100% !important; }
        .zp-av img { width:110px !important; height:110px !important; }
        .zp-av { width:110px !important; height:110px !important; }
        .zp-av-badge { font-size:9px !important; }
        .zp-content { padding:0 12px !important; }
        .zp-settings-grid { grid-template-columns:1fr !important; }
        .zp-yt-grid { grid-template-columns:1fr !important; }
    }
    `;
    document.head.appendChild(s);
}

// ── MAIN ─────────────────────────────────────────────────────
window.renderProfile = async function(container) {
    console.log('🔥 renderProfile called, container:', container);
    console.log('🔥 firebaseAuth:', window.firebaseAuth);
    const user = window.firebaseAuth?.currentUser;
    console.log('🔥 currentUser:', user);
    if (!user) {
        container.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;min-height:70vh;text-align:center;color:#fff;">
            <div><div style="font-size:50px;margin-bottom:16px;">🔐</div>
            <h2 style="font-weight:900;margin:0 0 8px;">ВОЙДИТЕ В АККАУНТ</h2>
            <p style="color:rgba(255,255,255,.4);">Чтобы открыть профиль</p></div></div>`;
        return;
    }
    const snap = await window.getDoc(window.doc(window.firebaseDb,'users',user.uid));
    const data = snap.exists() ? snap.data() : {};
    const th   = THEMES[data.theme || 'classic'];

    injectProfileCSS();
    document.documentElement.style.setProperty('--zm', th.main);
    document.documentElement.style.setProperty('--zg', th.glow);

    if (!data.username) { zpSetupUsername(container, user, th); return; }
    zpRender(container, user, data, th);
};

// ── USERNAME SETUP ────────────────────────────────────────────
function zpSetupUsername(container, user, th) {
    container.innerHTML = `
    <div class="zp" style="background:${th.bg};min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;">
        <div class="zp-card" style="max-width:420px;width:100%;text-align:center;padding:44px 36px;">
            <img src="${user.photoURL||''}" style="width:76px;height:76px;border-radius:50%;border:3px solid ${th.main};margin-bottom:20px;">
            <h2 style="font-size:24px;font-weight:900;margin:0 0 8px;">Добро пожаловать!</h2>
            <p style="color:rgba(255,255,255,.4);font-size:14px;margin:0 0 30px;">Выберите адрес. Изменить — только <strong style="color:${th.main};">1 раз</strong>.</p>
            <div style="text-align:left;margin-bottom:20px;">
                <label class="zp-lbl">Ваш адрес</label>
                <div style="position:relative;">
                    <span style="position:absolute;left:16px;top:50%;transform:translateY(-50%);color:${th.main};font-weight:900;">@z</span>
                    <input id="zp-un" class="zp-inp" style="padding-left:42px;" placeholder="yourname" maxlength="${USERNAME_MAX}" oninput="zpCheckUN(this.value)">
                </div>
                <div id="zp-un-st" style="font-size:12px;font-weight:700;margin-top:7px;color:rgba(255,255,255,.3);">от ${USERNAME_MIN} до ${USERNAME_MAX} символов, только a-z и 0-9</div>
            </div>
            <button id="zp-un-btn" class="zp-btn zp-btn-accent" style="width:100%;justify-content:center;opacity:.4;cursor:not-allowed;" disabled onclick="zpClaimUN()">ПОДТВЕРДИТЬ</button>
        </div>
    </div>`;
    window._zpU = user;
}

window.zpCheckUN = async function(v) {
    v = v.toLowerCase().replace(/[^a-z0-9]/g,'');
    document.getElementById('zp-un').value = v;
    const st  = document.getElementById('zp-un-st');
    const btn = document.getElementById('zp-un-btn');
    const off = () => { btn.disabled=true;btn.style.opacity='.4';btn.style.cursor='not-allowed'; };
    const on  = () => { btn.disabled=false;btn.style.opacity='1';btn.style.cursor='pointer'; };
    if (v.length < USERNAME_MIN) { st.style.color='rgba(255,255,255,.3)';st.textContent=`от ${USERNAME_MIN} до ${USERNAME_MAX} символов, только a-z и 0-9`;off();return; }
    st.style.color='rgba(255,255,255,.4)';st.textContent='⏳ Проверяем...';off();
    const q = window.query(window.collection(window.firebaseDb,'users'),window.where('username','==',v));
    const r = await window.getDocs(q);
    if (!r.empty) { st.style.color='#ff4444';st.textContent=`✗ @z${v} — занят`; }
    else          { st.style.color='#00e676';st.textContent=`✓ @z${v} — свободен!`;on(); }
};

window.zpClaimUN = async function() {
    const v = document.getElementById('zp-un').value;
    if (!v||v.length<USERNAME_MIN) return;
    const u = window._zpU||window.firebaseAuth.currentUser;
    await window.updateDoc(window.doc(window.firebaseDb,'users',u.uid),{username:v,usernameChanged:false,usernameChangedAt:new Date()});
    location.reload();
};

// ── MAIN RENDER ───────────────────────────────────────────────
function zpRender(container, user, data, th) {
    console.log('🎨 zpRender called, data:', data, 'th:', th);
    const stats   = data.listeningStats || {};
    const topArt  = Object.entries(stats).sort((a,b)=>b[1]-a[1]).slice(0,3).map(a=>a[0]);
    const isArt   = true; // все пользователи могут загружать треки
    const plays   = Object.values(stats).reduce((a,b)=>a+b,0);
    const avatar  = data.avatarURL || user.photoURL || '';
    const favLen  = (data.favorites||[]).length;
    const vidLen  = (data.videos||[]).length;

    container.innerHTML = `
    <div class="zp" style="background:${th.bg};min-height:100vh;padding-bottom:60px;">

        <!-- HERO -->
        <div style="position:relative;overflow:hidden;padding:50px 24px 36px;">
            <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 65% 0%,${th.glow} 0%,transparent 65%);pointer-events:none;"></div>
            <div class="zp-hero" style="max-width:940px;margin:0 auto;display:flex;align-items:flex-end;gap:32px;flex-wrap:wrap;position:relative;">

                <!-- АВАТАР -->
                <div style="display:flex;flex-direction:column;align-items:center;gap:12px;flex-shrink:0;">
                    <div class="zp-av" onclick="document.getElementById('zp-av-file').click()" title="Сменить фото">
                        <img src="${avatar}" onerror="this.style.background='#333';this.src=''">
                        <div class="zp-av-ov">
                            <span style="font-size:24px;">📷</span>
                            <span style="font-size:11px;font-weight:700;color:#fff;">ИЗМЕНИТЬ</span>
                        </div>
                    </div>
                    <span class="zp-badge" style="white-space:nowrap;">
                        ${data.role === 'artist' ? '🎤 АРТИСТ' : '👤 ФАНАТ'}
                    </span>
                </div>
                <input type="file" id="zp-av-file" accept="image/*" hidden onchange="zpAvatarUpload(this)">

                <!-- INFO -->
                <div class="zp-hero-info" style="flex:1;min-width:200px;padding-bottom:8px;display:flex;flex-direction:column;gap:6px;">
                    <span style="color:var(--zm);font-size:13px;font-weight:700;">@z${h(data.username)}</span>
                    <h1 style="font-size:clamp(24px,5vw,44px);font-weight:900;margin:0;letter-spacing:-1px;line-height:1.1;">${h(user.displayName)}</h1>
                    ${data.city ? `<span style="color:rgba(255,255,255,.4);font-size:14px;">📍 ${h(data.city)}</span>` : ''}
                    ${data.bio  ? `<p style="color:rgba(255,255,255,.6);font-size:14px;font-style:italic;margin:2px 0 0;">"${h(data.bio)}"</p>` : ''}
                    <div class="zp-hero-btns" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px;">
                        <button class="zp-btn zp-btn-ghost" onclick="zpOpenEdit()">✏️ ИЗМЕНИТЬ</button>
                        ${isArt ? `<button class="zp-btn zp-btn-accent" onclick="document.getElementById('zp-up-modal').style.display='flex'">+ ТРЕК</button>` : ''}
                    </div>
                </div>

                <!-- STATS -->
                <div class="zp-stats-box" style="display:flex;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:18px;overflow:hidden;">
                    <div class="zp-stat">
                        <div class="zp-stat-n">${plays}</div>
                        <div class="zp-stat-l">PLAYS</div>
                    </div>
                    <div style="width:1px;background:rgba(255,255,255,.07);"></div>
                    <div class="zp-stat">
                        <div class="zp-stat-n">${favLen}</div>
                        <div class="zp-stat-l">ЛАЙКОВ</div>
                    </div>
                    <div style="width:1px;background:rgba(255,255,255,.07);"></div>
                    <div class="zp-stat">
                        <div class="zp-stat-n">${vidLen}</div>
                        <div class="zp-stat-l">ВИДЕО</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- CONTENT -->
        <div class="zp-content" style="max-width:940px;margin:0 auto;padding:0 20px;">

            <!-- ТАБЫ -->
            <div class="zp-tabs">
                <button class="zp-tab on" id="zt-vibe"  onclick="zpTab('vibe')">❤ МОЙ ВАЙБ</button>
                <button class="zp-tab"    id="zt-video" onclick="zpTab('video')">▶ Z-VIDEO</button>
                <button class="zp-tab"    id="zt-set"   onclick="zpTab('set')">⚙ НАСТРОЙКИ</button>
            </div>

            <!-- ВАЙБ -->
            <div id="zp-vibe">
                <div class="zp-card">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                        <span style="font-size:17px;font-weight:900;">МОЙ ВАЙБ</span>
                        <span style="font-size:12px;color:rgba(255,255,255,.3);">${favLen} треков</span>
                    </div>
                    <div id="zp-vibe-list" style="max-height:460px;overflow-y:auto;">
                        ${favLen===0
                            ? `<div style="text-align:center;padding:50px 20px;color:rgba(255,255,255,.2);"><div style="font-size:44px;margin-bottom:10px;">❤</div>Лайкайте треки — они появятся здесь</div>`
                            : `<div style="text-align:center;padding:30px;color:rgba(255,255,255,.3);">Загрузка...</div>`}
                    </div>
                </div>
                ${topArt.length>0 ? `
                <div class="zp-card" style="margin-top:14px;">
                    <div style="font-size:16px;font-weight:900;margin-bottom:14px;">ТОП АРТИСТЫ</div>
                    <div style="display:flex;gap:10px;flex-wrap:wrap;">
                        ${topArt.map((a,i)=>`
                        <div style="display:flex;align-items:center;gap:9px;padding:10px 16px;background:rgba(255,255,255,.05);border-radius:12px;">
                            <span style="font-weight:900;color:var(--zm);">${i+1}</span>
                            <span style="font-weight:700;">${h(a)}</span>
                        </div>`).join('')}
                    </div>
                </div>` : ''}
            </div>

            <!-- Z-VIDEO -->
            <div id="zp-video" style="display:none;">
                <div class="zp-card">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                        <span style="font-size:17px;font-weight:900;">Z-VIDEO <span style="font-size:12px;font-weight:400;color:rgba(255,255,255,.3);">${vidLen}/10</span></span>
                        ${vidLen<10 ? `<button class="zp-btn zp-btn-ghost" onclick="zpAddVideo()">+ ДОБАВИТЬ</button>` : ''}
                    </div>
                    <div class="zp-yt-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px;">
                        ${(data.videos||[]).map((v,i)=>`
                        <div class="zp-yt">
                            <iframe src="https://www.youtube.com/embed/${ytId(v)}" allowfullscreen loading="lazy"></iframe>
                            <button onclick="zpDelVideo(${i})" style="position:absolute;top:7px;right:7px;background:rgba(0,0,0,.75);border:none;color:#fff;width:26px;height:26px;border-radius:50%;cursor:pointer;z-index:2;font-size:12px;">✕</button>
                        </div>`).join('')}
                        ${vidLen===0?`<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:rgba(255,255,255,.2);"><div style="font-size:44px;margin-bottom:10px;">▶</div>Добавьте YouTube видео</div>`:''}
                    </div>
                </div>
            </div>

            <!-- НАСТРОЙКИ -->
            <div id="zp-set" style="display:none;">
                <div class="zp-settings-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">

                    <!-- ТЕМА -->
                    <div class="zp-card">
                        <div style="font-size:16px;font-weight:900;margin-bottom:16px;">ТЕМА</div>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                            ${Object.entries(THEMES).map(([k,t])=>`
                            <button onclick="zpTheme('${k}')" style="padding:13px;border-radius:14px;border:2px solid ${(data.theme||'classic')===k?t.main:'rgba(255,255,255,.08)'};background:${(data.theme||'classic')===k?t.main+'22':'rgba(255,255,255,.03)'};cursor:pointer;color:#fff;font-weight:800;font-size:12px;transition:.2s;">
                                <div style="width:16px;height:16px;border-radius:50%;background:${t.main};margin:0 auto 7px;box-shadow:0 0 8px ${t.glow};"></div>
                                ${k.toUpperCase()}
                            </button>`).join('')}
                        </div>
                    </div>

                    <!-- СОЦСЕТИ -->
                    <div class="zp-card">
                        <div style="font-size:16px;font-weight:900;margin-bottom:16px;">СОЦСЕТИ</div>
                        <div style="display:flex;flex-direction:column;gap:9px;">
                            ${zpSocLinks(data)}
                        </div>
                        <button class="zp-btn zp-btn-ghost" style="width:100%;justify-content:center;margin-top:13px;" onclick="zpOpenSoc()">ИЗМЕНИТЬ ССЫЛКИ</button>
                    </div>
                </div>

                <!-- УВЕДОМЛЕНИЯ -->
                <div class="zp-card">
                    <div style="font-size:16px;font-weight:900;margin-bottom:14px;color:var(--zm);">УВЕДОМЛЕНИЯ</div>
                    <div id="zp-notif" style="color:rgba(255,255,255,.3);font-size:14px;">Сообщений пока нет.</div>
                </div>
            </div>

        </div>
    </div>

    <!-- MODAL: РЕДАКТИРОВАНИЕ -->
    <div id="zp-edit" style="display:none;" class="zp-modal">
        <div class="zp-mbox">
            <button class="zp-mclose" onclick="document.getElementById('zp-edit').style.display='none'">✕</button>
            <div style="font-size:21px;font-weight:900;margin-bottom:24px;">РЕДАКТИРОВАТЬ</div>
            <div style="display:flex;flex-direction:column;gap:15px;">
                ${zpUnField(data, th)}
                <div><label class="zp-lbl">Город</label><input id="e-city" class="zp-inp" value="${h(data.city||'')}" placeholder="Душанбе, Москва..."></div>
                <div><label class="zp-lbl">О себе</label><textarea id="e-bio" class="zp-inp" rows="3" placeholder="Коротко о себе...">${h(data.bio||'')}</textarea></div>
            </div>
            <button class="zp-btn zp-btn-accent" style="width:100%;justify-content:center;margin-top:22px;" onclick="zpSaveEdit()">СОХРАНИТЬ</button>
        </div>
    </div>

    <!-- MODAL: СОЦСЕТИ -->
    <div id="zp-soc" style="display:none;" class="zp-modal">
        <div class="zp-mbox">
            <button class="zp-mclose" onclick="document.getElementById('zp-soc').style.display='none'">✕</button>
            <div style="font-size:21px;font-weight:900;margin-bottom:24px;">СОЦСЕТИ</div>
            <div style="display:flex;flex-direction:column;gap:14px;">
                <div><label class="zp-lbl">Instagram</label><input id="s-ig" class="zp-inp" value="${h(data.social?.instagram||'')}" placeholder="@username"></div>
                <div><label class="zp-lbl">Telegram</label><input id="s-tg" class="zp-inp" value="${h(data.social?.telegram||'')}" placeholder="@username"></div>
            </div>
            <button class="zp-btn zp-btn-accent" style="width:100%;justify-content:center;margin-top:22px;" onclick="zpSaveSoc()">СОХРАНИТЬ</button>
        </div>
    </div>

    <!-- MODAL: ЗАГРУЗКА ТРЕКА (только артисты) -->
    ${isArt ? zpUpModal(th) : ''}
    `;

    zpLoadFavs(data, th);
    zpLoadNotif();
}

// ── TABS ─────────────────────────────────────────────────────
window.zpTab = function(name) {
    ['vibe','video','set'].forEach(t => {
        document.getElementById('zp-'+t).style.display    = t===name ? 'block' : 'none';
        document.getElementById('zt-'+t).classList.toggle('on', t===name);
    });
};

// ── AVATAR ───────────────────────────────────────────────────
window.zpAvatarUpload = async function(input) {
    const file = input.files[0];
    if (!file) return;
    const user = window.firebaseAuth.currentUser;
    const img  = document.querySelector('.zp-av img');
    if (img) img.style.filter = 'brightness(.3)';
    try {
        const r = window.ref(window.firebaseStorage, `avatars/${user.uid}`);
        await window.uploadBytes(r, file);
        const url = await window.getDownloadURL(r);
        await window.updateDoc(window.doc(window.firebaseDb,'users',user.uid), { avatarURL: url });
        if (img) { img.src = url + '?t=' + Date.now(); img.style.filter = ''; }
    } catch(e) {
        if (img) img.style.filter = '';
        alert('Ошибка: ' + e.message);
    }
};

// ── EDIT ─────────────────────────────────────────────────────
window.zpOpenEdit = function() { document.getElementById('zp-edit').style.display='flex'; };

window.zpCheckUNEdit = async function(v) {
    v = v.toLowerCase().replace(/[^a-z0-9]/g,'');
    const inp = document.getElementById('e-un'); if(inp) inp.value=v;
    const st  = document.getElementById('e-un-st'); if(!st) return;
    if (v.length<USERNAME_MIN) { st.style.color='rgba(255,255,255,.3)';st.textContent='от 3 до 10 символов';return; }
    st.style.color='rgba(255,255,255,.4)';st.textContent='⏳ Проверяем...';
    const q = window.query(window.collection(window.firebaseDb,'users'),window.where('username','==',v));
    const r = await window.getDocs(q);
    const taken = !r.empty && r.docs[0].id !== window.firebaseAuth.currentUser.uid;
    st.style.color = taken?'#ff4444':'#00e676';
    st.textContent  = taken?`✗ @z${v} — занят`:`✓ @z${v} — свободен`;
};

window.zpSaveEdit = async function() {
    const user = window.firebaseAuth.currentUser;
    const snap = await window.getDoc(window.doc(window.firebaseDb,'users',user.uid));
    const cur  = snap.data();
    const upd  = {
        city: document.getElementById('e-city')?.value.trim()||'',
        bio:  document.getElementById('e-bio')?.value.trim()||''
    };
    const unI = document.getElementById('e-un');
    if (unI && !cur.usernameChanged) {
        const v = unI.value.toLowerCase();
        if (v && v!==cur.username && v.length>=USERNAME_MIN && USERNAME_REGEX.test(v)) {
            const q = window.query(window.collection(window.firebaseDb,'users'),window.where('username','==',v));
            const r = await window.getDocs(q);
            if (r.empty) { upd.username=v;upd.usernameChanged=true;upd.usernameChangedAt=new Date(); }
        }
    }
    await window.updateDoc(window.doc(window.firebaseDb,'users',user.uid), upd);
    document.getElementById('zp-edit').style.display='none';
    const fresh = await window.getDoc(window.doc(window.firebaseDb,'users',user.uid));
    const newData = fresh.data();
    const th = THEMES[newData.theme || 'classic'];
    const c = document.getElementById('app-content');
    zpRender(c, user, newData, th);
};

// ── SOCIAL ────────────────────────────────────────────────────
window.zpOpenSoc = function() { document.getElementById('zp-soc').style.display='flex'; };
window.zpSaveSoc = async function() {
    const user = window.firebaseAuth.currentUser;
    await window.updateDoc(window.doc(window.firebaseDb,'users',user.uid), {
        social: {
            instagram: document.getElementById('s-ig').value.trim(),
            telegram:  document.getElementById('s-tg').value.trim()
        }
    });
    document.getElementById('zp-soc').style.display='none';
    // Перерендер без reload
    const fresh = await window.getDoc(window.doc(window.firebaseDb,'users',user.uid));
    const newData = fresh.data();
    const th = THEMES[newData.theme || 'classic'];
    const c = document.getElementById('app-content');
    zpRender(c, user, newData, th);
};

// ── THEME ─────────────────────────────────────────────────────
window.zpTheme = async function(t) {
    await window.updateDoc(window.doc(window.firebaseDb,'users',window.firebaseAuth.currentUser.uid),{theme:t});
    location.reload();
};

// ── VIDEOS ────────────────────────────────────────────────────
window.zpAddVideo = async function() {
    const link = prompt('Ссылка на YouTube:'); if(!link) return;
    const id = ytId(link); if(!id) return alert('Неверная ссылка!');
    const user = window.firebaseAuth.currentUser;
    const snap = await window.getDoc(window.doc(window.firebaseDb,'users',user.uid));
    const vids = snap.data().videos||[];
    if (vids.length>=10) return alert('Максимум 10 видео!');
    vids.push(link);
    await window.updateDoc(window.doc(window.firebaseDb,'users',user.uid),{videos:vids});
    location.reload();
};

window.zpDelVideo = async function(i) {
    if (!confirm('Удалить видео?')) return;
    const user = window.firebaseAuth.currentUser;
    const snap = await window.getDoc(window.doc(window.firebaseDb,'users',user.uid));
    const vids = snap.data().videos||[];
    vids.splice(i,1);
    await window.updateDoc(window.doc(window.firebaseDb,'users',user.uid),{videos:vids});
    location.reload();
};

// ── UNFAV ─────────────────────────────────────────────────────
window.zpUnfav = async function(tid) {
    const user = window.firebaseAuth.currentUser;
    const snap = await window.getDoc(window.doc(window.firebaseDb,'users',user.uid));
    const favs = (snap.data().favorites||[]).filter(id=>id!==tid);
    await window.updateDoc(window.doc(window.firebaseDb,'users',user.uid),{favorites:favs});
    location.reload();
};

// ── LOAD FAVS ─────────────────────────────────────────────────
async function zpLoadFavs(data, th) {
    const el = document.getElementById('zp-vibe-list');
    if (!el||!data.favorites||data.favorites.length===0) return;
    try {
        const tracks=[];
        for (const id of data.favorites.slice(0,30)) {
            const s=await window.getDoc(window.doc(window.firebaseDb,'tracks',id));
            if(s.exists()) tracks.push({id,...s.data()});
        }
        el.innerHTML = tracks.length===0
            ? `<div style="text-align:center;padding:50px;color:rgba(255,255,255,.2);">Треки не найдены</div>`
            : tracks.map((t,i)=>`
            <div class="zp-trow">
                <span style="font-size:12px;color:rgba(255,255,255,.2);width:16px;text-align:right;">${i+1}</span>
                <img class="zp-tcover" src="${t.cover||''}" onerror="this.style.background='#333'">
                <div style="flex:1;min-width:0;">
                    <div style="font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${h(t.title||'—')}</div>
                    <div style="font-size:12px;color:rgba(255,255,255,.4);margin-top:2px;">${h(t.artist||'')}</div>
                </div>
                <span style="color:var(--zm);cursor:pointer;font-size:18px;flex-shrink:0;" onclick="zpUnfav('${t.id}')">❤</span>
            </div>`).join('');
    } catch(e) {
        el.innerHTML=`<div style="text-align:center;padding:40px;color:rgba(255,255,255,.2);">Ошибка загрузки</div>`;
    }
}

// ── NOTIFICATIONS ─────────────────────────────────────────────
async function zpLoadNotif() {
    const el=document.getElementById('zp-notif'); if(!el) return;
    try {
        const q=window.query(
            window.collection(window.firebaseDb,'adminMessages'),
            window.orderBy('createdAt','desc'),
            window.limit(5)
        );
        const snap=await window.getDocs(q);
        if(snap.empty) return;
        el.innerHTML=snap.docs.map(d=>{
            const m=d.data();
            return `<div style="padding:13px 16px;background:rgba(255,255,255,.04);border-radius:13px;margin-bottom:9px;border-left:3px solid var(--zm);">
                <div style="font-weight:700;font-size:14px;margin-bottom:3px;">${h(m.title||'')}</div>
                <div style="font-size:13px;color:rgba(255,255,255,.5);">${h(m.text||'')}</div>
            </div>`;
        }).join('');
    } catch(e){}
}

// ── UPLOAD MODAL ──────────────────────────────────────────────
function zpUpModal(th) {
    return `
    <div id="zp-up-modal" style="display:none;" class="zp-modal">
        <div class="zp-mbox" style="max-width:520px;">
            <button class="zp-mclose" onclick="zpCloseUpload()">✕</button>

            <!-- ФОРМА ЗАГРУЗКИ -->
            <div id="zp-up-form">
                <div style="font-size:22px;font-weight:900;margin-bottom:4px;">🎵 ЗАГРУЗИТЬ ТРЕК</div>
                <p style="color:rgba(255,255,255,.35);font-size:12px;margin:0 0 20px;line-height:1.6;">
                    Принимаются только треки в формате <strong style="color:${th.main};">MP3</strong>.<br>
                    Название строго по формату — иначе трек не пройдёт проверку.
                </p>

                <!-- ПРАВИЛА НАЗВАНИЯ -->
                <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px 16px;margin-bottom:18px;">
                    <div style="font-size:11px;font-weight:900;letter-spacing:1px;color:${th.main};margin-bottom:10px;">ПРАВИЛА НАЗВАНИЯ</div>
                    <div style="font-size:12px;color:rgba(255,255,255,.5);line-height:1.9;">
                        ✅ <strong style="color:#fff;">Псевдоним - Название трека</strong><br>
                        ✅ <strong style="color:#fff;">Арт1 feat. Арт2 - Название</strong><br>
                        ✅ <strong style="color:#fff;">Арт1 ft. Арт2 - Название</strong><br>
                        ✅ <strong style="color:#fff;">Арт1 x Арт2 - Название</strong><br>
                        ❌ <span style="color:#ff4444;">prod. by, (prod), demo, live, exclusive, official</span>
                    </div>
                    <div style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,.06);font-size:11px;color:rgba(255,255,255,.3);">
                        Примеры: <span style="color:${th.main};">Sebastian TeeJay - Мне мало тебя</span> &nbsp;|&nbsp; <span style="color:${th.main};">Bozzori feat. Sado - Salom</span>
                    </div>
                </div>

                <!-- ПОЛЕ НАЗВАНИЯ -->
                <div style="margin-bottom:14px;">
                    <label class="zp-lbl">Название трека</label>
                    <input id="up-title" class="zp-inp" placeholder="Псевдоним - Название трека" oninput="zpValUp()">
                    <div id="up-tst" style="font-size:12px;font-weight:700;margin-top:6px;min-height:16px;"></div>
                </div>

                <!-- MP3 -->
                <div class="zp-drop" id="up-mp3-drop" onclick="document.getElementById('up-mp3').click()" style="margin-bottom:11px;">
                    <div style="font-size:28px;margin-bottom:6px;">🎵</div>
                    <div style="font-weight:700;color:rgba(255,255,255,.5);font-size:13px;">ТОЛЬКО MP3 ФАЙЛ</div>
                    <div id="up-mp3-n" style="font-size:12px;color:rgba(255,255,255,.3);margin-top:5px;">Нажми или перетащи сюда</div>
                    <input type="file" id="up-mp3" accept=".mp3,audio/mpeg" hidden onchange="zpOnMp3(this)">
                </div>

                <!-- ОБЛОЖКА -->
                <div class="zp-drop" id="up-img-drop" onclick="document.getElementById('up-img').click()">
                    <div style="font-size:28px;margin-bottom:6px;">🖼</div>
                    <div style="font-weight:700;color:rgba(255,255,255,.5);font-size:13px;">ОБЛОЖКА 1:1 (JPG / PNG)</div>
                    <div id="up-img-n" style="font-size:12px;color:rgba(255,255,255,.3);margin-top:5px;">Квадратное фото, минимум 500×500px</div>
                    <input type="file" id="up-img" accept="image/jpeg,image/png,image/webp" hidden onchange="zpOnImg(this)">
                </div>

                <!-- ПРОГРЕСС -->
                <div class="zp-prog" style="margin-top:16px;"><div id="up-bar" class="zp-prog-bar"></div></div>
                <div id="up-st" style="font-size:12px;font-weight:700;color:rgba(255,255,255,.4);margin-top:7px;min-height:16px;text-align:center;"></div>

                <button id="up-btn" class="zp-btn zp-btn-accent" style="width:100%;justify-content:center;margin-top:16px;opacity:.4;cursor:not-allowed;" disabled onclick="zpDoUpload()">
                    ОТПРАВИТЬ В ПРОДАКШН ZARBA
                </button>
            </div>

            <!-- ЭКРАН УСПЕХА -->
            <div id="zp-up-success" style="display:none;text-align:center;padding:20px 0;">
                <div style="font-size:60px;margin-bottom:16px;">🎉</div>
                <div style="font-size:22px;font-weight:900;margin-bottom:10px;color:${th.main};">ТРЕК ОТПРАВЛЕН!</div>
                <div style="font-size:15px;font-weight:700;color:#fff;margin-bottom:8px;">Добро пожаловать в Продакшн ZARBA</div>
                <p style="color:rgba(255,255,255,.45);font-size:13px;line-height:1.7;margin:0 0 20px;">
                    После проверки твой трек появится на главной странице<br>
                    в разделе <strong style="color:${th.main};">НОВИЧКИ</strong> 🔥
                </p>
                <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:16px;margin-bottom:20px;text-align:left;">
                    <div style="font-size:11px;font-weight:900;letter-spacing:1px;color:${th.main};margin-bottom:10px;">💡 ПОМНИ</div>
                    <div style="font-size:12px;color:rgba(255,255,255,.5);line-height:1.9;">
                        📈 Чем больше прослушиваний — тем выше шансы попасть в <strong style="color:#fff;">ТОП 100</strong><br>
                        🎧 Лучшие треки попадают в <strong style="color:#fff;">Плейлисты ZARBA</strong><br>
                        🏆 Легенды остаются в <strong style="color:#fff;">Зале Славы</strong> навсегда<br>
                        🚀 Делись треком в соцсетях — каждое прослушивание важно!
                    </div>
                </div>
                <button class="zp-btn zp-btn-ghost" style="width:100%;justify-content:center;" onclick="zpCloseUpload()">ЗАКРЫТЬ</button>
            </div>

        </div>
    </div>`;
}

window.zpCloseUpload = function() {
    const modal = document.getElementById('zp-up-modal');
    if (modal) modal.style.display = 'none';
    // Сброс формы
    const form = document.getElementById('zp-up-form');
    const success = document.getElementById('zp-up-success');
    if (form) form.style.display = 'block';
    if (success) success.style.display = 'none';
    const titleEl = document.getElementById('up-title');
    if (titleEl) titleEl.value = '';
    const mp3El = document.getElementById('up-mp3');
    if (mp3El) mp3El.value = '';
    const imgEl = document.getElementById('up-img');
    if (imgEl) imgEl.value = '';
    const mp3n = document.getElementById('up-mp3-n');
    if (mp3n) mp3n.textContent = 'Нажми или перетащи сюда';
    const imgn = document.getElementById('up-img-n');
    if (imgn) imgn.textContent = 'Квадратное фото, минимум 500×500px';
    const tst = document.getElementById('up-tst');
    if (tst) tst.textContent = '';
    const bar = document.getElementById('up-bar');
    if (bar) bar.style.width = '0';
    const st = document.getElementById('up-st');
    if (st) st.textContent = '';
    const btn = document.getElementById('up-btn');
    if (btn) { btn.disabled=true; btn.style.opacity='.4'; btn.style.cursor='not-allowed'; }
};

window.zpOnMp3 = function(input) {
    const file = input.files[0];
    if (!file) return;
    // Проверка что файл реально mp3
    if (!file.type.includes('mpeg') && !file.name.toLowerCase().endsWith('.mp3')) {
        document.getElementById('up-mp3-n').textContent = '✗ Только MP3!';
        document.getElementById('up-mp3-n').style.color = '#ff4444';
        input.value = '';
        zpValUp();
        return;
    }
    const el = document.getElementById('up-mp3-n');
    const shortName = file.name.length > 35 ? file.name.substring(0,32) + '...' : file.name; el.textContent = '✓ ' + shortName;
    el.style.color = '#00e676';
    document.getElementById('up-mp3-drop').style.borderColor = '#00e676';
    zpValUp();
};

window.zpOnImg = function(input) {
    const file = input.files[0];
    if (!file) return;
    const el = document.getElementById('up-img-n');
    const shortName = file.name.length > 35 ? file.name.substring(0,32) + '...' : file.name; el.textContent = '✓ ' + shortName;
    el.style.color = '#00e676';
    document.getElementById('up-img-drop').style.borderColor = '#00e676';
    zpValUp();
};

window.zpValUp = function() {
    const title = (document.getElementById('up-title')?.value || '').trim();
    const mp3   = document.getElementById('up-mp3')?.files[0];
    const img   = document.getElementById('up-img')?.files[0];
    const st    = document.getElementById('up-tst');
    const btn   = document.getElementById('up-btn');

    // Запрещённые слова
    const BAD = ['prod.', 'prod ', '(prod', 'by ', 'demo', 'live', 'exclusive', 'official', 'instrumental', 'remix'];
    const badWord = BAD.find(w => title.toLowerCase().includes(w));

    // Допустимые форматы совместки
    const collabPattern = /^.+\s+(feat\.|ft\.|x)\s+.+\s+-\s+.+$/i;
    const soloPattern   = /^[^-]+\s+-\s+[^-]+$/;
    const isValid = collabPattern.test(title) || soloPattern.test(title);

    if (st) {
        if (!title) {
            st.textContent = '';
        } else if (badWord) {
            st.style.color = '#ff4444';
            st.textContent = `✗ Запрещено: "${badWord.trim()}" — уберите из названия`;
        } else if (!isValid) {
            st.style.color = '#ff8800';
            st.textContent = '✗ Формат: Псевдоним - Название  или  Арт1 feat. Арт2 - Название';
        } else {
            st.style.color = '#00e676';
            st.textContent = '✓ Название корректно — отлично!';
        }
    }

    const ready = isValid && !badWord && mp3 && img;
    if (btn) {
        btn.disabled = !ready;
        btn.style.opacity = ready ? '1' : '.4';
        btn.style.cursor  = ready ? 'pointer' : 'not-allowed';
    }
};

window.zpDoUpload = async function() {
    const user  = window.firebaseAuth.currentUser;
    const title = document.getElementById('up-title').value.trim();
    const mp3   = document.getElementById('up-mp3').files[0];
    const img   = document.getElementById('up-img').files[0];
    const bar   = document.getElementById('up-bar');
    const st    = document.getElementById('up-st');
    const btn   = document.getElementById('up-btn');
    if (!user || !mp3 || !img) return;

    btn.disabled = true; btn.style.opacity = '.4';

    const setStatus = (msg, color='rgba(255,255,255,.5)') => { st.style.color=color; st.textContent=msg; };

    try {
        setStatus('⏳ Загрузка обложки...'); bar.style.width = '15%';

        const ir = window.ref(window.firebaseStorage, `covers/${user.uid}_${Date.now()}`);
        await window.uploadBytes(ir, img);
        const coverURL = await window.getDownloadURL(ir);

        setStatus('⏳ Загрузка аудио...'); bar.style.width = '45%';

        const mr = window.ref(window.firebaseStorage, `tracks/${user.uid}_${Date.now()}.mp3`);
        await window.uploadBytes(mr, mp3);
        const audioURL = await window.getDownloadURL(mr);

        setStatus('⏳ Сохранение...'); bar.style.width = '80%';

        // Разбираем название — поддержка feat./ft./x
        let artist, trackTitle;
        const dashIdx = title.indexOf(' - ');
        artist     = title.substring(0, dashIdx).trim();
        trackTitle = title.substring(dashIdx + 3).trim();

        const trackRef = window.doc(window.collection(window.firebaseDb, 'tracks'));
        await window.setDoc(trackRef, {
            title:      trackTitle,
            artist:     artist,
            fullTitle:  title,
            audioURL,
            coverURL,
            uploadedBy: user.uid,
            uploaderName: user.displayName || '',
            plays:      0,
            likes:      0,
            approved:   false,
            createdAt:  new Date()
        });

        bar.style.width = '100%';

        // Telegram уведомление
        try {
            const tgToken  = '8748134701:AAEevZBGp91-dd9q9jgo3aYqsPvenTgUkD0';
            const tgChatId = '5736535127';
            const tgMsg =
`🎵 *НОВЫЙ ТРЕК НА ПРОВЕРКЕ*

📀 *Трек:* ${title}
👤 *Артист:* ${artist}
🎶 *Название:* ${trackTitle}
👤 *Загрузил:* ${user.displayName || 'Неизвестно'} (${user.email || ''})
🕐 *Время:* ${new Date().toLocaleString('ru-RU', {timeZone:'Asia/Dushanbe'})}

✅ Одобрить трек в Firebase Console → коллекция *tracks*`;

            // Отправка через img тег — обходит CORS
            const tgUrl = `https://api.telegram.org/bot${tgToken}/sendMessage?chat_id=${tgChatId}&parse_mode=Markdown&text=${encodeURIComponent(tgMsg)}`;
            await new Promise((resolve) => {
                const img = new Image();
                img.onload = img.onerror = resolve;
                img.src = tgUrl;
                setTimeout(resolve, 3000);
            });
        } catch(tgErr) {
            console.warn('TG notification failed:', tgErr);
        }

        // Показываем экран успеха
        document.getElementById('zp-up-form').style.display    = 'none';
        document.getElementById('zp-up-success').style.display = 'block';

    } catch(e) {
        bar.style.width = '0';
        setStatus('✗ Ошибка: ' + e.message, '#ff4444');
        btn.disabled = false; btn.style.opacity = '1';
    }
};

// ── HTML HELPERS ──────────────────────────────────────────────
function zpUnField(data, th) {
    if (data.usernameChanged) return `<div>
        <label class="zp-lbl">Username <span style="color:#ff4444;font-size:10px;">УЖЕ ИЗМЕНЁН</span></label>
        <div class="zp-inp" style="color:rgba(255,255,255,.35);cursor:not-allowed;">@z${h(data.username)}</div>
    </div>`;
    return `<div>
        <label class="zp-lbl">Username <span style="color:${th.main};font-size:10px;">МОЖНО ИЗМЕНИТЬ 1 РАЗ</span></label>
        <div style="position:relative;">
            <span style="position:absolute;left:16px;top:50%;transform:translateY(-50%);color:${th.main};font-weight:900;">@z</span>
            <input id="e-un" class="zp-inp" style="padding-left:40px;" value="${h(data.username||'')}" maxlength="${USERNAME_MAX}" oninput="zpCheckUNEdit(this.value)">
        </div>
        <div id="e-un-st" style="font-size:12px;font-weight:700;margin-top:6px;min-height:15px;color:rgba(255,255,255,.3);">Текущий: @z${h(data.username)}</div>
    </div>`;
}

function zpSocLinks(data) {
    const s=data.social||{};
    const out=[];
    if(s.instagram) out.push(`<a href="https://instagram.com/${s.instagram.replace('@','')}" target="_blank" class="zp-soc"><span>📸</span><span style="font-weight:700;">${h(s.instagram)}</span></a>`);
    if(s.telegram)  out.push(`<a href="https://t.me/${s.telegram.replace('@','')}"         target="_blank" class="zp-soc"><span>✈️</span><span style="font-weight:700;">${h(s.telegram)}</span></a>`);
    return out.length>0?out.join(''):`<div style="color:rgba(255,255,255,.2);font-size:14px;text-align:center;padding:14px 0;">Ссылки не добавлены</div>`;
}

// ── UTILS ─────────────────────────────────────────────────────
function ytId(url){ const m=url.match(/(?:youtu\.be\/|v=|embed\/)([a-zA-Z0-9_-]{11})/);return m?m[1]:null; }
function h(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }