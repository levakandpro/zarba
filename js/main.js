// ============================================================
//  ZARBA — ГЛАВНЫЙ ФАЙЛ (main.js)
//  Работает БЕЗ сервера (file:// протокол)
//  НЕ использует ES modules import
// ============================================================

(function() {

  const appContent = document.getElementById('app-content');

  // ── Глобальная функция навигации ──────────────────────────
  window.showPage = function(page) {
    if (!appContent) return;

    // Убираем активный класс у кнопок
    document.querySelectorAll('.main-nav button').forEach(btn => {
      btn.classList.remove('active');
    });

    // Активируем нужную кнопку
    const activeBtn = document.querySelector(`.main-nav button[onclick="showPage('${page}')"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Рендерим страницу
    switch (page) {
      case 'home':
        if (typeof renderHome === 'function') renderHome(appContent);
        else appContent.innerHTML = '<div style="padding:60px;color:#fff;font-family:monospace">Загрузка home.js...</div>';
        break;
      case 'artists':
        if (typeof renderArtists === 'function') renderArtists(appContent);
        else appContent.innerHTML = '<div style="padding:60px;color:#fff;font-family:monospace">Загрузка artists.js...</div>';
        break;
      case 'charts':
        if (typeof renderCharts === 'function') renderCharts(appContent);
        else appContent.innerHTML = '<div style="padding:60px;color:#fff;font-family:monospace">Загрузка charts.js...</div>';
        break;
      case 'media':
        if (typeof renderMedia === 'function') renderMedia(appContent);
        else appContent.innerHTML = '<div style="padding:60px;color:#fff;font-family:monospace">Загрузка media.js...</div>';
        break;
      case 'bazar':
        if (typeof renderBazar === 'function') renderBazar(appContent);
        else appContent.innerHTML = '<div style="padding:60px;color:#fff;font-family:monospace">Загрузка bazar.js...</div>';
        break;
      case 'collabs':
        if (typeof renderCollab === 'function') renderCollab(appContent);
        else appContent.innerHTML = '<div style="padding:60px;color:#fff;font-family:monospace">Загрузка collab.js...</div>';
        break;
      case 'playlists':
        if (typeof renderPlaylists === 'function') renderPlaylists(appContent);
        else appContent.innerHTML = '<div style="padding:60px;color:#fff;font-family:monospace">Загрузка playlists.js...</div>';
        break;
      case 'hall':
        if (typeof renderHallOfFame === 'function') renderHallOfFame(appContent);
        else appContent.innerHTML = '<div style="padding:60px;color:#fff;font-family:monospace">Загрузка hall-of-fame.js...</div>';
        break;
      default:
        if (typeof renderHome === 'function') renderHome(appContent);
    }
  };

  // ── Запуск при загрузке страницы ─────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    const hash = location.hash.replace('#', '') || 'home';
    setTimeout(function() {
      window.showPage(hash);
    }, 50);
  });

})();