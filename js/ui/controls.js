function initializeLayoutControls(onLayoutChange) {

    document.getElementById("tableBtn").addEventListener("click", () => {
        onLayoutChange("table");
    });

    document.getElementById("sphereBtn").addEventListener("click", () => {
        onLayoutChange("sphere");
    });

    document.getElementById("helixBtn").addEventListener("click", () => {
        onLayoutChange("helix");
    });

    document.getElementById("gridBtn").addEventListener("click", () => {
        onLayoutChange("grid");
    });
}

export {
    initializeLayoutControls
};