// ============================================================
//  ZARBA — ГЛАВНЫЙ УПРАВЛЯЮЩИЙ ФАЙЛ (main.js) FIXED
// ============================================================

(function() {
  const appContent = document.getElementById('app-content');
  let firebaseReady = false;
  let pendingPage = null;

  const firebaseConfig = {
    apiKey: "AIzaSyCJMVvgpgVkb07FEpVla1k9B7isqAnwnVU",
    authDomain: "zarba.ru",
    projectId: "zarbatjlk",
    storageBucket: "zarbatjlk.firebasestorage.app",
    messagingSenderId: "770956271960",
    appId: "1:770956271960:web:485e94f06834924c885e34"
  };

  async function initFirebase() {
    try {
      const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
      const { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
      const { getFirestore, doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, orderBy, limit } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
      const { getStorage, ref, uploadBytes, getDownloadURL } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js");

      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db   = getFirestore(app);

      // Прокидываем в window
      window.firebaseAuth    = auth;
      window.firebaseDb      = db;
      window.firebaseStorage = getStorage(app);
      window.doc         = doc;
      window.getDoc      = getDoc;
      window.setDoc      = setDoc;
      window.updateDoc   = updateDoc;
      window.collection  = collection;
      window.query       = query;
      window.where       = where;
      window.getDocs     = getDocs;
      window.orderBy     = orderBy;
      window.limit       = limit;
      window.ref         = ref;
      window.uploadBytes = uploadBytes;
      window.getDownloadURL = getDownloadURL;

      // Проверка/создание профиля в базе (НЕ трогает app-content)
      async function checkUserProfile(user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const snap = await getDoc(userDocRef);
          if (!snap.exists()) {
            await setDoc(userDocRef, {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
              username: "",
              role: "fan",
              createdAt: new Date()
            });
          }
        } catch (e) { console.error("Firebase DB Error:", e.message); }
      }

      // Следим за состоянием — ТОЛЬКО обновляем шапку, не трогаем контент
      onAuthStateChanged(auth, (user) => {
        const authSection = document.getElementById('auth-section');
        if (user) {
          authSection.innerHTML = `
            <div class="user-pill" onclick="document.getElementById('auth-section').classList.toggle('active')">
              <span class="user-pill-name">${user.displayName.split(' ')[0]}</span>
              <img src="${user.photoURL}" class="user-pill-avatar" alt="Ava">
              <div class="user-dropdown">
                <div class="dropdown-item" onclick="showPage('profile')">👤 ПРОФИЛЬ</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item exit" onclick="logout()">🚪 ВЫХОД</div>
              </div>
            </div>`;
          checkUserProfile(user);
        } else {
          authSection.innerHTML = '<button class="btn-google-auth" onclick="window.signInWithGoogle()">ВХОД</button>';
        }

        // Firebase готов — если была отложенная страница, показываем её
        if (!firebaseReady) {
          firebaseReady = true;
          if (pendingPage) {
            const p = pendingPage;
            pendingPage = null;
            _renderPage(p);
          }
        }
      });

      window.signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
      window.logout = () => signOut(auth).then(() => { window.location.hash = 'home'; window.location.reload(); });

      console.log("🔥 ZARBA Engine: Firebase Connected");
    } catch (err) { console.error("Firebase Init Failed:", err); }
  }

  // Внутренний рендер страницы (без изменения hash/nav)
  function _renderPage(page) {
    if (!appContent) return;

    if (page === 'profile') {
      if (typeof window.renderProfile === 'function') {
        window.renderProfile(appContent);
      } else {
        appContent.innerHTML = '<div style="color:#ff0055;padding:100px;text-align:center;">ОШИБКА: profile.js не найден!</div>';
      }
      return;
    }

    switch (page) {
      case 'home':      if (typeof renderHome        === 'function') renderHome(appContent);        break;
      case 'artists':   if (typeof renderArtists     === 'function') renderArtists(appContent);     break;
      case 'charts':    if (typeof renderCharts      === 'function') renderCharts(appContent);      break;
      case 'media':     if (typeof renderMedia       === 'function') renderMedia(appContent);       break;
      case 'bazar':     if (typeof renderBazar       === 'function') renderBazar(appContent);       break;
      case 'collabs':   if (typeof renderCollab      === 'function') renderCollab(appContent);      break;
      case 'playlists': if (typeof renderPlaylists   === 'function') renderPlaylists(appContent);   break;
      case 'hall':      if (typeof renderHallOfFame  === 'function') renderHallOfFame(appContent);  break;
      default:          if (typeof renderHome        === 'function') renderHome(appContent);
    }
  }

  // ГЛАВНЫЙ ПЕРЕКЛЮЧАТЕЛЬ СТРАНИЦ
  window.showPage = function(page) {
    if (!appContent) return;

    window.location.hash = page;

    // Навигация
    document.querySelectorAll('.main-nav button').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.main-nav button[onclick*="${page}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Очищаем контент
    appContent.innerHTML = '';

    // Закрываем дропдаун
    const authSection = document.getElementById('auth-section');
    if (authSection) authSection.classList.remove('active');

    // Если Firebase ещё не готов — откладываем рендер
    if (!firebaseReady && page === 'profile') {
      pendingPage = page;
      appContent.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;min-height:60vh;color:rgba(255,255,255,.3);font-size:14px;font-weight:700;">Загрузка...</div>';
      return;
    }

    _renderPage(page);
  };

  // Запуск Firebase
  initFirebase();

  // При загрузке страницы — открываем нужный раздел
  document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    // Для профиля ждём Firebase, для остальных — сразу
    if (hash === 'profile') {
      pendingPage = hash;
      appContent.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;min-height:60vh;color:rgba(255,255,255,.3);font-size:14px;font-weight:700;">Загрузка...</div>';
    } else {
      setTimeout(() => window.showPage(hash), 300);
    }
  });

})();