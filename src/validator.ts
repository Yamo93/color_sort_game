import { ColorStack } from "./ColorStack";

export function validateSelect(stacks: ReadonlyArray<ColorStack>, target: number): void {
    const stack = stacks.at(target);
    if (!stack) {
        throw new Error("Stack at index " + target + " is missing");
    }
}

export function validateMove(stacks: ReadonlyArray<ColorStack>, selectedStack: number, index: number): { source: ColorStack, destination: ColorStack } {
    // if nothing is selected, throw
    if (selectedStack < 0) {
        throw new Error("No stack is selected");
    }
    const stack = stacks.at(selectedStack);

    if (!stack) {
        throw new Error("No stack found at index " + selectedStack);
    }

    // if destination is missing, throw
    const destinationStack = stacks.at(index);
    if (!destinationStack) {
        throw new Error("Move failed, no stack exists at index " + index);
    }

    // peek from selected stack
    const sourceColor = stack.peek(); // throws if stack is empty

    // if destination is full, throw
    if (destinationStack.isFull()) {
        throw new Error("Move failed, destination is full");
    }

    // if destination stack has wrong color, throw
    if (!destinationStack.isEmpty() && destinationStack.peek() !== sourceColor) {
        throw new Error("Move failed, color mismatch");
    }

    return {
        source: stack,
        destination: destinationStack,
    }
}

export function validateLoss(stacks: ReadonlyArray<ColorStack>): boolean {
    // TODO: implement loss cases
    return false;
}