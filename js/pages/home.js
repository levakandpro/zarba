// ============================================================
//  ZARBA — ГЛАВНАЯ СТРАНИЦА (home.js) + FIREBASE + FIXES
//  ИСПРАВЛЕНИЯ:
//  1. _coverCache / _fallbackMap — глобальный кэш (не пересоздаётся)
//  2. artAutoTimer — очищается при уходе со страницы
//  3. Firebase onSnapshot — отписка при уходе
//  4. toggleRadio / аудио — останавливается при уходе
//  5. waitForFirebase — уведомление при таймауте
//  6. pageCurrentAudio — останавливается при cleanup
// ============================================================

// ── [FIX 1] Глобальный кэш обложек — создаётся ОДИН РАЗ, не пересоздаётся ──
if (!window._zarba_coverCache)   window._zarba_coverCache   = {};
if (!window._zarba_fallbackMap)  window._zarba_fallbackMap  = {};

window.renderHome = function(container) {
    // ── Реестр для cleanup ──
    const _cleanupTasks = [];
    window._pageCleanup = function() {
        _cleanupTasks.forEach(fn => { try { fn(); } catch(e) {} });
    };

    container.innerHTML = `
        <section class="radio-section">
            <div class="z-capsule">
                <div class="history-side prev">
                    <span class="history-label">БЫЛО</span>
                    <span class="history-track-bright" id="radio-prev-track">Загрузка...</span>
                </div>
                <div class="capsule-visual">
                    <div class="audio-wave" id="audio-wave">
                        <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
                        <div class="wave-bar"></div><div class="wave-bar"></div>
                    </div>
                    <div class="energy-ring-1"></div>
                    <div class="energy-ring-2"></div>
                    <button class="play-btn-elite" id="radio-play" onclick="window.toggleRadio()">
                        <img src="assets/white.svg" alt="PLAY">
                    </button>
                </div>
                <div class="capsule-info">
                    <div class="status-row">
                        <div class="live-tag-green"><span class="green-dot"></span> В ЭФИРЕ: <span id="online-count">1,254</span></div>
                        <div class="tags-group"><span class="z-tag">#ZARBA_FM</span></div>
                    </div>
                    <h1 class="pure-track-title" id="current-track">Подключение к эфиру...</h1>
                    <div class="progress-zone">
                        <span class="time-current" id="time-current">00:00</span>
                        <div class="neon-line-bg"><div class="neon-line-fill" id="progress-fill"></div></div>
                        <span class="time-total" id="time-total">00:00</span>
                    </div>
                    <h2 class="pure-artist-name" id="current-artist">ZARBA RADIO</h2>
                </div>
                <div class="history-side next">
                    <span class="history-label">ДАЛЬШЕ</span>
                    <span class="history-track-bright" id="radio-next-track">Ожидание...</span>
                </div>
                <div class="capsule-actions">
                    <button class="btn-chat-elite" onclick="toggleChat()">ЧАТ</button>
                </div>
            </div>
        </section>

        <style>
        .pure-track-title { overflow: hidden; white-space: nowrap; max-width: 400px; display: block; }
        h1.pure-track-title { font-size: 20px; font-weight: 700; margin: 0 0 4px 0; }
        .marquee-inner { display: inline-block; white-space: nowrap; }
        .marquee-inner.running { animation: marquee-scroll 14s linear infinite; }
        @keyframes marquee-scroll { 0%,15%{transform:translateX(0)} 85%,100%{transform:translateX(var(--md,-60%))} }

        .section-title {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 15px !important;
            font-weight: 900 !important;
            letter-spacing: 3px !important;
            text-transform: uppercase;
            color: #fff !important;
            padding: 6px 18px 6px 14px;
            margin-bottom: 18px;
            border-left: 3px solid #ff4500;
            background: linear-gradient(90deg, rgba(255,69,0,0.12) 0%, transparent 100%);
            border-radius: 0 6px 6px 0;
            overflow: visible;
        }
        .content-block {
            padding: 28px 0 32px !important;
            border-bottom: 1px solid rgba(255,255,255,0.05) !important;
        }
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -4px; left: 0;
            width: 60px; height: 2px;
            background: linear-gradient(90deg, #ff4500, transparent);
            border-radius: 2px;
        }
        .section-title .section-icon {
            width: 22px !important;
            height: 22px !important;
            filter: drop-shadow(0 0 6px rgba(255,69,0,0.7)) !important;
        }
        .t-name { font-size: 14px !important; font-weight: 700 !important; color: #fff !important; }
        .a-name { font-size: 12px !important; color: #aaa !important; margin-top: 2px; }
        .trend-time, .trend-duration {
            color: #ff8c00 !important; font-size: 11px !important; font-family: monospace !important;
            font-weight: 700 !important; display: inline !important; visibility: visible !important;
            opacity: 1 !important; min-width: 36px;
        }
        .trend-plays { color: #aaa !important; font-size: 12px !important; }
        .rank { color: #ff4500 !important; font-weight: 900 !important; font-size: 18px !important; min-width: 28px; }
        .ring-title, .ringtone-title, [class*="ring"][class*="title"] { color: #fff !important; font-weight: 700 !important; }
        .ring-artist, .ringtone-artist, [class*="ring"][class*="artist"] { color: #aaa !important; }
        .ring-time, .ringtone-time, [class*="ring"][class*="time"] { color: #ff8c00 !important; font-weight: 700 !important; }
        .current-time, .player-duration, .player-time {
            color: #ff8c00 !important; font-family: monospace !important; font-size: 11px !important;
            font-weight: 700 !important; display: inline !important; visibility: visible !important; opacity: 1 !important;
        }
        .player-title { color: #fff !important; font-weight: 700 !important; font-size: 13px !important; }
        .ringtone-plays { color: #aaa !important; font-size: 11px !important; }
        .release-card-info { background: linear-gradient(180deg, #151515 0%, #111 100%) !important; }
        .release-card-title { color: #fff !important; font-size: 12px !important; font-weight: 800 !important; }
        .release-card-artist { color: #aaa !important; font-size: 11px !important; }
        .release-card-time, .release-card-views { color: #777 !important; font-size: 10px !important; }
        .newcomer-card-title, [class*="newcomer"][class*="title"] { color: #fff !important; font-weight: 700 !important; }
        .newcomer-card-artist, [class*="newcomer"][class*="artist"] { color: #aaa !important; }
        .newcomer-card-info span, .newcomer-info span { color: #aaa !important; }
        .artist-name, [class*="artist"][class*="name"] { color: #fff !important; font-weight: 600 !important; }
        .artist-genre, [class*="artist"][class*="genre"] { color: #ff4500 !important; font-size: 10px !important; }
        .playlist-title, [class*="playlist"][class*="title"] { color: #fff !important; font-weight: 700 !important; }
        .playlist-count, [class*="playlist"][class*="count"] { color: #aaa !important; }
        .content-block .sub, .content-block .meta,
        .content-block [class*="sub"], .content-block [class*="meta"],
        .content-block [class*="count"], .content-block [class*="duration"] { color: #aaa !important; }
        .trend-cover { overflow: hidden; border-radius: 8px; }
        .trend-cover img {
            width: 100% !important; height: 100% !important; object-fit: cover !important;
            opacity: 1 !important; filter: none !important; display: block !important;
            background: transparent !important; border-radius: 8px !important;
        }
        .release-card {
            position: relative; flex-shrink: 0; width: 180px; border-radius: 14px; overflow: hidden;
            background: #1a1a1a; cursor: pointer; transition: transform .3s, box-shadow .3s;
            border: 1px solid rgba(255,255,255,0.12);
            box-shadow: 0 4px 24px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .release-card:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 50px rgba(0,0,0,.9), 0 0 0 1px rgba(255,69,0,.5), 0 0 40px rgba(255,69,0,.15); border-color: rgba(255,69,0,.4); }
        .release-card.playing { border-color: rgba(255,69,0,.6); box-shadow: 0 0 30px rgba(255,69,0,.25), 0 8px 30px rgba(0,0,0,.7); }
        .release-card-cover {
            width: 180px; height: 180px; background: #0a0a0a;
            display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;
        }
        .release-card-cover img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s ease; }
        .release-card:hover .release-card-cover img { transform: scale(1.08); }
        .release-card-cover .no-cover {
            width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
            background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
        }
        .release-card-cover .no-cover img { width: 60px; height: 60px; opacity: 0.15; transform: none !important; }
        .release-card-overlay {
            position: absolute; inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.3) 50%, transparent 100%);
            display: flex; align-items: flex-end; justify-content: space-between;
            padding: 10px 12px; opacity: 0; transition: opacity .25s;
        }
        .release-card:hover .release-card-overlay,
        .release-card.playing .release-card-overlay,
        .newcomer-card-new:hover .release-card-overlay,
        .newcomer-card-new.playing .release-card-overlay { opacity: 1; }
        .rc-play-btn {
            width: 44px; height: 44px; border-radius: 50%;
            background: #ff4500; border: none; color: #fff; font-size: 16px;
            cursor: pointer; display: flex; align-items: center; justify-content: center;
            transition: transform .15s, background .15s;
            box-shadow: 0 4px 14px rgba(255,69,0,.5); padding-left: 3px;
        }
        .rc-play-btn:hover { transform: scale(1.12); background: #ff6b00; }
        .rc-views-overlay { font-size: 10px; font-weight: 700; color: rgba(255,255,255,.7); }
        .release-card-info { padding: 10px 12px 11px; background: #111; }
        .release-card-title { font-size: 12px; font-weight: 800; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 2px; }
        .release-card-artist { font-size: 10px; color: #aaa; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 7px; }
        .release-card-progress { height: 2px; background: #1e1e1e; border-radius: 1px; margin-bottom: 5px; cursor: pointer; }
        .release-card-progress-fill { height: 100%; background: linear-gradient(90deg,#ff4500,#ff8c00); width: 0%; border-radius: 1px; transition: width .1s linear; }
        .release-card-bottom { display: flex; justify-content: space-between; align-items: center; }
        .release-card-time, .release-card-views { font-size: 9px; color: #888; font-family: monospace; letter-spacing: .3px; }
        .newcomer-card-new {
            position: relative; flex-shrink: 0; width: 180px; border-radius: 14px; overflow: hidden;
            background: #1a1a1a; cursor: pointer; transition: transform .3s, box-shadow .3s;
            border: 1px solid rgba(255,255,255,0.12);
            box-shadow: 0 4px 24px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .newcomer-card-new:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 50px rgba(0,0,0,.8), 0 0 0 1px rgba(255,69,0,.3); }
        .newcomer-card-new.playing { border-color: rgba(255,69,0,.5); box-shadow: 0 0 25px rgba(255,69,0,.2); }
        .trend-track-row {
            transition: background .2s, transform .15s !important;
            background: rgba(255,255,255,0.02) !important;
            border: 1px solid rgba(255,255,255,0.06) !important;
            border-radius: 10px !important; margin-bottom: 6px !important;
        }
        .trend-track-row:hover {
            background: rgba(255,69,0,0.08) !important;
            border-color: rgba(255,69,0,0.25) !important;
            transform: translateX(4px) !important;
        }
        .trend-track-row:hover .t-name { color: #ff6b00 !important; }
        .trend-track-row:hover .rank { text-shadow: 0 0 12px rgba(255,69,0,.6) !important; }
        .release-card-info {
            background: linear-gradient(180deg, #1e1e1e 0%, #181818 100%) !important;
            border-top: 1px solid rgba(255,255,255,0.08) !important;
        }
        .release-card:hover .release-card-title { color: #ff6b00 !important; }
        [class*="ring"][class*="progress"] { background: #222 !important; }
        [class*="ring"][class*="fill"] { background: linear-gradient(90deg,#ff4500,#ff8c00) !important; }
        .newcomer-badge {
            position: absolute; top: 8px; left: 8px; z-index: 5;
            background: linear-gradient(135deg,#ff4500,#ff8c00); color: #fff; font-size: 8px; font-weight: 800;
            padding: 3px 8px; border-radius: 3px; letter-spacing: 1px;
            box-shadow: 0 2px 8px rgba(255,69,0,.4);
        }

        /* ═══ TOP ARTISTS CAROUSEL ═══ */
        .art-slider-outer {
            position: relative; overflow: hidden;
            padding: 20px 0 20px; user-select: none; touch-action: pan-y;
        }
        .art-slider-track {
            display: flex; align-items: center; justify-content: center;
            position: relative; height: 380px;
        }
        .art-card {
            position: absolute;
            width: 220px; height: 340px;
            border-radius: 20px; overflow: hidden;
            cursor: pointer; will-change: transform, filter, opacity;
            transition: transform .5s cubic-bezier(.23,1,.32,1), filter .5s ease, opacity .5s ease;
            box-shadow: 0 8px 40px rgba(255,69,0,.2);
        }
        .art-card > img {
            width: 100%; height: 100%; object-fit: cover;
            object-position: top center; display: block; pointer-events: none;
        }
        .art-overlay {
            position: absolute; inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,.93) 0%, rgba(0,0,0,.28) 45%, rgba(255,69,0,.10) 100%);
            pointer-events: none;
        }
        .art-accent {
            position: absolute; left: 0; top: 18%; bottom: 18%;
            width: 4px;
            background: linear-gradient(180deg, transparent, #ff4500, transparent);
            border-radius: 2px;
            box-shadow: 0 0 12px #ff4500;
        }
        .art-namebar {
            position: absolute; bottom: 15px; left: 18px; right: 18px;
            display: flex; align-items: flex-end; justify-content: space-between;
        }
        .art-name-text {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 16px;
            letter-spacing: 1.5px; line-height: 1.2;
            text-shadow: 0 2px 10px rgba(0,0,0,.8);
            white-space: normal;
            word-break: break-word;
            flex: 1; min-width: 0; padding-right: 2px;
        }
        .art-card-num {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 32px; color: rgba(255,69,0,.25); line-height: 1;
            flex-shrink: 0;
        }

        /* ═══ ARTIST MODAL ═══ */
        .art-modal-overlay {
            display: none; position: fixed; inset: 0; z-index: 9999;
            background: rgba(0,0,0,.92); backdrop-filter: blur(16px);
            align-items: center; justify-content: center;
        }
        .art-modal-overlay.open { display: flex; }
        .art-modal-box {
            position: relative; width: min(340px, 88vw);
            border-radius: 20px; overflow: hidden;
            box-shadow: 0 0 60px rgba(255,69,0,.3), 0 0 0 1px rgba(255,69,0,.2);
            animation: artModalIn .3s cubic-bezier(.23,1,.32,1);
        }
        @keyframes artModalIn {
            from { opacity:0; transform: scale(.88); }
            to   { opacity:1; transform: scale(1); }
        }
        .art-modal-img {
            width: 100%; display: block;
            pointer-events: none;
            -webkit-user-select: none; user-select: none;
            -webkit-touch-callout: none;
            draggable: false;
        }
        .art-modal-gradient {
            position: absolute; bottom:0; left:0; right:0; height: 45%;
            background: linear-gradient(to top, rgba(0,0,0,.95), transparent);
            pointer-events: none;
        }
        .art-modal-name {
            position: absolute; bottom: 20px; left: 20px; right: 50px;
            font-family: 'Bebas Neue', sans-serif;
            font-size: 32px; letter-spacing: 3px; color: #fff;
            text-shadow: 0 2px 10px rgba(0,0,0,.8);
        }
        .art-modal-close {
            position: absolute; top: 12px; right: 12px;
            width: 34px; height: 34px; border-radius: 50%;
            background: rgba(0,0,0,.6); border: 1px solid rgba(255,255,255,.2);
            color: #fff; font-size: 14px; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: all .2s; z-index: 10;
        }
        .art-modal-close:hover { background: #ff4500; border-color: #ff4500; }

        /* ═══ NAV DOTS ═══ */
        .art-nav-row {
            display: flex; align-items: center; justify-content: center;
            gap: 20px; margin: 16px 0 0;
        }
        .art-nav-btn {
            width: 40px; height: 40px; border-radius: 50%;
            background: transparent; border: 2px solid rgba(255,69,0,.4);
            color: #ff4500; font-size: 16px; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: all .2s;
            font-weight: bold;
        }
        .art-nav-btn:hover, .art-nav-btn:active {
            background: #ff4500; color: #fff;
            box-shadow: 0 0 20px rgba(255,69,0,.6);
            border-color: #ff4500;
        }
        .art-dots { display: flex; gap: 8px; align-items: center; }
        .art-dot {
            width: 6px; height: 6px; border-radius: 50%;
            background: rgba(255,69,0,.25); cursor: pointer; transition: all .3s;
        }
        .art-dot.on {
            width: 22px; border-radius: 3px; background: #ff4500;
            box-shadow: 0 0 12px #ff4500;
        }
        .art-divider {
            height: 2px; margin: 24px 0 0;
            background: linear-gradient(90deg, #ff4500, rgba(255,69,0,.1), transparent);
        }

        /* ═══ VOTING SECTION ═══ */
        .art-vote-container { padding: 0 20px; }
        .art-vote-head {
            display: flex; align-items: center; justify-content: center;
            flex-direction: column; gap: 14px; padding: 24px 0 18px; text-align: center;
        }
        .art-vote-title-group {
            display: flex; align-items: center; justify-content: center;
            gap: 16px; width: 100%;
        }
        .art-vote-head-bar {
            flex: 1; height: 3px;
            background: linear-gradient(90deg, transparent, #ff4500);
            border-radius: 2px; box-shadow: 0 0 10px rgba(255,69,0,.5);
        }
        .art-vote-head-bar:last-child { background: linear-gradient(90deg, #ff4500, transparent); }
        .art-vote-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 30px; letter-spacing: 4px; line-height: 1.1; color: #fff;
            text-shadow: 0 0 30px rgba(255,69,0,.4); white-space: nowrap; flex-shrink: 0;
        }
        .art-vote-title span { color: #ff4500; }
        .art-vote-pill {
            background: rgba(255,69,0,.12); border: 1px solid rgba(255,69,0,.35);
            border-radius: 25px; padding: 5px 14px;
            font-size: 11px; letter-spacing: 2px; color: #ff8c00; white-space: nowrap; font-weight: 700;
        }
        .art-vote-list {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 12px; padding: 20px 0 0;
        }
        .art-vote-row {
            display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
            gap: 10px;
            background: linear-gradient(135deg, rgba(255,69,0,.08) 0%, rgba(20,20,20,.8) 100%);
            border: 2px solid rgba(255,69,0,.2); border-radius: 14px; padding: 16px 12px;
            cursor: pointer; transition: all .3s cubic-bezier(.23,1,.32,1);
            position: relative; overflow: hidden; min-height: 240px;
        }
        .art-vote-row::before {
            content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(135deg, rgba(255,69,0,.05), transparent);
            opacity: 0; transition: opacity .3s; pointer-events: none;
        }
        .art-vote-row:hover {
            border-color: rgba(255,69,0,.5);
            background: linear-gradient(135deg, rgba(255,69,0,.15) 0%, rgba(30,30,30,.9) 100%);
            transform: translateY(-6px);
            box-shadow: 0 12px 30px rgba(255,69,0,.2), 0 0 20px rgba(255,69,0,.15);
        }
        .art-vote-row:hover::before { opacity: 1; }
        .art-vote-row.voted {
            border-color: #ff4500;
            background: linear-gradient(135deg, rgba(255,69,0,.2) 0%, rgba(20,20,20,.95) 100%);
            box-shadow: 0 0 30px rgba(255,69,0,.3), inset 0 0 20px rgba(255,69,0,.05);
        }
        .art-vr-avatar {
            width: 80px; height: 80px; border-radius: 12px;
            object-fit: cover; object-position: top; flex-shrink: 0; position: relative; z-index: 1;
            filter: saturate(.7); transition: all .3s; border: 2px solid rgba(255,69,0,.2);
        }
        .art-vote-row:hover .art-vr-avatar { filter: saturate(1); border-color: rgba(255,69,0,.5); }
        .art-vote-row.voted .art-vr-avatar { filter: saturate(1); border-color: #ff4500; box-shadow: 0 0 20px rgba(255,69,0,.4); }
        .art-vr-info { flex: 1; width: 100%; position: relative; z-index: 1; text-align: center; }
        .art-vr-name {
            font-family: 'Bebas Neue', sans-serif; font-size: 14px;
            letter-spacing: 2px; line-height: 1.2; white-space: normal; overflow: visible;
            text-overflow: clip; color: #fff; font-weight: 600; margin-bottom: 8px;
        }
        .art-vr-bar-wrap { width: 100%; height: 3px; background: rgba(255,255,255,.1); border-radius: 2px; overflow: hidden; margin: 8px 0; }
        .art-vr-bar {
            height: 100%; width: 0%;
            background: linear-gradient(90deg, #ff4500, #ff8c00);
            border-radius: 2px; box-shadow: 0 0 10px #ff4500;
            transition: width 1s cubic-bezier(.23,1,.32,1);
        }
        .art-vr-pct { font-size: 18px; letter-spacing: 1px; color: #999; font-weight: 700; margin-top: 6px; }
        .art-vote-row.voted .art-vr-pct { color: #ff4500; font-size: 20px; }
        .art-vr-icon {
            width: 36px; height: 36px; border-radius: 50%;
            border: 2px solid rgba(255,69,0,.35); background: transparent;
            color: #ff4500; font-size: 16px;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0; position: relative; z-index: 1; transition: all .3s; font-weight: bold;
        }
        .art-vote-row:hover .art-vr-icon { border-color: #ff6b00; color: #ff6b00; }
        .art-vote-row.voted .art-vr-icon {
            background: #ff4500; color: #fff; border-color: #ff4500;
            box-shadow: 0 0 16px rgba(255,69,0,.6); transform: scale(1.1);
        }
        @keyframes artVFlash {
            0% { background: linear-gradient(135deg, rgba(255,69,0,.3), rgba(255,69,0,.05)); }
            100% { background: linear-gradient(135deg, rgba(255,69,0,.15), rgba(20,20,20,.8)); }
        }
        .art-vote-row.art-flash { animation: artVFlash .4s ease-out; }
        </style>

        <section class="content-block">
            <h3 class="section-title">
                <img src="assets/tops/artist.png" alt="Artist" class="section-icon"> ТОПОВЫЕ АРТИСТЫ
            </h3>
            <div class="art-slider-outer" id="artSliderOuter">
                <div class="art-slider-track" id="artSliderTrack"></div>
            </div>
            <div class="art-nav-row">
                <button class="art-nav-btn" id="artPrevBtn">←</button>
                <div class="art-dots" id="artDots"></div>
                <button class="art-nav-btn" id="artNextBtn">→</button>
            </div>

            <div class="art-vote-container">
                <div class="art-vote-head">
                    <div class="art-vote-title-group">
                        <div class="art-vote-head-bar"></div>
                        <div class="art-vote-title">КТО ЛУЧШИЙ <span>АРТИСТ</span>?</div>
                        <div class="art-vote-head-bar"></div>
                    </div>
                    <div class="art-vote-pill" id="artTotalPill">0 голосов</div>
                </div>
                <div class="art-vote-list" id="artVoteList"></div>
            </div>
        </section>

        <section class="content-block">
            <h3 class="section-title">
                <img src="assets/tops/new.png" alt="New" class="section-icon"> НОВИНКИ НЕДЕЛИ
            </h3>
            <div class="scroll-nav-row">
                <button class="scroll-arrow-btn" onclick="scrollSection('latest-releases', -1)">&#8249;</button>
                <div class="hscroll-wrapper" id="latest-releases-wrap">
                    <div class="grid-1-1 hscroll-inner" id="latest-releases">
                        ${'<div class="release-item-skeleton"><img src="assets/black.svg" alt="cover"><div class="release-bottom"><span class="release-plays">▶ ...</span></div></div>'.repeat(6)}
                    </div>
                </div>
                <button class="scroll-arrow-btn" onclick="scrollSection('latest-releases', 1)">&#8250;</button>
            </div>
        </section>

        <section class="content-block">
            <h3 class="section-title">
                <img src="assets/tops/top10.png" alt="Top 10" class="section-icon"> В ТРЕНДЕ (TOP 10)
            </h3>
            <div class="vscroll-wrapper vscroll-top10" id="top-trends-wrap">
                <div class="trending-list" id="top-trends">
                    <div style="padding: 20px; color: #666; text-align: center;">Загрузка чарта...</div>
                </div>
            </div>
        </section>

        <section class="content-block">
            <h3 class="section-title">
                <img src="assets/tops/ringtone.png" alt="Ringtone" class="section-icon"> РИНГТОНЫ
            </h3>
            <div class="vscroll-wrapper ringtones-scroll" id="ringtones-wrap">
                <div class="ringtones-list" id="ringtones-list">
                    <div style="padding: 20px; color: #666; text-align: center;">Загрузка рингтонов...</div>
                </div>
            </div>
        </section>

        <section class="content-block">
            <h3 class="section-title">
                <img src="assets/tops/new.png" alt="Новички" class="section-icon"> НОВИЧКИ
            </h3>
            <div class="scroll-nav-row">
                <button class="scroll-arrow-btn" onclick="scrollSection('newcomers-list', -1)">&#8249;</button>
                <div class="hscroll-wrapper" id="newcomers-wrap">
                    <div class="hscroll-inner" id="newcomers-list">
                        ${'<div class="newcomer-card"><div class="newcomer-card-cover"><img src="assets/black.svg" alt="cover"></div><div class="newcomer-card-info"><span class="newcomer-card-title">Загрузка...</span></div></div>'.repeat(5)}
                    </div>
                </div>
                <button class="scroll-arrow-btn" onclick="scrollSection('newcomers-list', 1)">&#8250;</button>
            </div>
        </section>
    `;

    // ══════════════════════════════════════════
    //  TOP ARTISTS STACK + VOTING
    // ══════════════════════════════════════════
    const ART_IMG = 'assets/TOP ARTIST/';
    const ARTISTS = [
        { name:'RYDER',          file:'ryder.jpg',          id:'ryder'          },
        { name:'CORLEONE',       file:'corleone.jpg',       id:'corleone'       },
        { name:'FARUKH HASANOV', file:'farukhhasanov.jpg',  id:'farukh_hasanov' },
        { name:'SAFARMUHAMMAD',  file:'safarmuhammad.jpg',  id:'safarmuhammad'  },
        { name:'BAKHA 84',       file:'baha84.jpg',         id:'bakha84'        },
        { name:'BARON TJK',      file:'barontjk.jpg',       id:'baron_tjk'      },
        { name:'ABADA',          file:'abada.png',          id:'abada'          },
        { name:'SHON MC',        file:'SHON MC.jpg',        id:'shonmc'         },
    ];
    let artCur = 0, artVoted = null;
    let artCounts = [0, 0, 0, 0, 0, 0, 0, 0];

    const artTrack = container.querySelector('#artSliderTrack');
    const artOuter = container.querySelector('#artSliderOuter');
    const artCards = [];

    // ── [FIX 2] artAutoTimer — храним и очищаем через cleanup ──
    let artAutoTimer = null;

    function artApply(animated) {
        var total = ARTISTS.length;
        artCards.forEach(function(el, i) {
            var diff = i - artCur;
            if (diff > total/2)  diff -= total;
            if (diff < -total/2) diff += total;
            var tx, scale, filterVal, opacity, zIdx;
            if (diff === 0) {
                tx=0; scale=1; filterVal='none'; opacity=1; zIdx=10;
            } else if (Math.abs(diff) === 1) {
                tx = diff * 180; scale=0.80; filterVal='brightness(0.35)'; opacity=1; zIdx=8;
            } else if (Math.abs(diff) === 2) {
                tx = diff * 230; scale=0.65; filterVal='brightness(0.15)'; opacity=0.5; zIdx=6;
            } else {
                tx = diff * 270; scale=0.50; filterVal='brightness(0.08)'; opacity=0; zIdx=1;
            }
            el.style.transition = animated
                ? 'transform .5s cubic-bezier(.23,1,.32,1), filter .5s ease, opacity .4s ease'
                : 'none';
            el.style.transform = 'translateX(' + tx + 'px) scale(' + scale + ')';
            el.style.filter    = filterVal;
            el.style.opacity   = opacity;
            el.style.zIndex    = zIdx;
        });
        container.querySelectorAll('.art-dot').forEach(function(d,i){ d.classList.toggle('on', i===artCur); });
    }

    function artGo(dir) {
        artCur = (artCur + dir + ARTISTS.length) % ARTISTS.length;
        artApply(true);
    }

    function artStartAuto() {
        artStopAuto();
        artAutoTimer = setInterval(function(){ artGo(1); }, 3000);
    }
    function artStopAuto() {
        if (artAutoTimer) { clearInterval(artAutoTimer); artAutoTimer = null; }
    }

    // Регистрируем очистку таймера при уходе со страницы
    _cleanupTasks.push(artStopAuto);

    function artOpenModal(a) {
        var existing = document.getElementById('artModalOverlay');
        if (existing) existing.remove();
        var modal = document.createElement('div');
        modal.id = 'artModalOverlay';
        modal.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.93);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;cursor:pointer;';
        var img = document.createElement('img');
        img.src = ART_IMG + a.file;
        img.style.cssText = 'max-width:88vw;max-height:80vh;border-radius:18px;object-fit:contain;pointer-events:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;display:block;';
        img.draggable = false;
        img.addEventListener('contextmenu', function(e){ e.preventDefault(); });
        img.addEventListener('dragstart',   function(e){ e.preventDefault(); });
        var name = document.createElement('div');
        name.textContent = a.name;
        name.style.cssText = 'font-family:Bebas Neue,sans-serif;font-size:28px;letter-spacing:4px;color:#fff;text-align:center;';
        var close = document.createElement('button');
        close.innerHTML = '✕';
        close.style.cssText = 'position:fixed;top:20px;right:20px;width:40px;height:40px;border-radius:50%;background:#FF4500;border:none;color:#fff;font-size:18px;cursor:pointer;z-index:100000;display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px rgba(255,69,0,0.6);';
        function closeModal(){ modal.remove(); document.body.style.overflow=''; }
        close.addEventListener('click', function(e){ e.stopPropagation(); closeModal(); });
        modal.addEventListener('click', closeModal);
        document.addEventListener('keydown', function esc(e){ if(e.key==='Escape'){ closeModal(); document.removeEventListener('keydown',esc); } });
        modal.appendChild(img);
        modal.appendChild(name);
        modal.appendChild(close);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    }

    if (artTrack) {
        ARTISTS.forEach(function(a, i) {
            var el = document.createElement('div');
            el.className = 'art-card';
            el.innerHTML =
                '<img src="' + ART_IMG + a.file + '" alt="' + a.name + '" onerror="this.style.background=\x27#1e1e1e\x27">' +
                '<div class="art-overlay"></div>' +
                '<div class="art-accent"></div>' +
                '<div class="art-namebar">' +
                    '<div class="art-name-text">' + a.name + '</div>' +
                    '<div class="art-card-num">' + String(i+1).padStart(2,'0') + '</div>' +
                '</div>';
            el.addEventListener('click', (function(idx, artist) {
                return function() {
                    if (idx !== artCur) { artCur=idx; artApply(true); artStopAuto(); artStartAuto(); }
                    else { artOpenModal(artist); }
                };
            })(i, a));
            artTrack.appendChild(el);
            artCards.push(el);
        });

        var artSx=0, artDx=0, artDragging=false;
        artOuter.addEventListener('pointerdown', function(e){ artSx=e.clientX; artDx=0; artDragging=true; artStopAuto(); });
        artOuter.addEventListener('pointermove', function(e){ if(!artDragging) return; artDx=e.clientX-artSx; });
        artOuter.addEventListener('pointerup', function(){
            if(!artDragging) return; artDragging=false;
            if      (artDx < -50) artGo(1);
            else if (artDx >  50) artGo(-1);
            artStartAuto();
        });
        artOuter.addEventListener('pointercancel', function(){ artDragging=false; artStartAuto(); });

        var artDotsWrap = container.querySelector('#artDots');
        if (artDotsWrap) {
            ARTISTS.forEach(function(_,i) {
                var d = document.createElement('div');
                d.className = 'art-dot' + (i===0?' on':'');
                d.addEventListener('click', function() { artCur=i; artApply(true); artStopAuto(); artStartAuto(); });
                artDotsWrap.appendChild(d);
            });
        }

        var pb = container.querySelector('#artPrevBtn');
        var nb = container.querySelector('#artNextBtn');
        if (pb) pb.addEventListener('click', function() { artGo(-1); artStopAuto(); artStartAuto(); });
        if (nb) nb.addEventListener('click', function() { artGo(1);  artStopAuto(); artStartAuto(); });

        artApply(false);
        artStartAuto();
    }

    function artTotal() { return artCounts.reduce(function(s,v){ return s+v; }, 0); }

    // ── [FIX 3] Firebase onSnapshot — сохраняем unsubscribe и вызываем при cleanup ──
    async function loadArtistVotesFromFirebase() {
        if (!window.firebaseDb) return;
        try {
            const { collection, onSnapshot, doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
            const db = window.firebaseDb;

            const unsubscribeVotes = onSnapshot(collection(db, 'artist_votes'), function(snap) {
                snap.forEach(function(docSnap) {
                    ARTISTS.forEach(function(a, i) {
                        if (a.id === docSnap.id) artCounts[i] = parseInt(docSnap.data().votes) || 0;
                    });
                });
                buildArtVoting();
            });

            // Регистрируем отписку при уходе со страницы
            _cleanupTasks.push(unsubscribeVotes);

            async function checkUserVote(user) {
                try {
                    const uSnap = await getDoc(doc(db, 'user_votes', user.uid));
                    if (uSnap.exists()) {
                        var votedId = uSnap.data().artistId;
                        ARTISTS.forEach(function(a, i) { if (a.id === votedId) artVoted = i; });
                        buildArtVoting();
                    }
                } catch(e) {}
            }

            if (window.firebaseAuth) {
                // Сохраняем unsubscribe от auth тоже
                const unsubscribeAuth = window.firebaseAuth.onAuthStateChanged(function(user) {
                    if (user) checkUserVote(user);
                    else { artVoted = null; buildArtVoting(); }
                });
                _cleanupTasks.push(unsubscribeAuth);
            }
        } catch(e) {
            console.error("Ошибка голосования:", e);
        }
    }

    // Кнопка "?" рядом с pill
    (function() {
        var pill = container.querySelector('#artTotalPill');
        if (!pill) return;
        var btn = document.createElement('button');
        btn.textContent = '?';
        btn.style.cssText = 'width:20px;height:20px;border-radius:50%;border:1px solid rgba(255,69,0,.4);background:transparent;color:#ff6b00;font-size:11px;font-weight:900;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;margin-left:8px;vertical-align:middle;font-family:serif;';
        btn.onmouseover = function(){ btn.style.background='#ff4500'; btn.style.color='#fff'; };
        btn.onmouseout  = function(){ btn.style.background='transparent'; btn.style.color='#ff6b00'; };
        pill.insertAdjacentElement('afterend', btn);

        var overlay = document.createElement('div');
        overlay.style.cssText = 'display:none;position:fixed;inset:0;z-index:99998;background:rgba(0,0,0,.85);backdrop-filter:blur(10px);align-items:center;justify-content:center;padding:20px;';
        overlay.innerHTML =
            '<div style="background:#1a1a1a;border:1px solid rgba(255,69,0,.4);border-radius:20px;padding:32px 28px;max-width:420px;width:100%;position:relative;box-shadow:0 0 60px rgba(255,69,0,.25);">' +
                '<button id="artInfoClose" style="position:absolute;top:14px;right:14px;width:32px;height:32px;border-radius:50%;background:rgba(255,69,0,.15);border:1px solid rgba(255,69,0,.4);color:#ff8c00;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;">x</button>' +
                '<div style="font-family:Bebas Neue,sans-serif;font-size:24px;letter-spacing:4px;color:#fff;margin-bottom:6px;">ПРАВИЛА <span style="color:#ff4500">ГОЛОСОВАНИЯ</span></div>' +
                '<div style="height:2px;background:linear-gradient(90deg,#ff4500,rgba(255,69,0,.1),transparent);margin:14px 0 20px;"></div>' +
                '<div style="display:flex;gap:12px;margin-bottom:14px;"><div style="font-size:18px;flex-shrink:0;margin-top:1px;">1</div><div style="font-size:13px;line-height:1.7;color:#ccc;"><b style="color:#fff;display:block;margin-bottom:2px;">Один аккаунт - один голос.</b>Каждый зарегистрированный пользователь голосует только за одного артиста.</div></div>' +
                '<div style="display:flex;gap:12px;margin-bottom:14px;"><div style="font-size:18px;flex-shrink:0;margin-top:1px;">2</div><div style="font-size:13px;line-height:1.7;color:#ccc;"><b style="color:#fff;display:block;margin-bottom:2px;">Голос нельзя изменить.</b>После голосования выбор фиксируется навсегда.</div></div>' +
                '<div style="display:flex;gap:12px;margin-bottom:14px;"><div style="font-size:18px;flex-shrink:0;margin-top:1px;">3</div><div style="font-size:13px;line-height:1.7;color:#ccc;"><b style="color:#fff;display:block;margin-bottom:2px;">Результаты в реальном времени.</b>Счетчик обновляется мгновенно для всех.</div></div>' +
                '<div style="margin-top:20px;padding:12px 16px;background:rgba(255,69,0,.08);border-radius:10px;border:1px solid rgba(255,69,0,.2);font-size:12px;color:#bbb;text-align:center;letter-spacing:1px;line-height:1.6;"><b style="color:#ff6b00;font-size:13px;">ZARBA FM</b><br>Фанаты Таджикского Хип-Хопа решают все</div>' +
            '</div>';
        document.body.appendChild(overlay);
        btn.addEventListener('click', function(){ overlay.style.display='flex'; });
        overlay.addEventListener('click', function(e){ if(e.target===overlay) overlay.style.display='none'; });
        overlay.querySelector('#artInfoClose').addEventListener('click', function(){ overlay.style.display='none'; });

        // Убираем оверлей при уходе со страницы
        _cleanupTasks.push(function() { overlay.remove(); });
    })();

    function buildArtVoting() {
        const list = container.querySelector('#artVoteList');
        const pill = container.querySelector('#artTotalPill');
        if (!list) return;
        if (pill) pill.textContent = artTotal().toLocaleString() + ' голосов';
        list.innerHTML = '';
        var maxV = Math.max.apply(null, artCounts.concat([1]));
        ARTISTS.forEach(function(a, i) {
            var votes  = artCounts[i] || 0;
            var barPct = Math.round(votes / maxV * 100);
            const row = document.createElement('div');
            row.className = 'art-vote-row' + (artVoted===i?' voted':'');
            row.id = 'avrow-'+i;
            row.innerHTML =
                '<img class="art-vr-avatar" src="'+ART_IMG+a.file+'" alt="'+a.name+'" onerror="this.style.background=\'#222\'">' +
                '<div class="art-vr-info">' +
                    '<div class="art-vr-name">'+a.name+'</div>' +
                    '<div class="art-vr-bar-wrap"><div class="art-vr-bar" id="avbar-'+i+'"></div></div>' +
                    '<div class="art-vr-pct" id="avpct-'+i+'">0</div>' +
                '</div>' +
                '<div class="art-vr-icon">'+(artVoted===i?'✓':'♥')+'</div>';
            if (artVoted === null) row.addEventListener('click', function() { castArtVote(i); });
            list.appendChild(row);
            setTimeout(function() {
                var bar=container.querySelector('#avbar-'+i);
                var pe=container.querySelector('#avpct-'+i);
                if(bar) bar.style.width=barPct+'%';
                if(pe)  pe.textContent=votes.toLocaleString('ru-RU');
            }, 120+i*65);
        });
    }

    async function castArtVote(idx) {
        const currentUser = window.firebaseAuth && window.firebaseAuth.currentUser;
        if (!currentUser) {
            showVoteToast('🔒 ВОЙДИТЕ В АККАУНТ ЧТОБЫ ГОЛОСОВАТЬ');
            return;
        }
        if (artVoted !== null) {
            showVoteToast('✅ ВЫ УЖЕ ПРОГОЛОСОВАЛИ — 1 ГОЛОС НА АККАУНТ');
            return;
        }

        artCounts[idx]++;
        artVoted = idx;
        buildArtVoting();

        try {
            const { doc, runTransaction, increment } =
                await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
            const db = window.firebaseDb;

            await runTransaction(db, async function(tx) {
                const uRef  = doc(db, 'user_votes', currentUser.uid);
                const uSnap = await tx.get(uRef);
                if (uSnap.exists()) throw new Error('already_voted');

                const aRef  = doc(db, 'artist_votes', ARTISTS[idx].id);
                const aSnap = await tx.get(aRef);
                if (aSnap.exists()) {
                    tx.update(aRef, { votes: increment(1), updatedAt: new Date().toISOString() });
                } else {
                    tx.set(aRef, { artistId: ARTISTS[idx].id, artistName: ARTISTS[idx].name, votes: 1, updatedAt: new Date().toISOString() });
                }
                tx.set(uRef, { artistId: ARTISTS[idx].id, votedAt: new Date().toISOString(), uid: currentUser.uid });
            });

            showVoteToast('🔥 ГОЛОС ПРИНЯТ ЗА ' + ARTISTS[idx].name + '!');

        } catch(e) {
            artCounts[idx] = Math.max(0, artCounts[idx] - 1);
            artVoted = null;
            buildArtVoting();
            if (e.message === 'already_voted') showVoteToast('✅ ВЫ УЖЕ ПРОГОЛОСОВАЛИ');
            else { console.error(e); showVoteToast('❌ ОШИБКА — ПОПРОБУЙТЕ ЕЩЁ РАЗ'); }
        }
    }

    function showVoteToast(text) {
        var msg = document.createElement('div');
        msg.style.cssText = 'position:fixed;bottom:34px;left:50%;transform:translateX(-50%) translateY(10px);background:#111;border:1px solid rgba(255,69,0,.5);color:#fff;padding:10px 20px;border-radius:30px;font-weight:700;letter-spacing:1px;font-size:12px;z-index:99999;box-shadow:0 4px 20px rgba(255,69,0,.3);white-space:nowrap;opacity:0;transition:all .3s;pointer-events:none;';
        msg.textContent = text;
        document.body.appendChild(msg);
        requestAnimationFrame(function() { msg.style.opacity='1'; msg.style.transform='translateX(-50%) translateY(0)'; });
        setTimeout(function() {
            msg.style.opacity='0'; msg.style.transform='translateX(-50%) translateY(10px)';
            setTimeout(function(){ msg.remove(); }, 300);
        }, 3000);
    }

    buildArtVoting();
    loadArtistVotesFromFirebase();

    // ══════════════════════════════════════════
    //  SCROLL HELPERS
    // ══════════════════════════════════════════
    function scrollSection(id, dir) {
        const el = container.querySelector('#' + id);
        const wrap = el ? el.closest('.hscroll-wrapper') : null;
        if (wrap) wrap.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
    // ── [FIX] scrollSection привязан к текущему container, не глобальный ──
    window.scrollSection = scrollSection;

    container.querySelectorAll('.hscroll-wrapper').forEach(el => {
        let isDown = false, startX, scrollLeft;
        el.addEventListener('mousedown', e => { isDown = true; el.classList.add('dragging'); startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; });
        el.addEventListener('mouseleave', () => { isDown = false; el.classList.remove('dragging'); });
        el.addEventListener('mouseup', () => { isDown = false; el.classList.remove('dragging'); });
        el.addEventListener('mousemove', e => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX); });
        el.addEventListener('wheel', e => { e.preventDefault(); el.scrollBy({ left: e.deltaY * 2, behavior: 'smooth' }); }, { passive: false });
    });

    // ══════════════════════════════════════════
    //  ZARBA COVER SYSTEM
    //  [FIX 1] Используем глобальный кэш window._zarba_coverCache
    // ══════════════════════════════════════════
    const WORKER_URL    = 'https://zarba-radio-logic.levakandproduction.workers.dev';
    const PUBLIC_R2_BASE = 'https://pub-87fe4609510a4c3fb9a0512f837c3174.r2.dev/';
    const COVER_COUNT   = 12;

    function getFallbackCover(key) {
        if (!window._zarba_fallbackMap[key]) {
            window._zarba_fallbackMap[key] = 'assets/covers/x (' + (Math.floor(Math.random() * COVER_COUNT) + 1) + ').png';
        }
        return window._zarba_fallbackMap[key];
    }

    function ensureJsMediaTags() {
        if (window.jsmediatags) return Promise.resolve();
        return new Promise(res => {
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js';
            s.onload = res; document.head.appendChild(s);
        });
    }

    function extractCoverFromBuffer(buf) {
        return ensureJsMediaTags().then(() => new Promise(resolve => {
            window.jsmediatags.read(new Blob([buf], { type: 'audio/mpeg' }), {
                onSuccess: (tag) => {
                    const pic = tag.tags && tag.tags.picture;
                    if (!pic) { resolve(null); return; }
                    const b64 = btoa(pic.data.reduce((a, b) => a + String.fromCharCode(b), ''));
                    const raw = 'data:' + pic.format + ';base64,' + b64;
                    const img = new Image();
                    img.onload = () => {
                        const c = document.createElement('canvas');
                        c.width = 200; c.height = 200;
                        c.getContext('2d').drawImage(img, 0, 0, 200, 200);
                        resolve(c.toDataURL('image/jpeg', 0.8));
                    };
                    img.onerror = () => resolve(null);
                    img.src = raw;
                },
                onError: () => resolve(null)
            });
        }));
    }

    async function fetchCoverFromWorker(trackUrl) {
        if (!trackUrl) return null;
        // [FIX 1] Глобальный кэш — работает между визитами на страницу
        if (window._zarba_coverCache[trackUrl] !== undefined) return window._zarba_coverCache[trackUrl];
        try {
            const filePath = decodeURIComponent(trackUrl.replace(PUBLIC_R2_BASE, ''));
            const res = await fetch(WORKER_URL + '?file=' + encodeURIComponent(filePath));
            if (!res.ok) { window._zarba_coverCache[trackUrl] = null; return null; }
            const buf = await res.arrayBuffer();
            window._zarba_coverCache[trackUrl] = await extractCoverFromBuffer(buf);
            return window._zarba_coverCache[trackUrl];
        } catch(e) { window._zarba_coverCache[trackUrl] = null; return null; }
    }

    function applyTrackCover(imgEl, trackUrl, coverUrlFromDb) {
        if (coverUrlFromDb) { imgEl.src = coverUrlFromDb; return; }
        imgEl.src = getFallbackCover(trackUrl || '');
        fetchCoverFromWorker(trackUrl).then(cover => {
            if (cover && imgEl.parentElement) imgEl.src = cover;
        });
    }

    function formatViews(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num || 0;
    }

    function fmt(s) {
        if (isNaN(s) || !isFinite(s)) return '0:00';
        return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
    }

    // ── [FIX 4] pageCurrentAudio — останавливаем при cleanup ──
    let pageCurrentAudio = null;
    let pageCurrentCard  = null;

    function stopPageCurrent() {
        if (pageCurrentAudio) { pageCurrentAudio.pause(); pageCurrentAudio.currentTime = 0; pageCurrentAudio = null; }
        if (pageCurrentCard) {
            pageCurrentCard.classList.remove('playing');
            const btn  = pageCurrentCard.querySelector('.rc-play-btn');
            if (btn)  btn.textContent = '▶';
            const fill = pageCurrentCard.querySelector('.release-card-progress-fill');
            if (fill) fill.style.width = '0%';
            const time = pageCurrentCard.querySelector('.release-card-time');
            if (time) time.textContent = '0:00';
            pageCurrentCard = null;
        }
    }

    _cleanupTasks.push(stopPageCurrent);

    function makeCard(data, id, isNewcomer, docFn, updateDocFn, incrementFn) {
        const div = document.createElement('div');
        div.className = isNewcomer ? 'newcomer-card-new' : 'release-card';
        const _coverId = 'cov_' + Math.random().toString(36).slice(2);
        div.innerHTML =
            (isNewcomer ? '<div class="newcomer-badge">★ FRESH</div>' : '') +
            '<div class="release-card-cover">' +
                '<div class="no-cover" id="' + _coverId + '"><img src="assets/black.svg" alt=""></div>' +
                '<div class="release-card-overlay">' +
                    '<button class="rc-play-btn">▶</button>' +
                    '<span class="rc-views-overlay">▶ ' + formatViews(data.views) + '</span>' +
                '</div>' +
            '</div>' +
            '<div class="release-card-info">' +
                '<div class="release-card-title">' + (data.title || '—') + '</div>' +
                '<div class="release-card-artist">' + (data.artist || '—') + '</div>' +
                '<div class="release-card-progress"><div class="release-card-progress-fill"></div></div>' +
                '<div class="release-card-bottom">' +
                    '<span class="release-card-time">0:00</span>' +
                    '<span class="release-card-views">▶ ' + formatViews(data.views) + '</span>' +
                '</div>' +
            '</div>';

        (() => {
            const slot = div.querySelector('#' + _coverId);
            if (!slot) return;
            const img = document.createElement('img');
            img.alt = 'cover';
            img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
            img.onerror = () => { img.src = getFallbackCover(data.url || ''); };
            applyTrackCover(img, data.url, data.coverUrl);
            if (slot.parentElement) slot.replaceWith(img);
        })();

        const playBtn     = div.querySelector('.rc-play-btn');
        const fill        = div.querySelector('.release-card-progress-fill');
        const timeEl      = div.querySelector('.release-card-time');
        const progressBar = div.querySelector('.release-card-progress');
        let audio = null, viewCounted = false;

        function initAudio() {
            if (audio) return;
            audio = new Audio(data.url);
            audio.addEventListener('timeupdate', () => {
                if (!audio.duration) return;
                fill.style.width = (audio.currentTime / audio.duration * 100) + '%';
                timeEl.textContent = fmt(audio.currentTime);
                if (audio.currentTime > 10 && !viewCounted) {
                    viewCounted = true;
                    if (updateDocFn && docFn && incrementFn)
                        updateDocFn(docFn(window.firebaseDb, 'tracks', id), { views: incrementFn(1) }).catch(() => {});
                }
            });
            audio.addEventListener('ended', () => {
                div.classList.remove('playing'); playBtn.textContent = '▶';
                fill.style.width = '0%'; timeEl.textContent = '0:00';
                pageCurrentAudio = null; pageCurrentCard = null; viewCounted = false;
            });
            audio.addEventListener('error', () => { playBtn.textContent = '❌'; });
        }

        playBtn.addEventListener('click', e => {
            e.stopPropagation(); initAudio();
            if (!audio.paused) {
                audio.pause(); div.classList.remove('playing'); playBtn.textContent = '▶';
                pageCurrentAudio = null; pageCurrentCard = null;
            } else {
                stopPageCurrent();
                audio.play().catch(() => { playBtn.textContent = '❌'; });
                div.classList.add('playing'); playBtn.textContent = '⏸';
                pageCurrentAudio = audio; pageCurrentCard = div;
            }
        });

        progressBar.addEventListener('click', e => {
            initAudio();
            if (audio.duration)
                audio.currentTime = ((e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth) * audio.duration;
        });

        return div;
    }

    // ── [FIX 5] waitForFirebase — уведомление при таймауте ──
    function waitForFirebase(callback) {
        if (window.firebaseDb) { callback(); return; }
        let attempts = 0;
        const iv = setInterval(() => {
            if (window.firebaseDb) {
                clearInterval(iv);
                callback();
            } else if (++attempts > 20) {
                clearInterval(iv);
                // Показываем пользователю что данные не загрузились
                const sections = [
                    container.querySelector('#latest-releases'),
                    container.querySelector('#top-trends'),
                    container.querySelector('#ringtones-list'),
                    container.querySelector('#newcomers-list'),
                ];
                sections.forEach(el => {
                    if (el) el.innerHTML = '<div style="padding:20px;color:#ff4500;text-align:center;font-size:12px;letter-spacing:1px;">⚠ НЕТ СОЕДИНЕНИЯ — ОБНОВИТЕ СТРАНИЦУ</div>';
                });
            }
        }, 300);
    }

    async function fetchHomeData() {
        try {
            const { collection, getDocs, query, orderBy, limit, where, doc, updateDoc, increment } =
                await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
            const tracksRef = collection(window.firebaseDb, 'tracks');

            // ══════════════════════════════════════════════════════
            //  ZARBA RADIO — Настоящее радио с синхронизацией по времени
            //  Все слушатели слышат один трек в одно время.
            //  При обновлении/входе — прыгаем на нужную позицию.
            //  Состояние хранится глобально — переживает смену страниц.
            // ══════════════════════════════════════════════════════
            (async function initRadio() {
                const WORKER = "https://zarba-radio-logic.levakandproduction.workers.dev";

                // ── Глобальное состояние радио (переживает смену страниц) ──
                if (!window._zarbaRadioState) {
                    window._zarbaRadioState = {
                        cur:      null,   // текущий Audio объект
                        curIdx:   -1,     // индекс трека в плейлисте
                        tracks:   null,   // весь плейлист
                        muted:    true,   // true = тихо (не остановлено!)
                        started:  false,  // пользователь нажал PLAY хоть раз
                        rafId:    null,   // requestAnimationFrame id
                        epochStart: null, // точка отсчёта времени от сервера
                    };
                }
                const RS = window._zarbaRadioState;

                // ── UI элементы (перепривязываем к новому DOM при каждом рендере) ──
                const trackEl  = container.querySelector('#current-track');
                const artistEl = container.querySelector('#current-artist');
                const prevEl   = container.querySelector('#radio-prev-track');
                const nextEl   = container.querySelector('#radio-next-track');
                const fillEl   = container.querySelector('#progress-fill');
                const timeEl   = container.querySelector('#time-current');
                const totalEl  = container.querySelector('#time-total');

                function fmt2(s) {
                    if (!s || !isFinite(s)) return '00:00';
                    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(Math.floor(s % 60)).padStart(2, '0');
                }

                function setMarquee(el, text) {
                    if (!el) return;
                    el.innerHTML = '<span class="marquee-inner">' + text + '</span>';
                    setTimeout(() => {
                        const inn = el.querySelector('.marquee-inner');
                        if (inn && inn.scrollWidth > el.clientWidth) {
                            inn.style.setProperty('--md', -(inn.scrollWidth - el.clientWidth + 20) + 'px');
                            inn.classList.add('running');
                        }
                    }, 300);
                }

                function showInfo(i) {
                    if (!RS.tracks || !RS.tracks.length) return;
                    const t    = RS.tracks[i];
                    const prev = RS.tracks[(i - 1 + RS.tracks.length) % RS.tracks.length];
                    const next = RS.tracks[(i + 1) % RS.tracks.length];
                    setMarquee(trackEl, t.title || t.fileName || '—');
                    if (artistEl) artistEl.textContent = t.artist || 'ZARBA RADIO';
                    if (prevEl)   prevEl.textContent   = (prev.artist ? prev.artist + ' — ' : '') + (prev.title || prev.fileName || '—');
                    if (nextEl)   nextEl.textContent   = (next.artist ? next.artist + ' — ' : '') + (next.title || next.fileName || '—');
                }

                // ── RAF для прогресс-бара ──
                function startUI() {
                    if (RS.rafId) cancelAnimationFrame(RS.rafId);
                    let last = 0;
                    function tick(ts) {
                        RS.rafId = requestAnimationFrame(tick);
                        if (ts - last < 250) return; last = ts;
                        if (!RS.cur || !RS.cur.duration) return;
                        if (fillEl)  fillEl.style.width  = (RS.cur.currentTime / RS.cur.duration * 100).toFixed(2) + '%';
                        if (timeEl)  timeEl.textContent  = fmt2(RS.cur.currentTime);
                        if (totalEl) totalEl.textContent = fmt2(RS.cur.duration);
                    }
                    RS.rafId = requestAnimationFrame(tick);
                }

                // ── Воспроизведение трека с позиции ──
                function playTrack(idx, seekTo) {
                    // Останавливаем предыдущий
                    if (RS.cur) {
                        RS.cur.onended = null;
                        RS.cur.onerror = null;
                        try { RS.cur.pause(); RS.cur.src = ''; } catch(e) {}
                        RS.cur = null;
                    }

                    idx = ((idx % RS.tracks.length) + RS.tracks.length) % RS.tracks.length;
                    RS.curIdx = idx;
                    showInfo(idx);

                    const a = new Audio(RS.tracks[idx].url);
                    a.preload    = 'auto';
                    a.volume     = RS.muted ? 0 : 0.92;
                    a.playsInline = true;
                    RS.cur       = a;

                    // Прыгаем на нужную позицию (синхронизация с эфиром)
                    if (seekTo && seekTo > 0) {
                        a.addEventListener('loadedmetadata', function onMeta() {
                            a.removeEventListener('loadedmetadata', onMeta);
                            if (a === RS.cur && seekTo < a.duration) {
                                a.currentTime = seekTo;
                            }
                        }, { once: true });
                    }

                    a.onended = function() { if (RS.cur !== a) return; playTrack(RS.curIdx + 1, 0); };
                    a.onerror = function() { if (RS.cur !== a) return; playTrack(RS.curIdx + 1, 0); };
                    a.play().catch(() => { if (RS.cur === a) playTrack(RS.curIdx + 1, 0); });
                }

                // ── Синхронизация с сервером ──
                // Спрашиваем Worker: какой трек сейчас, на какой секунде?
                async function syncWithServer() {
                    try {
                        const resp = await fetch(WORKER + '?radio=now', { cache: 'no-store' });
                        if (!resp.ok) return null;
                        return await resp.json();
                    } catch(e) {
                        return null;
                    }
                }

                // ── Кнопка Play/Mute ──
                function rebindToggle() {
                    window.toggleRadio = function() {
                        const btn  = container.querySelector('#radio-play');
                        const wave = container.querySelector('#audio-wave');

                        if (!RS.started) {
                            // Первое нажатие — синхронизируемся с сервером и стартуем
                            RS.started = true;
                            RS.muted   = false;
                            if (btn)  btn.classList.add('playing');
                            if (wave) wave.classList.add('active');

                            syncWithServer().then(sync => {
                                if (sync && sync.trackIdx !== undefined && RS.tracks) {
                                    // Сервер знает какой трек — прыгаем туда
                                    // Компенсируем задержку сети (~1-2 сек)
                                    const lag = (Date.now() / 1000) - (sync.serverTime || (Date.now() / 1000));
                                    const seekTo = (sync.currentTime || 0) + Math.abs(lag);
                                    playTrack(sync.trackIdx, seekTo);
                                } else if (RS.tracks && RS.tracks.length) {
                                    // Fallback: вычисляем позицию локально по epochStart
                                    const localSync = calcLocalSync();
                                    playTrack(localSync.idx, localSync.seekTo);
                                }
                                startUI();
                            });
                            return;
                        }

                        // Повторные нажатия — просто mute/unmute
                        RS.muted = !RS.muted;
                        if (RS.cur) RS.cur.volume = RS.muted ? 0 : 0.92;
                        if (btn)  btn.classList.toggle('playing', !RS.muted);
                        if (wave) wave.classList.toggle('active',  !RS.muted);
                    };
                }

                // ── Локальный расчёт позиции (без сети, по epochStart) ──
                function calcLocalSync() {
                    if (!RS.tracks || !RS.epochStart) return { idx: 0, seekTo: 0 };
                    const nowSec     = Date.now() / 1000;
                    const elapsed    = nowSec - RS.epochStart;
                    const totalDur   = RS.tracks.reduce((s, t) => s + (t.duration || 210), 0);
                    const posInCycle = elapsed % totalDur;
                    let acc = 0;
                    for (let i = 0; i < RS.tracks.length; i++) {
                        const dur = RS.tracks[i].duration || 210;
                        if (posInCycle < acc + dur) {
                            return { idx: i, seekTo: posInCycle - acc };
                        }
                        acc += dur;
                    }
                    return { idx: 0, seekTo: 0 };
                }

                // ── Остановка RAF при уходе со страницы ──
                _cleanupTasks.push(function() {
                    if (RS.rafId) { cancelAnimationFrame(RS.rafId); RS.rafId = null; }
                    // Аудио НЕ останавливаем — это фоновое радио!
                });

                // ── Пауза RAF когда вкладка скрыта ──
                document.addEventListener('visibilitychange', function onVis() {
                    if (document.hidden) {
                        if (RS.rafId) { cancelAnimationFrame(RS.rafId); RS.rafId = null; }
                    } else if (RS.started && !RS.muted) {
                        startUI();
                    }
                });

                // ══════════════════════════════════════════
                //  ЕСЛИ РАДИО УЖЕ ИГРАЕТ — переподключаем UI
                //  (пользователь вернулся на home)
                // ══════════════════════════════════════════
                if (RS.started && RS.tracks) {
                    showInfo(RS.curIdx >= 0 ? RS.curIdx : 0);
                    if (!RS.muted) startUI();
                    const btn  = container.querySelector('#radio-play');
                    const wave = container.querySelector('#audio-wave');
                    if (btn)  btn.classList.toggle('playing', !RS.muted);
                    if (wave) wave.classList.toggle('active',  !RS.muted);
                    rebindToggle();
                    return; // Плейлист уже загружен — выходим
                }

                // ══════════════════════════════════════════
                //  ПЕРВЫЙ ЗАПУСК — загружаем плейлист
                // ══════════════════════════════════════════

                // Показываем что загружаем
                if (trackEl) trackEl.textContent = 'Подключение к эфиру...';

                // 1. Спрашиваем Worker — какой трек сейчас в эфире
                const sync = await syncWithServer();

                // 2. Если Worker вернул плейлист — используем его
                if (sync && sync.url && sync.trackIdx !== undefined) {
                    // Worker отдал нам текущий трек и позицию
                    // Но нам нужен весь плейлист — грузим его из R2
                    RS.epochStart = sync.epochStart || 1700000000;
                }

                // 3. Загружаем полный плейлист из R2 (как раньше)
                let folderSettings = {};
                try {
                    const fsnap = await getDocs(query(collection(window.firebaseDb, 'radio_settings')));
                    fsnap.forEach(ds => { if (ds.id === 'folders') folderSettings = ds.data(); });
                } catch(e) {}
                try {
                    const ssnap = await getDocs(query(collection(window.firebaseDb, 'radio_settings')));
                    ssnap.forEach(ds => {
                        if (ds.id === 'schedule') {
                            const rules = ds.data().rules || [];
                            const now   = new Date();
                            const hhmm  = now.getHours() * 60 + now.getMinutes();
                            const dow   = now.getDay();
                            rules.forEach(r => {
                                const [fh, fm] = r.from.split(':').map(Number);
                                const [th, tm] = r.to.split(':').map(Number);
                                const start  = fh * 60 + fm, end = th * 60 + tm;
                                const inTime = start <= end ? (hhmm >= start && hhmm < end) : (hhmm >= start || hhmm < end);
                                const inDays = r.days === 'daily' ? true : r.days === 'weekdays' ? (dow >= 1 && dow <= 5) : (dow === 0 || dow === 6);
                                if (inTime && inDays) folderSettings[r.folder] = true;
                            });
                        }
                    });
                } catch(e) {}

                const FOLDERS        = ['radio/', 'dj/', 'battle/', 'news/', 'reklama/'].filter(f => f === 'radio/' || folderSettings[f]);
                const HIDDEN_FOLDERS = ['battle/', 'dj/', 'reklama/', 'news/'];
                const activeFolders  = FOLDERS.filter(f =>  HIDDEN_FOLDERS.includes(f));
                const normalFolders  = FOLDERS.filter(f => !HIDDEN_FOLDERS.includes(f));

                async function loadFolder(folder) {
                    const result = [];
                    try {
                        const r = await fetch(WORKER + '?folder=' + folder);
                        if (!r.ok) return result;
                        const files = await r.json();
                        if (!Array.isArray(files)) return result;
                        for (const f of files) {
                            if (!f.name || !f.name.match(/\.(mp3|wav|ogg|m4a|aac)$/i)) continue;
                            let name   = f.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ').replace(/^\d+[\.|\s|_]+/, '').trim();
                            let artist = '', title = name;
                            if (name.includes(' - ')) { const p = name.split(' - '); artist = p[0].trim(); title = p.slice(1).join(' - ').trim(); }
                            const path = f.path || (folder + f.name);
                            const PUBLIC_R2 = "https://pub-87fe4609510a4c3fb9a0512f837c3174.r2.dev";
                            const url  = PUBLIC_R2 + '/' + path.split('/').map(s => encodeURIComponent(s)).join('/');
                            result.push({ url, title, artist, folder, fileName: f.name, duration: 210 });
                        }
                    } catch(e) {}
                    return result;
                }

                // Детерминированная сортировка (одинакова для всех клиентов!)
                function deterministicSort(arr) {
                    return arr.slice().sort((a, b) => (a.fileName || '').localeCompare(b.fileName || ''));
                }

                let tracks = [];
                for (const folder of activeFolders) { tracks.push(...deterministicSort(await loadFolder(folder))); }
                let normalTracks = [];
                for (const folder of normalFolders) { normalTracks.push(...(await loadFolder(folder))); }
                tracks.push(...deterministicSort(normalTracks));

                // Firebase треки (isRadio = true)
                try {
                    const snap = await getDocs(query(collection(window.firebaseDb, 'tracks'), where('isRadio', '==', true)));
                    const fbTracks = [];
                    snap.forEach(ds => {
                        const d = ds.data(); if (!d.url) return;
                        let artist = d.artist || '', title = d.title || '';
                        if ((!artist || !title) && d.fileName) {
                            let name = d.fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ').replace(/^\d+[\.|\s|_]+/, '').trim();
                            if (name.includes(' - ')) { const p = name.split(' - '); artist = artist || p[0].trim(); title = title || p.slice(1).join(' - ').trim(); }
                            else { title = title || name; }
                        }
                        fbTracks.push({
                            url:      d.url,
                            title:    title || d.fileName || '—',
                            artist:   artist || '',
                            folder:   'firebase',
                            fileName: d.fileName || '',
                            duration: d.duration || 210,
                        });
                    });
                    // Firebase треки тоже сортируем детерминированно
                    tracks.push(...deterministicSort(fbTracks));
                } catch(e) { console.warn('Firebase radio load error:', e); }

                // Обновляем duration из Firestore если есть
                try {
                    const durSnap = await getDocs(query(collection(window.firebaseDb, 'tracks'), where('isRadio', '==', true)));
                    const durMap = {};
                    durSnap.forEach(ds => { const d = ds.data(); if (d.url && d.duration) durMap[d.url] = d.duration; });
                    tracks.forEach(t => { if (durMap[t.url]) t.duration = durMap[t.url]; });
                } catch(e) {}

                if (!tracks.length) {
                    if (trackEl)  trackEl.textContent  = 'Нет треков в эфире';
                    if (artistEl) artistEl.textContent = 'Загрузите треки в папку radio/';
                    return;
                }

                RS.tracks = tracks;

                // ── Устанавливаем epochStart ──
                // Берём из ответа сервера или используем фиксированную точку
                if (!RS.epochStart) {
                    RS.epochStart = (sync && sync.epochStart) ? sync.epochStart : 1700000000;
                }

                // ── Показываем инфо о текущем треке (до нажатия Play) ──
                const initSync = calcLocalSync();
                showInfo(initSync.idx);
                RS.curIdx = initSync.idx;

                // ── Привязываем кнопку ──
                rebindToggle();

            })();

            // НОВИНКИ
            const snapNew = await getDocs(query(tracksRef, orderBy('createdAt', 'desc'), limit(15)));
            const latestContainer = container.querySelector('#latest-releases');
            if (latestContainer) {
                latestContainer.innerHTML = '';
                snapNew.forEach(docSnap => {
                    if (!docSnap.data().isRadioExclusive)
                        latestContainer.appendChild(makeCard(docSnap.data(), docSnap.id, false, doc, updateDoc, increment));
                });
                if (!latestContainer.children.length)
                    latestContainer.innerHTML = '<div style="padding:20px;color:#666;">Нет новинок</div>';
            }

            // ТОП 10
            const snapTop = await getDocs(query(tracksRef, where('isTop10', '==', true), orderBy('views', 'desc'), limit(10)));
            const topContainer = container.querySelector('#top-trends');
            let topHTML = '', rank = 1;
            snapTop.forEach(docSnap => {
                const d = docSnap.data();
                topHTML +=
                    '<div class="trend-track-row" data-src="' + d.url + '" data-id="' + docSnap.id + '">' +
                        '<div class="rank">' + rank++ + '</div>' +
                        '<div class="trend-cover" id="tc-' + docSnap.id + '" style="background:linear-gradient(135deg,#ff4500,#c73200);">' +
                            '<img src="assets/black.svg" alt="" style="width:26px;height:26px;opacity:.9;filter:brightness(0) invert(1);">' +
                        '</div>' +
                        '<div class="trend-track-meta">' +
                            '<span class="t-name">' + d.title + '</span>' +
                            '<span class="a-name">' + d.artist + '</span>' +
                        '</div>' +
                        '<div class="trend-player-controls">' +
                            '<button class="trend-play-btn">▶</button>' +
                            '<button class="trend-stop-btn">⏹</button>' +
                            '<span class="trend-time">0:00</span>' +
                            '<div class="trend-progress-bar"><div class="trend-progress-fill"></div></div>' +
                            '<span class="trend-duration">0:00</span>' +
                        '</div>' +
                        '<div class="trend-indicators"><span class="trend-up">▲</span></div>' +
                        '<div class="trend-actions"><span class="trend-plays">▶ ' + formatViews(d.views) + '</span></div>' +
                    '</div>';
            });
            if (topContainer) topContainer.innerHTML = topHTML || '<div style="padding:20px;color:#666;text-align:center;">Нет треков с флагом ТОП 10</div>';

            snapTop.forEach(docSnap => {
                const d = docSnap.data();
                const el = topContainer && topContainer.querySelector('#tc-' + docSnap.id);
                if (!el) return;
                (() => {
                    const fallback = getFallbackCover(d.url || docSnap.id);
                    el.style.background = 'transparent';
                    el.innerHTML = '<img src="' + fallback + '" alt="cover" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">';
                    if (d.coverUrl) { el.querySelector('img').src = d.coverUrl; }
                    else if (d.url) {
                        fetchCoverFromWorker(d.url).then(cover => {
                            if (!cover) return;
                            const imgEl = el.querySelector('img');
                            if (imgEl) imgEl.src = cover;
                        });
                    }
                })();
            });

            // РИНГТОНЫ
            const snapRings = await getDocs(query(tracksRef, where('isRingtone', '==', true), limit(10)));
            const ringContainer = container.querySelector('#ringtones-list');
            let ringsHTML = '';
            snapRings.forEach(docSnap => {
                const d = docSnap.data();
                ringsHTML +=
                    '<div class="custom-player" data-src="' + d.url + '" data-id="' + docSnap.id + '">' +
                        '<div class="player-controls">' +
                            '<button class="player-btn play-pause-btn">▶</button>' +
                            '<button class="player-btn stop-btn">⏹</button>' +
                        '</div>' +
                        '<div class="player-info">' +
                            '<div class="player-title">' + d.artist + ' - ' + d.title + '</div>' +
                            '<div class="ringtone-plays">▶ ' + formatViews(d.views) + ' прослушиваний</div>' +
                            '<div class="player-progress-container">' +
                                '<span class="player-time current-time">0:00</span>' +
                                '<div class="player-progress-bar"><div class="player-progress-fill"></div></div>' +
                                '<span class="player-duration">0:00</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
            });
            if (ringContainer) ringContainer.innerHTML = ringsHTML || '<div style="padding:20px;color:#666;text-align:center;">Нет рингтонов в базе</div>';

            // НОВИЧКИ
            const snapNewc = await getDocs(query(tracksRef, where('isNewcomer', '==', true), limit(10)));
            const newcContainer = container.querySelector('#newcomers-list');
            if (newcContainer) {
                newcContainer.innerHTML = '';
                snapNewc.forEach(docSnap => {
                    newcContainer.appendChild(makeCard(docSnap.data(), docSnap.id, true, doc, updateDoc, increment));
                });
                if (!newcContainer.children.length)
                    newcContainer.innerHTML = '<div style="padding:20px;color:#666;">Список новичков пуст</div>';
            }

            initListPlayers(doc, updateDoc, increment);

        } catch(e) {
            console.error("Ошибка загрузки данных Home:", e);
        }
    }

    function initListPlayers(docFunc, updateDocFunc, incrementFunc) {
        let curAudio = null, curRow = null;

        async function countView(audio, trackId) {
            if (!audio.viewCounted && audio.currentTime > 10) {
                audio.viewCounted = true;
                try { await updateDocFunc(docFunc(window.firebaseDb, 'tracks', trackId), { views: incrementFunc(1) }); } catch(e) {}
            }
        }

        const trendAudios = [];
        container.querySelectorAll('.trend-track-row').forEach(row => {
            const trackId = row.getAttribute('data-id');
            const audio   = new Audio(row.getAttribute('data-src'));
            audio.viewCounted = false;
            trendAudios.push(audio);
            const playBtn = row.querySelector('.trend-play-btn');
            const stopBtn = row.querySelector('.trend-stop-btn');
            const fill    = row.querySelector('.trend-progress-fill');
            const timeEl  = row.querySelector('.trend-time');
            const durEl   = row.querySelector('.trend-duration');
            const progBar = row.querySelector('.trend-progress-bar');
            let playing   = false;

            audio.addEventListener('loadedmetadata', () => { if (durEl) durEl.textContent = fmt(audio.duration); });
            audio.addEventListener('timeupdate', () => {
                if (fill)   fill.style.width  = (audio.currentTime / audio.duration * 100) + '%';
                if (timeEl) timeEl.textContent = fmt(audio.currentTime);
                countView(audio, trackId);
            });
            audio.addEventListener('ended', () => {
                playing = false; playBtn.textContent = '▶';
                if (fill) fill.style.width = '0%'; audio.viewCounted = false; curAudio = null; curRow = null;
            });
            audio.addEventListener('error', () => { playBtn.textContent = '❌'; });
            if (progBar) progBar.addEventListener('click', e => {
                audio.currentTime = ((e.clientX - progBar.getBoundingClientRect().left) / progBar.offsetWidth) * audio.duration;
            });
            playBtn.addEventListener('click', e => {
                e.stopPropagation(); stopPageCurrent();
                if (playing) { audio.pause(); playing = false; playBtn.textContent = '▶'; curAudio = null; curRow = null; }
                else {
                    if (curAudio && curAudio !== audio) {
                        curAudio.pause(); curAudio.currentTime = 0; curAudio.viewCounted = false;
                        if (curRow) { curRow.querySelector('.trend-play-btn').textContent = '▶'; const pf = curRow.querySelector('.trend-progress-fill'); if (pf) pf.style.width = '0%'; }
                    }
                    audio.play().catch(() => { playBtn.textContent = '❌'; });
                    playing = true; playBtn.textContent = '⏸'; curAudio = audio; curRow = row;
                }
            });
            stopBtn.addEventListener('click', e => {
                e.stopPropagation(); audio.pause(); audio.currentTime = 0; playing = false;
                playBtn.textContent = '▶'; if (fill) fill.style.width = '0%'; if (timeEl) timeEl.textContent = '0:00';
                audio.viewCounted = false; curAudio = null; curRow = null;
            });
        });

        const ringAudios = [];
        container.querySelectorAll('.custom-player').forEach(playerEl => {
            const trackId       = playerEl.getAttribute('data-id');
            const audio         = new Audio(playerEl.getAttribute('data-src'));
            audio.viewCounted   = false;
            ringAudios.push(audio);
            const playPauseBtn  = playerEl.querySelector('.play-pause-btn');
            const stopBtn       = playerEl.querySelector('.stop-btn');
            const progressBar   = playerEl.querySelector('.player-progress-bar');
            const progressFill  = playerEl.querySelector('.player-progress-fill');
            const currentTimeEl = playerEl.querySelector('.current-time');
            const durationEl    = playerEl.querySelector('.player-duration');
            let isPlaying = false;

            playPauseBtn.addEventListener('click', () => {
                stopPageCurrent();
                if (isPlaying) { audio.pause(); playPauseBtn.textContent = '▶'; isPlaying = false; }
                else { audio.play().catch(() => {}); playPauseBtn.textContent = '⏸'; isPlaying = true; }
            });
            stopBtn.addEventListener('click', () => {
                audio.pause(); audio.currentTime = 0; playPauseBtn.textContent = '▶'; isPlaying = false;
                audio.viewCounted = false;
                if (progressFill)  progressFill.style.width   = '0%';
                if (currentTimeEl) currentTimeEl.textContent  = '0:00';
            });
            audio.addEventListener('timeupdate', () => {
                if (progressFill)  progressFill.style.width  = (audio.currentTime / audio.duration * 100) + '%';
                if (currentTimeEl) currentTimeEl.textContent = fmt(audio.currentTime);
                countView(audio, trackId);
            });
            audio.addEventListener('loadedmetadata', () => { if (durationEl) durationEl.textContent = fmt(audio.duration); });
            audio.addEventListener('error', () => { playPauseBtn.textContent = '❌'; });
            if (progressBar) progressBar.addEventListener('click', e => {
                const r = progressBar.getBoundingClientRect();
                audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
            });
            audio.addEventListener('ended', () => { playPauseBtn.textContent = '▶'; isPlaying = false; audio.viewCounted = false; });
        });

        // [FIX 4] Останавливаем все аудио плееры при уходе со страницы
        _cleanupTasks.push(function() {
            [...trendAudios, ...ringAudios].forEach(a => {
                try { a.pause(); a.src = ''; } catch(e) {}
            });
        });
    }

    waitForFirebase(fetchHomeData);
};