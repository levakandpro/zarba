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
        /* ═══════════════════════════════════════
           НОВИНКИ — VINYL CARD
        ═══════════════════════════════════════ */
        .release-card {
            position: relative; flex-shrink: 0;
            width: 190px;
            display: flex; flex-direction: column; align-items: center;
            cursor: pointer; background: transparent;
            border: none; box-shadow: none; border-radius: 0; overflow: visible;
            padding-bottom: 4px;
        }

        /* ── Диск ── */
        .release-card-cover {
            width: 170px; height: 170px;
            position: relative; flex-shrink: 0;
            background: transparent; overflow: visible;
        }
        /* убираем старые стили cover */
        .release-card-cover img { display: none !important; }
        .release-card-cover .no-cover { display: none !important; }
        .release-card-cover-grad { display: none !important; }

        /* Сам диск */
        .rc-vinyl-outer {
            width: 170px; height: 170px; border-radius: 50%;
            background:
                repeating-radial-gradient(circle at 50% 50%,
                    rgba(255,255,255,.025) 0px, rgba(255,255,255,.025) 1px,
                    transparent 1px, transparent 5px),
                radial-gradient(circle, #2e2e2e 0%, #141414 55%, #090909 100%);
            box-shadow:
                0 10px 40px rgba(0,0,0,.85),
                inset 0 1px 0 rgba(255,255,255,.06),
                0 0 0 1px rgba(255,255,255,.05);
            display: flex; align-items: center; justify-content: center;
            position: relative; overflow: hidden;
            transition: box-shadow .4s ease;
        }
        .release-card:hover .rc-vinyl-outer {
            box-shadow: 0 14px 50px rgba(0,0,0,.9),
                0 0 0 1px rgba(255,69,0,.4), 0 0 40px rgba(255,69,0,.12);
        }
        .release-card.playing .rc-vinyl-outer {
            box-shadow: 0 0 0 2px rgba(255,69,0,.75),
                0 0 60px rgba(255,69,0,.28), 0 14px 50px rgba(0,0,0,.9);
            animation: rcspin 3.5s linear infinite;
        }
        @keyframes rcspin { to { transform: rotate(360deg); } }

        /* Блики */
        .rc-vinyl-shine {
            position: absolute; inset: 0; border-radius: 50%; pointer-events: none;
            background: conic-gradient(
                transparent 0deg, rgba(255,255,255,.05) 25deg,
                transparent 55deg, rgba(255,255,255,.02) 110deg,
                transparent 170deg, rgba(255,255,255,.04) 220deg,
                transparent 270deg, rgba(255,255,255,.02) 320deg, transparent 360deg);
        }

        /* Обложка-лейбл в центре */
        .rc-vinyl-label {
            width: 70px; height: 70px; border-radius: 50%;
            overflow: hidden; position: relative; z-index: 2; flex-shrink: 0;
            border: 2.5px solid rgba(255,255,255,.1);
            box-shadow: 0 0 0 4px rgba(0,0,0,.9), 0 0 0 5px rgba(255,255,255,.04);
        }
        .rc-vinyl-label img {
            width: 100%; height: 100%; object-fit: cover; display: block !important;
            pointer-events: none; -webkit-user-drag: none;
        }
        .rc-vinyl-hole {
            position: absolute; width: 10px; height: 10px; border-radius: 50%;
            background: radial-gradient(circle, #000 60%, #222 100%);
            box-shadow: 0 0 0 1px rgba(255,255,255,.08); z-index: 3;
        }

        /* Play overlay */
        .rc-play-overlay {
            display: none !important;
        }
        .rc-pause-overlay {
            display: none !important;
        }

        /* Единая кнопка play/pause поверх диска — всегда кликабельна */
        .rc-play-btn {
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0.82);
            width: 52px; height: 52px; border-radius: 50%;
            background: rgba(255,69,0,.88);
            border: none; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            padding: 0;
            box-shadow: 0 4px 20px rgba(255,69,0,.55), 0 0 0 3px rgba(0,0,0,.5);
            transition: transform .25s cubic-bezier(.23,1,.32,1),
                        background .2s ease, opacity .25s ease;
            opacity: 0; z-index: 15;
            pointer-events: all;
        }
        .rc-play-btn svg { display: block; flex-shrink: 0; pointer-events: none; }
        /* Десктоп — показывать при hover */
        .release-card:hover .rc-play-btn {
            opacity: 1; transform: translate(-50%, -50%) scale(1);
        }
        .release-card:hover .rc-play-btn:hover {
            background: #ff6b00;
            transform: translate(-50%, -50%) scale(1.1) !important;
        }
        .release-card:hover .rc-play-btn:active {
            transform: translate(-50%, -50%) scale(0.9) !important;
        }
        /* Когда играет — показываем паузу */
        .release-card.playing .rc-play-btn {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
            background: rgba(0,0,0,.75);
            border: 2px solid rgba(255,69,0,.7);
        }
        /* Мобиль — всегда видна */
        @media (max-width: 768px) {
            .release-card .rc-play-btn {
                opacity: 1 !important;
                transform: translate(-50%, -50%) scale(0.85) !important;
                width: 44px !important; height: 44px !important;
            }
            .release-card.playing .rc-play-btn {
                transform: translate(-50%, -50%) scale(0.9) !important;
            }
            .release-card { width: 155px !important; }
            .release-card-cover { width: 138px !important; height: 138px !important; }
            .rc-vinyl-outer { width: 138px !important; height: 138px !important; }
            .rc-vinyl-label { width: 58px !important; height: 58px !important; }
        }
        @media (max-width: 480px) {
            .release-card { width: 140px !important; }
            .release-card-cover { width: 124px !important; height: 124px !important; }
            .rc-vinyl-outer { width: 124px !important; height: 124px !important; }
            .rc-vinyl-label { width: 52px !important; height: 52px !important; }
            .release-card .rc-play-btn { width: 40px !important; height: 40px !important; }
        }
        .rc-needle-wrap {
            position: absolute; top: 4px; right: -12px;
            width: 26px; height: 72px;
            transform-origin: 13px 6px;
            transform: rotate(-22deg);
            transition: transform .6s cubic-bezier(.23,1,.32,1);
            z-index: 20;
        }
        .release-card.playing .rc-needle-wrap { transform: rotate(-7deg); }
        .rc-needle-pivot {
            position: absolute; left: 4px; top: -2px;
            width: 16px; height: 16px; border-radius: 50%;
            background: radial-gradient(circle, #bbb 30%, #555 100%);
            box-shadow: 0 2px 6px rgba(0,0,0,.6);
        }
        .rc-needle-arm {
            position: absolute; left: 11px; top: 6px;
            width: 3px; height: 58px;
            background: linear-gradient(180deg, #ccc 0%, #666 60%, #444 100%);
            border-radius: 2px; box-shadow: 1px 0 4px rgba(0,0,0,.5);
        }
        .rc-needle-head {
            position: absolute; left: 6px; bottom: 0;
            width: 12px; height: 10px;
            background: linear-gradient(135deg, #999, #444);
            border-radius: 2px 2px 4px 4px;
            box-shadow: 0 2px 6px rgba(0,0,0,.6);
        }

        /* Оранжевый ореол снизу когда играет */
        .release-card.playing .release-card-cover::after {
            content: '';
            position: absolute; bottom: -10px; left: 50%;
            transform: translateX(-50%);
            width: 120px; height: 18px;
            background: radial-gradient(ellipse, rgba(255,69,0,.4) 0%, transparent 70%);
            border-radius: 50%; filter: blur(8px); pointer-events: none; z-index: 0;
        }

        /* ── Инфо под диском ── */
        .release-card-info {
            width: 100% !important; text-align: center;
            margin-top: 14px; padding: 0 6px 0 !important;
            background: transparent !important;
            border-top: none !important;
        }
        .release-card-title {
            font-size: 13px !important; font-weight: 800 !important;
            color: #fff !important;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            margin-bottom: 3px; transition: color .2s;
        }
        .release-card:hover .release-card-title,
        .release-card.playing .release-card-title { color: #ff8c00 !important; }
        .release-card-artist {
            font-size: 11px !important; color: #bbb !important;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            margin-bottom: 10px;
        }
        .release-card-progress {
            height: 3px; background: rgba(255,255,255,.1);
            border-radius: 3px; margin-bottom: 6px;
            cursor: pointer; overflow: hidden;
        }
        .release-card-progress-fill {
            height: 100%; width: 0%;
            background: linear-gradient(90deg, #ff4500, #ff8c00);
            border-radius: 3px; box-shadow: 0 0 6px rgba(255,69,0,.5);
            transition: width .1s linear;
        }
        .release-card-bottom { display: flex; justify-content: space-between; align-items: center; }
        .release-card-time {
            font-size: 10px !important; color: #ff8c00 !important;
            font-family: monospace !important; font-weight: 800 !important;
            letter-spacing: .5px;
        }
        .release-card-views {
            font-size: 10px !important; color: #aaa !important;
            font-family: monospace !important; font-weight: 700 !important;
        }

        /* Мобиль */
        @media (max-width: 768px) {
            .release-card { width: 155px !important; }
            .release-card-cover { width: 138px !important; height: 138px !important; }
            .rc-vinyl-outer { width: 138px !important; height: 138px !important; }
            .rc-vinyl-label { width: 58px !important; height: 58px !important; }
            .rc-play-btn { width: 44px !important; height: 44px !important; font-size: 16px !important; }
            /* На тач — play overlay всегда чуть видна */
            .release-card .rc-play-overlay { opacity: 0.6 !important; }
            .release-card.playing .rc-play-overlay { opacity: 0 !important; }
        }
        @media (max-width: 480px) {
            .release-card { width: 140px !important; }
            .release-card-cover { width: 124px !important; height: 124px !important; }
            .rc-vinyl-outer { width: 124px !important; height: 124px !important; }
            .rc-vinyl-label { width: 52px !important; height: 52px !important; }
        }
        /* ═══════════════════════════════════════
           РИНГТОНЫ — PHONE CARD STYLE
        ═══════════════════════════════════════ */
        .rt-card {
            position: relative;
            background: linear-gradient(145deg, #111 0%, #0a0a0a 100%);
            border: 1px solid rgba(255,255,255,.07);
            border-radius: 20px;
            overflow: hidden;
            cursor: pointer;
            transition: transform .3s cubic-bezier(.23,1,.32,1), box-shadow .3s, border-color .3s;
        }
        .rt-card:hover {
            transform: translateY(-3px);
            border-color: rgba(255,69,0,.35);
            box-shadow: 0 10px 36px rgba(0,0,0,.7), 0 0 28px rgba(255,69,0,.09);
        }
        .rt-card.playing {
            border-color: rgba(255,69,0,.6);
            box-shadow: 0 0 0 1px rgba(255,69,0,.35), 0 0 36px rgba(255,69,0,.14);
        }
        .rt-pulse-ring {
            position: absolute; inset: -1px; border-radius: 20px;
            border: 1px solid rgba(255,69,0,.4);
            opacity: 0; pointer-events: none; z-index: 0;
        }
        @keyframes rt-pulse {
            0%   { transform: scale(1);   opacity: .5; }
            100% { transform: scale(1.04); opacity: 0; }
        }
        .rt-card.playing .rt-pulse-ring { animation: rt-pulse 1.8s ease-out infinite; }

        /* Верх — экран телефона */
        .rt-phone-screen {
            position: relative;
            background: linear-gradient(160deg, #0d1a0d 0%, #1a0d00 50%, #0d0d1a 100%);
            padding: 14px 16px 12px;
            border-bottom: 1px solid rgba(255,255,255,.04);
            overflow: hidden;
        }
        .rt-phone-screen::before {
            content: '';
            position: absolute; inset: 0;
            background-image:
                linear-gradient(rgba(255,69,0,.035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,69,0,.035) 1px, transparent 1px);
            background-size: 22px 22px; pointer-events: none;
        }
        .rt-phone-screen::after {
            content: '';
            position: absolute; top: -28px; right: -28px;
            width: 110px; height: 110px;
            background: radial-gradient(circle, rgba(255,69,0,.1) 0%, transparent 70%);
            pointer-events: none;
        }

        /* Статус бар */
        .rt-statusbar {
            display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 12px; position: relative; z-index: 1;
        }
        .rt-signal { display: flex; align-items: flex-end; gap: 2px; }
        .rt-signal-bar { width: 3px; border-radius: 1px; background: rgba(255,69,0,.5); }
        .rt-signal-bar:nth-child(1) { height: 4px; }
        .rt-signal-bar:nth-child(2) { height: 7px; }
        .rt-signal-bar:nth-child(3) { height: 10px; background: rgba(255,69,0,.8); }
        .rt-signal-bar:nth-child(4) { height: 13px; background: #ff4500; }
        .rt-clock { font-size: 10px; font-weight: 700; color: rgba(255,255,255,.45); font-family: monospace; letter-spacing: 1px; }
        .rt-battery-icon {
            width: 18px; height: 9px; border: 1px solid rgba(255,255,255,.25);
            border-radius: 2px; padding: 1.5px; position: relative;
        }
        .rt-battery-icon::after {
            content: ''; position: absolute; right: -4px; top: 50%;
            transform: translateY(-50%); width: 2px; height: 4px;
            background: rgba(255,255,255,.25); border-radius: 0 1px 1px 0;
        }
        .rt-battery-fill {
            height: 100%; width: 70%; border-radius: 1px;
            background: linear-gradient(90deg, #ff4500, #ff8c00);
        }

        /* Основная инфо строка */
        .rt-screen-info {
            display: flex; align-items: center; gap: 12px;
            position: relative; z-index: 1;
        }
        .rt-call-icon {
            width: 44px; height: 44px; border-radius: 13px; flex-shrink: 0;
            background: linear-gradient(135deg, rgba(255,69,0,.18), rgba(255,69,0,.07));
            border: 1px solid rgba(255,69,0,.28);
            display: flex; align-items: center; justify-content: center;
            transition: all .3s;
        }
        .rt-card.playing .rt-call-icon {
            background: linear-gradient(135deg, rgba(255,69,0,.35), rgba(255,69,0,.12));
            border-color: rgba(255,69,0,.55);
            box-shadow: 0 0 16px rgba(255,69,0,.22);
        }
        .rt-track-text { flex: 1; min-width: 0; }
        .rt-track-name {
            font-size: 13px; font-weight: 800; color: #fff;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            margin-bottom: 3px; transition: color .2s;
        }
        .rt-card.playing .rt-track-name,
        .rt-card:hover .rt-track-name { color: #ff8c00; }
        .rt-track-artist {
            font-size: 11px; color: rgba(255,255,255,.45);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        /* Волна */
        .rt-wave { display: flex; align-items: center; gap: 2px; height: 18px; flex-shrink: 0; }
        .rt-wave-b {
            width: 3px; border-radius: 2px;
            background: linear-gradient(to top, #ff4500, #ff8c00);
            opacity: 0; transition: opacity .3s;
        }
        .rt-card.playing .rt-wave-b { opacity: 1; }
        .rt-wave-b:nth-child(1) { height: 8px;  animation: wv .55s ease-in-out infinite 0s; }
        .rt-wave-b:nth-child(2) { height: 14px; animation: wv .55s ease-in-out infinite .1s; }
        .rt-wave-b:nth-child(3) { height: 10px; animation: wv .55s ease-in-out infinite .2s; }
        .rt-wave-b:nth-child(4) { height: 16px; animation: wv .55s ease-in-out infinite .08s; }
        .rt-wave-b:nth-child(5) { height: 7px;  animation: wv .55s ease-in-out infinite .15s; }

        /* Нижняя часть — плеер */
        .rt-player { padding: 11px 16px 13px; background: #0d0d0d; }
        .rt-progress-wrap {
            display: flex; align-items: center; gap: 8px; margin-bottom: 10px;
        }
        .rt-time-lbl { font-size: 9px; color: #ff8c00; font-family: monospace; font-weight: 700; flex-shrink: 0; }
        .rt-dur-lbl  { font-size: 9px; color: rgba(255,255,255,.28); font-family: monospace; flex-shrink: 0; }
        .rt-progress {
            flex: 1; height: 3px; background: rgba(255,255,255,.08);
            border-radius: 3px; cursor: pointer; position: relative;
        }
        .rt-progress-fill {
            height: 100%; width: 0%; border-radius: 3px;
            background: linear-gradient(90deg, #ff4500, #ff8c00);
            box-shadow: 0 0 6px rgba(255,69,0,.5);
            transition: width .1s linear;
        }
        .rt-progress-thumb {
            position: absolute; top: 50%; transform: translateY(-50%) scale(0);
            width: 10px; height: 10px; border-radius: 50%;
            background: #ff4500; box-shadow: 0 0 8px rgba(255,69,0,.6);
            transition: transform .2s, left .1s linear;
            pointer-events: none;
        }
        .rt-card.playing .rt-progress-thumb,
        .rt-progress:hover .rt-progress-thumb { transform: translateY(-50%) scale(1); }
        .rt-controls {
            display: flex; align-items: center; justify-content: space-between;
        }
        .rt-views { font-size: 10px; color: rgba(255,255,255,.32); font-weight: 600; letter-spacing: .4px; }
        .rt-btns { display: flex; align-items: center; gap: 8px; }
        .rt-btn-dl {
            width: 32px; height: 32px; border-radius: 50%;
            background: rgba(255,255,255,.05);
            border: 1px solid rgba(255,255,255,.1);
            color: rgba(255,255,255,.45); cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: all .2s; padding: 0;
        }
        .rt-btn-dl:hover { background: rgba(255,69,0,.15); border-color: rgba(255,69,0,.4); color: #ff4500; }
        .rt-btn-dl:active { transform: scale(.9); }
        .rt-btn-play {
            width: 42px; height: 42px; border-radius: 50%;
            background: linear-gradient(135deg, #ff4500, #ff8c00);
            border: none; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            padding: 0; flex-shrink: 0;
            box-shadow: 0 4px 16px rgba(255,69,0,.4);
            transition: transform .25s cubic-bezier(.23,1,.32,1), box-shadow .2s;
        }
        .rt-btn-play:hover { transform: scale(1.1); box-shadow: 0 6px 22px rgba(255,69,0,.55); }
        .rt-btn-play:active { transform: scale(.9); }
        .rt-btn-play svg { display: block; pointer-events: none; }

        /* Сетка */
        .ringtones-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 14px;
        }

        /* ── МОБИЛЬ — рингтоны как компактные строки ── */
        @media (max-width: 600px) {
            .ringtones-grid {
                grid-template-columns: 1fr !important;
                gap: 6px !important;
            }

            /* Карточка — горизонтальная строка */
            .rt-card {
                border-radius: 12px !important;
                display: flex !important;
                flex-direction: column !important;
            }

            /* "Экран телефона" — компактная шапка */
            .rt-phone-screen {
                padding: 8px 12px !important;
            }
            /* Прячем статус-бар (антенна, часы, батарея) на мобиле */
            .rt-statusbar { display: none !important; }

            /* Иконка телефона + название + волна в одну строку */
            .rt-screen-info {
                gap: 10px !important;
                align-items: center !important;
            }
            .rt-call-icon {
                width: 40px !important; height: 40px !important;
                border-radius: 10px !important;
                flex-shrink: 0 !important;
            }
            .rt-track-text { flex: 1 !important; min-width: 0 !important; }
            .rt-track-name {
                font-size: 13px !important;
                font-weight: 800 !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
            }
            .rt-track-artist {
                font-size: 11px !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
            }
            /* Волна — справа от названия */
            .rt-wave { flex-shrink: 0 !important; }

            /* Плеер — компактный */
            .rt-player {
                padding: 6px 12px 10px !important;
            }
            .rt-progress-wrap {
                margin-bottom: 8px !important;
                gap: 6px !important;
            }
            .rt-controls {
                align-items: center !important;
            }
            .rt-views {
                font-size: 9px !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                max-width: 130px !important;
            }
            .rt-btn-dl { width: 30px !important; height: 30px !important; }
            .rt-btn-play { width: 38px !important; height: 38px !important; }
        }
            position: relative; flex-shrink: 0; width: 180px; border-radius: 14px; overflow: hidden;
            background: #1a1a1a; cursor: pointer; transition: transform .3s, box-shadow .3s;
            border: 1px solid rgba(255,255,255,0.12);
            box-shadow: 0 4px 24px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        /* ═══════════════════════════════════════
           НОВИЧКИ — ULTRA REDESIGN 2025
        ═══════════════════════════════════════ */

        /* Обёртка всего списка — ограниченная высота + скролл */
        #newcomers-list {
            position: relative;
        }
        .nc-scroll-container {
            max-height: 680px;
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: thin;
            scrollbar-color: rgba(255,69,0,.4) transparent;
            padding-right: 2px;
        }
        .nc-scroll-container::-webkit-scrollbar { width: 3px; }
        .nc-scroll-container::-webkit-scrollbar-track { background: transparent; }
        .nc-scroll-container::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #ff4500, #ff8c00);
            border-radius: 2px;
        }

        /* Fade-out внизу когда есть ещё треки */
        .nc-scroll-fade {
            position: absolute; bottom: 0; left: 0; right: 0;
            height: 80px; pointer-events: none;
            background: linear-gradient(to top, #0c0c0c 0%, transparent 100%);
            z-index: 5;
        }

        /* Ряд-трек */
        .newcomer-card-new {
            position: relative; flex-shrink: 0;
            width: 100%;
            height: 72px;
            border-radius: 14px; overflow: hidden;
            display: flex; align-items: center;
            cursor: pointer;
            background: linear-gradient(110deg, #0f0f0f 0%, #0a0a0a 100%);
            border: 1px solid rgba(255,255,255,.05);
            transition: border-color .3s, box-shadow .3s, transform .25s cubic-bezier(.23,1,.32,1), background .3s;
            margin-bottom: 5px;
        }
        .newcomer-card-new:last-child { margin-bottom: 0; }

        /* Анимация появления при загрузке */
        .newcomer-card-new {
            animation: ncSlideIn .45s cubic-bezier(.23,1,.32,1) both;
        }
        @keyframes ncSlideIn {
            from { opacity: 0; transform: translateX(-18px); }
            to   { opacity: 1; transform: translateX(0); }
        }
        /* stagger задержка через nth-child */
        .newcomer-card-new:nth-child(1)  { animation-delay: .02s; }
        .newcomer-card-new:nth-child(2)  { animation-delay: .06s; }
        .newcomer-card-new:nth-child(3)  { animation-delay: .10s; }
        .newcomer-card-new:nth-child(4)  { animation-delay: .14s; }
        .newcomer-card-new:nth-child(5)  { animation-delay: .18s; }
        .newcomer-card-new:nth-child(6)  { animation-delay: .22s; }
        .newcomer-card-new:nth-child(7)  { animation-delay: .26s; }
        .newcomer-card-new:nth-child(8)  { animation-delay: .30s; }
        .newcomer-card-new:nth-child(9)  { animation-delay: .34s; }
        .newcomer-card-new:nth-child(10) { animation-delay: .38s; }

        .newcomer-card-new:hover {
            border-color: rgba(255,69,0,.3);
            box-shadow: 0 6px 28px rgba(0,0,0,.55), 0 0 24px rgba(255,69,0,.07);
            transform: translateX(5px);
            background: linear-gradient(110deg, #150a00 0%, #0d0d0d 60%);
        }
        .newcomer-card-new.playing {
            border-color: rgba(255,69,0,.6);
            box-shadow: -3px 0 0 0 #ff4500, 0 0 36px rgba(255,69,0,.16), 0 6px 28px rgba(0,0,0,.6);
            background: linear-gradient(110deg, #200900 0%, #0d0d0d 55%);
            transform: translateX(5px);
        }

        /* Левая неоновая черта */
        .newcomer-card-new::before {
            content: '';
            position: absolute; left: 0; top: 10px; bottom: 10px;
            width: 3px; border-radius: 0 2px 2px 0;
            background: linear-gradient(180deg, #ff4500, #ff8c00);
            opacity: 0;
            transition: opacity .3s, box-shadow .3s;
        }
        .newcomer-card-new:hover::before,
        .newcomer-card-new.playing::before {
            opacity: 1;
            box-shadow: 0 0 10px rgba(255,69,0,.8);
        }

        /* Сканлайн-глитч фон при воспроизведении */
        .newcomer-card-new.playing::after {
            content: '';
            position: absolute; inset: 0; pointer-events: none;
            background-image: repeating-linear-gradient(
                0deg,
                transparent, transparent 3px,
                rgba(255,69,0,.018) 3px, rgba(255,69,0,.018) 4px
            );
            border-radius: 14px;
        }

        /* Номер трека */
        .nc-num {
            flex-shrink: 0;
            width: 36px;
            text-align: center;
            font-family: 'Bebas Neue', monospace;
            font-size: 20px;
            font-weight: 900;
            color: rgba(255,255,255,.12);
            letter-spacing: 1px;
            transition: color .3s;
            line-height: 1;
            user-select: none;
        }
        .newcomer-card-new:hover .nc-num { color: rgba(255,69,0,.35); }
        .newcomer-card-new.playing .nc-num { color: #ff4500; text-shadow: 0 0 12px rgba(255,69,0,.6); }

        /* Обложка */
        .nc-cover-wrap {
            flex-shrink: 0;
            width: 50px; height: 50px;
            border-radius: 10px; overflow: hidden;
            margin: 0 12px 0 4px;
            background: #0a0a0a;
            position: relative;
            box-shadow: 0 2px 12px rgba(0,0,0,.6);
            transition: box-shadow .3s, transform .3s;
        }
        .newcomer-card-new:hover .nc-cover-wrap {
            box-shadow: 0 4px 20px rgba(0,0,0,.7), 0 0 12px rgba(255,69,0,.15);
            transform: scale(1.06);
        }
        .newcomer-card-new.playing .nc-cover-wrap {
            box-shadow: 0 0 0 2px rgba(255,69,0,.55), 0 4px 20px rgba(255,69,0,.2);
        }
        .nc-cover-img {
            width: 100%; height: 100%; object-fit: cover; display: block;
            pointer-events: none; -webkit-user-drag: none;
            transition: transform .4s ease;
        }
        .newcomer-card-new:hover .nc-cover-img,
        .newcomer-card-new.playing .nc-cover-img { transform: scale(1.12); }
        .nc-cover-grad { display: none; }

        /* FRESH бейдж */
        .newcomer-badge {
            position: absolute; bottom: 3px; right: 3px; z-index: 5;
            background: linear-gradient(135deg, #ff4500, #ff8c00);
            color: #fff; font-size: 5px; font-weight: 900;
            padding: 2px 4px; border-radius: 3px; letter-spacing: 1px;
            box-shadow: 0 1px 6px rgba(255,69,0,.5);
        }

        /* Play btn — поверх обложки */
        .nc-play-btn {
            position: absolute; inset: 0; margin: auto;
            width: 30px; height: 30px; border-radius: 50%;
            background: rgba(255,69,0,.95);
            border: none; display: flex; align-items: center; justify-content: center;
            padding: 0; cursor: pointer; z-index: 4;
            box-shadow: 0 2px 12px rgba(255,69,0,.6);
            opacity: 0; transform: scale(.5);
            transition: opacity .2s, transform .25s cubic-bezier(.23,1,.32,1);
        }
        .nc-play-btn svg { display: block; pointer-events: none; }
        .newcomer-card-new:hover .nc-play-btn { opacity: 1; transform: scale(1); }
        .newcomer-card-new.playing .nc-play-btn { opacity: 0 !important; }
        .nc-play-btn:active { transform: scale(.82) !important; }
        @media (max-width: 768px) {
            .nc-play-btn { opacity: 1 !important; transform: scale(.82) !important; }
            .newcomer-card-new.playing .nc-play-btn { opacity: 0 !important; }
        }

        /* Волна — когда играет, вместо play */
        .nc-wave {
            position: absolute; inset: 0; margin: auto;
            width: 32px; height: 22px;
            display: flex; align-items: center; justify-content: center; gap: 3px;
            opacity: 0; transition: opacity .25s; z-index: 5;
            pointer-events: none;
        }
        .newcomer-card-new.playing .nc-wave { opacity: 1; }
        .nc-wave-bar {
            width: 3px; border-radius: 2px;
            background: linear-gradient(to top, #ff4500, #ffcc00);
        }
        .nc-wave-bar:nth-child(1) { height: 8px;  animation: rcwv .55s ease-in-out infinite 0s; }
        .nc-wave-bar:nth-child(2) { height: 16px; animation: rcwv .55s ease-in-out infinite .1s; }
        .nc-wave-bar:nth-child(3) { height: 10px; animation: rcwv .55s ease-in-out infinite .18s; }
        .nc-wave-bar:nth-child(4) { height: 14px; animation: rcwv .55s ease-in-out infinite .08s; }

        /* Инфо */
        .nc-info {
            flex: 1; min-width: 0;
            display: flex; flex-direction: column; justify-content: center;
            padding-right: 14px;
            background: transparent !important; border: none !important;
        }
        .nc-title {
            font-size: 13px; font-weight: 800; color: #fff;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            margin-bottom: 2px; transition: color .2s;
            letter-spacing: .3px;
        }
        .newcomer-card-new:hover .nc-title,
        .newcomer-card-new.playing .nc-title { color: #ff8c00; }
        .nc-artist {
            font-size: 11px; color: rgba(255,255,255,.38);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            margin-bottom: 7px;
            transition: color .2s;
        }
        .newcomer-card-new:hover .nc-artist { color: rgba(255,180,80,.65); }
        .newcomer-card-new.playing .nc-artist { color: rgba(255,140,0,.75); }

        /* Прогресс-бар — тонкий, с неоном */
        .nc-progress {
            height: 2px; background: rgba(255,255,255,.06);
            border-radius: 2px; cursor: pointer; overflow: hidden;
            margin-bottom: 5px; position: relative;
        }
        .nc-progress-fill {
            height: 100%; width: 0%;
            background: linear-gradient(90deg, #ff4500, #ff8c00, #ffcc00);
            border-radius: 2px;
            box-shadow: 0 0 8px rgba(255,69,0,.7), 0 0 16px rgba(255,69,0,.3);
            transition: width .1s linear;
            position: relative;
        }
        /* Glowing dot на конце прогресса */
        .nc-progress-fill::after {
            content: '';
            position: absolute; right: -3px; top: -2.5px;
            width: 7px; height: 7px; border-radius: 50%;
            background: #ff8c00;
            box-shadow: 0 0 8px #ff4500, 0 0 16px rgba(255,69,0,.6);
            opacity: 0; transition: opacity .2s;
        }
        .newcomer-card-new.playing .nc-progress-fill::after { opacity: 1; }

        .nc-bottom {
            display: flex; justify-content: space-between; align-items: center;
        }
        .nc-time  {
            font-size: 9px; color: #ff8c00; font-family: 'Courier New', monospace;
            font-weight: 800; letter-spacing: .5px;
        }
        .nc-views {
            font-size: 9px; color: rgba(255,255,255,.22);
            font-family: monospace; letter-spacing: .3px;
        }
        .newcomer-card-new.playing .nc-views { color: rgba(255,140,0,.5); }

        /* Мобиль */
        @media (max-width: 600px) {
            /* На мобиле — убираем номер, делаем обложку крупнее */
            .newcomer-card-new {
                height: 68px !important;
                padding: 0 !important;
            }
            .nc-num { display: none !important; }
            .nc-cover-wrap {
                width: 52px !important;
                height: 52px !important;
                margin: 0 12px 0 12px !important;
                border-radius: 10px !important;
            }
            .nc-info {
                flex: 1 !important;
                min-width: 0 !important;
                padding-right: 12px !important;
            }
            .nc-title {
                font-size: 13px !important;
                font-weight: 800 !important;
            }
            .nc-artist {
                font-size: 11px !important;
                margin-bottom: 5px !important;
            }
            .nc-progress { margin-bottom: 3px !important; }
            .nc-bottom {
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
            }
            .nc-time { font-size: 9px !important; }
            .nc-views { font-size: 9px !important; }
            .nc-scroll-container { max-height: none !important; overflow: visible !important; }
            .nc-scroll-fade { display: none !important; }
        }
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
            <div class="ringtones-grid" id="ringtones-list">
                <div style="padding: 20px; color: #666; text-align: center; grid-column: 1/-1;">Загрузка рингтонов...</div>
            </div>
        </section>

        <section class="content-block">
            <h3 class="section-title">
                <img src="assets/tops/new.png" alt="Новички" class="section-icon"> НОВИЧКИ
            </h3>
            <div id="newcomers-list" style="position:relative;">
                <div class="nc-scroll-container" id="newcomers-scroll">
                    ${[1,2,3,4,5].map((n) => `
                    <div class="newcomer-card-new" style="opacity:.3;pointer-events:none;">
                        <div class="nc-num" style="color:rgba(255,255,255,.06);">${n < 10 ? '0' + n : n}</div>
                        <div class="nc-cover-wrap" style="background:#111;"></div>
                        <div class="nc-info">
                            <div class="nc-title" style="background:#1e1e1e;border-radius:4px;color:transparent;width:55%;">Загрузка...</div>
                            <div class="nc-artist" style="background:#161616;border-radius:3px;width:40%;color:transparent;margin-top:5px;height:11px;">...</div>
                            <div class="nc-progress" style="margin-top:8px;"></div>
                        </div>
                    </div>`).join('')}
                </div>
                <div class="nc-scroll-fade" id="nc-fade"></div>
            </div>
        </section>
    `;

    // ══════════════════════════════════════════
    //  TOP ARTISTS STACK + VOTING
    // ══════════════════════════════════════════
    const ART_IMG = 'assets/top-artist/';
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
            if (artVoted === null) {
                row.addEventListener('click', function() { castArtVote(i); });
                // Touch ripple
                row.addEventListener('touchstart', function(e) {
                    row.style.transform = 'scale(0.97)';
                }, { passive: true });
                row.addEventListener('touchend', function() {
                    setTimeout(function(){ row.style.transform = ''; }, 150);
                }, { passive: true });
            }
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
        var isMobile = window.innerWidth <= 768;
        var bottomPos = isMobile ? '90px' : '34px';
        msg.style.cssText = 'position:fixed;bottom:' + bottomPos + ';left:50%;transform:translateX(-50%) translateY(10px);background:rgba(17,17,17,0.97);border:1px solid rgba(255,69,0,.6);color:#fff;padding:12px 24px;border-radius:30px;font-weight:700;letter-spacing:1px;font-size:13px;z-index:99999;box-shadow:0 4px 30px rgba(255,69,0,.35),0 2px 0 rgba(255,255,255,.05) inset;white-space:nowrap;opacity:0;transition:all .35s cubic-bezier(0.23,1,0.32,1);pointer-events:none;backdrop-filter:blur(12px);max-width:90vw;text-align:center;';
        msg.textContent = text;
        document.body.appendChild(msg);
        requestAnimationFrame(function() { msg.style.opacity='1'; msg.style.transform='translateX(-50%) translateY(0)'; });
        setTimeout(function() {
            msg.style.opacity='0'; msg.style.transform='translateX(-50%) translateY(10px)';
            setTimeout(function(){ msg.remove(); }, 350);
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
        // Mouse drag (desktop)
        el.addEventListener('mousedown', e => { isDown = true; el.classList.add('dragging'); startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; });
        el.addEventListener('mouseleave', () => { isDown = false; el.classList.remove('dragging'); });
        el.addEventListener('mouseup', () => { isDown = false; el.classList.remove('dragging'); });
        el.addEventListener('mousemove', e => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX); });
        el.addEventListener('wheel', e => { e.preventDefault(); el.scrollBy({ left: e.deltaY * 2, behavior: 'smooth' }); }, { passive: false });
        // Touch momentum (mobile)
        let touchStartX = 0, touchScrollLeft = 0, touchVel = 0, touchLastX = 0, touchLastT = 0, momentumRaf = null;
        el.addEventListener('touchstart', e => {
            if (momentumRaf) { cancelAnimationFrame(momentumRaf); momentumRaf = null; }
            touchStartX = e.touches[0].clientX;
            touchScrollLeft = el.scrollLeft;
            touchLastX = touchStartX;
            touchLastT = Date.now();
            touchVel = 0;
        }, { passive: true });
        el.addEventListener('touchmove', e => {
            const now = Date.now();
            const dx = touchLastX - e.touches[0].clientX;
            touchVel = dx / Math.max(1, now - touchLastT);
            touchLastX = e.touches[0].clientX;
            touchLastT = now;
            el.scrollLeft = touchScrollLeft + (touchStartX - e.touches[0].clientX);
        }, { passive: true });
        el.addEventListener('touchend', () => {
            // momentum glide
            let vel = touchVel * 16;
            function glide() {
                if (Math.abs(vel) < 0.5) return;
                el.scrollLeft += vel;
                vel *= 0.88;
                momentumRaf = requestAnimationFrame(glide);
            }
            glide();
        }, { passive: true });
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

    function applyTrackCover(imgEl, trackUrl, coverUrlFromDb, dataObj) {
        // Пробуем все возможные названия поля обложки из Firestore
        const dbCover = coverUrlFromDb
            || (dataObj && (dataObj.coverUrl || dataObj.cover || dataObj.imageUrl
                || dataObj.thumbnail || dataObj.image || dataObj.artworkUrl
                || dataObj.artwork || dataObj.coverImage || dataObj.imgUrl || dataObj.photo));
        if (dbCover) {
            imgEl.src = dbCover;
            imgEl.onerror = () => { imgEl.onerror = null; imgEl.src = getFallbackCover(trackUrl || dbCover || ''); };
            return;
        }
        // Показываем fallback пока тянем мета из аудио
        imgEl.src = getFallbackCover(trackUrl || '');
        if (trackUrl) {
            fetchCoverFromWorker(trackUrl).then(cover => {
                if (cover && imgEl.isConnected) imgEl.src = cover;
            });
        }
    }

    // ── Безопасный play/pause — защита от AbortError ──
    function safePlay(audio) {
        if (!audio._playPromise) {
            audio._playPromise = audio.play().catch(err => {
                if (err.name !== 'AbortError') console.warn('Audio error:', err.message);
            }).finally(() => { audio._playPromise = null; });
        }
        return audio._playPromise;
    }
    function safePause(audio) {
        if (audio._playPromise) {
            audio._playPromise.then(() => { try { audio.pause(); } catch(e){} }).catch(() => {});
        } else {
            try { audio.pause(); } catch(e) {}
        }
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
        if (pageCurrentAudio) { safePause(pageCurrentAudio); pageCurrentAudio.currentTime = 0; pageCurrentAudio = null; }
        if (pageCurrentCard) {
            pageCurrentCard.classList.remove('playing');
            const fill = pageCurrentCard.querySelector('.release-card-progress-fill');
            if (fill) fill.style.width = '0%';
            const time = pageCurrentCard.querySelector('.release-card-time');
            if (time) time.textContent = '0:00';
            pageCurrentCard = null;
        }
    }

    _cleanupTasks.push(stopPageCurrent);

    function makeCard(data, id, isNewcomer, docFn, updateDocFn, incrementFn) {
        if (isNewcomer) return makeNewcomerCard(data, id, docFn, updateDocFn, incrementFn);

        // ── НОВИНКИ — vinyl card ──
        const div = document.createElement('div');
        div.className = 'release-card';
        const _coverId = 'cov_' + Math.random().toString(36).slice(2);
        div.innerHTML =
            '<div class="release-card-cover">' +
                '<div class="rc-vinyl-outer">' +
                    '<div class="rc-vinyl-shine"></div>' +
                    '<div class="rc-vinyl-label" id="' + _coverId + '"><img src="assets/black.svg" alt="" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:50%;"></div>' +
                    '<div class="rc-vinyl-hole"></div>' +
                    '<button class="rc-play-btn" id="rcbtn_' + _coverId + '"><svg viewBox="0 0 24 24" fill="white" width="20" height="20"><polygon points="6,3 20,12 6,21"/></svg></button>' +
                '</div>' +
                '<div class="rc-needle-wrap">' +
                    '<div class="rc-needle-pivot"></div>' +
                    '<div class="rc-needle-arm"></div>' +
                    '<div class="rc-needle-head"></div>' +
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
            const labelEl = div.querySelector('#' + _coverId + ' img');
            if (!labelEl) return;
            labelEl.onerror = () => { labelEl.src = getFallbackCover(data.url || ''); };
            applyTrackCover(labelEl, data.url, data.coverUrl, data);
        })();

        const playBtn     = div.querySelector('.rc-play-btn');
        const fill        = div.querySelector('.release-card-progress-fill');
        const timeEl      = div.querySelector('.release-card-time');
        const progressBar = div.querySelector('.release-card-progress');

        const SVG_PLAY  = '<svg viewBox="0 0 24 24" fill="white" width="20" height="20"><polygon points="6,3 20,12 6,21"/></svg>';
        const SVG_PAUSE = '<svg viewBox="0 0 24 24" fill="white" width="18" height="18"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>';

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
                div.classList.remove('playing'); playBtn.innerHTML = SVG_PLAY;
                fill.style.width = '0%'; timeEl.textContent = '0:00';
                pageCurrentAudio = null; pageCurrentCard = null; viewCounted = false;
            });
            audio.addEventListener('error', () => { div.style.opacity = '0.5'; });
        }

        playBtn.addEventListener('click', e => {
            e.stopPropagation(); initAudio();
            if (!audio.paused) {
                safePause(audio); div.classList.remove('playing'); playBtn.innerHTML = SVG_PLAY;
                pageCurrentAudio = null; pageCurrentCard = null;
            } else {
                if (pageCurrentAudio && pageCurrentAudio !== audio) {
                    const _prev = pageCurrentAudio; const _prevCard = pageCurrentCard;
                    safePause(_prev); _prev.currentTime = 0;
                    if (_prevCard) {
                        _prevCard.classList.remove('playing');
                        const pf = _prevCard.querySelector('.release-card-progress-fill, .nc-progress-fill'); if (pf) pf.style.width = '0%';
                        const pt = _prevCard.querySelector('.release-card-time, .nc-time'); if (pt) pt.textContent = '0:00';
                        const pb = _prevCard.querySelector('.rc-play-btn, .nc-play-btn'); if (pb) pb.innerHTML = SVG_PLAY;
                    }
                }
                div.classList.add('playing'); playBtn.innerHTML = SVG_PAUSE;
                pageCurrentAudio = audio; pageCurrentCard = div;
                safePlay(audio);
            }
        });
        progressBar.addEventListener('click', e => {
            e.stopPropagation(); initAudio();
            if (audio.duration)
                audio.currentTime = ((e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth) * audio.duration;
        });
        return div;
    }

    // ── НОВИЧКИ — Ultra redesign card ──
    function makeNewcomerCard(data, id, docFn, updateDocFn, incrementFn, trackNum) {
        const div = document.createElement('div');
        div.className = 'newcomer-card-new';
        const _coverId = 'nc_' + Math.random().toString(36).slice(2);
        const numStr = trackNum < 10 ? '0' + trackNum : '' + trackNum;

        const SVG_PLAY  = '<svg viewBox="0 0 24 24" fill="white" width="16" height="16"><polygon points="6,3 20,12 6,21"/></svg>';
        const SVG_PAUSE = '<svg viewBox="0 0 24 24" fill="white" width="14" height="14"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>';

        div.innerHTML =
            '<div class="nc-num">' + numStr + '</div>' +
            '<div class="nc-cover-wrap">' +
                '<img class="nc-cover-img" id="' + _coverId + '" src="assets/black.svg" alt="">' +
                '<div class="nc-cover-grad"></div>' +
                
                '<button class="nc-play-btn">' + SVG_PLAY + '</button>' +
                '<div class="nc-wave">' +
                    '<div class="nc-wave-bar"></div><div class="nc-wave-bar"></div>' +
                    '<div class="nc-wave-bar"></div><div class="nc-wave-bar"></div>' +
                '</div>' +
            '</div>' +
            '<div class="nc-info">' +
                '<div class="nc-title">' + (data.title || '—') + '</div>' +
                '<div class="nc-artist">' + (data.artist || '—') + '</div>' +
                '<div class="nc-progress"><div class="nc-progress-fill"></div></div>' +
                '<div class="nc-bottom">' +
                    '<span class="nc-time">0:00</span>' +
                    '<span class="nc-views">▶ ' + formatViews(data.views) + '</span>' +
                '</div>' +
            '</div>';

        // Загружаем обложку
        const imgEl = div.querySelector('#' + _coverId);
        imgEl.onerror = () => { imgEl.src = getFallbackCover(data.url || ''); };
        applyTrackCover(imgEl, data.url, data.coverUrl, data);

        const playBtn    = div.querySelector('.nc-play-btn');
        const fill       = div.querySelector('.nc-progress-fill');
        const timeEl     = div.querySelector('.nc-time');
        const progressEl = div.querySelector('.nc-progress');
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
                div.classList.remove('playing'); playBtn.innerHTML = SVG_PLAY;
                fill.style.width = '0%'; timeEl.textContent = '0:00';
                pageCurrentAudio = null; pageCurrentCard = null; viewCounted = false;
            });
            audio.addEventListener('error', () => { div.style.opacity = '0.5'; });
        }

        playBtn.addEventListener('click', e => {
            e.stopPropagation(); initAudio();
            if (!audio.paused) {
                safePause(audio); div.classList.remove('playing'); playBtn.innerHTML = SVG_PLAY;
                pageCurrentAudio = null; pageCurrentCard = null;
            } else {
                if (pageCurrentAudio && pageCurrentAudio !== audio) {
                    const _prev = pageCurrentAudio; const _prevCard = pageCurrentCard;
                    safePause(_prev); _prev.currentTime = 0;
                    if (_prevCard) {
                        _prevCard.classList.remove('playing');
                        const pf = _prevCard.querySelector('.release-card-progress-fill, .nc-progress-fill'); if (pf) pf.style.width = '0%';
                        const pt = _prevCard.querySelector('.release-card-time, .nc-time'); if (pt) pt.textContent = '0:00';
                        const pb = _prevCard.querySelector('.rc-play-btn, .nc-play-btn'); if (pb) pb.innerHTML = SVG_PLAY;
                    }
                }
                div.classList.add('playing'); playBtn.innerHTML = SVG_PAUSE;
                pageCurrentAudio = audio; pageCurrentCard = div;
                safePlay(audio);
            }
        });
        progressEl.addEventListener('click', e => {
            e.stopPropagation(); initAudio();
            if (audio.duration)
                audio.currentTime = ((e.clientX - progressEl.getBoundingClientRect().left) / progressEl.offsetWidth) * audio.duration;
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
                        '<div class="trend-cover" id="tc-' + docSnap.id + '">' +
                            '<img src="assets/black.svg" alt="">' +
                        '</div>' +
                        '<div class="trend-track-meta">' +
                            '<span class="t-name">' + (d.title || '—') + '</span>' +
                            '<span class="a-name">' + (d.artist || '—') + '</span>' +
                            '<div class="trend-progress-bar"><div class="trend-progress-fill"></div></div>' +
                        '</div>' +
                        '<div class="trend-player-controls">' +
                            '<span class="trend-time">0:00</span>' +
                            '<button class="trend-play-btn">▶</button>' +
                            '<button class="trend-stop-btn">⏹</button>' +
                            '<span class="trend-duration">0:00</span>' +
                        '</div>' +
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
            const snapRings = await getDocs(query(tracksRef, where('isRingtone', '==', true), limit(20)));
            const ringContainer = container.querySelector('#ringtones-list');
            if (ringContainer) {
                ringContainer.innerHTML = '';
                let ringAudios = [];

                const SVG_PLAY  = '<svg viewBox="0 0 24 24" fill="white" width="18" height="18"><polygon points="7,4 20,12 7,20"/></svg>';
                const SVG_PAUSE = '<svg viewBox="0 0 24 24" fill="white" width="16" height="16"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>';
                const SVG_PHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="#ff4500" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 .01h3a2 2 0 012 1.72c.13 1 .37 1.97.72 2.9a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.17-1.17a2 2 0 012.11-.45c.93.35 1.9.59 2.9.72A2 2 0 0122 14.92z"/></svg>';
                const SVG_DL    = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="14" height="14"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';

                let curRingAudio = null, curRingCard = null, curRingBtn = null;

                function stopRingCurrent() {
                    if (curRingAudio) { curRingAudio.pause(); curRingAudio.currentTime = 0; }
                    if (curRingCard) {
                        curRingCard.classList.remove('playing');
                        const pf = curRingCard.querySelector('.rt-progress-fill'); if (pf) pf.style.width = '0%';
                        const th = curRingCard.querySelector('.rt-progress-thumb'); if (th) th.style.left = '0%';
                        const t  = curRingCard.querySelector('.rt-time-lbl'); if (t) t.textContent = '0:00';
                    }
                    if (curRingBtn) curRingBtn.innerHTML = SVG_PLAY;
                    curRingAudio = null; curRingCard = null; curRingBtn = null;
                }

                const now = new Date();
                const clockStr = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');

                snapRings.forEach(docSnap => {
                    const d = docSnap.data();
                    if (!d.url) return;

                    const card = document.createElement('div');
                    card.className = 'rt-card';
                    card.innerHTML =
                        '<div class="rt-pulse-ring"></div>' +
                        '<div class="rt-phone-screen">' +
                            '<div class="rt-statusbar">' +
                                '<div class="rt-signal"><div class="rt-signal-bar"></div><div class="rt-signal-bar"></div><div class="rt-signal-bar"></div><div class="rt-signal-bar"></div></div>' +
                                '<span class="rt-clock">' + clockStr + '</span>' +
                                '<div class="rt-battery-icon"><div class="rt-battery-fill"></div></div>' +
                            '</div>' +
                            '<div class="rt-screen-info">' +
                                '<div class="rt-call-icon">' + SVG_PHONE + '</div>' +
                                '<div class="rt-track-text">' +
                                    '<div class="rt-track-name">' + (d.title || '—') + '</div>' +
                                    '<div class="rt-track-artist">' + (d.artist || '') + '</div>' +
                                '</div>' +
                                '<div class="rt-wave"><div class="rt-wave-b"></div><div class="rt-wave-b"></div><div class="rt-wave-b"></div><div class="rt-wave-b"></div><div class="rt-wave-b"></div></div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="rt-player">' +
                            '<div class="rt-progress-wrap">' +
                                '<span class="rt-time-lbl">0:00</span>' +
                                '<div class="rt-progress"><div class="rt-progress-fill"></div><div class="rt-progress-thumb"></div></div>' +
                                '<span class="rt-dur-lbl">—:——</span>' +
                            '</div>' +
                            '<div class="rt-controls">' +
                                '<span class="rt-views">▶ ' + formatViews(d.views) + ' прослушиваний</span>' +
                                '<div class="rt-btns">' +
                                    '<a class="rt-btn-dl" href="' + d.url + '" download title="Скачать">' + SVG_DL + '</a>' +
                                    '<button class="rt-btn-play">' + SVG_PLAY + '</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

                    const playBtn  = card.querySelector('.rt-btn-play');
                    const fill     = card.querySelector('.rt-progress-fill');
                    const thumb    = card.querySelector('.rt-progress-thumb');
                    const timeLbl  = card.querySelector('.rt-time-lbl');
                    const durLbl   = card.querySelector('.rt-dur-lbl');
                    const progress = card.querySelector('.rt-progress');

                    const audio = new Audio(d.url);
                    audio.viewCounted = false;
                    ringAudios.push(audio);

                    audio.addEventListener('loadedmetadata', () => { if (durLbl) durLbl.textContent = fmt(audio.duration); });
                    audio.addEventListener('timeupdate', () => {
                        if (!audio.duration) return;
                        const pct = audio.currentTime / audio.duration * 100;
                        fill.style.width = pct + '%';
                        thumb.style.left = 'calc(' + pct + '% - 5px)';
                        timeLbl.textContent = fmt(audio.currentTime);
                        if (audio.currentTime > 10 && !audio.viewCounted) {
                            audio.viewCounted = true;
                            updateDoc(doc(window.firebaseDb, 'tracks', docSnap.id), { views: increment(1) }).catch(() => {});
                        }
                    });
                    audio.addEventListener('ended', () => {
                        card.classList.remove('playing'); playBtn.innerHTML = SVG_PLAY;
                        fill.style.width = '0%'; thumb.style.left = '0%';
                        timeLbl.textContent = '0:00'; audio.viewCounted = false;
                        curRingAudio = null; curRingCard = null; curRingBtn = null;
                    });

                    playBtn.addEventListener('click', e => {
                        e.stopPropagation();
                        stopPageCurrent(); // стоп новинок/топа
                        if (!audio.paused) {
                            safePause(audio); card.classList.remove('playing'); playBtn.innerHTML = SVG_PLAY;
                            curRingAudio = null; curRingCard = null; curRingBtn = null;
                        } else {
                            stopRingCurrent();
                            card.classList.add('playing'); playBtn.innerHTML = SVG_PAUSE;
                            safePlay(audio);
                            curRingAudio = audio; curRingCard = card; curRingBtn = playBtn;
                        }
                    });
                    progress.addEventListener('click', e => {
                        if (!audio.duration) return;
                        const pct = (e.clientX - progress.getBoundingClientRect().left) / progress.offsetWidth;
                        audio.currentTime = pct * audio.duration;
                    });

                    ringContainer.appendChild(card);
                });

                if (!ringContainer.querySelector('.rt-card'))
                    ringContainer.innerHTML = '<div style="padding:24px;color:#555;text-align:center;grid-column:1/-1;">Нет рингтонов в базе</div>';

                _cleanupTasks.push(() => {
                    ringAudios.forEach(a => { try { a.pause(); a.src = ''; } catch(e) {} });
                });
            }

            // НОВИЧКИ
            const snapNewc = await getDocs(query(tracksRef, where('isNewcomer', '==', true), limit(20)));
            const newcContainer = container.querySelector('#newcomers-scroll');
            const ncFade = container.querySelector('#nc-fade');
            if (newcContainer) {
                newcContainer.innerHTML = '';
                let ncIdx = 0;
                snapNewc.forEach(docSnap => {
                    ncIdx++;
                    newcContainer.appendChild(makeNewcomerCard(docSnap.data(), docSnap.id, doc, updateDoc, increment, ncIdx));
                });
                if (!newcContainer.children.length)
                    newcContainer.innerHTML = '<div style="padding:20px;color:#666;">Список новичков пуст</div>';
                // Скрываем fade если контент не переполняет контейнер
                if (ncFade) {
                    setTimeout(() => {
                        if (newcContainer.scrollHeight <= newcContainer.clientHeight + 5) {
                            ncFade.style.display = 'none';
                        }
                        newcContainer.addEventListener('scroll', () => {
                            const atBottom = newcContainer.scrollTop + newcContainer.clientHeight >= newcContainer.scrollHeight - 10;
                            ncFade.style.opacity = atBottom ? '0' : '1';
                        });
                    }, 600);
                }
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
                if (playing) { safePause(audio); playing = false; playBtn.textContent = '▶'; curAudio = null; curRow = null; }
                else {
                    if (curAudio && curAudio !== audio) {
                        curAudio.pause(); curAudio.currentTime = 0; curAudio.viewCounted = false;
                        if (curRow) { curRow.querySelector('.trend-play-btn').textContent = '▶'; const pf = curRow.querySelector('.trend-progress-fill'); if (pf) pf.style.width = '0%'; }
                    }
                    playing = true; playBtn.textContent = '⏸'; curAudio = audio; curRow = row;
                    safePlay(audio).catch(() => { playBtn.textContent = '❌'; playing = false; });
                }
            });
            stopBtn.addEventListener('click', e => {
                e.stopPropagation(); safePause(audio); audio.currentTime = 0; playing = false;
                playBtn.textContent = '▶'; if (fill) fill.style.width = '0%'; if (timeEl) timeEl.textContent = '0:00';
                audio.viewCounted = false; curAudio = null; curRow = null;
            });
        });

        _cleanupTasks.push(function() {
            trendAudios.forEach(a => { try { a.pause(); a.src = ''; } catch(e) {} });
        });
    }

    waitForFirebase(fetchHomeData);
};