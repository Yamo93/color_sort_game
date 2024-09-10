type Nut = "red" | "blue" | "green" | "orange";

export class NutStack {
    private readonly maxLength = 8;
    private readonly nuts: Nut[];

    constructor(nuts: Nut[]) {
        if (nuts.length > this.maxLength) {
            throw new Error("Can not construct nut stack, greater than max length of " + this.maxLength);
        }
        this.nuts = nuts;
    }

    push(nut: Nut): void {
        if (this.isFull()) {
            throw new Error("Push failed, nut stack is full");
        }
        this.nuts.push(nut);
    }

    pop(): Nut {
        const nut = this.nuts.pop();
        if (!nut) {
            throw new Error("Pop failed, nut stack is empty");
        }
        return nut;
    }

    peek(): Nut {
        const lastNut = this.nuts.at(-1);
        if (!lastNut) {
            throw new Error("Peek failed, nut stack is empty");
        }
        return lastNut;
    }

    isFull(): boolean {
        return this.nuts.length === this.maxLength;
    }

    isEmpty(): boolean {
        return this.nuts.length === 0;
    }
}