import { maxStackLength } from "../core/ColorStack.js";
export class Ui {
    constructor(gameState, eventListeners) {
        this.gameState = gameState;
        this.eventListeners = eventListeners;
    }
    render() {
        this.clearUi();
        this.renderStacks();
        this.renderErrorMessage();
        this.renderWinMessage();
        this.renderLossMessage();
        this.renderRestartButton();
    }
    clearUi() {
        document.body.innerHTML = "";
    }
    clearError() {
        var _a;
        (_a = document.querySelector(".error-stack")) === null || _a === void 0 ? void 0 : _a.classList.remove("error-stack");
    }
    renderStacks() {
        const gameContainer = document.createElement("div");
        gameContainer.setAttribute("id", "game-container");
        document.body.appendChild(gameContainer);
        for (let i = 0; i < this.gameState.stacks.length; i++) {
            const stack = this.gameState.stacks[i];
            const stackEl = document.createElement("div");
            stackEl.classList.add("stack");
            if (this.gameState.getSelectedStack() === i) {
                stackEl.classList.add("selected");
            }
            stackEl.setAttribute("id", "stack-" + i);
            stackEl.addEventListener("click", () => {
                if (this.gameState.getSelectedStack() < 0) {
                    this.eventListeners.onSelect(i);
                }
                else {
                    this.eventListeners.onMove(i);
                }
                this.render();
            });
            gameContainer.appendChild(stackEl);
            const colors = stack.getAll();
            for (let j = 0; j < maxStackLength; j++) {
                const color = colors[j];
                const colorEl = document.createElement("div");
                colorEl.classList.add("color");
                colorEl.dataset.color = color;
                stackEl.appendChild(colorEl);
            }
        }
    }
    renderErrorMessage() {
        if (this.gameState.getErrorMessage()) {
            const errorMessageEl = document.createElement("p");
            errorMessageEl.setAttribute("id", "error-message");
            errorMessageEl.classList.add("message");
            errorMessageEl.textContent = this.gameState.getErrorMessage();
            document.body.appendChild(errorMessageEl);
            if (this.gameState.getErrorIndex() >= 0) {
                const destinationStackEl = document.getElementById("stack-" + this.gameState.getErrorIndex());
                if (destinationStackEl) {
                    destinationStackEl.classList.add("error-stack");
                }
            }
        }
    }
    renderWinMessage() {
        if (this.gameState.isWin()) {
            const winMessageEl = document.createElement("p");
            winMessageEl.setAttribute("id", "win-message");
            winMessageEl.classList.add("message");
            winMessageEl.textContent = "Congratulations, you won!";
            document.body.appendChild(winMessageEl);
        }
    }
    renderLossMessage() {
        if (this.gameState.isLoss()) {
            const lossMessageEl = document.createElement("p");
            lossMessageEl.setAttribute("id", "loss-message");
            lossMessageEl.classList.add("message");
            lossMessageEl.textContent = "Sorry, you lost.";
            document.body.appendChild(lossMessageEl);
        }
    }
    renderRestartButton() {
        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart";
        restartButton.setAttribute("id", "restart");
        restartButton.addEventListener("click", this.eventListeners.onRestart);
        document.body.appendChild(restartButton);
    }
}
//# sourceMappingURL=ui.js.map