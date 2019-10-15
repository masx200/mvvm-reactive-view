const {CustomEvent: CustomEvent, requestAnimationFrame: requestAnimationFrame, URL: URL, Blob: Blob, Element: Element, Node: Node, String: String, Array: Array, document: document, Object: Object, Reflect: Reflect, Proxy: Proxy, Symbol: Symbol, Boolean: Boolean, Promise: Promise, Set: Set, Math: Math, Error: Error, TypeError: TypeError, EventTarget: EventTarget, JSON: JSON, Map: Map, window: window, clearTimeout: clearTimeout, setTimeout: setTimeout, parseInt: parseInt, globalThis: globalThis, self: self, global: global} = Function("return this")();

function isprimitive(a) {
    return isstring(a) || isnumber(a) || isboolean(a) || isundefined(a) || typeof a === "bigint";
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
    return a instanceof Array && Array.isArray(a) && gettagtype(a) === "Array";
}

function gettagtype(a) {
    return {}.toString.call(a).replace("[object ", "").replace("]", "").trim();
}

function isSet(a) {
    return gettagtype(a) === "Set" && a instanceof Set;
}

const {HTMLElement: HTMLElement$1, customElements: customElements, Proxy: Proxy$1} = window;

if (!isfunction(HTMLElement$1) || !isfunction(Proxy$1) || !isobject(customElements)) {
    console.error("Proxy,HTMLElement ,customElements ,browser not supported !");
    throw new TypeError;
}

const hyphenateRE = /\B([A-Z])/g;

const hyphenate = str => {
    return str.replace(hyphenateRE, "-$1").toLowerCase();
};

const String$1 = window.String;

const Reflect$1 = window.Reflect;

const {get: get, set: set, ownKeys: ownKeys} = Reflect$1;

const valuestring = "value";

function isobject$1(a) {
    return typeof a === "object" && a !== null;
}

function isstring$1(a) {
    return typeof a === "string";
}

function isArray(a) {
    return Array.isArray(a);
}

function isSet$1(a) {
    return a instanceof Set;
}

const isinputcheckbox = ele => "input" === geteletagname(ele) && get(ele, "type") === "checkbox";

function objtostylestring(obj) {
    obj = JSON.parse(JSON.stringify(obj));
    obj = Object.fromEntries(Object.entries(obj).map(([key, value]) => [ hyphenate(key).trim(), value ]));
    return Object.entries(obj).map(([key, value]) => key + ":" + value).join(";");
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
    var temp = Object.create(null);
    const outputattrs = new Proxy(temp, {
        ownKeys() {
            const isinputtextortextareaflag = isinputtextortextarea(ele);
            const keys = attributesownkeys(ele);
            return Array.from(new Set([ ...keys, isinputcheckbox(ele) ? "checked" : undefined, isinputtextortextareaflag ? valuestring : undefined ].flat(Infinity).filter(a => !!a)));
        },
        get(target, key) {
            const isinputtextortextareaflag = isinputtextortextarea(ele);
            if (isinputcheckbox(ele) && key === "checked") {
                return get(ele, "checked");
            }
            if (isinputtextortextareaflag && key === valuestring) {
                return get(ele, valuestring);
            } else {
                const v = getattribute(ele, String$1(key));
                if (v === "") {
                    return true;
                }
                if (v === null) {
                    return;
                }
                if (isstring$1(v)) {
                    try {
                        return JSON.parse(String$1(v));
                    } catch (error) {
                        return v;
                    }
                } else return;
            }
        },
        set(t, key, v) {
            const isinputtextortextareaflag = isinputtextortextarea(ele);
            if ("function" === typeof v) {
                console.error(v);
                console.error("Setting properties as functions is not allowed");
                throw TypeError();
            }
            if (geteletagname(ele) === "input" && key === "checked") {
                set(ele, key, v);
                return true;
            }
            if (isinputtextortextareaflag && key === valuestring) {
                return set(ele, valuestring, String$1(v));
            } else if (key === "style") {
                const csstext = isstring$1(v) ? v : isobject$1(v) ? objtostylestring(v) : String$1(v);
                set(get(ele, "style"), "cssText", csstext.trim());
                return true;
            } else if (key === "class" && isobject$1(v)) {
                const classtext = isArray(v) ? v.join(" ") : isSet$1(v) ? [ ...v ].join(" ") : String$1(v);
                setattribute(ele, String$1(key), classtext);
            } else {
                if (isSet$1(v)) {
                    setattribute(ele, String$1(key), JSON.stringify([ ...v ]));
                } else {
                    if (v === true) {
                        v = "";
                    }
                    setattribute(ele, String$1(key), isobject$1(v) ? JSON.stringify(v) : String$1(v));
                    return true;
                }
            }
            return true;
        },
        deleteProperty(t, k) {
            removeAttribute(ele, String$1(k));
            return true;
        },
        has(target, key) {
            return ownKeys(outputattrs).includes(key);
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
                return {
                    value: myvalue,
                    ...otherdescipter
                };
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

const document$1 = window.document;

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
    return document$1.createTextNode(String(data));
}

const svgnamespace = "http://www.w3.org/2000/svg";

function changetext(textnode, value) {
    textnode.nodeValue = String(value);
}

const mathnamespace = "http://www.w3.org/1998/Math/MathML";

function createmathelement() {
    return createElementNS(mathnamespace, "math");
}

function domaddlisten(ele, event, call) {
    ele.addEventListener(event, call);
}

function domremovelisten(ele, event, call) {
    ele.removeEventListener(event, call);
}

function getdomchildren(ele) {
    return Array.from(ele.childNodes);
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

const Reflect$2 = window.Reflect;

const {apply: apply, construct: construct, defineProperty: defineProperty, deleteProperty: deleteProperty, get: get$1, getOwnPropertyDescriptor: getOwnPropertyDescriptor, getPrototypeOf: getPrototypeOf, has: has, ownKeys: ownKeys$1, set: set$1} = Reflect$2;

const attributeChangedCallback = "attributeChangedCallback";

class AttrChange extends HTMLElement {
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

var n = function(t, r, u, e) {
    for (var p = 1; p < r.length; p++) {
        var s = r[p], h = "number" == typeof s ? u[s] : s, a = r[++p];
        1 === a ? e[0] = h : 3 === a ? e[1] = Object.assign(e[1] || {}, h) : 5 === a ? (e[1] = e[1] || {})[r[++p]] = h : 6 === a ? e[1][r[++p]] += h + "" : e.push(a ? t.apply(null, n(t, h, u, [ "", null ])) : h);
    }
    return e;
}, t = function(n) {
    for (var t, r, u = 1, e = "", p = "", s = [ 0 ], h = function(n) {
        1 === u && (n || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? s.push(n || e, 0) : 3 === u && (n || e) ? (s.push(n || e, 1), 
        u = 2) : 2 === u && "..." === e && n ? s.push(n, 3) : 2 === u && e && !n ? s.push(!0, 5, e) : u >= 5 && ((e || !n && 5 === u) && (s.push(e, u, r), 
        u = 6), n && (s.push(n, u, r), u = 6)), e = "";
    }, a = 0; a < n.length; a++) {
        a && (1 === u && h(), h(a));
        for (var f = 0; f < n[a].length; f++) t = n[a][f], 1 === u ? "<" === t ? (h(), s = [ s ], 
        u = 3) : e += t : 4 === u ? "--" === e && ">" === t ? (u = 1, e = "") : e = t + e[0] : p ? t === p ? p = "" : e += t : '"' === t || "'" === t ? p = t : ">" === t ? (h(), 
        u = 1) : u && ("=" === t ? (u = 5, r = e, e = "") : "/" === t && (u < 5 || ">" === n[a][f + 1]) ? (h(), 
        3 === u && (s = s[0]), u = s, (s = s[0]).push(u, 2), u = 0) : " " === t || "\t" === t || "\n" === t || "\r" === t ? (h(), 
        u = 2) : e += t), 3 === u && "!--" === e && (u = 4, s = s[0]);
    }
    return h(), s;
}, r = "function" == typeof Map, u = r ? new Map : {}, e = r ? function(n) {
    var r = u.get(n);
    return r || u.set(n, r = t(n)), r;
} : function(n) {
    for (var r = "", e = 0; e < n.length; e++) r += n[e].length + "-" + n[e];
    return u[r] || (u[r] = t(n));
};

function htm(t) {
    var r = n(this, e(t), arguments, []);
    return r.length > 1 ? r : r[0];
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

var _a, _b, _c;

const addonelistner = Symbol("addonelistner");

const removeonelistner = Symbol("removeonelistner");

const callbackmap = Symbol("callbackmap");

const cancelsubscribe = Symbol("cancelsubscribe");

const debouncedispatch = Symbol("debouncedispatch");

const invalid_primitive_or_object_state = "invalid primitive or object state";

function isReactiveState(a) {
    return a instanceof ReactiveState && gettagtype(a) === "ReactiveState";
}

const eventtargetsymbol = Symbol("eventtatget");

const memlisteners = Symbol("memlisteners");

const dispatchsymbol = Symbol("dispatch");

const subscribesymbol = Symbol("subscribe");

const removeallistenerssymbol = Symbol("removeallisteners");

const addallistenerssymbol = Symbol("addallisteners");

class ReactiveState {
    constructor(init) {
        this[_a] = new Map;
        this[Symbol.toStringTag] = "ReactiveState";
        this[_b] = new EventTarget;
        this[_c] = new Set;
        this.valueOf = () => {
            return this.value;
        };
        if (isprimitive(init) || isobject(init)) {
            this.value = init;
            Object.defineProperty(this, "value", {
                value: init,
                configurable: true,
                writable: true
            });
        } else {
            console.error(init);
            console.error(invalid_primitive_or_object_state);
            throw TypeError();
        }
        const debouncedfun = debounce_1(eventname => {
            const name = eventname ? String(eventname) : "value";
            this[eventtargetsymbol].dispatchEvent(new CustomEvent("value", {
                detail: name
            }));
        });
        this[debouncedispatch] = eventname => {
            debouncedfun(eventname);
        };
    }
    [(_a = callbackmap, removeallistenerssymbol)]() {
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
        return isprimitive(value) ? String(value) : isSet(value) ? JSON.stringify([ ...value ]) : isobject(value) ? JSON.stringify(value) : "";
    }
    [(_b = eventtargetsymbol, _c = memlisteners, dispatchsymbol)](eventname) {
        this[debouncedispatch](eventname);
    }
    [subscribesymbol](callback) {
        let eventlistener;
        const possiblecallback = this[callbackmap].get(callback);
        if (possiblecallback) {
            eventlistener = possiblecallback;
        } else {
            eventlistener = () => callback(this.valueOf());
            this[callbackmap].set(callback, eventlistener);
        }
        this[memlisteners].add(eventlistener);
    }
    [cancelsubscribe](callback) {
        const eventlistener = this[callbackmap].get(callback);
        if (!eventlistener) {
            throw new Error;
        }
        this[memlisteners].delete(eventlistener);
        this[removeonelistner](eventlistener);
    }
    [Symbol.toPrimitive]() {
        const value = this.valueOf();
        return isprimitive(value) ? value : isobject(value) ? JSON.stringify(value) : void 0;
    }
}

function isVirtualdom(a) {
    return isobject(a) && get$1(a, isvirtualelement) === isvirtualelement;
}

const isvirtualelement = Symbol("isvirtualelement");

function createVirtualElement(type, props = {}, children = []) {
    props = Object.assign({}, props);
    children = children.flat(1 / 0);
    const \u5b57\u6bcd\u5927\u5c0f\u5199 = /[A-Za-z\u4e00-\u9fa5]/;
    const propsentries = Object.entries(props);
    const propsentriesNOTevents = propsentries.filter(([key]) => !(key.startsWith("@") || key.startsWith("on")));
    const \u5b57\u6bcd\u5f00\u5934\u7684entries = propsentriesNOTevents.filter(([key]) => \u5b57\u6bcd\u5927\u5c0f\u5199.test(key[0]));
    const thisarg = Object.create(null);
    [ "onevent", "element", "type", "props", "children", "directives", "bindattr" ].forEach(key => {
        defineProperty(thisarg, key, {
            writable: true
        });
    });
    Object.assign(thisarg, {
        type: type,
        bindattr: Object.fromEntries(\u5b57\u6bcd\u5f00\u5934\u7684entries.filter(e => isReactiveState(e[1]))),
        props: Object.fromEntries(\u5b57\u6bcd\u5f00\u5934\u7684entries.filter(e => !isReactiveState(e[1]))),
        children: children,
        onevent: Object.fromEntries(merge_entries([ ...propsentries.filter(([key]) => /\@/.test(key[0])).map(([key, value]) => [ key.slice(1).toLowerCase().trim(), [ value ].flat(1 / 0) ]), ...propsentries.filter(([key]) => key.startsWith("on")).map(([key, value]) => [ key.slice(2).toLowerCase().trim(), [ value ].flat(1 / 0) ]) ])),
        directives: Object.fromEntries(propsentriesNOTevents.filter(([key]) => key[0] === "*" || key[0] === "_").map(([key, value]) => [ key.slice(1).toLowerCase().trim(), value ]))
    });
    defineProperty(thisarg, Symbol.toStringTag, {
        value: "VirtualElement"
    });
    defineProperty(thisarg, isvirtualelement, {
        value: isvirtualelement
    });
    return thisarg;
}

function createElement(type, propsorchildren, ...children) {
    if (isarray(propsorchildren)) {
        return apply(createElement$1, undefined, [ type, undefined, [ ...propsorchildren, ...children ].flat(1 / 0) ]);
    } else {
        return apply(createElement$1, undefined, arguments);
    }
}

function createElement$1(type, props = {}, ...children) {
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

function html(...inargs) {
    return apply(htm, createElement, inargs);
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

function html$1(...args) {
    const vdom = html(...args);
    if (isvalidvdom(vdom)) {
        return vdom;
    } else {
        console.error(vdom);
        console.error(invalid_Virtualdom);
        throw new TypeError;
    }
}

function toArray(a) {
    return (isarray(a) ? a : [ a ]).flat(1 / 0).filter(a => !isundefined(a));
}

function mount(ele, container, clear = true) {
    if (clear) {
        seteletext(container, "");
    }
    const eles = toArray(ele).flat(Infinity);
    eles.forEach(e => appendchild(container, e));
    return container;
}

const invalid_custom_element_class = "invalid custom element class !";

if (!isobject(window.customElements)) {
    console.error(" customElements  not supported !");
    throw new TypeError;
}

function Usevaluetoquerythekeyfromthetable(table, Componentstatusname) {
    const outputentrie = Object.entries(table).find(v => {
        return v[1] === Componentstatusname;
    });
    return outputentrie ? outputentrie[0] : undefined;
}

window.CustomElementRegistry = get$1(getPrototypeOf(window.customElements), "constructor");

const elementset = Symbol.for("elementset");

const elementmap = Symbol.for("elementmap");

const {CustomElementRegistry: CustomElementRegistry} = window;

const customElements$1 = window.customElements;

if (!has(customElements$1, elementset)) {
    set$1(customElements$1, elementset, new Set);
}

if (!has(customElements$1, elementmap)) {
    set$1(customElements$1, elementmap, {});
}

var RandomDefineCustomElement = (initclass, extendsname) => RandomDefineCustomElement$1(initclass, extendsname);

function RandomDefineCustomElement$1(initclass, extendsname, length = 1) {
    if (!isclassextendsHTMLElement(initclass)) {
        console.error(initclass);
        console.error(invalid_custom_element_class);
        throw TypeError();
    }
    if (!get$1(customElements$1, elementset).has(initclass)) {
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
        return Usevaluetoquerythekeyfromthetable(get$1(customElements$1, elementmap), initclass);
    }
}

customElements$1.define = function(name, constructor, options) {
    if (!isclassextendsHTMLElement(constructor)) {
        console.error(constructor);
        console.error(invalid_custom_element_class);
        throw TypeError();
    }
    if (!get$1(customElements$1, elementset).has(constructor)) {
        if (has(customElements$1[elementmap], name)) {
            RandomDefineCustomElement$1(constructor, options ? options.extends : undefined);
        } else {
            CustomElementRegistry.prototype.define.call(customElements$1, name, constructor, options);
            customElements$1[elementset].add(constructor);
            customElements$1[elementmap][name] = constructor;
        }
    }
};

set$1(customElements$1, Symbol.iterator, () => {
    const entries = Object.entries(customElements$1[elementmap]);
    return entries[Symbol.iterator].call(entries);
});

const charactorlist = Array(26).fill(undefined).map((v, i) => 97 + i).map(n => String.fromCharCode(n));

const hexnumberlist = Array(16).fill(undefined).map((v, i) => i).map(a => a.toString(16));

const charactorandnumberlist = [ ...new Set([ ...hexnumberlist, ...charactorlist ]) ];

function getrandomcharactor() {
    return get$1(charactorlist, Math.floor(Math.random() * charactorlist.length));
}

function getrandomhexnumberandcharactor() {
    return get$1(charactorandnumberlist, Math.floor(Math.random() * charactorandnumberlist.length));
}

function getrandomstringandnumber(length = 1) {
    return Array(length).fill(undefined).map(() => getrandomcharactor()).join("") + "-" + Array(length).fill(undefined).map(() => getrandomhexnumberandcharactor()).join("");
}

function isclassextendsHTMLElement(initclass) {
    return !!(isfunction(initclass) && initclass.prototype && initclass.prototype instanceof HTMLElement);
}

function createcostumelemet(initclass, propsjson, children) {
    if (isclassextendsHTMLElement(initclass)) {
        RandomDefineCustomElement(initclass);
        return construct(initclass, [ propsjson, children ]);
    } else {
        console.error(initclass);
        console.error(invalid_custom_element_class);
        throw TypeError();
    }
}

function isconnected(element) {
    return document.documentElement === getancestornode(element);
}

function getancestornode(node) {
    while (node && node.parentNode && node.parentNode !== document) {
        node = node.parentNode;
    }
    return node;
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

let MountedSet = new Set;

let UnMountedSet = new Set;

let StateSet = new Set;

function getstates() {
    return [ ...StateSet ];
}

function usestste(state) {
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
    MountedSet = new Set;
}

function clearstate() {
    StateSet = new Set;
}

function clearUnMounted() {
    UnMountedSet = new Set;
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

function watch(state, callback) {
    if (isarray(state) || isReactiveState(state)) {
        const statearray = toArray(state);
        if (!statearray.length) {
            console.error("Empty array not allowed");
            throw new Error;
        }
        const debouncedcallback = debounce_1(callback);
        const stateandlisteners = statearray.map(state1 => {
            const listener = () => {
                debouncedcallback(...statearray.map(r => r.valueOf()));
            };
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

function extenddirectives(options = {}) {
    Object.entries(options).forEach(([key, value]) => {
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

const {requestAnimationFrame: requestAnimationFrame$1} = window;

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
                    seteletext(ele, String(state));
                }
            });
            requestAnimationFrame$1(() => {
                seteletext(ele, String(text));
            });
        } else {
            console.error(text);
            console.error("invalid " + errorname);
            throw TypeError();
        }
    };
}

const componentsymbol = Symbol("component");

function iscomponent(a) {
    return isfunction(a) && get$1(a, componentsymbol) === componentsymbol;
}

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

const bindstatesymbol = Symbol("bindstate");

const virtualdomsymbol = Symbol("virtualelement");

function throwinvalideletype(type) {
    console.error(type);
    console.error("invalid element type!");
    throw TypeError();
}

function render(vdom, namespace) {
    if (isarray(vdom)) {
        return vdom.map(a => render(a)).flat(1 / 0);
    }
    if (isnumber(vdom) || isstring(vdom)) {
        const textnode = createtextnode(vdom);
        set$1(textnode, virtualdomsymbol, vdom);
        return textnode;
    } else if (isReactiveState(vdom)) {
        const reactive = vdom;
        const textnode = createtextnode(String(reactive));
        set$1(textnode, virtualdomsymbol, vdom);
        watch(reactive, () => {
            const state = reactive;
            if (isconnected(element)) {
                changetext(textnode, String(state));
            }
        });
        const element = textnode;
        set$1(element, bindstatesymbol, new Set);
        get$1(element, bindstatesymbol).add(reactive);
        return textnode;
    } else if (isVirtualdom(vdom)) {
        const {type: type} = vdom;
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
                mount(render(vdom.children), fragmentnode);
                return fragmentnode;
            } else {
                element = namespace ? createElementNS(namespace, type) : createnativeelement(type);
            }
        } else if (typeof type == "function") {
            if (isobject(type["defaultProps"])) {
                vdom.props = JSON.parse(JSON.stringify({
                    ...type["defaultProps"],
                    ...vdom.props
                }));
            }
            const propsjson = JSON.parse(JSON.stringify({
                ...vdom.props,
                ...Object.fromEntries(Object.entries(vdom.bindattr).map(([key, value]) => {
                    return [ key, value.value ];
                }))
            }));
            element = createcostumelemet(type, propsjson, vdom.children);
        } else {
            throwinvalideletype(vdom);
        }
        if (type && (isfunction(type) || isstring(type))) {
            if (!iscomponent(type)) {
                if (element) {
                    mount(vdom.children.map(e => {
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

function handleprops(element, vdom) {
    ((element, vdom) => {
        Object.entries(vdom.directives).forEach(([name, value]) => {
            if (isfunction(directive[name])) {
                directive[name](value, element, vdom);
            } else {
                console.error(vdom.directives);
                console.error("invalid directives " + name);
                throw new Error;
            }
        });
        const attribute1 = createeleattragentreadwrite(element);
        Object.assign(attribute1, vdom.props);
        set$1(element, virtualdomsymbol, vdom);
        vdom.element = element;
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
            set$1(element, bindstatesymbol, new Set);
        }
        get$1(element, bindstatesymbol).add(e);
    });
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
        mount(render(elesarray), container);
    } else if (isNode(vdom) || isNodeArray(vdom)) {
        mount(elesarray, container);
    } else {
        console.error(vdom);
        console.error(invalid_Virtualdom);
        throw TypeError();
    }
    return container;
}

function isNodeArray(arr) {
    return !!(isarray(arr) && arr.length && arr.every(a => isNode(a)));
}

function isNode(a) {
    return a instanceof Node;
}

const Setprototype = Set.prototype;

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

function isMap(a) {
    return a instanceof Map;
}

function isSet$2(a) {
    return a instanceof Set;
}

function isArray$1(a) {
    return Array.isArray(a);
}

const Reflect$3 = window.Reflect;

const {ownKeys: ownKeys$2, deleteProperty: deleteProperty$1, apply: apply$1, construct: construct$1, defineProperty: defineProperty$1, get: get$2, getOwnPropertyDescriptor: getOwnPropertyDescriptor$1, getPrototypeOf: getPrototypeOf$1, has: has$1, set: set$2, setPrototypeOf: setPrototypeOf} = Reflect$3;

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
            fakeobj = new Set([ ...target ]);
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
        } else if (isMap(target)) {
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
        if (!isSet$2(target) && !isMap(target)) {
            setPrototypeOf(fakeobj, null);
        }
        return new Proxy(fakeobj, {
            defineProperty(t, p, a) {
                callback(ancestor, [ ...patharray, String(p) ], has$1(a, "value") ? a.value : isfunction$1(a.get) ? a.get() : undefined, get$2(target, p));
                return defineProperty$1(target, p, a);
            },
            deleteProperty(t, p) {
                callback(ancestor, [ ...patharray, String(p) ], undefined, get$2(target, p));
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
                    callback(ancestor, [ ...patharray, String(k) ], v, get$2(target, k));
                }
                return set$2(target, k, v);
            },
            get(t, k) {
                var value = get$2(target, k);
                if (isfunction$1(value) && (isSet$2(target) || isMap(target))) {
                    return get$2(fakeobj, k).bind(fakeobj);
                }
                if (isfunction$1(value) || isobject$2(value)) {
                    return deepobserveaddpath(value, callback, [ ...patharray, String(k) ], target);
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
    let initobj = init;
    const containReactiveState = isplainobject(init) && Object.values(init).some(a => isReactiveState(a));
    const state_entries = Object.entries(init).filter(e => {
        const a = e[1];
        return isReactiveState(a);
    });
    if (containReactiveState) {
        initobj = {
            ...init
        };
        state_entries.forEach(([key, state]) => {
            defineProperty(initobj, key, {
                enumerable: true,
                get() {
                    return state.valueOf();
                },
                configurable: true
            });
        });
    }
    const reactive = new ReactiveState(initobj);
    if (containReactiveState) {
        state_entries.forEach(([key, state]) => {
            watch(state, () => {
                reactive[dispatchsymbol](String(key));
            });
        });
    }
    const objproxyhandler = {};
    objproxyhandler.ownKeys = target => {
        return Array.from(new Set([ ...ownKeys$1(target), ...ownKeys$1(get$1(target, "value")) ]));
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
            target[dispatchsymbol](String(key));
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
        if (key === "value" && (isarray(value) || isplainobject(value))) {
            return observedeepagent(get$1(target, key), (_target_, patharray) => {
                target[dispatchsymbol](patharray[0]);
            });
        } else if (has(target, key)) {
            return get$1(target, key);
        } else if (has(value, key)) {
            if (isSet(value) && (key === "add" || key === "clear" || key === "delete")) {
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
            } else if (isobject(value)) {
                return observedeepagent(get$1(value, key), () => {
                    target[dispatchsymbol](String(key));
                });
            } else {
                return get$1(value, key);
            }
        }
    };
    objproxyhandler.set = (target, key, value) => {
        if (isReactiveState(value)) {
            value = value.valueOf();
        }
        const myvalue = get$1(target, "value");
        if (key === "value" && isobject(value)) {
            set$1(target, key, value);
            target[dispatchsymbol]();
        } else if (!has(target, key)) {
            set$1(myvalue, key, value);
            target[dispatchsymbol](String(key));
        }
        return true;
    };
    return new Proxy(reactive, objproxyhandler);
}

const set_prototype = Set.prototype;

function createstate(init) {
    const state = createstate$1(init);
    usestste(state);
    return state;
}

function createstate$1(init) {
    if (!(isprimitive(init) || isobject(init) || isReactiveState(init))) {
        console.error(init);
        console.error(invalid_primitive_or_object_state);
        throw TypeError();
    }
    if (isprimitive(init)) {
        return getproperyreadproxy(new Proxy(new ReactiveState(init), {
            defineProperty() {
                return false;
            },
            deleteProperty() {
                return false;
            },
            set(target, key, value) {
                if (key === "value" && isprimitive(value)) {
                    if (target[key] !== value) {
                        set$1(target, key, value);
                        target[dispatchsymbol]();
                    }
                    return true;
                } else {
                    return false;
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

function createcssBlob(source) {
    return URL.createObjectURL(new Blob([ source ], {
        type: "text/css"
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

function parsecsstext(text) {
    const styleelement = render(createElement("style", [ text ]));
    const otherdocument = createanotherhtmldocument();
    appendchild(otherdocument.documentElement, styleelement);
    return Array.from(get$1(get$1(styleelement, "sheet"), "cssRules"));
}

function selectoraddprefix(cssstylerule, prefix) {
    const selectorText = cssstylerule.selectorText;
    const selectorarray = selectorText.split(",");
    cssstylerule.selectorText = selectorarray.map(selectorText => {
        let prefixselector = prefix + " " + selectorText;
        if (selectorText.startsWith("*")) {
            prefixselector = prefixselector + "," + selectorText.replace("*", prefix);
        }
        return prefixselector;
    }).join(",");
    return cssstylerule;
}

function prefixcssrules(cssRulesarray, prefix) {
    return cssRulesarray.map(cssrule => {
        if (isCSSStyleRule(cssrule)) {
            return selectoraddprefix(cssrule, prefix);
        } else if (isCSSMediaRule(cssrule)) {
            prefixcssrules(Array.from(cssrule.cssRules), prefix);
            return cssrule;
        } else if (isCSSImportRule(cssrule)) {
            savestyleblob(prefix, undefined, cssrule.href);
            return;
        } else {
            return cssrule;
        }
    }).filter(Boolean);
}

const componentsstylesheet = {};

function savestyleblob(tagname, csstext, urltext) {
    tagname = tagname.toLowerCase();
    if (!componentsstylesheet[tagname]) {
        componentsstylesheet[tagname] = new Set;
    }
    if (csstext) {
        componentsstylesheet[tagname].add(createcssBlob(csstext));
    } else if (urltext) {
        componentsstylesheet[tagname].add(urltext);
    }
}

function cssrulestocsstext(cssrules) {
    return cssrules.map(c => c.cssText).join("\n");
}

function createlinkstylesheet(url) {
    return render(createElement("link", {
        href: url,
        rel: "stylesheet"
    }));
}

function transformcsstext(text, prefix) {
    const css = text;
    const cssomold = parsecsstext(css);
    const cssomnew = prefixcssrules(cssomold, prefix).filter(Boolean);
    const cssnewtext = cssrulestocsstext(cssomnew);
    return cssnewtext;
}

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

async function waitloadallstyle(prefix, _this) {
    await Promise.all([ ...componentsstylesheet[prefix] ].map(styleurl => loadlinkstyle(createlinkstylesheet(styleurl), _this)));
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

const readysymbol = Symbol("readystate");

function setimmediate(fun) {
    return Promise.resolve().then(() => fun());
}

const innerwatchrecords = Symbol("innerwatchrecord");

const innerstatesymbol = Symbol("innerstate");

const attributessymbol = Symbol("attributes");

const elementsymbol = Symbol("innerelement");

const vdomsymbol = Symbol("innervdom");

const mountedsymbol = Symbol("mounted");

const unmountedsymbol = Symbol("unmounted");

function createComponent(custfun) {
    var _a, _b, _c;
    if (isfunction(custfun)) {
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
                    if (!componentsstylesheet[prefix]) {
                        registercssprefix(css, prefix);
                    }
                }
                const defaultProps = get$1(this.constructor, "defaultProps");
                const attrs = createeleattragentreadwrite(this);
                if (isobject(defaultProps)) {
                    Object.assign(attrs, defaultProps);
                }
                if (isobject(propsjson)) {
                    Object.assign(attrs, propsjson);
                }
                const props = attrs;
                openctx();
                const thisattributess = Object.fromEntries(Object.entries(props).map(([key, value]) => [ key, createstate(value) ]));
                this[attributessymbol] = thisattributess;
                const readonlyprop = readonlyproxy(Object.fromEntries(Object.entries(thisattributess).map(([key, value]) => [ key, readonlyproxy(value) ])));
                let possiblyvirtualdom;
                try {
                    possiblyvirtualdom = apply(custfun, undefined, [ readonlyprop, children.flat(1 / 0) ]);
                } catch (error) {
                    closectx();
                    console.error(error);
                    throw error;
                }
                if (isarray(possiblyvirtualdom)) {
                    possiblyvirtualdom = possiblyvirtualdom.flat(Infinity).filter(Boolean);
                }
                if (isvalidvdom(possiblyvirtualdom)) {
                    const thisvdomsymbol = toArray(possiblyvirtualdom);
                    this[vdomsymbol] = thisvdomsymbol.flat(Infinity).filter(Boolean);
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
            async connectedCallback() {
                if (!this[elementsymbol]) {
                    this[elementsymbol] = render(this[vdomsymbol]).flat(Infinity);
                }
                if (!this[readysymbol]) {
                    this[readysymbol] = true;
                    const css = get$1(this.constructor, "css");
                    const prefix = this.tagName.toLowerCase();
                    if (css && componentsstylesheet[prefix]) {
                        seteletext(this, "");
                        waitloadallstyle(prefix, this).then(() => {
                            mount(this[elementsymbol], this, false);
                        });
                    } else {
                        mount(this[elementsymbol], this);
                    }
                }
                this[mountedsymbol].forEach(f => {
                    setimmediate(f);
                });
                onmounted(this);
            }
            async disconnectedCallback() {
                this[unmountedsymbol].forEach(f => {
                    setimmediate(f);
                });
                onunmounted(this);
            }
            [(_a = attributessymbol, _b = componentsymbol, _c = readysymbol, attributeChangedCallback)](name) {
                const propreactivestate = this[attributessymbol][name];
                const attributes = createeleattragentreadwrite(this);
                if (propreactivestate) {
                    propreactivestate["value"] = attributes[name];
                }
            }
        }
        Component[_b] = componentsymbol;
        Component.css = isstring(css) && css ? css : undefined;
        Component.defaultProps = isobject(defaultProps) ? JSON.parse(JSON.stringify(defaultProps)) : undefined;
        return Component;
    } else {
        console.error(custfun);
        console.error(invalid_Function);
        throw TypeError();
    }
}

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
                const eventlistener = state[callbackmap].get(callback);
                if (!eventlistener) {
                    throw new Error;
                }
                state[addonelistner](eventlistener);
            });
        }
        onmounted(getdomchildren(ele));
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
                const eventlistener = state[callbackmap].get(callback);
                if (!eventlistener) {
                    throw new Error;
                }
                state[removeonelistner](eventlistener);
            });
        }
        onunmounted(getdomchildren(ele));
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
    var _a, _b;
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
    class Condition extends AttrChange {
        constructor() {
            super();
            this[_b] = false;
            const optionstrue = get$1(options, "true");
            const optionsfalse = get$1(options, "false");
            this[truevdomsymbol] = [ optionstrue ].flat(1 / 0).filter(Boolean);
            this[falsevdomsymbol] = [ optionsfalse ].flat(1 / 0).filter(Boolean);
        }
        [(_a = componentsymbol, _b = readysymbol, handlefalse)]() {
            setelehtml(this, "");
            if (this[falsevdomsymbol]) {
                if (!this[falseelesymbol]) {
                    this[falseelesymbol] = render(this[falsevdomsymbol]);
                }
                const elementtomount = this[falseelesymbol];
                mount(elementtomount, this);
                elementtomount.forEach(e => onmounted(e));
                if (this[trueelesymbol]) {
                    this[trueelesymbol].forEach(e => onunmounted(e));
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
                mount(elementtomount, this);
                elementtomount.forEach(e => onmounted(e));
                if (this[falseelesymbol]) {
                    this[falseelesymbol].forEach(e => onunmounted(e));
                }
            }
        }
        async connectedCallback() {
            if (!this[readysymbol]) {
                this[readysymbol] = true;
                const attrs = createeleattragentreadwrite(this);
                if (true === attrs["value"]) {
                    get$1(this, handletrue).call(this);
                }
                if (false === attrs["value"]) {
                    get$1(this, handlefalse).call(this);
                }
            }
            onmounted(this);
        }
        async disconnectedCallback() {
            onunmounted(this);
        }
        [attributeChangedCallback](name) {
            if (this[readysymbol]) {
                if (name === "value") {
                    const attrs = createeleattragentreadwrite(this);
                    if (true === attrs["value"]) {
                        this[handletrue]();
                    }
                    if (false === attrs["value"]) {
                        this[handlefalse]();
                    }
                }
            }
        }
    }
    Condition[_a] = componentsymbol;
    const vdom = createElement(Condition, {
        value: conditon
    });
    return vdom;
}

function computed(state, callback) {
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
    const state1 = Arraycomputed(state1array, callback);
    usestste(state1);
    return state1;
}

function Arraycomputed(state, callback) {
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
    return readonlyproxy(getproperyreadproxy(reactivestate));
}

const __proto__ = "__proto__";

function getproperyreadproxy(a) {
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
            return Array.from(new Set([ ...ownKeys$1(target), ...ownKeys$1(myvalueobj) ]));
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
                const myvalueobj = isobject(myvalue) ? myvalue : Object(myvalue);
                if (has(myvalueobj, key)) {
                    const property = get$1(myvalueobj, key);
                    return isfunction(property) ? property.bind(myvalueobj) : property;
                }
            }
        }
    });
}

function createRef(value) {
    return {
        value: value
    };
}

const listlengthsymbol = Symbol("listlength");

const listinnervdom = Symbol("listinnervdom");

const listinnerelement = Symbol("listinnerelement");

function listmap(list, mapfun) {
    var _a, _b;
    const itemclass = createComponent(props => {
        const myprops = props;
        const value = myprops.value;
        const index = myprops.index.valueOf();
        return mapfun(value, index);
    });
    const ITEMfactory = (value, index) => createElement(itemclass, {
        value: value,
        index: index
    });
    class ListMap extends AttrChange {
        constructor() {
            super(...arguments);
            this[_b] = false;
        }
        [(_a = componentsymbol, _b = readysymbol, attributeChangedCallback)](name) {
            if (this[readysymbol]) {
                if (name === "value") {
                    const attrs = createeleattragentreadwrite(this);
                    const value = attrs["value"];
                    if (!isarray(value)) {
                        console.log(value);
                        throw new TypeError;
                    }
                    this[listlengthsymbol] = value.length;
                }
            }
        }
        async disconnectedCallback() {
            onunmounted(this);
        }
        async connectedCallback() {
            if (!this[readysymbol]) {
                this[readysymbol] = true;
                const attrs = createeleattragentreadwrite(this);
                const value = attrs["value"];
                if (!isarray(value)) {
                    console.log(value);
                    throw new TypeError;
                }
                this[listinnervdom] = value.map((v, i) => ITEMfactory(computed(value, v => v[i]), i));
                this[listinnerelement] = render(this[listinnervdom]);
                mount(this[listinnerelement], this);
                this[listlengthsymbol] = value.length;
            }
            onmounted(this);
        }
    }
    ListMap[_a] = componentsymbol;
    return createElement(ListMap, {
        value: list
    });
}

extenddirectives({
    value(value, element, vdom) {
        model([ "input", "textarea", "select" ], "value", "value", [ "change", "input" ], value, vdom);
    },
    checked(value, element, vdom) {
        model([ "input" ], "checked", "checked", [ "change", "input" ], value, vdom);
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
            set$1(vdom.onevent, eventname, [ ...eventsarray, e => {
                return value.value = get$1(e.target, domprop);
            } ].filter(Boolean));
        });
    } else {
        console.error(vdom);
        console.error(invalid_ReactiveState + invalid_Virtualdom);
        throw TypeError();
    }
}

export { MountElement, computed, conditon as condition, createComponent, createElement, createRef, createstate as createState, extenddirectives as extendDirectives, createElement as h, html$1 as html, listmap, render, useMounted, useUnMounted, watch };
//# sourceMappingURL=index.js.map
