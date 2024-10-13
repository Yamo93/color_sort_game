import { Color, ColorStack, maxLength } from "./ColorStack.js";

export function generateStacks(): ReadonlyArray<ColorStack> {
    // define amount of stacks, fix it to 6 for the sake of simplicity
    const MAX_AMOUNT_OF_STACKS = 6;

    // for each stack, generate a random number which is the color count
    const stacks: ColorStack[] = [];
    for (let i = 0; i < MAX_AMOUNT_OF_STACKS; i++) {
        const possibleColors: Color[] = ["blue", "green", "red", "yellow"];
        const stackLength = Math.floor(Math.random() * maxLength);
        const generatedColors: Color[] = [];
        for (let j = 0; j < stackLength; j++) {
            // TODO: it should not be possible to add more colors of one than a stack can hold
            const color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
            generatedColors.push(color);
        }
        const stack = new ColorStack(generatedColors);
        stacks.push(stack);
    }

    // for each stack, populate random colors and fill that count
    return stacks;
}