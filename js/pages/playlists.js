// ============================================================
//  ZARBA — PLAYLISTS PAGE (ПОЛНАЯ СИНХРОНИЗАЦИЯ С БАЗОЙ)
// ============================================================

(function () {

function renderPlaylists(container) {
  container.innerHTML = '';
  container.id = 'pl-page';
  injectCSS();
  container.innerHTML = getHTML();
  initLogic(container);
}

// ─── CSS (БЕЗ ИЗМЕНЕНИЙ) ──────────────────
function injectCSS() {
  document.getElementById('pl-styles')?.remove();
  const s = document.createElement('style');
  s.id = 'pl-styles';
  s.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

@font-face { font-family: 'fut'; src: url('assets/fonts/fut.ttf') format('truetype'); font-weight: normal; font-style: normal; }

.pl-page-bg { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
.pl-bg-orb { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.12; animation: pl-orb-float 20s infinite alternate ease-in-out; }
.orb-1 { width: 50vw; height: 50vw; background: var(--red); top: -10%; left: -10%; }
.orb-2 { width: 60vw; height: 60vw; background: #6a0dad; bottom: -20%; right: -10%; animation-delay: -7s; animation-duration: 25s; }
.pl-bg-noise { position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.015) 2px, rgba(255,255,255,.015) 4px); z-index: 1; }

@keyframes pl-orb-float { 0% { transform: translate(0, 0) scale(1); } 50% { transform: translate(8vw, 12vh) scale(1.1); } 100% { transform: translate(-5vw, 15vh) scale(0.9); } }

#pl-page { background: #060606; min-height: 100vh; font-family: 'fut', sans-serif; color: #e0e0e0; --red: #FF4500; --gold: #FFD700; --mono: 'fut', sans-serif; --disp: 'Bebas Neue', sans-serif; padding-bottom: 120px; }

.pl-hero { position: relative; z-index: 1; padding: 64px 56px 48px; border-bottom: 1px solid #111; overflow: hidden; }
.pl-hero::before { content: 'ПЛЕЙЛИСТЫ'; position: absolute; right: -20px; top: -10px; font-family: 'fut', sans-serif; font-size: 180px; color: rgba(255,69,0,.025); letter-spacing: 8px; pointer-events: none; white-space: nowrap; }
.pl-hero-label { font-family: var(--mono); font-size: 10px; letter-spacing: 6px; color: var(--red); text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; margin-left: 420px; }
.pl-hero-label::before { content: ''; display: inline-block; width: 24px; height: 1px; background: var(--red); }
.pl-hero-title { font-family: 'fut', sans-serif; font-size: clamp(56px, 7vw, 96px); letter-spacing: 4px; line-height: 0.9; color: #fff; margin-bottom: 16px; }
.pl-hero-title span { color: var(--red); }
.pl-hero-sub { font-size: 15px; font-weight: 500; letter-spacing: 1px; color: #ccc; border-left: 2px solid var(--red); padding-left: 14px; margin-top: 8px; }
.pl-hero-stats { display: flex; gap: 56px; margin-top: 36px; }
.pl-hstat-n { font-family: var(--disp); font-size: 52px; color: #fff; line-height: 1; }
.pl-hstat-l { font-family: var(--mono); font-size: 9px; letter-spacing: 4px; color: #aaa; text-transform: uppercase; margin-top: 4px; }

.pl-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; background: transparent; padding: 0; margin: 48px 56px; border: none; position: relative; z-index: 1; }
@media(max-width: 1200px) { .pl-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; margin: 40px 40px; } }
@media(max-width: 800px) { .pl-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 32px 20px; } .pl-hero { padding: 40px 20px; } }
@media(max-width: 500px) { .pl-grid { grid-template-columns: 1fr; gap: 24px; margin: 24px 16px; } }

.pl-card { background: linear-gradient(145deg, #0e0e0e, #080808); border: 1px solid rgba(255, 255, 255, 0.04); border-radius: 16px; cursor: pointer; position: relative; display: flex; flex-direction: column; box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); animation: pl-in .5s ease both; }
@keyframes pl-in { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
.pl-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 24px 48px rgba(0,0,0,0.8), 0 12px 24px rgba(255,69,0,0.12); border-color: rgba(255,69,0,0.25); background: linear-gradient(145deg, #111, #0a0a0a); }

.pl-cover { aspect-ratio: 1 / 1; position: relative; overflow: hidden; background: #0a0a0a; border-radius: 16px 16px 0 0; }
.pl-cover img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s cubic-bezier(.16,1,.3,1), filter .4s; filter: brightness(.8) saturate(1.05); }
.pl-card:hover .pl-cover img { transform: scale(1.05); filter: brightness(.65) saturate(1.2); }
.pl-cover-fallback { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--disp); font-size: 48px; letter-spacing: 4px; color: rgba(255,69,0,.15); background: linear-gradient(135deg, #0d0d0d 0%, #060606 100%); opacity: 0; transition: opacity .3s; }
.pl-cover-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,.75) 100%); }
.pl-cover-badge { position: absolute; top: 12px; left: 12px; font-family: var(--mono); font-size: 8px; letter-spacing: 3px; color: #fff; background: var(--red); padding: 4px 10px; text-transform: uppercase; }
.pl-cover-bottom { position: absolute; bottom: 12px; left: 12px; right: 12px; display: flex; align-items: flex-end; justify-content: space-between; }
.pl-cover-plays { font-family: var(--mono); font-size: 9px; letter-spacing: 2px; color: rgba(255,255,255,.8); text-transform: uppercase; }
.pl-cover-num { font-family: var(--disp); font-size: 36px; color: rgba(255,255,255,.18); line-height: 1; letter-spacing: 2px; }

.pl-card-info { padding: 18px 20px 20px; border-top: 1px solid rgba(255,255,255,0.05); flex: 1; display: flex; flex-direction: column; }
.pl-card-name { font-family: var(--disp); font-size: 24px; letter-spacing: 3px; color: #fff; line-height: 1; margin-bottom: 7px; }
.pl-card-desc { font-size: 13px; font-weight: 500; color: #ccc; line-height: 1.5; margin-bottom: 16px; flex: 1; }
.pl-card-actions { display: flex; align-items: center; gap: 8px; }
.pl-btn-listen { flex: 1; background: var(--red); border: none; color: #fff; padding: 11px 0; font-family: var(--disp); font-size: 15px; letter-spacing: 3px; text-transform: uppercase; cursor: pointer; transition: background .2s, box-shadow .2s; clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%); }
.pl-btn-listen:hover { background: #FF6B00; box-shadow: 0 4px 20px rgba(255,69,0,.4); }
.pl-btn-share { width: 40px; height: 40px; background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #aaa; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 13px; transition: all .2s; flex-shrink: 0; }
.pl-btn-share:hover { border-color: #ccc; color: #fff; }
.pl-card-tcount { font-family: var(--mono); font-size: 9px; letter-spacing: 2px; color: #aaa; white-space: nowrap; text-transform: uppercase; flex-shrink: 0; }
.pl-card-tcount strong { color: var(--red); }

.pl-inner { position: fixed; inset: 0; z-index: 2000; background: #060606; overflow: hidden; display: flex; flex-direction: column; transform: translateX(100%); transition: transform .48s cubic-bezier(.16,1,.3,1); }
.pl-inner.open { transform: translateX(0); }
.pl-in-head { position: relative; height: 300px; flex-shrink: 0; overflow: hidden; border-bottom: 1px solid #111; }
.pl-in-bg { position: absolute; inset: 0; background-size: cover; background-position: center; filter: blur(40px) saturate(1.3) brightness(.3); transform: scale(1.12); }
.pl-in-noise { position: absolute; inset: 0; background: repeating-linear-gradient( 0deg, transparent, transparent 2px, rgba(0,0,0,.04) 2px, rgba(0,0,0,.04) 4px ); pointer-events: none; }
.pl-in-grad { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(6,6,6,0) 0%, rgba(6,6,6,.5) 60%, #060606 100%); }
.pl-in-content { position: relative; z-index: 2; height: 100%; display: flex; align-items: flex-end; padding: 28px 48px; gap: 28px; }
.pl-in-cover { width: 160px; height: 160px; flex-shrink: 0; border: 1px solid #1e1e1e; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,.8); }
.pl-in-cover img { width: 100%; height: 100%; object-fit: cover; }
.pl-in-meta { flex: 1; min-width: 0; }
.pl-in-eyebrow { font-family: var(--mono); font-size: 9px; letter-spacing: 5px; color: var(--red); text-transform: uppercase; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
.pl-in-eyebrow::before { content: ''; display: inline-block; width: 20px; height: 1px; background: var(--red); }
.pl-in-title { font-family: var(--disp); font-size: clamp(38px, 5vw, 64px); letter-spacing: 5px; color: #fff; line-height: 0.9; margin-bottom: 12px; }
.pl-in-desc { font-family: 'fut', sans-serif; font-size: 15px; font-weight: 400; color: #fff; max-width: 520px; line-height: 1.6; margin-bottom: 24px; border-left: 3px solid var(--red); padding-left: 18px; opacity: 0.85; }
.pl-in-stats { display: flex; gap: 32px; }
.pl-in-stat strong { font-family: var(--disp); font-size: 26px; color: #fff; display: block; letter-spacing: 2px; line-height: 1; }
.pl-in-stat span { font-family: var(--mono); font-size: 9px; letter-spacing: 3px; color: #aaa; text-transform: uppercase; }
.pl-in-back { position: absolute; top: 16px; right: 20px; z-index: 10; background: rgba(0,0,0,.6); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 9px 16px; font-family: var(--mono); font-size: 10px; letter-spacing: 3px; cursor: pointer; transition: all .2s; display: flex; align-items: center; gap: 8px; text-transform: uppercase; backdrop-filter: blur(8px); }
.pl-in-back:hover { border-color: var(--red); color: var(--red); }

.pl-in-controls { padding: 14px 48px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #0e0e0e; flex-shrink: 0; background: #060606; }
.pl-in-play-all { background: var(--red); border: none; color: #fff; padding: 12px 30px; font-family: var(--disp); font-size: 17px; letter-spacing: 4px; cursor: pointer; clip-path: polygon(0 0, calc(100% - 9px) 0, 100% 50%, calc(100% - 9px) 100%, 0 100%); transition: background .2s, box-shadow .2s; }
.pl-in-play-all:hover { background: #FF6B00; box-shadow: 0 4px 20px rgba(255,69,0,.4); }
.pl-in-shuffle { background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #ccc; padding: 11px 20px; font-family: var(--mono); font-size: 9px; letter-spacing: 3px; cursor: pointer; transition: all .2s; text-transform: uppercase; }
.pl-in-shuffle:hover { border-color: #fff; color: #fff; }
.pl-in-info-bar { margin-left: auto; font-family: var(--mono); font-size: 9px; letter-spacing: 3px; color: #aaa; text-transform: uppercase; }
.pl-in-info-bar strong { color: #fff; }

.pl-viz-wrap { padding: 0 48px; flex-shrink: 0; margin: 15px 0 10px; }
.pl-viz-box { height: 90px; background: linear-gradient(180deg, rgba(255,69,0,0.03) 0%, rgba(0,0,0,0) 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.05); position: relative; overflow: hidden; backdrop-filter: blur(4px); }
.pl-viz-box::after { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 3px); pointer-events: none; z-index: 2; }
.pl-viz-canvas { width: 100%; height: 100%; display: block; position: relative; z-index: 1; }

.pl-now-bar { padding: 10px 48px; flex-shrink: 0; background: #080808; border-bottom: 1px solid #0e0e0e; border-top: 1px solid #0e0e0e; display: none; align-items: center; gap: 16px; }
.pl-now-bar.visible { display: flex; }
.pl-now-dot { width: 6px; height: 6px; background: var(--red); border-radius: 50%; animation: pl-dot 1.5s infinite; flex-shrink: 0; }
@keyframes pl-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(1.4)} }
.pl-now-name { font-family: var(--disp); font-size: 18px; letter-spacing: 2px; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; }
.pl-now-artist { font-family: var(--mono); font-size: 9px; letter-spacing: 2px; color: #aaa; flex-shrink: 0; text-transform: uppercase; }
.pl-now-progress { display: none !important; }
.pl-now-fill { height: 100%; background: var(--red); width: 0%; transition: width .08s linear; box-shadow: 0 0 6px rgba(255,69,0,.5); pointer-events: none; }
.pl-now-dur { font-family: var(--mono); font-size: 9px; letter-spacing: 2px; color: #aaa; flex-shrink: 0; }

.pl-tracklist-scroll { flex: 1; overflow-y: auto; padding: 0 48px 48px; margin-top: 10px; }
.pl-tracklist-scroll::-webkit-scrollbar { width: 3px; }
.pl-tracklist-scroll::-webkit-scrollbar-track { background: transparent; }
.pl-tracklist-scroll::-webkit-scrollbar-thumb { background: #1a1a1a; }

.pl-track-row { display: grid; grid-template-columns: 48px 1fr auto; align-items: center; gap: 16px; padding: 18px 0; border-bottom: 1px solid rgba(255,255,255,0.12); cursor: pointer; position: relative; transition: all .25s ease; }
.pl-track-row:hover { background: rgba(255,255,255,.02); padding-left: 10px; padding-right: 10px; margin: 0 -10px; }
.pl-track-row.active { background: rgba(255,69,0,.04); border-left: 2px solid var(--red); padding-left: 14px; padding-right: 10px; margin: 0 -16px; }
.pl-track-left { position: relative; width: 48px; text-align: center; flex-shrink: 0; }
.pl-track-idx { font-family: var(--mono); font-size: 11px; color: #aaa; }
.pl-track-play-ico { display: none; font-size: 10px; color: var(--red); position: absolute; inset: 0; align-items: center; justify-content: center; }
.pl-track-row:hover .pl-track-idx { visibility: hidden; }
.pl-track-row:hover .pl-track-play-ico { display: flex; }
.pl-track-row.active .pl-track-idx { visibility: hidden; }
.pl-track-row.active .pl-track-play-ico { display: flex; animation: pl-pulse .9s ease infinite alternate; }
@keyframes pl-pulse { from{opacity:.4;transform:scale(.85)} to{opacity:1;transform:scale(1.1)} }

.pl-track-body { min-width: 0; }
.pl-track-name { font-size: 15px; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 5px; line-height: 1.2; transition: color .15s; }
.pl-track-row.active .pl-track-name { color: var(--gold); }
.pl-track-artist { font-family: var(--mono); font-size: 10px; letter-spacing: 1.5px; color: #aaa; text-transform: uppercase; opacity: 0.8; }
.pl-track-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.pl-track-dur { font-family: var(--mono); font-size: 10px; color: #aaa; letter-spacing: 1px; width: 34px; text-align: right; transition: color .15s; }
.pl-track-row.active .pl-track-dur { color: var(--red); }
.pl-track-action { background: transparent; border: none; color: #aaa; cursor: pointer; font-size: 16px; padding: 4px 5px; transition: color .15s; opacity: 0; line-height: 1; }
.pl-track-row:hover .pl-track-action { opacity: 1; }
.pl-track-action:hover { color: #fff; }

.pl-toast { position: fixed; bottom: 28px; right: 28px; background: #0e0e0e; border: 1px solid #1e1e1e; border-left: 3px solid var(--red); padding: 14px 20px; font-family: var(--mono); font-size: 10px; letter-spacing: 3px; color: #fff; text-transform: uppercase; transform: translateY(80px); opacity: 0; transition: all .3s; z-index: 9999; pointer-events: none; }
.pl-toast.show { transform: translateY(0); opacity: 1; }
.pl-track-progress-inner { position: absolute; bottom: 0; left: 0; height: 2px; background: var(--red); width: 0%; transition: width 0.1s linear; box-shadow: 0 0 10px rgba(255,69,0,0.5); pointer-events: none; z-index: 5; }
`;
  document.head.appendChild(s);
}

// ─── ДАННЫЕ О ПЛЕЙЛИСТАХ (БЕЗ ФЕЙКОВЫХ ТРЕКОВ) ──────────
const COVERS_PATH = 'assets/covers play/';

const PLAYLISTS = [
  { id:'kompot',     name:'KOMPOT',        badge:'МЕДЛЯКИ',       desc:'Медляки, лирика и мягкий ритм - когда хочется почувствовать каждое слово', coverOut:'cc.jpg', coverIn:'c.jpg' },
  { id:'underground',name:'UNDERGROUND',   badge:'АНДЕРГРАУНД',   desc:'Рэпи Сиях - жёсткий андерграунд без цензуры и фильтров. Только правда',  coverOut:'u.jpg',  coverIn:'uu.jpg' },
  { id:'aroba',      name:'AROBA MIX',     badge:'МИКС',          desc:'Лучшие треки для поездки - микс всех жанров от ZARBA в одном плейлисте', coverOut:'a.jpg',  coverIn:'aa.jpg' },
  { id:'jumbon',     name:'JUMBON JUMBON', badge:'КЛУБ · ДАНС',   desc:'Клубные бэнгеры и танцевальный трэп - заставит двигаться даже стену', coverOut:'j.jpg',  coverIn:'jj.jpg' },
  { id:'oldschool',  name:'OLD SCHOOL',    badge:'КЛАССИКА',      desc:'Легенды старой школы - треки, что заложили фундамент таджикского рэпа', coverOut:'o.jpg',  coverIn:'oo.jpg' },
  { id:'newschool',  name:'NEW SCHOOL',    badge:'НОВАЯ ВОЛНА',   desc:'Новая волна - свежий звук, новые имена и будущее таджикской музыки', coverOut:'n.jpg',  coverIn:'nn.jpg' },
  { id:'pop',        name:'POP',           badge:'ПОП · ЭСТРАДА', desc:'Попса и эстрада - лёгкое, яркое, цепляющее. Для настроения и радости', coverOut:'p.jpg',  coverIn:'pp.jpg' },
  { id:'morning',    name:'SAHARAK',       badge:'УТРО',          desc:'Лёгкий старт дня - энергия без агрессии, ритм без лишнего шума', coverOut:'z.jpg',  coverIn:'zz.jpg' },
  { id:'shabona',    name:'SHAB',          badge:'НОЧЬ · СОН',    desc:'Ночной плейлист для сна - глубокие биты, медитативный ритм и тишина', coverOut:'sh.jpg', coverIn:'sh2.jpg' },
  { id:'fitachok',   name:'FITAK',         badge:'КОЛЛАБЫ',       desc:'Лучшие совместки - когда два артиста встречаются и рождается магия', coverOut:'f.jpg',  coverIn:'ff.jpg' },
  { id:'pripevy',    name:'PRIPEVOK',      badge:'ХИТЫ',          desc:'Треки с хитовыми припевами - зацепит с первого раза и не отпустит', coverOut:'p.jpg',  coverIn:'pp.jpg' },
].map(p => ({ ...p, coverOut: COVERS_PATH + p.coverOut, coverIn: COVERS_PATH + p.coverIn }));

// ─── ВЕРСТКА С ЗАГЛУШКАМИ (ЗАМЕНЯТСЯ ПРИ ЗАГРУЗКЕ БАЗЫ) ───
function getHTML() {
  return `
  <div class="pl-page-bg"><div class="pl-bg-orb orb-1"></div><div class="pl-bg-orb orb-2"></div><div class="pl-bg-noise"></div></div>
<div class="pl-hero">
  <div class="pl-hero-label">Z-REDACTION · ${PLAYLISTS.length} ПЛЕЙЛИСТОВ</div>
  <div class="pl-hero-title">ПЛЕЙ<span>ЛИСТЫ</span></div>
  <div class="pl-hero-sub">Редакционные подборки от команды ZARBA</div>
  <div class="pl-hero-stats">
    <div><div class="pl-hstat-n">${PLAYLISTS.length}</div><div class="pl-hstat-l">плейлистов</div></div>
    <div><div class="pl-hstat-n" id="hero-total-tracks">...</div><div class="pl-hstat-l">треков всего</div></div>
    <div><div class="pl-hstat-n" id="hero-total-views">...</div><div class="pl-hstat-l">прослушиваний</div></div>
  </div>
</div>

<div class="pl-grid">
  ${PLAYLISTS.map((p, i) => `
    <div class="pl-card" data-plid="${p.id}" style="animation-delay:${i * 0.055}s">
      <div class="pl-cover">
        <img src="${p.coverOut}" alt="${p.name}" loading="lazy" onerror="this.style.opacity='0';this.parentNode.querySelector('.pl-cover-fallback').style.opacity='1'">
        <div class="pl-cover-fallback">${p.name.slice(0,4)}</div>
        <div class="pl-cover-overlay"></div>
        <div class="pl-cover-badge">${p.badge}</div>
        <div class="pl-cover-bottom">
          <div class="pl-cover-plays" id="card-plays-${p.id}">▶ ...</div>
          <div class="pl-cover-num" id="card-count-${p.id}">0</div>
        </div>
      </div>
      <div class="pl-card-info">
        <div class="pl-card-name">${p.name}</div>
        <div class="pl-card-desc">${p.desc}</div>
        <div class="pl-card-actions">
          <button class="pl-btn-listen" data-plid="${p.id}">▶ Слушать</button>
          <button class="pl-btn-share" data-plid="${p.id}">⬆</button>
          <div class="pl-card-tcount"><strong id="card-tcount-${p.id}">0</strong> тр</div>
        </div>
      </div>
    </div>
  `).join('')}
</div>

<div class="pl-inner" id="pl-inner">
  <div class="pl-in-head">
    <div class="pl-in-bg" id="pl-in-bg"></div>
    <div class="pl-in-noise"></div>
    <div class="pl-in-grad"></div>
    <button class="pl-in-back" id="pl-in-back">← Назад</button>
    <div class="pl-in-content">
    <div class="pl-in-cover"><img id="pl-in-cover-img" alt=""></div>
      <div class="pl-in-meta">
        <div class="pl-in-eyebrow" id="pl-in-badge">—</div>
        <div class="pl-in-title"  id="pl-in-title">—</div>
        <div class="pl-in-desc"   id="pl-in-desc">—</div>
        <div class="pl-in-stats">
          <div class="pl-in-stat"><strong id="pl-in-tcount">—</strong><span>треков</span></div>
          <div class="pl-in-stat"><strong id="pl-in-plays">—</strong><span>прослушиваний</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="pl-in-controls">
    <button class="pl-in-play-all" id="pl-in-play-all">▶ Запустить всё</button>
    <button class="pl-in-shuffle"  id="pl-in-shuffle">⇄ Перемешать</button>
    <div class="pl-in-info-bar" id="pl-in-info-bar"></div>
  </div>

  <div class="pl-viz-wrap"><div class="pl-viz-box"><canvas class="pl-viz-canvas" id="pl-viz-canvas"></canvas></div></div>

  <div class="pl-now-bar" id="pl-now-bar">
    <div class="pl-now-dot"></div>
    <div class="pl-now-name" id="pl-now-name">—</div>
    <div class="pl-now-artist" id="pl-now-artist">—</div>
    <div class="pl-now-progress" id="pl-now-progress"><div class="pl-now-fill" id="pl-now-fill"></div></div>
    <div class="pl-now-dur" id="pl-now-dur">—</div>
  </div>

  <div class="pl-tracklist-scroll"><div id="pl-tracklist"></div></div>
</div>

<div class="pl-toast" id="pl-toast"></div>
`;
}

// ─── ЛОГИКА И СВЯЗЬ С FIREBASE ───
function initLogic(el) {
  let currentPl = null, currentIdx = -1, isPlaying = false, tracklist = [];
  let vizRaf = null, trackProg = 0, realAudio = null;

  const inner = el.querySelector('#pl-inner');
  const playAllBtn = el.querySelector('#pl-in-play-all');
  const tracklistEl = el.querySelector('#pl-tracklist');
  const nowBar = el.querySelector('#pl-now-bar');
  const nowFill = el.querySelector('#pl-now-fill');

  function formatViews(num) {
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
      return num || 0;
  }

  // 🔴 СРАЗУ ПОСЛЕ ЗАГРУЗКИ СЧИТАЕМ РЕАЛЬНЫЕ ЦИФРЫ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ
  async function loadRealStats() {
      try {
          const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
          const snap = await getDocs(collection(window.firebaseDb, 'tracks'));
          
          let totalTracks = 0, totalViews = 0;
          let plStats = {};
          PLAYLISTS.forEach(p => { plStats[p.name] = { count: 0, views: 0 }; });

          // Считаем каждый трек
          snap.forEach(doc => {
              const data = doc.data();
              if(!data.isRadioExclusive) { // Не считаем чисто радийные
                  totalTracks++;
                  totalViews += (data.views || 0);
                  if (data.playlists && Array.isArray(data.playlists)) {
                      data.playlists.forEach(plName => {
                          if (plStats[plName]) {
                              plStats[plName].count++;
                              plStats[plName].views += (data.views || 0);
                          }
                      });
                  }
              }
          });

          // Обновляем общие цифры сверху
          el.querySelector('#hero-total-tracks').textContent = totalTracks;
          el.querySelector('#hero-total-views').textContent = formatViews(totalViews);

          // Обновляем цифры на КАЖДОЙ карточке
          PLAYLISTS.forEach(p => {
              const stats = plStats[p.name];
              el.querySelector(`#card-count-${p.id}`).textContent = stats.count;
              el.querySelector(`#card-tcount-${p.id}`).textContent = stats.count;
              el.querySelector(`#card-plays-${p.id}`).textContent = `▶ ${formatViews(stats.views)}`;
          });
      } catch (e) {
          console.error("Ошибка загрузки статистики:", e);
      }
  }

  // Запускаем подсчет
  if(window.firebaseDb) loadRealStats();

  // ── Обработчики кликов ──
  el.querySelectorAll('.pl-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.pl-btn-listen') || e.target.closest('.pl-btn-share')) return;
      openPl(card.dataset.plid);
    });
  });
  el.querySelectorAll('.pl-btn-listen').forEach(b => {
    b.addEventListener('click', e => { e.stopPropagation(); openPl(b.dataset.plid); });
  });

  el.querySelector('#pl-in-back')?.addEventListener('click', closePl);
  
  // 🔴 ОТКРЫТИЕ ПЛЕЙЛИСТА (ТЯНЕТ ТРЕКИ ИЗ БАЗЫ ПО НАЗВАНИЮ ПЛЕЙЛИСТА)
  async function openPl(plid) {
    currentPl = PLAYLISTS.find(p => p.id === plid);
    if (!currentPl) return;

    el.querySelector('#pl-in-bg').style.backgroundImage = `url("${currentPl.coverIn}")`;
    el.querySelector('#pl-in-cover-img').src = currentPl.coverIn;
    el.querySelector('#pl-in-badge').textContent = currentPl.badge;
    el.querySelector('#pl-in-title').textContent = currentPl.name;
    el.querySelector('#pl-in-desc').textContent = currentPl.desc;
    
    // Показываем прелоадер
    tracklistEl.innerHTML = '<div style="padding: 50px; text-align: center; color: var(--red); letter-spacing: 2px;">ПОДКЛЮЧЕНИЕ К БАЗЕ...</div>';
    
    window.history.pushState({ plOpen: true }, '', '#playlist-' + plid);
    inner.classList.add('open');
    document.body.style.overflow = 'hidden';
    initViz();
    
    // 🔥 ИСПРАВЛЕННЫЙ ЗАПРОС К FIREBASE
    // Ищем все треки, где в массиве playlists есть НАЗВАНИЕ плейлиста
    tracklist = [];
    try {
        const { collection, getDocs, query, where } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
        
        // ПРАВИЛЬНЫЙ ЗАПРОС: ищем треки по названию плейлиста (currentPl.name)
        const q = query(
            collection(window.firebaseDb, 'tracks'), 
            where('playlists', 'array-contains', currentPl.name)  // ВАЖНО! Название плейлиста, а не ID
        );
        const snap = await getDocs(q);
        
        let totalPlViews = 0;
        snap.forEach(doc => {
            const d = doc.data();
            totalPlViews += (d.views || 0);
            tracklist.push({ 
                id: doc.id, 
                name: d.title, 
                artist: d.artist, 
                url: d.url,  // URL уже закодирован из admin.js
                views: d.views || 0, 
                dur: '--:--' 
            });
        });
        
        el.querySelector('#pl-in-tcount').textContent = tracklist.length;
        el.querySelector('#pl-in-plays').textContent = formatViews(totalPlViews);
        el.querySelector('#pl-in-info-bar').innerHTML = `<strong>${tracklist.length}</strong> ТРЕКОВ`;
        
        if(tracklist.length === 0) {
            tracklistEl.innerHTML = '<div style="padding: 50px; text-align: center; color: #777;">В этом плейлисте пока нет треков. Добавь в админке!</div>';
        } else {
            renderTracklist();
        }
    } catch (e) {
        console.error("Ошибка загрузки плейлиста:", e);
        tracklistEl.innerHTML = '<div style="padding: 50px; text-align: center; color: var(--red);">ОШИБКА ЗАГРУЗКИ БАЗЫ</div>';
    }
  }

  function closePlUI() { inner.classList.remove('open'); document.body.style.overflow = ''; stopTrack(); }
  function closePl() { closePlUI(); if (window.history.state?.plOpen) window.history.back(); }

  // ── Отрисовка треков внутри ──
  function renderTracklist() {
    tracklistEl.innerHTML = tracklist.map((t, i) => `
      <div class="pl-track-row" data-idx="${i}">
        <div class="pl-track-left"><div class="pl-track-idx">${String(i+1).padStart(2,'0')}</div><div class="pl-track-play-ico">▶</div></div>
        <div class="pl-track-body"><div class="pl-track-name">${t.name}</div><div class="pl-track-artist">${t.artist}</div></div>
        <div class="pl-track-right"><div class="pl-track-dur">${t.dur}</div></div>
        <div class="pl-track-progress-inner"></div>
      </div>
    `).join('');

    tracklistEl.querySelectorAll('.pl-track-row').forEach(row => {
      row.addEventListener('click', () => {
        const idx = +row.dataset.idx;
        if (currentIdx === idx && isPlaying) pauseTrack();
        else if (currentIdx === idx && realAudio?.paused) { realAudio.play(); isPlaying = true; playAllBtn.textContent = '⏸ Пауза'; startViz(); } 
        else playTrack(idx);
      });
    });
  }

  // ── Реальный Аудиоплеер ──
  async function countView(trackId) {
      try {
          const { doc, updateDoc, increment } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
          await updateDoc(doc(window.firebaseDb, 'tracks', trackId), { views: increment(1) });
      } catch(e) {
          console.error("Ошибка countView:", e);
      }
  }

  function playTrack(idx) {
    if (!currentPl || idx < 0 || idx >= tracklist.length) return;
    stopTrack(); 
    currentIdx = idx; isPlaying = true; trackProg = 0;

    tracklistEl.querySelectorAll('.pl-track-row').forEach(r => r.classList.remove('active'));
    const row = tracklistEl.querySelector(`.pl-track-row[data-idx="${idx}"]`);
    row?.classList.add('active');
    
    const t = tracklist[idx];
    el.querySelector('#pl-now-name').textContent = t.name;
    el.querySelector('#pl-now-artist').textContent = t.artist;
    nowBar.classList.add('visible');
    playAllBtn.textContent = '⏸ Пауза';
    tracklistEl.querySelectorAll('.pl-track-progress-inner').forEach(p => p.style.width = '0%');

    // 🔥 URL уже правильный из Firebase, не кодируем!
    console.log("🎵 Проигрываю:", t.name, "URL:", t.url);
    realAudio = new Audio(t.url);
    realAudio.viewCounted = false;
    realAudio.play().catch(err => console.error("Ошибка воспроизведения:", err));

    realAudio.addEventListener('loadedmetadata', () => {
        const durText = Math.floor(realAudio.duration / 60) + ':' + Math.floor(realAudio.duration % 60).toString().padStart(2, '0');
        el.querySelector('#pl-now-dur').textContent = durText;
        if(row) row.querySelector('.pl-track-dur').textContent = durText;
        t.dur = durText; 
    });

    realAudio.addEventListener('timeupdate', () => {
        if(!realAudio.duration) return;
        trackProg = realAudio.currentTime / realAudio.duration;
        const activeRowProgress = row?.querySelector('.pl-track-progress-inner');
        if (activeRowProgress) activeRowProgress.style.width = (trackProg * 100) + '%';
        if (nowFill) nowFill.style.width = (trackProg * 100) + '%';
        
        if (realAudio.currentTime > 10 && !realAudio.viewCounted) {
            realAudio.viewCounted = true;
            countView(t.id);
        }
    });

    realAudio.addEventListener('error', (e) => { 
        console.error("Ошибка загрузки трека:", e);
        playAllBtn.textContent = '❌ Ошибка';
    });

    realAudio.addEventListener('ended', () => { playTrack((currentIdx + 1) % tracklist.length); });
    startViz();
  }

  function pauseTrack() { isPlaying = false; if(realAudio) realAudio.pause(); playAllBtn.textContent = '▶ Запустить всё'; stopViz(); }
  function stopTrack() { isPlaying = false; currentIdx = -1; trackProg = 0; if(realAudio) { realAudio.pause(); realAudio.src = ''; realAudio = null; } tracklistEl.querySelectorAll('.pl-track-row').forEach(r => r.classList.remove('active')); nowBar.classList.remove('visible'); if(nowFill) nowFill.style.width = '0%'; playAllBtn.textContent = '▶ Запустить всё'; stopViz(); }

  // ── Визуализатор ──
  function initViz() {
    const dpr = window.devicePixelRatio || 1;
    const vizCanvas = el.querySelector('#pl-viz-canvas');
    const rect = vizCanvas.parentElement.getBoundingClientRect();
    vizCanvas.width = rect.width * dpr; vizCanvas.height = rect.height * dpr;
    vizCanvas.style.width = rect.width + 'px'; vizCanvas.style.height = rect.height + 'px';
    vizCanvas.getContext('2d').scale(dpr, dpr);
    drawIdle(); 
  }
  function drawIdle() {
    const vizCanvas = el.querySelector('#pl-viz-canvas');
    const dpr = window.devicePixelRatio || 1;
    const W = vizCanvas.width/dpr, H = vizCanvas.height/dpr;
    const ctx = vizCanvas.getContext('2d');
    ctx.clearRect(0,0,W,H);
    const bars=90, bW=(W-(bars-1)*1.5)/bars;
    for(let i=0;i<bars;i++){ const x=i*(bW+1.5), h=1.5+Math.abs(Math.sin(i*.45))*5; ctx.fillStyle='rgba(40,40,40,.6)'; ctx.fillRect(x,H/2-h/2,bW,h); }
  }
  function startViz() { if(vizRaf) cancelAnimationFrame(vizRaf); animViz(); }
  function stopViz()  { if(vizRaf){ cancelAnimationFrame(vizRaf); vizRaf=null; } drawIdle(); }
  function animViz() {
    const vizCanvas = el.querySelector('#pl-viz-canvas');
    const dpr = window.devicePixelRatio || 1;
    const W = vizCanvas.width / dpr, H = vizCanvas.height / dpr;
    const ctx = vizCanvas.getContext('2d');
    const now = performance.now();
    ctx.clearRect(0, 0, W, H);
    const bars = 80, spacing = 2, bW = (W - (bars - 1) * spacing) / bars, mid = H / 2; 

    for (let i = 0; i < bars; i++) {
      const relPos = i / bars;
      const f1 = Math.sin(now * 0.003 + i * 0.2) * 0.5, f2 = Math.sin(now * 0.005 - i * 0.1) * 0.3, beat = Math.abs(Math.sin(now * 0.0015)) * 0.25;
      const amp = Math.max(0.1, Math.abs(f1 + f2) + beat), bH = amp * H * 0.75, x = i * (bW + spacing);
      const isActive = relPos <= trackProg;
      
      if (isActive) { ctx.fillStyle = 'var(--red)'; ctx.shadowColor = 'var(--red)'; ctx.shadowBlur = 12; } 
      else { ctx.fillStyle = 'rgba(255, 255, 255, 0.07)'; ctx.shadowBlur = 0; }

      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, mid - bH / 2, bW, bH, bW / 2); else ctx.rect(x, mid - bH / 2, bW, bH);
      ctx.fill();

      if (isActive && amp > 0.65) {
        ctx.fillStyle = '#fff'; ctx.shadowBlur = 5; ctx.beginPath();
        ctx.arc(x + bW/2, mid + (Math.random() > 0.5 ? -bH/2 - 5 : bH/2 + 5), 0.8, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(255, 69, 0, 0.1)'; ctx.fillRect(0, mid, W, 0.5);
    vizRaf = requestAnimationFrame(animViz);
  }

  window.addEventListener('resize', ()=>{ if(inner.classList.contains('open')) initViz(); });
  playAllBtn.addEventListener('click', () => { if (!isPlaying) playTrack(currentIdx >= 0 ? currentIdx : 0); else pauseTrack(); });
  el.querySelector('#pl-in-shuffle')?.addEventListener('click', () => { if (tracklist.length) playTrack(Math.floor(Math.random() * tracklist.length)); });
}

window.renderPlaylists = renderPlaylists;

})();