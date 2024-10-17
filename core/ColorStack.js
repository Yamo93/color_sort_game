export const maxStackLength = 8;
export class ColorStack {
    constructor(colors) {
        if (colors.length > maxStackLength) {
            throw new Error("Stack construction failed due to out of bounds, max length is " + maxStackLength);
        }
        this.colors = colors;
    }
    pop() {
        const color = this.colors.pop();
        if (!color) {
            throw new Error("Pop failed, stack is empty");
        }
        return color;
    }
    peek() {
        const lastColor = this.colors.at(-1);
        if (!lastColor) {
            throw new Error("Peek failed, stack is empty");
        }
        return lastColor;
    }
    /**
     * Adds colors of same color.
     * @param colors Colors to add
     */
    pushAll(colors) {
        if (!colors.length) {
            throw new Error("Input is empty, nothing to add.");
        }
        const space = maxStackLength - this.colors.length;
        if (colors.length > space) {
            throw new Error("Push all failed, not enough space in stack");
        }
        // fail if the colors are differing in themselves
        if (colors.some((c, _, arr) => c !== arr[0])) {
            throw new Error("Push all failed, some colors are different");
        }
        // fail if the stack is not empty, and the top is a color mismatch
        if (this.colors.length > 0 && this.peek() !== colors.at(-1)) {
            throw new Error("Push all failed, top is a color mismatch");
        }
        this.colors.push(...colors);
    }
    /**
     * Removes colors of same color.
     * @returns All consecutive items with the same color.
     */
    popAll() {
        if (!this.colors.length) {
            throw new Error("Pop all failed, stack is empty");
        }
        if (this.colors.length === 1) {
            return [this.pop()];
        }
        const lastColor = this.colors.at(-1);
        if (!lastColor) {
            throw new Error("Could not find last color.");
        }
        const poppedColors = [];
        for (let i = this.colors.length - 1; i >= 0; i--) {
            const color = this.colors[i];
            if (color !== lastColor) {
                break;
            }
            const popped = this.colors.pop();
            if (!popped)
                throw new Error("Nothing to pop");
            poppedColors.push(popped);
        }
        return poppedColors;
    }
    isFull() {
        return this.colors.length === maxStackLength;
    }
    isEmpty() {
        return this.colors.length === 0;
    }
    getAll() {
        return this.colors;
    }
    isSorted() {
        if (this.isEmpty()) {
            return false;
        }
        return this.colors.every((c, _, arr) => c === arr[0]);
    }
}
//# sourceMappingURL=ColorStack.js.map