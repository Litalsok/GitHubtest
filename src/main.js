// 1. Bring in the tools we need from Three.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let isDragging = false;      //isDragging: flag if mouse button is held down
let previousMousePosition = { x: 0, y: 0 };     //stores the last mouse position to calculate movement difference

// 2. Make a new scene 
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // black // Set the background color to light gray

// 3. Make a camera so we can see the scene
const camera = new THREE.PerspectiveCamera(
  75,                              // How wide the view is (field of view)
  window.innerWidth / window.innerHeight, // Make sure it fits the screen size
  0.1,                             // How close things can be to the camera before disappearing
  1000                             // How far things can be before disappearing
);
camera.position.set(0, 0, 10); // Move the camera up and back so it sees everything
camera.lookAt(0, 0, 0);

// 4. Make a renderer — this draws everything on the screen
const renderer = new THREE.WebGLRenderer({ antialias: true }); // Smooth edges
renderer.setSize(window.innerWidth, window.innerHeight);       // Fill the whole screen
document.body.appendChild(renderer.domElement);                // Show the drawing on the page

// 5. Add lights so we can see the model clearly
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Bright light like the sun
directionalLight.position.set(2, 2, 5);                          // Put light in the scene
scene.add(directionalLight);

const spotLight = new THREE.SpotLight(0xffffff, 2);              // A spotlight, brighter light
spotLight.position.set(0, 5, 0);                                 // Right above the model
spotLight.target.position.set(0, 0, 0);                          // Pointing at the model
scene.add(spotLight);
scene.add(spotLight.target);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);      // Soft light all around
scene.add(ambientLight);

// Overhead point light: Above model
const overheadLight = new THREE.DirectionalLight(0xffffff, 3);  // White light, intensity 1
overheadLight.position.set(0, 10, 0);                     // Positioned high above the model
overheadLight.target.position.set(0, 0, 0);
scene.add(overheadLight);
scene.add(overheadLight.target);


// Bottom light: Under model
const bottomLight = new THREE.PointLight(0xffffff, 3, 80);    //Intensity of light 
bottomLight.position.set(0, -5, 0);
scene.add(bottomLight);

// 6. Let the user move the camera around with the mouse
//const controls = new OrbitControls(camera, renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;  // disable rotating camera

// 7. Load your 3D model file (mouse.glb)
const loader = new GLTFLoader();
loader.load(
  'models/mouse.glb',       // Path to your model file
  (glb) => {               // What to do when model loads successfully
   // console.log('Model loaded!', glb);
  glb.scene.scale.set(0.7, 0.7, 0.7);     // Make the model smaller
   glb.scene.position.set(0, -5, -12);       // Move model Down (y) Move model back (z)
   let model = glb.scene;               // Make the model accessible outside this function
     scene.add(glb.scene);                    // Add the model to the scene

    //camera.position.set(0, 0, 5);            // Move the camera closer to the model
  //},
  //undefined,              // We don’t need to do anything while loading
  //(error) => {            // What to do if loading the model fails
  //  console.error('Error loading model:', error);
  //}
//);
//const model = glb.scene;
    //model.scale.set(0.5, 0.5, 0.5);
   // model.position.set(0, -1, 5);
    //scene.add(model);

     // Make the mouth glow orange and add a soft orange light near it
   const mouseGroup = glb.scene.getObjectByName("Mouse");
if (mouseGroup) {
  const headGroup = mouseGroup.getObjectByName("Head");          
  if (headGroup) {
    const mouthGroup = headGroup.getObjectByName("Mouth1"); // NO space here
if (mouthGroup) {
  mouthGroup.traverse((child) => {
    if (child.isMesh && child.name === "Mouth1_2") { // Check if it's a mesh and has the correct name
      let mouthMesh = child;  // take the first mesh found inside
      // If you want to find all meshes, push to an array instead
      console.log('Found mouth mesh:', mouthMesh); // Log the found mesh
      mouthMesh.material.emissive = new THREE.Color(0xff6600);
      mouthMesh.material.emissiveIntensity = 3;

      const mouthLight = new THREE.PointLight(0xff6600, 0.5, 5);
      mouthLight.position.copy(mouthMesh.position);
    }
  });
}


    // if (mouthMesh && mouthMesh.material) {
    //   console.log('Mouth mesh material:', mouthMesh.material); // Log the material to check if it exists
    //   mouthMesh.material.emissive = new THREE.Color(0xff6600);
    //   mouthMesh.material.emissiveIntensity = 3;

    //   const mouthLight = new THREE.PointLight(0xff6600, 0.5, 5);
    //   mouthLight.position.copy(mouthMesh.position);
    //   headGroup.add(mouthLight);
    // }
  }
}


    // Mouse down — user starts dragging 
    renderer.domElement.addEventListener('mousedown', function(e) {  //When user clicks on canvas, start dragging (isDragging = true)
      isDragging = true;
    }, false);

    // Mouse up — user stops dragging
    renderer.domElement.addEventListener('mouseup', function(e) {  //When user releases mouse button, stop dragging (isDragging = false)
      isDragging = false;
    }, false);

    // Mouse move — rotate the model if dragging
    renderer.domElement.addEventListener('mousemove', function(e) {  //While dragging, calculate how far the mouse moved (deltaMove)
//and use that movement to rotate the model:
//model.rotation.y changes based on horizontal mouse movement (deltaMove.x) — turns model left/right
//model.rotation.x changes based on vertical mouse movement (deltaMove.y) — tilts model up/down
//The 0.01 multiplier slows down rotation speed so it feels natural. You can tweak it if you want faster or slower rotation.
        //const geometry = new THREE.BoxGeometry();
        //const material = new THREE.MeshNormalMaterial();
       // const model = new THREE.Mesh(geometry, material);      
        if (isDragging) {
  let deltaMove = {
    x: e.movementX || e.mozMovementX || e.webkitMovementX || 0,
    y: e.movementY || e.mozMovementY || e.webkitMovementY || 0
  };

  model.rotation.y += deltaMove.x * 0.01;
  model.rotation.x += deltaMove.y * 0.01;
    }
    }, false);

  },
  undefined,
  (error) => {
    console.error('Error loading model:', error);
  }
);


// 8. Keep drawing the scene over and over so it looks alive
function animate() {
  requestAnimationFrame(animate);  // Call animate again on next frame
  controls.update();               // Update the camera controls
  renderer.render(scene, camera);  // Draw the scene from the camera view
}
animate();                        // Start the animation

// 9. If the browser window changes size, fix the view to fit it
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight; // Update camera view size
  camera.updateProjectionMatrix();                         // Apply the change
  renderer.setSize(window.innerWidth, window.innerHeight); // Resize the renderer
});