import { Ui } from "./ui/ui.js";
import { validateLoss, validateMove, validateSelect, validateWin } from "./core/validator.js";
import { GameState } from "./core/GameState.js";
const gameState = new GameState();
const ui = new Ui(gameState, {
    onSelect,
    onMove,
    onRestart,
});
ui.render();
function onSelect(index) {
    clearError();
    if (gameState.isWin() || gameState.isLoss()) {
        return;
    }
    try {
        validateSelect(gameState.stacks, index);
        gameState.select(index);
    }
    catch (error) {
        handleError(error, index);
    }
}
function onMove(index) {
    if (gameState.isWin() || gameState.isLoss()) {
        return;
    }
    if (index === gameState.getSelectedStack()) {
        gameState.deselect();
        clearError();
        return;
    }
    const stacksCopy = gameState.stacksCopy();
    try {
        const { source, destination } = validateMove(gameState.stacks, gameState.getSelectedStack(), index);
        // commit move, which is a pop on source and push on destination
        const colorsToAdd = source.popAll(); // should not be a pop, all consecutive colors should be added
        // if push all fails here, the state has to be reverted
        destination.pushAll(colorsToAdd);
        gameState.deselect();
        clearError();
    }
    catch (error) {
        handleError(error, index);
        // revert state
        gameState.revertStacks(stacksCopy);
    }
    finally {
        if (validateLoss(gameState.stacks)) {
            gameState.setLoss(true);
        }
        if (validateWin(gameState.stacks)) {
            gameState.setWin(true);
        }
    }
}
function onRestart() {
    gameState.restart();
    ui.render();
}
function handleError(error, destinationIndex) {
    if (error instanceof Error) {
        gameState.setErrorMessage(error.message);
    }
    gameState.setErrorIndex(destinationIndex);
}
function clearError() {
    gameState.clearError();
    ui.clearError();
}
//# sourceMappingURL=index.js.map