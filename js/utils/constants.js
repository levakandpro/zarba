// ============================================================
//  ZARBA — CONSTANTS (Глобальные константы)
// ============================================================

// ← ЦВЕТА
export const COLORS = {
  primary: '#FF4500',    // Оранжевый
  secondary: '#FFD700',  // Золотой
  dark: '#080808',       // Темный фон
  light: '#f0f0f0',      // Светлый текст
  border: '#1a1a1a',     // Граница
  success: '#00E676',    // Зеленый
  warning: '#FFD700',    // Золотой
  error: '#FF4500'       // Красный
};

// ← ЖАНРЫ МУЗЫКИ (из твоей архитектуры)
export const GENRES = [
  // Основные
  'РЭП / ХИП-ХОП',
  'АНДЕРГРАУНД',
  'ЛИРИКА / МЕДЛЯКИ',
  'ПОП / ЭСТРАДА',
  'КАЛЬЯННЫЙ РЭП',
  // Вайб / Танцы
  'ТРЕП / TRAP',
  'EDM / ДИП ХАУС',
  'КЛУБНЫЕ / RNB',
  'РЕГГИ / ИНДИ',
  // Специальные
  'TAJRAP / TRADITIONAL',
  'ИРАНСКИЕ',
  'ФИТЫ / COLLAB',
  'МИНУСОВКИ',
  'АЛЬТЕРНАТИВА / COVER',
  'Z-FREESTYLE (Эксперимент)'
];

// ← ГОРОДА ТАДЖИКИСТАНА
export const CITIES = [
  'Душанбе',
  'Худжанд',
  'Куляб',
  'Хорог',
  'Нурек',
  'Чкаловск',
  'Турсунзаде',
  'Раштская долина'
];

// ← 7 ПЛЕЙЛИСТОВ (Z-REDACTION)
export const PLAYLISTS = [
  { id: 'medlyaki', name: 'МЕДЛЯКИ', icon: '🎵', color: '#FF69B4' },
  { id: 'energy', name: 'ENERGY', icon: '⚡', color: '#FFD700' },
  { id: 'relax', name: 'RELAX', icon: '☕', color: '#87CEEB' },
  { id: 'driver', name: 'RAP DRIVER', icon: '🚗', color: '#FF4500' },
  { id: 'morning', name: 'УТРЕННИЙ', icon: '🌅', color: '#FFB347' },
  { id: 'underground', name: 'UNDERGROUND', icon: '🔥', color: '#FF0000' },
  { id: 'oldschool', name: 'OLD SCHOOL', icon: '📼', color: '#8B7355' }
];

// ← СОЦИАЛЬНЫЕ СЕТИ
export const SOCIALS = {
  instagram: { name: 'Instagram', icon: '📷', url: 'https://instagram.com/' },
  telegram: { name: 'Telegram', icon: '✈️', url: 'https://t.me/' },
  youtube: { name: 'YouTube', icon: '▶️', url: 'https://youtube.com/@' },
  tiktok: { name: 'TikTok', icon: '🎵', url: 'https://tiktok.com/@' },
  twitter: { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/' }
};

// ← РАЗМЕРЫ ЭКРАНА
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440
};

// ← ВРЕМЯ (в мс)
export const TIMING = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 1000
};

// ← API ENDPOINTS (примерные)
export const API_ENDPOINTS = {
  artists: '/api/artists',
  tracks: '/api/tracks',
  charts: '/api/charts',
  videos: '/api/videos',
  collabs: '/api/collabs',
  playlists: '/api/playlists'
};

// ← СООБЩЕНИЯ ОШИБОК
export const ERRORS = {
  notFound: 'Не найдено',
  unauthorized: 'Требуется авторизация',
  forbidden: 'Доступ запрещен',
  serverError: 'Ошибка сервера',
  networkError: 'Ошибка сети',
  validationError: 'Ошибка валидации'
};

// ← ЛИМИТЫ
export const LIMITS = {
  maxArtistsPerPage: 50,
  maxTracksPerPage: 100,
  maxPlaylistSize: 20,
  maxCommentLength: 500,
  maxFileSize: 10 * 1024 * 1024 // 10MB
};

// ← БЕЙДЖИ (значки достижений)
export const BADGES = {
  '👑': 'Топ-1',
  '🏆': 'Зал Славы',
  '🔥': 'Горячий',
  '🎤': 'Верифицирован',
  '📈': 'Топ-10',
  '⭐': 'Дебют',
  '🎵': 'Трек недели',
  '🎛️': 'Продюсер',
  '🌍': 'Билингвал',
  '🆕': 'Новичок'
};