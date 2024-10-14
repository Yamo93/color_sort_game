import { Color } from "./core/ColorStack.js";
import { GameState } from "./core/gameState.js";
import { Ui } from "./ui/ui.js";
import { validateLoss, validateMove, validateSelect, validateWin } from "./core/validator.js";

// TODO: add tests for the core layer
// TODO: deploy it and make repo public

const gameState = new GameState();
const ui = new Ui(gameState, {
    onSelect,
    onMove,
    onRestart,
});

ui.render();

function onSelect(index: number): void {
    clearError();

    if (gameState.isWin() || gameState.isLoss()) {
        return;
    }

    try {
        validateSelect(gameState.stacks, index);
        gameState.select(index);
    } catch (error) {
        handleError(error, index);
    }
}

function onMove(index: number): void {
    if (gameState.isWin() || gameState.isLoss()) {
        return;
    }

    if (index === gameState.getSelectedStack()) {
        gameState.deselect();
        clearError();
        return;
    }

    const stacksCopy: Color[][] = gameState.stacksCopy();
    try {
        const { source, destination } = validateMove(gameState.stacks, gameState.getSelectedStack(), index);
        // commit move, which is a pop on source and push on destination
        const colorsToAdd = source.popAll(); // should not be a pop, all consecutive colors should be added
        // if push all fails here, the state has to be reverted
        destination.pushAll(colorsToAdd);
        gameState.deselect();
        clearError();
    } catch (error) {
        handleError(error, index);
        // revert state
        gameState.revertStacks(stacksCopy);
    } finally {
        if (validateLoss(gameState.stacks)) {
            gameState.setLoss(true);
        }

        if (validateWin(gameState.stacks)) {
            gameState.setWin(true);
        }
    }
}

function onRestart(): void {
    gameState.restart();
    ui.render();
}

function handleError(error: unknown, destinationIndex: number): void {
    if (error instanceof Error) {
        gameState.setErrorMessage(error.message);
    }
    gameState.setErrorIndex(destinationIndex);
}

function clearError(): void {
    gameState.clearError();
    ui.clearError();
}