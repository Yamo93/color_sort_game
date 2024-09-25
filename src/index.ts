import { Tube } from "./Tube.js";
import { validateLoss, validateMove, validateSelect } from "./validator.js";

let selectedTube: Tube | null = null;

const tubes: ReadonlyArray<Tube> = [
    new Tube(["blue", "green", "yellow"]),
    new Tube(["red", "red", "blue"]),
    new Tube(["yellow", "red", "green"]),
    new Tube(["green", "red", "blue"]),
];

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