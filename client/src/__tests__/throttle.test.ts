import { throttle } from '../utils/throttle';

jest.useFakeTimers();

describe('La función throttle test', () => {
  let delay: number;
  let myMockFn: jest.Mock;
  let throttledFunction: Function;

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

    jest.runOnlyPendingTimers();

    jest.runAllTimers();

    expect(myMockFn).toHaveBeenCalledTimes(2);
  });

  // Caso 3 ------------------------------------------------------------
  it('Debería llamar con el último argumento después del retraso de throttle', () => {
    const arrOfArguments: [string, string, string] = [
      'arg 1',
      'arg 2',
      'arg 3',
    ];

    for (const arg of arrOfArguments) {
      throttledFunction(arg);
    }

    jest.advanceTimersByTime(delay);

    expect(myMockFn).toHaveBeenCalledTimes(2);

    expect(myMockFn).toHaveBeenLastCalledWith(
      arrOfArguments[arrOfArguments.length - 1]
    );
  });

  // Caso 4 ------------------------------------------------------------
  it('No debería ser llamada antes de que termine el retraso de throttle', () => {
    throttledFunction();

    expect(myMockFn).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(delay / 2);

    throttledFunction();

    expect(myMockFn).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(delay / 2);

    expect(myMockFn).toHaveBeenCalledTimes(2);
  });
});
