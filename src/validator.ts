import { Color, ColorStack } from "./ColorStack";

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
    for (let i = 0; i < stacks.length; i++) {
        for (let j = 0; j < stacks.length; j++) {
            if (i === j) {
                continue;
            }

            try {
                if (validateMove(stacks, i, j)) {
                    return false;
                }
            } catch (error) {
                continue;
            }
        }
    }

    return true;
}

export function validateWin(stacks: ReadonlyArray<ColorStack>): boolean {
    const colorFrequency: Record<Color, number> = {
        red: 0,
        blue: 0,
        green: 0,
        yellow: 0
    };

    for (const stack of stacks) {
        if (stack.isEmpty()) {
            continue;
        }

        colorFrequency[stack.peek()] += 1;

        if (!stack.isSorted()) {
            return false;
        }
    }

    // each stack must have a unique color
    for (const stack of stacks) {
        if (stack.isEmpty()) {
            continue;
        }

        if (colorFrequency[stack.peek()] > 1) {
            return false;
        }
    }

    return true;
}