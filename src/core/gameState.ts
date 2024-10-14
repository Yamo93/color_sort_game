import { Color, ColorStack } from "./ColorStack.js";
import { generateStacks } from "./stackGenerator.js";

export class GameState {
    private selectedStack: number = -1;
    private errorMessage = "";
    private errorIndex = -1;
    private win = false;
    private loss = false;
    stacks: ReadonlyArray<ColorStack> = generateStacks();

    isWin(): boolean {
        return this.win;
    }

    isLoss(): boolean {
        return this.loss;
    }

    select(stackIndex: number): void {
        this.selectedStack = stackIndex;
    }

    deselect(): void {
        this.selectedStack = -1;
    }

    getSelectedStack(): number {
        return this.selectedStack;
    }

    getErrorMessage(): string {
        return this.errorMessage;
    }

    getErrorIndex(): number {
        return this.errorIndex;
    }

    revertStacks(colorStacks: Color[][]) {
        this.stacks = colorStacks.map((colors) => new ColorStack(colors));
    }

    stacksCopy(): Color[][] {
        return this.stacks.map((stack) => [...stack.getAll()]);
    }

    setWin(win: boolean): void {
        this.win = win;
    }

    setLoss(loss: boolean): void {
        this.loss = loss;
    }

    setErrorMessage(message: string): void {
        this.errorMessage = message;
    }

    clearError(): void {
        this.errorMessage = "";
        this.errorIndex = -1;
    }

    setErrorIndex(index: number): void {
        this.errorIndex = index;
    }

    restart(): void {
        this.stacks = generateStacks();
        this.deselect();
        this.clearError();
        this.win = false;
        this.loss = false;
    }
}