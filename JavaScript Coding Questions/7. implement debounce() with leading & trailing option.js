// https://bigfrontend.dev/problem/implement-debounce-with-leading-and-trailing-option



// This is a JavaScript coding problem from BFE.dev

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 * @returns {(...args: any[]) => any}
 */
function debounce(func, wait, option = {leading: false, trailing: true}) {
    const {leading, trailing} = option;
    let timer = null;
    return function(...args) {
        let isInvoked = false;
        if (!timer && leading) {
            func.call(this, ...args);
            isInvoked = true;
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (trailing && !isInvoked) {
                func.call(this, ...args);
            }
            timer = null;
        }, wait);
    }
}



