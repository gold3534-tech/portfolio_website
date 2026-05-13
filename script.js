import * as THREE from "./assets/vendor/three.module.js";

const shell = document.querySelector(".game-shell");
const introScene = document.querySelector(".intro-scene");
const canvas = document.querySelector("#computer-canvas");
const enterButton = document.querySelector("[data-enter-screen]");
const loadingBar = document.querySelector("[data-loading-bar]");
const loadingText = document.querySelector("[data-loading-text]");
const tabs = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll("[data-panel]");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let computerReady = false;
let entering = false;
let threeIntro = null;

function markComputerReady() {
  computerReady = true;
  enterButton.classList.add("is-ready");
}

function initThreeIntro() {
  try {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f3ec);
    scene.fog = new THREE.Fog(0xf6f3ec, 14, 28);

    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 2.25, 9.2);
    camera.lookAt(0, -0.72, 0.35);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.add(new THREE.AmbientLight(0xffffff, 1.1));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(4, 8, 6);
    scene.add(keyLight);

    const screenLight = new THREE.PointLight(0x79f26d, 0, 8);
    screenLight.position.set(0, 1.7, 2.15);
    scene.add(screenLight);

    const computer = new THREE.Group();
    scene.add(computer);

    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xd8d2bf, roughness: 0.74, metalness: 0.08 });
    const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x081712,
      emissive: 0x79f26d,
      emissiveIntensity: 0,
      roughness: 0.25,
    });
    const keyboardMaterial = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.82 });
    const tableMaterial = new THREE.MeshStandardMaterial({ color: 0xd9b06f, roughness: 0.62 });
    const tableDarkMaterial = new THREE.MeshStandardMaterial({ color: 0x9b6a35, roughness: 0.72 });
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xf6f3ec, roughness: 0.9 });

    const monitor = new THREE.Mesh(new THREE.BoxGeometry(3.7, 2.55, 1.1), bodyMaterial);
    monitor.position.y = 1.35;
    computer.add(monitor);

    const screenFrame = new THREE.Mesh(new THREE.BoxGeometry(3.12, 1.92, 0.1), darkMaterial);
    screenFrame.position.set(0, 1.42, 0.53);
    screenFrame.scale.z = 0.5;
    computer.add(screenFrame);

    const screen = new THREE.Mesh(new THREE.BoxGeometry(2.82, 1.62, 0.08), screenMaterial);
    screen.position.set(0, 1.42, 0.62);
    computer.add(screen);

    const stand = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.72, 0.45), bodyMaterial);
    stand.position.y = -0.15;
    computer.add(stand);

    const base = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.22, 1.35), bodyMaterial);
    base.position.y = -0.62;
    computer.add(base);

    const keyboard = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.2, 1.15), keyboardMaterial);
    keyboard.position.set(0, -1.08, 1.5);
    keyboard.rotation.x = -0.18;
    computer.add(keyboard);

    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 12; col += 1) {
        const key = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.04, 0.12), darkMaterial);
        key.position.set(-1.28 + col * 0.23, -0.93, 1.16 + row * 0.18);
        key.rotation.x = -0.18;
        computer.add(key);
      }
    }

    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.32, 3.6), tableMaterial);
    tableTop.position.set(0, -1.22, 0.6);
    scene.add(tableTop);

    [
      [-3.05, -2.35, -0.85],
      [3.05, -2.35, -0.85],
      [-3.05, -2.35, 1.95],
      [3.05, -2.35, 1.95],
    ].forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.34, 2.25, 0.34), tableDarkMaterial);
      leg.position.set(x, y, z);
      scene.add(leg);
    });

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(28, 28), wallMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3.48;
    scene.add(floor);

    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(28, 14), wallMaterial);
    backWall.position.set(0, 3.2, -5.4);
    scene.add(backWall);

    computer.position.set(0, 7.2, 0.54);
    computer.rotation.set(-0.42, 0.34, -0.16);

    let frame = null;
    let disposed = false;
    const introStart = performance.now();

    function easeOutBack(x) {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }

    function render(now) {
      if (disposed) {
        return;
      }

      const elapsed = (now - introStart) / 1000;
      const drop = Math.min(elapsed / (reducedMotion ? 0.01 : 2.3), 1);
      const easedDrop = easeOutBack(drop);

      if (!entering) {
        computer.position.y = 7.2 + (-0.16 - 7.2) * easedDrop;
        computer.rotation.x = -0.42 + 0.42 * easedDrop + Math.sin(now * 0.0012) * 0.012;
        computer.rotation.y = 0.34 - 0.34 * easedDrop + Math.sin(now * 0.0009) * 0.018;
        computer.rotation.z = -0.16 + 0.16 * easedDrop;
      }

      if (drop >= 1) {
        markComputerReady();
      }

      if (computerReady && !entering) {
        screenMaterial.emissiveIntensity = 1.05 + Math.sin(now * 0.012) * 0.18;
        screenLight.intensity = 2.4 + Math.sin(now * 0.008) * 0.45;
      }

      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    }

    frame = requestAnimationFrame(render);

    function dispose() {
      disposed = true;

      if (frame) {
        cancelAnimationFrame(frame);
      }

      scene.traverse((object) => {
        object.geometry?.dispose();
        const materials = object.material ? (Array.isArray(object.material) ? object.material : [object.material]) : [];
        materials.forEach((material) => material.dispose());
      });

      renderer.dispose();
    }

    function zoomIntoScreen(done) {
      const start = performance.now();
      const duration = reducedMotion ? 80 : 850;

      function zoom(now) {
        const progress = Math.min((now - start) / duration, 1);
        camera.position.z = 9.2 - progress * 7.6;
        camera.position.y = 2.25 - progress * 0.75;
        computer.scale.setScalar(1 + progress * 3.2);
        screenMaterial.emissiveIntensity = 1.4 + progress * 8;
        screenLight.intensity = 4 + progress * 20;
        renderer.render(scene, camera);

        if (progress < 1) {
          requestAnimationFrame(zoom);
          return;
        }

        done();
      }

      requestAnimationFrame(zoom);
    }

    function resize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      camera.lookAt(0, -0.72, 0.35);
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    return { dispose, resize, zoomIntoScreen };
  } catch (error) {
    canvas.hidden = true;
    console.warn("WebGL intro failed. Falling back to CSS intro.", error);
    return null;
  }
}

threeIntro = initThreeIntro();
setTimeout(markComputerReady, reducedMotion ? 80 : 2450);

function finishIntroTransition() {
  shell.dataset.scene = "warp";
  threeIntro?.dispose();
  setTimeout(startLoading, reducedMotion ? 80 : 1050);
}

function enterPixelWorld() {
  if (!computerReady || entering) {
    return;
  }

  entering = true;
  introScene.classList.add("is-entering");
  enterButton.classList.remove("is-ready");

  if (threeIntro) {
    threeIntro.zoomIntoScreen(finishIntroTransition);
    return;
  }

  setTimeout(finishIntroTransition, reducedMotion ? 80 : 850);
}

function startLoading() {
  shell.dataset.scene = "loading";
  let progress = 0;
  const messages = [
    "프로필 데이터를 불러오는 중...",
    "기술스택을 장착하는 중...",
    "프로젝트 퀘스트를 정렬하는 중...",
    "캐릭터 상태창 생성 중...",
  ];

  const timer = setInterval(() => {
    progress = Math.min(progress + 10 + Math.random() * 14, 100);
    loadingBar.style.width = `${progress}%`;
    loadingText.textContent = messages[Math.min(Math.floor(progress / 28), messages.length - 1)];

    if (progress >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        shell.dataset.scene = "portfolio";
      }, reducedMotion ? 80 : 500);
    }
  }, reducedMotion ? 30 : 220);
}

enterButton.addEventListener("click", enterPixelWorld);

window.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && shell.dataset.scene === "intro") {
    enterPixelWorld();
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === target);
    });
  });
});

window.addEventListener("resize", () => {
  threeIntro?.resize();
});
