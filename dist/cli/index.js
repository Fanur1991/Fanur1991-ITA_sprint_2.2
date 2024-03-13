"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const colors_1 = __importDefault(require("colors"));
const throttle_1 = require("../throttle/throttle");
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function handleInput(input) {
    console.log(colors_1.default.green(`Entrada recibida: ${input}`));
}
const throttledHandleInput = (0, throttle_1.throttle)((input) => handleInput(input), 2000);
function runCLI() {
    rl.question(colors_1.default.yellow('Escriba el texto para verificar la función throttle (Ctrl+C para salir): '), (input) => {
        throttledHandleInput(input);
        runCLI();
    });
}
rl.on('close', () => {
    console.log(colors_1.default.red('Saliendo de la CLI. Hasta luego!'));
    process.exit(0);
});
console.log(colors_1.default.yellow('CLI para probar la función throttle.'));
runCLI();
//# sourceMappingURL=index.js.map