import { NutStack } from "./NutStack.js";

export class Core {
    private readonly stacks: ReadonlyArray<NutStack>;

    private selectedNutStack: NutStack | null = null;

    constructor(stacks: ReadonlyArray<NutStack>) {
        this.stacks = stacks;
    }

    getStacks(): ReadonlyArray<NutStack> {
        return this.stacks;
    }

    select(index: number): void {
        const stack = this.stacks.at(index);
        if (!stack) {
            throw new Error("Stack at index " + index + " is missing");
        }

        this.selectedNutStack = stack;
    }

    move(index: number): void {
        // if destination stack is missing, throw
        const destinationStack = this.stacks.at(index);
        if (!destinationStack) {
            throw new Error("Move failed, no stack exists at index " + index);
        }

        // if nothing is selected, throw
        if (!this.selectedNutStack) {
            throw new Error("No stack is selected");
        }

        // peek from selected stack
        const nutAtSource = this.selectedNutStack.peek(); // throws if stack is empty
        
        // if destination stack is full, throw
        if (destinationStack.isFull()) {
            throw new Error("Move failed, destination stack is full");
        }

        // if destination stack has wrong color, throw
        const nutAtDestination = destinationStack.peek();
        if (nutAtDestination && nutAtDestination !== nutAtSource) {
            throw new Error("Move failed, nut at destination stack has wrong color");
        }

        // commit move, which is a pop on source and push on destination
        const nutToAdd = this.selectedNutStack.pop();
        destinationStack.push(nutToAdd);
    }
}