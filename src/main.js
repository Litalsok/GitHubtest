import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 1. Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

// 2. Setup camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 20);

// 3. Setup renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Add lights
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// 5. Setup controls
const controls = new OrbitControls(camera, renderer.domElement);

// 6. Add a green test cube (to check if scene renders)
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// 7. Load FBX model with scaling and debug logs
const loader = new GLTFLoader();
loader.load(
  'models/mouse.glb',
  (glb) => {
    console.log('✅ GLTF model loaded:', glb);
    // fbx.scale.set(0.01, 0.01, 0.01);
    // fbx.position.set(0, 0, 0);
    scene.add(glb.scene);
    // console.log('Model children:', fbx.children);
  },
    function (xhr) {
        // Optional: Progress callback
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        // Error handling
        console.error('An error occurred while loading the FBX model:', error);
    }
);

// 8. Animation loop
function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
}
animate();

// 9. Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});