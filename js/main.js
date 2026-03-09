// ============================================================
//  ZARBA — ГЛАВНЫЙ УПРАВЛЯЮЩИЙ ФАЙЛ (main.js)
// ============================================================

(function() {
  const appContent = document.getElementById('app-content');
  let firebaseReady = false;
  let pendingPage = null;

  // Твои данные для входа
  const ADMIN_EMAIL = "levakandproduction@gmail.com";
  const ADMIN_PASS  = "00202Leva";

  const firebaseConfig = {
    apiKey: "AIzaSyCJMVvgpgVkb07FEpVla1k9B7isqAnwnVU",
    authDomain: "zarbatjlk.firebaseapp.com",
    projectId: "zarbatjlk",
    storageBucket: "zarbatjlk.firebasestorage.app",
    messagingSenderId: "770956271960",
    appId: "1:770956271960:web:485e94f06834924c885e34"
  };

  async function initFirebase() {
    try {
      const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
      const { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
      const { getFirestore, doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, orderBy, limit, increment, deleteDoc, addDoc, serverTimestamp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
      const { getStorage, ref, uploadBytes, getDownloadURL } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js");

      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db   = getFirestore(app);

      // Прокидываем в window для доступа из других файлов
      window.firebaseAuth     = auth;
      window.firebaseDb       = db;
      window.firebaseStorage  = getStorage(app);
      window.doc = doc; window.getDoc = getDoc; window.setDoc = setDoc;
      window.updateDoc = updateDoc; window.collection = collection;
      window.query = query; window.where = where; window.getDocs = getDocs;
      window.orderBy = orderBy; window.limit = limit;
      window.increment = increment; window.deleteDoc = deleteDoc;
      window.addDoc = addDoc; window.serverTimestamp = serverTimestamp;
      window.ref = ref; window.uploadBytes = uploadBytes; window.getDownloadURL = getDownloadURL;

      async function checkUserProfile(user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const snap = await getDoc(userDocRef);
          if (!snap.exists()) {
            await setDoc(userDocRef, {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              username: "",
              role: (user.email === ADMIN_EMAIL) ? "admin" : "fan", 
              createdAt: new Date()
            });
          }
        } catch (e) { console.error("Firebase DB Error:", e.message); }
      }

      onAuthStateChanged(auth, (user) => {
        const authSection = document.getElementById('auth-section');
        if (user) {
          const isAdmin = (user.email === ADMIN_EMAIL);
          authSection.innerHTML = `
            <div class="user-pill" onclick="document.getElementById('auth-section').classList.toggle('active')">
              <span class="user-pill-name">${user.displayName.split(' ')[0]}</span>
              <img src="${user.photoURL}" class="user-pill-avatar" alt="Ava">
              <div class="user-dropdown">
                <div class="dropdown-item" onclick="showPage('profile')">👤 ПРОФИЛЬ</div>
                ${isAdmin ? `<div class="dropdown-item" style="color:#ffcc00" onclick="window.enterAdmin()">⚙️ АДМИНКА</div>` : ''}
                <div class="dropdown-divider"></div>
                <div class="dropdown-item exit" onclick="logout()">🚪 ВЫХОД</div>
              </div>
            </div>`;
          checkUserProfile(user);
        } else {
          authSection.innerHTML = '<button class="btn-google-auth" onclick="window.signInWithGoogle()">ВХОД</button>';
        }

        if (!firebaseReady) {
          firebaseReady = true;
          if (pendingPage) { _renderPage(pendingPage); pendingPage = null; }
        }
      });

      window.signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
      window.logout = () => signOut(auth).then(() => { window.location.hash = 'home'; window.location.reload(); });

      // Секретный вход с паролем
      window.enterAdmin = () => {
        const pass = prompt("Введите пароль администратора:");
        if (pass === ADMIN_PASS) {
          showPage('admin');
        } else {
          alert("Доступ запрещен!");
        }
      };

    } catch (err) { console.error("Firebase Init Failed:", err); }
  }

  function _renderPage(page) {
    if (!appContent) return;
    
    // Защита админки на уровне рендера
    if (page === 'admin') {
      const user = window.firebaseAuth.currentUser;
      if (!user || user.email !== ADMIN_EMAIL) {
        window.showPage('home');
        return;
      }
      if (typeof window.renderAdmin === 'function') {
        window.renderAdmin(appContent);
      } else {
        appContent.innerHTML = '<div style="color:#ffcc00;padding:100px;text-align:center;">Файл admin.js не загружен</div>';
      }
      return;
    }

    if (page === 'profile') {
      if (typeof window.renderProfile === 'function') window.renderProfile(appContent);
      return;
    }

    switch (page) {
      case 'home':      if (typeof renderHome === 'function') renderHome(appContent); break;
      case 'artists':   if (typeof renderArtists === 'function') renderArtists(appContent); break;
      case 'charts':    if (typeof renderCharts === 'function') renderCharts(appContent); break;
      case 'media':     if (typeof renderMedia === 'function') renderMedia(appContent); break;
      case 'bazar':     if (typeof renderBazar === 'function') renderBazar(appContent); break;
      case 'collabs':   if (typeof renderCollab === 'function') renderCollab(appContent); break;
      case 'playlists': if (typeof renderPlaylists === 'function') renderPlaylists(appContent); break;
      case 'hall':      if (typeof renderHallOfFame === 'function') renderHallOfFame(appContent); break;
      case 'genres':    if (typeof window.renderGenres === 'function') window.renderGenres(appContent); break;
      default:          if (typeof renderHome === 'function') renderHome(appContent);
    }
  }

  window.showPage = function(page) {
    if (!appContent) return;
    window.location.hash = page;
    
    // Подсветка активной кнопки в навигации
    document.querySelectorAll('.main-nav button').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.main-nav button[onclick*="${page}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    // Cleanup предыдущей страницы (таймеры, аудио, подписки Firebase)
    if (typeof window._pageCleanup === 'function') {
      try { window._pageCleanup(); } catch(e) {}
      window._pageCleanup = null;
    }

    appContent.innerHTML = '';
    const authSection = document.getElementById('auth-section');
    if (authSection) authSection.classList.remove('active');

    // Если Firebase ещё не готов — откладываем рендер
    if (!firebaseReady && (page === 'profile' || page === 'admin' || page === 'artists')) {
      pendingPage = page;
      appContent.innerHTML = '<div style="color:rgba(255,255,255,.3);text-align:center;padding:100px;">Загрузка системы...</div>';
      return;
    }
    _renderPage(page);
  };

  initFirebase();

  document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    if (hash === 'profile' || hash === 'admin') {
      pendingPage = hash;
    } else {
      setTimeout(() => window.showPage(hash), 300);
    }
  });
})();