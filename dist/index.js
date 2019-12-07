const globalThis = Function("return this")();

const self = globalThis;

const window = globalThis;

const global = globalThis;

const {WeakSet: WeakSet, WeakMap: WeakMap, Date: Date, RegExp: RegExp, Event: Event, CustomEvent: CustomEvent, requestAnimationFrame: requestAnimationFrame, URL: URL, Blob: Blob, Element: Element, Node: Node, String: String, Array: Array, document: document, Object: Object, Reflect: Reflect, Proxy: Proxy, Symbol: Symbol, Boolean: Boolean, Promise: Promise, Set: Set, Math: Math, Error: Error, TypeError: TypeError, EventTarget: EventTarget, JSON: JSON, Map: Map, clearTimeout: clearTimeout, setTimeout: setTimeout, parseInt: parseInt, Number: Number} = globalThis;

const privateData = new WeakMap;

const wrappers = new WeakMap;

function pd(event) {
    const retv = privateData.get(event);
    console.assert(retv != null, "'this' is expected an Event object, but got", event);
    return retv;
}

function setCancelFlag(data) {
    if (data.passiveListener != null) {
        if (typeof console !== "undefined" && typeof console.error === "function") {
            console.error("Unable to preventDefault inside passive event listener invocation.", data.passiveListener);
        }
        return;
    }
    if (!data.event.cancelable) {
        return;
    }
    data.canceled = true;
    if (typeof data.event.preventDefault === "function") {
        data.event.preventDefault();
    }
}

function Event$1(eventTarget, event) {
    privateData.set(this, {
        eventTarget: eventTarget,
        event: event,
        eventPhase: 2,
        currentTarget: eventTarget,
        canceled: false,
        stopped: false,
        immediateStopped: false,
        passiveListener: null,
        timeStamp: event.timeStamp || Date.now()
    });
    Object.defineProperty(this, "isTrusted", {
        value: false,
        enumerable: true
    });
    const keys = Object.keys(event);
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (!(key in this)) {
            Object.defineProperty(this, key, defineRedirectDescriptor(key));
        }
    }
}

Event$1.prototype = {
    get type() {
        return pd(this).event.type;
    },
    get target() {
        return pd(this).eventTarget;
    },
    get currentTarget() {
        return pd(this).currentTarget;
    },
    composedPath() {
        const currentTarget = pd(this).currentTarget;
        if (currentTarget == null) {
            return [];
        }
        return [ currentTarget ];
    },
    get NONE() {
        return 0;
    },
    get CAPTURING_PHASE() {
        return 1;
    },
    get AT_TARGET() {
        return 2;
    },
    get BUBBLING_PHASE() {
        return 3;
    },
    get eventPhase() {
        return pd(this).eventPhase;
    },
    stopPropagation() {
        const data = pd(this);
        data.stopped = true;
        if (typeof data.event.stopPropagation === "function") {
            data.event.stopPropagation();
        }
    },
    stopImmediatePropagation() {
        const data = pd(this);
        data.stopped = true;
        data.immediateStopped = true;
        if (typeof data.event.stopImmediatePropagation === "function") {
            data.event.stopImmediatePropagation();
        }
    },
    get bubbles() {
        return Boolean(pd(this).event.bubbles);
    },
    get cancelable() {
        return Boolean(pd(this).event.cancelable);
    },
    preventDefault() {
        setCancelFlag(pd(this));
    },
    get defaultPrevented() {
        return pd(this).canceled;
    },
    get composed() {
        return Boolean(pd(this).event.composed);
    },
    get timeStamp() {
        return pd(this).timeStamp;
    },
    get srcElement() {
        return pd(this).eventTarget;
    },
    get cancelBubble() {
        return pd(this).stopped;
    },
    set cancelBubble(value) {
        if (!value) {
            return;
        }
        const data = pd(this);
        data.stopped = true;
        if (typeof data.event.cancelBubble === "boolean") {
            data.event.cancelBubble = true;
        }
    },
    get returnValue() {
        return !pd(this).canceled;
    },
    set returnValue(value) {
        if (!value) {
            setCancelFlag(pd(this));
        }
    },
    initEvent() {}
};

Object.defineProperty(Event$1.prototype, "constructor", {
    value: Event$1,
    configurable: true,
    writable: true
});

if (typeof window !== "undefined" && typeof window.Event !== "undefined") {
    Object.setPrototypeOf(Event$1.prototype, window.Event.prototype);
    wrappers.set(window.Event.prototype, Event$1);
}

function defineRedirectDescriptor(key) {
    return {
        get() {
            return pd(this).event[key];
        },
        set(value) {
            pd(this).event[key] = value;
        },
        configurable: true,
        enumerable: true
    };
}

function defineCallDescriptor(key) {
    return {
        value() {
            const event = pd(this).event;
            return event[key].apply(event, arguments);
        },
        configurable: true,
        enumerable: true
    };
}

function defineWrapper(BaseEvent, proto) {
    const keys = Object.keys(proto);
    if (keys.length === 0) {
        return BaseEvent;
    }
    function CustomEvent(eventTarget, event) {
        BaseEvent.call(this, eventTarget, event);
    }
    CustomEvent.prototype = Object.create(BaseEvent.prototype, {
        constructor: {
            value: CustomEvent,
            configurable: true,
            writable: true
        }
    });
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (!(key in BaseEvent.prototype)) {
            const descriptor = Object.getOwnPropertyDescriptor(proto, key);
            const isFunc = typeof descriptor.value === "function";
            Object.defineProperty(CustomEvent.prototype, key, isFunc ? defineCallDescriptor(key) : defineRedirectDescriptor(key));
        }
    }
    return CustomEvent;
}

function getWrapper(proto) {
    if (proto == null || proto === Object.prototype) {
        return Event$1;
    }
    let wrapper = wrappers.get(proto);
    if (wrapper == null) {
        wrapper = defineWrapper(getWrapper(Object.getPrototypeOf(proto)), proto);
        wrappers.set(proto, wrapper);
    }
    return wrapper;
}

function wrapEvent(eventTarget, event) {
    const Wrapper = getWrapper(Object.getPrototypeOf(event));
    return new Wrapper(eventTarget, event);
}

function isStopped(event) {
    return pd(event).immediateStopped;
}

function setEventPhase(event, eventPhase) {
    pd(event).eventPhase = eventPhase;
}

function setCurrentTarget(event, currentTarget) {
    pd(event).currentTarget = currentTarget;
}

function setPassiveListener(event, passiveListener) {
    pd(event).passiveListener = passiveListener;
}

const listenersMap = new WeakMap;

const CAPTURE = 1;

const BUBBLE = 2;

const ATTRIBUTE = 3;

function isObject(x) {
    return x !== null && typeof x === "object";
}

function getListeners(eventTarget) {
    const listeners = listenersMap.get(eventTarget);
    if (listeners == null) {
        throw new TypeError("'this' is expected an EventTarget object, but got another value.");
    }
    return listeners;
}

function defineEventAttributeDescriptor(eventName) {
    return {
        get() {
            const listeners = getListeners(this);
            let node = listeners.get(eventName);
            while (node != null) {
                if (node.listenerType === ATTRIBUTE) {
                    return node.listener;
                }
                node = node.next;
            }
            return null;
        },
        set(listener) {
            if (typeof listener !== "function" && !isObject(listener)) {
                listener = null;
            }
            const listeners = getListeners(this);
            let prev = null;
            let node = listeners.get(eventName);
            while (node != null) {
                if (node.listenerType === ATTRIBUTE) {
                    if (prev !== null) {
                        prev.next = node.next;
                    } else if (node.next !== null) {
                        listeners.set(eventName, node.next);
                    } else {
                        listeners.delete(eventName);
                    }
                } else {
                    prev = node;
                }
                node = node.next;
            }
            if (listener !== null) {
                const newNode = {
                    listener: listener,
                    listenerType: ATTRIBUTE,
                    passive: false,
                    once: false,
                    next: null
                };
                if (prev === null) {
                    listeners.set(eventName, newNode);
                } else {
                    prev.next = newNode;
                }
            }
        },
        configurable: true,
        enumerable: true
    };
}

function defineEventAttribute(eventTargetPrototype, eventName) {
    Object.defineProperty(eventTargetPrototype, `on${eventName}`, defineEventAttributeDescriptor(eventName));
}

function defineCustomEventTarget(eventNames) {
    function CustomEventTarget() {
        EventTarget$1.call(this);
    }
    CustomEventTarget.prototype = Object.create(EventTarget$1.prototype, {
        constructor: {
            value: CustomEventTarget,
            configurable: true,
            writable: true
        }
    });
    for (let i = 0; i < eventNames.length; ++i) {
        defineEventAttribute(CustomEventTarget.prototype, eventNames[i]);
    }
    return CustomEventTarget;
}

function EventTarget$1() {
    if (this instanceof EventTarget$1) {
        listenersMap.set(this, new Map);
        return;
    }
    if (arguments.length === 1 && Array.isArray(arguments[0])) {
        return defineCustomEventTarget(arguments[0]);
    }
    if (arguments.length > 0) {
        const types = new Array(arguments.length);
        for (let i = 0; i < arguments.length; ++i) {
            types[i] = arguments[i];
        }
        return defineCustomEventTarget(types);
    }
    throw new TypeError("Cannot call a class as a function");
}

EventTarget$1.prototype = {
    addEventListener(eventName, listener, options) {
        if (listener == null) {
            return;
        }
        if (typeof listener !== "function" && !isObject(listener)) {
            throw new TypeError("'listener' should be a function or an object.");
        }
        const listeners = getListeners(this);
        const optionsIsObj = isObject(options);
        const capture = optionsIsObj ? Boolean(options.capture) : Boolean(options);
        const listenerType = capture ? CAPTURE : BUBBLE;
        const newNode = {
            listener: listener,
            listenerType: listenerType,
            passive: optionsIsObj && Boolean(options.passive),
            once: optionsIsObj && Boolean(options.once),
            next: null
        };
        let node = listeners.get(eventName);
        if (node === undefined) {
            listeners.set(eventName, newNode);
            return;
        }
        let prev = null;
        while (node != null) {
            if (node.listener === listener && node.listenerType === listenerType) {
                return;
            }
            prev = node;
            node = node.next;
        }
        prev.next = newNode;
    },
    removeEventListener(eventName, listener, options) {
        if (listener == null) {
            return;
        }
        const listeners = getListeners(this);
        const capture = isObject(options) ? Boolean(options.capture) : Boolean(options);
        const listenerType = capture ? CAPTURE : BUBBLE;
        let prev = null;
        let node = listeners.get(eventName);
        while (node != null) {
            if (node.listener === listener && node.listenerType === listenerType) {
                if (prev !== null) {
                    prev.next = node.next;
                } else if (node.next !== null) {
                    listeners.set(eventName, node.next);
                } else {
                    listeners.delete(eventName);
                }
                return;
            }
            prev = node;
            node = node.next;
        }
    },
    dispatchEvent(event) {
        if (event == null || typeof event.type !== "string") {
            throw new TypeError('"event.type" should be a string.');
        }
        const listeners = getListeners(this);
        const eventName = event.type;
        let node = listeners.get(eventName);
        if (node == null) {
            return true;
        }
        const wrappedEvent = wrapEvent(this, event);
        let prev = null;
        while (node != null) {
            if (node.once) {
                if (prev !== null) {
                    prev.next = node.next;
                } else if (node.next !== null) {
                    listeners.set(eventName, node.next);
                } else {
                    listeners.delete(eventName);
                }
            } else {
                prev = node;
            }
            setPassiveListener(wrappedEvent, node.passive ? node.listener : null);
            if (typeof node.listener === "function") {
                try {
                    node.listener.call(this, wrappedEvent);
                } catch (err) {
                    if (typeof console !== "undefined" && typeof console.error === "function") {
                        console.error(err);
                    }
                }
            } else if (node.listenerType !== ATTRIBUTE && typeof node.listener.handleEvent === "function") {
                node.listener.handleEvent(wrappedEvent);
            }
            if (isStopped(wrappedEvent)) {
                break;
            }
            node = node.next;
        }
        setPassiveListener(wrappedEvent, null);
        setEventPhase(wrappedEvent, 0);
        setCurrentTarget(wrappedEvent, null);
        return !wrappedEvent.defaultPrevented;
    }
};

Object.defineProperty(EventTarget$1.prototype, "constructor", {
    value: EventTarget$1,
    configurable: true,
    writable: true
});

if (typeof window !== "undefined" && typeof window.EventTarget !== "undefined") {
    Object.setPrototypeOf(EventTarget$1.prototype, window.EventTarget.prototype);
}

(() => {
    try {
        new EventTarget;
    } catch (e) {
        window.EventTarget = undefined;
    }
    (() => {
        if ("function" != typeof window.EventTarget) {
            window.EventTarget = EventTarget$1;
        }
    })();
})();

(() => {
    if ("object" != typeof window.customElements || typeof window.CustomElementRegistry !== "function") {
        (function() {
            var aa = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));
            function g(a) {
                var b = aa.has(a);
                a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);
                return !b && a;
            }
            function l(a) {
                var b = a.isConnected;
                if (void 0 !== b) return b;
                for (;a && !(a.__CE_isImportDocument || a instanceof Document); ) a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
                return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
            }
            function n(a, b) {
                for (;b && b !== a && !b.nextSibling; ) b = b.parentNode;
                return b && b !== a ? b.nextSibling : null;
            }
            function p(a, b, d) {
                d = void 0 === d ? new Set : d;
                for (var c = a; c; ) {
                    if (c.nodeType === Node.ELEMENT_NODE) {
                        var e = c;
                        b(e);
                        var f = e.localName;
                        if ("link" === f && "import" === e.getAttribute("rel")) {
                            c = e.import;
                            if (c instanceof Node && !d.has(c)) for (d.add(c), c = c.firstChild; c; c = c.nextSibling) p(c, b, d);
                            c = n(a, e);
                            continue;
                        } else if ("template" === f) {
                            c = n(a, e);
                            continue;
                        }
                        if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) p(e, b, d);
                    }
                    c = c.firstChild ? c.firstChild : n(a, c);
                }
            }
            function r(a, b, d) {
                a[b] = d;
            }
            function u() {
                this.a = new Map;
                this.g = new Map;
                this.c = [];
                this.f = [];
                this.b = !1;
            }
            function ba(a, b, d) {
                a.a.set(b, d);
                a.g.set(d.constructorFunction, d);
            }
            function ca(a, b) {
                a.b = !0;
                a.c.push(b);
            }
            function da(a, b) {
                a.b = !0;
                a.f.push(b);
            }
            function v(a, b) {
                a.b && p(b, (function(b) {
                    return w(a, b);
                }));
            }
            function w(a, b) {
                if (a.b && !b.__CE_patched) {
                    b.__CE_patched = !0;
                    for (var d = 0; d < a.c.length; d++) a.c[d](b);
                    for (d = 0; d < a.f.length; d++) a.f[d](b);
                }
            }
            function x(a, b) {
                var d = [];
                p(b, (function(b) {
                    return d.push(b);
                }));
                for (b = 0; b < d.length; b++) {
                    var c = d[b];
                    1 === c.__CE_state ? a.connectedCallback(c) : y(a, c);
                }
            }
            function z(a, b) {
                var d = [];
                p(b, (function(b) {
                    return d.push(b);
                }));
                for (b = 0; b < d.length; b++) {
                    var c = d[b];
                    1 === c.__CE_state && a.disconnectedCallback(c);
                }
            }
            function A(a, b, d) {
                d = void 0 === d ? {} : d;
                var c = d.u || new Set, e = d.i || function(b) {
                    return y(a, b);
                }, f = [];
                p(b, (function(b) {
                    if ("link" === b.localName && "import" === b.getAttribute("rel")) {
                        var d = b.import;
                        d instanceof Node && (d.__CE_isImportDocument = !0, d.__CE_hasRegistry = !0);
                        d && "complete" === d.readyState ? d.__CE_documentLoadHandled = !0 : b.addEventListener("load", (function() {
                            var d = b.import;
                            if (!d.__CE_documentLoadHandled) {
                                d.__CE_documentLoadHandled = !0;
                                var f = new Set(c);
                                f.delete(d);
                                A(a, d, {
                                    u: f,
                                    i: e
                                });
                            }
                        }));
                    } else f.push(b);
                }), c);
                if (a.b) for (b = 0; b < f.length; b++) w(a, f[b]);
                for (b = 0; b < f.length; b++) e(f[b]);
            }
            function y(a, b) {
                if (void 0 === b.__CE_state) {
                    var d = b.ownerDocument;
                    if (d.defaultView || d.__CE_isImportDocument && d.__CE_hasRegistry) if (d = a.a.get(b.localName)) {
                        d.constructionStack.push(b);
                        var c = d.constructorFunction;
                        try {
                            try {
                                if (new c !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
                            } finally {
                                d.constructionStack.pop();
                            }
                        } catch (t) {
                            throw b.__CE_state = 2, t;
                        }
                        b.__CE_state = 1;
                        b.__CE_definition = d;
                        if (d.attributeChangedCallback) for (d = d.observedAttributes, c = 0; c < d.length; c++) {
                            var e = d[c], f = b.getAttribute(e);
                            null !== f && a.attributeChangedCallback(b, e, null, f, null);
                        }
                        l(b) && a.connectedCallback(b);
                    }
                }
            }
            u.prototype.connectedCallback = function(a) {
                var b = a.__CE_definition;
                b.connectedCallback && b.connectedCallback.call(a);
            };
            u.prototype.disconnectedCallback = function(a) {
                var b = a.__CE_definition;
                b.disconnectedCallback && b.disconnectedCallback.call(a);
            };
            u.prototype.attributeChangedCallback = function(a, b, d, c, e) {
                var f = a.__CE_definition;
                f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(b) && f.attributeChangedCallback.call(a, b, d, c, e);
            };
            function B(a) {
                var b = document;
                this.c = a;
                this.a = b;
                this.b = void 0;
                A(this.c, this.a);
                "loading" === this.a.readyState && (this.b = new MutationObserver(this.f.bind(this)), 
                this.b.observe(this.a, {
                    childList: !0,
                    subtree: !0
                }));
            }
            function C(a) {
                a.b && a.b.disconnect();
            }
            B.prototype.f = function(a) {
                var b = this.a.readyState;
                "interactive" !== b && "complete" !== b || C(this);
                for (b = 0; b < a.length; b++) for (var d = a[b].addedNodes, c = 0; c < d.length; c++) A(this.c, d[c]);
            };
            function ea() {
                var a = this;
                this.b = this.a = void 0;
                this.c = new Promise((function(b) {
                    a.b = b;
                    a.a && b(a.a);
                }));
            }
            function D(a) {
                if (a.a) throw Error("Already resolved.");
                a.a = void 0;
                a.b && a.b(void 0);
            }
            function E(a) {
                this.c = !1;
                this.a = a;
                this.j = new Map;
                this.f = function(b) {
                    return b();
                };
                this.b = !1;
                this.g = [];
                this.o = new B(a);
            }
            E.prototype.l = function(a, b) {
                var d = this;
                if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
                if (!g(a)) throw new SyntaxError("The element name '" + a + "' is not valid.");
                if (this.a.a.get(a)) throw Error("A custom element with name '" + a + "' has already been defined.");
                if (this.c) throw Error("A custom element is already being defined.");
                this.c = !0;
                try {
                    var c = function(b) {
                        var a = e[b];
                        if (void 0 !== a && !(a instanceof Function)) throw Error("The '" + b + "' callback must be a function.");
                        return a;
                    }, e = b.prototype;
                    if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");
                    var f = c("connectedCallback");
                    var t = c("disconnectedCallback");
                    var k = c("adoptedCallback");
                    var h = c("attributeChangedCallback");
                    var m = b.observedAttributes || [];
                } catch (q) {
                    return;
                } finally {
                    this.c = !1;
                }
                b = {
                    localName: a,
                    constructorFunction: b,
                    connectedCallback: f,
                    disconnectedCallback: t,
                    adoptedCallback: k,
                    attributeChangedCallback: h,
                    observedAttributes: m,
                    constructionStack: []
                };
                ba(this.a, a, b);
                this.g.push(b);
                this.b || (this.b = !0, this.f((function() {
                    return fa(d);
                })));
            };
            E.prototype.i = function(a) {
                A(this.a, a);
            };
            function fa(a) {
                if (!1 !== a.b) {
                    a.b = !1;
                    for (var b = a.g, d = [], c = new Map, e = 0; e < b.length; e++) c.set(b[e].localName, []);
                    A(a.a, document, {
                        i: function(b) {
                            if (void 0 === b.__CE_state) {
                                var e = b.localName, f = c.get(e);
                                f ? f.push(b) : a.a.a.get(e) && d.push(b);
                            }
                        }
                    });
                    for (e = 0; e < d.length; e++) y(a.a, d[e]);
                    for (;0 < b.length; ) {
                        var f = b.shift();
                        e = f.localName;
                        f = c.get(f.localName);
                        for (var t = 0; t < f.length; t++) y(a.a, f[t]);
                        (e = a.j.get(e)) && D(e);
                    }
                }
            }
            E.prototype.get = function(a) {
                if (a = this.a.a.get(a)) return a.constructorFunction;
            };
            E.prototype.m = function(a) {
                if (!g(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));
                var b = this.j.get(a);
                if (b) return b.c;
                b = new ea;
                this.j.set(a, b);
                this.a.a.get(a) && !this.g.some((function(b) {
                    return b.localName === a;
                })) && D(b);
                return b.c;
            };
            E.prototype.s = function(a) {
                C(this.o);
                var b = this.f;
                this.f = function(d) {
                    return a((function() {
                        return b(d);
                    }));
                };
            };
            window.CustomElementRegistry = E;
            E.prototype.define = E.prototype.l;
            E.prototype.upgrade = E.prototype.i;
            E.prototype.get = E.prototype.get;
            E.prototype.whenDefined = E.prototype.m;
            E.prototype.polyfillWrapFlushCallback = E.prototype.s;
            var F = window.Document.prototype.createElement, G = window.Document.prototype.createElementNS, ha = window.Document.prototype.importNode, ia = window.Document.prototype.prepend, ja = window.Document.prototype.append, ka = window.DocumentFragment.prototype.prepend, la = window.DocumentFragment.prototype.append, H = window.Node.prototype.cloneNode, I = window.Node.prototype.appendChild, J = window.Node.prototype.insertBefore, K = window.Node.prototype.removeChild, L = window.Node.prototype.replaceChild, M = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"), N = window.Element.prototype.attachShadow, O = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"), P = window.Element.prototype.getAttribute, Q = window.Element.prototype.setAttribute, R = window.Element.prototype.removeAttribute, S = window.Element.prototype.getAttributeNS, T = window.Element.prototype.setAttributeNS, U = window.Element.prototype.removeAttributeNS, ma = window.Element.prototype.insertAdjacentElement, na = window.Element.prototype.insertAdjacentHTML, oa = window.Element.prototype.prepend, pa = window.Element.prototype.append, V = window.Element.prototype.before, qa = window.Element.prototype.after, ra = window.Element.prototype.replaceWith, sa = window.Element.prototype.remove, ta = window.HTMLElement, W = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"), ua = window.HTMLElement.prototype.insertAdjacentElement, va = window.HTMLElement.prototype.insertAdjacentHTML;
            var wa = new function() {};
            function xa() {
                var a = X;
                window.HTMLElement = function() {
                    function b() {
                        var b = this.constructor, c = a.g.get(b);
                        if (!c) throw Error("The custom element being constructed was not registered with `customElements`.");
                        var e = c.constructionStack;
                        if (0 === e.length) return e = F.call(document, c.localName), Object.setPrototypeOf(e, b.prototype), 
                        e.__CE_state = 1, e.__CE_definition = c, w(a, e), e;
                        c = e.length - 1;
                        var f = e[c];
                        if (f === wa) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
                        e[c] = wa;
                        Object.setPrototypeOf(f, b.prototype);
                        w(a, f);
                        return f;
                    }
                    b.prototype = ta.prototype;
                    Object.defineProperty(b.prototype, "constructor", {
                        writable: !0,
                        configurable: !0,
                        enumerable: !1,
                        value: b
                    });
                    return b;
                }();
            }
            function Y(a, b, d) {
                function c(b) {
                    return function(d) {
                        for (var e = [], c = 0; c < arguments.length; ++c) e[c] = arguments[c];
                        c = [];
                        for (var f = [], m = 0; m < e.length; m++) {
                            var q = e[m];
                            q instanceof Element && l(q) && f.push(q);
                            if (q instanceof DocumentFragment) for (q = q.firstChild; q; q = q.nextSibling) c.push(q); else c.push(q);
                        }
                        b.apply(this, e);
                        for (e = 0; e < f.length; e++) z(a, f[e]);
                        if (l(this)) for (e = 0; e < c.length; e++) f = c[e], f instanceof Element && x(a, f);
                    };
                }
                void 0 !== d.h && (b.prepend = c(d.h));
                void 0 !== d.append && (b.append = c(d.append));
            }
            function ya() {
                var a = X;
                r(Document.prototype, "createElement", (function(b) {
                    if (this.__CE_hasRegistry) {
                        var d = a.a.get(b);
                        if (d) return new d.constructorFunction;
                    }
                    b = F.call(this, b);
                    w(a, b);
                    return b;
                }));
                r(Document.prototype, "importNode", (function(b, d) {
                    b = ha.call(this, b, !!d);
                    this.__CE_hasRegistry ? A(a, b) : v(a, b);
                    return b;
                }));
                r(Document.prototype, "createElementNS", (function(b, d) {
                    if (this.__CE_hasRegistry && (null === b || "http://www.w3.org/1999/xhtml" === b)) {
                        var c = a.a.get(d);
                        if (c) return new c.constructorFunction;
                    }
                    b = G.call(this, b, d);
                    w(a, b);
                    return b;
                }));
                Y(a, Document.prototype, {
                    h: ia,
                    append: ja
                });
            }
            function za() {
                function a(a, c) {
                    Object.defineProperty(a, "textContent", {
                        enumerable: c.enumerable,
                        configurable: !0,
                        get: c.get,
                        set: function(a) {
                            if (this.nodeType === Node.TEXT_NODE) c.set.call(this, a); else {
                                var d = void 0;
                                if (this.firstChild) {
                                    var e = this.childNodes, k = e.length;
                                    if (0 < k && l(this)) {
                                        d = Array(k);
                                        for (var h = 0; h < k; h++) d[h] = e[h];
                                    }
                                }
                                c.set.call(this, a);
                                if (d) for (a = 0; a < d.length; a++) z(b, d[a]);
                            }
                        }
                    });
                }
                var b = X;
                r(Node.prototype, "insertBefore", (function(a, c) {
                    if (a instanceof DocumentFragment) {
                        var e = Array.prototype.slice.apply(a.childNodes);
                        a = J.call(this, a, c);
                        if (l(this)) for (c = 0; c < e.length; c++) x(b, e[c]);
                        return a;
                    }
                    e = l(a);
                    c = J.call(this, a, c);
                    e && z(b, a);
                    l(this) && x(b, a);
                    return c;
                }));
                r(Node.prototype, "appendChild", (function(a) {
                    if (a instanceof DocumentFragment) {
                        var c = Array.prototype.slice.apply(a.childNodes);
                        a = I.call(this, a);
                        if (l(this)) for (var e = 0; e < c.length; e++) x(b, c[e]);
                        return a;
                    }
                    c = l(a);
                    e = I.call(this, a);
                    c && z(b, a);
                    l(this) && x(b, a);
                    return e;
                }));
                r(Node.prototype, "cloneNode", (function(a) {
                    a = H.call(this, !!a);
                    this.ownerDocument.__CE_hasRegistry ? A(b, a) : v(b, a);
                    return a;
                }));
                r(Node.prototype, "removeChild", (function(a) {
                    var c = l(a), e = K.call(this, a);
                    c && z(b, a);
                    return e;
                }));
                r(Node.prototype, "replaceChild", (function(a, c) {
                    if (a instanceof DocumentFragment) {
                        var e = Array.prototype.slice.apply(a.childNodes);
                        a = L.call(this, a, c);
                        if (l(this)) for (z(b, c), c = 0; c < e.length; c++) x(b, e[c]);
                        return a;
                    }
                    e = l(a);
                    var f = L.call(this, a, c), d = l(this);
                    d && z(b, c);
                    e && z(b, a);
                    d && x(b, a);
                    return f;
                }));
                M && M.get ? a(Node.prototype, M) : ca(b, (function(b) {
                    a(b, {
                        enumerable: !0,
                        configurable: !0,
                        get: function() {
                            for (var a = [], b = 0; b < this.childNodes.length; b++) {
                                var f = this.childNodes[b];
                                f.nodeType !== Node.COMMENT_NODE && a.push(f.textContent);
                            }
                            return a.join("");
                        },
                        set: function(a) {
                            for (;this.firstChild; ) K.call(this, this.firstChild);
                            null != a && "" !== a && I.call(this, document.createTextNode(a));
                        }
                    });
                }));
            }
            function Aa(a) {
                function b(b) {
                    return function(e) {
                        for (var c = [], d = 0; d < arguments.length; ++d) c[d] = arguments[d];
                        d = [];
                        for (var k = [], h = 0; h < c.length; h++) {
                            var m = c[h];
                            m instanceof Element && l(m) && k.push(m);
                            if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) d.push(m); else d.push(m);
                        }
                        b.apply(this, c);
                        for (c = 0; c < k.length; c++) z(a, k[c]);
                        if (l(this)) for (c = 0; c < d.length; c++) k = d[c], k instanceof Element && x(a, k);
                    };
                }
                var d = Element.prototype;
                void 0 !== V && (d.before = b(V));
                void 0 !== V && (d.after = b(qa));
                void 0 !== ra && r(d, "replaceWith", (function(b) {
                    for (var e = [], c = 0; c < arguments.length; ++c) e[c] = arguments[c];
                    c = [];
                    for (var d = [], k = 0; k < e.length; k++) {
                        var h = e[k];
                        h instanceof Element && l(h) && d.push(h);
                        if (h instanceof DocumentFragment) for (h = h.firstChild; h; h = h.nextSibling) c.push(h); else c.push(h);
                    }
                    k = l(this);
                    ra.apply(this, e);
                    for (e = 0; e < d.length; e++) z(a, d[e]);
                    if (k) for (z(a, this), e = 0; e < c.length; e++) d = c[e], d instanceof Element && x(a, d);
                }));
                void 0 !== sa && r(d, "remove", (function() {
                    var b = l(this);
                    sa.call(this);
                    b && z(a, this);
                }));
            }
            function Ba() {
                function a(a, b) {
                    Object.defineProperty(a, "innerHTML", {
                        enumerable: b.enumerable,
                        configurable: !0,
                        get: b.get,
                        set: function(a) {
                            var e = this, d = void 0;
                            l(this) && (d = [], p(this, (function(a) {
                                a !== e && d.push(a);
                            })));
                            b.set.call(this, a);
                            if (d) for (var f = 0; f < d.length; f++) {
                                var t = d[f];
                                1 === t.__CE_state && c.disconnectedCallback(t);
                            }
                            this.ownerDocument.__CE_hasRegistry ? A(c, this) : v(c, this);
                            return a;
                        }
                    });
                }
                function b(a, b) {
                    r(a, "insertAdjacentElement", (function(a, e) {
                        var d = l(e);
                        a = b.call(this, a, e);
                        d && z(c, e);
                        l(a) && x(c, e);
                        return a;
                    }));
                }
                function d(a, b) {
                    function e(a, b) {
                        for (var e = []; a !== b; a = a.nextSibling) e.push(a);
                        for (b = 0; b < e.length; b++) A(c, e[b]);
                    }
                    r(a, "insertAdjacentHTML", (function(a, c) {
                        a = a.toLowerCase();
                        if ("beforebegin" === a) {
                            var d = this.previousSibling;
                            b.call(this, a, c);
                            e(d || this.parentNode.firstChild, this);
                        } else if ("afterbegin" === a) d = this.firstChild, b.call(this, a, c), e(this.firstChild, d); else if ("beforeend" === a) d = this.lastChild, 
                        b.call(this, a, c), e(d || this.firstChild, null); else if ("afterend" === a) d = this.nextSibling, 
                        b.call(this, a, c), e(this.nextSibling, d); else throw new SyntaxError("The value provided (" + String(a) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
                    }));
                }
                var c = X;
                N && r(Element.prototype, "attachShadow", (function(a) {
                    a = N.call(this, a);
                    var b = c;
                    if (b.b && !a.__CE_patched) {
                        a.__CE_patched = !0;
                        for (var e = 0; e < b.c.length; e++) b.c[e](a);
                    }
                    return this.__CE_shadowRoot = a;
                }));
                O && O.get ? a(Element.prototype, O) : W && W.get ? a(HTMLElement.prototype, W) : da(c, (function(b) {
                    a(b, {
                        enumerable: !0,
                        configurable: !0,
                        get: function() {
                            return H.call(this, !0).innerHTML;
                        },
                        set: function(a) {
                            var b = "template" === this.localName, c = b ? this.content : this, e = G.call(document, this.namespaceURI, this.localName);
                            for (e.innerHTML = a; 0 < c.childNodes.length; ) K.call(c, c.childNodes[0]);
                            for (a = b ? e.content : e; 0 < a.childNodes.length; ) I.call(c, a.childNodes[0]);
                        }
                    });
                }));
                r(Element.prototype, "setAttribute", (function(a, b) {
                    if (1 !== this.__CE_state) return Q.call(this, a, b);
                    var e = P.call(this, a);
                    Q.call(this, a, b);
                    b = P.call(this, a);
                    c.attributeChangedCallback(this, a, e, b, null);
                }));
                r(Element.prototype, "setAttributeNS", (function(a, b, d) {
                    if (1 !== this.__CE_state) return T.call(this, a, b, d);
                    var e = S.call(this, a, b);
                    T.call(this, a, b, d);
                    d = S.call(this, a, b);
                    c.attributeChangedCallback(this, b, e, d, a);
                }));
                r(Element.prototype, "removeAttribute", (function(a) {
                    if (1 !== this.__CE_state) return R.call(this, a);
                    var b = P.call(this, a);
                    R.call(this, a);
                    null !== b && c.attributeChangedCallback(this, a, b, null, null);
                }));
                r(Element.prototype, "removeAttributeNS", (function(a, b) {
                    if (1 !== this.__CE_state) return U.call(this, a, b);
                    var d = S.call(this, a, b);
                    U.call(this, a, b);
                    var e = S.call(this, a, b);
                    d !== e && c.attributeChangedCallback(this, b, d, e, a);
                }));
                ua ? b(HTMLElement.prototype, ua) : ma ? b(Element.prototype, ma) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");
                va ? d(HTMLElement.prototype, va) : na ? d(Element.prototype, na) : console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");
                Y(c, Element.prototype, {
                    h: oa,
                    append: pa
                });
                Aa(c);
            }
            var Z = window.customElements;
            if (!Z || Z.forcePolyfill || "function" != typeof Z.define || "function" != typeof Z.get) {
                var X = new u;
                xa();
                ya();
                Y(X, DocumentFragment.prototype, {
                    h: ka,
                    append: la
                });
                za();
                Ba();
                document.__CE_hasRegistry = !0;
                var customElements = new E(X);
                Object.defineProperty(window, "customElements", {
                    configurable: !0,
                    enumerable: !0,
                    value: customElements
                });
            }
        }).call(self);
        window.CustomElementRegistry = Reflect.get(Reflect.getPrototypeOf(window.customElements), "constructor");
    }
})();

(() => {
    function flattenDeep(arr1) {
        return arr1.reduce((acc, val) => acc.concat(Array.isArray(val) ? flattenDeep(val) : val), []);
    }
    function arrayflat(depth = 1) {
        if (depth <= 1) {
            return this.reduce((acc, val) => acc.concat(val), []);
        } else if (depth > 10) {
            return flattenDeep(this);
        } else {
            let result = [ ...this ];
            while (depth >= 1) {
                result = arrayflat.call(result);
                depth--;
            }
            return result;
        }
    }
    if (typeof Array.prototype.flat !== "function") {
        Array.prototype.flat = arrayflat;
    }
})();

(() => {
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
})();

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

const acceptValue = [ "input", "textarea", "option", "select" ];

var mustUseDomProp = (tag, attr, attrtype) => {
    return attr === "value" && acceptValue.includes(tag) && attrtype !== "button" || attr === "selected" && tag === "option" || attr === "checked" && tag === "input" || attr === "muted" && tag === "video";
};

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

const isinputcheckbox = ele => "input" === geteletagname(ele) && (get(ele, "type") === "checkbox" || get(ele, "type") === "radio");

function objtostylestring(obj) {
    obj = JSON.parse(JSON.stringify(obj));
    const objentries = Object.entries(obj).map(([key, value]) => [ hyphenate(key).trim(), value ]);
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
    var temp = Object.create(null);
    const outputattrs = new Proxy(temp, {
        ownKeys() {
            const isinputtextortextareaflag = isinputtextortextarea(ele);
            const keys = attributesownkeys(ele);
            return Array.from(new Set([ ...keys, isinputcheckbox(ele) ? "checked" : undefined, isinputtextortextareaflag ? valuestring : undefined ].flat(Infinity).filter(a => !!a)));
        },
        get(target, key) {
            if (mustUseDomProp(geteletagname(ele), String$1(key), get(ele, "type"))) {
                return get(ele, String$1(key));
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
            if ("function" === typeof v) {
                console.error(v);
                console.error("Setting properties as functions is not allowed");
                throw TypeError();
            }
            if (mustUseDomProp(geteletagname(ele), String$1(key), get(ele, "type"))) {
                return set(ele, String$1(key), v);
            } else if (key === "style") {
                const csstext = isstring$1(v) ? v : isobject$1(v) ? objtostylestring(v) : String$1(v);
                set(get(ele, "style"), "cssText", csstext.trim());
                return true;
            } else if (key === "class" && isobject$1(v)) {
                const classtext = isArray(v) ? v.join(" ") : isSet$1(v) ? [ ...v ].join(" ") : String$1(v);
                setattribute(ele, String$1(key), classtext);
                return true;
            } else {
                if (false === v || v === null || v === undefined) {
                    removeAttribute(ele, String$1(key));
                    return true;
                }
                if (isSet$1(v)) {
                    setattribute(ele, String$1(key), JSON.stringify([ ...v ]));
                    return true;
                } else {
                    if (v === true) {
                        v = "";
                    }
                    setattribute(ele, String$1(key), isobject$1(v) ? JSON.stringify(v) : String$1(v));
                    return true;
                }
            }
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

function isObject$1(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
}

var isObject_1 = isObject$1;

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

const cached_callback_eventlistner = new WeakMap;

const cached_create_componet = new WeakMap;

const cached_callback_debounced_watchs = new WeakMap;

const {apply: apply, construct: construct, defineProperty: defineProperty, deleteProperty: deleteProperty, getOwnPropertyDescriptor: getOwnPropertyDescriptor, getPrototypeOf: getPrototypeOf, has: has, ownKeys: ownKeys$1, preventExtensions: preventExtensions} = Reflect;

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

let MountedSet = new Set;

let UnMountedSet = new Set;

let StateSet = new Set;

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

var _a, _b;

const EventTarget$2 = window.EventTarget;

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
        this[_a] = new EventTarget$2;
        this[_b] = new Set;
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
            const name = eventname ? String(eventname) : "value";
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
        return isprimitive(value) ? String(value) : isSet(value) ? JSON.stringify([ ...value ]) : isobject(value) ? JSON.stringify(value) : "";
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
        directives: Object.fromEntries(propsentriesNOTevents.filter(([key]) => key[0] === "*" || key[0] === "_" || key[0] === "$").map(([key, value]) => [ key.slice(1).toLowerCase().trim(), value ]))
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

function createanotherhtmldocument() {
    return document.implementation.createHTMLDocument("");
}

function querySelectorAll(selector) {
    return [ ...document.querySelectorAll(selector) ];
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

function createhtmlandtextdirective(seteletext, errorname) {
    return function(ele, text) {
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
    };
}

function extenddirectives(options = {}) {
    if (!isplainobject(options)) {
        console.error(options);
        throw new TypeError;
    }
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
    vdom.element.push(element);
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
        set$1(element, bindstatesymbol, new Set);
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
                Object.assign(vdom.props, JSON.parse(JSON.stringify({
                    ...type["defaultProps"],
                    ...vdom.props
                })));
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
        set$1(componentsstylesheet, tagname, new Set);
    }
    if (csstext) {
        get$1(componentsstylesheet, prefix).add(createcssBlob(csstext));
    } else if (urltext) {
        get$1(componentsstylesheet, prefix).add(urltext);
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
    return Array.from(get$1(get$1(styleelement, "sheet"), "cssRules"));
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
        if (querySelectorAll(`link[rel="stylesheet"][href="${styleurl}"]`).length) {
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
        const defaultProps = get$1(this.constructor, "defaultProps");
        const attrs = createeleattragentreadwrite(this);
        if (isobject(defaultProps)) {
            Object.assign(attrs, defaultProps);
        }
        new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type == "attributes") {
                    console.log("The " + mutation.attributeName + " attribute was modified.");
                    const callback = get$1(this, attributeChangedCallback);
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
                        set$1(componentsstylesheet, prefix, new Set);
                        this[waittranformcsssymbol] = () => {
                            return setimmediate(() => {
                                registercssprefix(css, prefix);
                            });
                        };
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
                            return get$1(attributes, key);
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
                    this[falsevdomsymbol] = [];
                }
            }
            const elementtomount = this[falseelesymbol];
            mountrealelement(elementtomount, this);
            onmounted(elementtomount);
            if (this[trueelesymbol]) {
                onunmounted(this[trueelesymbol]);
            }
        }
        [handletrue]() {
            setelehtml(this, "");
            if (this[truevdomsymbol]) {
                if (!this[trueelesymbol]) {
                    this[trueelesymbol] = render(this[truevdomsymbol]);
                    this[truevdomsymbol] = [];
                }
            }
            const elementtomount = this[trueelesymbol];
            mountrealelement(elementtomount, this);
            onmounted(elementtomount);
            if (this[falseelesymbol]) {
                onunmounted(this[falseelesymbol]);
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

function asserttype(con) {
    if (!con) {
        throw new TypeError;
    }
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
                const myvalueobj = Object(myvalue);
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

function isMap$1(a) {
    return a instanceof Map;
}

function isSet$2(a) {
    return a instanceof Set;
}

function isArray$1(a) {
    return Array.isArray(a);
}

const Reflect$2 = window.Reflect;

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
                if (isfunction$1(value) && (isSet$2(target) || isMap$1(target))) {
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
                reactive[dispatchsymbol](String(key));
            });
        });
    }
    reactive.value = initobj;
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
                    target[dispatchsymbol](String(key));
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
                target[dispatchsymbol](String(key));
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

const listvalueattr = Symbol("listvalueattr");

const listinnervdom = Symbol("listinnervdom");

const listinnerelement = Symbol("listinnerelement");

const cached_realele = Symbol("cached_realele");

function ListMap(list, mapfun) {
    var _a, _b, _c, _d;
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
        asserttype(isVirtualdom(possiblevdom));
        return possiblevdom;
    };
    function indextovdom(index, thiscom) {
        const vdom = ITEMfactory(computed(thiscom[listvalueattr], v => v[index]), index);
        return vdom;
    }
    class ListMap extends AttrChange {
        constructor() {
            super(...arguments);
            this[_a] = new Map;
            this[_b] = createstate([]);
            this[_d] = false;
        }
        [(_a = cached_realele, _b = listvalueattr, _c = componentsymbol, _d = readysymbol, 
        attributeChangedCallback)](name) {
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
                        const numindexs = Array(newlength).fill(undefined).map((v, i) => i).slice(oldlength);
                        const realelementstoadd = numindexs.map(index => {
                            const cached_element = get$1(this[cached_realele], index);
                            if (cached_element) {
                                return cached_element;
                            } else {
                                const vdom = indextovdom(index, this);
                                const element = render(vdom);
                                set$1(this[cached_realele], index, element);
                                return element;
                            }
                        });
                        realelementstoadd.forEach(element => appendchild(this, element));
                    } else if (newlength < oldlength) {
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
            Object.entries(this[listinnerelement]).forEach(([key, value]) => {
                set$1(this[cached_realele], Number(key), value);
            });
            mountrealelement(this[listinnerelement], this);
            this[listinnerelement] = [];
            this[listinnervdom] = [];
        }
        connectedCallback() {
            connectedCallback(this);
        }
    }
    ListMap.defaultProps = {
        value: []
    };
    ListMap[_c] = componentsymbol;
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

function html(...inargs) {
    return apply(htm, h, inargs);
}

function html$1(...args) {
    const prevdom = toArray(html(...args));
    const vdom = prevdom.length === 1 ? prevdom[0] : prevdom;
    if (isvalidvdom(vdom)) {
        return vdom;
    } else {
        console.error(vdom);
        console.error(invalid_Virtualdom);
        throw new TypeError;
    }
}

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
                querySelectorAll(`input[name=${name}]`).filter(ele => ele !== inputelement).forEach(element => {
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

export { conditon as Condition, extenddirectives as Directives, ListMap, MountElement, Switchable, computed, createComponent$1 as createComponent, h as createElement, createRef, createstate as createState, h, html$1 as html, render, useMounted, useUnMounted, watch };
//# sourceMappingURL=index.js.map
