"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
const debounce = (callback, delay = 800) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
};
exports.debounce = debounce;
//# sourceMappingURL=debounce.js.map