import { describe, expect, it, beforeEach } from '@jest/globals';
import { debounce } from '../utils/debounce';

jest.useFakeTimers();

describe('La función debounce', () => {
  let delay: number; // Tiempo de espera para el debounce
  let myMockFn: jest.Mock; // Función simulada para realizar el seguimiento de las llamadas
  let debouncedFunction: Function; // Función debounce que se va a probar

  jest.setTimeout(10000);

  beforeEach(() => {
    delay = 200; // Configura el tiempo de espera en 200 milisegundos
    myMockFn = jest.fn(); // Inicializa una función simulada para realizar el seguimiento de las llamadas
    debouncedFunction = debounce(myMockFn, delay); // Crea una función debounce con la función simulada y el tiempo de espera
  });

  it('Debería ejecutar una sola vez después de un retraso', async () => {
    // Llama a la función de debounce 5 veces
    for (let i = 0; i < 10; i++) {
      await debouncedFunction();
    }

    // Avanza el tiempo en la cantidad de retraso especificada
    jest.advanceTimersByTime(delay);

    // Verifica que la función se haya llamado solo una vez
    expect(myMockFn).toHaveBeenCalledTimes(1);
  });

  it('Debería ejecutar una sola vez después de un retraso', async () => {
    // Llamar a la función debounce solo una vez
    await debouncedFunction();

    // Avanza el tiempo en la cantidad de retraso especificada
    jest.advanceTimersByTime(delay);

    // Verifica que la función se haya llamado solo una vez
    expect(myMockFn).toHaveBeenCalledTimes(1);
  });

  it('Debería hacer dos llamadas a la función de retorno', async () => {
    for (let i = 0; i < 10; i++) {
      await debouncedFunction();
      if (i === 5) {
        // Pausa para llamar a un callback en debounce
        jest.runOnlyPendingTimers();
      }
    }

    jest.runAllTimers(); // Avanzar manualmente los timers simulados

    // Verifica que la función simulada se haya llamado dos veces
    expect(myMockFn).toHaveBeenCalledTimes(2);
  });

  it('Debería llamar con el último argumento después del retraso de debounce', async () => {
    const arrOfArguments: [string, string, string] = [
      'arg 1',
      'arg 2',
      'arg 3',
    ];

    // Llama a la función con diferentes argumentos
    for (const arg of arrOfArguments) {
      await debouncedFunction(arg);
    }

    // Activa instantáneamente todos los temporizadores pendientes
    jest.runAllTimers();

    // Comprueba que la función simulada se haya llamado solo una vez
    expect(myMockFn).toHaveBeenCalledTimes(1);

    // Comprueba que se pasó el último argumento durante la llamada
    expect(myMockFn).toHaveBeenCalledWith('arg 3');
  });
});
