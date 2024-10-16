import { Color, ColorStack, maxStackLength } from "./ColorStack";

export function generateStacks(): ReadonlyArray<ColorStack> {
    // define amount of stacks, fix it to 6 for the sake of simplicity
    const MAX_AMOUNT_OF_STACKS = 6;

    // for each stack, generate a random number which is the color count
    const stacks: ColorStack[] = [];
    const colorFrequency: Record<Color, Color[]> = {
        red: [],
        blue: [],
        green: [],
        yellow: []
    };
    for (let i = 0; i < MAX_AMOUNT_OF_STACKS; i++) {
        const stackLength = Math.floor(Math.random() * maxStackLength);
        const generatedColors: Color[] = [];
        const colors = Object.keys(colorFrequency) as Array<keyof typeof colorFrequency>;
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