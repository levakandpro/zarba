function renderHome(container) {
    container.innerHTML = `
<!-- РАДИО ПЛЕЕР С ВОЛНАМИ -->
        <section class="radio-section">
            <div class="z-capsule">
                
                <!-- БЫЛО -->
                <div class="history-side prev">
                    <span class="history-label">БЫЛО</span>
                    <span class="history-track-bright">Underground King</span>
                </div>

                <!-- ВИЗУАЛЬНАЯ ЧАСТЬ (ВОЛНЫ + ПЛЕЙ) -->
                <div class="capsule-visual">
                    <!-- АУДИО ВОЛНЫ -->
                    <div class="audio-wave" id="audio-wave">
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                    </div>

                    <!-- ЭНЕРГЕТИЧЕСКИЕ КОЛЬЦА -->
                    <div class="energy-ring-1"></div>
                    <div class="energy-ring-2"></div>

                    <!-- КНОПКА ПЛЕЙ -->
                    <button class="play-btn-elite" id="radio-play" onclick="toggleRadio()">
                        <img src="assets/white.svg" alt="PLAY">
                    </button>
                </div>

                <!-- ИНФО КАПСУЛЫ -->
                <div class="capsule-info">
                    <!-- СТАТУС И ТЕГИ -->
                    <div class="status-row">
                        <div class="live-tag-green">
                            <span class="green-dot"></span> В ЭФИРЕ: <span id="online-count">1,254</span>
                        </div>
                        <div class="tags-group">
                            <span class="z-tag">#UNDERGROUND</span>
                            <span class="z-tag">ХУДЖАНД</span>
                        </div>
                    </div>

                    <!-- НАЗВАНИЕ ТРЕКА -->
                    <h1 class="pure-track-title" id="current-track">Название трека...</h1>

                    <!-- ПРОГРЕСС БАР -->
                    <div class="progress-zone">
                        <span class="time-current" id="time-current">01:45</span>
                        <div class="neon-line-bg">
                            <div class="neon-line-fill" id="progress-fill"></div>
                        </div>
                        <span class="time-total" id="time-total">03:20</span>
                    </div>

                    <!-- АРТИСТ -->
                    <h2 class="pure-artist-name" id="current-artist">Имя Артиста</h2>
                </div>

                <!-- ДАЛЬШЕ -->
                <div class="history-side next">
                    <span class="history-label">ДАЛЬШЕ</span>
                    <span class="history-track-bright">Tajik Style</span>
                </div>

                <!-- КНОПКА ЧАТ -->
                <div class="capsule-actions">
                    <button class="btn-chat-elite" onclick="toggleChat()">ЧАТ</button>
                </div>

            </div>
        </section>

        <!-- НОВИНКИ НЕДЕЛИ -->
        <section class="content-block">
            <h3 class="section-title">
                <img src="assets/tops/new.png" alt="New" class="section-icon">
                НОВИНКИ НЕДЕЛИ
            </h3>
            <div class="scroll-nav-row">
                <button class="scroll-arrow-btn" onclick="scrollSection('latest-releases', -1)">&#8249;</button>
                <div class="hscroll-wrapper" id="latest-releases-wrap">
                    <div class="grid-1-1 hscroll-inner" id="latest-releases">
                        <div class="release-item-skeleton"><img src="assets/black.svg" alt="cover"><div class="release-bottom"><span class="release-plays">▶ 43K</span><div class="release-card-btns"><button class="card-mini-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="card-mini-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div></div>
                        <div class="release-item-skeleton"><img src="assets/black.svg" alt="cover"><div class="release-bottom"><span class="release-plays">▶ 38K</span><div class="release-card-btns"><button class="card-mini-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="card-mini-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div></div>
                        <div class="release-item-skeleton"><img src="assets/black.svg" alt="cover"><div class="release-bottom"><span class="release-plays">▶ 31K</span><div class="release-card-btns"><button class="card-mini-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="card-mini-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div></div>
                        <div class="release-item-skeleton"><img src="assets/black.svg" alt="cover"><div class="release-bottom"><span class="release-plays">▶ 27K</span><div class="release-card-btns"><button class="card-mini-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="card-mini-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div></div>
                        <div class="release-item-skeleton"><img src="assets/black.svg" alt="cover"><div class="release-bottom"><span class="release-plays">▶ 24K</span><div class="release-card-btns"><button class="card-mini-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="card-mini-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div></div>
                        <div class="release-item-skeleton"><img src="assets/black.svg" alt="cover"><div class="release-bottom"><span class="release-plays">▶ 21K</span><div class="release-card-btns"><button class="card-mini-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="card-mini-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div></div>
                        <div class="release-item-skeleton"><img src="assets/black.svg" alt="cover"><div class="release-bottom"><span class="release-plays">▶ 18K</span><div class="release-card-btns"><button class="card-mini-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="card-mini-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div></div>
                        <div class="release-item-skeleton"><img src="assets/black.svg" alt="cover"><div class="release-bottom"><span class="release-plays">▶ 16K</span><div class="release-card-btns"><button class="card-mini-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="card-mini-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div></div>
                        <div class="release-item-skeleton"><img src="assets/black.svg" alt="cover"><div class="release-bottom"><span class="release-plays">▶ 14K</span><div class="release-card-btns"><button class="card-mini-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="card-mini-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div></div>
                        <div class="release-item-skeleton"><img src="assets/black.svg" alt="cover"><div class="release-bottom"><span class="release-plays">▶ 12K</span><div class="release-card-btns"><button class="card-mini-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="card-mini-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div></div>
                        <div class="release-item-skeleton"><img src="assets/black.svg" alt="cover"><div class="release-bottom"><span class="release-plays">▶ 9K</span><div class="release-card-btns"><button class="card-mini-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="card-mini-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div></div>
                        <div class="release-item-skeleton"><img src="assets/black.svg" alt="cover"><div class="release-bottom"><span class="release-plays">▶ 7K</span><div class="release-card-btns"><button class="card-mini-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="card-mini-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div></div>
                        <div class="release-item-skeleton"><img src="assets/black.svg" alt="cover"><div class="release-bottom"><span class="release-plays">▶ 5K</span><div class="release-card-btns"><button class="card-mini-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="card-mini-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div></div>
                    </div>
                </div>
                <button class="scroll-arrow-btn" onclick="scrollSection('latest-releases', 1)">&#8250;</button>
            </div>
        </section>

        <!-- ТОП 10 В ТРЕНДЕ -->
        <section class="content-block">
            <h3 class="section-title">
                <img src="assets/tops/top10.png" alt="Top 10" class="section-icon">
                В ТРЕНДЕ (TOP 10)
            </h3>
            <div class="vscroll-wrapper vscroll-top10" id="top-trends-wrap">
                <div class="trending-list" id="top-trends">
                    <div class="trend-track-row" data-src="audio/skaji-chto.mp3"><div class="rank">1</div><div class="trend-cover"><img src="assets/black.svg" alt="cover"></div><div class="trend-track-meta"><span class="t-name">Скажи Что Думаешь</span><span class="a-name">MC Artisan</span></div><div class="trend-player-controls"><button class="trend-play-btn" title="Play">▶</button><button class="trend-stop-btn" title="Stop">⏹</button><span class="trend-time">0:00</span><div class="trend-progress-bar"><div class="trend-progress-fill"></div></div><span class="trend-duration">0:00</span></div><div class="trend-indicators"><span class="trend-up">▲ 2</span></div><div class="trend-actions"><span class="trend-plays">▶ 124K</span><button class="player-action-btn trend-action-btn download-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="player-action-btn trend-action-btn add-playlist-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div>
                    <div class="trend-track-row" data-src="audio/nochnoy-gorod.mp3"><div class="rank">2</div><div class="trend-cover"><img src="assets/black.svg" alt="cover"></div><div class="trend-track-meta"><span class="t-name">Ночной Город</span><span class="a-name">Hustle Takir</span></div><div class="trend-player-controls"><button class="trend-play-btn" title="Play">▶</button><button class="trend-stop-btn" title="Stop">⏹</button><span class="trend-time">0:00</span><div class="trend-progress-bar"><div class="trend-progress-fill"></div></div><span class="trend-duration">0:00</span></div><div class="trend-indicators"><span class="trend-down">▼ 1</span></div><div class="trend-actions"><span class="trend-plays">▶ 98K</span><button class="player-action-btn trend-action-btn download-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="player-action-btn trend-action-btn add-playlist-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div>
                    <div class="trend-track-row" data-src="audio/ulicy-moi.mp3"><div class="rank">3</div><div class="trend-cover"><img src="assets/black.svg" alt="cover"></div><div class="trend-track-meta"><span class="t-name">Улицы Мои</span><span class="a-name">Young Flow</span></div><div class="trend-player-controls"><button class="trend-play-btn" title="Play">▶</button><button class="trend-stop-btn" title="Stop">⏹</button><span class="trend-time">0:00</span><div class="trend-progress-bar"><div class="trend-progress-fill"></div></div><span class="trend-duration">0:00</span></div><div class="trend-indicators"><span class="trend-up">▲ 5</span></div><div class="trend-actions"><span class="trend-plays">▶ 87K</span><button class="player-action-btn trend-action-btn download-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="player-action-btn trend-action-btn add-playlist-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div>
                    <div class="trend-track-row" data-src="audio/dushanbe-rulit.mp3"><div class="rank">4</div><div class="trend-cover"><img src="assets/black.svg" alt="cover"></div><div class="trend-track-meta"><span class="t-name">Душанбе Рулит</span><span class="a-name">Street Genius</span></div><div class="trend-player-controls"><button class="trend-play-btn" title="Play">▶</button><button class="trend-stop-btn" title="Stop">⏹</button><span class="trend-time">0:00</span><div class="trend-progress-bar"><div class="trend-progress-fill"></div></div><span class="trend-duration">0:00</span></div><div class="trend-indicators"><span class="trend-up">▲ 1</span></div><div class="trend-actions"><span class="trend-plays">▶ 76K</span><button class="player-action-btn trend-action-btn download-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="player-action-btn trend-action-btn add-playlist-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div>
                    <div class="trend-track-row" data-src="audio/holodnaya-noch.mp3"><div class="rank">5</div><div class="trend-cover"><img src="assets/black.svg" alt="cover"></div><div class="trend-track-meta"><span class="t-name">Холодная Ночь</span><span class="a-name">Taj Flow</span></div><div class="trend-player-controls"><button class="trend-play-btn" title="Play">▶</button><button class="trend-stop-btn" title="Stop">⏹</button><span class="trend-time">0:00</span><div class="trend-progress-bar"><div class="trend-progress-fill"></div></div><span class="trend-duration">0:00</span></div><div class="trend-indicators"><span class="trend-down">▼ 3</span></div><div class="trend-actions"><span class="trend-plays">▶ 65K</span><button class="player-action-btn trend-action-btn download-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="player-action-btn trend-action-btn add-playlist-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div>
                    <div class="trend-track-row" data-src="audio/na-vershine.mp3"><div class="rank">6</div><div class="trend-cover"><img src="assets/black.svg" alt="cover"></div><div class="trend-track-meta"><span class="t-name">На Вершине</span><span class="a-name">Alpha One</span></div><div class="trend-player-controls"><button class="trend-play-btn" title="Play">▶</button><button class="trend-stop-btn" title="Stop">⏹</button><span class="trend-time">0:00</span><div class="trend-progress-bar"><div class="trend-progress-fill"></div></div><span class="trend-duration">0:00</span></div><div class="trend-indicators"><span class="trend-up">▲ 4</span></div><div class="trend-actions"><span class="trend-plays">▶ 54K</span><button class="player-action-btn trend-action-btn download-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="player-action-btn trend-action-btn add-playlist-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div>
                    <div class="trend-track-row" data-src="audio/gornyy-vozduh.mp3"><div class="rank">7</div><div class="trend-cover"><img src="assets/black.svg" alt="cover"></div><div class="trend-track-meta"><span class="t-name">Горный Воздух</span><span class="a-name">Real Beats</span></div><div class="trend-player-controls"><button class="trend-play-btn" title="Play">▶</button><button class="trend-stop-btn" title="Stop">⏹</button><span class="trend-time">0:00</span><div class="trend-progress-bar"><div class="trend-progress-fill"></div></div><span class="trend-duration">0:00</span></div><div class="trend-indicators"><span class="trend-down">▼ 2</span></div><div class="trend-actions"><span class="trend-plays">▶ 48K</span><button class="player-action-btn trend-action-btn download-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="player-action-btn trend-action-btn add-playlist-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div>
                    <div class="trend-track-row" data-src="audio/bez-tormozov.mp3"><div class="rank">8</div><div class="trend-cover"><img src="assets/black.svg" alt="cover"></div><div class="trend-track-meta"><span class="t-name">Без Тормозов</span><span class="a-name">City Boy</span></div><div class="trend-player-controls"><button class="trend-play-btn" title="Play">▶</button><button class="trend-stop-btn" title="Stop">⏹</button><span class="trend-time">0:00</span><div class="trend-progress-bar"><div class="trend-progress-fill"></div></div><span class="trend-duration">0:00</span></div><div class="trend-indicators"><span class="trend-up">▲ 7</span></div><div class="trend-actions"><span class="trend-plays">▶ 43K</span><button class="player-action-btn trend-action-btn download-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="player-action-btn trend-action-btn add-playlist-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div>
                    <div class="trend-track-row" data-src="audio/ulica-zovet.mp3"><div class="rank">9</div><div class="trend-cover"><img src="assets/black.svg" alt="cover"></div><div class="trend-track-meta"><span class="t-name">Улица Зовёт</span><span class="a-name">Underground X</span></div><div class="trend-player-controls"><button class="trend-play-btn" title="Play">▶</button><button class="trend-stop-btn" title="Stop">⏹</button><span class="trend-time">0:00</span><div class="trend-progress-bar"><div class="trend-progress-fill"></div></div><span class="trend-duration">0:00</span></div><div class="trend-indicators"><span class="trend-up">▲ 3</span></div><div class="trend-actions"><span class="trend-plays">▶ 39K</span><button class="player-action-btn trend-action-btn download-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="player-action-btn trend-action-btn add-playlist-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div>
                    <div class="trend-track-row" data-src="audio/posledniy-shans.mp3"><div class="rank">10</div><div class="trend-cover"><img src="assets/black.svg" alt="cover"></div><div class="trend-track-meta"><span class="t-name">Последний Шанс</span><span class="a-name">Dark Poet</span></div><div class="trend-player-controls"><button class="trend-play-btn" title="Play">▶</button><button class="trend-stop-btn" title="Stop">⏹</button><span class="trend-time">0:00</span><div class="trend-progress-bar"><div class="trend-progress-fill"></div></div><span class="trend-duration">0:00</span></div><div class="trend-indicators"><span class="trend-down">▼ 1</span></div><div class="trend-actions"><span class="trend-plays">▶ 35K</span><button class="player-action-btn trend-action-btn download-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="player-action-btn trend-action-btn add-playlist-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div>
                    <div class="trend-track-row" data-src="audio/rassvet.mp3"><div class="rank">11</div><div class="trend-cover"><img src="assets/black.svg" alt="cover"></div><div class="trend-track-meta"><span class="t-name">Рассвет Над Городом</span><span class="a-name">Smoke Lyric</span></div><div class="trend-player-controls"><button class="trend-play-btn" title="Play">▶</button><button class="trend-stop-btn" title="Stop">⏹</button><span class="trend-time">0:00</span><div class="trend-progress-bar"><div class="trend-progress-fill"></div></div><span class="trend-duration">0:00</span></div><div class="trend-indicators"><span class="trend-up">▲ 2</span></div><div class="trend-actions"><span class="trend-plays">▶ 28K</span><button class="player-action-btn trend-action-btn download-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="player-action-btn trend-action-btn add-playlist-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div>
                    <div class="trend-track-row" data-src="audio/zhivoy-zvuk.mp3"><div class="rank">12</div><div class="trend-cover"><img src="assets/black.svg" alt="cover"></div><div class="trend-track-meta"><span class="t-name">Живой Звук</span><span class="a-name">Soul Beats</span></div><div class="trend-player-controls"><button class="trend-play-btn" title="Play">▶</button><button class="trend-stop-btn" title="Stop">⏹</button><span class="trend-time">0:00</span><div class="trend-progress-bar"><div class="trend-progress-fill"></div></div><span class="trend-duration">0:00</span></div><div class="trend-indicators"><span class="trend-down">▼ 4</span></div><div class="trend-actions"><span class="trend-plays">▶ 21K</span><button class="player-action-btn trend-action-btn download-btn" title="Скачать"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="player-action-btn trend-action-btn add-playlist-btn" title="В плейлист"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div>
                </div>
            </div>
        </section>

        <!-- АРТИСТЫ МЕСЯЦА -->
        <section class="content-block">
            <h3 class="section-title">
                <img src="assets/tops/artist.png" alt="Artist" class="section-icon">
                АРТИСТЫ МЕСЯЦА
            </h3>
            <div class="scroll-nav-row artists-scroll-row">
                <button class="scroll-arrow-btn" onclick="scrollSection('featured-artists', -1)">&#8249;</button>
                <div class="hscroll-wrapper" id="featured-artists-wrap">
                    <div class="artists-grid-home hscroll-inner" id="featured-artists">
                        <div class="artist-card-skeleton"><div class="circle-avatar"><img src="assets/black.svg" alt="artist"></div><div class="artist-name">MC Artisan</div></div>
                        <div class="artist-card-skeleton"><div class="circle-avatar"><img src="assets/black.svg" alt="artist"></div><div class="artist-name">Hustle Takir</div></div>
                        <div class="artist-card-skeleton"><div class="circle-avatar"><img src="assets/black.svg" alt="artist"></div><div class="artist-name">Young Flow</div></div>
                        <div class="artist-card-skeleton"><div class="circle-avatar"><img src="assets/black.svg" alt="artist"></div><div class="artist-name">Street Genius</div></div>
                        <div class="artist-card-skeleton"><div class="circle-avatar"><img src="assets/black.svg" alt="artist"></div><div class="artist-name">Dushanbe King</div></div>
                        <div class="artist-card-skeleton"><div class="circle-avatar"><img src="assets/black.svg" alt="artist"></div><div class="artist-name">Taj Flow</div></div>
                        <div class="artist-card-skeleton"><div class="circle-avatar"><img src="assets/black.svg" alt="artist"></div><div class="artist-name">Alpha One</div></div>
                        <div class="artist-card-skeleton"><div class="circle-avatar"><img src="assets/black.svg" alt="artist"></div><div class="artist-name">Real Beats</div></div>
                        <div class="artist-card-skeleton"><div class="circle-avatar"><img src="assets/black.svg" alt="artist"></div><div class="artist-name">City Boy</div></div>
                        <div class="artist-card-skeleton"><div class="circle-avatar"><img src="assets/black.svg" alt="artist"></div><div class="artist-name">Underground X</div></div>
                        <div class="artist-card-skeleton"><div class="circle-avatar"><img src="assets/black.svg" alt="artist"></div><div class="artist-name">Smoke Lyric</div></div>
                        <div class="artist-card-skeleton"><div class="circle-avatar"><img src="assets/black.svg" alt="artist"></div><div class="artist-name">Dark Poet</div></div>
                        <div class="artist-card-skeleton"><div class="circle-avatar"><img src="assets/black.svg" alt="artist"></div><div class="artist-name">Street Legend</div></div>
                    </div>
                </div>
                <button class="scroll-arrow-btn" onclick="scrollSection('featured-artists', 1)">&#8250;</button>
            </div>
        </section>

        <!-- РИНГТОНЫ -->
        <section class="content-block">
            <h3 class="section-title">
                <img src="assets/tops/ringtone.png" alt="Ringtone" class="section-icon">
                РИНГТОНЫ
            </h3>
            <div class="vscroll-wrapper ringtones-scroll" id="ringtones-wrap">
                <div class="ringtones-list" id="ringtones-list">
                <div class="custom-player" data-src="audio/tajik-trap-beat.wav" data-title="Tajik Trap Beat"><div class="player-controls"><button class="player-btn play-pause-btn" title="Play/Pause">▶</button><button class="player-btn stop-btn" title="Stop">⏹</button></div><div class="player-info"><div class="player-title">Tajik Trap Beat</div><div class="ringtone-plays">▶ 89K прослушиваний</div><div class="player-progress-container"><span class="player-time current-time">0:00</span><div class="player-progress-bar"><div class="player-progress-fill"></div></div><span class="player-duration">0:00</span></div></div><div class="player-actions"><button class="player-action-btn download-btn" title="Download"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="player-action-btn add-playlist-btn" title="Add to Playlist"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div>
                <div class="custom-player" data-src="audio/underground-vibes.wav" data-title="Underground Vibes"><div class="player-controls"><button class="player-btn play-pause-btn" title="Play/Pause">▶</button><button class="player-btn stop-btn" title="Stop">⏹</button></div><div class="player-info"><div class="player-title">Underground Vibes</div><div class="ringtone-plays">▶ 74K прослушиваний</div><div class="player-progress-container"><span class="player-time current-time">0:00</span><div class="player-progress-bar"><div class="player-progress-fill"></div></div><span class="player-duration">0:00</span></div></div><div class="player-actions"><button class="player-action-btn download-btn" title="Download"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="player-action-btn add-playlist-btn" title="Add to Playlist"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div>
                <div class="custom-player" data-src="audio/city-pulse.wav" data-title="City Pulse"><div class="player-controls"><button class="player-btn play-pause-btn" title="Play/Pause">▶</button><button class="player-btn stop-btn" title="Stop">⏹</button></div><div class="player-info"><div class="player-title">City Pulse</div><div class="ringtone-plays">▶ 61K прослушиваний</div><div class="player-progress-container"><span class="player-time current-time">0:00</span><div class="player-progress-bar"><div class="player-progress-fill"></div></div><span class="player-duration">0:00</span></div></div><div class="player-actions"><button class="player-action-btn download-btn" title="Download"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="player-action-btn add-playlist-btn" title="Add to Playlist"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div>
                <div class="custom-player" data-src="audio/street-flow.wav" data-title="Street Flow"><div class="player-controls"><button class="player-btn play-pause-btn" title="Play/Pause">▶</button><button class="player-btn stop-btn" title="Stop">⏹</button></div><div class="player-info"><div class="player-title">Street Flow</div><div class="ringtone-plays">▶ 55K прослушиваний</div><div class="player-progress-container"><span class="player-time current-time">0:00</span><div class="player-progress-bar"><div class="player-progress-fill"></div></div><span class="player-duration">0:00</span></div></div><div class="player-actions"><button class="player-action-btn download-btn" title="Download"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="player-action-btn add-playlist-btn" title="Add to Playlist"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div>
                <div class="custom-player" data-src="audio/dushanbe-nights.wav" data-title="Dushanbe Nights"><div class="player-controls"><button class="player-btn play-pause-btn" title="Play/Pause">▶</button><button class="player-btn stop-btn" title="Stop">⏹</button></div><div class="player-info"><div class="player-title">Dushanbe Nights</div><div class="ringtone-plays">▶ 48K прослушиваний</div><div class="player-progress-container"><span class="player-time current-time">0:00</span><div class="player-progress-bar"><div class="player-progress-fill"></div></div><span class="player-duration">0:00</span></div></div><div class="player-actions"><button class="player-action-btn download-btn" title="Download"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18v10.17l-3.59-3.58L7 10l5 5 5-5-1.41-1.41L13 12.17V2h-2z"/></svg></button><button class="player-action-btn add-playlist-btn" title="Add to Playlist"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div></div>
                </div>
            </div>
        </section>

        <!-- НОВИЧКИ -->
        <section class="content-block">
            <h3 class="section-title">
                <img src="assets/tops/new.png" alt="Новички" class="section-icon">
                НОВИЧКИ
            </h3>
            <div class="scroll-nav-row">
                <button class="scroll-arrow-btn" onclick="scrollSection('newcomers-list', -1)">&#8249;</button>
                <div class="hscroll-wrapper" id="newcomers-wrap">
                    <div class="hscroll-inner" id="newcomers-list">
                        <div class="newcomer-card"><div class="newcomer-card-cover"><img src="assets/black.svg" alt="cover"></div><div class="newcomer-card-accent"></div><div class="newcomer-card-info"><span class="newcomer-card-badge">★ DEBUT</span><span class="newcomer-card-title">Первый Шаг</span><span class="newcomer-card-artist">Navo Rap</span><div class="newcomer-footer"><span class="newcomer-plays">▶ 8K</span></div></div></div>
                        <div class="newcomer-card"><div class="newcomer-card-cover"><img src="assets/black.svg" alt="cover"></div><div class="newcomer-card-accent"></div><div class="newcomer-card-info"><span class="newcomer-card-badge">★ NEW</span><span class="newcomer-card-title">Свой Путь</span><span class="newcomer-card-artist">Khujand MC</span><div class="newcomer-footer"><span class="newcomer-plays">▶ 6K</span></div></div></div>
                        <div class="newcomer-card"><div class="newcomer-card-cover"><img src="assets/black.svg" alt="cover"></div><div class="newcomer-card-accent"></div><div class="newcomer-card-info"><span class="newcomer-card-badge">★ DEBUT</span><span class="newcomer-card-title">Голос Улиц</span><span class="newcomer-card-artist">Young Tajik</span><div class="newcomer-footer"><span class="newcomer-plays">▶ 5K</span></div></div></div>
                        <div class="newcomer-card"><div class="newcomer-card-cover"><img src="assets/black.svg" alt="cover"></div><div class="newcomer-card-accent"></div><div class="newcomer-card-info"><span class="newcomer-card-badge">★ FRESH</span><span class="newcomer-card-title">Дорога Домой</span><span class="newcomer-card-artist">Flow Dushanbe</span><div class="newcomer-footer"><span class="newcomer-plays">▶ 4K</span></div></div></div>
                        <div class="newcomer-card"><div class="newcomer-card-cover"><img src="assets/black.svg" alt="cover"></div><div class="newcomer-card-accent"></div><div class="newcomer-card-info"><span class="newcomer-card-badge">★ NEW</span><span class="newcomer-card-title">Начало Конца</span><span class="newcomer-card-artist">Rap Kurgan</span><div class="newcomer-footer"><span class="newcomer-plays">▶ 4K</span></div></div></div>
                        <div class="newcomer-card"><div class="newcomer-card-cover"><img src="assets/black.svg" alt="cover"></div><div class="newcomer-card-accent"></div><div class="newcomer-card-info"><span class="newcomer-card-badge">★ DEBUT</span><span class="newcomer-card-title">Огонь В Душе</span><span class="newcomer-card-artist">Sughd MC</span><div class="newcomer-footer"><span class="newcomer-plays">▶ 3K</span></div></div></div>
                        <div class="newcomer-card"><div class="newcomer-card-cover"><img src="assets/black.svg" alt="cover"></div><div class="newcomer-card-accent"></div><div class="newcomer-card-info"><span class="newcomer-card-badge">★ FRESH</span><span class="newcomer-card-title">Взлёт</span><span class="newcomer-card-artist">Drip Taj</span><div class="newcomer-footer"><span class="newcomer-plays">▶ 3K</span></div></div></div>
                        <div class="newcomer-card"><div class="newcomer-card-cover"><img src="assets/black.svg" alt="cover"></div><div class="newcomer-card-accent"></div><div class="newcomer-card-info"><span class="newcomer-card-badge">★ NEW</span><span class="newcomer-card-title">Без Цензуры</span><span class="newcomer-card-artist">Raw Verse</span><div class="newcomer-footer"><span class="newcomer-plays">▶ 2K</span></div></div></div>
                        <div class="newcomer-card"><div class="newcomer-card-cover"><img src="assets/black.svg" alt="cover"></div><div class="newcomer-card-accent"></div><div class="newcomer-card-info"><span class="newcomer-card-badge">★ DEBUT</span><span class="newcomer-card-title">Тихий Крик</span><span class="newcomer-card-artist">Soul Drop</span><div class="newcomer-footer"><span class="newcomer-plays">▶ 2K</span></div></div></div>
                        <div class="newcomer-card"><div class="newcomer-card-cover"><img src="assets/black.svg" alt="cover"></div><div class="newcomer-card-accent"></div><div class="newcomer-card-info"><span class="newcomer-card-badge">★ FRESH</span><span class="newcomer-card-title">Прорыв</span><span class="newcomer-card-artist">New Era TJ</span><div class="newcomer-footer"><span class="newcomer-plays">▶ 1K</span></div></div></div>
                    </div>
                </div>
                <button class="scroll-arrow-btn" onclick="scrollSection('newcomers-list', 1)">&#8250;</button>
            </div>
        </section>
    `;

    function scrollSection(id, dir) {
        const el = container.querySelector('#' + id);
        const wrap = el ? el.closest('.hscroll-wrapper') : null;
        if (wrap) wrap.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
    window.scrollSection = scrollSection;

    container.querySelectorAll('.hscroll-wrapper').forEach(el => {
        let isDown = false, startX, scrollLeft;
        el.addEventListener('mousedown', e => { isDown = true; el.classList.add('dragging'); startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; });
        el.addEventListener('mouseleave', () => { isDown = false; el.classList.remove('dragging'); });
        el.addEventListener('mouseup', () => { isDown = false; el.classList.remove('dragging'); });
        el.addEventListener('mousemove', e => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX); });
        el.addEventListener('wheel', e => { e.preventDefault(); el.scrollBy({ left: e.deltaY * 2, behavior: 'smooth' }); }, { passive: false });
    });

    (function initTrendPlayers() {
        let currentAudio = null, currentRow = null;
        function fmt(s) { if (isNaN(s)) return '0:00'; return Math.floor(s/60) + ':' + String(Math.floor(s%60)).padStart(2,'0'); }
        container.querySelectorAll('.trend-track-row').forEach(row => {
            const audio = new Audio(row.getAttribute('data-src'));
            const playBtn = row.querySelector('.trend-play-btn');
            const stopBtn = row.querySelector('.trend-stop-btn');
            const fill = row.querySelector('.trend-progress-fill');
            const timeEl = row.querySelector('.trend-time');
            const durEl = row.querySelector('.trend-duration');
            const progBar = row.querySelector('.trend-progress-bar');
            let playing = false;
            audio.addEventListener('loadedmetadata', () => { durEl.textContent = fmt(audio.duration); });
            audio.addEventListener('timeupdate', () => { fill.style.width = (audio.currentTime/audio.duration*100)+'%'; timeEl.textContent = fmt(audio.currentTime); });
            audio.addEventListener('ended', () => { playing=false; playBtn.textContent='▶'; fill.style.width='0%'; timeEl.textContent='0:00'; });
            progBar.addEventListener('click', e => { audio.currentTime = ((e.clientX-progBar.getBoundingClientRect().left)/progBar.offsetWidth)*audio.duration; });
            playBtn.addEventListener('click', e => {
                e.stopPropagation();
                if (playing) { audio.pause(); playing=false; playBtn.textContent='▶'; }
                else {
                    if (currentAudio && currentAudio!==audio) { currentAudio.pause(); currentAudio.currentTime=0; currentRow.querySelector('.trend-play-btn').textContent='▶'; currentRow.querySelector('.trend-progress-fill').style.width='0%'; currentRow.querySelector('.trend-time').textContent='0:00'; }
                    audio.play(); playing=true; playBtn.textContent='⏸'; currentAudio=audio; currentRow=row;
                }
            });
            stopBtn.addEventListener('click', e => { e.stopPropagation(); audio.pause(); audio.currentTime=0; playing=false; playBtn.textContent='▶'; fill.style.width='0%'; timeEl.textContent='0:00'; });
        });

        container.querySelectorAll('.custom-player').forEach(playerEl => {
            const audio = new Audio(playerEl.getAttribute('data-src') || '');
            const playPauseBtn = playerEl.querySelector('.play-pause-btn');
            const stopBtn = playerEl.querySelector('.stop-btn');
            const progressBar = playerEl.querySelector('.player-progress-bar');
            const progressFill = playerEl.querySelector('.player-progress-fill');
            const currentTimeEl = playerEl.querySelector('.current-time');
            const durationEl = playerEl.querySelector('.player-duration');
            let isPlaying = false;
            function formatTime(s) { if (isNaN(s)) return '0:00'; return Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0'); }
            playPauseBtn.addEventListener('click', () => { if (isPlaying) { audio.pause(); playPauseBtn.textContent='▶'; isPlaying=false; } else { audio.play(); playPauseBtn.textContent='⏸'; isPlaying=true; } });
            stopBtn.addEventListener('click', () => { audio.pause(); audio.currentTime=0; playPauseBtn.textContent='▶'; isPlaying=false; if(progressFill)progressFill.style.width='0%'; if(currentTimeEl)currentTimeEl.textContent='0:00'; });
            audio.addEventListener('timeupdate', () => { if(progressFill)progressFill.style.width=(audio.currentTime/audio.duration*100)+'%'; if(currentTimeEl)currentTimeEl.textContent=formatTime(audio.currentTime); });
            audio.addEventListener('loadedmetadata', () => { if(durationEl)durationEl.textContent=formatTime(audio.duration); });
            if(progressBar) progressBar.addEventListener('click', e => { const r=progressBar.getBoundingClientRect(); audio.currentTime=((e.clientX-r.left)/r.width)*audio.duration; });
            audio.addEventListener('ended', () => { playPauseBtn.textContent='▶'; isPlaying=false; });
        });
    })();
}