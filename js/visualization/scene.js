import * as THREE from "three";
import {
    CSS3DRenderer
} from "three/addons/renderers/CSS3DRenderer.js";
import {
    TrackballControls
} from "three/addons/controls/TrackballControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    10000
);

camera.position.z = 3000;

const renderer = new CSS3DRenderer();

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document
    .getElementById("container")
    .appendChild(renderer.domElement);

const controls = new TrackballControls(
    camera,
    renderer.domElement
);

controls.minDistance = 500;
controls.maxDistance = 6000;

function startAnimation() {

    function animate() {
        requestAnimationFrame(animate);

        controls.update();

        renderer.render(
            scene,
            camera
        );
    }

    animate();
}

function initializeResize() {

    window.addEventListener("resize", () => {

        camera.aspect =
            window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        controls.handleResize();
    });
}

export {
    scene,
    camera,
    renderer,
    controls,
    startAnimation,
    initializeResize
};