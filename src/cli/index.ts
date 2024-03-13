import readline from 'readline';
import colors from 'colors';
import { throttle } from '../throttle/throttle';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function handleInput(input: string) {
  console.log(colors.green(`Entrada recibida: ${input}`));
}

const throttledHandleInput = throttle(
  (input: string) => handleInput(input),
  2000
);

function runCLI() {
  rl.question(
    colors.yellow(
      'Escriba el texto para verificar la función throttle (Ctrl+C para salir): '
    ),
    (input) => {
      throttledHandleInput(input);
      runCLI();
    }
  );
}

rl.on('close', () => {
  console.log(colors.red('Saliendo de la CLI. Hasta luego!'));
  process.exit(0);
});

console.log(colors.yellow('CLI para probar la función throttle.'));
runCLI();
