/* ZARBA — ARTISTS | PREMIUM */

const ZA_DATA=[
  {id:1,name:'PARVEEZ',city:'Худжанд',genre:'АНДЕРГРАУНД',year:2018,plays:248000,fans:142000,verified:true,hof:true,chartPos:1,slogan:'Одиночество — мой лучший трек.',bio:'Один из первых артистов ZARBA. Его Lonely разорвал андерграунд-сцену страны.',badges:['👑','🏆','🔥'],ig:'parveez',tg:'parveez_music',yt:'parveez'},
  {id:2,name:'MC ARTISAN',city:'Душанбе',genre:'РЭП',year:2017,plays:211000,fans:98500,verified:true,hof:false,chartPos:2,slogan:'Скажи что думаешь — или молчи.',bio:'Автор главного хита ТОП-1 ZARBA. Истинный MC старой школы.',badges:['👑','🎤'],ig:'mc_artisan',tg:'',yt:'mc_artisan'},
  {id:3,name:'HUSTLE TAKIR',city:'Душанбе',genre:'ТРЭП',year:2020,plays:198000,fans:87200,verified:true,hof:false,chartPos:3,slogan:'Ночной город — мой адрес.',bio:'Главный голос трэп-сцены столицы. Биты из подвала — прямо в сердце.',badges:['🔥','🎛️'],ig:'hustle_takir',tg:'hustle_takir',yt:''},
  {id:4,name:'YOUNG FLOW',city:'Куляб',genre:'РЭП',year:2021,plays:187000,fans:65400,verified:true,hof:false,chartPos:4,slogan:'Улицы мои — от начала до конца.',bio:'Голос юга. Рифмует жизнь так, как она есть — без прикрас.',badges:['📈'],ig:'young_flow',tg:'young_flow_official',yt:'young_flow'},
  {id:5,name:'STREET GENIUS',city:'Душанбе',genre:'РЭП',year:2019,plays:176000,fans:112000,verified:true,hof:true,chartPos:5,slogan:'Душанбе рулит — запомни.',bio:'Уличный гений с академическим текстом. 100К фанатов — заслуженно.',badges:['🏆','👑','🔥'],ig:'street_genius',tg:'street_genius',yt:'street_genius'},
  {id:6,name:'SINO',city:'Худжанд',genre:'ЛИРИКА',year:2020,plays:154000,fans:76300,verified:true,hof:false,chartPos:7,slogan:'Боль рифмуется с надеждой.',bio:'Лирический поэт севера. Его треки стали гимнами для целого поколения.',badges:['🎤','📈'],ig:'sino_music',tg:'sino_music',yt:''},
  {id:7,name:'MALIKA',city:'Душанбе',genre:'ПОЭТЕССА',year:2021,plays:143000,fans:54200,verified:true,hof:false,chartPos:9,slogan:'Женский голос без цензуры.',bio:'Первая женщина в ТОП-10 ZARBA. Голос нового поколения.',badges:['⭐','🎵'],ig:'malika_rap',tg:'malika_official',yt:'malika_rap'},
  {id:8,name:'OZOD',city:'Худжанд',genre:'АНДЕРГРАУНД',year:2018,plays:139000,fans:88900,verified:true,hof:false,chartPos:6,slogan:'Андерграунд не умирает.',bio:'Хранитель классического хип-хопа. 8 лет на сцене, сотни выступлений.',badges:['🎤','📈'],ig:'ozod_hj',tg:'ozod_official',yt:'ozod_music'},
  {id:9,name:'DUSHANBE PROD',city:'Душанбе',genre:'ПРОДЮСЕР',year:2017,plays:128000,fans:110000,verified:true,hof:true,chartPos:null,slogan:'Ритм столицы в каждом бите.',bio:'Продюсировал треки для 40+ артистов ZARBA. Архитектор звука.',badges:['🏆','🎛️'],ig:'dushanbe_prod',tg:'',yt:'dushanbe_prod'},
  {id:10,name:'TEMUR G',city:'Душанбе',genre:'ТРЭП',year:2021,plays:121000,fans:67800,verified:true,hof:false,chartPos:8,slogan:'Темно. Громко. Честно.',bio:'Его биты слышат от Душанбе до Берлина. Главный трэп-экспортёр страны.',badges:['📈','🔥'],ig:'temur_g',tg:'temur_g_trap',yt:'temur_g'},
  {id:11,name:'ZARINA B',city:'Худжанд',genre:'ПОЭТЕССА',year:2019,plays:97000,fans:41500,verified:true,hof:false,chartPos:14,slogan:'Стихи на двух языках.',bio:'Bilingual — пишет на русском и таджикском. 500К прослушиваний суммарно.',badges:['🌍','🎤'],ig:'zarina_b',tg:'zarina_b_music',yt:''},
  {id:12,name:'FIRUZ',city:'Куляб',genre:'РЭП',year:2022,plays:78000,fans:23400,verified:false,hof:false,chartPos:22,slogan:'Юг говорит.',bio:'Свежий голос с юга. Врывается в ТОП с первого релиза — следи.',badges:['🆕'],ig:'firuz_kulyab',tg:'',yt:''},
  {id:13,name:'KAMOL',city:'Бохтар',genre:'РЭП',year:2020,plays:67000,fans:31200,verified:false,hof:false,chartPos:27,slogan:'Работаю в тишине.',bio:'Независимый артист без лейбла. Каждый трек — история с улицы Бохтара.',badges:['🎵'],ig:'kamol_rap',tg:'kamol_music',yt:'kamol_rap'},
  {id:14,name:'NASIBA',city:'Душанбе',genre:'ПОЭТЕССА',year:2023,plays:43000,fans:18700,verified:false,hof:false,chartPos:null,slogan:'Только начала.',bio:'Дебютировала в 2023. Уже 50К стримов на первом сингле. Будущее здесь.',badges:['🆕'],ig:'nasiba_dj',tg:'nasiba_official',yt:''},
  {id:15,name:'UNDERGROUND K',city:'Худжанд',genre:'АНДЕРГРАУНД',year:2016,plays:186000,fans:93000,verified:true,hof:false,chartPos:11,slogan:'Король подземелья.',bio:'Ветеран сцены. Ещё до ZARBA он уже выступал. Живая легенда андерграунда.',badges:['🎤','👑'],ig:'underground_king',tg:'uk_music',yt:'underground_king'},
  {id:16,name:'TAJIK STYLE',city:'Душанбе',genre:'ПОП',year:2020,plays:165000,fans:58000,verified:true,hof:false,chartPos:13,slogan:'Поп — это не слабость.',bio:'Доказывает, что таджикский поп может звучать современно и гордо.',badges:['🎵','📈'],ig:'tajik_style',tg:'tajik_style',yt:'tajik_style'},
  {id:17,name:'GHAYRAT',city:'Пенджикент',genre:'ЛИРИКА',year:2019,plays:112000,fans:47600,verified:false,hof:false,chartPos:17,slogan:'Горы дали мне голос.',bio:'Из Пенджикента в ТОП-20. Его лирика пахнет горами и честью.',badges:['🎵'],ig:'ghayrat_music',tg:'',yt:'ghayrat'},
  {id:18,name:'IBROHIM',city:'Хорог',genre:'РЭП',year:2021,plays:89000,fans:34100,verified:false,hof:false,chartPos:21,slogan:'Памир не молчит.',bio:'Первый рэпер из Хорога в чарте ZARBA. Гордость Бадахшана.',badges:['🆕','🌍'],ig:'ibrohim_khorog',tg:'ibrohim_rap',yt:''},
  {id:19,name:'SAFAR',city:'Душанбе',genre:'КАЛЬЯННЫЙ',year:2020,plays:134000,fans:52300,verified:true,hof:false,chartPos:15,slogan:'Дым и рифмы.',bio:'Создатель жанра кальянный рэп в Таджикистане. Атмосфера на максимум.',badges:['🎛️','🔥'],ig:'safar_rap',tg:'safar_official',yt:'safar_music'},
  {id:20,name:'DILOVAR',city:'Бохтар',genre:'ЛИРИКА',year:2022,plays:56000,fans:21800,verified:false,hof:false,chartPos:31,slogan:'Слова тяжелее камней.',bio:'Новый лирик из Бохтара. Его дебютный альбом собрал 100К за месяц.',badges:['🆕'],ig:'dilovar_music',tg:'dilovar',yt:''},
];

const CITIES=['Все города','Душанбе','Худжанд','Куляб','Хорог','Бохтар','Пенджикент'];
const GENRES=['Все жанры','РЭП','ТРЭП','ЛИРИКА','ПОЭТЕССА','АНДЕРГРАУНД','ПОП','ПРОДЮСЕР','КАЛЬЯННЫЙ'];
const ALPHA='АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯ'.split('');
const GBGS=['linear-gradient(160deg,#0f0f0f,#1a1514)','linear-gradient(160deg,#0a0d14,#0f1620)','linear-gradient(160deg,#100a0a,#1e1010)','linear-gradient(160deg,#0d0a14,#131020)','linear-gradient(160deg,#0a100a,#101a10)','linear-gradient(160deg,#100a0e,#1a1018)','linear-gradient(160deg,#0d1008,#141e10)','linear-gradient(160deg,#0f0f0a,#1a1a10)'];
const TN=['Одиночество','Город спит','Без тебя','Голос улиц','Ночной дрейф','Первый снег','Честность','Без названия','На краю','Тишина','Подожди','Огонь','Последний раз','Время','Старый двор'];
const CB=['#1a0a0a','#0a0d1a','#0d120a','#14100a','#100a14','#0a1014'];
const fmt=n=>n>=1e6?(n/1e6).toFixed(1)+'М':n>=1e3?(n/1e3).toFixed(0)+'К':String(n);
const ini=n=>n.trim().split(/\s+/).map(w=>w[0].toUpperCase()).join('').slice(0,2);

let _el,_state={city:'Все города',genre:'Все жанры',alpha:'',search:'',sort:'plays'};
let _faned=new Set(),_openId=null;
let _drawer=null,_dAid=null,_dType=null;

function initDrawer(){
  if(document.getElementById('za-float-drawer'))return;
  _drawer=document.createElement('div');
  _drawer.id='za-float-drawer';
  _drawer.innerHTML='<div class="zfd-head"><div class="zfd-title" id="zfd-title"></div><button class="zfd-close" id="zfd-close">✕</button></div><div class="zfd-list" id="zfd-list"></div>';
  document.body.appendChild(_drawer);
  document.getElementById('zfd-close').addEventListener('click',closeDrawer);
  document.addEventListener('click',e=>{
    if(!e.target.closest('#za-float-drawer')&&!e.target.classList.contains('za-side-btn'))closeDrawer();
  });
}

function openDrawer(aid,type,cardEl){
  const a=ZA_DATA.find(x=>x.id===aid);if(!a||!_drawer)return;
  const r=cardEl.getBoundingClientRect();
  _drawer.style.top=r.top+'px';
  _drawer.style.left=(r.right+6)+'px';
  _drawer.style.height=r.height+'px';
  document.getElementById('zfd-title').textContent=type==='tracks'?'ТРЕКИ':'КЛИПЫ';
  const list=document.getElementById('zfd-list');
  if(type==='tracks'){
    const cnt=Math.max(5,Math.min(15,Math.floor(a.plays/15000)));
    list.innerHTML=Array.from({length:cnt},(_,i)=>{
      const min=2+Math.floor(Math.random()*2),sec=String(10+Math.floor(Math.random()*50)).padStart(2,'0');
      const feat=i>0&&i%3===0?'feat. '+['MC Artisan','Sino','Ozod','Young Flow'][i%4]:'';
      return'<div class="zfd-track"><div class="zfd-num">'+(i+1)+'</div><div class="zfd-play">▶</div><div class="zfd-info"><div class="zfd-name">'+TN[i%TN.length]+'</div>'+(feat?'<div class="zfd-feat">'+feat+'</div>':'')+'</div><div class="zfd-dur">'+min+':'+sec+'</div></div>';
    }).join('');
    list.querySelectorAll('.zfd-track').forEach(tr=>tr.addEventListener('click',e=>{
      e.stopPropagation();
      list.querySelectorAll('.zfd-track').forEach(t=>t.classList.remove('playing'));
      tr.classList.add('playing');
    }));
  } else {
    const cnt=Math.max(2,Math.min(6,Math.floor(a.plays/40000)));
    const YT_IDS=['dQw4w9WgXcQ','9bZkp7q19f0','kJQP7kiw5Fk','OPf0YbXqDm0','3tmd-ClpJxA','fJ9rUzIMcZQ'];
    list.innerHTML=Array.from({length:cnt},(_,i)=>{
      const v=Math.floor(a.plays/(i+1)*.8*(0.5+Math.random()));
      const ytId=YT_IDS[i%YT_IDS.length];
      const title=TN[i%TN.length];
      return`<div class="zfd-clip" data-ytid="${ytId}">
        <div class="zfd-video-wrap" id="zfd-vw-${aid}-${i}">
          <div class="zfd-video-cover" style="--bg:${CB[i%CB.length]}" id="zfd-vc-${aid}-${i}">
            <div class="play-icon"></div>
          </div>
        </div>
        <div class="zfd-clip-bottom">
          <div class="zfd-cname">${title}</div>
          <div class="zfd-cmeta">Z-MEDIA</div>
          <div class="zfd-views">${fmt(v)}</div>
        </div>
      </div>`;
    }).join('');
    list.querySelectorAll('.zfd-clip').forEach((clip,i)=>{
      const cover=clip.querySelector('.zfd-video-cover');
      const wrap=clip.querySelector('.zfd-video-wrap');
      const ytId=clip.dataset.ytid;
      cover.addEventListener('click',e=>{
        e.stopPropagation();
        cover.classList.add('hidden');
        const iframe=document.createElement('iframe');
        iframe.src=`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
        iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen=true;
        wrap.appendChild(iframe);
      });
    });
  }
  _dAid=aid;_dType=type;
  _drawer.classList.add('open');
}

function closeDrawer(){
  if(_drawer)_drawer.classList.remove('open');
  _dAid=null;_dType=null;
  _el&&_el.querySelectorAll('.za-side-btn').forEach(b=>b.classList.remove('zs-active'));
}

function getList(){
  const{city,genre,alpha,search,sort}=_state;
  let list=ZA_DATA.filter(a=>{
    if(city!=='Все города'&&a.city!==city)return false;
    if(genre!=='Все жанры'&&a.genre!==genre)return false;
    if(alpha&&!a.name.toUpperCase().startsWith(alpha))return false;
    if(search){const q=search.toLowerCase();if(!a.name.toLowerCase().includes(q)&&!a.city.toLowerCase().includes(q)&&!a.genre.toLowerCase().includes(q))return false;}
    return true;
  });
  if(sort==='plays')list.sort((a,b)=>b.plays-a.plays);
  else if(sort==='fans')list.sort((a,b)=>b.fans-a.fans);
  else if(sort==='alpha')list.sort((a,b)=>a.name.localeCompare(b.name,'ru'));
  else if(sort==='new')list.sort((a,b)=>b.year-a.year);
  return list;
}

function renderArtistsPage(){
  const list=getList(),total=ZA_DATA.reduce((s,a)=>s+a.plays,0),hof=ZA_DATA.filter(a=>a.hof).length;
  _el.id='za-page';
  _el.innerHTML=`
<div class="za-bar">
  <div class="za-bar-stats">
    <div class="za-bs"><div class="za-bs-n">${ZA_DATA.length}</div><div class="za-bs-l">Артистов</div></div>
    <div class="za-bar-divider"></div>
    <div class="za-bs"><div class="za-bs-n">${fmt(total)}</div><div class="za-bs-l">Прослушиваний</div></div>
    <div class="za-bar-divider"></div>
    <div class="za-bs"><div class="za-bs-n"><span class="za-ldot"></span>${hof}</div><div class="za-bs-l">Зал Славы</div></div>
  </div>
  <button class="za-join-btn" id="za-join"><span>+ Стать артистом</span></button>
</div>
<div class="za-filters">
  <div class="za-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="15" y2="15"/></svg><input type="text" id="za-q" placeholder="Поиск..." value="${_state.search}"></div>
  <select class="za-sel" id="za-cs">${CITIES.map(c=>`<option value="${c}"${_state.city===c?' selected':''}>${c}</option>`).join('')}</select>
  <select class="za-sel" id="za-gs">${GENRES.map(g=>`<option value="${g}"${_state.genre===g?' selected':''}>${g}</option>`).join('')}</select>
  <select class="za-sel" id="za-ss"><option value="plays"${_state.sort==='plays'?' selected':''}>По прослушиваниям</option><option value="fans"${_state.sort==='fans'?' selected':''}>По фанатам</option><option value="alpha"${_state.sort==='alpha'?' selected':''}>А — Я</option><option value="new"${_state.sort==='new'?' selected':''}>Новые</option></select>
</div>
<div class="za-alpha"><button class="za-ab all ${_state.alpha===''?'on':''}" data-a="">ВСЕ</button>${ALPHA.map(l=>`<button class="za-ab ${_state.alpha===l?'on':''}" data-a="${l}">${l}</button>`).join('')}</div>
<div class="za-count">${list.length} / ${ZA_DATA.length} артистов</div>
<div class="za-grid">
${list.length===0?'<div class="za-empty">Нет результатов</div>':list.map((a,i)=>{
  const gb=GBGS[i%GBGS.length],on=_faned.has(a.id);
  return`<div class="za-card${a.hof?' hof':''}" data-id="${a.id}" style="animation:za-fu .45s ${Math.min(i*.05,.6)}s both">
  <div class="za-card-init" style="--gb:${gb}">${ini(a.name)}</div>
  ${a.verified?`<div class="za-card-v${a.hof?' gold':''}">✓</div>`:''}
  ${a.chartPos?`<div class="za-card-chart">#${a.chartPos}</div>`:''}
  <div class="za-card-ov">
    <div class="za-ov-name">${a.name}</div>
    <div class="za-ov-genre">${a.genre}</div>
    <div class="za-ov-line"></div>
    <div class="za-ov-meta"><span class="za-ov-city">${a.city}</span><span class="za-ov-plays">${fmt(a.plays)}</span></div>
    <button class="za-ov-fan${on?' on':''}" data-id="${a.id}">${on?'✓ Ты фанат':'+ Стать фанатом'}</button>
  </div>
  <div class="za-card-btns">
    <button class="za-side-btn" data-type="tracks" data-id="${a.id}">Треки</button>
    <button class="za-side-btn" data-type="clips" data-id="${a.id}">Клипы</button>
  </div>
</div>`;}).join('')}
</div>
<div class="za-ov2" id="za-ov2">
  <div class="za-modal" id="za-modal-inner">
    <div class="za-m-cover" id="za-m-cov"><div class="za-m-cover-init" id="za-m-ini"></div><div id="za-m-vtag"></div></div>
    <div class="za-m-body">
      <button class="za-m-close" id="za-m-cls">✕</button>
      <div class="za-m-name" id="za-m-nm"></div>
      <div class="za-m-slogan" id="za-m-sl"></div>
      <div class="za-m-meta" id="za-m-mt"></div>
      <div class="za-m-plays" id="za-m-pl"></div>
      <div class="za-m-bio" id="za-m-bio"></div>
      <div class="za-m-fan-row">
        <button class="za-m-fan-btn" id="za-m-fb"><span>+ Стать фанатом</span></button>
        <div class="za-m-fan-cnt"><div class="n" id="za-m-fn"></div><div class="l">фанатов</div></div>
      </div>
      <div class="za-m-soc" id="za-m-soc"></div>
      <div class="za-m-bdg" id="za-m-bdg"></div>
      <button class="za-m-book" id="za-m-bk">Booking / Связаться</button>
    </div>
  </div>
</div>`;
  bind();
}

function bind(){
  const q=s=>_el.querySelector(s),qa=s=>[..._el.querySelectorAll(s)];
  q('#za-q')?.addEventListener('input',e=>{_state.search=e.target.value;closeDrawer();renderArtistsPage();});
  q('#za-cs')?.addEventListener('change',e=>{_state.city=e.target.value;closeDrawer();renderArtistsPage();});
  q('#za-gs')?.addEventListener('change',e=>{_state.genre=e.target.value;closeDrawer();renderArtistsPage();});
  q('#za-ss')?.addEventListener('change',e=>{_state.sort=e.target.value;closeDrawer();renderArtistsPage();});
  qa('.za-ab').forEach(b=>b.addEventListener('click',()=>{_state.alpha=b.dataset.a;closeDrawer();renderArtistsPage();}));
  q('#za-join')?.addEventListener('click',()=>alert('Форма регистрации артиста — скоро!'));
  qa('.za-side-btn').forEach(btn=>btn.addEventListener('click',e=>{
    e.stopPropagation();
    const id=+btn.dataset.id,type=btn.dataset.type,card=btn.closest('.za-card');
    if(_dAid===id&&_dType===type){closeDrawer();return;}
    qa('.za-side-btn').forEach(b=>b.classList.remove('zs-active'));
    btn.classList.add('zs-active');
    openDrawer(id,type,card);
  }));
  qa('.za-card').forEach(c=>c.addEventListener('click',e=>{
    if(e.target.closest('.za-card-btns'))return;
    if(e.target.classList.contains('za-ov-fan'))return;
    closeDrawer();
    openModal(ZA_DATA.find(x=>x.id===+c.dataset.id));
  }));
  qa('.za-ov-fan').forEach(b=>b.addEventListener('click',e=>{
    e.stopPropagation();
    const id=+b.dataset.id;
    if(_faned.has(id))return;
    _faned.add(id);ZA_DATA.find(x=>x.id===id).fans++;renderArtistsPage();
  }));
  q('#za-ov2')?.addEventListener('click',e=>{if(e.target.id==='za-ov2')closeModal();});
  q('#za-m-cls')?.addEventListener('click',closeModal);
  q('#za-m-fb')?.addEventListener('click',()=>{if(!_openId||_faned.has(_openId))return;_faned.add(_openId);const a=ZA_DATA.find(x=>x.id===_openId);if(a){a.fans++;syncFan(a);}});
  q('#za-m-bk')?.addEventListener('click',()=>{const a=ZA_DATA.find(x=>x.id===_openId);if(a)alert('Booking: '+a.name+'\nTelegram: @'+(a.tg||'zarba_booking'));});
}

function openModal(a){
  if(!a)return;_openId=a.id;
  const q=s=>_el.querySelector(s),gb=GBGS[a.id%GBGS.length];
  const m=q('#za-modal-inner');if(a.hof)m.classList.add('hof-modal');else m.classList.remove('hof-modal');
  const cov=q('#za-m-cov');cov.style.background=gb;const oi=cov.querySelector('img');if(oi)oi.remove();
  if(a.photo){const img=document.createElement('img');img.src=a.photo;img.alt=a.name;cov.insertBefore(img,cov.firstChild);}
  q('#za-m-ini').textContent=ini(a.name);
  q('#za-m-vtag').innerHTML=a.verified?'<div class="za-m-vtag '+(a.hof?'gold':'')+'">✓ '+(a.hof?'Легенда ZARBA':'Верифицирован')+'</div>':'';
  const nm=q('#za-m-nm');nm.textContent=a.name;nm.className='za-m-name'+(a.hof?' gold':'');
  q('#za-m-sl').textContent='"'+a.slogan+'"';
  q('#za-m-mt').innerHTML=[{l:'Город',v:a.city},{l:'Жанр',v:a.genre},{l:'С',v:a.year},...(a.chartPos?[{l:'Чарт',v:'#'+a.chartPos}]:[])].map(m=>'<div class="za-m-mi"><div class="l">'+m.l+'</div><div class="v">'+m.v+'</div></div>').join('');
  q('#za-m-pl').innerHTML='<div class="za-m-mi"><div class="l">Прослушивания</div><div class="v">'+fmt(a.plays)+'</div></div><div class="za-m-mi"><div class="l">Треков</div><div class="v">~'+Math.max(1,Math.floor(a.plays/15000))+'</div></div>';
  q('#za-m-bio').textContent=a.bio;syncFan(a);
  q('#za-m-soc').innerHTML=[{l:'Instagram',u:a.ig?'https://instagram.com/'+a.ig:'#'},{l:'Telegram',u:a.tg?'https://t.me/'+a.tg:'#'},{l:'YouTube',u:a.yt?'https://youtube.com/@'+a.yt:'#'}].map(s=>'<a href="'+s.u+'" target="_blank" rel="noopener"><span>'+s.l+'</span></a>').join('');
  const bm={'👑':'Топ-1','🏆':'Зал Славы','🔥':'Горячий','🎤':'Верифицирован','📈':'Топ-10','⭐':'Дебют','🎵':'Трек недели','🎛️':'Продюсер','🌍':'Билингвал','🆕':'Новичок'};
  q('#za-m-bdg').innerHTML=a.badges.map(b=>{const g=b==='🏆'||b==='👑',h=b==='🔥'||b==='📈';return'<div class="za-badge '+(g?'gold':h?'hot':'')+'">'+b+' '+(bm[b]||'')+'</div>';}).join('');
  q('#za-ov2').classList.add('open');document.body.style.overflow='hidden';
}

function syncFan(a){
  const q=s=>_el.querySelector(s),on=_faned.has(a.id);
  const btn=q('#za-m-fb');if(btn){btn.innerHTML=on?'<span>✓ Ты фанат</span>':'<span>+ Стать фанатом</span>';btn.className='za-m-fan-btn'+(on?' on':'');}
  const n=q('#za-m-fn');if(n)n.textContent=fmt(a.fans);
}

function closeModal(){_el.querySelector('#za-ov2')?.classList.remove('open');document.body.style.overflow='';_openId=null;}

function renderArtists(container){
  // Удаляем старый CSS
  const old=document.getElementById('za2-css');
  if(old)old.remove();
  const s=document.createElement('style');
  s.id='za2-css';
  s.textContent=`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
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
.za-card-init{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-size:clamp(90px,9vw,160px);color:rgba(255,255,255,.04);letter-spacing:4px;background:var(--gb,#0e0e0e);transition:transform .7s cubic-bezier(.25,.46,.45,.94),color .5s;user-select:none}
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
.za-ov2{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.92);backdrop-filter:blur(20px) saturate(.5);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .35s ease}
.za-ov2.open{opacity:1;pointer-events:all}
.za-modal{display:flex;width:min(1100px,96vw);height:min(720px,92vh);background:#0a0a0a;border:1px solid #151515;overflow:hidden;transform:scale(.94) translateY(24px);transition:transform .4s cubic-bezier(.25,.46,.45,.94);box-shadow:0 40px 120px rgba(0,0,0,.8)}
.za-ov2.open .za-modal{transform:scale(1) translateY(0)}
.za-modal.hof-modal{border-color:rgba(255,215,0,.2)}
.za-m-cover{flex:0 0 340px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#0f0f0f}
.za-m-cover-init{font-family:var(--disp);font-size:130px;color:rgba(255,255,255,.05);letter-spacing:8px;position:relative;z-index:0;user-select:none}
.za-m-cover img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;filter:grayscale(15%) brightness(.6);z-index:1}
.za-m-cover::after{content:'';position:absolute;inset:0;z-index:2;background:linear-gradient(to right,rgba(0,0,0,0) 20%,#0a0a0a 100%),linear-gradient(to top,rgba(0,0,0,.8) 0%,transparent 60%);pointer-events:none}
#za-m-vtag{position:absolute;bottom:24px;left:0;z-index:4}
.za-m-vtag{display:inline-block;background:#1D9BF0;color:#fff;padding:9px 26px 9px 18px;font-family:var(--mono);font-size:11px;letter-spacing:4px;text-transform:uppercase;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 50%,calc(100% - 12px) 100%,0 100%)}
.za-m-vtag.gold{background:linear-gradient(135deg,#FFD700,#FFA500);color:#000}
.za-m-body{flex:1;overflow-y:auto;padding:50px 50px 44px 42px;scrollbar-width:none;position:relative;display:flex;flex-direction:column}
.za-m-body::-webkit-scrollbar{display:none}
.za-m-close{position:absolute;top:20px;right:20px;width:42px;height:42px;background:rgba(255,255,255,.03);border:1px solid #1a1a1a;color:#444;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;z-index:10}
.za-m-close:hover{border-color:#FF4500;color:#FF4500}
.za-m-name{font-family:var(--disp);font-size:clamp(52px,5.5vw,74px);letter-spacing:4px;line-height:.95;color:#fff;margin-bottom:12px;padding-right:60px}
.za-m-name.gold{color:#FFD700}
.za-m-slogan{font-family:'Rajdhani',sans-serif;font-size:18px;font-weight:300;font-style:italic;color:#666;line-height:1.5;border-left:2px solid #FF4500;padding-left:16px;margin-bottom:32px}
.za-m-meta{display:flex;padding:0 0 28px;border-bottom:1px solid #111;margin-bottom:24px;flex-wrap:wrap}
.za-m-mi{display:flex;flex-direction:column;gap:7px;padding-right:32px;margin-right:32px;border-right:1px solid #1a1a1a}
.za-m-mi:last-child{border-right:none;padding-right:0;margin-right:0}
.za-m-mi .l{font-family:var(--mono);font-size:10px;letter-spacing:5px;color:#888;text-transform:uppercase}
.za-m-mi .v{font-family:var(--disp);font-size:34px;color:#fff;letter-spacing:2px;line-height:1}
.za-m-plays{display:flex;padding:0 0 24px;border-bottom:1px solid #111;margin-bottom:24px}
.za-m-plays .za-m-mi .v{color:#FF4500;font-size:44px}
.za-m-bio{font-family:'Rajdhani',sans-serif;font-size:18px;font-weight:400;line-height:1.75;color:#888;margin-bottom:32px;flex:1}
.za-m-fan-row{display:flex;align-items:stretch;margin-bottom:28px}
.za-m-fan-btn{flex:1;background:#FF4500;color:#fff;border:none;padding:22px 28px;font-family:var(--mono);font-size:12px;letter-spacing:6px;text-transform:uppercase;cursor:pointer;transition:background .25s;clip-path:polygon(0 0,calc(100% - 16px) 0,100% 50%,calc(100% - 16px) 100%,0 100%);position:relative;overflow:hidden}
.za-m-fan-btn.on{background:transparent;color:#FF4500;border:1px solid rgba(255,69,0,.3);clip-path:none}
.za-m-fan-cnt{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 0 0 28px;min-width:90px;text-align:right}
.za-m-fan-cnt .n{font-family:var(--disp);font-size:46px;color:#FF4500;line-height:1}
.za-m-fan-cnt .l{font-family:var(--mono);font-size:9px;letter-spacing:3px;color:#555;text-transform:uppercase;margin-top:3px}
.za-m-soc{display:flex;gap:5px;margin-bottom:16px}
.za-m-soc a{flex:1;position:relative;overflow:hidden;background:transparent;border:1px solid #161616;color:#555;padding:16px 10px;font-family:var(--mono);font-size:10px;letter-spacing:4px;text-align:center;text-decoration:none;display:block;transition:color .3s,border-color .3s;text-transform:uppercase}
.za-m-soc a::before{content:'';position:absolute;inset:0;background:#FF4500;transform:translateY(101%);transition:transform .3s cubic-bezier(.4,0,.2,1);z-index:0}
.za-m-soc a span{position:relative;z-index:1}
.za-m-soc a:hover{color:#fff;border-color:#FF4500}
.za-m-soc a:hover::before{transform:translateY(0)}
.za-m-bdg{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:18px}
.za-badge{padding:10px 16px;background:rgba(255,255,255,.02);border:1px solid #1e1e1e;font-family:'Rajdhani',sans-serif;font-size:12px;font-weight:600;letter-spacing:2px;color:#666;display:flex;align-items:center;gap:7px;transition:all .2s;text-transform:uppercase}
.za-badge.gold{border-color:rgba(255,215,0,.25);color:rgba(255,215,0,.7);background:rgba(255,215,0,.04)}
.za-badge.hot{border-color:rgba(255,69,0,.25);color:rgba(255,69,0,.7);background:rgba(255,69,0,.04)}
.za-m-book{width:100%;background:transparent;border:1px solid #1e1e1e;color:#555;padding:18px;font-family:var(--mono);font-size:10px;letter-spacing:6px;cursor:pointer;transition:all .25s;text-transform:uppercase}
.za-m-book:hover{border-color:#333;color:#888}
@media(max-width:800px){.za-bar{padding:24px 20px 20px;flex-wrap:wrap;gap:20px}.za-filters,.za-alpha,.za-count,.za-grid{padding-left:16px;padding-right:16px}.za-grid{grid-template-columns:repeat(2,1fr);gap:2px}.za-modal{flex-direction:column;height:auto;max-height:92vh}.za-m-cover{flex:0 0 260px}.za-m-body{padding:28px 24px 28px}.za-m-name{font-size:38px}}
@keyframes za-fu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  `;
  document.head.appendChild(s);

  // Чистим drawer от прошлого рендера
  const oldDrawer=document.getElementById('za-float-drawer');
  if(oldDrawer)oldDrawer.remove();
  _drawer=null;_dAid=null;_dType=null;
  _el=container;
  renderArtistsPage();
  initDrawer();
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeDrawer();}});
}