import * as THREE from "three";

import {
    objects,
    createTiles
} from "./visualization/tiles.js";

import {
    createTargets,
    transform
} from "./visualization/layouts.js";

import {
    initializeLayoutControls
} from "./ui/controls.js";

import {
    initializeSearch
} from "./ui/search.js";

import {
    initializeGoogleAuth
} from "./auth/googleAuth.js";

import {
    CLIENT_ID,
    SHEETS_SCOPE
} from "./config.js";

import {
    loadGoogleSheetData
} from "./services/googleSheetsService.js";

import {
    scene,
    camera,
    renderer,
    controls,
    startAnimation,
    initializeResize
} from "./visualization/scene.js";

let data = [];
let accessToken = null;
let targets = null;

window.addEventListener("load", () => {

    initializeGoogleAuth(
        CLIENT_ID,
        SHEETS_SCOPE,
        async (token) => {

            accessToken = token;

            data = await loadGoogleSheetData(accessToken);

            createTiles(data, showPersonDetails);

            targets = createTargets(objects);

            initializeLayoutControls((layout) => {
                console.log("Layout clicked:", layout);
                transform(objects, targets, layout);
            });

            initializeSearch(data, objects);

            initializeResize();

            startAnimation();
        }
    );

});

function showPersonDetails(index) {
    const person = data[index];


    if (!person) return;

    document.getElementById("detailPhoto").src = person.photo || "";
    document.getElementById("detailName").textContent = person.name || "-";
    document.getElementById("detailAge").textContent = person.age || "-";
    document.getElementById("detailCountry").textContent = person.country || "-";
    document.getElementById("detailInterest").textContent = person.interest || "-";

    document.getElementById("detailNetWorth").textContent =
        "$" + Number(person.netWorth || 0).toLocaleString();

    document.getElementById("personDetails").style.display = "block";
    }    

        document.getElementById("closeDetails").addEventListener("click", () => {
        document.getElementById("personDetails").style.display = "none";
        });

