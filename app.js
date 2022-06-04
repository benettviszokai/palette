// Global selectors and variables
const colorDivs = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelector('.color h2');
let initialColors;

// Functions

// Generating colors using chroma.js
function generateHex() {
    const hexColor = chroma.random();
    return hexColor;
};

function randomColors() {
    colorDivs.forEach((div, index) => {
        const hexText = div.children[0];
        const randomColor = generateHex();

        // Add color to background
        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;

        // Check contrast
        checkTextContrast(randomColor, hexText);
    });
};

// Checking contrast with chroma.js
function checkTextContrast(color, text) {
    const luminance = chroma(color).luminance();
    luminance > 0.5 ? text.style.color = "black" : text.style.color = "white";
}

randomColors();