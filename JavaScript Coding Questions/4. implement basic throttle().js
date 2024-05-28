// https://bigfrontend.dev/problem/implement-basic-throttle


// This is a JavaScript coding problem from BFE.dev

/**
 * @param {(...args:any[]) => any} func
 * @param {number} wait
 * @returns {(...args:any[]) => any}
 */
function throttle(func, wait) {
    let isWaitting = false;
    let lastArgs = null;
    function timeout() {
        setTimeout(function () {
            if (lastArgs === null) {
                isWaitting = false;
            } else {
                func.call(this, ...lastArgs);
                isWaitting = true;
                lastArgs = null;
                timeout();
            }
        }, wait);
    }
    return function(...args) {
        if (isWaitting) {
            lastArgs = args;
        } else {
            func.call(this, ...args);
            isWaitting = true;
            timeout();
        }
    }
}


