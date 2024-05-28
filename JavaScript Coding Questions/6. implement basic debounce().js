// https://bigfrontend.dev/problem/implement-basic-debounce


// This is a JavaScript coding problem from BFE.dev

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @returns {(...args: any[]) => any}
 */
function debounce(func, wait) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(func.bind(this, ...args), wait);
    }
}


