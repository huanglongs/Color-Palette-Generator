
const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);

// Handle clicks on copy buttons and color boxes
paletteContainer.addEventListener("click", async function(e) {
    const copyButton = e.target.closest(".copy-btn");
    const colorDiv = e.target.closest(".color");

    // Ignore clicks outside these elements
    if (!copyButton && !colorDiv) return;

    const colorBox = e.target.closest(".color-box");
    if (!colorBox) return;

    const hexValue = colorBox.querySelector(".hex-value").textContent;
    const buttonToAnimate = copyBut-ton || colorBox.querySelector(".copy-btn");

    try {
        await navigator.clipboard.writeText(hexValue);
        showCopySuccess(buttonToAnimate);
    } catch (err) {
        console.error("Failed to copy color:", err);
    }
});

// Show successful copy animation
function showCopySuccess(element) {
    element.classList.remove("far", "fa-copy");
    element.classList.add("fas", "fa-check");

    element.style.color = "#48bb78";

    setTimeout(() => {
        element.classList.remove("fas", "fa-check");
        element.classList.add("far", "fa-copy");

        element.style.color = "";
    }, 1000);
}

// Generate a random palette
function generatePalette() {
    const colors = [];

    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }

    updatePaletteDisplay(colors);
}

// Generate a random hexadecimal color
function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

// Update the palette displayed on the page
function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((box, index) => {
        const color = colors[index];

        if (!color) return;

        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    });
}

// Generate the initial palette when the page loads
generatePalette();
