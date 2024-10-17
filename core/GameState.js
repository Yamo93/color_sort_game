import { ColorStack } from "./ColorStack.js";
import { generateStacks } from "./stackGenerator.js";
export class GameState {
    constructor() {
        this.selectedStack = -1;
        this.errorMessage = "";
        this.errorIndex = -1;
        this.win = false;
        this.loss = false;
        this.stacks = generateStacks();
    }
    isWin() {
        return this.win;
    }
    isLoss() {
        return this.loss;
    }
    select(stackIndex) {
        this.selectedStack = stackIndex;
    }
    deselect() {
        this.selectedStack = -1;
    }
    getSelectedStack() {
        return this.selectedStack;
    }
    getErrorMessage() {
        return this.errorMessage;
    }
    getErrorIndex() {
        return this.errorIndex;
    }
    revertStacks(colorStacks) {
        this.stacks = colorStacks.map((colors) => new ColorStack(colors));
    }
    stacksCopy() {
        return this.stacks.map((stack) => [...stack.getAll()]);
    }
    setWin(win) {
        this.win = win;
    }
    setLoss(loss) {
        this.loss = loss;
    }
    setErrorMessage(message) {
        this.errorMessage = message;
    }
    clearError() {
        this.errorMessage = "";
        this.errorIndex = -1;
    }
    setErrorIndex(index) {
        this.errorIndex = index;
    }
    restart() {
        this.stacks = generateStacks();
        this.deselect();
        this.clearError();
        this.win = false;
        this.loss = false;
    }
}
//# sourceMappingURL=GameState.js.map