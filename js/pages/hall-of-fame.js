// ============================================================
//  ZARBA — ЗАЛ СЛАВЫ (hall-of-fame.js)
//  ПОЛНАЯ ВЕРСИЯ: Статусы, Live-Пульс, PNG Корона с частицами, 
//  Модалка с правилами, Элитный Чат.
// ============================================================

function renderHallOfFame(container) {
  // ── ЗАГРУЗОЧНЫЙ ЭКРАН ЗАЛ СЛАВЫ ──
  container.innerHTML = `
<div id="hof-loader" style="
  position:relative;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  height:80vh;background:#000;overflow:hidden;
">
<style>
  @keyframes hld-cw   { to { transform:rotate(360deg);  } }
  @keyframes hld-ccw  { to { transform:rotate(-360deg); } }
  @keyframes hld-pulse-gold {
    0%,100% { filter:drop-shadow(0 0 0px #FFD700) brightness(1);   transform:scale(1); }
    50%      { filter:drop-shadow(0 0 28px #FFD700) drop-shadow(0 0 55px rgba(255,215,0,.5)) brightness(1.3); transform:scale(1.1); }
  }
  @keyframes hld-bar  { 0%{width:0%} 20%{width:15%} 55%{width:65%} 88%{width:92%} 100%{width:100%} }
  @keyframes hld-title { from{opacity:0;letter-spacing:30px} to{opacity:1;letter-spacing:15px} }
  @keyframes hld-sub   { from{opacity:0;transform:translateY(8px)} to{opacity:.6;transform:translateY(0)} }
  @keyframes hld-star  { 0%,100%{opacity:.2;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
  .hld-vig { position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(20,0,0,.6) 0%,#000 100%);pointer-events:none; }
  .hld-glow { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:300px;height:300px;border-radius:50%;background:radial-gradient(ellipse,rgba(255,215,0,.08) 0%,transparent 70%);pointer-events:none; }
  .hld-wrap { position:relative;z-index:2;display:flex;flex-direction:column;align-items:center; }
  .hld-rings { position:relative;width:170px;height:170px;display:flex;align-items:center;justify-content:center; }
  .hld-r1,.hld-r2,.hld-r3 { position:absolute;border-radius:50%; }
  .hld-r1 { width:170px;height:170px; border:1px solid rgba(255,215,0,.1); border-top:2px solid #FFD700; animation:hld-cw 1.4s linear infinite; }
  .hld-r2 { width:132px;height:132px; border:1px solid rgba(255,215,0,.07); border-right:1px solid rgba(255,215,0,.35); animation:hld-ccw 2.1s linear infinite; }
  .hld-r3 { width:96px;height:96px;   border:1px dashed rgba(255,69,0,.15); border-bottom:2px solid rgba(255,69,0,.4); animation:hld-cw 3.4s linear infinite; }
  .hld-logo { position:relative;z-index:2;width:54px;height:54px;object-fit:contain; animation:hld-pulse-gold 2.2s ease-in-out infinite; }
  .hld-logo-fb { position:relative;z-index:2;font-family:'Bebas Neue',sans-serif;font-size:50px;color:#FFD700;line-height:1; animation:hld-pulse-gold 2.2s ease-in-out infinite;display:none; }
  .hld-stars { display:flex;gap:14px;margin-top:20px; }
  .hld-star { font-size:18px;animation:hld-star 2s ease-in-out infinite; }
  .hld-star:nth-child(1){animation-delay:0s;color:#FFD700}
  .hld-star:nth-child(2){animation-delay:.3s;color:#e5e5e5}
  .hld-star:nth-child(3){animation-delay:.6s;color:#FF4500}
  .hld-star:nth-child(4){animation-delay:.3s;color:#e5e5e5}
  .hld-star:nth-child(5){animation-delay:0s;color:#FFD700}
  .hld-tag  { font-family:sans-serif;font-size:9px;letter-spacing:6px;color:#FFD700;text-transform:uppercase;margin-top:16px;opacity:.9; }
  .hld-title { font-family:'Bebas Neue',sans-serif;font-size:52px;letter-spacing:15px;color:#fff;margin-top:4px;line-height:1; animation:hld-title 1s .3s ease both; }
  .hld-title span { color:#FFD700; }
  .hld-sub  { font-family:sans-serif;font-size:9px;letter-spacing:5px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-top:6px; animation:hld-sub .8s .6s ease both; }
  .hld-bar-wrap { width:170px;height:1px;background:rgba(255,255,255,.07);margin-top:22px;overflow:hidden; }
  .hld-bar  { height:100%;background:linear-gradient(90deg,#FFD700,#FF4500); animation:hld-bar 2s ease forwards; }
  .hld-dots { display:flex;gap:8px;margin-top:14px; }
  .hld-dot  { width:4px;height:4px;border-radius:50%;background:#FFD700; animation:hldsq 1.4s ease-in-out infinite; }
  .hld-dot:nth-child(2){animation-delay:.22s} .hld-dot:nth-child(3){animation-delay:.44s}
  @keyframes hldsq{0%,80%,100%{transform:scale(0);opacity:0}40%{transform:scale(1);opacity:1}}
</style>
<div class="hld-vig"></div>
<div class="hld-glow"></div>
<div class="hld-wrap">
  <div class="hld-rings">
    <div class="hld-r1"></div><div class="hld-r2"></div><div class="hld-r3"></div>
    <img class="hld-logo" src="assets/logo-white-big.png"
      onerror="this.style.display='none';document.getElementById('hld-fb').style.display='block'">
    <div id="hld-fb" class="hld-logo-fb">Z</div>
  </div>
  <div class="hld-stars">
    <div class="hld-star">★</div><div class="hld-star">★</div><div class="hld-star">★</div><div class="hld-star">★</div><div class="hld-star">★</div>
  </div>
  <div class="hld-tag">ZARBA · HALL OF FAME</div>
  <div class="hld-title">ЗАЛ <span>СЛАВЫ</span></div>
  <div class="hld-sub">Закрытый клуб легенд ZARBA</div>
  <div class="hld-bar-wrap"><div class="hld-bar"></div></div>
  <div class="hld-dots"><div class="hld-dot"></div><div class="hld-dot"></div><div class="hld-dot"></div></div>
</div>
</div>`;

  setTimeout(() => {
    container.innerHTML = '';

    // Вставляем стили (инлайново для надежности верстки)
    if (!document.getElementById('hof-styles')) {
        const style = document.createElement('style');
        style.id = 'hof-styles';
        style.innerHTML = `
            .hof-wrapper { background: #000; color: #fff; font-family: 'Inter', sans-serif; padding-bottom: 100px; min-height: 100vh; position: relative; overflow-x: hidden; }
            .hof-header { text-align: center; padding: 80px 20px 40px; background: radial-gradient(circle at top, #1a1a1a 0%, #000 70%); }
            .hof-title { font-size: clamp(40px, 8vw, 100px); font-weight: 900; letter-spacing: 15px; text-transform: uppercase; margin: 0; line-height: 1; color: #fff; }
            
            /* Сетка карточек */
            .hof-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 40px; padding: 20px 40px 60px; max-width: 1400px; margin: 0 auto; align-items: end; }
            
            /* Карточка артиста */
            .hof-card { position: relative; height: 550px; background: #080808; border-radius: 20px; overflow: hidden; border: 1px solid #222; transition: 0.5s ease; display: flex; flex-direction: column; justify-content: flex-end; }
            
            /* Уникальные свечения для статусов */
            .theme-gold { border-color: rgba(255, 215, 0, 0.4); box-shadow: 0 0 30px rgba(255, 215, 0, 0.1); }
            .theme-gold:hover { transform: translateY(-10px); box-shadow: 0 0 50px rgba(255, 215, 0, 0.3); border-color: #ffd700; }
            
            .theme-platinum { border-color: rgba(229, 229, 229, 0.4); box-shadow: 0 0 30px rgba(229, 229, 229, 0.1); }
            .theme-platinum:hover { transform: translateY(-10px); box-shadow: 0 0 50px rgba(229, 229, 229, 0.3); border-color: #e5e5e5; }
            
            .theme-red { border-color: rgba(255, 69, 0, 0.4); box-shadow: 0 0 30px rgba(255, 69, 0, 0.1); }
            .theme-red:hover { transform: translateY(-10px); box-shadow: 0 0 50px rgba(255, 69, 0, 0.4); border-color: #FF4500; }

            /* 3D Видео на фоне */
            .status-video { position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); width: 120%; height: auto; z-index: 1; mix-blend-mode: screen; opacity: 0.8; pointer-events: none; }
            
            /* Силуэт артиста */
            .artist-photo { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); height: 85%; z-index: 2; transition: 0.5s; pointer-events: none; }
            .theme-gold:hover .artist-photo { filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.5)); height: 88%; }
            .theme-platinum:hover .artist-photo { filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5)); height: 88%; }
            .theme-red:hover .artist-photo { filter: drop-shadow(0 0 20px rgba(255, 69, 0, 0.8)); height: 88%; }
            
            /* Название статуса */
            .status-badge { position: absolute; top: 20px; left: 0; right: 0; text-align: center; font-size: 1.2rem; font-weight: 900; letter-spacing: 5px; z-index: 4; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.8); }
            .badge-gold { color: #ffd700; }
            .badge-plat { color: #e5e5e5; }
            .badge-red { color: #FF4500; }

            /* Инфо-панель */
            .artist-info { position: relative; z-index: 3; padding: 20px; background: linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0.7) 80%, transparent); width: 100%; box-sizing: border-box; }
            
            /* Live-Пульс (Эквалайзер) */
            .track-record-wrapper { display: flex; align-items: center; margin-bottom: 8px; }
            .track-record { font-size: 10px; color: #FF4500; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; }
            .live-eq { display: flex; align-items: flex-end; gap: 2px; height: 10px; margin-left: 10px; }
            .eq-bar { width: 3px; background: #FF4500; border-radius: 1px; animation: eq-bounce 1s infinite ease-in-out; }
            .eq-bar:nth-child(1) { animation-delay: 0s; height: 40%; }
            .eq-bar:nth-child(2) { animation-delay: 0.2s; height: 100%; }
            .eq-bar:nth-child(3) { animation-delay: 0.4s; height: 60%; }
            @keyframes eq-bounce { 0%, 100% { height: 30%; } 50% { height: 100%; } }

            .name-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px; }
            .artist-name { font-size: 2rem; font-weight: 900; margin: 0; letter-spacing: 1px; color: #fff; }
            
            /* Своя Корона (PNG) */
            .crown-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); cursor: pointer; width: 44px; height: 44px; border-radius: 50%; transition: 0.3s; display: flex; align-items: center; justify-content: center; position: relative; }
            .crown-btn img { width: 22px; height: 22px; object-fit: contain; transition: 0.3s; opacity: 0.5; filter: grayscale(100%); }
            .crown-btn:hover { transform: scale(1.1); background: #ffd70033; border-color: #ffd700; }
            .crown-btn:hover img { opacity: 0.8; filter: grayscale(50%); }
            .crown-btn.active { background: rgba(255, 215, 0, 0.2); border-color: #ffd700; box-shadow: 0 0 15px rgba(255, 215, 0, 0.5); }
            .crown-btn.active img { opacity: 1; filter: grayscale(0%); filter: drop-shadow(0 0 5px #ffd700); transform: scale(1.1) rotate(-10deg); }
            
            /* Анимация частиц для короны */
            .crown-particle { position: fixed; width: 6px; height: 6px; background: #FFD700; border-radius: 50%; pointer-events: none; z-index: 9999; animation: particle-fly 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; box-shadow: 0 0 5px #FFD700; }
            @keyframes particle-fly {
                0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; }
            }
            
            /* Статистика */
            .stat-row { display: flex; justify-content: space-between; align-items: flex-start; }
            .stat-col { display: flex; flex-direction: column; }
            .stat-val { font-size: 1.2rem; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 5px; }
            .stat-lbl { font-size: 9px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; font-weight: 700; }
            .trend-up { color: #00FF41; font-size: 0.9rem; } 
            .trend-down { color: #FF4500; font-size: 0.9rem; }
            .geo-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 11px; font-weight: 700; color: #555; text-transform: uppercase; }

            /* --- ИНФО СЕКЦИЯ С ПРАВИЛАМИ --- */
            .hof-rules-section { max-width: 900px; margin: 0 auto 80px; text-align: center; padding: 0 20px; }
            .hof-rules-btn { background: transparent; border: 1px solid #FF4500; color: #FF4500; padding: 15px 40px; border-radius: 30px; font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; cursor: pointer; transition: 0.3s ease; margin-bottom: 40px; }
            .hof-rules-btn:hover { background: #FF4500; color: #000; box-shadow: 0 0 25px rgba(255, 69, 0, 0.5); transform: translateY(-3px); }
            .hof-quote { font-size: clamp(18px, 3vw, 24px); font-weight: 900; line-height: 1.6; letter-spacing: 1px; color: #fff; text-shadow: 0 4px 20px rgba(0,0,0,0.8); }
            .hof-quote-accent { color: #FF4500; display: block; margin-top: 10px; font-size: clamp(20px, 3.5vw, 28px); }

            /* --- МОДАЛЬНОЕ ОКНО --- */
            .hof-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px); z-index: 9999; display: none; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }
            .hof-modal-overlay.open { display: flex; opacity: 1; }
            .hof-modal-box { background: #0a0a0a; border: 1px solid #333; border-radius: 20px; width: 90%; max-width: 600px; padding: 40px; position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.9); transform: translateY(20px); transition: transform 0.3s ease; }
            .hof-modal-overlay.open .hof-modal-box { transform: translateY(0); }
            .hof-modal-close { position: absolute; top: 20px; right: 20px; background: none; border: none; color: #888; font-size: 24px; cursor: pointer; transition: 0.2s; }
            .hof-modal-close:hover { color: #FF4500; }
            
            .hof-modal-title { color: #FF4500; font-size: 1.8rem; font-weight: 900; letter-spacing: 2px; margin: 0 0 25px 0; text-transform: uppercase; text-align: center; }
            .hof-modal-text { font-size: 15px; line-height: 1.6; color: #ccc; margin-bottom: 20px; }
            
            .hof-status-list { list-style: none; padding: 0; margin: 30px 0; }
            .hof-status-list li { margin-bottom: 20px; padding-left: 25px; position: relative; font-size: 15px; line-height: 1.5; color: #aaa; }
            .hof-status-list li::before { content: '■'; position: absolute; left: 0; top: 2px; font-size: 12px; }
            .li-gold::before { color: #ffd700; text-shadow: 0 0 10px #ffd700; }
            .li-plat::before { color: #e5e5e5; text-shadow: 0 0 10px #e5e5e5; }
            .li-red::before { color: #FF4500; text-shadow: 0 0 10px #FF4500; }
            .hof-status-list b { color: #fff; font-size: 16px; letter-spacing: 1px; }

            .hof-modal-footer { text-align: center; font-weight: 800; color: #FF4500; font-size: 16px; margin-top: 30px; letter-spacing: 1px; text-transform: uppercase; }

            /* --- ЭЛИТНЫЙ ЧАТ --- */
            .hof-chat-section { max-width: 900px; margin: 0 auto; padding: 30px; background: linear-gradient(145deg, #1c1c1c, #141414); border-radius: 20px; border: 1px solid #3a3a3a; border-top: 1px solid #555; box-shadow: 0 0 0 1px #000, 0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 40px rgba(255,69,0,0.06); }
            .chat-title { font-size: 1.2rem; margin-bottom: 20px; color: #FF4500; font-weight: 800; letter-spacing: 3px; text-align: center; }
            .chat-messages { height: 300px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; padding-right: 10px; background: rgba(0,0,0,0.5); border-radius: 10px; padding: 14px; border: 1px solid #2a2a2a; }
            .msg { background: #1e1e1e; padding: 15px; border-radius: 12px; border-left: 3px solid #FF4500; font-size: 14px; line-height: 1.5; color: #ddd; }
            .msg b { color: #FF4500; margin-right: 8px; font-size: 12px; }
            .chat-input-area { display: flex; gap: 15px; margin-top: 20px; border-top: 1px solid #2e2e2e; padding-top: 20px; }
            .chat-input { flex: 1; background: #1a1a1a; border: 1px solid #333; padding: 15px; color: #fff; border-radius: 10px; outline: none; transition: 0.3s; }
            .chat-input:focus { border-color: #FF4500; }
            .chat-send { background: #FF4500; border: none; padding: 0 30px; color: #fff; border-radius: 10px; cursor: pointer; font-weight: 800; transition: 0.3s; letter-spacing: 1px; }
            .chat-send:hover { background: #ff5500; transform: scale(1.02); }

            /* ══ ЯРКИЕ СЕРЫЕ ══ */
            .stat-lbl  { color: #999 !important; }
            .geo-row   { color: #888 !important; }
            .hof-status-list li { color: #ccc !important; }
            .hof-modal-text { color: #ccc !important; }
            .msg       { color: #ddd !important; }

            /* ══ МОБИЛЬ ≤600px ══ */
            @media(max-width: 600px) {

              /* Header */
              .hof-header { padding: 40px 16px 24px !important; }
              .hof-title  { font-size: clamp(36px, 12vw, 56px) !important; letter-spacing: 6px !important; }
              .hof-header p { font-size: 9px !important; letter-spacing: 3px !important; margin-top: 8px !important; }

              /* Grid — 1 колонка */
              .hof-grid { grid-template-columns: 1fr !important; gap: 20px !important; padding: 12px 14px 40px !important; }

              /* Карточка */
              .hof-card { height: 420px !important; border-radius: 14px !important; }
              .hof-card:hover { transform: none !important; }
              .artist-photo { height: 78% !important; }
              .status-badge { font-size: 0.9rem !important; letter-spacing: 3px !important; top: 14px !important; }

              /* Info панель */
              .artist-info { padding: 14px 16px !important; }
              .track-record { font-size: 9px !important; letter-spacing: 1px !important; }
              .artist-name  { font-size: 1.5rem !important; }
              .crown-btn    { width: 38px !important; height: 38px !important; }
              .crown-btn img { width: 18px !important; height: 18px !important; }
              .name-row     { margin-bottom: 10px !important; padding-bottom: 10px !important; }
              .stat-val     { font-size: 1rem !important; }
              .stat-lbl     { font-size: 8px !important; }
              .geo-row      { font-size: 10px !important; margin-top: 12px !important; }

              /* Rules section */
              .hof-rules-section { padding: 0 14px !important; margin-bottom: 40px !important; }
              .hof-rules-btn { padding: 12px 28px !important; font-size: 12px !important; letter-spacing: 1px !important; }
              .hof-quote { font-size: clamp(14px, 4vw, 18px) !important; }
              .hof-quote-accent { font-size: clamp(15px, 4.5vw, 20px) !important; }

              /* Chat */
              .hof-chat-section { margin: 0 14px !important; padding: 20px 16px !important; border-radius: 14px !important; }
              .chat-title { font-size: 1rem !important; letter-spacing: 2px !important; }
              .chat-messages { height: 200px !important; }
              .msg { padding: 10px 12px !important; font-size: 13px !important; }
              .chat-input { padding: 12px !important; font-size: 13px !important; }
              .chat-send  { padding: 0 18px !important; font-size: 12px !important; }

              /* Modal */
              .hof-modal-box { padding: 24px 18px !important; border-radius: 14px !important; }
              .hof-modal-title { font-size: 1.3rem !important; }
              .hof-modal-text { font-size: 13px !important; }
              .hof-status-list li { font-size: 13px !important; }
            }
        `;
        document.head.appendChild(style);
    }

    // Порядок: GOLD -> PLATINUM -> RED DIAMOND
    const eliteArtists = [
        { 
            id: 'art_gold', 
            name: 'ЛЕГЕНДА', 
            statusTitle: 'GOLD STATUS',
            badgeClass: 'badge-gold',
            streams: '180K', 
            track: 'MY WAY', 
            rank: 15, 
            trend: 'up', 
            city: 'Бохтар', 
            genre: 'LYRIC',
            photo: 'assets/status/Дизайн без названия (1).png', 
            video: 'assets/status/gold.mp4',
            theme: 'theme-gold'
        },
        { 
            id: 'art_plat', 
            name: 'СКАЙ', 
            statusTitle: 'PLATINUM STATUS',
            badgeClass: 'badge-plat',
            streams: '620K', 
            track: 'VIBE', 
            rank: 4, 
            trend: 'down', 
            city: 'Худжанд', 
            genre: 'TRAP',
            photo: 'assets/status/platinum.png', 
            video: 'assets/status/Platinum.mp4',
            theme: 'theme-platinum'
        },
        { 
            id: 'art_red', 
            name: 'КРИМ', 
            statusTitle: 'RED DIAMOND',
            badgeClass: 'badge-red',
            streams: '1.2M', 
            track: 'ZARBA', 
            rank: 1, 
            trend: 'up', 
            city: 'Душанбе', 
            genre: 'РЭП',
            photo: 'assets/status/reddiamond.png', 
            video: 'assets/status/reddiamond.png.mp4',
            theme: 'theme-red'
        }
    ];

    container.innerHTML = `
        <div class="hof-wrapper">
            <header class="hof-header">
                <h1 class="hof-title">ЗАЛ СЛАВЫ</h1>
                <p style="color: #666; letter-spacing: 5px; margin-top:15px; font-weight:700;">ЗАКРЫТЫЙ КЛУБ ЛЕГЕНД ZARBA</p>
            </header>

            <div class="hof-grid">
                ${eliteArtists.map(a => `
                    <div class="hof-card ${a.theme}">
                        <div class="status-badge ${a.badgeClass}">${a.statusTitle}</div>

                        <video class="status-video" autoplay loop muted playsinline>
                            <source src="${a.video}" type="video/mp4">
                        </video>
                        
                        <img src="${a.photo}" class="artist-photo" alt="${a.name}">
                        
                        <div class="artist-info">
                            <div class="track-record-wrapper">
                                <div class="track-record">RECORD TRACK: ${a.track}</div>
                                <div class="live-eq" title="Слушают прямо сейчас">
                                    <div class="eq-bar"></div>
                                    <div class="eq-bar"></div>
                                    <div class="eq-bar"></div>
                                </div>
                            </div>
                            
                            <div class="name-row">
                                <h2 class="artist-name">${a.name}</h2>
                                <button class="crown-btn" onclick="toggleCrown(event, this)">
                                    <img src="assets/status/goldxrown.png" alt="Crown">
                                </button>
                            </div>
                            
                            <div class="stat-row">
                                <div class="stat-col">
                                    <div class="stat-val">${a.streams}</div>
                                    <div class="stat-lbl">Z-STREAMS</div>
                                </div>
                                <div class="stat-col" style="text-align: right;">
                                    <div class="stat-val">
                                        RANK #${a.rank} 
                                        <span class="trend-${a.trend}">${a.trend === 'up' ? '▲' : '▼'}</span>
                                    </div>
                                    <div class="stat-lbl">В ЧАРТЕ ТОП 100</div>
                                </div>
                            </div>
                            
                            <div class="geo-row">
                                <div>${a.city}</div>
                                <div>${a.genre}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <section class="hof-rules-section">
                <button class="hof-rules-btn" onclick="openHofModal()">ПРАВИЛА ЗАЛА СЛАВЫ</button>
                <div class="hof-quote">
                    «ТОЛЬКО ТЫ РЕШАЕШЬ, КТО СТАНЕТ СЛЕДУЮЩИМ.<br>
                    <span class="hof-quote-accent">СЛУШАЙ ТРЕКИ. СТАВЬ КОРОНЫ. ТВОРИ ИСТОРИЮ.»</span>
                </div>
            </section>

            <section class="hof-chat-section">
                <div class="chat-title">Z-TALK / ОБСУЖДЕНИЕ ЛЕГЕНД</div>
                <div class="chat-messages" id="hof-chat-box">
                    <div class="msg"><b>@SYSTEM:</b> Добро пожаловать в Зал Славы. Выдавайте короны достойным!</div>
                </div>
                <div class="chat-input-area">
                    <input type="text" class="chat-input" id="hof-input" placeholder="Напиши сообщение...">
                    <button class="chat-send" onclick="sendHofMessage()">ОТПРАВИТЬ</button>
                </div>
            </section>

            <div id="hof-rules-modal" class="hof-modal-overlay" onclick="closeHofModal(event)">
                <div class="hof-modal-box" onclick="event.stopPropagation()">
                    <button class="hof-modal-close" onclick="closeHofModal()">✕</button>
                    <h2 class="hof-modal-title">КАК ЭТО РАБОТАЕТ?</h2>
                    
                    <p class="hof-modal-text">В Зал Славы ZARBA попадают <b>исключительно автоматически</b>. Никакого блата или скрытых накруток. Всё решают реальные прослушивания от фанатов внутри нашей экосистемы.</p>
                    <p class="hof-modal-text">Как только трек таджикского рэп-артиста пробивает определенный рубеж Z-Streams, он навсегда вписывает свое имя в историю, получая статус:</p>
                    
                    <ul class="hof-status-list">
                        <li class="li-gold"><b style="color:#ffd700">GOLD STATUS (100,000+ СТРИМОВ)</b><br>Вход в элиту. Трек качает на улицах, артист получает золотой статус и право находиться в Зале Славы.</li>
                        <li class="li-plat"><b style="color:#e5e5e5">PLATINUM STATUS (500,000+ СТРИМОВ)</b><br>Всеобщее признание. Трек становится гимном поколений.</li>
                        <li class="li-red"><b style="color:#FF4500">RED DIAMOND (1,000,000+ СТРИМОВ)</b><br>Абсолютная величина. Миллион прослушиваний. Высшая награда экосистемы ZARBA.</li>
                    </ul>
                    
                    <div class="hof-modal-footer">Всё по-честному. Только фанаты решают!</div>
                </div>
            </div>

        </div>
    `;

    // Глобальные функции
    
    // Функция клика на корону с эффектом частиц (конфетти)
    window.toggleCrown = function(event, btn) {
        btn.classList.toggle('active');
        
        // Если корона стала активной - запускаем эффект взрыва частиц
        if (btn.classList.contains('active')) {
            const rect = btn.getBoundingClientRect();
            const btnCenterX = rect.left + rect.width / 2;
            const btnCenterY = rect.top + rect.height / 2;
            
            // Создаем 8-10 частиц
            for (let i = 0; i < 10; i++) {
                const particle = document.createElement('div');
                particle.className = 'crown-particle';
                document.body.appendChild(particle);
                
                // Устанавливаем начальную позицию (центр кнопки)
                particle.style.left = btnCenterX + 'px';
                particle.style.top = btnCenterY + 'px';
                
                // Вычисляем случайное направление полета
                const angle = Math.random() * Math.PI * 2;
                const velocity = 30 + Math.random() * 40; // Сила разлета
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity - 20; // Слегка направляем вверх
                
                particle.style.setProperty('--tx', tx + 'px');
                particle.style.setProperty('--ty', ty + 'px');
                
                // Удаляем частицу из DOM после завершения анимации (0.6s)
                setTimeout(() => {
                    particle.remove();
                }, 600);
            }
        }
    };

    window.openHofModal = function() {
        const modal = document.getElementById('hof-rules-modal');
        if (modal) modal.classList.add('open');
    };

    window.closeHofModal = function(e) {
        const modal = document.getElementById('hof-rules-modal');
        if (e && e.target === modal || !e) {
            modal.classList.remove('open');
        }
    };

    window.sendHofMessage = function() {
        const input = document.getElementById('hof-input');
        const box = document.getElementById('hof-chat-box');
        if (input && input.value.trim()) {
            const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            box.innerHTML += `
                <div class="msg" style="animation: hofFade 0.3s ease both">
                    <b>ВЫ [${time}]:</b> ${input.value}
                </div>
            `;
            input.value = '';
            box.scrollTop = box.scrollHeight;
        }
    };
  }, 1900);
}

// Анимация появления сообщений в чате
if (!document.getElementById('hof-anim')) {
    const hofFadeStyle = document.createElement('style');
    hofFadeStyle.id = 'hof-anim';
    hofFadeStyle.textContent = "@keyframes hofFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }";
    document.head.appendChild(hofFadeStyle);
}