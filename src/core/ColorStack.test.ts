import { Color, ColorStack, maxStackLength } from "./ColorStack"

test("should fail to create a stack if it exceeds max stack limit", () => {
    const colors: Color[] = ["blue", "green", "red", "red", "red", "red", "red", "blue", "green"];
    expect(colors.length).toBeGreaterThan(maxStackLength);
    expect(() => new ColorStack(colors)).toThrow("Stack construction failed due to out of bounds, max length is 8");
})