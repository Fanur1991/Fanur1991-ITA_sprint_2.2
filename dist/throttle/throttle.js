"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = void 0;
const throttle = (callback, delay = 1000) => {
    let isPaused = false;
    let waitingArgs = null;
    const timeoutFunc = () => {
        if (waitingArgs === null) {
            isPaused = false;
        }
        else {
            callback.apply(this, waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc, delay);
        }
    };
    return function (...args) {
        if (isPaused) {
            waitingArgs = args;
            return;
        }
        callback.apply(this, args);
        isPaused = true;
        setTimeout(timeoutFunc, delay);
    };
};
exports.throttle = throttle;
//# sourceMappingURL=throttle.js.map