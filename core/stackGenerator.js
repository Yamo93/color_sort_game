import { ColorStack, maxStackLength } from "./ColorStack.js";
export function generateStacks() {
    // define amount of stacks, fix it to 6 for the sake of simplicity
    const MAX_AMOUNT_OF_STACKS = 6;
    // for each stack, generate a random number which is the color count
    const stacks = [];
    const colorFrequency = {
        red: [],
        blue: [],
        green: [],
        yellow: []
    };
    for (let i = 0; i < MAX_AMOUNT_OF_STACKS; i++) {
        const stackLength = Math.floor(Math.random() * maxStackLength);
        const generatedColors = [];
        const colors = Object.keys(colorFrequency);
        for (let j = 0; j < stackLength; j++) {
            // it should not be possible to add more colors of one than a stack can hold
            const color = colors[Math.floor(Math.random() * Object.keys(colorFrequency).length)];
            colorFrequency[color].push(color);
            if (colorFrequency[color].length <= maxStackLength) {
                generatedColors.push(color);
            }
        }
        const stack = new ColorStack(generatedColors);
        stacks.push(stack);
    }
    // for each stack, populate random colors and fill that count
    return stacks;
}
//# sourceMappingURL=stackGenerator.js.map