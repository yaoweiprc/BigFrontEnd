// https://bigfrontend.dev/problem/create-your-own-Promise

// Promise is widely used nowadays, hard to think how we handled Callback Hell in the old times.
//
//     Can you implement a MyPromise Class by yourself?
//
//     At least it should match following requirements
//
// new promise: new MyPromise((resolve, reject) => {})
// chaining : MyPromise.prototype.then() then handlers should be called asynchronously
// rejection handler: MyPromise.prototype.catch()
// static methods: MyPromise.resolve(), MyPromise.reject().

class MyPromise {
    static #PENDING_STATE = 0;
    static #FULFILLED_STATE = 1;
    static #REJECTED_STATE = 2;

    #settledVal;
    #currState = MyPromise.#PENDING_STATE;

    #onFulfilledCallback;
    #onRejectedCallback;
    #thenRetPromiseResolveFunc;
    #thenRetPromiseRejectFunc;

    #handleThen() {
        const currState = this.#currState;
        const settledVal = this.#settledVal;
        const onFulfilledCallback = this.#onFulfilledCallback;
        const onRejectedCallback = this.#onRejectedCallback;
        const thenRetPromiseResolveFunc = this.#thenRetPromiseResolveFunc;
        const thenRetPromiseRejectFunc = this.#thenRetPromiseRejectFunc;
        queueMicrotask(() => {
            if (currState === MyPromise.#FULFILLED_STATE) {
                if (typeof onFulfilledCallback === 'function') {
                    try {
                        let val = onFulfilledCallback(settledVal);
                        if (val instanceof MyPromise) {
                            val.then(
                                val => thenRetPromiseResolveFunc(val),
                                val => thenRetPromiseRejectFunc(val)
                            );
                        } else {
                            thenRetPromiseResolveFunc(val);
                        }
                    } catch (e) {
                        thenRetPromiseRejectFunc(e);
                    }
                }
            }
            if (currState === MyPromise.#REJECTED_STATE) {
                if (typeof onRejectedCallback === 'function') {
                    try {
                        let val = onRejectedCallback(settledVal);
                        if (val instanceof MyPromise) {
                            val.then(
                                val => thenRetPromiseResolveFunc(val),
                                val => thenRetPromiseRejectFunc(val)
                            );
                        } else {
                            thenRetPromiseResolveFunc(val);
                        }
                    } catch (e) {
                        thenRetPromiseRejectFunc(e);
                    }
                }
            }
        });
    }

    #resolve(val) {
        if (this.#currState === MyPromise.#PENDING_STATE) {
            this.#settledVal = val;
            this.#currState = MyPromise.#FULFILLED_STATE;
            this.#handleThen();
        }
    }

    #reject(val) {
        if (this.#currState === MyPromise.#PENDING_STATE) {
            this.#settledVal = val;
            this.#currState = MyPromise.#REJECTED_STATE;
            this.#handleThen();
        }
    }

    constructor(executor) {
        try {
            executor(this.#resolve.bind(this), this.#reject.bind(this));
        } catch (e) {
            this.#reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') {
            onFulfilled = val => val;
        }
        if (typeof onRejected !== 'function') {
            onRejected = val => {
                throw val;
            };
        }
        return new MyPromise((resolve, reject) => {
            this.#onFulfilledCallback = onFulfilled;
            this.#onRejectedCallback = onRejected;
            this.#thenRetPromiseResolveFunc = resolve;
            this.#thenRetPromiseRejectFunc = reject;
            if (this.#currState !== MyPromise.#PENDING_STATE) {
                this.#handleThen();
            }
        });
    }

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    static resolve(val) {
        return new MyPromise((resolve, reject) => {
            resolve(val);
        });
    }

    static reject(val) {
        return new MyPromise((resolve, reject) => {
            reject(val);
        });
    }
}