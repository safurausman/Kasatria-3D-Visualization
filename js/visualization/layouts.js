import * as THREE from "three";

function createTargets(objects) {

    const tableTargets = [];
    const sphereTargets = [];
    const helixTargets = [];
    const gridTargets = [];

    // ---------------------------------------
    // Table
    // 20 x 10
    // ---------------------------------------

    for (let i = 0; i < objects.length; i++) {

        const column = i % 20;
        const row = Math.floor(i / 20);

        const object = new THREE.Object3D();

        object.position.x = (column - 9.5) * 150;
        object.position.y = -(row - 4.5) * 190;
        object.position.z = 0;

        tableTargets.push(object);
    }

    // ---------------------------------------
    // Sphere
    // ---------------------------------------

    const radius = 900;

    for (let i = 0; i < objects.length; i++) {

        const phi = Math.acos(
            -1 + (2 * i) / objects.length
        );

        const theta =
            Math.sqrt(objects.length * Math.PI) * phi;

        const object = new THREE.Object3D();

        object.position.set(
            radius * Math.cos(theta) * Math.sin(phi),
            radius * Math.sin(theta) * Math.sin(phi),
            radius * Math.cos(phi)
        );

        sphereTargets.push(object);
    }

    // ---------------------------------------
    // Double Helix
    // ---------------------------------------

    const helixRadius = 700;
    const helixHeight = 3000;
    const pointsPerStrand = objects.length / 2;

    for (let i = 0; i < objects.length; i++) {

        const strand = i % 2;
        const index = Math.floor(i / 2);

        const theta =
            (index / pointsPerStrand) * Math.PI * 6;

        const y =
            (index / (pointsPerStrand - 1) - 0.5)
            * helixHeight;

        const object = new THREE.Object3D();

        const angle =
            theta + strand * Math.PI;

        object.position.x =
            Math.cos(angle) * helixRadius;

        object.position.z =
            Math.sin(angle) * helixRadius;

        object.position.y = y;

        helixTargets.push(object);
    }

    // ---------------------------------------
    // Grid
    // 5 x 4 x 10
    // ---------------------------------------

    for (let i = 0; i < objects.length; i++) {

        const x = i % 5;

        const y =
            Math.floor(i / 5) % 4;

        const z =
            Math.floor(i / 20);

        const object = new THREE.Object3D();

        object.position.x =
            (x - 2) * 180;

        object.position.y =
            (y - 1.5) * 200;

        object.position.z =
            (z - 4.5) * 220;

        gridTargets.push(object);
    }

    return {
        tableTargets,
        sphereTargets,
        helixTargets,
        gridTargets
    };
}

function transform(objects, targets, type) {

    objects.forEach(object => {
        object.element.style.visibility = "visible";
    });

    let selectedTargets;

    if (type === "table") {
        selectedTargets = targets.tableTargets;
    } else if (type === "sphere") {
        selectedTargets = targets.sphereTargets;
    } else if (type === "helix") {
        selectedTargets = targets.helixTargets;
    } else if (type === "grid") {
        selectedTargets = targets.gridTargets;
    }

    if (!selectedTargets) {
        return;
    }

    objects.forEach((object, index) => {

        const target = selectedTargets[index];

        object.position.copy(target.position);
        object.rotation.copy(target.rotation);
    });
}

export {
    createTargets,
    transform
};