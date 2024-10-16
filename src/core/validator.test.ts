import { ColorStack } from "./ColorStack";
import { validateLoss, validateMove, validateSelect, validateWin } from "./validator";

describe("validateSelect", () => {
    test("should throw an error if the stack at the target index is missing", () => {
        const stacks: ReadonlyArray<ColorStack> = [
            new ColorStack(["red"]),
            new ColorStack(["blue"])
        ];

        const targetIndex = 2; // Index out of bounds

        expect(() => validateSelect(stacks, targetIndex)).toThrow("Stack at index 2 is missing");
    });

    test("should not throw an error if the stack at the target index exists", () => {
        const stacks: ReadonlyArray<ColorStack> = [
            new ColorStack(["red"]),
            new ColorStack(["blue"])
        ];

        const targetIndex = 1; // Valid index

        expect(() => validateSelect(stacks, targetIndex)).not.toThrow();
    });
});

describe("validateMove", () => {
    test("should throw an error if no stack is selected", () => {
        const stacks: ReadonlyArray<ColorStack> = [
            new ColorStack(["red"]),
            new ColorStack(["blue"])
        ];

        expect(() => validateMove(stacks, -1, 1)).toThrow("No stack is selected");
    });

    test("should throw an error if the selected stack does not exist", () => {
        const stacks: ReadonlyArray<ColorStack> = [
            new ColorStack(["red"]),
            new ColorStack(["blue"])
        ];

        expect(() => validateMove(stacks, 2, 1)).toThrow("No stack found at index 2");
    });

    test("should throw an error if the destination stack does not exist", () => {
        const stacks: ReadonlyArray<ColorStack> = [
            new ColorStack(["red"]),
            new ColorStack(["blue"])
        ];

        expect(() => validateMove(stacks, 0, 2)).toThrow("Move failed, no stack exists at index 2");
    });

    test("should throw an error if the source stack is empty", () => {
        const emptyStack = new ColorStack([]);
        const destinationStack = new ColorStack(["blue"]);

        const stacks: ReadonlyArray<ColorStack> = [emptyStack, destinationStack];

        expect(() => validateMove(stacks, 0, 1)).toThrow("Peek failed, stack is empty");
    });

    test("should throw an error if the destination stack is full", () => {
        const fullStack = new ColorStack(Array(8).fill("red")); // Full stack
        const sourceStack = new ColorStack(["red"]);

        const stacks: ReadonlyArray<ColorStack> = [sourceStack, fullStack];

        expect(() => validateMove(stacks, 0, 1)).toThrow("Move failed, destination is full");
    });

    test("should throw an error if there is a color mismatch", () => {
        const sourceStack = new ColorStack(["red"]);
        const destinationStack = new ColorStack(["blue"]); // Different color

        const stacks: ReadonlyArray<ColorStack> = [sourceStack, destinationStack];

        expect(() => validateMove(stacks, 0, 1)).toThrow("Move failed, color mismatch");
    });

    test("should not throw an error if the move is valid", () => {
        const sourceStack = new ColorStack(["red"]);
        const destinationStack = new ColorStack([]);

        const stacks: ReadonlyArray<ColorStack> = [sourceStack, destinationStack];

        expect(() => validateMove(stacks, 0, 1)).not.toThrow();
    });
});

describe("validateLoss", () => {
    test("should return true when there is only one stack with colors", () => {
        const stacks: ReadonlyArray<ColorStack> = [
            new ColorStack(["red"]),
        ];

        expect(validateLoss(stacks)).toBe(true);
    });

    test("should return false when there are valid moves between stacks", () => {
        const stack1 = new ColorStack(["red"]);
        const stack2 = new ColorStack(["red"]);
        const stacks: ReadonlyArray<ColorStack> = [stack1, stack2];

        expect(validateLoss(stacks)).toBe(false);
    });

    test("should return true when no valid moves are available due to full stacks", () => {
        const fullStack1 = new ColorStack(Array(8).fill("red"));
        const fullStack2 = new ColorStack(Array(8).fill("red"));
        const stacks: ReadonlyArray<ColorStack> = [fullStack1, fullStack2];

        expect(validateLoss(stacks)).toBe(true);
    });

    test("should return true when moves are available but do not lead to a win", () => {
        const stack1 = new ColorStack(["red", "red"]);
        const stack2 = new ColorStack(["blue", "blue"]);
        const stacks: ReadonlyArray<ColorStack> = [stack1, stack2];

        expect(validateLoss(stacks)).toBe(true);
    });

    test("should return false when at least one valid move can lead to a win", () => {
        const stack1 = new ColorStack(["red"]);
        const stack2 = new ColorStack(["red"]);
        const emptyStack = new ColorStack([]);
        const stacks: ReadonlyArray<ColorStack> = [stack1, stack2, emptyStack];

        expect(validateLoss(stacks)).toBe(false);
    });
});

describe("validateWin", () => {
    test("should return true when each stack is sorted and has unique colors", () => {
        const stacks: ReadonlyArray<ColorStack> = [
            new ColorStack(["red"]),
            new ColorStack(["blue"]),
            new ColorStack(["green"]),
            new ColorStack(["yellow"]),
        ];

        expect(validateWin(stacks)).toBe(true);
    });

    test("should return false when any stack is not sorted", () => {
        const stacks: ReadonlyArray<ColorStack> = [
            new ColorStack(["red"]),
            new ColorStack(["blue", "red"]), // Not sorted
            new ColorStack(["green"]),
        ];

        expect(validateWin(stacks)).toBe(false);
    });

    test("should return false when stacks have duplicate colors", () => {
        const stacks: ReadonlyArray<ColorStack> = [
            new ColorStack(["red"]),
            new ColorStack(["red"]), // Duplicate color
            new ColorStack(["green"]),
        ];

        expect(validateWin(stacks)).toBe(false);
    });

    test("should return false when stacks contain different colors but not sorted", () => {
        const stacks: ReadonlyArray<ColorStack> = [
            new ColorStack(["red"]),
            new ColorStack(["blue"]),
            new ColorStack(["yellow", "red"]), // Not sorted
        ];

        expect(validateWin(stacks)).toBe(false);
    });

    test("should return true when stacks are sorted with unique colors, including multiple items", () => {
        const stacks: ReadonlyArray<ColorStack> = [
            new ColorStack(["red", "red"]),
            new ColorStack(["blue", "blue"]),
            new ColorStack(["green", "green"]),
            new ColorStack(["yellow", "yellow"]),
        ];

        expect(validateWin(stacks)).toBe(true);
    });
});