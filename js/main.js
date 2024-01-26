import * as THREE from './three.module.js';

let scene = new THREE.Scene();
const texture = new THREE.TextureLoader().load("textures/planetgalaxybackround.jpg");
scene.background = texture;

let camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.01,
    4000
);
scene.add(camera);

camera.position.z = 800;

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let ambient = new THREE.AmbientLight(0x222222);
scene.add(ambient)
let light = new THREE.PointLight(0xffffff);
light.castShadow = true;
light.shadow.camera.near = 0.5;
light.shadow.camera.near = 1;

scene.add(light);


let textureLoader = new THREE.TextureLoader()

// MERKURY

let solarSystem = new THREE.Group();

let mercury = new CelestialBody(
    15,
    50,
    50,
    new THREE.TextureLoader().load("textures/mercury.png")
).create()

let mercuryOrbit = new Orbit(
    [0, 0],
    150,
    200,
    0, 2 * Math.PI
);
const mercuryOrbitCreated = mercuryOrbit.create();


solarSystem.add(mercury);
solarSystem.add(mercuryOrbitCreated);

// WENUS

let venus = new CelestialBody(
    20,
    50,
    50,
    new THREE.TextureLoader().load("textures/venus.jpg")
).create()

let venusOrbit = new Orbit(
    [0, 0],
    250,
    300,
    0, 2 * Math.PI
);
const venusOrbitCreated = venusOrbit.create();


solarSystem.add(venus);
solarSystem.add(venusOrbitCreated);


// SŁOŃCE

import { CelestialBody } from './CelestialBody.js';
let sun = new CelestialBody(
    100,
    400,
    200,
    new THREE.TextureLoader().load("textures/sun/sunmap.jpg")
).create()


solarSystem.add(sun);


// ZIEMIA

let earthsys = new THREE.Group();

const EARTH_RADIUS = 25;
const SEGMENTS = 50;
const TILT = 0.41

import { Planet } from './Planet.js';
import { Moon } from './Moon.js';

let earth = new Planet(
    EARTH_RADIUS,
    SEGMENTS,
    SEGMENTS,
    textureLoader.load("textures/earth/earthmap1k.jpg"),
    textureLoader.load("textures/earth/bumpmap.png"),
    0.5,
    textureLoader.load("textures/earth/specmap.png"),
    0.5,
    TILT
).create();

earthsys.add(earth);


let moon = new Moon(
    5,
    40,
    20,
    textureLoader.load("../textures/moon/moonmap1k.jpg"),
    textureLoader.load("../textures/moon/moonbump1k.jpg"),
    0.5
).create();
moon.position.set(40, 0, 0);

earthsys.add(moon);

solarSystem.add(earthsys);

import { Orbit } from './Orbit.js'

let orbitObject = new Orbit(
    [0, 0],
    350,
    400,
    0, 2 * Math.PI
);
const orbit = orbitObject.create();
solarSystem.add(orbit);

// MARS

let mars = new CelestialBody(
    25,
    50,
    50,
    new THREE.TextureLoader().load("textures/mars.jpg")
).create()

let marsOrbit = new Orbit(
    [0, 0],
    450,
    500,
    0, 2 * Math.PI
);
const marsOrbitCreated = marsOrbit.create();

solarSystem.add(mars);
solarSystem.add(marsOrbitCreated);

// JOWISZ


let jupiter = new CelestialBody(
    65,
    50,
    50,
    new THREE.TextureLoader().load("textures/jupyter.jpg")
).create()

let jupiterOrbit = new Orbit(
    [0, 0],
    650,
    750,
    0, 2 * Math.PI
);
const jupiterOrbitCreated = jupiterOrbit.create();

solarSystem.add(jupiter);
solarSystem.add(jupiterOrbitCreated);


// SATURN

let saturn = new CelestialBody(
    45,
    50,
    50,
    new THREE.TextureLoader().load("textures/saturn.jpg")
).create()

let saturnOrbit = new Orbit(
    [0, 0],
    1000,
    1050,
    0, 2 * Math.PI
);
const saturnOrbitCreated = saturnOrbit.create();

solarSystem.add(saturn);
solarSystem.add(saturnOrbitCreated);


// URAN
let uranus = new CelestialBody(
    40,
    50,
    50,
    new THREE.TextureLoader().load("textures/uranus.jpg")
).create()

let uranusOrbit = new Orbit(
    [0, 0],
    1250,
    1300,
    0, 2 * Math.PI
);
const uranusOrbitCreated = uranusOrbit.create();

solarSystem.add(uranus);
solarSystem.add(uranusOrbitCreated);


// NEPTUN
let neptune = new CelestialBody(
    30,
    50,
    50,
    new THREE.TextureLoader().load("textures/neptune.jpg")
).create()

let neptuneOrbit = new Orbit(
    [0, 0],
    1500,
    1550,
    0, 2 * Math.PI
);
const neptuneOrbitCreated = neptuneOrbit.create();

solarSystem.add(neptune);
solarSystem.add(neptuneOrbitCreated);

scene.add(solarSystem);


let loopTime = 1;
const earthSpeed = 0.00001;
const moonOrbitRadius = 55;
const moonSpeed = 80;


function render() {

    const time = earthSpeed * performance.now();

    let p = orbitObject.getOrbitPoint((time % loopTime) / loopTime);
    earthsys.position.x = p.x;
    earthsys.position.z = p.y;

    moon.position.x = -Math.cos(time * moonSpeed) * moonOrbitRadius;
    moon.position.z = -Math.sin(time * moonSpeed) * moonOrbitRadius;

    sun.rotation.y += 0.0008;
    earth.rotation.y += 0.0015;
    jupiter.rotation.y += 0.0015;
    mars.rotation.y += 0.0025;
    mercury.rotation.y += 0.0055;
    venus.rotation.y += 0.0045;
    saturn.rotation.y += 0.0005;
    uranus.rotation.y += 0.0005;


    moon.rotation.y += 0.0001;


    let mercuryPoint = mercuryOrbit.getOrbitPoint((time % ((0.2) * loopTime)) / ((0.2) * loopTime));
    mercury.position.x = mercuryPoint.x;
    mercury.position.z = mercuryPoint.y;

    let venusPoint = venusOrbit.getOrbitPoint((time % ((0.6) * loopTime)) / ((0.6) * loopTime));
    venus.position.x = venusPoint.x;
    venus.position.z = venusPoint.y;

    let marsPoint = marsOrbit.getOrbitPoint((time % (2 * loopTime)) / (2 * loopTime));
    mars.position.x = marsPoint.x;
    mars.position.z = marsPoint.y;

    let jupiterPoint = jupiterOrbit.getOrbitPoint((time % (12 * loopTime)) / (12 * loopTime));
    jupiter.position.x = jupiterPoint.x;
    jupiter.position.z = jupiterPoint.y;

    let saturnPoint = saturnOrbit.getOrbitPoint((time % (29 * loopTime)) / (29 * loopTime));
    saturn.position.x = saturnPoint.x;
    saturn.position.z = saturnPoint.y;

    let uranusPoint = uranusOrbit.getOrbitPoint((time % (84 * loopTime)) / (84 * loopTime));
    uranus.position.x = uranusPoint.x;
    uranus.position.z = uranusPoint.y;

    let neptunePoint = neptuneOrbit.getOrbitPoint((time % (165 * loopTime)) / (165 * loopTime));
    neptune.position.x = neptunePoint.x;
    neptune.position.z = neptunePoint.y;

    zoom();

    rotateOnYAxis();

    renderer.render(scene, camera);

}

function zoom() {
    window.addEventListener('mousewheel', (event) => {
        camera.position.z += event.deltaY / 500;
    });

    window.addEventListener('keydown', (event) => {
        if (event.code == 'KeyZ') {
            camera.position.z -= 0.1;
        }

        if (event.code == 'KeyX') {
            camera.position.z += 0.1;
        }

        if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
            camera.position.x -= 0.1;
        }

        if (event.code == 'ArrowRight' || event.code == 'KeyD') {
            camera.position.x += 0.1;
        }

        if (event.code == 'ArrowDown' || event.code == 'KeyS') {
            camera.position.y -= 0.1;
        }

        if (event.code == 'ArrowUp' || event.code == 'KeyW') {
            camera.position.y += 0.1;
        }

        if (event.code == 'KeyX') {
            camera.position.z += 0.1;
        }
        event.preventDefault();
        event.stopPropagation();
    });
}

function rotateOnYAxis() {
    let mY = 0;
    window.addEventListener("mousemove", (event) => {
        if (event.buttons == 1) {
            event.preventDefault();
            if (event.pageY < mY) {
                solarSystem.rotation.x -= 0.0001;
            } else {
                solarSystem.rotation.x += 0.0001;
            }
        }

        mY = event.pageY;
    });
}


let speedIncreaseButton = document.getElementById('speed_increase');
let speedDecreaseButton = document.getElementById('speed_decrease');

speedIncreaseButton.addEventListener('click', (event) => {
    loopTime /= 1.5;
    event.preventDefault();
    event.stopPropagation();
    console.log(loopTime);
});

speedDecreaseButton.addEventListener('click', (event) => {
    loopTime *= 1.5;
    event.preventDefault();
    event.stopPropagation();
    console.log(loopTime);

});

renderer.setAnimationLoop(render);
