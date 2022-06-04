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
    });
};

randomColors();