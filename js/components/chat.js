// ============================================================
//  ZARBA — MEGA CHAT [v2.0] - REDESIGN + REPLIES & LIKES
//  Красивый чат: анимированные эмодзи, YouTube превью,
//  ответы на сообщения, анимированные лайки и статусы
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
    { id: 'u1', name: 'MANZUR', role: 'artist', avatar: 'M', online: true },
    { id: 'u2', name: 'FARID_TJ', role: 'fan', avatar: 'F', online: true },
    { id: 'u3', name: 'DUSHANBE_BOY', role: 'fan', avatar: 'D', online: false },
    { id: 'u4', name: 'ZARBA_OFFICIAL', role: 'mod', avatar: 'Z', online: true },
    { id: 'u5', name: 'KHURSHID', role: 'artist', avatar: 'K', online: true },
];

// ── АНИМИРОВАННЫЕ ЭМОДЗИ-ПАКИ ────────────────────────────
const EMOJI_PACKS = {
    '😊': ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','😚','😙','🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🫢','🫣','🤫','🤔','🫡','🤐','🤨','😐','😑','😶','🫥','😏','😒','🙄','😬','🤥','🫨','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵','🤯','🤠','🥳','🥸','😎','🤓','🧐','😕','🫤','😟','🙁','☹️','😮','😯','😲','😳','🥺','🫹','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬','😈','👿','💀','☠️','💩','🤡','👹','👺','👻','👽','👾','🤖'],
    '👋': ['👋','🤚','🖐️','✋','🖖','🫱','🫲','🫳','🫴','👌','🤌','🤏','✌️','🤞','🫰','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','🫵','👍','👎','✊','👊','🤛','🤜','👏','🙌','🫶','👐','🤲','🤝','🙏','✍️','💅','🤳','💪','🦾','🦵','🦿','🦶','👂','🦻','👃','🫀','🫁','🧠','🦷','🦴','👀','👁️','👅','👄','🫦','💋','👶','🧒','👦','👧','🧑','👱','👨','🧔','👩','🧓','👴','👵','🙍','🙎','🙅','🙆','💁','🙋','🧏','🙇','🤦','🤷'],
    '❤️': ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❤️‍🔥','❤️‍🩹','💕','💞','💓','💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉️','☸️','🪯','✡️','🔯','🕎','☯️','☦️','🛐','⛎','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚛️','🉑','☢️','☣️','📴','📳','🈶','🈚','🈸','🈺','🈷️','✴️','🆚','💮','🉐','㊙️','㊗️','🈴','🈵','🈹','🈲','🅰️','🅱️','🆎','🆑','🅾️','🆘','❌','⭕','🛑','⛔','📛','🚫','💯','💢','♨️','🚷','🚯','🚳','🚱','🔞','📵','🔕'],
};

const ALL_EMOJI_LIST = Object.values(EMOJI_PACKS).flat();

// ── ДЕМО-СООБЩЕНИЯ ────────────────────────────────────────
const DEMO_MESSAGES = [
    { id: 'm1', userId: 'u4', text: '🎤 ДОБРО ПОЖАЛОВАТЬ В ZARBA CHAT! ЖИВИ РЭПОМ 🔥', type: 'system', time: Date.now() - 600000, likes: 12 },
    { id: 'm2', userId: 'u1', text: 'Новый трек скоро 🔥🔥🔥', type: 'text', time: Date.now() - 300000, likes: 5 },
    { id: 'm3', userId: 'u2', text: 'МАНЗУР ЛУЧШИЙ ❤️💯', type: 'text', time: Date.now() - 240000, likes: 2 },
    { id: 'm4', userId: 'u5', text: 'Смотрите пушку: https://www.youtube.com/watch?v=dQw4w9WgXcQ', type: 'text', time: Date.now() - 180000, likes: 8 },
    { id: 'm5', userId: 'u3', text: 'Душанбе рулит 🇹🇯🏔️', type: 'text', time: Date.now() - 120000, likes: 0 },
    { id: 'm6', userId: 'u2', text: 'Когда релиз?', type: 'text', time: Date.now() - 60000, likes: 1, replyTo: { id: 'm2', name: 'MANZUR', text: 'Новый трек скоро 🔥🔥🔥' } },
];

// ── ТЕКУЩИЙ ПОЛЬЗОВАТЕЛЬ И СОСТОЯНИЕ ─────────────────────
let currentUser = { id: 'you', name: 'ВЫ', role: 'fan', avatar: '👤', online: true };
let messages = [...DEMO_MESSAGES];
let typingUsers = new Set();
let typingTimer = null;
let isTyping = false;
let currentEmojiPack = '😊';
let emojiSearchQuery = '';
let emojiPanelOpen = false;
let autoScroll = true;
let currentReplyTo = null; // Для цепочки ответов

// ── УТИЛИТЫ ───────────────────────────────────────────────
function getUserById(id) {
    return DEMO_USERS.find(u => u.id === id) || currentUser;
}

function getUserColor(role) {
    if (role === 'artist' || role === 'mod') return '#FF4500'; 
    return '#ffffff'; 
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
        :root {
            --zc-bg: #09090b; 
            --zc-surface: #121214; 
            --zc-surface-hover: #18181b; 
            --zc-border: #27272a; 
            --zc-accent: #FF4500; 
            --zc-text: #f4f4f5;
            --zc-text-muted: #a1a1aa;
            --zc-online: #10b981;
            --zc-offline: #52525b;
            --zc-font: 'Inter', 'Montserrat', sans-serif;
        }

        #z-chat-container {
            width: 100%; max-height: 0; overflow: hidden;
            background: var(--zc-bg);
            transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex; flex-direction: column;
            position: relative; z-index: 998; font-family: var(--zc-font);
        }
        #z-chat-container.open { max-height: 80vh; border-bottom: 2px solid var(--zc-accent); }
        .zc-wrap { display: flex; height: 100%; overflow: hidden; background: radial-gradient(circle at 50% 0%, rgba(255, 69, 0, 0.03) 0%, transparent 60%), var(--zc-bg); }

        /* САЙДБАР */
        .zc-sidebar { width: 220px; min-width: 220px; background: rgba(18, 18, 20, 0.4); backdrop-filter: blur(10px); border-right: 1px solid var(--zc-border); display: flex; flex-direction: column; overflow: hidden; }
        .zc-sidebar-title { padding: 20px 16px 12px; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; color: var(--zc-text-muted); text-transform: uppercase; }
        .zc-users-list { flex: 1; overflow-y: auto; padding: 0 8px 8px; }
        .zc-user-item { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 8px; cursor: pointer; transition: background 0.2s; }
        .zc-user-item:hover { background: var(--zc-surface-hover); }
        .zc-user-avatar-wrap { position: relative; flex-shrink: 0; }
        .zc-user-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--zc-surface); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; color: var(--zc-text); border: 1px solid rgba(255, 255, 255, 0.05); }
        .zc-status-dot { position: absolute; bottom: -3px; right: -3px; width: 12px; height: 12px; border-radius: 50%; border: 2px solid var(--zc-bg); background: var(--zc-offline); }
        .zc-status-dot.online { background: var(--zc-online); }
        .zc-user-info { min-width: 0; }
        .zc-user-name { font-size: 13px; font-weight: 700; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .zc-user-role-mini { font-size: 11px; font-weight: 500; color: #888888; margin-top: 2px; }

        /* ГЛАВНАЯ */
        .zc-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; position: relative; }
        
        /* ХЕДЕР */
        .zc-header { padding: 16px 24px; background: linear-gradient(180deg, rgba(18, 18, 20, 0.9) 0%, rgba(9, 9, 11, 0.85) 100%); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255, 69, 0, 0.2); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4); display: flex; align-items: center; justify-content: space-between; z-index: 10; }
        .zc-header-left { display: flex; align-items: center; gap: 16px; }
        .zc-header-title { font-size: 18px; font-weight: 900; text-transform: uppercase; background: linear-gradient(90deg, #ffffff 0%, #ff8a66 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: flex; align-items: center; gap: 10px; }
        .zc-live-dot { width: 8px; height: 8px; background-color: var(--zc-accent); border-radius: 50%; box-shadow: 0 0 8px var(--zc-accent); animation: pulse-live 2s infinite; }
        @keyframes pulse-live { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 69, 0, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(255, 69, 0, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 69, 0, 0); } }
        .zc-header-sub { font-size: 12px; color: var(--zc-text-muted); margin-top: 4px; font-weight: 500; }
        .zc-online-count { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--zc-online); font-weight: 600; background: rgba(16, 185, 129, 0.1); padding: 4px 10px; border-radius: 20px; }

        /* ЛЕНТА СООБЩЕНИЙ */
        .zc-messages { flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 20px; scroll-behavior: smooth; }

    /* СИСТЕМНОЕ СООБЩЕНИЕ */
        .zc-msg-system { display: inline-block; text-align: center; padding: 12px 24px; margin: 16px auto; max-width: 90%; font-size: 13px; font-weight: 800; color: #ffffff; background: linear-gradient(90deg, rgba(255, 69, 0, 0.05) 0%, rgba(255, 69, 0, 0.2) 50%, rgba(255, 69, 0, 0.05) 100%); border: 1px solid rgba(255, 69, 0, 0.4); border-radius: 12px; box-shadow: 0 4px 20px rgba(255, 69, 0, 0.15); position: sticky; top: 16px; z-index: 100; backdrop-filter: blur(8px); }
        .zc-msg-system::before { content: ''; position: absolute; left: 0; top: 0; height: 100%; width: 4px; background: var(--zc-accent); border-radius: 12px 0 0 12px; box-shadow: 0 0 10px var(--zc-accent); }
        .zc-msg-system::after { content: ''; position: absolute; right: 0; top: 0; height: 100%; width: 4px; background: var(--zc-accent); border-radius: 0 12px 12px 0; box-shadow: 0 0 10px var(--zc-accent); }
        /* СТРОКА СООБЩЕНИЯ */
        .zc-msg-row { display: flex; gap: 12px; animation: zc-msg-in 0.3s cubic-bezier(0.16,1,0.3,1); padding: 4px 0; position: relative; }
        .zc-msg-row.zc-own { flex-direction: row-reverse; }

        /* АВАТАР */
        .zc-msg-avatar { width: 36px; height: 36px; border-radius: 50%; background: #18181b; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; flex-shrink: 0; border: 1px solid rgba(255, 255, 255, 0.05); cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.3); }

        /* ТЕЛО СООБЩЕНИЯ */
        .zc-msg-body { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: flex-start; }
        .zc-own .zc-msg-body { align-items: flex-end; }

        /* META (Имя + Разделитель + Время) */
        .zc-msg-meta { 
            display: flex; align-items: center; gap: 8px; 
            width: 100%; /* На всю ширину для правильного позиционирования времени */
            margin-bottom: 6px; padding-bottom: 4px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08); /* ТОНКИЙ РАЗДЕЛИТЕЛЬ */
        }
        .zc-own .zc-msg-meta { flex-direction: row-reverse; }

        .zc-msg-author { font-size: 13px; font-weight: 800; text-transform: uppercase; }
        
        /* ВРЕМЯ - перенесено в конец, сделано светлее */
        .zc-msg-time { font-size: 11px; color: #a1a1aa; font-weight: 500; margin-left: auto; }
        .zc-own .zc-msg-time { margin-left: 0; margin-right: auto; }

        .z-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px; }
        .z-badge svg { width: 10px; height: 10px; }
        .z-badge-artist { background: rgba(255, 69, 0, 0.1); color: var(--zc-accent); }
        .z-badge-mod { background: rgba(255, 215, 0, 0.1); color: #FFD700; }
        .z-badge-fan { display: none; }

        /* ЦИТИРОВАНИЕ / ОТВЕТ (Внутри сообщения) */
        .zc-msg-quoted {
            font-size: 11px; color: #a1a1aa; background: rgba(255, 255, 255, 0.03);
            border-left: 2px solid var(--zc-accent); padding: 4px 8px; margin-bottom: 6px;
            border-radius: 0 4px 4px 0; max-width: 100%; white-space: nowrap; 
            overflow: hidden; text-overflow: ellipsis; display: block;
        }

        /* ТЕКСТ */
        .zc-msg-content-wrap { background: transparent; border: none; padding: 0; max-width: 95%; position: relative; }
        .zc-msg-text { font-size: 14px; color: #e4e4e7; line-height: 1.4; word-break: break-word; text-shadow: 0 1px 2px rgba(0,0,0,0.8); }
        .zc-msg-content-wrap.is-emoji { background: transparent !important; border: none !important; padding: 0 !important; }
        .zc-msg-text.zc-emoji-big { font-size: 36px; line-height: 1.1; }

        /* YOUTUBE */
        .zc-yt-preview { margin-top: 8px; border-radius: 8px; overflow: hidden; border: 1px solid var(--zc-border); background: #000; cursor: pointer; position: relative; width: 100%; max-width: 320px; }
        .zc-yt-thumb-wrap { position: relative; padding-top: 56.25%; }
        .zc-yt-thumb { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
        .zc-yt-play-btn { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
        .zc-yt-play-icon { width: 48px; height: 48px; background: var(--zc-accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; box-shadow: 0 4px 20px rgba(255,69,0,0.4); }
        .zc-yt-play-icon::after { content: ''; width: 0; height: 0; border-style: solid; border-width: 8px 0 8px 12px; border-color: transparent transparent transparent #ffffff; margin-left: 4px; }

        /* ACTIONS: ЛАЙКИ И ОТВЕТЫ */
        .zc-msg-actions {
            display: flex; align-items: center; gap: 12px; margin-top: 6px;
            opacity: 0.6; transition: opacity 0.2s;
        }
        .zc-msg-row:hover .zc-msg-actions { opacity: 1; }
        .zc-own .zc-msg-actions { flex-direction: row-reverse; }
        
        .zc-btn-action {
            background: none; border: none; color: #a1a1aa; font-size: 12px; font-weight: 600;
            display: flex; align-items: center; gap: 4px; cursor: pointer; padding: 2px 6px;
            border-radius: 4px; transition: 0.2s; font-family: var(--zc-font);
        }
        .zc-btn-action:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .zc-btn-action svg { width: 14px; height: 14px; fill: currentColor; }
        
        /* Лайкнутое состояние */
        .zc-btn-like.liked { color: #ff3366; }
        .zc-btn-like.liked svg { fill: #ff3366; }

        /* ПАНЕЛЬ ОТВЕТА (НАД ИНПУТОМ) */
        .zc-reply-bar {
            background: rgba(18, 18, 20, 0.95); padding: 8px 24px;
            border-top: 1px solid var(--zc-border); display: none;
            align-items: center; justify-content: space-between;
            font-size: 12px; color: var(--zc-text-muted);
        }
        .zc-reply-bar.active { display: flex; }
        .zc-reply-bar-content { display: flex; flex-direction: column; overflow: hidden; }
        .zc-reply-bar-title { color: var(--zc-accent); font-weight: 700; margin-bottom: 2px; }
        .zc-reply-bar-text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 300px; color: #fff; }
        .zc-reply-bar-close { background: none; border: none; color: #a1a1aa; cursor: pointer; font-size: 16px; padding: 4px; }
        .zc-reply-bar-close:hover { color: #fff; }

        /* ИНПУТ-БАР */
        .zc-input-bar { padding: 16px 24px; background: rgba(18, 18, 20, 0.6); backdrop-filter: blur(16px); border-top: 1px solid var(--zc-border); display: flex; align-items: flex-end; gap: 12px; z-index: 10; }
        .zc-input-btn { width: 44px; height: 44px; border-radius: 12px; background: var(--zc-surface); border: 1px solid var(--zc-border); color: var(--zc-text-muted); cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .zc-input-field-wrap { flex: 1; background: var(--zc-bg); border: 1px solid var(--zc-border); border-radius: 12px; display: flex; align-items: center; padding: 0 16px; }
        #zc-input { width: 100%; background: transparent; border: none; color: var(--zc-text); font-size: 14px; padding: 14px 0; outline: none; font-family: var(--zc-font); }
        .zc-send-btn { width: 44px; height: 44px; border-radius: 12px; background: var(--zc-accent); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; }
        
        /* ЭМОДЗИ ПАНЕЛЬ */
        .zc-emoji-panel { background: var(--zc-surface); border-top: 1px solid var(--zc-border); max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
        .zc-emoji-panel.open { max-height: 300px; }
        .zc-emoji-tabs { display: flex; padding: 0 8px; border-bottom: 1px solid var(--zc-border); background: rgba(0,0,0,0.2); }
        .zc-emoji-tab { padding: 12px 16px; font-size: 16px; cursor: pointer; opacity: 0.5; border-bottom: 2px solid transparent; }
        .zc-emoji-tab.active, .zc-emoji-tab:hover { opacity: 1; border-bottom-color: var(--zc-accent); }
        .zc-emoji-search { padding: 12px 16px 4px; }
        .zc-emoji-search input { width: 100%; background: var(--zc-bg); border: 1px solid var(--zc-border); border-radius: 6px; padding: 8px 12px; color: var(--zc-text); outline: none; }
        .zc-emoji-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(36px, 1fr)); gap: 4px; padding: 12px 16px; max-height: 200px; overflow-y: auto; }
        .zc-emoji-btn { font-size: 22px; background: transparent; border: none; cursor: pointer; padding: 4px; border-radius: 6px; }

        /* ИНДИКАТОР ПЕЧАТАНИЯ */
        .zc-typing-bar { position: absolute; bottom: 80px; left: 24px; font-size: 11px; color: var(--zc-text-muted); background: rgba(9, 9, 11, 0.9); padding: 4px 12px; border-radius: 12px; border: 1px solid var(--zc-border); opacity: 0; transition: opacity 0.3s; pointer-events: none; z-index: 5; }

        /* АНИМАЦИЯ СЕРДЕЧЕК ПРИ ЛАЙКЕ */
        .zc-flying-heart {
            position: fixed; font-size: 24px; pointer-events: none; z-index: 9999;
            animation: zc-fly-up 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @keyframes zc-fly-up {
            0% { transform: translateY(0) scale(0.5); opacity: 1; }
            50% { transform: translateY(-40px) scale(1.2); opacity: 0.8; }
            100% { transform: translateY(-80px) scale(1); opacity: 0; }
        }

        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--zc-border); border-radius: 4px; }
        @media (max-width: 600px) { .zc-sidebar { display: none; } .zc-header { padding: 12px 16px; } .zc-messages { padding: 16px; } .zc-input-bar { padding: 12px 16px; } .zc-reply-bar { padding: 8px 16px; } }
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
                        <div class="zc-header-title"><div class="zc-live-dot"></div> ZARBA LIVE</div>
                        <div class="zc-header-sub">Таджикский рэп • Говори громче</div>
                    </div>
                </div>
                <div class="zc-online-count"><span id="zc-online-num">4</span> ОНЛАЙН</div>
            </div>

            <div class="zc-messages" id="zc-messages"></div>

            <div class="zc-typing-bar" id="zc-typing-bar"><span id="zc-typing-text"></span></div>

            <div class="zc-emoji-panel" id="zc-emoji-panel">
                <div class="zc-emoji-tabs" id="zc-emoji-tabs"></div>
                <div class="zc-emoji-search"><input type="text" placeholder="Поиск эмодзи..." oninput="window._zcSearchEmoji(this.value)" id="zc-emoji-search"></div>
                <div class="zc-emoji-grid" id="zc-emoji-grid"></div>
            </div>

            <div class="zc-reply-bar" id="zc-reply-bar">
                <div class="zc-reply-bar-content">
                    <div class="zc-reply-bar-title">Ответ для <span id="zc-reply-name">Имя</span></div>
                    <div class="zc-reply-bar-text" id="zc-reply-text">Текст сообщения...</div>
                </div>
                <button class="zc-reply-bar-close" onclick="window._zcCancelReply()">✖</button>
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

// ── РЕНДЕР ПОЛЬЗОВАТЕЛЕЙ И ЭМОДЗИ ─────────────────────────
function renderUsers() {
    const list = document.getElementById('zc-users-list');
    if (!list) return;
    const allUsers = [currentUser, ...DEMO_USERS];
    list.innerHTML = allUsers.map(u => {
        const userColor = getUserColor(u.role);
        return `
        <div class="zc-user-item">
            <div class="zc-user-avatar-wrap">
                <div class="zc-user-avatar" style="color:${userColor}; border: 1px solid ${userColor}44; background: ${userColor}11;">
                    ${typeof u.avatar === 'string' && u.avatar.length <= 2 ? u.avatar : u.name[0]}
                </div>
                <div class="zc-status-dot ${u.online ? 'online' : ''}"></div>
            </div>
            <div class="zc-user-info">
                <div class="zc-user-name">${u.name}</div>
                <div class="zc-user-role-mini">${u.role === 'artist' ? 'Артист' : u.role === 'mod' ? 'Модератор' : 'Фанат'}</div>
            </div>
        </div>
        `;
    }).join('');
}

function renderEmojiPanel(emojiList) {
    const tabs = document.getElementById('zc-emoji-tabs');
    const grid = document.getElementById('zc-emoji-grid');
    if (!tabs || !grid) return;
    tabs.innerHTML = Object.keys(EMOJI_PACKS).map(pack =>
        `<div class="zc-emoji-tab ${pack === currentEmojiPack ? 'active' : ''}" onclick="window._zcSwitchEmojiPack('${pack}')">${pack}</div>`
    ).join('');
    const list = emojiList !== undefined ? emojiList : EMOJI_PACKS[currentEmojiPack];
    grid.innerHTML = list.map(e => `<button class="zc-emoji-btn" onclick="window._zcInsertEmoji('${e}')">${e}</button>`).join('');
}
window._zcSearchEmoji = function(query) {
    emojiSearchQuery = query.trim();
    if (!emojiSearchQuery) { renderEmojiPanel(); return; }
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
    const userColor = getUserColor(user.role);
    const isOwn = msg.userId === 'you';
    const ytId = extractYouTubeId(msg.text);
    const isBigEmoji = isOnlyEmoji(msg.text);

    const row = document.createElement('div');
    row.className = `zc-msg-row${isOwn ? ' zc-own' : ''}`;
    row.dataset.msgId = msg.id;

    let contentHTML = '';
    let ytHTML = '';

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

    const rawText = msg.text.replace(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/[^\s]+/g, '').trim();
    let textDiv = '';
    if (rawText) {
        textDiv = `<div class="zc-msg-text${isBigEmoji ? ' zc-emoji-big' : ''}">${rawText}</div>`;
    } else if (!ytId) {
        textDiv = `<div class="zc-msg-text${isBigEmoji ? ' zc-emoji-big' : ''}">${msg.text}</div>`;
    }

    // Если это ответ (Reply), добавляем блок цитаты
    let replyBlock = '';
    if (msg.replyTo) {
        replyBlock = `<div class="zc-msg-quoted">Ответ <b>${msg.replyTo.name}</b>: ${msg.replyTo.text}</div>`;
    }

    const safeText = msg.text.replace(/'/g, "\\'"); // Защита для JS вызова
    const likesCount = msg.likes || 0;

    contentHTML = `
        <div class="zc-msg-content-wrap ${isBigEmoji && !ytId ? 'is-emoji' : ''}">
            ${replyBlock}
            ${textDiv}
            ${ytHTML}
        </div>
        
        <div class="zc-msg-actions">
            <button class="zc-btn-action zc-btn-like ${likesCount > 0 ? 'liked' : ''}" onclick="window._zcLikeMessage('${msg.id}', this)">
                <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                <span class="zc-like-count">${likesCount > 0 ? likesCount : 'Лайк'}</span>
            </button>
            <button class="zc-btn-action zc-btn-reply" onclick="window._zcInitReply('${msg.id}', '${user.name}', '${safeText}')">
                <svg viewBox="0 0 24 24"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>
                Ответить
            </button>
        </div>
    `;

    row.innerHTML = `
        <div class="zc-msg-avatar" style="color:${userColor}">
            ${user.name[0]}
        </div>
        <div class="zc-msg-body">
            <div class="zc-msg-meta">
                <span class="zc-msg-author" style="color:${userColor}">${user.name}</span>
                ${getRoleBadge(user.role)}
                <span class="zc-msg-time">${formatTime(msg.time)}</span>
            </div>
            ${contentHTML}
        </div>
    `;

    box.appendChild(row);
    scrollIfNeeded(box);
}

function renderAllMessages() {
    const box = document.getElementById('zc-messages');
    if (!box) return;
    box.innerHTML = '';
    messages.forEach(m => renderMessage(m));
}
function scrollIfNeeded(box) {
    const distFromBottom = box.scrollHeight - box.scrollTop - box.clientHeight;
    if (distFromBottom < CHAT_CONFIG.autoScrollThreshold || autoScroll) {
        box.scrollTop = box.scrollHeight;
        autoScroll = true;
    }
}

// ── ОТПРАВКА И ОТВЕТЫ ─────────────────────────────────────
window._zcInitReply = function(msgId, name, text) {
    currentReplyTo = { id: msgId, name: name, text: text };
    document.getElementById('zc-reply-name').innerText = name;
    document.getElementById('zc-reply-text').innerText = text;
    document.getElementById('zc-reply-bar').classList.add('active');
    document.getElementById('zc-input').focus();
};

window._zcCancelReply = function() {
    currentReplyTo = null;
    const bar = document.getElementById('zc-reply-bar');
    if (bar) bar.classList.remove('active');
};

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
        likes: 0,
        replyTo: currentReplyTo ? { ...currentReplyTo } : null
    };

    messages.push(msg);
    autoScroll = true;
    renderMessage(msg);
    window._zcCancelReply(); // Сброс цитаты после отправки
    simulateResponse(text);
};

// ── ЛАЙКИ И АНИМАЦИЯ ──────────────────────────────────────
window._zcLikeMessage = function(msgId, btnElement) {
    const msg = messages.find(m => m.id === msgId);
    if (!msg) return;
    
    msg.likes = (msg.likes || 0) + 1;
    
    // Обновляем счетчик
    const counter = btnElement.querySelector('.zc-like-count');
    if (counter) counter.innerText = msg.likes;
    btnElement.classList.add('liked');

    // Анимация разлетающихся сердечек
    const rect = btnElement.getBoundingClientRect();
    for(let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.className = 'zc-flying-heart';
        
        // Разброс по X
        const offsetX = (Math.random() - 0.5) * 40;
        heart.style.left = (rect.left + rect.width / 2 + offsetX - 12) + 'px';
        heart.style.top = (rect.top) + 'px';
        
        // Рандомная скорость
        heart.style.animationDuration = (0.8 + Math.random() * 0.6) + 's';
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1500);
    }
};

// ── СИМУЛЯЦИЯ ОТВЕТОВ ─────────────────────────────────────
const AUTO_REPLIES = [
    { userId: 'u1', text: '🔥🔥🔥' },
    { userId: 'u2', text: 'ОГОНЬ!' },
    { userId: 'u4', text: 'ZARBA — это жизнь 🎤💯' },
    { userId: 'u5', text: '❤️ 🇹🇯' },
];
function simulateResponse(inputText) {
    const responder = DEMO_USERS[Math.floor(Math.random() * DEMO_USERS.length)];
    setTimeout(() => { showTyping(responder.name); }, 600);
    setTimeout(() => {
        hideTyping(responder.name);
        const reply = { ...AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)], id: 'msg_' + Date.now(), type: 'text', time: Date.now(), likes: 0 };
        messages.push(reply);
        renderMessage(reply);
    }, 1800 + Math.random() * 1200);
}

// ── СТАТУС ПЕЧАТАНИЯ ──────────────────────────────────────
function showTyping(name) { typingUsers.add(name); updateTypingUI(); }
function hideTyping(name) { typingUsers.delete(name); updateTypingUI(); }
function updateTypingUI() {
    const bar = document.getElementById('zc-typing-text');
    const typingBar = document.getElementById('zc-typing-bar');
    if (!bar || !typingBar) return;
    if (typingUsers.size === 0) { typingBar.style.opacity = '0'; bar.innerHTML = ''; return; }
    typingBar.style.opacity = '1';
    bar.innerHTML = `${[...typingUsers].join(', ')} ${typingUsers.size === 1 ? 'печатает' : 'печатают'}...`;
}

// ── ЭМОДЗИ И КЛАВИАТУРА ───────────────────────────────────
window._zcToggleEmoji = function() {
    const panel = document.getElementById('zc-emoji-panel');
    const btn = document.getElementById('zc-emoji-toggle-btn');
    if (!panel) return;
    emojiPanelOpen = !emojiPanelOpen;
    panel.classList.toggle('open', emojiPanelOpen);
    if (btn) btn.classList.toggle('active', emojiPanelOpen);
    if (emojiPanelOpen) renderEmojiPanel();
};
window._zcSwitchEmojiPack = function(pack) { currentEmojiPack = pack; renderEmojiPanel(); };
window._zcInsertEmoji = function(emoji) {
    const input = document.getElementById('zc-input');
    if (input) { input.value += emoji; input.focus(); }
};

function setupKeyboard() {
    const input = document.getElementById('zc-input');
    if (!input) return;
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); window._zcSend(); }
    });
    input.addEventListener('input', () => {
        if (!isTyping) isTyping = true;
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => { isTyping = false; }, CHAT_CONFIG.typingTimeout);
    });
    const box = document.getElementById('zc-messages');
    if (box) box.addEventListener('scroll', () => { autoScroll = (box.scrollHeight - box.scrollTop - box.clientHeight) < 60; });
}

// ── ИНИЦИАЛИЗАЦИЯ ─────────────────────────────────────────
window.initChat = function() {
    if (document.getElementById('z-chat-container')) return;
    const player = document.querySelector('.radio-section') || document.querySelector('.z-capsule') || document.getElementById('app-content') || document.body;
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
        setTimeout(() => { const nc = document.getElementById('z-chat-container'); if (nc) { nc.classList.add('open'); const box = document.getElementById('zc-messages'); if (box) box.scrollTop = box.scrollHeight; } }, 60);
        return;
    }
    chat.classList.toggle('open');
    if (chat.classList.contains('open')) setTimeout(() => { const box = document.getElementById('zc-messages'); if (box) box.scrollTop = box.scrollHeight; }, 300);
};

window.sendChatMessage = window._zcSend;

})();