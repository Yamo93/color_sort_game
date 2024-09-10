"use strict";
function generateRandomColor() {
    return {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256),
    };
}
function colorToCSS(color) {
    return `rgb(${color.red}, ${color.green}, ${color.blue})`;
}
function createColorBlock(color, containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        const block = document.createElement('div');
        block.className = 'color-block';
        block.style.backgroundColor = colorToCSS(color);
        container.appendChild(block);
    }
}
// Generate random colors and append them to the color palette
const colors = Array.from({ length: 5 }, generateRandomColor);
colors.forEach(color => createColorBlock(color, 'color-palette'));
