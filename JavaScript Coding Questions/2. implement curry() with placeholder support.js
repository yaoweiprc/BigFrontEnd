// https://bigfrontend.dev/problem/implement-curry-with-placeholder


// This is a JavaScript coding problem from BFE.dev

// curriedJoin(1, 2, 3) // '1_2_3'
// curriedJoin(_, 2)(1, 3) // '1_2_3'
// curriedJoin(_, _, _)(1)(_, 3)(2) // '1_2_3'

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
    function wrappedFunction(...args) {
        const isArgsEnough = args.length >= fn.length && args.slice(0, fn.length).every(arg => arg !== curry.placeholder)
        if (isArgsEnough) {
            return fn(...args);
        } else {
            return (...newArgs) => {
                const combinedArgs = [...args];
                let i = 0;
                let j = 0;
                while (j < newArgs.length) {
                    while (
                        i < combinedArgs.length &&
                        combinedArgs[i] !== curry.placeholder
                    ) {
                        i++;
                    }
                    if (newArgs[j] === curry.placeholder) {
                        if (i >= combinedArgs.length) {
                            combinedArgs[i] = newArgs[j];
                        }
                    } else {
                        combinedArgs[i] = newArgs[j];
                    }
                    i++;
                    j++;
                }

                return wrappedFunction(...combinedArgs);
            };
        }
    }

    return wrappedFunction;
}


curry.placeholder = Symbol()
