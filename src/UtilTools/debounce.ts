interface DebounceSettings {
    /**
     * Specify invoking on the leading edge of the timeout.
     */
    leading?: boolean;

    /**
     * The maximum time func is allowed to be delayed before it’s invoked.
     */
    maxWait?: number;

    /**
     * Specify invoking on the trailing edge of the timeout.
     */
    trailing?: boolean;
}
function isObject(value: any): value is object {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
}

var isObject_1 = isObject;

var commonjsGlobal =
    typeof globalThis !== "undefined"
        ? globalThis
        : typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
        ? global
        : typeof self !== "undefined"
        ? self
        : {};

var freeGlobal = commonjsGlobal;

var _freeGlobal = freeGlobal;

var freeSelf =
    typeof self == "object" && self && self.Object === Object && self;

var root = _freeGlobal || freeSelf || Function("return this")();

var _root = root;

var now = function() {
    return _root.Date.now();
};

var now_1 = now;

var FUNC_ERROR_TEXT = "Expected a function";

var nativeMax = Math.max,
    nativeMin = Math.min;

function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number = 0,
    options?: DebounceSettings
): T {
    var lastArgs: IArguments | undefined | any[],
        lastThis: undefined | any,
        maxWait: number | undefined | any,
        result: any,
        timerId: number | any,
        lastCallTime: number | undefined | any,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;
    if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = Number(wait) || 0;
    if (isObject_1(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing
            ? nativeMax(Number(options.maxWait) || 0, wait)
            : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time: number) {
        var args = lastArgs || [],
            thisArg = lastThis;
        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = Reflect.apply(func, thisArg, args); //func.apply(thisArg, args);
        return result;
    }
    function leadingEdge(time: number) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time: number) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            timeWaiting = wait - timeSinceLastCall;
        return maxing
            ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
            : timeWaiting;
    }
    function shouldInvoke(time: number) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;
        return (
            lastCallTime === undefined ||
            timeSinceLastCall >= wait ||
            timeSinceLastCall < 0 ||
            (maxing && timeSinceLastInvoke >= maxWait)
        );
    }
    function timerExpired() {
        var time = now_1();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time: number) {
        timerId = undefined;
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
    }
    // function cancel() {
    //     if (timerId !== undefined) {
    //         clearTimeout(timerId);
    //     }
    //     lastInvokeTime = 0;
    //     lastArgs = lastCallTime = lastThis = timerId = undefined;
    // }
    // function flush() {
    //     return timerId === undefined ? result : trailingEdge(now_1());
    // }
    function debounced(this: any, ...args: any[]): any {
        var time = now_1(),
            isInvoking = shouldInvoke(time);
        lastArgs = args;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxing) {
                clearTimeout(timerId);
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) {
            timerId = setTimeout(timerExpired, wait);
        }
        return result;
    }
    // debounced.cancel = cancel;
    // debounced.flush = flush;
    return debounced as T;
}

var debounce_1 = debounce;
export default debounce_1;
