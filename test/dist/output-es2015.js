(function() {
    "use strict";
    function flattenDeep(arr1) {
        return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
    }
    function arrayflat() {
        var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        if (depth <= 1) {
            return this.reduce((acc, val) => acc.concat(val), []);
        } else {
            return flattenDeep(this);
        }
    }
    if (typeof Array.prototype.flat !== "function") {
        Array.prototype.flat = arrayflat;
    }
    function fromPairs(pairs) {
        var index = -1, length = pairs == null ? 0 : pairs.length, result = {};
        while (++index < length) {
            var pair = pairs[index];
            result[pair[0]] = pair[1];
        }
        return result;
    }
    var fromPairs_1 = fromPairs;
    if ("function" !== typeof Object.fromEntries) {
        Object.fromEntries = fromPairs_1;
    }
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
            var info = gen[key](arg);
            var value = info.value;
        } catch (error) {
            reject(error);
            return;
        }
        if (info.done) {
            resolve(value);
        } else {
            Promise.resolve(value).then(_next, _throw);
        }
    }
    function _asyncToGenerator(fn) {
        return function() {
            var self = this, args = arguments;
            return new Promise((function(resolve, reject) {
                var gen = fn.apply(self, args);
                function _next(value) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                }
                function _throw(err) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                }
                _next(undefined);
            }));
        };
    }
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
    var {CustomEvent: CustomEvent, requestAnimationFrame: requestAnimationFrame$1, URL: URL, Blob: Blob, Element: Element, Node: Node, String: String$1, Array: Array$1, document: document$1, Object: Object$1, Reflect: Reflect, Proxy: Proxy, Symbol: Symbol, Boolean: Boolean, Promise: Promise$1, Set: Set$1, Math: Math$1, Error: Error, TypeError: TypeError, EventTarget: EventTarget, JSON: JSON, Map: Map, window: window$1, clearTimeout: clearTimeout, setTimeout: setTimeout$1, parseInt: parseInt, globalThis: globalThis, self: self, global: global} = Function("return this")();
    function isprimitive(a) {
        return isstring(a) || isnumber(a) || isboolean(a) || isundefined(a) || typeof a === "bigint";
    }
    var Reflect$1 = window$1.Reflect;
    var {apply: apply, construct: construct, defineProperty: defineProperty, deleteProperty: deleteProperty, get: get, getOwnPropertyDescriptor: getOwnPropertyDescriptor, getPrototypeOf: getPrototypeOf, has: has, ownKeys: ownKeys$1, set: set} = Reflect$1;
    var isplainobject = a => isobject(a) && gettagtype(a) === "object";
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
        return a instanceof Array$1 && Array$1.isArray(a) && gettagtype(a) === "array";
    }
    function gettagtype(a) {
        return {}.toString.call(a).replace("[object ", "").replace("]", "").toLowerCase().trim();
    }
    function isSet(a) {
        return gettagtype(a) === "set" && a instanceof Set$1;
    }
    var {HTMLElement: HTMLElement$1, customElements: customElements$1, Proxy: Proxy$1} = window$1;
    if (!isfunction(HTMLElement$1) || !isfunction(Proxy$1) || !isobject(customElements$1)) {
        console.error("Proxy,HTMLElement ,customElements ,browser not supported !");
        throw new TypeError;
    }
    var hyphenateRE = /\B([A-Z])/g;
    var hyphenate = str => {
        return str.replace(hyphenateRE, "-$1").toLowerCase();
    };
    var String$1$1 = window$1.String;
    var Reflect$2 = window$1.Reflect;
    var {get: get$1, set: set$1, ownKeys: ownKeys$1$1} = Reflect$2;
    var valuestring = "value";
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
    var isinputcheckbox = ele => "input" === geteletagname(ele) && get$1(ele, "type") === "checkbox";
    function objtostylestring(obj) {
        obj = JSON.parse(JSON.stringify(obj));
        obj = Object$1.fromEntries(Object$1.entries(obj).map(_ref => {
            var [key, value] = _ref;
            return [ hyphenate(key).trim(), value ];
        }));
        return Object$1.entries(obj).map(_ref2 => {
            var [key, value] = _ref2;
            return key + ":" + value;
        }).join(";");
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
        var outputattrs = new Proxy(temp, {
            ownKeys() {
                var isinputtextortextareaflag = isinputtextortextarea(ele);
                var keys = attributesownkeys(ele);
                return Array$1.from(new Set$1([ ...keys, isinputcheckbox(ele) ? "checked" : undefined, isinputtextortextareaflag ? valuestring : undefined ].flat(Infinity).filter(a => !!a)));
            },
            get(target, key) {
                var isinputtextortextareaflag = isinputtextortextarea(ele);
                if (isinputcheckbox(ele) && key === "checked") {
                    return get$1(ele, "checked");
                }
                if (isinputtextortextareaflag && key === valuestring) {
                    return get$1(ele, valuestring);
                } else {
                    var v = getattribute(ele, String$1$1(key));
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
                var isinputtextortextareaflag = isinputtextortextarea(ele);
                if ("function" === typeof v) {
                    console.error(v);
                    console.error("Setting properties as functions is not allowed");
                    throw TypeError();
                }
                if (geteletagname(ele) === "input" && key === "checked") {
                    set$1(ele, key, v);
                    return true;
                }
                if (isinputtextortextareaflag && key === valuestring) {
                    return set$1(ele, valuestring, v);
                } else if (key === "style") {
                    var csstext = isstring$1(v) ? v : isobject$1(v) ? objtostylestring(v) : String$1$1(v);
                    set$1(get$1(ele, "style"), "cssText", csstext.trim());
                    return true;
                } else if (key === "class" && isobject$1(v)) {
                    var classtext = isArray(v) ? v.join(" ") : isSet$1(v) ? [ ...v ].join(" ") : String$1$1(v);
                    setattribute(ele, String$1$1(key), classtext);
                } else {
                    if (isSet$1(v)) {
                        setattribute(ele, String$1$1(key), JSON.stringify([ ...v ]));
                    } else {
                        if (v === true) {
                            v = "";
                        }
                        setattribute(ele, String$1$1(key), isobject$1(v) ? JSON.stringify(v) : String$1$1(v));
                        return true;
                    }
                }
                return true;
            },
            deleteProperty(t, k) {
                removeAttribute(ele, String$1$1(k));
                return true;
            },
            has(target, key) {
                return ownKeys$1$1(outputattrs).includes(key);
            },
            defineProperty() {
                return false;
            },
            getOwnPropertyDescriptor(target, key) {
                var otherdescipter = {
                    enumerable: true,
                    configurable: true,
                    writable: true
                };
                var myvalue = get$1(outputattrs, key);
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
        var tagname = geteletagname(ele);
        return tagname === "input" && get$1(ele, "type") === "text" || tagname === "textarea";
    }
    var document$1$1 = window$1.document;
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
        return document$1$1.createDocumentFragment();
    }
    function createnativeelement(type) {
        return document$1$1.createElement(type);
    }
    function createElementNS(namespace, name) {
        return document$1$1.createElementNS(namespace, name);
    }
    function createtextnode(data) {
        return document$1$1.createTextNode(String$1(data));
    }
    var svgnamespace = "http://www.w3.org/2000/svg";
    function changetext(textnode, value) {
        textnode.nodeValue = String$1(value);
    }
    var mathnamespace = "http://www.w3.org/1998/Math/MathML";
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
        return Array$1.from(ele.childNodes);
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
    var HTMLElementprototype = HTMLElement.prototype;
    function createanotherhtmldocument() {
        return document$1$1.implementation.createHTMLDocument("");
    }
    var attributeChangedCallback = "attributeChangedCallback";
    class AttrChange extends HTMLElement {
        get textContent() {
            return String$1(super.textContent || "");
        }
        set textContent(_a) {}
        get innerHTML() {
            return super.innerHTML;
        }
        set innerHTML(_a) {}
        get innerText() {
            return super.innerText;
        }
        set innerText(_a) {}
        [attributeChangedCallback]() {}
        setAttribute(qualifiedName, value) {
            var callback = get(this, attributeChangedCallback);
            var oldValue = getAttribute(this, qualifiedName);
            if (oldValue !== value) {
                setAttribute(this, qualifiedName, value);
                if (isfunction(callback)) {
                    callback.call(this, qualifiedName, oldValue, value);
                }
            }
        }
        removeAttribute(qualifiedName) {
            var callback = get(this, attributeChangedCallback);
            var oldValue = getAttribute(this, qualifiedName);
            if (null !== oldValue) {
                removeAttribute$1(this, qualifiedName);
                if (isfunction(callback)) {
                    callback.call(this, qualifiedName, oldValue, undefined);
                }
            }
        }
    }
    var r = "function" == typeof Map, u = r ? new Map : {};
    function merge_entries(a) {
        var m = {};
        a.forEach(_ref3 => {
            var [key, value] = _ref3;
            if (!m[key]) {
                m[key] = new Set$1;
            }
            value.forEach(v => {
                m[key].add(v);
            });
        });
        return Object$1.entries(m).map(_ref4 => {
            var [k, v] = _ref4;
            return [ k, [ ...v ] ];
        });
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
    var _a, _b, _c;
    var debouncedispatch = Symbol("debouncedispatch");
    var invalid_primitive_or_object_state = "invalid primitive or object state";
    function isReactiveState(a) {
        return a instanceof ReactiveState;
    }
    var eventtargetsymbol = Symbol("eventtatget");
    var memlisteners = Symbol("memlisteners");
    var dispatchsymbol = Symbol("dispatch");
    var subscribesymbol = Symbol("subscribe");
    var removeallistenerssymbol = Symbol("removeallisteners");
    var addallistenerssymbol = Symbol("addallisteners");
    class ReactiveState {
        constructor(init) {
            this[Symbol.toStringTag] = "ReactiveState";
            this[_a] = new EventTarget;
            this[_b] = [];
            this.valueOf = () => {
                return this.value;
            };
            this[_c] = debounce_1(eventname => {
                var name = eventname ? String$1(eventname) : "value";
                this[eventtargetsymbol].dispatchEvent(new CustomEvent("value", {
                    detail: name
                }));
            });
            if (isprimitive(init) || isobject(init)) {
                Object$1.defineProperty(this, "value", {
                    value: init,
                    configurable: true,
                    writable: true
                });
            } else {
                console.error(init);
                console.error(invalid_primitive_or_object_state);
                throw TypeError();
            }
        }
        [addallistenerssymbol]() {
            this[memlisteners].forEach(_ref5 => {
                var [value, callback] = _ref5;
                this[eventtargetsymbol].addEventListener(value, callback);
            });
        }
        toString() {
            var value = this.valueOf();
            return isprimitive(value) ? String$1(value) : isSet(value) ? JSON.stringify([ ...value ]) : isobject(value) ? JSON.stringify(value) : "";
        }
        [(_a = eventtargetsymbol, _b = memlisteners, _c = debouncedispatch, dispatchsymbol)](eventname) {
            this[debouncedispatch](eventname);
        }
        [subscribesymbol](callback) {
            var name = "value";
            this[memlisteners].push([ name, event => callback.call(undefined, this, get(event, "detail")) ]);
        }
        [removeallistenerssymbol]() {
            this[memlisteners].forEach(_ref6 => {
                var [value, callback] = _ref6;
                this[eventtargetsymbol].removeEventListener(value, callback);
            });
        }
        [Symbol.toPrimitive]() {
            var value = this.valueOf();
            return isprimitive(value) ? value : isobject(value) ? JSON.stringify(value) : void 0;
        }
    }
    function isVirtualdom(a) {
        return isobject(a) && has(a, isvirtualelement) && get(a, isvirtualelement) === isvirtualelement;
    }
    var isvirtualelement = Symbol("isvirtualelement");
    function createVirtualElement(type) {
        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        props = Object$1.assign({}, props);
        children = children.flat(1 / 0);
        var \u5b57\u6bcd\u5927\u5c0f\u5199 = /[A-Za-z\u4e00-\u9fa5]/;
        var propsentries = Object$1.entries(props);
        var propsentriesNOTevents = propsentries.filter(_ref7 => {
            var [key] = _ref7;
            return !(key.startsWith("@") || key.startsWith("on"));
        });
        var \u5b57\u6bcd\u5f00\u5934\u7684entries = propsentriesNOTevents.filter(_ref8 => {
            var [key] = _ref8;
            return \u5b57\u6bcd\u5927\u5c0f\u5199.test(key[0]);
        });
        var thisarg = Object$1.create(null);
        [ "onevent", "element" ].forEach(key => {
            defineProperty(thisarg, key, {
                writable: true
            });
        });
        [ "type", "props", "children", "directives", "bindattr" ].forEach(key => {
            defineProperty(thisarg, key, {
                enumerable: true,
                writable: true
            });
        });
        Object$1.assign(thisarg, {
            type: type,
            bindattr: Object$1.fromEntries(\u5b57\u6bcd\u5f00\u5934\u7684entries.filter(e => isReactiveState(e[1]))),
            props: Object$1.fromEntries(\u5b57\u6bcd\u5f00\u5934\u7684entries.filter(e => !isReactiveState(e[1]))),
            children: children,
            onevent: Object$1.fromEntries(merge_entries([ ...propsentries.filter(_ref9 => {
                var [key] = _ref9;
                return /\@/.test(key[0]);
            }).map(_ref10 => {
                var [key, value] = _ref10;
                return [ key.slice(1).toLowerCase().trim(), [ value ].flat(1 / 0) ];
            }), ...propsentries.filter(_ref11 => {
                var [key] = _ref11;
                return key.startsWith("on");
            }).map(_ref12 => {
                var [key, value] = _ref12;
                return [ key.slice(2).toLowerCase().trim(), [ value ].flat(1 / 0) ];
            }) ])),
            directives: Object$1.fromEntries(propsentriesNOTevents.filter(_ref13 => {
                var [key] = _ref13;
                return key[0] === "*" || key[0] === "_";
            }).map(_ref14 => {
                var [key, value] = _ref14;
                return [ key.slice(1).toLowerCase().trim(), value ];
            }))
        });
        defineProperty(thisarg, Symbol.toStringTag, {
            value: "VirtualElement"
        });
        defineProperty(thisarg, isvirtualelement, {
            value: isvirtualelement
        });
        return thisarg;
    }
    function createElement(type, propsorchildren) {
        for (var _len = arguments.length, children = new Array$1(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            children[_key - 2] = arguments[_key];
        }
        if (isarray(propsorchildren)) {
            return apply(createElement$1, undefined, [ type, undefined, [ ...propsorchildren, ...children ].flat(1 / 0) ]);
        } else {
            return apply(createElement$1, undefined, arguments);
        }
    }
    function createElement$1(type) {
        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var typenormalized = isstring(type) || isfunction(type) ? type : "";
        var propsnormalized = isplainobject(props) ? props : {};
        for (var _len2 = arguments.length, children = new Array$1(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            children[_key2 - 2] = arguments[_key2];
        }
        var childrennormalized = children.flat(Infinity).map(a => a === 0 ? "0" : a).filter(a => !!a);
        if (isstring(typenormalized)) {
            typenormalized = typenormalized.trim().toLowerCase();
        }
        if ("" === typenormalized) {
            return childrennormalized;
        } else {
            return apply(createVirtualElement, undefined, [ typenormalized, propsnormalized, childrennormalized ]);
        }
    }
    function isvalidvdom(v) {
        if (isstring(v)) {
            return true;
        }
        if (isnumber(v)) {
            return true;
        }
        var flag = false;
        if (isarray(v)) {
            return v.every(e => isvalidvdom(e));
        } else if (isVirtualdom(v)) {
            return isvalidvdom(v.children);
        } else if (isReactiveState(v)) {
            return true;
        }
        return flag;
    }
    function toArray(a) {
        return (isarray(a) ? a : [ a ]).flat(1 / 0).filter(a => !isundefined(a));
    }
    function mount(ele, container) {
        var clear = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        if (clear) {
            seteletext(container, "");
        }
        var eles = toArray(ele).flat(Infinity);
        eles.forEach(e => appendchild(container, e));
        return container;
    }
    var invalid_custom_element_class = "invalid custom element class !";
    if (!isobject(window$1.customElements)) {
        console.error(" customElements  not supported !");
        throw new TypeError;
    }
    function \u4f7f\u7528value\u4ece\u8868\u4e2d\u67e5\u8be2key(\u8868, \u7ec4\u4ef6\u72b6\u6001\u540d) {
        var outputentrie = Object$1.entries(\u8868).find(v => {
            return v[1] === \u7ec4\u4ef6\u72b6\u6001\u540d;
        });
        return outputentrie ? outputentrie[0] : undefined;
    }
    window$1.CustomElementRegistry = get(getPrototypeOf(window$1.customElements), "constructor");
    var elementset = Symbol.for("elementset");
    var elementmap = Symbol.for("elementmap");
    var {CustomElementRegistry: CustomElementRegistry} = window$1;
    var customElements$1$1 = window$1.customElements;
    if (!has(customElements$1$1, elementset)) {
        set(customElements$1$1, elementset, new Set$1);
    }
    if (!has(customElements$1$1, elementmap)) {
        set(customElements$1$1, elementmap, {});
    }
    var RandomDefineCustomElement = (initclass, extendsname) => RandomDefineCustomElement$1(initclass, extendsname);
    function RandomDefineCustomElement$1(initclass, extendsname) {
        var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        if (!isclassextendsHTMLElement(initclass)) {
            console.error(initclass);
            console.error(invalid_custom_element_class);
            throw TypeError();
        }
        if (!get(customElements$1$1, elementset).has(initclass)) {
            var elementname = getrandomstringandnumber(length);
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
            return \u4f7f\u7528value\u4ece\u8868\u4e2d\u67e5\u8be2key(get(customElements$1$1, elementmap), initclass);
        }
    }
    customElements$1$1.define = function(name, constructor, options) {
        if (!isclassextendsHTMLElement(constructor)) {
            console.error(constructor);
            console.error(invalid_custom_element_class);
            throw TypeError();
        }
        if (!get(customElements$1$1, elementset).has(constructor)) {
            if (has(customElements$1$1[elementmap], name)) {
                RandomDefineCustomElement$1(constructor, options ? options.extends : undefined);
            } else {
                CustomElementRegistry.prototype.define.call(customElements$1$1, name, constructor, options);
                customElements$1$1[elementset].add(constructor);
                customElements$1$1[elementmap][name] = constructor;
            }
        }
    };
    set(customElements$1$1, Symbol.iterator, () => {
        var entries = Object$1.entries(customElements$1$1[elementmap]);
        return entries[Symbol.iterator].call(entries);
    });
    var charactorlist = Array$1(26).fill(undefined).map((v, i) => 97 + i).map(n => String$1.fromCharCode(n));
    var hexnumberlist = Array$1(16).fill(undefined).map((v, i) => i).map(a => a.toString(16));
    var charactorandnumberlist = [ ...new Set$1([ ...hexnumberlist, ...charactorlist ]) ];
    function getrandomcharactor() {
        return get(charactorlist, Math$1.floor(Math$1.random() * charactorlist.length));
    }
    function getrandomhexnumberandcharactor() {
        return get(charactorandnumberlist, Math$1.floor(Math$1.random() * charactorandnumberlist.length));
    }
    function getrandomstringandnumber() {
        var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        return Array$1(length).fill(undefined).map(() => getrandomcharactor()).join("") + "-" + Array$1(length).fill(undefined).map(() => getrandomhexnumberandcharactor()).join("");
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
        return document$1.documentElement === getancestornode(element);
    }
    function getancestornode(node) {
        while (node && node.parentNode && node.parentNode !== document$1) {
            node = node.parentNode;
        }
        return node;
    }
    var invalid_Function = "invalid Function";
    var errormessage = "invalid useMounted or useUnMounted out of createComponent";
    var ctxopen = false;
    var MountedSet = new Set$1;
    var UnMountedSet = new Set$1;
    var StateSet = new Set$1;
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
    }
    function watch(state, callback) {
        if (isarray(state)) {
            var statearray = toArray(state);
            if (!statearray.length) {
                console.error("Empty array not allowed");
                throw new Error;
            }
            statearray.forEach(state1 => {
                watchsingle(state1, () => {
                    callback(...state);
                });
            });
        } else if (isReactiveState(state)) {
            watchsingle(state, callback);
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
    }
    function unwatch(state) {
        state[removeallistenerssymbol]();
    }
    function rewatch(state) {
        state[addallistenerssymbol]();
    }
    var {requestAnimationFrame: requestAnimationFrame$1$1} = window$1;
    var directive = {
        ref(ele, ref, _vdom) {
            console.log(_vdom);
            if (isobject(ref)) {
                set(ref, "value", ele);
            } else if (isfunction(ref)) {
                apply(ref, undefined, [ ele ]);
            } else {
                console.error(ref);
                console.error("invalid ref");
                throw TypeError();
            }
        },
        html(ele, html, _vdom) {
            console.log(_vdom);
            createhtmlandtextdirective(setelehtml, "html")(ele, html);
        },
        text(ele, text, _vdom) {
            console.log(_vdom);
            createhtmlandtextdirective(seteletext, "text")(ele, text);
        }
    };
    function createhtmlandtextdirective(seteletext, errorname) {
        return function(ele, text) {
            var element = ele;
            if (isstring(text)) {
                requestAnimationFrame$1$1(() => {
                    seteletext(ele, text);
                });
            } else if (isReactiveState(text)) {
                watch(text, state => {
                    if (isconnected(element)) {
                        seteletext(ele, String$1(state));
                    }
                });
                requestAnimationFrame$1$1(() => {
                    seteletext(ele, String$1(text));
                });
            } else {
                console.error(text);
                console.error("invalid " + errorname);
                throw TypeError();
            }
        };
    }
    var componentsymbol = Symbol("component");
    function iscomponent(a) {
        return isfunction(a) && has(a, componentsymbol) && get(a, componentsymbol) === componentsymbol;
    }
    var eventlistenerssymbol = Symbol("eventlisteners");
    function onevent(element, eventname, callback) {
        firstaddlisteners(element, eventname, toArray(callback));
    }
    function firstaddlisteners(ele, event, callarray) {
        var element = ele;
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
            get(ele, eventlistenerssymbol).forEach(_ref15 => {
                var [event, call] = _ref15;
                domremovelisten(ele, event, call);
            });
        }
    }
    function readdlisteners(ele) {
        if (has(ele, eventlistenerssymbol)) {
            get(ele, eventlistenerssymbol).forEach(_ref16 => {
                var [event, call] = _ref16;
                domaddlisten(ele, event, call);
            });
        }
    }
    var bindstatesymbol = Symbol("bindstate");
    var virtualdomsymbol = Symbol("virtualelement");
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
            var textnode = createtextnode(vdom);
            set(textnode, virtualdomsymbol, vdom);
            return textnode;
        } else if (isReactiveState(vdom)) {
            var reactive = vdom;
            var _textnode = createtextnode(String$1(reactive));
            set(_textnode, virtualdomsymbol, vdom);
            watch(reactive, state => {
                if (isconnected(element)) {
                    changetext(_textnode, String$1(state));
                }
            });
            var element = _textnode;
            set(element, bindstatesymbol, new Set$1);
            get(element, bindstatesymbol).add(reactive);
            return _textnode;
        } else if (isVirtualdom(vdom)) {
            var {type: type} = vdom;
            var _element2 = undefined;
            if (typeof type === "string") {
                if (type === "script") {
                    return createDocumentFragment();
                } else if (type === "svg") {
                    _element2 = createsvgelement();
                } else if (type === "math") {
                    _element2 = createmathelement();
                } else if ("" === type || type === "html") {
                    var fragmentnode = createDocumentFragment();
                    mount(render(vdom.children), fragmentnode);
                    return fragmentnode;
                } else {
                    _element2 = namespace ? createElementNS(namespace, type) : createnativeelement(type);
                }
            } else if (typeof type == "function") {
                if (isobject(type["defaultProps"])) {
                    vdom.props = JSON.parse(JSON.stringify(_objectSpread2({}, type["defaultProps"], {}, vdom.props)));
                }
                var propsjson = JSON.parse(JSON.stringify(_objectSpread2({}, vdom.props, {}, Object$1.fromEntries(Object$1.entries(vdom.bindattr).map(_ref17 => {
                    var [key, value] = _ref17;
                    return [ key, value.value ];
                })))));
                _element2 = createcostumelemet(type, propsjson, vdom.children);
            } else {
                throwinvalideletype(vdom);
            }
            if (_element2) {
                handleprops(_element2, vdom);
            }
            if (type && (isfunction(type) || isstring(type))) {
                if (!iscomponent(type)) {
                    if (_element2) {
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
                        }), _element2);
                        return _element2;
                    }
                }
            }
            return _element2;
        } else {
            throwinvalideletype(vdom);
        }
        console.error(vdom);
        throw new Error;
    }
    function handleprops(element, vdom) {
        ((element, vdom) => {
            Object$1.entries(vdom.directives).forEach(_ref18 => {
                var [name, value] = _ref18;
                if (isfunction(directive[name])) {
                    directive[name](element, value, vdom);
                } else {
                    console.error(vdom.directives);
                    console.error("invalid directives " + name);
                    throw new Error;
                }
            });
            var attribute1 = createeleattragentreadwrite(element);
            Object$1.assign(attribute1, vdom.props);
            set(element, virtualdomsymbol, vdom);
            vdom.element = element;
            Object$1.entries(vdom.bindattr).forEach(_ref19 => {
                var [key, primitivestate] = _ref19;
                attribute1[key] = primitivestate.valueOf();
                watch(primitivestate, state => {
                    if (isconnected(element)) {
                        attribute1[key] = state.valueOf();
                    }
                });
            });
            Object$1.entries(vdom.onevent).forEach(_ref20 => {
                var [event, callbacks] = _ref20;
                onevent(element, event, callbacks);
            });
        })(element, vdom);
        [ ...Object$1.values(vdom.bindattr), ...Object$1.values(vdom.directives) ].flat(1 / 0).filter(e => isReactiveState(e)).forEach(e => {
            if (!has(element, bindstatesymbol)) {
                set(element, bindstatesymbol, new Set$1);
            }
            get(element, bindstatesymbol).add(e);
        });
    }
    var invalid_Virtualdom = "invalid Virtualdom ";
    function MountElement(vdom, container) {
        if (isarray(vdom)) {
            vdom = vdom.flat(Infinity);
            if (!vdom.length) {
                console.error("Empty array not allowed");
                throw new TypeError;
            }
        }
        var el = container;
        if (!(el instanceof HTMLElement)) {
            console.error(el);
            console.error("invalid container HTMLElement!");
            throw TypeError();
        }
        if (el === document$1$1.body || el === document$1$1.documentElement || el === document$1$1.head) {
            console.error(el);
            console.error("Do not mount  to <html> or <body> <head>.");
            throw Error();
        }
        var elesarray = toArray(vdom);
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
    function isArray$1(a) {
        return Array$1.isArray(a);
    }
    var Reflect$3 = window$1.Reflect;
    var {ownKeys: ownKeys$2, deleteProperty: deleteProperty$1, apply: apply$1, construct: construct$1, defineProperty: defineProperty$1, get: get$2, getOwnPropertyDescriptor: getOwnPropertyDescriptor$1, getPrototypeOf: getPrototypeOf$1, has: has$1, set: set$2, setPrototypeOf: setPrototypeOf} = Reflect$3;
    function isobject$2(a) {
        return typeof a === "object" && a !== null;
    }
    function isfunction$1(a) {
        return typeof a === "function";
    }
    function deepobserveaddpath(target, callback) {
        var patharray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var ancestor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : target;
        if (!isfunction$1(callback)) {
            console.error(callback);
            console.error("observe callback invalid !");
            throw Error();
        }
        if (isfunction$1(target) || isobject$2(target)) {
            var fakeobj;
            if (isArray$1(target)) {
                fakeobj = [];
            } else if (isfunction$1(target)) {
                fakeobj = () => {};
            } else {
                fakeobj = {};
            }
            setPrototypeOf(fakeobj, null);
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
        var initobj = init;
        var containReactiveState = isplainobject(init) && Object$1.values(init).some(a => isReactiveState(a));
        var state_entries = Object$1.entries(init).filter(e => {
            var a = e[1];
            return isReactiveState(a);
        });
        if (containReactiveState) {
            initobj = _objectSpread2({}, init);
            state_entries.forEach(_ref21 => {
                var [key, state] = _ref21;
                defineProperty(initobj, key, {
                    enumerable: true,
                    get() {
                        return state.valueOf();
                    },
                    configurable: true
                });
            });
        }
        var reactive = new ReactiveState(initobj);
        if (containReactiveState) {
            state_entries.forEach(_ref22 => {
                var [key, state] = _ref22;
                watch(state, () => {
                    reactive[dispatchsymbol](String$1(key));
                });
            });
        }
        var objproxyhandler = {};
        objproxyhandler.ownKeys = target => {
            return Array$1.from(new Set$1([ ...ownKeys$1(target), ...ownKeys$1(get(target, "value")) ]));
        };
        objproxyhandler.setPrototypeOf = () => {
            return false;
        };
        objproxyhandler.defineProperty = () => {
            return false;
        };
        objproxyhandler.getOwnPropertyDescriptor = (target, key) => {
            var myvalue = get(target, "value");
            var descripter = getOwnPropertyDescriptor(target, key) || getOwnPropertyDescriptor(myvalue, key);
            if (descripter) {
                descripter.configurable = true;
            }
            return descripter;
        };
        objproxyhandler.deleteProperty = (target, key) => {
            var myvalue = get(target, "value");
            if (has(myvalue, key)) {
                deleteProperty(myvalue, key);
                target[dispatchsymbol](String$1(key));
                return true;
            } else {
                return true;
            }
        };
        objproxyhandler.has = (target, key) => {
            var myvalue = get(target, "value");
            return has(target, key) || has(myvalue, key);
        };
        objproxyhandler.get = (target, key) => {
            var value = get(target, "value");
            if (key === "value" && (isarray(value) || isplainobject(value))) {
                return observedeepagent(get(target, key), (_target_, patharray) => {
                    target[dispatchsymbol](patharray[0]);
                });
            } else if (has(target, key)) {
                return get(target, key);
            } else if (has(value, key)) {
                if (isSet(value) && (key === "add" || key === "clear" || key === "delete")) {
                    switch (key) {
                      case "add":
                        {
                            return add => {
                                if (!set_prototype.has.call(value, add)) {
                                    var returnvalue = set_prototype[key].call(value, add);
                                    target[dispatchsymbol]();
                                    return returnvalue;
                                }
                                return;
                            };
                        }

                      case "delete":
                        {
                            return dele => {
                                if (set_prototype.has.call(value, dele)) {
                                    var returnvalue = set_prototype[key].call(value, dele);
                                    target[dispatchsymbol]();
                                    return returnvalue;
                                }
                                return;
                            };
                        }

                      case "clear":
                        {
                            return () => {
                                if (value.size) {
                                    var returnvalue = set_prototype[key].call(value);
                                    target[dispatchsymbol]();
                                    return returnvalue;
                                }
                                return;
                            };
                        }
                    }
                } else if (isarray(value) || isplainobject(value)) {
                    return observedeepagent(get(value, key), () => {
                        target[dispatchsymbol](String$1(key));
                    });
                } else {
                    return get(value, key);
                }
            }
        };
        objproxyhandler.set = (target, key, value) => {
            if (isReactiveState(value)) {
                value = value.valueOf();
            }
            var myvalue = get(target, "value");
            if (key === "value" && isobject(value)) {
                set(target, key, value);
                target[dispatchsymbol]();
            } else if (!has(target, key)) {
                set(myvalue, key, value);
                target[dispatchsymbol](String$1(key));
            }
            return true;
        };
        return new Proxy(reactive, objproxyhandler);
    }
    var set_prototype = Set$1.prototype;
    function createstate(init) {
        var state = createstate$1(init);
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
                            set(target, key, value);
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
    function isCSSMediaRule(a) {
        return gettagtype(a) === "cssmediarule";
    }
    function isCSSImportRule(a) {
        return gettagtype(a) === "cssimportrule";
    }
    function parsecsstext(text) {
        var styleelement = render(createElement("style", [ text ]));
        var otherdocument = createanotherhtmldocument();
        appendchild(otherdocument.documentElement, styleelement);
        return Array$1.from(get(get(styleelement, "sheet"), "cssRules"));
    }
    function isCSSStyleRule(a) {
        return gettagtype(a) === "cssstylerule";
    }
    function selectoraddprefix(cssstylerule, prefix) {
        var selectorText = cssstylerule.selectorText;
        var selectorarray = selectorText.split(",");
        cssstylerule.selectorText = selectorarray.map(selectorText => {
            var prefixselector = prefix + " " + selectorText;
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
                prefixcssrules(Array$1.from(cssrule.cssRules), prefix);
                return cssrule;
            } else if (isCSSImportRule(cssrule)) {
                savestyleblob(prefix, undefined, cssrule.href);
                return;
            } else {
                return cssrule;
            }
        }).filter(Boolean);
    }
    var componentsstylesheet = {};
    function savestyleblob(tagname, csstext, urltext) {
        tagname = tagname.toLowerCase();
        if (!componentsstylesheet[tagname]) {
            componentsstylesheet[tagname] = new Set$1;
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
        var css = text;
        var cssomold = parsecsstext(css);
        var cssomnew = prefixcssrules(cssomold, prefix).filter(Boolean);
        var cssnewtext = cssrulestocsstext(cssomnew);
        return cssnewtext;
    }
    function registercssprefix(text, prefix) {
        var css = text;
        var cssnewtext = transformcsstext(css, prefix);
        savestyleblob(prefix, cssnewtext);
    }
    function loadlinkstyle(stylelinkelement, container) {
        return new Promise$1(rs => {
            var loaderrorfun = () => {
                stylelinkelement.onload = stylelinkelement.onerror = null;
                rs();
            };
            stylelinkelement.onload = loaderrorfun;
            stylelinkelement.onerror = loaderrorfun;
            appendchild(container, stylelinkelement);
        });
    }
    function waitloadallstyle(prefix, _this) {
        return Promise$1.all([ ...componentsstylesheet[prefix] ].map(styleurl => loadlinkstyle(createlinkstylesheet(styleurl), _this)));
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
    var readysymbol = Symbol("ready");
    function setimmediate(fun) {
        return Promise$1.resolve().then(() => fun());
    }
    var innerstatesymbol = Symbol("innerstate");
    var attributessymbol = Symbol("attributes");
    var elementsymbol = Symbol("innerelement");
    var vdomsymbol = Symbol("innervdom");
    var mountedsymbol = Symbol("mounted");
    var unmountedsymbol = Symbol("unmounted");
    function createComponent(custfun) {
        var _a, _b, _c, _d;
        if (isfunction(custfun)) {
            var defaultProps = get(custfun, "defaultProps");
            var css = get(custfun, "css");
            return _d = class Component extends AttrChange {
                constructor() {
                    var propsjson = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                    var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
                    super();
                    this[_b] = false;
                    this[_c] = {};
                    var css = get(this.constructor, "css");
                    if (css) {
                        var prefix = this.tagName.toLowerCase();
                        if (!componentsstylesheet[prefix]) {
                            registercssprefix(css, prefix);
                        }
                    }
                    var defaultProps = get(this.constructor, "defaultProps");
                    var attrs = createeleattragentreadwrite(this);
                    if (isobject(defaultProps)) {
                        Object$1.assign(attrs, defaultProps);
                    }
                    if (isobject(propsjson)) {
                        Object$1.assign(attrs, propsjson);
                    }
                    openctx();
                    var props = attrs;
                    var thisattributess = Object$1.fromEntries(Object$1.entries(props).map(_ref23 => {
                        var [key, value] = _ref23;
                        return [ key, createstate(value) ];
                    }));
                    this[attributessymbol] = readonlyproxy(thisattributess);
                    var readonlyprop = readonlyproxy(Object$1.fromEntries(Object$1.entries(thisattributess).map(_ref24 => {
                        var [key, value] = _ref24;
                        return [ key, readonlyproxy(value) ];
                    })));
                    var possiblyvirtualdom;
                    try {
                        possiblyvirtualdom = custfun.call(undefined, readonlyprop, children);
                    } catch (error) {
                        closectx();
                        console.error(error);
                        throw error;
                    }
                    if (isarray(possiblyvirtualdom)) {
                        possiblyvirtualdom = possiblyvirtualdom.flat(Infinity).filter(Boolean);
                    }
                    if (isvalidvdom(possiblyvirtualdom)) {
                        var thisvdomsymbol = toArray(possiblyvirtualdom);
                        this[vdomsymbol] = thisvdomsymbol.flat(Infinity).filter(Boolean);
                        this[mountedsymbol] = getMounted();
                        this[unmountedsymbol] = getUnMounted();
                        this[innerstatesymbol] = getstates();
                        closectx();
                    } else {
                        closectx();
                        console.error(possiblyvirtualdom);
                        console.error(invalid_Virtualdom);
                        throw TypeError();
                    }
                }
                connectedCallback() {
                    if (!this[elementsymbol]) {
                        this[elementsymbol] = render(this[vdomsymbol]).flat(Infinity);
                    }
                    if (!this[readysymbol]) {
                        this[readysymbol] = true;
                        var _css = get(this.constructor, "css");
                        var prefix = this.tagName.toLowerCase();
                        if (_css && componentsstylesheet[prefix]) {
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
                disconnectedCallback() {
                    this[unmountedsymbol].forEach(f => {
                        setimmediate(f);
                    });
                    onunmounted(this);
                }
                attributeChangedCallback(name) {
                    if (get(this, attributessymbol)[name]) {
                        set(get(this, attributessymbol)[name], "value,", createeleattragentreadwrite(this)[name]);
                    }
                }
            }, _a = componentsymbol, _b = readysymbol, _c = attributessymbol, _d[_a] = componentsymbol, 
            _d.css = isstring(css) && css ? css : undefined, _d.defaultProps = isobject(defaultProps) ? JSON.parse(JSON.stringify(defaultProps)) : undefined, 
            _d;
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
            if (has(ele, eventlistenerssymbol)) {
                readdlisteners(ele);
            }
            if (has(ele, bindstatesymbol)) {
                get(ele, bindstatesymbol).forEach(state => {
                    rewatch(state);
                });
            }
            if (has(ele, innerstatesymbol)) {
                get(ele, innerstatesymbol).forEach(state => {
                    rewatch(state);
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
            if (has(ele, eventlistenerssymbol)) {
                removelisteners(ele);
            }
            if (has(ele, innerstatesymbol)) {
                get(ele, innerstatesymbol).forEach(state => {
                    unwatch(state);
                });
            }
            onunmounted(getdomchildren(ele));
        }
    }
    var invalid_ReactiveState = "invalid ReactiveState";
    var truevdomsymbol = Symbol("truevdom");
    var falsevdomsymbol = Symbol("falsevdom");
    var trueelesymbol = Symbol("trueele");
    var falseelesymbol = Symbol("falseele");
    var handletrue = Symbol("handletrue");
    var handlefalse = Symbol("handlefalse");
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
        var options = {
            true: iftrue,
            false: iffalse
        };
        class Condition extends AttrChange {
            constructor() {
                super();
                this[_b] = false;
                var optionstrue = get(options, "true");
                var optionsfalse = get(options, "false");
                this[truevdomsymbol] = [ optionstrue ].flat(1 / 0).filter(Boolean);
                this[falsevdomsymbol] = [ optionsfalse ].flat(1 / 0).filter(Boolean);
            }
            [(_a = componentsymbol, _b = readysymbol, handlefalse)]() {
                setelehtml(this, "");
                if (this[falsevdomsymbol]) {
                    if (!this[falseelesymbol]) {
                        this[falseelesymbol] = render(this[falsevdomsymbol]);
                    }
                    var elementtomount = this[falseelesymbol];
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
                    var elementtomount = this[trueelesymbol];
                    mount(elementtomount, this);
                    elementtomount.forEach(e => onmounted(e));
                    if (this[falseelesymbol]) {
                        this[falseelesymbol].forEach(e => onunmounted(e));
                    }
                }
            }
            connectedCallback() {
                if (!this[readysymbol]) {
                    this[readysymbol] = true;
                    var attrs = createeleattragentreadwrite(this);
                    if (true === attrs["value"]) {
                        get(this, handletrue).call(this);
                    }
                    if (false === attrs["value"]) {
                        get(this, handlefalse).call(this);
                    }
                }
                onmounted(this);
            }
            disconnectedCallback() {
                onunmounted(this);
            }
            attributeChangedCallback(name) {
                if (this[readysymbol]) {
                    if (name === "value") {
                        var attrs = createeleattragentreadwrite(this);
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
        var vdom = createElement(Condition, {
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
        var state1array = toArray(state);
        if (!state1array.length) {
            console.error("Empty array not allowed");
            throw new Error;
        }
        var state1 = Arraycomputed(state1array, callback);
        usestste(state1);
        return state1;
    }
    function Arraycomputed(state, callback) {
        var reactivestate = new ReactiveState;
        var getter = () => {
            var value = apply(callback, undefined, state.map(st => st.valueOf()));
            return isReactiveState(value) ? value.value : value;
        };
        var memorized = getter();
        if (isfunction(memorized)) {
            console.error(memorized);
            throw new TypeError;
        }
        defineProperty(reactivestate, "value", {
            get: getter,
            configurable: true
        });
        state.forEach(state => {
            watch(state, () => {
                var newvalue = getter();
                if (newvalue !== memorized) {
                    reactivestate[dispatchsymbol]();
                    memorized = newvalue;
                }
            });
        });
        return getproperyreadproxy(readonlyproxy(reactivestate));
    }
    var __proto__ = "__proto__";
    function getproperyreadproxy(a) {
        var target = a;
        return new Proxy(target, {
            ownKeys(target) {
                var myvalue = get(target, "value");
                var myvalueobj = isobject(myvalue) ? myvalue : myvalue[__proto__];
                return Array$1.from(new Set$1([ ...ownKeys$1(target), ...ownKeys$1(myvalueobj) ]));
            },
            has(target, key) {
                var myvalue = get(target, "value");
                var myvalueobj = isobject(myvalue) ? myvalue : myvalue[__proto__];
                return has(target, key) || has(myvalueobj, key);
            },
            get(target, key) {
                if (has(target, key)) {
                    return get(target, key);
                } else {
                    var myvalue = get(target, "value");
                    var myvalueobj = isobject(myvalue) ? myvalue : Object$1(myvalue);
                    if (has(myvalueobj, key)) {
                        var property = get(myvalueobj, key);
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
    function extenddirectives() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        Object$1.entries(options).forEach(_ref25 => {
            var [key, value] = _ref25;
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
    extenddirectives({
        value(_element, value, vdom) {
            console.log(vdom);
            if (isReactiveState(value) && (vdom.type === "input" || vdom.type === "textarea")) {
                vdom.bindattr["value"] = value;
                [ "change", "input" ].forEach(eventname => {
                    var origin = vdom.onevent[eventname];
                    var eventsarray = toArray(origin);
                    set(vdom.onevent, eventname, [ ...eventsarray, e => {
                        return value.value = e.target.value;
                    } ].filter(Boolean));
                });
            } else {
                console.error(value);
                console.error(vdom);
                console.error(invalid_ReactiveState + invalid_Virtualdom);
                throw TypeError();
            }
        }
    });
    extenddirectives({
        checked(_element, value, vdom) {
            console.log(vdom);
            if (isReactiveState(value) && vdom.type === "input") {
                vdom.bindattr["checked"] = value;
                [ "change", "input" ].forEach(eventname => {
                    var origin = vdom.onevent[eventname];
                    var eventsarray = toArray(origin);
                    set(vdom.onevent, eventname, [ ...eventsarray, e => {
                        return value.value = e.target.checked;
                    } ].filter(Boolean));
                });
            } else {
                console.error(value);
                console.error(vdom);
                console.error(invalid_ReactiveState + invalid_Virtualdom);
                throw TypeError();
            }
        }
    });
    console.log(createElement, createElement);
    (() => {
        var mystate = createstate(true);
        console.log("mystatetest", mystate);
        var vdom = conditon(mystate, "testtrue", createElement("div", undefined, "testfalese"));
        var vdom2 = conditon(mystate, undefined, createElement("div", undefined, "testwwwwwwwwwfalese"));
        var vdom3 = conditon(mystate, createElement("div", undefined, "testwwwwwwwtrueeeeeeeeee"), undefined);
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
        var stylestate = createstate({
            display: "block",
            width: "100%"
        });
        var inputref = createRef();
        var state1 = createstate("hello");
        var vdom = [ createElement("div", {
            style: {
                display: "block",
                width: "100%"
            }
        }, "hello world!"), createElement("input", {
            style: "width:100%",
            "@input": e => state1.value = e.target.value,
            "*ref": inputref,
            "@change": e => state1.value = e.target.value,
            id: "co11111111111de16",
            class: "col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control",
            value: state1
        }), createElement("h1", {
            style: stylestate
        }, "mvvm-reactive-view"), createElement("button", {
            "@click": () => {
                stylestate.color = "red";
            }
        }, "red"), createElement("button", {
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
        var vdom2 = [ createElement("div", {
            "*text": "<a>\u7ed1\u5b9atextcontent</a>"
        }), createElement("div", {
            "*html": "<a>\u7ed1\u5b9ainnerhtml</a>"
        }) ];
        console.log(vdom2);
        document.body.appendChild(MountElement(vdom2, document.createElement("div")));
        var state1 = createstate("<a>\u7ed1\u5b9atextcontent</a>");
        var state2 = createstate("<a>\u7ed1\u5b9ainnerhtml</a>");
        var vdom3 = [ createElement("textarea", {
            value: state1,
            "@input": [ e => {
                state1.value = e.target.value;
            } ]
        }), createElement("input", {
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
        var state3 = createstate("<a>\u7ed1\u5b9ainnerhtml</a>");
        var vdom4 = [ createElement("div", {
            "*text": state3
        }), createElement("div", {
            "*html": state3
        }), createElement("script", null) ];
        watch(state1, state => state3.value = state.value);
        watch(state2, state => state1.value = state.value);
        console.log(state3);
        console.log(vdom4);
        document.body.appendChild(MountElement(vdom4, document.createElement("div")));
        var objstate = createstate({
            a: "w",
            6: "xxxxxxx",
            tttttttt: "true"
        });
        var objstate2 = createstate('{ a: "w", 6: "xxxxxxx", tttttttt: "true" }');
        console.log(objstate);
        setTimeout(() => {
            objstate.length = 10;
            objstate2.value = 2222222222222;
        }, 2e3);
        var objstatearray = createstate([ {
            a: "w",
            6: "xxxxxxx",
            tttttttt: "true"
        }, 1, true, "test" ]);
        var stylestate = createstate({
            display: "block",
            width: "100%"
        });
        var classsetstate = createstate(new Set([ "xxxxxxx", "wwwwwww", "eeeeeeee" ]));
        console.log("classsetstate", classsetstate);
        watch(classsetstate, a => console.log(a));
        setTimeout(() => {
            classsetstate.add("vvvvvvvvvvv");
        }, 5e3);
        setTimeout(() => {
            classsetstate.delete("eeeeeeee");
        }, 4e3);
        var vdomobj = [ createElement("div", {
            style: {
                display: "block",
                width: "100%"
            }
        }, objstate2), createElement("div", {
            style: stylestate,
            class: new Set([ "wwwwwww", "eeeeeeee" ])
        }, objstatearray), objstate, createElement("div", {
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
        var timer = setInterval(() => {
            objstate2.value += String(Math.random());
        }, 1e3);
        setTimeout(() => {
            clearInterval(timer);
        }, 1e4);
        console.log([ objstate2, createstate(objstate2) ]);
        console.log(Object.entries(objstate));
    })();
    (() => {
        var vdom = createElement("math", null, createElement("mrow", null, createElement("mrow", null, createElement("msup", null, createElement("mi", null, "a"), createElement("mn", null, "2")), createElement("mo", null, "+"), createElement("msup", null, createElement("mi", null, "b"), createElement("mn", null, "2"))), createElement("mo", null, "="), createElement("msup", null, createElement("mi", null, "c"), createElement("mn", null, "2"))));
        document.body.appendChild(MountElement(vdom, document.createElement("div")));
        console.log(vdom);
    })();
    class Bqqqqqqqqq extends HTMLElement {}
    class Aqqqqqqqqq extends HTMLElement {}
    console.log(customElements, [ ...customElements ]);
    customElements.define("qqqqqqqqqq-----a", Bqqqqqqqqq);
    customElements.define("qqqqqqqqqq-----a", Aqqqqqqqqq);
    document.body.appendChild(MountElement([ createElement(Bqqqqqqqqq), createElement(Aqqqqqqqqq) ], document.createElement("div")));
    console.log(createElement, createElement);
    function useMousePosition() {
        var x = createstate(0);
        var y = createstate(0);
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
    var mycomapp = createComponent(() => {
        var {x: x, y: y} = useMousePosition();
        var plus = computed(x, x => {
            return x + 100;
        });
        var multi = computed([ x, y ], (x, y) => {
            return x * y;
        });
        console.log(plus, multi);
        return createElement("div", null, createElement("h3", null, " \u9f20\u6807\u4f4d\u7f6e"), createElement("h2", null, "x:", x), createElement("h1", null, "y:", y), createElement("p", null, "x+100 \u662f", plus), createElement("p", null, "x*y \u662f", multi));
    });
    mycomapp.css = "\n*{font-size:80px !important;}\np{color:blue !important;}\n";
    var vdom = createElement(mycomapp);
    document.body.appendChild(MountElement(vdom, document.createElement("div")));
    var css = '@import url(https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css);html{color:#444333;background:#fff;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;text-rendering:optimizelegibility}article,aside,blockquote,body,button,code,dd,details,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,input,legend,li,menu,nav,ol,p,pre,section,td,textarea,th,ul{margin:0;padding:0}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}audio,canvas,video{display:inline-block;*display:inline;*zoom:1}body,button,input,select,textarea{font:500 .875em/1.8 Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif}button,input{*width:auto;*overflow:visible;line-height:22px}table{border-collapse:collapse;border-spacing:0}th{text-align:inherit}fieldset,img{border:0}img{-ms-interpolation-mode:bicubic}iframe{display:block}blockquote{font-family:Optima,Georgia,STSong,serif;margin:1em 0;color:#999;padding:.6em 1em;background:#f8f8f8;border-left:.4em solid #ddd}blockquote blockquote{padding:0 0 0 1em;margin-left:2em}abbr,acronym{border-bottom:1px dotted;font-variant:normal}abbr{cursor:help}del{text-decoration:line-through}address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:400}ol,ul{list-style:none}caption,th{text-align:left}q:after,q:before{content:""}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:text-top\\9}:root sub,:root sup{vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}a:hover{text-decoration:underline}a,ins{text-decoration:none}.typo-u,u{text-decoration:underline}mark{background:#fffdd1}code,pre{font-family:Courier New,Courier,monospace;white-space:pre-wrap;word-wrap:break-word}pre{background:#f8f8f8;border:1px solid #ddd;padding:1em 1.5em}hr{border:none;border-bottom:1px solid #cfcfcf;margin-bottom:10px;*color:pink;*filter:chroma(color=pink);height:10px;*margin:-7px 0 2px}.typo-small,figcaption,small{font-size:.9em;color:#888}[draggable]{cursor:move}.clearfix:after,.clearfix:before{content:"";display:table}.clearfix:after{clear:both}.clearfix{zoom:1}.textwrap,.textwrap td,.textwrap th{word-wrap:break-word;word-break:break-all}.textwrap-table{table-layout:fixed}.typo-dl,.typo-form,.typo-hr,.typo-ol,.typo-p,.typo-pre,.typo-table,.typo-ul,.typo dl,.typo form,.typo hr,.typo ol,.typo p,.typo pre,.typo table,.typo ul{margin-bottom:1.2em}h1,h2,h3,h4,h5,h6{font-weight:500;*font-weight:800;font-family:Helvetica Neue,Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif;color:#333}.typo-h1,.typo-h2,.typo-h3,.typo-h4,.typo-h5,.typo-h6,.typo h1,.typo h2,.typo h3,.typo h4,.typo h5,.typo h6{margin-bottom:.4em;line-height:1.5}.typo-h1,.typo h1{font-size:1.8em}.typo-h2,.typo h2{font-size:1.6em}.typo-h3,.typo h3{font-size:1.4em}.typo-h4,.typo h4{font-size:1.2em}.typo-h5,.typo-h6,.typo h5,.typo h6{font-size:1em}.typo-ul,.typo ul{margin-left:1.3em;list-style:disc}.typo-ol,.typo ol{list-style:decimal;margin-left:1.9em}.typo-ol ol,.typo-ol ul,.typo-ul ol,.typo-ul ul,.typo li ol,.typo li ul{margin-top:0;margin-bottom:0;margin-left:2em}.typo-ol ul,.typo-ul ul,.typo li ul{list-style:circle}.typo-table td .typo table caption,.typo-table th,.typo table td,.typo table th{border:1px solid #ddd;padding:.5em 1em;color:#666}.typo-table th,.typo table th{background:#fbfbfb}.typo-table thead th,.typo table thead th{background:#f1f1f1}.typo table .caption{border-bottom:none}.typo-input,.typo-textarea{-webkit-appearance:none;border-radius:0}::-moz-selection{background:#08c;color:#fff}::selection{background:#08c;color:#fff}.typo-em,.typo em,caption,legend{font-weight:700}p{color:#0f0!important}@font-face{font-family:octicons-anchor;src:url(data:font/woff;charset=utf-8;base64,d09GRgABAAAAAAYcAA0AAAAACjQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABMAAAABwAAAAca8vGTk9TLzIAAAFMAAAARAAAAFZG1VHVY21hcAAAAZAAAAA+AAABQgAP9AdjdnQgAAAB0AAAAAQAAAAEACICiGdhc3AAAAHUAAAACAAAAAj//wADZ2x5ZgAAAdwAAADRAAABEKyikaNoZWFkAAACsAAAAC0AAAA2AtXoA2hoZWEAAALgAAAAHAAAACQHngNFaG10eAAAAvwAAAAQAAAAEAwAACJsb2NhAAADDAAAAAoAAAAKALIAVG1heHAAAAMYAAAAHwAAACABEAB2bmFtZQAAAzgAAALBAAAFu3I9x/Nwb3N0AAAF/AAAAB0AAAAvaoFvbwAAAAEAAAAAzBdyYwAAAADP2IQvAAAAAM/bz7t4nGNgZGFgnMDAysDB1Ml0hoGBoR9CM75mMGLkYGBgYmBlZsAKAtJcUxgcPsR8iGF2+O/AEMPsznAYKMwIkgMA5REMOXicY2BgYGaAYBkGRgYQsAHyGMF8FgYFIM0ChED+h5j//yEk/3KoSgZGNgYYk4GRCUgwMaACRoZhDwCs7QgGAAAAIgKIAAAAAf//AAJ4nHWMMQrCQBBF/0zWrCCIKUQsTDCL2EXMohYGSSmorScInsRGL2DOYJe0Ntp7BK+gJ1BxF1stZvjz/v8DRghQzEc4kIgKwiAppcA9LtzKLSkdNhKFY3HF4lK69ExKslx7Xa+vPRVS43G98vG1DnkDMIBUgFN0MDXflU8tbaZOUkXUH0+U27RoRpOIyCKjbMCVejwypzJJG4jIwb43rfl6wbwanocrJm9XFYfskuVC5K/TPyczNU7b84CXcbxks1Un6H6tLH9vf2LRnn8Ax7A5WQAAAHicY2BkYGAA4teL1+yI57f5ysDNwgAC529f0kOmWRiYVgEpDgYmEA8AUzEKsQAAAHicY2BkYGB2+O/AEMPCAAJAkpEBFbAAADgKAe0EAAAiAAAAAAQAAAAEAAAAAAAAKgAqACoAiAAAeJxjYGRgYGBhsGFgYgABEMkFhAwM/xn0QAIAD6YBhwB4nI1Ty07cMBS9QwKlQapQW3VXySvEqDCZGbGaHULiIQ1FKgjWMxknMfLEke2A+IJu+wntrt/QbVf9gG75jK577Lg8K1qQPCfnnnt8fX1NRC/pmjrk/zprC+8D7tBy9DHgBXoWfQ44Av8t4Bj4Z8CLtBL9CniJluPXASf0Lm4CXqFX8Q84dOLnMB17N4c7tBo1AS/Qi+hTwBH4rwHHwN8DXqQ30XXAS7QaLwSc0Gn8NuAVWou/gFmnjLrEaEh9GmDdDGgL3B4JsrRPDU2hTOiMSuJUIdKQQayiAth69r6akSSFqIJuA19TrzCIaY8sIoxyrNIrL//pw7A2iMygkX5vDj+G+kuoLdX4GlGK/8Lnlz6/h9MpmoO9rafrz7ILXEHHaAx95s9lsI7AHNMBWEZHULnfAXwG9/ZqdzLI08iuwRloXE8kfhXYAvE23+23DU3t626rbs8/8adv+9DWknsHp3E17oCf+Z48rvEQNZ78paYM38qfk3v/u3l3u3GXN2Dmvmvpf1Srwk3pB/VSsp512bA/GG5i2WJ7wu430yQ5K3nFGiOqgtmSB5pJVSizwaacmUZzZhXLlZTq8qGGFY2YcSkqbth6aW1tRmlaCFs2016m5qn36SbJrqosG4uMV4aP2PHBmB3tjtmgN2izkGQyLWprekbIntJFing32a5rKWCN/SdSoga45EJykyQ7asZvHQ8PTm6cslIpwyeyjbVltNikc2HTR7YKh9LBl9DADC0U/jLcBZDKrMhUBfQBvXRzLtFtjU9eNHKin0x5InTqb8lNpfKv1s1xHzTXRqgKzek/mb7nB8RZTCDhGEX3kK/8Q75AmUM/eLkfA+0Hi908Kx4eNsMgudg5GLdRD7a84npi+YxNr5i5KIbW5izXas7cHXIMAau1OueZhfj+cOcP3P8MNIWLyYOBuxL6DRylJ4cAAAB4nGNgYoAALjDJyIAOWMCiTIxMLDmZedkABtIBygAAAA==) format("woff")}*{color:purple!important;font-size:50px}@keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@media (max-width:720px){.article-content h1{font-size:24px}.article-content h2{font-size:20px}.article-content h3{font-size:18px}.article-content pre>code .copy-code-btn{display:none}.article-content pre>code.hljs[lang]:before{top:2px;right:15px}}@media (max-width:720px){.article-content pre>code.copyable.hljs[lang]:before{right:1rem}}@media (max-width:500px){hr#hidewidthless500{display:none}}.recommend-container .recommend-user .item{margin-bottom:16px}.recommend-container .recommend-user .ui.button{padding:3px 5px;margin-right:0}.recommend-container .recommend-user .header .pull-right{color:#005980;cursor:pointer}.recommend-container .recommend-user .header .pull-right.disabled{opacity:.7;cursor:default}.recommend-container .recommend-user .icon-reset{margin-top:-1px;height:16px;font-size:16px;margin-right:2px}.recommend-container .recommend-user__content{position:relative}.recommend-container .dimmer.active{z-index:1}.recommend-container .recommend-list__user{-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;margin-right:4px}.recommend-container .recommend-list__user strong{color:#005980}.recommend-container .recommend-list__user .recommend-list__user-info{margin:0 4px 0 8px;max-width:155px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.recommend-container .recommend-list__user .recommend-list__user-info.is-follow{max-width:125px}.recommend-container .recommend-list__user .recommend-list__user-info>div{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.recommend-container .recommend-list__flollow .disable{opacity:.5}.recommend-container .recommend-project .icon-recommended{color:#fe7300}.recommend-container .recommend-project .project-label{display:inline-block}.recommend-container .recommend-project .recommend-list{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.recommend-container .recommend-project .recommend-list>*{word-break:break-all}.recommend-container .recommend-project .recommend-list .recommend-project__describe{overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical}.recommend-container .recommend-project .item{margin-bottom:16px}.recommend-container .recommend-project .recommend-project__name{margin-bottom:4px;color:#005980}.recommend-container .recent_visits .ui.items{margin-right:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.recommend-container .recent_visits .avatar-item{margin-right:-22px!important}.recommend-container .recent_visits .item{width:20%;min-width:0;font-size:16px}.recommend-container .recent_visits .empty-visitor.item{font-size:14px;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1}.dashboard-content.twelve{padding-right:0!important}.dashboard-content .gitee-headbread .git-user-selection-dropdown{margin-right:0!important}.dashboard-content .dashboard-team .git-user-content-header{display:none}.dashboard-content .gitee-headbread{margin-bottom:24px}.dashboard-content .git-dashboard-projects-menu{margin-bottom:24px!important}.dashboard-content .git-dashboard-projects-menu .f-bold{color:#fe7300;border-bottom:2px solid #fe7300!important}.dashboard-content .git-dashboard-projects-menu>a.item{font-size:16px;padding:8px 18px!important}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input{width:150px;margin-right:10px}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input input{margin-top:-6px;font-size:12px;margin-right:10px}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input .icon-search{margin-top:-4px}.dashboard-content #event-timeline-panel h3.event-timeline-title{font-size:16px;margin-top:0;margin-bottom:16px;display:inline-block}.dashboard-content #event-timeline-panel .event-timeline.content{padding:0 0 18px 12px}.dashboard-content #event-timeline-panel .event-actionbar .dropdown.icon{margin-left:4px}.dashboard-content #event-timeline-panel .message-container .message{margin:0 0 1em}.dashboard-content .issues-filter__item{display:block;padding:0!important;color:initial!important;font-weight:500!important}.dashboard-content .issues-dropdown{margin-top:-6px!important}.dashboard-content .issues-dropdown .pl-0.f-bold{padding-left:0!important}.dashboard-content .dashboard-team .dashboard-team_info{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.dashboard-content .dashboard-team .ui.image{width:40px;height:40px;min-width:40px}.dashboard-content .dashboard-team .dashboard-team__contaniner .dashboard-team__name{font-size:16px;font-weight:700;overflow:hidden;word-break:keep-all;text-overflow:ellipsis;display:block}.dashboard-content .dashboard-team .dashboard-team__contaniner a{color:#005980!important}.dashboard-content .dashboard-team .dashboard-team__contaniner>.item:first-child{padding-top:0!important}.dashboard-content .dashboard-team .dashboard-team__contaniner .item{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.dashboard-content .dashboard-team .dashboard-team__contaniner .content{display:-webkit-box!important;display:-webkit-flex!important;display:-moz-box!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;overflow:hidden}.dashboard-content .dashboard-team .dashboard-team__contaniner .content:after{content:none}.dashboard-content .dashboard-team .dashboard-team__contaniner .content i{font-size:16px}.dashboard-content .dashboard-team .icon-enterprise-badge{margin-left:4px}.dashboard-content .dashboard-team .dashboard-team__operate{min-width:75px;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-moz-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.dashboard-content .dashboard-team .dashboard-team__operate.has-exit{min-width:150px}.recommend-project .icon-help-circle{vertical-align:baseline}.dashboard-content__show{width:608px!important;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.ui.container.user_page{width:1240px}#rc-users__container{position:relative}#rc-users__container .secondary-navigation .active{color:#fe7300!important}#rc-users__container .dashboard-content{padding-right:32px;padding-left:32px;padding-top:24px}#rc-users__container .dashboard-sidebar{padding:16px 0 0;width:280px!important;margin-left:10px}#rc-users__container .dashboard-sidebar .dashboard-group .item{margin:8px 0}#rc-users__container .dashboard-sidebar .dashboard-group:last-child{margin-bottom:0!important}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar{padding-top:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .ui.card{width:100%;margin-top:32px;margin-bottom:0;padding-bottom:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .ui.card .header{font-size:16px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name h4{font-size:14px;display:inline-block}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .description{margin-top:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .item.flex{margin-top:16px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .item.flex:first-child{margin-top:12px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .quit i{margin-top:0}#rc-users__container .has-active .content{padding-left:0 2px 0 8px}#rc-users__container .navigation .header{padding-right:8px;border-bottom:1px solid #e3e9ed;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;padding-bottom:4px}#rc-users__container .navigation .header,#rc-users__container .navigation .header .title{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}#rc-users__container .navigation .header .title{font-size:16px}#rc-users__container .navigation .header .avatar.image{margin-right:0}#rc-users__container .navigation .header strong{font-size:16px;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;max-width:120px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#rc-users__container .navigation .header strong a{color:unset}#rc-users__container .navigation .header .actions{margin-top:4px}#rc-users__container .navigation .header .actions i{color:#005980}#rc-users__container .navigation.user i{color:#989dad}#rc-users__container .navigation.user .content{padding:0 8px}#rc-users__container .navigation .items>a{color:#40485b}#rc-users__container .navigation .items>a:hover{color:#095eab}#rc-users__container .navigation .items>a:active{color:#064177}#rc-users__container .navigation .items>a:hover{color:#40485b}#rc-users__container .navigation .item:hover .content{background:#f8f8f8}#rc-users__container .navigation .item .active{color:#fe7300;background:#f8f8f8}#rc-users__container .navigation .item .active .num{color:inherit}#rc-users__container .navigation .item:hover .exit{display:inline-block}#rc-users__container .navigation .icon-add,#rc-users__container .navigation .icon-search{color:#8c92a4!important}#rc-users__container .navigation .num{font-size:12px;font-weight:500;color:#8c92a4}#rc-users__container .navigation .gray{color:#8c92a4}#rc-users__container .navigation .avatar.image{width:32px;height:32px}#rc-users__container .twitter-typeahead{width:100%}#rc-users__container .gray{color:#8c92a4}#rc-users__container .ui.container{width:1240px}#rc-users__container .contribution-events{padding-top:32px}#rc-users__container #git-footer-main{min-width:1240px}#rc-users__container .gitee-headbread .gitee-divider{display:inline-block;opacity:.5;margin:0 .2rem;color:rgba(0,0,0,.4);vertical-align:baseline}#rc-users__container .git-user-content .git-user-content-header{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:16px}#rc-users__container .ui.button.js-project-watch{background:#fff;border:1px solid rgba(140,146,164,.5);padding:2px 5px;margin:0}#rc-users__container .recommend-container{width:248px!important}.users__personal-avatar{position:relative;margin:0 auto 10px;width:160px;height:160px}.users__personal-avatar .over-avatar{position:absolute;top:0;left:0;width:100%;height:100%;color:#fff;font-size:14px;text-align:center;line-height:200px;border:4px solid #eee;border-radius:50%;background:rgba(0,0,0,.5);cursor:pointer;display:none}.users__personal-avatar .over-avatar:hover{display:block}.users__personal-avatar .ui.image.avatar{margin:0;width:100%;height:100%;border:4px solid #eee}.users__personal-avatar .ui.image.avatar:hover+.over-avatar{display:block}.users__personal-avatar .avatar-gender{position:absolute;bottom:2px;right:27px;width:32px;height:32px;border-radius:50%;color:#fff;font-size:21px;text-align:center;line-height:30px;border:2px solid #fff}.users__personal-avatar .avatar-gender.mars{background:#3eb4ff}.users__personal-avatar .avatar-gender.venus{background:#ff5bc6}.users__personal-name{text-align:center}.users__personal-name h2,.users__personal-name p{margin:8px 0 0;word-break:break-all}.users__personal-name h2 span,.users__personal-name p span{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}.users__personal-name .remark-name{color:#8c92a4;font-size:14px;font-weight:400;display:inline}.users__personal-name .ui.small.label{margin-bottom:.5em;padding:.4em .7em;font-weight:400}.users__personal-setting{margin:15px auto;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__personal-setting .ui.button{margin:0;width:45%;font-size:14px}.users__personal-setting .ui.button.basic{border:1px solid #ccc}.users__personal-socials .ui.grid{padding:0 1rem}.users__personal-socials .ui.grid .column{padding:1rem 0;text-align:center}.users__personal-socials .social-count{font-size:18px;font-weight:700}.users__personal-socials .social-name{padding-top:5px;color:#40485b;font-size:12px;display:block}.users__personal-info{padding:15px 0;color:#8c92a4}.users__personal-info .info-item{padding:3px 0;line-height:1.5;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__personal-info .info-item i.iconfont{width:20px;text-align:center}.users__personal-info .info-item i.iconfont.icon-time{font-size:12px}.users__personal-achievement{padding:10px 0}.users__personal-achievement h3{margin:0;padding-bottom:4px;border-bottom:1px solid #dce3e8}.users__personal-achievement .ui.list .item .content{line-height:1.8}.users__personal-achievement .ui.list .item .content .description{color:#7687ab}.users__personal-groups{padding:10px 0}.users__personal-groups h3{margin:0;padding-bottom:4px;border-bottom:1px solid #dce3e8}.users__personal-groups .ui.list{margin:0}.users__personal-groups .ui.list:not(.more-groups){margin-top:1em}.users__personal-groups .ui.list .item{padding:.3em 0}.users__personal-groups .ui.list .item a{color:#005980!important}.users__personal-groups .ui.list .item a:hover{color:#4c8aa6!important}.users__personal-groups .ui.list .item a:active{color:#003e59!important}.users__personal-groups .ui.list .item .content{line-height:1.8;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__personal-groups .ui.list .item .right.floated.content{color:#7687ab}.users__personal-groups .ui.list .item .right.floated.content .mr-1{width:24px;display:inline-block}.users__personal-groups .load-more-groups{margin-top:8px;display:block;color:#7687ab}.users__personal-groups .load-more-groups:hover{color:#9fabc4}.users__personal-groups .load-more-groups:active{color:#525e77}.users__navbar .ui.secondary.pointing.menu{border-bottom:2px solid #dededf}.users__navbar .ui.secondary.pointing.menu>.item{margin-bottom:-2px;padding:10px 30px;min-width:100px;text-align:center;border-width:2px}.users__navbar .ui.secondary.pointing.menu>.item.active{color:#fe7300;border-color:#fe7300}.users__navbar .ui.secondary.pointing.menu>.item.active .ui.label{color:#fe7300;background:rgba(254,115,0,.2)}.users__header{margin-top:2em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__header h3{margin:0}.users__header .ui.dropdown{padding:.5em .92857em}.users__popular-projects .ui.cards{margin:0 -.5em -.5em}.users__popular-projects .ui.cards .ui.card{margin:.5em!important;padding:1em;width:calc(50% - 1em)!important;border:1px solid #dce3e8;-webkit-box-shadow:none;box-shadow:none}.users__popular-projects .ui.cards .ui.card .content{padding:0}.users__popular-projects .ui.cards .ui.card .content .popular-project-title{font-size:16px;word-break:break-all;vertical-align:middle}.users__popular-projects .ui.cards .ui.card .content .git-project-gvp-badge{margin-top:-3px}.users__popular-projects .ui.cards .ui.card .content i.iconfont{font-size:14px}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-mode-table{margin-top:1px;color:#d0d0d0;cursor:move}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-recommended{color:#fe7300;font-weight:400}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-watch{font-size:12px;vertical-align:baseline}.users__popular-projects .ui.cards .ui.card .content .description{color:#8c92a4;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}.users__popular-projects .ui.cards .ui.card .extra.content{padding-top:1em;border:none!important;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__popular-projects .ui.cards .ui.card .extra.content:after{content:none}.users__popular-projects .ui.cards .ui.card .extra.content .left .ui.small.label{padding:.4em .7em}.users__popular-projects .ui.cards .ui.card .extra.content .right a{padding:0 .2em;color:#8c92a4}.users__popular-projects .ui.cards .ui.card .extra.content .right a:hover{color:#aeb2bf}.users__popular-projects .ui.cards .ui.card .extra.content .right a:active{color:#626672}.users__popular-projects .ui.cards .ui.card.sortable-chosen{background:#fed!important}.users__contribution-panel .less{background-color:#eee}.users__contribution-panel .little{background-color:#d6e685}.users__contribution-panel .some{background-color:#8cc665}.users__contribution-panel .many{background-color:#44a340}.users__contribution-panel .much{background-color:#1e6823}.users__contribution-panel .contribution-box{padding-top:20px;height:125px;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.users__contribution-panel .contribution-box .left-side{width:32px;font-size:12px;text-align:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.users__contribution-panel .contribution-box .left-side,.users__contribution-panel .contribution-box .right-side{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.users__contribution-panel .contribution-box .right-side{position:relative;width:100%;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.users__contribution-panel .contribution-box .right-side .box{width:1.88679%;height:15px;border:1px solid #fff}.users__contribution-panel .contribution-box .right-side .box[data-content]:hover{border:1px solid #000}.users__contribution-panel .contribution-box .right-side .month{position:absolute;top:0;margin-top:-15px;margin-left:-15px;min-width:45px;font-size:12px;text-align:center}.users__contribution-panel .contribution-tip{margin-top:10px;padding-right:10px;font-size:12px;text-align:right}.users__contribution-panel .contribution-tip .word{font-size:12px;vertical-align:top;display:inline-block}.users__contribution-panel .contribution-tip .ui.horizontal.list>.item{margin:0 1px;width:12px;height:12px;vertical-align:text-bottom}.users__contribution-panel .contribution-describ p{margin:0 20px 0 0;display:inline-block}.users__contribution-panel .contribution-describ p.text-muted{margin-top:10px;display:block}.users__customize-modal .ui.form{min-height:180px}.users__customize-modal .grouped.fields{margin:.2em 0 1em!important;padding:10px 0;max-height:20em;overflow-y:auto}.users__customize-modal .grouped.fields .field{padding:5px!important}.users__customize-modal .grouped.fields .field .ui.checkbox{width:100%}.users__customize-modal .grouped.fields .field label{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__customize-modal .grouped.fields .field label span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__customize-modal .grouped.fields .field label .star-count{min-width:4em;text-align:right}.users__customize-modal .grouped.fields .field.active{background:rgba(254,115,0,.2)}.users__report-modal .appeal-success-tip{text-align:center}.users__report-modal .appeal-success-tip i.iconfont{font-size:7rem;color:#4baf50}.users__report-modal .ui.items{padding:20px;background:#f4f5f6}.users__report-modal .ui.items .ui.image{width:50px}.users__report-modal .ui.items .content .header{color:#40485b}.users__report-modal .ui.items .content .description{color:#8c92a4;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__report-modal .ui.segment.loader-block{border:0;min-height:100px}.users__report-modal .action-types .item{margin:5px;padding:10px 20px;min-width:120px;text-align:center;display:inline-block;background:#f2f2f2;border-radius:5px;cursor:pointer}.users__report-modal .action-types .item.active,.users__report-modal .action-types .item:active,.users__report-modal .action-types .item:hover{color:#fe7300}.users__report-modal .extra-content textarea{width:100%;height:5em}#user-show-detail .git-dashboard-projects-menu>.f-bold{color:#fe7300}#user-show-detail .git-codes-tags{margin-bottom:16px}#user-show-detail .git-user-twl-col>.gitee-headbread{margin-bottom:16px;margin-top:10px}#user-show-detail .git-profile-content-header .git-dashboard-projects-menu{margin-bottom:14px}#user-show-detail .git-profile-content-header .git-dashboard-projects-menu>a{font-size:14px}.recommend-container{padding:24px 0 0!important}.recommend-container .recommend-notice{background-color:#fffeed!important;margin-bottom:24px}.recommend-container .recommend-notice>.header{margin-right:8px!important}.recommend-container .ui.message{color:#40485b;padding:12px 16px;-webkit-box-shadow:0 0 0 1px #e2d8bf inset,0 0 0 0 transparent;box-shadow:inset 0 0 0 1px #e2d8bf,0 0 0 0 transparent}.recommend-container .ui.message i{position:absolute;top:0;right:0;font-size:.8em;margin-top:8px;margin-right:8px;cursor:pointer;color:#005980}.recommend-container .ui.message .header{color:#40485b;font-size:14px}.recommend-container .ui.message .content{margin-top:4px}.recommend-container .recommend-block{margin-bottom:32px}.recommend-container .recommend-block>.items{margin-top:0}.recommend-container .recommend-block .header{margin-bottom:16px}.recommend-container .recommend-block .header strong{font-size:16px}.recommend-container .recommend-block .recommend-list{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.recommend-container .recommend-block .item{margin:0}.recommend-container .recommend-user .header{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:end;-webkit-align-items:flex-end;-moz-box-align:end;-ms-flex-align:end;align-items:flex-end}.recommend-container .recommend-user .recommend-list{-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}';
    console.log(createElement, createElement);
    (() => {
        var mycom = (props, children) => {
            var number = createstate(1);
            useMounted(() => {
                console.log("mounted1");
            });
            useMounted(() => {
                console.log("mounted2", props);
            });
            useUnMounted(() => {
                console.log("unmounted");
            });
            watch(props.cccccc, console.log);
            return createElement("div", {
                onclick: () => {
                    number.value++;
                }
            }, [ number, createElement("br", null), "wwwwwwwwwwww", createElement("div", null, [ "createComponent" ]), children, createElement("div", null, [ props.cccccc ]) ]);
        };
        mycom.defaultProps = {
            cccccc: "bbbbbbb"
        };
        mycom.css = css;
        var myclasscomponent = createComponent(mycom);
        var vdom = createElement(myclasscomponent, {
            aaaaaa: 222222222,
            tttttt: "dddddddddd"
        }, [ "children" ]);
        console.log([ vdom, myclasscomponent, mycom ]);
        document.body.appendChild(MountElement(vdom, document.createElement("div")));
        setTimeout(() => {
            vdom.element.setAttribute("cccccc", "bbbbbbbbbbnnnnnnnnnnnnn");
        }, 5e3);
        document.body.appendChild(MountElement(createElement(myclasscomponent, null, createElement("form", {
            id: "newsletterForm",
            class: "newsletter-form nodisable",
            name: "newsletter-form",
            action: "https://www.mozilla.org/en-US/newsletter/",
            method: "post"
        }, createElement("div", {
            class: "newsletter-head"
        }, createElement("h2", {
            class: "newsletter-teaser"
        }, "\u5b66\u4e60 Web \u5f00\u53d1\u7684\u6700\u4f73\u5b9e\u8df5"), createElement("p", {
            class: "newsletter-description"
        }, "\u8ba9 MDN \u5c06\u6700\u65b0\u3001\u6700\u68d2\u7684\u5185\u5bb9\u76f4\u63a5\u6295\u9012\u5230\u60a8\u7684\u90ae\u7bb1\u3002"), createElement("p", {
            class: "newsletter-lang"
        }, "\u76ee\u524d\u4ec5\u63d0\u4f9b\u82f1\u6587\u7248\u65b0\u95fb\u62a5\u3002")), createElement("div", {
            class: "newsletter-fields"
        }, createElement("input", {
            type: "hidden",
            id: "fmt",
            name: "fmt",
            value: "H"
        }), createElement("input", {
            type: "hidden",
            id: "newsletterNewslettersInput",
            name: "newsletters",
            value: "app-dev"
        }), createElement("div", {
            id: "newsletterErrors",
            class: "newsletter-errors"
        }), createElement("div", {
            id: "newsletterEmail",
            class: "form-group newsletter-group-email"
        }, createElement("label", {
            for: "newsletterEmailInput",
            class: "form-label offscreen"
        }, "\u7535\u5b50\u90ae\u4ef6\u5730\u5740"), createElement("input", {
            type: "email",
            id: "newsletterEmailInput",
            name: "email",
            class: "form-input newsletter-input-email",
            required: "",
            placeholder: "you@example.com",
            size: "30"
        })), createElement("div", {
            id: "newsletterPrivacy",
            class: "form-group form-group-agree newsletter-group-privacy hidden"
        }, createElement("input", {
            type: "checkbox",
            id: "newsletterPrivacyInput",
            name: "privacy",
            required: ""
        }), createElement("label", {
            for: "newsletterPrivacyInput"
        }, "\u6211\u63a5\u53d7 Mozilla \u6309\u7167", createElement("a", {
            href: "https://www.mozilla.org/privacy/"
        }, "\u9690\u79c1\u653f\u7b56"), "\u6240\u8ff0\u7684\u65b9\u5f0f\u5904\u7406\u6211\u7684\u4fe1\u606f\u3002")), createElement("div", {
            id: "newsletterSubmit",
            class: "newsletter-group-submit"
        }, createElement("button", {
            id: "newsletter-submit",
            type: "submit",
            class: "button neutral newsletter-submit"
        }, "\u7acb\u5373\u6ce8\u518c", createElement("svg", {
            class: "icon icon-arrow",
            xmlns: "http://www.w3.org/2000/svg",
            width: "23",
            height: "28",
            viewBox: "0 0 23 28",
            "aria-hidden": "true"
        }, createElement("path", {
            d: "M23 15a2.01 2.01 0 0 1-.578 1.422L12.25 26.594c-.375.359-.891.578-1.422.578s-1.031-.219-1.406-.578L8.25 25.422c-.375-.375-.594-.891-.594-1.422s.219-1.047.594-1.422L12.828 18h-11C.703 18 0 17.062 0 16v-2c0-1.062.703-2 1.828-2h11L8.25 7.406a1.96 1.96 0 0 1 0-2.812l1.172-1.172c.375-.375.875-.594 1.406-.594s1.047.219 1.422.594l10.172 10.172c.375.359.578.875.578 1.406z"
        }))))))), document.createElement("div")));
    })();
    var css$1 = '@charset "UTF-8";@import url(https://cdn.bootcss.com/mui/3.7.1/css/mui.min.css);@import url(https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-6556dfa9be535e551ffffaadfecdad99.min.css);@import url(https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-frameworks-a2fba223d5af91496cac70d4ec3624df.min.css);@import url(https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css);pre{text-align:left!important}button,div,h1,h2,h3,h4,h5,h6,input{text-align:center}p{color:#000!important}@-webkit-keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.flowerpassword a{color:#42b983}.App-header{background-color:#fff}nav{width:100%}#\u56fe\u7247\u5217\u8868200 img{min-height:150px;min-width:150px;height:auto;width:auto;max-width:100%;max-height:200px}#my\u5bfc\u822a\u680f .navbar-nav li a{margin-left:2px;margin-right:2px}h1,h2{font-weight:400}ul{list-style-type:none;padding:0}li{display:inline-block;margin:0 10px}*{-webkit-user-select:text;-ms-user-select:text;user-select:text}.example{color:red}body{padding:0}*{font-family:"Microsoft Yahei,PingFangSC-Regular,arial, verdana, sans-serif"}#my\u5bfc\u822a\u680f{overflow:auto;max-height:100%;padding-right:0;padding-left:0}.App{text-align:center}.App-logo{-webkit-animation:App-logo-spin 20s linear infinite;animation:App-logo-spin 20s linear infinite;height:40vmin;pointer-events:none}.App-header{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:calc(10px + 2vmin)}.App-link{color:#61dafb}.flowerpassword body,.flowerpassword html{background-color:#fff}.flowerpassword body{font:14px/1.5 Tahoma,Helvetica,Arial,\\5b8b\\4f53;color:#000}.flowerpassword a,.flowerpassword a:hover{color:#09c;text-decoration:none}.flowerpassword .left{float:left}.flowerpassword .right{float:right}.flowerpassword .clear{clear:both}.flowerpassword header{text-align:left;padding:0;margin:15px auto}.flowerpassword #logo{height:39px}.flowerpassword #shortcuts{margin:15px 0 0 15px}.flowerpassword #nav{float:center;margin-top:10px}.flowerpassword #nav li{margin:0 7px}.flowerpassword #nav li a{font-size:22px;color:#09c}.flowerpassword #nav li.active a,.flowerpassword #nav li.active a:hover{background-color:#09c;color:#fff}.flowerpassword #nav li a:hover{background-color:#79c6df;color:#fff}.flowerpassword #index-box{background-color:#fff;width:940px;clear:both;box-shadow:0 0 4px 2px #ddd;border:1px solid #ddd}.flowerpassword #index-box .float-box{margin:20px 0 20px 20px;display:inline}.flowerpassword #index-box #content-nav{margin:0;width:200px}.flowerpassword #index-box #content-nav li a{background-color:#e5ecdc}.flowerpassword #index-slider{width:940px;height:200px;overflow:hidden;position:relative}.flowerpassword #index-slider ul{list-style:none;margin:0;position:absolute;top:0;left:0}.flowerpassword #index-slider li{width:940px;height:200px;float:left}.flowerpassword #index-slider #pagination{top:160px;left:800px}.flowerpassword #index-slider ul#pagination li{width:16px;height:16px;border-radius:1em;background-color:#fff;box-shadow:0 0 1px 2px #ccc;margin-right:18px;margin-top:4px}.flowerpassword #index-slider ul#pagination li.active{width:24px;height:24px;margin-top:0}.flowerpassword #index-slider ul#pagination li:hover{background-color:#ddd;cursor:pointer}.flowerpassword #index-report{width:680px;height:70px;margin-top:20px;overflow:hidden;position:relative;background-color:#e5ecdc}.flowerpassword #index-report ul{list-style:none;margin:0;position:absolute;top:0;left:0}.flowerpassword #index-report li{width:680px;height:70px;text-align:center;float:left;font-size:32px;color:#666;font-family:\xe5\xbe\xae\xe8\xbd\xaf\xe9\u203a\u2026\xe9\xbb\u2018,\xe9\xbb\u2018\xe4\xbd\u201c;line-height:70px}.flowerpassword #index-report-pagination{list-style:none;margin-left:35px;text-align:center}.flowerpassword #index-report-pagination li{height:65px;float:left;margin-right:45px;cursor:pointer}.flowerpassword #index-report-pagination li img{margin-top:30px}.flowerpassword #index-button{margin:40px 0 30px;text-align:center}.flowerpassword #index-button a{margin:0 50px}.flowerpassword #tab{margin-top:30px}.flowerpassword #tab li a{margin-right:10px;border-bottom-color:#ddd;color:#666}.flowerpassword #tab li a:hover{background-color:#f2f2f2;color:#333;border-color:#ddd #ddd transparent}.flowerpassword #tab li.active a{background-color:#f2f2f2;color:#666;border-bottom-color:transparent}.flowerpassword #content-nav{list-style:none;margin:20px 0 0}.flowerpassword #content-nav li a{color:#666;padding:11px 0 11px 60px;display:block;margin-bottom:1px;font-size:22px}.flowerpassword #content-nav li a.active,.flowerpassword #content-nav li a:hover{background-color:#09c!important;color:#fff!important}.flowerpassword h1,.flowerpassword h2{color:#09c;margin:30px 0 12px}.flowerpassword h2{font-size:22px}.flowerpassword h2 span{font-size:22px;color:#fff;margin-right:7px;background-color:#09c;width:33px;height:33px;display:inline-block;text-align:center}.flowerpassword h3{font-size:16px;color:#09c;margin:20px 0}.flowerpassword h3 span{font-size:16px;color:#fff;margin-right:6px;background-color:#09c;width:26px;display:inline-block;text-align:center}.flowerpassword #input span{color:#09c;font-weight:700;font-size:22px;margin:0 20px}.flowerpassword #input input{font-size:14px;padding:5px;margin-left:5px}.flowerpassword #input label{float:none;display:inline;padding-right:5px}.flowerpassword #input p{margin-top:16px}.flowerpassword #input p,.flowerpassword .other{font-size:12px;color:#999}.flowerpassword #code16{display:inline-block;text-align:center}.flowerpassword .code16d{border:2px solid #09c}.flowerpassword .code16d:hover{border:2px solid #ff881c}.flowerpassword #copycode16{color:#000;display:inline-block;padding:0 3px;cursor:pointer}.flowerpassword .copycode16d{background-color:#09c;border:2px solid #09c}.flowerpassword .copycode16d:hover{background-color:#ff881c;border:2px solid #ff881c}.flowerpassword p{font-size:12px;color:#666;margin:20px 0}.flowerpassword #copyOK{color:#f2f2f2;border:2px solid #f2f2f2;display:inline-block;margin-left:16px;padding:0 3px}.flowerpassword .down-button{margin:10px 20px 10px 0}.flowerpassword #get{margin-bottom:100px}.flowerpassword footer{margin:50px 0 30px}.flowerpassword footer p{margin:0 0 5px;color:#999}.flowerpassword footer p span{margin:0 10px}.flowerpassword footer p a{color:#999}.flowerpassword footer p a:hover{color:#333}.jdahd button{border-color:#000}.jdahd *{text-align:center;margin:0;box-sizing:border-box;background-color:transparent}.jdahd body{position:relative;height:100vh;text-align:center}.jdahd h1{text-align:center;margin:20px 0}.jdahd textarea{width:100%;clear:both;margin-bottom:10px;border-radius:7px;padding:15px 10px;font-size:14px;outline:none;-webkit-transition:all .2s ease-in;transition:all .2s ease-in}.jdahd input[type=button]{margin:0 auto;position:relative;vertical-align:top;width:150px;height:60px;padding:0;font-size:22px;font-weight:300;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.25);background:#2980b9;border:0;border-bottom:2px solid #2475ab;cursor:pointer;box-shadow:inset 0 -2px #2475ab}.jdahd input:active{top:1px;outline:none;box-shadow:none}.jdahd input:-ms-input-placeholder,.jdahd textarea:-ms-input-placeholder{color:#fff;font-size:20px;font-weight:300}.jdahd input::-moz-placeholder,.jdahd textarea::-moz-placeholder{color:#fff;font-size:20px;font-weight:300}.jdahd input::-webkit-input-placeholder,.jdahd textarea::-webkit-input-placeholder{color:#fff;font-size:20px;font-weight:300;box-shadow:none;-webkit-appearance:none}.jdahd footer{width:calc(100% - 40px);position:absolute;bottom:20px}.jdahd footer>p a{color:#2980b9;text-decoration:none}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}code{font-family:source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace}.jdahd #my\u5bfc\u822a\u680f{overflow:auto;max-height:100%;padding-right:0;padding-left:0}.jdahd *,.jdahd body{text-align:center}.jdahd h1{font-weight:300;font-size:40px}.jdahd h3{font-weight:700}.jdahd .actions,.jdahd li,.jdahd p,.jdahd textarea{width:100%}.jdahd textarea{border-color:#000;display:block;min-height:250px;margin:1em 0}.jdahd ul.pre li{white-space:pre}.jdahd .checkbox{display:inline-block}.jdahd .actions a{float:right}.jdahd .actions{clear:both}*{font-family:Microsoft Yahei}#nav{float:center}#app{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;margin-top:0}#App-logo{-webkit-animation:App-logo-spin 20s linear infinite;animation:App-logo-spin 20s linear infinite;height:40vmin;pointer-events:none}@keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}*{-webkit-user-select:text!important;-moz-user-select:text;-o-user-select:text;-ms-user-select:text!important;user-select:text!important}body,html{scroll-behavior:smooth}*{font-family:Microsoft Yahei,Helvetica,Tahoma,Arial,PingFang SC,Hiragino Sans GB,Heiti SC,MicrosoftYaHei,WenQuanYi Micro Hei,sans-serif!important}.hljs{display:block;overflow-x:auto;padding:.5em;color:#333;background:#f8f8f8;-webkit-text-size-adjust:none}.diff .hljs-header,.hljs-comment{color:#998;font-style:italic}.css .rule .hljs-keyword,.hljs-keyword,.hljs-request,.hljs-status,.hljs-subst,.hljs-winutils,.nginx .hljs-title{color:#333;font-weight:700}.hljs-hexcolor,.hljs-number,.ruby .hljs-constant{color:teal}.hljs-doctag,.hljs-string,.hljs-tag .hljs-value,.tex .hljs-formula{color:#d14}.hljs-id,.hljs-title,.scss .hljs-preprocessor{color:#900;font-weight:700}.hljs-list .hljs-keyword,.hljs-subst{font-weight:400}.hljs-class .hljs-title,.hljs-type,.tex .hljs-command,.vhdl .hljs-literal{color:#458;font-weight:700}.django .hljs-tag .hljs-keyword,.hljs-rule .hljs-property,.hljs-tag,.hljs-tag .hljs-title{color:navy;font-weight:400}.hljs-attribute,.hljs-name,.hljs-variable,.lisp .hljs-body{color:teal}.hljs-regexp{color:#009926}.clojure .hljs-keyword,.hljs-prompt,.hljs-symbol,.lisp .hljs-keyword,.ruby .hljs-symbol .hljs-string,.scheme .hljs-keyword,.tex .hljs-special{color:#990073}.hljs-built_in{color:#0086b3}.hljs-cdata,.hljs-doctype,.hljs-pi,.hljs-pragma,.hljs-preprocessor,.hljs-shebang{color:#999;font-weight:700}.hljs-deletion{background:#fdd}.hljs-addition{background:#dfd}.diff .hljs-change{background:#0086b3}.hljs-chunk{color:#aaa}#padding0{padding:0!important}@media (max-width:500px){hr#hidewidthless500{display:none}}.article-content{word-break:break-word;line-height:1.75;font-weight:400;font-size:15px;overflow-x:hidden}.article-content h1{margin:1.3rem 0;line-height:1.2}.article-content p{line-height:2.27rem}.article-content hr{border:none;border-top:1px solid #ddd;margin-top:2.7rem;margin-bottom:2.7rem}.article-content embed,.article-content iframe,.article-content img:not(.equation),.article-content video{max-width:100%!important;margin:0}.article-content img.lazyload{visibility:hidden}.article-content img.inited{background-color:#f8f9fa;background-position:50%;background-repeat:no-repeat;visibility:visible}.article-content img.loaded{background-image:none;background-color:transparent}.article-content img.equation{margin:0 .1em;max-width:100%!important;vertical-align:text-bottom}.article-content img:not(.equation){cursor:-webkit-zoom-in;cursor:zoom-in}.article-content figure{margin:2.7rem auto;text-align:center}.article-content figure figcaption{text-align:center;font-size:1rem;line-height:2.7rem;color:#909090}.article-content pre{line-height:1.93rem;overflow:auto}.article-content code,.article-content pre{font-family:Menlo,Monaco,Consolas,Courier New,monospace}.article-content code{font-size:1rem;padding:.26rem .53em;word-break:break-word;color:#4e5980;background-color:#f8f8f8;border-radius:2px;overflow-x:auto}.article-content pre>code{font-size:1rem;padding:.67rem 1.3rem;margin:0;word-break:normal;display:block}.article-content a{color:#259}.article-content a:active,.article-content a:hover{color:#275b8c}.article-content table{display:inline-block!important;font-size:1rem;width:auto;max-width:100%;overflow:auto;border:1px solid #f6f6f6}.article-content thead{background:#f6f6f6;color:#000;text-align:left}.article-content tr:nth-child(2n){background-color:#fcfcfc}.article-content td,.article-content th{padding:1rem .6rem;line-height:2rem}.article-content td{min-width:10rem}.article-content blockquote{margin:1em 0;border-left:4px solid #ddd;padding:0 1.3rem}.article-content blockquote>p{margin:.6rem 0}.article-content ol,.article-content ul{padding-left:2.7rem}.article-content ol li,.article-content ul li{margin-bottom:.6rem}.article-content ol ol,.article-content ol ul,.article-content ul ol,.article-content ul ul{margin-top:.27rem}.article-content pre>code{overflow-x:auto;-webkit-overflow-scrolling:touch;color:#333;background:#f8f8f8}.article-content .hljs-comment,.article-content .hljs-quote{color:#998}.article-content .hljs-keyword,.article-content .hljs-selector-tag,.article-content .hljs-subst{color:#333;font-weight:700}.article-content .hljs-literal,.article-content .hljs-number,.article-content .hljs-tag .hljs-attr,.article-content .hljs-template-variable,.article-content .hljs-variable{color:teal}.article-content .hljs-doctag,.article-content .hljs-string{color:#d14}.article-content .hljs-section,.article-content .hljs-selector-id,.article-content .hljs-title{color:#900;font-weight:700}.article-content .hljs-subst{font-weight:400}.article-content .hljs-class .hljs-title,.article-content .hljs-type{color:#458;font-weight:700}.article-content .hljs-attribute,.article-content .hljs-name,.article-content .hljs-tag{color:navy;font-weight:400}.article-content .hljs-link,.article-content .hljs-regexp{color:#009926}.article-content .hljs-bullet,.article-content .hljs-symbol{color:#990073}.article-content .hljs-built_in,.article-content .hljs-builtin-name{color:#0086b3}.article-content .hljs-meta{color:#999;font-weight:700}.article-content .hljs-deletion{background:#fdd}.article-content .hljs-addition{background:#dfd}.article-content .hljs-emphasis{font-style:italic}.article-content .hljs-strong{font-weight:700}.article-content p{line-height:inherit;margin-top:22px;margin-bottom:22px}.article-content img{max-height:none}.article-content a{color:#0269c8;border-bottom:1px solid #d1e9ff}.article-content code{background-color:#fff5f5;color:#ff502c;font-size:.87em;padding:.065em .4em}.article-content figure{margin:22px auto}.article-content figure figcaption{margin-top:2px;line-height:1.6}.article-content blockquote{color:#666;padding:1px 23px;margin:22px 0;border-left:4px solid #cbcbcb;background-color:#f8f8f8}.article-content blockquote:after{display:block;content:""}.article-content blockquote>p{margin:10px 0}.article-content blockquote.warning{position:relative;border-left-color:#f75151;margin-left:8px}.article-content blockquote.warning:before{position:absolute;top:14px;left:-12px;background:#f75151;border-radius:50%;content:"!";width:20px;height:20px;color:#fff;display:flex;align-items:center;justify-content:center}.article-content ol,.article-content ul{padding-left:28px}.article-content ol li,.article-content ul li{margin-bottom:0;list-style:inherit}.article-content ol li.task-list-item,.article-content ul li.task-list-item{list-style:none}.article-content ol li.task-list-item ol,.article-content ol li.task-list-item ul,.article-content ul li.task-list-item ol,.article-content ul li.task-list-item ul{margin-top:0}.article-content ol li{padding-left:6px}.article-content pre{position:relative;line-height:1.75}.article-content pre>code{padding:15px 12px}.article-content pre>code.hljs[lang]{padding:18px 15px 12px}.article-content pre>code.hljs[lang]:before{content:attr(lang);position:absolute;right:15px;top:2px;color:hsla(0,0%,54.9%,.8)}.article-content pre>code.hljs[lang][lang=bash]:before{content:""}.article-content pre>code.copyable .copy-code-btn{position:absolute;top:6px;right:15px;font-size:12px;line-height:1;cursor:pointer;color:hsla(0,0%,54.9%,.8);-webkit-transition:color .1s;transition:color .1s}.article-content pre>code.copyable .copy-code-btn:hover{color:#8c8c8c}.article-content pre>code.copyable.hljs[lang]:before{right:70px}.article-content h1,.article-content h2,.article-content h3,.article-content h4,.article-content h5,.article-content h6{color:#333;line-height:1.5;margin-top:35px;margin-bottom:10px;padding-bottom:5px}.article-content h1{font-size:30px;margin-bottom:5px}.article-content h2{padding-bottom:12px;font-size:24px;border-bottom:1px solid #ececec}.article-content h3{font-size:18px;padding-bottom:0}.article-content h4{font-size:16px}.article-content h5{font-size:15px}.article-content h6{margin-top:5px}.article-content h1.heading+h2.heading{margin-top:20px}.article-content h1.heading+h3.heading{margin-top:15px}.article-content .heading+.heading{margin-top:0}.article-content h1+:not(.heading){margin-top:25px}@media (max-width:720px){.article-content h1{font-size:24px}.article-content h2{font-size:20px}.article-content h3{font-size:18px}.article-content pre>code .copy-code-btn{display:none}.article-content pre>code.hljs[lang]:before{top:2px;right:15px}}@media (max-width:720px){.article-content pre>code.copyable.hljs[lang]:before{right:1rem}}';
    console.log(createElement, createElement);
    var mycomapp$1 = createComponent(() => {
        var inputpassword = createstate("");
        var inputref = createRef();
        var inputref2 = createRef();
        console.log(inputref2);
        console.log(inputpassword);
        watch(inputpassword, console.log);
        var vdom = [ createElement("h1", {
            style: "padding-top: 127.6px;"
        }, createElement("svg", {
            style: "\n      width: 100%;\n      height: 200px;\n  ",
            class: "octicon octicon-book",
            viewBox: "0 0 16 16",
            version: "1.1",
            width: "16",
            height: "16",
            "aria-hidden": "true"
        }, createElement("path", {
            "fill-rule": "evenodd",
            d: "M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"
        })), createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 3046.7 875.7",
            style: "\n      width: 100%;\n      height: 200px;\n  "
        }, createElement("title", null, "logo-on-dark-bg"), createElement("rect", {
            Color: "#FFF",
            x: "0",
            y: "0",
            width: "3046.7",
            height: "875.7"
        }), createElement("path", {
            fill: "#FFF",
            d: "M387 0l387 218.9v437.9L387 875.7 0 656.8V218.9L387 0z"
        }), createElement("path", {
            fill: "#8ED6FB",
            d: "M704.9 641.7L399.8 814.3V679.9l190.1-104.6 115 66.4zm20.9-18.9V261.9l-111.6 64.5v232l111.6 64.4zM67.9 641.7L373 814.3V679.9L182.8 575.3 67.9 641.7zM47 622.8V261.9l111.6 64.5v232L47 622.8zm13.1-384.3L373 61.5v129.9L172.5 301.7l-1.6.9-110.8-64.1zm652.6 0l-312.9-177v129.9l200.5 110.2 1.6.9 110.8-64z"
        }), createElement("path", {
            fill: "#1C78C0",
            d: "M373 649.3L185.4 546.1V341.8L373 450.1v199.2zm26.8 0l187.6-103.1V341.8L399.8 450.1v199.2zM198.1 318.2l188.3-103.5 188.3 103.5-188.3 108.7-188.3-108.7z"
        }), createElement("path", {
            fill: "#F5FAFA",
            d: "M1164.3 576.3h82.5l84.1-280.2h-80.4l-49.8 198.8-53.1-198.8H1078l-53.6 198.8-49.3-198.8h-80.4l83.6 280.2h82.5l52-179.5 51.5 179.5zM1335.2 437c0 84.1 57.3 146.3 147.4 146.3 69.7 0 107.2-41.8 117.9-61.6l-48.8-37c-8 11.8-30 34.3-68.1 34.3-41.3 0-71.3-26.8-72.9-64.3H1608c.5-5.4.5-10.7.5-16.1 0-91.6-49.3-149.5-136.1-149.5-79.9 0-137.2 63.2-137.2 147.9zm77.7-30.6c3.2-32.1 25.7-56.8 60.6-56.8 33.8 0 58.4 22.5 60 56.8h-120.6zm223.5 169.9h69.7v-28.9c7.5 9.1 35.4 35.9 83.1 35.9 80.4 0 137.2-60.5 137.2-146.8 0-86.8-52.5-147.3-132.9-147.3-48.2 0-76.1 26.8-83.1 36.4V188.9h-73.9v387.4h-.1zm71.8-139.3c0-52.5 31.1-82.5 71.8-82.5 42.9 0 71.8 33.8 71.8 82.5 0 49.8-30 80.9-71.8 80.9-45 0-71.8-36.5-71.8-80.9zm247 239.5h73.9V547.3c7 9.1 34.8 35.9 83.1 35.9 80.4 0 132.9-60.5 132.9-147.3 0-85.7-56.8-146.8-137.2-146.8-47.7 0-75.6 26.8-83.1 36.4V296h-69.7v380.5h.1zm71.8-241.1c0-44.5 26.8-80.9 71.8-80.9 41.8 0 71.8 31.1 71.8 80.9 0 48.8-28.9 82.5-71.8 82.5-40.7 0-71.8-30-71.8-82.5zm231.5 54.1c0 58.9 48.2 93.8 105 93.8 32.2 0 53.6-9.6 68.1-25.2l4.8 18.2h65.4V398.9c0-62.7-26.8-109.8-116.8-109.8-42.9 0-85.2 16.1-110.4 33.2l27.9 50.4c20.9-10.7 46.6-19.8 74.5-19.8 32.7 0 50.9 16.6 50.9 41.3v18.2c-10.2-7-32.2-15.5-60.6-15.5-65.4-.1-108.8 37.4-108.8 92.6zm73.9-2.2c0-23 19.8-39.1 48.2-39.1s48.8 14.5 48.8 39.1c0 23.6-20.4 38.6-48.2 38.6s-48.8-15.5-48.8-38.6zm348.9 30.6c-46.6 0-79.8-33.8-79.8-81.4 0-45 29.5-82 77.2-82 31.6 0 53.1 15.5 65.4 26.8l20.9-62.2c-18.2-13.9-47.2-30-88.4-30-85.2 0-149 62.7-149 147.9s62.2 146.3 149.5 146.3c40.7 0 71.3-17.1 87.3-30l-19.8-60.5c-12.4 10.1-34.9 25.1-63.3 25.1zm110.9 58.4h73.9V431.6l93.8 144.7h86.8L2940.6 423l98.6-127h-83.1l-90 117.9v-225h-73.9v387.4z"
        }))), createElement("div", null, createElement("div", null, createElement("noscript", null, "You need to enable JavaScript to run this app."), createElement("div", {
            id: "root"
        }, createElement("div", null, createElement("div", {
            class: "container-fluid fixed-top",
            id: "my\u5bfc\u822a\u680f"
        }, createElement("nav", {
            class: "navbar navbar-default navbar navbar-expand-sm bg-light navbar-light",
            role: "navigation"
        }, createElement("div", null, createElement("a", {
            class: "navbar-brand mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/"
        }, "masx200\u7684", createElement("hr", {
            id: "hidewidthless500"
        }), "github\u4e3b\u9875"), createElement("button", {
            class: "navbar-toggler",
            type: "button",
            "data-toggle": "collapse"
        }, createElement("span", {
            class: "navbar-toggler-icon"
        }))), createElement("div", {
            class: "collapse navbar-collapse",
            id: "example-navbar-collapse",
            style: "display: none;"
        }, createElement("ul", {
            class: "nav navbar-nav",
            id: "allnavbar"
        }, createElement("li", {
            id: "mynav1"
        }, createElement("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-home"
        }, "\u57fa\u4e8eREACT\u7684\u4e3b\u9875")), createElement("li", null, createElement("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-rssreader"
        }, "rss\u9605\u8bfb")), createElement("li", {
            id: "mynav2"
        }, createElement("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-about"
        }, "\u5173\u4e8eREACT")), createElement("li", {
            class: "nav-item"
        }, createElement("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/picalc"
        }, "\u5706\u5468\u7387\u8ba1\u7b97\u591a\u7ebf\u7a0b")), createElement("li", null, createElement("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-huami"
        }, "\u82b1\u5bc6\u7f51\u9875\u7248")), createElement("li", null, createElement("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/decoder"
        }, "JSfuck-and-hieroglyphy-Decoder")), createElement("li", null, createElement("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/jsfuck"
        }, "JSfuck-ENCODER")), createElement("li", null, createElement("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/hieroglyphy"
        }, "hieroglyphy-ENCODER")), createElement("li", null, createElement("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/webpack-react-vue-spa-awesome-config"
        }, "webpack-react-vue- \u6781\u901f\u96f6\u914d\u7f6e\u7684\u5355\u9875\u9762 web\n                        \u5e94\u7528\u6253\u5305\u5de5\u5177")), createElement("li", {
            class: "nav-item"
        }, createElement("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/IMPORTCJSAMDUMD\u52a8\u6001\u5f02\u6b65\u52a0\u8f7d"
        }, "\u52a8\u6001\u5f02\u6b65\u52a0\u8f7d-commonjs\u548cumd\u548camd\u6a21\u5757\u5e93")), createElement("li", {
            class: "nav-item"
        }, createElement("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-simple-global-state-store-hook"
        }, "\u9002\u7528\u4e8eReact\u7684\u6781\u7b80\u5168\u5c40\u72b6\u6001\u7ba1\u7406\u5e93")), createElement("li", {
            class: "nav-item"
        }, createElement("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/excellent-vscode-extensions-for-javascript"
        }, "VScode\u7684\u4f18\u79c0\u6269\u5c55\u63a8\u8350")), createElement("li", {
            class: "nav-item"
        }, createElement("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/vue-simple-global-state-store-manager"
        }, "\u9002\u7528\u4e8eVue\u7684\u6781\u7b80\u5168\u5c40\u72b6\u6001\u7ba1\u7406\u5e93")), createElement("li", null, createElement("a", {
            href: "./my-vue-router-project/index.html",
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined"
        }, "\u57fa\u4e8evue\u7684\u4e3b\u9875")), createElement("li", null, createElement("a", {
            href: "./my-vue-router-project/index.html#/about",
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined"
        }, "\u5173\u4e8eVue")))))), createElement("div", {
            class: "container",
            id: "my\u4e3b\u4f53",
            style: "padding-top: 127.6px;"
        }, createElement("div", {
            class: "hello flowerpassword"
        }, createElement("h1", null, "\u82b1\u5bc6 \u4e0d\u4e00\u6837\u7684\u5bc6\u7801\u7ba1\u7406\u5de5\u5177"), createElement("div", {
            id: "rong1",
            class: "container",
            style: "text-align: center;"
        }, createElement("div", {
            id: "rong2"
        }, createElement("h2", null, createElement("span", null, "1"), "\u8f93\u5165"), createElement("div", {
            id: "input"
        }, createElement("p", null), createElement("h3", null, "\u8bb0\u5fc6\u5bc6\u7801"), createElement("p", null), createElement("p", null, createElement("input", {
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
        })), createElement("p", null), createElement("span", null, "+"), createElement("h3", null, "\u533a\u5206\u4ee3\u53f7"), createElement("p", null), createElement("p", null, createElement("input", {
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
        }))), createElement("br", null), createElement("p", null), createElement("h2", null, createElement("span", null, "2"), "\u83b7\u53d6"), createElement("p", null), createElement("div", {
            id: "get"
        }, createElement("p", {
            id: "tuijian"
        }), createElement("p", null), createElement("h3", null, "\u6700\u7ec8\u5bc6\u7801"), createElement("p", null), createElement("span", {
            id: "myhezi"
        }, createElement("p", null, createElement("input", {
            id: "cod222222222222e16",
            readonly: "",
            class: "col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control",
            value: ""
        })), createElement("br", null), createElement("p", null, createElement("button", {
            id: "copycode16",
            "data-clipboard-target": "#code16",
            class: "btn btn-lg btn copycode16d btn-info",
            style: "width: 100%;"
        }, "\u70b9\u51fb\u590d\u5236"))), createElement("p", null, createElement("span", {
            id: "copyOK",
            style: "display: none;"
        }, "\u221a\u590d\u5236\u6210\u529f")), createElement("p", null)))))))), createElement("script", {
            type: "text/javascript",
            src: "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/bundle.runtime~main.3a15bebb435b0d3fead6.js"
        }), createElement("script", {
            type: "text/javascript",
            src: "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/chunk.vendors~main.f7c5ea92c1b78a8ff211.js"
        }), createElement("script", {
            type: "text/javascript",
            src: "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/chunk.main.b9c7ffd191cff11a9b96.js"
        })), createElement("div", {
            contenteditable: true
        })), createElement("h1", null, createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            version: "1.1",
            baseProfile: "full",
            style: "\n      width:600px;\n      height: 600px;\n  "
        }, createElement("g", {
            "fill-opacity": "0.7",
            stroke: "black",
            "stroke-width": "0.1cm"
        }, createElement("circle", {
            cx: "6cm",
            cy: "2cm",
            r: "100",
            fill: "red",
            transform: "translate(0,50)"
        }), createElement("circle", {
            cx: "6cm",
            cy: "2cm",
            r: "100",
            fill: "blue",
            transform: "translate(70,150)"
        }), createElement("circle", {
            cx: "6cm",
            cy: "2cm",
            r: "100",
            fill: "green",
            transform: "translate(-70,150)"
        }))), createElement("svg", {
            style: "\n      width: 100%;\n      height: 200px;\n  ",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 3046.7 875.7"
        }, createElement("title", null, "logo-on-dark-bg"), createElement("rect", {
            Color: "#FFF",
            x: "0",
            y: "0",
            width: "3046.7",
            height: "875.7"
        }), createElement("path", {
            fill: "#FFF",
            d: "M387 0l387 218.9v437.9L387 875.7 0 656.8V218.9L387 0z"
        }), createElement("path", {
            fill: "#8ED6FB",
            d: "M704.9 641.7L399.8 814.3V679.9l190.1-104.6 115 66.4zm20.9-18.9V261.9l-111.6 64.5v232l111.6 64.4zM67.9 641.7L373 814.3V679.9L182.8 575.3 67.9 641.7zM47 622.8V261.9l111.6 64.5v232L47 622.8zm13.1-384.3L373 61.5v129.9L172.5 301.7l-1.6.9-110.8-64.1zm652.6 0l-312.9-177v129.9l200.5 110.2 1.6.9 110.8-64z"
        }), createElement("path", {
            fill: "#1C78C0",
            d: "M373 649.3L185.4 546.1V341.8L373 450.1v199.2zm26.8 0l187.6-103.1V341.8L399.8 450.1v199.2zM198.1 318.2l188.3-103.5 188.3 103.5-188.3 108.7-188.3-108.7z"
        }), createElement("path", {
            fill: "#F5FAFA",
            d: "M1164.3 576.3h82.5l84.1-280.2h-80.4l-49.8 198.8-53.1-198.8H1078l-53.6 198.8-49.3-198.8h-80.4l83.6 280.2h82.5l52-179.5 51.5 179.5zM1335.2 437c0 84.1 57.3 146.3 147.4 146.3 69.7 0 107.2-41.8 117.9-61.6l-48.8-37c-8 11.8-30 34.3-68.1 34.3-41.3 0-71.3-26.8-72.9-64.3H1608c.5-5.4.5-10.7.5-16.1 0-91.6-49.3-149.5-136.1-149.5-79.9 0-137.2 63.2-137.2 147.9zm77.7-30.6c3.2-32.1 25.7-56.8 60.6-56.8 33.8 0 58.4 22.5 60 56.8h-120.6zm223.5 169.9h69.7v-28.9c7.5 9.1 35.4 35.9 83.1 35.9 80.4 0 137.2-60.5 137.2-146.8 0-86.8-52.5-147.3-132.9-147.3-48.2 0-76.1 26.8-83.1 36.4V188.9h-73.9v387.4h-.1zm71.8-139.3c0-52.5 31.1-82.5 71.8-82.5 42.9 0 71.8 33.8 71.8 82.5 0 49.8-30 80.9-71.8 80.9-45 0-71.8-36.5-71.8-80.9zm247 239.5h73.9V547.3c7 9.1 34.8 35.9 83.1 35.9 80.4 0 132.9-60.5 132.9-147.3 0-85.7-56.8-146.8-137.2-146.8-47.7 0-75.6 26.8-83.1 36.4V296h-69.7v380.5h.1zm71.8-241.1c0-44.5 26.8-80.9 71.8-80.9 41.8 0 71.8 31.1 71.8 80.9 0 48.8-28.9 82.5-71.8 82.5-40.7 0-71.8-30-71.8-82.5zm231.5 54.1c0 58.9 48.2 93.8 105 93.8 32.2 0 53.6-9.6 68.1-25.2l4.8 18.2h65.4V398.9c0-62.7-26.8-109.8-116.8-109.8-42.9 0-85.2 16.1-110.4 33.2l27.9 50.4c20.9-10.7 46.6-19.8 74.5-19.8 32.7 0 50.9 16.6 50.9 41.3v18.2c-10.2-7-32.2-15.5-60.6-15.5-65.4-.1-108.8 37.4-108.8 92.6zm73.9-2.2c0-23 19.8-39.1 48.2-39.1s48.8 14.5 48.8 39.1c0 23.6-20.4 38.6-48.2 38.6s-48.8-15.5-48.8-38.6zm348.9 30.6c-46.6 0-79.8-33.8-79.8-81.4 0-45 29.5-82 77.2-82 31.6 0 53.1 15.5 65.4 26.8l20.9-62.2c-18.2-13.9-47.2-30-88.4-30-85.2 0-149 62.7-149 147.9s62.2 146.3 149.5 146.3c40.7 0 71.3-17.1 87.3-30l-19.8-60.5c-12.4 10.1-34.9 25.1-63.3 25.1zm110.9 58.4h73.9V431.6l93.8 144.7h86.8L2940.6 423l98.6-127h-83.1l-90 117.9v-225h-73.9v387.4z"
        }))) ];
        console.log(vdom);
        return vdom;
    });
    mycomapp$1.css = css$1;
    var vdom$1 = createElement(mycomapp$1);
    MountElement(vdom$1, document.getElementById("root"));
    console.log(createElement, createElement);
    var temp_ref = createRef();
    var check = createstate(false);
    var notcheck = computed(check, a => !a);
    var list = Array(10).fill().map((v, i) => i);
    watch(check, a => console.log(a));
    watch(notcheck, a => console.log(a));
    var vdom$2 = createElement("", null, [ createElement("input", {
        type: "checkbox",
        _checked: check
    }), createElement("input", {
        type: "checkbox",
        _checked: notcheck
    }), createElement("", null, createElement("ul", null, list.map(a => createElement("li", null, "item", a))), createElement("header", {
        class: "common-header fixed noborder floating",
        id: "git-header-nav",
        _ref: temp_ref
    }, createElement("div", {
        class: "ui container"
    }, createElement("div", {
        class: "ui menu header-menu"
    }, createElement("div", {
        class: "git-nav-expand-bar"
    }, createElement("i", {
        class: "iconfont icon-mode-table"
    })), createElement("div", {
        class: "gitee-nav__sidebar"
    }, createElement("div", {
        class: "gitee-nav__sidebar-container"
    }, createElement("div", {
        class: "gitee-nav__sidebar-top"
    }, createElement("div", {
        class: "gitee-nav__avatar-box"
    }, createElement("a", {
        href: "/masx200"
    }, createElement("img", {
        alt: "1081296_masx200",
        class: "ui avatar image masx200-avatar",
        src: "https://avatar.gitee.com/uploads/96/1081296_masx200.png?1566294318"
    }))), createElement("div", {
        class: "gitee-nav__info-box"
    }, createElement("a", {
        href: "/masx200"
    }, "masx200"))), createElement("div", {
        class: "gitee-nav__sidebar-middle"
    }, createElement("div", {
        class: "gitee-nav__sidebar-list"
    }, createElement("ul", null, createElement("li", {
        class: "gitee-nav__sidebar-item"
    }, createElement("a", {
        href: "/masx200"
    }, createElement("i", {
        class: "iconfont icon-ic-dashboard"
    }), createElement("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u4e2a\u4eba\u4e3b\u9875"))), createElement("li", {
        class: "gitee-nav__sidebar-item"
    }, createElement("a", {
        href: "/explore"
    }, createElement("i", {
        class: "iconfont icon-ic-discover"
    }), createElement("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u5f00\u6e90\u8f6f\u4ef6"))), createElement("li", {
        class: "gitee-nav__sidebar-item"
    }, createElement("a", {
        href: "/gists"
    }, createElement("i", {
        class: "iconfont icon-ic-gists1"
    }), createElement("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u4ee3\u7801\u7247\u6bb5"))), createElement("li", {
        class: "gitee-nav__sidebar-item"
    }, createElement("a", {
        href: "/enterprises"
    }, createElement("i", {
        class: "iconfont icon-ic-enterprise"
    }), createElement("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u4f01\u4e1a\u7248"))), createElement("li", {
        class: "gitee-nav__sidebar-item"
    }, createElement("a", {
        href: "/education"
    }, createElement("i", {
        class: "iconfont icon-ic-education"
    }), createElement("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u9ad8\u6821\u7248"))), createElement("li", {
        class: "gitee-nav__sidebar-item split-line"
    }), createElement("li", {
        class: "gitee-nav__sidebar-item"
    }, createElement("a", {
        href: "/search"
    }, createElement("i", {
        class: "iconfont icon-ic-search"
    }), createElement("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u641c\u7d22"))), createElement("li", {
        class: "gitee-nav__sidebar-item"
    }, createElement("a", {
        href: "/help"
    }, createElement("i", {
        class: "iconfont icon-help-circle"
    }), createElement("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u5e2e\u52a9\u4e2d\u5fc3"))), createElement("li", {
        class: "gitee-nav__sidebar-item"
    }, createElement("a", {
        href: "/terms"
    }, createElement("i", {
        class: "iconfont icon-file"
    }), createElement("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u4f7f\u7528\u6761\u6b3e"))), createElement("li", {
        class: "gitee-nav__sidebar-item"
    }, createElement("a", {
        href: "/about_us"
    }, createElement("i", {
        class: "iconfont icon-issuepx"
    }), createElement("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u5173\u4e8e\u6211\u4eec"))), createElement("li", {
        class: "gitee-nav__sidebar-item"
    }, createElement("a", {
        href: "/profile"
    }, createElement("i", {
        class: "iconfont icon-edit"
    }), createElement("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u8bbe\u7f6e"))), createElement("li", {
        class: "gitee-nav__sidebar-item"
    }, createElement("a", {
        href: "/logout",
        "data-method": "delete",
        rel: "nofollow"
    }, createElement("i", {
        class: "iconfont icon-ic-logout"
    }), createElement("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u9000\u51fa")))))), createElement("div", {
        class: "gitee-nav__sidebar-bottom"
    }, createElement("div", {
        class: "gitee-nav__sidebar-close-button"
    }, createElement("i", {
        class: "fa fa-angle-double-left"
    }))))), createElement("div", {
        class: "item gitosc-logo"
    }, createElement("a", {
        href: "/"
    }, createElement("img", {
        class: "ui inline image",
        height: "28",
        src: "https://gitee.com//logo.svg?20171024",
        width: "95"
    }), createElement("img", {
        class: "ui inline black image",
        height: "28",
        src: "https://gitee.com//logo-black.svg?20171024",
        width: "95"
    }))), createElement("a", {
        href: "/explore",
        class: "item ",
        title: "\u5f00\u6e90\u8f6f\u4ef6"
    }, "\u5f00\u6e90\u8f6f\u4ef6"), createElement("a", {
        href: "/enterprises",
        class: "item ",
        title: "\u4f01\u4e1a\u7248"
    }, "\u4f01\u4e1a\u7248", createElement("sup", {
        class: "ui red label"
    }, "\u7279\u60e0")), createElement("a", {
        href: "/education",
        class: "item ",
        title: "\u9ad8\u6821\u7248"
    }, "\u9ad8\u6821\u7248"), createElement("a", {
        href: "https://blog.gitee.com/",
        class: "item",
        id: "gitee-blog",
        target: "_blank",
        title: "\u535a\u5ba2"
    }, "\u535a\u5ba2"), createElement("div", {
        class: "dropdown item ui",
        id: "my-gitee-dropdown",
        tabindex: "0"
    }, createElement("a", {
        href: "/masx200/dashboard"
    }, "\u6211\u7684\u7801\u4e91"), createElement("i", {
        class: "dropdown icon"
    }), createElement("div", {
        class: "menu transition hidden",
        tabindex: "-1"
    }, createElement("div", {
        class: "header user-projects"
    }, createElement("a", {
        href: "/masx200/projects",
        class: "pull-right",
        target: "_blank"
    }, "\u5168\u90e8"), "\u4ed3\u5e93", createElement("span", {
        class: "count"
    }, "(11)")), createElement("a", {
        target: "_blank",
        href: "/masx200/mvvm-reactive-view",
        title: "masx200/mvvm-reactive-view",
        class: "item"
    }, "masx200/mvvm-reactive-view"), createElement("a", {
        target: "_blank",
        href: "/masx200/webpack-react-vue-spa-awesome-config",
        title: "masx200/webpack-react-vue-spa-awesome-config",
        class: "item"
    }, "masx200/webpack-react-vue-spa-awesome-config"), createElement("a", {
        target: "_blank",
        href: "/masx200/custom-elements-random-define",
        title: "masx200/custom-elements-random-define",
        class: "item"
    }, "masx200/custom-elements-random-define"), createElement("a", {
        target: "_blank",
        href: "/masx200/importcjsamdumd",
        title: "masx200/importcjsamdumd",
        class: "item"
    }, "masx200/importcjsamdumd"), createElement("a", {
        target: "_blank",
        href: "/masx200/dom-element-attribute-agent-proxy",
        title: "masx200/dom-element-attribute-agent-proxy",
        class: "item"
    }, "masx200/dom-element-attribute-agent-proxy"))), createElement("div", {
        class: "center responsive-logo"
    }, createElement("a", {
        href: "/"
    }, createElement("img", {
        class: "ui inline image",
        height: "24",
        src: "https://gitee.com//logo.svg?20171024",
        width: "85"
    }), createElement("img", {
        class: "ui inline black image",
        height: "24",
        src: "https://gitee.com//logo-black.svg?20171024",
        width: "85"
    }))), createElement("div", {
        class: "right menu userbar",
        id: "git-nav-user-bar"
    }, createElement("div", {
        class: "item git-nav-search-item"
    }, createElement("form", {
        "accept-charset": "UTF-8",
        action: "/search",
        autocomplete: "on",
        "data-text-filter": "\u641c\u7d22\u683c\u5f0f\u4e0d\u6b63\u786e",
        "data-text-require": "\u641c\u7d22\u5173\u952e\u5b57\u4e0d\u80fd\u5c11\u4e8e1\u4e2a",
        id: "navbar-search-form",
        method: "get"
    }, createElement("div", {
        style: "margin:0;padding:0;display:inline"
    }, createElement("input", {
        name: "utf8",
        type: "hidden",
        value: "\u2713"
    })), createElement("div", {
        class: "ui mini fluid input"
    }, createElement("input", {
        id: "navbar-search-input",
        name: "q",
        placeholder: "\u641c\u7d22\u9879\u76ee\u3001\u4ee3\u7801\u7247\u6bb5...",
        type: "text",
        value: ""
    }), createElement("input", {
        id: "navbar-search-type",
        name: "type",
        type: "hidden"
    })))), createElement("div", {
        class: "item ui dropdown empty",
        "data-count-path": "/notifications/unread_count",
        "data-enable": "",
        "data-mark-notice-path": "/notifications/mark",
        id: "notice-dropdown",
        tabindex: "0"
    }, createElement("a", {
        href: "/notifications",
        class: "remind-button"
    }, createElement("i", {
        class: "iconfont icon-remind"
    }), createElement("div", {
        class: "notice-count total"
    }, "1")), createElement("div", {
        class: "notice-dropdown-panel menu transition hidden",
        tabindex: "-1",
        style: "left: -165px;"
    }, createElement("div", {
        class: "notice-dropdown-panel-header"
    }, createElement("div", {
        class: "tab",
        "data-data-path": "/notifications/notices?scope=referer",
        "data-html-path": "/notifications/referer",
        "data-scope": "referer"
    }, createElement("div", {
        class: "content"
    }, "@ \u6211", createElement("div", {
        class: "notice-count referer"
    }))), createElement("div", {
        class: "tab active",
        "data-data-path": "/notifications/notices?scope=infos",
        "data-html-path": "/notifications/infos",
        "data-scope": "infos"
    }, createElement("div", {
        class: "content"
    }, "\u901a\u77e5", createElement("div", {
        class: "notice-count infos"
    }, "1"))), createElement("div", {
        class: "tab",
        "data-data-path": "/notifications/notices?scope=messages",
        "data-html-path": "/notifications/messages",
        "data-scope": "messages"
    }, createElement("div", {
        class: "content"
    }, "\u79c1\u4fe1", createElement("div", {
        class: "notice-count messages"
    })))), createElement("div", {
        class: "item notice-dropdown-panel-container"
    }, createElement("div", {
        class: "ui dimmer over active"
    }, createElement("div", {
        class: "ui loader"
    })), createElement("div", {
        class: "notice-list",
        style: "min-height: auto;"
    }, createElement("a", {
        class: "noti",
        href: "/masx200/mvvm-reactive-view",
        target: "_blank",
        "data-type": "project",
        "data-id": "50555275"
    }, createElement("div", {
        class: "title"
    }, "\u4f60\u7684\u4ed3\u5e93 masx200/mvvm-reactive-view \u5df2\u7ecf\u4ece https://github.com/masx200/mvvm-reactive-view.git \u540c\u6b65\u6210\u529f"), createElement("div", {
        class: "meta"
    }, createElement("time", {
        class: "timeago"
    }, "2\u5c0f\u65f6\u524d"), " \xb7", " ", createElement("span", {
        class: "namespace"
    }, "masx200/mvvm-reactive-view")))), createElement("div", {
        class: "notice-dropdown-panel-blank"
    }, "\u6682\u6ca1\u6709\u65b0\u6d88\u606f")), createElement("div", {
        class: "notice-dropdown-panel-footer"
    }, createElement("div", {
        class: "action"
    }, createElement("div", {
        class: "side left"
    }, createElement("a", {
        href: "javascript: void(0);",
        class: "mark-notices"
    }, "\u5f53\u524d\u6807\u8bb0\u4e3a\u5df2\u8bfb")), createElement("div", {
        class: "side right"
    }, createElement("a", {
        href: "/notifications/infos",
        class: "load-all",
        target: "_blank"
    }, "\u67e5\u770b\u5168\u90e8")))))), createElement("div", {
        class: "ui dropdown link item",
        id: "git-nav-create",
        tabindex: "0"
    }, createElement("i", {
        class: "iconfont icon-add-thin"
    }), createElement("div", {
        class: "right menu",
        tabindex: "-1"
    }, createElement("a", {
        href: "/projects/new",
        class: "item"
    }, createElement("i", {
        class: "add square icon"
    }), "\u65b0\u5efa\u4ed3\u5e93"), createElement("a", {
        href: "/masx200/codes/new",
        class: "item"
    }, createElement("i", {
        class: "code icon"
    }), "\u53d1\u5e03\u4ee3\u7801\u7247\u6bb5"), createElement("a", {
        href: "/organizations/new",
        class: "item"
    }, createElement("i", {
        class: "group icon"
    }), "\u521b\u5efa\u7ec4\u7ec7"), createElement("a", {
        href: "/enterprises/new",
        class: "item"
    }, createElement("i", {
        class: "icon iconfont icon-enterprise"
    }), "\u5f00\u901a\u4f01\u4e1a\u7248"), createElement("a", {
        href: "/projects/oauth_github",
        class: "item"
    }, createElement("i", {
        class: "github icon"
    }), "\u4ece GitHub \u5bfc\u5165\u4ed3\u5e93"))), createElement("div", {
        class: "ui dropdown item",
        id: "git-nav-user",
        tabindex: "0"
    }, createElement("img", {
        alt: "1081296_masx200",
        class: "ui avatar image",
        src: "https://avatar.gitee.com/uploads/96/1081296_masx200.png!avatar30?1566294318"
    }), createElement("i", {
        class: "dropdown icon"
    }), createElement("div", {
        class: "right menu",
        tabindex: "-1"
    }, createElement("a", {
        href: "/masx200",
        class: "item"
    }, createElement("i", {
        class: "iconfont icon-ic-home"
    }), "\u4e2a\u4eba\u4e3b\u9875"), createElement("a", {
        href: "/profile",
        class: "item"
    }, createElement("div", {
        class: "mayun-icon my-ic-edit my-ic-edit-dims"
    }), "\u8bbe\u7f6e"), createElement("div", {
        class: "divider"
    }), createElement("a", {
        href: "/gists",
        class: "item"
    }, createElement("div", {
        class: "iconfont icon-ic-gist"
    }), "\u4ee3\u7801\u7247\u6bb5"), createElement("a", {
        href: "https://gitee.com/help",
        class: "item",
        target: "_blank"
    }, createElement("div", {
        class: "mayun-icon my-ic-help my-ic-help-dims"
    }), "\u5e2e\u52a9"), createElement("div", {
        class: "divider"
    }), createElement("a", {
        href: "/logout",
        class: "item destroy-user-session",
        "data-method": "delete",
        rel: "nofollow"
    }, createElement("div", {
        class: "mayun-icon my-ic-exit my-ic-exit-dims"
    }), "\u9000\u51fa"))), createElement("script", null)))))) ]);
    console.log(vdom$2, temp_ref);
    document.body.appendChild(MountElement(vdom$2, document.createElement("div")));
    console.log(createElement, createElement);
    (() => {
        (() => {
            var _class, _temp;
            var myvdom1111111 = createElement(class extends HTMLElement {
                constructor() {
                    super();
                    for (var _len = arguments.length, argwwwuments = new Array(_len), _key = 0; _key < _len; _key++) {
                        argwwwuments[_key] = arguments[_key];
                    }
                    console.log(argwwwuments);
                }
            }, {
                style: {
                    display: "block"
                }
            }, "hhhhhhhhhhhhtests");
            console.log(myvdom1111111);
            document.body.appendChild(MountElement(myvdom1111111, document.createElement("div")));
            document.body.appendChild(MountElement(createElement((() => {
                var Aaaaaaaaaa = class extends HTMLElement {};
                Aaaaaaaaaa.defaultProps = {
                    name: "HelloKitty",
                    myAge: 18
                };
                return Aaaaaaaaaa;
            })()), document.createElement("div")));
            var myele1 = createElement((_temp = _class = class extends HTMLElement {}, _defineProperty(_class, "defaultProps", {
                name: "aaaaaaaaaaHelloKitty",
                myAge: 0x71afd498cfffe
            }), _temp));
            console.log(myele1);
            document.body.appendChild(MountElement(myele1, document.createElement("div")));
            document.body.appendChild(MountElement(myele1, document.createElement("div")));
        })();
    })();
    {
        var vdom$3 = [ createElement("html", null, "testhtml"), createElement("button", {
            onclick: [ console.log, () => {
                console.log("onclick");
            } ],
            "*text": "clicktest",
            "@click": [ console.log, () => {
                console.log("@click");
            } ]
        }), createElement("style", null) ];
        document.body.appendChild(MountElement(vdom$3, document.createElement("div")));
        console.log("onclick", " @click", vdom$3);
    }
    _asyncToGenerator((function*() {
        var defaultProps = {
            cccccc: "bbbbbbb"
        };
        var css = yield (yield fetch("https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-6556dfa9be535e551ffffaadfecdad99.min.css")).text();
        var Hellowordclass = createComponent(Object.assign(() => {
            return createElement("div", undefined, "hello world");
        }, {
            css: css,
            defaultProps: defaultProps
        }));
        document.body.appendChild(MountElement(createElement(Hellowordclass), document.createElement("div")));
    }))();
    (() => {
        var colortext = createstate("red");
        var stylestate = createstate({
            display: "block",
            width: "100%",
            color: colortext
        });
        var vdom = [ createElement("hr", null), createElement("h1", {
            style: stylestate
        }, "input color ", colortext), createElement("input", {
            _value: colortext
        }), createElement("hr", null) ];
        console.log([ vdom, colortext, stylestate ]);
        watch([ colortext, stylestate ], (a, b) => console.log([ a, b ].map(a => a.valueOf())));
        document.body.appendChild(MountElement(vdom, document.createElement("div")));
    })();
    console.log(createElement, createElement);
    var number = createstate(10);
    function increment() {
        number.value++;
    }
    function decrement() {
        number.value--;
    }
    var store = {
        number: number,
        increment: increment,
        decrement: decrement
    };
    var mycomappclass = createComponent(() => {
        var vdom = createElement("div", null, createElement("h3", null, " \u70b9\u51fb\u6570\u5b57"), createElement("h2", null, "number:", store.number), createElement("button", {
            onclick: store.increment
        }, "increment"), createElement("button", {
            onclick: store.decrement
        }, "decrement"));
        return vdom;
    });
    var vdom$4 = [ createElement(mycomappclass), createElement(mycomappclass), createElement(mycomappclass) ];
    document.body.appendChild(MountElement(vdom$4, document.createElement("div")));
})();
//# sourceMappingURL=output-es2015.js.map
