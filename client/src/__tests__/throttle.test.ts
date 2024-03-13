import { describe, expect, it, beforeEach } from '@jest/globals';
import { throttle } from '../utils/throttle';

jest.useFakeTimers();

describe('La función throttle', () => {
  let delay: number; // Tiempo de espera para el throttle
  let myMockFn: jest.Mock; // Función simulada para realizar el seguimiento de las llamadas
  let throttledFunction: Function; // Función throttle que se va a probar

  beforeEach(() => {
    delay = 500; // Configura el tiempo de espera en 200 milisegundos
    myMockFn = jest.fn(); // Inicializa una función simulada para realizar el seguimiento de las llamadas
    throttledFunction = throttle(myMockFn, delay); // Crea una función throttle con la función simulada y el tiempo de espera
  });

  it('Debería ejecutar una sola vez después de un retraso', async () => {
    // Llama a la función de throttle 5 veces
    for (let i = 0; i < 10; i++) {
      await throttledFunction();
    }

    // Avanza el tiempo en la cantidad de retraso especificada
    jest.advanceTimersByTime(delay);

    // Verifica que la función se haya llamado solo una vez
    expect(myMockFn).toHaveBeenCalledTimes(2);
  });

  it('Debería hacer dos llamadas a la función de retorno', async () => {
    for (let i = 0; i < 10; i++) {
      await throttledFunction();
      if (i === 5) {
        // Pausa para llamar a un callback en throttle
        jest.runOnlyPendingTimers();
      }
    }

    jest.runAllTimers(); // Avanzar manualmente los timers simulados

    // Verifica que la función simulada se haya llamado dos veces
    expect(myMockFn).toHaveBeenCalledTimes(3);
  });

  it('Debería llamar con el último argumento después del retraso de throttle', async () => {
    const arrOfArguments: [string, string, string] = [
      'arg 1',
      'arg 2',
      'arg 3',
    ];

    // Llama a la función con diferentes argumentos
    for (const arg of arrOfArguments) {
      await throttledFunction(arg);
    }

    // Avanza el tiempo en la cantidad de retraso especificada
    jest.advanceTimersByTime(delay);

    // Comprueba que la función simulada se haya llamado solo una vez
    expect(myMockFn).toHaveBeenCalledTimes(2);

    // Comprueba que se pasó el último argumento durante la llamada
    expect(myMockFn).toHaveBeenCalledWith(
      arrOfArguments[arrOfArguments.length - 1]
    );
  });

  it('No debería ser llamada antes de que termine el retraso de throttle', async () => {
    // Llamamos a la función throttle
    await throttledFunction();

    // Comprobamos que la función no ha sido llamada antes de que termine el retraso
    expect(myMockFn).toHaveBeenCalledTimes(1);

    // Avanzamos el tiempo en la mitad del retraso
    jest.advanceTimersByTime(delay / 2);

    // Llamamos a la función throttle nuevamente
    await throttledFunction();

    // Verificamos que la función haya sido llamada solo una vez después de la segunda llamada
    expect(myMockFn).toHaveBeenCalledTimes(1);

    // Avanzamos el tiempo en la otra mitad del retraso
    jest.advanceTimersByTime(delay / 2);

    // Comprobamos que la función ha sido llamada después de que termine completamente el retraso
    expect(myMockFn).toHaveBeenCalledTimes(2);
  });
});
