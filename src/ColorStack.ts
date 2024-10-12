export type Color = "red" | "blue" | "green" | "yellow";

export const maxLength = 8;

export class ColorStack {
    private readonly colors: Color[];

    constructor(colors: Color[]) {
        if (colors.length > maxLength) {
            throw new Error("Stack construction failed due to out of bounds, max length is " + maxLength);
        }
        this.colors = colors;
    }

    push(color: Color): void {
        if (this.isFull()) {
            throw new Error("Push failed, stack is full");
        }

        if (this.isEmpty()) {
            this.colors.push(color);
        } else {
            const top = this.peek();
            if (top !== color) {
                throw new Error("Push failed, color mismatch");
            }
            this.colors.push(color);
        }
    }

    pop(): Color {
        const color = this.colors.pop();
        if (!color) {
            throw new Error("Pop failed, stack is empty");
        }
        return color;
    }

    peek(): Color {
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
    pushAll(colors: Color[]): void {
        if (!colors.length) {
            throw new Error("Input is empty, nothing to add.");
        }

        const space = maxLength - this.colors.length;
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
     * 
     * @returns All consecutive items with the same color.
     */
    popAll(): Color[] {
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

        const poppedColors: Color[] = [];
        
        for (let i = this.colors.length - 1; i >= 0; i--) {
            const color = this.colors[i];
            if (color !== lastColor) {
                break;
            }

            const popped = this.colors.pop();
            if (!popped) throw new Error("Nothing to pop");
            poppedColors.push(popped);
        }

        return poppedColors;
    }

    isFull(): boolean {
        return this.colors.length === maxLength;
    }

    isEmpty(): boolean {
        return this.colors.length === 0;
    }

    getAll(): ReadonlyArray<Color> {
        return this.colors;
    }

    isSorted(): boolean {
        if (this.isEmpty()) {
            return false;
        }
        return this.colors.every((c, _, arr) => c === arr[0]);
    }
}