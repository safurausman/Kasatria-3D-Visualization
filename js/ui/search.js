function initializeSearch(data, objects) {
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase().trim();

        objects.forEach((object, index) => {
            const person = data[index];

            if (!person) return;

            const matches =
                person.name.toLowerCase().includes(searchTerm) ||
                person.country.toLowerCase().includes(searchTerm);

            object.element.style.opacity = matches ? "1" : "0.08";
            object.element.style.filter = matches
                ? "none"
                : "grayscale(100%)";
        });
    });
}

export {
    initializeSearch
};