import { Core } from "./core.js";
import { Tube } from "./Tube.js";

const core = new Core([
    new Tube(["blue", "green", "yellow"]),
    new Tube(["red", "red", "blue"]),
    new Tube(["yellow", "red", "green"]),
    new Tube(["green", "red", "blue"]),
]);

core.select(1);
core.move(3);

console.log(core.getStacks());