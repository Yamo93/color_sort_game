import { ColorStack } from "./ColorStack.js";
import { validateLoss, validateMove, validateSelect } from "./validator.js";

let selectedStack: ColorStack | null = null;
const maxLength = 8;

const stacks: ReadonlyArray<ColorStack> = [
    new ColorStack(["blue", "green", "yellow"]),
    new ColorStack(["red", "red", "blue"]),
    new ColorStack(["yellow", "red", "green"]),
    new ColorStack(["green", "red", "blue"]),
];

render();

onSelect(1);

onMove(3);

function onSelect(index: number) {
    try {
        const stackToSelect = validateSelect(stacks, index);
        selectedStack = stackToSelect;
    } catch (error) {
        // handle error
    }
}

function onMove(index: number) {
    try {
        const { source, destination } = validateMove(stacks, selectedStack, index);
        // commit move, which is a pop on source and push on destination
        const colorToAdd = source.pop(); // should not be a pop, all consecutive colors should be added
        destination.push(colorToAdd);
        selectedStack = null;
        if (validateLoss(stacks)) {
            gameOver();
        }
    } catch (error) {
        // handle error
    }
}

function gameOver() {
    // TODO: Implement game over
}

function render() {
    // clear screen
    document.body.innerHTML = "";

    // create game container
    const gameContainer = document.createElement("div");
    gameContainer.setAttribute("id", "game-container");

    for (let i = 0; i < stacks.length; i++) {
        const stack = stacks[i];
        const stackEl = document.createElement("div");
        stackEl.classList.add("stack");
        stackEl.setAttribute("id", "stack-" + i);
        gameContainer.appendChild(stackEl);
        const colors = stack.getAll();
        console.log(colors);
        for (let j = 0; j < maxLength; j++) {
            const color = colors[j];
            const colorEl = document.createElement("div");
            colorEl.classList.add("color");
            colorEl.dataset.color = color;
            stackEl.appendChild(colorEl);
        }
    }

    document.body.appendChild(gameContainer);
}