/**
 * ZARBA ADMIN ENGINE v1.0 (90% Logic)
 * Включает: Музыку, Артистов, Радио/LIVE, Базар, Финансы и Чат.
 */

export const ZarbaAdmin = {
    // Настройки комиссий и лимитов
    config: {
        commission: 0.35, // Твои 35%
        fanPrice: 50,     // Цена подписки в сомони
        bazarTerm: 30     // Срок аренды на Базаре (дней)
    },

    // Инициализация админки
    init() {
        console.log("Zarba Engine Started...");
        this.renderMainLayout();
    },

    // --- 1. ВЕРСТКА И ИНТЕРФЕЙС (Инлайновые стили) ---
    renderMainLayout() {
        const root = document.getElementById('admin-root');
        if (!root) return;

        root.innerHTML = `
            <div style="display:flex; flex-direction:column; min-height:100vh; background:#0a0a0a; color:#eee; font-family: 'Segoe UI', sans-serif;">
                <div style="padding:15px 25px; background:#111; border-bottom:2px solid #ffcc00; display:flex; justify-content:space-between; align-items:center;">
                    <h1 style="margin:0; color:#ffcc00; letter-spacing:2px;">ZARBA ADMIN <span style="font-size:12px; color:#666;">v1.0</span></h1>
                    <div id="admin-status" style="font-size:14px; color:#00ff00;">● Online</div>
                </div>

                <div style="display:flex; flex:1;">
                    <div style="width:240px; background:#111; padding:20px; border-right:1px solid #222;">
                        ${this.btnNav('music', '🎵 Музыка & R2')}
                        ${this.btnNav('artists', '🎤 Артисты & Режим Бога')}
                        ${this.btnNav('radio', '📻 Радио & LIVE')}
                        ${this.btnNav('bazar', '🏪 Z-Bazar (Аренда)')}
                        ${this.btnNav('finance', '💰 Финансы & Чеки')}
                        ${this.btnNav('chat', '💬 Модерация Чата')}
                    </div>

                    <div id="content-view" style="flex:1; padding:30px; overflow-y:auto; background: linear-gradient(180deg, #111 0%, #0a0a0a 100%);">
                        <h2 style="color:#666;">Выберите раздел в меню...</h2>
                    </div>
                </div>
            </div>
        `;
        this.switchSection('music'); // Стартовый экран
    },

    btnNav(id, label) {
        return `<div onclick="window.ZarbaAdmin.switchSection('${id}')" 
                     style="padding:15px; margin-bottom:8px; cursor:pointer; border-radius:8px; transition:0.2s; font-weight:500;"
                     onmouseover="this.style.background='#222'; this.style.color='#ffcc00'" 
                     onmouseout="this.style.background='transparent'; this.style.color='#eee'">
                     ${label}</div>`;
    },

    switchSection(id) {
        const view = document.getElementById('content-view');
        switch(id) {
            case 'music': this.drawMusic(view); break;
            case 'artists': this.drawArtists(view); break;
            case 'radio': this.drawRadio(view); break;
            case 'bazar': this.drawBazar(view); break;
            case 'finance': this.drawFinance(view); break;
            case 'chat': this.drawChat(view); break;
        }
    },

    // --- 2. МУЗЫКАЛЬНЫЙ СКЛАД (R2) ---
    drawMusic(v) {
        v.innerHTML = `
            <h3>Склад аудио (Cloudflare R2)</h3>
            <button onclick="window.ZarbaAdmin.scanR2()" style="padding:12px 20px; background:#ffcc00; border:none; border-radius:5px; cursor:pointer; font-weight:bold;">Сканировать новые файлы</button>
            <div id="r2-results" style="margin-top:20px; display:grid; gap:10px;">
                </div>
        `;
    },

    // --- 3. ФИНАНСЫ И ПОДПИСКИ (35/65) ---
    drawFinance(v) {
        v.innerHTML = `
            <h3>Финансовый контроль</h3>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                <div style="background:#151515; padding:20px; border-radius:12px;">
                    <h4 style="color:#ffcc00;">Проверка чеков (Фанаты)</h4>
                    <div id="pending-fans">Ждем чеки из Telegram...</div>
                </div>
                <div style="background:#151515; padding:20px; border-radius:12px;">
                    <h4 style="color:#ffcc00;">Выплаты Артистам</h4>
                    <div id="withdraw-requests">Нет запросов на вывод...</div>
                </div>
            </div>
        `;
    },

    // Главная функция одобрения (Твоя Математика)
    approveFan(userId, artistId, amount = 50) {
        const myCut = amount * this.config.commission; // 17.5с
        const artistCut = amount - myCut; // 32.5с
        
        console.log(`Подписка одобрена! Тебе: ${myCut}с, Артисту: ${artistCut}с`);
        // Здесь вызов Firestore для:
        // 1. Активации isFan на 30 дней у юзера.
        // 2. Прибавления 32.5с к балансу артиста.
        alert(`Готово! Артисту начислено ${artistCut} сомони.`);
    },

    // --- 4. РАДИО И LIVE ---
    drawRadio(v) {
        v.innerHTML = `
            <h3>Управление Эфиром</h3>
            <div style="background:#151515; padding:25px; border-radius:15px; border:1px solid #333;">
                <div style="display:flex; align-items:center; gap:20px; margin-bottom:20px;">
                    <label style="font-size:20px; color:#ff3333; font-weight:bold;">
                        <input type="checkbox" onchange="window.ZarbaAdmin.toggleLive(this.checked)" style="width:22px; height:22px;"> ПРЯМОЙ ЭФИР
                    </label>
                    <input id="guest-name" type="text" placeholder="Имя гостя..." style="flex:1; padding:10px; background:#222; border:1px solid #444; color:#fff; border-radius:5px;">
                </div>
                <hr style="border:0; border-top:1px solid #333; margin:20px 0;">
                <h4>Ротация плейлистов:</h4>
                <div id="playlist-checks">
                    <label><input type="checkbox" checked> KOMPOT</label><br>
                    <label><input type="checkbox"> UNDERGROUND</label>
                </div>
            </div>
        `;
    },

    // --- 5. МОДЕРАЦИЯ ЧАТА ---
    drawChat(v) {
        v.innerHTML = `
            <h3>Модерация Чата Радио</h3>
            <div id="chat-monitor" style="height:300px; background:#000; overflow-y:scroll; padding:15px; border-radius:10px; border:1px solid #333; margin-bottom:15px;">
                <div style="margin-bottom:10px; border-bottom:1px solid #222; padding-bottom:5px;">
                    <b style="color:#ffcc00;">User123:</b> Всем привет! 
                    <button onclick="this.parentElement.remove()" style="float:right; background:red; color:white; border:none; padding:2px 5px; cursor:pointer;">Удалить</button>
                </div>
            </div>
            <input type="text" placeholder="Написать в закреп..." style="width:70%; padding:10px; background:#222; border:1px solid #444; color:#fff;">
            <button style="padding:10px; background:#ffcc00; border:none; font-weight:bold; cursor:pointer;">ЗАКРЕПИТЬ</button>
        `;
    },

    // --- 6. БАЗАР (АРЕНДА) ---
    drawBazar(v) {
        v.innerHTML = `
            <h3>Управление Базаром</h3>
            <div style="background:#151515; padding:20px; border-radius:12px;">
                <table style="width:100%; border-collapse:collapse;">
                    <tr style="text-align:left; color:#666;">
                        <th>Продавец</th><th>Тип</th><th>Осталось дней</th><th>Действие</th>
                    </tr>
                    <tr>
                        <td>Dark Production</td><td>Студия</td><td>12 дн.</td>
                        <td><button onclick="alert('Продлено на 30 дней')" style="background:#00ff00; border:none; padding:5px 10px; cursor:pointer; border-radius:4px;">+30 дней</button></td>
                    </tr>
                </table>
            </div>
        `;
    }
};

// Экспортируем в глобальное окно для работы onclick
window.ZarbaAdmin = ZarbaAdmin;