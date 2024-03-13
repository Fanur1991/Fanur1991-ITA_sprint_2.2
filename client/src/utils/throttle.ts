// opcion 1
// export const throttle = (callback: Function, delay: number = 3000) => {
//   let inThrottle: boolean;
//   return function (this: any) {
//     const args = arguments;
//     const context = this;
//     if (!inThrottle) {
//       callback.apply(context, args);
//       inThrottle = true;
//       setTimeout(() => (inThrottle = false), delay);
//     }
//   };
// };

// opcion 2
// export const throttle = (fn: Function, wait: number = 1000) => {
//   let inThrottle: boolean,
//     lastFn: ReturnType<typeof setTimeout>,
//     lastTime: number;
//   return function (this: any) {
//     const context = this,
//       args = arguments;
//     if (!inThrottle) {
//       fn.apply(context, args);
//       lastTime = Date.now();
//       inThrottle = true;
//     } else {
//       clearTimeout(lastFn);
//       lastFn = setTimeout(() => {
//         if (Date.now() - lastTime >= wait) {
//           fn.apply(context, args);
//           lastTime = Date.now();
//         }
//       }, Math.max(wait - (Date.now() - lastTime), 0));
//     }
//   };
// };

// opcion 3
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
