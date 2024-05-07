// Option 1: Basic Throttle
/**
 * This version implements the most straightforward form of throttling. It ensures the function is executed immediately on the first call, then prevents further executions until after a specified delay (1000ms by default), resetting the throttle flag thereafter.
 */

// export const throttle = (callback: Function, delay: number = 1000) => {
//   let inThrottle: boolean;
//   return function (this: any) {
//     const args = arguments;
//     const context = this;
//     if (!inThrottle) {
//       callback.apply(context, args); // Execute callback immediately if not within the throttle period.
//       inThrottle = true; // Set throttle flag.
//       setTimeout(() => (inThrottle = false), delay); // Reset throttle flag after the delay.
//     }
//   };
// };

// Option 2: Improved Throttle with Debounce Logic
/**
 * Combines throttling with debouncing capabilities. This implementation allows an immediate execution and then ensures subsequent invocations are debounced until the end of the delay since the last execution. This helps in scenarios where you need to handle continuous input but delay processing, like typing in a search bar.
 */

// export const throttle = (callback: Function, delay: number = 1000) => {
//   let inThrottle: boolean,
//     lastCallback: ReturnType<typeof setTimeout>,
//     lastTime: number;
//   return function (this: any) {
//     const context = this,
//       args = arguments;
//     if (!inThrottle) {
//       // Execute callback immediately if not previously throttled.
//       callback.apply(context, args);
//       lastTime = Date.now();
//       inThrottle = true;
//     } else {
//       // Clear previous delay to debounce the execution.
//       clearTimeout(lastCallback);
//       lastCallback = setTimeout(() => {
//         // Ensure the callback is not executed until after the delay period from the last execution.
//         if (Date.now() - lastTime >= delay) {
//           callback.apply(context, args);
//           lastTime = Date.now();
//         }
//       }, Math.max(delay - (Date.now() - lastTime), 0));
//     }
//   };
// };

// Option 3: Throttle with Queue
/**
 * This version queues up the last call to be executed after the delay period if calls continue to arrive during the throttle period. It allows the function to handle continuous changes but ensures the function executes with the most recent arguments only after the throttle delay has expired. This can be useful in scenarios where only the most recent action needs to be taken into account, such as resizing a window or handling the final value of a slider.
 */

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
