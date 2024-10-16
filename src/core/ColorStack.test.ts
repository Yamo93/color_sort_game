import { Color, ColorStack, maxStackLength } from "./ColorStack";

describe("ColorStack", () => {
    test("should fail to pop if stack is empty", () => {
        const emptyStack = new ColorStack([]);
        expect(() => emptyStack.pop()).toThrow("Pop failed, stack is empty");
    });

    test("should fail to peek if stack is empty", () => {
        const emptyStack = new ColorStack([]);
        expect(() => emptyStack.peek()).toThrow("Peek failed, stack is empty");
    });

    test("should fail to push all if input is empty", () => {
        const colorStack = new ColorStack(["red"]);
        expect(() => colorStack.pushAll([])).toThrow("Input is empty, nothing to add.");
    });

    test("should fail to push all if there isn't enough space in the stack", () => {
        const colors: Color[] = Array(maxStackLength).fill("red");
        const fullStack = new ColorStack(colors);
        expect(() => fullStack.pushAll(["red"])).toThrow("Push all failed, not enough space in stack");
    });

    test("should fail to push all if some colors of the input list are different", () => {
        const colorStack = new ColorStack(["red"]);
        expect(() => colorStack.pushAll(["red", "blue"])).toThrow("Push all failed, some colors are different");
    });

    test("should fail to push all if the top of the stack has a color mismatch", () => {
        const colorStack = new ColorStack(["red", "red"]); // Stack now contains ["red", "red"]
        expect(() => colorStack.pushAll(["blue", "blue"])).toThrow("Push all failed, top is a color mismatch");
    });

    test("should fail to pop all if the stack is empty", () => {
        const emptyStack = new ColorStack([]);
        expect(() => emptyStack.popAll()).toThrow("Pop all failed, stack is empty");
    });

    test("isFull should return true if the length of the stack matches the max stack length", () => {
        const fullStack = new ColorStack(Array(maxStackLength).fill("red"));
        expect(fullStack.isFull()).toBe(true);
    });

    test("isEmpty should return true if the stack is empty", () => {
        const emptyStack = new ColorStack([]);
        expect(emptyStack.isEmpty()).toBe(true);
    });

    test("isSorted should return true if every color in the stack is the same color", () => {
        const colorStack = new ColorStack(["red", "red"]); // Stack now contains ["red", "red"]
        expect(colorStack.isSorted()).toBe(true);
    });

    test("isSorted should return false if some color in the stack is not the same color", () => {
        const colorStack = new ColorStack(["red", "blue"]);
        expect(colorStack.isSorted()).toBe(false);
    });
});
