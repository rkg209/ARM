// your-script.js
const sceneContainer = document.getElementById('scene-container');

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
sceneContainer.appendChild(renderer.domElement);

// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Add the 3D model of the food item to the scene
const loader = new THREE.GLTFLoader();
loader.load(
  '3dmodel/scene.gltf',
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Optionally, you can add some interactivity with OrbitControls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = false;
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  (error) => {
    console.error('An error happened', error);
  }
);

// Add an arrow indicator to guide the user to place the food item
const arrowMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const arrowGeometry = new THREE.ConeGeometry(0.2, 0.6, 32);
const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
arrow.position.set(0, 0, -1.5); // Adjust position as needed
scene.add(arrow);

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
