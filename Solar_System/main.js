import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Import textures (make sure to add your asteroid texture)
import starsTexture from './src/img/stars.jpg';
import sunTexture from './src/img/sun.jpg';
import mercuryTexture from './src/img/mercury.jpg';
import venusTexture from './src/img/venus.jpg';
import earthTexture from './src/img/earth.jpg';
import marsTexture from './src/img/mars.jpg';
import jupiterTexture from './src/img/jupiter.jpg';
import saturnTexture from './src/img/saturn.jpg';
import saturnRingTexture from './src/img/saturn ring.png';
import uranusTexture from './src/img/uranus.jpg';
import uranusRingTexture from './src/img/uranus ring.png';
import neptuneTexture from './src/img/neptune.jpg';
import plutoTexture from './src/img/pluto.jpg';
import asteroidTexture from './src/img/asteroid.jpg'; // Add your asteroid texture

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture
]);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const textureload = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(12, 25, 20);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureload.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

const pointLight = new THREE.PointLight(0xffffff, 3, 300);
scene.add(pointLight);




function createPlanet(size, texture, position, ring) {
    const geometry = new THREE.SphereGeometry(size, 25, 20);
    const material = new THREE.MeshStandardMaterial({
        map: textureload.load(texture)
    });
    const planet = new THREE.Mesh(geometry, material);
    const planetObj = new THREE.Object3D();
    planetObj.add(planet);
    scene.add(planetObj);
    planet.position.x = position;

    if (ring) {
        const RingGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 30);
        const RingMat = new THREE.MeshStandardMaterial({
            map: textureload.load(ring.texture),
            side: THREE.DoubleSide
        });
        const Ring = new THREE.Mesh(RingGeo, RingMat);
        planetObj.add(Ring);

        Ring.position.x = position;
        Ring.rotation.x = -0.5 * Math.PI;
    }
    return { planet, planetObj };
}

const mercury = createPlanet(4, mercuryTexture, 20);
const venus = createPlanet(5, venusTexture, 40);
const earth = createPlanet(5.56, earthTexture, 60);
const mars = createPlanet(5, marsTexture, 80);
const jupiter = createPlanet(6, jupiterTexture, 100);
const saturn = createPlanet(8, saturnTexture, 150, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanet(8.2, uranusTexture, 200, {
    innerRadius: 10,
    outerRadius: 20,
    texture: uranusRingTexture
});
const neptune = createPlanet(5, neptuneTexture, 240);

// Define asteroid creation function
function createAsteroid(fullName, size, texture, position, H) {
    const geometry = new THREE.SphereGeometry(size, 15, 15); // Smaller geometry for asteroids
    const material = new THREE.MeshStandardMaterial({
        map: textureload.load(texture)
    });
    const asteroid = new THREE.Mesh(geometry, material);
    
    asteroid.position.x = position; // Set position based on distance from the sun
    asteroid.name = fullName; // Set the name for easier debugging if needed
    asteroid.scale.set(0.5, 0.5, 0.5); // Scale down the asteroid

    scene.add(asteroid);
    
    // Add any additional properties based on H (absolute magnitude)
    asteroid.h = H; // You can use this value for further calculations if needed

    return asteroid;
}

// Example asteroid data for additional asteroids
const asteroidDataList = [
    {
        full_name: "Asteroid 12345",
        size: 1.5, // Radius in your scale
        texture: asteroidTexture, // Path to an asteroid texture image
        position: 100, // Distance from the sun
        H: 20.1 // Absolute magnitude
    },
    {
        full_name: "Asteroid 67890",
        size: 1.2, // Radius in your scale
        texture: asteroidTexture,
        position: 110, // Distance from the sun
        H: 19.8 // Absolute magnitude
    },
    {
        full_name: "Asteroid 11223",
        size: 1.0, // Radius in your scale
        texture: asteroidTexture,
        position: 120, // Distance from the sun
        H: 21.5 // Absolute magnitude
    },
    {
        full_name: "Asteroid 44556",
        size: 1.8, // Radius in your scale
        texture: asteroidTexture,
        position: 130, // Distance from the sun
        H: 22.0 // Absolute magnitude
    }
];

// Creating the asteroids using the function
const exampleAsteroid1 = createAsteroid(
    asteroidDataList[0].full_name, 
    asteroidDataList[0].size, 
    asteroidDataList[0].texture, 
    asteroidDataList[0].position, 
    asteroidDataList[0].H
);

const exampleAsteroid2 = createAsteroid(
    asteroidDataList[1].full_name, 
    asteroidDataList[1].size, 
    asteroidDataList[1].texture, 
    asteroidDataList[1].position, 
    asteroidDataList[1].H
);

const exampleAsteroid3 = createAsteroid(
    asteroidDataList[2].full_name, 
    asteroidDataList[2].size, 
    asteroidDataList[2].texture, 
    asteroidDataList[2].position, 
    asteroidDataList[2].H
);

const exampleAsteroid4 = createAsteroid(
    asteroidDataList[3].full_name, 
    asteroidDataList[3].size, 
    asteroidDataList[3].texture, 
    asteroidDataList[3].position, 
    asteroidDataList[3].H
);

function animate() {
    sun.rotateY(0.002);
    mercury.planet.rotateY(0.001);
    mercury.planetObj.rotateY(0.001);
    venus.planet.rotateY(0.0012);
    venus.planetObj.rotateY(0.0015);
    earth.planet.rotateY(0.012);
    earth.planetObj.rotateY(0.0012);
    mars.planet.rotateY(0.013);
    mars.planetObj.rotateY(0.0019);
    jupiter.planet.rotateY(0.04);
    jupiter.planetObj.rotateY(0.0023);
    saturn.planet.rotateY(0.01);
    saturn.planetObj.rotateY(0.0021);
    uranus.planet.rotateY(0.01);
    uranus.planetObj.rotateY(0.0015);
    neptune.planet.rotateY(0.01);
    neptune.planetObj.rotateY(0.001);
    
    // Add rotation for asteroids if needed
    exampleAsteroid1.rotateY(0.005);
    exampleAsteroid2.rotateY(0.005);
    exampleAsteroid3.rotateY(0.005);
    exampleAsteroid4.rotateY(0.005);

    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Setting window size
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});






/*
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Keplerian elements for the planets (same as before)
const planetaryData = {
    mercury: { a: 0.38709843, e: 0.20563661, I: 7.00559432, L: 252.25166724, longPeri: 77.45771895, longNode: 48.33961819, rates: { a: 0, e: 0.00002123, I: -0.00590158, L: 149472.67486623, longPeri: 0.15940013, longNode: -0.12214182 }},
    venus: { a: 0.72332102, e: 0.00676399, I: 3.39777545, L: 181.97970850, longPeri: 131.76755713, longNode: 76.67261496, rates: { a: -0.00000026, e: -0.00005107, I: 0.00043494, L: 58517.81560260, longPeri: 0.05679648, longNode: -0.27274174 }},
    earth: { a: 1.00000018, e: 0.01673163, I: -0.00054346, L: 100.46691572, longPeri: 102.93005885, longNode: 0.0, rates: { a: -0.00000003, e: -0.00003661, I: -0.01337178, L: 35999.37306329, longPeri: 0.31795260, longNode: 0 }},
    mars: { a: 1.52371243, e: 0.09336511, I: 1.85181869, L: -4.56813164, longPeri: -23.91744784, longNode: 49.71320984, rates: { a: 0.00000097, e: 0.00009149, I: -0.00724757, L: 19140.29934243, longPeri: 0.45223625, longNode: -0.26852431 }},
    jupiter: { a: 5.20248019, e: 0.04853590, I: 1.29861416, L: 34.33479152, longPeri: 14.27495244, longNode: 100.29282654, rates: { a: -0.00002864, e: 0.00018026, I: -0.00322699, L: 3034.90371757, longPeri: 0.18199196, longNode: 0.13024619 }, additional: { b: -0.00012452, c: 0.06064060, s: -0.35635438, f: 38.35125000 }},
    saturn: { a: 9.54149883, e: 0.05550825, I: 2.49424102, L: 50.07571329, longPeri: 92.86136063, longNode: 113.63998702, rates: { a: -0.00003065, e: -0.00032044, I: 0.00451969, L: 1222.11494724, longPeri: 0.54179478, longNode: -0.25015002 }, additional: { b: 0.00025899, c: -0.13434469, s: 0.87320147, f: 38.35125000 }},
    uranus: { a: 19.18797948, e: 0.04685740, I: 0.77298127, L: 314.20276625, longPeri: 172.43404441, longNode: 73.96250215, rates: { a: -0.00020455, e: -0.00001550, I: -0.00180155, L: 428.49512595, longPeri: 0.09266985, longNode: 0.05739699 }, additional: { b: 0.00058331, c: -0.97731848, s: 0.17689245, f: 7.67025000 }},
    neptune: { a: 30.06952752, e: 0.00895439, I: 1.77005520, L: 304.22289287, longPeri: 46.68158724, longNode: 131.78635853, rates: { a: 0.00006447, e: 0.00000818, I: 0.00022400, L: 218.46515314, longPeri: 0.01009938, longNode: -0.00606302 }, additional: { b: -0.00041348, c: 0.68346318, s: -0.10162547, f: 7.67025000 }}
};

// Constants
const J2000 = 2451545.0;  // Julian date for J2000.0

// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit controls for camera movement
const controls = new OrbitControls(camera, renderer.domElement);

// Create the sun
const sunGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Planet sizes and textures
const planetSizes = {
    mercury: 0.2,
    venus: 0.3,
    earth: 0.35,
    mars: 0.25,
    jupiter: 0.7,
    saturn: 0.6,
    uranus: 0.5,
    neptune: 0.5
};

const planetTextures = {
    mercury: './src/img/mercury.jpg',
    venus: './src/img/venus.jpg',
    earth: './src/img/earth.jpg',
    mars: './src/img/mars.jpg',
    jupiter: './src/img/jupiter.jpg',
    saturn: './src/img/saturn.jpg',  // Point to your saturn.jpg file on the desktop
    uranus: './src/img/uranus.jpg',
    neptune: './src/img/neptune.jpg'
};

// Function to compute planet position based on Keplerian elements
function computePlanetPosition(planet, julianDate) {
    const T = (julianDate - J2000) / 36525;
    const a = planet.a + planet.rates.a * T;
    const e = planet.e + planet.rates.e * T;
    const I = THREE.MathUtils.degToRad(planet.I + planet.rates.I * T);
    const L = planet.L + planet.rates.L * T;
    const longPeri = planet.longPeri + planet.rates.longPeri * T;
    const longNode = planet.longNode + planet.rates.longNode * T;

    let M = (L - longPeri) % 360;
    if (planet.additional) {
        const { b, c, s, f } = planet.additional;
        M += b * T ** 2 + c * Math.cos(f * T) + s * Math.sin(f * T);
    }
    const M_rad = THREE.MathUtils.degToRad(M);
    let E = M_rad;
    let delta;
    do {
        delta = E - e * Math.sin(E) - M_rad;
        E -= delta / (1 - e * Math.cos(E));
    } while (Math.abs(delta) > 1e-6);

    const x_orb = a * (Math.cos(E) - e);
    const y_orb = a * Math.sqrt(1 - e ** 2) * Math.sin(E);

    const r = Math.sqrt(x_orb ** 2 + y_orb ** 2);
    const v = Math.atan2(y_orb, x_orb);

    const xeclip = r * (Math.cos(longNode) * Math.cos(v + longPeri - longNode) - Math.sin(longNode) * Math.sin(v + longPeri - longNode) * Math.cos(I));
    const yeclip = r * (Math.sin(longNode) * Math.cos(v + longPeri - longNode) + Math.cos(longNode) * Math.sin(v + longPeri - longNode) * Math.cos(I));
    const zeclip = r * Math.sin(v + longPeri - longNode) * Math.sin(I);

    return { x: xeclip, y: yeclip, z: zeclip };
}

// Create planets
const planets = {};
Object.keys(planetaryData).forEach(planetName => {
    const planetGeometry = new THREE.SphereGeometry(planetSizes[planetName], 32, 32);
    const planetTexture = new THREE.TextureLoader().load(planetTextures[planetName]);
    const planetMaterial = new THREE.MeshStandardMaterial({ map: planetTexture });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);
    planets[planetName] = planet;
});

// Set initial camera position
camera.position.z = 10;

// Animate the scene
let julianDate = J2000;
function animate() {
    requestAnimationFrame(animate);

    // Update planets' positions
    Object.keys(planets).forEach(planetName => {
        const planetPosition = computePlanetPosition(planetaryData[planetName], julianDate);
        planets[planetName].position.set(planetPosition.x, planetPosition.y, planetPosition.z);
    });

    // Simulate the passage of time
    julianDate += 1;

    controls.update();
    renderer.render(scene, camera);
}

animate();

// Adjust canvas on window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
*/