// ============================================================
//  ZARBA — ЗАЛ СЛАВЫ [HALL OF FAME]
// ============================================================

function renderHall(container) {
  container.innerHTML = '';
  injectHallCSS();

  container.innerHTML = `
    <div class="hof-page">

      <!-- 3D CANVAS -->
      <div id="hof-canvas-wrap"></div>

      <!-- OVERLAY КОНТЕНТ -->
      <div class="hof-overlay">
        <div class="hof-label">ZARBA · ЗАЛ СЛАВЫ</div>
        <h1 class="hof-title">
          <span>LEG</span><span>EN</span><span>DS</span>
        </h1>
        <ul class="hof-names">
          <li><a href="#">ISMAIL</a></li>
          <li><a href="#">RYDER</a></li>
          <li><a href="#">ABADA</a></li>
          <li><a href="#">MR SLIM</a></li>
        </ul>
        <p class="hof-sub">Артисты преодолевшие отметку 100 000 фанатов</p>
      </div>

    </div>
  `;

  initHallScene(container);
}

// ─── THREE.JS СЦЕНА ─────────────────────────────────────────
function initHallScene(el) {
  const wrap = el.querySelector('#hof-canvas-wrap');
  if (!wrap) return;

  // Динамически грузим Three.js если ещё не загружен
  if (typeof THREE !== 'undefined') {
    _buildScene(wrap);
    return;
  }

  // Importmap + module script
  const importmap = document.createElement('script');
  importmap.type = 'importmap';
  importmap.textContent = JSON.stringify({
    imports: {
      "three": "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js",
      "jsm/": "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/"
    }
  });

  // Проверяем что importmap ещё не добавлен
  if (!document.querySelector('script[type="importmap"]')) {
    document.head.appendChild(importmap);
  }

  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = `
    import * as THREE from 'three';
    import { OrbitControls } from 'jsm/controls/OrbitControls.js';
    import { OBJLoader } from 'jsm/loaders/OBJLoader.js';

    const wrap = document.getElementById('hof-canvas-wrap');
    if (!wrap) return;

    const w = wrap.clientWidth || window.innerWidth;
    const h = wrap.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.set(-7, -5, 11);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    wrap.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 2.2;

    const vertexShader = \`
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    \`;

    const fragmentShader = \`
      uniform float uTime;
      uniform float uCircleSpacing;
      uniform float uLineWidth;
      uniform float uSpeed;
      uniform float uFadeEdge;
      uniform vec3 uCameraPosition;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        vec2 center = vec2(0.5, 0.5);
        vec2 uv = vUv;
        float dist = distance(uv, center);
        float animatedDist = dist - uTime * uSpeed;
        float circle = mod(animatedDist, uCircleSpacing);
        float distFromEdge = min(circle, uCircleSpacing - circle);
        float aaWidth = length(vec2(dFdx(animatedDist), dFdy(animatedDist))) * 2.0;
        float lineAlpha = 1.0 - smoothstep(uLineWidth - aaWidth, uLineWidth + aaWidth, distFromEdge);
        vec3 baseColor = mix(vec3(0.12, 0.0, 0.0), vec3(0.8, 0.1, 0.0), lineAlpha);
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(uCameraPosition - vPosition);
        vec3 lightDir = normalize(vec3(5.0, 10.0, 5.0));
        float NdotL = max(dot(normal, lightDir), 0.0);
        vec3 diffuse = baseColor * (0.5 + 0.5 * NdotL);
        vec3 reflectDir = reflect(-lightDir, normal);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 64.0);
        vec3 specular = vec3(1.0, 0.3, 0.0) * spec * 0.6;
        float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.0);
        vec3 fresnelColor = vec3(0.8, 0.2, 0.0) * fresnel * 0.3;
        vec3 finalColor = diffuse + specular + fresnelColor;
        float edgeFade = smoothstep(0.5 - uFadeEdge, 0.5, dist);
        float alpha = 1.0 - edgeFade;
        gl_FragColor = vec4(finalColor, alpha);
      }
    \`;

    const floorGeometry = new THREE.CircleGeometry(20, 200);
    const floorMaterial = new THREE.ShaderMaterial({
      vertexShader, fragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        uCircleSpacing: { value: 0.06 },
        uLineWidth: { value: 0.02 },
        uSpeed: { value: 0.01 },
        uFadeEdge: { value: 0.2 },
        uCameraPosition: { value: new THREE.Vector3() },
      },
      side: THREE.DoubleSide,
      transparent: true,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    floor.receiveShadow = true;
    scene.add(floor);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const loader = new OBJLoader();
    loader.load(
      'https://cdn.jsdelivr.net/gh/danielyl123/person/person.obj',
      (object) => {
        object.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.7, metalness: 0.3 });
            child.castShadow = true;
          }
        });
        const box = new THREE.Box3().setFromObject(object);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const size = new THREE.Vector3();
        box.getSize(size);
        object.traverse((child) => {
          if (child.isMesh && child.geometry) child.geometry.translate(-center.x, -center.y, -center.z);
        });
        const scale = 4 / Math.max(size.x, size.y, size.z);
        object.scale.set(scale, scale, scale);
        object.position.set(0, 1, 0);
        object.rotation.y = Math.PI / 3;
        scene.add(object);
        controls.target.set(0, 0, 0);
        controls.update();
      }
    );

    let time = 0;
    function animate() {
      requestAnimationFrame(animate);
      time += 0.016;
      floorMaterial.uniforms.uTime.value = time;
      camera.getWorldPosition(floorMaterial.uniforms.uCameraPosition.value);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      const w2 = wrap.clientWidth || window.innerWidth;
      const h2 = wrap.clientHeight || window.innerHeight;
      renderer.setSize(w2, h2);
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
    });
  `;

  document.body.appendChild(script);
}

// ─── CSS ────────────────────────────────────────────────────
function injectHallCSS() {
  const existing = document.getElementById('hall-styles');
  if (existing) existing.remove();
  const s = document.createElement('style');
  s.id = 'hall-styles';
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;600;900&family=Bebas+Neue&display=swap');

    .hof-page {
      position: relative;
      width: 100%;
      height: calc(100vh - 60px);
      background: #000;
      overflow: hidden;
    }

    #hof-canvas-wrap {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    #hof-canvas-wrap canvas {
      width: 100% !important;
      height: 100% !important;
    }

    .hof-overlay {
      position: absolute;
      inset: 0;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding-top: 60px;
      pointer-events: none;
      text-align: center;
    }

    .hof-label {
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      letter-spacing: 6px;
      color: rgba(255,69,0,0.8);
      margin-bottom: 16px;
      text-transform: uppercase;
    }

    .hof-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 120px;
      font-weight: 900;
      line-height: 1;
      margin: 0 0 20px;
      display: flex;
      gap: 0;
      color: #fff;
      text-shadow: 0 0 60px rgba(255,69,0,0.3);
    }

    .hof-title span:nth-child(1) { font-weight: 900; color: #fff; }
    .hof-title span:nth-child(2) { font-weight: 600; color: #ddd; }
    .hof-title span:nth-child(3) { font-weight: 300; color: #aaa; }

    .hof-names {
      list-style: none;
      display: flex;
      gap: 40px;
      margin: 0 0 30px;
      padding: 0;
      pointer-events: all;
    }

    .hof-names li a {
      font-family: 'Montserrat', sans-serif;
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 4px;
      color: rgba(255,255,255,0.5);
      text-decoration: none;
      text-transform: uppercase;
      transition: color 0.3s;
    }

    .hof-names li a:hover {
      color: #FF4500;
    }

    .hof-sub {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      letter-spacing: 3px;
      color: rgba(255,255,255,0.25);
      text-transform: uppercase;
    }

    @media (max-width: 768px) {
      .hof-title { font-size: 70px; }
      .hof-names { gap: 20px; flex-wrap: wrap; justify-content: center; }
    }
  `;
  document.head.appendChild(s);
}