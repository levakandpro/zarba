// ============================================================
//  ZARBA — ТОП 100 Charts Module
//  Путь: js/pages/charts.js
//  БЕЗ ES modules — глобальная функция renderCharts
// ============================================================

function renderCharts(container) {
  // Удаляем старый CSS
  const old = document.getElementById('c-css');
  if (old) old.remove();

  container.innerHTML = getChartsHTML();
  injectChartsCSS();
  initChartPlayers(container);
}

// ─── HTML ────────────────────────────────────────────────────
function getChartsHTML() {
  return `
    <svg style="display:none">
      <symbol id="c-ico-music" viewBox="0 0 24 24"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></symbol>
      <symbol id="c-ico-play"  viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></symbol>
      <symbol id="c-ico-dl"    viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></symbol>
      <symbol id="c-ico-add"   viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></symbol>
    </svg>

    <div id="c-page">
      <section class="c-hero">
        <div class="c-hero-grid"></div>
        <div class="c-hero-spot"></div>
        <div class="c-hero-year">2026</div>
        <div class="c-hero-meta">
          <div class="c-mline"></div>
          <span class="c-mtext">ZARBA Music Ecosystem &nbsp;·&nbsp; Официальный Чарт</span>
          <div class="c-mline"></div>
        </div>
        <h2 class="c-hero-title">
          <span class="c-t-top">Хиты</span>
          <span class="c-t-num">ТОП 100</span>
        </h2>
        <p class="c-hero-sub">Рейтинг формируется на основе <strong>прослушиваний</strong> и <strong>фан-базы</strong></p>
        <div class="c-stats">
          <div class="c-stat"><div class="c-snum">100</div><div class="c-slbl">Треков</div></div>
          <div class="c-sdiv"></div>
          <div class="c-stat"><div class="c-snum">2.4M</div><div class="c-slbl">Прослушиваний</div></div>
          <div class="c-sdiv"></div>
          <div class="c-stat"><div class="c-snum">68</div><div class="c-slbl">Артистов</div></div>
          <div class="c-sdiv"></div>
          <div class="c-stat"><div class="c-snum"><span class="c-live-dot"></span></div><div class="c-slbl">Live</div></div>
        </div>
        <div class="c-scanline"></div>
      </section>

      <div class="c-thdr">
        <div class="c-thdr-l">
          <span class="c-tlbl">Чарт недели</span>
          <span class="c-tupd">Обновлён 05.03.2026</span>
        </div>
        <span class="c-live-tag">● LIVE Rankings</span>
      </div>

      <div class="c-clbls">
        <span style="text-align:center">#</span>
        <span></span>
        <span style="padding-left:16px">Трек / Артист</span>
        <span style="padding-left:8px">Плеер</span>
        <span style="text-align:center">Тренд</span>
        <span style="text-align:right;padding-right:8px">Слушают</span>
        <span style="text-align:right;padding-right:4px">Действия</span>
      </div>

      <div class="c-list" id="c-list"></div>
    </div>
  `;
}

// ─── DATA ────────────────────────────────────────────────────
const CHART_TRACKS = [
  { name:"Скажи Что Думаешь",  artist:"MC Artisan",    plays:"248К", trend:"up",   delta:2 },
  { name:"Ночной Город",        artist:"Hustle Takir",  plays:"211К", trend:"down", delta:1 },
  { name:"Улицы Мои",           artist:"Young Flow",    plays:"198К", trend:"up",   delta:5 },
  { name:"Душанбе Рулит",       artist:"Street Genius", plays:"187К", trend:"up",   delta:1 },
  { name:"Холодная Ночь",       artist:"Taj Flow",      plays:"175К", trend:"down", delta:3 },
  { name:"На Вершине",          artist:"Alpha One",     plays:"162К", trend:"up",   delta:4 },
  { name:"Горный Воздух",       artist:"Real Beats",    plays:"154К", trend:"down", delta:2 },
  { name:"Без Тормозов",        artist:"City Boy",      plays:"143К", trend:"up",   delta:7 },
  { name:"Улица Зовёт",         artist:"Underground X", plays:"138К", trend:"up",   delta:3 },
  { name:"Последний Шанс",      artist:"Dark Poet",     plays:"129К", trend:"down", delta:1 },
  { name:"Рассвет Над Городом", artist:"Smoke Lyric",   plays:"121К", trend:"new",  delta:0 },
  { name:"Живой Звук",          artist:"Soul Beats",    plays:"115К", trend:"down", delta:4 },
  { name:"Огонь В Крови",       artist:"Dushanbe King", plays:"108К", trend:"up",   delta:6 },
  { name:"Тихий Шторм",         artist:"Navo Rap",      plays:"102К", trend:"up",   delta:2 },
  { name:"Без Правил",          artist:"Khujand MC",    plays:"96К",  trend:"down", delta:5 },
  { name:"Свободный Полёт",     artist:"Young Tajik",   plays:"91К",  trend:"new",  delta:0 },
  { name:"Дорога В Никуда",     artist:"Flow Dushanbe", plays:"87К",  trend:"up",   delta:3 },
  { name:"Снова В Бой",         artist:"Rap Kurgan",    plays:"83К",  trend:"down", delta:2 },
  { name:"Горизонт",            artist:"Sughd MC",      plays:"79К",  trend:"up",   delta:1 },
  { name:"Контроль",            artist:"Drip Taj",      plays:"75К",  trend:"down", delta:3 },
  { name:"Закат",               artist:"Raw Verse",     plays:"72К",  trend:"up",   delta:8 },
  { name:"Вечный Бой",          artist:"Soul Drop",     plays:"68К",  trend:"down", delta:1 },
  { name:"Прорыв",              artist:"New Era TJ",    plays:"65К",  trend:"new",  delta:0 },
  { name:"Тень Города",         artist:"MC Artisan",    plays:"62К",  trend:"up",   delta:4 },
  { name:"Брат",                artist:"Hustle Takir",  plays:"59К",  trend:"down", delta:6 },
  { name:"Точка Отсчёта",       artist:"Lyriq TJ",      plays:"57К",  trend:"up",   delta:2 },
  { name:"Первый Раунд",        artist:"Rookie Flow",   plays:"54К",  trend:"up",   delta:5 },
  { name:"Страница Один",       artist:"Zero Hour",     plays:"51К",  trend:"down", delta:2 },
  { name:"Без Лишних Слов",     artist:"City Boy",      plays:"49К",  trend:"up",   delta:3 },
  { name:"Грани",               artist:"Young Flow",    plays:"47К",  trend:"down", delta:1 },
  { name:"Алмаз",               artist:"Street Genius", plays:"45К",  trend:"up",   delta:9 },
  { name:"Дым",                 artist:"Taj Flow",      plays:"43К",  trend:"new",  delta:0 },
  { name:"Нет Пути Назад",      artist:"Alpha One",     plays:"41К",  trend:"up",   delta:2 },
  { name:"Холод",               artist:"Real Beats",    plays:"39К",  trend:"down", delta:4 },
  { name:"Вершина",             artist:"Dark Poet",     plays:"38К",  trend:"up",   delta:1 },
  { name:"Свой Мир",            artist:"Smoke Lyric",   plays:"36К",  trend:"down", delta:3 },
  { name:"Металл",              artist:"Underground X", plays:"35К",  trend:"up",   delta:6 },
  { name:"Глубина",             artist:"Soul Beats",    plays:"33К",  trend:"down", delta:2 },
  { name:"Кровь И Пот",         artist:"Navo Rap",      plays:"32К",  trend:"new",  delta:0 },
  { name:"Сила",                artist:"Dushanbe King", plays:"31К",  trend:"up",   delta:3 },
  { name:"Молчание",            artist:"Khujand MC",    plays:"30К",  trend:"down", delta:1 },
  { name:"Звезда",              artist:"MC Artisan",    plays:"29К",  trend:"up",   delta:5 },
  { name:"Пустота",             artist:"Raw Verse",     plays:"28К",  trend:"down", delta:2 },
  { name:"Рассвет",             artist:"Young Tajik",   plays:"27К",  trend:"up",   delta:4 },
  { name:"Один",                artist:"Flow Dushanbe", plays:"26К",  trend:"down", delta:3 },
  { name:"Тишина",              artist:"Rap Kurgan",    plays:"25К",  trend:"up",   delta:2 },
  { name:"Без Маски",           artist:"Sughd MC",      plays:"24К",  trend:"new",  delta:0 },
  { name:"Настоящий",           artist:"Drip Taj",      plays:"23К",  trend:"up",   delta:7 },
  { name:"Боль",                artist:"Soul Drop",     plays:"22К",  trend:"down", delta:4 },
  { name:"Ритм",                artist:"New Era TJ",    plays:"21К",  trend:"up",   delta:1 },
  { name:"Свет",                artist:"Lyriq TJ",      plays:"20.5К",trend:"down", delta:2 },
  { name:"Ночь",                artist:"Rookie Flow",   plays:"20К",  trend:"up",   delta:3 },
  { name:"Мечта",               artist:"Zero Hour",     plays:"19.5К",trend:"down", delta:1 },
  { name:"Победа",              artist:"City Boy",      plays:"19К",  trend:"up",   delta:5 },
  { name:"Закон Улиц",          artist:"Young Flow",    plays:"18.5К",trend:"new",  delta:0 },
  { name:"Память",              artist:"Street Genius", plays:"18К",  trend:"down", delta:3 },
  { name:"Путь Домой",          artist:"Hustle Takir",  plays:"17.5К",trend:"up",   delta:2 },
  { name:"Реальность",          artist:"Taj Flow",      plays:"17К",  trend:"down", delta:4 },
  { name:"Кайф",                artist:"Alpha One",     plays:"16.5К",trend:"up",   delta:1 },
  { name:"Чёрный Снег",         artist:"Real Beats",    plays:"16К",  trend:"down", delta:2 },
  { name:"Инстинкт",            artist:"Dark Poet",     plays:"15.5К",trend:"up",   delta:6 },
  { name:"Дорогой Брат",        artist:"MC Artisan",    plays:"15К",  trend:"down", delta:3 },
  { name:"Огонь",               artist:"Smoke Lyric",   plays:"14.5К",trend:"up",   delta:4 },
  { name:"Камень",              artist:"Underground X", plays:"14К",  trend:"new",  delta:0 },
  { name:"Воздух",              artist:"Soul Beats",    plays:"13.5К",trend:"down", delta:1 },
  { name:"Честно",              artist:"Navo Rap",      plays:"13К",  trend:"up",   delta:3 },
  { name:"Завтра",              artist:"Dushanbe King", plays:"12.5К",trend:"down", delta:5 },
  { name:"Эхо",                 artist:"Khujand MC",    plays:"12К",  trend:"up",   delta:2 },
  { name:"Опять",               artist:"Young Tajik",   plays:"11.5К",trend:"down", delta:2 },
  { name:"Сейчас",              artist:"Flow Dushanbe", plays:"11К",  trend:"new",  delta:0 },
  { name:"Здесь",               artist:"Rap Kurgan",    plays:"10.8К",trend:"up",   delta:1 },
  { name:"Там",                 artist:"Sughd MC",      plays:"10.5К",trend:"down", delta:3 },
  { name:"Навсегда",            artist:"Drip Taj",      plays:"10.2К",trend:"up",   delta:4 },
  { name:"Первый",              artist:"Raw Verse",     plays:"10К",  trend:"down", delta:1 },
  { name:"Последний",           artist:"Soul Drop",     plays:"9.8К", trend:"up",   delta:2 },
  { name:"Тысяча",              artist:"New Era TJ",    plays:"9.5К", trend:"down", delta:4 },
  { name:"Миллион",             artist:"Lyriq TJ",      plays:"9.2К", trend:"new",  delta:0 },
  { name:"Ноль",                artist:"Rookie Flow",   plays:"9К",   trend:"up",   delta:3 },
  { name:"Чёрное Солнце",       artist:"Zero Hour",     plays:"8.8К", trend:"down", delta:2 },
  { name:"Красная Линия",       artist:"City Boy",      plays:"8.5К", trend:"up",   delta:5 },
  { name:"Дождь",               artist:"Young Flow",    plays:"8.2К", trend:"down", delta:1 },
  { name:"Снег",                artist:"Street Genius", plays:"8К",   trend:"up",   delta:2 },
  { name:"Лёд",                 artist:"Hustle Takir",  plays:"7.8К", trend:"new",  delta:0 },
  { name:"Пламя",               artist:"Taj Flow",      plays:"7.5К", trend:"down", delta:3 },
  { name:"Гром",                artist:"Alpha One",     plays:"7.3К", trend:"up",   delta:4 },
  { name:"Молния",              artist:"Real Beats",    plays:"7К",   trend:"down", delta:2 },
  { name:"Буря",                artist:"Dark Poet",     plays:"6.8К", trend:"up",   delta:1 },
  { name:"Штиль",               artist:"Smoke Lyric",   plays:"6.6К", trend:"down", delta:5 },
  { name:"Гора",                artist:"Underground X", plays:"6.4К", trend:"up",   delta:3 },
  { name:"Река",                artist:"Soul Beats",    plays:"6.2К", trend:"new",  delta:0 },
  { name:"Лес",                 artist:"Navo Rap",      plays:"6К",   trend:"down", delta:1 },
  { name:"Степь",               artist:"Dushanbe King", plays:"5.8К", trend:"up",   delta:2 },
  { name:"Облако",              artist:"Khujand MC",    plays:"5.6К", trend:"down", delta:3 },
  { name:"Туман",               artist:"MC Artisan",    plays:"5.4К", trend:"up",   delta:6 },
  { name:"Небо",                artist:"Young Tajik",   plays:"5.2К", trend:"down", delta:2 },
  { name:"Земля",               artist:"Flow Dushanbe", plays:"5К",   trend:"new",  delta:0 },
  { name:"Звук",                artist:"Rap Kurgan",    plays:"4.8К", trend:"up",   delta:1 },
  { name:"Слово",               artist:"Sughd MC",      plays:"4.6К", trend:"down", delta:4 },
  { name:"Взгляд",              artist:"Drip Taj",      plays:"4.4К", trend:"up",   delta:2 },
  { name:"Начало",              artist:"Raw Verse",     plays:"4.2К", trend:"up",   delta:3 },
];

const CHART_GRADIENTS = [
  'linear-gradient(160deg,#0f0f0f,#1a1514)',
  'linear-gradient(160deg,#0a0d14,#0f1620)',
  'linear-gradient(160deg,#100a0a,#1e1010)',
  'linear-gradient(160deg,#0d0a14,#131020)',
  'linear-gradient(160deg,#0a100a,#101a10)',
  'linear-gradient(160deg,#100a0e,#1a1018)',
  'linear-gradient(160deg,#0d1008,#141e10)',
  'linear-gradient(160deg,#0f0f0a,#1a1a10)',
];

// ─── CSS ─────────────────────────────────────────────────────
function injectChartsCSS() {
  const s = document.createElement('style');
  s.id = 'c-css';
  s.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;}

#c-page {
  background: #080808;
  color: #f0f0f0;
  font-family: 'Rajdhani', sans-serif;
  min-height: 100vh;
  padding-bottom: 120px;
  --acc: #FF4500;
  --gold: #FFD700;
  --mono: 'JetBrains Mono', monospace;
  --disp: 'Bebas Neue', sans-serif;
}

/* ── HERO ── */
.c-hero {
  position: relative;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 80px 40px 60px;
}
.c-hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,69,0,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,69,0,.04) 1px, transparent 1px);
  background-size: 80px 80px;
  animation: cGrid 20s linear infinite;
}
@keyframes cGrid { to { transform: translateY(80px); } }
.c-hero-spot {
  position: absolute; top: -200px; left: 50%; transform: translateX(-50%);
  width: 800px; height: 600px;
  background: radial-gradient(ellipse, rgba(255,69,0,.15) 0%, transparent 70%);
  pointer-events: none;
}
.c-hero::before, .c-hero::after {
  content: ''; position: absolute; top: 0; bottom: 0; width: 2px;
  background: linear-gradient(transparent, #FF4500, transparent); opacity: .3;
}
.c-hero::before { left: 10%; } .c-hero::after { right: 10%; }
.c-hero-year {
  position: absolute;
  font-family: var(--disp);
  font-size: clamp(180px, 25vw, 340px);
  color: rgba(255,69,0,.04);
  letter-spacing: -10px;
  user-select: none; pointer-events: none; line-height: 1;
}
.c-hero-meta {
  position: relative;
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 20px;
  animation: cFD .8s ease both;
}
.c-mline { width: 40px; height: 1px; background: #FF4500; opacity: .7; }
.c-mtext { font-family: var(--mono); font-size: 11px; letter-spacing: 4px; color: #FF4500; text-transform: uppercase; }
.c-hero-title {
  position: relative;
  font-family: var(--disp);
  font-size: clamp(64px, 11vw, 150px);
  line-height: .9; text-align: center;
  animation: cFD .9s .1s ease both;
}
.c-t-top { display: block; color: #fff; letter-spacing: 8px; }
.c-t-num { display: block; color: #FF4500; letter-spacing: -4px; text-shadow: 0 0 80px rgba(255,69,0,.5); }
.c-hero-sub {
  position: relative; margin-top: 24px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px; color: #555; letter-spacing: 2px;
  text-transform: uppercase; text-align: center;
  animation: cFD 1s .2s ease both;
}
.c-hero-sub strong { color: #FF4500; font-weight: 700; }
.c-stats {
  position: relative; display: flex; gap: 56px; margin-top: 40px;
  animation: cFD 1.1s .3s ease both;
}
.c-stat { text-align: center; }
.c-snum { font-family: var(--disp); font-size: 64px; color: #FF4500; line-height: 1; letter-spacing: 2px; }
.c-slbl { font-family: var(--mono); font-size: 11px; letter-spacing: 5px; color: #555; text-transform: uppercase; margin-top: 4px; }
.c-sdiv { width: 1px; background: linear-gradient(transparent, #1e1e1e, transparent); align-self: stretch; }
.c-live-dot {
  display: inline-block; width: 8px; height: 8px;
  background: #00E676; border-radius: 50%;
  box-shadow: 0 0 8px #00E676;
  animation: cBlink 1.4s infinite;
  vertical-align: middle;
}
@keyframes cBlink { 0%,100%{opacity:1;box-shadow:0 0 8px #00E676} 50%{opacity:.3;box-shadow:none} }
.c-scanline {
  position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, #FF4500, transparent);
  opacity: .4;
}
@keyframes cFD { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }

/* ── HEADER BAR ── */
.c-thdr {
  display: flex; align-items: center; justify-content: space-between;
  padding: 28px 56px 16px;
  border-bottom: 1px solid #111;
  position: relative;
}
.c-thdr::after {
  content: ''; position: absolute; bottom: 0; left: 56px; right: 56px; height: 1px;
  background: linear-gradient(90deg, transparent, #FF4500 30%, #FF4500 70%, transparent);
  opacity: .1;
}
.c-thdr-l { display: flex; align-items: center; gap: 16px; }
.c-tlbl { font-family: var(--mono); font-size: 11px; letter-spacing: 5px; color: #555; text-transform: uppercase; }
.c-tupd { font-family: var(--mono); font-size: 11px; color: #2a2a2a; letter-spacing: 2px; }
.c-live-tag {
  font-family: var(--mono); font-size: 10px; letter-spacing: 3px;
  color: #00E676; text-transform: uppercase;
}

/* ── COLUMN LABELS ── */
.c-clbls {
  display: grid;
  grid-template-columns: 56px 64px 1fr 160px 80px 90px 80px;
  padding: 10px 56px;
  border-bottom: 1px solid #0f0f0f;
  font-family: var(--mono); font-size: 9px; font-weight: 700;
  letter-spacing: 3px; color: #252525; text-transform: uppercase;
}

/* ── LIST ── */
.c-list { padding: 0 56px 80px; }

/* ── TRACK ROW ── */
.c-track {
  display: grid;
  grid-template-columns: 56px 64px 1fr 160px 80px 90px 80px;
  align-items: center;
  min-height: 76px;
  border-bottom: 1px solid rgba(255,255,255,.025);
  transition: background .2s, transform .2s;
  position: relative;
  animation: cFU .4s ease both;
  cursor: default;
}
@keyframes cFU { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
.c-track::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: #FF4500; opacity: 0; transition: opacity .2s;
}
.c-track:hover { background: rgba(255,69,0,.04); transform: translateX(3px); }
.c-track:hover::before { opacity: 1; }

/* TOP 3 glow */
.c-track[data-rank="1"] { background: linear-gradient(90deg, rgba(255,215,0,.06), transparent 60%); }
.c-track[data-rank="2"] { background: linear-gradient(90deg, rgba(192,192,192,.04), transparent 60%); }
.c-track[data-rank="3"] { background: linear-gradient(90deg, rgba(205,127,50,.05), transparent 60%); }

/* ── RANK ── */
.c-rank {
  font-family: var(--disp);
  font-size: 28px; text-align: center;
  color: #1e1e1e; line-height: 1; padding-left: 4px;
  transition: color .2s;
}
.c-track[data-rank="1"] .c-rank { color: #FFD700; text-shadow: 0 0 20px rgba(255,215,0,.5); font-size: 34px; }
.c-track[data-rank="2"] .c-rank { color: #C0C0C0; font-size: 30px; }
.c-track[data-rank="3"] .c-rank { color: #CD7F32; font-size: 30px; }
.c-track:hover .c-rank { color: #FF4500; }
.c-track[data-rank="1"]:hover .c-rank { color: #FFD700; }
.c-track[data-rank="2"]:hover .c-rank { color: #C0C0C0; }
.c-track[data-rank="3"]:hover .c-rank { color: #CD7F32; }

/* ── COVER ── */
.c-cover {
  position: relative; width: 48px; height: 48px;
  margin: 0 8px; overflow: hidden; cursor: pointer;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
}
.c-cover-bg {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  transition: transform .3s;
}
.c-cover:hover .c-cover-bg { transform: scale(1.05); }
.c-cover-bg svg { width: 22px; height: 22px; opacity: .6; filter: brightness(0) invert(1); }
.c-cover-ov {
  position: absolute; inset: 0;
  background: rgba(0,0,0,.65);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity .2s;
}
.c-cover:hover .c-cover-ov { opacity: 1; }
.c-cover-ov svg { width: 20px; height: 20px; fill: #fff; margin-left: 2px; }

/* ── TRACK INFO ── */
.c-info { padding: 0 16px; min-width: 0; }
.c-tname {
  font-family: var(--disp); font-size: 20px; letter-spacing: 1px;
  color: #ccc; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  line-height: 1.1; transition: color .2s;
}
.c-track:hover .c-tname { color: #fff; }
.c-track[data-rank="1"] .c-tname { color: #fff; font-size: 22px; }
.c-tartist {
  font-family: var(--mono); font-size: 10px; letter-spacing: 3px;
  color: #444; margin-top: 4px; text-transform: uppercase;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.c-track:hover .c-tartist { color: #FF4500; }

/* ── PLAYER ── */
.c-player { display: flex; align-items: center; gap: 8px; padding: 0 8px; }
.c-pbtn {
  width: 30px; height: 30px; border-radius: 50%;
  background: #FF4500; border: none; color: #fff;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  font-size: 11px; flex-shrink: 0;
  transition: background .2s, transform .15s;
  padding-left: 2px;
}
.c-pbtn:hover { background: #FF6B35; transform: scale(1.1); }
.c-sbtn {
  width: 28px; height: 28px; border-radius: 50%;
  background: #141414; border: 1px solid #2a2a2a;
  color: #FF4500; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; flex-shrink: 0;
  transition: background .2s;
}
.c-sbtn:hover { background: #1e1e1e; }
.c-ptime { font-family: var(--mono); font-size: 10px; color: #333; min-width: 28px; letter-spacing: 1px; }
.c-pbar {
  flex: 1; height: 2px; background: #1e1e1e; border-radius: 1px;
  cursor: pointer; position: relative; overflow: hidden; min-width: 40px;
}
.c-pfill {
  height: 100%; width: 0%;
  background: linear-gradient(90deg, #FF4500, #FF6B35);
  border-radius: 1px; transition: width .1s linear;
}

/* ── TREND ── */
.c-trend { text-align: center; font-size: 13px; font-weight: 900; font-family: 'Rajdhani', sans-serif; }
.c-up   { color: #00E676; text-shadow: 0 0 8px rgba(0,230,118,.4); }
.c-dn   { color: #FF4D4D; }
.c-nw   {
  display: inline-block;
  background: #FF4500; color: #fff;
  font-family: var(--mono); font-size: 8px; font-weight: 900;
  padding: 3px 7px; letter-spacing: 2px;
  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
}

/* ── PLAYS ── */
.c-plays { text-align: right; padding-right: 8px; }
.c-plays-n { font-family: var(--disp); font-size: 22px; color: #fff; line-height: 1; letter-spacing: 1px; }
.c-plays-l { font-family: var(--mono); font-size: 9px; color: #252525; text-transform: uppercase; letter-spacing: 2px; }

/* ── ACTIONS ── */
.c-acts { display: flex; align-items: center; justify-content: flex-end; gap: 6px; padding-right: 4px; }
.c-abtn {
  width: 30px; height: 30px;
  background: transparent; border: 1px solid #1a1a1a;
  color: #333; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  padding: 0; transition: all .2s;
  clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
}
.c-abtn svg { width: 13px; height: 13px; fill: currentColor; }
.c-abtn:hover { background: #FF4500; border-color: #FF4500; color: #fff; transform: translateY(-2px); }

/* ── RESPONSIVE ── */
@media(max-width: 900px) {
  .c-track, .c-clbls { grid-template-columns: 44px 56px 1fr 110px 60px 70px 56px; }
  .c-list, .c-thdr, .c-clbls { padding-left: 16px; padding-right: 16px; }
  .c-stats { gap: 28px; }
  .c-snum { font-size: 44px; }
}
@media(max-width: 600px) {
  .c-track { grid-template-columns: 36px 52px 1fr 48px 56px; }
  .c-clbls, .c-plays { display: none; }
}
  `;
  document.head.appendChild(s);
}

// ─── PLAYERS ─────────────────────────────────────────────────
function initChartPlayers(container) {
  const list = container.querySelector('#c-list');
  if (!list) return;

  let curAudio = null, curEl = null;
  const fmt = s => (isNaN(s) || !s) ? '0:00' : Math.floor(s/60) + ':' + String(Math.floor(s%60)).padStart(2,'0');

  const trendHTML = (t, d) =>
    t === 'new'  ? '<span class="c-nw">NEW</span>' :
    t === 'up'   ? `<span class="c-up">▲ ${d}</span>` :
    t === 'down' ? `<span class="c-dn">▼ ${d}</span>` :
                   '<span style="color:#333;font-size:16px">—</span>';

  CHART_TRACKS.forEach((track, i) => {
    const rank = i + 1;
    const src  = `audio/t${String(rank).padStart(2,'0')}.mp3`;
    const gb   = CHART_GRADIENTS[i % CHART_GRADIENTS.length];

    const row = document.createElement('div');
    row.className = 'c-track';
    row.setAttribute('data-rank', rank);
    row.style.animationDelay = Math.min(i * 0.015, 0.8) + 's';

    row.innerHTML = `
      <div class="c-rank">${rank}</div>
      <div class="c-cover">
        <div class="c-cover-bg" style="background:${gb}">
          <svg><use href="#c-ico-music"/></svg>
        </div>
        <div class="c-cover-ov"><svg><use href="#c-ico-play"/></svg></div>
      </div>
      <div class="c-info">
        <div class="c-tname">${track.name}</div>
        <div class="c-tartist">${track.artist}</div>
      </div>
      <div class="c-player">
        <button class="c-pbtn">▶</button>
        <button class="c-sbtn">⏹</button>
        <span class="c-ptime">0:00</span>
        <div class="c-pbar"><div class="c-pfill"></div></div>
      </div>
      <div class="c-trend">${trendHTML(track.trend, track.delta)}</div>
      <div class="c-plays">
        <div class="c-plays-n">${track.plays}</div>
        <div class="c-plays-l">слушают</div>
      </div>
      <div class="c-acts">
        <button class="c-abtn" title="Скачать"><svg><use href="#c-ico-dl"/></svg></button>
        <button class="c-abtn" title="В плейлист"><svg><use href="#c-ico-add"/></svg></button>
      </div>`;

    list.appendChild(row);

    const audio = new Audio(src);
    const pbtn  = row.querySelector('.c-pbtn');
    const sbtn  = row.querySelector('.c-sbtn');
    const fill  = row.querySelector('.c-pfill');
    const time  = row.querySelector('.c-ptime');
    const bar   = row.querySelector('.c-pbar');
    const cover = row.querySelector('.c-cover');
    let playing = false;

    const stopCurrent = () => {
      if (curAudio && curEl) {
        curAudio.pause(); curAudio.currentTime = 0;
        curEl.querySelector('.c-pbtn').textContent = '▶';
        curEl.querySelector('.c-pbtn').style.paddingLeft = '2px';
        curEl.querySelector('.c-pfill').style.width = '0%';
        curEl.querySelector('.c-ptime').textContent = '0:00';
      }
    };
    const play  = () => { stopCurrent(); audio.play(); playing = true; pbtn.textContent = '⏸'; pbtn.style.paddingLeft = '0'; curAudio = audio; curEl = row; };
    const pause = () => { audio.pause(); playing = false; pbtn.textContent = '▶'; pbtn.style.paddingLeft = '2px'; };
    const stop  = () => { audio.pause(); audio.currentTime = 0; playing = false; pbtn.textContent = '▶'; pbtn.style.paddingLeft = '2px'; fill.style.width = '0%'; time.textContent = '0:00'; };

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) fill.style.width = (audio.currentTime / audio.duration * 100) + '%';
      time.textContent = fmt(audio.currentTime);
    });
    audio.addEventListener('ended', stop);
    bar.addEventListener('click', e => {
      if (audio.duration) audio.currentTime = ((e.clientX - bar.getBoundingClientRect().left) / bar.offsetWidth) * audio.duration;
    });
    pbtn.addEventListener('click',  e => { e.stopPropagation(); playing ? pause() : play(); });
    sbtn.addEventListener('click',  e => { e.stopPropagation(); stop(); });
    cover.addEventListener('click', () => playing ? pause() : play());
  });
}