import { Tube } from "./Tube.js";
import { validateLoss, validateMove, validateSelect } from "./validator.js";

let selectedTube: Tube | null = null;

const tubes: ReadonlyArray<Tube> = [
    new Tube(["blue", "green", "yellow"]),
    new Tube(["red", "red", "blue"]),
    new Tube(["yellow", "red", "green"]),
    new Tube(["green", "red", "blue"]),
];

render();

onSelect(1);

onMove(3);

function onSelect(index: number) {
    try {
        const tubeToSelect = validateSelect(tubes, index);
        selectedTube = tubeToSelect;
    } catch (error) {
        // handle error
    }
}

function onMove(index: number) {
    try {
        const { source, destination } = validateMove(tubes, selectedTube, index);
        // commit move, which is a pop on source and push on destination
        const colorToAdd = source.pop(); // should not be a pop, all consecutive colors should be added
        destination.push(colorToAdd);
        selectedTube = null;
        if (validateLoss(tubes)) {
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

    for (let i = 0; i < tubes.length; i++) {
        const tube = tubes[i];
        const tubeEl = document.createElement("div");
        tubeEl.classList.add("tube");
        tubeEl.setAttribute("id", "tube-" + i);
        gameContainer.appendChild(tubeEl);
        const colors = tube.getAll();
        console.log(colors);
        for (let j = 0; j < colors.length; j++) {
            const color = colors[j];
            const colorEl = document.createElement("div");
            colorEl.classList.add("color");
            colorEl.dataset.color = color;
            tubeEl.appendChild(colorEl);
        }
    }

    document.body.appendChild(gameContainer);
}