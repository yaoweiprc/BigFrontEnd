// https://bigfrontend.dev/problem/implement-clearAllTimeout

const timerSet = new Set();

const oriSetTimeout = window.setTimeout;
const oriClearTimeout = window.clearTimeout;

window.setTimeout = function (fn, timeout, ...args) {
    const timer = oriSetTimeout(() => {
        fn(...args);
        timerSet.delete(timer);
    }, timeout);
    timerSet.add(timer);
    return timer;
}

window.clearTimeout = function (timer) {
    oriClearTimeout(timer);
    timerSet.delete(timer);
}

/**
 * cancel all timer from window.setTimeout
 */
function clearAllTimeout() {
    for (let timer of timerSet) {
        clearTimeout(timer);
    }
}

