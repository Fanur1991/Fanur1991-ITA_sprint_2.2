// opcion 1
export const throttle = (callback: Function, delay: number = 500) => {
  let inThrottle: boolean;
  return function (this: any) {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      callback.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), delay);
    }
  };
};

// opcion 2
// export const throttle = (fn: Function, wait: number = 500) => {
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
// export const throttle = (callback: (...args: any[]) => void, delay = 500) => {
//   let isPaused: boolean = false;

//   return function (this: any, ...args: any[]) {
//     if (isPaused) return;

//     callback.apply(this, args);

//     isPaused = true;

//     setTimeout(() => {
//       isPaused = false;
//     }, delay);
//   };
// };
