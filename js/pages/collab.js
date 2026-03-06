// ============================================================
//  ZARBA — Z-COLLAB PAGE (Изолированная капсула)
// ============================================================

(function() {

function renderCollab(container) {
  container.innerHTML = '';
  container.id = 'zc-page';
  injectCSS();
  container.innerHTML = getHTML();
  initLogic(container);
}

// ─── CSS ─────────────────────────────────────────────────────
function injectCSS() {
  document.getElementById('zc-styles')?.remove();
  const s = document.createElement('style');
  s.id = 'zc-styles';
  s.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@700;800&family=Space+Grotesk:wght@300;500;700&family=JetBrains+Mono:wght@400;700&display=swap');

#zc-page {
  background: #060606;
  min-height: 100vh;
  font-family: 'Rajdhani', sans-serif;
  color: #e0e0e0;
  --red: #FF4500;
  --gold: #FFD700;
  --mono: 'JetBrains Mono', monospace;
  --disp: 'Bebas Neue', sans-serif;
  --s1: #0e0e0e;
  --s2: #161616;
  --s3: #222;
  --s4: #2e2e2e;
  padding-bottom: 120px;
}

/* ── HERO ── */
.zc-hero {
  position: relative;
  padding: 64px 56px 48px;
  border-bottom: 1px solid #111;
  overflow: hidden;
}
.zc-hero::before {
  content: 'Z-COLLAB';
  position: absolute;
  right: -20px;
  top: -10px;
  font-family: var(--disp);
  font-size: 200px;
  color: rgba(255,69,0,.03);
  letter-spacing: 8px;
  pointer-events: none;
  white-space: nowrap;
}
.zc-hero-top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}
.zc-hero-label {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 6px;
  color: var(--red);
  text-transform: uppercase;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.zc-hero-label::before {
  content: '';
  display: inline-block;
  width: 24px;
  height: 1px;
  background: var(--red);
}
.zc-hero-title {
  font-family: var(--disp);
  font-size: clamp(56px, 7vw, 96px);
  letter-spacing: 4px;
  line-height: 0.9;
  color: #fff;
  margin-bottom: 16px;
}
.zc-hero-title span {
  color: var(--red);
}
.zc-hero-sub {
  font-family: 'Rajdhani', sans-serif;
  font-size: 16px; /* Сделали крупно и читаемо */
  font-weight: 500;
  letter-spacing: 1px;
  color: #ccc; /* Светло-серый, почти белый */
  max-width: 600px;
  line-height: 1.6;
  border-left: 2px solid var(--red); /* Стильная оранжевая линия слева */
  padding-left: 16px; /* Отступ от линии */
  margin-top: 10px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5); /* Чтобы текст выделялся на фоне */
}
/* ── ГЛАВНЫЕ ЦИФРЫ (HERO STATS: NEON UPGRADE) ── */
.zc-hero-stats {
  display: flex;
  gap: 64px; /* Больше пространства — больше статуса */
  flex-shrink: 0;
}

.zc-hstat {
  text-align: right;
  position: relative;
}

.zc-hstat-n {
  font-family: var(--disp); /* Bebas Neue — мощный и высокий */
  font-size: 72px; /* Сделали крупнее и массивнее */
  color: #fff;
  line-height: 0.8;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

/* Счётчик активных постов теперь горит неоном */
.zc-hstat-n.live {
  color: #3dfd02; /* Твой ядовито-зеленый */
  text-shadow: 0 0 30px rgba(61, 253, 2, 0.4);
}

.zc-hstat-l {
  font-family: 'Space Grotesk', sans-serif; /* Дорогой, читаемый тех-шрифт */
  font-size: 10px;
  letter-spacing: 5px;
  color: #aaa; /* ВМЕСТО #444 — теперь текст "вышел из тени" */
  text-transform: uppercase;
  margin-top: 14px;
  font-weight: 500;
}

/* Обновленная "живая" точка */
.zc-live-dot {
  display: inline-block;
  width: 10px; height: 10px; /* Чуть увеличили */
  background: #3dfd02;
  border-radius: 50%;
  box-shadow: 0 0 15px #3dfd02;
  animation: zc-neon-pulse 1.8s infinite;
}

@keyframes zc-neon-pulse {
  0%, 100% { opacity: 1; transform: scale(1); filter: blur(0px); }
  50% { opacity: 0.5; transform: scale(1.2); filter: blur(2px); }
}
/* ── TOOLBAR ── */
.zc-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 56px;
  border-bottom: 1px solid #0f0f0f;
  flex-wrap: wrap;
}
.zc-filter-btn {
  background: transparent;
  border: 1px solid #1e1e1e;
  color: #555;
  padding: 10px 20px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .2s;
}
.zc-filter-btn:hover { border-color: #333; color: #999; }
.zc-filter-btn.on { border-color: var(--red); color: var(--red); background: rgba(255,69,0,.06); }
.zc-filter-btn.closed { border-color: #1e1e1e; color: #333; }
.zc-filter-btn.closed.on { border-color: #555; color: #555; background: rgba(255,255,255,.03); }
.zc-spacer { flex: 1; }
.zc-sel {
  background: transparent;
  border: none;
  border-bottom: 1px solid #222;
  color: #555;
  padding: 10px 28px 10px 4px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 2px;
  cursor: pointer;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='5'%3E%3Cpath d='M0 0l4 5 4-5z' fill='%23444'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 4px center;
  transition: border-color .2s, color .2s;
}
.zc-sel:focus { border-color: var(--red); color: #ccc; }
.zc-sel option { background: #111; color: #ccc; }

/* ── LAYOUT: лента + сайдбар ── */
.zc-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 0;
  padding: 0 56px;
  padding-top: 32px;
}
@media(max-width:1000px) {
  .zc-layout { grid-template-columns: 1fr; padding: 0 16px; padding-top: 24px; }
  .zc-sidebar { display: none; }
  .zc-hero,.zc-toolbar { padding-left: 16px; padding-right: 16px; }
}

/* ── FEED ── */
.zc-feed { 
  padding-right: 40px; 
  display: flex; 
  flex-direction: column; 
  gap: 24px; /* 🔥 ИСПРАВЛЕНИЕ: Раздвинули посты (было 3px) */ 
}

/* ── КАРТОЧКА ПОСТА ── */
.zc-card {
  background: #0a0a0a; /* Делаем фон карточки чуть-чуть светлее самого фона сайта */
  border: 1px solid #1a1a1a; /* Рамка стала более четкой, чтобы отделять посты */
  border-left: 4px solid transparent;
  padding: 32px 36px; /* Дали чуть больше воздуха внутри самой карточки */
  position: relative;
  transition: border-color .3s, background .3s, transform .2s;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); /* Добавили тень, чтобы карточки "оторвались" от фона */
}
.zc-card:hover { background: #0f0f0f; }
.zc-card.open-post { border-left-color: var(--red); }
.zc-card.closed-post { border-left-color: #1e1e1e; opacity: .6; }
.zc-card.closed-post:hover { opacity: .8; }

.zc-card-head {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}
/* ── АВАТАРКА (STEALTH STUDIO) ── */
.zc-avatar {
  width: 50px; height: 50px;
  background: #111; /* Чуть светлее общего фона, чтобы был виден контур */
  border: 1px solid #1a1a1a; 
  display: flex; align-items: center; justify-content: center;
  font-family: var(--disp);
  font-size: 22px;
  color: #888; /* Спокойный серый цвет для буквы — читаемо, но не ярко */
  flex-shrink: 0;
  position: relative;
  transition: all 0.3s ease;
}

/* Элегантный индикатор Hall of Fame (Просто маленькая точка) */
.zc-avatar.hof::after {
  content: '';
  position: absolute;
  top: -2px; right: -2px;
  width: 8px; height: 8px;
  background: var(--gold);
  border-radius: 50%;
  border: 2px solid #060606;
  box-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
}

/* При наведении аватарка чуть "оживает" */
.zc-card:hover .zc-avatar {
  border-color: #333;
  color: #ccc;
}
.zc-artist-info { flex: 1; min-width: 0; }
.zc-artist-name {
  font-family: var(--disp);
  font-size: 26px;
  letter-spacing: 2px;
  color: #fff;
  line-height: 1;
}
.zc-artist-meta {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #999; /* Светло-серый, чтобы легко читалось */
  text-transform: uppercase;
  margin-top: 4px;
}
.zc-artist-meta span { 
  color: var(--red); /* Фирменный горящий оранжевый */
  font-weight: 700;
  text-shadow: 0 0 8px rgba(255, 69, 0, 0.5); /* Эффект неона */
}
.zc-status-badge {
  font-family: 'Rajdhani', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  padding: 8px 16px;
  border: 1px solid;
  text-transform: uppercase;
  flex-shrink: 0;
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.4); /* Добавляем глубину плашке */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
.zc-status-badge.seeking {
  border-color: rgba(255,69,0,.4);
  color: var(--red);
  background: rgba(255,69,0,.05);
}
.zc-status-badge.found {
  border-color: rgba(0,230,118,.3);
  color: #00E676;
  background: rgba(0,230,118,.04);
}
.zc-status-badge.closed-badge {
  border-color: #222;
  color: #333;
}

/* ── АУДИО БЛОК ── */
.zc-audio-block {
  background: #0a0a0a;
  border: 1px solid #141414;
  padding: 18px 22px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 18px;
}
.zc-play-btn {
  width: 44px; height: 44px;
  background: var(--red);
  border: none;
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background .2s, transform .15s;
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);
}
.zc-play-btn:hover { background: #FF6B00; transform: scale(1.05); }
.zc-play-btn.playing { background: #333; }
.zc-play-btn svg { width: 16px; height: 16px; fill: currentColor; }
.zc-audio-info { flex: 1; min-width: 0; }
.zc-audio-title {
  font-family: var(--disp);
  font-size: 20px;
  letter-spacing: 2px;
  color: #ccc;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
/* ── ИНФО ПОД ТРЕКОМ (Только читаемость и шрифт) ── */
.zc-audio-meta {
  font-family: 'JetBrains Mono', monospace; /* Технический, ровный шрифт */
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 1px; /* Даем микро-отступ буквам, чтобы не слипались */
  color: #888; /* Светло-серый, теперь всё ВИДНО */
  text-transform: uppercase;
  margin-top: 5px;
}
.zc-audio-meta::before {
  content: 'ID:0' attr(data-id); /* Добавим "технический код" */
  color: #ffffff;
}
.zc-waveform {
  position: relative;
  flex: 1;
  height: 52px;
  cursor: pointer;
  overflow: hidden;
}
.zc-wave-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
.zc-audio-dur {
  font-family: var(--mono);
  font-size: 10px;
  color: #333;
  letter-spacing: 1px;
  flex-shrink: 0;
}

/* ── COMMENT / DESCRIPTION ── */
.zc-desc {
  font-size: 16px;
  font-weight: 500;
  color: #777;
  line-height: 1.6;
  margin-bottom: 18px;
  border-left: 2px solid #1a1a1a;
  padding-left: 14px;
}
.zc-desc strong { color: var(--red); font-weight: 700; }

/* ── ТЕГИ (Без жестких рамок) ── */
.zc-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}
.zc-tag {
  font-family: 'Rajdhani', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #888;
  background: rgba(255, 255, 255, 0.03); /* Мягкая заливка вместо рамки */
  border: none; /* УБРАЛИ РАМКИ */
  padding: 6px 14px;
  border-radius: 4px; /* Легкое скругление убирает агрессию */
  text-transform: uppercase;
}
/* 1. АНДЕРГРАУНД: Тот самый Neon Acid стиль */
.zc-tag.genre {
  color: #ffffff; /* Ядовито-зеленый неон */
  background: #000; /* Глубокий черный фон для контраста */
  padding: 6px 16px;
  border-left: 5px solid #3dfd02; /* Жирная неоновая линия слева */
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-radius: 2px;

  /* Эффект свечения: внешнее и внутреннее */
  box-shadow: 0 0 15px rgba(61, 253, 2, 0.2), 
              inset 5px 0 10px -5px rgba(61, 253, 2, 0.4);

  /* Подсветка самого текста */
  text-shadow: 0 0 8px rgba(61, 253, 2, 0.6);
  
  display: inline-flex;
  align-items: center;
}

/* 2. Город: Строгая геометрия с точкой локации */
.zc-tag.city {
  background: transparent;
  color: #aaa;
  border: 1px solid #2a2a2a;
}
.zc-tag.city::before {
  content: '';
  display: inline-block;
  width: 4px; height: 4px;
  background: #666;
  margin-right: 8px;
  border-radius: 50%;
}

/* 3. Статус поиска: Активный процесс (пунктир и молния) */
.zc-tag:not(.genre):not(.city) {
  background: rgba(255, 69, 0, 0.04);
  color: var(--red);
  border: 1px dashed rgba(255, 69, 0, 0.4);
}
.zc-tag:not(.genre):not(.city)::before {
  content: '⚡';
  font-size: 10px;
  margin-right: 6px;
  filter: drop-shadow(0 0 4px var(--red));
}

/* ── ACTIONS (INDUSTRIAL GHOST NEON) ── */
.zc-actions {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-top: 10px;
  padding: 24px 0;
  border-top: 1px solid #111; /* Тонкий разделитель */
}

.zc-btn-fit {
  position: relative;
  background: transparent;
  border: 1px solid #222; /* Почти невидимая в покое */
  color: #fff;
  padding: 18px 48px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 6px; /* Широкий "дорогой" кернинг */
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.2, 1, 0.3, 1);
  overflow: hidden;
  border-radius: 0; /* Строгая прямоугольная форма */
}

/* Тонкий неоновый индикатор снизу кнопки */
.zc-btn-fit::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #3dfd02;
  transform: scaleX(0.1); /* В покое — маленькая черточка */
  transition: all 0.4s ease;
}

.zc-btn-fit:hover {
  border-color: #3dfd02;
  letter-spacing: 9px; /* Текст плавно "раздвигается" при наведении */
  padding-left: 54px;
  padding-right: 42px;
  background: rgba(61, 253, 2, 0.02);
  box-shadow: 0 10px 40px -10px rgba(61, 253, 2, 0.3);
}

.zc-btn-fit:hover::before {
  transform: scaleX(1); /* Линия подчеркивания раскрывается на всю длину */
  box-shadow: 0 0 15px #3dfd02;
}

.zc-btn-fit span {
  position: relative;
  z-index: 1;
}

/* Счетчик демок — строгий сегментированный вид */
.zc-demos-count {
  font-family: 'Rajdhani', sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
  color: #444;
  text-transform: uppercase;
}

.zc-demos-count strong {
  color: #fff; /* Цифра — единственный светлый акцент в счетчике */
  font-size: 22px;
  font-weight: 800;
  margin-right: 8px;
  font-family: 'Bebas Neue', sans-serif;
}

.zc-time-ago {
  margin-left: auto;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: #222;
}
/* Кибер-уголок */
.zc-btn-fit::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background: var(--red);
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
  transition: all .3s;
}

.zc-btn-fit::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--red), #FF6B00);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .4s cubic-bezier(.25,.46,.45,.94);
  z-index: 0;
}

.zc-btn-fit span { 
  position: relative; 
  z-index: 1; 
  display: flex;
  align-items: center;
  gap: 8px;
}

.zc-btn-fit:hover { 
  color: #fff; 
  border-color: var(--red);
  box-shadow: 0 8px 25px rgba(255, 69, 0, 0.3);
  transform: translateY(-2px);
}

.zc-btn-fit:hover::before { transform: scaleX(1); }
.zc-btn-fit:hover::after { background: #fff; }

.zc-btn-fit:disabled {
  background: rgba(255, 255, 255, 0.02);
  border-color: #222;
  color: #555;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}
.zc-btn-fit:disabled::after, .zc-btn-fit:disabled::before { display: none; }

/* Счетчик демок */
.zc-demos-count {
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 8px;
}

.zc-demos-count strong { 
  color: var(--red); 
  font-size: 18px; 
  font-weight: 700;
  background: rgba(255, 69, 0, 0.08);
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid rgba(255, 69, 0, 0.2);
  text-shadow: 0 0 8px rgba(255, 69, 0, 0.4);
}

/* Время */
.zc-time-ago {
  margin-left: auto;
  font-family: 'Rajdhani', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #555;
  text-transform: uppercase;
}

/* ── МОДАЛ: Запись демки ── */
.zc-modal-bg {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,.94);
  backdrop-filter: blur(20px) saturate(.4);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; pointer-events: none;
  transition: opacity .3s;
}
.zc-modal-bg.open { opacity: 1; pointer-events: all; }

/* ── MODAL: ПОЛНЫЙ РЕДИЗАЙН ── */
.zc-modal {
  width: min(580px, 95vw);
  background: #0d0d0d;
  border: 1px solid #2a2a2a;
  border-top: 3px solid var(--red);
  transform: translateY(24px) scale(.96);
  transition: transform .4s cubic-bezier(.16,1,.3,1);
  position: relative;
  overflow: hidden;
}

/* Красное свечение сверху */
.zc-modal::before {
  content: '';
  position: absolute;
  top: -60px; left: 50%;
  transform: translateX(-50%);
  width: 300px; height: 120px;
  background: radial-gradient(ellipse, rgba(255,69,0,0.18) 0%, transparent 70%);
  pointer-events: none;
}

.zc-modal-bg.open .zc-modal { transform: translateY(0) scale(1); }

/* ── ШАПКА МОДАЛА ── */
.zc-modal-head {
  padding: 32px 36px 24px;
  border-bottom: 1px solid #1e1e1e;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
}

.zc-modal-title {
  font-family: var(--disp);
  font-size: 44px;
  letter-spacing: 4px;
  color: #fff;
  line-height: 0.95;
  text-shadow: 0 0 40px rgba(255,69,0,0.2);
}

.zc-modal-sub {
  font-family: 'Syne', 'Rajdhani', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #ff6b35;
  text-transform: uppercase;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.zc-modal-sub::before {
  content: '';
  display: inline-block;
  width: 16px; height: 1px;
  background: var(--red);
  flex-shrink: 0;
}

.zc-modal-close {
  background: rgba(255,255,255,0.04);
  border: 1px solid #2e2e2e;
  color: #888;
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all .25s;
  flex-shrink: 0;
  border-radius: 2px;
}
.zc-modal-close:hover {
  border-color: var(--red);
  color: #fff;
  background: rgba(255,69,0,0.12);
  box-shadow: 0 0 16px rgba(255,69,0,0.25);
}

/* ── ТЕЛО МОДАЛА ── */
.zc-modal-body { padding: 28px 36px 36px; }

/* Оригинальный трек */
.zc-modal-orig {
  background: #111;
  border: 1px solid #222;
  border-left: 3px solid rgba(255,69,0,0.5);
  padding: 16px 20px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
}
.zc-modal-orig::after {
  content: 'ОРИГИНАЛ';
  position: absolute;
  top: -8px; left: 16px;
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 4px;
  color: var(--red);
  background: #111;
  padding: 0 6px;
  text-transform: uppercase;
}

.zc-modal-orig-label {
  font-family: 'Syne', 'Rajdhani', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #666;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.zc-modal-orig-name {
  font-family: var(--disp);
  font-size: 26px;
  letter-spacing: 2px;
  color: #e0e0e0;
}

/* ── UPLOAD ZONE ── */
.zc-upload-area {
  border: 1px dashed #2e2e2e;
  padding: 32px 24px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all .3s;
  position: relative;
  background: rgba(255,255,255,0.015);
}
.zc-upload-area:hover {
  border-color: var(--red);
  background: rgba(255,69,0,0.04);
  box-shadow: 0 0 24px rgba(255,69,0,0.08), inset 0 0 24px rgba(255,69,0,0.03);
}
.zc-upload-area input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }

.zc-upload-text {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 3px;
  color: #666;
  text-transform: uppercase;
  line-height: 2;
}
.zc-upload-text strong {
  color: var(--red);
  display: block;
  font-size: 15px;
  font-family: var(--disp);
  letter-spacing: 4px;
  margin-bottom: 8px;
  text-shadow: 0 0 20px rgba(255,69,0,0.4);
}

/* Rec zone (legacy, keep working) */
.zc-rec-zone {
  border: 1px dashed #2e2e2e;
  padding: 32px;
  text-align: center;
  margin-bottom: 20px;
  transition: all .3s;
  position: relative;
  background: rgba(255,255,255,0.01);
}
.zc-rec-zone.active {
  border-color: rgba(255,69,0,.5);
  background: rgba(255,69,0,.04);
  box-shadow: 0 0 30px rgba(255,69,0,0.08);
}
.zc-rec-zone.has-file {
  border-color: rgba(61,253,2,.4);
  background: rgba(61,253,2,.03);
  border-style: solid;
  box-shadow: 0 0 20px rgba(61,253,2,0.06);
}

.zc-rec-icon {
  width: 72px; height: 72px;
  background: #161616;
  border-radius: 50%;
  border: 1px solid #2a2a2a;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
  font-size: 26px;
  transition: all .3s;
}
.zc-rec-zone.active .zc-rec-icon {
  background: rgba(255,69,0,.15);
  border-color: rgba(255,69,0,.4);
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(255,69,0,0.2);
}
.zc-rec-zone.has-file .zc-rec-icon {
  background: rgba(61,253,2,.1);
  border-color: rgba(61,253,2,.3);
}

.zc-rec-title {
  font-family: var(--disp);
  font-size: 24px;
  letter-spacing: 4px;
  color: #aaa;
  margin-bottom: 8px;
}
.zc-rec-hint {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 3px;
  color: #444;
  text-transform: uppercase;
  line-height: 2;
}
.zc-rec-zone.has-file .zc-rec-title { color: #3dfd02; text-shadow: 0 0 16px rgba(61,253,2,0.4); }
.zc-file-name {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 2px;
  color: #3dfd02;
  margin-top: 12px;
  display: none;
}
.zc-rec-zone.has-file .zc-file-name { display: block; }

/* Timer */
.zc-timer {
  font-family: var(--disp);
  font-size: 52px;
  letter-spacing: 6px;
  color: var(--red);
  text-align: center;
  margin: 16px 0;
  display: none;
  text-shadow: 0 0 30px rgba(255,69,0,0.5);
}
.zc-timer.visible { display: block; }
.zc-timer.warn { color: #FFD700; text-shadow: 0 0 20px rgba(255,215,0,0.5); animation: zc-timerblink .5s infinite; }
@keyframes zc-timerblink { 0%,100%{opacity:1} 50%{opacity:.3} }

/* ── LIMIT BAR ── */
.zc-limit-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.zc-limit-track {
  flex: 1;
  height: 3px;
  background: #1e1e1e;
  border-radius: 2px;
  overflow: hidden;
}
.zc-limit-fill {
  height: 100%;
  background: linear-gradient(90deg, #FF4500, #FF6B00);
  width: 0%;
  transition: width .3s, background .3s;
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(255,69,0,0.5);
}
.zc-limit-fill.warn { background: linear-gradient(90deg, #FFD700, #FFA500); box-shadow: 0 0 8px rgba(255,215,0,0.5); }
.zc-limit-fill.over { background: #f00; box-shadow: 0 0 8px rgba(255,0,0,0.6); }
.zc-limit-text {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 2px;
  color: #888;
  text-transform: uppercase;
  flex-shrink: 0;
  min-width: 80px;
  text-align: right;
}

/* ── SUBMIT BUTTON ── */
.zc-submit-btn {
  width: 100%;
  background: var(--red);
  color: #fff;
  border: none;
  padding: 22px;
  font-family: var(--disp);
  font-size: 20px;
  letter-spacing: 8px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .3s;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%);
}
.zc-submit-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%);
  transform: translateX(-100%);
  transition: transform .5s;
}
.zc-submit-btn:hover {
  background: #FF6B00;
  box-shadow: 0 8px 32px rgba(255,69,0,0.5), 0 0 60px rgba(255,69,0,0.15);
  letter-spacing: 10px;
}
.zc-submit-btn:hover::before { transform: translateX(100%); }
.zc-submit-btn:disabled {
  background: #161616;
  color: #333;
  cursor: not-allowed;
  clip-path: none;
  box-shadow: none;
  letter-spacing: 8px;
}

/* ── SUCCESS STATE ── */
.zc-success {
  text-align: center;
  padding: 48px 36px;
  display: none;
}
.zc-success.show { display: block; }
.zc-success-icon {
  font-size: 56px;
  margin-bottom: 24px;
  animation: zc-pop .5s cubic-bezier(.16,1,.3,1);
  filter: drop-shadow(0 0 20px rgba(61,253,2,0.5));
}
@keyframes zc-pop { from{transform:scale(0) rotate(-10deg)} to{transform:scale(1) rotate(0deg)} }
.zc-success-title {
  font-family: var(--disp);
  font-size: 48px;
  letter-spacing: 6px;
  color: #3dfd02;
  margin-bottom: 12px;
  text-shadow: 0 0 30px rgba(61,253,2,0.4);
}
.zc-success-sub {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 4px;
  color: #666;
  text-transform: uppercase;
  line-height: 2;
}

/* ── SIDEBAR ── */
.zc-sidebar { padding-left: 40px; border-left: 1px solid #0f0f0f; }

.zc-sb-section { margin-bottom: 40px; }
.zc-sb-title {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 5px;
  color: #333;
  text-transform: uppercase;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #111;
}
.zc-sb-title::before {
  content: '//';
  color: var(--red);
  margin-right: 8px;
}

/* Топ по коллабам */
.zc-top-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #0a0a0a;
  cursor: pointer;
  transition: background .15s;
}
.zc-top-item:last-child { border-bottom: none; }
.zc-top-num {
  font-family: var(--disp);
  font-size: 24px;
  color: #1e1e1e;
  min-width: 32px;
  text-align: right;
  letter-spacing: 1px;
}
.zc-top-av {
  width: 36px; height: 36px;
  background: var(--bg, #1a1a1a);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--disp);
  font-size: 16px;
  color: rgba(255,255,255,.15);
  flex-shrink: 0;
}
.zc-top-info { flex: 1; min-width: 0; }
.zc-top-name {
  font-family: var(--disp);
  font-size: 18px;
  letter-spacing: 1px;
  color: #888;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  transition: color .15s;
}
.zc-top-item:hover .zc-top-name { color: #fff; }
.zc-top-collabs {
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 2px;
  color: #333;
  text-transform: uppercase;
  margin-top: 2px;
}
.zc-top-collabs strong { color: var(--red); }

/* Правила */
.zc-rule {
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
}
.zc-rule-num {
  font-family: var(--disp);
  font-size: 28px;
  color: var(--red);
  line-height: 1;
  flex-shrink: 0;
  opacity: .5;
}
.zc-rule-text {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 1px;
  color: #444;
  line-height: 1.7;
  text-transform: uppercase;
}

/* ── NOTIFICATION TOAST ── */
.zc-toast {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 99999;
  background: #0c0c0c;
  border: 1px solid #1e1e1e;
  border-left: 3px solid var(--red);
  padding: 18px 24px;
  min-width: 280px;
  transform: translateX(120%);
  transition: transform .4s cubic-bezier(.25,.46,.45,.94);
  pointer-events: none;
}
.zc-toast.show { transform: translateX(0); }
.zc-toast-title {
  font-family: var(--disp);
  font-size: 20px;
  letter-spacing: 2px;
  color: #fff;
  margin-bottom: 4px;
}
.zc-toast-msg {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 2px;
  color: #444;
  text-transform: uppercase;
}
.zc-toast.green { border-left-color: #00E676; }
.zc-toast.green .zc-toast-title { color: #00E676; }

/* ── АНИМАЦИЯ КАРТОЧЕК ── */
@keyframes zc-fadein {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.zc-card { animation: zc-fadein .4s ease both; }
`;
  document.head.appendChild(s);
}

// ─── DATA ─────────────────────────────────────────────────────
const POSTS = [
  {
    id: 1, artist: 'PARVEEZ', city: 'Худжанд', genre: 'АНДЕРГРАУНД', hof: true,
    trackTitle: 'Тёмная сторона (demo)', duration: '1:00',
    comment: 'Написал куплет про потери и боль. Нужен лирический припев - желательно девочка или мягкий мужской голос. Кто залетит на фит?',
    seeking: 'Лирический припев', status: 'open', demos: 4, timeAgo: '2 ч назад',
    bg: 'linear-gradient(135deg,#1a0808,#0f0f0f)'
  },
  {
    id: 2, artist: 'MC ARTISAN', city: 'Душанбе', genre: 'РЭП', hof: false,
    trackTitle: 'Улица зовёт (куплет)', duration: '0:58',
    comment: 'Жёсткий улично-базарный куплет. Хочу второй куплет в том же духе. Никакого попа, только хардкор.',
    seeking: 'Жёсткий 2-й куплет', status: 'open', demos: 7, timeAgo: '5 ч назад',
    bg: 'linear-gradient(135deg,#0a0d1a,#0f0f0f)'
  },
  {
    id: 3, artist: 'MALIKA', city: 'Душанбе', genre: 'ПОЭТЕССА', hof: false,
    trackTitle: 'Без тебя (интро)', duration: '1:00',
    comment: 'Плавный лирический трек о разлуке. Жду парный куплет от парня. Минус готов, биты мягкие.',
    seeking: 'Мужской куплет', status: 'found', demos: 12, timeAgo: '1 д назад',
    bg: 'linear-gradient(135deg,#100a14,#0f0f0f)'
  },
  {
    id: 4, artist: 'HUSTLE TAKIR', city: 'Душанбе', genre: 'ТРЭП', hof: false,
    trackTitle: 'Night Mode (beat+verse)', duration: '1:00',
    comment: 'Трэп-банщик из Душанбе ищет второго MC. Хочу человека с агрессивной подачей. Медляки не зовите.',
    seeking: 'Агрессивный MC', status: 'open', demos: 2, timeAgo: '8 ч назад',
    bg: 'linear-gradient(135deg,#100a0a,#0f0f0f)'
  },
  {
    id: 5, artist: 'SINO', city: 'Худжанд', genre: 'ЛИРИКА', hof: false,
    trackTitle: 'Боль в рифме (demo)', duration: '0:55',
    comment: 'Северный взгляд на жизнь. Нужен человек с похожей энергетикой. Хочу чтобы второй куплет был на таджикском.',
    seeking: 'Куплет на таджикском', status: 'open', demos: 3, timeAgo: '3 д назад',
    bg: 'linear-gradient(135deg,#0a100a,#0f0f0f)'
  },
  {
    id: 6, artist: 'SAFAR', city: 'Душанбе', genre: 'КАЛЬЯННЫЙ', hof: false,
    trackTitle: 'Дым (атмосфера)', duration: '1:00',
    comment: 'Кальянный атмосферный трек. Нужен голос девушки - спокойный, чуть хрипловатый. Никакой автотюн.',
    seeking: 'Женский голос', status: 'closed', demos: 9, timeAgo: '5 д назад',
    bg: 'linear-gradient(135deg,#0d120a,#0f0f0f)'
  },
];

const TOP_COLLABS = [
  {name:'MC ARTISAN', collabs:8, bg:'linear-gradient(135deg,#1a0808,#111)'},
  {name:'PARVEEZ', collabs:6, bg:'linear-gradient(135deg,#0a0d1a,#111)'},
  {name:'SINO', collabs:5, bg:'linear-gradient(135deg,#100a14,#111)'},
  {name:'YOUNG FLOW', collabs:4, bg:'linear-gradient(135deg,#0a100a,#111)'},
  {name:'MALIKA', collabs:3, bg:'linear-gradient(135deg,#0d120a,#111)'},
];

const ini = n => n.trim().split(/\s+/).map(w=>w[0].toUpperCase()).join('').slice(0,2);

// ─── HTML ─────────────────────────────────────────────────────
function getHTML() {
  const feedHTML = POSTS.map((p, i) => cardHTML(p, i)).join('');

  const topHTML = TOP_COLLABS.map((a, i) => `
    <div class="zc-top-item">
      <div class="zc-top-num">${String(i+1).padStart(2,'0')}</div>
      <div class="zc-top-av" style="background:${a.bg}">${ini(a.name)}</div>
      <div class="zc-top-info">
        <div class="zc-top-name">${a.name}</div>
        <div class="zc-top-collabs"><strong>${a.collabs}</strong> фита</div>
      </div>
    </div>
  `).join('');

  return `
  <div class="zc-hero">
    <div class="zc-hero-top">
      <div>
        <div class="zc-hero-label">ZARBA Music Ecosystem</div>
        <div class="zc-hero-title">Z-<span>COLLAB</span></div>
        <div class="zc-hero-sub">
          Студия в кармане. Загрузи куплет - найди партнёра.<br>
          Только реальная запись. Только живой голос.
        </div>
      </div>
      <div class="zc-hero-stats">
        <div class="zc-hstat">
          <div class="zc-hstat-n live"><span class="zc-live-dot"></span>6</div>
          <div class="zc-hstat-l">Активных постов</div>
        </div>
        <div class="zc-hstat">
          <div class="zc-hstat-n">37</div>
          <div class="zc-hstat-l">Демок отправлено</div>
        </div>
        <div class="zc-hstat">
          <div class="zc-hstat-n">14</div>
          <div class="zc-hstat-l">Фитов найдено</div>
        </div>
      </div>
    </div>
  </div>

  <div class="zc-toolbar">
    <button class="zc-filter-btn on" data-filter="all">Все</button>
    <button class="zc-filter-btn" data-filter="open">Ищут фит</button>
    <button class="zc-filter-btn closed" data-filter="closed">Найдено</button>
    <div class="zc-spacer"></div>
    <select class="zc-sel" id="zc-genre-sel">
      <option value="">Все жанры</option>
      <option>РЭП</option>
      <option>ТРЭП</option>
      <option>ЛИРИКА</option>
      <option>ПОЭТЕССА</option>
   
      <option>КАЛЬЯННЫЙ</option>
    </select>
    <select class="zc-sel" id="zc-city-sel">
      <option value="">Все города</option>
      <option>Душанбе</option>
      <option>Худжанд</option>
      <option>Куляб</option>
      <option>Хорог</option>
    </select>
  </div>

  <div class="zc-layout">
    <div class="zc-feed" id="zc-feed">${feedHTML}</div>

    <div class="zc-sidebar">
      <div class="zc-sb-section">
        <div class="zc-sb-title">Топ по коллабам</div>
        ${topHTML}
      </div>
      <div class="zc-sb-section">
        <div class="zc-sb-title">Правила</div>
        <div class="zc-rule"><div class="zc-rule-num">01</div><div class="zc-rule-text">Только 1 куплет или интро — макс. 1 минута аудио</div></div>
        <div class="zc-rule"><div class="zc-rule-num">02</div><div class="zc-rule-text">Читай описание — автор написал что именно ищет</div></div>
        <div class="zc-rule"><div class="zc-rule-num">03</div><div class="zc-rule-text">Запись голоса прямо в браузере или загрузи mp3/wav</div></div>
        <div class="zc-rule"><div class="zc-rule-num">04</div><div class="zc-rule-text">Автор слушает всё сам — он решает, кто залетит</div></div>
        <div class="zc-rule"><div class="zc-rule-num">05</div><div class="zc-rule-text">Принят? Открывается личный чат. Нет — уходит в архив</div></div>
      </div>
      <div class="zc-sb-section">
        <div class="zc-sb-title">Статус постов</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:3px;height:32px;background:var(--red)"></div>
            <div>
              <div style="font-family:var(--mono);font-size:9px;letter-spacing:3px;color:var(--red);text-transform:uppercase">Ищет фит</div>
              <div style="font-family:var(--mono);font-size:9px;letter-spacing:2px;color:#333;margin-top:3px">Открыт для записи демки</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:3px;height:32px;background:#00E676"></div>
            <div>
              <div style="font-family:var(--mono);font-size:9px;letter-spacing:3px;color:#00E676;text-transform:uppercase">Найден партнёр</div>
              <div style="font-family:var(--mono);font-size:9px;letter-spacing:2px;color:#333;margin-top:3px">Фит закрыт, работа идёт</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:3px;height:32px;background:#1e1e1e"></div>
            <div>
              <div style="font-family:var(--mono);font-size:9px;letter-spacing:3px;color:#333;text-transform:uppercase">Архив</div>
              <div style="font-family:var(--mono);font-size:9px;letter-spacing:2px;color:#222;margin-top:3px">Пост закрыт автором</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="zc-modal-bg" id="zc-modal-bg">
    <div class="zc-modal" id="zc-modal">
      <div class="zc-modal-head">
        <div>
          <div class="zc-modal-title">ЗАПИСАТЬ ПАРТ</div>
          <div class="zc-modal-sub" id="zc-modal-for">Для: —</div>
        </div>
        <button class="zc-modal-close" id="zc-modal-close">✕</button>
      </div>
      <div class="zc-modal-body" id="zc-modal-body">
        <div class="zc-modal-orig">
          <div>
            <div class="zc-modal-orig-label">Оригинальный трек автора</div>
            <div class="zc-modal-orig-name" id="zc-orig-title">—</div>
          </div>
          <button class="zc-play-btn" id="zc-orig-play" style="margin-left:auto;flex-shrink:0">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </button>
        </div>

        <div class="zc-upload-area" id="zc-upload-area">
          <input type="file" id="zc-file-input" accept="audio/*">
          <div class="zc-upload-text">
            <strong>📁 Загрузить аудио</strong>
            MP3 / WAV · Максимум 1 минута
          </div>
        </div>

        <div class="zc-limit-bar">
          <div class="zc-limit-track"><div class="zc-limit-fill" id="zc-limit-fill"></div></div>
          <div class="zc-limit-text" id="zc-limit-text">0:00 / 1:00</div>
        </div>

        <button class="zc-submit-btn" id="zc-submit-btn" disabled>
          ОТПРАВИТЬ ДЕМКУ АРТИСТУ
        </button>
      </div>

      <div class="zc-success" id="zc-success">
        <div class="zc-success-icon">🎤</div>
        <div class="zc-success-title">ДЕМКА ОТПРАВЛЕНА</div>
        <div class="zc-success-sub">
          Артист получит уведомление.<br>
          Если одобрит — откроется личный чат.<br>
          Если нет — тебе придёт ответ.
        </div>
      </div>
    </div>
  </div>

  <div class="zc-toast" id="zc-toast">
    <div class="zc-toast-title" id="zc-toast-title"></div>
    <div class="zc-toast-msg" id="zc-toast-msg"></div>
  </div>
  `;
}

function cardHTML(p, i) {
  const statusClass = p.status === 'open' ? 'open-post' : p.status === 'found' ? 'open-post' : 'closed-post';
  const badgeText = p.status === 'open' ? 'ИЩЕТ ФИТ' : p.status === 'found' ? 'ФИТ НАЙДЕН' : 'АРХИВ';
  const badgeClass = p.status === 'open' ? 'seeking' : p.status === 'found' ? 'found' : 'closed-badge';
  const btnDisabled = p.status !== 'open' ? 'disabled' : '';
  const btnText = p.status === 'open' ? '🎤 Сделаем фит' : p.status === 'found' ? 'Партнёр найден' : 'Закрыто';

  // Генерируем данные волны для canvas
  const waveData = Array.from({length:80}, (_,j) => {
    return 0.15 + Math.abs(Math.sin(j*0.7 + p.id*1.3) * 0.5 + Math.sin(j*0.3 + p.id*0.7) * 0.3 + Math.sin(j*1.1 + p.id*0.4) * 0.15);
  });
  const waveDataStr = waveData.map(v => v.toFixed(3)).join(',');

  return `
<div class="zc-card ${statusClass}" data-id="${p.id}" style="animation-delay:${i*0.07}s">
  <div class="zc-card-head">
    <div class="zc-avatar${p.hof?' hof':''}" style="background:${p.bg}">${ini(p.artist)}</div>
<div class="zc-artist-info">
  <div class="zc-artist-name">${p.artist}</div>
</div>
    <div class="zc-status-badge ${badgeClass}">${badgeText}</div>
  </div>

  <div class="zc-audio-block">
    <button class="zc-play-btn" data-postid="${p.id}">
      <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
    </button>
<div class="zc-audio-info">
  <div class="zc-audio-title">${p.trackTitle}</div>
  <div class="zc-audio-meta">
    <span>ДЕМКА</span>
    <span class="zc-sep">·</span>
    <span>${p.seeking.toUpperCase()}</span>
  </div>
</div>
    <div class="zc-waveform" data-wave="${waveDataStr}">
      <canvas class="zc-wave-canvas"></canvas>
    </div>
    <div class="zc-audio-dur">${p.duration}</div>
  </div>

  <div class="zc-desc">${formatComment(p.comment)}</div>

  <div class="zc-tags">
    <span class="zc-tag genre">${p.genre}</span>
    <span class="zc-tag city">${p.city}</span>
    <span class="zc-tag">Ищет: ${p.seeking}</span>
  </div>

  <div class="zc-actions">
    <button class="zc-btn-fit" data-postid="${p.id}" ${btnDisabled}>
      <span>${btnText}</span>
    </button>
    <div class="zc-demos-count">
      <strong>${p.demos}</strong> демок получено
    </div>
    <div class="zc-time-ago">${p.timeAgo}</div>
  </div>
</div>`;
}

function formatComment(text) {
  return text.replace(/кто залетит на фит\?/gi, '<strong>кто залетит на фит?</strong>');
}

// ─── LOGIC ────────────────────────────────────────────────────
function initLogic(el) {
  let activePostId = null;

  // ── Фильтрация ──
  const feed = el.querySelector('#zc-feed');
  const filterBtns = el.querySelectorAll('.zc-filter-btn');
  const genreSel = el.querySelector('#zc-genre-sel');
  const citySel = el.querySelector('#zc-city-sel');

  function applyFilters() {
    const activeFilter = el.querySelector('.zc-filter-btn.on')?.dataset.filter || 'all';
    const genre = genreSel.value;
    const city = citySel.value;

    el.querySelectorAll('.zc-card').forEach(card => {
      const id = +card.dataset.id;
      const post = POSTS.find(p => p.id === id);
      let show = true;
      if (activeFilter === 'open' && post.status !== 'open') show = false;
      if (activeFilter === 'closed' && post.status === 'open') show = false;
      if (genre && post.genre !== genre) show = false;
      if (city && post.city !== city) show = false;
      card.style.display = show ? '' : 'none';
    });
  }

  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    applyFilters();
  }));
  genreSel.addEventListener('change', applyFilters);
  citySel.addEventListener('change', applyFilters);

  // ── Canvas Visualizer Engine ──
  const activeAnimations = new Map(); // postId -> {rafId, progress, startTime, duration}

  function initCanvases() {
    el.querySelectorAll('.zc-waveform[data-wave]').forEach(wfEl => {
      const canvas = wfEl.querySelector('.zc-wave-canvas');
      if (!canvas) return;
      const waveData = wfEl.dataset.wave.split(',').map(Number);
      const card = wfEl.closest('.zc-card');
      const postId = card?.dataset.id;
      
      // Set canvas resolution
      const resizeCanvas = () => {
        const dpr = window.devicePixelRatio || 1;
        const rect = wfEl.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        drawWave(canvas, waveData, 0, false, false);
      };
      
      resizeCanvas();
      new ResizeObserver(resizeCanvas).observe(wfEl);
      
      // Click on wave to seek
      canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const progress = (e.clientX - rect.left) / rect.width;
        const state = activeAnimations.get(postId);
        if (state) {
          state.progress = progress;
          state.startTime = performance.now() - progress * state.duration;
        }
      });
    });
  }

  function drawWave(canvas, waveData, progress, isPlaying, isPulsing) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    
    ctx.clearRect(0, 0, W, H);
    
    const bars = waveData.length;
    const barW = (W - (bars - 1) * 1.5) / bars;
    const barGap = 1.5;
    const maxH = H * 0.92;
    const midY = H / 2;
    
    for (let i = 0; i < bars; i++) {
      const x = i * (barW + barGap);
      const barProgress = i / bars;
      const isPlayed = barProgress < progress;
      const amp = waveData[i];
      const bH = Math.max(2, amp * maxH);
      
      // Pulse animation on playing bars
      let pulseAmp = 1;
      if (isPlaying && isPlayed) {
        const nearHead = Math.abs(barProgress - progress) < 0.05;
        pulseAmp = nearHead ? 1 + Math.sin(Date.now() * 0.015 + i * 0.8) * 0.35 : 1;
      }
      
      const finalH = bH * pulseAmp;
      const y = midY - finalH / 2;
      
      if (isPlayed) {
        // Played: hot gradient glow
        const grad = ctx.createLinearGradient(x, y, x, y + finalH);
        grad.addColorStop(0, 'rgba(255,100,0,1)');
        grad.addColorStop(0.5, 'rgba(255,69,0,0.9)');
        grad.addColorStop(1, 'rgba(200,30,0,0.7)');
        ctx.fillStyle = grad;
        
        // Glow effect for played bars
        ctx.shadowColor = 'rgba(255,69,0,0.6)';
        ctx.shadowBlur = isPlaying ? 8 : 4;
      } else {
        // Unplayed
        const alpha = 0.12 + amp * 0.15;
        ctx.fillStyle = `rgba(80,80,80,${alpha})`;
        ctx.shadowBlur = 0;
      }
      
      // Rounded bars
      const radius = Math.min(barW / 2, 2);
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, barW, finalH, radius);
      } else {
        ctx.rect(x, y, barW, finalH);
      }
      ctx.fill();
    }
    
    ctx.shadowBlur = 0;
    
    // Playhead needle
    if (isPlaying || progress > 0) {
      const headX = progress * W;
      const grad = ctx.createLinearGradient(headX, 0, headX, H);
      grad.addColorStop(0, 'rgba(255,120,0,0)');
      grad.addColorStop(0.3, 'rgba(255,69,0,0.9)');
      grad.addColorStop(0.7, 'rgba(255,69,0,0.9)');
      grad.addColorStop(1, 'rgba(255,120,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(headX - 1, 0, 2, H);
      
      // Playhead dot
      if (isPlaying) {
        ctx.beginPath();
        ctx.arc(headX, midY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#FF6B00';
        ctx.shadowColor = 'rgba(255,69,0,0.9)';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  }

  function animateWave(postId) {
    const card = el.querySelector(`.zc-card[data-id="${postId}"]`);
    if (!card) return;
    const wfEl = card.querySelector('.zc-waveform[data-wave]');
    const canvas = wfEl?.querySelector('.zc-wave-canvas');
    if (!canvas) return;
    const waveData = wfEl.dataset.wave.split(',').map(Number);
    
    const state = activeAnimations.get(postId);
    if (!state) return;
    
    const now = performance.now();
    const elapsed = now - state.startTime;
    state.progress = Math.min(elapsed / state.duration, 1);
    
    drawWave(canvas, waveData, state.progress, true, true);
    
    if (state.progress < 1 && activeAnimations.has(postId)) {
      state.rafId = requestAnimationFrame(() => animateWave(postId));
    } else {
      // Finished
      stopWave(postId);
      const btn = card.querySelector('.zc-play-btn');
      if (btn) {
        btn.classList.remove('playing');
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
      }
      drawWave(canvas, waveData, 0, false, false);
    }
  }

  function stopWave(postId) {
    const state = activeAnimations.get(postId);
    if (state) {
      cancelAnimationFrame(state.rafId);
      activeAnimations.delete(postId);
    }
    // Reset canvas
    const card = el.querySelector(`.zc-card[data-id="${postId}"]`);
    const wfEl = card?.querySelector('.zc-waveform[data-wave]');
    const canvas = wfEl?.querySelector('.zc-wave-canvas');
    if (canvas && wfEl) {
      const waveData = wfEl.dataset.wave.split(',').map(Number);
      drawWave(canvas, waveData, 0, false, false);
    }
  }

  function stopAllWaves() {
    const ids = [...activeAnimations.keys()];
    ids.forEach(id => stopWave(id));
    el.querySelectorAll('.zc-play-btn[data-postid]').forEach(b => {
      b.classList.remove('playing');
      b.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    });
  }

  // Init canvases after DOM is ready
  setTimeout(initCanvases, 0);

  // ── Play button handler ──
  el.querySelectorAll('.zc-play-btn[data-postid]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const postId = btn.dataset.postid;
      const isPlaying = btn.classList.contains('playing');
      
      stopAllWaves();
      
      if (!isPlaying) {
        btn.classList.add('playing');
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
        
        const post = POSTS.find(p => String(p.id) === postId);
        const durationStr = post?.duration || '1:30';
        const [mm, ss] = durationStr.split(':').map(Number);
        const durationMs = (mm * 60 + ss) * 1000;
        
        const startTime = performance.now();
        activeAnimations.set(postId, {
          rafId: null,
          progress: 0,
          startTime,
          duration: durationMs
        });
        animateWave(postId);
      }
    });
  });

  // ── Кнопка "Сделаем фит" ──
  const modalBg = el.querySelector('#zc-modal-bg');
  const modalClose = el.querySelector('#zc-modal-close');
  const modalFor = el.querySelector('#zc-modal-for');
  const origTitle = el.querySelector('#zc-orig-title');
  const fileInput = el.querySelector('#zc-file-input');
  const limitFill = el.querySelector('#zc-limit-fill');
  const limitText = el.querySelector('#zc-limit-text');
  const submitBtn = el.querySelector('#zc-submit-btn');
  const successBlock = el.querySelector('#zc-success');
  const modalBody = el.querySelector('#zc-modal-body');

  function openModal(postId) {
    const post = POSTS.find(p => p.id === postId);
    if (!post) return;
    activePostId = postId;
    modalFor.textContent = 'Для: ' + post.artist + ' · ' + post.seeking;
    origTitle.textContent = post.trackTitle;
    submitBtn.disabled = true;
    limitFill.style.width = '0%';
    limitText.textContent = '0:00 / 1:00';
    fileInput.value = '';
    successBlock.classList.remove('show');
    modalBody.style.display = '';
    modalBg.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBg.classList.remove('open');
    document.body.style.overflow = '';
    activePostId = null;
  }

  el.querySelectorAll('.zc-btn-fit:not([disabled])').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(+btn.dataset.postid);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalBg.addEventListener('click', e => { if (e.target === modalBg) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ── Загрузка файла ──
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    const audio = new Audio(URL.createObjectURL(file));
    audio.addEventListener('loadedmetadata', () => {
      const dur = audio.duration;
      const maxSec = 60;
      const pct = Math.min((dur / maxSec) * 100, 100);
      const overLimit = dur > maxSec + 5;
      limitFill.style.width = pct + '%';
      limitFill.className = 'zc-limit-fill' + (overLimit ? ' over' : pct > 90 ? ' warn' : '');
      const mm = Math.floor(dur / 60);
      const ss = String(Math.floor(dur % 60)).padStart(2, '0');
      limitText.textContent = `${mm}:${ss} / 1:00`;
      if (overLimit) {
        showToast('Слишком длинно', 'Максимум 1 минута. Обрежь трек.', 'red');
        submitBtn.disabled = true;
      } else {
        submitBtn.disabled = false;
      }
    });
  });

  // ── Отправка ──
  submitBtn.addEventListener('click', () => {
    if (!fileInput.files[0]) return;
    submitBtn.disabled = true;
    submitBtn.textContent = 'ОТПРАВЛЯЕТСЯ...';
    setTimeout(() => {
      modalBody.style.display = 'none';
      successBlock.classList.add('show');
      const post = POSTS.find(p => p.id === activePostId);
      if (post) post.demos++;
      // Обновить счётчик в карточке
      el.querySelector(`.zc-card[data-id="${activePostId}"] .zc-demos-count`)
        ?.querySelector('strong')
        && (el.querySelector(`.zc-card[data-id="${activePostId}"] .zc-demos-count strong`).textContent = String(POSTS.find(p=>p.id===activePostId)?.demos));
      setTimeout(closeModal, 3000);
      showToast('Демка отправлена!', 'Артист получит уведомление', 'green');
    }, 1200);
  });

  // ── Toast ──
  function showToast(title, msg, type='red') {
    const toast = el.querySelector('#zc-toast') || document.getElementById('zc-toast');
    if (!toast) return;
    toast.querySelector('#zc-toast-title').textContent = title;
    toast.querySelector('#zc-toast-msg').textContent = msg;
    toast.className = 'zc-toast' + (type === 'green' ? ' green' : '');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }
}

// 🔴 ПРОБРАСЫВАЕМ ФУНКЦИЮ В ГЛОБАЛЬНУЮ СРЕДУ
window.renderCollab = renderCollab;

})();