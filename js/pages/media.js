/* ============================================================
   Z·MEDIA — renderMedia(container)
   БЕЗ ES modules — глобальная функция (ИСПРАВЛЕННАЯ)
   ============================================================ */

function renderMedia(container) {
  // 1. ОЧИЩАЕМ КОНТЕЙНЕР ПЕРЕД РЕНДЕРОМ
  container.innerHTML = '';

  const AR = ['PARVEEZ','MC ARTISAN','HUSTLE TAKIR','YOUNG FLOW','STREET GENIUS','SINO','MALIKA','OZOD','TEMUR G','ZARINA B','UNDERGROUND K','TAJIK STYLE','GHAYRAT','SAFAR'];
  const GN = ['АНДЕРГРАУНД','РЭП','ТРЭП','ЛИРИКА','ПОП','FREESTYLE','ФИТЫ','КАЛЬЯННЫЙ'];
  const TL = ['Ночной Душанбе','Без тебя','Последний бой','Голос улиц','Честность','Тишина','На краю','Первый снег','Медляк','Город спит','Один','Мой путь','Огонь','Новый день','Я вернусь','Жди меня','Звёзды','Твои глаза','Батя','Улица','Пропасть','Зима','Рассвет'];
  const BG = ['#0d0d0d','#0a0f0a','#0f0a0a','#0a0a10','#0f0d08','#080d0f','#0d080f','#080f0a'];
  const YT = ['dQw4w9WgXcQ','9bZkp7q19f0','kJQP7kiw5Fk','OPf0YbXqDm0','3tmd-ClpJxA','fJ9rUzIMcZQ','JGwWNGJdvx8','CevxZvSJLk8'];

  const fmt = n => n>=1e6?(n/1e6).toFixed(1)+'М':n>=1e3?(n/1e3).toFixed(0)+'К':String(n);
  const track = i => ({
    artist:AR[i%AR.length], genre:GN[i%GN.length], title:TL[i%TL.length],
    views:Math.floor(8000+Math.random()*350000), year:2016+Math.floor(i*.35)%9,
    bg:BG[i%BG.length], ytId:YT[i%YT.length],
    dur:`${2+Math.floor(i*.2)%4}:${String(10+Math.floor(i*7)%50).padStart(2,'0')}`
  });

  /* ── STYLES ── */
  document.getElementById('zm-styles')?.remove();
  const S = document.createElement('style');
  S.id = 'zm-styles';
  S.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

.zm {
  --bg:  #080808;
  --s1:  #111;
  --s2:  #1e1e1e;
  --s3:  #2e2e2e;
  --red: #e50914;
  --w:   #ffffff;
  --w90: rgba(255,255,255,.9);
  --w70: rgba(255,255,255,.7);
  --w50: rgba(255,255,255,.5);
  --w30: rgba(255,255,255,.3);
  --D: 'Barlow Condensed', sans-serif;
  --I: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--w);
  font-family: var(--I);
  min-height: 100vh;
}

/* ── MODAL ── */
.zm-modal{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.93);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .25s;backdrop-filter:blur(16px)}
.zm-modal.open{opacity:1;pointer-events:all}
.zm-mbox{width:min(880px,94vw);background:var(--s1);border:1px solid var(--s2);transform:scale(.97) translateY(14px);transition:transform .3s cubic-bezier(.25,.46,.45,.94)}
.zm-modal.open .zm-mbox{transform:scale(1) translateY(0)}
.zm-mvid{aspect-ratio:16/9;background:#000}
.zm-mvid iframe{width:100%;height:100%;border:none;display:block}
.zm-mfoot{padding:16px 20px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--s2)}
.zm-m-artist{font-family:var(--I);font-size:10px;font-weight:700;letter-spacing:4px;color:var(--red);text-transform:uppercase;margin-bottom:3px}
.zm-m-title{font-family:var(--D);font-size:26px;font-weight:800;letter-spacing:1px;color:var(--w)}
.zm-mcls{width:36px;height:36px;border:1px solid var(--s3);color:var(--w70);display:flex;align-items:center;justify-content:center;cursor:pointer;background:transparent;transition:all .2s;font-size:14px}
.zm-mcls:hover{border-color:var(--w);color:var(--w)}

/* ── SECTION ── */
.zm-sec{padding:60px 48px 20px}
.zm-eyebrow{font-family:var(--I);font-size:11px;font-weight:600;letter-spacing:5px;color:var(--w50);text-transform:uppercase;margin-bottom:10px}
.zm-title{font-family:var(--D);font-weight:900;font-size:clamp(52px,7vw,100px);line-height:.9;letter-spacing:1px;text-transform:uppercase;color:var(--w)}
.zm-hsub{font-family:var(--I);font-size:12px;font-weight:400;letter-spacing:3px;color:var(--w50);text-transform:uppercase;margin-top:8px}

/* ── HERO CINEMATIC POSTER ── */
.zm-hero-wrap{
  margin:0 48px;
  position:relative;
  display:grid;
  grid-template-columns:380px 1fr;
  overflow:hidden;
  min-height:560px;
  background:#000;
}
.zm-hero-bgvid{
  position:absolute;inset:0;width:100%;height:100%;
  object-fit:cover;
  filter:blur(40px) brightness(.18) saturate(.4);
  transform:scale(1.1);
  z-index:0;pointer-events:none;
}
.zm-hero-poster{
  position:relative;z-index:2;
  display:flex;flex-direction:column;
  justify-content:flex-end;
  padding:0;
  overflow:hidden;
  border-right:1px solid rgba(255,255,255,.07);
}
.zm-hero-poster-bg{
  position:absolute;inset:0;
  background:linear-gradient(160deg,#1a0000 0%,#000 70%);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--D);font-size:180px;font-weight:900;
  color:rgba(255,255,255,.04);letter-spacing:-6px;user-select:none;
  transition:transform 1s cubic-bezier(.25,.46,.45,.94);
}
.zm-hero-wrap:hover .zm-hero-poster-bg{transform:scale(1.04)}
.zm-hero-poster-vign{
  position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(to top,rgba(0,0,0,1) 0%,rgba(0,0,0,.3) 50%,transparent 100%);
}
.zm-hero-poster-scan{
  position:absolute;inset:0;pointer-events:none;
  background:repeating-linear-gradient(0deg,rgba(255,255,255,.012) 0,rgba(255,255,255,.012) 1px,transparent 1px,transparent 3px);
}
.zm-hero-poster-info{
  position:relative;z-index:3;
  padding:32px 28px;
  display:flex;flex-direction:column;gap:10px;
}
.zm-hero-tag-row{
  display:flex;align-items:center;gap:10px;
}
.zm-hero-tag{
  font-family:var(--I);font-size:9px;font-weight:700;letter-spacing:5px;
  background:var(--red);color:#fff;padding:7px 14px;text-transform:uppercase;
  display:inline-flex;align-items:center;gap:8px;width:fit-content;
}
.zm-hero-vidlogo{
  height:20px;width:auto;
  object-fit:contain;
  opacity:.95;
  mix-blend-mode:screen;
  flex-shrink:0;
  display:block;
}
.zm-fallback{
  position:absolute;inset:0;
  display:flex;align-items:center;justify-content:center;
  pointer-events:none;z-index:1;
  transition:opacity .3s;
}
.zm-fallback img{
  width:40%;max-width:64px;
  opacity:.18;
  filter:brightness(10);
  user-select:none;
  transition:opacity .3s;
}
.zm-hero-week{font-family:var(--I);font-size:10px;font-weight:400;letter-spacing:4px;color:var(--w50);text-transform:uppercase}
.zm-hero-artist{font-family:var(--I);font-size:11px;font-weight:700;letter-spacing:6px;color:var(--red);text-transform:uppercase}
.zm-hero-title{
  font-family:var(--D);font-weight:900;
  font-size:clamp(22px,2vw,34px);
  letter-spacing:1px;color:var(--w);line-height:.95;
  text-transform:uppercase;
  word-break:break-word;
}
.zm-hero-genre{
  font-family:var(--I);font-size:9px;font-weight:600;letter-spacing:4px;
  color:var(--w70);text-transform:uppercase;
  border:1px solid var(--s3);padding:6px 12px;width:fit-content;
}
.zm-hero-info{
  position:relative;z-index:2;
  display:flex;flex-direction:column;
  overflow:hidden;
}
.zm-hero-preview{
  flex:1;
  position:relative;
  background:#0a0a0a;
  display:flex;align-items:center;justify-content:center;
  overflow:hidden;
  cursor:pointer;
  min-height:300px;
}
.zm-hero-preview-fill{
  position:absolute;inset:0;
  background:linear-gradient(135deg,#1a0000,#000);
  display:flex;align-items:center;justify-content:center;
}
.zm-hero-preview-logo{
  width:80px;height:auto;opacity:.08;
  filter:brightness(10);user-select:none;
}
.zm-hero-preview-ov{
  position:absolute;inset:0;
  background:rgba(0,0,0,.4);
  display:flex;align-items:center;justify-content:center;
  opacity:0;transition:opacity .2s;
}
.zm-hero-preview:hover .zm-hero-preview-ov{opacity:1}
.zm-hero-preview-pb{
  width:60px;height:60px;background:var(--w);
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 50px rgba(229,9,20,.5);
}
.zm-hero-preview-pb::after{content:'';width:0;height:0;border-style:solid;border-width:12px 0 12px 20px;border-color:transparent transparent transparent #000;margin-left:5px}
.zm-hero-preview:hover .zm-hero-preview-pb{background:var(--red)}
.zm-hero-preview:hover .zm-hero-preview-pb::after{border-color:transparent transparent transparent #fff}
.zm-hero-bottom-info{
  padding:20px 24px;
  border-top:1px solid var(--s2);
  background:var(--s1);
  display:flex;align-items:center;gap:16px;
}
.zm-hero-stats-row{display:flex;gap:24px;margin-bottom:0}
.zm-hero-divider-v{width:1px;height:32px;background:var(--s3);align-self:center}
.zm-hero-stat-n{font-family:var(--D);font-weight:800;font-size:28px;line-height:1;color:var(--w)}
.zm-hero-stat-l{font-family:var(--I);font-size:8px;font-weight:500;letter-spacing:3px;color:var(--w50);text-transform:uppercase;margin-top:2px}

/* ── SCROLL ROW ── */
.zm-row-wrap{margin:0 48px}
.zm-row-top{display:flex;justify-content:flex-end;gap:4px;margin-bottom:8px}
.zm-arrow{width:32px;height:32px;border:1px solid var(--s3);background:transparent;color:var(--w70);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;font-size:13px;font-family:var(--I)}
.zm-arrow:hover{border-color:var(--w);color:var(--w);background:rgba(255,255,255,.06)}
.zm-row{display:flex;gap:2px;overflow-x:auto;scrollbar-width:none;cursor:grab}
.zm-row::-webkit-scrollbar{display:none}
.zm-row:active{cursor:grabbing}

/* ── CARD ── */
.zm-card{
  flex:0 0 272px;
  background:#131313;cursor:pointer;position:relative;overflow:hidden;
  transition:transform .3s cubic-bezier(.25,.46,.45,.94),box-shadow .3s;
}
.zm-card:hover{transform:translateY(-5px) scale(1.01);box-shadow:0 20px 50px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.06);z-index:2}
.zm-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--red);transform:scaleX(0);transform-origin:left;transition:transform .35s;z-index:3}
.zm-card:hover::before{transform:scaleX(1)}
.zm-thumb{position:relative;aspect-ratio:16/9;overflow:hidden}
.zm-thumb-fill{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:var(--D);font-weight:900;font-size:52px;color:rgba(255,255,255,.05);transition:transform .6s;user-select:none}
.zm-card:hover .zm-thumb-fill{transform:scale(1.07)}
.zm-thumb-ov{position:absolute;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s}
.zm-card:hover .zm-thumb-ov{opacity:1}
.zm-play{width:42px;height:42px;background:var(--w);display:flex;align-items:center;justify-content:center;transition:background .15s,transform .15s}
.zm-play::after{content:'';width:0;height:0;border-style:solid;border-width:8px 0 8px 14px;border-color:transparent transparent transparent #000;margin-left:3px}
.zm-card:hover .zm-play{background:var(--red);transform:scale(1.08)}
.zm-card:hover .zm-play::after{border-color:transparent transparent transparent #fff}
.zm-dur{position:absolute;bottom:7px;right:8px;font-family:var(--I);font-size:10px;font-weight:500;background:rgba(0,0,0,.85);color:var(--w70);padding:3px 7px}
.zm-views{position:absolute;bottom:7px;left:8px;font-family:var(--D);font-weight:700;font-size:15px;color:var(--w);text-shadow:0 1px 8px rgba(0,0,0,.9)}
.zm-cinfo{padding:13px 13px 15px;border-top:1px solid var(--s2)}
.zm-cartist{font-family:var(--I);font-size:10px;font-weight:700;letter-spacing:3px;color:var(--red);text-transform:uppercase;margin-bottom:4px}
.zm-ctitle{font-family:var(--D);font-weight:800;font-size:19px;letter-spacing:.5px;color:var(--w90);line-height:1;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:7px;transition:color .2s}
.zm-card:hover .zm-ctitle{color:var(--w)}
.zm-cmeta{display:flex;align-items:center;justify-content:space-between}
.zm-cgenre{font-family:var(--I);font-size:10px;font-weight:500;letter-spacing:2px;color:var(--w50);text-transform:uppercase}
.zm-cyear{font-family:var(--I);font-size:10px;color:var(--w30)}

/* ── LIVE ── */
.zm-live-wrap{margin:0 48px}
.zm-live{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:#0e0e0e;}
.zm-lc{position:relative;aspect-ratio:16/9;overflow:hidden;cursor:pointer}
.zm-lc-fill{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:var(--D);font-size:90px;font-weight:900;color:rgba(255,255,255,.025);transition:transform .6s;user-select:none}
.zm-lc:hover .zm-lc-fill{transform:scale(1.05)}
.zm-lc-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.95) 0%,rgba(0,0,0,.2) 60%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:20px}
.zm-lc::after{content:'';position:absolute;inset:0;z-index:2;pointer-events:none;border:1px solid transparent;transition:border-color .25s}
.zm-lc:hover::after{border-color:rgba(255,255,255,.12)}
.zm-lc-live{display:inline-flex;align-items:center;gap:7px;font-family:var(--I);font-size:9px;font-weight:700;letter-spacing:4px;color:var(--red);text-transform:uppercase;margin-bottom:6px;width:fit-content}
.zm-lc-dot{width:5px;height:5px;background:var(--red);border-radius:50%;animation:zm-p 1.2s infinite;display:block}
@keyframes zm-p{0%,100%{opacity:1}50%{opacity:.2}}
.zm-lc-artist{font-family:var(--I);font-size:10px;font-weight:600;letter-spacing:3px;color:var(--w70);text-transform:uppercase;margin-bottom:4px}
.zm-lc-title{font-family:var(--D);font-weight:800;font-size:clamp(18px,2vw,26px);letter-spacing:1px;color:var(--w);line-height:1;margin-bottom:10px}
.zm-lc-foot{display:flex;justify-content:space-between;align-items:center}
.zm-lc-views{font-family:var(--D);font-weight:700;font-size:18px;color:var(--w70)}
.zm-lc-btn{width:36px;height:36px;background:var(--w);display:flex;align-items:center;justify-content:center;transition:background .2s;border:none;cursor:pointer}
.zm-lc-btn::after{content:'';width:0;height:0;border-style:solid;border-width:6px 0 6px 11px;border-color:transparent transparent transparent #000;margin-left:2px}
.zm-lc:hover .zm-lc-btn{background:var(--red)}
.zm-lc:hover .zm-lc-btn::after{border-color:transparent transparent transparent #fff}

/* ── ARCHIVE ── */
.zm-arch{margin:0 48px;border:1px solid var(--s2);background:#0e0e0e;}
.zm-arch-grid{display:grid;grid-template-columns:1fr 1fr}
.zm-ar{display:grid;grid-template-columns:40px 68px 1fr 56px 80px;align-items:center;gap:12px;padding:13px 18px 13px 14px;border-bottom:1px solid var(--s2);border-right:1px solid var(--s2);cursor:pointer;transition:background .15s;position:relative}
.zm-ar::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--red);transform:scaleY(0);transition:transform .2s}
.zm-ar:hover{background:var(--s1)}
.zm-ar:hover::before{transform:scaleY(1)}
.zm-ar-n{font-family:var(--I);font-size:12px;font-weight:700;color:var(--w30);text-align:right;transition:color .2s}
.zm-ar:hover .zm-ar-n{color:var(--red)}
.zm-ar-t{aspect-ratio:16/9;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;font-family:var(--D);font-weight:900;font-size:13px;color:rgba(255,255,255,.05)}
.zm-ar-tov{position:absolute;inset:0;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .15s}
.zm-ar-tov::after{content:'';width:0;height:0;border-style:solid;border-width:5px 0 5px 8px;border-color:transparent transparent transparent var(--red);margin-left:2px}
.zm-ar:hover .zm-ar-tov{opacity:1}
.zm-ar-info{min-width:0}
.zm-ar-title{font-family:var(--I);font-size:14px;font-weight:600;color:var(--w90);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:3px;transition:color .2s}
.zm-ar:hover .zm-ar-title{color:var(--w)}
.zm-ar-artist{font-family:var(--I);font-size:10px;font-weight:500;letter-spacing:2px;color:var(--w50);text-transform:uppercase;transition:color .2s}
.zm-ar:hover .zm-ar-artist{color:var(--red)}
.zm-ar-yr{font-family:var(--I);font-size:11px;font-weight:500;color:var(--w30);text-align:center}
.zm-ar-v{font-family:var(--D);font-weight:700;font-size:18px;color:var(--w50);text-align:right}

/* ── SHORTS ── */
.zm-shorts{display:grid;grid-template-columns:repeat(6,1fr);gap:1px;margin:0 48px;background:#0e0e0e;}
.zm-sh{position:relative;aspect-ratio:9/16;overflow:hidden;cursor:pointer;background:var(--s1)}
.zm-sh::after{content:'';position:absolute;inset:0;z-index:3;pointer-events:none;border:1px solid transparent;transition:border-color .25s;}
.zm-sh:hover::after{border-color:rgba(255,255,255,.15)}
.zm-sh-fill{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:var(--D);font-size:58px;font-weight:900;color:rgba(255,255,255,.04);transition:transform .5s;user-select:none}
.zm-sh:hover .zm-sh-fill{transform:scale(1.07)}
.zm-sh-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,1) 0%,rgba(0,0,0,.7) 35%,rgba(0,0,0,0) 65%,rgba(0,0,0,.5) 100%);display:flex;flex-direction:column;justify-content:space-between;padding:10px;}
.zm-sh-top{display:flex;justify-content:space-between;align-items:flex-start}
.zm-sh-badge{font-family:var(--I);font-size:7px;font-weight:700;letter-spacing:3px;background:var(--w);color:#000;padding:3px 7px;text-transform:uppercase}
.zm-sh-dur{font-family:var(--I);font-size:9px;font-weight:500;color:rgba(255,255,255,.8);background:rgba(0,0,0,.6);padding:2px 6px}
.zm-sh-mid{display:flex;justify-content:center;align-items:center;flex:1;opacity:0;transition:opacity .2s}
.zm-sh:hover .zm-sh-mid{opacity:1}
.zm-sh-pb{width:34px;height:34px;background:var(--red);display:flex;align-items:center;justify-content:center}
.zm-sh-pb::after{content:'';width:0;height:0;border-style:solid;border-width:7px 0 7px 11px;border-color:transparent transparent transparent #fff;margin-left:3px}
.zm-sh-bottom{display:flex;flex-direction:column;gap:3px}
.zm-sh-artist{font-family:var(--I);font-size:8px;font-weight:700;letter-spacing:3px;color:var(--red);text-transform:uppercase}
.zm-sh-title{font-family:var(--D);font-weight:800;font-size:14px;color:var(--w);line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.zm-sh-views{font-family:var(--I);font-size:9px;font-weight:500;color:rgba(255,255,255,.6)}

/* ── ARALASH ── */
.zm-aralash{margin:0 48px;border-top:2px solid var(--red);background:#0e0e0e;}
.zm-aralash-head{padding:24px 28px 0 28px;display:flex;align-items:flex-end;justify-content:space-between}
.zm-aralash-t{font-family:var(--D);font-weight:900;font-size:clamp(44px,6vw,74px);letter-spacing:1px;color:var(--w);line-height:1}
.zm-aralash-s{font-family:var(--I);font-size:10px;font-weight:500;letter-spacing:4px;color:var(--w50);text-transform:uppercase;margin-top:5px}
.zm-aralash-arrows{display:flex;gap:4px;align-self:center}

/* MORE */
.zm-more{display:flex;justify-content:center;padding:20px 48px}
.zm-mbtn{font-family:var(--I);font-size:10px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--w70);border:1px solid var(--s3);padding:13px 40px;transition:all .25s;background:transparent;cursor:pointer}
.zm-mbtn:hover{border-color:var(--w);color:var(--w)}

/* ELEVATION */
.zm-hero-wrap,
.zm-live-wrap,
.zm-arch,
.zm-shorts,
.zm-aralash {
  box-shadow: 0 8px 32px rgba(0,0,0,.6), 0 1px 0 rgba(255,255,255,.04);
}

/* REVEAL */
.zm-reveal{opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease}
.zm-reveal.in{opacity:1;transform:translateY(0)}
  `;
  document.head.appendChild(S);

  /* ── MODAL ── */
  document.getElementById('zm-modal')?.remove();
  const modal = document.createElement('div');
  modal.id='zm-modal'; modal.className='zm-modal';
  modal.innerHTML=`
    <div class="zm-mbox">
      <div class="zm-mvid" id="zm-mvid"></div>
      <div class="zm-mfoot">
        <div><div class="zm-m-artist" id="zm-m-artist"></div><div class="zm-m-title" id="zm-m-title"></div></div>
        <button class="zm-mcls" id="zm-mcls">✕</button>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const openM=(ytId,artist,title)=>{
    document.getElementById('zm-m-artist').textContent=artist;
    document.getElementById('zm-m-title').textContent=title;
    document.getElementById('zm-mvid').innerHTML=`<iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>`;
    modal.classList.add('open'); document.body.style.overflow='hidden';
  };
  const closeM=()=>{
    modal.classList.remove('open');
    document.getElementById('zm-mvid').innerHTML='';
    document.body.style.overflow='';
  };
  document.getElementById('zm-mcls').onclick=closeM;
  modal.addEventListener('click',e=>{if(e.target===modal)closeM()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeM()});

  /* ── HELPERS ── */
  const div=(cls='')=>Object.assign(document.createElement('div'),{className:cls});
  const g=()=>div('zm-g');

  const sec=(num,eyebrow,title,sub)=>{
    const d=div('zm-sec zm-reveal');
    d.innerHTML=`
      <div class="zm-eyebrow">${num} — ${eyebrow}</div>
      <div class="zm-title">${title}</div>
      <div class="zm-hsub">${sub}</div>`;
    return d;
  };

  const FALLBACK = 'assets/favicon white.png';

  const card=(t)=>{
    const d=div('zm-card');
    d.innerHTML=`
      <div class="zm-thumb">
        <div class="zm-thumb-fill" style="background:${t.bg}"></div>
        <div class="zm-fallback">
          <img src="${FALLBACK}" alt="" onerror="this.parentElement.style.display='none'">
        </div>
        <div class="zm-thumb-ov"><div class="zm-play"></div></div>
        <div class="zm-dur">${t.dur}</div>
        <div class="zm-views">${fmt(t.views)}</div>
      </div>
      <div class="zm-cinfo">
        <div class="zm-cartist">${t.artist}</div>
        <div class="zm-ctitle">${t.title}</div>
        <div class="zm-cmeta">
          <div class="zm-cgenre">${t.genre}</div>
          <div class="zm-cyear">${t.year}</div>
        </div>
      </div>`;
    d.onclick=()=>openM(t.ytId,t.artist,t.title);
    return d;
  };

  const scrollRow=(cards)=>{
    const wrap=div('zm-row-wrap zm-reveal');
    const top=div('zm-row-top');
    const bL=document.createElement('button'); bL.className='zm-arrow'; bL.textContent='←';
    const bR=document.createElement('button'); bR.className='zm-arrow'; bR.textContent='→';
    top.append(bL,bR);
    const row=div('zm-row');
    cards.forEach(c=>row.appendChild(c));
    bL.onclick=()=>row.scrollBy({left:-840,behavior:'smooth'});
    bR.onclick=()=>row.scrollBy({left: 840,behavior:'smooth'});
    let dn=false,sx,sl;
    row.addEventListener('mousedown',e=>{dn=true;sx=e.pageX-row.offsetLeft;sl=row.scrollLeft});
    ['mouseleave','mouseup'].forEach(ev=>row.addEventListener(ev,()=>{dn=false}));
    row.addEventListener('mousemove',e=>{if(!dn)return;e.preventDefault();row.scrollLeft=sl-(e.pageX-row.offsetLeft-sx)*1.3});
    wrap.append(top,row);
    return wrap;
  };

  /* ── BUILD ── */
  const wrap=div('zm');

  /* 01 HERO */
  wrap.appendChild(sec('01','Редакционный выбор','КЛИП НЕДЕЛИ','Лучшее этой недели'));

  const heroWrap=div('zm-hero-wrap zm-reveal');

  const poster=div('zm-hero-poster');
  poster.innerHTML=`
    <div class="zm-hero-poster-bg">PV</div>
    <div class="zm-hero-poster-vign"></div>
    <div class="zm-hero-poster-scan"></div>
    <div class="zm-hero-poster-info">
      <div class="zm-hero-tag-row">
        <div class="zm-hero-tag">КЛИП НЕДЕЛИ</div>
      </div>
      <div class="zm-hero-week">НЕДЕЛЯ 10 · 2026</div>
      <div class="zm-hero-artist">PARVEEZ</div>
      <div class="zm-hero-title">ОДИНОЧЕСТВО</div>
      <div class="zm-hero-genre">АНДЕРГРАУНД</div>
    </div>`;
  poster.onclick=()=>openM('dQw4w9WgXcQ','PARVEEZ','ОДИНОЧЕСТВО');
  heroWrap.appendChild(poster);

  const infoR=div('zm-hero-info');
  infoR.innerHTML=`
    <div class="zm-hero-preview" id="zm-hplay">
      <div class="zm-hero-preview-fill">
        <img class="zm-hero-preview-logo" src="assets/favicon white.png" alt="" onerror="this.style.display='none'">
      </div>
      <div class="zm-hero-preview-ov">
        <div class="zm-hero-preview-pb"></div>
      </div>
    </div>
    <div class="zm-hero-bottom-info">
      <div class="zm-hero-stats-row">
        <div>
          <div class="zm-hero-stat-n">287К</div>
          <div class="zm-hero-stat-l">Просмотров</div>
        </div>
        <div class="zm-hero-divider-v"></div>
        <div>
          <div class="zm-hero-stat-n">4.8К</div>
          <div class="zm-hero-stat-l">Лайков</div>
        </div>
        <div class="zm-hero-divider-v"></div>
        <div>
          <div class="zm-hero-stat-n">4:12</div>
          <div class="zm-hero-stat-l">Длит.</div>
        </div>
      </div>
    </div>`;
  infoR.querySelector('#zm-hplay').onclick=()=>openM('dQw4w9WgXcQ','PARVEEZ','ОДИНОЧЕСТВО');
  heroWrap.appendChild(infoR);
  wrap.appendChild(heroWrap);

  /* 02 PREMS */
  wrap.appendChild(sec('02','Свежие дропы','ПРЕМЬЕРЫ НЕДЕЛИ','Новые клипы этой недели'));
  wrap.appendChild(scrollRow(Array.from({length:12},(_,i)=>card(track(i+1)))));

  /* 03 LIVE */
  wrap.appendChild(sec('03','Живые выступления','НА СЦЕНЕ','Живой хип-хоп Таджикистана'));
  const liveWrap=div('zm-live-wrap zm-reveal');
  const liveGrid=div('zm-live');
  [{t:'STREET SESSION ДУШАНБЕ',i:14},{t:'ХУДЖАНД FREESTYLE LIVE',i:15},{t:'UNDERGROUND NIGHT',i:16}].forEach(({t,i})=>{
    const data={...track(i),title:t};
    const d=div('zm-lc');
    d.innerHTML=`
      <div class="zm-lc-fill" style="background:${data.bg}"></div>
      <div class="zm-fallback" style="z-index:1"><img src="${FALLBACK}" alt="" onerror="this.parentElement.style.display='none'"></div>
      <div class="zm-lc-ov">
        <div class="zm-lc-live"><span class="zm-lc-dot"></span>LIVE</div>
        <div class="zm-lc-artist">${data.artist}</div>
        <div class="zm-lc-title">${data.title}</div>
        <div class="zm-lc-foot">
          <div class="zm-lc-views">${fmt(data.views)}</div>
          <button class="zm-lc-btn"></button>
        </div>
      </div>`;
    d.onclick=()=>openM(data.ytId,data.artist,data.title);
    liveGrid.appendChild(d);
  });
  liveWrap.appendChild(liveGrid);
  wrap.appendChild(liveWrap);

  /* 04 ESTRADA */
  wrap.appendChild(sec('04','Традиции и современность','ЭСТРАДА','Таджикская эстрада во всей красе'));
  wrap.appendChild(scrollRow(Array.from({length:14},(_,i)=>card(track(i+17)))));

  /* 05 ARCHIVE */
  wrap.appendChild(sec('05','История таджикского рэпа','АРХИВ','От истоков до сегодня'));
  const archWrap=div('zm-arch zm-reveal');
  const archGrid=div('zm-arch-grid');
  archWrap.appendChild(archGrid);
  wrap.appendChild(archWrap);
  let aN=0;
  const moreRow=div('zm-more');
  const mBtn=document.createElement('button'); mBtn.className='zm-mbtn'; mBtn.textContent='ПОКАЗАТЬ ЕЩЁ';
  moreRow.appendChild(mBtn);
  const loadArch=n=>{
    for(let i=aN;i<Math.min(aN+n,30);i++){
      const t=track(i+37);
      const d=div('zm-ar');
      d.innerHTML=`
        <div class="zm-ar-n">${String(i+1).padStart(2,'0')}</div>
        <div class="zm-ar-t" style="background:${t.bg}">${t.artist.slice(0,2)}<div class="zm-ar-tov"></div></div>
        <div class="zm-ar-info">
          <div class="zm-ar-title">${t.title}</div>
          <div class="zm-ar-artist">${t.artist}</div>
        </div>
        <div class="zm-ar-yr">${t.year}</div>
        <div class="zm-ar-v">${fmt(t.views)}</div>`;
      d.onclick=()=>openM(t.ytId,t.artist,t.title);
      archGrid.appendChild(d);
    }
    aN=Math.min(aN+n,30);
    if(aN>=30)mBtn.style.display='none';
  };
  loadArch(20); mBtn.onclick=()=>loadArch(10);
  wrap.appendChild(moreRow);

  /* 06 SHORTS */
  wrap.appendChild(sec('06','Вертикальный формат','ZARBA SHORTS','Тизеры · Coming soon · Вертикалки'));
  const shortsEl=div('zm-shorts zm-reveal');
  for(let i=0;i<6;i++){
    const t=track(i+67);
    const d=div('zm-sh');
    d.innerHTML=`
      <div class="zm-sh-fill" style="background:${t.bg}"></div>
      <div class="zm-fallback" style="z-index:1"><img src="${FALLBACK}" alt="" onerror="this.parentElement.style.display='none'"></div>
      <div class="zm-sh-ov">
        <div class="zm-sh-top"><div class="zm-sh-badge">SHORT</div><div class="zm-sh-dur">${t.dur}</div></div>
        <div class="zm-sh-mid"><div class="zm-sh-pb"></div></div>
        <div class="zm-sh-bottom">
          <div class="zm-sh-artist">${t.artist}</div>
          <div class="zm-sh-title">${t.title}</div>
          <div class="zm-sh-views">${fmt(t.views)} просмотров</div>
        </div>
      </div>`;
    d.onclick=()=>openM(t.ytId,t.artist,t.title);
    shortsEl.appendChild(d);
  }
  wrap.appendChild(shortsEl);

  /* 07 ARALASH */
  const alWrap=div('zm-aralash zm-reveal');
  const alHead=div('zm-aralash-head');
  const alInfo=div('');
  alInfo.innerHTML=`<div class="zm-aralash-t">АРАЛАШ</div><div class="zm-aralash-s">Авторская подборка редакции ZARBA</div>`;
  const alArrows=div('zm-aralash-arrows');
  const alL=document.createElement('button'); alL.className='zm-arrow'; alL.textContent='←';
  const alR=document.createElement('button'); alR.className='zm-arrow'; alR.textContent='→';
  alArrows.append(alL,alR);
  alHead.append(alInfo,alArrows);
  alWrap.appendChild(alHead);
  const alRow=div('zm-row');
  alRow.style.cssText='gap:2px;margin-top:2px';
  for(let i=0;i<16;i++){
    const t=track(i+73);
    const d=div('zm-card');
    d.innerHTML=`
      <div class="zm-thumb">
        <div class="zm-thumb-fill" style="background:${t.bg}"></div>
        <div class="zm-fallback"><img src="${FALLBACK}" alt="" onerror="this.parentElement.style.display='none'"></div>
        <div class="zm-thumb-ov"><div class="zm-play"></div></div>
      </div>
      <div class="zm-cinfo">
        <div class="zm-cartist">${t.artist}</div>
        <div class="zm-ctitle">${t.title}</div>
        <div class="zm-cmeta"><div class="zm-cgenre">${t.genre}</div><div class="zm-cyear">${fmt(t.views)}</div></div>
      </div>`;
    d.onclick=()=>openM(t.ytId,t.artist,t.title);
    alRow.appendChild(d);
  }
  alL.onclick=()=>alRow.scrollBy({left:-870,behavior:'smooth'});
  alR.onclick=()=>alRow.scrollBy({left:870,behavior:'smooth'});
  let adn=false,asx,asl;
  alRow.addEventListener('mousedown',e=>{adn=true;asx=e.pageX-alRow.offsetLeft;asl=alRow.scrollLeft});
  ['mouseleave','mouseup'].forEach(ev=>alRow.addEventListener(ev,()=>{adn=false}));
  alRow.addEventListener('mousemove',e=>{if(!adn)return;e.preventDefault();alRow.scrollLeft=asl-(e.pageX-alRow.offsetLeft-asx)*1.3});
  alWrap.appendChild(alRow);
  wrap.appendChild(alWrap);

  /* ── MOUNT ── */
  container.appendChild(wrap);

  /* ── REVEAL ── */
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}});
  },{threshold:.05});
  wrap.querySelectorAll('.zm-reveal').forEach(el=>obs.observe(el));
}

// Принудительно кидаем функцию в глобальное окно, чтобы index.html её всегда видел
window.renderMedia = renderMedia;