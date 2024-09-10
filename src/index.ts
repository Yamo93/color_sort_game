import { Core } from "./core.js";
import { NutStack } from "./NutStack.js";

const core = new Core([
    new NutStack(["blue", "green", "orange"]),
    new NutStack(["red", "red", "blue"]),
    new NutStack(["orange", "red", "green"]),
    new NutStack(["green", "red", "blue"]),
]);

core.select(1);
core.move(3);

console.log(core.getStacks());