// https://bigfrontend.dev/problem/implement-throttle-with-leading-and-trailing-option



// This is a JavaScript coding problem from BFE.dev

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 * @returns {(...args: any[]) => any}
 */
function throttle(func, wait, option = {leading: true, trailing: true}) {
    const {leading, trailing} = option;
    let isWaitting = false;
    let lastArgs = null;
    return function (...args) {
        if (isWaitting) {
            lastArgs = args;
        } else {
            if (leading) {
                func.call(this, ...args);
            }
            isWaitting = true;
            function timeout() {
                setTimeout(function () {
                    if (lastArgs && trailing) {
                        func(...lastArgs);
                        isWaitting = true;
                        lastArgs = null;
                        timeout();
                    } else {
                        isWaitting = false;
                    }
                }, wait);
            }
            timeout();
        }
    }
}



