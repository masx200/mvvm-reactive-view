function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
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

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], (function() {})));
        return true;
    } catch (e) {
        return false;
    }
}

function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
        _construct = Reflect.construct;
    } else {
        _construct = function _construct(Parent, args, Class) {
            var a = [ null ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor;
            if (Class) _setPrototypeOf(instance, Class.prototype);
            return instance;
        };
    }
    return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunction(Class)) return Class;
        if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return _construct(Class, arguments, _getPrototypeOf(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
        raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2;
    }
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
        return;
    }
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally {
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally {
            if (_d) throw _e;
        }
    }
    return _arr;
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

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
        for (;a && !(a.__CE_isImportDocument || a instanceof Document); ) {
            a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
        }
        return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
    }
    function n(a, b) {
        for (;b && b !== a && !b.nextSibling; ) {
            b = b.parentNode;
        }
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
                    c = e["import"];
                    if (c instanceof Node && !d.has(c)) for (d.add(c), c = c.firstChild; c; c = c.nextSibling) {
                        p(c, b, d);
                    }
                    c = n(a, e);
                    continue;
                } else if ("template" === f) {
                    c = n(a, e);
                    continue;
                }
                if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) {
                    p(e, b, d);
                }
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
            for (var d = 0; d < a.c.length; d++) {
                a.c[d](b);
            }
            for (d = 0; d < a.f.length; d++) {
                a.f[d](b);
            }
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
                var d = b["import"];
                d instanceof Node && (d.__CE_isImportDocument = !0, d.__CE_hasRegistry = !0);
                d && "complete" === d.readyState ? d.__CE_documentLoadHandled = !0 : b.addEventListener("load", (function() {
                    var d = b["import"];
                    if (!d.__CE_documentLoadHandled) {
                        d.__CE_documentLoadHandled = !0;
                        var f = new Set(c);
                        f["delete"](d);
                        A(a, d, {
                            u: f,
                            i: e
                        });
                    }
                }));
            } else f.push(b);
        }), c);
        if (a.b) for (b = 0; b < f.length; b++) {
            w(a, f[b]);
        }
        for (b = 0; b < f.length; b++) {
            e(f[b]);
        }
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
        for (b = 0; b < a.length; b++) {
            for (var d = a[b].addedNodes, c = 0; c < d.length; c++) {
                A(this.c, d[c]);
            }
        }
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
            var c = function c(b) {
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
            for (var b = a.g, d = [], c = new Map, e = 0; e < b.length; e++) {
                c.set(b[e].localName, []);
            }
            A(a.a, document, {
                i: function i(b) {
                    if (void 0 === b.__CE_state) {
                        var e = b.localName, f = c.get(e);
                        f ? f.push(b) : a.a.a.get(e) && d.push(b);
                    }
                }
            });
            for (e = 0; e < d.length; e++) {
                y(a.a, d[e]);
            }
            for (;0 < b.length; ) {
                var f = b.shift();
                e = f.localName;
                f = c.get(f.localName);
                for (var t = 0; t < f.length; t++) {
                    y(a.a, f[t]);
                }
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
                for (var e = [], c = 0; c < arguments.length; ++c) {
                    e[c] = arguments[c];
                }
                c = [];
                for (var f = [], m = 0; m < e.length; m++) {
                    var q = e[m];
                    q instanceof Element && l(q) && f.push(q);
                    if (q instanceof DocumentFragment) for (q = q.firstChild; q; q = q.nextSibling) {
                        c.push(q);
                    } else c.push(q);
                }
                b.apply(this, e);
                for (e = 0; e < f.length; e++) {
                    z(a, f[e]);
                }
                if (l(this)) for (e = 0; e < c.length; e++) {
                    f = c[e], f instanceof Element && x(a, f);
                }
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
                set: function set(a) {
                    if (this.nodeType === Node.TEXT_NODE) c.set.call(this, a); else {
                        var d = void 0;
                        if (this.firstChild) {
                            var e = this.childNodes, k = e.length;
                            if (0 < k && l(this)) {
                                d = Array(k);
                                for (var h = 0; h < k; h++) {
                                    d[h] = e[h];
                                }
                            }
                        }
                        c.set.call(this, a);
                        if (d) for (a = 0; a < d.length; a++) {
                            z(b, d[a]);
                        }
                    }
                }
            });
        }
        var b = X;
        r(Node.prototype, "insertBefore", (function(a, c) {
            if (a instanceof DocumentFragment) {
                var e = Array.prototype.slice.apply(a.childNodes);
                a = J.call(this, a, c);
                if (l(this)) for (c = 0; c < e.length; c++) {
                    x(b, e[c]);
                }
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
                if (l(this)) for (var e = 0; e < c.length; e++) {
                    x(b, c[e]);
                }
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
                if (l(this)) for (z(b, c), c = 0; c < e.length; c++) {
                    x(b, e[c]);
                }
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
                get: function get() {
                    for (var a = [], b = 0; b < this.childNodes.length; b++) {
                        var f = this.childNodes[b];
                        f.nodeType !== Node.COMMENT_NODE && a.push(f.textContent);
                    }
                    return a.join("");
                },
                set: function set(a) {
                    for (;this.firstChild; ) {
                        K.call(this, this.firstChild);
                    }
                    null != a && "" !== a && I.call(this, document.createTextNode(a));
                }
            });
        }));
    }
    function Aa(a) {
        function b(b) {
            return function(e) {
                for (var c = [], d = 0; d < arguments.length; ++d) {
                    c[d] = arguments[d];
                }
                d = [];
                for (var k = [], h = 0; h < c.length; h++) {
                    var m = c[h];
                    m instanceof Element && l(m) && k.push(m);
                    if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) {
                        d.push(m);
                    } else d.push(m);
                }
                b.apply(this, c);
                for (c = 0; c < k.length; c++) {
                    z(a, k[c]);
                }
                if (l(this)) for (c = 0; c < d.length; c++) {
                    k = d[c], k instanceof Element && x(a, k);
                }
            };
        }
        var d = Element.prototype;
        void 0 !== V && (d.before = b(V));
        void 0 !== V && (d.after = b(qa));
        void 0 !== ra && r(d, "replaceWith", (function(b) {
            for (var e = [], c = 0; c < arguments.length; ++c) {
                e[c] = arguments[c];
            }
            c = [];
            for (var d = [], k = 0; k < e.length; k++) {
                var h = e[k];
                h instanceof Element && l(h) && d.push(h);
                if (h instanceof DocumentFragment) for (h = h.firstChild; h; h = h.nextSibling) {
                    c.push(h);
                } else c.push(h);
            }
            k = l(this);
            ra.apply(this, e);
            for (e = 0; e < d.length; e++) {
                z(a, d[e]);
            }
            if (k) for (z(a, this), e = 0; e < c.length; e++) {
                d = c[e], d instanceof Element && x(a, d);
            }
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
                set: function set(a) {
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
                for (var e = []; a !== b; a = a.nextSibling) {
                    e.push(a);
                }
                for (b = 0; b < e.length; b++) {
                    A(c, e[b]);
                }
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
                for (var e = 0; e < b.c.length; e++) {
                    b.c[e](a);
                }
            }
            return this.__CE_shadowRoot = a;
        }));
        O && O.get ? a(Element.prototype, O) : W && W.get ? a(HTMLElement.prototype, W) : da(c, (function(b) {
            a(b, {
                enumerable: !0,
                configurable: !0,
                get: function get() {
                    return H.call(this, !0).innerHTML;
                },
                set: function set(a) {
                    var b = "template" === this.localName, c = b ? this.content : this, e = G.call(document, this.namespaceURI, this.localName);
                    for (e.innerHTML = a; 0 < c.childNodes.length; ) {
                        K.call(c, c.childNodes[0]);
                    }
                    for (a = b ? e.content : e; 0 < a.childNodes.length; ) {
                        I.call(c, a.childNodes[0]);
                    }
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

function fromPairs(pairs) {
    var index = -1, length = pairs == null ? 0 : pairs.length, result = {};
    while (++index < length) {
        var pair = pairs[index];
        result[pair[0]] = pair[1];
    }
    return result;
}

var fromPairs_1 = fromPairs;

if ("function" !== typeof Object.fromEntries) Object.fromEntries = fromPairs_1;

function flattenDeep(arr1) {
    return arr1.reduce((function(acc, val) {
        return Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val);
    }), []);
}

function arrayflat() {
    var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    if (depth <= 1) {
        return this.reduce((function(acc, val) {
            return acc.concat(val);
        }), []);
    } else {
        return flattenDeep(this);
    }
}

if (typeof Array.prototype.flat !== "function") {
    Array.prototype.flat = arrayflat;
}

function isundefined(a) {
    return typeof a === "undefined";
}

function isnumber(a) {
    return typeof a === "number";
}

function isboolean(a) {
    return typeof a === "boolean";
}

function isobject(a) {
    return _typeof(a) === "object" && a !== null;
}

function isstring(a) {
    return typeof a === "string";
}

function isfunction(a) {
    return typeof a === "function";
}

function isarray(a) {
    return a instanceof Array && Array.isArray(a) && gettagtype(a) === "array";
}

function getsymbol(a) {
    return Symbol(a);
}

function gettagtype(a) {
    return {}.toString.call(a).replace("[object ", "").replace("]", "").toLowerCase();
}

function isprimitive(a) {
    return isstring(a) || isnumber(a) || isboolean(a) || isundefined(a);
}

var _a, _b, _c;

function isReactiveState(a) {
    return a instanceof ReactiveState;
}

var textnodesymbol = Symbol("textnode");

var eventtargetsymbol = Symbol("eventtatget");

var memlisteners = Symbol("memlisteners");

var dispatchsymbol = getsymbol("dispatch");

var subscribesymbol = getsymbol("subscribe");

var removeallistenerssymbol = getsymbol("removeallisteners");

var addallistenerssymbol = getsymbol("addallisteners");

var ReactiveState = function() {
    function ReactiveState(init) {
        _classCallCheck(this, ReactiveState);
        this[_a] = undefined;
        this[_b] = new EventTarget;
        this[_c] = [];
        if (isprimitive(init) || isobject(init)) {
            Object.defineProperty(this, "value", {
                value: init,
                configurable: true,
                writable: true
            });
        } else {
            throw TypeError("invalid State");
        }
        Object.defineProperty(this, Symbol.toStringTag, {
            value: "ReactiveState",
            configurable: true
        });
    }
    _createClass(ReactiveState, [ {
        key: addallistenerssymbol,
        value: function value() {
            var _this = this;
            this[memlisteners].forEach((function(_ref) {
                var _ref2 = _slicedToArray(_ref, 2), value = _ref2[0], callback = _ref2[1];
                _this[eventtargetsymbol].addEventListener(value, callback);
            }));
        }
    }, {
        key: "valueOf",
        value: function valueOf() {
            return this.value;
        }
    }, {
        key: "toString",
        value: function toString() {
            var value = this.value;
            return isprimitive(value) ? String(value) : isobject(value) ? JSON.stringify(value) : "";
        }
    }, {
        key: (_a = textnodesymbol, _b = eventtargetsymbol, _c = memlisteners, dispatchsymbol),
        value: function value(eventname) {
            var name = eventname ? String(eventname) : "value";
            if (name !== "value") {
                this[eventtargetsymbol].dispatchEvent(new Event(name));
            }
            this[eventtargetsymbol].dispatchEvent(new Event("value"));
        }
    }, {
        key: subscribesymbol,
        value: function value(callback, eventname) {
            var _this2 = this;
            var name = eventname ? String(eventname) : "value";
            this[memlisteners].push([ name, function() {
                return callback(_this2);
            } ]);
        }
    }, {
        key: removeallistenerssymbol,
        value: function value() {
            var _this3 = this;
            this[memlisteners].forEach((function(_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2), value = _ref4[0], callback = _ref4[1];
                _this3[eventtargetsymbol].removeEventListener(value, callback);
            }));
        }
    }, {
        key: Symbol.toPrimitive,
        value: function value() {
            var value = this.value;
            return isprimitive(value) ? value : isobject(value) ? JSON.stringify(value) : void 0;
        }
    } ]);
    return ReactiveState;
}();

var document$1 = window.document;

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

function createnonescript() {
    return document$1.createDocumentFragment();
}

function createnativeelement(type) {
    return document$1.createElement(type);
}

function createElementNS(namespace, name) {
    return document$1.createElementNS(namespace, name);
}

function createtextnode(data) {
    return document$1.createTextNode(data);
}

var svgnamespace = "http://www.w3.org/2000/svg";

function changetext(textnode, value) {
    textnode.nodeValue = String(value);
}

var mathnamespace = "http://www.w3.org/1998/Math/MathML";

function createmathelement() {
    return createElementNS(mathnamespace, "math");
}

function watch(state, callback, statekey) {
    if (!(isReactiveState(state) && isfunction(callback))) {
        throw TypeError("invalid state or callback");
    }
    if (statekey) {
        state[subscribesymbol](callback, statekey);
    } else {
        state[subscribesymbol](callback);
    }
    requestAnimationFrame$1((function() {
        state[addallistenerssymbol]();
    }));
}

var requestAnimationFrame$1 = window.requestAnimationFrame;

var directives = {
    ref: function ref(ele, _ref5) {
        if (_typeof(_ref5) == "object") {
            _ref5.value = ele;
        } else {
            throw TypeError("invalid ref");
        }
    },
    html: function html(ele, _html) {
        createhtmlandtextdirective(setelehtml, "html")(ele, _html);
    },
    text: function text(ele, _text) {
        createhtmlandtextdirective(seteletext, "text")(ele, _text);
    }
};

function createhtmlandtextdirective(seteletext, errorname) {
    return function(ele, text) {
        if (typeof text == "string") {
            requestAnimationFrame$1((function() {
                seteletext(ele, text);
            }));
        } else if (isReactiveState(text)) {
            watch(text, (function(state) {
                seteletext(ele, String(state));
            }));
            requestAnimationFrame$1((function() {
                seteletext(ele, String(text));
            }));
        } else {
            throw TypeError("invalid " + errorname);
        }
    };
}

function extenddirectives(options) {
    Object.entries(options).forEach((function(_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2), key = _ref7[0], value = _ref7[1];
        if (typeof value !== "function") {
            throw TypeError("invalid directive");
        } else {
            directives[key] = value;
        }
    }));
}

extenddirectives({
    value: function value(element, _value, vdom) {
        if (isReactiveState(_value) && (vdom.type === "input" || vdom.type === "textarea")) {
            vdom.bindattr["value"] = _value;
            [ "change", "input" ].forEach((function(eventname) {
                var origin = vdom.onevent[eventname];
                var eventsarray = [ origin ].flat(Infinity);
                Reflect.set(vdom.onevent, eventname, eventsarray.concat([ function(e) {
                    return _value.value = e.target.value;
                } ]).filter(Boolean));
            }));
        } else {
            throw TypeError("invalid ReactiveState or element");
        }
    }
});

var Reflect$1 = window.Reflect;

var construct = Reflect$1.construct, _deleteProperty = Reflect$1.deleteProperty, _get = Reflect$1.get, _getOwnPropertyDescriptor = Reflect$1.getOwnPropertyDescriptor, getPrototypeOf = Reflect$1.getPrototypeOf, _has = Reflect$1.has, _ownKeys = Reflect$1.ownKeys, _set = Reflect$1.set;

window.CustomElementRegistry = _get(getPrototypeOf(window.customElements), "constructor");

var _window = window, customElements$1 = _window.customElements, CustomElementRegistry$1 = _window.CustomElementRegistry;

var elementset = Symbol["for"]("elementset");

var elementmap = Symbol["for"]("elementmap");

function RandomDefineCustomElement(initclass, extendsname) {
    var elementname = getrandomstringandnumber();
    if (!customElements$1[elementset].has(initclass)) {
        if (customElements$1.get(elementname)) {
            return RandomDefineCustomElement(initclass);
        } else {
            if (extendsname) {
                customElements$1.define(elementname, initclass, {
                    extends: extendsname
                });
            } else {
                customElements$1.define(elementname, initclass);
            }
        }
    }
    return elementname;
}

if (!customElements$1[elementset]) {
    customElements$1[elementset] = new Set;
}

if (!customElements$1[elementmap]) {
    customElements$1[elementmap] = new Map;
}

customElements$1.define = function(name, constructor, options) {
    CustomElementRegistry$1.prototype.define.call(customElements$1, name, constructor, options);
    customElements$1[elementset].add(constructor);
    customElements$1[elementmap].set(name, constructor);
};

customElements$1[Symbol.iterator] = function() {
    return customElements$1[elementmap][Symbol.iterator].call(customElements$1[elementmap]);
};

function getrandomcharactor() {
    return _get(Array(26).fill(undefined).map((function(v, i) {
        return 97 + i;
    })).map((function(n) {
        return String.fromCharCode(n);
    })), Math.floor(Math.random() * 26));
}

function getrandomhexnumber() {
    return _get(Array(16).fill(undefined).map((function(v, i) {
        return i;
    })), Math.floor(Math.random() * 16)).toString(16);
}

function getrandomstringandnumber() {
    return Array(16).fill(undefined).map((function() {
        return getrandomcharactor();
    })).join("") + "-" + Array(16).fill(undefined).map((function() {
        return getrandomhexnumber();
    })).join("");
}

function isVirtualdom(a) {
    return a instanceof Virtualdom;
}

var Virtualdom = function Virtualdom() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    _classCallCheck(this, Virtualdom);
    this.element = undefined;
    this.props = {};
    this.children = [];
    this.directives = {};
    this.onevent = {};
    this.bindattr = {};
    var propsentries = Object.entries(props);
    Object.assign(this, {
        type: type,
        bindattr: Object.fromEntries(propsentries.filter((function(_ref8) {
            var _ref9 = _slicedToArray(_ref8, 1), key = _ref9[0];
            return /[A-Za-z]/.test(key[0]);
        })).filter((function(e) {
            return isReactiveState(e[1]);
        }))),
        props: Object.fromEntries(propsentries.filter((function(_ref10) {
            var _ref11 = _slicedToArray(_ref10, 1), key = _ref11[0];
            return /[A-Za-z]/.test(key[0]);
        })).filter((function(e) {
            return !isReactiveState(e[1]);
        }))),
        children: children,
        onevent: Object.fromEntries(propsentries.filter((function(_ref12) {
            var _ref13 = _slicedToArray(_ref12, 1), key = _ref13[0];
            return /\@/.test(key[0]);
        })).map((function(_ref14) {
            var _ref15 = _slicedToArray(_ref14, 2), key = _ref15[0], value = _ref15[1];
            return [ key.slice(1), value ];
        }))),
        directives: Object.fromEntries(propsentries.filter((function(_ref16) {
            var _ref17 = _slicedToArray(_ref16, 1), key = _ref17[0];
            return /\*/.test(key[0]);
        })).map((function(_ref18) {
            var _ref19 = _slicedToArray(_ref18, 2), key = _ref19[0], value = _ref19[1];
            return [ key.slice(1), value ];
        })))
    });
    Object.defineProperty(this, Symbol.toStringTag, {
        value: "virtualdom",
        configurable: true
    });
};

var n = function n(t, r, u, e) {
    for (var p = 1; p < r.length; p++) {
        var s = r[p], h = "number" == typeof s ? u[s] : s, a = r[++p];
        1 === a ? e[0] = h : 3 === a ? e[1] = Object.assign(e[1] || {}, h) : 5 === a ? (e[1] = e[1] || {})[r[++p]] = h : 6 === a ? e[1][r[++p]] += h + "" : e.push(a ? t.apply(null, n(t, h, u, [ "", null ])) : h);
    }
    return e;
}, t = function t(n) {
    for (var t, r, u = 1, e = "", p = "", s = [ 0 ], h = function h(n) {
        1 === u && (n || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? s.push(n || e, 0) : 3 === u && (n || e) ? (s.push(n || e, 1), 
        u = 2) : 2 === u && "..." === e && n ? s.push(n, 3) : 2 === u && e && !n ? s.push(!0, 5, e) : u >= 5 && ((e || !n && 5 === u) && (s.push(e, u, r), 
        u = 6), n && (s.push(n, u, r), u = 6)), e = "";
    }, a = 0; a < n.length; a++) {
        a && (1 === u && h(), h(a));
        for (var f = 0; f < n[a].length; f++) {
            t = n[a][f], 1 === u ? "<" === t ? (h(), s = [ s ], u = 3) : e += t : 4 === u ? "--" === e && ">" === t ? (u = 1, 
            e = "") : e = t + e[0] : p ? t === p ? p = "" : e += t : '"' === t || "'" === t ? p = t : ">" === t ? (h(), 
            u = 1) : u && ("=" === t ? (u = 5, r = e, e = "") : "/" === t && (u < 5 || ">" === n[a][f + 1]) ? (h(), 
            3 === u && (s = s[0]), u = s, (s = s[0]).push(u, 2), u = 0) : " " === t || "\t" === t || "\n" === t || "\r" === t ? (h(), 
            u = 2) : e += t), 3 === u && "!--" === e && (u = 4, s = s[0]);
        }
    }
    return h(), s;
}, r = "function" == typeof Map, u = r ? new Map : {}, e = r ? function(n) {
    var r = u.get(n);
    return r || u.set(n, r = t(n)), r;
} : function(n) {
    for (var r = "", e = 0; e < n.length; e++) {
        r += n[e].length + "-" + n[e];
    }
    return u[r] || (u[r] = t(n));
};

function htm(t) {
    var r = n(this, e(t), arguments, []);
    return r.length > 1 ? r : r[0];
}

function h() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var typenormalized = isstring(type) || isfunction(type) ? type : "";
    var propsnormalized = isobject(props) ? props : {};
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }
    var childrennormalized = children.flat(1);
    if (isstring(typenormalized)) {
        typenormalized = typenormalized.trim().toLowerCase();
    }
    if ("" === typenormalized) {
        return childrennormalized;
    }
    return new Virtualdom(typenormalized, propsnormalized, childrennormalized);
}

var html = htm.bind(h);

function isvalidvdom(v) {
    var flag = false;
    if (isarray(v)) {
        flag = v.map((function(ele) {
            return isvalidvdom(ele);
        })).includes(false) ? false : true;
        return flag;
    } else if (isVirtualdom(v)) {
        if (isvalidvdom(v.children)) {
            return true;
        }
    } else if (isReactiveState(v)) {
        return true;
    } else {
        if (isstring(v)) {
            return true;
        }
    }
    return flag;
}

function assertvalidvirtualdom() {
    var vdom = html.apply(void 0, arguments);
    if (isvalidvdom(vdom)) {
        return vdom;
    } else {
        console.error(vdom);
        throw new TypeError("invalid Virtualdom!");
    }
}

var eventlistenerssymbol = Symbol("eventlisteners");

function onevent(element, eventname, callback) {
    if (!element[eventlistenerssymbol]) {
        element[eventlistenerssymbol] = [];
    }
    if (typeof callback === "function") {
        addlisteners(element, eventname, [ callback ]);
    } else if (isarray(callback)) {
        addlisteners(element, eventname, callback);
    } else {
        throw TypeError("invalid EventListener");
    }
}

function addlisteners(ele, event, callarray) {
    callarray.forEach((function(call) {
        ele[eventlistenerssymbol].push([ event, call ]);
        domaddlisten(ele, event, call);
    }));
}

function domaddlisten(ele, event, call) {
    ele.addEventListener(event, call);
}

function isclassextendsHTMLElement(initclass) {
    return !!(isfunction(initclass) && initclass.prototype && initclass.prototype instanceof HTMLElement);
}

function createcostumelemet(initclass, propsjson, children) {
    if (isclassextendsHTMLElement(initclass)) {
        RandomDefineCustomElement(initclass);
        return construct(initclass, [ propsjson, children ]);
    } else {
        throw TypeError("invalid custom element class !");
    }
}

function mount(ele, container) {
    container.innerHTML = "";
    var eles;
    if (Array.isArray(ele)) {
        eles = ele;
    } else {
        eles = [ ele ];
    }
    eles.forEach((function(e) {
        return appendchild(container, e);
    }));
    return container;
}

var Reflect$2 = window.Reflect;

var get$1 = Reflect$2.get, ownKeys$1 = Reflect$2.ownKeys, set$1 = Reflect$2.set;

var valuestring = "value";

function isobject$1(a) {
    return _typeof(a) === "object" && a !== null;
}

function isstring$1(a) {
    return typeof a === "string";
}

function objtostylestring(o) {
    return Object.entries(o).map((function(_ref20) {
        var _ref21 = _slicedToArray(_ref20, 2), key = _ref21[0], value = _ref21[1];
        return key + ":" + value;
    })).join(";");
}

function asserthtmlelement(ele) {
    if (!(ele instanceof Element)) {
        throw TypeError("invalid HTMLElement!");
    } else return true;
}

function createeleattragentreadwrite(ele) {
    asserthtmlelement(ele);
    var isinputtextortextareaflag = isinputtextortextarea(ele);
    var temp = Object.create(null);
    return new Proxy(temp, {
        ownKeys: function ownKeys() {
            var keys = attributesownkeys(ele);
            return isinputtextortextareaflag ? Array.from(new Set([].concat(_toConsumableArray(keys), [ valuestring ]))) : keys;
        },
        get: function get(target, key) {
            if (isinputtextortextareaflag && key === valuestring) {
                return get$1(ele, valuestring);
            } else {
                var v = getattribute(ele, String(key));
                if (!v) {
                    return;
                }
                if (v === "") {
                    return true;
                }
                if (isstring$1(v)) {
                    try {
                        return JSON.parse(String(v));
                    } catch (error) {
                        return v;
                    }
                } else return;
            }
        },
        set: function set(t, key, v) {
            if (isinputtextortextareaflag && key === valuestring) {
                return set$1(ele, valuestring, v);
            } else if (key === "style") {
                setattribute(ele, String(key), isstring$1(v) ? v : isobject$1(v) ? objtostylestring(v) : String(v));
                return true;
            } else {
                if (v === true) {
                    v = "";
                }
                setattribute(ele, String(key), isobject$1(v) ? JSON.stringify(v) : String(v));
                return true;
            }
        },
        deleteProperty: function deleteProperty(t, k) {
            removeAttribute(ele, String(k));
            return true;
        },
        has: function has(target, key) {
            if (isinputtextortextareaflag && key === valuestring) {
                return true;
            } else {
                return hasAttribute(ele, String(key));
            }
        },
        defineProperty: function defineProperty() {
            return false;
        },
        getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, key) {
            var otherdescipter = {
                enumerable: true,
                configurable: true,
                writable: true
            };
            if (isinputtextortextareaflag && key === valuestring) {
                return _objectSpread2({
                    value: get$1(ele, valuestring)
                }, otherdescipter);
            } else {
                var attr = getattribute(ele, String(key));
                var outvalue;
                if (attr === "") {
                    outvalue = true;
                }
                if (outvalue) {
                    return _objectSpread2({
                        value: outvalue
                    }, otherdescipter);
                } else {
                    return;
                }
            }
        }
    });
}

function attributesownkeys(ele) {
    return ownKeys$1(ele.attributes).filter((function(k) {
        return !/\d/.test(String(k)[0]);
    }));
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

function hasAttribute(ele, key) {
    return ele.hasAttribute(key);
}

function isinputtextortextarea(ele) {
    var tagname = geteletagname(ele);
    return tagname === "input" && get$1(ele, "type") === "text" || tagname === "textarea";
}

var bindstatesymbol = Symbol("bindstate");

var reactivestatesymbol = Symbol("reactivestate");

var virtualdomsymbol = Symbol("virtualdom");

function throwinvalideletype() {
    throw TypeError("invalid element type!");
}

function render(vdom, namespace) {
    if (typeof vdom === "string") {
        return createtextnode(vdom);
    } else if (vdom instanceof ReactiveState) {
        var reactive = vdom;
        var textnode = createtextnode(String(reactive));
        textnode[reactivestatesymbol] = reactive;
        reactive[textnodesymbol] = textnode;
        watch(reactive, (function(state) {
            changetext(textnode, String(state));
        }));
        return textnode;
    } else if (vdom instanceof Virtualdom && "type" in vdom) {
        var type = vdom.type;
        var element;
        if (typeof type === "string") {
            if (type === "script") {
                return createnonescript();
            } else if (type === "svg") {
                element = createsvgelement();
            } else if (type === "math") {
                element = createmathelement();
            } else {
                element = namespace ? createElementNS(namespace, type) : createnativeelement(type);
            }
        } else if (typeof type == "function") {
            if (isobject(type["defaultProps"])) {
                vdom.props = JSON.parse(JSON.stringify(_objectSpread2({}, type["defaultProps"], {}, vdom.props)));
            }
            var propsjson = JSON.parse(JSON.stringify(_objectSpread2({}, vdom.props, {}, Object.fromEntries(Object.entries(vdom.bindattr).map((function(_ref22) {
                var _ref23 = _slicedToArray(_ref22, 2), key = _ref23[0], value = _ref23[1];
                return [ key, value.value ];
            }))))));
            element = createcostumelemet(type, propsjson, vdom.children);
        } else {
            throwinvalideletype();
        }
        handleprops(element, vdom);
        if (typeof type !== "function") {
            mount(vdom.children.map((function(e) {
                if (type === "svg") {
                    return render(e, svgnamespace);
                } else if (type === "math") {
                    return render(e, mathnamespace);
                } else if (namespace) {
                    return render(e, namespace);
                } else {
                    return render(e);
                }
            })), element);
        }
        return element;
    } else {
        throwinvalideletype();
    }
}

function handleprops(element, vdom) {
    (function(element, vdom) {
        Object.entries(vdom.directives).forEach((function(_ref24) {
            var _ref25 = _slicedToArray(_ref24, 2), name = _ref25[0], value = _ref25[1];
            if (name in directives && typeof directives[name] === "function") {
                directives[name](element, value, vdom);
            } else {
                throw new Error("invalid directives " + name);
            }
        }));
        var attribute1 = createeleattragentreadwrite(element);
        Object.assign(attribute1, vdom.props);
        element[virtualdomsymbol] = vdom;
        vdom.element = element;
        Object.entries(vdom.bindattr).forEach((function(_ref26) {
            var _ref27 = _slicedToArray(_ref26, 2), key = _ref27[0], primitivestate = _ref27[1];
            attribute1[key] = primitivestate.value;
            watch(primitivestate, (function(state) {
                attribute1[key] = state.value;
            }));
        }));
        if (!element[eventlistenerssymbol]) {
            element[eventlistenerssymbol] = [];
        }
        Object.entries(vdom.onevent).forEach((function(_ref28) {
            var _ref29 = _slicedToArray(_ref28, 2), event = _ref29[0], callbacks = _ref29[1];
            onevent(element, event, callbacks);
        }));
    })(element, vdom);
    if (!element[bindstatesymbol]) {
        element[bindstatesymbol] = new Set;
    }
    [ Object.values(vdom.bindattr), Object.values(vdom.directives) ].flat().filter((function(e) {
        return isReactiveState(e);
    })).forEach((function(e) {
        return element[bindstatesymbol].add(e);
    }));
}

function createApp(vdom, container) {
    var el = container;
    if (!isvalidvdom(vdom)) {
        console.error(vdom);
        throw TypeError("invalid Virtualdom ");
    }
    if (!(el instanceof HTMLElement)) {
        throw TypeError("invalid container HTMLElement!");
    }
    if (el === document$1.body || el === document$1.documentElement || el === document$1.head) {
        throw Error("Do not mount  to <html> or <body> <head>.");
    }
    var elesarray;
    if (Array.isArray(vdom)) {
        elesarray = vdom;
    } else {
        elesarray = [ vdom ];
    }
    mount(elesarray.map((function(e) {
        return render(e);
    })), container);
    return container;
}

function createRef(init) {
    return {
        value: init
    };
}

var Reflect$3 = window.Reflect;

var ownKeys$2 = Reflect$3.ownKeys, deleteProperty$1 = Reflect$3.deleteProperty, apply$1 = Reflect$3.apply, construct$1 = Reflect$3.construct, defineProperty$1 = Reflect$3.defineProperty, get$2 = Reflect$3.get, getOwnPropertyDescriptor$1 = Reflect$3.getOwnPropertyDescriptor, getPrototypeOf$1 = Reflect$3.getPrototypeOf, has$1 = Reflect$3.has, set$2 = Reflect$3.set, setPrototypeOf$1 = Reflect$3.setPrototypeOf;

function isobject$2(a) {
    return _typeof(a) === "object" && a !== null;
}

function isfunction$1(a) {
    return typeof a === "function";
}

function deepobserveaddpath(target, callback) {
    var patharray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var ancestor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : target;
    if (typeof callback !== "function") {
        throw Error("observe callback invalid !");
    }
    if (isfunction$1(target) || isobject$2(target)) {
        var fakeobj;
        if (isobject$2(target)) {
            fakeobj = {};
        } else {
            fakeobj = function fakeobj() {};
        }
        setPrototypeOf$1(fakeobj, null);
        return function(fakeobj) {
            return new Proxy(fakeobj, {
                defineProperty: function defineProperty(t, p, a) {
                    return defineProperty$1(target, p, a);
                },
                deleteProperty: function deleteProperty(t, p) {
                    callback(ancestor, [].concat(_toConsumableArray(patharray), [ p ]), undefined, get$2(target, p));
                    return deleteProperty$1(target, p);
                },
                ownKeys: function ownKeys() {
                    return ownKeys$2(target);
                },
                has: function has(t, p) {
                    return has$1(target, p);
                },
                getPrototypeOf: function getPrototypeOf() {
                    return getPrototypeOf$1(target);
                },
                setPrototypeOf: function setPrototypeOf(t, v) {
                    return setPrototypeOf$1(target, v);
                },
                construct: function construct(t, argumentslist) {
                    if (typeof target === "function") {
                        return construct$1(target, argumentslist);
                    }
                },
                apply: function apply(t, thisarg, argarray) {
                    if (typeof target === "function") {
                        return apply$1(target, thisarg, argarray);
                    }
                },
                getOwnPropertyDescriptor: function getOwnPropertyDescriptor(t, k) {
                    var descripter = getOwnPropertyDescriptor$1(target, k);
                    if (descripter) {
                        descripter.configurable = true;
                        return descripter;
                    } else {
                        return;
                    }
                },
                set: function set(t, k, v) {
                    if (typeof callback === "function") {
                        callback(ancestor, [].concat(_toConsumableArray(patharray), [ k ]), v, get$2(target, k));
                    }
                    return set$2(target, k, v);
                },
                get: function get(t, k) {
                    var value = get$2(target, k);
                    if (isfunction$1(value) || isobject$2(value)) {
                        return deepobserveaddpath(value, callback, [].concat(_toConsumableArray(patharray), [ k ]), target);
                    } else {
                        return value;
                    }
                }
            });
        }(fakeobj);
    } else {
        return target;
    }
}

function observedeepagent(target, callback) {
    if (typeof callback !== "function") {
        throw Error("observe callback  invalid function ");
    }
    if (typeof Proxy !== "function") {
        throw Error("Proxy unsupported!");
    }
    if (isfunction$1(target) || isobject$2(target)) {
        return deepobserveaddpath(target, callback, [], target);
    } else {
        return target;
    }
}

function createstate(init) {
    if (isprimitive(init)) {
        return new Proxy(new ReactiveState(init), {
            defineProperty: function defineProperty() {
                return false;
            },
            deleteProperty: function deleteProperty() {
                return false;
            },
            set: function set(target, key, value) {
                if (key === textnodesymbol) {
                    return _set(target, key, value);
                }
                if (key === "value" && isprimitive(value)) {
                    _set(target, key, value);
                    target[dispatchsymbol]();
                    return true;
                } else {
                    return false;
                }
            }
        });
    } else if (isReactiveState(init)) {
        return createstate(init.value);
    } else if (isobject(init)) {
        return new Proxy(new ReactiveState(init), {
            defineProperty: function defineProperty() {
                return false;
            },
            getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, key) {
                var myvalue = _get(target, "value");
                var descripter = _getOwnPropertyDescriptor(target, key) || _getOwnPropertyDescriptor(myvalue, key);
                if (descripter) {
                    descripter.configurable = true;
                }
                return descripter;
            },
            deleteProperty: function deleteProperty(target, key) {
                var myvalue = _get(target, "value");
                if (_has(myvalue, key)) {
                    _deleteProperty(myvalue, key);
                    target[dispatchsymbol](key);
                    return true;
                } else {
                    return true;
                }
            },
            has: function has(target, key) {
                var myvalue = _get(target, "value");
                return _has(target, key) || _has(myvalue, key);
            },
            get: function get(target, key) {
                var value = _get(target, "value");
                if (_has(target, key)) {
                    return _get(target, key);
                } else if (_has(value, key)) {
                    return observedeepagent(_get(value, key), (function() {
                        target[dispatchsymbol](key);
                    }));
                }
            },
            ownKeys: function ownKeys(target) {
                return Array.from(new Set([].concat(_toConsumableArray(_ownKeys(target)), _toConsumableArray(_ownKeys(_get(target, "value"))))));
            },
            set: function set(target, key, value) {
                if (key === textnodesymbol) {
                    return _set(target, key, value);
                }
                var myvalue = _get(target, "value");
                if (key === "value" && isobject(value)) {
                    _set(target, key, value);
                    target[dispatchsymbol]();
                    return true;
                } else if (!_has(target, key)) {
                    _set(myvalue, key, value);
                    target[dispatchsymbol](key);
                } else if (key === "length") {
                    _set(myvalue, key, value);
                    target[dispatchsymbol](key);
                } else {
                    return false;
                }
                return true;
            }
        });
    } else {
        throw TypeError("invalid State");
    }
}

if (typeof HTMLElement !== "function" || typeof Proxy !== "function" || (typeof customElements === "undefined" ? "undefined" : _typeof(customElements)) !== "object" || typeof CustomElementRegistry !== "function") {
    throw new TypeError(" browser not supported !");
}

function _templateObject7() {
    var data = _taggedTemplateLiteral([ '\n    <math>\n      <mrow>\n        <mrow>\n          <msup>\n            <mi>a</mi>\n            <mn>2</mn>\n          </msup>\n          <mo>+</mo>\n          <msup>\n            <mi>b</mi>\n            <mn>2</mn>\n          </msup>\n        </mrow>\n        <mo>=</mo>\n        <msup>\n          <mi>c</mi>\n          <mn>2</mn>\n        </msup>\n      </mrow>\n    </math>\n\n    \x3c!-- <svg width="100%" height="100%" xml:base="">\n  <defs>\n    <marker id="arrow" viewBox="0 -5 10 10" refX="0" refY="0" markerWidth="20" markerHeight="20" orient="auto">\n      <path d="M0,-5L10,0L0,5"></path>\n    </marker>\n  </defs>\n  <line x1="100" y1="100" x2="333" y2="333" marker-start="url(#arrow)" class="link"></line>\n</svg> --\x3e\n  ' ]);
    _templateObject7 = function _templateObject7() {
        return data;
    };
    return data;
}

function _templateObject6() {
    var data = _taggedTemplateLiteral([ "\n    <div style=", ">", "</div>\n    <div style=", ">", "</div>\n    ", "\n  " ]);
    _templateObject6 = function _templateObject6() {
        return data;
    };
    return data;
}

function _templateObject5() {
    var data = _taggedTemplateLiteral([ "\n    <div *text=", "></div>\n    <div *html=", "></div>\n\n    <script />\n  " ]);
    _templateObject5 = function _templateObject5() {
        return data;
    };
    return data;
}

function _templateObject4() {
    var data = _taggedTemplateLiteral([ "\n  <textarea value=", " @input=", "></textarea>\n  <input value=", " style='width:100%' @change=", "  \n@input=", "\n></input>\n" ]);
    _templateObject4 = function _templateObject4() {
        return data;
    };
    return data;
}

function _templateObject3() {
    var data = _taggedTemplateLiteral([ "\n    <div *text=", "></div>\n    <div *html=", "></div>\n  " ]);
    _templateObject3 = function _templateObject3() {
        return data;
    };
    return data;
}

function _templateObject2() {
    var data = _taggedTemplateLiteral([ "\n    <div style=", '>hello world!</div>\n    <input\n      style="width:100%"\n      @input=', "\n      *ref=", "\n      @change=", '\n      id="code16"\n      class="col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control"\n      value=', "\n    />\n    <h1 style=", ">mvvm-reactive-view</h1>\n  " ]);
    _templateObject2 = function _templateObject2() {
        return data;
    };
    return data;
}

function _templateObject() {
    var data = _taggedTemplateLiteral([ '\n    <h1 style="padding-top: 127.6px;">\n      <svg\n        style="\n    width: 100%;\n    height: 200px;\n"\n        class="octicon octicon-book"\n        viewBox="0 0 16 16"\n        version="1.1"\n        width="16"\n        height="16"\n        aria-hidden="true"\n      >\n        <path\n          fill-rule="evenodd"\n          d="M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"\n        ></path></svg\n      ><svg\n        xmlns="http://www.w3.org/2000/svg"\n        viewBox="0 0 3046.7 875.7"\n        style="\n    width: 100%;\n    height: 200px;\n"\n      >\n        <title>logo-on-dark-bg</title>\n        <rect Color="#FFF" x="0" y="0" width="3046.7" height="875.7" />\n        <path\n          fill="#FFF"\n          d="M387 0l387 218.9v437.9L387 875.7 0 656.8V218.9L387 0z"\n        />\n        <path\n          fill="#8ED6FB"\n          d="M704.9 641.7L399.8 814.3V679.9l190.1-104.6 115 66.4zm20.9-18.9V261.9l-111.6 64.5v232l111.6 64.4zM67.9 641.7L373 814.3V679.9L182.8 575.3 67.9 641.7zM47 622.8V261.9l111.6 64.5v232L47 622.8zm13.1-384.3L373 61.5v129.9L172.5 301.7l-1.6.9-110.8-64.1zm652.6 0l-312.9-177v129.9l200.5 110.2 1.6.9 110.8-64z"\n        />\n        <path\n          fill="#1C78C0"\n          d="M373 649.3L185.4 546.1V341.8L373 450.1v199.2zm26.8 0l187.6-103.1V341.8L399.8 450.1v199.2zM198.1 318.2l188.3-103.5 188.3 103.5-188.3 108.7-188.3-108.7z"\n        />\n        <path\n          fill="#F5FAFA"\n          d="M1164.3 576.3h82.5l84.1-280.2h-80.4l-49.8 198.8-53.1-198.8H1078l-53.6 198.8-49.3-198.8h-80.4l83.6 280.2h82.5l52-179.5 51.5 179.5zM1335.2 437c0 84.1 57.3 146.3 147.4 146.3 69.7 0 107.2-41.8 117.9-61.6l-48.8-37c-8 11.8-30 34.3-68.1 34.3-41.3 0-71.3-26.8-72.9-64.3H1608c.5-5.4.5-10.7.5-16.1 0-91.6-49.3-149.5-136.1-149.5-79.9 0-137.2 63.2-137.2 147.9zm77.7-30.6c3.2-32.1 25.7-56.8 60.6-56.8 33.8 0 58.4 22.5 60 56.8h-120.6zm223.5 169.9h69.7v-28.9c7.5 9.1 35.4 35.9 83.1 35.9 80.4 0 137.2-60.5 137.2-146.8 0-86.8-52.5-147.3-132.9-147.3-48.2 0-76.1 26.8-83.1 36.4V188.9h-73.9v387.4h-.1zm71.8-139.3c0-52.5 31.1-82.5 71.8-82.5 42.9 0 71.8 33.8 71.8 82.5 0 49.8-30 80.9-71.8 80.9-45 0-71.8-36.5-71.8-80.9zm247 239.5h73.9V547.3c7 9.1 34.8 35.9 83.1 35.9 80.4 0 132.9-60.5 132.9-147.3 0-85.7-56.8-146.8-137.2-146.8-47.7 0-75.6 26.8-83.1 36.4V296h-69.7v380.5h.1zm71.8-241.1c0-44.5 26.8-80.9 71.8-80.9 41.8 0 71.8 31.1 71.8 80.9 0 48.8-28.9 82.5-71.8 82.5-40.7 0-71.8-30-71.8-82.5zm231.5 54.1c0 58.9 48.2 93.8 105 93.8 32.2 0 53.6-9.6 68.1-25.2l4.8 18.2h65.4V398.9c0-62.7-26.8-109.8-116.8-109.8-42.9 0-85.2 16.1-110.4 33.2l27.9 50.4c20.9-10.7 46.6-19.8 74.5-19.8 32.7 0 50.9 16.6 50.9 41.3v18.2c-10.2-7-32.2-15.5-60.6-15.5-65.4-.1-108.8 37.4-108.8 92.6zm73.9-2.2c0-23 19.8-39.1 48.2-39.1s48.8 14.5 48.8 39.1c0 23.6-20.4 38.6-48.2 38.6s-48.8-15.5-48.8-38.6zm348.9 30.6c-46.6 0-79.8-33.8-79.8-81.4 0-45 29.5-82 77.2-82 31.6 0 53.1 15.5 65.4 26.8l20.9-62.2c-18.2-13.9-47.2-30-88.4-30-85.2 0-149 62.7-149 147.9s62.2 146.3 149.5 146.3c40.7 0 71.3-17.1 87.3-30l-19.8-60.5c-12.4 10.1-34.9 25.1-63.3 25.1zm110.9 58.4h73.9V431.6l93.8 144.7h86.8L2940.6 423l98.6-127h-83.1l-90 117.9v-225h-73.9v387.4z"\n        />\n      </svg>\n    </h1>\n    <div>\n      <div>\n        <noscript>You need to enable JavaScript to run this app.</noscript>\n        <div id="root">\n          <div>\n            <div class="container-fluid fixed-top" id="my导航栏">\n              <nav\n                class="navbar navbar-default navbar navbar-expand-sm bg-light navbar-light"\n                role="navigation"\n              >\n                <div>\n                  <a\n                    class="navbar-brand mui-btn mui-btn-primary mui-btn-outlined"\n                    href="#/"\n                    >masx200的\n                    <hr id="hidewidthless500" />\n                    github主页</a\n                  ><button\n                    class="navbar-toggler"\n                    type="button"\n                    data-toggle="collapse"\n                  >\n                    <span class="navbar-toggler-icon"></span>\n                  </button>\n                </div>\n                <div\n                  class="collapse navbar-collapse"\n                  id="example-navbar-collapse"\n                  style="display: none;"\n                >\n                  <ul class="nav navbar-nav" id="allnavbar">\n                    <li id="mynav1">\n                      <a\n                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"\n                        href="#/react-home"\n                        >基于REACT的主页</a\n                      >\n                    </li>\n                    <li>\n                      <a\n                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"\n                        href="#/react-rssreader"\n                        >rss阅读</a\n                      >\n                    </li>\n                    <li id="mynav2">\n                      <a\n                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"\n                        href="#/react-about"\n                        >关于REACT</a\n                      >\n                    </li>\n                    <li class="nav-item">\n                      <a\n                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"\n                        href="#/picalc"\n                        >圆周率计算多线程</a\n                      >\n                    </li>\n                    <li>\n                      <a\n                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"\n                        href="#/react-huami"\n                        >花密网页版</a\n                      >\n                    </li>\n                    <li>\n                      <a\n                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"\n                        href="#/decoder"\n                        >JSfuck-and-hieroglyphy-Decoder</a\n                      >\n                    </li>\n                    <li>\n                      <a\n                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"\n                        href="#/jsfuck"\n                        >JSfuck-ENCODER</a\n                      >\n                    </li>\n                    <li>\n                      <a\n                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"\n                        href="#/hieroglyphy"\n                        >hieroglyphy-ENCODER</a\n                      >\n                    </li>\n                    <li>\n                      <a\n                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"\n                        href="#/webpack-react-vue-spa-awesome-config"\n                        >webpack-react-vue- 极速零配置的单页面 web\n                        应用打包工具</a\n                      >\n                    </li>\n                    <li class="nav-item">\n                      <a\n                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"\n                        href="#/IMPORTCJSAMDUMD动态异步加载"\n                        >动态异步加载-commonjs和umd和amd模块库</a\n                      >\n                    </li>\n                    <li class="nav-item">\n                      <a\n                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"\n                        href="#/react-simple-global-state-store-hook"\n                        >适用于React的极简全局状态管理库</a\n                      >\n                    </li>\n                    <li class="nav-item">\n                      <a\n                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"\n                        href="#/excellent-vscode-extensions-for-javascript"\n                        >VScode的优秀扩展推荐</a\n                      >\n                    </li>\n                    <li class="nav-item">\n                      <a\n                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"\n                        href="#/vue-simple-global-state-store-manager"\n                        >适用于Vue的极简全局状态管理库</a\n                      >\n                    </li>\n                    <li>\n                      <a\n                        href="./my-vue-router-project/index.html"\n                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"\n                        >基于vue的主页</a\n                      >\n                    </li>\n                    <li>\n                      <a\n                        href="./my-vue-router-project/index.html#/about"\n                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"\n                        >关于Vue</a\n                      >\n                    </li>\n                  </ul>\n                </div>\n              </nav>\n            </div>\n            <div class="container" id="my主体" style="padding-top: 127.6px;">\n              <div class="hello flowerpassword">\n                <h1>花密 不一样的密码管理工具</h1>\n\n                <div id="rong1" class="container" style="text-align: center;">\n                  <div id="rong2">\n                    <h2><span>1</span>输入</h2>\n                    <div id="input">\n                      <p></p>\n                      <h3>记忆密码</h3>\n                      <p></p>\n                      <p>\n                        <input\n                          @input=', '\n                          id="password"\n                          placeholder="输入密码"\n                          name="password"\n                          type="password"\n                          tabindex="1"\n                          class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control"\n                          value=""\n                        />\n                      </p>\n                      <p></p>\n                      <span>+</span>\n                      <h3>区分代号</h3>\n                      <p></p>\n                      <p>\n                        <input\n                          *ref=', "\n                          *value=", "\n                          @input=", '\n                          id="key"\n                          placeholder="输入代号"\n                          name="key"\n                          type="text"\n                          tabindex="2"\n                          class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control"\n                          value=""\n                        />\n                      </p>\n                    </div>\n                    <br />\n                    <p></p>\n                    <h2><span>2</span>获取</h2>\n                    <p></p>\n                    <div id="get">\n                      <p id="tuijian"></p>\n                      <p></p>\n                      <h3>最终密码</h3>\n                      <p></p>\n                      <span id="myhezi"\n                        ><p>\n                          <input\n                            *ref=', "\n                            @change=", '\n                            id="code16"\n                            readonly=""\n                            class="col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control"\n                            value=""\n                          />\n                        </p>\n                        <br />\n                        <p>\n                          <button\n                            id="copycode16"\n                            data-clipboard-target="#code16"\n                            class="btn btn-lg btn copycode16d btn-info"\n                            style="width: 100%;"\n                          >\n                            点击复制\n                          </button>\n                        </p></span\n                      >\n                      <p>\n                        <span id="copyOK" style="display: none;"\n                          >√复制成功</span\n                        >\n                      </p>\n                      <p></p>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <script\n          type="text/javascript"\n          src="https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/bundle.runtime~main.3a15bebb435b0d3fead6.js"\n        ></script\n        ><script\n          type="text/javascript"\n          src="https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/chunk.vendors~main.f7c5ea92c1b78a8ff211.js"\n        ></script\n        ><script\n          type="text/javascript"\n          src="https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/chunk.main.b9c7ffd191cff11a9b96.js"\n        ><\/script>\n      </div>\n\n      <div contenteditable></div>\n    </div>\n    <h1>\n      <svg\n        xmlns="http://www.w3.org/2000/svg"\n        xmlns:xlink="http://www.w3.org/1999/xlink"\n        version="1.1"\n        baseProfile="full"\n        style="\n    width:600px;\n    height: 600px;\n"\n      >\n        <g fill-opacity="0.7" stroke="black" stroke-width="0.1cm">\n          <circle\n            cx="6cm"\n            cy="2cm"\n            r="100"\n            fill="red"\n            transform="translate(0,50)"\n          />\n          <circle\n            cx="6cm"\n            cy="2cm"\n            r="100"\n            fill="blue"\n            transform="translate(70,150)"\n          />\n          <circle\n            cx="6cm"\n            cy="2cm"\n            r="100"\n            fill="green"\n            transform="translate(-70,150)"\n          />\n        </g>\n      </svg>\n\n      <svg\n        style="\n    width: 100%;\n    height: 200px;\n"\n        xmlns="http://www.w3.org/2000/svg"\n        viewBox="0 0 3046.7 875.7"\n      >\n        <title>logo-on-dark-bg</title>\n        <rect Color="#FFF" x="0" y="0" width="3046.7" height="875.7" />\n        <path\n          fill="#FFF"\n          d="M387 0l387 218.9v437.9L387 875.7 0 656.8V218.9L387 0z"\n        />\n        <path\n          fill="#8ED6FB"\n          d="M704.9 641.7L399.8 814.3V679.9l190.1-104.6 115 66.4zm20.9-18.9V261.9l-111.6 64.5v232l111.6 64.4zM67.9 641.7L373 814.3V679.9L182.8 575.3 67.9 641.7zM47 622.8V261.9l111.6 64.5v232L47 622.8zm13.1-384.3L373 61.5v129.9L172.5 301.7l-1.6.9-110.8-64.1zm652.6 0l-312.9-177v129.9l200.5 110.2 1.6.9 110.8-64z"\n        />\n        <path\n          fill="#1C78C0"\n          d="M373 649.3L185.4 546.1V341.8L373 450.1v199.2zm26.8 0l187.6-103.1V341.8L399.8 450.1v199.2zM198.1 318.2l188.3-103.5 188.3 103.5-188.3 108.7-188.3-108.7z"\n        />\n        <path\n          fill="#F5FAFA"\n          d="M1164.3 576.3h82.5l84.1-280.2h-80.4l-49.8 198.8-53.1-198.8H1078l-53.6 198.8-49.3-198.8h-80.4l83.6 280.2h82.5l52-179.5 51.5 179.5zM1335.2 437c0 84.1 57.3 146.3 147.4 146.3 69.7 0 107.2-41.8 117.9-61.6l-48.8-37c-8 11.8-30 34.3-68.1 34.3-41.3 0-71.3-26.8-72.9-64.3H1608c.5-5.4.5-10.7.5-16.1 0-91.6-49.3-149.5-136.1-149.5-79.9 0-137.2 63.2-137.2 147.9zm77.7-30.6c3.2-32.1 25.7-56.8 60.6-56.8 33.8 0 58.4 22.5 60 56.8h-120.6zm223.5 169.9h69.7v-28.9c7.5 9.1 35.4 35.9 83.1 35.9 80.4 0 137.2-60.5 137.2-146.8 0-86.8-52.5-147.3-132.9-147.3-48.2 0-76.1 26.8-83.1 36.4V188.9h-73.9v387.4h-.1zm71.8-139.3c0-52.5 31.1-82.5 71.8-82.5 42.9 0 71.8 33.8 71.8 82.5 0 49.8-30 80.9-71.8 80.9-45 0-71.8-36.5-71.8-80.9zm247 239.5h73.9V547.3c7 9.1 34.8 35.9 83.1 35.9 80.4 0 132.9-60.5 132.9-147.3 0-85.7-56.8-146.8-137.2-146.8-47.7 0-75.6 26.8-83.1 36.4V296h-69.7v380.5h.1zm71.8-241.1c0-44.5 26.8-80.9 71.8-80.9 41.8 0 71.8 31.1 71.8 80.9 0 48.8-28.9 82.5-71.8 82.5-40.7 0-71.8-30-71.8-82.5zm231.5 54.1c0 58.9 48.2 93.8 105 93.8 32.2 0 53.6-9.6 68.1-25.2l4.8 18.2h65.4V398.9c0-62.7-26.8-109.8-116.8-109.8-42.9 0-85.2 16.1-110.4 33.2l27.9 50.4c20.9-10.7 46.6-19.8 74.5-19.8 32.7 0 50.9 16.6 50.9 41.3v18.2c-10.2-7-32.2-15.5-60.6-15.5-65.4-.1-108.8 37.4-108.8 92.6zm73.9-2.2c0-23 19.8-39.1 48.2-39.1s48.8 14.5 48.8 39.1c0 23.6-20.4 38.6-48.2 38.6s-48.8-15.5-48.8-38.6zm348.9 30.6c-46.6 0-79.8-33.8-79.8-81.4 0-45 29.5-82 77.2-82 31.6 0 53.1 15.5 65.4 26.8l20.9-62.2c-18.2-13.9-47.2-30-88.4-30-85.2 0-149 62.7-149 147.9s62.2 146.3 149.5 146.3c40.7 0 71.3-17.1 87.3-30l-19.8-60.5c-12.4 10.1-34.9 25.1-63.3 25.1zm110.9 58.4h73.9V431.6l93.8 144.7h86.8L2940.6 423l98.6-127h-83.1l-90 117.9v-225h-73.9v387.4z"\n        />\n      </svg>\n    </h1>\n  ' ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}

(function() {
    var inputpassword = createstate("");
    var inputref = createRef();
    var inputref2 = createRef();
    console.log(inputref2);
    console.log(inputpassword);
    watch(inputpassword, console.log);
    var vdom = assertvalidvirtualdom(_templateObject(), (function(e) {
        return console.log(e);
    }), inputref2, inputpassword, (function(e) {
        return console.log(e);
    }), inputref, (function(e) {
        return console.log(e, inputref);
    }));
    console.log(vdom);
    createApp(vdom, document.getElementById("root"));
})();

(function() {
    var stylestate = createstate({
        display: "block",
        width: "100%"
    });
    var inputref = createRef();
    var state1 = createstate("hello");
    var vdom = assertvalidvirtualdom(_templateObject2(), {
        display: "block",
        width: "100%"
    }, (function(e) {
        return state1.value = e.target.value;
    }), inputref, (function(e) {
        return state1.value = e.target.value;
    }), state1, stylestate);
    watch(state1, console.log);
    console.log(vdom);
    createApp(vdom, document.getElementById("app"));
})();

(function() {
    var _class2, _temp;
    var myvdom1111111 = h(function(_HTMLElement) {
        _inherits(_class, _HTMLElement);
        function _class() {
            var _this;
            _classCallCheck(this, _class);
            _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this));
            for (var _len = arguments.length, argwwwuments = new Array(_len), _key = 0; _key < _len; _key++) {
                argwwwuments[_key] = arguments[_key];
            }
            console.log(argwwwuments);
            return _this;
        }
        return _class;
    }(_wrapNativeSuper(HTMLElement)), {
        style: {
            display: "block"
        }
    }, "hhhhhhhhhhhhtests");
    console.log(myvdom1111111);
    document.body.appendChild(createApp(myvdom1111111, document.createElement("div")));
    document.body.appendChild(createApp(h(function() {
        var Aaaaaaaaaa = function(_HTMLElement2) {
            _inherits(Aaaaaaaaaa, _HTMLElement2);
            function Aaaaaaaaaa() {
                _classCallCheck(this, Aaaaaaaaaa);
                return _possibleConstructorReturn(this, _getPrototypeOf(Aaaaaaaaaa).apply(this, arguments));
            }
            return Aaaaaaaaaa;
        }(_wrapNativeSuper(HTMLElement));
        Aaaaaaaaaa.defaultProps = {
            name: "HelloKitty",
            myAge: 18
        };
        return Aaaaaaaaaa;
    }()), document.createElement("div")));
    var myele1 = h((_temp = _class2 = function(_HTMLElement3) {
        _inherits(_class2, _HTMLElement3);
        function _class2() {
            _classCallCheck(this, _class2);
            return _possibleConstructorReturn(this, _getPrototypeOf(_class2).apply(this, arguments));
        }
        return _class2;
    }(_wrapNativeSuper(HTMLElement)), _defineProperty(_class2, "defaultProps", {
        name: "aaaaaaaaaaHelloKitty",
        myAge: 0x71afd498cfffe
    }), _temp));
    console.log(myele1);
    document.body.appendChild(createApp(myele1, document.createElement("div")));
    document.body.appendChild(createApp(myele1, document.createElement("div")));
})();

(function() {
    var vdom2 = assertvalidvirtualdom(_templateObject3(), "<a>绑定textcontent</a>", "<a>绑定innerhtml</a>");
    console.log(vdom2);
    document.body.appendChild(createApp(vdom2, document.createElement("div")));
    var state1 = createstate("<a>绑定textcontent</a>");
    var state2 = createstate("<a>绑定innerhtml</a>");
    var vdom3 = assertvalidvirtualdom(_templateObject4(), state1, [ function(e) {
        state1.value = e.target.value;
    } ], state2, [ function(e) {
        state2.value = e.target.value;
    } ], [ function(e) {
        state2.value = e.target.value;
    } ]);
    console.log(vdom3);
    document.body.appendChild(createApp(vdom3, document.createElement("div")));
    var state3 = createstate("<a>绑定innerhtml</a>");
    var vdom4 = assertvalidvirtualdom(_templateObject5(), state3, state3);
    watch(state1, (function(state) {
        return state3.value = state.value;
    }));
    watch(state2, (function(state) {
        return state1.value = state.value;
    }));
    console.log(state3);
    console.log(vdom4);
    document.body.appendChild(createApp(vdom4, document.createElement("div")));
    var objstate = createstate({
        a: "w",
        6: "xxxxxxx",
        tttttttt: "true"
    });
    var objstate2 = createstate('{ a: "w", 6: "xxxxxxx", tttttttt: "true" }');
    console.log(objstate);
    requestAnimationFrame((function() {
        objstate.length = 10;
        objstate2.value = 2222222222222;
    }));
    var objstatearray = createstate([ {
        a: "w",
        6: "xxxxxxx",
        tttttttt: "true"
    }, 1, true, "test" ]);
    var stylestate = createstate({
        display: "block",
        width: "100%"
    });
    var vdomobj = assertvalidvirtualdom(_templateObject6(), {
        display: "block",
        width: "100%"
    }, objstate2, stylestate, objstatearray, objstate);
    document.body.appendChild(createApp(vdomobj, document.createElement("div")));
    console.log(vdomobj);
    requestAnimationFrame((function() {
        objstatearray.unshift(Math.random());
        objstatearray.push("qqqqqqqqq");
        objstatearray.unshift(Math.random());
        objstatearray.push("qqqqqqqqq");
        objstatearray.length = 10;
        objstatearray.push(Math.random());
    }));
    console.log(objstatearray);
    var timer = setInterval((function() {
        objstate2.value += String(Math.random());
    }), 1e3);
    setTimeout((function() {
        clearInterval(timer);
    }), 1e4);
    console.log([ objstate2, createstate(objstate2) ]);
    console.log(Object.entries(objstate));
})();

(function() {
    var vdom = assertvalidvirtualdom(_templateObject7());
    document.body.appendChild(createApp(vdom, document.createElement("div")));
    console.log(vdom);
})();
//# sourceMappingURL=index-es5.js.map
