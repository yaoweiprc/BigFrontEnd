// https://bigfrontend.dev/problem/create-an-Event-Emitter


// please complete the implementation
class EventEmitter {
    eventSymbolArrMap = {};
    symbolHandlerMap = {};
    subscribe(eventName, callback) {
        if (!Array.isArray(this.eventSymbolArrMap[eventName]))
            this.eventSymbolArrMap[eventName] = [];
        let symbolArr = this.eventSymbolArrMap[eventName];
        const key = Symbol();
        this.symbolHandlerMap[key] = callback;
        symbolArr.push(key);
        const that = this;
        return {
            release(){
                delete that.symbolHandlerMap[key];
                const idx = symbolArr.indexOf(key);
                symbolArr.splice(idx, 1);
            }
        };
    }

    emit(eventName, ...args) {
        if (!Array.isArray(this.eventSymbolArrMap[eventName]))
            return;
        for (let key of this.eventSymbolArrMap[eventName]) {
            (this.symbolHandlerMap[key])(...args);
        }
    }
}