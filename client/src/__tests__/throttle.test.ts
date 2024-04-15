import { describe, expect, it, beforeEach } from '@jest/globals';
import { throttle } from '../utils/throttle';

jest.useFakeTimers();

describe('La función throttle test', () => {
  let delay: number; // Tiempo de espera para el throttle
  let myMockFn: jest.Mock; // Función simulada para realizar el seguimiento de las llamadas
  let throttledFunction: Function; // Función throttle que se va a probar

  beforeEach(() => {
    delay = 500; // Configura el tiempo de espera en 500 milisegundos
    myMockFn = jest.fn(); // Inicializa una función simulada para realizar el seguimiento de las llamadas
    throttledFunction = throttle(myMockFn, delay); // Crea una función throttle con la función simulada y el tiempo de espera
  });

  // Caso 1 ------------------------------------------------------------
  it('Debería ejecutar una sola vez después de múltiples llamadas durante el retraso', () => {
    // Llama a la función de throttle 10 veces
    for (let i = 0; i < 10; i++) {
      throttledFunction();
    }

    // Avanza el tiempo en la cantidad de retraso especificada
    jest.advanceTimersByTime(450);

    // Verifica que la función se haya llamado solo dos veces
    expect(myMockFn).toHaveBeenCalledTimes(1);

    // Simula otro llamado y avanza el tiempo
    throttledFunction();
    jest.advanceTimersByTime(delay);

    // Verifica que la función se haya llamado una segunda vez
    expect(myMockFn).toHaveBeenCalledTimes(2);
  });

  // Caso 2 ------------------------------------------------------------
  it('Debería hacer dos llamadas a la función de retorno', () => {
    for (let i = 0; i < 6; i++) {
      throttledFunction();
      jest.advanceTimersByTime(delay / 6);
    }

    jest.runOnlyPendingTimers(); // Esto debería llamar a callback si hay llamadas pendientes

    jest.runAllTimers(); // Avanzar manualmente los timers simulados

    // Verifica que la función simulada se haya llamado dos veces
    expect(myMockFn).toHaveBeenCalledTimes(2);
  });

  // Caso 3 ------------------------------------------------------------
  it('Debería llamar con el último argumento después del retraso de throttle', () => {
    const arrOfArguments: [string, string, string] = [
      'arg 1',
      'arg 2',
      'arg 3',
    ];

    // Llama a la función con diferentes argumentos
    for (const arg of arrOfArguments) {
      throttledFunction(arg);
    }

    // Avanza el tiempo en la cantidad de retraso especificada
    jest.advanceTimersByTime(delay);

    // Comprueba que la función simulada se haya llamado 2 veсes
    expect(myMockFn).toHaveBeenCalledTimes(2);

    // Comprueba que se pasó el último argumento durante la llamada
    expect(myMockFn).toHaveBeenLastCalledWith(
      arrOfArguments[arrOfArguments.length - 1]
    );
  });

  // Caso 4 ------------------------------------------------------------
  it('No debería ser llamada antes de que termine el retraso de throttle', () => {
    // Llamamos a la función throttle
    throttledFunction();

    // Comprobamos que la función no ha sido llamada antes de que termine el retraso
    expect(myMockFn).toHaveBeenCalledTimes(1);

    // Avanzamos el tiempo en la mitad del retraso
    jest.advanceTimersByTime(delay / 2);

    // Llamamos a la función throttle por segunda vez durante el periodo de retraso
    throttledFunction();

    // Verificamos que no haya más llamadas hasta ahora
    expect(myMockFn).toHaveBeenCalledTimes(1);

    // Avanzamos el tiempo en la otra mitad del retraso
    jest.advanceTimersByTime(delay / 2);

    // Comprobamos que la función ha sido llamada después de que termine completamente el retraso
    expect(myMockFn).toHaveBeenCalledTimes(2);
  });
});
