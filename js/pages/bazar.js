// ============================================================
//  ZARBA — BAZAR [FULL SYSTEM] v2.0
// ============================================================

function renderBazar(container) {
  // ── ЗАГРУЗОЧНЫЙ ЭКРАН BAZAR ──
  container.innerHTML = `
<div id="bz-loader" style="
  position:relative;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  height:80vh;background:#050505;overflow:hidden;
">
<style>
  @keyframes bz-grid-move { to { background-position: 0 60px; } }
  @keyframes bz-logo-pulse {
    0%,100% { filter:drop-shadow(0 0 0px #FF4500) brightness(1); transform:scale(1); }
    50%      { filter:drop-shadow(0 0 28px #FF4500) drop-shadow(0 0 60px rgba(255,69,0,.45)) brightness(1.25); transform:scale(1.08); }
  }
  @keyframes bz-ring-cw  { to { transform:rotate(360deg); } }
  @keyframes bz-ring-ccw { to { transform:rotate(-360deg); } }
  @keyframes bz-bar-fill { 0%{width:0%} 25%{width:18%} 55%{width:60%} 85%{width:88%} 100%{width:100%} }
  @keyframes bz-title-in { from{opacity:0;letter-spacing:20px} to{opacity:1;letter-spacing:6px} }
  @keyframes bz-sub-in   { from{opacity:0;transform:translateY(10px)} to{opacity:.65;transform:translateY(0)} }
  @keyframes bz-tag-blink { 0%,100%{opacity:1} 50%{opacity:.4} }
  .bz-ld-grid {
    position:absolute;inset:0;
    background-image:
      linear-gradient(rgba(255,69,0,.05) 1px,transparent 1px),
      linear-gradient(90deg,rgba(255,69,0,.04) 1px,transparent 1px);
    background-size:60px 60px;
    animation:bz-grid-move 10s linear infinite;
    pointer-events:none;
  }
  .bz-ld-vignette {
    position:absolute;inset:0;
    background:radial-gradient(ellipse at center,transparent 35%,rgba(0,0,0,.75) 100%);
    pointer-events:none;
  }
  .bz-ld-glow {
    position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
    width:320px;height:320px;border-radius:50%;
    background:radial-gradient(ellipse,rgba(255,69,0,.12) 0%,transparent 70%);
    pointer-events:none;
  }
  .bz-ld-wrap { position:relative;z-index:2;display:flex;flex-direction:column;align-items:center; }
  .bz-ld-rings { position:relative;width:170px;height:170px;display:flex;align-items:center;justify-content:center; }
  .bz-ld-r1,.bz-ld-r2,.bz-ld-r3 { position:absolute;border-radius:50%; }
  .bz-ld-r1 {
    width:170px;height:170px;
    border:1px solid rgba(255,69,0,.1);
    border-top:2px solid #FF4500;
    animation:bz-ring-cw 1.3s linear infinite;
  }
  .bz-ld-r2 {
    width:134px;height:134px;
    border:1px solid rgba(255,69,0,.07);
    border-right:1px solid rgba(255,69,0,.38);
    animation:bz-ring-ccw 2s linear infinite;
  }
  .bz-ld-r3 {
    width:100px;height:100px;
    border:1px dashed rgba(255,69,0,.05);
    border-bottom:1px solid rgba(255,69,0,.18);
    animation:bz-ring-cw 3.5s linear infinite;
  }
  .bz-ld-logo {
    position:relative;z-index:2;
    width:58px;height:58px;object-fit:contain;
    animation:bz-logo-pulse 2.2s ease-in-out infinite;
  }
  .bz-ld-logo-fb {
    position:relative;z-index:2;
    font-family:'Bebas Neue',sans-serif;
    font-size:54px;color:#FF4500;line-height:1;
    animation:bz-logo-pulse 2.2s ease-in-out infinite;
    display:none;
  }
  .bz-ld-tag {
    font-family:'Bebas Neue',sans-serif;
    font-size:10px;letter-spacing:8px;color:#FF4500;
    margin-top:22px;
    animation:bz-tag-blink 2s ease-in-out infinite;
  }
  .bz-ld-title {
    font-family:'Bebas Neue',sans-serif;
    font-size:52px;letter-spacing:6px;color:#fff;
    margin-top:4px;line-height:1;
    animation:bz-title-in 1s .3s ease both;
  }
  .bz-ld-title span { color:#FF4500; }
  .bz-ld-sub {
    font-size:9px;letter-spacing:4px;text-transform:uppercase;
    color:rgba(255,255,255,.5);margin-top:6px;
    animation:bz-sub-in .8s .6s ease both;
    font-family:sans-serif;
  }
  .bz-ld-bar-wrap {
    width:170px;height:1px;background:rgba(255,255,255,.07);
    margin-top:22px;overflow:hidden;
  }
  .bz-ld-bar {
    height:100%;background:linear-gradient(90deg,#FF4500,#FFD700);
    animation:bz-bar-fill 1.9s ease forwards;
  }
  .bz-ld-dots { display:flex;gap:10px;margin-top:14px; }
  .bz-ld-dot {
    width:4px;height:4px;border-radius:50%;background:#FF4500;
    animation:bz-dot-sq 1.4s ease-in-out infinite;
  }
  .bz-ld-dot:nth-child(2){animation-delay:.22s}
  .bz-ld-dot:nth-child(3){animation-delay:.44s}
  @keyframes bz-dot-sq{0%,80%,100%{transform:scale(0);opacity:0}40%{transform:scale(1);opacity:1}}
</style>
<div class="bz-ld-grid"></div>
<div class="bz-ld-vignette"></div>
<div class="bz-ld-glow"></div>
<div class="bz-ld-wrap">
  <div class="bz-ld-rings">
    <div class="bz-ld-r1"></div>
    <div class="bz-ld-r2"></div>
    <div class="bz-ld-r3"></div>
    <img class="bz-ld-logo" src="assets/logo-white-big.png"
      onerror="this.style.display='none';document.getElementById('bz-ld-fb').style.display='block'">
    <div id="bz-ld-fb" class="bz-ld-logo-fb">Z</div>
  </div>
  <div class="bz-ld-tag">Z · SERVICES</div>
  <div class="bz-ld-title">BA<span>ZAR</span></div>
  <div class="bz-ld-sub">Мерч · Студия · Биты · Дистрибуция</div>
  <div class="bz-ld-bar-wrap"><div class="bz-ld-bar"></div></div>
  <div class="bz-ld-dots">
    <div class="bz-ld-dot"></div>
    <div class="bz-ld-dot"></div>
    <div class="bz-ld-dot"></div>
  </div>
</div>
</div>`;

  setTimeout(() => {
    container.innerHTML = '';
    document.body.setAttribute('style', 'background: radial-gradient(ellipse 120% 60% at 50% 100%, rgba(140,0,0,0.4) 0%, rgba(60,0,0,0.2) 45%, #050505 70%) !important; background-attachment: fixed !important;');
    injectBazarCSS();

  const bazarHTML = `
    <div class="bz-page">

      <!-- ═══ HERO ═══ -->
      <div class="bz-hero">
        <div class="bz-hero-noise"></div>
        <div class="bz-hero-bg-text">BAZAR</div>
        <div class="bz-hero-inner">
          <div class="bz-hero-label">
            <span class="bz-dot"></span>
            Z·SERVICES — OFFICIAL HUB
            <span class="bz-dot"></span>
          </div>
          <h1 class="bz-hero-title">BA<span>ZAR</span></h1>
          <p class="bz-hero-sub">Профессиональные услуги для артистов —<br>от мерча до мировой дистрибуции.</p>
          <div class="bz-hero-line"></div>
          <div class="bz-nav-pills">
            <a href="#bz-shop" class="bz-pill">SHOP</a>
            <a href="#bz-studio" class="bz-pill">СТУДИИ</a>
            <a href="#bz-beats" class="bz-pill">БИТЫ</a>
            <a href="#bz-covers" class="bz-pill">ОБЛОЖКИ</a>
            <a href="#bz-partners" class="bz-pill">ПАРТНЕРЫ</a>
            <a href="#bz-clips" class="bz-pill">СЪЕИКИ</a>
            <a href="#bz-distro" class="bz-pill active">ДИСТРИБУЦИЯ</a>
          </div>
        </div>
      </div>

      <div class="bz-container">

        <!-- ═══ Z SHOP ═══ -->
        <section class="bz-section" id="bz-shop">
          <div class="bz-sec-head">
            <div class="bz-sec-num">01</div>
            <div class="bz-sec-titles">
              <h2 class="bz-sec-title">Z SHOP</h2>
              <span class="bz-sec-sub">МЕРЧ · ДРОПЫ · КРОССОВКИ</span>
            </div>
            <div class="bz-sec-line"></div>
          </div>

          <div class="bz-shop-meta">
            <div class="bz-shop-store-badge">
              <div class="bz-store-icon">🏪</div>
              <div class="bz-store-info">
                <strong>Официальный магазин</strong>
                <span>📍 Душанбе, Сити Молл · 2 этаж · Павильон A12</span>
              </div>
            </div>
          </div>

          <div class="bz-shop-grid">

            <!-- ТОВАР 1 — добавляй по этому шаблону -->
            <div class="bz-shop-card">
              <div class="bz-shop-img-wrap">
                <div class="bz-shop-img">
                  <div class="bz-img-ph">PHOTO</div>
                </div>
                <div class="bz-shop-badge new">NEW DROP</div>
              </div>
              <div class="bz-shop-body">
                <h3 class="bz-shop-name">Z HOODIE — BLACK EDITION</h3>
                <p class="bz-shop-desc">Оверсайз худи из 320г хлопка. Вышивка лого. Доступны размеры S–3XL.</p>
                <div class="bz-shop-footer">
                  <div class="bz-shop-price">1 200 <span>TJS</span></div>
                  <div class="bz-shop-btns">
                    <a href="https://t.me/your_tg" target="_blank" class="bz-slink tg">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.286c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.935z"/></svg>
                      TG
                    </a>
                    <a href="https://instagram.com/your_ig" target="_blank" class="bz-slink ig">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      IG
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- ТОВАР 2 -->
            <div class="bz-shop-card">
              <div class="bz-shop-img-wrap">
                <div class="bz-shop-img">
                  <div class="bz-img-ph">PHOTO</div>
                </div>
                <div class="bz-shop-badge limited">LIMITED</div>
              </div>
              <div class="bz-shop-body">
                <h3 class="bz-shop-name">Z SNEAKERS — COLLAB</h3>
                <p class="bz-shop-desc">Лимитированные кроссовки. Коллаборация с местными мастерами. Ручная работа.</p>
                <div class="bz-shop-footer">
                  <div class="bz-shop-price">2 800 <span>TJS</span></div>
                  <div class="bz-shop-btns">
                    <a href="https://t.me/your_tg" target="_blank" class="bz-slink tg">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.286c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.935z"/></svg>
                      TG
                    </a>
                    <a href="https://instagram.com/your_ig" target="_blank" class="bz-slink ig">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      IG
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- ТОВАР 3 -->
            <div class="bz-shop-card">
              <div class="bz-shop-img-wrap">
                <div class="bz-shop-img">
                  <div class="bz-img-ph">PHOTO</div>
                </div>
                <div class="bz-shop-badge sale">SALE</div>
              </div>
              <div class="bz-shop-body">
                <h3 class="bz-shop-name">Z CAP — CLASSIC</h3>
                <p class="bz-shop-desc">Кепка с вышивкой ZARBA. Регулируемый размер. Доступна в 3 цветах.</p>
                <div class="bz-shop-footer">
                  <div class="bz-shop-price">350 <span>TJS</span></div>
                  <div class="bz-shop-btns">
                    <a href="https://t.me/your_tg" target="_blank" class="bz-slink tg">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.286c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.935z"/></svg>
                      TG
                    </a>
                    <a href="https://instagram.com/your_ig" target="_blank" class="bz-slink ig">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      IG
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- ТОВАР 4 -->
            <div class="bz-shop-card">
              <div class="bz-shop-img-wrap">
                <div class="bz-shop-img">
                  <div class="bz-img-ph">PHOTO</div>
                </div>
                <div class="bz-shop-badge new">NEW DROP</div>
              </div>
              <div class="bz-shop-body">
                <h3 class="bz-shop-name">Z TEE — OVERSIZE</h3>
                <p class="bz-shop-desc">Футболка оверсайз. Принт шелкографией. 100% хлопок. Унисекс S–XXL.</p>
                <div class="bz-shop-footer">
                  <div class="bz-shop-price">650 <span>TJS</span></div>
                  <div class="bz-shop-btns">
                    <a href="https://t.me/your_tg" target="_blank" class="bz-slink tg">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.286c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.935z"/></svg>
                      TG
                    </a>
                    <a href="https://instagram.com/your_ig" target="_blank" class="bz-slink ig">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      IG
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <!-- ═══ Z STUDIO ═══ -->
        <section class="bz-section" id="bz-studio">
          <div class="bz-sec-head">
            <div class="bz-sec-num">02</div>
            <div class="bz-sec-titles">
              <h2 class="bz-sec-title">Z STUDIO</h2>
              <span class="bz-sec-sub">ЗАПИСЬ · СВЕДЕНИЕ · МАСТЕРИНГ</span>
            </div>
            <div class="bz-sec-line"></div>
          </div>

          <div class="bz-studio-wrap">
            <div class="bz-studio-slider-col">
              <div class="bz-slider" id="studio-slider">
                <div class="bz-slide active"><div class="bz-img-ph tall">STUDIO PHOTO 1</div></div>
                <div class="bz-slide"><div class="bz-img-ph tall">STUDIO PHOTO 2</div></div>
                <div class="bz-slide"><div class="bz-img-ph tall">STUDIO PHOTO 3</div></div>
                <div class="bz-slide"><div class="bz-img-ph tall">STUDIO PHOTO 4</div></div>
                <div class="bz-slide"><div class="bz-img-ph tall">STUDIO PHOTO 5</div></div>
              </div>
              <div class="bz-slider-dots" id="studio-dots">
                <span class="bz-sdot active"></span>
                <span class="bz-sdot"></span>
                <span class="bz-sdot"></span>
                <span class="bz-sdot"></span>
                <span class="bz-sdot"></span>
              </div>
            </div>
            <div class="bz-studio-info-col">
              <div class="bz-studio-badge">TOP RATED</div>
              <h3 class="bz-studio-title">ZARBA<br>MAIN STUDIO</h3>
              <p class="bz-studio-desc">Студия мирового уровня в центре Душанбе. Идеальная акустика, профессиональное оборудование, живая атмосфера — всё для того, чтобы твой трек звучал безупречно.</p>

              <div class="bz-studio-meta">
                <div class="bz-smeta-row">
                  <div class="bz-smeta-icon">📍</div>
                  <div>
                    <span class="bz-smeta-label">АДРЕС</span>
                    <span class="bz-smeta-val">просп. Рудаки 15/2, Душанбе</span>
                  </div>
                </div>
                <div class="bz-smeta-row">
                  <div class="bz-smeta-icon">⭐</div>
                  <div>
                    <span class="bz-smeta-label">РЕЙТИНГ</span>
                    <div class="bz-rating-row">
                      <span class="bz-stars" id="bz-stars">★★★★★</span>
                      <span class="bz-rating-num" id="bz-rating-num">5.0</span>
                      <span class="bz-rating-cnt" id="bz-rating-cnt">(1 200 оценок)</span>
                    </div>
                  </div>
                </div>
                <div class="bz-smeta-row">
                  <div class="bz-smeta-icon">🕐</div>
                  <div>
                    <span class="bz-smeta-label">ЧАСЫ РАБОТЫ</span>
                    <span class="bz-smeta-val">10:00 – 02:00 · Ежедневно</span>
                  </div>
                </div>
              </div>

              <div class="bz-user-rate-block">
                <span class="bz-rate-label">ОЦЕНИТЕ СТУДИЮ:</span>
                <div class="bz-star-select" id="bz-star-select">
                  <span class="bz-s" data-val="1">★</span>
                  <span class="bz-s" data-val="2">★</span>
                  <span class="bz-s" data-val="3">★</span>
                  <span class="bz-s" data-val="4">★</span>
                  <span class="bz-s" data-val="5">★</span>
                </div>
                <span class="bz-rate-thanks" id="bz-rate-thanks"></span>
              </div>

              <div class="bz-studio-socials">
                <a href="https://t.me/your_tg" target="_blank" class="bz-soc-btn tg">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.286c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.935z"/></svg>
                  TELEGRAM
                </a>
                <a href="https://instagram.com/your_ig" target="_blank" class="bz-soc-btn ig">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  INSTAGRAM
                </a>
                <a href="https://youtube.com/@your_yt" target="_blank" class="bz-soc-btn yt">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                  YOUTUBE
                </a>
                <a href="https://wa.me/your_wa" target="_blank" class="bz-soc-btn wa">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                  WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- ═══ BEATMAKERS ═══ -->
        <section class="bz-section" id="bz-beats">
          <div class="bz-sec-head">
            <div class="bz-sec-num">03</div>
            <div class="bz-sec-titles">
              <h2 class="bz-sec-title">BEATMAKERS</h2>
              <span class="bz-sec-sub">МАРКЕТ БИТОВ · АРЕНДА · ВЫКУП</span>
            </div>
            <div class="bz-sec-line"></div>
          </div>

          <div class="bz-beats-grid">

            <!-- БИТМЕЙКЕР — добавляй по этому шаблону -->
            <div class="bz-beat-card">
              <div class="bz-beat-profile">
                <div class="bz-beat-ava-wrap">
                  <div class="bz-beat-ava">
                    <div class="bz-img-ph square">PHOTO</div>
                  </div>
                  <div class="bz-beat-status">● ACTIVE</div>
                </div>
                <div class="bz-beat-bio">
                  <h4 class="bz-beat-name">DARK PRODUCTION</h4>
                  <p class="bz-beat-genre">Trap · Drill · Melodic</p>
                  <div class="bz-beat-socials">
                    <a href="#" class="bz-micro-link tg">TG</a>
                    <a href="#" class="bz-micro-link yt">YT</a>
                    <a href="#" class="bz-micro-link ig">IG</a>
                  </div>
                </div>
              </div>
              <div class="bz-beat-license">
                <div class="bz-lic-row">
                  <span class="bz-lic-type">🎵 MP3 АРЕНДА</span>
                  <span class="bz-lic-price">150 TJS</span>
                </div>
                <div class="bz-lic-row">
                  <span class="bz-lic-type">🎧 WAV АРЕНДА</span>
                  <span class="bz-lic-price">250 TJS</span>
                </div>
                <div class="bz-lic-row premium">
                  <span class="bz-lic-type">♾️ ПОЛНЫЙ ВЫКУП</span>
                  <span class="bz-lic-price">2 000 TJS</span>
                </div>
              </div>
              <div class="bz-beat-tracks">
                <div class="bz-beat-tracks-head">ТРЕКИ · ПРИМЕРЫ</div>
                <div class="bz-audio-row" data-audio="1">
                  <div class="bz-play-btn" data-playing="false">▶</div>
                  <span class="bz-track-name">DARK — Banga</span>
                  <span class="bz-track-bpm">140 BPM</span>
                </div>
                <div class="bz-audio-row" data-audio="2">
                  <div class="bz-play-btn" data-playing="false">▶</div>
                  <span class="bz-track-name">DARK — Streets</span>
                  <span class="bz-track-bpm">138 BPM</span>
                </div>
                <div class="bz-audio-row" data-audio="3">
                  <div class="bz-play-btn" data-playing="false">▶</div>
                  <span class="bz-track-name">DARK — Melodic</span>
                  <span class="bz-track-bpm">145 BPM</span>
                </div>
                <div class="bz-audio-row" data-audio="4">
                  <div class="bz-play-btn" data-playing="false">▶</div>
                  <span class="bz-track-name">DARK — Drill</span>
                  <span class="bz-track-bpm">142 BPM</span>
                </div>
                <div class="bz-audio-row" data-audio="5">
                  <div class="bz-play-btn" data-playing="false">▶</div>
                  <span class="bz-track-name">DARK — Soul</span>
                  <span class="bz-track-bpm">135 BPM</span>
                </div>
              </div>
            </div>

            <!-- БИТМЕЙКЕР 2 -->
            <div class="bz-beat-card">
              <div class="bz-beat-profile">
                <div class="bz-beat-ava-wrap">
                  <div class="bz-beat-ava">
                    <div class="bz-img-ph square">PHOTO</div>
                  </div>
                  <div class="bz-beat-status">● ACTIVE</div>
                </div>
                <div class="bz-beat-bio">
                  <h4 class="bz-beat-name">REMO BEATS</h4>
                  <p class="bz-beat-genre">R&B · Afro · Pop</p>
                  <div class="bz-beat-socials">
                    <a href="#" class="bz-micro-link tg">TG</a>
                    <a href="#" class="bz-micro-link yt">YT</a>
                    <a href="#" class="bz-micro-link ig">IG</a>
                  </div>
                </div>
              </div>
              <div class="bz-beat-license">
                <div class="bz-lic-row">
                  <span class="bz-lic-type">🎵 MP3 АРЕНДА</span>
                  <span class="bz-lic-price">200 TJS</span>
                </div>
                <div class="bz-lic-row">
                  <span class="bz-lic-type">🎧 WAV АРЕНДА</span>
                  <span class="bz-lic-price">350 TJS</span>
                </div>
                <div class="bz-lic-row premium">
                  <span class="bz-lic-type">♾️ ПОЛНЫЙ ВЫКУП</span>
                  <span class="bz-lic-price">2 500 TJS</span>
                </div>
              </div>
              <div class="bz-beat-tracks">
                <div class="bz-beat-tracks-head">ТРЕКИ · ПРИМЕРЫ</div>
                <div class="bz-audio-row">
                  <div class="bz-play-btn" data-playing="false">▶</div>
                  <span class="bz-track-name">REMO — Afro Night</span>
                  <span class="bz-track-bpm">100 BPM</span>
                </div>
                <div class="bz-audio-row">
                  <div class="bz-play-btn" data-playing="false">▶</div>
                  <span class="bz-track-name">REMO — Vibes</span>
                  <span class="bz-track-bpm">95 BPM</span>
                </div>
                <div class="bz-audio-row">
                  <div class="bz-play-btn" data-playing="false">▶</div>
                  <span class="bz-track-name">REMO — Late Nights</span>
                  <span class="bz-track-bpm">105 BPM</span>
                </div>
                <div class="bz-audio-row">
                  <div class="bz-play-btn" data-playing="false">▶</div>
                  <span class="bz-track-name">REMO — Smooth</span>
                  <span class="bz-track-bpm">98 BPM</span>
                </div>
                <div class="bz-audio-row">
                  <div class="bz-play-btn" data-playing="false">▶</div>
                  <span class="bz-track-name">REMO — Wave</span>
                  <span class="bz-track-bpm">102 BPM</span>
                </div>
              </div>
            </div>

            <!-- БИТМЕЙКЕР 3 -->
            <div class="bz-beat-card">
              <div class="bz-beat-profile">
                <div class="bz-beat-ava-wrap">
                  <div class="bz-beat-ava">
                    <div class="bz-img-ph square">PHOTO</div>
                  </div>
                  <div class="bz-beat-status">● ACTIVE</div>
                </div>
                <div class="bz-beat-bio">
                  <h4 class="bz-beat-name">SOLO MUSIC</h4>
                  <p class="bz-beat-genre">Hip-Hop · Boom Bap · Soul</p>
                  <div class="bz-beat-socials">
                    <a href="#" class="bz-micro-link tg">TG</a>
                    <a href="#" class="bz-micro-link yt">YT</a>
                    <a href="#" class="bz-micro-link ig">IG</a>
                  </div>
                </div>
              </div>
              <div class="bz-beat-license">
                <div class="bz-lic-row">
                  <span class="bz-lic-type">🎵 MP3 АРЕНДА</span>
                  <span class="bz-lic-price">180 TJS</span>
                </div>
                <div class="bz-lic-row">
                  <span class="bz-lic-type">🎧 WAV АРЕНДА</span>
                  <span class="bz-lic-price">300 TJS</span>
                </div>
                <div class="bz-lic-row premium">
                  <span class="bz-lic-type">♾️ ПОЛНЫЙ ВЫКУП</span>
                  <span class="bz-lic-price">1 800 TJS</span>
                </div>
              </div>
              <div class="bz-beat-tracks">
                <div class="bz-beat-tracks-head">ТРЕКИ · ПРИМЕРЫ</div>
                <div class="bz-audio-row">
                  <div class="bz-play-btn" data-playing="false">▶</div>
                  <span class="bz-track-name">SOLO — Hustle</span>
                  <span class="bz-track-bpm">88 BPM</span>
                </div>
                <div class="bz-audio-row">
                  <div class="bz-play-btn" data-playing="false">▶</div>
                  <span class="bz-track-name">SOLO — Gold Era</span>
                  <span class="bz-track-bpm">90 BPM</span>
                </div>
                <div class="bz-audio-row">
                  <div class="bz-play-btn" data-playing="false">▶</div>
                  <span class="bz-track-name">SOLO — Legacy</span>
                  <span class="bz-track-bpm">92 BPM</span>
                </div>
                <div class="bz-audio-row">
                  <div class="bz-play-btn" data-playing="false">▶</div>
                  <span class="bz-track-name">SOLO — Raw</span>
                  <span class="bz-track-bpm">86 BPM</span>
                </div>
                <div class="bz-audio-row">
                  <div class="bz-play-btn" data-playing="false">▶</div>
                  <span class="bz-track-name">SOLO — Classic</span>
                  <span class="bz-track-bpm">94 BPM</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        <!-- ═══ COVERS ═══ -->
        <section class="bz-section" id="bz-covers">
          <div class="bz-sec-head">
            <div class="bz-sec-num">04</div>
            <div class="bz-sec-titles">
              <h2 class="bz-sec-title">COVERS</h2>
              <span class="bz-sec-sub">ДИЗАЙН ОБЛОЖЕК · АРТЫ · ВИЗУАЛ</span>
            </div>
            <div class="bz-sec-line"></div>
          </div>

          <div class="bz-covers-grid">
            ${Array(10).fill(0).map((_, i) => `
              <div class="bz-cover-card">
                <div class="bz-cover-img">
                  <div class="bz-cover-logo-ph">
                    <div class="bz-cover-logo-z">Z</div>
                    <span>COVER ${i + 1}</span>
                  </div>
                  <div class="bz-cover-overlay">
                    <div class="bz-cover-info">
                      <span class="bz-cover-designer">DESIGNER NAME</span>
                      <span class="bz-cover-tag">Обложка · Арт</span>
                      <span class="bz-cover-time">⏱ Срок: 48 часов</span>
                      <span class="bz-cover-price">450 TJS</span>
                      <div class="bz-cover-links">
                        <a href="#" class="bz-cov-btn tg">TG</a>
                        <a href="#" class="bz-cov-btn ig">IG</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- ═══ PARTNERS ═══ -->
        <section class="bz-section" id="bz-partners">
          <div class="bz-sec-head">
            <div class="bz-sec-num">05</div>
            <div class="bz-sec-titles">
              <h2 class="bz-sec-title">PARTNERS</h2>
              <span class="bz-sec-sub">ОФИЦИАЛЬНЫЕ ПАРТНЕРЫ ZARBA</span>
            </div>
            <div class="bz-sec-line"></div>
          </div>

          <div class="bz-partners-grid">

            <!-- ПАРТНЕР — добавляй по этому шаблону. Удаляй кнопки которые не нужны -->
            <div class="bz-partner-card">
              <div class="bz-partner-logo">
                <div class="bz-img-ph logo">LOGO</div>
              </div>
              <div class="bz-partner-name">PARTNER NAME</div>
              <div class="bz-partner-links">
                <a href="#" class="bz-p-link tg">TG</a>
                <a href="#" class="bz-p-link yt">YT</a>
                <a href="#" class="bz-p-link ig">IG</a>
                <a href="#" class="bz-p-link web">WEB</a>
                <a href="#" class="bz-p-link vk">VK</a>
                <a href="#" class="bz-p-link tt">TT</a>
              </div>
            </div>

            <div class="bz-partner-card">
              <div class="bz-partner-logo">
                <div class="bz-img-ph logo">LOGO</div>
              </div>
              <div class="bz-partner-name">PARTNER NAME</div>
              <div class="bz-partner-links">
                <a href="#" class="bz-p-link tg">TG</a>
                <a href="#" class="bz-p-link yt">YT</a>
                <a href="#" class="bz-p-link web">WEB</a>
              </div>
            </div>

            <div class="bz-partner-card">
              <div class="bz-partner-logo">
                <div class="bz-img-ph logo">LOGO</div>
              </div>
              <div class="bz-partner-name">PARTNER NAME</div>
              <div class="bz-partner-links">
                <a href="#" class="bz-p-link ig">IG</a>
                <a href="#" class="bz-p-link tt">TT</a>
                <a href="#" class="bz-p-link web">WEB</a>
              </div>
            </div>

            <div class="bz-partner-card">
              <div class="bz-partner-logo">
                <div class="bz-img-ph logo">LOGO</div>
              </div>
              <div class="bz-partner-name">PARTNER NAME</div>
              <div class="bz-partner-links">
                <a href="#" class="bz-p-link tg">TG</a>
                <a href="#" class="bz-p-link vk">VK</a>
              </div>
            </div>

            <div class="bz-partner-card">
              <div class="bz-partner-logo">
                <div class="bz-img-ph logo">LOGO</div>
              </div>
              <div class="bz-partner-name">PARTNER NAME</div>
              <div class="bz-partner-links">
                <a href="#" class="bz-p-link tg">TG</a>
                <a href="#" class="bz-p-link yt">YT</a>
                <a href="#" class="bz-p-link ig">IG</a>
                <a href="#" class="bz-p-link web">WEB</a>
              </div>
            </div>

          </div>
        </section>

        <!-- ═══ CLIPMAKERS ═══ -->
        <section class="bz-section" id="bz-clips">
          <div class="bz-sec-head">
            <div class="bz-sec-num">06</div>
            <div class="bz-sec-titles">
              <h2 class="bz-sec-title">CLIPMAKERS</h2>
              <span class="bz-sec-sub">СЪЕМКА КЛИПОВ · ВИДЕОПРОДАКШН</span>
            </div>
            <div class="bz-sec-line"></div>
          </div>

          <div class="bz-clip-wrap">
            <div class="bz-clip-video-col">
              <div class="bz-clip-video-frame">
                <!-- Замени src на ссылку YouTube embed -->
                <div class="bz-clip-play-overlay">
                  <div class="bz-play-circle">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <span>SHOWREEL 2024</span>
                </div>
              </div>
            </div>
            <div class="bz-clip-info-col">
              <div class="bz-clip-badge">VIDEO PRODUCTION</div>
              <h3 class="bz-clip-title">Z·VISION<br>PRODUCTION</h3>
              <p class="bz-clip-desc">Профессиональный продакшн в Таджикистане. Свет, камеры, монтаж — всё своё. Снимаем клипы которые попадают в тренды и набирают миллионы просмотров.</p>
              <div class="bz-clip-tags">
                <span>4K СЪЁМКА</span>
                <span>МОНТАЖ</span>
                <span>ЦВЕТОКОРРЕКЦИЯ</span>
                <span>ДРОНЫ</span>
              </div>
              <div class="bz-clip-price-block">
                <span class="bz-clip-price-label">СТОИМОСТЬ</span>
                <span class="bz-clip-price-val">ДОГОВОРНАЯ</span>
              </div>
              <div class="bz-clip-cta">
                <a href="https://t.me/your_tg" target="_blank" class="bz-clip-btn-main">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.286c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.935z"/></svg>
                  НАПИСАТЬ В TELEGRAM
                </a>
                <div class="bz-clip-mini-links">
                  <a href="https://instagram.com/your_ig" target="_blank" class="bz-mini-btn ig">IG</a>
                  <a href="https://youtube.com/@your_yt" target="_blank" class="bz-mini-btn yt">YT</a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- ═══ SCROLL TO TOP ═══ -->
      <button class="bz-scroll-top" id="bz-scroll-top" title="Наверх">↑</button>

      <!-- ═══ DISTRO ═══ -->
      <section class="bz-distro" id="bz-distro">
        <div class="bz-distro-noise"></div>
        <div class="bz-distro-inner">
          <div class="bz-distro-label">ZARBA × DISTRIBUTION</div>
          <h2 class="bz-distro-title">ВЫВЕДЕМ ТВОЙ ТРЕК<br>НА <span>ВЕСЬ МИР</span></h2>
          <p class="bz-distro-desc">Загрузим твою музыку на все мировые площадки.<br>Apple Music · Spotify · YouTube Music · TikTok · VK Музыка · Deezer и другие.</p>
          <div class="bz-distro-platforms">
            <span>🍎 APPLE MUSIC</span>
            <span>🎵 SPOTIFY</span>
            <span>▶ YOUTUBE</span>
            <span>🎶 TIKTOK</span>
            <span>🎸 VK</span>
            <span>🎧 DEEZER</span>
          </div>
          <a href="https://t.me/your_tg" target="_blank" class="bz-distro-btn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.286c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.935z"/></svg>
            ОТПРАВИТЬ ЗАЯВКУ В TELEGRAM
          </a>
          <p class="bz-distro-hint">Напишите нам - ответим в течение часа</p>
        </div>
      </section>

    </div>
  `;

  container.innerHTML = bazarHTML;
  initBazarLogic(container);
  }, 2000); // конец setTimeout загрузки
}

// ─── LOGIC ──────────────────────────────────────────────────
function initBazarLogic(el) {

  // УБИРАЕМ ФОН У РОДИТЕЛЯ чтобы градиент .bz-page был виден
  let parent = el.parentElement;
  while (parent && parent !== document.body) {
    parent.style.background = 'transparent';
    parent.style.backgroundColor = 'transparent';
    parent = parent.parentElement;
  }
  document.body.style.background = '#050505';
  document.documentElement.style.background = '#050505';

  // СЛАЙДЕР СТУДИИ
  const slides = el.querySelectorAll('.bz-slide');
  const dots = el.querySelectorAll('.bz-sdot');
  if (slides.length > 0) {
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }, 5000);
  }

  // РЕЙТИНГ СТУДИИ
  const stars = el.querySelectorAll('.bz-s');
  const ratingNum = el.querySelector('#bz-rating-num');
  const ratingCnt = el.querySelector('#bz-rating-cnt');
  const rateThanks = el.querySelector('#bz-rate-thanks');
  const starsDisplay = el.querySelector('#bz-stars');
  let totalVotes = 1200;
  let totalScore = 5.0 * totalVotes;

  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
      const val = parseInt(star.dataset.val);
      stars.forEach((s, i) => s.classList.toggle('hover', i < val));
    });
    star.addEventListener('mouseout', () => {
      stars.forEach(s => s.classList.remove('hover'));
    });
    star.addEventListener('click', () => {
      const val = parseInt(star.dataset.val);
      totalVotes++;
      totalScore += val;
      const newRating = (totalScore / totalVotes).toFixed(1);
      ratingNum.textContent = newRating;
      ratingCnt.textContent = `(${totalVotes.toLocaleString()} оценок)`;
      const filled = Math.round(parseFloat(newRating));
      starsDisplay.textContent = '★'.repeat(filled) + '☆'.repeat(5 - filled);
      rateThanks.textContent = '✓ Спасибо за оценку!';
      stars.forEach(s => s.classList.remove('hover', 'selected'));
      setTimeout(() => rateThanks.textContent = '', 3000);
    });
  });

  // ПЛЕЙ КНОПКИ БИТМЕЙКЕРОВ
  const playBtns = el.querySelectorAll('.bz-play-btn');
  playBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isPlaying = btn.dataset.playing === 'true';
      // Сбрасываем всех
      playBtns.forEach(b => {
        b.dataset.playing = 'false';
        b.textContent = '▶';
        b.closest('.bz-audio-row').classList.remove('playing');
      });
      if (!isPlaying) {
        btn.dataset.playing = 'true';
        btn.textContent = '⏹';
        btn.closest('.bz-audio-row').classList.add('playing');
      }
    });
  });

  // КНОПКА ВВЕРХ
  const scrollBtn = el.querySelector('#bz-scroll-top');
  if (scrollBtn) {
    const scrollContainer = el.closest('.page-content') || window;
    const checkScroll = () => {
      const scrollY = scrollContainer === window ? window.scrollY : scrollContainer.scrollTop;
      scrollBtn.classList.toggle('visible', scrollY > 400);
    };
    scrollContainer.addEventListener('scroll', checkScroll);
    scrollBtn.addEventListener('click', () => {
      if (scrollContainer === window) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
  el.querySelectorAll('.bz-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.querySelector(pill.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.querySelectorAll('.bz-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
}

// ─── CSS ────────────────────────────────────────────────────
function injectBazarCSS() {
  const existing = document.getElementById('bazar-styles-v2');
  if (existing) existing.remove();
  const s = document.createElement('style');
  s.id = 'bazar-styles-v2';
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

    /* ─── УБИВАЕМ ГЛОБАЛЬНЫЙ ФОН styles.css ─── */
    body:has(.bz-page)::before,
    body:has(.bz-page)::after {
      background: none !important;
      display: none !important;
    }
    body:has(.bz-page) {
      background: radial-gradient(ellipse 120% 60% at 50% 100%, rgba(140,0,0,0.45) 0%, rgba(80,0,0,0.2) 40%, #050505 70%) !important;
    }
    .bz-page { 
      background: 
        radial-gradient(ellipse 100% 50% at 50% 100%, rgba(140,0,0,0.35) 0%, rgba(60,0,0,0.15) 50%, transparent 75%),
        radial-gradient(ellipse 60% 35% at 5% 100%, rgba(100,0,0,0.18) 0%, transparent 60%),
        radial-gradient(ellipse 50% 30% at 95% 100%, rgba(100,0,0,0.15) 0%, transparent 55%),
        #050505 !important;
      min-height: 100vh; color: #fff; padding-bottom: 0; overflow-x: hidden; 
    }
    /* Убираем фон у родительских контейнеров чтобы градиент был виден */
    .bz-page * { box-sizing: border-box; }
    body:has(.bz-page),
    html:has(.bz-page) {
      background: #050505 !important;
    }
    .bz-container { padding: 0 60px; max-width: 1440px; margin: 0 auto; }
    .bz-img-ph { background: #1c1c1c; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: bold; color: #aaa; letter-spacing: 4px; text-transform: uppercase; border: 1px dashed #444; }
    .bz-img-ph.tall { height: 100%; width: 100%; }
    .bz-img-ph.square { width: 100%; height: 100%; }
    .bz-img-ph.sq { width: 100%; height: 100%; aspect-ratio: 1; }
    .bz-img-ph.logo { width: 100%; height: 100%; }

    /* ─── HERO ─── */
    .bz-hero { position: relative; padding: 100px 60px 80px; border-bottom: 1px solid #111; overflow: hidden; }
    .bz-hero-noise { position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E"); pointer-events: none; }
    .bz-hero-bg-text { position: absolute; right: -20px; top: 50%; transform: translateY(-50%); font-family: 'Bebas Neue', sans-serif; font-size: 260px; color: rgba(255,69,0,0.025); pointer-events: none; white-space: nowrap; }
    .bz-hero-inner { position: relative; z-index: 2; }
    .bz-hero-label { font-size: 10px; letter-spacing: 6px; color: #FF4500; display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
    .bz-dot { width: 4px; height: 4px; background: #FF4500; border-radius: 50%; display: inline-block; }
    .bz-hero-title { font-family: 'Bebas Neue', sans-serif; font-size: 130px; line-height: 0.85; margin: 0 0 25px; letter-spacing: -2px; }
    .bz-hero-title span { color: #FF4500; }
    .bz-hero-sub { font-size: 15px; color: #aaa; max-width: 480px; line-height: 1.7; margin-bottom: 40px; }
    .bz-hero-line { width: 60px; height: 2px; background: #FF4500; margin-bottom: 40px; }
    .bz-nav-pills { display: flex; flex-wrap: wrap; gap: 10px; }
    .bz-pill { font-size: 10px; letter-spacing: 3px; border: 1px solid #3a3a3a; color: #bbb; text-decoration: none; padding: 10px 20px; transition: 0.25s; }
    .bz-pill:hover, .bz-pill.active { border-color: #FF4500; color: #fff; background: rgba(255,69,0,0.08); }
   /* ─── SECTIONS ─── */
    .bz-section { padding: 120px 0; border-bottom: 1px solid #1a1a1a; }
    .bz-sec-head { display: flex; align-items: flex-end; gap: 24px; margin-bottom: 60px; }
    .bz-sec-num { font-family: 'Bebas Neue', sans-serif; font-size: 80px; color: #333; line-height: 1; flex-shrink: 0; }
    .bz-sec-titles { display: flex; flex-direction: column; gap: 4px; }
    .bz-sec-title { font-family: 'Bebas Neue', sans-serif; font-size: 52px; margin: 0; line-height: 1; letter-spacing: 1px; text-shadow: 0 5px 20px rgba(0,0,0,0.8); }
    .bz-sec-sub { font-size: 11px; font-weight: bold; letter-spacing: 4px; color: #aaa; text-transform: uppercase; }
    .bz-sec-line { flex: 1; height: 2px; background: linear-gradient(90deg, #333 0%, transparent 100%); margin-bottom: 14px; }

    /* ─── SHOP ─── */
    .bz-shop-meta { margin-bottom: 40px; }
    .bz-shop-store-badge { display: inline-flex; align-items: center; gap: 16px; border: 1px solid #1a1a1a; padding: 16px 24px; background: #0a0a0a; }
    .bz-store-icon { font-size: 24px; }
    .bz-store-info { display: flex; flex-direction: column; gap: 4px; }
    .bz-store-info strong { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; }
    .bz-store-info span { font-size: 11px; color: #aaa; }
    .bz-shop-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2px; }
    .bz-shop-card { background: #0a0a0a; border: 1px solid #222; box-shadow: 0 15px 40px rgba(0,0,0,0.6); transition: 0.35s; }
    .bz-shop-card:hover { border-color: #FF4500; transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.7); }
    .bz-shop-img-wrap { position: relative; }
    .bz-shop-img { aspect-ratio: 1; overflow: hidden; }
    .bz-shop-img .bz-img-ph { height: 100%; }
    .bz-shop-badge { position: absolute; top: 16px; left: 16px; font-size: 8px; letter-spacing: 3px; padding: 6px 12px; font-weight: 900; }
    .bz-shop-badge.new { background: #FF4500; color: #fff; }
    .bz-shop-badge.limited { background: #fff; color: #000; }
    .bz-shop-badge.sale { background: #FFD700; color: #000; }
    .bz-shop-body { padding: 28px; }
    .bz-shop-name { font-family: 'Bebas Neue', sans-serif; font-size: 26px; margin: 0 0 10px; letter-spacing: 1px; }
    .bz-shop-desc { font-size: 13px; color: #aaa; line-height: 1.7; margin-bottom: 24px; }
    .bz-shop-footer { display: flex; align-items: center; justify-content: space-between; }
    .bz-shop-price { font-family: 'Bebas Neue', sans-serif; font-size: 34px; }
    .bz-shop-price span { font-size: 14px; color: #FF4500; }
    .bz-shop-btns { display: flex; gap: 8px; }
    .bz-slink { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; gap: 6px; background: #111; border: 1px solid #1e1e1e; text-decoration: none; color: #aaa; font-size: 9px; letter-spacing: 1px; transition: 0.25s; }
    .bz-slink svg { width: 14px; height: 14px; }
    .bz-slink:hover { color: #fff; border-color: #FF4500; }
    .bz-slink.tg:hover { background: rgba(41,182,246,0.1); border-color: #29b6f6; }
    .bz-slink.ig:hover { background: rgba(225,48,108,0.1); border-color: #e1306c; }

    /* ─── STUDIO ─── */
    .bz-studio-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 0; background: #0a0a0a; border: 1px solid #222; box-shadow: 0 15px 40px rgba(0,0,0,0.6); }
    .bz-studio-slider-col { position: relative; }
    .bz-slider { position: relative; width: 100%; aspect-ratio: 1; overflow: hidden; }
    .bz-slide { position: absolute; inset: 0; opacity: 0; transition: opacity 1.2s ease-in-out; }
    .bz-slide.active { opacity: 1; }
    .bz-slider-dots { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 5; }
    .bz-sdot { width: 6px; height: 6px; border-radius: 50%; background: #333; transition: 0.3s; cursor: pointer; }
    .bz-sdot.active { background: #FF4500; width: 20px; border-radius: 3px; }
    .bz-studio-info-col { padding: 56px; border-left: 1px solid #151515; display: flex; flex-direction: column; justify-content: center; }
    .bz-studio-badge { font-size: 8px; letter-spacing: 5px; color: #FF4500; border: 1px solid #FF4500; display: inline-block; padding: 6px 14px; margin-bottom: 24px; width: fit-content; }
    .bz-studio-title { font-family: 'Bebas Neue', sans-serif; font-size: 64px; line-height: 0.9; margin: 0 0 24px; }
    .bz-studio-desc { font-size: 13px; color: #aaa; line-height: 1.8; margin-bottom: 36px; }
    .bz-studio-meta { display: flex; flex-direction: column; gap: 16px; margin-bottom: 36px; }
    .bz-smeta-row { display: flex; gap: 16px; align-items: flex-start; }
    .bz-smeta-icon { font-size: 16px; flex-shrink: 0; margin-top: 2px; }
    .bz-smeta-label { display: block; font-size: 9px; font-weight: bold; letter-spacing: 3px; color: #aaa; margin-bottom: 4px; }
    .bz-smeta-val { font-size: 13px; color: #ddd; }
    .bz-rating-row { display: flex; align-items: center; gap: 10px; }
    .bz-stars { color: #FFD700; font-size: 18px; }
    .bz-rating-num { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: #FFD700; }
    .bz-rating-cnt { font-size: 10px; color: #aaa; }
    .bz-user-rate-block { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 36px; padding: 16px; background: #0d0d0d; border: 1px solid #222; }
    .bz-rate-label { font-size: 9px; font-weight: bold; letter-spacing: 2px; color: #aaa; }
    .bz-star-select { display: flex; gap: 4px; cursor: pointer; }
    .bz-s { font-size: 22px; color: #2a2a2a; transition: 0.15s; user-select: none; }
    .bz-s.hover, .bz-s.selected { color: #FFD700; }
    .bz-rate-thanks { font-size: 11px; color: #FF4500; }
    .bz-studio-socials { display: flex; flex-wrap: wrap; gap: 8px; }
    .bz-soc-btn { display: flex; align-items: center; gap: 8px; padding: 11px 18px; text-decoration: none; font-size: 9px; letter-spacing: 2px; border: 1px solid #1e1e1e; color: #999; transition: 0.25s; }
    .bz-soc-btn svg { width: 14px; height: 14px; }
    .bz-soc-btn:hover { color: #fff; }
    .bz-soc-btn.tg:hover { border-color: #29b6f6; background: rgba(41,182,246,0.08); color: #29b6f6; }
    .bz-soc-btn.ig:hover { border-color: #e1306c; background: rgba(225,48,108,0.08); color: #e1306c; }
    .bz-soc-btn.yt:hover { border-color: #FF0000; background: rgba(255,0,0,0.08); color: #FF0000; }
    .bz-soc-btn.wa:hover { border-color: #25D366; background: rgba(37,211,102,0.08); color: #25D366; }

/* ─── BEATS ─── */
    .bz-beats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 2px; }
    .bz-beat-card { background: #0a0a0a; border: 1px solid #222; padding: 32px; box-shadow: 0 15px 40px rgba(0,0,0,0.6); transition: 0.3s; }
    .bz-beat-card:hover { border-color: #333; }
    .bz-beat-profile { display: flex; gap: 20px; align-items: center; margin-bottom: 28px; }
    .bz-beat-ava-wrap { position: relative; flex-shrink: 0; }
    .bz-beat-ava { width: 72px; height: 72px; overflow: hidden; border: 2px solid #1a1a1a; }
    .bz-beat-status { position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); font-size: 7px; letter-spacing: 1px; background: #111; color: #4CAF50; border: 1px solid #222; padding: 2px 7px; white-space: nowrap; }
    .bz-beat-bio h4 { font-family: 'Bebas Neue', sans-serif; font-size: 22px; margin: 0 0 4px; letter-spacing: 1px; }
    .bz-beat-genre { font-size: 11px; color: #bbb; margin-bottom: 10px; letter-spacing: 1px; }
    .bz-beat-socials { display: flex; gap: 6px; }
    .bz-micro-link { font-size: 8px; letter-spacing: 2px; text-decoration: none; color: #bbb; border: 1px solid #333; padding: 3px 9px; transition: 0.2s; }
    .bz-micro-link:hover { color: #fff; border-color: #FF4500; }
    .bz-micro-link.tg:hover { border-color: #29b6f6; color: #29b6f6; }
    .bz-micro-link.yt:hover { border-color: #FF0000; color: #FF0000; }
    .bz-micro-link.ig:hover { border-color: #e1306c; color: #e1306c; }
    .bz-beat-license { border: 1px solid #222; margin-bottom: 24px; }
    .bz-lic-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid #1a1a1a; }
    .bz-lic-row:last-child { border-bottom: none; }
    .bz-lic-row.premium { background: rgba(255,69,0,0.04); }
    .bz-lic-type { font-size: 11px; color: #aaa; font-weight: bold; }
    .bz-lic-price { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: #fff; }
    .bz-lic-row.premium .bz-lic-price { color: #FF4500; }
    .bz-beat-tracks-head { font-size: 9px; font-weight: bold; letter-spacing: 4px; color: #aaa; margin-bottom: 12px; }
    .bz-audio-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #1a1a1a; cursor: pointer; transition: 0.2s; }
    .bz-audio-row:hover { padding-left: 6px; border-bottom-color: #333; }
    .bz-audio-row.playing { border-bottom-color: #FF4500; }
    .bz-audio-row.playing .bz-track-name { color: #FF4500; }
    .bz-play-btn { width: 28px; height: 28px; border: 1px solid #333; background: none; color: #FF4500; font-size: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: 0.2s; }
    .bz-play-btn:hover { background: #FF4500; color: #fff; border-color: #FF4500; }
    .bz-track-name { font-size: 12px; color: #ddd; flex: 1; }
    .bz-track-bpm { font-size: 9px; color: #999; letter-spacing: 1px; font-weight: bold; }

    /* ─── COVERS ─── */
    .bz-covers-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 3px; }
    .bz-cover-card { position: relative; }
    .bz-cover-img { position: relative; aspect-ratio: 1; overflow: hidden; background: #0d0d0d; }
    .bz-cover-img .bz-img-ph.sq { position: absolute; inset: 0; aspect-ratio: unset; }
    .bz-cover-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.92); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; opacity: 0; transition: 0.35s; padding: 20px; border: 1px solid #FF4500; }
    .bz-cover-card:hover .bz-cover-overlay { opacity: 1; }
    .bz-cover-designer { font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 2px; margin-bottom: 4px; }
    .bz-cover-tag { font-size: 8px; letter-spacing: 2px; color: #999; margin-bottom: 8px; }
    .bz-cover-time { font-size: 10px; color: #aaa; margin-bottom: 8px; }
    .bz-cover-price { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: #FF4500; margin-bottom: 14px; }
    .bz-cover-links { display: flex; gap: 8px; }
    .bz-cov-btn { font-size: 8px; letter-spacing: 2px; text-decoration: none; color: #fff; border: 1px solid #333; padding: 5px 12px; transition: 0.2s; }
    .bz-cov-btn.tg:hover { border-color: #29b6f6; color: #29b6f6; }
    .bz-cov-btn.ig:hover { border-color: #e1306c; color: #e1306c; }

    /* ─── PARTNERS ─── */
    .bz-partners-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 2px; }
    .bz-partner-card { background: #0a0a0a; border: 1px solid #222; display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 40px 24px; box-shadow: 0 15px 40px rgba(0,0,0,0.6); transition: 0.3s; }
    .bz-partner-logo { width: 100px; height: 60px; overflow: hidden; }
    .bz-partner-name { font-size: 13px; font-weight: bold; letter-spacing: 3px; color: #ddd; text-align: center; }
    .bz-partner-links { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
    .bz-p-link { font-size: 9px; font-weight: bold; letter-spacing: 2px; text-decoration: none; color: #ddd; border: 1px solid #666; padding: 6px 12px; transition: 0.2s; }
    .bz-p-link:hover { color: #fff; }
    .bz-p-link.tg:hover { border-color: #29b6f6; color: #29b6f6; background: rgba(41,182,246,0.06); }
    .bz-p-link.yt:hover { border-color: #FF0000; color: #FF0000; background: rgba(255,0,0,0.06); }
    .bz-p-link.ig:hover { border-color: #e1306c; color: #e1306c; background: rgba(225,48,108,0.06); }
    .bz-p-link.web:hover { border-color: #fff; color: #fff; }
    .bz-p-link.vk:hover { border-color: #4a76a8; color: #4a76a8; background: rgba(74,118,168,0.06); }
    .bz-p-link.tt:hover { border-color: #69C9D0; color: #69C9D0; background: rgba(105,201,208,0.06); }

    /* ─── CLIPS ─── */
    .bz-clip-wrap { display: grid; grid-template-columns: 1.3fr 1fr; background: #0a0a0a; border: 1px solid #222; box-shadow: 0 15px 40px rgba(0,0,0,0.6); }
    .bz-clip-video-col { position: relative; min-height: 440px; background: #0a0a0a; display: flex; align-items: center; justify-content: center; overflow: hidden; border-right: 1px solid #111; }
    .bz-clip-play-overlay { display: flex; flex-direction: column; align-items: center; gap: 20px; cursor: pointer; }
    .bz-play-circle { width: 80px; height: 80px; border: 2px solid #FF4500; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
    .bz-play-circle svg { width: 32px; height: 32px; color: #FF4500; margin-left: 4px; }
    .bz-clip-play-overlay:hover .bz-play-circle { background: #FF4500; transform: scale(1.1); box-shadow: 0 0 40px rgba(255,69,0,0.4); }
    .bz-clip-play-overlay:hover .bz-play-circle svg { color: #fff; }
    .bz-clip-play-overlay span { font-size: 10px; font-weight: bold; letter-spacing: 5px; color: #ccc; }
    .bz-clip-info-col { padding: 56px; }
    .bz-clip-badge { font-size: 9px; font-weight: bold; letter-spacing: 5px; color: #ddd; border: 1px solid #555; display: inline-block; padding: 6px 14px; margin-bottom: 20px; }
    .bz-clip-title { font-family: 'Bebas Neue', sans-serif; font-size: 60px; line-height: 0.9; margin: 0 0 20px; }
    .bz-clip-desc { font-size: 13px; color: #aaa; line-height: 1.8; margin-bottom: 24px; }
    .bz-clip-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
    .bz-clip-tags span { font-size: 9px; font-weight: bold; letter-spacing: 2px; color: #ddd; border: 1px solid #666; padding: 5px 12px; }
    .bz-clip-price-block { margin-bottom: 32px; border-left: 3px solid #FF4500; padding-left: 16px; }
    .bz-clip-price-label { display: block; font-size: 9px; font-weight: bold; letter-spacing: 3px; color: #aaa; margin-bottom: 4px; }
    .bz-clip-price-val { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: #FF4500; }
    .bz-clip-cta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
    .bz-clip-btn-main { display: flex; align-items: center; gap: 10px; background: #FF4500; color: #fff; text-decoration: none; padding: 14px 24px; font-size: 11px; letter-spacing: 2px; font-weight: 900; transition: 0.3s; }
    .bz-clip-btn-main svg { width: 16px; height: 16px; }
    .bz-clip-btn-main:hover { background: #e03c00; transform: translateX(4px); }
    .bz-clip-mini-links { display: flex; gap: 8px; }
    .bz-mini-btn { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; border: 1px solid #666; text-decoration: none; color: #ddd; font-size: 10px; font-weight: bold; letter-spacing: 1px; transition: 0.2s; }
    .bz-mini-btn.ig:hover { border-color: #e1306c; color: #e1306c; }
    .bz-mini-btn.yt:hover { border-color: #FF0000; color: #FF0000; }

/* ─── DISTRO ─── */
    .bz-distro { position: relative; background: #FF4500; overflow: hidden; text-align: center; padding: 120px 60px; }
    .bz-distro-noise { position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"); pointer-events: none; }
    .bz-distro-inner { position: relative; z-index: 2; }
    .bz-distro-label { font-size: 10px; font-weight: 900; letter-spacing: 6px; color: #000; margin-bottom: 20px; }
    .bz-distro-title { font-family: 'Bebas Neue', sans-serif; font-size: 80px; line-height: 1; margin: 0 0 20px; color: #000; }
    .bz-distro-title span { color: #fff; }
    .bz-distro-desc { font-size: 18px; font-weight: 600; color: #000; margin-bottom: 40px; line-height: 1.6; }
    .bz-distro-platforms { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-bottom: 50px; }
    .bz-distro-platforms span { font-size: 11px; font-weight: 800; letter-spacing: 2px; background: #000; color: #fff; padding: 10px 22px; }
    .bz-distro-btn { display: inline-flex; align-items: center; gap: 12px; background: #000; color: #fff; text-decoration: none; padding: 20px 50px; font-size: 12px; letter-spacing: 3px; font-weight: 900; transition: 0.3s; margin-bottom: 20px; }
    .bz-distro-btn svg { width: 18px; height: 18px; }
    .bz-distro-btn:hover { transform: scale(1.04); box-shadow: 0 15px 40px rgba(0,0,0,0.5); background: #fff; color: #000; }
    .bz-distro-hint { font-size: 12px; font-weight: 700; color: #000; opacity: 0.75; }

    /* ─── SCROLL TO TOP ─── */
    .bz-scroll-top { position: fixed; bottom: 36px; right: 36px; width: 52px; height: 52px; background: #FF4500; color: #fff; border: none; font-size: 22px; cursor: pointer; z-index: 9999; display: flex; align-items: center; justify-content: center; opacity: 0; transform: translateY(20px); pointer-events: none; transition: 0.35s cubic-bezier(0.4,0,0.2,1); box-shadow: 0 8px 30px rgba(255,69,0,0.4); }
    .bz-scroll-top.visible { opacity: 1; transform: translateY(0); pointer-events: all; }
    .bz-scroll-top:hover { background: #e03c00; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(255,69,0,0.6); }

    /* ─── COVER LOGO PLACEHOLDER ─── */
    .bz-cover-logo-ph { position: absolute; inset: 0; background: #111; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; border: 1px solid #1e1e1e; }
    .bz-cover-logo-z { font-family: 'Bebas Neue', sans-serif; font-size: 52px; color: #2a2a2a; line-height: 1; transition: 0.3s; }
    .bz-cover-logo-ph span { font-size: 9px; letter-spacing: 3px; color: #2a2a2a; transition: 0.3s; }
    .bz-cover-card:hover .bz-cover-logo-z { color: #3a3a3a; }

    /* ─── RESPONSIVE ─── */
    @media (max-width: 1100px) {
      .bz-container { padding: 0 30px; }
      .bz-hero { padding: 70px 30px 60px; }
      .bz-hero-title { font-size: 90px; }
      .bz-studio-wrap { grid-template-columns: 1fr; }
      .bz-studio-info-col { border-left: none; border-top: 1px solid #151515; }
      .bz-clip-wrap { grid-template-columns: 1fr; }
      .bz-clip-video-col { min-height: 280px; border-right: none; border-bottom: 1px solid #111; }
      .bz-covers-grid { grid-template-columns: repeat(2, 1fr); }
      .bz-distro-title { font-size: 56px; }
      .bz-distro { padding: 80px 30px; }
    }
    @media (max-width: 768px) {
      .bz-hero-title { font-size: 70px; }
      .bz-sec-title { font-size: 40px; }
      .bz-beats-grid { grid-template-columns: 1fr; }
      .bz-covers-grid { grid-template-columns: repeat(2, 1fr); }
      .bz-shop-grid { grid-template-columns: 1fr; }
      .bz-studio-title { font-size: 48px; }
    }

/* ════════════════════════════════════════
   BAZAR — МОБИЛЬ ≤600px
════════════════════════════════════════ */
@media (max-width: 600px) {

  /* ── КОНТЕЙНЕР ── */
  .bz-container { padding: 0 14px !important; }

  /* ── HERO ── */
  .bz-hero { padding: 60px 16px 40px !important; }
  .bz-hero-bg-text { font-size: 100px !important; right: -10px !important; }
  .bz-hero-title { font-size: 72px !important; letter-spacing: -1px !important; margin-bottom: 16px !important; }
  .bz-hero-sub { font-size: 13px !important; margin-bottom: 28px !important; }
  .bz-hero-label { font-size: 9px !important; letter-spacing: 4px !important; }
  .bz-hero-line { margin-bottom: 24px !important; }

  /* ── НАВИГАЦИЯ PILLS — скролл горизонтально ── */
  .bz-nav-pills {
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    scrollbar-width: none !important;
    gap: 6px !important;
    padding-bottom: 4px !important;
  }
  .bz-nav-pills::-webkit-scrollbar { display: none !important; }
  .bz-pill { padding: 8px 14px !important; font-size: 9px !important; white-space: nowrap !important; flex-shrink: 0 !important; }

  /* ── СЕКЦИИ ── */
  .bz-section { padding: 52px 0 40px !important; }
  .bz-sec-head { gap: 12px !important; margin-bottom: 28px !important; align-items: flex-end !important; }
  .bz-sec-num { font-size: 48px !important; color: #555 !important; }
  .bz-sec-title { font-size: 34px !important; }
  .bz-sec-sub { font-size: 9px !important; letter-spacing: 2px !important; }
  .bz-sec-line { display: none !important; }

  /* ── SHOP ── */
  .bz-shop-store-badge { padding: 12px 16px !important; gap: 12px !important; }
  .bz-store-info strong { font-size: 11px !important; }
  .bz-store-info span { font-size: 10px !important; }
  .bz-shop-grid { grid-template-columns: 1fr 1fr !important; gap: 2px !important; }
  .bz-shop-body { padding: 14px !important; }
  .bz-shop-name { font-size: 16px !important; margin-bottom: 6px !important; }
  .bz-shop-desc { font-size: 11px !important; margin-bottom: 14px !important; line-height: 1.5 !important; }
  .bz-shop-footer { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
  .bz-shop-price { font-size: 24px !important; }
  .bz-shop-price span { font-size: 12px !important; }
  .bz-slink { width: 36px !important; height: 36px !important; }

  /* ── СТУДИЯ ── */
  .bz-studio-wrap { grid-template-columns: 1fr !important; }
  .bz-studio-slider-col .bz-slider { aspect-ratio: 4/3 !important; }
  .bz-studio-info-col { padding: 24px 16px !important; border-left: none !important; border-top: 1px solid #1a1a1a !important; }
  .bz-studio-badge { font-size: 7px !important; padding: 5px 10px !important; }
  .bz-studio-title { font-size: 42px !important; margin-bottom: 14px !important; }
  .bz-studio-desc { font-size: 12px !important; margin-bottom: 20px !important; }
  .bz-studio-meta { gap: 12px !important; margin-bottom: 20px !important; }
  .bz-smeta-icon { font-size: 14px !important; }
  .bz-smeta-val { font-size: 12px !important; }
  .bz-user-rate-block { padding: 12px !important; gap: 10px !important; flex-wrap: wrap !important; }
  .bz-studio-socials { gap: 6px !important; }
  .bz-soc-btn { padding: 9px 12px !important; font-size: 8px !important; gap: 6px !important; }

  /* ── БИТЫ ── */
  .bz-beats-grid { grid-template-columns: 1fr !important; }
  .bz-beat-card { padding: 20px 16px !important; }
  .bz-beat-profile { gap: 14px !important; margin-bottom: 18px !important; }
  .bz-beat-ava { width: 58px !important; height: 58px !important; }
  .bz-beat-bio h4 { font-size: 18px !important; }
  .bz-beat-genre { font-size: 10px !important; }
  .bz-lic-row { padding: 10px 12px !important; }
  .bz-lic-type { font-size: 10px !important; }
  .bz-lic-price { font-size: 18px !important; }
  .bz-beat-tracks-head { font-size: 8px !important; letter-spacing: 3px !important; }
  .bz-audio-row { gap: 8px !important; padding: 9px 0 !important; }
  .bz-track-name { font-size: 11px !important; }
  .bz-track-bpm { font-size: 8px !important; }

  /* ── ОБЛОЖКИ ── */
  .bz-covers-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 2px !important; }
  .bz-cover-overlay { padding: 12px !important; }
  .bz-cover-designer { font-size: 13px !important; }
  .bz-cover-price { font-size: 18px !important; margin-bottom: 10px !important; }
  .bz-cov-btn { font-size: 7px !important; padding: 4px 10px !important; }

  /* ── ПАРТНЁРЫ ── */
  .bz-partners-grid { grid-template-columns: 1fr 1fr !important; }
  .bz-partner-card { padding: 24px 14px !important; gap: 12px !important; }
  .bz-partner-name { font-size: 11px !important; letter-spacing: 2px !important; }
  .bz-p-link { font-size: 8px !important; padding: 5px 8px !important; }

  /* ── СЪЁМКА / КЛИПЫ ── */
  .bz-clip-wrap { grid-template-columns: 1fr !important; }
  .bz-clip-video-col { min-height: 220px !important; border-right: none !important; border-bottom: 1px solid #111 !important; }
  .bz-play-circle { width: 60px !important; height: 60px !important; }
  .bz-play-circle svg { width: 24px !important; height: 24px !important; }
  .bz-clip-info-col { padding: 24px 16px !important; }
  .bz-clip-title { font-size: 38px !important; margin-bottom: 12px !important; }
  .bz-clip-desc { font-size: 12px !important; margin-bottom: 16px !important; }
  .bz-clip-tags { gap: 6px !important; margin-bottom: 18px !important; }
  .bz-clip-tags span { font-size: 8px !important; padding: 4px 10px !important; }
  .bz-clip-price-val { font-size: 24px !important; }
  .bz-clip-btn-main { padding: 12px 18px !important; font-size: 10px !important; }
  .bz-clip-cta { gap: 8px !important; }
  .bz-mini-btn { width: 38px !important; height: 38px !important; font-size: 9px !important; }

  /* ── ДИСТРИБУЦИЯ ── */
  .bz-distro { padding: 64px 20px !important; }
  .bz-distro-title { font-size: 44px !important; }
  .bz-distro-desc { font-size: 14px !important; margin-bottom: 28px !important; }
  .bz-distro-platforms { gap: 8px !important; margin-bottom: 32px !important; }
  .bz-distro-platforms span { font-size: 10px !important; padding: 8px 14px !important; }
  .bz-distro-btn { padding: 14px 28px !important; font-size: 11px !important; letter-spacing: 2px !important; }

  /* ── КНОПКА ВВЕРХ ── */
  .bz-scroll-top { bottom: 20px !important; right: 16px !important; width: 44px !important; height: 44px !important; font-size: 18px !important; }
}
  `;
  document.head.appendChild(s);
}