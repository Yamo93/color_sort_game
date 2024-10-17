import { ColorStack, maxStackLength } from "./ColorStack.js";
describe("ColorStack", () => {
    // Test for constructor with exactly maxStackLength
    test("should allow construction with maxStackLength", () => {
        const colors = Array(maxStackLength).fill("red");
        expect(() => new ColorStack(colors)).not.toThrow();
    });
    test("should not throw an error when initialized with an empty array", () => {
        expect(() => new ColorStack([])).not.toThrow();
    });
    // Test for max stack length check
    test("should throw an error when initialized with more than maxStackLength", () => {
        const colors = Array(maxStackLength + 1).fill("red");
        expect(() => new ColorStack(colors)).toThrow("Stack construction failed due to out of bounds, max length is 8");
    });
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
        const colors = Array(maxStackLength).fill("red");
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
    // Test for popAll when stack has more than one color
    test("popAll should return all consecutive colors of the same color", () => {
        const colors = ["red", "red", "blue", "blue", "blue"];
        const stack = new ColorStack(colors);
        const poppedColors = stack.popAll();
        expect(poppedColors).toEqual(["blue", "blue", "blue"]);
        expect(stack.isEmpty()).toBe(false);
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
    // Test for popAll when stack has consecutive colors
    test("popAll should return all consecutive colors when stack has them", () => {
        const colors = ["red", "red", "blue", "blue", "blue", "yellow"];
        const stack = new ColorStack(colors);
        const poppedColors = stack.popAll();
        expect(poppedColors).toEqual(["yellow"]); // Expecting the last consecutive colors
        expect(stack.getAll()).toEqual(["red", "red", "blue", "blue", "blue"]); // Remaining colors
    });
    // Test for popAll with colors that are the same
    test("popAll should return all items when they are the same", () => {
        const colors = ["yellow", "yellow", "yellow"];
        const stack = new ColorStack(colors);
        const poppedColors = stack.popAll();
        expect(poppedColors).toEqual(["yellow", "yellow", "yellow"]); // Expect all items to be popped
        expect(stack.isEmpty()).toBe(true); // Stack should be empty now
    });
    // Test for isSorted with mixed colors
    test("isSorted should return false for a stack with different colors", () => {
        const colors = ["red", "green", "blue"];
        const stack = new ColorStack(colors);
        expect(stack.isSorted()).toBe(false);
    });
    // Test for isSorted with an empty stack
    test("isSorted should return false if the stack is empty", () => {
        const stack = new ColorStack([]);
        expect(stack.isSorted()).toBe(false);
    });
    // Test for isSorted with single color
    test("isSorted should return true if the stack has only one color", () => {
        const colors = ["green"];
        const stack = new ColorStack(colors);
        expect(stack.isSorted()).toBe(true);
    });
});
//# sourceMappingURL=ColorStack.test.js.map