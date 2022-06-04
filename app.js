// ------------------------------- Global selectors and variables ------------------------------- 
const colorDivs = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelector('.color h2');
let initialColors;

// ------------------------------- Event listeners ------------------------------- 

sliders.forEach(slider => {
    slider.addEventListener('input', hslControls);
});

colorDivs.forEach((div, index) => {
    div.addEventListener('change', () => {
        updateTextUI(index);
    });
});

// ------------------------------- Functions ------------------------------- 

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

        // Initial colorize sliders
        const color = chroma(randomColor);
        const sliders = div.querySelectorAll('.sliders input');
        const hue = sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];

        colorizeSliders(color, hue, brightness, saturation);
    });
};

// Checking contrast with chroma.js
function checkTextContrast(color, text) {
    const luminance = chroma(color).luminance();
    luminance > 0.5 ? text.style.color = "black" : text.style.color = "white";
};

function colorizeSliders(color, hue, brightness, saturation) {
    // Scale saturation
    const noSaturation = color.set('hsl.s', 0);
    const fullSaturation = color.set('hsl.s', 1);
    const scaleSaturation = chroma.scale([noSaturation, color, fullSaturation]);

    // Scale Brightness
    const midBrightness = color.set('hsl.l', 0.5);
    const scaleBrightness = chroma.scale(['black', midBrightness, 'white']);

    // Scale Hue - not necessary

    // Update input colors
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSaturation(0)}, ${scaleSaturation(1)})`;
    brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBrightness(0)}, ${scaleBrightness(0.5)}, ${scaleBrightness(1)})`;
    hue.style.backgroundImage = `linear-gradient(to right, rgb(204, 75, 75), rgb(204, 204, 75), rgb(75, 204, 75), rgb(75, 204, 204), rgb(75, 75, 204), rgb(204, 75, 204), rgb(204, 75, 75))`;
};

function hslControls(e) {
    const index = 
        e.target.getAttribute('data-bright') || 
        e.target.getAttribute('data-sat') || 
        e.target.getAttribute('data-hue');
    
    let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    const bgColor = colorDivs[index].querySelector('h2').innerText;

    let color = chroma(bgColor)
        .set("hsl.s", saturation.value)
        .set("hsl.l", brightness.value)
        .set("hsl.h", hue.value)

    colorDivs[index].style.backgroundColor = color;
};

function updateTextUI(index) {
    const activeDiv = colorDivs[index];
    const color = chroma(activeDiv.style.backgroundColor);
    const textHex = activeDiv.querySelector('h2');
    const icons = activeDiv.querySelectorAll('.controls button');
    textHex.innerText = color.hex();

    // Check contrast 
    checkTextContrast(color, textHex);
    for (icon of icons) {
        checkTextContrast(color, icon);
    };
};

randomColors();