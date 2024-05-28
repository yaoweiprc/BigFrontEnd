// https://bigfrontend.dev/problem/implement-curry



// This is a JavaScript coding problem from BFE.dev

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
    function wrappedFunction(...args) {
        if (args.length < fn.length) {
            return (...newArgs) => wrappedFunction(...args, ...newArgs);
        } else {
            return fn(...args);
        }
    }
    return wrappedFunction;
}