export const throttle = (callback: (...args: any[]) => void, delay = 1000) => {
  let isPaused: boolean = false;
  let waitingArgs: any = null;
  const timeoutFunc = () => {
    if (waitingArgs === null) {
      isPaused = false;
    } else {
      callback.apply(this, waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };
  return function (this: any, ...args: any[]) {
    if (isPaused) {
      waitingArgs = args;
      return;
    }

    callback.apply(this, args);

    isPaused = true;

    setTimeout(timeoutFunc, delay);
  };
};
