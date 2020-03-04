const globalThis = Function("return this")();

const self = globalThis;

const window = globalThis;

const global = globalThis;

const {WeakSet: WeakSet, WeakMap: WeakMap, Date: Date, RegExp: RegExp, Event: Event, requestAnimationFrame: requestAnimationFrame, URL: URL, Blob: Blob, Element: Element, Node: Node, String: String, Array: Array, document: document, Object: Object, Reflect: Reflect, Proxy: Proxy, Symbol: Symbol, Boolean: Boolean, Promise: Promise, Set: Set, Math: Math, Error: Error, TypeError: TypeError, JSON: JSON, Map: Map, clearTimeout: clearTimeout, setTimeout: setTimeout, parseInt: parseInt} = globalThis;

function isprimitive(a) {
    return isstring(a) || isnumber(a) || isboolean(a) || isundefined(a) || isbigint(a);
}

function isbigint(a) {
    return typeof a === "bigint";
}

function issymbol(a) {
    return typeof a === "symbol";
}

const isplainobject = a => isobject(a) && gettagtype(a) === "Object";

function isundefined(a) {
    return !a && a === void 0 || a === null;
}

function isnumber(a) {
    return typeof a === "number";
}

function isboolean(a) {
    return typeof a === "boolean";
}

function isobject(a) {
    return typeof a === "object" && a !== null;
}

function isstring(a) {
    return typeof a === "string";
}

function isfunction(a) {
    return typeof a === "function";
}

function isarray(a) {
    return Array.isArray(a) && a instanceof Array;
}

function gettagtype(a) {
    return {}.toString.call(a).replace("[object ", "").replace("]", "").trim();
}

function isSet(a) {
    return a instanceof Set;
}

function isMap(a) {
    return a instanceof Map;
}

function isWeakMap(a) {
    return a instanceof WeakMap;
}

const {HTMLElement: HTMLElement$1, customElements: customElements, Proxy: Proxy$1} = window;

if (!isfunction(HTMLElement$1) || !isfunction(Proxy$1) || !isobject(customElements)) {
    console.error("Proxy,HTMLElement ,customElements ,browser not supported !");
    throw new TypeError;
}

function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
}

var isObject_1 = isObject;

var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};

var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

var freeSelf = typeof self == "object" && self && self.Object === Object && self;

var root = _freeGlobal || freeSelf || Function("return this")();

var _root = root;

var now = function() {
    return _root.Date.now();
};

var now_1 = now;

var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

var objectProto = Object.prototype;

var hasOwnProperty = objectProto.hasOwnProperty;

var nativeObjectToString = objectProto.toString;

var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
        value[symToStringTag] = undefined;
        var unmasked = true;
    } catch (e) {}
    var result = nativeObjectToString.call(value);
    if (unmasked) {
        if (isOwn) {
            value[symToStringTag] = tag;
        } else {
            delete value[symToStringTag];
        }
    }
    return result;
}

var _getRawTag = getRawTag;

var objectProto$1 = Object.prototype;

var nativeObjectToString$1 = objectProto$1.toString;

function objectToString(value) {
    return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

var nullTag = "[object Null]", undefinedTag = "[object Undefined]";

var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag$1 && symToStringTag$1 in Object(value) ? _getRawTag(value) : _objectToString(value);
}

var _baseGetTag = baseGetTag;

function isObjectLike(value) {
    return value != null && typeof value == "object";
}

var isObjectLike_1 = isObjectLike;

var symbolTag = "[object Symbol]";

function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike_1(value) && _baseGetTag(value) == symbolTag;
}

var isSymbol_1 = isSymbol;

var NAN = 0 / 0;

var reTrim = /^\s+|\s+$/g;

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

var reIsBinary = /^0b[01]+$/i;

var reIsOctal = /^0o[0-7]+$/i;

var freeParseInt = parseInt;

function toNumber(value) {
    if (typeof value == "number") {
        return value;
    }
    if (isSymbol_1(value)) {
        return NAN;
    }
    if (isObject_1(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject_1(other) ? other + "" : other;
    }
    if (typeof value != "string") {
        return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, "");
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

var toNumber_1 = toNumber;

var FUNC_ERROR_TEXT = "Expected a function";

var nativeMax = Math.max, nativeMin = Math.min;

function debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber_1(wait) || 0;
    if (isObject_1(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }
    function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
        return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }
    function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
        var time = now_1();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
        timerId = undefined;
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
    }
    function cancel() {
        if (timerId !== undefined) {
            clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
    }
    function flush() {
        return timerId === undefined ? result : trailingEdge(now_1());
    }
    function debounced() {
        var time = now_1(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
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
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
}

var debounce_1 = debounce;

const cached_create_componet = new WeakMap;

const cached_callback_debounced_watchs = new WeakMap;

function clearMounted() {
    mountedctx.clear();
}

function clearUnMounted() {
    unmountedctx.clear();
}

function checkctxandcallbck(callback) {
    if (isfunction(callback)) {
        if (ctxopen) ; else {
            console.error(errormessage);
            throw Error();
        }
    } else {
        console.error(callback);
        console.error(invalid_Function);
        throw TypeError();
    }
}

function createlifecyclecontext() {
    let callbackset = new Set;
    const getall = () => [ ...callbackset ];
    const clear = () => {
        callbackset = new Set;
    };
    const add = fun => {
        checkctxandcallbck(fun);
        callbackset.add(fun);
    };
    return {
        add: add,
        getall: getall,
        clear: clear
    };
}

function clearupdated() {
    updatedctx.clear();
}

function clearcreated() {
    createdctx.clear();
}

let StateSet = new Set;

let watchrecord = [];

function getwatchrecords() {
    return [ ...watchrecord ];
}

function clearwatch() {
    watchrecord = [];
}

const invalid_Function = "invalid Function";

const errormessage = "invalid useMounted or useUnMounted out of createComponent";

let ctxopen = false;

function getstates() {
    return [ ...StateSet ];
}

function clearstate() {
    StateSet = new Set;
}

function openctx() {
    ctxopen = true;
    clearall();
}

function closectx() {
    ctxopen = false;
    clearall();
}

function clearall() {
    clearcreated();
    clearupdated();
    clearMounted();
    clearUnMounted();
    clearstate();
    clearwatch();
}

const mountedctx = createlifecyclecontext();

const unmountedctx = createlifecyclecontext();

const updatedctx = createlifecyclecontext();

const createdctx = createlifecyclecontext();

function usewatch(state, callback) {
    if (ctxopen) {
        watchrecord.push([ state, callback ]);
    }
}

class ObserverTarget {
    constructor() {
        this.Listeners = new Set;
    }
    addListener(listener) {
        const listenerset = this.Listeners;
        listenerset.add(listener);
    }
    dispatch() {
        const listenerset = this.Listeners;
        listenerset.forEach(listener => {
            Promise.resolve().then(() => {
                listener();
            });
        });
    }
    removeListener(listener) {
        const listenerset = this.Listeners;
        listenerset.delete(listener);
    }
}

const {apply: apply, construct: construct, defineProperty: defineProperty, deleteProperty: deleteProperty, getOwnPropertyDescriptor: getOwnPropertyDescriptor, getPrototypeOf: getPrototypeOf, has: has, ownKeys: ownKeys, preventExtensions: preventExtensions} = Reflect;

function get(target, propertyKey) {
    if (isMap(target) || isWeakMap(target)) {
        return target.get(propertyKey);
    } else {
        return Reflect.get(target, propertyKey);
    }
}

function set(target, propertyKey, value) {
    if (isMap(target) || isWeakMap(target)) {
        target.set(propertyKey, value);
        return true;
    } else {
        return Reflect.set(target, propertyKey, value);
    }
}

function useststerecord(state) {
    if (ctxopen) {
        StateSet.add(state);
    }
}

var _a, _b, _c;

const addonelistner = Symbol("addonelistner");

const removeonelistner = Symbol("removeonelistner");

const cancelsubscribe = Symbol("cancelsubscribe");

const debouncedispatch = Symbol("debouncedispatch");

const invalid_primitive_or_object_state = "invalid primitive or object state";

function isReactiveState(a) {
    return a instanceof ReactiveState && a[Symbol.toStringTag] === "ReactiveState";
}

const Targetsymbol = Symbol("eventtatget");

const memlisteners = Symbol("memlisteners");

const dispatchsymbol = Symbol("dispatch");

const subscribesymbol = Symbol("subscribe");

const removeallistenerssymbol = Symbol("removeallisteners");

const addallistenerssymbol = Symbol("addallisteners");

class ReactiveState {
    constructor(init) {
        this[Symbol.toStringTag] = "ReactiveState";
        this[_a] = (() => {
            const debouncedfun = debounce_1(() => {
                this[Targetsymbol].dispatch();
            });
            return () => {
                debouncedfun();
            };
        })();
        this[_b] = new ObserverTarget;
        this[_c] = new Set;
        this.valueOf = () => this.value;
        this.value = init;
        defineProperty(this, "value", {
            value: init,
            configurable: true,
            writable: true
        });
        useststerecord(this);
    }
    [(_a = debouncedispatch, removeallistenerssymbol)]() {
        this[memlisteners].forEach(callback => {
            this[removeonelistner](callback);
        });
    }
    [removeonelistner](callback) {
        this[Targetsymbol].removeListener(callback);
    }
    [addonelistner](callback) {
        this[Targetsymbol].addListener(callback);
    }
    [addallistenerssymbol]() {
        this[memlisteners].forEach(callback => {
            this[addonelistner](callback);
        });
    }
    toString() {
        const value = this.valueOf();
        return isprimitive(value) ? String(value) : isSet(value) ? JSON.stringify([ ...value ]) : isobject(value) ? JSON.stringify(value) : "";
    }
    [(_b = Targetsymbol, _c = memlisteners, dispatchsymbol)]() {
        this[debouncedispatch]();
    }
    [subscribesymbol](eventlistener) {
        this[memlisteners].add(eventlistener);
        this[addonelistner](eventlistener);
    }
    [cancelsubscribe](eventlistener) {
        if (eventlistener) {
            this[memlisteners].delete(eventlistener);
            this[removeonelistner](eventlistener);
        }
    }
    [Symbol.toPrimitive]() {
        const value = this.valueOf();
        return isprimitive(value) ? value : isobject(value) ? JSON.stringify(value) : void 0;
    }
}

function toArray(a) {
    return (isarray(a) ? a : [ a ]).flat(1 / 0).filter(a => !isundefined(a));
}

function watch(state, callback) {
    if (isarray(state) || isReactiveState(state)) {
        const statearray = toArray(state);
        if (!statearray.length) {
            console.error("Empty array not allowed");
            throw new Error;
        }
        const debouncedcallback = debounce_1(callback);
        const stateandlisteners = statearray.map(state1 => {
            const listener = (() => {
                const cachedfun = cached_callback_debounced_watchs.get(callback);
                if (cachedfun) {
                    return cachedfun;
                } else {
                    const listenfun = () => {
                        debouncedcallback(...statearray.map(r => r.valueOf()));
                    };
                    cached_callback_debounced_watchs.set(callback, listenfun);
                    return listenfun;
                }
            })();
            watchsingle(state1, listener);
            return [ state1, listener ];
        });
        const cancelWatch = () => {
            stateandlisteners.forEach(([state, listener]) => {
                state[cancelsubscribe](listener);
            });
        };
        return cancelWatch;
    } else {
        console.error(state);
        console.error(callback);
        console.error(invalid_ReactiveState + invalid_Function);
        throw new TypeError;
    }
}

function watchsingle(state, callback) {
    if (!(isReactiveState(state) && isfunction(callback))) {
        console.error(state);
        console.error(callback);
        console.error(invalid_ReactiveState + invalid_Function);
        throw TypeError();
    }
    state[subscribesymbol](callback);
    requestAnimationFrame(() => {
        rewatch(state);
    });
    usewatch(state, callback);
}

function unwatch(state) {
    state[removeallistenerssymbol]();
}

function rewatch(state) {
    state[addallistenerssymbol]();
}

const t = [ "input", "textarea", "option", "select" ];

var e = (e, r, n) => "value" === r && t.includes(e) && "button" !== n || "selected" === r && "option" === e || "checked" === r && "input" === e || "muted" === r && "video" === e;

const r = /\B([A-Z])/g, n = t => t.replace(r, "-$1").toLowerCase(), o = window.String, i = window.Reflect, {get: u, set: c, ownKeys: s} = i, f = "value";

function a(t) {
    return "object" == typeof t && null !== t;
}

function l(t) {
    return "string" == typeof t;
}

function p(t) {
    return t instanceof Set;
}

const y = t => "input" === d(t) && ("checkbox" === u(t, "type") || "radio" === u(t, "type"));

function d(t) {
    return t.tagName.toLowerCase();
}

function w(t, e, r) {
    return t.setAttribute(e, r);
}

function g(t, e) {
    return t.removeAttribute(e);
}

function createeleattragentreadwrite(t) {
    !function(t) {
        if (!(t instanceof Element)) throw TypeError();
    }(t);
    var r = Object.create(null);
    const i = new Proxy(r, {
        ownKeys() {
            const e = function(t) {
                const e = d(t);
                return "textarea" === e || "select" === e || "input" === e && "text" === u(t, "type");
            }(t), r = function(t) {
                return t.getAttributeNames();
            }(t);
            return Array.from(new Set([ ...r, y(t) ? "checked" : void 0, e ? f : void 0 ].flat(1 / 0).filter(t => !!t)));
        },
        get(r, n) {
            if (e(d(t), o(n), u(t, "type"))) return u(t, o(n));
            {
                const e = function(t, e) {
                    return t.getAttribute(e);
                }(t, o(n));
                if ("" === e) return !0;
                if (null === e) return;
                if (!l(e)) return;
                try {
                    return JSON.parse(o(e));
                } catch (t) {
                    return e;
                }
            }
        },
        set(r, i, s) {
            if ("function" == typeof s) throw TypeError();
            if (e(d(t), o(i), u(t, "type"))) return c(t, o(i), s);
            if ("style" === i) {
                const e = l(s) ? s : a(s) ? (y = s, y = JSON.parse(JSON.stringify(y)), Object.entries(y).map(([t, e]) => [ n(t).trim(), e ]).map(([t, e]) => t + ":" + e).join(";")) : o(s);
                return c(u(t, "style"), "cssText", e.trim()), !0;
            }
            if ("class" === i && a(s)) {
                const e = (f = s, Array.isArray(f) ? s.join(" ") : p(s) ? [ ...s ].join(" ") : o(s));
                return w(t, o(i), e), !0;
            }
            return !1 === s || null == s ? (g(t, o(i)), !0) : p(s) ? (w(t, o(i), JSON.stringify([ ...s ])), 
            !0) : (!0 === s && (s = ""), w(t, o(i), a(s) ? JSON.stringify(s) : o(s)), !0);
            var f, y;
        },
        deleteProperty: (e, r) => (g(t, o(r)), !0),
        has: (t, e) => s(i).includes(e),
        defineProperty: () => !1,
        getOwnPropertyDescriptor(t, e) {
            const r = {
                enumerable: !0,
                configurable: !0,
                writable: !0
            }, n = u(i, e);
            return void 0 !== n ? {
                value: n,
                ...r
            } : void 0;
        },
        setPrototypeOf: () => !1
    });
    return i;
}

const rootnode = document.body;

const connectedeventname = Symbol("mounted").toString();

const disconnectedeventname = Symbol("unmounted").toString();

const callback = function(mutations) {
    mutations.forEach((function(record) {
        console.log("Mutation: ", record);
        const addedNodes = [ ...record.addedNodes ];
        addedNodes.forEach(e => {
            if (e instanceof Element) {
                const subnodes = [ ...e.querySelectorAll("*"), e ];
                subnodes.forEach(n => {
                    dispatchconnected(n);
                });
            }
        });
        const removedNodes = [ ...record.removedNodes ];
        removedNodes.forEach(e => {
            if (e instanceof Element) {
                const subnodes = [ ...e.querySelectorAll("*"), e ];
                subnodes.forEach(n => {
                    dispatchdisconnected(n);
                });
            }
        });
    }));
};

function dispatchconnected(e) {
    e.dispatchEvent(new Event(connectedeventname));
}

function dispatchdisconnected(e) {
    e.dispatchEvent(new Event(disconnectedeventname));
}

const mo = new MutationObserver(callback);

const option = {
    childList: true,
    subtree: true
};

mo.observe(rootnode, option);

function addmountedlistner(ele, call) {
    ele.addEventListener(connectedeventname, () => {
        call();
    });
}

function addunmountedlistner(ele, call) {
    ele.addEventListener(disconnectedeventname, () => {
        call();
    });
}

const updatedeventname = Symbol("updated").toString();

function addupdatedlistner(ele, call) {
    ele.addEventListener(updatedeventname, () => {
        call();
    });
}

new MutationObserver(mutations => {
    mutations.forEach((function(record) {
        console.log("Mutation: ", record);
        const target = record.target;
        dispatchupdated(target);
    }));
}).observe(rootnode, {
    subtree: true,
    attributes: true,
    childList: true,
    characterData: true
});

function dispatchupdated(e) {
    e.dispatchEvent(new Event(updatedeventname, {
        bubbles: true
    }));
}

const createdeventname = Symbol("created").toString();

function addcreatedlistner(ele, call) {
    ele.addEventListener(createdeventname, () => {
        call();
    });
}

function dispatchcreated(e) {
    e.dispatchEvent(new Event(createdeventname));
}

function merge_entries(a) {
    const m = {};
    a.forEach(([key, value]) => {
        if (!m[key]) {
            m[key] = new Set;
        }
        value.forEach(v => {
            m[key].add(v);
        });
    });
    return Object.entries(m).map(([k, v]) => [ k, [ ...v ] ]);
}

const VirtualElementSet = new WeakSet;

const Letter_case_and_Chinese = /[A-Za-z\u4e00-\u9fa5]/;

function isVirtualdom(a) {
    return VirtualElementSet.has(a);
}

function createVirtualElement(type, props = {}, children = []) {
    props = Object.assign({}, props);
    children = children.flat(1 / 0);
    const propsentries = Object.entries(props);
    const propsentriesNOTevents = propsentries.filter(([key]) => !(key.startsWith("@") || key.startsWith("on")));
    const Entries_beginning_with_a_letter = propsentriesNOTevents.filter(([key]) => Letter_case_and_Chinese.test(key[0]));
    const virtual = Object.create(null);
    const vdom = virtual;
    [ "onevent", "element", "type", "props", "children", "directives", "bindattr" ].forEach(key => {
        defineProperty(virtual, key, {
            writable: true
        });
    });
    vdom.element = [];
    Object.assign(virtual, {
        type: type,
        bindattr: Object.fromEntries(Entries_beginning_with_a_letter.filter(e => isReactiveState(e[1]))),
        props: Object.fromEntries(Entries_beginning_with_a_letter.filter(e => !isReactiveState(e[1])).map(([key, value]) => [ key, isstring(value) ? value.trim() : value ])),
        children: children,
        onevent: Object.fromEntries(merge_entries([ ...propsentries.filter(([key]) => "@" == key[0]).map(([key, value]) => [ key.slice(1).toLowerCase().trim(), [ value ].flat(1 / 0) ]), ...propsentries.filter(([key]) => key.startsWith("on")).map(([key, value]) => [ key.slice(2).toLowerCase().trim(), [ value ].flat(1 / 0) ]) ])),
        directives: Object.fromEntries(propsentriesNOTevents.filter(([key]) => key[0] === "*" || key[0] === "$").map(([key, value]) => [ key.slice(1).toLowerCase().trim(), value ]))
    });
    defineProperty(virtual, Symbol.toStringTag, {
        value: "VirtualElement"
    });
    preventExtensions(virtual);
    VirtualElementSet.add(virtual);
    Object.freeze(vdom);
    return virtual;
}

function isvalidvdom(v) {
    if (isstring(v)) {
        return true;
    }
    if (isnumber(v)) {
        return true;
    }
    let flag = false;
    if (isarray(v)) {
        return v.every(e => isvalidvdom(e));
    } else if (isVirtualdom(v)) {
        return isvalidvdom(v.children);
    } else if (isReactiveState(v)) {
        return true;
    }
    return flag;
}

function isclassextendsHTMLElement(initclass) {
    return !!(isfunction(initclass) && initclass.prototype && initclass.prototype instanceof HTMLElement);
}

function getUnMounted() {
    return unmountedctx.getall();
}

function getMounted() {
    return mountedctx.getall();
}

function seteletext(e, v) {
    e.textContent = v;
}

function setelehtml(e, v) {
    e.innerHTML = v;
}

function appendchild(container, ele) {
    container.appendChild(ele);
}

function createsvgelement() {
    return createElementNS(svgnamespace, "svg");
}

function createDocumentFragment() {
    return document.createDocumentFragment();
}

function createnativeelement(type) {
    return document.createElement(type);
}

function createElementNS(namespace, name) {
    return document.createElementNS(namespace, name);
}

function createtextnode(data) {
    return document.createTextNode(String(data));
}

const svgnamespace = "http://www.w3.org/2000/svg";

function changetext(textnode, value) {
    textnode.nodeValue = String(value);
}

const mathnamespace = "http://www.w3.org/1998/Math/MathML";

function createmathelement() {
    return createElementNS(mathnamespace, "math");
}

function replaceChild(newChild, oldChild) {
    let parentNode = oldChild.parentNode;
    if (parentNode) {
        parentNode.replaceChild(newChild, oldChild);
    }
}

function domaddlisten(ele, event, call) {
    ele.addEventListener(event, call);
}

function domremovelisten(ele, event, call) {
    ele.removeEventListener(event, call);
}

function getchildNodes(ele) {
    return [ ...ele.childNodes ];
}

function createanotherhtmldocument() {
    return document.implementation.createHTMLDocument("");
}

function querySelectorAll(selector) {
    return [ ...document.querySelectorAll(selector) ];
}

function mountrealelement(ele, container, clear = true) {
    if (clear) {
        seteletext(container, "");
    }
    const eles = toArray(ele).flat(Infinity);
    eles.forEach(e => appendchild(container, e));
    return container;
}

const charactorlist = Array(26).fill(undefined).map((v, i) => 97 + i).map(n => String.fromCharCode(n));

const hexnumberlist = Array(16).fill(undefined).map((v, i) => i).map(a => a.toString(16));

const charactorandnumberlist = [ ...new Set([ ...hexnumberlist, ...charactorlist ]) ];

function getrandomcharactor() {
    return get(charactorlist, Math.floor(Math.random() * charactorlist.length));
}

function getrandomhexnumberandcharactor() {
    return get(charactorandnumberlist, Math.floor(Math.random() * charactorandnumberlist.length));
}

function getrandomstringandnumber(length = 1) {
    return Array(length).fill(undefined).map(() => getrandomcharactor()).join("") + "-" + Array(length).fill(undefined).map(() => getrandomhexnumberandcharactor()).join("");
}

const invalid_custom_element_class = "invalid custom element class !";

if (!isobject(window.customElements)) {
    console.error(" customElements  not supported !");
    throw new TypeError;
}

function Usevaluetoquerythekeyfromthetable(table, Componentstatusname) {
    const outputentrie = Object.entries(table).find(v => v[1] === Componentstatusname);
    return outputentrie ? outputentrie[0] : undefined;
}

window.CustomElementRegistry = get(getPrototypeOf(window.customElements), "constructor");

const elementset = Symbol.for("elementset");

const elementmap = Symbol.for("elementmap");

const {CustomElementRegistry: CustomElementRegistry} = window;

const customElements$1 = window.customElements;

if (!has(customElements$1, elementset)) {
    Reflect.set(customElements$1, elementset, new Set);
}

if (!has(customElements$1, elementmap)) {
    Reflect.set(customElements$1, elementmap, {});
}

var RandomDefineCustomElement = (initclass, extendsname) => RandomDefineCustomElement$1(initclass, extendsname);

function RandomDefineCustomElement$1(initclass, extendsname, length = 1) {
    if (!isclassextendsHTMLElement(initclass)) {
        console.error(initclass);
        console.error(invalid_custom_element_class);
        throw TypeError();
    }
    if (!get(customElements$1, elementset).has(initclass)) {
        const elementname = getrandomstringandnumber(length);
        if (customElements$1.get(elementname)) {
            return RandomDefineCustomElement$1(initclass, extendsname, length + 1);
        } else {
            if (extendsname) {
                customElements$1.define(elementname, initclass, {
                    extends: extendsname
                });
            } else {
                customElements$1.define(elementname, initclass);
            }
        }
        return elementname;
    } else {
        return Usevaluetoquerythekeyfromthetable(get(customElements$1, elementmap), initclass);
    }
}

customElements$1.define = function(name, constructor, options) {
    if (!isclassextendsHTMLElement(constructor)) {
        console.error(constructor);
        console.error(invalid_custom_element_class);
        throw TypeError();
    }
    if (!get(customElements$1, elementset).has(constructor)) {
        if (has(customElements$1[elementmap], name)) {
            RandomDefineCustomElement$1(constructor, options ? options.extends : undefined);
        } else {
            CustomElementRegistry.prototype.define.call(customElements$1, name, constructor, options);
            customElements$1[elementset].add(constructor);
            customElements$1[elementmap][name] = constructor;
        }
    }
};

set(customElements$1, Symbol.iterator, () => {
    const entries = Object.entries(customElements$1[elementmap]);
    return entries[Symbol.iterator].call(entries);
});

function createcostumelemet(initclass, propsjson, children) {
    let type = initclass;
    if (isfunction(type)) {
        type = autocreateclass(type);
    }
    initclass = type;
    if (isclassextendsHTMLElement(initclass)) {
        RandomDefineCustomElement(initclass);
        return construct(initclass, [ propsjson, children ]);
    } else {
        console.error(initclass);
        console.error(invalid_custom_element_class);
        throw TypeError();
    }
}

const componentsymbol = Symbol("component");

function iscomponent(a) {
    return isfunction(a) && get(a, componentsymbol) === componentsymbol;
}

function isconnected(element) {
    const isConnectedstate = element.isConnected;
    if (isboolean(isConnectedstate)) {
        return isConnectedstate;
    } else {
        return document.documentElement === getancestornode(element);
    }
}

function getancestornode(node) {
    while (node && node.parentNode && node.parentNode !== document) {
        node = node.parentNode;
    }
    return node;
}

const directive = {};

const eventlistenerssymbol = Symbol("eventlisteners");

function onevent(element, eventname, callback) {
    firstaddlisteners(element, eventname, toArray(callback));
}

function firstaddlisteners(ele, event, callarray) {
    const element = ele;
    callarray.forEach(call => {
        if (!isfunction(call)) {
            console.error(call);
            console.error(invalid_Function);
            throw TypeError();
        }
        if (!has(element, eventlistenerssymbol)) {
            set(element, eventlistenerssymbol, []);
        }
        get(ele, eventlistenerssymbol).push([ event, call ]);
        domaddlisten(ele, event, call);
    });
}

function removelisteners(ele) {
    if (has(ele, eventlistenerssymbol)) {
        get(ele, eventlistenerssymbol).forEach(([event, call]) => {
            domremovelisten(ele, event, call);
        });
    }
}

function readdlisteners(ele) {
    if (has(ele, eventlistenerssymbol)) {
        get(ele, eventlistenerssymbol).forEach(([event, call]) => {
            domaddlisten(ele, event, call);
        });
    }
}

function handleprops(element, vdom) {
    vdom.element.push(element);
    ((element, vdom) => {
        Object.entries(vdom.directives).forEach(([name, value]) => {
            const direfun = directive[name];
            if (isfunction(direfun)) {
                direfun(value, element, vdom, call => {
                    addmountedlistner(element, call);
                }, call => {
                    addunmountedlistner(element, call);
                }, call => {
                    addupdatedlistner(element, call);
                });
            } else {
                console.error(vdom.directives);
                console.error("invalid directives " + name);
                throw new Error;
            }
        });
        const attribute1 = createeleattragentreadwrite(element);
        Object.assign(attribute1, vdom.props);
        Object.entries(vdom.bindattr).forEach(([key, primitivestate]) => {
            attribute1[key] = primitivestate.valueOf();
            watch(primitivestate, () => {
                const state = primitivestate;
                if (isconnected(element)) {
                    attribute1[key] = state.valueOf();
                }
            });
        });
        Object.entries(vdom.onevent).forEach(([event, callbacks]) => {
            onevent(element, event, callbacks);
        });
    })(element, vdom);
    [ ...Object.values(vdom.bindattr), ...Object.values(vdom.directives) ].flat(1 / 0).filter(e => isReactiveState(e)).forEach(e => {
        if (!has(element, bindstatesymbol)) {
            set(element, bindstatesymbol, new Set);
        }
        get(element, bindstatesymbol).add(e);
    });
}

const bindstatesymbol = Symbol("bindstate");

function throwinvalideletype(type) {
    console.error(type);
    console.error("invalid element type!");
    console.error(invalid_Virtualdom);
    throw TypeError();
}

function render(vdom, namespace) {
    if (isarray(vdom)) {
        return vdom.map(a => render(a)).flat(1 / 0);
    }
    if (isnumber(vdom) || isstring(vdom)) {
        const textnode = createtextnode(vdom);
        return textnode;
    } else if (isReactiveState(vdom)) {
        const reactive = vdom;
        const textnode = createtextnode(String(reactive));
        watch(reactive, () => {
            const state = reactive;
            if (isconnected(element)) {
                changetext(textnode, String(state));
            }
        });
        const element = textnode;
        set(element, bindstatesymbol, new Set);
        get(element, bindstatesymbol).add(reactive);
        return textnode;
    } else if (isVirtualdom(vdom)) {
        let {type: type} = vdom;
        if (isfunction(type)) {
            type = autocreateclass(type);
        }
        let element = undefined;
        if (typeof type === "string") {
            if (type === "script") {
                return createElementNS("never", "script");
            } else if (type === "svg") {
                element = createsvgelement();
            } else if (type === "math") {
                element = createmathelement();
            } else if ("" === type) {
                const fragmentnode = createDocumentFragment();
                mountrealelement(render(vdom.children), fragmentnode);
                return fragmentnode;
            } else if (type === "html") {
                const fragmentnode = createElementNS("never", "html");
                mountrealelement(render(vdom.children), fragmentnode);
                return fragmentnode;
            } else {
                element = namespace ? createElementNS(namespace, type) : createnativeelement(type);
            }
        } else if (typeof type == "function") {
            if (isobject(type["defaultProps"])) {
                Object.assign(vdom.props, JSON.parse(JSON.stringify({
                    ...type["defaultProps"],
                    ...vdom.props
                })));
            }
            const propsjson = JSON.parse(JSON.stringify({
                ...vdom.props,
                ...Object.fromEntries(Object.entries(vdom.bindattr).map(([key, value]) => [ key, value.value ]))
            }));
            element = createcostumelemet(type, propsjson, vdom.children);
        } else {
            throwinvalideletype(vdom);
        }
        dispatchcreated(element);
        if (type && (isfunction(type) || isstring(type))) {
            if (!iscomponent(type)) {
                if (element) {
                    mountrealelement(vdom.children.map(e => {
                        if (type === "svg" && isVirtualdom(e)) {
                            return render(e, svgnamespace);
                        } else if (type === "math" && isVirtualdom(e)) {
                            return render(e, mathnamespace);
                        } else if (namespace && isVirtualdom(e)) {
                            return render(e, namespace);
                        } else {
                            return render(e);
                        }
                    }), element);
                }
            }
        }
        if (element) {
            handleprops(element, vdom);
        }
        return element;
    } else {
        throwinvalideletype(vdom);
    }
}

function isNodeArray(arr) {
    return !!(isarray(arr) && arr.length && arr.every(a => isNode(a)));
}

function isNode(a) {
    return a instanceof Node;
}

const invalid_Virtualdom = "invalid Virtualdom ";

function MountElement(vdom, container) {
    if (isarray(vdom)) {
        vdom = vdom.flat(Infinity);
        if (!vdom.length) {
            console.error("Empty array not allowed");
            throw new TypeError;
        }
    }
    const el = container;
    if (!(el instanceof HTMLElement)) {
        console.error(el);
        console.error("invalid container HTMLElement!");
        throw TypeError();
    }
    if (el === document.body || el === document.documentElement || el === document.head) {
        console.error(el);
        console.error("Do not mount  to <html> or <body> <head>.");
        throw Error();
    }
    const elesarray = toArray(vdom);
    if (isvalidvdom(vdom)) {
        mountrealelement(render(elesarray), container);
    } else if (isNode(vdom) || isNodeArray(vdom)) {
        mountrealelement(elesarray, container);
    } else {
        console.error(vdom);
        console.error(invalid_Virtualdom);
        throw TypeError();
    }
    return container;
}

function readonlyproxy(target) {
    return new Proxy(target, {
        set() {
            return true;
        },
        defineProperty() {
            return false;
        },
        deleteProperty() {
            return false;
        },
        setPrototypeOf() {
            return false;
        }
    });
}

const componentsstylesheet = new Map;

function createlinkstylesheet(url) {
    return render(h("link", {
        href: url,
        rel: "stylesheet"
    }));
}

function isCSSStyleRule(a) {
    return gettagtype(a) === "CSSStyleRule";
}

function isCSSMediaRule(a) {
    return gettagtype(a) === "CSSMediaRule";
}

function isCSSImportRule(a) {
    return gettagtype(a) === "CSSImportRule";
}

function cssrulestocsstext(cssrules) {
    return cssrules.map(c => c.cssText).join("\n");
}

function prefixcssmediarule(cssrule, prefix) {
    const rulesarr = prefixcssrules([ ...cssrule.cssRules ], prefix);
    const conditionText = cssrule.conditionText;
    const cssText = cssrule.cssText.slice(0, 7) + conditionText + "{" + cssrulestocsstext(rulesarr) + "}";
    return {
        cssText: cssText,
        conditionText: conditionText,
        cssRules: rulesarr,
        [Symbol.toStringTag]: "CSSMediaRule"
    };
}

function createcssBlob(source) {
    const cachedBlob = sourcecssblobCache.get(source);
    if (cachedBlob) {
        return cachedBlob;
    } else {
        const bloburl = URL.createObjectURL(new Blob([ source ], {
            type: "text/css"
        }));
        sourcecssblobCache.set(source, bloburl);
        return bloburl;
    }
}

const sourcecssblobCache = new Map;

function savestyleblob(tagname, csstext, urltext) {
    tagname = tagname.toLowerCase();
    const prefix = tagname;
    if (!get(componentsstylesheet, prefix)) {
        set(componentsstylesheet, tagname, new Set);
    }
    if (csstext) {
        get(componentsstylesheet, prefix).add(createcssBlob(csstext));
    } else if (urltext) {
        get(componentsstylesheet, prefix).add(urltext);
    }
}

function selectoraddprefix(cssstylerule, prefix) {
    const selectorold = cssstylerule.selectorText;
    const stylebodyold = cssstylerule.cssText.slice(selectorold.length);
    const selectorTextss = selectorold;
    const selectorarray = selectorTextss.split(",");
    const selectoraftertransform = selectorarray.map(selectorTextone => {
        let prefixselector = prefix + " " + selectorTextone;
        if (selectorTextone.startsWith("*")) {
            prefixselector = prefixselector + "," + selectorTextone.replace("*", prefix);
        }
        return prefixselector;
    }).join(",");
    return {
        selectorText: selectoraftertransform,
        cssText: selectoraftertransform + stylebodyold,
        [Symbol.toStringTag]: "CSSStyleRule"
    };
}

function prefixcssrules(cssRulesarray, prefix) {
    return cssRulesarray.map(cssrule => {
        if (isCSSStyleRule(cssrule)) {
            const resultoutput = selectoraddprefix(cssrule, prefix);
            return resultoutput;
        } else if (isCSSMediaRule(cssrule)) {
            return prefixcssmediarule(cssrule, prefix);
        } else if (isCSSImportRule(cssrule)) {
            savestyleblob(prefix, undefined, cssrule.href);
            return;
        } else {
            return cssrule;
        }
    }).filter(Boolean);
}

function parsecsstext(text) {
    const styleelement = render(h("style", [ text ]));
    const otherdocument = createanotherhtmldocument();
    appendchild(otherdocument.documentElement, styleelement);
    return Array.from(get(get(styleelement, "sheet"), "cssRules"));
}

function transformcsstext(text, prefix) {
    const cachedtext = oldcsstotransformedcss.get(text);
    if (cachedtext) {
        return cachedtext;
    } else {
        const css = text;
        const cssomold = parsecsstext(css);
        const cssomnew = prefixcssrules(cssomold, prefix).filter(Boolean);
        const cssnewtext = cssrulestocsstext(cssomnew);
        oldcsstotransformedcss.set(text, cssnewtext);
        return cssnewtext;
    }
}

const oldcsstotransformedcss = new Map;

function registercssprefix(text, prefix) {
    const css = text;
    const cssnewtext = transformcsstext(css, prefix);
    savestyleblob(prefix, cssnewtext);
}

function loadlinkstyle(stylelinkelement, container) {
    return new Promise(rs => {
        const loaderrorfun = () => {
            stylelinkelement.onload = stylelinkelement.onerror = null;
            rs();
        };
        stylelinkelement.onload = loaderrorfun;
        stylelinkelement.onerror = loaderrorfun;
        appendchild(container, stylelinkelement);
    });
}

function waitloadallstyle(prefix, containerthis) {
    return Promise.all([ ...get(componentsstylesheet, prefix) ].map(styleurl => {
        if (querySelectorAll(`link[rel="stylesheet"][href="${styleurl}"]`).length) {
            return Promise.resolve();
        } else {
            return loadlinkstyle(createlinkstylesheet(styleurl), containerthis);
        }
    }));
}

function setimmediate(fun) {
    return Promise.resolve().then(() => fun());
}

function onmounted(ele) {
    if (isarray(ele)) {
        ele.forEach(e => {
            onmounted(e);
        });
    } else if (isNode(ele)) {
        readdlisteners(ele);
        if (has(ele, bindstatesymbol)) {
            get(ele, bindstatesymbol).forEach(state => {
                rewatch(state);
                state[dispatchsymbol]();
            });
        }
        if (has(ele, innerstatesymbol)) {
            get(ele, innerstatesymbol).forEach(state => {
                rewatch(state);
            });
        }
        if (has(ele, innerwatchrecords)) {
            const watchrecords = get(ele, innerwatchrecords);
            watchrecords.forEach(([state, eventlistener]) => {
                if (eventlistener) {
                    state[addonelistner](eventlistener);
                }
            });
        }
        onmounted(getchildNodes(ele));
    }
}

function onunmounted(ele) {
    if (isarray(ele)) {
        ele.forEach(e => {
            onunmounted(e);
        });
    } else if (isNode(ele)) {
        removelisteners(ele);
        if (has(ele, innerstatesymbol)) {
            get(ele, innerstatesymbol).forEach(state => {
                unwatch(state);
            });
        }
        if (has(ele, innerwatchrecords)) {
            const watchrecords = get(ele, innerwatchrecords);
            watchrecords.forEach(([state, eventlistener]) => {
                if (eventlistener) {
                    state[removeonelistner](eventlistener);
                }
            });
        }
        onunmounted(getchildNodes(ele));
    }
}

const readysymbol = Symbol("readystate");

var _a$1;

const attributeChangedCallback = Symbol("attributeChanged");

const firstinstalledcallback = Symbol("firstinstalled");

function connectedCallback(componentelement) {
    AttrChange.prototype.connectedCallback.call(componentelement);
}

function disconnectedCallback(componentelement) {
    AttrChange.prototype.disconnectedCallback.call(componentelement);
}

class AttrChange extends HTMLElement {
    constructor() {
        super();
        this[_a$1] = false;
        const defaultProps = get(this.constructor, "defaultProps");
        const attrs = createeleattragentreadwrite(this);
        if (isobject(defaultProps)) {
            Object.assign(attrs, defaultProps);
        }
        new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type == "attributes") {
                    console.log("The " + mutation.attributeName + " attribute was modified.");
                    const callback = get(this, attributeChangedCallback);
                    let qualifiedName = mutation.attributeName;
                    if (qualifiedName && isfunction(callback)) {
                        callback.call(this, qualifiedName);
                    }
                }
            });
        }).observe(this, {
            attributes: true
        });
    }
    disconnectedCallback() {
        setimmediate(() => {
            onunmounted(this);
        });
    }
    connectedCallback() {
        setimmediate(() => {
            if (!this[readysymbol]) {
                this[readysymbol] = true;
                const callback = get(this, firstinstalledcallback);
                if (isfunction(callback)) {
                    setimmediate(() => {
                        callback.call(this);
                    });
                }
            }
            onmounted(this);
        });
    }
}

_a$1 = readysymbol;

function getcreated() {
    return createdctx.getall();
}

function getupdated() {
    return updatedctx.getall();
}

const waittranformcsssymbol = Symbol("waittranformcss");

const innerwatchrecords = Symbol("innerwatchrecord");

const innerstatesymbol = Symbol("innerstate");

const attributessymbol = Symbol("attributes");

const elementsymbol = Symbol("innerelement");

const inner_vdom_symbol = Symbol("innervdom");

function createComponentold(custfun) {
    var _a, _b, _c;
    if (isfunction(custfun)) {
        const cached_class = cached_create_componet.get(custfun);
        if (cached_class) {
            return cached_class;
        }
        const defaultProps = get(custfun, "defaultProps");
        const css = get(custfun, "css");
        class Component extends AttrChange {
            constructor(propsjson = {}, children = []) {
                super();
                this[_a] = {};
                this[_c] = false;
                const css = get(this.constructor, "css");
                if (css) {
                    const prefix = this.tagName.toLowerCase();
                    if (!get(componentsstylesheet, prefix)) {
                        set(componentsstylesheet, prefix, new Set);
                        this[waittranformcsssymbol] = () => setimmediate(() => {
                            registercssprefix(css, prefix);
                        });
                    }
                }
                const attrs = createeleattragentreadwrite(this);
                if (isobject(propsjson)) {
                    Object.assign(attrs, propsjson);
                }
                const props = attrs;
                openctx();
                const thisattributess = Object.fromEntries(Object.entries(props).map(([key]) => [ key, (() => {
                    const attributes = createeleattragentreadwrite(this);
                    const state = new ReactiveState;
                    defineProperty(state, "value", {
                        get() {
                            return get(attributes, key);
                        },
                        configurable: true
                    });
                    return state;
                })() ]));
                this[attributessymbol] = thisattributess;
                const readonlyprop = readonlyproxy(Object.fromEntries(Object.entries(thisattributess).map(([key, value]) => [ key, readonlyproxy(value) ])));
                let possiblyvirtualdom;
                try {
                    possiblyvirtualdom = apply(custfun, undefined, [ readonlyprop, children.flat(1 / 0) ]);
                } catch (error) {
                    closectx();
                    console.error("error in component");
                    throw error;
                }
                possiblyvirtualdom = toArray(possiblyvirtualdom);
                if (isvalidvdom(possiblyvirtualdom)) {
                    const vdomarray = toArray(possiblyvirtualdom);
                    this[inner_vdom_symbol] = vdomarray.flat(Infinity).filter(Boolean);
                    const mountedcallbacks = getMounted();
                    const unmountedcallbacks = getUnMounted();
                    const createdcallbacks = getcreated();
                    const updatedcallbacks = getupdated();
                    this[innerstatesymbol] = getstates();
                    this[innerwatchrecords] = getwatchrecords();
                    closectx();
                    mountedcallbacks.forEach(callback => {
                        addmountedlistner(this, callback);
                    });
                    unmountedcallbacks.forEach(callback => {
                        addunmountedlistner(this, callback);
                    });
                    createdcallbacks.forEach(callback => {
                        addcreatedlistner(this, callback);
                    });
                    updatedcallbacks.forEach(callback => {
                        addupdatedlistner(this, callback);
                    });
                } else {
                    closectx();
                    console.error(possiblyvirtualdom);
                    console.error(invalid_Virtualdom);
                    throw TypeError();
                }
            }
            [(_a = attributessymbol, _b = componentsymbol, _c = readysymbol, firstinstalledcallback)]() {
                const thencallbackfirst = () => {
                    seteletext(this, "");
                    return waitloadallstyle(prefix, document.head);
                };
                const thencallbacksecond = () => {
                    mountrealelement(this[elementsymbol], this, false);
                    this[waittranformcsssymbol] = undefined;
                };
                if (!this[elementsymbol]) {
                    const innervdom = this[inner_vdom_symbol];
                    if (innervdom) {
                        this[elementsymbol] = render(innervdom).flat(Infinity);
                        this[inner_vdom_symbol] = [];
                    }
                }
                const css = get(this.constructor, "css");
                const prefix = this.tagName.toLowerCase();
                if (css) {
                    const waitcallback = this[waittranformcsssymbol];
                    if (waitcallback) {
                        waitcallback().then(thencallbackfirst).then(thencallbacksecond);
                    } else {
                        Promise.resolve(thencallbackfirst).then(thencallbacksecond);
                    }
                } else {
                    mountrealelement(this[elementsymbol], this);
                }
            }
            connectedCallback() {
                setimmediate(() => {
                    connectedCallback(this);
                });
            }
            disconnectedCallback() {
                setimmediate(() => {
                    disconnectedCallback(this);
                });
            }
            [attributeChangedCallback](name) {
                if (this[readysymbol]) {
                    {
                        const propreactivestate = this[attributessymbol][name];
                        if (propreactivestate) {
                            propreactivestate[dispatchsymbol]();
                        }
                    }
                }
            }
        }
        Component[_b] = componentsymbol;
        Component.css = isstring(css) && css ? css : undefined;
        Component.defaultProps = isobject(defaultProps) ? JSON.parse(JSON.stringify(defaultProps)) : undefined;
        cached_create_componet.set(custfun, Component);
        return Component;
    } else {
        console.error(custfun);
        console.error(invalid_Function);
        throw TypeError();
    }
}

const createComponent = custfun => autocreateclass(custfun);

function autocreateclass(custfun) {
    if (isclassextendsHTMLElement(custfun)) {
        return custfun;
    } else if (isfunction(custfun)) {
        return createComponentold(custfun);
    } else {
        throw TypeError();
    }
}

function h(type, propsorchildren, ...children) {
    if (isfunction(type)) {
        type = autocreateclass(type);
    }
    if (isarray(propsorchildren)) {
        return apply(createElement, undefined, [ type, undefined, [ ...propsorchildren, ...children ].flat(1 / 0) ]);
    } else {
        return apply(createElement, undefined, [ type, propsorchildren, ...children ]);
    }
}

function createElement(type, props = {}, ...children) {
    let typenormalized = isstring(type) || isfunction(type) ? type : "";
    const propsnormalized = isplainobject(props) ? props : {};
    const childrennormalized = children.flat(Infinity).map(a => a === 0 ? "0" : a).filter(a => !!a);
    if (isstring(typenormalized)) {
        typenormalized = typenormalized.trim().toLowerCase();
    }
    if ("" === typenormalized) {
        return childrennormalized;
    } else {
        return apply(createVirtualElement, undefined, [ typenormalized, propsnormalized, childrennormalized ]);
    }
}

const invalid_ReactiveState = "invalid ReactiveState";

const truevdomsymbol = Symbol("truevdom");

const falsevdomsymbol = Symbol("falsevdom");

const trueelesymbol = Symbol("trueele");

const falseelesymbol = Symbol("falseele");

const handletrue = Symbol("handletrue");

const handlefalse = Symbol("handlefalse");

const currentelementsymbol = Symbol("currentelement");

const Condition = function(conditon, iftrue, iffalse) {
    var _a, _b, _c, _d, _e;
    if (!(isReactiveState(conditon) || isboolean(conditon))) {
        console.error(conditon);
        console.error(invalid_ReactiveState);
        throw TypeError();
    }
    [ iftrue, iffalse ].forEach(a => {
        if (!(isundefined(a) || isVirtualdom(a) || isstring(a))) {
            console.error(a);
            console.error(invalid_Virtualdom);
            throw new TypeError;
        }
    });
    const optionstrue = iftrue;
    const optionsfalse = iffalse;
    class Condition extends AttrChange {
        constructor() {
            super(...arguments);
            this[_a] = this;
            this[_c] = false;
            this[_d] = toArray(optionstrue);
            this[_e] = toArray(optionsfalse);
        }
        [(_a = currentelementsymbol, _b = componentsymbol, _c = readysymbol, _d = truevdomsymbol, 
        _e = falsevdomsymbol, handlefalse)]() {
            if (!this[falseelesymbol]) {
                this[falseelesymbol] = render(this[falsevdomsymbol]);
                this[falsevdomsymbol] = [];
            }
            const elementtomount = this[falseelesymbol][0] || this;
            replaceChild(elementtomount, this[currentelementsymbol]);
            this[currentelementsymbol] = elementtomount;
        }
        [handletrue]() {
            if (!this[trueelesymbol]) {
                this[trueelesymbol] = render(this[truevdomsymbol]);
                this[truevdomsymbol] = [];
            }
            const elementtomount = this[trueelesymbol][0] || this;
            replaceChild(elementtomount, this[currentelementsymbol]);
            this[currentelementsymbol] = elementtomount;
        }
        [firstinstalledcallback]() {
            const handleconditionchange = trueorfalse => {
                if (true === trueorfalse) {
                    get(this, handletrue).call(this);
                } else if (!trueorfalse) {
                    get(this, handlefalse).call(this);
                }
            };
            if (isReactiveState(conditon)) {
                handleconditionchange(conditon.valueOf());
                watch(conditon, trueorfalse => {
                    handleconditionchange(trueorfalse);
                });
            } else {
                handleconditionchange(conditon);
            }
        }
        connectedCallback() {
            connectedCallback(this);
        }
        disconnectedCallback() {
            disconnectedCallback(this);
        }
    }
    Condition[_b] = componentsymbol;
    const vdom = h(Condition);
    return vdom;
};

const cancel_watch_symbol = Symbol("cancel_watch");

const cached_class_element = Symbol("cached_class_element");

const switch_mount_symbol = Symbol("switch_mount");

function Switchable(funstate) {
    var _a, _b, _c;
    if (!isReactiveState(funstate)) {
        console.error(funstate);
        throw new TypeError;
    }
    class Switchable extends AttrChange {
        constructor() {
            super(...arguments);
            this[_a] = new WeakMap;
            this[_c] = false;
        }
        disconnectedCallback() {
            setimmediate(() => {
                disconnectedCallback(this);
                if (isfunction(this[cancel_watch_symbol])) {
                    this[cancel_watch_symbol]();
                }
            });
        }
        [(_a = cached_class_element, _b = componentsymbol, _c = readysymbol, switch_mount_symbol)](eleclass) {
            eleclass = autocreateclass(eleclass);
            const eleme = this[cached_class_element].get(eleclass);
            if (eleme) {
                mountrealelement(eleme, this);
            } else {
                const elementreal = render(h(eleclass));
                this[cached_class_element].set(eleclass, elementreal);
                mountrealelement(elementreal, this);
            }
        }
        [firstinstalledcallback]() {
            const callmountswitch = () => {
                this[switch_mount_symbol](funstate.valueOf());
            };
            callmountswitch();
            this[cancel_watch_symbol] = watch(funstate, () => {
                callmountswitch();
            });
        }
        connectedCallback() {
            connectedCallback(this);
        }
    }
    Switchable[_b] = componentsymbol;
    return h(Switchable);
}

var n$1 = function(t, s, r, e) {
    var u;
    s[0] = 0;
    for (var h = 1; h < s.length; h++) {
        var p = s[h++], a = s[h] ? (s[0] |= p ? 1 : 2, r[s[h++]]) : s[++h];
        3 === p ? e[0] = a : 4 === p ? e[1] = Object.assign(e[1] || {}, a) : 5 === p ? (e[1] = e[1] || {})[s[++h]] = a : 6 === p ? e[1][s[++h]] += a + "" : p ? (u = t.apply(a, n$1(t, a, r, [ "", null ])), 
        e.push(u), a[0] ? s[0] |= 2 : (s[h - 2] = 0, s[h] = u)) : e.push(a);
    }
    return e;
}, t$1 = new Map;

function htm(s) {
    var r = t$1.get(this);
    return r || (r = new Map, t$1.set(this, r)), (r = n$1(this, r.get(s) || (r.set(s, r = function(n) {
        for (var t, s, r = 1, e = "", u = "", h = [ 0 ], p = function(n) {
            1 === r && (n || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h.push(0, n, e) : 3 === r && (n || e) ? (h.push(3, n, e), 
            r = 2) : 2 === r && "..." === e && n ? h.push(4, n, 0) : 2 === r && e && !n ? h.push(5, 0, !0, e) : r >= 5 && ((e || !n && 5 === r) && (h.push(r, 0, e, s), 
            r = 6), n && (h.push(r, n, 0, s), r = 6)), e = "";
        }, a = 0; a < n.length; a++) {
            a && (1 === r && p(), p(a));
            for (var l = 0; l < n[a].length; l++) t = n[a][l], 1 === r ? "<" === t ? (p(), h = [ h ], 
            r = 3) : e += t : 4 === r ? "--" === e && ">" === t ? (r = 1, e = "") : e = t + e[0] : u ? t === u ? u = "" : e += t : '"' === t || "'" === t ? u = t : ">" === t ? (p(), 
            r = 1) : r && ("=" === t ? (r = 5, s = e, e = "") : "/" === t && (r < 5 || ">" === n[a][l + 1]) ? (p(), 
            3 === r && (h = h[0]), r = h, (h = h[0]).push(2, 0, r), r = 0) : " " === t || "\t" === t || "\n" === t || "\r" === t ? (p(), 
            r = 2) : e += t), 3 === r && "!--" === e && (r = 4, h = h[0]);
        }
        return p(), h;
    }(s)), r), arguments, [])).length > 1 ? r : r[0];
}

function htmlold(...inargs) {
    return apply(htm, h, inargs);
}

function html(...args) {
    const prevdom = toArray(htmlold(...args));
    const vdom = prevdom.length === 1 ? prevdom[0] : prevdom;
    if (isvalidvdom(vdom)) {
        return vdom;
    } else {
        console.error(vdom);
        console.error(invalid_Virtualdom);
        throw new TypeError;
    }
}

function createRef(value) {
    return {
        value: value
    };
}

function createhtmlandtextdirective(seteletext, errorname, ele, text) {
    {
        const element = ele;
        if (isstring(text)) {
            requestAnimationFrame(() => {
                seteletext(ele, text);
            });
        } else if (isReactiveState(text)) {
            watch(text, () => {
                const state = text;
                if (isconnected(element)) {
                    seteletext(ele, String(state));
                }
            });
            requestAnimationFrame(() => {
                seteletext(ele, String(text));
            });
        } else {
            console.error(text);
            console.error("invalid " + errorname);
            throw TypeError();
        }
    }
}

function extenddirectives(name, fun) {
    if (!isstring(name)) {
        console.error(name);
        throw new TypeError;
    }
    if (typeof fun !== "function") {
        console.error(fun);
        console.error(invalid_Function);
        throw TypeError();
    } else {
        if (!directive[name]) {
            Reflect.set(directive, name, fun);
        } else {
            console.error(directive);
            console.error("can not extend existing directive");
            throw new Error;
        }
    }
}

function model(types, bindattribute, domprop, eventnames, value, vdom) {
    if (!isReactiveState(value)) {
        console.error(value);
        console.error(invalid_ReactiveState + invalid_Virtualdom);
        throw TypeError();
    }
    if (types.includes(vdom.type)) {
        set(vdom.bindattr, bindattribute, value);
        eventnames.forEach(eventname => {
            const origin = vdom.onevent[eventname];
            const eventsarray = toArray(origin);
            set(vdom.onevent, eventname, toArray([ ...eventsarray, e => value.value = get(e.target, domprop) ]).filter(Boolean));
        });
    } else {
        console.error(vdom);
        console.error(invalid_ReactiveState + invalid_Virtualdom);
        throw TypeError();
    }
}

extenddirectives("ref", (ref, ele, _vdom) => {
    if (isfunction(ref)) {
        apply(ref, undefined, [ ele ]);
    } else if (isobject(ref)) {
        set(ref, "value", ele);
    } else {
        console.log(_vdom);
        console.error(ref);
        console.error("invalid ref");
        throw TypeError();
    }
});

extenddirectives("html", (html, ele, _vdom) => {
    if (isstring(html) || isReactiveState(html)) {
        console.log(_vdom);
        createhtmlandtextdirective(setelehtml, "html", ele, html);
    } else {
        throw new TypeError;
    }
});

extenddirectives("text", (text, ele, _vdom) => {
    if (isstring(text) || isReactiveState(text)) {
        console.log(_vdom);
        createhtmlandtextdirective(seteletext, "text", ele, text);
    } else {
        throw new TypeError;
    }
});

extenddirectives("value", (value, element, vdom) => {
    if (isReactiveState(value)) {
        console.log(element);
        model([ "input", "textarea", "select" ], "value", "value", [ "change", "input" ], value, vdom);
    } else {
        throw new TypeError;
    }
});

extenddirectives("checked", (value, element, vdom) => {
    if (!isReactiveState(value)) {
        throw new TypeError;
    }
    console.log(element);
    model([ "input" ], "checked", "checked", [ "change" ], value, vdom);
    const eventname = "click";
    const origin = toArray(vdom.onevent[eventname]);
    const eventsarray = origin;
    const dispatchallsamename = event => {
        const inputelement = event.target;
        const name = event.target.name;
        if (name) {
            querySelectorAll(`input[name=${name}]`).filter(ele => ele !== inputelement).forEach(element => {
                element.dispatchEvent(new Event("change"));
            });
        }
    };
    set(vdom.onevent, eventname, toArray([ ...eventsarray, dispatchallsamename ]).filter(Boolean));
});

const Directives = extenddirectives;

Directives("mounted", (call, ele, vdom, onmount, onunmount) => {
    console.log([ call, ele, vdom, onmount, onunmount ]);
    if (typeof call === "function") {
        apply(onmount, undefined, [ call ]);
    } else {
        throw new TypeError;
    }
});

Directives("unmounted", (call, ele, vdom, onmount, onunmount) => {
    console.log([ call, ele, vdom, onmount, onunmount ]);
    if (typeof call === "function") {
        apply(onunmount, undefined, [ call ]);
    } else {
        throw new TypeError;
    }
});

Directives("updated", (call, ele, vdom, onmount, onunmount, onupdated) => {
    console.log([ call, ele, vdom, onmount, onunmount ]);
    if (typeof call === "function") {
        apply(onupdated, undefined, [ call ]);
    } else {
        throw new TypeError;
    }
});

Directives("created", (call, ele, vdom, onmount, onunmount, onupdated) => {
    console.log([ call, ele, vdom, onmount, onunmount, onupdated ]);
    if (typeof call === "function") {
        call();
    } else {
        throw new TypeError;
    }
});

function useCreated(fun) {
    createdctx.add(fun);
}

function useUpdated(fun) {
    updatedctx.add(fun);
}

function useMounted(fun) {
    mountedctx.add(fun);
}

function useUnMounted(fun) {
    unmountedctx.add(fun);
}

function getproperyreadproxy(a) {
    const __proto__ = "__proto__";
    const target = a;
    return new Proxy(target, {
        getOwnPropertyDescriptor(target, key) {
            if (issymbol(key)) {
                return;
            } else {
                return getOwnPropertyDescriptor(target, key);
            }
        },
        ownKeys(target) {
            let myvalue = get(target, "value");
            const myvalueobj = isobject(myvalue) ? myvalue : myvalue[__proto__];
            return Array.from(new Set([ ...ownKeys(target), ...ownKeys(myvalueobj) ]));
        },
        has(target, key) {
            const myvalue = get(target, "value");
            const myvalueobj = isobject(myvalue) ? myvalue : myvalue[__proto__];
            return has(target, key) || has(myvalueobj, key);
        },
        get(target, key) {
            if (has(target, key)) {
                return get(target, key);
            } else {
                const myvalue = get(target, "value");
                const myvalueobj = Object(myvalue);
                if (has(myvalueobj, key)) {
                    const property = get(myvalueobj, key);
                    return isfunction(property) ? property.bind(myvalueobj) : property;
                }
            }
        }
    });
}

const computed = function(state, callback, setter) {
    if (!((isarray(state) || isReactiveState(state)) && isfunction(callback))) {
        console.error(state);
        console.error(callback);
        console.error(invalid_ReactiveState + invalid_Function);
        throw TypeError();
    }
    const state1array = toArray(state);
    if (!state1array.length) {
        console.error("Empty array not allowed");
        throw new Error;
    }
    const state1 = Arraycomputed(state1array, callback, setter);
    return state1;
};

function Arraycomputed(state, callback, setter) {
    const reactivestate = new ReactiveState;
    const getter = () => {
        const value = apply(callback, undefined, state.map(st => st.valueOf()));
        const possiblevalue = isReactiveState(value) ? value.valueOf() : value;
        if (isobject(possiblevalue) || isprimitive(possiblevalue)) {
            return possiblevalue;
        } else {
            console.error(possiblevalue);
            throw TypeError();
        }
    };
    let memorized = getter();
    defineProperty(reactivestate, "value", {
        set: isfunction(setter) ? setter : undefined,
        get: getter,
        configurable: true
    });
    state.forEach(state => {
        watch(state, () => {
            let newvalue = getter();
            if (newvalue !== memorized) {
                reactivestate[dispatchsymbol]();
                memorized = newvalue;
            }
        });
    });
    return getproperyreadproxy(reactivestate);
}

const e$1 = Set.prototype, t$2 = Map.prototype;

function r$1(e) {
    return e instanceof Map;
}

function o$1(e) {
    return e instanceof Set;
}

function n$2(e) {
    return Array.isArray(e);
}

const l$1 = window.Reflect, {ownKeys: i$1, deleteProperty: c$1, apply: a$1, construct: d$1, defineProperty: f$1, get: u$1, getOwnPropertyDescriptor: p$1, getPrototypeOf: s$1, has: y$1, set: v, setPrototypeOf: g$1} = l$1;

function P(e) {
    return "object" == typeof e && null !== e;
}

function w$1(e) {
    return "function" == typeof e;
}

function S(l, h, O = [], x = l) {
    if (!w$1(h)) throw Error();
    if (l instanceof Promise || function(e) {
        return e instanceof RegExp;
    }(l) || function(e) {
        return e instanceof Date;
    }(l)) return l;
    if (w$1(l) || P(l)) {
        let E;
        return o$1(l) ? (E = new Set([ ...l ]), v(E, "add", t => (e$1.add.call(l, t), h(x, O, void 0, void 0), 
        e$1.add.call(E, t))), v(E, "delete", t => (e$1.delete.call(l, t), h(x, O, void 0, void 0), 
        e$1.delete.call(E, t))), v(E, "clear", () => (e$1.clear.call(l), h(x, O, void 0, void 0), 
        e$1.clear.call(E)))) : r$1(l) ? (E = new Map([ ...l ]), v(E, "clear", () => (t$2.clear.call(l), 
        h(x, O, void 0, void 0), t$2.clear.call(E))), v(E, "set", (e, r) => (t$2.set.call(l, e, r), 
        h(x, O, void 0, void 0), t$2.set.call(E, e, r))), v(E, "delete", e => (t$2.delete.call(l, e), 
        h(x, O, void 0, void 0), t$2.delete.call(E, e)))) : E = n$2(l) ? [] : w$1(l) ? () => {} : {}, 
        o$1(l) || r$1(l) || g$1(E, null), new Proxy(E, {
            defineProperty: (e, t, r) => (h(x, [ ...O, String(t) ], y$1(r, "value") ? r.value : w$1(r.get) ? r.get() : void 0, u$1(l, t)), 
            f$1(l, t, r)),
            deleteProperty: (e, t) => (h(x, [ ...O, String(t) ], void 0, u$1(l, t)), c$1(l, t)),
            ownKeys: () => i$1(l),
            has: (e, t) => y$1(l, t),
            getPrototypeOf: () => s$1(l),
            setPrototypeOf: (e, t) => g$1(l, t),
            construct(e, t) {
                if (w$1(l)) return d$1(l, t);
            },
            apply(e, t, r) {
                if (w$1(l)) return a$1(l, t, r);
            },
            getOwnPropertyDescriptor(e, t) {
                var r = p$1(l, t);
                return n$2(l) && "length" === t ? r : r ? (r.configurable = !0, r) : void 0;
            },
            set: (e, t, r) => (w$1(h) && h(x, [ ...O, String(t) ], r, u$1(l, t)), v(l, t, r)),
            get(e, t) {
                var n = u$1(l, t);
                return w$1(n) && (o$1(l) || r$1(l)) ? u$1(E, t).bind(E) : w$1(n) || P(n) ? S(n, h, [ ...O, String(t) ], l) : n;
            }
        });
    }
    return l;
}

function deepobserve(e, t) {
    if (!w$1(t)) throw Error();
    if (!w$1(Proxy)) throw Error();
    return w$1(e) || P(e) ? S(e, t) : e;
}

function handleobjectstate(init) {
    const reactive = new ReactiveState(init);
    let initobj = init;
    const containReactiveState = isplainobject(init) && Object.values(init).some(a => isReactiveState(a));
    const state_entries = Object.entries(init).filter(e => {
        const a = e[1];
        return isReactiveState(a);
    });
    if (containReactiveState) {
        initobj = Object.assign({}, init);
        state_entries.forEach(([key, state]) => {
            defineProperty(initobj, key, {
                enumerable: true,
                get() {
                    return state.valueOf();
                },
                set: nvalue => {
                    state.value = nvalue;
                },
                configurable: true
            });
        });
    }
    if (containReactiveState) {
        state_entries.forEach(([key, state]) => {
            watch(state, () => {
                reactive[dispatchsymbol]();
            });
        });
    }
    reactive.value = initobj;
    const objproxyhandler = {};
    objproxyhandler.ownKeys = target => Array.from(new Set([ ...ownKeys(target), ...ownKeys(get(target, "value")) ]));
    objproxyhandler.setPrototypeOf = () => false;
    objproxyhandler.defineProperty = () => false;
    objproxyhandler.getOwnPropertyDescriptor = (target, key) => {
        if (issymbol(key)) {
            return;
        }
        const myvalue = get(target, "value");
        const descripter = getOwnPropertyDescriptor(target, key) || getOwnPropertyDescriptor(myvalue, key);
        if (descripter) {
            descripter.configurable = true;
        }
        return descripter;
    };
    objproxyhandler.deleteProperty = (target, key) => {
        const myvalue = get(target, "value");
        if (has(myvalue, key)) {
            deleteProperty(myvalue, key);
            target[dispatchsymbol]();
            return true;
        } else {
            return true;
        }
    };
    objproxyhandler.has = (target, key) => {
        const myvalue = get(target, "value");
        return has(target, key) || has(myvalue, key);
    };
    objproxyhandler.get = (target, key) => {
        const value = get(target, "value");
        const deepflage = isarray(value) || isplainobject(value);
        if (key === "value" && deepflage) {
            return deepobserve(get(target, key), (_target_, patharray) => {
                target[dispatchsymbol]();
            });
        } else if (has(target, key)) {
            return get(target, key);
        } else if (has(value, key)) {
            const resultvalue = get(value, key);
            if (isSet(value)) {
                if (key === "add" || key === "clear" || key === "delete") {
                    switch (key) {
                      case "add":
                        {
                            return (add => {
                                if (!set_prototype.has.call(value, add)) {
                                    const returnvalue = set_prototype[key].call(value, add);
                                    target[dispatchsymbol]();
                                    return returnvalue;
                                }
                                return;
                            }).bind(value);
                        }

                      case "delete":
                        {
                            return (dele => {
                                if (set_prototype.has.call(value, dele)) {
                                    const returnvalue = set_prototype[key].call(value, dele);
                                    target[dispatchsymbol]();
                                    return returnvalue;
                                }
                                return;
                            }).bind(value);
                        }

                      case "clear":
                        {
                            return (() => {
                                if (value.size) {
                                    const returnvalue = set_prototype[key].call(value);
                                    target[dispatchsymbol]();
                                    return returnvalue;
                                }
                                return;
                            }).bind(value);
                        }
                    }
                } else {
                    return isfunction(resultvalue) ? resultvalue.bind(value) : resultvalue;
                }
            } else if (deepflage && (isarray(resultvalue) || isplainobject(resultvalue))) {
                return deepobserve(resultvalue, () => {
                    target[dispatchsymbol]();
                });
            } else {
                return resultvalue;
            }
        }
    };
    objproxyhandler.set = (target, key, value) => {
        if (isReactiveState(value)) {
            value = value.valueOf();
        }
        const myvalue = get(target, "value");
        if (key === "value" && isobject(value) && (isarray(init) && isarray(value) || !isarray(init) && !isarray(value))) {
            if (target[key] !== value) {
                set(target, key, value);
                target[dispatchsymbol]();
            }
            return true;
        } else if (!has(target, key)) {
            if (myvalue[key] !== value) {
                set(myvalue, key, value);
                target[dispatchsymbol]();
            }
            return true;
        } else {
            console.error(value);
            console.error(init);
            console.error(invalid_primitive_or_object_state);
            throw TypeError();
        }
    };
    return new Proxy(reactive, objproxyhandler);
}

const set_prototype = Set.prototype;

function createState(init) {
    if (isprimitive(init) || isfunction(init)) {
        return getproperyreadproxy(new Proxy(new ReactiveState(init), {
            defineProperty() {
                return false;
            },
            deleteProperty() {
                return false;
            },
            set(target, key, value) {
                if (key === "value" && (isprimitive(value) && isprimitive(init) || isfunction(value) && isfunction(init))) {
                    if (target[key] !== value) {
                        set(target, key, value);
                        target[dispatchsymbol]();
                    }
                    return true;
                } else {
                    console.error(value);
                    console.error(init);
                    console.error(invalid_primitive_or_object_state);
                    throw TypeError();
                }
            },
            setPrototypeOf() {
                return false;
            }
        }));
    } else if (isReactiveState(init)) {
        return createState(init.valueOf());
    } else if (isobject(init)) {
        return handleobjectstate(init);
    } else {
        throw Error();
    }
}

export { Condition, extenddirectives as Directives, MountElement, Switchable, computed, createComponent, h as createElement, createRef, createState, h, html, render, useCreated, useMounted, useUnMounted, useUpdated, watch };
//# sourceMappingURL=index.js.map
