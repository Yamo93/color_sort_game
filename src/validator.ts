import { ColorStack } from "./ColorStack";

export function validateSelect(stacks: ReadonlyArray<ColorStack>, target: number): ColorStack {
    const stack = stacks.at(target);
    if (!stack) {
        throw new Error("Stack at index " + target + " is missing");
    }
    return stack;
}

export function validateMove(stacks: ReadonlyArray<ColorStack>, selectedStack: ColorStack | null, index: number): { source: ColorStack, destination: ColorStack } {
    // if nothing is selected, throw
    if (!selectedStack) {
        throw new Error("No stack is selected");
    }

    // if destination is missing, throw
    const destinationStack = stacks.at(index);
    if (!destinationStack) {
        throw new Error("Move failed, no stack exists at index " + index);
    }

    // peek from selected stack
    const sourceColor = selectedStack.peek(); // throws if stack is empty

    // if destination is full, throw
    if (destinationStack.isFull()) {
        throw new Error("Move failed, destination is full");
    }

    // if destination stack has wrong color, throw
    if (!destinationStack.isEmpty() && destinationStack.peek() !== sourceColor) {
        throw new Error("Move failed, color mismatch");
    }

    return {
        source: selectedStack,
        destination: destinationStack,
    }
}

export function validateLoss(stacks: ReadonlyArray<ColorStack>): boolean {
    // TODO: implement loss cases
    return false;
}