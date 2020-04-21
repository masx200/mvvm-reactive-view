const globalThis = Function("return this")();

const self = globalThis;

const window = globalThis;

const global = globalThis;

const {
    WeakSet: WeakSet,
    WeakMap: WeakMap,
    Date: Date,
    RegExp: RegExp,
    Event: Event,
    requestAnimationFrame: requestAnimationFrame,
    URL: URL,
    Blob: Blob,
    Element: Element,
    Node: Node,
    String: String,
    Array: Array,
    document: document,
    Object: Object,
    Reflect: Reflect,
    Proxy: Proxy,
    Symbol: Symbol,
    Boolean: Boolean,
    Promise: Promise,
    Set: Set,
    Math: Math,
    Error: Error,
    TypeError: TypeError,
    JSON: JSON,
    Map: Map,
    clearTimeout: clearTimeout,
    setTimeout: setTimeout,
    parseInt: parseInt
} = globalThis;

function isObject(value) {
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

function debounce(func, wait = 0, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
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
    function invokeFunc(time) {
        var args = lastArgs || [],
            thisArg = lastThis;
        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = Reflect.apply(func, thisArg, args);
        return result;
    }
    function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            timeWaiting = wait - timeSinceLastCall;
        return maxing
            ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
            : timeWaiting;
    }
    function shouldInvoke(time) {
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
    function trailingEdge(time) {
        timerId = undefined;
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
    }
    function debounced(...args) {
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
    return debounced;
}

var debounce_1 = debounce;

function clearMounted() {
    mountedctx.clear();
}

function clearUnMounted() {
    unmountedctx.clear();
}

function isprimitive(a) {
    return (
        isstring(a) ||
        isnumber(a) ||
        isboolean(a) ||
        isundefined(a) ||
        isbigint(a)
    );
}

function isbigint(a) {
    return typeof a === "bigint";
}

function issymbol(a) {
    return typeof a === "symbol";
}

const isplainobject = (a) =>
    !!a &&
    gettagtype(a) === "Object" &&
    Reflect.getPrototypeOf(a) === Object.prototype;

function isundefined(a) {
    return (!a && a === void 0) || a === null;
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
    return Object.prototype.toString
        .call(a)
        .replace("[object ", "")
        .replace("]", "")
        .trim();
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

function checkctxandcallbck(callback) {
    if (isfunction(callback)) {
        if (ctxopen);
        else {
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
    let callbackset = new Set();
    const getall = () => [...callbackset];
    const clear = () => {
        callbackset = new Set();
    };
    const add = (fun) => {
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

let StateSet = new Set();

let watchrecord = [];

function getwatchrecords() {
    return [...watchrecord];
}

function clearwatch() {
    watchrecord = [];
}

const invalid_Function = "invalid Function";

const errormessage =
    "invalid useMounted or useUnMounted out of createComponent";

let ctxopen = false;

function getstates() {
    return [...StateSet];
}

function clearstate() {
    StateSet = new Set();
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

const cached_create_componet = new WeakMap();

const cached_callback_debounced_watchs = new WeakMap();

function toArray(a) {
    return (isarray(a) ? a : [a]).flat(1 / 0).filter((a) => !isundefined(a));
}

function useststerecord(state) {
    if (ctxopen) {
        StateSet.add(state);
    }
}

class ObserverTarget {
    constructor() {
        this.Listeners = new Set();
    }
    addListener(listener) {
        const listenerset = this.Listeners;
        listenerset.add(listener);
    }
    dispatch() {
        const listenerset = this.Listeners;
        listenerset.forEach((listener) => {
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

var _a, _b, _c;

const addonelistner = Symbol("addonelistner");

const removeonelistner = Symbol("removeonelistner");

const cancelsubscribe = Symbol("cancelsubscribe");

const debouncedispatch = Symbol("debouncedispatch");

const invalid_primitive_or_object_state = "invalid primitive or object state";

const Targetsymbol = Symbol("eventtatget");

const memlisteners = Symbol("memlisteners");

const dispatchsymbol = Symbol("dispatch");

const subscribesymbol = Symbol("subscribe");

const removeallistenerssymbol = Symbol("removeallisteners");

const addallistenerssymbol = Symbol("addallisteners");

const tagtypesym = Symbol("tagtype");

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
        this[_b] = new ObserverTarget();
        this[_c] = new Set();
        this.valueOf = () => this.value;
        if ("value" in init) {
            let value = init.value;
            this[tagtypesym] = gettagtype(value);
            Object.defineProperty(this, "value", {
                configurable: true,
                get: () => value,
                set: (v) => {
                    const tag = gettagtype(v);
                    if (tag !== this[tagtypesym]) {
                        throw TypeError();
                    }
                    value = v;
                }
            });
        } else {
            const getter = init.get;
            const setter = init.set;
            if (!getter) {
                throw TypeError();
            }
            this[tagtypesym] = gettagtype(getter());
            if (setter) {
                Object.defineProperty(this, "value", {
                    configurable: true,
                    get: getter,
                    set: (v) => {
                        const tag = gettagtype(v);
                        if (tag !== this[tagtypesym]) {
                            throw TypeError();
                        }
                        setter(v);
                    }
                });
            } else {
                Object.defineProperty(this, "value", {
                    configurable: true,
                    get: getter
                });
            }
        }
        useststerecord(this);
    }
    [((_a = debouncedispatch), removeallistenerssymbol)]() {
        this[memlisteners].forEach((callback) => {
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
        this[memlisteners].forEach((callback) => {
            this[addonelistner](callback);
        });
    }
    toString() {
        const value = this.valueOf();
        return isprimitive(value)
            ? String(value)
            : isSet(value)
            ? JSON.stringify([...value])
            : isobject(value)
            ? JSON.stringify(value)
            : "";
    }
    [((_b = Targetsymbol), (_c = memlisteners), dispatchsymbol)]() {
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
        return isprimitive(value)
            ? value
            : isobject(value)
            ? JSON.stringify(value)
            : void 0;
    }
}

function isReactiveState(a) {
    return (
        a instanceof ReactiveState && a[Symbol.toStringTag] === "ReactiveState"
    );
}

function usewatch(state, callback) {
    if (ctxopen) {
        watchrecord.push([state, callback]);
    }
}

function rewatch(state) {
    state[addallistenerssymbol]();
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

function watch(state, callback) {
    if (isarray(state) || isReactiveState(state)) {
        const statearray = toArray(state);
        if (!statearray.length) {
            console.error("Empty array not allowed");
            throw new Error();
        }
        const debouncedcallback = debounce_1(callback);
        const stateandlisteners = statearray.map((state1) => {
            const listener = (() => {
                const cachedfun = cached_callback_debounced_watchs.get(
                    callback
                );
                if (cachedfun) {
                    return cachedfun;
                } else {
                    const listenfun = () => {
                        debouncedcallback(
                            ...statearray.map((r) => r.valueOf())
                        );
                    };
                    cached_callback_debounced_watchs.set(callback, listenfun);
                    return listenfun;
                }
            })();
            watchsingle(state1, listener);
            return [state1, listener];
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
        throw new TypeError();
    }
}

const {
    apply: apply,
    construct: construct,
    defineProperty: defineProperty,
    deleteProperty: deleteProperty,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor,
    getPrototypeOf: getPrototypeOf,
    has: has,
    ownKeys: ownKeys,
    preventExtensions: preventExtensions
} = Reflect;

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

const t = ["input", "textarea", "option", "select"];

var e = (e, r, n) =>
    ("value" === r && t.includes(e) && "button" !== n) ||
    ("selected" === r && "option" === e) ||
    ("checked" === r && "input" === e) ||
    ("muted" === r && "video" === e);

function r(t) {
    return "string" == typeof t;
}

function n(t) {
    return "object" == typeof t && null !== t;
}

function o(t) {
    return t instanceof Set;
}

function i(t) {
    return t.tagName.toLowerCase();
}

const u = window.String,
    s = window.Reflect,
    { get: c, set: a, ownKeys: f } = s,
    p = (t) =>
        "input" === i(t) &&
        ("checkbox" === c(t, "type") || "radio" === c(t, "type")),
    l = /\B([A-Z])/g;

function y(t, e) {
    return t.getAttribute(e);
}

function h(t, e, r) {
    return t.setAttribute(e, r);
}

function d(t, e) {
    return t.removeAttribute(e);
}

var w,
    v = function(t, e) {
        if (!e.has(t))
            throw new TypeError(
                "attempted to get private field on non-instance"
            );
        return e.get(t);
    };

class g {
    constructor(t) {
        w.set(this, void 0),
            (function(t, e, r) {
                if (!e.has(t))
                    throw new TypeError(
                        "attempted to set private field on non-instance"
                    );
                e.set(t, r);
            })(this, w, t);
        const e = g.prototype;
        Reflect.ownKeys(e).forEach((t) => {
            let r = c(e, t);
            "function" == typeof r && a(this, t, r.bind(this));
        });
    }
    ownKeys() {
        const t = v(this, w),
            e = (function(t) {
                const e = i(t);
                return (
                    "textarea" === e ||
                    "select" === e ||
                    ("input" === e && "text" === c(t, "type"))
                );
            })(t),
            r = (function(t) {
                return t.getAttributeNames();
            })(t);
        return Array.from(
            new Set(
                [...r, p(t) ? "checked" : void 0, e ? "value" : void 0]
                    .flat(1 / 0)
                    .filter((t) => !!t)
            )
        );
    }
    get(t, n) {
        const o = v(this, w);
        if (e(i(o), u(n), c(o, "type"))) return c(o, u(n));
        {
            const t = y(o, u(n));
            if ("" === t) return !0;
            if (null === t) return;
            if (!r(t)) return;
            try {
                return JSON.parse(u(t));
            } catch (e) {
                return t;
            }
        }
    }
    set(t, s, f) {
        const p = v(this, w);
        if ("function" == typeof f) throw TypeError();
        if (e(i(p), u(s), c(p, "type"))) return a(p, u(s), f);
        if ("style" === s) {
            const t = r(f)
                ? f
                : n(f)
                ? ((g = f),
                  (g = JSON.parse(JSON.stringify(g))),
                  Object.entries(g)
                      .map(([t, e]) => {
                          return [
                              ((r = t),
                              r.replace(l, "-$1").toLowerCase()).trim(),
                              e
                          ];
                          var r;
                      })
                      .map(([t, e]) => t + ":" + e)
                      .join(";"))
                : u(f);
            return a(c(p, "style"), "cssText", t.trim()), !0;
        }
        if ("class" === s && n(f)) {
            const t =
                ((y = f),
                Array.isArray(y)
                    ? f.join(" ")
                    : o(f)
                    ? [...f].join(" ")
                    : u(f));
            return h(p, u(s), t), !0;
        }
        return !1 === f || null == f
            ? (d(p, u(s)), !0)
            : o(f)
            ? (h(p, u(s), JSON.stringify([...f])), !0)
            : (!0 === f && (f = ""),
              h(p, u(s), n(f) ? JSON.stringify(f) : u(f)),
              !0);
        var y, g;
    }
    deleteProperty(t, e) {
        return d(v(this, w), u(e)), !0;
    }
    has(t, e) {
        return (function(t, e) {
            return t.hasAttribute(e);
        })(v(this, w), u(e));
    }
    defineProperty() {
        return !1;
    }
    getOwnPropertyDescriptor(t, e) {
        const r = {
                enumerable: !0,
                configurable: !0,
                writable: !0
            },
            n = y(v(this, w), u(e));
        return void 0 !== n
            ? {
                  value: n,
                  ...r
              }
            : void 0;
    }
    setPrototypeOf() {
        return !1;
    }
}

w = new WeakMap();

const b = new WeakMap();

function createeleattragentreadwrite(t) {
    !(function(t) {
        if (!(t instanceof Element)) throw TypeError();
    })(t);
    const e = b.get(t);
    if (e) return e;
    var r = Object.create(null);
    const n = new g(t),
        o = new Proxy(r, n);
    return b.set(t, o), o;
}

function getcreated() {
    return createdctx.getall();
}

function getupdated() {
    return updatedctx.getall();
}

function istextnode(e) {
    return gettagtype(e) === "Text";
}

function gettextnodes(container) {
    return [...container.childNodes].filter((e) => istextnode(e));
}

const rootnode = document.body;

const connectedeventname = Symbol("mounted").toString();

const disconnectedeventname = Symbol("unmounted").toString();

const callback = function(mutations) {
    mutations.forEach(function(record) {
        console.log("Mutation: ", record);
        const addedNodes = [...record.addedNodes];
        addedNodes.forEach((e) => {
            if (e instanceof Element) {
                const subeles = [...e.querySelectorAll("*"), e];
                const subtexts = subeles.map((e) => gettextnodes(e));
                [...subeles, ...subtexts].flat(1 / 0).forEach((n) => {
                    dispatchconnected(n);
                });
            }
        });
        const removedNodes = [...record.removedNodes];
        removedNodes.forEach((e) => {
            if (e instanceof Element) {
                const subeles = [...e.querySelectorAll("*"), e];
                const subtexts = subeles.map((e) => gettextnodes(e));
                [...subeles, ...subtexts].flat(1 / 0).forEach((n) => {
                    dispatchdisconnected(n);
                });
            }
        });
    });
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

const updatedeventname = Symbol("updated").toString();

new MutationObserver((mutations) => {
    mutations.forEach(function(record) {
        console.log("Mutation: ", record);
        const target = record.target;
        dispatchupdated(target);
    });
}).observe(rootnode, {
    subtree: true,
    attributes: true,
    childList: true,
    characterData: true
});

function dispatchupdated(e) {
    e.dispatchEvent(
        new Event(updatedeventname, {
            bubbles: true
        })
    );
}

const createdeventname = Symbol("created").toString();

function dispatchcreated(e) {
    e.dispatchEvent(new Event(createdeventname));
}

function addcreatedlistner(ele, call) {
    ele.addEventListener(createdeventname, call, {
        once: true
    });
}

function addmountedlistner(ele, call) {
    ele.addEventListener(connectedeventname, call);
}

function addunmountedlistner(ele, call) {
    ele.addEventListener(disconnectedeventname, call);
}

function addupdatedlistner(ele, call) {
    ele.addEventListener(updatedeventname, call);
}

function addstopupdatelistener(ele) {
    ele.addEventListener(updatedeventname, (e) => {
        if (e.target !== ele && ele.tagName.includes("-")) {
            e.stopPropagation();
        }
    });
}

function merge_entries(a) {
    const m = {};
    a.forEach(([key, value]) => {
        if (!m[key]) {
            m[key] = new Set();
        }
        value.forEach((v) => {
            m[key].add(v);
        });
    });
    return Object.entries(m).map(([k, v]) => [k, [...v]]);
}

const VirtualElementSet = new WeakSet();

const Letter_case_and_Chinese = /[A-Za-z\u4e00-\u9fa5]/;

function isVirtualdom(a) {
    return VirtualElementSet.has(a);
}

function createVirtualElement(type, props = {}, children = []) {
    props = Object.assign({}, props);
    children = children.flat(1 / 0);
    const propsentries = Object.entries(props);
    const propsentriesNOTevents = propsentries.filter(
        ([key]) => !(key.startsWith("@") || key.startsWith("on"))
    );
    const Entries_beginning_with_a_letter = propsentriesNOTevents.filter(
        ([key]) => Letter_case_and_Chinese.test(key[0])
    );
    const virtual = Object.create(null);
    const vdom = virtual;
    ["onevent", "type", "props", "children", "directives", "bindattr"].forEach(
        (key) => {
            defineProperty(virtual, key, {
                writable: true,
                enumerable: false
            });
        }
    );
    Object.assign(virtual, {
        type: type,
        bindattr: Object.fromEntries(
            Entries_beginning_with_a_letter.filter((e) => isReactiveState(e[1]))
        ),
        props: Object.fromEntries(
            Entries_beginning_with_a_letter.filter(
                (e) => !isReactiveState(e[1])
            ).map(([key, value]) => [
                key,
                isstring(value) ? value.trim() : value
            ])
        ),
        children: children,
        onevent: Object.fromEntries(
            merge_entries([
                ...propsentries
                    .filter(([key]) => "@" == key[0])
                    .map(([key, value]) => [
                        key
                            .slice(1)
                            .toLowerCase()
                            .trim(),
                        [value].flat(1 / 0)
                    ]),
                ...propsentries
                    .filter(([key]) => key.startsWith("on"))
                    .map(([key, value]) => [
                        key
                            .slice(2)
                            .toLowerCase()
                            .trim(),
                        [value].flat(1 / 0)
                    ])
            ])
        ),
        directives: Object.fromEntries(
            propsentriesNOTevents
                .filter(([key]) => key[0] === "*" || key[0] === "$")
                .map(([key, value]) => [
                    key
                        .slice(1)
                        .toLowerCase()
                        .trim(),
                    value
                ])
        )
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
        return v.every((e) => isvalidvdom(e));
    } else if (isVirtualdom(v)) {
        return isvalidvdom(v.children);
    } else if (isReactiveState(v)) {
        return true;
    }
    return flag;
}

function isclassextendsHTMLElement(initclass) {
    return !!(
        isfunction(initclass) &&
        initclass.prototype &&
        initclass.prototype instanceof HTMLElement
    );
}

function getMounted() {
    return mountedctx.getall();
}

function getUnMounted() {
    return unmountedctx.getall();
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

function removeNode(node) {
    let parentNode = node.parentNode;
    if (parentNode) {
        parentNode.removeChild(node);
    }
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
    return [...ele.childNodes];
}

function createanotherhtmldocument() {
    return document.implementation.createHTMLDocument("");
}

function querySelectorAll(selector) {
    return [...document.querySelectorAll(selector)];
}

function mountrealelement(ele, container, clear = true) {
    if (clear) {
        seteletext(container, "");
    }
    const eles = toArray(ele);
    eles.forEach((e) => appendchild(container, e));
    return container;
}

const componentsymbol = Symbol("component");

function iscomponent(a) {
    return isfunction(a) && get(a, componentsymbol) === componentsymbol;
}

const charactorlist = Array(26)
    .fill(undefined)
    .map((v, i) => 97 + i)
    .map((n) => String.fromCharCode(n));

const hexnumberlist = Array(16)
    .fill(undefined)
    .map((v, i) => i)
    .map((a) => a.toString(16));

const charactorandnumberlist = [
    ...new Set([...hexnumberlist, ...charactorlist])
];

function getrandomcharactor() {
    return get(charactorlist, Math.floor(Math.random() * charactorlist.length));
}

function getrandomhexnumberandcharactor() {
    return get(
        charactorandnumberlist,
        Math.floor(Math.random() * charactorandnumberlist.length)
    );
}

function getrandomstringandnumber(length = 1) {
    return (
        Array(length)
            .fill(undefined)
            .map(() => getrandomcharactor())
            .join("") +
        "-" +
        Array(length)
            .fill(undefined)
            .map(() => getrandomhexnumberandcharactor())
            .join("")
    );
}

const invalid_custom_element_class = "invalid custom element class !";

if (!isobject(window.customElements)) {
    console.error(" customElements  not supported !");
    throw new TypeError();
}

function Usevaluetoquerythekeyfromthetable(table, Componentstatusname) {
    const outputentrie = Object.entries(table).find(
        (v) => v[1] === Componentstatusname
    );
    return outputentrie ? outputentrie[0] : undefined;
}

window.CustomElementRegistry = get(
    getPrototypeOf(window.customElements),
    "constructor"
);

const elementset = Symbol.for("elementset");

const elementmap = Symbol.for("elementmap");

const { CustomElementRegistry: CustomElementRegistry } = window;

const customElements = window.customElements;

if (!has(customElements, elementset)) {
    Reflect.set(customElements, elementset, new Set());
}

if (!has(customElements, elementmap)) {
    Reflect.set(customElements, elementmap, {});
}

var RandomDefineCustomElement = (initclass, extendsname) =>
    RandomDefineCustomElement$1(initclass, extendsname);

function RandomDefineCustomElement$1(initclass, extendsname, length = 1) {
    if (!isclassextendsHTMLElement(initclass)) {
        console.error(initclass);
        console.error(invalid_custom_element_class);
        throw TypeError();
    }
    if (!get(customElements, elementset).has(initclass)) {
        const elementname = getrandomstringandnumber(length);
        if (customElements.get(elementname)) {
            return RandomDefineCustomElement$1(
                initclass,
                extendsname,
                length + 1
            );
        } else {
            if (extendsname) {
                customElements.define(elementname, initclass, {
                    extends: extendsname
                });
            } else {
                customElements.define(elementname, initclass);
            }
        }
        return elementname;
    } else {
        return Usevaluetoquerythekeyfromthetable(
            get(customElements, elementmap),
            initclass
        );
    }
}

customElements.define = function(name, constructor, options) {
    if (!isclassextendsHTMLElement(constructor)) {
        console.error(constructor);
        console.error(invalid_custom_element_class);
        throw TypeError();
    }
    if (!get(customElements, elementset).has(constructor)) {
        if (has(customElements[elementmap], name)) {
            RandomDefineCustomElement$1(
                constructor,
                options ? options.extends : undefined
            );
        } else {
            CustomElementRegistry.prototype.define.call(
                customElements,
                name,
                constructor,
                options
            );
            customElements[elementset].add(constructor);
            customElements[elementmap][name] = constructor;
        }
    }
};

set(customElements, Symbol.iterator, () => {
    const entries = Object.entries(customElements[elementmap]);
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
        return construct(initclass, [propsjson, children]);
    } else {
        console.error(initclass);
        console.error(invalid_custom_element_class);
        throw TypeError();
    }
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

const applydirects = function(element, vdom) {
    Object.entries(vdom.directives).forEach(([name, value]) => {
        const direfun = directive[name];
        if (isfunction(direfun)) {
            direfun(
                value,
                element,
                vdom,
                (call) => {
                    addmountedlistner(element, call);
                },
                (call) => {
                    addunmountedlistner(element, call);
                },
                (call) => {
                    addupdatedlistner(element, call);
                }
            );
        } else {
            console.error(vdom.directives);
            console.error("invalid directives " + name);
            throw new TypeError();
        }
    });
};

const eventlistenerssymbol = Symbol("eventlisteners");

function onevent(element, eventname, callback) {
    firstaddlisteners(element, eventname, toArray(callback));
}

function firstaddlisteners(ele, event, callarray) {
    const element = ele;
    callarray.forEach((call) => {
        if (!isfunction(call)) {
            console.error(call);
            console.error(invalid_Function);
            throw TypeError();
        }
        if (!has(element, eventlistenerssymbol)) {
            set(element, eventlistenerssymbol, []);
        }
        get(ele, eventlistenerssymbol).push([event, call]);
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
    const attribute1 = createeleattragentreadwrite(element);
    Object.assign(attribute1, vdom.props);
    let cancelarr;
    addmountedlistner(element, () => {
        cancelarr = Object.entries(vdom.bindattr).map(
            ([key, primitivestate]) => {
                attribute1[key] = primitivestate.valueOf();
                return watch(primitivestate, () => {
                    const state = primitivestate;
                    if (isconnected(element)) {
                        attribute1[key] = state.valueOf();
                    }
                });
            }
        );
    });
    addunmountedlistner(element, () => {
        cancelarr &&
            cancelarr.forEach((f) => {
                f();
            });
    });
    Object.entries(vdom.onevent).forEach(([event, callbacks]) => {
        onevent(element, event, callbacks);
    });
    [...Object.values(vdom.bindattr), ...Object.values(vdom.directives)]
        .flat(1 / 0)
        .filter((e) => isReactiveState(e))
        .forEach((e) => {
            if (!has(element, bindstatesymbol)) {
                set(element, bindstatesymbol, new Set());
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
        return vdom.map((a) => render(a)).flat(1 / 0);
    }
    if (isnumber(vdom) || isstring(vdom)) {
        const textnode = createtextnode(vdom);
        return textnode;
    } else if (isReactiveState(vdom)) {
        const reactive = vdom;
        const textnode = createtextnode(String(reactive));
        const element = textnode;
        let cancel;
        addmountedlistner(element, () => {
            cancel = watch(reactive, () => {
                const state = reactive;
                if (isconnected(element)) {
                    changetext(textnode, String(state));
                }
            });
        });
        addunmountedlistner(element, () => {
            cancel && cancel();
        });
        set(element, bindstatesymbol, new Set());
        get(element, bindstatesymbol).add(reactive);
        return textnode;
    } else if (isVirtualdom(vdom)) {
        let { type: type } = vdom;
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
                const fragmentelement = createElementNS("never", "html");
                mountrealelement(render(vdom.children), fragmentelement);
                return fragmentelement;
            } else {
                element = namespace
                    ? createElementNS(namespace, type)
                    : createnativeelement(type);
            }
        } else if (typeof type == "function") {
            if (isobject(type["defaultProps"])) {
                Object.assign(
                    vdom.props,
                    JSON.parse(
                        JSON.stringify({
                            ...type["defaultProps"],
                            ...vdom.props
                        })
                    )
                );
            }
            const propsjson = JSON.parse(
                JSON.stringify({
                    ...vdom.props,
                    ...Object.fromEntries(
                        Object.entries(vdom.bindattr).map(([key, value]) => [
                            key,
                            value.value
                        ])
                    )
                })
            );
            element = createcostumelemet(type, propsjson, vdom.children);
        } else {
            throwinvalideletype(vdom);
        }
        dispatchcreated(element);
        applydirects(element, vdom);
        if (type && (isfunction(type) || isstring(type))) {
            if (!iscomponent(type)) {
                if (element) {
                    mountrealelement(
                        vdom.children.map((e) => {
                            if (type === "svg" && isVirtualdom(e)) {
                                return render(e, svgnamespace);
                            } else if (type === "math" && isVirtualdom(e)) {
                                return render(e, mathnamespace);
                            } else if (namespace && isVirtualdom(e)) {
                                return render(e, namespace);
                            } else {
                                return render(e);
                            }
                        }),
                        element
                    );
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
    return !!(isarray(arr) && arr.length && arr.every((a) => isNode(a)));
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
            throw new TypeError();
        }
    }
    const el = container;
    if (!(el instanceof HTMLElement)) {
        console.error(el);
        console.error("invalid container HTMLElement!");
        throw TypeError();
    }
    if (
        el === document.body ||
        el === document.documentElement ||
        el === document.head
    ) {
        console.error(el);
        console.error("Do not mount  to <html> or <body> <head>.");
        throw Error();
    }
    if (isvalidvdom(vdom)) {
        const elesarray = toArray(vdom);
        mountrealelement(render(elesarray), container);
    } else if (isNode(vdom) || isNodeArray(vdom)) {
        const elesarray = toArray(vdom);
        mountrealelement(elesarray, container);
    } else {
        console.error(vdom);
        console.error(invalid_Virtualdom);
        throw TypeError();
    }
    return container;
}

const proxyset = new WeakSet();

function isproxy(a) {
    return proxyset.has(a);
}

const proxytohandler = new WeakMap();

function combineproxy(target, newhandler) {
    if (isproxy(target)) {
        const oldhandler = proxytohandler.get(target);
        if (oldhandler) {
            Object.assign(oldhandler, newhandler);
        } else {
            throw new TypeError();
        }
        return target;
    } else {
        const pro = new Proxy(target, newhandler);
        proxytohandler.set(pro, newhandler);
        proxyset.add(pro);
        return pro;
    }
}

const handler = {
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
};

function readonlyproxy(target) {
    return combineproxy(target, Object.assign({}, handler));
}

const componentsstylesheet = new Map();

function createlinkstylesheet(url) {
    return render(
        h$1("link", {
            href: url,
            rel: "stylesheet"
        })
    );
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
    return cssrules.map((c) => c.cssText).join("\n");
}

function prefixcssmediarule(cssrule, prefix) {
    const rulesarr = prefixcssrules([...cssrule.cssRules], prefix);
    const conditionText = cssrule.conditionText;
    const cssText =
        cssrule.cssText.slice(0, 7) +
        conditionText +
        "{" +
        cssrulestocsstext(rulesarr) +
        "}";
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
        const bloburl = URL.createObjectURL(
            new Blob([source], {
                type: "text/css"
            })
        );
        sourcecssblobCache.set(source, bloburl);
        return bloburl;
    }
}

const sourcecssblobCache = new Map();

function savestyleblob(tagname, csstext, urltext) {
    tagname = tagname.toLowerCase();
    const prefix = tagname;
    if (!get(componentsstylesheet, prefix)) {
        set(componentsstylesheet, tagname, new Set());
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
    const selectoraftertransform = selectorarray
        .map((selectorTextone) => {
            let prefixselector = prefix + " " + selectorTextone;
            if (selectorTextone.startsWith("*")) {
                prefixselector =
                    prefixselector + "," + selectorTextone.replace("*", prefix);
            }
            return prefixselector;
        })
        .join(",");
    return {
        selectorText: selectoraftertransform,
        cssText: selectoraftertransform + stylebodyold,
        [Symbol.toStringTag]: "CSSStyleRule"
    };
}

function prefixcssrules(cssRulesarray, prefix) {
    return cssRulesarray
        .map((cssrule) => {
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
        })
        .filter(Boolean);
}

function parsecsstext(text) {
    const styleelement = render(h$1("style", [text]));
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

const oldcsstotransformedcss = new Map();

function registercssprefix(text, prefix) {
    const css = text;
    const cssnewtext = transformcsstext(css, prefix);
    savestyleblob(prefix, cssnewtext);
}

function loadlinkstyle(stylelinkelement, container) {
    return new Promise((rs) => {
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
    return Promise.all(
        [...get(componentsstylesheet, prefix)].map((styleurl) => {
            if (
                querySelectorAll(`link[rel="stylesheet"][href="${styleurl}"]`)
                    .length
            ) {
                return Promise.resolve();
            } else {
                return loadlinkstyle(
                    createlinkstylesheet(styleurl),
                    containerthis
                );
            }
        })
    );
}

function setimmediate(fun) {
    return Promise.resolve().then(() => fun());
}

function unwatch(state) {
    state[removeallistenerssymbol]();
}

function onmounted(ele) {
    if (isarray(ele)) {
        ele.forEach((e) => {
            onmounted(e);
        });
    } else if (isNode(ele)) {
        readdlisteners(ele);
        if (has(ele, bindstatesymbol)) {
            get(ele, bindstatesymbol).forEach((state) => {
                rewatch(state);
                state[dispatchsymbol]();
            });
        }
        if (has(ele, innerstatesymbol)) {
            get(ele, innerstatesymbol).forEach((state) => {
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
        ele.forEach((e) => {
            onunmounted(e);
        });
    } else if (isNode(ele)) {
        removelisteners(ele);
        if (has(ele, innerstatesymbol)) {
            get(ele, innerstatesymbol).forEach((state) => {
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
        new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type == "attributes") {
                    console.log(
                        "The " +
                            mutation.attributeName +
                            " attribute was modified."
                    );
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

const waittranformcsssymbol = Symbol("waittranformcss");

const innerwatchrecords = Symbol("innerwatchrecord");

const innerstatesymbol = Symbol("innerstate");

const attributessymbol = Symbol("attributes");

const elementsymbol = Symbol("innerelement");

const inner_vdom_symbol = Symbol("innervdom");

function createComponentold(custfun, options) {
    var _a, _b;
    var _c, _d, _e;
    if (isfunction(custfun)) {
        const cached_class = cached_create_componet.get(custfun);
        if (cached_class) {
            return cached_class;
        }
        const defaultProps =
            (_a =
                options === null || options === void 0
                    ? void 0
                    : options.defaultProps) !== null && _a !== void 0
                ? _a
                : get(custfun, "defaultProps");
        const css =
            (_b =
                options === null || options === void 0
                    ? void 0
                    : options.css) !== null && _b !== void 0
                ? _b
                : get(custfun, "css");
        class Component extends AttrChange {
            constructor(propsjson = {}, children = []) {
                super();
                this[_c] = {};
                this[_e] = false;
                const css = get(this.constructor, "css");
                if (css) {
                    const prefix = this.tagName.toLowerCase();
                    if (!get(componentsstylesheet, prefix)) {
                        set(componentsstylesheet, prefix, new Set());
                        this[waittranformcsssymbol] = () =>
                            setimmediate(() => {
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
                const propattributess = Object.fromEntries(
                    Object.entries(props).map(([key]) => [
                        key,
                        (() => {
                            const attributes = createeleattragentreadwrite(
                                this
                            );
                            const state = new ReactiveState({
                                get() {
                                    return get(attributes, key);
                                }
                            });
                            return state;
                        })()
                    ])
                );
                this[attributessymbol] = propattributess;
                const readonlyprop = readonlyproxy(
                    Object.fromEntries(
                        Object.entries(propattributess).map(([key, value]) => [
                            key,
                            readonlyproxy(value)
                        ])
                    )
                );
                let possiblyvirtualdom;
                try {
                    possiblyvirtualdom = apply(custfun, undefined, [
                        readonlyprop,
                        children.flat(1 / 0)
                    ]);
                } catch (error) {
                    closectx();
                    console.error("error in component");
                    throw error;
                }
                possiblyvirtualdom = toArray(possiblyvirtualdom);
                if (isvalidvdom(possiblyvirtualdom)) {
                    const vdomarray = toArray(possiblyvirtualdom);
                    this[inner_vdom_symbol] = vdomarray
                        .flat(Infinity)
                        .filter(Boolean);
                    const mountedcallbacks = getMounted();
                    const unmountedcallbacks = getUnMounted();
                    const createdcallbacks = getcreated();
                    const updatedcallbacks = getupdated();
                    this[innerstatesymbol] = getstates();
                    this[innerwatchrecords] = getwatchrecords();
                    closectx();
                    mountedcallbacks.forEach((callback) => {
                        addmountedlistner(this, callback);
                    });
                    unmountedcallbacks.forEach((callback) => {
                        addunmountedlistner(this, callback);
                    });
                    createdcallbacks.forEach((callback) => {
                        addcreatedlistner(this, callback);
                    });
                    updatedcallbacks.forEach((callback) => {
                        addupdatedlistner(this, callback);
                    });
                    addstopupdatelistener(this);
                } else {
                    closectx();
                    console.error(possiblyvirtualdom);
                    console.error(invalid_Virtualdom);
                    throw TypeError();
                }
            }
            [((_c = attributessymbol),
            (_d = componentsymbol),
            (_e = readysymbol),
            firstinstalledcallback)]() {
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
                        waitcallback()
                            .then(thencallbackfirst)
                            .then(thencallbacksecond);
                    } else {
                        Promise.resolve(thencallbackfirst).then(
                            thencallbacksecond
                        );
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
        Component[_d] = componentsymbol;
        Component.css = !!(css && isstring(css)) ? css : undefined;
        Component.defaultProps = isobject(defaultProps)
            ? JSON.parse(JSON.stringify(defaultProps))
            : undefined;
        cached_create_componet.set(custfun, Component);
        return Component;
    } else {
        console.error(custfun);
        console.error(invalid_Function);
        throw TypeError();
    }
}

const createComponent = function(custfun, options) {
    return autocreateclass(custfun, options);
};

function autocreateclass(custfun, options) {
    if (isclassextendsHTMLElement(custfun)) {
        if (options) {
            return Object.assign(custfun, options);
        } else {
            return custfun;
        }
    } else if (isfunction(custfun)) {
        return createComponentold(custfun, options);
    } else {
        throw TypeError();
    }
}

function h$1(type, propsorchildren, ...children) {
    if (isfunction(type)) {
        type = autocreateclass(type);
    }
    if (isarray(propsorchildren)) {
        return apply(createElement, undefined, [
            type,
            undefined,
            [...propsorchildren, ...children].flat(1 / 0)
        ]);
    } else {
        return apply(createElement, undefined, [
            type,
            propsorchildren,
            ...children
        ]);
    }
}

function createElement(type, props = {}, ...children) {
    let typenormalized = isstring(type) || isfunction(type) ? type : "";
    const propsnormalized = isplainobject(props) ? props : {};
    const childrennormalized = children
        .flat(Infinity)
        .map((a) => (a === 0 ? "0" : a))
        .filter((a) => !!a);
    if (isstring(typenormalized)) {
        typenormalized = typenormalized.trim().toLowerCase();
    }
    if ("" === typenormalized) {
        return childrennormalized;
    } else {
        return apply(createVirtualElement, undefined, [
            typenormalized,
            propsnormalized,
            childrennormalized
        ]);
    }
}

function getstatetype(state) {
    return state[tagtypesym];
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
    if (!isReactiveState(conditon)) {
        console.error(conditon);
        console.error(invalid_ReactiveState);
        throw TypeError();
    }
    if (getstatetype(conditon) !== "Boolean") {
        throw new TypeError();
    }
    [iftrue, iffalse].forEach((a) => {
        if (!(isundefined(a) || isVirtualdom(a) || isstring(a))) {
            console.error(a);
            console.error(invalid_Virtualdom);
            throw new TypeError();
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
        [((_a = currentelementsymbol),
        (_b = componentsymbol),
        (_c = readysymbol),
        (_d = truevdomsymbol),
        (_e = falsevdomsymbol),
        handlefalse)]() {
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
            const handleconditionchange = (trueorfalse) => {
                if (true === trueorfalse) {
                    get(this, handletrue).call(this);
                } else if (!trueorfalse) {
                    get(this, handlefalse).call(this);
                }
            };
            if (isReactiveState(conditon)) {
                handleconditionchange(conditon.valueOf());
                watch(conditon, (trueorfalse) => {
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
    const vdom = h$1(Condition);
    return vdom;
};

const cancel_watch_symbol = Symbol("cancel_watch");

const cached_class_element = Symbol("cached_class_element");

const switch_mount_symbol = Symbol("switch_mount");

function Switchable(funstate) {
    var _a, _b, _c;
    if (!isReactiveState(funstate)) {
        console.error(funstate);
        throw new TypeError();
    }
    if (getstatetype(funstate) !== "Function") {
        throw new TypeError();
    }
    class Switchable extends AttrChange {
        constructor() {
            super(...arguments);
            this[_a] = new WeakMap();
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
        [((_a = cached_class_element),
        (_b = componentsymbol),
        (_c = readysymbol),
        switch_mount_symbol)](eleclass) {
            const eleclassconstructor = autocreateclass(eleclass);
            const eleme = this[cached_class_element].get(eleclassconstructor);
            if (eleme) {
                mountrealelement(eleme, this);
            } else {
                const elementreal = render(h$1(eleclassconstructor));
                this[cached_class_element].set(
                    eleclassconstructor,
                    elementreal
                );
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
    return h$1(Switchable);
}

var n$1 = function(t, s, r, e) {
        var u;
        s[0] = 0;
        for (var h = 1; h < s.length; h++) {
            var p = s[h++],
                a = s[h] ? ((s[0] |= p ? 1 : 2), r[s[h++]]) : s[++h];
            3 === p
                ? (e[0] = a)
                : 4 === p
                ? (e[1] = Object.assign(e[1] || {}, a))
                : 5 === p
                ? ((e[1] = e[1] || {})[s[++h]] = a)
                : 6 === p
                ? (e[1][s[++h]] += a + "")
                : p
                ? ((u = t.apply(a, n$1(t, a, r, ["", null]))),
                  e.push(u),
                  a[0] ? (s[0] |= 2) : ((s[h - 2] = 0), (s[h] = u)))
                : e.push(a);
        }
        return e;
    },
    t$1 = new Map();

function htm(s) {
    var r = t$1.get(this);
    return (
        r || ((r = new Map()), t$1.set(this, r)),
        (r = n$1(
            this,
            r.get(s) ||
                (r.set(
                    s,
                    (r = (function(n) {
                        for (
                            var t,
                                s,
                                r = 1,
                                e = "",
                                u = "",
                                h = [0],
                                p = function(n) {
                                    1 === r &&
                                    (n ||
                                        (e = e.replace(
                                            /^\s*\n\s*|\s*\n\s*$/g,
                                            ""
                                        )))
                                        ? h.push(0, n, e)
                                        : 3 === r && (n || e)
                                        ? (h.push(3, n, e), (r = 2))
                                        : 2 === r && "..." === e && n
                                        ? h.push(4, n, 0)
                                        : 2 === r && e && !n
                                        ? h.push(5, 0, !0, e)
                                        : r >= 5 &&
                                          ((e || (!n && 5 === r)) &&
                                              (h.push(r, 0, e, s), (r = 6)),
                                          n && (h.push(r, n, 0, s), (r = 6))),
                                        (e = "");
                                },
                                a = 0;
                            a < n.length;
                            a++
                        ) {
                            a && (1 === r && p(), p(a));
                            for (var l = 0; l < n[a].length; l++)
                                (t = n[a][l]),
                                    1 === r
                                        ? "<" === t
                                            ? (p(), (h = [h]), (r = 3))
                                            : (e += t)
                                        : 4 === r
                                        ? "--" === e && ">" === t
                                            ? ((r = 1), (e = ""))
                                            : (e = t + e[0])
                                        : u
                                        ? t === u
                                            ? (u = "")
                                            : (e += t)
                                        : '"' === t || "'" === t
                                        ? (u = t)
                                        : ">" === t
                                        ? (p(), (r = 1))
                                        : r &&
                                          ("=" === t
                                              ? ((r = 5), (s = e), (e = ""))
                                              : "/" === t &&
                                                (r < 5 || ">" === n[a][l + 1])
                                              ? (p(),
                                                3 === r && (h = h[0]),
                                                (r = h),
                                                (h = h[0]).push(2, 0, r),
                                                (r = 0))
                                              : " " === t ||
                                                "\t" === t ||
                                                "\n" === t ||
                                                "\r" === t
                                              ? (p(), (r = 2))
                                              : (e += t)),
                                    3 === r &&
                                        "!--" === e &&
                                        ((r = 4), (h = h[0]));
                        }
                        return p(), h;
                    })(s))
                ),
                r),
            arguments,
            []
        )).length > 1
            ? r
            : r[0]
    );
}

const myhtm = htm;

function htmlold(...inargs) {
    return apply(myhtm, h$1, inargs);
}

function html(...args) {
    const prevdom = toArray(htmlold(...args));
    const vdom = prevdom.length === 1 ? prevdom[0] : prevdom;
    if (isvalidvdom(vdom)) {
        return vdom;
    } else {
        console.error(vdom);
        console.error(invalid_Virtualdom);
        throw new TypeError();
    }
}

function extenddirectives(name, fun) {
    if (!isstring(name)) {
        console.error(name);
        throw new TypeError();
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
            throw new Error();
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
        eventnames.forEach((eventname) => {
            const origin = vdom.onevent[eventname];
            const eventsarray = toArray(origin);
            set(
                vdom.onevent,
                eventname,
                toArray([
                    ...eventsarray,
                    (e) => (value.value = get(e.target, domprop))
                ]).filter(Boolean)
            );
        });
    } else {
        console.error(vdom);
        console.error(invalid_ReactiveState + invalid_Virtualdom);
        throw TypeError();
    }
}

const Localchecked = (value, element, vdom) => {
    if (!isReactiveState(value)) {
        throw new TypeError();
    }
    if (getstatetype(value) !== "Boolean") {
        throw new TypeError();
    }
    console.log(element);
    model(["input"], "checked", "checked", ["change"], value, vdom);
    const eventname = "click";
    const origin = toArray(vdom.onevent[eventname]);
    const eventsarray = origin;
    const dispatchallsamename = (event) => {
        const inputelement = event.target;
        const name = event.target.name;
        if (name) {
            querySelectorAll(`input[name=${name}]`)
                .filter((ele) => ele !== inputelement)
                .forEach((element) => {
                    element.dispatchEvent(new Event("change"));
                });
        }
    };
    set(
        vdom.onevent,
        eventname,
        toArray([...eventsarray, dispatchallsamename]).filter(Boolean)
    );
};

const Localcreated = (call, ele, vdom, onmount, onunmount, onupdated) => {
    console.log([call, ele, vdom, onmount, onunmount, onupdated]);
    if (typeof call === "function") {
        call();
    } else {
        throw new TypeError();
    }
};

const handler$1 = {
    getOwnPropertyDescriptor(target, key) {
        if (issymbol(key)) {
            return;
        } else {
            let myvalue = get(target, "value");
            const descripter =
                getOwnPropertyDescriptor(target, key) ||
                getOwnPropertyDescriptor(myvalue, key);
            if (descripter) {
                descripter.configurable = true;
            }
            return descripter;
        }
    },
    ownKeys(target) {
        let myvalue = get(target, "value");
        const myvalueobj = isobject(myvalue) ? myvalue : {};
        return Array.from(
            new Set([...ownKeys(target), ...ownKeys(myvalueobj)])
        );
    },
    has(target, key) {
        const myvalue = get(target, "value");
        const myvalueobj = isobject(myvalue) ? myvalue : {};
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
                return isfunction(property)
                    ? property.bind(myvalueobj)
                    : property;
            }
        }
    }
};

function getproperyreadproxy(a) {
    const target = a;
    return combineproxy(target, Object.assign({}, handler$1));
}

function computedmany(state, callback, setter) {
    const getter = () => {
        const value = apply(
            callback,
            undefined,
            state.map((st) => st.valueOf())
        );
        const possiblevalue = isReactiveState(value) ? value.valueOf() : value;
        if (isobject(possiblevalue) || isprimitive(possiblevalue)) {
            return possiblevalue;
        } else {
            console.error(possiblevalue);
            throw TypeError();
        }
    };
    let memorized = getter();
    const reactivestate = new ReactiveState({
        set: isfunction(setter) ? setter : undefined,
        get: getter
    });
    state.forEach((state) => {
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

function computed(state, callback, setter) {
    if (!((isarray(state) || isReactiveState(state)) && isfunction(callback))) {
        console.error(state);
        console.error(callback);
        console.error(invalid_ReactiveState + invalid_Function);
        throw TypeError();
    }
    const state1array = toArray(state);
    if (!state1array.length) {
        console.error("Empty array not allowed");
        throw new Error();
    }
    const state1 = computedmany(state1array, callback, setter);
    return state1;
}

function generatechildrenvdoms(liststate, fun) {
    const data = liststate.valueOf();
    const childs = new Array(data.length).fill(undefined).map((v, index) => {
        const vdom = Reflect.apply(fun, undefined, [
            computed(liststate, (arr) => arr[index]),
            index
        ]);
        if (!isVirtualdom(vdom)) {
            throw new TypeError();
        }
        return vdom;
    });
    return childs;
}

const localfor = (value, ele, vdom, onmount, onunmount, onupdated) => {
    if (!Array.isArray(value)) {
        throw TypeError();
    }
    const [list, fun] = value;
    if (!isReactiveState(list) || !isfunction(fun)) {
        throw TypeError();
    }
    if (getstatetype(list) !== "Array") {
        throw new TypeError();
    }
    vdom.children.length = 0;
    const changecallback = () => {
        const data = list.valueOf();
        if (!isarray(data)) {
            throw TypeError();
        }
        const oldlength = ele.childNodes.length;
        const newlength = data.length;
        const minlength = Math.min(oldlength, newlength);
        if (newlength < oldlength) {
            ele.childNodes.forEach((n, i) => {
                if (i > minlength - 1) {
                    removeNode(n);
                }
            });
        } else if (newlength > oldlength) {
            const childs = generatechildrenvdoms(list, fun);
            const nodes = render(childs.slice(minlength));
            nodes.forEach((n, i) => {
                ele.appendChild(n);
            });
        }
    };
    console.log(value, ele, vdom, onmount, onunmount, onupdated);
    onmount(changecallback);
    onmount(() => {
        const cancel = watch(list, changecallback);
        onunmount(cancel);
    });
};

function createhtmlandtextdirective(
    seteletext,
    errorname,
    ele,
    text,
    onmount,
    onunmount
) {
    {
        const element = ele;
        if (isstring(text)) {
            requestAnimationFrame(() => {
                seteletext(ele, text);
            });
        } else if (isReactiveState(text)) {
            if (getstatetype(text) !== "String") {
                throw new TypeError();
            }
            let cancel;
            onmount(() => {
                cancel = watch(text, () => {
                    const state = text;
                    if (isconnected(element)) {
                        seteletext(ele, String(state));
                    }
                });
            });
            onunmount(() => {
                cancel && cancel();
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

const Localhtml = (html, ele, vdom, onmount, onunmount) => {
    if (isstring(html) || isReactiveState(html)) {
        console.log(vdom);
        vdom.children.length = 0;
        createhtmlandtextdirective(
            setelehtml,
            "html",
            ele,
            html,
            onmount,
            onunmount
        );
    } else {
        throw new TypeError();
    }
};

const Localmounted = (call, ele, vdom, onmount, onunmount) => {
    console.log([call, ele, vdom, onmount, onunmount]);
    if (typeof call === "function") {
        apply(onmount, undefined, [call]);
    } else {
        throw new TypeError();
    }
};

const Localref = (ref, ele, _vdom) => {
    if (isfunction(ref)) {
        apply(ref, undefined, [ele]);
    } else if (isobject(ref)) {
        set(ref, "value", ele);
    } else {
        console.log(_vdom);
        console.error(ref);
        console.error("invalid ref");
        throw TypeError();
    }
};

const Localtext = (text, ele, vdom, onmount, onunmount) => {
    if (isstring(text) || isReactiveState(text)) {
        console.log(vdom);
        vdom.children.length = 0;
        createhtmlandtextdirective(
            seteletext,
            "text",
            ele,
            text,
            onmount,
            onunmount
        );
    } else {
        throw new TypeError();
    }
};

const Localunmounted = (call, ele, vdom, onmount, onunmount) => {
    console.log([call, ele, vdom, onmount, onunmount]);
    if (typeof call === "function") {
        apply(onunmount, undefined, [call]);
    } else {
        throw new TypeError();
    }
};

const Localupdated = (call, ele, vdom, onmount, onunmount, onupdated) => {
    console.log([call, ele, vdom, onmount, onunmount]);
    if (typeof call === "function") {
        apply(onupdated, undefined, [call]);
    } else {
        throw new TypeError();
    }
};

const Localvalue = (value, element, vdom) => {
    if (isReactiveState(value)) {
        if (getstatetype(value) !== "String") {
            throw new TypeError();
        }
        console.log(element);
        model(
            ["input", "textarea", "select"],
            "value",
            "value",
            ["change", "input"],
            value,
            vdom
        );
    } else {
        throw new TypeError();
    }
};

extenddirectives("ref", Localref);

extenddirectives("html", Localhtml);

extenddirectives("text", Localtext);

extenddirectives("value", Localvalue);

extenddirectives("checked", Localchecked);

const Directives = extenddirectives;

Directives("mounted", Localmounted);

Directives("unmounted", Localunmounted);

Directives("updated", Localupdated);

Directives("created", Localcreated);

extenddirectives("for", localfor);

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

const {
    HTMLElement: HTMLElement$1,
    customElements: customElements$1,
    Proxy: Proxy$1
} = window;

if (
    !isfunction(HTMLElement$1) ||
    !isfunction(Proxy$1) ||
    !isobject(customElements$1)
) {
    console.error("Proxy,HTMLElement ,customElements ,browser not supported !");
    throw new TypeError();
}

function createRef(value) {
    return {
        value: value
    };
}

const e$1 = Set.prototype,
    t$2 = Map.prototype;

function r$1(e) {
    return e instanceof Map;
}

function o$1(e) {
    return e instanceof Set;
}

function n$2(e) {
    return Array.isArray(e);
}

const l$1 = window.Reflect,
    {
        ownKeys: i$1,
        deleteProperty: c$1,
        apply: a$1,
        construct: d$1,
        defineProperty: f$1,
        get: u$1,
        getOwnPropertyDescriptor: p$1,
        getPrototypeOf: s$1,
        has: y$1,
        set: v$1,
        setPrototypeOf: g$1
    } = l$1;

function P(e) {
    return "object" == typeof e && null !== e;
}

function w$1(e) {
    return "function" == typeof e;
}

function S(l, h, O = [], x = l) {
    if (!w$1(h)) throw Error();
    if (
        l instanceof Promise ||
        (function(e) {
            return e instanceof RegExp;
        })(l) ||
        (function(e) {
            return e instanceof Date;
        })(l)
    )
        return l;
    if (w$1(l) || P(l)) {
        let E;
        return (
            o$1(l)
                ? ((E = new Set([...l])),
                  v$1(
                      E,
                      "add",
                      (t) => (
                          e$1.add.call(l, t),
                          h(x, O, void 0, void 0),
                          e$1.add.call(E, t)
                      )
                  ),
                  v$1(
                      E,
                      "delete",
                      (t) => (
                          e$1.delete.call(l, t),
                          h(x, O, void 0, void 0),
                          e$1.delete.call(E, t)
                      )
                  ),
                  v$1(
                      E,
                      "clear",
                      () => (
                          e$1.clear.call(l),
                          h(x, O, void 0, void 0),
                          e$1.clear.call(E)
                      )
                  ))
                : r$1(l)
                ? ((E = new Map([...l])),
                  v$1(
                      E,
                      "clear",
                      () => (
                          t$2.clear.call(l),
                          h(x, O, void 0, void 0),
                          t$2.clear.call(E)
                      )
                  ),
                  v$1(
                      E,
                      "set",
                      (e, r) => (
                          t$2.set.call(l, e, r),
                          h(x, O, void 0, void 0),
                          t$2.set.call(E, e, r)
                      )
                  ),
                  v$1(
                      E,
                      "delete",
                      (e) => (
                          t$2.delete.call(l, e),
                          h(x, O, void 0, void 0),
                          t$2.delete.call(E, e)
                      )
                  ))
                : (E = n$2(l) ? [] : w$1(l) ? () => {} : {}),
            o$1(l) || r$1(l) || g$1(E, null),
            new Proxy(E, {
                defineProperty: (e, t, r) => (
                    h(
                        x,
                        [...O, String(t)],
                        y$1(r, "value")
                            ? r.value
                            : w$1(r.get)
                            ? r.get()
                            : void 0,
                        u$1(l, t)
                    ),
                    f$1(l, t, r)
                ),
                deleteProperty: (e, t) => (
                    h(x, [...O, String(t)], void 0, u$1(l, t)), c$1(l, t)
                ),
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
                    return n$2(l) && "length" === t
                        ? r
                        : r
                        ? ((r.configurable = !0), r)
                        : void 0;
                },
                set: (e, t, r) => (
                    w$1(h) && h(x, [...O, String(t)], r, u$1(l, t)),
                    v$1(l, t, r)
                ),
                get(e, t) {
                    var n = u$1(l, t);
                    return w$1(n) && (o$1(l) || r$1(l))
                        ? u$1(E, t).bind(E)
                        : w$1(n) || P(n)
                        ? S(n, h, [...O, String(t)], l)
                        : n;
                }
            })
        );
    }
    return l;
}

function deepobserve(e, t) {
    if (!w$1(t)) throw Error();
    if (!w$1(Proxy)) throw Error();
    return w$1(e) || P(e) ? S(e, t) : e;
}

function handleobjectstate(init) {
    let initobj = init;
    const containReactiveState =
        isplainobject(init) &&
        Object.values(init).some((a) => isReactiveState(a));
    const state_entries = Object.entries(init).filter((e) => {
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
                set: (nvalue) => {
                    state.value = nvalue;
                },
                configurable: true
            });
        });
    }
    const reactive = new ReactiveState({
        value: initobj
    });
    if (containReactiveState) {
        state_entries.forEach(([key, state]) => {
            watch(state, () => {
                reactive[dispatchsymbol]();
            });
        });
    }
    return combineproxy(reactive, Object.assign({}, handler$2));
}

const handler$2 = {};

handler$2.ownKeys = (target) =>
    Array.from(new Set([...ownKeys(target), ...ownKeys(get(target, "value"))]));

handler$2.setPrototypeOf = () => false;

handler$2.defineProperty = () => false;

handler$2.getOwnPropertyDescriptor = (target, key) => {
    if (issymbol(key)) {
        return;
    }
    const myvalue = get(target, "value");
    const descripter =
        getOwnPropertyDescriptor(target, key) ||
        getOwnPropertyDescriptor(myvalue, key);
    if (descripter) {
        descripter.configurable = true;
    }
    return descripter;
};

handler$2.deleteProperty = (target, key) => {
    const myvalue = get(target, "value");
    if (has(myvalue, key)) {
        deleteProperty(myvalue, key);
        target[dispatchsymbol]();
        return true;
    } else {
        return true;
    }
};

handler$2.has = (target, key) => {
    const myvalue = get(target, "value");
    return has(target, key) || has(myvalue, key);
};

handler$2.get = (target, key) => {
    const value = get(target, "value");
    const deepflage = isarray(value) || isplainobject(value);
    if (key === "value" && deepflage) {
        return deepobserve(get(target, key), (_target_, _patharray) => {
            target[dispatchsymbol]();
        });
    } else if (has(target, key)) {
        return get(target, key);
    } else if (has(value, key)) {
        const resultvalue = get(value, key);
        if (isSet(value)) {
            if (key === "add" || key === "clear" || key === "delete") {
                switch (key) {
                    case "add": {
                        return ((add) => {
                            if (!set_prototype.has.call(value, add)) {
                                const returnvalue = set_prototype[key].call(
                                    value,
                                    add
                                );
                                target[dispatchsymbol]();
                                return returnvalue;
                            }
                            return;
                        }).bind(value);
                    }

                    case "delete": {
                        return ((dele) => {
                            if (set_prototype.has.call(value, dele)) {
                                const returnvalue = set_prototype[key].call(
                                    value,
                                    dele
                                );
                                target[dispatchsymbol]();
                                return returnvalue;
                            }
                            return;
                        }).bind(value);
                    }

                    case "clear": {
                        return (() => {
                            if (value.size) {
                                const returnvalue = set_prototype[key].call(
                                    value
                                );
                                target[dispatchsymbol]();
                                return returnvalue;
                            }
                            return;
                        }).bind(value);
                    }
                }
            } else {
                return isfunction(resultvalue)
                    ? resultvalue.bind(value)
                    : resultvalue;
            }
        } else if (
            deepflage &&
            (isarray(resultvalue) || isplainobject(resultvalue))
        ) {
            return deepobserve(resultvalue, () => {
                target[dispatchsymbol]();
            });
        } else {
            return resultvalue;
        }
    }
};

handler$2.set = (target, key, value) => {
    if (isReactiveState(value)) {
        value = value.valueOf();
    }
    const myvalue = get(target, "value");
    if (key === "value" && isobject(value)) {
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
        console.error(invalid_primitive_or_object_state);
        throw TypeError();
    }
};

const set_prototype = Set.prototype;

const handler$3 = {
    defineProperty() {
        return false;
    },
    deleteProperty() {
        return false;
    },
    set(target, key, value) {
        if (key === "value") {
            if (target[key] !== value) {
                set(target, key, value);
                target[dispatchsymbol]();
            }
            return true;
        } else {
            console.error(value);
            console.error(invalid_primitive_or_object_state);
            throw TypeError();
        }
    },
    setPrototypeOf() {
        return false;
    }
};

function createState(init) {
    if (isprimitive(init) || isfunction(init)) {
        return getproperyreadproxy(
            combineproxy(
                new ReactiveState({
                    value: init
                }),
                Object.assign({}, handler$3)
            )
        );
    } else if (isReactiveState(init)) {
        throw TypeError();
    } else if (isobject(init)) {
        return handleobjectstate(init);
    } else {
        throw TypeError();
    }
}

export {
    Condition,
    extenddirectives as Directives,
    MountElement,
    Switchable,
    computed,
    createComponent,
    h$1 as createElement,
    createRef,
    createState,
    h$1 as h,
    html,
    render,
    useCreated,
    useMounted,
    useUnMounted,
    useUpdated,
    watch
};
//# sourceMappingURL=index.js.map
