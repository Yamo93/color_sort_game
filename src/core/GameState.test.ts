import { Color } from "./ColorStack";
import { GameState } from "./GameState";

describe("GameState", () => {
    test("should initialize with a default state", () => {
        const gameState = new GameState();

        expect(gameState.isWin()).toBe(false);
        expect(gameState.isLoss()).toBe(false);
        expect(gameState.getSelectedStack()).toBe(-1);
        expect(gameState.getErrorMessage()).toBe("");
        expect(gameState.getErrorIndex()).toBe(-1);
        expect(gameState.stacks.length).toBe(6); // Assuming generateStacks creates 6 stacks
    });

    test("should select and deselect a stack", () => {
        const gameState = new GameState();
        
        gameState.select(2);
        expect(gameState.getSelectedStack()).toBe(2);

        gameState.deselect();
        expect(gameState.getSelectedStack()).toBe(-1);
    });

    test("should set and clear error messages", () => {
        const gameState = new GameState();

        gameState.setErrorMessage("An error occurred");
        expect(gameState.getErrorMessage()).toBe("An error occurred");
        expect(gameState.getErrorIndex()).toBe(-1);

        gameState.clearError();
        expect(gameState.getErrorMessage()).toBe("");
        expect(gameState.getErrorIndex()).toBe(-1);
    });

    test("should update win and loss states", () => {
        const gameState = new GameState();

        gameState.setWin(true);
        expect(gameState.isWin()).toBe(true);
        
        gameState.setLoss(true);
        expect(gameState.isLoss()).toBe(true);
        
        gameState.setWin(false);
        expect(gameState.isWin()).toBe(false);
        
        gameState.setLoss(false);
        expect(gameState.isLoss()).toBe(false);
    });

    test("should restart the game state", () => {
        const gameState = new GameState();
        
        gameState.setWin(true);
        gameState.setLoss(true);
        gameState.setErrorMessage("Some error");

        gameState.restart();

        expect(gameState.isWin()).toBe(false);
        expect(gameState.isLoss()).toBe(false);
        expect(gameState.getErrorMessage()).toBe("");
        expect(gameState.getSelectedStack()).toBe(-1);
        expect(gameState.stacks.length).toBe(6); // Assuming generateStacks creates 6 stacks
    });

    test("should revert stacks correctly", () => {
        const gameState = new GameState();
        const newStacks: Color[][] = [["red"], ["blue"], ["green"]]; // Example stacks
        gameState.revertStacks(newStacks);

        expect(gameState.stacks.length).toBe(3); // Check the number of stacks
        expect(gameState.stacks[0].getAll()).toEqual(["red"]); // Check the contents of the first stack
    });
});
