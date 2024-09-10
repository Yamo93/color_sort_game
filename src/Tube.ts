type Color = "red" | "blue" | "green" | "yellow";

export class Tube {
    private readonly maxLength = 8;
    private readonly colors: Color[];

    constructor(colors: Color[]) {
        if (colors.length > this.maxLength) {
            throw new Error("Tube construction failed due to out of bounds, max length is " + this.maxLength);
        }
        this.colors = colors;
    }

    push(color: Color): void {
        if (this.isFull()) {
            throw new Error("Push failed, tube is full");
        }
        this.colors.push(color);
    }

    pop(): Color {
        const color = this.colors.pop();
        if (!color) {
            throw new Error("Pop failed, tube is empty");
        }
        return color;
    }

    peek(): Color {
        const lastColor = this.colors.at(-1);
        if (!lastColor) {
            throw new Error("Peek failed, tube is empty");
        }
        return lastColor;
    }

    isFull(): boolean {
        return this.colors.length === this.maxLength;
    }

    isEmpty(): boolean {
        return this.colors.length === 0;
    }
}