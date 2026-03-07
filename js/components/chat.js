// ============================================================
//  ZARBA — MEGA CHAT [v2.0] - REDESIGN
//  Красивый чат: анимированные эмодзи, YouTube превью,
//  статусы пользователей, индикатор печатания и многое другое
// ============================================================

(function() {

// ── КОНФИГ ───────────────────────────────────────────────
const CHAT_CONFIG = {
    maxMessages: 200,
    typingTimeout: 2000,
    autoScrollThreshold: 150,
    youtubePreviewEnabled: true,
};

// ── ДЕМО-ПОЛЬЗОВАТЕЛИ ────────────────────────────────────
const DEMO_USERS = [
    { id: 'u1', name: 'MANZUR', role: 'artist', color: '#FF4500', avatar: 'M', online: true },
    { id: 'u2', name: 'FARID_TJ', role: 'fan', color: '#00D4FF', avatar: 'F', online: true },
    { id: 'u3', name: 'DUSHANBE_BOY', role: 'fan', color: '#A855F7', avatar: 'D', online: false },
    { id: 'u4', name: 'ZARBA_OFFICIAL', role: 'mod', color: '#FFD700', avatar: 'Z', online: true },
    { id: 'u5', name: 'KHURSHID', role: 'artist', color: '#FF4500', avatar: 'K', online: true },
];

// ── АНИМИРОВАННЫЕ ЭМОДЗИ-ПАКИ ────────────────────────────
const EMOJI_PACKS = {
    '😊': ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','😚','😙','🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🫢','🫣','🤫','🤔','🫡','🤐','🤨','😐','😑','😶','🫥','😏','😒','🙄','😬','🤥','🫨','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵','🤯','🤠','🥳','🥸','😎','🤓','🧐','😕','🫤','😟','🙁','☹️','😮','😯','😲','😳','🥺','🫹','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬','😈','👿','💀','☠️','💩','🤡','👹','👺','👻','👽','👾','🤖'],
    '👋': ['👋','🤚','🖐️','✋','🖖','🫱','🫲','🫳','🫴','👌','🤌','🤏','✌️','🤞','🫰','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','🫵','👍','👎','✊','👊','🤛','🤜','👏','🙌','🫶','👐','🤲','🤝','🙏','✍️','💅','🤳','💪','🦾','🦵','🦿','🦶','👂','🦻','👃','🫀','🫁','🧠','🦷','🦴','👀','👁️','👅','👄','🫦','💋','👶','🧒','👦','👧','🧑','👱','👨','🧔','👩','🧓','👴','👵','🙍','🙎','🙅','🙆','💁','🙋','🧏','🙇','🤦','🤷'],
    '❤️': ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❤️‍🔥','❤️‍🩹','💕','💞','💓','💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉️','☸️','🪯','✡️','🔯','🕎','☯️','☦️','🛐','⛎','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚛️','🉑','☢️','☣️','📴','📳','🈶','🈚','🈸','🈺','🈷️','✴️','🆚','💮','🉐','㊙️','㊗️','🈴','🈵','🈹','🈲','🅰️','🅱️','🆎','🆑','🅾️','🆘','❌','⭕','🛑','⛔','📛','🚫','💯','💢','♨️','🚷','🚯','🚳','🚱','🔞','📵','🔕'],
    '🐶': ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐻‍❄️','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐒','🦆','🐧','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🦟','🦗','🪲','🕷️','🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🦣','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🦬','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🦮','🐕‍🦺','🐈','🐈‍⬛','🪶','🐓','🦃','🦤','🦚','🦜','🦢','🦩','🕊️','🐇','🦝','🦨','🦡','🦫','🦦','🦥','🐁','🐀','🐿️','🦔','🌵','🎄','🌲','🌳','🌴','🪵','🌱','🌿','☘️','🍀','🎍','🪴','🎋','🍃','🍂','🍁','🪺','🪹','🍄','🐚','🪸','🪨','🌾','💐','🌷','🌹','🥀','🪷','🌺','🌸','🌼','🌻','🌞','🌝','🌛','🌜','🌚','🌕','🌖','🌗','🌘','🌑','🌒','🌓','🌔','🌙','🌟','⭐','🌠','🌌','☀️','⛅','🌤️','⛈️','🌧️','🌨️','❄️','⛄','🌊','💧','💦','🌈'],
    '🍕': ['🍕','🍔','🌭','🥪','🌮','🌯','🫔','🥙','🧆','🥚','🍳','🥘','🍲','🫕','🥣','🥗','🍿','🧈','🥞','🧇','🥓','🥩','🍗','🍖','🦴','🌽','🥕','🧄','🧅','🥔','🍠','🥐','🥯','🍞','🥖','🥨','🧀','🍱','🍘','🍙','🍚','🍛','🍜','🍝','🍟','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍩','🍪','🌰','🍑','🍒','🍓','🫐','🍈','🍌','🍉','🍇','🍍','🥭','🍎','🍏','🍐','🍊','🍋','🍋‍🟩','🍆','🥑','🥦','🫑','🥬','🥒','🌶️','🫒','🥜','🫘','🧃','🥤','🧋','🍵','☕','🫖','🍺','🍻','🥂','🍷','🫗','🥃','🍸','🍹','🧉','🍾','🧊','🥢','🍽️','🍴','🥄','🔪','🫙'],
    '⚽': ['⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🪀','🏓','🏸','🏒','🏑','🥍','🏏','🪃','🥅','⛳','🪁','🏹','🎣','🤿','🥊','🥋','🎽','🛹','🛼','🛷','⛸️','🥌','🎿','⛷️','🏂','🪂','🏋️','🤼','🤸','⛹️','🤺','🏇','🧘','🏄','🏊','🤽','🚣','🧗','🚵','🚴','🏆','🥇','🥈','🥉','🏅','🎖️','🏵️','🎗️','🎫','🎟️','🎪','🤹','🎭','🎨','🎬','🎤','🎧','🎼','🎹','🪘','🥁','🎷','🎺','🪗','🎸','🪕','🎻','🎲','♟️','🎯','🎳','🎮','🎰','🧩'],
    '🚗': ['🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🛻','🚚','🚛','🚜','🏍️','🛵','🛺','🚲','🛴','🛹','🛼','🚏','🛣️','🛤️','⛽','🛞','🚨','🚥','🚦','🛑','🚧','⚓','🛟','⛵','🚤','🛥️','🛳️','⛴️','🚢','✈️','🛩️','🛫','🛬','🪂','💺','🚁','🚟','🚠','🚡','🛰️','🚀','🛸','🎆','🎇','🧨','✨','🎉','🎊','🎈','🎋','🎍','🎎','🎐','🎑','🎃','🎄','🧧','🎀','🎁','🎗️','🎟️','🎫','🎖️','🏆','🥇','🥈','🥉','🏅'],
    '💡': ['💡','🔦','🕯️','🪔','🧱','🪞','🪟','🛋️','🪑','🚽','🪠','🚿','🛁','🪤','🪒','🧴','🧷','🧹','🧺','🧻','🪣','🧼','🫧','🪥','🧽','🧯','🛒','🚪','🪝','🧲','🪜','🧰','🪛','🔧','🔨','⚒️','🛠️','⛏️','🔩','🪚','🔫','🧨','💣','🪓','🔪','🗡️','⚔️','🛡️','🪃','🏹','🎣','🤿','🔮','🪬','🧿','💈','⚗️','🔭','🔬','🩺','🩻','🩹','💊','💉','🩸','🧬','🦠','🧫','🧪','🌡️','🪄','✨','🔑','🗝️','🔐','🔏','🔒','🔓','📦','📫','📬','📭','📮','📯','📜','📃','📄','📑','🧾','📊','📈','📉','📋','📌','📍','📎','🖇️','📏','📐','✂️','🗃️','🗄️','🗑️','⚙️','🗜️','⚖️','🦯','🔗','⛓️'],
};

// Плоский список для поиска
const ALL_EMOJI_LIST = Object.values(EMOJI_PACKS).flat();

// ── ДЕМО-СООБЩЕНИЯ ────────────────────────────────────────
const DEMO_MESSAGES = [
    { userId: 'u4', text: '🎤 ДОБРО ПОЖАЛОВАТЬ В ZARBA CHAT! ЖИВИ РЭПОМ 🔥', type: 'system', time: Date.now() - 600000 },
    { userId: 'u1', text: 'Новый трек скоро 🔥🔥🔥', type: 'text', time: Date.now() - 300000 },
    { userId: 'u2', text: 'МАНЗУР ЛУЧШИЙ ❤️💯', type: 'text', time: Date.now() - 240000 },
    { userId: 'u5', text: 'Смотрите пушку: https://www.youtube.com/watch?v=dQw4w9WgXcQ', type: 'text', time: Date.now() - 180000 },
    { userId: 'u3', text: 'Душанбе рулит 🇹🇯🏔️', type: 'text', time: Date.now() - 120000 },
    { userId: 'u2', text: '🎵💎👑', type: 'text', time: Date.now() - 60000 },
];

// ── ТЕКУЩИЙ ПОЛЬЗОВАТЕЛЬ ─────────────────────────────────
let currentUser = { id: 'you', name: 'ВЫ', role: 'fan', color: '#FF4500', avatar: '👤', online: true };
let messages = [...DEMO_MESSAGES];
let typingUsers = new Set();
let typingTimer = null;
let isTyping = false;
let currentEmojiPack = '😊';
let emojiSearchQuery = '';
let emojiPanelOpen = false;
let autoScroll = true;

// ── УТИЛИТЫ ───────────────────────────────────────────────
function getUserById(id) {
    return DEMO_USERS.find(u => u.id === id) || currentUser;
}

function getRoleBadge(role) {
    const badges = {
        artist: '<span class="z-badge z-badge-artist"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg> АРТИСТ</span>',
        mod: '<span class="z-badge z-badge-mod"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.21 15.4l-1.85-2.21-1.36 1.14L11.21 18l6.79-8.15-1.36-1.14z"/></svg> МОДЕР</span>',
        fan: '<span class="z-badge z-badge-fan">🎵 ФАНАТ</span>',
    };
    return badges[role] || '';
}

function formatTime(ts) {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function extractYouTubeId(text) {
    const match = text.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
}

function isOnlyEmoji(str) {
    const emojiRegex = /^(\p{Emoji_Presentation}|\p{Extended_Pictographic}|\s)+$/u;
    return emojiRegex.test(str.trim()) && str.trim().length <= 12;
}

// ── ИНЪЕКЦИЯ СТИЛЕЙ ───────────────────────────────────────
function injectChatStyles() {
    if (document.getElementById('z-chat-styles-v2')) return;
    const style = document.createElement('style');
    style.id = 'z-chat-styles-v2';
    style.textContent = `
        /* === ПЕРЕМЕННЫЕ (ЧИСТАЯ ПАЛИТРА) === */
        :root {
            --zc-bg: #09090b; /* Глубокий темный фон */
            --zc-surface: #121214; /* Карточки */
            --zc-surface-hover: #18181b; 
            --zc-border: #27272a; /* Тонкие рамки */
            --zc-accent: #FF4500; /* Фирменный оранжевый */
            --zc-text: #f4f4f5;
            --zc-text-muted: #a1a1aa;
            --zc-online: #10b981;
            --zc-offline: #52525b;
            --zc-radius: 12px;
            --zc-font: 'Inter', 'Montserrat', sans-serif;
        }

        /* === АККОРДЕОН-КОНТЕЙНЕР === */
        #z-chat-container {
            width: 100%;
            max-height: 0;
            overflow: hidden;
            background: var(--zc-bg);
            transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 998;
            font-family: var(--zc-font);
        }
        #z-chat-container.open {
            max-height: 80vh;
            border-bottom: 2px solid var(--zc-accent);
        }

        /* === LAYOUT === */
        .zc-wrap {
            display: flex;
            height: 100%;
            overflow: hidden;
            background: radial-gradient(circle at 50% 0%, rgba(255, 69, 0, 0.03) 0%, transparent 60%), var(--zc-bg);
        }

        /* === САЙДБАР ПОЛЬЗОВАТЕЛЕЙ === */
        .zc-sidebar {
            width: 220px;
            min-width: 220px;
            background: rgba(18, 18, 20, 0.4);
            backdrop-filter: blur(10px);
            border-right: 1px solid var(--zc-border);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        .zc-sidebar-title {
            padding: 20px 16px 12px;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1.5px;
            color: var(--zc-text-muted);
            text-transform: uppercase;
        }
        .zc-users-list {
            flex: 1;
            overflow-y: auto;
            padding: 0 8px 8px;
        }
        .zc-user-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .zc-user-item:hover { background: var(--zc-surface-hover); }
        .zc-user-avatar-wrap {
            position: relative;
            flex-shrink: 0;
        }
        .zc-user-avatar {
            width: 36px;
            height: 36px;
            border-radius: 10px; /* Более современная форма */
            background: var(--zc-surface);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 800;
            color: var(--zc-text);
            border: 1px solid var(--zc-border);
        }
        .zc-status-dot {
            position: absolute;
            bottom: -3px;
            right: -3px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid var(--zc-bg);
            background: var(--zc-offline);
        }
        .zc-status-dot.online { background: var(--zc-online); }
        .zc-user-info { min-width: 0; }
.zc-user-name {
            font-size: 13px;
            font-weight: 700;
            color: #ffffff; /* Строгий белый цвет для всех имен */
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            letter-spacing: 0.3px;
        }
        .zc-user-role-mini {
            font-size: 11px;
            font-weight: 500;
            color: #888888; /* Спокойный серый для подписей */
            letter-spacing: 0.2px;
            margin-top: 2px;
        }

        /* === ГЛАВНАЯ КОЛОНКА === */
        .zc-main {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        /* === ХЕДЕР ЧАТА === */
        .zc-header {
            padding: 16px 24px;
            background: rgba(9, 9, 11, 0.8);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--zc-border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 10;
        }
        .zc-header-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .zc-header-title {
            font-size: 16px;
            font-weight: 800;
            color: var(--zc-text);
            letter-spacing: -0.2px;
        }
        .zc-header-sub {
            font-size: 11px;
            color: var(--zc-text-muted);
            margin-top: 2px;
        }
        .zc-online-count {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            color: var(--zc-online);
            font-weight: 600;
            background: rgba(16, 185, 129, 0.1);
            padding: 4px 10px;
            border-radius: 20px;
        }

        /* === ЛЕНТА СООБЩЕНИЙ === */
        .zc-messages {
            flex: 1;
            overflow-y: auto;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            scroll-behavior: smooth;
        }

        /* === СИСТЕМНОЕ СООБЩЕНИЕ === */
        .zc-msg-system {
            text-align: center;
            padding: 8px 16px;
            margin: 0 auto;
            font-size: 11px;
            font-weight: 600;
            color: var(--zc-text-muted);
            background: var(--zc-surface);
            border: 1px solid var(--zc-border);
            border-radius: 6px;
        }

        /* === СТРОКА СООБЩЕНИЯ === */
        .zc-msg-row {
            display: flex;
            gap: 16px;
            animation: zc-msg-in 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .zc-msg-row.zc-own {
            flex-direction: row-reverse;
        }

        /* === АВАТАР СООБЩЕНИЯ === */
        .zc-msg-avatar {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: var(--zc-surface);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 800;
            flex-shrink: 0;
            border: 1px solid var(--zc-border);
            cursor: pointer;
            transition: transform 0.2s;
        }
        .zc-msg-avatar:hover { transform: scale(1.05); }

        /* === ТЕЛО СООБЩЕНИЯ === */
        .zc-msg-body {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        .zc-own .zc-msg-body {
            align-items: flex-end;
        }

        .zc-msg-meta {
            display: flex;
            align-items: baseline;
            gap: 8px;
            margin-bottom: 6px;
        }
        .zc-own .zc-msg-meta { flex-direction: row-reverse; }

        .zc-msg-author {
            font-size: 14px;
            font-weight: 700;
            color: var(--zc-text);
        }
        .zc-msg-time {
            font-size: 11px;
            color: var(--zc-text-muted);
        }

        /* === ЗНАЧКИ === */
        .z-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-size: 9px;
            font-weight: 700;
            padding: 2px 6px;
            border-radius: 4px;
            letter-spacing: 0.5px;
        }
        .z-badge svg { width: 10px; height: 10px; }
        .z-badge-artist { background: rgba(255, 69, 0, 0.1); color: var(--zc-accent); }
        .z-badge-mod { background: rgba(255, 215, 0, 0.1); color: #FFD700; }
        .z-badge-fan { display: none; /* Прячем бейдж фаната, чтобы не мусорить */ }

        /* === ТЕКСТ СООБЩЕНИЯ === */
        .zc-msg-content-wrap {
            background: var(--zc-surface);
            border: 1px solid var(--zc-border);
            padding: 10px 14px;
            border-radius: 2px 12px 12px 12px;
            max-width: 85%;
        }
        .zc-own .zc-msg-content-wrap {
            background: rgba(255, 69, 0, 0.08);
            border-color: rgba(255, 69, 0, 0.2);
            border-radius: 12px 2px 12px 12px;
        }

        .zc-msg-text {
            font-size: 14px;
            color: var(--zc-text);
            line-height: 1.5;
            word-break: break-word;
        }
        
        /* === УБИРАЕМ ФОН У БОЛЬШИХ ЭМОДЗИ === */
        .zc-msg-content-wrap.is-emoji {
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
        }
        .zc-msg-text.zc-emoji-big {
            font-size: 42px;
            line-height: 1.1;
        }

        /* === YOUTUBE КАРТОЧКА === */
        .zc-yt-preview {
            margin-top: 8px;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid var(--zc-border);
            background: #000;
            cursor: pointer;
            position: relative;
            width: 100%;
            max-width: 320px;
            transition: border-color 0.2s;
        }
        .zc-yt-preview:hover { border-color: var(--zc-accent); }
        .zc-yt-thumb-wrap {
            position: relative;
            padding-top: 56.25%;
        }
        .zc-yt-thumb {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        .zc-yt-preview:hover .zc-yt-thumb { opacity: 1; }
        .zc-yt-play-btn {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .zc-yt-play-icon {
            width: 48px;
            height: 48px;
            background: var(--zc-accent);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            box-shadow: 0 4px 20px rgba(255,69,0,0.4);
            transition: transform 0.2s;
        }
        .zc-yt-play-icon::after {
            content: '';
            width: 0; height: 0;
            border-style: solid;
            border-width: 8px 0 8px 12px;
            border-color: transparent transparent transparent #ffffff;
            margin-left: 4px;
        }
        .zc-yt-preview:hover .zc-yt-play-icon { transform: scale(1.1); }

        /* === ЭМОДЗИ-ПАНЕЛЬ === */
        .zc-emoji-panel {
            background: var(--zc-surface);
            border-top: 1px solid var(--zc-border);
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        .zc-emoji-panel.open { max-height: 300px; }
        .zc-emoji-tabs {
            display: flex;
            padding: 0 8px;
            border-bottom: 1px solid var(--zc-border);
            background: rgba(0,0,0,0.2);
        }
        .zc-emoji-tab {
            padding: 12px 16px;
            font-size: 16px;
            cursor: pointer;
            opacity: 0.5;
            transition: 0.2s;
            border-bottom: 2px solid transparent;
        }
        .zc-emoji-tab.active, .zc-emoji-tab:hover { opacity: 1; border-bottom-color: var(--zc-accent); }
        .zc-emoji-search { padding: 12px 16px 4px; }
        .zc-emoji-search input {
            width: 100%;
            background: var(--zc-bg);
            border: 1px solid var(--zc-border);
            border-radius: 6px;
            padding: 8px 12px;
            color: var(--zc-text);
            outline: none;
        }
        .zc-emoji-search input:focus { border-color: var(--zc-accent); }
        .zc-emoji-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
            gap: 4px;
            padding: 12px 16px;
            max-height: 200px;
            overflow-y: auto;
        }
        .zc-emoji-btn {
            font-size: 22px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 4px;
            border-radius: 6px;
            transition: background 0.15s;
        }
        .zc-emoji-btn:hover { background: var(--zc-surface-hover); }

        /* === ИНПУТ-БАР (Глассморфизм) === */
        .zc-input-bar {
            padding: 16px 24px;
            background: rgba(18, 18, 20, 0.6);
            backdrop-filter: blur(16px);
            border-top: 1px solid var(--zc-border);
            display: flex;
            align-items: flex-end;
            gap: 12px;
            z-index: 10;
        }
        .zc-input-btn {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: var(--zc-surface);
            border: 1px solid var(--zc-border);
            color: var(--zc-text-muted);
            cursor: pointer;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.2s;
            flex-shrink: 0;
        }
        .zc-input-btn:hover, .zc-input-btn.active {
            background: rgba(255, 69, 0, 0.1);
            color: var(--zc-accent);
            border-color: var(--zc-accent);
        }
        .zc-input-field-wrap {
            flex: 1;
            background: var(--zc-bg);
            border: 1px solid var(--zc-border);
            border-radius: 12px;
            display: flex;
            align-items: center;
            padding: 0 16px;
            transition: border-color 0.2s;
        }
        .zc-input-field-wrap:focus-within { border-color: var(--zc-accent); }
        #zc-input {
            width: 100%;
            background: transparent;
            border: none;
            color: var(--zc-text);
            font-size: 14px;
            padding: 14px 0;
            outline: none;
            font-family: var(--zc-font);
        }
        #zc-input::placeholder { color: #52525b; }
        .zc-send-btn {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: var(--zc-accent);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            transition: 0.2s;
            flex-shrink: 0;
        }
        .zc-send-btn svg { width: 20px; height: 20px; fill: currentColor; margin-left: 2px; }
        .zc-send-btn:hover { filter: brightness(1.1); transform: translateY(-1px); }

        /* === ИНДИКАТОР ПЕЧАТАНИЯ === */
        .zc-typing-bar {
            position: absolute;
            bottom: 80px;
            left: 24px;
            font-size: 11px;
            color: var(--zc-text-muted);
            background: rgba(9, 9, 11, 0.9);
            padding: 4px 12px;
            border-radius: 12px;
            border: 1px solid var(--zc-border);
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
            z-index: 5;
        }

        /* === СКРОЛЛБАР === */
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--zc-border); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #3f3f46; }

        @keyframes zc-msg-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 600px) {
            .zc-sidebar { display: none; }
            .zc-header { padding: 12px 16px; }
            .zc-messages { padding: 16px; }
            .zc-input-bar { padding: 12px 16px; }
        }
    `;
    document.head.appendChild(style);
}

// ── BUILD HTML ────────────────────────────────────────────
function buildChatHTML() {
    return `
    <div class="zc-wrap">
        <div class="zc-sidebar">
            <div class="zc-sidebar-title">👥 В эфире</div>
            <div class="zc-users-list" id="zc-users-list"></div>
        </div>

        <div class="zc-main">
            <div class="zc-header">
                <div class="zc-header-left">
                    <div>
                        <div class="zc-header-title">ZARBA LIVE</div>
                        <div class="zc-header-sub">Таджикский рэп • Говори громче</div>
                    </div>
                </div>
                <div class="zc-online-count">
                    <span id="zc-online-num">4</span> ОНЛАЙН
                </div>
            </div>

            <div class="zc-messages" id="zc-messages"></div>

            <div class="zc-typing-bar" id="zc-typing-bar">
                <span id="zc-typing-text"></span>
            </div>

            <div class="zc-emoji-panel" id="zc-emoji-panel">
                <div class="zc-emoji-tabs" id="zc-emoji-tabs"></div>
                <div class="zc-emoji-search"><input type="text" placeholder="Поиск эмодзи..." oninput="window._zcSearchEmoji(this.value)" id="zc-emoji-search"></div>
                <div class="zc-emoji-grid" id="zc-emoji-grid"></div>
            </div>

            <div class="zc-input-bar">
                <button class="zc-input-btn" id="zc-emoji-toggle-btn" onclick="window._zcToggleEmoji()">😀</button>
                <div class="zc-input-field-wrap">
                    <input type="text" id="zc-input" placeholder="Написать в эфир... или вставить ссылку YouTube" autocomplete="off">
                </div>
                <button class="zc-send-btn" onclick="window._zcSend()">
                    <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
            </div>
        </div>
    </div>
    `;
}

// ── РЕНДЕР ПОЛЬЗОВАТЕЛЕЙ ──────────────────────────────────
function renderUsers() {
    const list = document.getElementById('zc-users-list');
    if (!list) return;
    const allUsers = [currentUser, ...DEMO_USERS];
    list.innerHTML = allUsers.map(u => `
        <div class="zc-user-item">
            <div class="zc-user-avatar-wrap">
                <div class="zc-user-avatar" style="color:${u.color}; border: 1px solid ${u.color}44; background: ${u.color}11;">
                    ${typeof u.avatar === 'string' && u.avatar.length <= 2 ? u.avatar : u.name[0]}
                </div>
                <div class="zc-status-dot ${u.online ? 'online' : ''}"></div>
            </div>
            <div class="zc-user-info">
                <div class="zc-user-name">${u.name}</div>
                <div class="zc-user-role-mini">${u.role === 'artist' ? 'Артист' : u.role === 'mod' ? 'Модератор' : 'Фанат'}</div>
            </div>
        </div>
    `).join('');
}
// ── РЕНДЕР ЭМОДЗИ-ТАБОВ ───────────────────────────────────
function renderEmojiPanel(emojiList) {
    const tabs = document.getElementById('zc-emoji-tabs');
    const grid = document.getElementById('zc-emoji-grid');
    if (!tabs || !grid) return;

    tabs.innerHTML = Object.keys(EMOJI_PACKS).map(pack =>
        `<div class="zc-emoji-tab ${pack === currentEmojiPack ? 'active' : ''}" 
             onclick="window._zcSwitchEmojiPack('${pack}')">${pack}</div>`
    ).join('');

    const list = emojiList !== undefined ? emojiList : EMOJI_PACKS[currentEmojiPack];
    grid.innerHTML = list.map(e =>
        `<button class="zc-emoji-btn" onclick="window._zcInsertEmoji('${e}')">${e}</button>`
    ).join('');
}

window._zcSearchEmoji = function(query) {
    emojiSearchQuery = query.trim();
    if (!emojiSearchQuery) {
        renderEmojiPanel();
        return;
    }
    const results = ALL_EMOJI_LIST.filter(e => e.includes(emojiSearchQuery)).slice(0, 80);
    renderEmojiPanel(results);
};

// ── РЕНДЕР СООБЩЕНИЯ ──────────────────────────────────────
function renderMessage(msg) {
    const box = document.getElementById('zc-messages');
    if (!box) return;

    if (msg.type === 'system') {
        const el = document.createElement('div');
        el.className = 'zc-msg-system';
        el.innerHTML = msg.text;
        box.appendChild(el);
        scrollIfNeeded(box);
        return;
    }

    const user = msg.userId === 'you' ? currentUser : getUserById(msg.userId);
    const isOwn = msg.userId === 'you';
    const ytId = extractYouTubeId(msg.text);
    const isBigEmoji = isOnlyEmoji(msg.text);

    const row = document.createElement('div');
    row.className = `zc-msg-row${isOwn ? ' zc-own' : ''}`;
    row.dataset.msgId = msg.id || Date.now();

    let contentHTML = '';
    let ytHTML = '';

    // Генерируем карточку ютуба, если есть ссылка
    if (ytId) {
        const thumb = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
        const url = msg.text.trim();
        ytHTML = `
            <div class="zc-yt-preview" onclick="window.open('${url}','_blank')">
                <div class="zc-yt-thumb-wrap">
                    <img class="zc-yt-thumb" src="${thumb}" alt="YouTube" loading="lazy">
                    <div class="zc-yt-play-btn"><div class="zc-yt-play-icon"></div></div>
                </div>
            </div>
        `;
    }

    // Собираем текст и ютуб вместе (исправление бага)
    const rawText = msg.text.replace(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/[^\s]+/g, '').trim();
    
    let textDiv = '';
    if (rawText) {
        textDiv = `<div class="zc-msg-text${isBigEmoji ? ' zc-emoji-big' : ''}">${rawText}</div>`;
    } else if (!ytId) {
        textDiv = `<div class="zc-msg-text${isBigEmoji ? ' zc-emoji-big' : ''}">${msg.text}</div>`;
    }

    contentHTML = `
        <div class="zc-msg-content-wrap ${isBigEmoji && !ytId ? 'is-emoji' : ''}">
            ${textDiv}
            ${ytHTML}
        </div>
    `;

    row.innerHTML = `
        <div class="zc-msg-avatar" style="color:${user.color}">
            ${user.name[0]}
        </div>
        <div class="zc-msg-body">
            <div class="zc-msg-meta">
                <span class="zc-msg-author" style="color:${user.color}">${user.name}</span>
                ${getRoleBadge(user.role)}
                <span class="zc-msg-time">${formatTime(msg.time)}</span>
            </div>
            ${contentHTML}
        </div>
    `;

    box.appendChild(row);
    scrollIfNeeded(box);
}

// ── ИНИЦИАЛИЗАЦИЯ ДЕМО-СООБЩЕНИЙ ─────────────────────────
function renderAllMessages() {
    const box = document.getElementById('zc-messages');
    if (!box) return;
    box.innerHTML = '';
    messages.forEach(m => renderMessage(m));
}

// ── СКРОЛЛ ────────────────────────────────────────────────
function scrollIfNeeded(box) {
    const distFromBottom = box.scrollHeight - box.scrollTop - box.clientHeight;
    if (distFromBottom < CHAT_CONFIG.autoScrollThreshold || autoScroll) {
        box.scrollTop = box.scrollHeight;
        autoScroll = true;
    }
}

// ── ОТПРАВКА ──────────────────────────────────────────────
window._zcSend = function() {
    const input = document.getElementById('zc-input');
    if (!input || !input.value.trim()) return;

    const text = input.value.trim();
    input.value = '';

    const msg = {
        id: 'msg_' + Date.now(),
        userId: 'you',
        text: text,
        type: 'text',
        time: Date.now(),
    };

    messages.push(msg);
    autoScroll = true;
    renderMessage(msg);
    simulateResponse(text);
};

// ── СИМУЛЯЦИЯ ОТВЕТОВ ─────────────────────────────────────
const AUTO_REPLIES = [
    { userId: 'u1', text: '🔥🔥🔥' },
    { userId: 'u2', text: 'ОГОНЬ!' },
    { userId: 'u4', text: 'ZARBA — это жизнь 🎤💯' },
    { userId: 'u5', text: '❤️ 🇹🇯' },
    { userId: 'u2', text: 'Уважаю 🫡' },
];

function simulateResponse(inputText) {
    const responder = DEMO_USERS[Math.floor(Math.random() * DEMO_USERS.length)];
    setTimeout(() => { showTyping(responder.name); }, 600);
    setTimeout(() => {
        hideTyping(responder.name);
        const reply = { ...AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)], type: 'text', time: Date.now() };
        messages.push(reply);
        renderMessage(reply);
    }, 1800 + Math.random() * 1200);
}

// ── СТАТУС ПЕЧАТАНИЯ ──────────────────────────────────────
function showTyping(name) {
    typingUsers.add(name);
    updateTypingUI();
}

function hideTyping(name) {
    typingUsers.delete(name);
    updateTypingUI();
}

function updateTypingUI() {
    const bar = document.getElementById('zc-typing-text');
    const typingBar = document.getElementById('zc-typing-bar');
    if (!bar || !typingBar) return;
    
    if (typingUsers.size === 0) {
        typingBar.style.opacity = '0';
        bar.innerHTML = '';
        return;
    }
    typingBar.style.opacity = '1';
    const names = [...typingUsers].join(', ');
    bar.innerHTML = `${names} ${typingUsers.size === 1 ? 'печатает' : 'печатают'}...`;
}

// ── ЭМОДЗИ ────────────────────────────────────────────────
window._zcToggleEmoji = function() {
    const panel = document.getElementById('zc-emoji-panel');
    const btn = document.getElementById('zc-emoji-toggle-btn');
    if (!panel) return;
    emojiPanelOpen = !emojiPanelOpen;
    panel.classList.toggle('open', emojiPanelOpen);
    if (btn) btn.classList.toggle('active', emojiPanelOpen);
    if (emojiPanelOpen) renderEmojiPanel();
};

window._zcSwitchEmojiPack = function(pack) {
    currentEmojiPack = pack;
    renderEmojiPanel();
};

window._zcInsertEmoji = function(emoji) {
    const input = document.getElementById('zc-input');
    if (input) {
        input.value += emoji;
        input.focus();
    }
};

// ── KEYBOARD ──────────────────────────────────────────────
function setupKeyboard() {
    const input = document.getElementById('zc-input');
    if (!input) return;
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            window._zcSend();
        }
    });
    input.addEventListener('input', () => {
        if (!isTyping) isTyping = true;
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => { isTyping = false; }, CHAT_CONFIG.typingTimeout);
    });

    const box = document.getElementById('zc-messages');
    if (box) {
        box.addEventListener('scroll', () => {
            const distFromBottom = box.scrollHeight - box.scrollTop - box.clientHeight;
            autoScroll = distFromBottom < 60;
        });
    }
}

// ── ИНИЦИАЛИЗАЦИЯ ─────────────────────────────────────────
window.initChat = function() {
    if (document.getElementById('z-chat-container')) return;

    const player = document.querySelector('.radio-section')
        || document.querySelector('.z-capsule')
        || document.getElementById('app-content')
        || document.body;

    if (!player) return;

    const chatWrap = document.createElement('div');
    chatWrap.id = 'z-chat-container';
    chatWrap.innerHTML = buildChatHTML();
    player.after(chatWrap);

    injectChatStyles();
    renderUsers();
    renderAllMessages();
    setupKeyboard();
};

window.toggleChat = function() {
    const chat = document.getElementById('z-chat-container');

    if (!chat) {
        window.initChat();
        setTimeout(function() {
            const nc = document.getElementById('z-chat-container');
            if (nc) {
                nc.classList.add('open');
                const box = document.getElementById('zc-messages');
                if (box) box.scrollTop = box.scrollHeight;
            }
        }, 60);
        return;
    }

    chat.classList.toggle('open');
    if (chat.classList.contains('open')) {
        setTimeout(function() {
            const box = document.getElementById('zc-messages');
            if (box) box.scrollTop = box.scrollHeight;
        }, 300);
    }
};

window.sendChatMessage = window._zcSend;

})();