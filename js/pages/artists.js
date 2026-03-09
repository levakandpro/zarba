/* ZARBA — ARTISTS | PREMIUM (FIREBASE EDITION v5 - AUTH FANS) */

let _zarbaArtists = [];

const CITIES=['Все города','Душанбе','Худжанд','Куляб','Хорог','Бохтар','Пенджикент'];
const GENRES=['Все жанры','РЭП','ТРЭП','ЛИРИКА','ПОЭТЕССА','АНДЕРГРАУНД','ПОП','ПРОДЮСЕР','КАЛЬЯННЫЙ'];
const ALPHA='АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯ'.split('');
const GBGS=['linear-gradient(160deg,#0f0f0f,#1a1514)','linear-gradient(160deg,#0a0d14,#0f1620)','linear-gradient(160deg,#100a0a,#1e1010)','linear-gradient(160deg,#0d0a14,#131020)','linear-gradient(160deg,#0a100a,#101a10)','linear-gradient(160deg,#100a0e,#1a1018)','linear-gradient(160deg,#0d1008,#141e10)','linear-gradient(160deg,#0f0f0a,#1a1a10)'];
const CB=['#1a0a0a','#0a0d1a','#0d120a','#14100a','#100a14','#0a1014'];

const fmt = n => { let v = Number(n)||0; return v>=1e6 ? (v/1e6).toFixed(1)+'М' : v>=1e3 ? (v/1e3).toFixed(0)+'К' : String(v); };
const ini = n => String(n||'Z').trim().split(/\s+/).map(w=>w[0].toUpperCase()).join('').slice(0,2);
const hashId = (str) => { if(!str)return 0; let s=String(str), h=0; for(let i=0;i<s.length;i++)h+=s.charCodeAt(i); return h; };

let _el, _state = {city:'Все города',genre:'Все жанры',alpha:'',search:'',sort:'plays'};
let _faned = new Set(), _openId = null;
let _drawer = null, _dAid = null, _dType = null;

// ── ЗАГРУЖАЕМ ФАНАТОВ ТЕКУЩЕГО ЮЗЕРА ИЗ FIRESTORE ──
async function loadUserFans() {
  const user = window.firebaseAuth?.currentUser;
  if (!user) return;
  try {
    const snap = await window.getDocs(
      window.query(
        window.collection(window.firebaseDb, 'userFans'),
        window.where('uid', '==', user.uid)
      )
    );
    snap.forEach(doc => _faned.add(doc.data().artistId));
  } catch(e) { console.warn('loadUserFans:', e); }
}

function initDrawer(){
  if(document.getElementById('za-float-drawer'))return;
  _drawer=document.createElement('div');
  _drawer.id='za-float-drawer';
  _drawer.innerHTML='<div class="zfd-head"><div class="zfd-title" id="zfd-title"></div><button class="zfd-close" id="zfd-close">✕</button></div><div class="zfd-list" id="zfd-list"></div>';
  document.body.appendChild(_drawer);
  document.getElementById('zfd-close').addEventListener('click', window.closeArtistDrawer);
  document.addEventListener('click', e => {
    if(!e.target.closest('#za-float-drawer') && !e.target.classList.contains('za-side-btn')) window.closeArtistDrawer();
  });
}

// ── БЕЗОТКАЗНЫЕ ФУНКЦИИ В WINDOW ──
window.openArtistDrawer = function(e, aid, type) {
  e.stopPropagation();
  if(_dAid===aid && _dType===type) { window.closeArtistDrawer(); return; }
  
  document.querySelectorAll('.za-side-btn').forEach(b => b.classList.remove('zs-active'));
  e.target.classList.add('zs-active');

  const a = _zarbaArtists.find(x => String(x.id) === String(aid));
  if(!a || !_drawer) return;

  const cardEl = e.target.closest('.za-card');
  const r = cardEl.getBoundingClientRect();
  _drawer.style.top = r.top + 'px';
  _drawer.style.left = (r.right + 6) + 'px';
  _drawer.style.height = r.height + 'px';
  document.getElementById('zfd-title').textContent = type === 'tracks' ? 'ТРЕКИ' : 'КЛИПЫ';
  const list = document.getElementById('zfd-list');
  
  if(type==='tracks'){
    list.innerHTML = '<div style="padding:30px 20px;color:#666;text-align:center;font-size:12px;letter-spacing:1px;text-transform:uppercase;">Загрузка треков...</div>';
    _drawer.classList.add('open');
    _dAid = aid; _dType = type;
    
    window.getDocs(window.query(window.collection(window.firebaseDb, 'tracks'), window.where('artist', '==', a.name)))
      .then(snap => {
        if (snap.empty) {
            list.innerHTML = '<div style="padding:40px 20px;color:#444;text-align:center;font-size:11px;letter-spacing:2px;text-transform:uppercase;">У артиста пока нет треков</div>';
            return;
        }
        let html = ''; let i = 0;
        snap.forEach(ds => {
            const trk = ds.data();
            html += `<div class="zfd-track" data-url="${trk.url}">
                <div class="zfd-num">${++i}</div><div class="zfd-play">▶</div>
                <div class="zfd-info"><div class="zfd-name">${trk.title}</div><div class="zfd-feat">${trk.genre || 'ZARBA'}</div></div>
                <div class="zfd-dur" style="color:var(--acc);">PLAY</div>
            </div>`;
        });
        list.innerHTML = html;
        list.querySelectorAll('.zfd-track').forEach(tr=>{
            tr.addEventListener('click', ev=>{
                ev.stopPropagation();
                list.querySelectorAll('.zfd-track').forEach(t=>t.classList.remove('playing'));
                tr.classList.add('playing');
            });
        });
      }).catch(() => { list.innerHTML = '<div style="padding:20px;color:#ff4444;text-align:center;font-size:12px;">Ошибка загрузки</div>'; });

  } else {
    const vids = a.videos || [];
    if (vids.length === 0) {
        list.innerHTML = '<div style="padding:40px 20px;color:#444;text-align:center;font-size:11px;letter-spacing:2px;text-transform:uppercase;">У артиста пока нет клипов</div>';
    } else {
        list.innerHTML = vids.map((url, i) => {
            const ytMatch = url.match(/(?:youtu\.be\/|v=|embed\/)([a-zA-Z0-9_-]{11})/);
            const ytId = ytMatch ? ytMatch[1] : null;
            if (!ytId) return '';
            return `<div class="zfd-clip" data-ytid="${ytId}">
              <div class="zfd-video-wrap" id="zfd-vw-${aid}-${i}">
                <div class="zfd-video-cover" style="background:url('https://img.youtube.com/vi/${ytId}/mqdefault.jpg') center/cover" id="zfd-vc-${aid}-${i}"><div class="play-icon"></div></div>
              </div>
              <div class="zfd-clip-bottom">
                <div class="zfd-cname">Z-Video #${i+1}</div><div class="zfd-cmeta">YouTube</div>
              </div>
            </div>`;
        }).join('');

        list.querySelectorAll('.zfd-clip').forEach((clip,i)=>{
          const cover=clip.querySelector('.zfd-video-cover'), wrap=clip.querySelector('.zfd-video-wrap'), ytId=clip.dataset.ytid;
          if(!cover) return;
          cover.addEventListener('click',ev=>{
            ev.stopPropagation();
            cover.classList.add('hidden');
            const iframe=document.createElement('iframe');
            iframe.src=`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
            iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen=true;
            wrap.appendChild(iframe);
          });
        });
    }
    _drawer.classList.add('open');
    _dAid=aid; _dType=type;
  }
};

window.closeArtistDrawer = function() {
  if(_drawer) _drawer.classList.remove('open');
  _dAid = null; _dType = null;
  if(_el) _el.querySelectorAll('.za-side-btn').forEach(b => b.classList.remove('zs-active'));
};

// ── ФАНАТ — С ЗАЩИТОЙ ЧЕРЕЗ FIREBASE AUTH + КОЛЛЕКЦИЯ userFans ──
window.toggleArtistFan = async function(id) {
  const user = window.firebaseAuth?.currentUser;
  if (!user) {
    alert('Сначала войдите в аккаунт!');
    return;
  }

  const aid = String(id);

  // Уже фанат — ничего не делаем
  if (_faned.has(aid)) return;

  // Проверяем в Firestore — вдруг уже есть запись (защита от накрутки после перезагрузки)
  try {
    const existing = await window.getDocs(
      window.query(
        window.collection(window.firebaseDb, 'userFans'),
        window.where('uid', '==', user.uid),
        window.where('artistId', '==', aid)
      )
    );
    if (!existing.empty) {
      // Уже фанат в базе, просто обновляем локальный Set
      _faned.add(aid);
      const a = _zarbaArtists.find(x => String(x.id) === aid);
      if (a) { renderArtistsPage(); if(_openId === aid) window.syncFan(a); }
      return;
    }
  } catch(e) { console.warn('fan check:', e); }

  // Добавляем фаната
  _faned.add(aid);
  const a = _zarbaArtists.find(x => String(x.id) === aid);
  if (a) {
    a.fans = (a.fans || 0) + 1;
    renderArtistsPage();
    if (_openId === aid) window.syncFan(a);

    try {
      // Записываем в userFans чтобы помнить кто уже фанат
      await window.addDoc(window.collection(window.firebaseDb, 'userFans'), {
        uid: user.uid,
        artistId: aid,
        createdAt: new Date()
      });
      // Инкрементим счётчик артиста
      await window.updateDoc(window.doc(window.firebaseDb, 'artistProfiles', aid), {
        fans: window.increment(1)
      });
    } catch(e) { console.warn('fan write:', e); }
  }
};

window.openArtistModal = function(aid) {
    try {
        const a = _zarbaArtists.find(x => String(x.id) === String(aid));
        if (!a) { console.warn("Artist not found"); return; }
        _openId = String(a.id);
        window._openArtist = a; // для share

        const ov2 = document.getElementById('za-ov2');
        if (!ov2) return;

        const m = document.getElementById('za-modal-inner');
        if(a.hof) m.classList.add('hof-modal'); else m.classList.remove('hof-modal');

        const cov = document.getElementById('za-m-cov');
        const gb = GBGS[hashId(a.id)%GBGS.length];
        cov.style.background = gb;

        cov.querySelectorAll('img').forEach(img => img.remove());

        const photoSrc = a.vertUrl || a.photo;
        if(photoSrc){
            const img = document.createElement('img');
            img.src = photoSrc;
            img.alt = a.name;
            img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;filter:brightness(0.85);z-index:1;';
            cov.insertBefore(img, cov.firstChild);
        }

        document.getElementById('za-m-ini').textContent = photoSrc ? '' : ini(a.name);
        document.getElementById('za-m-vtag').innerHTML = a.verified ? `<div class="za-m-vtag ${a.hof?'gold':''}"><span style="font-weight:900;">✓</span> ${a.hof?'Легенда ZARBA':'Верифицирован'}</div>` : '';

        // Заполняем новые элементы на обложке
        const covTitle = document.getElementById('za-m-cov-title');
        if(covTitle){ covTitle.textContent = a.name; covTitle.className = 'za-m-cover-title' + (a.hof?' hof':''); }
        const covGenre = document.getElementById('za-m-cov-genre');
        if(covGenre) covGenre.textContent = a.genre;
        const covCity = document.getElementById('za-m-cov-city');
        if(covCity) covCity.textContent = a.city;

        // Скрытое имя для совместимости
        const nm = document.getElementById('za-m-nm');
        nm.textContent = a.name;
        nm.className = 'za-m-name' + (a.hof ? ' gold' : '');

        document.getElementById('za-m-sl').textContent = a.slogan ? '"'+a.slogan+'"' : '';

        const yr = a.year || new Date().getFullYear();
        document.getElementById('za-m-mt').innerHTML = [
            {l:'С',v:yr},
            ...(a.chartPos ? [{l:'Чарт',v:'#'+a.chartPos}] : [])
        ].map(m=>`<div class="za-m-mi"><div class="l">${m.l}</div><div class="v">${m.v}</div></div>`).join('');

        const playsNum = Number(a.plays) || 0;
        document.getElementById('za-m-pl').innerHTML = `
            <div class="za-m-stat-block">
              <div class="za-m-stat-num">${fmt(playsNum)}</div>
              <div class="za-m-stat-lbl">Прослушиваний</div>
            </div>
            <div class="za-m-stat-sep"></div>
            <div class="za-m-stat-block">
              <div class="za-m-stat-num">~${Math.max(1,Math.floor((playsNum||100)/15000)||1)}</div>
              <div class="za-m-stat-lbl">Треков</div>
            </div>
        `;

        document.getElementById('za-m-bio').textContent = a.bio || 'Артист добавит описание позже.';
        window.syncFan(a);

        const modalFanBtn = document.getElementById('za-m-fb');
        if(modalFanBtn) modalFanBtn.onclick = function() { window.toggleArtistFan(aid); };

        const bookBtn = document.getElementById('za-m-bk');
        if(bookBtn) bookBtn.onclick = function() { alert('Booking: '+a.name+'\nTelegram: @'+(a.tg||'zarba_booking')); };

        const ig = String(a.ig||'').replace('@','');
        const tg = String(a.tg||'').replace('@','');
        const yt = String(a.yt||'').replace('@','');

        document.getElementById('za-m-soc').innerHTML = [
            {l:'Instagram', u:ig ? 'https://instagram.com/'+ig : '#'},
            {l:'Telegram', u:tg ? 'https://t.me/'+tg : '#'},
            {l:'YouTube', u:yt ? 'https://youtube.com/@'+yt : '#'}
        ].map(s=>`<a href="${s.u}" target="_blank" rel="noopener"><span>${s.l}</span></a>`).join('');

        const bm = {'👑':'Топ-1','🏆':'Зал Славы','🔥':'Горячий','🎤':'Верифицирован','📈':'Топ-10','⭐':'Дебют','🎵':'Трек недели','🎛️':'Продюсер','🌍':'Билингвал'};
        document.getElementById('za-m-bdg').innerHTML = (a.badges||[]).map(b => {
            const g = b==='🏆'||b==='👑', h = b==='🔥'||b==='📈';
            return `<div class="za-badge ${g?'gold':h?'hot':''}">${b} ${bm[b]||''}</div>`;
        }).join('');

        ov2.classList.add('open');
        document.body.style.overflow = 'hidden';
    } catch(err) { console.error('Modal Error:', err); }
};

window.closeArtistModal = function() {
    const ov2 = document.getElementById('za-ov2');
    if (ov2) ov2.classList.remove('open');
    document.body.style.overflow = '';
    _openId = null;
};

window.syncFan = function(a) {
  const on = _faned.has(String(a.id));
  const btn = document.getElementById('za-m-fb');
  if(btn){ btn.innerHTML = on ? '<span>✓ Ты фанат</span>' : '<span>+ Стать фанатом</span>'; btn.className = 'za-m-fan-btn' + (on ? ' on' : ''); }
  const n = document.getElementById('za-m-fn');
  if(n) n.textContent = fmt(a.fans);
};

function getList(){
  const{city,genre,alpha,search,sort}=_state;
  let list=_zarbaArtists.filter(a=>{
    if(city!=='Все города'&&a.city!==city)return false;
    if(genre!=='Все жанров'&&genre!=='Все жанры'&&a.genre!==genre)return false;
    if(alpha&&!a.name.toUpperCase().startsWith(alpha))return false;
    if(search){const q=search.toLowerCase();if(!a.name.toLowerCase().includes(q)&&!a.city.toLowerCase().includes(q)&&!a.genre.toLowerCase().includes(q))return false;}
    return true;
  });
  if(sort==='plays')list.sort((a,b)=>(b.plays||0)-(a.plays||0));
  else if(sort==='fans')list.sort((a,b)=>(b.fans||0)-(a.fans||0));
  else if(sort==='alpha')list.sort((a,b)=>a.name.localeCompare(b.name,'ru'));
  else if(sort==='new')list.sort((a,b)=>(b.year||0)-(a.year||0));
  return list;
}

function renderArtistsPage(){
  const list=getList(), total=_zarbaArtists.reduce((s,a)=>s+(Number(a.plays)||0),0), hof=_zarbaArtists.filter(a=>a.hof).length;
  _el.id='za-page';
  _el.innerHTML=`
<div class="za-bar">
  <div class="za-bar-stats">
    <div class="za-bs"><div class="za-bs-n">${_zarbaArtists.length}</div><div class="za-bs-l">Артистов</div></div>
    <div class="za-bar-divider"></div>
    <div class="za-bs"><div class="za-bs-n">${fmt(total)}</div><div class="za-bs-l">Прослушиваний</div></div>
    <div class="za-bar-divider"></div>
    <div class="za-bs"><div class="za-bs-n"><span class="za-ldot"></span>${hof}</div><div class="za-bs-l">Зал Славы</div></div>
  </div>
  <button class="za-join-btn" onclick="window.showPage('profile')"><span>+ Стать артистом</span></button>
</div>
<div class="za-filters">
  <div class="za-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="15" y2="15"/></svg><input type="text" id="za-q" placeholder="Поиск..." value="${_state.search}"></div>
  <select class="za-sel" id="za-cs">${CITIES.map(c=>`<option value="${c}"${_state.city===c?' selected':''}>${c}</option>`).join('')}</select>
  <select class="za-sel" id="za-gs">${GENRES.map(g=>`<option value="${g}"${_state.genre===g?' selected':''}>${g}</option>`).join('')}</select>
  <select class="za-sel" id="za-ss"><option value="plays"${_state.sort==='plays'?' selected':''}>По прослушиваниям</option><option value="fans"${_state.sort==='fans'?' selected':''}>По фанатам</option><option value="alpha"${_state.sort==='alpha'?' selected':''}>А — Я</option><option value="new"${_state.sort==='new'?' selected':''}>Новые</option></select>
</div>
<div class="za-alpha"><button class="za-ab all ${_state.alpha===''?'on':''}" data-a="">ВСЕ</button>${ALPHA.map(l=>`<button class="za-ab ${_state.alpha===l?'on':''}" data-a="${l}">${l}</button>`).join('')}</div>
<div class="za-count">${list.length} / ${_zarbaArtists.length} артистов</div>
<div class="za-grid">
${list.length===0?'<div class="za-empty">Нет результатов</div>':list.map((a,i)=>{
  const gb=GBGS[hashId(a.id)%GBGS.length], on=_faned.has(String(a.id));
  const styleStr = a.photo ? `background: url('${a.photo}') center/cover no-repeat; color: transparent;` : `background: ${gb};`;
  return`<div class="za-card${a.hof?' hof':''}" data-id="${a.id}" onclick="if(!event.target.closest('.za-card-btns') && !event.target.classList.contains('za-ov-fan')) window.openArtistModal('${a.id}')" style="animation:za-fu .45s ${Math.min(i*.05,.6)}s both">
  <div class="za-card-init" style="${styleStr}">${a.photo ? '' : ini(a.name)}</div>
  ${a.verified?`<div class="za-card-v${a.hof?' gold':''}">✓</div>`:''}
  ${a.chartPos?`<div class="za-card-chart">#${a.chartPos}</div>`:''}
  <div class="za-card-ov">
    <div class="za-ov-name">${a.name}</div>
    <div class="za-ov-genre">${a.genre}</div>
    <div class="za-ov-line"></div>
    <div class="za-ov-meta"><span class="za-ov-city">${a.city}</span><span class="za-ov-plays">${fmt(a.plays)}</span></div>
    <button class="za-ov-fan${on?' on':''}" onclick="event.stopPropagation(); window.toggleArtistFan('${a.id}')">${on?'✓ Ты фанат':'+ Стать фанатом'}</button>
  </div>
  <div class="za-card-btns">
    <button class="za-side-btn" onclick="window.openArtistDrawer(event, '${a.id}', 'tracks')">Треки</button>
    <button class="za-side-btn" onclick="window.openArtistDrawer(event, '${a.id}', 'clips')">Клипы</button>
  </div>
</div>`;}).join('')}
</div>

<div class="za-ov2" id="za-ov2" onclick="if(event.target.id==='za-ov2') window.closeArtistModal()">
  <div class="za-modal" id="za-modal-inner">

    <!-- ЛЕВАЯ ЧАСТЬ: фото во весь рост -->
    <div class="za-m-cover" id="za-m-cov">
      <div class="za-m-cover-init" id="za-m-ini"></div>
      <!-- кинематографический оверлей поверх фото -->
      <div class="za-m-cov-gradient"></div>
      <!-- верифицирован тег -->
      <div id="za-m-vtag"></div>
      <!-- имя артиста крупно внизу фото -->
      <div class="za-m-cover-name-wrap">
        <div class="za-m-cover-genre" id="za-m-cov-genre"></div>
        <div class="za-m-cover-title" id="za-m-cov-title"></div>
        <div class="za-m-cover-city" id="za-m-cov-city"></div>
      </div>
    </div>

    <!-- ПРАВАЯ ЧАСТЬ: инфо -->
    <div class="za-m-body">
      <button class="za-m-close" onclick="window.closeArtistModal()">✕</button>

      <!-- Имя (скрытое, дублируется из обложки, нужно для syncFan и логики) -->
      <div class="za-m-name" id="za-m-nm" style="display:none"></div>

      <!-- СЛОГАН -->
      <div class="za-m-slogan" id="za-m-sl"></div>

      <!-- СТАТЫ: прослушивания и треки -->
      <div class="za-m-plays" id="za-m-pl"></div>

      <!-- МЕТА: год, чарт -->
      <div class="za-m-meta" id="za-m-mt"></div>

      <!-- БИО -->
      <div class="za-m-bio" id="za-m-bio"></div>

      <!-- СТАТЬ ФАНАТОМ -->
      <div class="za-m-fan-row">
        <button class="za-m-fan-btn" id="za-m-fb"><span>+ Стать фанатом</span></button>
        <div class="za-m-fan-cnt"><div class="n" id="za-m-fn"></div><div class="l">фанатов</div></div>
      </div>

      <!-- СОЦСЕТИ -->
      <div class="za-m-soc" id="za-m-soc"></div>

      <!-- БЕЙДЖИ -->
      <div class="za-m-bdg" id="za-m-bdg"></div>

      <!-- ПОДЕЛИТЬСЯ + БУКИНГ -->
      <div class="za-m-actions">
        <button class="za-m-share-btn" id="za-m-share" onclick="window.shareArtist()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          Поделиться
        </button>
        <button class="za-m-book" id="za-m-bk">✉ Booking</button>
      </div>
    </div>
  </div>
</div>

<!-- SHARE POPUP -->
<div id="za-share-popup" class="za-share-popup" onclick="if(event.target.id==='za-share-popup') window.closeSharePopup()">
  <div class="za-share-box">
    <button class="za-share-close" onclick="window.closeSharePopup()">✕</button>
    <div class="za-share-preview" id="za-share-preview"></div>
    <div class="za-share-label">ПОДЕЛИТЬСЯ</div>
    <div class="za-share-btns">
      <button class="za-share-app tg"  onclick="window.shareToApp('tg')">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/></svg>
        Telegram
      </button>
      <button class="za-share-app wa"  onclick="window.shareToApp('wa')">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </button>
      <button class="za-share-app vk"  onclick="window.shareToApp('vk')">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.713-1.033-1.01-1.49-.12-1.49 1.18 0 .418-.12.66-1.276.66-1.875 0-3.963-1.137-5.433-3.254-2.201-3.07-2.807-5.395-2.807-5.866 0-.307.12-.603.72-.603h1.743c.54 0 .742.247.952.84.954 2.785 2.565 5.227 3.23 5.227.247 0 .36-.12.36-.78V9.368c-.067-1.396-.815-1.516-.815-2.01 0-.24.193-.48.504-.48h2.748c.465 0 .628.247.628.794v4.27c0 .46.202.615.33.615.247 0 .462-.155.923-.615 1.427-1.6 2.449-4.067 2.449-4.067.135-.3.374-.578.914-.578h1.743c.523 0 .636.27.523.594-.22.997-2.354 4.026-2.354 4.026-.187.3-.253.432 0 .762.18.253.777.785 1.17 1.26.726.87 1.286 1.597 1.434 2.094.15.496-.12.743-.64.743z"/></svg>
        ВКонтакте
      </button>
      <button class="za-share-app copy" onclick="window.shareToApp('copy')" id="za-share-copy-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        Скопировать
      </button>
    </div>
  </div>
</div>`;

  const q=s=>_el.querySelector(s), qa=s=>[..._el.querySelectorAll(s)];
  q('#za-q')?.addEventListener('input',e=>{_state.search=e.target.value; window.closeArtistDrawer(); renderArtistsPage();});
  q('#za-cs')?.addEventListener('change',e=>{_state.city=e.target.value; window.closeArtistDrawer(); renderArtistsPage();});
  q('#za-gs')?.addEventListener('change',e=>{_state.genre=e.target.value; window.closeArtistDrawer(); renderArtistsPage();});
  q('#za-ss')?.addEventListener('change',e=>{_state.sort=e.target.value; window.closeArtistDrawer(); renderArtistsPage();});
  qa('.za-ab').forEach(b=>b.addEventListener('click',()=>{_state.alpha=b.dataset.a; window.closeArtistDrawer(); renderArtistsPage();}));
}

// ── SHARE ──────────────────────────────────────────────────────

window.shareArtist = function() {
  const a = window._openArtist;
  if (!a) return;

  const handle = a.atHandle ? '@' + a.atHandle : '';
  const siteBase = 'https://zarba.tj';

  // Ссылка для шеринга — идёт через Cloudflare Worker чтобы боты
  // (Telegram, WhatsApp, VK) получили красивые OG-теги с фото артиста.
  // Живые пользователи автоматически редиректятся на zarba.tj
  const WORKER_URL = 'https://zarba-radio-logic.levakandproduction.workers.dev';
const shareUrl = a.atHandle
    ? `https://zarba.ru/artists/${a.atHandle}`
    : `https://zarba.ru/artists?id=${a.id}`;

  window._shareUrl = shareUrl;
  window._shareArtistData = a;

  // Строим превью карточку
  const popup = document.getElementById('za-share-popup');
  const preview = document.getElementById('za-share-preview');
  if (!popup || !preview) return;

  const photoSrc = a.vertUrl || a.photo || '';
  const fansStr = a.fans > 0 ? `${fmt(a.fans)} фанатов` : '';
  const playsStr = a.plays > 0 ? `${fmt(a.plays)} прослушиваний` : '';
  const metaParts = [a.city, a.genre, playsStr, fansStr].filter(Boolean);

  preview.innerHTML = `
    <div class="za-share-preview-inner">
      ${photoSrc ? `<div class="za-share-preview-bg" style="background-image:url('${photoSrc}')"></div>` : `<div class="za-share-preview-bg" style="background:linear-gradient(135deg,#1a0a0a,#0a0d14)"></div>`}
      <div class="za-share-preview-grad"></div>
      <div class="za-share-preview-logo">ZARBA</div>
      <div class="za-share-preview-content">
        <div class="za-share-preview-genre">${a.genre}</div>
        <div class="za-share-preview-name">${a.name}</div>
        <div class="za-share-preview-meta">${metaParts.join('  ·  ')}</div>
      </div>
      ${handle ? `<div class="za-share-preview-handle">${handle}</div>` : ''}
    </div>
  `;

  popup.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeSharePopup = function() {
  const popup = document.getElementById('za-share-popup');
  if (popup) popup.classList.remove('open');
  document.body.style.overflow = '';
};

window.shareToApp = function(app) {
  const a = window._shareArtistData;
  if (!a) return;
  const url = window._shareUrl || 'https://zarba.tj';
  const handle = a.atHandle ? `@${a.atHandle}` : a.name;
  const text = `🎤 ${a.name} — слушай на ZARBA!\n${a.genre} · ${a.city}\n\n${url}`;

  if (app === 'tg') {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`🎤 ${a.name} — ${a.genre} · ${a.city}\nСлушай на ZARBA`)}`, '_blank');

  } else if (app === 'wa') {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');

  } else if (app === 'vk') {
    window.open(`https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(`${a.name} на ZARBA`)}&description=${encodeURIComponent(`${a.genre} · ${a.city}`)}`, '_blank');

  } else if (app === 'copy') {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        const btn = document.getElementById('za-share-copy-btn');
        if (btn) {
          btn.classList.add('copied');
          btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Скопировано!`;
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Скопировать`;
          }, 2500);
        }
      });
    } else {
      const el = document.createElement('textarea');
      el.value = url; el.style.position = 'fixed'; el.style.opacity = '0';
      document.body.appendChild(el); el.select();
      document.execCommand('copy'); document.body.removeChild(el);
    }
  }
};

window.renderArtists = async function(container){
  const old=document.getElementById('za2-css');
  if(old)old.remove();
  const s=document.createElement('style');
  s.id='za2-css';
  s.textContent=`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=Nunito:wght@300;400;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
#za-page{background:#080808;color:#f0f0f0;font-family:'Rajdhani',sans-serif;min-height:100vh;padding-bottom:120px;--acc:#FF4500;--gold:#FFD700;--mono:'JetBrains Mono',monospace;--disp:'Bebas Neue',sans-serif}
.za-bar{display:flex;align-items:center;justify-content:space-between;padding:40px 56px 36px;border-bottom:1px solid #111;position:relative}
.za-bar::after{content:'';position:absolute;bottom:0;left:56px;right:56px;height:1px;background:linear-gradient(90deg,transparent,#FF4500 30%,#FF4500 70%,transparent);opacity:.12}
.za-bar-stats{display:flex;gap:56px;align-items:center}
.za-bs{display:flex;flex-direction:column;gap:2px}
.za-bs-n{font-family:var(--disp);font-size:64px;line-height:1;color:#fff;letter-spacing:2px}
.za-bs-l{font-family:var(--mono);font-size:11px;letter-spacing:5px;color:#555;text-transform:uppercase}
.za-bar-divider{width:1px;height:44px;background:linear-gradient(to bottom,transparent,#1e1e1e,transparent)}
.za-ldot{display:inline-block;width:6px;height:6px;background:#00E676;border-radius:50%;margin-right:8px;vertical-align:middle;box-shadow:0 0 8px #00E676;animation:za-blink 1.4s infinite}
@keyframes za-blink{0%,100%{opacity:1;box-shadow:0 0 8px #00E676}50%{opacity:.3;box-shadow:none}}
.za-join-btn{position:relative;overflow:hidden;background:transparent;border:1px solid #FF4500;color:#FF4500;padding:18px 44px;font-family:var(--mono);font-size:11px;letter-spacing:5px;text-transform:uppercase;cursor:pointer;transition:color .4s;white-space:nowrap;clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)}
.za-join-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#FF4500,#FF6B00);transform:translateX(-105%);transition:transform .4s cubic-bezier(.4,0,.2,1);z-index:0}
.za-join-btn span{position:relative;z-index:1}
.za-join-btn:hover::before{transform:translateX(0)}
.za-join-btn:hover{color:#fff}
.za-filters{display:flex;gap:16px;padding:28px 56px;align-items:center;flex-wrap:wrap;border-bottom:1px solid #0f0f0f}
.za-search{position:relative;flex:1 1 300px;max-width:420px}
.za-search input{width:100%;background:rgba(255,255,255,.03);border:none;border-bottom:1px solid #333;color:#f0f0f0;padding:14px 14px 14px 42px;font-family:'Rajdhani',sans-serif;font-size:14px;font-weight:500;letter-spacing:2px;outline:none;transition:border-color .3s,background .3s}
.za-search input::placeholder{color:#666}
.za-search input:focus{border-color:#FF4500;background:rgba(255,69,0,.03)}
.za-search svg{position:absolute;left:10px;top:50%;transform:translateY(-50%);width:17px;height:17px;color:#666}
.za-sel{background:transparent;border:none;border-bottom:1px solid #333;color:#888;padding:14px 32px 14px 4px;font-family:'Rajdhani',sans-serif;font-size:14px;font-weight:500;letter-spacing:1px;cursor:pointer;outline:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='5'%3E%3Cpath d='M0 0l4 5 4-5z' fill='%23555'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 6px center;transition:border-color .3s,color .3s}
.za-sel:focus{border-color:#FF4500;color:#f0f0f0}
.za-sel option{background:#111;color:#ccc}
.za-alpha{display:flex;gap:3px;flex-wrap:wrap;padding:18px 56px;border-bottom:1px solid #0a0a0a}
.za-ab{min-width:32px;height:32px;padding:0 6px;background:transparent;border:none;color:#484848;font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:color .15s,background .15s;text-transform:uppercase;letter-spacing:1px;border-radius:2px}
.za-ab:hover{color:#bbb}
.za-ab.on{color:#FF4500;background:rgba(255,69,0,.08)}
.za-ab.all{padding:0 12px;font-size:12px;letter-spacing:3px}
.za-count{padding:16px 56px 12px;font-family:var(--mono);font-size:11px;letter-spacing:5px;color:#555;text-transform:uppercase}
.za-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:3px;padding:3px 56px}
.za-card{position:relative;aspect-ratio:3/4;overflow:hidden;cursor:pointer;background:#0e0e0e;transition:transform .4s cubic-bezier(.25,.46,.45,.94),box-shadow .4s ease;z-index:1}
.za-card:hover{transform:scale(1.05) translateY(-10px);box-shadow:0 32px 80px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.07);z-index:10}
.za-card-init{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-size:clamp(90px,9vw,160px);color:rgba(255,255,255,.04);letter-spacing:4px;transition:transform .7s cubic-bezier(.25,.46,.45,.94),color .5s;user-select:none}
.za-card:hover .za-card-init{transform:scale(1.06);color:rgba(255,255,255,.07)}
.za-card.hof::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;z-index:6;background:linear-gradient(90deg,transparent,rgba(255,215,0,.4),transparent);pointer-events:none}
.za-card-v{position:absolute;top:16px;right:16px;z-index:4;width:36px;height:36px;border-radius:50%;background:#1D9BF0;display:flex;align-items:center;justify-content:center;font-size:16px;opacity:0;transition:opacity .3s}
.za-card-v.gold{background:#FFD700;color:#000}
.za-card:hover .za-card-v{opacity:1}
.za-card-chart{position:absolute;top:18px;right:62px;z-index:4;font-family:var(--disp);font-size:22px;letter-spacing:1px;color:#FF4500;opacity:0;transition:opacity .3s .05s}
.za-card:hover .za-card-chart{opacity:1}
.za-card-ov{position:absolute;inset:0;z-index:3;background:linear-gradient(to top,rgba(0,0,0,.98) 0%,rgba(0,0,0,.85) 35%,rgba(0,0,0,.4) 60%,transparent 80%);opacity:0;transition:opacity .4s ease;display:flex;flex-direction:column;justify-content:flex-end;padding:32px 28px 30px}
.za-card:hover .za-card-ov{opacity:1}
.za-ov-name{font-family:var(--disp);font-size:clamp(32px,3.5vw,52px);letter-spacing:2px;line-height:1;color:#fff;transform:translateY(16px);transition:transform .4s cubic-bezier(.25,.46,.45,.94)}
.za-card.hof .za-ov-name{color:#FFD700}
.za-card:hover .za-ov-name{transform:translateY(0)}
.za-ov-genre{font-family:var(--mono);font-size:11px;letter-spacing:5px;color:#FF4500;text-transform:uppercase;margin-top:7px;opacity:0;transform:translateY(8px);transition:all .4s .06s ease}
.za-card:hover .za-ov-genre{opacity:1;transform:translateY(0)}
.za-ov-line{width:40px;height:1px;background:linear-gradient(90deg,#FF4500,transparent);margin:13px 0;opacity:0;transform:scaleX(0);transform-origin:left;transition:all .35s .1s ease}
.za-card:hover .za-ov-line{opacity:1;transform:scaleX(1)}
.za-ov-meta{display:flex;justify-content:space-between;align-items:center;opacity:0;transform:translateY(6px);transition:all .35s .13s ease}
.za-card:hover .za-ov-meta{opacity:1;transform:translateY(0)}
.za-ov-city{font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:600;letter-spacing:3px;color:#777;text-transform:uppercase}
.za-ov-plays{font-family:var(--disp);font-size:26px;color:#555;letter-spacing:1px}
.za-ov-fan{margin-top:18px;width:100%;background:transparent;border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.7);padding:16px 20px;font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:600;letter-spacing:3px;text-transform:uppercase;cursor:pointer;opacity:0;transform:translateY(6px);transition:all .35s .16s ease,background .25s,border-color .25s,color .25s}
.za-card:hover .za-ov-fan{opacity:1;transform:translateY(0)}
.za-ov-fan:hover{background:#FF4500;border-color:#FF4500;color:#fff}
.za-ov-fan.on{border-color:#FF4500;color:#FF4500;background:rgba(255,69,0,.08)}
.za-card-btns{position:absolute;right:0;top:50%;transform:translateY(-50%);z-index:20;display:flex;flex-direction:column;gap:4px;opacity:0;transition:opacity .3s ease;pointer-events:none}
.za-card:hover .za-card-btns{opacity:1;pointer-events:all}
.za-side-btn{writing-mode:vertical-rl;background:rgba(6,6,6,.97);border:1px solid #333;border-right:none;color:#999;padding:22px 12px;font-family:'Rajdhani',sans-serif;font-size:12px;font-weight:600;letter-spacing:4px;text-transform:uppercase;cursor:pointer;transition:all .2s;white-space:nowrap;backdrop-filter:blur(8px)}
.za-side-btn:hover,.za-side-btn.zs-active{background:#FF4500;color:#fff;border-color:#FF4500}
#za-float-drawer{position:fixed;z-index:99999;width:320px;background:#0c0c0c;border:1px solid #1e1e1e;border-left:2px solid #FF4500;display:flex;flex-direction:column;box-shadow:16px 0 80px rgba(0,0,0,.9);opacity:0;transform:translateX(-24px);pointer-events:none;transition:transform .38s cubic-bezier(.25,.46,.45,.94),opacity .3s ease}
#za-float-drawer.open{opacity:1;transform:translateX(0);pointer-events:all}
.zfd-head{display:flex;align-items:center;justify-content:space-between;padding:16px 20px 14px;border-bottom:1px solid #141414;flex-shrink:0}
.zfd-title{font-family:var(--disp);font-size:26px;letter-spacing:4px;color:#fff}
.zfd-close{background:none;border:none;color:#444;cursor:pointer;font-size:16px;padding:4px;transition:color .2s;line-height:1}
.zfd-close:hover{color:#FF4500}
.zfd-list{flex:1;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#1a1a1a transparent}
.zfd-track{display:flex;align-items:center;gap:14px;padding:14px 20px;border-bottom:1px solid #0e0e0e;cursor:pointer;transition:background .15s;position:relative}
.zfd-track:hover{background:rgba(255,255,255,.03)}
.zfd-track.playing{background:rgba(255,69,0,.07)}
.zfd-num{font-family:var(--mono);font-size:11px;color:#282828;min-width:22px;text-align:right;flex-shrink:0}
.zfd-play{position:absolute;left:20px;font-size:11px;color:#FF4500;opacity:0;transition:opacity .15s}
.zfd-track:hover .zfd-play,.zfd-track.playing .zfd-play{opacity:1}
.zfd-info{flex:1;min-width:0}
.zfd-name{font-family:var(--disp);font-size:20px;letter-spacing:1px;color:#ccc;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .15s;line-height:1.1}
.zfd-track:hover .zfd-name{color:#fff}
.zfd-track.playing .zfd-name{color:#FF4500}
.zfd-feat{font-family:var(--mono);font-size:8px;letter-spacing:2px;color:#2a2a2a;margin-top:3px;text-transform:uppercase}
.zfd-dur{font-family:var(--mono);font-size:10px;color:#252525;flex-shrink:0;letter-spacing:1px}
.zfd-clip{display:flex;flex-direction:column;border-bottom:1px solid #0e0e0e;cursor:pointer;transition:background .15s}
.zfd-clip:hover{background:rgba(255,255,255,.02)}
.zfd-video-wrap{position:relative;width:100%;aspect-ratio:16/9;background:#0a0a0a;flex-shrink:0;overflow:hidden}
.zfd-video-wrap iframe{position:absolute;inset:0;width:100%;height:100%;border:none}
.zfd-video-cover{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:var(--bg,#111);cursor:pointer;transition:opacity .3s;z-index:2}
.zfd-video-cover .play-icon{width:52px;height:52px;background:#FF4500;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative}
.zfd-video-cover .play-icon::after{content:'';display:block;width:0;height:0;border-style:solid;border-width:10px 0 10px 18px;border-color:transparent transparent transparent #fff;margin-left:3px}
.zfd-video-cover.hidden{opacity:0;pointer-events:none}
.zfd-clip-bottom{display:flex;align-items:center;justify-content:space-between;padding:10px 16px}
.zfd-cname{font-family:var(--disp);font-size:18px;letter-spacing:1px;color:#ccc;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0}
.zfd-cmeta{font-family:var(--mono);font-size:8px;letter-spacing:2px;color:#2a2a2a;text-transform:uppercase;margin-left:10px;flex-shrink:0}
.zfd-views{font-family:var(--disp);font-size:16px;color:#252525;flex-shrink:0;margin-left:10px}
.za-empty{grid-column:1/-1;text-align:center;padding:120px 0;font-family:var(--mono);font-size:10px;letter-spacing:6px;color:#161616;text-transform:uppercase}

/* ═══════════════════════════════════════
   МОДАЛКА — WORLD CLASS CINEMATIC DESIGN
═══════════════════════════════════════ */
.za-ov2{
  position:fixed;inset:0;z-index:9999;
  background:rgba(0,0,0,.85);
  backdrop-filter:blur(32px) saturate(.4);
  display:flex;align-items:center;justify-content:center;
  opacity:0;pointer-events:none;
  transition:opacity .5s ease;
}
.za-ov2.open{opacity:1;pointer-events:all}

.za-modal{
  display:flex;
  width:min(1000px,96vw);
  height:min(660px,92vh);
  background:#000;
  border:1px solid rgba(255,255,255,.08);
  border-radius:20px;
  overflow:hidden;
  transform:scale(0.94) translateY(24px);
  transition:transform .6s cubic-bezier(0.16,1,0.3,1);
  box-shadow:0 80px 200px rgba(0,0,0,.98),0 0 0 1px rgba(255,255,255,.04);
}
.za-ov2.open .za-modal{transform:scale(1) translateY(0)}
.za-modal.hof-modal{border-color:rgba(255,215,0,.15);box-shadow:0 80px 200px rgba(0,0,0,.98),0 0 80px rgba(255,215,0,.05)}

/* ── ЛЕВАЯ ЧАСТЬ: ОБЛОЖКА ── */
.za-m-cover{
  flex:0 0 42%;
  position:relative;
  overflow:hidden;
  background:#0a0a0a;
}
.za-m-cover-init{
  position:absolute;inset:0;
  display:flex;align-items:center;justify-content:center;
  font-family:'Bebas Neue',sans-serif;font-size:140px;
  color:rgba(255,255,255,.03);letter-spacing:8px;
  z-index:0;user-select:none;
}
/* Кинематографический многослойный градиент поверх фото */
.za-m-cov-gradient{
  position:absolute;inset:0;z-index:2;pointer-events:none;
  background:
    linear-gradient(to right, transparent 60%, rgba(0,0,0,.95) 100%),
    linear-gradient(to top, rgba(0,0,0,.95) 0%, rgba(0,0,0,.5) 40%, transparent 65%),
    linear-gradient(to bottom, rgba(0,0,0,.4) 0%, transparent 25%);
}
/* Вертикальная декоративная полоса справа */
.za-m-cover::before{
  content:'';position:absolute;right:0;top:0;bottom:0;width:1px;
  background:linear-gradient(to bottom,transparent,rgba(255,69,0,.3) 40%,rgba(255,69,0,.3) 60%,transparent);
  z-index:5;
}

/* Тег верифицирован */
#za-m-vtag{position:absolute;top:22px;left:0;z-index:6}
.za-m-vtag{
  display:inline-flex;align-items:center;gap:7px;
  background:rgba(29,155,240,.9);
  backdrop-filter:blur(8px);
  color:#fff;padding:7px 18px 7px 14px;
  font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;
  clip-path:polygon(0 0,calc(100% - 10px) 0,100% 50%,calc(100% - 10px) 100%,0 100%);
}
.za-m-vtag.gold{background:linear-gradient(135deg,rgba(255,215,0,.95),rgba(255,165,0,.95));color:#000}

/* Имя артиста поверх фото внизу */
.za-m-cover-name-wrap{
  position:absolute;bottom:0;left:0;right:0;z-index:4;
  padding:0 28px 28px;
}
.za-m-cover-genre{
  font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:5px;
  color:#FF4500;text-transform:uppercase;margin-bottom:6px;
  opacity:.9;
}
.za-m-cover-title{
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(52px,5.5vw,82px);
  letter-spacing:3px;line-height:.95;
  color:#fff;text-transform:uppercase;
  text-shadow:0 4px 40px rgba(0,0,0,.8);
  word-break:break-word;
}
.za-m-cover-title.hof{
  background:linear-gradient(135deg,#FFD700 0%,#FFF5B0 50%,#FFD700 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.za-m-cover-city{
  font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:4px;
  color:rgba(255,255,255,.45);text-transform:uppercase;margin-top:8px;
}

/* ── ПРАВАЯ ЧАСТЬ: КОНТЕНТ ── */
.za-m-body{
  flex:1;overflow-y:auto;
  padding:36px 40px 32px 36px;
  scrollbar-width:thin;scrollbar-color:#1a1a1a transparent;
  position:relative;display:flex;flex-direction:column;gap:0;
  background:linear-gradient(160deg,#0d0d0d 0%,#080808 100%);
}
.za-m-body::-webkit-scrollbar{width:3px}
.za-m-body::-webkit-scrollbar-track{background:transparent}
.za-m-body::-webkit-scrollbar-thumb{background:#1e1e1e;border-radius:2px}

/* Кнопка закрыть */
.za-m-close{
  position:absolute;top:16px;right:16px;
  width:36px;height:36px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.1);
  color:rgba(255,255,255,.4);font-size:13px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  border-radius:50%;transition:all .3s;z-index:10;
  flex-shrink:0;
}
.za-m-close:hover{border-color:#FF4500;color:#FF4500;background:rgba(255,69,0,.08);transform:rotate(90deg)}

/* Скрытый дубль имени */
.za-m-name{display:none !important}

/* СЛОГАН */
.za-m-slogan{
  font-family:'Nunito',sans-serif;font-size:14px;font-weight:400;
  font-style:italic;color:rgba(255,255,255,.5);
  line-height:1.7;padding-left:14px;
  border-left:2px solid #FF4500;
  margin-bottom:24px;margin-top:8px;
  min-height:0;
}
.za-m-slogan:empty{display:none}

/* СТАТЫ — большие цифры */
.za-m-plays{
  display:flex;gap:0;
  margin-bottom:20px;
  background:rgba(255,255,255,.02);
  border:1px solid rgba(255,255,255,.05);
  border-radius:12px;overflow:hidden;
}
.za-m-stat-block{
  flex:1;padding:20px 24px;display:flex;flex-direction:column;gap:4px;
}
.za-m-stat-block:first-child{border-right:1px solid rgba(255,255,255,.05)}
.za-m-stat-num{
  font-family:'Bebas Neue',sans-serif;font-size:52px;line-height:1;
  color:#FF4500;letter-spacing:2px;
}
.za-m-stat-lbl{
  font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:4px;
  color:rgba(255,255,255,.3);text-transform:uppercase;
}

/* МЕТА: год, чарт */
.za-m-meta{
  display:flex;gap:0;flex-wrap:wrap;
  margin-bottom:20px;
}
.za-m-mi{
  display:flex;flex-direction:column;gap:4px;
  padding-right:24px;margin-right:24px;
  border-right:1px solid rgba(255,255,255,.06);
}
.za-m-mi:last-child{border-right:none;padding-right:0;margin-right:0}
.za-m-mi .l{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:4px;color:rgba(255,255,255,.35);text-transform:uppercase}
.za-m-mi .v{font-family:'Oswald',sans-serif;font-size:26px;font-weight:600;color:#fff;letter-spacing:1px;line-height:1.1}

/* БИО */
.za-m-bio{
  font-family:'Nunito',sans-serif;font-size:14px;font-weight:400;
  line-height:1.85;color:rgba(255,255,255,.6);
  margin-bottom:22px;flex:1;
}

/* СТАТЬ ФАНАТОМ */
.za-m-fan-row{
  display:flex;align-items:stretch;
  margin-bottom:18px;
  border-radius:12px;overflow:hidden;
  border:1px solid rgba(255,255,255,.07);
}
.za-m-fan-btn{
  flex:1;
  background:linear-gradient(135deg,#FF4500 0%,#FF6B00 100%);
  color:#fff;border:none;
  padding:18px 20px;
  font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;
  cursor:pointer;transition:filter .25s,background .3s;
}
.za-m-fan-btn:hover{filter:brightness(1.15)}
.za-m-fan-btn.on{
  background:rgba(255,69,0,.07);color:#FF4500;
  border-right:1px solid rgba(255,69,0,.12);
}
.za-m-fan-cnt{
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:0 24px;min-width:100px;
  background:rgba(255,255,255,.02);
}
.za-m-fan-cnt .n{font-family:'Bebas Neue',sans-serif;font-size:44px;color:#FF4500;line-height:1}
.za-m-fan-cnt .l{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:3px;color:rgba(255,255,255,.25);text-transform:uppercase;margin-top:2px}

/* СОЦСЕТИ */
.za-m-soc{display:flex;gap:6px;margin-bottom:14px}
.za-m-soc a{
  flex:1;position:relative;overflow:hidden;
  background:rgba(255,255,255,.03);
  border:1px solid rgba(255,255,255,.08);
  border-radius:8px;
  color:rgba(255,255,255,.55);
  padding:13px 6px;
  font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:2.5px;
  text-align:center;text-decoration:none;display:block;
  transition:all .25s;text-transform:uppercase;
}
.za-m-soc a::before{
  content:'';position:absolute;inset:0;
  background:#FF4500;transform:translateY(101%);
  transition:transform .3s cubic-bezier(.4,0,.2,1);z-index:0;
}
.za-m-soc a span{position:relative;z-index:1}
.za-m-soc a:hover{color:#fff;border-color:#FF4500}
.za-m-soc a:hover::before{transform:translateY(0)}

/* БЕЙДЖИ */
.za-m-bdg{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:14px;min-height:0}
.za-m-bdg:empty{display:none}
.za-badge{
  padding:6px 12px;
  background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.07);
  border-radius:100px;
  font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:2px;
  color:rgba(255,255,255,.35);
  display:flex;align-items:center;gap:5px;
  transition:all .2s;text-transform:uppercase;
}
.za-badge.gold{border-color:rgba(255,215,0,.2);color:rgba(255,215,0,.6);background:rgba(255,215,0,.03)}
.za-badge.hot{border-color:rgba(255,69,0,.2);color:rgba(255,69,0,.6);background:rgba(255,69,0,.03)}

/* RESPONSIVE */
@media(max-width:800px){
  .za-bar{padding:24px 20px 20px;flex-wrap:wrap;gap:20px}
  .za-filters,.za-alpha,.za-count,.za-grid{padding-left:16px;padding-right:16px}
  .za-grid{grid-template-columns:repeat(2,1fr);gap:2px}

  .za-modal{
    flex-direction:column;
    width:100vw;height:100dvh;
    border-radius:0;border:none;
    max-height:100dvh;
  }
  .za-m-cover{
    flex:0 0 52%;width:100%;
  }
  .za-m-cov-gradient{
    background:
      linear-gradient(to top, rgba(0,0,0,.98) 0%, rgba(0,0,0,.4) 45%, transparent 70%),
      linear-gradient(to bottom, rgba(0,0,0,.5) 0%, transparent 25%);
  }
  .za-m-cover-title{font-size:clamp(44px,11vw,68px)}
  .za-m-body{padding:24px 22px 28px;gap:0;flex:1;min-height:0}
  .za-m-plays{margin-bottom:16px}
  .za-m-stat-num{font-size:40px}
  .za-m-stat-block{padding:16px 18px}
  .za-m-fan-row{margin-bottom:14px}
  .za-m-soc{flex-wrap:nowrap}
  .za-m-soc a{font-size:8px;letter-spacing:1.5px;padding:12px 4px}
}
/* КНОПКИ ДЕЙСТВИЙ */
.za-m-actions{display:flex;gap:8px;margin-top:auto;padding-top:4px}
.za-m-share-btn{
  display:flex;align-items:center;gap:8px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.1);
  border-radius:10px;
  color:rgba(255,255,255,.7);
  padding:14px 20px;
  font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:3px;
  cursor:pointer;transition:all .25s;text-transform:uppercase;
  flex-shrink:0;
}
.za-m-share-btn:hover{border-color:#FF4500;color:#FF4500;background:rgba(255,69,0,.06)}
.za-m-book{
  flex:1;background:transparent;
  border:1px solid rgba(255,255,255,.07);
  border-radius:10px;
  color:rgba(255,255,255,.3);
  padding:14px;
  font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:4px;
  cursor:pointer;transition:all .25s;text-transform:uppercase;
}
.za-m-book:hover{border-color:rgba(255,69,0,.4);color:#FF4500;background:rgba(255,69,0,.04)}

/* ── SHARE POPUP ── */
.za-share-popup{
  position:fixed;inset:0;z-index:99999;
  background:rgba(0,0,0,.88);backdrop-filter:blur(24px);
  display:flex;align-items:center;justify-content:center;padding:20px;
  opacity:0;pointer-events:none;transition:opacity .3s;
}
.za-share-popup.open{opacity:1;pointer-events:all}
.za-share-box{
  background:#0e0e0e;border:1px solid rgba(255,255,255,.08);
  border-radius:24px;padding:32px 28px 28px;
  width:100%;max-width:420px;
  position:relative;
  transform:scale(.92) translateY(20px);
  transition:transform .4s cubic-bezier(.16,1,.3,1);
}
.za-share-popup.open .za-share-box{transform:scale(1) translateY(0)}
.za-share-close{
  position:absolute;top:14px;right:14px;
  width:32px;height:32px;border-radius:50%;
  background:rgba(255,255,255,.06);border:none;
  color:rgba(255,255,255,.4);font-size:14px;cursor:pointer;
  transition:all .2s;
}
.za-share-close:hover{background:rgba(255,69,0,.15);color:#FF4500}

/* ПРЕВЬЮ КАРТОЧКИ */
.za-share-preview{
  border-radius:16px;overflow:hidden;
  margin-bottom:24px;position:relative;
  aspect-ratio:1.91/1;background:#111;
}
.za-share-preview-inner{
  width:100%;height:100%;position:relative;
  display:flex;align-items:flex-end;
}
.za-share-preview-bg{
  position:absolute;inset:0;background-size:cover;background-position:center;
  filter:brightness(.5) saturate(1.3);
}
.za-share-preview-grad{
  position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(0,0,0,.7) 0%,transparent 60%),
             linear-gradient(to top,rgba(0,0,0,.92) 0%,transparent 55%);
}
.za-share-preview-logo{
  position:absolute;top:14px;left:16px;
  font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:3px;
  color:#FF4500;z-index:2;text-shadow:0 2px 12px rgba(0,0,0,.8);
}
.za-share-preview-content{
  position:relative;z-index:2;padding:16px 18px;width:100%;
}
.za-share-preview-genre{
  font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:4px;
  color:#FF4500;text-transform:uppercase;margin-bottom:4px;
}
.za-share-preview-name{
  font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,6vw,40px);
  letter-spacing:2px;color:#fff;line-height:1;
  text-shadow:0 2px 20px rgba(0,0,0,.8);
}
.za-share-preview-meta{
  font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:2px;
  color:rgba(255,255,255,.45);margin-top:5px;
}
.za-share-preview-handle{
  position:absolute;bottom:14px;right:16px;z-index:2;
  font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:2px;
  color:rgba(255,255,255,.4);
}

.za-share-label{
  font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:5px;
  color:rgba(255,255,255,.25);text-transform:uppercase;
  text-align:center;margin-bottom:16px;
}
.za-share-btns{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.za-share-app{
  display:flex;align-items:center;justify-content:center;gap:9px;
  padding:14px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.08);
  background:rgba(255,255,255,.03);
  color:rgba(255,255,255,.7);
  font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:2px;
  cursor:pointer;transition:all .2s;text-transform:uppercase;
}
.za-share-app svg{width:18px;height:18px;flex-shrink:0}
.za-share-app:hover{transform:translateY(-2px)}
.za-share-app.tg{border-color:rgba(41,182,246,.2);color:rgba(41,182,246,.8)}
.za-share-app.tg:hover{background:rgba(41,182,246,.1);border-color:rgba(41,182,246,.4)}
.za-share-app.wa{border-color:rgba(37,211,102,.2);color:rgba(37,211,102,.8)}
.za-share-app.wa:hover{background:rgba(37,211,102,.1);border-color:rgba(37,211,102,.4)}
.za-share-app.vk{border-color:rgba(74,118,168,.2);color:rgba(74,118,168,.8)}
.za-share-app.vk:hover{background:rgba(74,118,168,.1);border-color:rgba(74,118,168,.4)}
.za-share-app.copy{border-color:rgba(255,69,0,.2);color:rgba(255,69,0,.7)}
.za-share-app.copy:hover{background:rgba(255,69,0,.08);border-color:rgba(255,69,0,.4)}
.za-share-app.copied{border-color:rgba(0,230,118,.4);color:rgba(0,230,118,.9);background:rgba(0,230,118,.06)}

@keyframes za-fu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  `;
  document.head.appendChild(s);

  container.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:70vh;color:var(--acc,#ff4500);font-family:'Rajdhani',sans-serif;font-size:24px;font-weight:700;letter-spacing:2px;animation:za-blink 1s infinite;">ЗАГРУЗКА АРТИСТОВ...</div>`;
  _el = container;

  const oldDrawer=document.getElementById('za-float-drawer');
  if(oldDrawer)oldDrawer.remove();
  _drawer=null; _dAid=null; _dType=null;

  try {
      const fb = window.firebaseDb;
      const q = window.query(window.collection(fb, 'artistProfiles'), window.where('status', '==', 'approved'));
      const snap = await window.getDocs(q);

      _zarbaArtists = snap.docs.map(doc => {
          const d = doc.data();
          return {
              id: doc.id,
              name: d.nick || 'Без имени',
              city: d.city || 'Неизвестно',
              genre: d.genre || 'ДРУГОЕ',
              year: d.yearStart || new Date().getFullYear(),
              plays: d.plays || 0,
              fans: d.fans || 0,
              verified: d.verified || false,
              hof: d.hof || false,
              chartPos: d.chartPos || null,
              slogan: d.slogan || '',
              bio: d.bio || '',
              // 🔥 Убрали 🆕 по умолчанию — пустой массив если нет бейджей
              badges: Array.isArray(d.badges) ? d.badges : [],
              ig: d.social?.instagram || d.ig || '',
              tg: d.social?.telegram || d.tg || '',
              yt: d.social?.youtube || d.yt || '',
              photo: d.cardUrl || '',
              vertUrl: d.vertUrl || '',
              videos: d.videos || [],
              atHandle: d.atHandle || ''
          };
      });
  } catch(e) {
      console.error('Ошибка загрузки артистов:', e);
      container.innerHTML = `<div style="text-align:center;padding:50px;color:#ff4444;font-family:'Rajdhani',sans-serif;">Ошибка загрузки базы данных.</div>`;
      return;
  }

  // Загружаем фанатов текущего юзера из Firebase
  await loadUserFans();

  renderArtistsPage();
  initDrawer();
  document.addEventListener('keydown', e => { if(e.key === 'Escape') { window.closeArtistModal(); window.closeArtistDrawer(); } });
};