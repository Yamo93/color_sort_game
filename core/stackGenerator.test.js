import { maxStackLength } from "./ColorStack.js";
import { generateStacks } from "./stackGenerator.js";
describe("generateStacks", () => {
    test("should generate the correct number of stacks", () => {
        const stacks = generateStacks();
        expect(stacks.length).toBe(6); // Check for the fixed number of stacks
    });
    test("should not exceed the maximum stack length for any stack", () => {
        const stacks = generateStacks();
        stacks.forEach(stack => {
            expect(stack.getAll().length).toBeLessThanOrEqual(maxStackLength);
        });
    });
    test("should generate stacks with only valid colors", () => {
        const stacks = generateStacks();
        const validColors = ["red", "blue", "green", "yellow"];
        stacks.forEach(stack => {
            stack.getAll().forEach(color => {
                expect(validColors).toContain(color); // Each color should be valid
            });
        });
    });
    test("should not have duplicate colors in a single stack beyond stack limits", () => {
        const stacks = generateStacks();
        stacks.forEach(stack => {
            const colorCount = {
                red: 0,
                blue: 0,
                green: 0,
                yellow: 0
            };
            stack.getAll().forEach(color => {
                colorCount[color]++;
                expect(colorCount[color]).toBeLessThanOrEqual(maxStackLength); // Count should not exceed max
            });
        });
    });
    test("should handle cases with empty stacks", () => {
        const stacks = generateStacks();
        const emptyStacks = stacks.filter(stack => stack.isEmpty());
        expect(emptyStacks.length).toBeLessThanOrEqual(6); // There can be at most 6 stacks, some could be empty
    });
});
//# sourceMappingURL=stackGenerator.test.js.map