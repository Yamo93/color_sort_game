import { ColorStack } from "./ColorStack.js";
import { validateLoss, validateMove, validateSelect } from "./validator.js";

let selectedStack: number = -1;
const maxLength = 8;

const stacks: ReadonlyArray<ColorStack> = [
    new ColorStack(["blue", "green", "green", "red"]),
    new ColorStack(["red", "red", "blue", "yellow", "blue"]),
    new ColorStack(["yellow", "red"]),
    new ColorStack(["blue", "blue", "green"]),
    new ColorStack(["green"]),
    new ColorStack([]),
];

render();

function onSelect(index: number) {
    try {
        validateSelect(stacks, index);
        selectedStack = index;
    } catch (error) {
        console.error(error);
        selectedStack = -1;
    }
}

function onMove(index: number) {
    try {
        const { source, destination } = validateMove(stacks, selectedStack, index);
        // commit move, which is a pop on source and push on destination
        const colorToAdd = source.pop(); // should not be a pop, all consecutive colors should be added
        destination.push(colorToAdd);
        selectedStack = -1;
        if (validateLoss(stacks)) {
            gameOver();
        }
    } catch (error) {
        console.error(error);
        selectedStack = -1;
    }
}

function gameOver() {
    // TODO: Implement game over
}

function render() {
    document.body.innerHTML = "";

    const gameContainer = document.createElement("div");
    gameContainer.setAttribute("id", "game-container");

    for (let i = 0; i < stacks.length; i++) {
        const stack = stacks[i];
        const stackEl = document.createElement("div");
        stackEl.classList.add("stack");
        if (selectedStack === i) {
            stackEl.classList.add("selected");
        }
        stackEl.setAttribute("id", "stack-" + i);
        stackEl.addEventListener("click", () => {
            if (selectedStack < 0) {
                onSelect(i);
            } else {
                onMove(i);
            }
            render();
        });
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
