import {
    CSS3DObject
} from "three/addons/renderers/CSS3DRenderer.js";

import { scene } from "./scene.js";

const objects = [];

function createTiles(data, showPersonDetails) {

    data.forEach((person, index) => {

        const element = document.createElement("div");

        element.className = "tile";

        // Net Worth color
        if (person.netWorth < 100000) {

            element.style.background =
                "rgba(180, 40, 40, 0.9)";

        } else if (person.netWorth < 200000) {

            element.style.background =
                "rgba(220, 130, 30, 0.9)";

        } else {

            element.style.background =
                "rgba(40, 160, 70, 0.9)";
        }

        element.innerHTML = `
            <div class="number">
                #${person.id}
            </div>

            <div class="name">
                ${person.name}
            </div>

            <div class="net-worth">
                $${person.netWorth.toLocaleString()}
            </div>
        `;

        const object = new CSS3DObject(element);

        element.style.visibility = "hidden";

        scene.add(object);
        objects.push(object);

        element.addEventListener("click", () => {
            showPersonDetails(index);
        });

    });
}

export {
    objects,
    createTiles
};