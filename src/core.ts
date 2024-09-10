import { Tube } from "./Tube.js";

export class Core {
    private readonly tubes: ReadonlyArray<Tube>;

    private selectedTube: Tube | null = null;

    constructor(tubes: ReadonlyArray<Tube>) {
        this.tubes = tubes;
    }

    getStacks(): ReadonlyArray<Tube> {
        return this.tubes;
    }

    select(index: number): void {
        const tube = this.tubes.at(index);
        if (!tube) {
            throw new Error("Tube at index " + index + " is missing");
        }

        this.selectedTube = tube;
    }

    move(index: number): void {
        // if destination is missing, throw
        const destinationTube = this.tubes.at(index);
        if (!destinationTube) {
            throw new Error("Move failed, no tube exists at index " + index);
        }

        // if nothing is selected, throw
        if (!this.selectedTube) {
            throw new Error("No tube is selected");
        }

        // peek from selected tube
        const sourceColor = this.selectedTube.peek(); // throws if stack is empty
        
        // if destination is full, throw
        if (destinationTube.isFull()) {
            throw new Error("Move failed, destination is full");
        }

        // if destination stack has wrong color, throw
        const destinationColor = destinationTube.peek();
        if (destinationColor && destinationColor !== sourceColor) {
            throw new Error("Move failed, color mismatch");
        }

        // commit move, which is a pop on source and push on destination
        const colorToAdd = this.selectedTube.pop();
        destinationTube.push(colorToAdd);
        this.selectedTube = null;
    }
}