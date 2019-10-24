(function() {
    "use strict";
    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }
        return obj;
    }
    function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly) symbols = symbols.filter((function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            }));
            keys.push.apply(keys, symbols);
        }
        return keys;
    }
    function _objectSpread2(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            if (i % 2) {
                ownKeys(source, true).forEach((function(key) {
                    _defineProperty(target, key, source[key]);
                }));
            } else if (Object.getOwnPropertyDescriptors) {
                Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
                ownKeys(source).forEach((function(key) {
                    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                }));
            }
        }
        return target;
    }
    const globalThis = Function("return this")();
    const self = globalThis;
    const window$1 = globalThis;
    const global = globalThis;
    const {WeakSet: WeakSet, WeakMap: WeakMap, Date: Date, RegExp: RegExp, Event: Event, CustomEvent: CustomEvent, requestAnimationFrame: requestAnimationFrame$1, URL: URL, Blob: Blob, Element: Element, Node: Node, String: String$1, Array: Array$1, document: document$1, Object: Object$1, Reflect: Reflect, Proxy: Proxy, Symbol: Symbol, Boolean: Boolean, Promise: Promise, Set: Set$1, Math: Math$1, Error: Error, TypeError: TypeError, EventTarget: EventTarget, JSON: JSON, Map: Map, clearTimeout: clearTimeout, setTimeout: setTimeout$1, parseInt: parseInt} = globalThis;
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
        return a instanceof Array$1 && Array$1.isArray(a) && gettagtype(a) === "Array";
    }
    function gettagtype(a) {
        return {}.toString.call(a).replace("[object ", "").replace("]", "").trim();
    }
    function isSet(a) {
        return a instanceof Set$1;
    }
    function isMap(a) {
        return a instanceof Map;
    }
    function isWeakMap(a) {
        return a instanceof WeakMap;
    }
    const {HTMLElement: HTMLElement$1, customElements: customElements$1, Proxy: Proxy$1} = window$1;
    if (!isfunction(HTMLElement$1) || !isfunction(Proxy$1) || !isobject(customElements$1)) {
        console.error("Proxy,HTMLElement ,customElements ,browser not supported !");
        throw new TypeError;
    }
    const acceptValue = [ "input", "textarea", "option", "select" ];
    var mustUseDomProp = (tag, attr, attrtype) => {
        return attr === "value" && acceptValue.includes(tag) && attrtype !== "button" || attr === "selected" && tag === "option" || attr === "checked" && tag === "input" || attr === "muted" && tag === "video";
    };
    const hyphenateRE = /\B([A-Z])/g;
    const hyphenate = str => {
        return str.replace(hyphenateRE, "-$1").toLowerCase();
    };
    const String$1$1 = window$1.String;
    const Reflect$1 = window$1.Reflect;
    const {get: get, set: set, ownKeys: ownKeys$1} = Reflect$1;
    const valuestring = "value";
    function isobject$1(a) {
        return typeof a === "object" && a !== null;
    }
    function isstring$1(a) {
        return typeof a === "string";
    }
    function isArray(a) {
        return Array$1.isArray(a);
    }
    function isSet$1(a) {
        return a instanceof Set$1;
    }
    const isinputcheckbox = ele => "input" === geteletagname(ele) && (get(ele, "type") === "checkbox" || get(ele, "type") === "radio");
    function objtostylestring(obj) {
        obj = JSON.parse(JSON.stringify(obj));
        const objentries = Object$1.entries(obj).map(([key, value]) => [ hyphenate(key).trim(), value ]);
        return objentries.map(([key, value]) => key + ":" + value).join(";");
    }
    function asserthtmlelement(ele) {
        if (!(ele instanceof Element)) {
            console.error(ele);
            console.error("invalid HTMLElement!");
            throw TypeError();
        }
    }
    function createeleattragentreadwrite(ele) {
        asserthtmlelement(ele);
        var temp = Object$1.create(null);
        const outputattrs = new Proxy(temp, {
            ownKeys() {
                const isinputtextortextareaflag = isinputtextortextarea(ele);
                const keys = attributesownkeys(ele);
                return Array$1.from(new Set$1([ ...keys, isinputcheckbox(ele) ? "checked" : undefined, isinputtextortextareaflag ? valuestring : undefined ].flat(Infinity).filter(a => !!a)));
            },
            get(target, key) {
                if (mustUseDomProp(geteletagname(ele), String$1$1(key), get(ele, "type"))) {
                    return get(ele, String$1$1(key));
                } else {
                    const v = getattribute(ele, String$1$1(key));
                    if (v === "") {
                        return true;
                    }
                    if (v === null) {
                        return;
                    }
                    if (isstring$1(v)) {
                        try {
                            return JSON.parse(String$1$1(v));
                        } catch (error) {
                            return v;
                        }
                    } else return;
                }
            },
            set(t, key, v) {
                if ("function" === typeof v) {
                    console.error(v);
                    console.error("Setting properties as functions is not allowed");
                    throw TypeError();
                }
                if (mustUseDomProp(geteletagname(ele), String$1$1(key), get(ele, "type"))) {
                    return set(ele, String$1$1(key), v);
                } else if (key === "style") {
                    const csstext = isstring$1(v) ? v : isobject$1(v) ? objtostylestring(v) : String$1$1(v);
                    set(get(ele, "style"), "cssText", csstext.trim());
                    return true;
                } else if (key === "class" && isobject$1(v)) {
                    const classtext = isArray(v) ? v.join(" ") : isSet$1(v) ? [ ...v ].join(" ") : String$1$1(v);
                    setattribute(ele, String$1$1(key), classtext);
                    return true;
                } else {
                    if (false === v || v === null || v === undefined) {
                        removeAttribute(ele, String$1$1(key));
                        return true;
                    }
                    if (isSet$1(v)) {
                        setattribute(ele, String$1$1(key), JSON.stringify([ ...v ]));
                        return true;
                    } else {
                        if (v === true) {
                            v = "";
                        }
                        setattribute(ele, String$1$1(key), isobject$1(v) ? JSON.stringify(v) : String$1$1(v));
                        return true;
                    }
                }
            },
            deleteProperty(t, k) {
                removeAttribute(ele, String$1$1(k));
                return true;
            },
            has(target, key) {
                return ownKeys$1(outputattrs).includes(key);
            },
            defineProperty() {
                return false;
            },
            getOwnPropertyDescriptor(target, key) {
                const otherdescipter = {
                    enumerable: true,
                    configurable: true,
                    writable: true
                };
                const myvalue = get(outputattrs, key);
                if (typeof myvalue !== "undefined") {
                    return _objectSpread2({
                        value: myvalue
                    }, otherdescipter);
                } else {
                    return;
                }
            },
            setPrototypeOf() {
                return false;
            }
        });
        return outputattrs;
    }
    function attributesownkeys(ele) {
        return ele.getAttributeNames();
    }
    function getattribute(ele, key) {
        return ele.getAttribute(key);
    }
    function geteletagname(ele) {
        return ele.tagName.toLowerCase();
    }
    function setattribute(ele, key, value) {
        return ele.setAttribute(key, value);
    }
    function removeAttribute(ele, key) {
        return ele.removeAttribute(key);
    }
    function isinputtextortextarea(ele) {
        const tagname = geteletagname(ele);
        return tagname === "textarea" || tagname === "select" || tagname === "input" && get(ele, "type") === "text";
    }
    function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
    }
    var isObject_1 = isObject;
    var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window$1 !== "undefined" ? window$1 : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object$1 && commonjsGlobal;
    var _freeGlobal = freeGlobal;
    var freeSelf = typeof self == "object" && self && self.Object === Object$1 && self;
    var root = _freeGlobal || freeSelf || Function("return this")();
    var _root = root;
    var now = function now() {
        return _root.Date.now();
    };
    var now_1 = now;
    var Symbol$1 = _root.Symbol;
    var _Symbol = Symbol$1;
    var objectProto = Object$1.prototype;
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
    var objectProto$1 = Object$1.prototype;
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
        return symToStringTag$1 && symToStringTag$1 in Object$1(value) ? _getRawTag(value) : _objectToString(value);
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
    var nativeMax = Math$1.max, nativeMin = Math$1.min;
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
            timerId = setTimeout$1(timerExpired, wait);
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
            timerId = setTimeout$1(timerExpired, remainingWait(time));
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
                    timerId = setTimeout$1(timerExpired, wait);
                    return invokeFunc(lastCallTime);
                }
            }
            if (timerId === undefined) {
                timerId = setTimeout$1(timerExpired, wait);
            }
            return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
    }
    var debounce_1 = debounce;
    const cached_callback_eventlistner = new WeakMap;
    const cached_create_componet = new WeakMap;
    const cached_callback_debounced_watchs = new WeakMap;
    const {apply: apply, construct: construct, defineProperty: defineProperty, deleteProperty: deleteProperty, getOwnPropertyDescriptor: getOwnPropertyDescriptor, getPrototypeOf: getPrototypeOf, has: has, ownKeys: ownKeys$1$1, preventExtensions: preventExtensions} = Reflect;
    function get$1(target, propertyKey) {
        if (isMap(target) || isWeakMap(target)) {
            return target.get(propertyKey);
        } else {
            return Reflect.get(target, propertyKey);
        }
    }
    function set$1(target, propertyKey, value) {
        if (isMap(target) || isWeakMap(target)) {
            target.set(propertyKey, value);
            return true;
        } else {
            return Reflect.set(target, propertyKey, value);
        }
    }
    let watchrecord = [];
    function getwatchrecords() {
        return [ ...watchrecord ];
    }
    function usewatch(state, callback) {
        if (ctxopen) {
            watchrecord.push([ state, callback ]);
        }
    }
    function clearwatch() {
        watchrecord = [];
    }
    const invalid_Function = "invalid Function";
    const errormessage = "invalid useMounted or useUnMounted out of createComponent";
    let ctxopen = false;
    let MountedSet = new Set$1;
    let UnMountedSet = new Set$1;
    let StateSet = new Set$1;
    function getstates() {
        return [ ...StateSet ];
    }
    function recordusestste(state) {
        if (ctxopen) {
            StateSet.add(state);
        }
    }
    function getMounted() {
        return [ ...MountedSet ];
    }
    function getUnMounted() {
        return [ ...UnMountedSet ];
    }
    function useMounted(fun) {
        if (isfunction(fun)) {
            if (ctxopen) {
                MountedSet.add(fun);
            } else {
                console.error(errormessage);
                throw Error();
            }
        } else {
            console.error(fun);
            console.error(invalid_Function);
            throw TypeError();
        }
    }
    function useUnMounted(fun) {
        if (isfunction(fun)) {
            if (ctxopen) {
                UnMountedSet.add(fun);
            } else {
                console.error(errormessage);
                throw Error();
            }
        } else {
            console.error(fun);
            console.error(invalid_Function);
            throw TypeError();
        }
    }
    function clearMounted() {
        MountedSet = new Set$1;
    }
    function clearstate() {
        StateSet = new Set$1;
    }
    function clearUnMounted() {
        UnMountedSet = new Set$1;
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
        clearMounted();
        clearUnMounted();
        clearstate();
        clearwatch();
    }
    var _a, _b;
    const addonelistner = Symbol("addonelistner");
    const removeonelistner = Symbol("removeonelistner");
    const cancelsubscribe = Symbol("cancelsubscribe");
    const debouncedispatch = Symbol("debouncedispatch");
    const invalid_primitive_or_object_state = "invalid primitive or object state";
    function isReactiveState(a) {
        return a instanceof ReactiveState && a[Symbol.toStringTag] === "ReactiveState";
    }
    const eventtargetsymbol = Symbol("eventtatget");
    const memlisteners = Symbol("memlisteners");
    const dispatchsymbol = Symbol("dispatch");
    const subscribesymbol = Symbol("subscribe");
    const removeallistenerssymbol = Symbol("removeallisteners");
    const addallistenerssymbol = Symbol("addallisteners");
    class ReactiveState {
        constructor(init) {
            this[Symbol.toStringTag] = "ReactiveState";
            this[_a] = new EventTarget;
            this[_b] = new Set$1;
            this.valueOf = () => {
                return this.value;
            };
            this.value = init;
            defineProperty(this, "value", {
                value: init,
                configurable: true,
                writable: true
            });
            recordusestste(this);
            const debouncedfun = debounce_1(eventname => {
                const name = eventname ? String$1(eventname) : "value";
                this[eventtargetsymbol].dispatchEvent(new CustomEvent("value", {
                    detail: name
                }));
            });
            this[debouncedispatch] = eventname => {
                debouncedfun(eventname);
            };
        }
        [removeallistenerssymbol]() {
            this[memlisteners].forEach(callback => {
                this[removeonelistner](callback);
            });
        }
        [removeonelistner](callback) {
            const name = "value";
            this[eventtargetsymbol].removeEventListener(name, callback);
        }
        [addonelistner](callback) {
            const name = "value";
            this[eventtargetsymbol].addEventListener(name, callback);
        }
        [addallistenerssymbol]() {
            this[memlisteners].forEach(callback => {
                this[addonelistner](callback);
            });
        }
        toString() {
            const value = this.valueOf();
            return isprimitive(value) ? String$1(value) : isSet(value) ? JSON.stringify([ ...value ]) : isobject(value) ? JSON.stringify(value) : "";
        }
        [(_a = eventtargetsymbol, _b = memlisteners, dispatchsymbol)](eventname) {
            this[debouncedispatch](eventname);
        }
        [subscribesymbol](callback) {
            let eventlistener;
            const possiblecallback = cached_callback_eventlistner.get(callback);
            if (possiblecallback) {
                eventlistener = possiblecallback;
            } else {
                eventlistener = () => callback();
                cached_callback_eventlistner.set(callback, eventlistener);
            }
            this[memlisteners].add(eventlistener);
        }
        [cancelsubscribe](callback) {
            const eventlistener = cached_callback_eventlistner.get(callback);
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
    function merge_entries(a) {
        const m = {};
        a.forEach(([key, value]) => {
            if (!m[key]) {
                m[key] = new Set$1;
            }
            value.forEach(v => {
                m[key].add(v);
            });
        });
        return Object$1.entries(m).map(([k, v]) => [ k, [ ...v ] ]);
    }
    const VirtualElementSet = new WeakSet;
    const Letter_case_and_Chinese = /[A-Za-z\u4e00-\u9fa5]/;
    function isVirtualdom(a) {
        return VirtualElementSet.has(a);
    }
    function createVirtualElement(type, props = {}, children = []) {
        props = Object$1.assign({}, props);
        children = children.flat(1 / 0);
        const propsentries = Object$1.entries(props);
        const propsentriesNOTevents = propsentries.filter(([key]) => !(key.startsWith("@") || key.startsWith("on")));
        const Entries_beginning_with_a_letter = propsentriesNOTevents.filter(([key]) => Letter_case_and_Chinese.test(key[0]));
        const thisarg = Object$1.create(null);
        [ "onevent", "element", "type", "props", "children", "directives", "bindattr" ].forEach(key => {
            defineProperty(thisarg, key, {
                writable: true
            });
        });
        Object$1.assign(thisarg, {
            type: type,
            bindattr: Object$1.fromEntries(Entries_beginning_with_a_letter.filter(e => isReactiveState(e[1]))),
            props: Object$1.fromEntries(Entries_beginning_with_a_letter.filter(e => !isReactiveState(e[1])).map(([key, value]) => [ key, isstring(value) ? value.trim() : value ])),
            children: children,
            onevent: Object$1.fromEntries(merge_entries([ ...propsentries.filter(([key]) => "@" == key[0]).map(([key, value]) => [ key.slice(1).toLowerCase().trim(), [ value ].flat(1 / 0) ]), ...propsentries.filter(([key]) => key.startsWith("on")).map(([key, value]) => [ key.slice(2).toLowerCase().trim(), [ value ].flat(1 / 0) ]) ])),
            directives: Object$1.fromEntries(propsentriesNOTevents.filter(([key]) => key[0] === "*" || key[0] === "_" || key[0] === "$").map(([key, value]) => [ key.slice(1).toLowerCase().trim(), value ]))
        });
        defineProperty(thisarg, Symbol.toStringTag, {
            value: "VirtualElement"
        });
        preventExtensions(thisarg);
        VirtualElementSet.add(thisarg);
        return thisarg;
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
    function isCSSStyleRule(a) {
        return gettagtype(a) === "CSSStyleRule";
    }
    function isCSSMediaRule(a) {
        return gettagtype(a) === "CSSMediaRule";
    }
    function isCSSImportRule(a) {
        return gettagtype(a) === "CSSImportRule";
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
    function cssrulestocsstext(cssrules) {
        return cssrules.map(c => c.cssText).join("\n");
    }
    const charactorlist = Array$1(26).fill(undefined).map((v, i) => 97 + i).map(n => String$1.fromCharCode(n));
    const hexnumberlist = Array$1(16).fill(undefined).map((v, i) => i).map(a => a.toString(16));
    const charactorandnumberlist = [ ...new Set$1([ ...hexnumberlist, ...charactorlist ]) ];
    function getrandomcharactor() {
        return get$1(charactorlist, Math$1.floor(Math$1.random() * charactorlist.length));
    }
    function getrandomhexnumberandcharactor() {
        return get$1(charactorandnumberlist, Math$1.floor(Math$1.random() * charactorandnumberlist.length));
    }
    function getrandomstringandnumber(length = 1) {
        return Array$1(length).fill(undefined).map(() => getrandomcharactor()).join("") + "-" + Array$1(length).fill(undefined).map(() => getrandomhexnumberandcharactor()).join("");
    }
    const invalid_custom_element_class = "invalid custom element class !";
    if (!isobject(window$1.customElements)) {
        console.error(" customElements  not supported !");
        throw new TypeError;
    }
    function Usevaluetoquerythekeyfromthetable(table, Componentstatusname) {
        const outputentrie = Object$1.entries(table).find(v => {
            return v[1] === Componentstatusname;
        });
        return outputentrie ? outputentrie[0] : undefined;
    }
    window$1.CustomElementRegistry = get$1(getPrototypeOf(window$1.customElements), "constructor");
    const elementset = Symbol.for("elementset");
    const elementmap = Symbol.for("elementmap");
    const {CustomElementRegistry: CustomElementRegistry} = window$1;
    const customElements$1$1 = window$1.customElements;
    if (!has(customElements$1$1, elementset)) {
        Reflect.set(customElements$1$1, elementset, new Set$1);
    }
    if (!has(customElements$1$1, elementmap)) {
        Reflect.set(customElements$1$1, elementmap, {});
    }
    var RandomDefineCustomElement = (initclass, extendsname) => RandomDefineCustomElement$1(initclass, extendsname);
    function RandomDefineCustomElement$1(initclass, extendsname, length = 1) {
        if (!isclassextendsHTMLElement(initclass)) {
            console.error(initclass);
            console.error(invalid_custom_element_class);
            throw TypeError();
        }
        if (!get$1(customElements$1$1, elementset).has(initclass)) {
            const elementname = getrandomstringandnumber(length);
            if (customElements$1$1.get(elementname)) {
                return RandomDefineCustomElement$1(initclass, extendsname, length + 1);
            } else {
                if (extendsname) {
                    customElements$1$1.define(elementname, initclass, {
                        extends: extendsname
                    });
                } else {
                    customElements$1$1.define(elementname, initclass);
                }
            }
            return elementname;
        } else {
            return Usevaluetoquerythekeyfromthetable(get$1(customElements$1$1, elementmap), initclass);
        }
    }
    customElements$1$1.define = function(name, constructor, options) {
        if (!isclassextendsHTMLElement(constructor)) {
            console.error(constructor);
            console.error(invalid_custom_element_class);
            throw TypeError();
        }
        if (!get$1(customElements$1$1, elementset).has(constructor)) {
            if (has(customElements$1$1[elementmap], name)) {
                RandomDefineCustomElement$1(constructor, options ? options.extends : undefined);
            } else {
                CustomElementRegistry.prototype.define.call(customElements$1$1, name, constructor, options);
                customElements$1$1[elementset].add(constructor);
                customElements$1$1[elementmap][name] = constructor;
            }
        }
    };
    set$1(customElements$1$1, Symbol.iterator, () => {
        const entries = Object$1.entries(customElements$1$1[elementmap]);
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
        return isfunction(a) && get$1(a, componentsymbol) === componentsymbol;
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
        return document$1.createDocumentFragment();
    }
    function createnativeelement(type) {
        return document$1.createElement(type);
    }
    function createElementNS(namespace, name) {
        return document$1.createElementNS(namespace, name);
    }
    function createtextnode(data) {
        return document$1.createTextNode(String$1(data));
    }
    const svgnamespace = "http://www.w3.org/2000/svg";
    function changetext(textnode, value) {
        textnode.nodeValue = String$1(value);
    }
    const mathnamespace = "http://www.w3.org/1998/Math/MathML";
    function createmathelement() {
        return createElementNS(mathnamespace, "math");
    }
    function removeElement(element) {
        element.remove();
    }
    function domaddlisten(ele, event, call) {
        ele.addEventListener(event, call);
    }
    function domremovelisten(ele, event, call) {
        ele.removeEventListener(event, call);
    }
    function getchildren(ele) {
        return [ ...ele.children ];
    }
    function getchildNodes(ele) {
        return [ ...ele.childNodes ];
    }
    function getAttribute(ele, name) {
        return HTMLElementprototype.getAttribute.call(ele, name);
    }
    function setAttribute(ele, name, value) {
        HTMLElementprototype.setAttribute.call(ele, name, value);
    }
    function removeAttribute$1(ele, name) {
        HTMLElementprototype.removeAttribute.call(ele, name);
    }
    const HTMLElementprototype = HTMLElement.prototype;
    function createanotherhtmldocument() {
        return document$1.implementation.createHTMLDocument("");
    }
    function querySelectorAll(selector) {
        return [ ...document$1.querySelectorAll(selector) ];
    }
    function toArray(a) {
        return (isarray(a) ? a : [ a ]).flat(1 / 0).filter(a => !isundefined(a));
    }
    function mountrealelement(ele, container, clear = true) {
        if (clear) {
            seteletext(container, "");
        }
        const eles = toArray(ele).flat(Infinity);
        eles.forEach(e => appendchild(container, e));
        return container;
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
        if (el === document$1.body || el === document$1.documentElement || el === document$1.head) {
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
        requestAnimationFrame$1(() => {
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
    function isconnected(element) {
        const isConnectedstate = element.isConnected;
        if (isboolean(isConnectedstate)) {
            return isConnectedstate;
        } else {
            return document$1.documentElement === getancestornode(element);
        }
    }
    function getancestornode(node) {
        while (node && node.parentNode && node.parentNode !== document$1) {
            node = node.parentNode;
        }
        return node;
    }
    function createhtmlandtextdirective(seteletext, errorname) {
        return function(ele, text) {
            const element = ele;
            if (isstring(text)) {
                requestAnimationFrame$1(() => {
                    seteletext(ele, text);
                });
            } else if (isReactiveState(text)) {
                watch(text, () => {
                    const state = text;
                    if (isconnected(element)) {
                        seteletext(ele, String$1(state));
                    }
                });
                requestAnimationFrame$1(() => {
                    seteletext(ele, String$1(text));
                });
            } else {
                console.error(text);
                console.error("invalid " + errorname);
                throw TypeError();
            }
        };
    }
    function extenddirectives(options = {}) {
        if (!isplainobject(options)) {
            console.error(options);
            throw new TypeError;
        }
        Object$1.entries(options).forEach(([key, value]) => {
            if (typeof value !== "function") {
                console.error(value);
                console.error(invalid_Function);
                throw TypeError();
            } else {
                if (!directive[key]) {
                    Reflect.set(directive, key, value);
                } else {
                    console.error(directive);
                    console.error("do not extend existing directive");
                    throw new Error;
                }
            }
        });
        return directive;
    }
    const directive = {
        ref(ref, ele, _vdom) {
            if (isfunction(ref)) {
                apply(ref, undefined, [ ele ]);
            } else if (isobject(ref)) {
                set$1(ref, "value", ele);
            } else {
                console.log(_vdom);
                console.error(ref);
                console.error("invalid ref");
                throw TypeError();
            }
        }
    };
    extenddirectives({
        html(html, ele, _vdom) {
            console.log(_vdom);
            createhtmlandtextdirective(setelehtml, "html")(ele, html);
        },
        text(text, ele, _vdom) {
            console.log(_vdom);
            createhtmlandtextdirective(seteletext, "text")(ele, text);
        }
    });
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
                set$1(element, eventlistenerssymbol, []);
            }
            get$1(ele, eventlistenerssymbol).push([ event, call ]);
            domaddlisten(ele, event, call);
        });
    }
    function removelisteners(ele) {
        if (has(ele, eventlistenerssymbol)) {
            get$1(ele, eventlistenerssymbol).forEach(([event, call]) => {
                domremovelisten(ele, event, call);
            });
        }
    }
    function readdlisteners(ele) {
        if (has(ele, eventlistenerssymbol)) {
            get$1(ele, eventlistenerssymbol).forEach(([event, call]) => {
                domaddlisten(ele, event, call);
            });
        }
    }
    function handleprops(element, vdom) {
        ((element, vdom) => {
            Object$1.entries(vdom.directives).forEach(([name, value]) => {
                if (isfunction(directive[name])) {
                    directive[name](value, element, vdom);
                } else {
                    console.error(vdom.directives);
                    console.error("invalid directives " + name);
                    throw new Error;
                }
            });
            const attribute1 = createeleattragentreadwrite(element);
            Object$1.assign(attribute1, vdom.props);
            vdom.element = element;
            Object$1.entries(vdom.bindattr).forEach(([key, primitivestate]) => {
                attribute1[key] = primitivestate.valueOf();
                watch(primitivestate, () => {
                    const state = primitivestate;
                    if (isconnected(element)) {
                        attribute1[key] = state.valueOf();
                    }
                });
            });
            Object$1.entries(vdom.onevent).forEach(([event, callbacks]) => {
                onevent(element, event, callbacks);
            });
        })(element, vdom);
        [ ...Object$1.values(vdom.bindattr), ...Object$1.values(vdom.directives) ].flat(1 / 0).filter(e => isReactiveState(e)).forEach(e => {
            if (!has(element, bindstatesymbol)) {
                set$1(element, bindstatesymbol, new Set$1);
            }
            get$1(element, bindstatesymbol).add(e);
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
            const textnode = createtextnode(String$1(reactive));
            watch(reactive, () => {
                const state = reactive;
                if (isconnected(element)) {
                    changetext(textnode, String$1(state));
                }
            });
            const element = textnode;
            set$1(element, bindstatesymbol, new Set$1);
            get$1(element, bindstatesymbol).add(reactive);
            return textnode;
        } else if (isVirtualdom(vdom)) {
            let {type: type} = vdom;
            if (isfunction(type)) {
                type = autocreateclass(type);
            }
            let element = undefined;
            if (typeof type === "string") {
                if (type === "script") {
                    return createDocumentFragment();
                } else if (type === "svg") {
                    element = createsvgelement();
                } else if (type === "math") {
                    element = createmathelement();
                } else if ("" === type || type === "html") {
                    const fragmentnode = createDocumentFragment();
                    mountrealelement(render(vdom.children), fragmentnode);
                    return fragmentnode;
                } else {
                    element = namespace ? createElementNS(namespace, type) : createnativeelement(type);
                }
            } else if (typeof type == "function") {
                if (isobject(type["defaultProps"])) {
                    vdom.props = JSON.parse(JSON.stringify(_objectSpread2({}, type["defaultProps"], {}, vdom.props)));
                }
                const propsjson = JSON.parse(JSON.stringify(_objectSpread2({}, vdom.props, {}, Object$1.fromEntries(Object$1.entries(vdom.bindattr).map(([key, value]) => {
                    return [ key, value.value ];
                })))));
                element = createcostumelemet(type, propsjson, vdom.children);
            } else {
                throwinvalideletype(vdom);
            }
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
        throw new Error;
    }
    const componentsstylesheet = new Map;
    function createlinkstylesheet(url) {
        return render(h("link", {
            href: url,
            rel: "stylesheet"
        }));
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
        if (!get$1(componentsstylesheet, prefix)) {
            set$1(componentsstylesheet, tagname, new Set$1);
        }
        if (csstext) {
            get$1(componentsstylesheet, prefix).add(createcssBlob(csstext));
        } else if (urltext) {
            get$1(componentsstylesheet, prefix).add(urltext);
        }
    }
    function prefixcssrules(cssRulesarray, prefix) {
        return cssRulesarray.map(cssrule => {
            if (isCSSStyleRule(cssrule)) {
                const resultoutput = selectoraddprefix(cssrule, prefix);
                return resultoutput;
            } else if (isCSSMediaRule(cssrule)) {
                const rulesarr = prefixcssrules([ ...cssrule.cssRules ], prefix);
                const conditionText = cssrule.conditionText;
                const cssText = cssrule.cssText.slice(0, 7) + conditionText + "{" + cssrulestocsstext(rulesarr) + "}";
                return {
                    cssText: cssText,
                    conditionText: conditionText,
                    cssRules: rulesarr,
                    [Symbol.toStringTag]: "CSSMediaRule"
                };
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
        return Array$1.from(get$1(get$1(styleelement, "sheet"), "cssRules"));
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
        return Promise.all([ ...get$1(componentsstylesheet, prefix) ].map(styleurl => {
            if (querySelectorAll('link[rel="stylesheet"][href="'.concat(styleurl, '"]')).length) {
                return Promise.resolve();
            } else {
                return loadlinkstyle(createlinkstylesheet(styleurl), containerthis);
            }
        }));
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
    function setimmediate(fun) {
        return Promise.resolve().then(() => fun());
    }
    const readysymbol = Symbol("readystate");
    function onmounted(ele) {
        if (isarray(ele)) {
            ele.forEach(e => {
                onmounted(e);
            });
        } else if (isNode(ele)) {
            readdlisteners(ele);
            if (has(ele, bindstatesymbol)) {
                get$1(ele, bindstatesymbol).forEach(state => {
                    rewatch(state);
                    state[dispatchsymbol]();
                });
            }
            if (has(ele, innerstatesymbol)) {
                get$1(ele, innerstatesymbol).forEach(state => {
                    rewatch(state);
                });
            }
            if (has(ele, innerwatchrecords)) {
                const watchrecords = get$1(ele, innerwatchrecords);
                watchrecords.forEach(([state, callback]) => {
                    const eventlistener = cached_callback_eventlistner.get(callback);
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
                get$1(ele, innerstatesymbol).forEach(state => {
                    unwatch(state);
                });
            }
            if (has(ele, innerwatchrecords)) {
                const watchrecords = get$1(ele, innerwatchrecords);
                watchrecords.forEach(([state, callback]) => {
                    const eventlistener = cached_callback_eventlistner.get(callback);
                    if (eventlistener) {
                        state[removeonelistner](eventlistener);
                    }
                });
            }
            onunmounted(getchildNodes(ele));
        }
    }
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
            const defaultProps = get$1(this.constructor, "defaultProps");
            const attrs = createeleattragentreadwrite(this);
            if (isobject(defaultProps)) {
                Object$1.assign(attrs, defaultProps);
            }
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
                    const callback = get$1(this, firstinstalledcallback);
                    if (isfunction(callback)) {
                        setimmediate(() => {
                            callback.call(this);
                        });
                    }
                }
                onmounted(this);
            });
        }
        setAttribute(qualifiedName, value) {
            const callback = get$1(this, attributeChangedCallback);
            const oldValue = getAttribute(this, qualifiedName);
            if (oldValue !== value) {
                setAttribute(this, qualifiedName, value);
                if (isfunction(callback)) {
                    callback.call(this, qualifiedName, oldValue, value);
                }
            }
        }
        removeAttribute(qualifiedName) {
            const callback = get$1(this, attributeChangedCallback);
            const oldValue = getAttribute(this, qualifiedName);
            if (null !== oldValue) {
                removeAttribute$1(this, qualifiedName);
                if (isfunction(callback)) {
                    callback.call(this, qualifiedName, oldValue, undefined);
                }
            }
        }
    }
    _a$1 = readysymbol;
    const waittranformcsssymbol = Symbol("waittranformcss");
    const innerwatchrecords = Symbol("innerwatchrecord");
    const innerstatesymbol = Symbol("innerstate");
    const attributessymbol = Symbol("attributes");
    const elementsymbol = Symbol("innerelement");
    const inner_vdom_symbol = Symbol("innervdom");
    const mountedsymbol = Symbol("mounted");
    const unmountedsymbol = Symbol("unmounted");
    function createComponent(custfun) {
        var _a, _b, _c;
        if (isfunction(custfun)) {
            const cached_class = cached_create_componet.get(custfun);
            if (cached_class) {
                return cached_class;
            }
            const defaultProps = get$1(custfun, "defaultProps");
            const css = get$1(custfun, "css");
            class Component extends AttrChange {
                constructor(propsjson = {}, children = []) {
                    super();
                    this[_a] = {};
                    this[_c] = false;
                    const css = get$1(this.constructor, "css");
                    if (css) {
                        const prefix = this.tagName.toLowerCase();
                        if (!get$1(componentsstylesheet, prefix)) {
                            set$1(componentsstylesheet, prefix, new Set$1);
                            this[waittranformcsssymbol] = () => {
                                return setimmediate(() => {
                                    registercssprefix(css, prefix);
                                });
                            };
                        }
                    }
                    const attrs = createeleattragentreadwrite(this);
                    if (isobject(propsjson)) {
                        Object$1.assign(attrs, propsjson);
                    }
                    const props = attrs;
                    openctx();
                    const thisattributess = Object$1.fromEntries(Object$1.entries(props).map(([key]) => [ key, (() => {
                        const attributes = createeleattragentreadwrite(this);
                        const state = new ReactiveState;
                        defineProperty(state, "value", {
                            get() {
                                return get$1(attributes, key);
                            },
                            configurable: true
                        });
                        return state;
                    })() ]));
                    this[attributessymbol] = thisattributess;
                    const readonlyprop = readonlyproxy(Object$1.fromEntries(Object$1.entries(thisattributess).map(([key, value]) => [ key, readonlyproxy(value) ])));
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
                        this[mountedsymbol] = getMounted();
                        this[unmountedsymbol] = getUnMounted();
                        this[innerstatesymbol] = getstates();
                        this[innerwatchrecords] = getwatchrecords();
                        closectx();
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
                        return waitloadallstyle(prefix, document$1.head);
                    };
                    const thencallbacksecond = () => {
                        mountrealelement(this[elementsymbol], this, false);
                        this[waittranformcsssymbol] = undefined;
                    };
                    if (!this[elementsymbol]) {
                        this[elementsymbol] = render(this[inner_vdom_symbol]).flat(Infinity);
                    }
                    const css = get$1(this.constructor, "css");
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
                        this[mountedsymbol].forEach(f => {
                            setimmediate(f);
                        });
                    });
                }
                disconnectedCallback() {
                    setimmediate(() => {
                        disconnectedCallback(this);
                        this[unmountedsymbol].forEach(f => {
                            setimmediate(f);
                        });
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
    var createComponent$1 = custfun => autocreateclass(custfun);
    function autocreateclass(custfun) {
        if (isclassextendsHTMLElement(custfun)) {
            return custfun;
        } else if (isfunction(custfun)) {
            return createComponent(custfun);
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
    function conditon(conditon, iftrue, iffalse) {
        var _a, _b, _c, _d;
        if (!(isReactiveState(conditon) || isboolean(conditon))) {
            console.error(conditon);
            console.error(invalid_ReactiveState);
            throw TypeError();
        }
        [ iftrue, iffalse ].forEach(a => {
            if (!(isundefined(a) || isvalidvdom(a))) {
                console.error(a);
                console.error(invalid_Virtualdom);
                throw new TypeError;
            }
        });
        const options = {
            true: iftrue,
            false: iffalse
        };
        const optionstrue = get$1(options, "true");
        const optionsfalse = get$1(options, "false");
        class Condition extends AttrChange {
            constructor() {
                super(...arguments);
                this[_b] = false;
                this[_c] = [ optionstrue ].flat(1 / 0).filter(Boolean);
                this[_d] = [ optionsfalse ].flat(1 / 0).filter(Boolean);
            }
            [(_a = componentsymbol, _b = readysymbol, _c = truevdomsymbol, _d = falsevdomsymbol, 
            handlefalse)]() {
                setelehtml(this, "");
                if (this[falsevdomsymbol]) {
                    if (!this[falseelesymbol]) {
                        this[falseelesymbol] = render(this[falsevdomsymbol]);
                    }
                    const elementtomount = this[falseelesymbol];
                    mountrealelement(elementtomount, this);
                    onmounted(elementtomount);
                    if (this[trueelesymbol]) {
                        onunmounted(this[trueelesymbol]);
                    }
                }
            }
            [handletrue]() {
                setelehtml(this, "");
                if (this[truevdomsymbol]) {
                    if (!this[trueelesymbol]) {
                        this[trueelesymbol] = render(this[truevdomsymbol]);
                    }
                    const elementtomount = this[trueelesymbol];
                    mountrealelement(elementtomount, this);
                    onmounted(elementtomount);
                    if (this[falseelesymbol]) {
                        onunmounted(this[falseelesymbol]);
                    }
                }
            }
            [firstinstalledcallback]() {
                const attrs = createeleattragentreadwrite(this);
                if (true === attrs["value"]) {
                    get$1(this, handletrue).call(this);
                } else if (!attrs["value"]) {
                    get$1(this, handlefalse).call(this);
                }
            }
            connectedCallback() {
                connectedCallback(this);
            }
            disconnectedCallback() {
                disconnectedCallback(this);
            }
            [attributeChangedCallback](name) {
                if (this[readysymbol]) {
                    if (name === "value") {
                        const attrs = createeleattragentreadwrite(this);
                        if (true === attrs["value"]) {
                            this[handletrue]();
                        } else if (!attrs["value"]) {
                            this[handlefalse]();
                        }
                    }
                }
            }
        }
        Condition[_a] = componentsymbol;
        const vdom = h(Condition, {
            value: conditon
        });
        return vdom;
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
                let myvalue = get$1(target, "value");
                const myvalueobj = isobject(myvalue) ? myvalue : myvalue[__proto__];
                return Array$1.from(new Set$1([ ...ownKeys$1$1(target), ...ownKeys$1$1(myvalueobj) ]));
            },
            has(target, key) {
                const myvalue = get$1(target, "value");
                const myvalueobj = isobject(myvalue) ? myvalue : myvalue[__proto__];
                return has(target, key) || has(myvalueobj, key);
            },
            get(target, key) {
                if (has(target, key)) {
                    return get$1(target, key);
                } else {
                    const myvalue = get$1(target, "value");
                    const myvalueobj = Object$1(myvalue);
                    if (has(myvalueobj, key)) {
                        const property = get$1(myvalueobj, key);
                        return isfunction(property) ? property.bind(myvalueobj) : property;
                    }
                }
            }
        });
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
            throw new Error;
        }
        const state1 = Arraycomputed(state1array, callback, setter);
        return state1;
    }
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
    const Setprototype = Set$1.prototype;
    const Mapprototype = Map.prototype;
    function ispromise(a) {
        return a instanceof Promise;
    }
    function isdate(a) {
        return a instanceof Date;
    }
    function isregexp(a) {
        return a instanceof RegExp;
    }
    function isMap$1(a) {
        return a instanceof Map;
    }
    function isSet$2(a) {
        return a instanceof Set$1;
    }
    function isArray$1(a) {
        return Array$1.isArray(a);
    }
    const Reflect$2 = window$1.Reflect;
    const {ownKeys: ownKeys$2, deleteProperty: deleteProperty$1, apply: apply$1, construct: construct$1, defineProperty: defineProperty$1, get: get$2, getOwnPropertyDescriptor: getOwnPropertyDescriptor$1, getPrototypeOf: getPrototypeOf$1, has: has$1, set: set$2, setPrototypeOf: setPrototypeOf} = Reflect$2;
    function isobject$2(a) {
        return typeof a === "object" && a !== null;
    }
    function isfunction$1(a) {
        return typeof a === "function";
    }
    function deepobserveaddpath(target, callback, patharray = [], ancestor = target) {
        if (!isfunction$1(callback)) {
            console.error(callback);
            console.error("observe callback invalid !");
            throw Error();
        }
        if (ispromise(target) || isregexp(target) || isdate(target)) {
            return target;
        }
        if (isfunction$1(target) || isobject$2(target)) {
            let fakeobj;
            if (isSet$2(target)) {
                fakeobj = new Set$1([ ...target ]);
                set$2(fakeobj, "add", value => {
                    Setprototype.add.call(target, value);
                    callback(ancestor, patharray, undefined, undefined);
                    return Setprototype.add.call(fakeobj, value);
                });
                set$2(fakeobj, "delete", value => {
                    Setprototype.delete.call(target, value);
                    callback(ancestor, patharray, undefined, undefined);
                    return Setprototype.delete.call(fakeobj, value);
                });
                set$2(fakeobj, "clear", () => {
                    Setprototype.clear.call(target);
                    callback(ancestor, patharray, undefined, undefined);
                    return Setprototype.clear.call(fakeobj);
                });
            } else if (isMap$1(target)) {
                fakeobj = new Map([ ...target ]);
                set$2(fakeobj, "clear", () => {
                    Mapprototype.clear.call(target);
                    callback(ancestor, patharray, undefined, undefined);
                    return Mapprototype.clear.call(fakeobj);
                });
                set$2(fakeobj, "set", (key, value) => {
                    Mapprototype.set.call(target, key, value);
                    callback(ancestor, patharray, undefined, undefined);
                    return Mapprototype.set.call(fakeobj, key, value);
                });
                set$2(fakeobj, "delete", value => {
                    Mapprototype.delete.call(target, value);
                    callback(ancestor, patharray, undefined, undefined);
                    return Mapprototype.delete.call(fakeobj, value);
                });
            } else if (isArray$1(target)) {
                fakeobj = [];
            } else if (isfunction$1(target)) {
                fakeobj = () => {};
            } else {
                fakeobj = {};
            }
            if (!isSet$2(target) && !isMap$1(target)) {
                setPrototypeOf(fakeobj, null);
            }
            return new Proxy(fakeobj, {
                defineProperty(t, p, a) {
                    callback(ancestor, [ ...patharray, String$1(p) ], has$1(a, "value") ? a.value : isfunction$1(a.get) ? a.get() : undefined, get$2(target, p));
                    return defineProperty$1(target, p, a);
                },
                deleteProperty(t, p) {
                    callback(ancestor, [ ...patharray, String$1(p) ], undefined, get$2(target, p));
                    return deleteProperty$1(target, p);
                },
                ownKeys() {
                    return ownKeys$2(target);
                },
                has(t, p) {
                    return has$1(target, p);
                },
                getPrototypeOf() {
                    return getPrototypeOf$1(target);
                },
                setPrototypeOf(t, v) {
                    return setPrototypeOf(target, v);
                },
                construct(t, argumentslist) {
                    if (isfunction$1(target)) {
                        return construct$1(target, argumentslist);
                    }
                },
                apply(t, thisarg, argarray) {
                    if (isfunction$1(target)) {
                        return apply$1(target, thisarg, argarray);
                    }
                },
                getOwnPropertyDescriptor(t, k) {
                    var descripter = getOwnPropertyDescriptor$1(target, k);
                    if (isArray$1(target) && k === "length") {
                        return descripter;
                    } else {
                        if (descripter) {
                            descripter.configurable = true;
                            return descripter;
                        } else {
                            return;
                        }
                    }
                },
                set(t, k, v) {
                    if (isfunction$1(callback)) {
                        callback(ancestor, [ ...patharray, String$1(k) ], v, get$2(target, k));
                    }
                    return set$2(target, k, v);
                },
                get(t, k) {
                    var value = get$2(target, k);
                    if (isfunction$1(value) && (isSet$2(target) || isMap$1(target))) {
                        return get$2(fakeobj, k).bind(fakeobj);
                    }
                    if (isfunction$1(value) || isobject$2(value)) {
                        return deepobserveaddpath(value, callback, [ ...patharray, String$1(k) ], target);
                    } else {
                        return value;
                    }
                }
            });
        } else {
            return target;
        }
    }
    function observedeepagent(target, callback) {
        if (!isfunction$1(callback)) {
            console.error(callback);
            console.error("observe callback  invalid function !");
            throw Error();
        }
        if (!isfunction$1(Proxy)) {
            console.error("Proxy unsupported!");
            throw Error();
        }
        if (isfunction$1(target) || isobject$2(target)) {
            return deepobserveaddpath(target, callback);
        } else {
            return target;
        }
    }
    function handleobjectstate(init) {
        const reactive = new ReactiveState(init);
        let initobj = init;
        const containReactiveState = isplainobject(init) && Object$1.values(init).some(a => isReactiveState(a));
        const state_entries = Object$1.entries(init).filter(e => {
            const a = e[1];
            return isReactiveState(a);
        });
        if (containReactiveState) {
            initobj = Object$1.assign({}, init);
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
                    reactive[dispatchsymbol](String$1(key));
                });
            });
        }
        reactive.value = initobj;
        const objproxyhandler = {};
        objproxyhandler.ownKeys = target => {
            return Array$1.from(new Set$1([ ...ownKeys$1$1(target), ...ownKeys$1$1(get$1(target, "value")) ]));
        };
        objproxyhandler.setPrototypeOf = () => {
            return false;
        };
        objproxyhandler.defineProperty = () => {
            return false;
        };
        objproxyhandler.getOwnPropertyDescriptor = (target, key) => {
            if (issymbol(key)) {
                return;
            }
            const myvalue = get$1(target, "value");
            const descripter = getOwnPropertyDescriptor(target, key) || getOwnPropertyDescriptor(myvalue, key);
            if (descripter) {
                descripter.configurable = true;
            }
            return descripter;
        };
        objproxyhandler.deleteProperty = (target, key) => {
            const myvalue = get$1(target, "value");
            if (has(myvalue, key)) {
                deleteProperty(myvalue, key);
                target[dispatchsymbol](String$1(key));
                return true;
            } else {
                return true;
            }
        };
        objproxyhandler.has = (target, key) => {
            const myvalue = get$1(target, "value");
            return has(target, key) || has(myvalue, key);
        };
        objproxyhandler.get = (target, key) => {
            const value = get$1(target, "value");
            const deepflage = isarray(value) || isplainobject(value);
            if (key === "value" && deepflage) {
                return observedeepagent(get$1(target, key), (_target_, patharray) => {
                    target[dispatchsymbol](patharray[0]);
                });
            } else if (has(target, key)) {
                return get$1(target, key);
            } else if (has(value, key)) {
                const resultvalue = get$1(value, key);
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
                    return observedeepagent(resultvalue, () => {
                        target[dispatchsymbol](String$1(key));
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
            const myvalue = get$1(target, "value");
            if (key === "value" && isobject(value) && (isarray(init) && isarray(value) || !isarray(init) && !isarray(value))) {
                if (target[key] !== value) {
                    set$1(target, key, value);
                    target[dispatchsymbol]();
                }
                return true;
            } else if (!has(target, key)) {
                if (myvalue[key] !== value) {
                    set$1(myvalue, key, value);
                    target[dispatchsymbol](String$1(key));
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
    const set_prototype = Set$1.prototype;
    function createstate(init) {
        const state = createstate$1(init);
        return state;
    }
    function createstate$1(init) {
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
                            set$1(target, key, value);
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
            return createstate$1(init.valueOf());
        } else if (isobject(init)) {
            return handleobjectstate(init);
        } else {
            throw Error();
        }
    }
    function asserttype(con) {
        if (!con) {
            throw new TypeError;
        }
    }
    const listvalueattr = Symbol("listvalueattr");
    const listinnervdom = Symbol("listinnervdom");
    const listinnerelement = Symbol("listinnerelement");
    const cached_vdom_symbol = Symbol("cached_vdom");
    const cached_realele = Symbol("cached_realele");
    function ListMap(list, mapfun) {
        var _a, _b, _c, _d, _e;
        if (!isarray(list) && !isSet(list) && !isReactiveState(list)) {
            console.error(list);
            throw new TypeError;
        }
        if (!isfunction(mapfun)) {
            console.error(mapfun);
            throw new TypeError;
        }
        const ITEMfactory = (value, index) => {
            const possiblevdom = mapfun(value, index);
            asserttype(isvalidvdom(possiblevdom));
            return possiblevdom;
        };
        class ListMap extends AttrChange {
            constructor() {
                super(...arguments);
                this[_a] = new Map;
                this[_b] = new Map;
                this[_c] = createstate([]);
                this[_e] = false;
            }
            [(_a = cached_vdom_symbol, _b = cached_realele, _c = listvalueattr, _d = componentsymbol, 
            _e = readysymbol, attributeChangedCallback)](name) {
                if (this[readysymbol]) {
                    if (name === "value") {
                        const attrs = createeleattragentreadwrite(this);
                        const value = attrs["value"];
                        if (!isarray(value)) {
                            console.log(value);
                            throw new TypeError;
                        }
                        set$1(this[listvalueattr], "value", value);
                        const domchildren = getchildren(this);
                        const newlength = value.length;
                        const oldlength = domchildren.length;
                        if (newlength > oldlength) {
                            const numindexs = Array$1(newlength).fill(undefined).map((v, i) => i).slice(oldlength);
                            const vdomstoadd = numindexs.map(index => {
                                const cached_vdom1 = get$1(this[cached_vdom_symbol], index);
                                if (cached_vdom1) {
                                    return cached_vdom1;
                                } else {
                                    const vdom = ITEMfactory(computed(this[listvalueattr], v => v[index]), index);
                                    set$1(this[cached_vdom_symbol], index, vdom);
                                    return vdom;
                                }
                            });
                            const realelementstoadd = vdomstoadd.map((vdom, i) => {
                                const index = i + oldlength;
                                const cached_element = get$1(this[cached_realele], index);
                                if (cached_element) {
                                    return cached_element;
                                } else {
                                    const element = render(vdom);
                                    set$1(this[cached_realele], index, element);
                                    return element;
                                }
                            });
                            this[listinnervdom].push(...vdomstoadd);
                            this[listinnerelement].push(...realelementstoadd);
                            realelementstoadd.forEach(element => appendchild(this, element));
                        } else if (newlength < oldlength) {
                            this[listinnervdom] = this[listinnervdom].slice(0, newlength);
                            this[listinnerelement] = this[listinnerelement].slice(0, newlength);
                            getchildren(this).slice(newlength).forEach(element => removeElement(element));
                        }
                    }
                }
            }
            disconnectedCallback() {
                setimmediate(() => {
                    disconnectedCallback(this);
                });
            }
            [firstinstalledcallback]() {
                const attrs = createeleattragentreadwrite(this);
                const value = attrs["value"];
                if (!isarray(value)) {
                    console.log(value);
                    throw new TypeError;
                }
                set$1(this[listvalueattr], "value", value);
                this[listinnervdom] = value.map((v, index) => ITEMfactory(computed(this[listvalueattr], v => v[index]), index));
                this[listinnerelement] = render(this[listinnervdom]);
                Object$1.entries(this[listinnervdom]).forEach(([key, value]) => {
                    set$1(this[cached_vdom_symbol], key, value);
                });
                Object$1.entries(this[listinnerelement]).forEach(([key, value]) => {
                    set$1(this[cached_realele], key, value);
                });
                mountrealelement(this[listinnerelement], this);
            }
            connectedCallback() {
                connectedCallback(this);
            }
        }
        ListMap.defaultProps = {
            value: []
        };
        ListMap[_d] = componentsymbol;
        return h(ListMap, {
            value: list
        });
    }
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
    function createRef(value) {
        return {
            value: value
        };
    }
    var r = "function" == typeof Map, u = r ? new Map : {};
    extenddirectives({
        value(value, element, vdom) {
            model([ "input", "textarea", "select" ], "value", "value", [ "change", "input" ], value, vdom);
        },
        checked(value, element, vdom) {
            model([ "input" ], "checked", "checked", [ "change" ], value, vdom);
            const eventname = "click";
            const origin = toArray(vdom.onevent[eventname]);
            const eventsarray = origin;
            const dispatchallsamename = event => {
                const inputelement = event.target;
                const name = event.target.name;
                if (name) {
                    querySelectorAll("input[name=".concat(name, "]")).filter(ele => ele !== inputelement).forEach(element => {
                        element.dispatchEvent(new Event("change"));
                    });
                }
            };
            set$1(vdom.onevent, eventname, toArray([ ...eventsarray, dispatchallsamename ]).filter(Boolean));
        }
    });
    function model(types, bindattribute, domprop, eventnames, value, vdom) {
        if (!isReactiveState(value)) {
            console.error(value);
            console.error(invalid_ReactiveState + invalid_Virtualdom);
            throw TypeError();
        }
        if (types.includes(vdom.type)) {
            set$1(vdom.bindattr, bindattribute, value);
            eventnames.forEach(eventname => {
                const origin = vdom.onevent[eventname];
                const eventsarray = toArray(origin);
                set$1(vdom.onevent, eventname, toArray([ ...eventsarray, e => {
                    return value.value = get$1(e.target, domprop);
                } ]).filter(Boolean));
            });
        } else {
            console.error(vdom);
            console.error(invalid_ReactiveState + invalid_Virtualdom);
            throw TypeError();
        }
    }
    console.log([ h, h ]);
    function useMousePosition() {
        const x = createstate(0);
        const y = createstate(0);
        function update(e) {
            x.value = e.pageX;
            y.value = e.pageY;
        }
        useMounted(() => {
            window.addEventListener("mousemove", update);
        });
        useUnMounted(() => {
            window.removeEventListener("mousemove", update);
        });
        return {
            x: x,
            y: y
        };
    }
    const mycomapp = createComponent$1(() => {
        const {x: x, y: y} = useMousePosition();
        const plus = computed(x, x => {
            return x + 100;
        });
        const multi = computed([ x, y ], (x, y) => {
            return x * y;
        });
        let count = 0;
        const cancelwatch = watch([ x, y, multi, plus ], (...args) => {
            if (count === 0) {
                console.time("watchmousemove50");
            }
            console.log(count, args);
            count++;
            if (count > 50) {
                cancelwatch();
                console.timeEnd("watchmousemove50");
            }
        });
        return h("div", null, h("h3", null, " \u9f20\u6807\u4f4d\u7f6e"), h("h2", null, "x:", x), h("h1", null, "y:", y), h("p", null, "x+100 \u662f", plus), h("p", null, "x*y \u662f", multi));
    });
    mycomapp.css = "\n*{font-size:80px !important;}\np{color:blue !important;}\n";
    var vdom = h(mycomapp);
    document.body.appendChild(MountElement(vdom, document.createElement("div")));
    const refarray = [];
    const liststate = createstate(Array(10).fill(undefined).map((v, i) => i));
    watch(liststate, a => console.dir([ liststate, a ]));
    const testlistvdom = h("div", null, h("button", {
        _text: "push",
        onclick: () => {
            liststate.push(Math.random());
        }
    }), h("button", {
        _text: "pop",
        onclick: () => {
            liststate.pop();
        }
    }), h("button", {
        _text: "shift",
        onclick: () => {
            liststate.shift();
        }
    }), h("button", {
        _text: "unshift",
        onclick: () => {
            liststate.unshift(Math.random());
        }
    }), ListMap(liststate, (value, index) => h("div", {
        _ref: ele => {
            refarray.length = liststate.length;
            refarray[index] = ele;
        }
    }, [ "item:", "value:", value, "index:", index ])));
    const weathercondition = createstate(true);
    const vdom$1 = [ conditon(weathercondition, testlistvdom), h("", null, h("button", {
        onclick: () => {
            weathercondition.value = !weathercondition.value;
        }
    }, "condition toggle")) ];
    document.body.appendChild(MountElement(vdom$1, document.createElement("div")));
    console.log(vdom$1, refarray, liststate);
    var css = '@charset "UTF-8";@import url(https://cdn.bootcss.com/mui/3.7.1/css/mui.min.css);@import url(https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-6556dfa9be535e551ffffaadfecdad99.min.css);@import url(https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-frameworks-a2fba223d5af91496cac70d4ec3624df.min.css);@import url(https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css);pre{text-align:left!important}button,div,h1,h2,h3,h4,h5,h6,input{text-align:center}p{color:#000!important}@-webkit-keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.flowerpassword a{color:#42b983}.App-header{background-color:#fff}nav{width:100%}#\u56fe\u7247\u5217\u8868200 img{min-height:150px;min-width:150px;height:auto;width:auto;max-width:100%;max-height:200px}#my\u5bfc\u822a\u680f .navbar-nav li a{margin-left:2px;margin-right:2px}h1,h2{font-weight:400}ul{list-style-type:none;padding:0}li{display:inline-block;margin:0 10px}*{-webkit-user-select:text;-ms-user-select:text;user-select:text}.example{color:red}body{padding:0}*{font-family:"Microsoft Yahei,PingFangSC-Regular,arial, verdana, sans-serif"}#my\u5bfc\u822a\u680f{overflow:auto;max-height:100%;padding-right:0;padding-left:0}.App{text-align:center}.App-logo{-webkit-animation:App-logo-spin 20s linear infinite;animation:App-logo-spin 20s linear infinite;height:40vmin;pointer-events:none}.App-header{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:calc(10px + 2vmin)}.App-link{color:#61dafb}.flowerpassword body,.flowerpassword html{background-color:#fff}.flowerpassword body{font:14px/1.5 Tahoma,Helvetica,Arial,\\5b8b\\4f53;color:#000}.flowerpassword a,.flowerpassword a:hover{color:#09c;text-decoration:none}.flowerpassword .left{float:left}.flowerpassword .right{float:right}.flowerpassword .clear{clear:both}.flowerpassword header{text-align:left;padding:0;margin:15px auto}.flowerpassword #logo{height:39px}.flowerpassword #shortcuts{margin:15px 0 0 15px}.flowerpassword #nav{float:center;margin-top:10px}.flowerpassword #nav li{margin:0 7px}.flowerpassword #nav li a{font-size:22px;color:#09c}.flowerpassword #nav li.active a,.flowerpassword #nav li.active a:hover{background-color:#09c;color:#fff}.flowerpassword #nav li a:hover{background-color:#79c6df;color:#fff}.flowerpassword #index-box{background-color:#fff;width:940px;clear:both;box-shadow:0 0 4px 2px #ddd;border:1px solid #ddd}.flowerpassword #index-box .float-box{margin:20px 0 20px 20px;display:inline}.flowerpassword #index-box #content-nav{margin:0;width:200px}.flowerpassword #index-box #content-nav li a{background-color:#e5ecdc}.flowerpassword #index-slider{width:940px;height:200px;overflow:hidden;position:relative}.flowerpassword #index-slider ul{list-style:none;margin:0;position:absolute;top:0;left:0}.flowerpassword #index-slider li{width:940px;height:200px;float:left}.flowerpassword #index-slider #pagination{top:160px;left:800px}.flowerpassword #index-slider ul#pagination li{width:16px;height:16px;border-radius:1em;background-color:#fff;box-shadow:0 0 1px 2px #ccc;margin-right:18px;margin-top:4px}.flowerpassword #index-slider ul#pagination li.active{width:24px;height:24px;margin-top:0}.flowerpassword #index-slider ul#pagination li:hover{background-color:#ddd;cursor:pointer}.flowerpassword #index-report{width:680px;height:70px;margin-top:20px;overflow:hidden;position:relative;background-color:#e5ecdc}.flowerpassword #index-report ul{list-style:none;margin:0;position:absolute;top:0;left:0}.flowerpassword #index-report li{width:680px;height:70px;text-align:center;float:left;font-size:32px;color:#666;font-family:\xe5\xbe\xae\xe8\xbd\xaf\xe9\u203a\u2026\xe9\xbb\u2018,\xe9\xbb\u2018\xe4\xbd\u201c;line-height:70px}.flowerpassword #index-report-pagination{list-style:none;margin-left:35px;text-align:center}.flowerpassword #index-report-pagination li{height:65px;float:left;margin-right:45px;cursor:pointer}.flowerpassword #index-report-pagination li img{margin-top:30px}.flowerpassword #index-button{margin:40px 0 30px;text-align:center}.flowerpassword #index-button a{margin:0 50px}.flowerpassword #tab{margin-top:30px}.flowerpassword #tab li a{margin-right:10px;border-bottom-color:#ddd;color:#666}.flowerpassword #tab li a:hover{background-color:#f2f2f2;color:#333;border-color:#ddd #ddd transparent}.flowerpassword #tab li.active a{background-color:#f2f2f2;color:#666;border-bottom-color:transparent}.flowerpassword #content-nav{list-style:none;margin:20px 0 0}.flowerpassword #content-nav li a{color:#666;padding:11px 0 11px 60px;display:block;margin-bottom:1px;font-size:22px}.flowerpassword #content-nav li a.active,.flowerpassword #content-nav li a:hover{background-color:#09c!important;color:#fff!important}.flowerpassword h1,.flowerpassword h2{color:#09c;margin:30px 0 12px}.flowerpassword h2{font-size:22px}.flowerpassword h2 span{font-size:22px;color:#fff;margin-right:7px;background-color:#09c;width:33px;height:33px;display:inline-block;text-align:center}.flowerpassword h3{font-size:16px;color:#09c;margin:20px 0}.flowerpassword h3 span{font-size:16px;color:#fff;margin-right:6px;background-color:#09c;width:26px;display:inline-block;text-align:center}.flowerpassword #input span{color:#09c;font-weight:700;font-size:22px;margin:0 20px}.flowerpassword #input input{font-size:14px;padding:5px;margin-left:5px}.flowerpassword #input label{float:none;display:inline;padding-right:5px}.flowerpassword #input p{margin-top:16px}.flowerpassword #input p,.flowerpassword .other{font-size:12px;color:#999}.flowerpassword #code16{display:inline-block;text-align:center}.flowerpassword .code16d{border:2px solid #09c}.flowerpassword .code16d:hover{border:2px solid #ff881c}.flowerpassword #copycode16{color:#000;display:inline-block;padding:0 3px;cursor:pointer}.flowerpassword .copycode16d{background-color:#09c;border:2px solid #09c}.flowerpassword .copycode16d:hover{background-color:#ff881c;border:2px solid #ff881c}.flowerpassword p{font-size:12px;color:#666;margin:20px 0}.flowerpassword #copyOK{color:#f2f2f2;border:2px solid #f2f2f2;display:inline-block;margin-left:16px;padding:0 3px}.flowerpassword .down-button{margin:10px 20px 10px 0}.flowerpassword #get{margin-bottom:100px}.flowerpassword footer{margin:50px 0 30px}.flowerpassword footer p{margin:0 0 5px;color:#999}.flowerpassword footer p span{margin:0 10px}.flowerpassword footer p a{color:#999}.flowerpassword footer p a:hover{color:#333}.jdahd button{border-color:#000}.jdahd *{text-align:center;margin:0;box-sizing:border-box;background-color:transparent}.jdahd body{position:relative;height:100vh;text-align:center}.jdahd h1{text-align:center;margin:20px 0}.jdahd textarea{width:100%;clear:both;margin-bottom:10px;border-radius:7px;padding:15px 10px;font-size:14px;outline:none;-webkit-transition:all .2s ease-in;transition:all .2s ease-in}.jdahd input[type=button]{margin:0 auto;position:relative;vertical-align:top;width:150px;height:60px;padding:0;font-size:22px;font-weight:300;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.25);background:#2980b9;border:0;border-bottom:2px solid #2475ab;cursor:pointer;box-shadow:inset 0 -2px #2475ab}.jdahd input:active{top:1px;outline:none;box-shadow:none}.jdahd input:-ms-input-placeholder,.jdahd textarea:-ms-input-placeholder{color:#fff;font-size:20px;font-weight:300}.jdahd input::-moz-placeholder,.jdahd textarea::-moz-placeholder{color:#fff;font-size:20px;font-weight:300}.jdahd input::-webkit-input-placeholder,.jdahd textarea::-webkit-input-placeholder{color:#fff;font-size:20px;font-weight:300;box-shadow:none;-webkit-appearance:none}.jdahd footer{width:calc(100% - 40px);position:absolute;bottom:20px}.jdahd footer>p a{color:#2980b9;text-decoration:none}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}code{font-family:source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace}.jdahd #my\u5bfc\u822a\u680f{overflow:auto;max-height:100%;padding-right:0;padding-left:0}.jdahd *,.jdahd body{text-align:center}.jdahd h1{font-weight:300;font-size:40px}.jdahd h3{font-weight:700}.jdahd .actions,.jdahd li,.jdahd p,.jdahd textarea{width:100%}.jdahd textarea{border-color:#000;display:block;min-height:250px;margin:1em 0}.jdahd ul.pre li{white-space:pre}.jdahd .checkbox{display:inline-block}.jdahd .actions a{float:right}.jdahd .actions{clear:both}*{font-family:Microsoft Yahei}#nav{float:center}#app{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;margin-top:0}#App-logo{-webkit-animation:App-logo-spin 20s linear infinite;animation:App-logo-spin 20s linear infinite;height:40vmin;pointer-events:none}@keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}*{-webkit-user-select:text!important;-moz-user-select:text;-o-user-select:text;-ms-user-select:text!important;user-select:text!important}body,html{scroll-behavior:smooth}*{font-family:Microsoft Yahei,Helvetica,Tahoma,Arial,PingFang SC,Hiragino Sans GB,Heiti SC,MicrosoftYaHei,WenQuanYi Micro Hei,sans-serif!important}.hljs{display:block;overflow-x:auto;padding:.5em;color:#333;background:#f8f8f8;-webkit-text-size-adjust:none}.diff .hljs-header,.hljs-comment{color:#998;font-style:italic}.css .rule .hljs-keyword,.hljs-keyword,.hljs-request,.hljs-status,.hljs-subst,.hljs-winutils,.nginx .hljs-title{color:#333;font-weight:700}.hljs-hexcolor,.hljs-number,.ruby .hljs-constant{color:teal}.hljs-doctag,.hljs-string,.hljs-tag .hljs-value,.tex .hljs-formula{color:#d14}.hljs-id,.hljs-title,.scss .hljs-preprocessor{color:#900;font-weight:700}.hljs-list .hljs-keyword,.hljs-subst{font-weight:400}.hljs-class .hljs-title,.hljs-type,.tex .hljs-command,.vhdl .hljs-literal{color:#458;font-weight:700}.django .hljs-tag .hljs-keyword,.hljs-rule .hljs-property,.hljs-tag,.hljs-tag .hljs-title{color:navy;font-weight:400}.hljs-attribute,.hljs-name,.hljs-variable,.lisp .hljs-body{color:teal}.hljs-regexp{color:#009926}.clojure .hljs-keyword,.hljs-prompt,.hljs-symbol,.lisp .hljs-keyword,.ruby .hljs-symbol .hljs-string,.scheme .hljs-keyword,.tex .hljs-special{color:#990073}.hljs-built_in{color:#0086b3}.hljs-cdata,.hljs-doctype,.hljs-pi,.hljs-pragma,.hljs-preprocessor,.hljs-shebang{color:#999;font-weight:700}.hljs-deletion{background:#fdd}.hljs-addition{background:#dfd}.diff .hljs-change{background:#0086b3}.hljs-chunk{color:#aaa}#padding0{padding:0!important}@media (max-width:500px){hr#hidewidthless500{display:none}}.article-content{word-break:break-word;line-height:1.75;font-weight:400;font-size:15px;overflow-x:hidden}.article-content h1{margin:1.3rem 0;line-height:1.2}.article-content p{line-height:2.27rem}.article-content hr{border:none;border-top:1px solid #ddd;margin-top:2.7rem;margin-bottom:2.7rem}.article-content embed,.article-content iframe,.article-content img:not(.equation),.article-content video{max-width:100%!important;margin:0}.article-content img.lazyload{visibility:hidden}.article-content img.inited{background-color:#f8f9fa;background-position:50%;background-repeat:no-repeat;visibility:visible}.article-content img.loaded{background-image:none;background-color:transparent}.article-content img.equation{margin:0 .1em;max-width:100%!important;vertical-align:text-bottom}.article-content img:not(.equation){cursor:-webkit-zoom-in;cursor:zoom-in}.article-content figure{margin:2.7rem auto;text-align:center}.article-content figure figcaption{text-align:center;font-size:1rem;line-height:2.7rem;color:#909090}.article-content pre{line-height:1.93rem;overflow:auto}.article-content code,.article-content pre{font-family:Menlo,Monaco,Consolas,Courier New,monospace}.article-content code{font-size:1rem;padding:.26rem .53em;word-break:break-word;color:#4e5980;background-color:#f8f8f8;border-radius:2px;overflow-x:auto}.article-content pre>code{font-size:1rem;padding:.67rem 1.3rem;margin:0;word-break:normal;display:block}.article-content a{color:#259}.article-content a:active,.article-content a:hover{color:#275b8c}.article-content table{display:inline-block!important;font-size:1rem;width:auto;max-width:100%;overflow:auto;border:1px solid #f6f6f6}.article-content thead{background:#f6f6f6;color:#000;text-align:left}.article-content tr:nth-child(2n){background-color:#fcfcfc}.article-content td,.article-content th{padding:1rem .6rem;line-height:2rem}.article-content td{min-width:10rem}.article-content blockquote{margin:1em 0;border-left:4px solid #ddd;padding:0 1.3rem}.article-content blockquote>p{margin:.6rem 0}.article-content ol,.article-content ul{padding-left:2.7rem}.article-content ol li,.article-content ul li{margin-bottom:.6rem}.article-content ol ol,.article-content ol ul,.article-content ul ol,.article-content ul ul{margin-top:.27rem}.article-content pre>code{overflow-x:auto;-webkit-overflow-scrolling:touch;color:#333;background:#f8f8f8}.article-content .hljs-comment,.article-content .hljs-quote{color:#998}.article-content .hljs-keyword,.article-content .hljs-selector-tag,.article-content .hljs-subst{color:#333;font-weight:700}.article-content .hljs-literal,.article-content .hljs-number,.article-content .hljs-tag .hljs-attr,.article-content .hljs-template-variable,.article-content .hljs-variable{color:teal}.article-content .hljs-doctag,.article-content .hljs-string{color:#d14}.article-content .hljs-section,.article-content .hljs-selector-id,.article-content .hljs-title{color:#900;font-weight:700}.article-content .hljs-subst{font-weight:400}.article-content .hljs-class .hljs-title,.article-content .hljs-type{color:#458;font-weight:700}.article-content .hljs-attribute,.article-content .hljs-name,.article-content .hljs-tag{color:navy;font-weight:400}.article-content .hljs-link,.article-content .hljs-regexp{color:#009926}.article-content .hljs-bullet,.article-content .hljs-symbol{color:#990073}.article-content .hljs-built_in,.article-content .hljs-builtin-name{color:#0086b3}.article-content .hljs-meta{color:#999;font-weight:700}.article-content .hljs-deletion{background:#fdd}.article-content .hljs-addition{background:#dfd}.article-content .hljs-emphasis{font-style:italic}.article-content .hljs-strong{font-weight:700}.article-content p{line-height:inherit;margin-top:22px;margin-bottom:22px}.article-content img{max-height:none}.article-content a{color:#0269c8;border-bottom:1px solid #d1e9ff}.article-content code{background-color:#fff5f5;color:#ff502c;font-size:.87em;padding:.065em .4em}.article-content figure{margin:22px auto}.article-content figure figcaption{margin-top:2px;line-height:1.6}.article-content blockquote{color:#666;padding:1px 23px;margin:22px 0;border-left:4px solid #cbcbcb;background-color:#f8f8f8}.article-content blockquote:after{display:block;content:""}.article-content blockquote>p{margin:10px 0}.article-content blockquote.warning{position:relative;border-left-color:#f75151;margin-left:8px}.article-content blockquote.warning:before{position:absolute;top:14px;left:-12px;background:#f75151;border-radius:50%;content:"!";width:20px;height:20px;color:#fff;display:flex;align-items:center;justify-content:center}.article-content ol,.article-content ul{padding-left:28px}.article-content ol li,.article-content ul li{margin-bottom:0;list-style:inherit}.article-content ol li.task-list-item,.article-content ul li.task-list-item{list-style:none}.article-content ol li.task-list-item ol,.article-content ol li.task-list-item ul,.article-content ul li.task-list-item ol,.article-content ul li.task-list-item ul{margin-top:0}.article-content ol li{padding-left:6px}.article-content pre{position:relative;line-height:1.75}.article-content pre>code{padding:15px 12px}.article-content pre>code.hljs[lang]{padding:18px 15px 12px}.article-content pre>code.hljs[lang]:before{content:attr(lang);position:absolute;right:15px;top:2px;color:hsla(0,0%,54.9%,.8)}.article-content pre>code.hljs[lang][lang=bash]:before{content:""}.article-content pre>code.copyable .copy-code-btn{position:absolute;top:6px;right:15px;font-size:12px;line-height:1;cursor:pointer;color:hsla(0,0%,54.9%,.8);-webkit-transition:color .1s;transition:color .1s}.article-content pre>code.copyable .copy-code-btn:hover{color:#8c8c8c}.article-content pre>code.copyable.hljs[lang]:before{right:70px}.article-content h1,.article-content h2,.article-content h3,.article-content h4,.article-content h5,.article-content h6{color:#333;line-height:1.5;margin-top:35px;margin-bottom:10px;padding-bottom:5px}.article-content h1{font-size:30px;margin-bottom:5px}.article-content h2{padding-bottom:12px;font-size:24px;border-bottom:1px solid #ececec}.article-content h3{font-size:18px;padding-bottom:0}.article-content h4{font-size:16px}.article-content h5{font-size:15px}.article-content h6{margin-top:5px}.article-content h1.heading+h2.heading{margin-top:20px}.article-content h1.heading+h3.heading{margin-top:15px}.article-content .heading+.heading{margin-top:0}.article-content h1+:not(.heading){margin-top:25px}@media (max-width:720px){.article-content h1{font-size:24px}.article-content h2{font-size:20px}.article-content h3{font-size:18px}.article-content pre>code .copy-code-btn{display:none}.article-content pre>code.hljs[lang]:before{top:2px;right:15px}}@media (max-width:720px){.article-content pre>code.copyable.hljs[lang]:before{right:1rem}}';
    console.log([ h, h ]);
    const mycomapp$1 = createComponent$1(() => {
        const inputpassword = createstate("");
        const inputref = createRef();
        const inputref2 = createRef();
        console.log(inputref2);
        console.log(inputpassword);
        watch(inputpassword, console.log);
        const vdom = [ h("h1", {
            style: "padding-top: 127.6px;"
        }, h("svg", {
            style: "\n      width: 100%;\n      height: 200px;\n  ",
            class: "octicon octicon-book",
            viewBox: "0 0 16 16",
            version: "1.1",
            width: "16",
            height: "16",
            "aria-hidden": "true"
        }, h("path", {
            "fill-rule": "evenodd",
            d: "M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"
        })), h("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 3046.7 875.7",
            style: "\n      width: 100%;\n      height: 200px;\n  "
        }, h("title", null, "logo-on-dark-bg"), h("rect", {
            Color: "#FFF",
            x: "0",
            y: "0",
            width: "3046.7",
            height: "875.7"
        }), h("path", {
            fill: "#FFF",
            d: "M387 0l387 218.9v437.9L387 875.7 0 656.8V218.9L387 0z"
        }), h("path", {
            fill: "#8ED6FB",
            d: "M704.9 641.7L399.8 814.3V679.9l190.1-104.6 115 66.4zm20.9-18.9V261.9l-111.6 64.5v232l111.6 64.4zM67.9 641.7L373 814.3V679.9L182.8 575.3 67.9 641.7zM47 622.8V261.9l111.6 64.5v232L47 622.8zm13.1-384.3L373 61.5v129.9L172.5 301.7l-1.6.9-110.8-64.1zm652.6 0l-312.9-177v129.9l200.5 110.2 1.6.9 110.8-64z"
        }), h("path", {
            fill: "#1C78C0",
            d: "M373 649.3L185.4 546.1V341.8L373 450.1v199.2zm26.8 0l187.6-103.1V341.8L399.8 450.1v199.2zM198.1 318.2l188.3-103.5 188.3 103.5-188.3 108.7-188.3-108.7z"
        }), h("path", {
            fill: "#F5FAFA",
            d: "M1164.3 576.3h82.5l84.1-280.2h-80.4l-49.8 198.8-53.1-198.8H1078l-53.6 198.8-49.3-198.8h-80.4l83.6 280.2h82.5l52-179.5 51.5 179.5zM1335.2 437c0 84.1 57.3 146.3 147.4 146.3 69.7 0 107.2-41.8 117.9-61.6l-48.8-37c-8 11.8-30 34.3-68.1 34.3-41.3 0-71.3-26.8-72.9-64.3H1608c.5-5.4.5-10.7.5-16.1 0-91.6-49.3-149.5-136.1-149.5-79.9 0-137.2 63.2-137.2 147.9zm77.7-30.6c3.2-32.1 25.7-56.8 60.6-56.8 33.8 0 58.4 22.5 60 56.8h-120.6zm223.5 169.9h69.7v-28.9c7.5 9.1 35.4 35.9 83.1 35.9 80.4 0 137.2-60.5 137.2-146.8 0-86.8-52.5-147.3-132.9-147.3-48.2 0-76.1 26.8-83.1 36.4V188.9h-73.9v387.4h-.1zm71.8-139.3c0-52.5 31.1-82.5 71.8-82.5 42.9 0 71.8 33.8 71.8 82.5 0 49.8-30 80.9-71.8 80.9-45 0-71.8-36.5-71.8-80.9zm247 239.5h73.9V547.3c7 9.1 34.8 35.9 83.1 35.9 80.4 0 132.9-60.5 132.9-147.3 0-85.7-56.8-146.8-137.2-146.8-47.7 0-75.6 26.8-83.1 36.4V296h-69.7v380.5h.1zm71.8-241.1c0-44.5 26.8-80.9 71.8-80.9 41.8 0 71.8 31.1 71.8 80.9 0 48.8-28.9 82.5-71.8 82.5-40.7 0-71.8-30-71.8-82.5zm231.5 54.1c0 58.9 48.2 93.8 105 93.8 32.2 0 53.6-9.6 68.1-25.2l4.8 18.2h65.4V398.9c0-62.7-26.8-109.8-116.8-109.8-42.9 0-85.2 16.1-110.4 33.2l27.9 50.4c20.9-10.7 46.6-19.8 74.5-19.8 32.7 0 50.9 16.6 50.9 41.3v18.2c-10.2-7-32.2-15.5-60.6-15.5-65.4-.1-108.8 37.4-108.8 92.6zm73.9-2.2c0-23 19.8-39.1 48.2-39.1s48.8 14.5 48.8 39.1c0 23.6-20.4 38.6-48.2 38.6s-48.8-15.5-48.8-38.6zm348.9 30.6c-46.6 0-79.8-33.8-79.8-81.4 0-45 29.5-82 77.2-82 31.6 0 53.1 15.5 65.4 26.8l20.9-62.2c-18.2-13.9-47.2-30-88.4-30-85.2 0-149 62.7-149 147.9s62.2 146.3 149.5 146.3c40.7 0 71.3-17.1 87.3-30l-19.8-60.5c-12.4 10.1-34.9 25.1-63.3 25.1zm110.9 58.4h73.9V431.6l93.8 144.7h86.8L2940.6 423l98.6-127h-83.1l-90 117.9v-225h-73.9v387.4z"
        }))), h("div", null, h("div", null, h("noscript", null, "You need to enable JavaScript to run this app."), h("div", {
            id: "root"
        }, h("div", null, h("div", {
            class: "container-fluid fixed-top",
            id: "my\u5bfc\u822a\u680f"
        }, h("nav", {
            class: "navbar navbar-default navbar navbar-expand-sm bg-light navbar-light",
            role: "navigation"
        }, h("div", null, h("a", {
            class: "navbar-brand mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/"
        }, "masx200\u7684", h("hr", {
            id: "hidewidthless500"
        }), "github\u4e3b\u9875"), h("button", {
            class: "navbar-toggler",
            type: "button",
            "data-toggle": "collapse"
        }, h("span", {
            class: "navbar-toggler-icon"
        }))), h("div", {
            class: "collapse navbar-collapse",
            id: "example-navbar-collapse",
            style: "display: none;"
        }, h("ul", {
            class: "nav navbar-nav",
            id: "allnavbar"
        }, h("li", {
            id: "mynav1"
        }, h("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-home"
        }, "\u57fa\u4e8eREACT\u7684\u4e3b\u9875")), h("li", null, h("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-rssreader"
        }, "rss\u9605\u8bfb")), h("li", {
            id: "mynav2"
        }, h("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-about"
        }, "\u5173\u4e8eREACT")), h("li", {
            class: "nav-item"
        }, h("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/picalc"
        }, "\u5706\u5468\u7387\u8ba1\u7b97\u591a\u7ebf\u7a0b")), h("li", null, h("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-huami"
        }, "\u82b1\u5bc6\u7f51\u9875\u7248")), h("li", null, h("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/decoder"
        }, "JSfuck-and-hieroglyphy-Decoder")), h("li", null, h("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/jsfuck"
        }, "JSfuck-ENCODER")), h("li", null, h("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/hieroglyphy"
        }, "hieroglyphy-ENCODER")), h("li", null, h("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/webpack-react-vue-spa-awesome-config"
        }, "webpack-react-vue- \u6781\u901f\u96f6\u914d\u7f6e\u7684\u5355\u9875\u9762 web\n                        \u5e94\u7528\u6253\u5305\u5de5\u5177")), h("li", {
            class: "nav-item"
        }, h("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/IMPORTCJSAMDUMD\u52a8\u6001\u5f02\u6b65\u52a0\u8f7d"
        }, "\u52a8\u6001\u5f02\u6b65\u52a0\u8f7d-commonjs\u548cumd\u548camd\u6a21\u5757\u5e93")), h("li", {
            class: "nav-item"
        }, h("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-simple-global-state-store-hook"
        }, "\u9002\u7528\u4e8eReact\u7684\u6781\u7b80\u5168\u5c40\u72b6\u6001\u7ba1\u7406\u5e93")), h("li", {
            class: "nav-item"
        }, h("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/excellent-vscode-extensions-for-javascript"
        }, "VScode\u7684\u4f18\u79c0\u6269\u5c55\u63a8\u8350")), h("li", {
            class: "nav-item"
        }, h("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/vue-simple-global-state-store-manager"
        }, "\u9002\u7528\u4e8eVue\u7684\u6781\u7b80\u5168\u5c40\u72b6\u6001\u7ba1\u7406\u5e93")), h("li", null, h("a", {
            href: "./my-vue-router-project/index.html",
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined"
        }, "\u57fa\u4e8evue\u7684\u4e3b\u9875")), h("li", null, h("a", {
            href: "./my-vue-router-project/index.html#/about",
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined"
        }, "\u5173\u4e8eVue")))))), h("div", {
            class: "container",
            id: "my\u4e3b\u4f53",
            style: "padding-top: 127.6px;"
        }, h("div", {
            class: "hello flowerpassword"
        }, h("h1", null, "\u82b1\u5bc6 \u4e0d\u4e00\u6837\u7684\u5bc6\u7801\u7ba1\u7406\u5de5\u5177"), h("div", {
            id: "rong1",
            class: "container",
            style: "text-align: center;"
        }, h("div", {
            id: "rong2"
        }, h("h2", null, h("span", null, "1"), "\u8f93\u5165"), h("div", {
            id: "input"
        }, h("p", null), h("h3", null, "\u8bb0\u5fc6\u5bc6\u7801"), h("p", null), h("p", null, h("input", {
            "*ref": inputref,
            "@change": e => console.log(e, inputref),
            "@input": e => console.log(e),
            id: "password",
            placeholder: "\u8f93\u5165\u5bc6\u7801",
            name: "password",
            type: "password",
            tabindex: "1",
            class: "col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control",
            value: ""
        })), h("p", null), h("span", null, "+"), h("h3", null, "\u533a\u5206\u4ee3\u53f7"), h("p", null), h("p", null, h("input", {
            "*ref": inputref2,
            "*value": inputpassword,
            "@input": e => console.log(e),
            id: "key",
            placeholder: "\u8f93\u5165\u4ee3\u53f7",
            name: "key",
            type: "text",
            tabindex: "2",
            class: "col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control",
            value: ""
        }))), h("br", null), h("p", null), h("h2", null, h("span", null, "2"), "\u83b7\u53d6"), h("p", null), h("div", {
            id: "get"
        }, h("p", {
            id: "tuijian"
        }), h("p", null), h("h3", null, "\u6700\u7ec8\u5bc6\u7801"), h("p", null), h("span", {
            id: "myhezi"
        }, h("p", null, h("input", {
            id: "cod222222222222e16",
            readonly: "",
            class: "col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control",
            value: ""
        })), h("br", null), h("p", null, h("button", {
            id: "copycode16",
            "data-clipboard-target": "#code16",
            class: "btn btn-lg btn copycode16d btn-info",
            style: "width: 100%;"
        }, "\u70b9\u51fb\u590d\u5236"))), h("p", null, h("span", {
            id: "copyOK",
            style: "display: none;"
        }, "\u221a\u590d\u5236\u6210\u529f")), h("p", null)))))))), h("script", {
            type: "text/javascript",
            src: "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/bundle.runtime~main.3a15bebb435b0d3fead6.js"
        }), h("script", {
            type: "text/javascript",
            src: "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/chunk.vendors~main.f7c5ea92c1b78a8ff211.js"
        }), h("script", {
            type: "text/javascript",
            src: "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/chunk.main.b9c7ffd191cff11a9b96.js"
        })), h("div", {
            contenteditable: false
        }, "\u4e0d\u53ef\u4ee5\u7f16\u8f91\u7684\u533a\u57df"), h("div", {
            contenteditable: true
        }, "\u53ef\u4ee5\u7f16\u8f91\u7684\u533a\u57df")), h("h1", null, h("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            version: "1.1",
            baseProfile: "full",
            style: "\n      width:600px;\n      height: 600px;\n  "
        }, h("g", {
            "fill-opacity": "0.7",
            stroke: "black",
            "stroke-width": "0.1cm"
        }, h("circle", {
            cx: "6cm",
            cy: "2cm",
            r: "100",
            fill: "red",
            transform: "translate(0,50)"
        }), h("circle", {
            cx: "6cm",
            cy: "2cm",
            r: "100",
            fill: "blue",
            transform: "translate(70,150)"
        }), h("circle", {
            cx: "6cm",
            cy: "2cm",
            r: "100",
            fill: "green",
            transform: "translate(-70,150)"
        }))), h("svg", {
            style: "\n      width: 100%;\n      height: 200px;\n  ",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 3046.7 875.7"
        }, h("title", null, "logo-on-dark-bg"), h("rect", {
            Color: "#FFF",
            x: "0",
            y: "0",
            width: "3046.7",
            height: "875.7"
        }), h("path", {
            fill: "#FFF",
            d: "M387 0l387 218.9v437.9L387 875.7 0 656.8V218.9L387 0z"
        }), h("path", {
            fill: "#8ED6FB",
            d: "M704.9 641.7L399.8 814.3V679.9l190.1-104.6 115 66.4zm20.9-18.9V261.9l-111.6 64.5v232l111.6 64.4zM67.9 641.7L373 814.3V679.9L182.8 575.3 67.9 641.7zM47 622.8V261.9l111.6 64.5v232L47 622.8zm13.1-384.3L373 61.5v129.9L172.5 301.7l-1.6.9-110.8-64.1zm652.6 0l-312.9-177v129.9l200.5 110.2 1.6.9 110.8-64z"
        }), h("path", {
            fill: "#1C78C0",
            d: "M373 649.3L185.4 546.1V341.8L373 450.1v199.2zm26.8 0l187.6-103.1V341.8L399.8 450.1v199.2zM198.1 318.2l188.3-103.5 188.3 103.5-188.3 108.7-188.3-108.7z"
        }), h("path", {
            fill: "#F5FAFA",
            d: "M1164.3 576.3h82.5l84.1-280.2h-80.4l-49.8 198.8-53.1-198.8H1078l-53.6 198.8-49.3-198.8h-80.4l83.6 280.2h82.5l52-179.5 51.5 179.5zM1335.2 437c0 84.1 57.3 146.3 147.4 146.3 69.7 0 107.2-41.8 117.9-61.6l-48.8-37c-8 11.8-30 34.3-68.1 34.3-41.3 0-71.3-26.8-72.9-64.3H1608c.5-5.4.5-10.7.5-16.1 0-91.6-49.3-149.5-136.1-149.5-79.9 0-137.2 63.2-137.2 147.9zm77.7-30.6c3.2-32.1 25.7-56.8 60.6-56.8 33.8 0 58.4 22.5 60 56.8h-120.6zm223.5 169.9h69.7v-28.9c7.5 9.1 35.4 35.9 83.1 35.9 80.4 0 137.2-60.5 137.2-146.8 0-86.8-52.5-147.3-132.9-147.3-48.2 0-76.1 26.8-83.1 36.4V188.9h-73.9v387.4h-.1zm71.8-139.3c0-52.5 31.1-82.5 71.8-82.5 42.9 0 71.8 33.8 71.8 82.5 0 49.8-30 80.9-71.8 80.9-45 0-71.8-36.5-71.8-80.9zm247 239.5h73.9V547.3c7 9.1 34.8 35.9 83.1 35.9 80.4 0 132.9-60.5 132.9-147.3 0-85.7-56.8-146.8-137.2-146.8-47.7 0-75.6 26.8-83.1 36.4V296h-69.7v380.5h.1zm71.8-241.1c0-44.5 26.8-80.9 71.8-80.9 41.8 0 71.8 31.1 71.8 80.9 0 48.8-28.9 82.5-71.8 82.5-40.7 0-71.8-30-71.8-82.5zm231.5 54.1c0 58.9 48.2 93.8 105 93.8 32.2 0 53.6-9.6 68.1-25.2l4.8 18.2h65.4V398.9c0-62.7-26.8-109.8-116.8-109.8-42.9 0-85.2 16.1-110.4 33.2l27.9 50.4c20.9-10.7 46.6-19.8 74.5-19.8 32.7 0 50.9 16.6 50.9 41.3v18.2c-10.2-7-32.2-15.5-60.6-15.5-65.4-.1-108.8 37.4-108.8 92.6zm73.9-2.2c0-23 19.8-39.1 48.2-39.1s48.8 14.5 48.8 39.1c0 23.6-20.4 38.6-48.2 38.6s-48.8-15.5-48.8-38.6zm348.9 30.6c-46.6 0-79.8-33.8-79.8-81.4 0-45 29.5-82 77.2-82 31.6 0 53.1 15.5 65.4 26.8l20.9-62.2c-18.2-13.9-47.2-30-88.4-30-85.2 0-149 62.7-149 147.9s62.2 146.3 149.5 146.3c40.7 0 71.3-17.1 87.3-30l-19.8-60.5c-12.4 10.1-34.9 25.1-63.3 25.1zm110.9 58.4h73.9V431.6l93.8 144.7h86.8L2940.6 423l98.6-127h-83.1l-90 117.9v-225h-73.9v387.4z"
        }))) ];
        console.log(vdom);
        return vdom;
    });
    mycomapp$1.css = css;
    var vdom$2 = h(mycomapp$1);
    MountElement(vdom$2, document.getElementById("root"));
    console.log([ h, h ]);
    const vdom$3 = h("select", {
        onchange: e => console.log(e),
        style: {
            textAlign: "center",
            fontSize: "30px",
            color: "#65a4f0"
        },
        value: "94b92331-e2f4-40c6-90ee-80e203a4de3a",
        name: "version_id",
        id: "version_id",
        class: "StyleSelectBox"
    }, h("option", {
        value: "0"
    }, "- Select version -"), h("option", {
        value: "94b92331-e2f4-40c6-90ee-80e203a4de3a"
    }, "Windows 10 Insider Preview 18999.1 (vb_release) [arm64]"), h("option", {
        value: "7268dbc9-dfe0-4947-af82-67f384e95cb6"
    }, "Windows 10 Insider Preview 18999.1 (vb_release) [x64]"), h("option", {
        value: "08f0d32e-c68a-46a8-b301-57e86b4e96e0"
    }, "Windows 10 Insider Preview 18999.1 (vb_release) [x86]"), h("option", {
        value: "9fa87c7f-75fa-4e5e-9ca3-1e19cb2c743f"
    }, "Windows 10 Insider Preview 18995.1 (vb_release) [x64]"), h("option", {
        value: "5173796c-11ac-47d7-9ed7-dbad6d5c9486"
    }, "Windows 10 Insider Preview 18995.1 (vb_release) [x86]"), h("option", {
        value: "4adf5f24-213a-472c-ae94-70f3cb81bade"
    }, "Windows 10 Insider Preview 18995.1 (vb_release) [arm64]"), h("option", {
        value: "9287fe5e-2cb3-4064-820f-3e336a3ddff4"
    }, "Windows 10 Insider Preview 18990.1 (vb_release) [arm64]"), h("option", {
        value: "5e420f0d-b3a5-424c-9b55-5c2cf939af14"
    }, "Windows 10 Insider Preview 18990.1 (vb_release) [x86]"), h("option", {
        value: "13e2104c-c98c-43b2-b232-9b2a4b5af2ac"
    }, "Windows 10 Insider Preview 18990.1 (vb_release) [x64]"));
    const element = document.body.appendChild(MountElement(vdom$3, document.createElement("div")));
    console.log([ vdom$3, element ]);
    console.log([ h, h ]);
    const number = createstate(10);
    function increment() {
        number.value++;
    }
    function decrement() {
        number.value--;
    }
    const store = {
        number: number,
        increment: increment,
        decrement: decrement
    };
    let timer = setInterval(() => {
        increment();
    }, 2e3);
    setTimeout(() => {
        clearInterval(timer);
    }, 8e3);
    const mycomappclass = createComponent$1(() => {
        watch(store.number, number => {
            console.log(_objectSpread2({}, store), number);
        });
        const vdom = h("div", null, h("h3", null, " \u70b9\u51fb\u6570\u5b57"), h("h2", null, "number:", store.number), h("button", {
            onclick: store.increment
        }, "increment"), h("button", {
            onclick: store.decrement
        }, "decrement"));
        return vdom;
    });
    const vdom$4 = [ h(mycomappclass), h(mycomappclass), h(mycomappclass) ];
    document.body.appendChild(MountElement(vdom$4, document.createElement("div")));
    setTimeout(() => {
        vdom$4.forEach(vdom => {
            const element = vdom.element;
            element.parentNode.removeChild(element);
        });
        number.value = -50;
        vdom$4.forEach(vdom => {
            const element = vdom.element;
            document.body.appendChild(element);
        });
    }, 5e3);
    console.log([ h, h ]);
    const lirefs = [];
    const temp_ref = createRef();
    const check = createstate(false);
    const check2 = createstate(true);
    watch(check2, a => console.log(a));
    const check3 = createstate(true);
    watch(check3, a => console.log(a));
    const check4 = createstate(true);
    watch(check4, a => console.log(a));
    const notcheck = computed(check, a => !a, v => {
        console.log(notcheck, check, v);
        check.value = !v;
    });
    var list = Array(10).fill(undefined).map((v, i) => i);
    watch(check, a => console.log(a));
    watch(notcheck, a => console.log(a));
    var vdom$5 = h("", null, h("input", {
        type: "radio",
        _checked: check4,
        name: "myname1"
    }), h("input", {
        type: "radio",
        _checked: check3,
        name: "myname1"
    }), h("input", {
        type: "radio",
        _checked: check2,
        name: "myname2"
    }), h("input", {
        type: "radio",
        _checked: check4,
        name: "myname2"
    }), [ h("input", {
        type: "checkbox",
        _checked: check
    }), h("input", {
        type: "checkbox",
        _checked: notcheck
    }), h("", null, h("ul", null, list.map((a, index) => h("li", {
        $ref: ele => {
            lirefs[index] = ele;
            lirefs.length = list.length;
        }
    }, "item", a))), h("header", {
        class: "common-header fixed noborder floating",
        id: "git-header-nav",
        _ref: temp_ref
    }, h("div", {
        class: "ui container"
    }, h("div", {
        class: "ui menu header-menu"
    }, h("div", {
        class: "git-nav-expand-bar"
    }, h("i", {
        class: "iconfont icon-mode-table"
    })), h("div", {
        class: "gitee-nav__sidebar"
    }, h("div", {
        class: "gitee-nav__sidebar-container"
    }, h("div", {
        class: "gitee-nav__sidebar-top"
    }, h("div", {
        class: "gitee-nav__avatar-box"
    }, h("a", {
        href: "/masx200",
        onclick: e => e.preventDefault()
    }, h("img", {
        alt: "1081296_masx200",
        class: "ui avatar image masx200-avatar",
        src: "https://avatar.gitee.com/uploads/96/1081296_masx200.png?1566294318"
    }))), h("div", {
        class: "gitee-nav__info-box"
    }, h("a", {
        href: "/masx200"
    }, "masx200"))), h("div", {
        class: "gitee-nav__sidebar-middle"
    }, h("div", {
        class: "gitee-nav__sidebar-list"
    }, h("ul", null, h("li", {
        class: "gitee-nav__sidebar-item"
    }, h("a", {
        href: "/masx200"
    }, h("i", {
        class: "iconfont icon-ic-dashboard"
    }), h("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u4e2a\u4eba\u4e3b\u9875"))), h("li", {
        class: "gitee-nav__sidebar-item"
    }, h("a", {
        href: "/explore"
    }, h("i", {
        class: "iconfont icon-ic-discover"
    }), h("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u5f00\u6e90\u8f6f\u4ef6"))), h("li", {
        class: "gitee-nav__sidebar-item"
    }, h("a", {
        href: "/gists"
    }, h("i", {
        class: "iconfont icon-ic-gists1"
    }), h("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u4ee3\u7801\u7247\u6bb5"))), h("li", {
        class: "gitee-nav__sidebar-item"
    }, h("a", {
        href: "/enterprises"
    }, h("i", {
        class: "iconfont icon-ic-enterprise"
    }), h("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u4f01\u4e1a\u7248"))), h("li", {
        class: "gitee-nav__sidebar-item"
    }, h("a", {
        href: "/education"
    }, h("i", {
        class: "iconfont icon-ic-education"
    }), h("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u9ad8\u6821\u7248"))), h("li", {
        class: "gitee-nav__sidebar-item split-line"
    }), h("li", {
        class: "gitee-nav__sidebar-item"
    }, h("a", {
        href: "/search"
    }, h("i", {
        class: "iconfont icon-ic-search"
    }), h("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u641c\u7d22"))), h("li", {
        class: "gitee-nav__sidebar-item"
    }, h("a", {
        href: "/help"
    }, h("i", {
        class: "iconfont icon-help-circle"
    }), h("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u5e2e\u52a9\u4e2d\u5fc3"))), h("li", {
        class: "gitee-nav__sidebar-item"
    }, h("a", {
        href: "/terms"
    }, h("i", {
        class: "iconfont icon-file"
    }), h("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u4f7f\u7528\u6761\u6b3e"))), h("li", {
        class: "gitee-nav__sidebar-item"
    }, h("a", {
        href: "/about_us"
    }, h("i", {
        class: "iconfont icon-issuepx"
    }), h("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u5173\u4e8e\u6211\u4eec"))), h("li", {
        class: "gitee-nav__sidebar-item"
    }, h("a", {
        href: "/profile"
    }, h("i", {
        class: "iconfont icon-edit"
    }), h("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u8bbe\u7f6e"))), h("li", {
        class: "gitee-nav__sidebar-item"
    }, h("a", {
        href: "/logout",
        "data-method": "delete",
        rel: "nofollow"
    }, h("i", {
        class: "iconfont icon-ic-logout"
    }), h("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u9000\u51fa")))))), h("div", {
        class: "gitee-nav__sidebar-bottom"
    }, h("div", {
        class: "gitee-nav__sidebar-close-button"
    }, h("i", {
        class: "fa fa-angle-double-left"
    }))))), h("div", {
        class: "item gitosc-logo"
    }, h("a", {
        href: "/"
    }, h("img", {
        class: "ui inline image",
        height: "28",
        src: "https://gitee.com//logo.svg?20171024",
        width: "95"
    }), h("img", {
        class: "ui inline black image",
        height: "28",
        src: "https://gitee.com//logo-black.svg?20171024",
        width: "95"
    }))), h("a", {
        href: "/explore",
        class: "item ",
        title: "\u5f00\u6e90\u8f6f\u4ef6"
    }, "\u5f00\u6e90\u8f6f\u4ef6"), h("a", {
        href: "/enterprises",
        class: "item ",
        title: "\u4f01\u4e1a\u7248"
    }, "\u4f01\u4e1a\u7248", h("sup", {
        class: "ui red label"
    }, "\u7279\u60e0")), h("a", {
        href: "/education",
        class: "item ",
        title: "\u9ad8\u6821\u7248"
    }, "\u9ad8\u6821\u7248"), h("a", {
        href: "https://blog.gitee.com/",
        class: "item",
        id: "gitee-blog",
        target: "_blank",
        title: "\u535a\u5ba2"
    }, "\u535a\u5ba2"), h("div", {
        class: "dropdown item ui",
        id: "my-gitee-dropdown",
        tabindex: "0"
    }, h("a", {
        href: "/masx200/dashboard"
    }, "\u6211\u7684\u7801\u4e91"), h("i", {
        class: "dropdown icon"
    }), h("div", {
        class: "menu transition hidden",
        tabindex: "-1"
    }, h("div", {
        class: "header user-projects"
    }, h("a", {
        href: "/masx200/projects",
        class: "pull-right",
        target: "_blank"
    }, "\u5168\u90e8"), "\u4ed3\u5e93", h("span", {
        class: "count"
    }, "(11)")), h("a", {
        target: "_blank",
        href: "/masx200/mvvm-reactive-view",
        title: "masx200/mvvm-reactive-view",
        class: "item"
    }, "masx200/mvvm-reactive-view"), h("a", {
        target: "_blank",
        href: "/masx200/webpack-react-vue-spa-awesome-config",
        title: "masx200/webpack-react-vue-spa-awesome-config",
        class: "item"
    }, "masx200/webpack-react-vue-spa-awesome-config"), h("a", {
        target: "_blank",
        href: "/masx200/custom-elements-random-define",
        title: "masx200/custom-elements-random-define",
        class: "item"
    }, "masx200/custom-elements-random-define"), h("a", {
        target: "_blank",
        href: "/masx200/importcjsamdumd",
        title: "masx200/importcjsamdumd",
        class: "item"
    }, "masx200/importcjsamdumd"), h("a", {
        target: "_blank",
        href: "/masx200/dom-element-attribute-agent-proxy",
        title: "masx200/dom-element-attribute-agent-proxy",
        class: "item"
    }, "masx200/dom-element-attribute-agent-proxy"))), h("div", {
        class: "center responsive-logo"
    }, h("a", {
        href: "/"
    }, h("img", {
        class: "ui inline image",
        height: "24",
        src: "https://gitee.com//logo.svg?20171024",
        width: "85"
    }), h("img", {
        class: "ui inline black image",
        height: "24",
        src: "https://gitee.com//logo-black.svg?20171024",
        width: "85"
    }))), h("div", {
        class: "right menu userbar",
        id: "git-nav-user-bar"
    }, h("div", {
        class: "item git-nav-search-item"
    }, h("form", {
        "accept-charset": "UTF-8",
        action: "/search",
        autocomplete: "on",
        "data-text-filter": "\u641c\u7d22\u683c\u5f0f\u4e0d\u6b63\u786e",
        "data-text-require": "\u641c\u7d22\u5173\u952e\u5b57\u4e0d\u80fd\u5c11\u4e8e1\u4e2a",
        id: "navbar-search-form",
        method: "get"
    }, h("div", {
        style: "margin:0;padding:0;display:inline"
    }, h("input", {
        name: "utf8",
        type: "hidden",
        value: "\u2713"
    })), h("div", {
        class: "ui mini fluid input"
    }, h("input", {
        id: "navbar-search-input",
        name: "q",
        placeholder: "\u641c\u7d22\u9879\u76ee\u3001\u4ee3\u7801\u7247\u6bb5...",
        type: "text",
        value: ""
    }), h("input", {
        id: "navbar-search-type",
        name: "type",
        type: "hidden"
    })))), h("div", {
        class: "item ui dropdown empty",
        "data-count-path": "/notifications/unread_count",
        "data-enable": "",
        "data-mark-notice-path": "/notifications/mark",
        id: "notice-dropdown",
        tabindex: "0"
    }, h("a", {
        href: "/notifications",
        class: "remind-button"
    }, h("i", {
        class: "iconfont icon-remind"
    }), h("div", {
        class: "notice-count total"
    }, "1")), h("div", {
        class: "notice-dropdown-panel menu transition hidden",
        tabindex: "-1",
        style: "left: -165px;"
    }, h("div", {
        class: "notice-dropdown-panel-header"
    }, h("div", {
        class: "tab",
        "data-data-path": "/notifications/notices?scope=referer",
        "data-html-path": "/notifications/referer",
        "data-scope": "referer"
    }, h("div", {
        class: "content"
    }, "@ \u6211", h("div", {
        class: "notice-count referer"
    }))), h("div", {
        class: "tab active",
        "data-data-path": "/notifications/notices?scope=infos",
        "data-html-path": "/notifications/infos",
        "data-scope": "infos"
    }, h("div", {
        class: "content"
    }, "\u901a\u77e5", h("div", {
        class: "notice-count infos"
    }, "1"))), h("div", {
        class: "tab",
        "data-data-path": "/notifications/notices?scope=messages",
        "data-html-path": "/notifications/messages",
        "data-scope": "messages"
    }, h("div", {
        class: "content"
    }, "\u79c1\u4fe1", h("div", {
        class: "notice-count messages"
    })))), h("div", {
        class: "item notice-dropdown-panel-container"
    }, h("div", {
        class: "ui dimmer over active"
    }, h("div", {
        class: "ui loader"
    })), h("div", {
        class: "notice-list",
        style: "min-height: auto;"
    }, h("a", {
        class: "noti",
        href: "/masx200/mvvm-reactive-view",
        target: "_blank",
        "data-type": "project",
        "data-id": "50555275"
    }, h("div", {
        class: "title"
    }, "\u4f60\u7684\u4ed3\u5e93 masx200/mvvm-reactive-view \u5df2\u7ecf\u4ece https://github.com/masx200/mvvm-reactive-view.git \u540c\u6b65\u6210\u529f"), h("div", {
        class: "meta"
    }, h("time", {
        class: "timeago"
    }, "2\u5c0f\u65f6\u524d"), " \xb7", " ", h("span", {
        class: "namespace"
    }, "masx200/mvvm-reactive-view")))), h("div", {
        class: "notice-dropdown-panel-blank"
    }, "\u6682\u6ca1\u6709\u65b0\u6d88\u606f")), h("div", {
        class: "notice-dropdown-panel-footer"
    }, h("div", {
        class: "action"
    }, h("div", {
        class: "side left"
    }, h("a", {
        href: "javascript: void(0);",
        class: "mark-notices"
    }, "\u5f53\u524d\u6807\u8bb0\u4e3a\u5df2\u8bfb")), h("div", {
        class: "side right"
    }, h("a", {
        href: "/notifications/infos",
        class: "load-all",
        target: "_blank"
    }, "\u67e5\u770b\u5168\u90e8")))))), h("div", {
        class: "ui dropdown link item",
        id: "git-nav-create",
        tabindex: "0"
    }, h("i", {
        class: "iconfont icon-add-thin"
    }), h("div", {
        class: "right menu",
        tabindex: "-1"
    }, h("a", {
        href: "/projects/new",
        class: "item"
    }, h("i", {
        class: "add square icon"
    }), "\u65b0\u5efa\u4ed3\u5e93"), h("a", {
        href: "/masx200/codes/new",
        class: "item"
    }, h("i", {
        class: "code icon"
    }), "\u53d1\u5e03\u4ee3\u7801\u7247\u6bb5"), h("a", {
        href: "/organizations/new",
        class: "item"
    }, h("i", {
        class: "group icon"
    }), "\u521b\u5efa\u7ec4\u7ec7"), h("a", {
        href: "/enterprises/new",
        class: "item"
    }, h("i", {
        class: "icon iconfont icon-enterprise"
    }), "\u5f00\u901a\u4f01\u4e1a\u7248"), h("a", {
        href: "/projects/oauth_github",
        class: "item"
    }, h("i", {
        class: "github icon"
    }), "\u4ece GitHub \u5bfc\u5165\u4ed3\u5e93"))), h("div", {
        class: "ui dropdown item",
        id: "git-nav-user",
        tabindex: "0"
    }, h("img", {
        alt: "1081296_masx200",
        class: "ui avatar image",
        src: "https://avatar.gitee.com/uploads/96/1081296_masx200.png!avatar30?1566294318"
    }), h("i", {
        class: "dropdown icon"
    }), h("div", {
        class: "right menu",
        tabindex: "-1"
    }, h("a", {
        href: "/masx200",
        class: "item"
    }, h("i", {
        class: "iconfont icon-ic-home"
    }), "\u4e2a\u4eba\u4e3b\u9875"), h("a", {
        href: "/profile",
        class: "item"
    }, h("div", {
        class: "mayun-icon my-ic-edit my-ic-edit-dims"
    }), "\u8bbe\u7f6e"), h("div", {
        class: "divider"
    }), h("a", {
        href: "/gists",
        class: "item"
    }, h("div", {
        class: "iconfont icon-ic-gist"
    }), "\u4ee3\u7801\u7247\u6bb5"), h("a", {
        href: "https://gitee.com/help",
        class: "item",
        target: "_blank"
    }, h("div", {
        class: "mayun-icon my-ic-help my-ic-help-dims"
    }), "\u5e2e\u52a9"), h("div", {
        class: "divider"
    }), h("a", {
        href: "/logout",
        class: "item destroy-user-session",
        "data-method": "delete",
        rel: "nofollow"
    }, h("div", {
        class: "mayun-icon my-ic-exit my-ic-exit-dims"
    }), "\u9000\u51fa"))), h("script", null)))))) ]);
    console.log(vdom$5, temp_ref, lirefs);
    document.body.appendChild(MountElement(vdom$5, document.createElement("div")));
    console.log([ h, h ]);
    (() => {
        var mystate = createstate(true);
        console.log("mystatetest", mystate);
        var vdom = conditon(mystate, "testtrue", h("div", undefined, "testfalese"));
        var vdom2 = conditon(mystate, undefined, h("div", undefined, "testwwwwwwwwwfalese"));
        var vdom3 = conditon(mystate, h("div", undefined, "testwwwwwwwtrueeeeeeeeee"), undefined);
        console.log([ vdom, vdom2, vdom3 ]);
        document.body.appendChild(MountElement([ vdom, vdom2, vdom3 ], document.createElement("div")));
        var timer = setInterval(() => {
            mystate.value = !mystate.value;
        }, 1e3);
        setTimeout(() => {
            clearInterval(timer);
        }, 1e4);
    })();
    (() => {
        const stylestate = createstate({
            display: "block",
            width: "100%"
        });
        const inputref = createRef();
        const state1 = createstate("hello");
        const vdom = [ h("div", {
            style: {
                display: "block",
                width: "100%"
            }
        }, "hello world!"), h("input", {
            style: "width:100%",
            "@input": e => state1.value = e.target.value,
            "*ref": inputref,
            "@change": e => state1.value = e.target.value,
            id: "co11111111111de16",
            class: "col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control",
            value: state1
        }), h("h1", {
            style: stylestate
        }, "mvvm-reactive-view"), h("button", {
            "@click": () => {
                stylestate.color = "red";
            }
        }, "red"), h("button", {
            "@click": () => {
                stylestate.color = "green";
            }
        }, "green") ];
        watch(stylestate, console.log);
        watch(state1, console.log);
        console.log(vdom);
        MountElement(vdom, document.getElementById("app"));
    })();
    (() => {
        const vdom2 = [ h("div", {
            "*text": "<a>\u7ed1\u5b9atextcontent</a>"
        }), h("div", {
            "*html": "<a>\u7ed1\u5b9ainnerhtml</a>"
        }) ];
        console.log(vdom2);
        document.body.appendChild(MountElement(vdom2, document.createElement("div")));
        const state1 = createstate("<a>\u7ed1\u5b9atextcontent</a>");
        const state2 = createstate("<a>\u7ed1\u5b9ainnerhtml</a>");
        const vdom3 = [ h("textarea", {
            value: state1,
            "@input": [ e => {
                state1.value = e.target.value;
            } ]
        }), h("input", {
            value: state2,
            style: "width:100%",
            "@change": [ e => {
                state2.value = e.target.value;
            } ],
            "@input": [ e => {
                state2.value = e.target.value;
            } ]
        }) ];
        console.log(vdom3);
        document.body.appendChild(MountElement(vdom3, document.createElement("div")));
        const state3 = createstate("<a>\u7ed1\u5b9ainnerhtml</a>");
        const vdom4 = h("", null, h("div", {
            _text: state3
        }), h("div", {
            _html: state3
        }), h("script", null, " "));
        watch(state1, state => state3.value = state);
        watch(state2, state => state1.value = state);
        console.log(state3);
        console.log(vdom4);
        document.body.appendChild(MountElement(vdom4, document.createElement("div")));
        const objstate = createstate({
            a: "w",
            6: "xxxxxxx",
            tttttttt: "true"
        });
        const objstate2 = createstate('{ a: "w", 6: "xxxxxxx", tttttttt: "true" }');
        console.log(objstate);
        setTimeout(() => {
            objstate.length = 10;
            objstate2.value = 2222222222222;
        }, 2e3);
        const objstatearray = createstate([ {
            a: "w",
            6: "xxxxxxx",
            tttttttt: "true"
        }, 1, true, "test" ]);
        const stylestate = createstate({
            display: "block",
            width: "100%"
        });
        const classsetstate = createstate(new Set([ "xxxxxxx", "wwwwwww", "eeeeeeee" ]));
        console.log("classsetstate", classsetstate);
        watch(classsetstate, a => console.log(a));
        setTimeout(() => {
            classsetstate.add("vvvvvvvvvvv");
        }, 5e3);
        setTimeout(() => {
            classsetstate.delete("eeeeeeee");
        }, 4e3);
        const vdomobj = [ h("div", {
            style: {
                display: "block",
                width: "100%"
            }
        }, objstate2), h("div", {
            style: stylestate,
            class: new Set([ "wwwwwww", "eeeeeeee" ])
        }, objstatearray), objstate, h("div", {
            style: stylestate,
            class: classsetstate
        }) ];
        document.body.appendChild(MountElement(vdomobj, document.createElement("div")));
        console.log(vdomobj);
        requestAnimationFrame(() => {
            objstatearray.unshift(Math.random());
            objstatearray.push("qqqqqqqqq");
            objstatearray.unshift(Math.random());
            objstatearray.push("qqqqqqqqq");
            objstatearray.length = 10;
            objstatearray.push(Math.random());
        });
        console.log(objstatearray);
        const timer = setInterval(() => {
            objstate2.value += String(Math.random());
        }, 1e3);
        setTimeout(() => {
            clearInterval(timer);
        }, 1e4);
        console.log([ objstate2, createstate(objstate2) ]);
        console.log(Object.entries(objstate));
    })();
    (() => {
        var vdom = h("math", null, h("mrow", null, h("mrow", null, h("msup", null, h("mi", null, "a"), h("mn", null, "2")), h("mo", null, "+"), h("msup", null, h("mi", null, "b"), h("mn", null, "2"))), h("mo", null, "="), h("msup", null, h("mi", null, "c"), h("mn", null, "2"))));
        document.body.appendChild(MountElement(vdom, document.createElement("div")));
        console.log(vdom);
    })();
    class Bqqqqqqqqq extends HTMLElement {}
    class Aqqqqqqqqq extends HTMLElement {}
    console.log(customElements, [ ...customElements ]);
    customElements.define("qqqqqqqqqq-----a", Bqqqqqqqqq);
    customElements.define("qqqqqqqqqq-----a", Aqqqqqqqqq);
    document.body.appendChild(MountElement([ h(Bqqqqqqqqq), h(Aqqqqqqqqq) ], document.createElement("div")));
    console.log([ h, h ]);
    (() => {
        (() => {
            var _class, _temp;
            var myvdom1111111 = h(class extends HTMLElement {
                constructor(...argwwwuments) {
                    super();
                    console.log(argwwwuments);
                }
            }, {
                style: {
                    display: "block"
                }
            }, "hhhhhhhhhhhhtests");
            console.log(myvdom1111111);
            document.body.appendChild(MountElement(myvdom1111111, document.createElement("div")));
            document.body.appendChild(MountElement(h((() => {
                var Aaaaaaaaaa = class extends HTMLElement {};
                Aaaaaaaaaa.defaultProps = {
                    name: "HelloKitty",
                    myAge: 18
                };
                return Aaaaaaaaaa;
            })()), document.createElement("div")));
            const myele1 = h((_temp = _class = class extends HTMLElement {}, _defineProperty(_class, "defaultProps", {
                name: "aaaaaaaaaaHelloKitty",
                myAge: 0x71afd498cfffe
            }), _temp));
            console.log(myele1);
            document.body.appendChild(MountElement(myele1, document.createElement("div")));
            document.body.appendChild(MountElement(myele1, document.createElement("div")));
        })();
    })();
    {
        const vdom = h("div", [ [ h("html", null, "testhtml"), h("button", {
            onclick: [ console.log, () => {
                console.log("onclick");
            } ],
            "*text": "clicktest",
            "@click": [ console.log, () => {
                console.log("@click");
            } ]
        }), h("style", null) ] ]);
        document.body.appendChild(MountElement(vdom, document.createElement("div")));
        console.log("onclick", " @click", vdom);
    }
    (async () => {
        const defaultProps = {
            cccccc: "bbbbbbb"
        };
        const css = await (await fetch("https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-6556dfa9be535e551ffffaadfecdad99.min.css")).text();
        const Hellowordclass = Object.assign(() => {
            return h("div", [ "hello world" ], "\u6d4b\u8bd5\u4e0d\u4f7f\u7528createComponent");
        }, {
            css: css,
            defaultProps: defaultProps
        });
        const vdom = h(Hellowordclass, null);
        let vdom1 = h(Hellowordclass);
        document.body.appendChild(MountElement([ vdom, vdom1 ], document.createElement("div")));
        console.log([ "\u6d4b\u8bd5\u4e0d\u4f7f\u7528createComponent", Hellowordclass, vdom ]);
    })();
    (() => {
        const colortext = createstate("red");
        const stylestate = createstate({
            display: "block",
            width: "100%",
            color: colortext
        });
        const vdom = [ h("hr", null), h("h1", {
            style: stylestate
        }, "input color ", colortext), h("input", {
            _value: colortext
        }), h("hr", null) ];
        console.log([ vdom, colortext, stylestate ]);
        watch([ colortext, stylestate ], (a, b) => console.log([ a, _objectSpread2({}, b) ]));
        document.body.appendChild(MountElement(vdom, document.createElement("div")));
    })();
    (() => {
        const colortext = createstate("blue");
        const stylestate = createstate({
            display: "block",
            width: "100%",
            color: colortext
        });
        const vdom = [ h("hr", null), h("h1", {
            style: stylestate
        }, "input color ", colortext), h("input", {
            _value: colortext
        }), h("hr", null) ];
        var inter = setInterval(() => {
            colortext.value = "#" + (Math.random() * 16 ** 7).toString(16).slice(0, 6);
        }, 1e3);
        setTimeout(() => {
            clearInterval(inter);
        }, 1e4);
        watch([ colortext, stylestate ], (a, b) => console.log([ a, _objectSpread2({}, b) ]));
        document.body.appendChild(MountElement(vdom, document.createElement("div")));
    })();
    var css$1 = '@import url(https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css);html{color:#444333;background:#fff;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;text-rendering:optimizelegibility}article,aside,blockquote,body,button,code,dd,details,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,input,legend,li,menu,nav,ol,p,pre,section,td,textarea,th,ul{margin:0;padding:0}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}audio,canvas,video{display:inline-block;*display:inline;*zoom:1}body,button,input,select,textarea{font:500 .875em/1.8 Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif}button,input{*width:auto;*overflow:visible;line-height:22px}table{border-collapse:collapse;border-spacing:0}th{text-align:inherit}fieldset,img{border:0}img{-ms-interpolation-mode:bicubic}iframe{display:block}blockquote{font-family:Optima,Georgia,STSong,serif;margin:1em 0;color:#999;padding:.6em 1em;background:#f8f8f8;border-left:.4em solid #ddd}blockquote blockquote{padding:0 0 0 1em;margin-left:2em}abbr,acronym{border-bottom:1px dotted;font-variant:normal}abbr{cursor:help}del{text-decoration:line-through}address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:400}ol,ul{list-style:none}caption,th{text-align:left}q:after,q:before{content:""}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:text-top\\9}:root sub,:root sup{vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}a:hover{text-decoration:underline}a,ins{text-decoration:none}.typo-u,u{text-decoration:underline}mark{background:#fffdd1}code,pre{font-family:Courier New,Courier,monospace;white-space:pre-wrap;word-wrap:break-word}pre{background:#f8f8f8;border:1px solid #ddd;padding:1em 1.5em}hr{border:none;border-bottom:1px solid #cfcfcf;margin-bottom:10px;*color:pink;*filter:chroma(color=pink);height:10px;*margin:-7px 0 2px}.typo-small,figcaption,small{font-size:.9em;color:#888}[draggable]{cursor:move}.clearfix:after,.clearfix:before{content:"";display:table}.clearfix:after{clear:both}.clearfix{zoom:1}.textwrap,.textwrap td,.textwrap th{word-wrap:break-word;word-break:break-all}.textwrap-table{table-layout:fixed}.typo-dl,.typo-form,.typo-hr,.typo-ol,.typo-p,.typo-pre,.typo-table,.typo-ul,.typo dl,.typo form,.typo hr,.typo ol,.typo p,.typo pre,.typo table,.typo ul{margin-bottom:1.2em}h1,h2,h3,h4,h5,h6{font-weight:500;*font-weight:800;font-family:Helvetica Neue,Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif;color:#333}.typo-h1,.typo-h2,.typo-h3,.typo-h4,.typo-h5,.typo-h6,.typo h1,.typo h2,.typo h3,.typo h4,.typo h5,.typo h6{margin-bottom:.4em;line-height:1.5}.typo-h1,.typo h1{font-size:1.8em}.typo-h2,.typo h2{font-size:1.6em}.typo-h3,.typo h3{font-size:1.4em}.typo-h4,.typo h4{font-size:1.2em}.typo-h5,.typo-h6,.typo h5,.typo h6{font-size:1em}.typo-ul,.typo ul{margin-left:1.3em;list-style:disc}.typo-ol,.typo ol{list-style:decimal;margin-left:1.9em}.typo-ol ol,.typo-ol ul,.typo-ul ol,.typo-ul ul,.typo li ol,.typo li ul{margin-top:0;margin-bottom:0;margin-left:2em}.typo-ol ul,.typo-ul ul,.typo li ul{list-style:circle}.typo-table td .typo table caption,.typo-table th,.typo table td,.typo table th{border:1px solid #ddd;padding:.5em 1em;color:#666}.typo-table th,.typo table th{background:#fbfbfb}.typo-table thead th,.typo table thead th{background:#f1f1f1}.typo table .caption{border-bottom:none}.typo-input,.typo-textarea{-webkit-appearance:none;border-radius:0}::-moz-selection{background:#08c;color:#fff}::selection{background:#08c;color:#fff}.typo-em,.typo em,caption,legend{font-weight:700}p{color:#0f0!important}@font-face{font-family:octicons-anchor;src:url(data:font/woff;charset=utf-8;base64,d09GRgABAAAAAAYcAA0AAAAACjQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABMAAAABwAAAAca8vGTk9TLzIAAAFMAAAARAAAAFZG1VHVY21hcAAAAZAAAAA+AAABQgAP9AdjdnQgAAAB0AAAAAQAAAAEACICiGdhc3AAAAHUAAAACAAAAAj//wADZ2x5ZgAAAdwAAADRAAABEKyikaNoZWFkAAACsAAAAC0AAAA2AtXoA2hoZWEAAALgAAAAHAAAACQHngNFaG10eAAAAvwAAAAQAAAAEAwAACJsb2NhAAADDAAAAAoAAAAKALIAVG1heHAAAAMYAAAAHwAAACABEAB2bmFtZQAAAzgAAALBAAAFu3I9x/Nwb3N0AAAF/AAAAB0AAAAvaoFvbwAAAAEAAAAAzBdyYwAAAADP2IQvAAAAAM/bz7t4nGNgZGFgnMDAysDB1Ml0hoGBoR9CM75mMGLkYGBgYmBlZsAKAtJcUxgcPsR8iGF2+O/AEMPsznAYKMwIkgMA5REMOXicY2BgYGaAYBkGRgYQsAHyGMF8FgYFIM0ChED+h5j//yEk/3KoSgZGNgYYk4GRCUgwMaACRoZhDwCs7QgGAAAAIgKIAAAAAf//AAJ4nHWMMQrCQBBF/0zWrCCIKUQsTDCL2EXMohYGSSmorScInsRGL2DOYJe0Ntp7BK+gJ1BxF1stZvjz/v8DRghQzEc4kIgKwiAppcA9LtzKLSkdNhKFY3HF4lK69ExKslx7Xa+vPRVS43G98vG1DnkDMIBUgFN0MDXflU8tbaZOUkXUH0+U27RoRpOIyCKjbMCVejwypzJJG4jIwb43rfl6wbwanocrJm9XFYfskuVC5K/TPyczNU7b84CXcbxks1Un6H6tLH9vf2LRnn8Ax7A5WQAAAHicY2BkYGAA4teL1+yI57f5ysDNwgAC529f0kOmWRiYVgEpDgYmEA8AUzEKsQAAAHicY2BkYGB2+O/AEMPCAAJAkpEBFbAAADgKAe0EAAAiAAAAAAQAAAAEAAAAAAAAKgAqACoAiAAAeJxjYGRgYGBhsGFgYgABEMkFhAwM/xn0QAIAD6YBhwB4nI1Ty07cMBS9QwKlQapQW3VXySvEqDCZGbGaHULiIQ1FKgjWMxknMfLEke2A+IJu+wntrt/QbVf9gG75jK577Lg8K1qQPCfnnnt8fX1NRC/pmjrk/zprC+8D7tBy9DHgBXoWfQ44Av8t4Bj4Z8CLtBL9CniJluPXASf0Lm4CXqFX8Q84dOLnMB17N4c7tBo1AS/Qi+hTwBH4rwHHwN8DXqQ30XXAS7QaLwSc0Gn8NuAVWou/gFmnjLrEaEh9GmDdDGgL3B4JsrRPDU2hTOiMSuJUIdKQQayiAth69r6akSSFqIJuA19TrzCIaY8sIoxyrNIrL//pw7A2iMygkX5vDj+G+kuoLdX4GlGK/8Lnlz6/h9MpmoO9rafrz7ILXEHHaAx95s9lsI7AHNMBWEZHULnfAXwG9/ZqdzLI08iuwRloXE8kfhXYAvE23+23DU3t626rbs8/8adv+9DWknsHp3E17oCf+Z48rvEQNZ78paYM38qfk3v/u3l3u3GXN2Dmvmvpf1Srwk3pB/VSsp512bA/GG5i2WJ7wu430yQ5K3nFGiOqgtmSB5pJVSizwaacmUZzZhXLlZTq8qGGFY2YcSkqbth6aW1tRmlaCFs2016m5qn36SbJrqosG4uMV4aP2PHBmB3tjtmgN2izkGQyLWprekbIntJFing32a5rKWCN/SdSoga45EJykyQ7asZvHQ8PTm6cslIpwyeyjbVltNikc2HTR7YKh9LBl9DADC0U/jLcBZDKrMhUBfQBvXRzLtFtjU9eNHKin0x5InTqb8lNpfKv1s1xHzTXRqgKzek/mb7nB8RZTCDhGEX3kK/8Q75AmUM/eLkfA+0Hi908Kx4eNsMgudg5GLdRD7a84npi+YxNr5i5KIbW5izXas7cHXIMAau1OueZhfj+cOcP3P8MNIWLyYOBuxL6DRylJ4cAAAB4nGNgYoAALjDJyIAOWMCiTIxMLDmZedkABtIBygAAAA==) format("woff")}*{color:purple!important;font-size:50px}@keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@media (max-width:720px){.article-content h1{font-size:24px}.article-content h2{font-size:20px}.article-content h3{font-size:18px}.article-content pre>code .copy-code-btn{display:none}.article-content pre>code.hljs[lang]:before{top:2px;right:15px}}@media (max-width:720px){.article-content pre>code.copyable.hljs[lang]:before{right:1rem}}@media (max-width:500px){hr#hidewidthless500{display:none}}.recommend-container .recommend-user .item{margin-bottom:16px}.recommend-container .recommend-user .ui.button{padding:3px 5px;margin-right:0}.recommend-container .recommend-user .header .pull-right{color:#005980;cursor:pointer}.recommend-container .recommend-user .header .pull-right.disabled{opacity:.7;cursor:default}.recommend-container .recommend-user .icon-reset{margin-top:-1px;height:16px;font-size:16px;margin-right:2px}.recommend-container .recommend-user__content{position:relative}.recommend-container .dimmer.active{z-index:1}.recommend-container .recommend-list__user{-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;margin-right:4px}.recommend-container .recommend-list__user strong{color:#005980}.recommend-container .recommend-list__user .recommend-list__user-info{margin:0 4px 0 8px;max-width:155px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.recommend-container .recommend-list__user .recommend-list__user-info.is-follow{max-width:125px}.recommend-container .recommend-list__user .recommend-list__user-info>div{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.recommend-container .recommend-list__flollow .disable{opacity:.5}.recommend-container .recommend-project .icon-recommended{color:#fe7300}.recommend-container .recommend-project .project-label{display:inline-block}.recommend-container .recommend-project .recommend-list{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.recommend-container .recommend-project .recommend-list>*{word-break:break-all}.recommend-container .recommend-project .recommend-list .recommend-project__describe{overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical}.recommend-container .recommend-project .item{margin-bottom:16px}.recommend-container .recommend-project .recommend-project__name{margin-bottom:4px;color:#005980}.recommend-container .recent_visits .ui.items{margin-right:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.recommend-container .recent_visits .avatar-item{margin-right:-22px!important}.recommend-container .recent_visits .item{width:20%;min-width:0;font-size:16px}.recommend-container .recent_visits .empty-visitor.item{font-size:14px;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1}.dashboard-content.twelve{padding-right:0!important}.dashboard-content .gitee-headbread .git-user-selection-dropdown{margin-right:0!important}.dashboard-content .dashboard-team .git-user-content-header{display:none}.dashboard-content .gitee-headbread{margin-bottom:24px}.dashboard-content .git-dashboard-projects-menu{margin-bottom:24px!important}.dashboard-content .git-dashboard-projects-menu .f-bold{color:#fe7300;border-bottom:2px solid #fe7300!important}.dashboard-content .git-dashboard-projects-menu>a.item{font-size:16px;padding:8px 18px!important}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input{width:150px;margin-right:10px}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input input{margin-top:-6px;font-size:12px;margin-right:10px}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input .icon-search{margin-top:-4px}.dashboard-content #event-timeline-panel h3.event-timeline-title{font-size:16px;margin-top:0;margin-bottom:16px;display:inline-block}.dashboard-content #event-timeline-panel .event-timeline.content{padding:0 0 18px 12px}.dashboard-content #event-timeline-panel .event-actionbar .dropdown.icon{margin-left:4px}.dashboard-content #event-timeline-panel .message-container .message{margin:0 0 1em}.dashboard-content .issues-filter__item{display:block;padding:0!important;color:initial!important;font-weight:500!important}.dashboard-content .issues-dropdown{margin-top:-6px!important}.dashboard-content .issues-dropdown .pl-0.f-bold{padding-left:0!important}.dashboard-content .dashboard-team .dashboard-team_info{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.dashboard-content .dashboard-team .ui.image{width:40px;height:40px;min-width:40px}.dashboard-content .dashboard-team .dashboard-team__contaniner .dashboard-team__name{font-size:16px;font-weight:700;overflow:hidden;word-break:keep-all;text-overflow:ellipsis;display:block}.dashboard-content .dashboard-team .dashboard-team__contaniner a{color:#005980!important}.dashboard-content .dashboard-team .dashboard-team__contaniner>.item:first-child{padding-top:0!important}.dashboard-content .dashboard-team .dashboard-team__contaniner .item{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.dashboard-content .dashboard-team .dashboard-team__contaniner .content{display:-webkit-box!important;display:-webkit-flex!important;display:-moz-box!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;overflow:hidden}.dashboard-content .dashboard-team .dashboard-team__contaniner .content:after{content:none}.dashboard-content .dashboard-team .dashboard-team__contaniner .content i{font-size:16px}.dashboard-content .dashboard-team .icon-enterprise-badge{margin-left:4px}.dashboard-content .dashboard-team .dashboard-team__operate{min-width:75px;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-moz-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.dashboard-content .dashboard-team .dashboard-team__operate.has-exit{min-width:150px}.recommend-project .icon-help-circle{vertical-align:baseline}.dashboard-content__show{width:608px!important;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.ui.container.user_page{width:1240px}#rc-users__container{position:relative}#rc-users__container .secondary-navigation .active{color:#fe7300!important}#rc-users__container .dashboard-content{padding-right:32px;padding-left:32px;padding-top:24px}#rc-users__container .dashboard-sidebar{padding:16px 0 0;width:280px!important;margin-left:10px}#rc-users__container .dashboard-sidebar .dashboard-group .item{margin:8px 0}#rc-users__container .dashboard-sidebar .dashboard-group:last-child{margin-bottom:0!important}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar{padding-top:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .ui.card{width:100%;margin-top:32px;margin-bottom:0;padding-bottom:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .ui.card .header{font-size:16px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name h4{font-size:14px;display:inline-block}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .description{margin-top:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .item.flex{margin-top:16px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .item.flex:first-child{margin-top:12px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .quit i{margin-top:0}#rc-users__container .has-active .content{padding-left:0 2px 0 8px}#rc-users__container .navigation .header{padding-right:8px;border-bottom:1px solid #e3e9ed;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;padding-bottom:4px}#rc-users__container .navigation .header,#rc-users__container .navigation .header .title{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}#rc-users__container .navigation .header .title{font-size:16px}#rc-users__container .navigation .header .avatar.image{margin-right:0}#rc-users__container .navigation .header strong{font-size:16px;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;max-width:120px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#rc-users__container .navigation .header strong a{color:unset}#rc-users__container .navigation .header .actions{margin-top:4px}#rc-users__container .navigation .header .actions i{color:#005980}#rc-users__container .navigation.user i{color:#989dad}#rc-users__container .navigation.user .content{padding:0 8px}#rc-users__container .navigation .items>a{color:#40485b}#rc-users__container .navigation .items>a:hover{color:#095eab}#rc-users__container .navigation .items>a:active{color:#064177}#rc-users__container .navigation .items>a:hover{color:#40485b}#rc-users__container .navigation .item:hover .content{background:#f8f8f8}#rc-users__container .navigation .item .active{color:#fe7300;background:#f8f8f8}#rc-users__container .navigation .item .active .num{color:inherit}#rc-users__container .navigation .item:hover .exit{display:inline-block}#rc-users__container .navigation .icon-add,#rc-users__container .navigation .icon-search{color:#8c92a4!important}#rc-users__container .navigation .num{font-size:12px;font-weight:500;color:#8c92a4}#rc-users__container .navigation .gray{color:#8c92a4}#rc-users__container .navigation .avatar.image{width:32px;height:32px}#rc-users__container .twitter-typeahead{width:100%}#rc-users__container .gray{color:#8c92a4}#rc-users__container .ui.container{width:1240px}#rc-users__container .contribution-events{padding-top:32px}#rc-users__container #git-footer-main{min-width:1240px}#rc-users__container .gitee-headbread .gitee-divider{display:inline-block;opacity:.5;margin:0 .2rem;color:rgba(0,0,0,.4);vertical-align:baseline}#rc-users__container .git-user-content .git-user-content-header{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:16px}#rc-users__container .ui.button.js-project-watch{background:#fff;border:1px solid rgba(140,146,164,.5);padding:2px 5px;margin:0}#rc-users__container .recommend-container{width:248px!important}.users__personal-avatar{position:relative;margin:0 auto 10px;width:160px;height:160px}.users__personal-avatar .over-avatar{position:absolute;top:0;left:0;width:100%;height:100%;color:#fff;font-size:14px;text-align:center;line-height:200px;border:4px solid #eee;border-radius:50%;background:rgba(0,0,0,.5);cursor:pointer;display:none}.users__personal-avatar .over-avatar:hover{display:block}.users__personal-avatar .ui.image.avatar{margin:0;width:100%;height:100%;border:4px solid #eee}.users__personal-avatar .ui.image.avatar:hover+.over-avatar{display:block}.users__personal-avatar .avatar-gender{position:absolute;bottom:2px;right:27px;width:32px;height:32px;border-radius:50%;color:#fff;font-size:21px;text-align:center;line-height:30px;border:2px solid #fff}.users__personal-avatar .avatar-gender.mars{background:#3eb4ff}.users__personal-avatar .avatar-gender.venus{background:#ff5bc6}.users__personal-name{text-align:center}.users__personal-name h2,.users__personal-name p{margin:8px 0 0;word-break:break-all}.users__personal-name h2 span,.users__personal-name p span{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}.users__personal-name .remark-name{color:#8c92a4;font-size:14px;font-weight:400;display:inline}.users__personal-name .ui.small.label{margin-bottom:.5em;padding:.4em .7em;font-weight:400}.users__personal-setting{margin:15px auto;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__personal-setting .ui.button{margin:0;width:45%;font-size:14px}.users__personal-setting .ui.button.basic{border:1px solid #ccc}.users__personal-socials .ui.grid{padding:0 1rem}.users__personal-socials .ui.grid .column{padding:1rem 0;text-align:center}.users__personal-socials .social-count{font-size:18px;font-weight:700}.users__personal-socials .social-name{padding-top:5px;color:#40485b;font-size:12px;display:block}.users__personal-info{padding:15px 0;color:#8c92a4}.users__personal-info .info-item{padding:3px 0;line-height:1.5;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__personal-info .info-item i.iconfont{width:20px;text-align:center}.users__personal-info .info-item i.iconfont.icon-time{font-size:12px}.users__personal-achievement{padding:10px 0}.users__personal-achievement h3{margin:0;padding-bottom:4px;border-bottom:1px solid #dce3e8}.users__personal-achievement .ui.list .item .content{line-height:1.8}.users__personal-achievement .ui.list .item .content .description{color:#7687ab}.users__personal-groups{padding:10px 0}.users__personal-groups h3{margin:0;padding-bottom:4px;border-bottom:1px solid #dce3e8}.users__personal-groups .ui.list{margin:0}.users__personal-groups .ui.list:not(.more-groups){margin-top:1em}.users__personal-groups .ui.list .item{padding:.3em 0}.users__personal-groups .ui.list .item a{color:#005980!important}.users__personal-groups .ui.list .item a:hover{color:#4c8aa6!important}.users__personal-groups .ui.list .item a:active{color:#003e59!important}.users__personal-groups .ui.list .item .content{line-height:1.8;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__personal-groups .ui.list .item .right.floated.content{color:#7687ab}.users__personal-groups .ui.list .item .right.floated.content .mr-1{width:24px;display:inline-block}.users__personal-groups .load-more-groups{margin-top:8px;display:block;color:#7687ab}.users__personal-groups .load-more-groups:hover{color:#9fabc4}.users__personal-groups .load-more-groups:active{color:#525e77}.users__navbar .ui.secondary.pointing.menu{border-bottom:2px solid #dededf}.users__navbar .ui.secondary.pointing.menu>.item{margin-bottom:-2px;padding:10px 30px;min-width:100px;text-align:center;border-width:2px}.users__navbar .ui.secondary.pointing.menu>.item.active{color:#fe7300;border-color:#fe7300}.users__navbar .ui.secondary.pointing.menu>.item.active .ui.label{color:#fe7300;background:rgba(254,115,0,.2)}.users__header{margin-top:2em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__header h3{margin:0}.users__header .ui.dropdown{padding:.5em .92857em}.users__popular-projects .ui.cards{margin:0 -.5em -.5em}.users__popular-projects .ui.cards .ui.card{margin:.5em!important;padding:1em;width:calc(50% - 1em)!important;border:1px solid #dce3e8;-webkit-box-shadow:none;box-shadow:none}.users__popular-projects .ui.cards .ui.card .content{padding:0}.users__popular-projects .ui.cards .ui.card .content .popular-project-title{font-size:16px;word-break:break-all;vertical-align:middle}.users__popular-projects .ui.cards .ui.card .content .git-project-gvp-badge{margin-top:-3px}.users__popular-projects .ui.cards .ui.card .content i.iconfont{font-size:14px}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-mode-table{margin-top:1px;color:#d0d0d0;cursor:move}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-recommended{color:#fe7300;font-weight:400}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-watch{font-size:12px;vertical-align:baseline}.users__popular-projects .ui.cards .ui.card .content .description{color:#8c92a4;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}.users__popular-projects .ui.cards .ui.card .extra.content{padding-top:1em;border:none!important;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__popular-projects .ui.cards .ui.card .extra.content:after{content:none}.users__popular-projects .ui.cards .ui.card .extra.content .left .ui.small.label{padding:.4em .7em}.users__popular-projects .ui.cards .ui.card .extra.content .right a{padding:0 .2em;color:#8c92a4}.users__popular-projects .ui.cards .ui.card .extra.content .right a:hover{color:#aeb2bf}.users__popular-projects .ui.cards .ui.card .extra.content .right a:active{color:#626672}.users__popular-projects .ui.cards .ui.card.sortable-chosen{background:#fed!important}.users__contribution-panel .less{background-color:#eee}.users__contribution-panel .little{background-color:#d6e685}.users__contribution-panel .some{background-color:#8cc665}.users__contribution-panel .many{background-color:#44a340}.users__contribution-panel .much{background-color:#1e6823}.users__contribution-panel .contribution-box{padding-top:20px;height:125px;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.users__contribution-panel .contribution-box .left-side{width:32px;font-size:12px;text-align:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.users__contribution-panel .contribution-box .left-side,.users__contribution-panel .contribution-box .right-side{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.users__contribution-panel .contribution-box .right-side{position:relative;width:100%;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.users__contribution-panel .contribution-box .right-side .box{width:1.88679%;height:15px;border:1px solid #fff}.users__contribution-panel .contribution-box .right-side .box[data-content]:hover{border:1px solid #000}.users__contribution-panel .contribution-box .right-side .month{position:absolute;top:0;margin-top:-15px;margin-left:-15px;min-width:45px;font-size:12px;text-align:center}.users__contribution-panel .contribution-tip{margin-top:10px;padding-right:10px;font-size:12px;text-align:right}.users__contribution-panel .contribution-tip .word{font-size:12px;vertical-align:top;display:inline-block}.users__contribution-panel .contribution-tip .ui.horizontal.list>.item{margin:0 1px;width:12px;height:12px;vertical-align:text-bottom}.users__contribution-panel .contribution-describ p{margin:0 20px 0 0;display:inline-block}.users__contribution-panel .contribution-describ p.text-muted{margin-top:10px;display:block}.users__customize-modal .ui.form{min-height:180px}.users__customize-modal .grouped.fields{margin:.2em 0 1em!important;padding:10px 0;max-height:20em;overflow-y:auto}.users__customize-modal .grouped.fields .field{padding:5px!important}.users__customize-modal .grouped.fields .field .ui.checkbox{width:100%}.users__customize-modal .grouped.fields .field label{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__customize-modal .grouped.fields .field label span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__customize-modal .grouped.fields .field label .star-count{min-width:4em;text-align:right}.users__customize-modal .grouped.fields .field.active{background:rgba(254,115,0,.2)}.users__report-modal .appeal-success-tip{text-align:center}.users__report-modal .appeal-success-tip i.iconfont{font-size:7rem;color:#4baf50}.users__report-modal .ui.items{padding:20px;background:#f4f5f6}.users__report-modal .ui.items .ui.image{width:50px}.users__report-modal .ui.items .content .header{color:#40485b}.users__report-modal .ui.items .content .description{color:#8c92a4;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__report-modal .ui.segment.loader-block{border:0;min-height:100px}.users__report-modal .action-types .item{margin:5px;padding:10px 20px;min-width:120px;text-align:center;display:inline-block;background:#f2f2f2;border-radius:5px;cursor:pointer}.users__report-modal .action-types .item.active,.users__report-modal .action-types .item:active,.users__report-modal .action-types .item:hover{color:#fe7300}.users__report-modal .extra-content textarea{width:100%;height:5em}#user-show-detail .git-dashboard-projects-menu>.f-bold{color:#fe7300}#user-show-detail .git-codes-tags{margin-bottom:16px}#user-show-detail .git-user-twl-col>.gitee-headbread{margin-bottom:16px;margin-top:10px}#user-show-detail .git-profile-content-header .git-dashboard-projects-menu{margin-bottom:14px}#user-show-detail .git-profile-content-header .git-dashboard-projects-menu>a{font-size:14px}.recommend-container{padding:24px 0 0!important}.recommend-container .recommend-notice{background-color:#fffeed!important;margin-bottom:24px}.recommend-container .recommend-notice>.header{margin-right:8px!important}.recommend-container .ui.message{color:#40485b;padding:12px 16px;-webkit-box-shadow:0 0 0 1px #e2d8bf inset,0 0 0 0 transparent;box-shadow:inset 0 0 0 1px #e2d8bf,0 0 0 0 transparent}.recommend-container .ui.message i{position:absolute;top:0;right:0;font-size:.8em;margin-top:8px;margin-right:8px;cursor:pointer;color:#005980}.recommend-container .ui.message .header{color:#40485b;font-size:14px}.recommend-container .ui.message .content{margin-top:4px}.recommend-container .recommend-block{margin-bottom:32px}.recommend-container .recommend-block>.items{margin-top:0}.recommend-container .recommend-block .header{margin-bottom:16px}.recommend-container .recommend-block .header strong{font-size:16px}.recommend-container .recommend-block .recommend-list{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.recommend-container .recommend-block .item{margin:0}.recommend-container .recommend-user .header{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:end;-webkit-align-items:flex-end;-moz-box-align:end;-ms-flex-align:end;align-items:flex-end}.recommend-container .recommend-user .recommend-list{-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}';
    console.log([ h, h ]);
    (() => {
        var mycom = createComponent$1(Object.assign((props, children) => {
            const number = createstate(1);
            useMounted(() => {
                console.log("mounted1");
            });
            useMounted(() => {
                console.log("mounted2", props);
            });
            useUnMounted(() => {
                console.log("unmounted");
            });
            watch(props.cccccc, cccccc => {
                console.log("cccccc", cccccc);
            });
            return h("div", {
                onclick: () => {
                    number.value++;
                }
            }, [ number, h("br", null), "wwwwwwwwwwww", h("div", [ "createComponent" ]), children, h("div", h("", null, "props cccccc ", props.cccccc)) ]);
        }, {
            defaultProps: {
                cccccc: "bbbbbbb"
            },
            css: css$1
        }));
        const myclasscomponent = mycom;
        const vdom = h(myclasscomponent, {
            aaaaaa: 222222222,
            tttttt: "dddddddddd"
        }, "children");
        console.log([ vdom, myclasscomponent, mycom ]);
        document.body.appendChild(MountElement(vdom, document.createElement("div")));
        setTimeout(() => {
            vdom.element.setAttribute("cccccc", "aaaaaaaaaaaaaaaaaabbbbbbbbbbnnnnnnnnnnnnn");
        }, 5e3);
        document.body.appendChild(MountElement(h(myclasscomponent, [ h("form", {
            id: "newsletterForm",
            class: "newsletter-form nodisable",
            name: "newsletter-form",
            action: "https://www.mozilla.org/en-US/newsletter/",
            method: "post"
        }, h("div", {
            class: "newsletter-head"
        }, h("h2", {
            class: "newsletter-teaser"
        }, "\u5b66\u4e60 Web \u5f00\u53d1\u7684\u6700\u4f73\u5b9e\u8df5"), h("p", {
            class: "newsletter-description"
        }, "\u8ba9 MDN \u5c06\u6700\u65b0\u3001\u6700\u68d2\u7684\u5185\u5bb9\u76f4\u63a5\u6295\u9012\u5230\u60a8\u7684\u90ae\u7bb1\u3002"), h("p", {
            class: "newsletter-lang"
        }, "\u76ee\u524d\u4ec5\u63d0\u4f9b\u82f1\u6587\u7248\u65b0\u95fb\u62a5\u3002")), h("div", {
            class: "newsletter-fields"
        }, h("input", {
            type: "hidden",
            id: "fmt",
            name: "fmt",
            value: "H"
        }), h("input", {
            type: "hidden",
            id: "newsletterNewslettersInput",
            name: "newsletters",
            value: "app-dev"
        }), h("div", {
            id: "newsletterErrors",
            class: "newsletter-errors"
        }), h("div", {
            id: "newsletterEmail",
            class: "form-group newsletter-group-email"
        }, h("label", {
            for: "newsletterEmailInput",
            class: "form-label offscreen"
        }, "\u7535\u5b50\u90ae\u4ef6\u5730\u5740"), h("input", {
            type: "email",
            id: "newsletterEmailInput",
            name: "email",
            class: "form-input newsletter-input-email",
            required: "",
            placeholder: "you@example.com",
            size: "30"
        })), h("div", {
            id: "newsletterPrivacy",
            class: "form-group form-group-agree newsletter-group-privacy hidden"
        }, h("input", {
            type: "checkbox",
            id: "newsletterPrivacyInput",
            name: "privacy",
            required: ""
        }), h("label", {
            for: "newsletterPrivacyInput"
        }, "\u6211\u63a5\u53d7 Mozilla \u6309\u7167", h("a", {
            href: "https://www.mozilla.org/privacy/"
        }, "\u9690\u79c1\u653f\u7b56"), "\u6240\u8ff0\u7684\u65b9\u5f0f\u5904\u7406\u6211\u7684\u4fe1\u606f\u3002")), h("div", {
            id: "newsletterSubmit",
            class: "newsletter-group-submit"
        }, h("button", {
            id: "newsletter-submit",
            type: "submit",
            class: "button neutral newsletter-submit"
        }, "\u7acb\u5373\u6ce8\u518c", h("svg", {
            class: "icon icon-arrow",
            xmlns: "http://www.w3.org/2000/svg",
            width: "23",
            height: "28",
            viewBox: "0 0 23 28",
            "aria-hidden": "true"
        }, h("path", {
            d: "M23 15a2.01 2.01 0 0 1-.578 1.422L12.25 26.594c-.375.359-.891.578-1.422.578s-1.031-.219-1.406-.578L8.25 25.422c-.375-.375-.594-.891-.594-1.422s.219-1.047.594-1.422L12.828 18h-11C.703 18 0 17.062 0 16v-2c0-1.062.703-2 1.828-2h11L8.25 7.406a1.96 1.96 0 0 1 0-2.812l1.172-1.172c.375-.375.875-.594 1.406-.594s1.047.219 1.422.594l10.172 10.172c.375.359.578.875.578 1.406z"
        })))))) ]), document.createElement("div")));
    })();
    setTimeout(() => {
        Object.values(Object.fromEntries(customElements)).map(c => render(h(c))).forEach(e => document.body.appendChild(e));
    }, 8e3);
    setTimeout(() => {
        Object.values(Object.fromEntries(customElements)).map(c => new c).forEach(e => document.body.appendChild(e));
    }, 8e3);
    const funstate = createstate(() => {});
    watch(funstate, fun => {
        console.log([ funstate, fun ]);
    });
    requestAnimationFrame(() => {
        setTimeout(() => {
            funstate.value = class extends HTMLElement {};
        }, 50);
    });
    console.dir(funstate);
    const com1 = createComponent$1(() => {
        return h("h1", null, "component 1");
    });
    const com2 = createComponent$1(() => {
        return h("h1", null, "component 2");
    });
    const com3 = createComponent$1(() => {
        return h("h1", null, "component 3");
    });
    const com4 = () => {
        return h("h1", null, "component 4");
    };
    const mystate = createstate(com1);
    const vdom$6 = Switchable(mystate);
    const element$1 = render(vdom$6);
    document.body.appendChild(element$1);
    setTimeout(() => {
        mystate.value = com2;
        setTimeout(() => {
            mystate.value = com3;
            setTimeout(() => {
                mystate.value = com4;
            }, 2e3);
        }, 2e3);
    }, 2e3);
    console.log([ vdom$6, mystate, com1, com2, com3, com4 ]);
    watch(mystate, state => {
        console.log([ state, element$1 ]);
    });
    document.body.appendChild(render(h(() => h("div", null, h("button", {
        $text: "component 1",
        onclick: () => {
            mystate.value = com1;
        }
    }), h("button", {
        $text: "component 2",
        onclick: () => {
            mystate.value = com2;
        }
    }), h("button", {
        $text: "component 3",
        onclick: () => {
            mystate.value = com3;
        }
    }), h("button", {
        $text: "component 4",
        onclick: () => {
            mystate.value = com4;
        }
    })))));
})();
//# sourceMappingURL=output-es2015.js.map
