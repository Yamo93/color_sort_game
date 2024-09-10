import { NutStack } from "./NutStack.js";

export class Core {
    private readonly stacks: ReadonlyArray<NutStack>;
    constructor() {
        this.stacks = [
            new NutStack(["blue", "green", "orange"]),
            new NutStack(["red", "red", "blue"]),
            new NutStack(["orange", "red", "green"]),
            new NutStack(["green", "red", "blue"]),
        ];
    }


    getStacks(): ReadonlyArray<NutStack> {
        return this.stacks;
    }
}