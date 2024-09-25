import { Tube } from "./Tube";

export function validateSelect(tubes: ReadonlyArray<Tube>, target: number): Tube {
    const tube = tubes.at(target);
    if (!tube) {
        throw new Error("Tube at index " + target + " is missing");
    }
    return tube;
}

export function validateMove(tubes: ReadonlyArray<Tube>, selectedTube: Tube | null, index: number): { source: Tube, destination: Tube } {
    // if nothing is selected, throw
    if (!selectedTube) {
        throw new Error("No tube is selected");
    }

    // if destination is missing, throw
    const destinationTube = tubes.at(index);
    if (!destinationTube) {
        throw new Error("Move failed, no tube exists at index " + index);
    }

    // peek from selected tube
    const sourceColor = selectedTube.peek(); // throws if stack is empty

    // if destination is full, throw
    if (destinationTube.isFull()) {
        throw new Error("Move failed, destination is full");
    }

    // if destination stack has wrong color, throw
    if (!destinationTube.isEmpty() && destinationTube.peek() !== sourceColor) {
        throw new Error("Move failed, color mismatch");
    }

    return {
        source: selectedTube,
        destination: destinationTube,
    }
}

export function validateLoss(tubes: ReadonlyArray<Tube>): boolean {
    // TODO: implement loss cases
    return false;
}