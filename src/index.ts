import { ColorStack } from "./ColorStack.js";
import { validateLoss, validateMove, validateSelect, validateWin } from "./validator.js";

let selectedStack: number = -1;
let errorMessage = "";
let errorIndex = -1;
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
    clearError();
    try {
        validateSelect(stacks, index);
        selectedStack = index;
    } catch (error) {
        handleError(error, index);
    }
}

function onMove(index: number) {
    try {
        const { source, destination } = validateMove(stacks, selectedStack, index);
        // commit move, which is a pop on source and push on destination
        const colorsToAdd = source.popAll(); // should not be a pop, all consecutive colors should be added
        destination.pushAll(colorsToAdd);
        selectedStack = -1;
        if (validateLoss(stacks)) {
            gameOver();
        }
        if (validateWin(stacks)) {
            win();
        }
    } catch (error) {
        handleError(error, index);
    }
}

function gameOver() {
    // TODO: Implement game over
}

function win() {
    // TODO: Implement win
}

function render() {
    document.body.innerHTML = "";

    const gameContainer = document.createElement("div");
    gameContainer.setAttribute("id", "game-container");
    document.body.appendChild(gameContainer);

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

        for (let j = 0; j < maxLength; j++) {
            const color = colors[j];
            const colorEl = document.createElement("div");
            colorEl.classList.add("color");
            colorEl.dataset.color = color;
            stackEl.appendChild(colorEl);
        }

    }
    
    if (errorMessage) {
        const errorMessageEl = document.createElement("p");
        errorMessageEl.setAttribute("id", "error-message");
        errorMessageEl.textContent = errorMessage;
        document.body.appendChild(errorMessageEl);
        if (errorIndex >= 0) {
            const destinationStackEl = document.getElementById("stack-" + errorIndex);
            if (destinationStackEl) {
                destinationStackEl.classList.add("error-stack");
            }
        }
    }

}

function handleError(error: unknown, destinationIndex: number): void {
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    selectedStack = -1;
    errorIndex = destinationIndex;
}

function clearError(): void {
    errorMessage = "";
    errorIndex = -1;
    document.querySelector(".error-stack")?.classList.remove("error-stack");
}