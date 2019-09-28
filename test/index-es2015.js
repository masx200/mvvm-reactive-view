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

window.CustomElementRegistry = Reflect.get(Reflect.getPrototypeOf(window.customElements), "constructor");

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

var Reflect$1 = window.Reflect;

var construct = Reflect$1.construct, _deleteProperty = Reflect$1.deleteProperty, _get = Reflect$1.get, _getOwnPropertyDescriptor = Reflect$1.getOwnPropertyDescriptor, getPrototypeOf = Reflect$1.getPrototypeOf, _has = Reflect$1.has, _ownKeys = Reflect$1.ownKeys, _set = Reflect$1.set;

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
    return {}.toString.call(a).replace("[object ", "").replace("]", "").toLowerCase().trim();
}

function isSet(a) {
    return gettagtype(a) === "set" && a instanceof Set;
}

var invalid_Function = "invalid Function";

var message = "invalid useMounted or useUnMounted out of createComponent";

var ctxopen = false;

var Mounted = new Set;

var UnMounted = new Set;

function getMounted() {
    return _toConsumableArray(Mounted);
}

function getUnMounted() {
    return _toConsumableArray(UnMounted);
}

function useMounted(fun) {
    if (isfunction(fun)) {
        if (ctxopen) {
            Mounted.add(fun);
        } else {
            throw Error(message);
        }
    } else {
        throw TypeError(invalid_Function);
    }
}

function useUnMounted(fun) {
    if (isfunction(fun)) {
        if (ctxopen) {
            UnMounted.add(fun);
        } else {
            throw Error(message);
        }
    } else {
        throw TypeError(invalid_Function);
    }
}

function clearMounted() {
    Mounted = new Set;
}

function clearUnMounted() {
    UnMounted = new Set;
}

function openctx() {
    ctxopen = true;
    clearMounted();
    clearUnMounted();
}

function closectx() {
    ctxopen = false;
    clearMounted();
    clearUnMounted();
}

var readysymbol = Symbol("ready");

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

var svgnamespace = "http://www.w3.org/2000/svg";

function changetext(textnode, value) {
    textnode.nodeValue = String(value);
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
    return Array.from(ele.childNodes);
}

function getAttribute(ele, name) {
    return HTMLElementprototype.getAttribute.call(ele, name);
}

function _setAttribute(ele, name, value) {
    HTMLElementprototype.setAttribute.call(ele, name, value);
}

function _removeAttribute(ele, name) {
    HTMLElementprototype.removeAttribute.call(ele, name);
}

var HTMLElementprototype = HTMLElement.prototype;

function createanotherhtmldocument() {
    return document$1.implementation.createHTMLDocument("");
}

function isprimitive(a) {
    return isstring(a) || isnumber(a) || isboolean(a) || isundefined(a);
}

var _a, _b;

var invalid_primitive_or_object_state = "invalid primitive or object state";

function isReactiveState(a) {
    return a instanceof ReactiveState;
}

var eventtargetsymbol = Symbol("eventtatget");

var memlisteners = Symbol("memlisteners");

var dispatchsymbol = getsymbol("dispatch");

var subscribesymbol = getsymbol("subscribe");

var removeallistenerssymbol = getsymbol("removeallisteners");

var addallistenerssymbol = getsymbol("addallisteners");

var ReactiveState = function() {
    function ReactiveState(init) {
        _classCallCheck(this, ReactiveState);
        this[_a] = new EventTarget;
        this[_b] = [];
        if (isprimitive(init) || isobject(init)) {
            Object.defineProperty(this, "value", {
                value: init,
                configurable: true,
                writable: true
            });
        } else {
            console.error(init);
            throw TypeError(invalid_primitive_or_object_state);
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
            return isprimitive(value) ? String(value) : isSet(value) ? JSON.stringify(_toConsumableArray(value)) : isobject(value) ? JSON.stringify(value) : "";
        }
    }, {
        key: (_a = eventtargetsymbol, _b = memlisteners, dispatchsymbol),
        value: function value(eventname) {
            var name = eventname ? String(eventname) : "value";
            if (name !== "value") {
                this[eventtargetsymbol].dispatchEvent(new CustomEvent(name, {
                    detail: name
                }));
            }
            this[eventtargetsymbol].dispatchEvent(new CustomEvent("value", {
                detail: name
            }));
        }
    }, {
        key: subscribesymbol,
        value: function value(callback, eventname) {
            var _this2 = this;
            var name = eventname ? String(eventname) : "value";
            this[memlisteners].push([ name, function(event) {
                return callback(_this2, event.detail);
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

function isconnected(element) {
    return document.documentElement === getancestornode(element);
}

function getancestornode(node) {
    while (node.parentNode && node.parentNode !== document) {
        node = node.parentNode;
    }
    return node;
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
        var element = ele;
        if (typeof text == "string") {
            requestAnimationFrame$1((function() {
                seteletext(ele, text);
            }));
        } else if (isReactiveState(text)) {
            watch(text, (function(state) {
                if (isconnected(element)) {
                    seteletext(ele, String(state));
                }
            }));
            requestAnimationFrame$1((function() {
                seteletext(ele, String(text));
            }));
        } else {
            throw TypeError("invalid " + errorname);
        }
    };
}

var componentsymbol = Symbol("iscomponent");

var Reflect$2 = window.Reflect;

var get$1 = Reflect$2.get, set$1 = Reflect$2.set;

var valuestring = "value";

function isobject$1(a) {
    return _typeof(a) === "object" && a !== null;
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

function objtostylestring(o) {
    return Object.entries(o).map((function(_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2), key = _ref7[0], value = _ref7[1];
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
    var outputattrs = new Proxy(temp, {
        ownKeys: function ownKeys() {
            var keys = attributesownkeys(ele);
            return isinputtextortextareaflag ? Array.from(new Set([].concat(_toConsumableArray(keys), [ valuestring ]))) : keys;
        },
        get: function get(target, key) {
            if (isinputtextortextareaflag && key === valuestring) {
                return get$1(ele, valuestring);
            } else {
                var v = getattribute(ele, String(key));
                if (v === "") {
                    return true;
                }
                if (v === null) {
                    return;
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
            } else if (key === "class" && isobject$1(v)) {
                if (isArray(v)) {
                    setattribute(ele, String(key), v.join(" "));
                } else if (isSet$1(v)) {
                    setattribute(ele, String(key), _toConsumableArray(v).join(" "));
                } else {
                    setattribute(ele, String(key), JSON.stringify(v));
                }
            } else {
                if (isSet$1(v)) {
                    setattribute(ele, String(key), JSON.stringify(_toConsumableArray(v)));
                } else {
                    if (v === true) {
                        v = "";
                    }
                    setattribute(ele, String(key), isobject$1(v) ? JSON.stringify(v) : String(v));
                    return true;
                }
            }
            return true;
        },
        deleteProperty: function deleteProperty(t, k) {
            removeAttribute$1(ele, String(k));
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
            var myvalue = get$1(outputattrs, key);
            if (typeof myvalue !== "undefined") {
                return _objectSpread2({
                    value: myvalue
                }, otherdescipter);
            } else {
                return;
            }
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

function removeAttribute$1(ele, key) {
    return ele.removeAttribute(key);
}

function hasAttribute(ele, key) {
    return ele.hasAttribute(key);
}

function isinputtextortextarea(ele) {
    var tagname = geteletagname(ele);
    return tagname === "input" && get$1(ele, "type") === "text" || tagname === "textarea";
}

var attributeChangedCallback = "attributeChangedCallback";

var AttrChange = function(_HTMLElement) {
    _inherits(AttrChange, _HTMLElement);
    function AttrChange() {
        _classCallCheck(this, AttrChange);
        return _possibleConstructorReturn(this, _getPrototypeOf(AttrChange).apply(this, arguments));
    }
    _createClass(AttrChange, [ {
        key: "setAttribute",
        value: function setAttribute(qualifiedName, value) {
            var oldValue = getAttribute(this, qualifiedName);
            if (oldValue !== value) {
                _setAttribute(this, qualifiedName, value);
                if (isfunction(this[attributeChangedCallback])) {
                    this[attributeChangedCallback](qualifiedName, oldValue, value);
                }
            }
        }
    }, {
        key: "removeAttribute",
        value: function removeAttribute(qualifiedName) {
            var oldValue = getAttribute(this, qualifiedName);
            if (null !== oldValue) {
                _removeAttribute(this, qualifiedName);
                if (isfunction(this[attributeChangedCallback])) {
                    this[attributeChangedCallback](qualifiedName, oldValue, undefined);
                }
            }
        }
    } ]);
    return AttrChange;
}(_wrapNativeSuper(HTMLElement));

function merge_entries(a) {
    var m = {};
    a.forEach((function(_ref8) {
        var _ref9 = _slicedToArray(_ref8, 2), key = _ref9[0], value = _ref9[1];
        if (!m[key]) {
            m[key] = new Set;
        }
        value.forEach((function(v) {
            m[key].add(v);
        }));
    }));
    return Object.entries(m).map((function(_ref10) {
        var _ref11 = _slicedToArray(_ref10, 2), k = _ref11[0], v = _ref11[1];
        return [ k, Array.from(v) ];
    }));
}

function isVirtualdom(a) {
    return a instanceof Virtualdom;
}

var Virtualdom = function Virtualdom() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    _classCallCheck(this, Virtualdom);
    this.type = "";
    this.props = {};
    this.children = [];
    this.directives = {};
    this.onevent = {};
    this.bindattr = {};
    var 字母大小写 = /[A-Za-z]/;
    var propsentries = Object.entries(props);
    var propsentriesNOTevents = propsentries.filter((function(_ref12) {
        var _ref13 = _slicedToArray(_ref12, 1), key = _ref13[0];
        return !(key.startsWith("@") || key.startsWith("on"));
    }));
    var 字母开头的entries = propsentriesNOTevents.filter((function(_ref14) {
        var _ref15 = _slicedToArray(_ref14, 1), key = _ref15[0];
        return 字母大小写.test(key[0]);
    }));
    Object.assign(this, {
        type: type,
        bindattr: Object.fromEntries(字母开头的entries.filter((function(e) {
            return isReactiveState(e[1]);
        }))),
        props: Object.fromEntries(字母开头的entries.filter((function(e) {
            return !isReactiveState(e[1]);
        }))),
        children: children.flat(),
        onevent: Object.fromEntries(merge_entries([].concat(_toConsumableArray(propsentries.filter((function(_ref16) {
            var _ref17 = _slicedToArray(_ref16, 1), key = _ref17[0];
            return /\@/.test(key[0]);
        })).map((function(_ref18) {
            var _ref19 = _slicedToArray(_ref18, 2), key = _ref19[0], value = _ref19[1];
            return [ key.slice(1).toLowerCase().trim(), [ value ].flat() ];
        }))), _toConsumableArray(propsentries.filter((function(_ref20) {
            var _ref21 = _slicedToArray(_ref20, 1), key = _ref21[0];
            return key.startsWith("on");
        })).map((function(_ref22) {
            var _ref23 = _slicedToArray(_ref22, 2), key = _ref23[0], value = _ref23[1];
            return [ key.slice(2).toLowerCase().trim(), [ value ].flat() ];
        })))))),
        directives: Object.fromEntries(propsentriesNOTevents.filter((function(_ref24) {
            var _ref25 = _slicedToArray(_ref24, 1), key = _ref25[0];
            return /\*/.test(key[0]);
        })).map((function(_ref26) {
            var _ref27 = _slicedToArray(_ref26, 2), key = _ref27[0], value = _ref27[1];
            return [ key.slice(1).toLowerCase().trim(), value ];
        })))
    });
    Object.defineProperty(this, Symbol.toStringTag, {
        value: "virtualdom",
        configurable: true
    });
};

function toArray(a) {
    return (isarray(a) ? a : [ a ]).flat();
}

var eventlistenerssymbol = Symbol("eventlisteners");

function onevent(element, eventname, callback) {
    if (!element[eventlistenerssymbol]) {
        element[eventlistenerssymbol] = [];
    }
    firstaddlisteners(element, eventname, toArray(callback));
}

function firstaddlisteners(ele, event, callarray) {
    callarray.forEach((function(call) {
        if (!isfunction(call)) {
            console.error(call);
            throw TypeError(invalid_Function);
        }
        ele[eventlistenerssymbol].push([ event, call ]);
        domaddlisten(ele, event, call);
    }));
}

function removelisteners(ele) {
    if (ele[eventlistenerssymbol]) {
        ele[eventlistenerssymbol].forEach((function(_ref28) {
            var _ref29 = _slicedToArray(_ref28, 2), event = _ref29[0], call = _ref29[1];
            domremovelisten(ele, event, call);
        }));
    }
}

function readdlisteners(ele) {
    if (ele[eventlistenerssymbol]) {
        ele[eventlistenerssymbol].forEach((function(_ref30) {
            var _ref31 = _slicedToArray(_ref30, 2), event = _ref31[0], call = _ref31[1];
            domaddlisten(ele, event, call);
        }));
    }
}

function onmounted(ele) {
    if (isarray(ele)) {
        ele.forEach((function(e) {
            onmounted(e);
        }));
    } else if (ele instanceof Node) {
        if (ele[eventlistenerssymbol]) {
            readdlisteners(ele);
        }
        if (ele[bindstatesymbol]) {
            ele[bindstatesymbol].forEach((function(state) {
                rewatch(state);
            }));
        }
        onmounted(getdomchildren(ele));
    }
}

function onunmounted(ele) {
    if (isarray(ele)) {
        ele.forEach((function(e) {
            onunmounted(e);
        }));
    } else if (ele instanceof Node) {
        if (ele[eventlistenerssymbol]) {
            removelisteners(ele);
        }
        onunmounted(getdomchildren(ele));
    }
}

function createElement() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var typenormalized = isstring(type) || isfunction(type) ? type : "";
    var propsnormalized = isobject(props) ? props : {};
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }
    var childrennormalized = children.flat(Infinity);
    if (isstring(typenormalized)) {
        typenormalized = typenormalized.trim().toLowerCase();
    }
    if ("" === typenormalized) {
        return childrennormalized;
    }
    return new Virtualdom(typenormalized, propsnormalized, childrennormalized);
}

function isvalidvdom(v) {
    if (isnumber(v)) {
        return true;
    }
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

function mount(ele, container) {
    var clear = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    if (clear) {
        seteletext(container, "");
    }
    var eles = toArray(ele).flat(Infinity);
    eles.forEach((function(e) {
        return appendchild(container, e);
    }));
    return container;
}

var invalid_Virtualdom = "invalid Virtualdom ";

function createApp(vdom, container) {
    if (isarray(vdom)) {
        vdom = vdom.flat(Infinity);
    }
    var el = container;
    if (!(el instanceof HTMLElement)) {
        console.error(el);
        throw TypeError("invalid container HTMLElement!");
    }
    if (el === document$1.body || el === document$1.documentElement || el === document$1.head) {
        throw Error("Do not mount  to <html> or <body> <head>.");
    }
    var elesarray = toArray(vdom);
    if (isvalidvdom(vdom)) {
        mount(render(elesarray), container);
    } else if (vdom instanceof Node || isNodeArray(vdom)) {
        mount(elesarray, container);
    } else {
        console.error(vdom);
        throw TypeError(invalid_Virtualdom);
    }
    return container;
}

function isNodeArray(array) {
    return isarray(array) && !array.map((function(e) {
        return e instanceof Node;
    })).includes(false);
}

var invalid_ReactiveState = "invalid ReactiveState";

var truevdomsymbol = Symbol("truevdom");

var falsevdomsymbol = Symbol("falsevdom");

var trueelesymbol = Symbol("trueele");

var falseelesymbol = Symbol("falseele");

var handletrue = getsymbol("handletrue");

var handlefalse = getsymbol("handlefalse");

function conditon(conditon, iftrue, iffalse) {
    var _a, _b;
    if (!(isReactiveState(conditon) || isboolean(conditon))) {
        throw TypeError(invalid_ReactiveState);
    }
    [ iftrue, iffalse ].forEach((function(a) {
        if (!(isundefined(a) || isvalidvdom(a))) {
            throw new TypeError(invalid_Virtualdom);
        }
    }));
    var options = {
        true: iftrue,
        false: iffalse
    };
    var Condition = function(_AttrChange) {
        _inherits(Condition, _AttrChange);
        function Condition() {
            var _this4;
            _classCallCheck(this, Condition);
            _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Condition).call(this));
            _this4[_b] = false;
            var optionstrue = _get(options, "true");
            var optionsfalse = _get(options, "false");
            _this4[truevdomsymbol] = isarray(optionstrue) ? optionstrue.filter(Boolean) : [ optionstrue ].filter(Boolean);
            _this4[falsevdomsymbol] = isarray(optionsfalse) ? optionsfalse.filter(Boolean) : [ optionsfalse ].filter(Boolean);
            return _this4;
        }
        _createClass(Condition, [ {
            key: (_a = componentsymbol, _b = readysymbol, handlefalse),
            value: function value() {
                setelehtml(this, "");
                if (this[falsevdomsymbol]) {
                    if (!this[falseelesymbol]) {
                        this[falseelesymbol] = render(this[falsevdomsymbol]);
                    }
                    var elementtomount = this[falseelesymbol];
                    createApp(elementtomount, this);
                    elementtomount.forEach((function(e) {
                        return onmounted(e);
                    }));
                    if (this[trueelesymbol]) {
                        this[trueelesymbol].forEach((function(e) {
                            return onunmounted(e);
                        }));
                    }
                }
            }
        }, {
            key: handletrue,
            value: function value() {
                setelehtml(this, "");
                if (this[truevdomsymbol]) {
                    if (!this[trueelesymbol]) {
                        this[trueelesymbol] = render(this[truevdomsymbol]);
                    }
                    var elementtomount = this[trueelesymbol];
                    createApp(elementtomount, this);
                    elementtomount.forEach((function(e) {
                        return onmounted(e);
                    }));
                    if (this[falseelesymbol]) {
                        this[falseelesymbol].forEach((function(e) {
                            return onunmounted(e);
                        }));
                    }
                }
            }
        }, {
            key: "connectedCallback",
            value: function connectedCallback() {
                if (!this[readysymbol]) {
                    this[readysymbol] = true;
                    var attrs = createeleattragentreadwrite(this);
                    if (true === attrs["value"]) {
                        this[handletrue]();
                    }
                    if (false === attrs["value"]) {
                        this[handlefalse]();
                    }
                }
                onmounted(this);
            }
        }, {
            key: "disconnectedCallback",
            value: function disconnectedCallback() {
                onunmounted(this);
            }
        }, {
            key: "attributeChangedCallback",
            value: function attributeChangedCallback(name) {
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
        } ]);
        return Condition;
    }(AttrChange);
    Condition[_a] = true;
    var vdom = new Virtualdom(Condition, {
        value: conditon
    });
    return vdom;
}

function watch(state, callback, statekey) {
    if (!(isReactiveState(state) && isfunction(callback))) {
        console.error(state);
        console.error(callback);
        throw TypeError(invalid_ReactiveState + invalid_Function);
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

function rewatch(state) {
    state[addallistenerssymbol]();
}

var invalid_custom_element_class = "invalid custom element class !";

if (!isobject(window.customElements)) {
    throw new TypeError(" customElements  not supported !");
}

function 使用value从表中查询key(表, 组件状态名) {
    return Object.entries(表).find((function(v) {
        return v[1] === 组件状态名;
    }))[0];
}

window.CustomElementRegistry = _get(getPrototypeOf(window.customElements), "constructor");

var _window = window, customElements$1 = _window.customElements, CustomElementRegistry = _window.CustomElementRegistry;

var elementset = Symbol["for"]("elementset");

var elementmap = Symbol["for"]("elementmap");

var RandomDefineCustomElement = function RandomDefineCustomElement(initclass, extendsname) {
    return RandomDefineCustomElement$1(initclass, extendsname);
};

function RandomDefineCustomElement$1(initclass, extendsname) {
    var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    if (!isclassextendsHTMLElement(initclass)) {
        throw TypeError(invalid_custom_element_class);
    }
    if (!customElements$1[elementset].has(initclass)) {
        var elementname = getrandomstringandnumber(length);
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
        return 使用value从表中查询key(customElements$1[elementmap], initclass);
    }
}

if (!customElements$1[elementset]) {
    customElements$1[elementset] = new Set;
}

if (!customElements$1[elementmap]) {
    customElements$1[elementmap] = {};
}

customElements$1.define = function(name, constructor, options) {
    if (!isclassextendsHTMLElement(constructor)) {
        console.error(constructor);
        throw TypeError(invalid_custom_element_class);
    }
    if (!customElements$1[elementset].has(constructor)) {
        if (_has(customElements$1[elementmap], name)) {
            RandomDefineCustomElement$1(constructor, options ? options["extends"] : undefined);
        } else {
            CustomElementRegistry.prototype.define.call(customElements$1, name, constructor, options);
            customElements$1[elementset].add(constructor);
            customElements$1[elementmap][name] = constructor;
        }
    }
};

customElements$1[Symbol.iterator] = function() {
    var entries = Object.entries(customElements$1[elementmap]);
    return entries[Symbol.iterator].call(entries);
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
    var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
    return Array(length).fill(undefined).map((function() {
        return getrandomcharactor();
    })).join("") + "-" + Array(length).fill(undefined).map((function() {
        return getrandomhexnumber();
    })).join("");
}

function isclassextendsHTMLElement(initclass) {
    return !!(isfunction(initclass) && initclass.prototype && initclass.prototype instanceof HTMLElement);
}

function createcostumelemet(initclass, propsjson, children, options) {
    if (isclassextendsHTMLElement(initclass)) {
        RandomDefineCustomElement(initclass);
        return construct(initclass, [ propsjson, children, options ]);
    } else {
        console.error(initclass);
        throw TypeError(invalid_custom_element_class);
    }
}

var bindstatesymbol = Symbol("bindstate");

var reactivestatesymbol = Symbol("reactive");

var virtualdomsymbol = Symbol("virtualdom");

function throwinvalideletype(type) {
    console.error(type);
    throw TypeError("invalid element type!");
}

function render(vdom, namespace) {
    if (isnumber(vdom)) {
        return createtextnode(vdom);
    } else if (typeof vdom === "string") {
        return createtextnode(vdom);
    } else if (vdom instanceof ReactiveState) {
        var reactive = vdom;
        var textnode = createtextnode(String(reactive));
        textnode[reactivestatesymbol] = reactive;
        watch(reactive, (function(state) {
            if (isconnected(element)) {
                changetext(textnode, String(state));
            }
        }));
        var element = textnode;
        element[bindstatesymbol] = new Set;
        element[bindstatesymbol].add(reactive);
        return textnode;
    } else if (vdom instanceof Virtualdom && "type" in vdom) {
        var type = vdom.type;
        var _element;
        if (typeof type === "string") {
            if (type === "script") {
                return createDocumentFragment();
            } else if (type === "svg") {
                _element = createsvgelement();
            } else if (type === "math") {
                _element = createmathelement();
            } else if ("" === type || type === "html") {
                return render(vdom.children);
            } else {
                _element = namespace ? createElementNS(namespace, type) : createnativeelement(type);
            }
        } else if (typeof type == "function") {
            if (isobject(type["defaultProps"])) {
                vdom.props = JSON.parse(JSON.stringify(_objectSpread2({}, type["defaultProps"], {}, vdom.props)));
            }
            var propsjson = JSON.parse(JSON.stringify(_objectSpread2({}, vdom.props, {}, Object.fromEntries(Object.entries(vdom.bindattr).map((function(_ref32) {
                var _ref33 = _slicedToArray(_ref32, 2), key = _ref33[0], value = _ref33[1];
                return [ key, value.value ];
            }))))));
            _element = createcostumelemet(type, propsjson, vdom.children);
        } else {
            throwinvalideletype(vdom);
        }
        handleprops(_element, vdom);
        if (type && (isfunction(type) || isstring(type))) {
            if (!type[componentsymbol]) {
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
                })), _element);
            }
        }
        return _element;
    } else if (isarray(vdom)) {
        return vdom.map((function(a) {
            return render(a);
        })).flat();
    } else {
        throwinvalideletype(vdom);
    }
}

function handleprops(element, vdom) {
    (function(element, vdom) {
        Object.entries(vdom.directives).forEach((function(_ref34) {
            var _ref35 = _slicedToArray(_ref34, 2), name = _ref35[0], value = _ref35[1];
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
        Object.entries(vdom.bindattr).forEach((function(_ref36) {
            var _ref37 = _slicedToArray(_ref36, 2), key = _ref37[0], primitivestate = _ref37[1];
            attribute1[key] = primitivestate.value;
            watch(primitivestate, (function(state) {
                if (isconnected(element)) {
                    attribute1[key] = state.value;
                }
            }));
        }));
        if (!element[eventlistenerssymbol]) {
            element[eventlistenerssymbol] = [];
        }
        Object.entries(vdom.onevent).forEach((function(_ref38) {
            var _ref39 = _slicedToArray(_ref38, 2), event = _ref39[0], callbacks = _ref39[1];
            onevent(element, event, callbacks);
        }));
    })(element, vdom);
    if (!element[bindstatesymbol]) {
        element[bindstatesymbol] = new Set;
    }
    [].concat(_toConsumableArray(Object.values(vdom.bindattr)), _toConsumableArray(Object.values(vdom.directives))).flat().filter((function(e) {
        return isReactiveState(e);
    })).forEach((function(e) {
        return element[bindstatesymbol].add(e);
    }));
}

function readonlyproxy(target) {
    return new Proxy(target, {
        set: function set() {
            return false;
        },
        defineProperty: function defineProperty() {
            return false;
        },
        deleteProperty: function deleteProperty() {
            return false;
        },
        setPrototypeOf: function setPrototypeOf() {
            return false;
        }
    });
}

function isArray$1(a) {
    return Array.isArray(a);
}

var Reflect$3 = window.Reflect;

var ownKeys$1 = Reflect$3.ownKeys, deleteProperty$1 = Reflect$3.deleteProperty, _apply = Reflect$3.apply, construct$1 = Reflect$3.construct, _defineProperty$1 = Reflect$3.defineProperty, get$2 = Reflect$3.get, getOwnPropertyDescriptor$1 = Reflect$3.getOwnPropertyDescriptor, getPrototypeOf$1 = Reflect$3.getPrototypeOf, has$1 = Reflect$3.has, set$2 = Reflect$3.set, _setPrototypeOf$1 = Reflect$3.setPrototypeOf;

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
        if (isArray$1(target)) {
            fakeobj = [];
        } else if (isfunction$1(target)) {
            fakeobj = function fakeobj() {};
        } else {
            fakeobj = {};
        }
        _setPrototypeOf$1(fakeobj, null);
        return function(fakeobj) {
            return new Proxy(fakeobj, {
                defineProperty: function defineProperty(t, p, a) {
                    return _defineProperty$1(target, p, a);
                },
                deleteProperty: function deleteProperty(t, p) {
                    callback(ancestor, [].concat(_toConsumableArray(patharray), [ p ]), undefined, get$2(target, p));
                    return deleteProperty$1(target, p);
                },
                ownKeys: function ownKeys() {
                    return ownKeys$1(target);
                },
                has: function has(t, p) {
                    return has$1(target, p);
                },
                getPrototypeOf: function getPrototypeOf() {
                    return getPrototypeOf$1(target);
                },
                setPrototypeOf: function setPrototypeOf(t, v) {
                    return _setPrototypeOf$1(target, v);
                },
                construct: function construct(t, argumentslist) {
                    if (typeof target === "function") {
                        return construct$1(target, argumentslist);
                    }
                },
                apply: function apply(t, thisarg, argarray) {
                    if (typeof target === "function") {
                        return _apply(target, thisarg, argarray);
                    }
                },
                getOwnPropertyDescriptor: function getOwnPropertyDescriptor(t, k) {
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
                if (key === "value" && isprimitive(value)) {
                    _set(target, key, value);
                    target[dispatchsymbol]();
                    return true;
                } else {
                    return false;
                }
            },
            setPrototypeOf: function setPrototypeOf() {
                return false;
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
                if (key === "value" && (gettagtype(value) === "array" || gettagtype(value) === "object")) {
                    return observedeepagent(_get(target, key), (function(_target, patharray) {
                        target[dispatchsymbol](patharray[0]);
                    }));
                } else if (_has(target, key)) {
                    return _get(target, key);
                } else if (_has(value, key)) {
                    if (isSet(value) && (key === "add" || key === "delete")) {
                        var myvalue = value;
                        if (key === "add") {
                            return function(add) {
                                if (!Set.prototype.has.call(myvalue, add)) {
                                    var returnvalue = Set.prototype[key].call(myvalue, add);
                                    target[dispatchsymbol]();
                                    return returnvalue;
                                }
                            };
                        } else if (key === "delete") {
                            return function(dele) {
                                if (Set.prototype.has.call(myvalue, dele)) {
                                    var returnvalue = Set.prototype[key].call(myvalue, dele);
                                    target[dispatchsymbol]();
                                    return returnvalue;
                                }
                            };
                        }
                    } else {
                        return observedeepagent(_get(value, key), (function() {
                            target[dispatchsymbol](key);
                        }));
                    }
                }
            },
            ownKeys: function ownKeys(target) {
                return Array.from(new Set([].concat(_toConsumableArray(_ownKeys(target)), _toConsumableArray(_ownKeys(_get(target, "value"))))));
            },
            set: function set(target, key, value) {
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
            },
            setPrototypeOf: function setPrototypeOf() {
                return false;
            }
        });
    } else {
        console.error(init);
        throw TypeError(invalid_primitive_or_object_state);
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
    var styleelement = render(createElement("style", undefined, text));
    var otherdocument = createanotherhtmldocument();
    appendchild(otherdocument.firstElementChild, styleelement);
    return Array.from(styleelement.sheet.cssRules);
}

function isCSSStyleRule(a) {
    return gettagtype(a) === "cssstylerule";
}

function selectoraddprefix(cssstylerule, prefix) {
    var selectorText = cssstylerule.selectorText;
    if (selectorText.startsWith("*")) {
        cssstylerule.selectorText = selectorText.replace("*", prefix);
    } else {
        cssstylerule.selectorText = prefix + " " + selectorText;
    }
    return cssstylerule;
}

function prefixcssrules(cssRulesarray, prefix) {
    return cssRulesarray.map((function(cssrule) {
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
    }));
}

var componentsstylesheet = {};

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
    return cssrules.map((function(c) {
        return c.cssText;
    })).join("\n");
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
    return new Promise((function(rs) {
        var loaderrorfun = function loaderrorfun() {
            stylelinkelement.onload = stylelinkelement.onerror = undefined;
            rs();
        };
        stylelinkelement.onload = loaderrorfun;
        stylelinkelement.onerror = loaderrorfun;
        appendchild(container, stylelinkelement);
    }));
}

var attributessymbol = Symbol("attributes");

var elementsymbol = Symbol("innerelement");

var vdomsymbol = Symbol("componentinnervdom");

var mountedsymbol = Symbol("mounted");

var unmountedsymbol = Symbol("unmounted");

function createComponent(custfun) {
    var _a, _b, _c, _d;
    if (isfunction(custfun)) {
        var defaultProps = custfun["defaultProps"];
        var css = custfun["css"];
        return _d = function(_AttrChange2) {
            _inherits(Component, _AttrChange2);
            function Component() {
                var _this5;
                var propsjson = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
                _classCallCheck(this, Component);
                _this5 = _possibleConstructorReturn(this, _getPrototypeOf(Component).call(this));
                _this5[_b] = false;
                _this5[_c] = {};
                var css = _this5.constructor["css"];
                if (css) {
                    var prefix = _this5.tagName.toLowerCase();
                    if (!componentsstylesheet[prefix]) {
                        registercssprefix(css, prefix);
                    }
                }
                var defaultProps = _this5.constructor["defaultProps"];
                var attrs = createeleattragentreadwrite(_assertThisInitialized(_this5));
                if (isobject(defaultProps)) {
                    Object.assign(attrs, defaultProps);
                }
                if (isobject(propsjson)) {
                    Object.assign(attrs, propsjson);
                }
                var props = attrs;
                var thisattributess = Object.fromEntries(Object.entries(props).map((function(_ref40) {
                    var _ref41 = _slicedToArray(_ref40, 2), key = _ref41[0], value = _ref41[1];
                    return [ key, createstate(value) ];
                })));
                _this5[attributessymbol] = readonlyproxy(thisattributess);
                openctx();
                var possiblyvirtualdom;
                try {
                    possiblyvirtualdom = custfun.call(undefined, readonlyproxy(Object.fromEntries(Object.entries(thisattributess).map((function(_ref42) {
                        var _ref43 = _slicedToArray(_ref42, 2), key = _ref43[0], value = _ref43[1];
                        return [ key, readonlyproxy(value) ];
                    })))), children);
                } catch (error) {
                    closectx();
                    throw error;
                }
                if (isarray(possiblyvirtualdom)) {
                    possiblyvirtualdom = possiblyvirtualdom.flat(Infinity).filter(Boolean);
                }
                if (isvalidvdom(possiblyvirtualdom)) {
                    var thisvdomsymbol = toArray(possiblyvirtualdom);
                    _this5[vdomsymbol] = thisvdomsymbol.flat(Infinity).filter(Boolean);
                    _this5[mountedsymbol] = getMounted();
                    _this5[unmountedsymbol] = getUnMounted();
                    closectx();
                } else {
                    closectx();
                    console.error(possiblyvirtualdom);
                    throw Error(invalid_Virtualdom);
                }
                return _this5;
            }
            _createClass(Component, [ {
                key: "connectedCallback",
                value: function connectedCallback() {
                    var _this6 = this;
                    if (!this[elementsymbol]) {
                        this[elementsymbol] = render(this[vdomsymbol]).flat(Infinity);
                    }
                    if (!this[readysymbol]) {
                        this[readysymbol] = true;
                        var _css = this.constructor["css"];
                        var prefix = this.tagName.toLowerCase();
                        if (_css && componentsstylesheet[prefix]) {
                            seteletext(this, "");
                            Promise.all(_toConsumableArray(componentsstylesheet[prefix]).map((function(styleurl) {
                                return loadlinkstyle(createlinkstylesheet(styleurl), _this6);
                            }))).then((function() {
                                mount(_this6[elementsymbol], _this6, false);
                            }));
                        } else {
                            mount(this[elementsymbol], this);
                        }
                    }
                    this[mountedsymbol].forEach((function(f) {
                        return f();
                    }));
                    onmounted(this);
                }
            }, {
                key: "disconnectedCallback",
                value: function disconnectedCallback() {
                    this[unmountedsymbol].forEach((function(f) {
                        return f();
                    }));
                    onunmounted(this);
                }
            }, {
                key: "attributeChangedCallback",
                value: function attributeChangedCallback(name) {
                    if (this[attributessymbol][name]) {
                        this[attributessymbol][name].value = createeleattragentreadwrite(this)[name];
                    }
                }
            } ]);
            return Component;
        }(AttrChange), _a = componentsymbol, _b = readysymbol, _c = attributessymbol, _d[_a] = true, 
        _d.css = isstring(css) && css ? css : undefined, _d.defaultProps = isobject(defaultProps) ? JSON.parse(JSON.stringify(defaultProps)) : undefined, 
        _d;
    } else {
        console.error(custfun);
        throw TypeError(invalid_Function);
    }
}

if (!isfunction(window.HTMLElement) || !isfunction(window.Proxy) || !isobject(window.customElements) || !isfunction(window.CustomElementRegistry)) {
    throw new TypeError(" browser not supported !");
}

function extenddirectives(options) {
    Object.entries(options).forEach((function(_ref44) {
        var _ref45 = _slicedToArray(_ref44, 2), key = _ref45[0], value = _ref45[1];
        if (typeof value !== "function") {
            throw TypeError(invalid_Function);
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
            console.error(_value);
            console.error(vdom);
            throw TypeError(invalid_ReactiveState + invalid_Virtualdom);
        }
    }
});

function createRef(init) {
    return {
        value: init
    };
}

var Fragment = "";

(function() {
    var mystate = createstate(true);
    console.log("mystatetest", mystate);
    var vdom = conditon(mystate, "testtrue", createElement("div", undefined, "testfalese"));
    var vdom2 = conditon(mystate, undefined, createElement("div", undefined, "testwwwwwwwwwfalese"));
    var vdom3 = conditon(mystate, createElement("div", undefined, "testwwwwwwwtrueeeeeeeeee"), undefined);
    console.log([ vdom, vdom2, vdom3 ]);
    document.body.appendChild(createApp([ vdom, vdom2, vdom3 ], document.createElement("div")));
    var timer = setInterval((function() {
        mystate.value = !mystate.value;
    }), 1e3);
    setTimeout((function() {
        clearInterval(timer);
    }), 1e4);
})();

(function() {
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
        "@input": function input(e) {
            return state1.value = e.target.value;
        },
        "*ref": inputref,
        "@change": function change(e) {
            return state1.value = e.target.value;
        },
        id: "co11111111111de16",
        class: "col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control",
        value: state1
    }), createElement("h1", {
        style: stylestate
    }, "mvvm-reactive-view"), createElement("button", {
        "@click": function click() {
            stylestate.color = "red";
        }
    }, "red"), createElement("button", {
        "@click": function click() {
            stylestate.color = "green";
        }
    }, "green") ];
    watch(stylestate, console.log);
    watch(state1, console.log);
    console.log(vdom);
    createApp(vdom, document.getElementById("app"));
})();

(function() {
    var vdom2 = [ createElement("div", {
        "*text": "<a>绑定textcontent</a>"
    }), createElement("div", {
        "*html": "<a>绑定innerhtml</a>"
    }) ];
    console.log(vdom2);
    document.body.appendChild(createApp(vdom2, document.createElement("div")));
    var state1 = createstate("<a>绑定textcontent</a>");
    var state2 = createstate("<a>绑定innerhtml</a>");
    var vdom3 = [ createElement("textarea", {
        value: state1,
        "@input": [ function(e) {
            state1.value = e.target.value;
        } ]
    }), createElement("input", {
        value: state2,
        style: "width:100%",
        "@change": [ function(e) {
            state2.value = e.target.value;
        } ],
        "@input": [ function(e) {
            state2.value = e.target.value;
        } ]
    }) ];
    console.log(vdom3);
    document.body.appendChild(createApp(vdom3, document.createElement("div")));
    var state3 = createstate("<a>绑定innerhtml</a>");
    var vdom4 = [ createElement("div", {
        "*text": state3
    }), createElement("div", {
        "*html": state3
    }), createElement("script", null) ];
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
    setTimeout((function() {
        objstate.length = 10;
        objstate2.value = 2222222222222;
    }), 2e3);
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
    watch(classsetstate, console.log);
    setTimeout((function() {
        classsetstate.add("vvvvvvvvvvv");
    }), 5e3);
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
    var vdom = createElement("math", null, createElement("mrow", null, createElement("mrow", null, createElement("msup", null, createElement("mi", null, "a"), createElement("mn", null, "2")), createElement("mo", null, "+"), createElement("msup", null, createElement("mi", null, "b"), createElement("mn", null, "2"))), createElement("mo", null, "="), createElement("msup", null, createElement("mi", null, "c"), createElement("mn", null, "2"))));
    document.body.appendChild(createApp(vdom, document.createElement("div")));
    console.log(vdom);
})();

console.log(customElements, _toConsumableArray(customElements));

customElements.define("qqqqqqqqqq-----a", function(_HTMLElement) {
    _inherits(Bqqqqqqqqq, _HTMLElement);
    function Bqqqqqqqqq() {
        _classCallCheck(this, Bqqqqqqqqq);
        return _possibleConstructorReturn(this, _getPrototypeOf(Bqqqqqqqqq).apply(this, arguments));
    }
    return Bqqqqqqqqq;
}(_wrapNativeSuper(HTMLElement)));

customElements.define("qqqqqqqqqq-----a", function(_HTMLElement2) {
    _inherits(Aqqqqqqqqq, _HTMLElement2);
    function Aqqqqqqqqq() {
        _classCallCheck(this, Aqqqqqqqqq);
        return _possibleConstructorReturn(this, _getPrototypeOf(Aqqqqqqqqq).apply(this, arguments));
    }
    return Aqqqqqqqqq;
}(_wrapNativeSuper(HTMLElement)));

var list = Array(20).fill().map((function(v, i) {
    return i;
}));

var vdom = createElement(Fragment, null, createElement("ul", null, list.map((function(a) {
    return createElement("li", null, "item", a);
}))), createElement("header", {
    class: "common-header fixed noborder floating",
    id: "git-header-nav"
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
}, "个人主页"))), createElement("li", {
    class: "gitee-nav__sidebar-item"
}, createElement("a", {
    href: "/explore"
}, createElement("i", {
    class: "iconfont icon-ic-discover"
}), createElement("span", {
    class: "gitee-nav__sidebar-name"
}, "开源软件"))), createElement("li", {
    class: "gitee-nav__sidebar-item"
}, createElement("a", {
    href: "/gists"
}, createElement("i", {
    class: "iconfont icon-ic-gists1"
}), createElement("span", {
    class: "gitee-nav__sidebar-name"
}, "代码片段"))), createElement("li", {
    class: "gitee-nav__sidebar-item"
}, createElement("a", {
    href: "/enterprises"
}, createElement("i", {
    class: "iconfont icon-ic-enterprise"
}), createElement("span", {
    class: "gitee-nav__sidebar-name"
}, "企业版"))), createElement("li", {
    class: "gitee-nav__sidebar-item"
}, createElement("a", {
    href: "/education"
}, createElement("i", {
    class: "iconfont icon-ic-education"
}), createElement("span", {
    class: "gitee-nav__sidebar-name"
}, "高校版"))), createElement("li", {
    class: "gitee-nav__sidebar-item split-line"
}), createElement("li", {
    class: "gitee-nav__sidebar-item"
}, createElement("a", {
    href: "/search"
}, createElement("i", {
    class: "iconfont icon-ic-search"
}), createElement("span", {
    class: "gitee-nav__sidebar-name"
}, "搜索"))), createElement("li", {
    class: "gitee-nav__sidebar-item"
}, createElement("a", {
    href: "/help"
}, createElement("i", {
    class: "iconfont icon-help-circle"
}), createElement("span", {
    class: "gitee-nav__sidebar-name"
}, "帮助中心"))), createElement("li", {
    class: "gitee-nav__sidebar-item"
}, createElement("a", {
    href: "/terms"
}, createElement("i", {
    class: "iconfont icon-file"
}), createElement("span", {
    class: "gitee-nav__sidebar-name"
}, "使用条款"))), createElement("li", {
    class: "gitee-nav__sidebar-item"
}, createElement("a", {
    href: "/about_us"
}, createElement("i", {
    class: "iconfont icon-issuepx"
}), createElement("span", {
    class: "gitee-nav__sidebar-name"
}, "关于我们"))), createElement("li", {
    class: "gitee-nav__sidebar-item"
}, createElement("a", {
    href: "/profile"
}, createElement("i", {
    class: "iconfont icon-edit"
}), createElement("span", {
    class: "gitee-nav__sidebar-name"
}, "设置"))), createElement("li", {
    class: "gitee-nav__sidebar-item"
}, createElement("a", {
    href: "/logout",
    "data-method": "delete",
    rel: "nofollow"
}, createElement("i", {
    class: "iconfont icon-ic-logout"
}), createElement("span", {
    class: "gitee-nav__sidebar-name"
}, "退出")))))), createElement("div", {
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
    title: "开源软件"
}, "开源软件"), createElement("a", {
    href: "/enterprises",
    class: "item ",
    title: "企业版"
}, "企业版", createElement("sup", {
    class: "ui red label"
}, "特惠")), createElement("a", {
    href: "/education",
    class: "item ",
    title: "高校版"
}, "高校版"), createElement("a", {
    href: "https://blog.gitee.com/",
    class: "item",
    id: "gitee-blog",
    target: "_blank",
    title: "博客"
}, "博客"), createElement("div", {
    class: "dropdown item ui",
    id: "my-gitee-dropdown",
    tabindex: "0"
}, createElement("a", {
    href: "/masx200/dashboard"
}, "我的码云"), createElement("i", {
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
}, "全部"), "仓库", createElement("span", {
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
    "data-text-filter": "搜索格式不正确",
    "data-text-require": "搜索关键字不能少于1个",
    id: "navbar-search-form",
    method: "get"
}, createElement("div", {
    style: "margin:0;padding:0;display:inline"
}, createElement("input", {
    name: "utf8",
    type: "hidden",
    value: "✓"
})), createElement("div", {
    class: "ui mini fluid input"
}, createElement("input", {
    id: "navbar-search-input",
    name: "q",
    placeholder: "搜索项目、代码片段...",
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
}, "@ 我", createElement("div", {
    class: "notice-count referer"
}))), createElement("div", {
    class: "tab active",
    "data-data-path": "/notifications/notices?scope=infos",
    "data-html-path": "/notifications/infos",
    "data-scope": "infos"
}, createElement("div", {
    class: "content"
}, "通知", createElement("div", {
    class: "notice-count infos"
}, "1"))), createElement("div", {
    class: "tab",
    "data-data-path": "/notifications/notices?scope=messages",
    "data-html-path": "/notifications/messages",
    "data-scope": "messages"
}, createElement("div", {
    class: "content"
}, "私信", createElement("div", {
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
}, "你的仓库 masx200/mvvm-reactive-view 已经从 https://github.com/masx200/mvvm-reactive-view.git 同步成功"), createElement("div", {
    class: "meta"
}, createElement("time", {
    class: "timeago"
}, "2小时前"), " ·", " ", createElement("span", {
    class: "namespace"
}, "masx200/mvvm-reactive-view")))), createElement("div", {
    class: "notice-dropdown-panel-blank"
}, "暂没有新消息")), createElement("div", {
    class: "notice-dropdown-panel-footer"
}, createElement("div", {
    class: "action"
}, createElement("div", {
    class: "side left"
}, createElement("a", {
    href: "javascript: void(0);",
    class: "mark-notices"
}, "当前标记为已读")), createElement("div", {
    class: "side right"
}, createElement("a", {
    href: "/notifications/infos",
    class: "load-all",
    target: "_blank"
}, "查看全部")))))), createElement("div", {
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
}), "新建仓库"), createElement("a", {
    href: "/masx200/codes/new",
    class: "item"
}, createElement("i", {
    class: "code icon"
}), "发布代码片段"), createElement("a", {
    href: "/organizations/new",
    class: "item"
}, createElement("i", {
    class: "group icon"
}), "创建组织"), createElement("a", {
    href: "/enterprises/new",
    class: "item"
}, createElement("i", {
    class: "icon iconfont icon-enterprise"
}), "开通企业版"), createElement("a", {
    href: "/projects/oauth_github",
    class: "item"
}, createElement("i", {
    class: "github icon"
}), "从 GitHub 导入仓库"))), createElement("div", {
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
}), "个人主页"), createElement("a", {
    href: "/profile",
    class: "item"
}, createElement("div", {
    class: "mayun-icon my-ic-edit my-ic-edit-dims"
}), "设置"), createElement("div", {
    class: "divider"
}), createElement("a", {
    href: "/gists",
    class: "item"
}, createElement("div", {
    class: "iconfont icon-ic-gist"
}), "代码片段"), createElement("a", {
    href: "https://gitee.com/help",
    class: "item",
    target: "_blank"
}, createElement("div", {
    class: "mayun-icon my-ic-help my-ic-help-dims"
}), "帮助"), createElement("div", {
    class: "divider"
}), createElement("a", {
    href: "/logout",
    class: "item destroy-user-session",
    "data-method": "delete",
    rel: "nofollow"
}, createElement("div", {
    class: "mayun-icon my-ic-exit my-ic-exit-dims"
}), "退出"))), createElement("script", null))))));

console.log(vdom);

document.body.appendChild(createApp(vdom, document.createElement("div")));

(function() {
    (function() {
        var _class2, _temp;
        var myvdom1111111 = createElement(function(_HTMLElement) {
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
        document.body.appendChild(createApp(createElement(function() {
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
        var myele1 = createElement((_temp = _class2 = function(_HTMLElement3) {
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
})();

var vdom$1 = [ createElement("html", null, "testhtml"), createElement("button", {
    onclick: [ console.log, function() {
        alert("onclick");
    } ],
    "*text": "clicktest",
    "@click": [ console.log, function() {
        alert("@click");
    } ]
}), createElement("style", null) ];

document.body.appendChild(createApp(vdom$1, document.createElement("div")));

console.log("onclick", " @click", vdom$1);

var css = '@import url(https://cdn.staticfile.org/typo.css/1.1/typo.css);@import url(https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css);p{color:#0f0!important}@font-face{font-family:octicons-anchor;src:url(data:font/woff;charset=utf-8;base64,d09GRgABAAAAAAYcAA0AAAAACjQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABMAAAABwAAAAca8vGTk9TLzIAAAFMAAAARAAAAFZG1VHVY21hcAAAAZAAAAA+AAABQgAP9AdjdnQgAAAB0AAAAAQAAAAEACICiGdhc3AAAAHUAAAACAAAAAj//wADZ2x5ZgAAAdwAAADRAAABEKyikaNoZWFkAAACsAAAAC0AAAA2AtXoA2hoZWEAAALgAAAAHAAAACQHngNFaG10eAAAAvwAAAAQAAAAEAwAACJsb2NhAAADDAAAAAoAAAAKALIAVG1heHAAAAMYAAAAHwAAACABEAB2bmFtZQAAAzgAAALBAAAFu3I9x/Nwb3N0AAAF/AAAAB0AAAAvaoFvbwAAAAEAAAAAzBdyYwAAAADP2IQvAAAAAM/bz7t4nGNgZGFgnMDAysDB1Ml0hoGBoR9CM75mMGLkYGBgYmBlZsAKAtJcUxgcPsR8iGF2+O/AEMPsznAYKMwIkgMA5REMOXicY2BgYGaAYBkGRgYQsAHyGMF8FgYFIM0ChED+h5j//yEk/3KoSgZGNgYYk4GRCUgwMaACRoZhDwCs7QgGAAAAIgKIAAAAAf//AAJ4nHWMMQrCQBBF/0zWrCCIKUQsTDCL2EXMohYGSSmorScInsRGL2DOYJe0Ntp7BK+gJ1BxF1stZvjz/v8DRghQzEc4kIgKwiAppcA9LtzKLSkdNhKFY3HF4lK69ExKslx7Xa+vPRVS43G98vG1DnkDMIBUgFN0MDXflU8tbaZOUkXUH0+U27RoRpOIyCKjbMCVejwypzJJG4jIwb43rfl6wbwanocrJm9XFYfskuVC5K/TPyczNU7b84CXcbxks1Un6H6tLH9vf2LRnn8Ax7A5WQAAAHicY2BkYGAA4teL1+yI57f5ysDNwgAC529f0kOmWRiYVgEpDgYmEA8AUzEKsQAAAHicY2BkYGB2+O/AEMPCAAJAkpEBFbAAADgKAe0EAAAiAAAAAAQAAAAEAAAAAAAAKgAqACoAiAAAeJxjYGRgYGBhsGFgYgABEMkFhAwM/xn0QAIAD6YBhwB4nI1Ty07cMBS9QwKlQapQW3VXySvEqDCZGbGaHULiIQ1FKgjWMxknMfLEke2A+IJu+wntrt/QbVf9gG75jK577Lg8K1qQPCfnnnt8fX1NRC/pmjrk/zprC+8D7tBy9DHgBXoWfQ44Av8t4Bj4Z8CLtBL9CniJluPXASf0Lm4CXqFX8Q84dOLnMB17N4c7tBo1AS/Qi+hTwBH4rwHHwN8DXqQ30XXAS7QaLwSc0Gn8NuAVWou/gFmnjLrEaEh9GmDdDGgL3B4JsrRPDU2hTOiMSuJUIdKQQayiAth69r6akSSFqIJuA19TrzCIaY8sIoxyrNIrL//pw7A2iMygkX5vDj+G+kuoLdX4GlGK/8Lnlz6/h9MpmoO9rafrz7ILXEHHaAx95s9lsI7AHNMBWEZHULnfAXwG9/ZqdzLI08iuwRloXE8kfhXYAvE23+23DU3t626rbs8/8adv+9DWknsHp3E17oCf+Z48rvEQNZ78paYM38qfk3v/u3l3u3GXN2Dmvmvpf1Srwk3pB/VSsp512bA/GG5i2WJ7wu430yQ5K3nFGiOqgtmSB5pJVSizwaacmUZzZhXLlZTq8qGGFY2YcSkqbth6aW1tRmlaCFs2016m5qn36SbJrqosG4uMV4aP2PHBmB3tjtmgN2izkGQyLWprekbIntJFing32a5rKWCN/SdSoga45EJykyQ7asZvHQ8PTm6cslIpwyeyjbVltNikc2HTR7YKh9LBl9DADC0U/jLcBZDKrMhUBfQBvXRzLtFtjU9eNHKin0x5InTqb8lNpfKv1s1xHzTXRqgKzek/mb7nB8RZTCDhGEX3kK/8Q75AmUM/eLkfA+0Hi908Kx4eNsMgudg5GLdRD7a84npi+YxNr5i5KIbW5izXas7cHXIMAau1OueZhfj+cOcP3P8MNIWLyYOBuxL6DRylJ4cAAAB4nGNgYoAALjDJyIAOWMCiTIxMLDmZedkABtIBygAAAA==) format("woff")}*{color:purple!important;font-size:50px}@keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@media (max-width:720px){.article-content h1{font-size:24px}.article-content h2{font-size:20px}.article-content h3{font-size:18px}.article-content pre>code .copy-code-btn{display:none}.article-content pre>code.hljs[lang]:before{top:2px;right:15px}}@media (max-width:720px){.article-content pre>code.copyable.hljs[lang]:before{right:1rem}}@media (max-width:500px){hr#hidewidthless500{display:none}}.recommend-container .recommend-user .item{margin-bottom:16px}.recommend-container .recommend-user .ui.button{padding:3px 5px;margin-right:0}.recommend-container .recommend-user .header .pull-right{color:#005980;cursor:pointer}.recommend-container .recommend-user .header .pull-right.disabled{opacity:.7;cursor:default}.recommend-container .recommend-user .icon-reset{margin-top:-1px;height:16px;font-size:16px;margin-right:2px}.recommend-container .recommend-user__content{position:relative}.recommend-container .dimmer.active{z-index:1}.recommend-container .recommend-list__user{-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;margin-right:4px}.recommend-container .recommend-list__user strong{color:#005980}.recommend-container .recommend-list__user .recommend-list__user-info{margin:0 4px 0 8px;max-width:155px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.recommend-container .recommend-list__user .recommend-list__user-info.is-follow{max-width:125px}.recommend-container .recommend-list__user .recommend-list__user-info>div{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.recommend-container .recommend-list__flollow .disable{opacity:.5}.recommend-container .recommend-project .icon-recommended{color:#fe7300}.recommend-container .recommend-project .project-label{display:inline-block}.recommend-container .recommend-project .recommend-list{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.recommend-container .recommend-project .recommend-list>*{word-break:break-all}.recommend-container .recommend-project .recommend-list .recommend-project__describe{overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical}.recommend-container .recommend-project .item{margin-bottom:16px}.recommend-container .recommend-project .recommend-project__name{margin-bottom:4px;color:#005980}.recommend-container .recent_visits .ui.items{margin-right:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.recommend-container .recent_visits .avatar-item{margin-right:-22px!important}.recommend-container .recent_visits .item{width:20%;min-width:0;font-size:16px}.recommend-container .recent_visits .empty-visitor.item{font-size:14px;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1}.dashboard-content.twelve{padding-right:0!important}.dashboard-content .gitee-headbread .git-user-selection-dropdown{margin-right:0!important}.dashboard-content .dashboard-team .git-user-content-header{display:none}.dashboard-content .gitee-headbread{margin-bottom:24px}.dashboard-content .git-dashboard-projects-menu{margin-bottom:24px!important}.dashboard-content .git-dashboard-projects-menu .f-bold{color:#fe7300;border-bottom:2px solid #fe7300!important}.dashboard-content .git-dashboard-projects-menu>a.item{font-size:16px;padding:8px 18px!important}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input{width:150px;margin-right:10px}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input input{margin-top:-6px;font-size:12px;margin-right:10px}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input .icon-search{margin-top:-4px}.dashboard-content #event-timeline-panel h3.event-timeline-title{font-size:16px;margin-top:0;margin-bottom:16px;display:inline-block}.dashboard-content #event-timeline-panel .event-timeline.content{padding:0 0 18px 12px}.dashboard-content #event-timeline-panel .event-actionbar .dropdown.icon{margin-left:4px}.dashboard-content #event-timeline-panel .message-container .message{margin:0 0 1em}.dashboard-content .issues-filter__item{display:block;padding:0!important;color:initial!important;font-weight:500!important}.dashboard-content .issues-dropdown{margin-top:-6px!important}.dashboard-content .issues-dropdown .pl-0.f-bold{padding-left:0!important}.dashboard-content .dashboard-team .dashboard-team_info{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.dashboard-content .dashboard-team .ui.image{width:40px;height:40px;min-width:40px}.dashboard-content .dashboard-team .dashboard-team__contaniner .dashboard-team__name{font-size:16px;font-weight:700;overflow:hidden;word-break:keep-all;text-overflow:ellipsis;display:block}.dashboard-content .dashboard-team .dashboard-team__contaniner a{color:#005980!important}.dashboard-content .dashboard-team .dashboard-team__contaniner>.item:first-child{padding-top:0!important}.dashboard-content .dashboard-team .dashboard-team__contaniner .item{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.dashboard-content .dashboard-team .dashboard-team__contaniner .content{display:-webkit-box!important;display:-webkit-flex!important;display:-moz-box!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;overflow:hidden}.dashboard-content .dashboard-team .dashboard-team__contaniner .content:after{content:none}.dashboard-content .dashboard-team .dashboard-team__contaniner .content i{font-size:16px}.dashboard-content .dashboard-team .icon-enterprise-badge{margin-left:4px}.dashboard-content .dashboard-team .dashboard-team__operate{min-width:75px;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-moz-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.dashboard-content .dashboard-team .dashboard-team__operate.has-exit{min-width:150px}.recommend-project .icon-help-circle{vertical-align:baseline}.dashboard-content__show{width:608px!important;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.ui.container.user_page{width:1240px}#rc-users__container{position:relative}#rc-users__container .secondary-navigation .active{color:#fe7300!important}#rc-users__container .dashboard-content{padding-right:32px;padding-left:32px;padding-top:24px}#rc-users__container .dashboard-sidebar{padding:16px 0 0;width:280px!important;margin-left:10px}#rc-users__container .dashboard-sidebar .dashboard-group .item{margin:8px 0}#rc-users__container .dashboard-sidebar .dashboard-group:last-child{margin-bottom:0!important}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar{padding-top:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .ui.card{width:100%;margin-top:32px;margin-bottom:0;padding-bottom:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .ui.card .header{font-size:16px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name h4{font-size:14px;display:inline-block}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .description{margin-top:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .item.flex{margin-top:16px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .item.flex:first-child{margin-top:12px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .quit i{margin-top:0}#rc-users__container .has-active .content{padding-left:0 2px 0 8px}#rc-users__container .navigation .header{padding-right:8px;border-bottom:1px solid #e3e9ed;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;padding-bottom:4px}#rc-users__container .navigation .header,#rc-users__container .navigation .header .title{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}#rc-users__container .navigation .header .title{font-size:16px}#rc-users__container .navigation .header .avatar.image{margin-right:0}#rc-users__container .navigation .header strong{font-size:16px;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;max-width:120px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#rc-users__container .navigation .header strong a{color:unset}#rc-users__container .navigation .header .actions{margin-top:4px}#rc-users__container .navigation .header .actions i{color:#005980}#rc-users__container .navigation.user i{color:#989dad}#rc-users__container .navigation.user .content{padding:0 8px}#rc-users__container .navigation .items>a{color:#40485b}#rc-users__container .navigation .items>a:hover{color:#095eab}#rc-users__container .navigation .items>a:active{color:#064177}#rc-users__container .navigation .items>a:hover{color:#40485b}#rc-users__container .navigation .item:hover .content{background:#f8f8f8}#rc-users__container .navigation .item .active{color:#fe7300;background:#f8f8f8}#rc-users__container .navigation .item .active .num{color:inherit}#rc-users__container .navigation .item:hover .exit{display:inline-block}#rc-users__container .navigation .icon-add,#rc-users__container .navigation .icon-search{color:#8c92a4!important}#rc-users__container .navigation .num{font-size:12px;font-weight:500;color:#8c92a4}#rc-users__container .navigation .gray{color:#8c92a4}#rc-users__container .navigation .avatar.image{width:32px;height:32px}#rc-users__container .twitter-typeahead{width:100%}#rc-users__container .gray{color:#8c92a4}#rc-users__container .ui.container{width:1240px}#rc-users__container .contribution-events{padding-top:32px}#rc-users__container #git-footer-main{min-width:1240px}#rc-users__container .gitee-headbread .gitee-divider{display:inline-block;opacity:.5;margin:0 .2rem;color:rgba(0,0,0,.4);vertical-align:baseline}#rc-users__container .git-user-content .git-user-content-header{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:16px}#rc-users__container .ui.button.js-project-watch{background:#fff;border:1px solid rgba(140,146,164,.5);padding:2px 5px;margin:0}#rc-users__container .recommend-container{width:248px!important}.users__personal-avatar{position:relative;margin:0 auto 10px;width:160px;height:160px}.users__personal-avatar .over-avatar{position:absolute;top:0;left:0;width:100%;height:100%;color:#fff;font-size:14px;text-align:center;line-height:200px;border:4px solid #eee;border-radius:50%;background:rgba(0,0,0,.5);cursor:pointer;display:none}.users__personal-avatar .over-avatar:hover{display:block}.users__personal-avatar .ui.image.avatar{margin:0;width:100%;height:100%;border:4px solid #eee}.users__personal-avatar .ui.image.avatar:hover+.over-avatar{display:block}.users__personal-avatar .avatar-gender{position:absolute;bottom:2px;right:27px;width:32px;height:32px;border-radius:50%;color:#fff;font-size:21px;text-align:center;line-height:30px;border:2px solid #fff}.users__personal-avatar .avatar-gender.mars{background:#3eb4ff}.users__personal-avatar .avatar-gender.venus{background:#ff5bc6}.users__personal-name{text-align:center}.users__personal-name h2,.users__personal-name p{margin:8px 0 0;word-break:break-all}.users__personal-name h2 span,.users__personal-name p span{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}.users__personal-name .remark-name{color:#8c92a4;font-size:14px;font-weight:400;display:inline}.users__personal-name .ui.small.label{margin-bottom:.5em;padding:.4em .7em;font-weight:400}.users__personal-setting{margin:15px auto;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__personal-setting .ui.button{margin:0;width:45%;font-size:14px}.users__personal-setting .ui.button.basic{border:1px solid #ccc}.users__personal-socials .ui.grid{padding:0 1rem}.users__personal-socials .ui.grid .column{padding:1rem 0;text-align:center}.users__personal-socials .social-count{font-size:18px;font-weight:700}.users__personal-socials .social-name{padding-top:5px;color:#40485b;font-size:12px;display:block}.users__personal-info{padding:15px 0;color:#8c92a4}.users__personal-info .info-item{padding:3px 0;line-height:1.5;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__personal-info .info-item i.iconfont{width:20px;text-align:center}.users__personal-info .info-item i.iconfont.icon-time{font-size:12px}.users__personal-achievement{padding:10px 0}.users__personal-achievement h3{margin:0;padding-bottom:4px;border-bottom:1px solid #dce3e8}.users__personal-achievement .ui.list .item .content{line-height:1.8}.users__personal-achievement .ui.list .item .content .description{color:#7687ab}.users__personal-groups{padding:10px 0}.users__personal-groups h3{margin:0;padding-bottom:4px;border-bottom:1px solid #dce3e8}.users__personal-groups .ui.list{margin:0}.users__personal-groups .ui.list:not(.more-groups){margin-top:1em}.users__personal-groups .ui.list .item{padding:.3em 0}.users__personal-groups .ui.list .item a{color:#005980!important}.users__personal-groups .ui.list .item a:hover{color:#4c8aa6!important}.users__personal-groups .ui.list .item a:active{color:#003e59!important}.users__personal-groups .ui.list .item .content{line-height:1.8;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__personal-groups .ui.list .item .right.floated.content{color:#7687ab}.users__personal-groups .ui.list .item .right.floated.content .mr-1{width:24px;display:inline-block}.users__personal-groups .load-more-groups{margin-top:8px;display:block;color:#7687ab}.users__personal-groups .load-more-groups:hover{color:#9fabc4}.users__personal-groups .load-more-groups:active{color:#525e77}.users__navbar .ui.secondary.pointing.menu{border-bottom:2px solid #dededf}.users__navbar .ui.secondary.pointing.menu>.item{margin-bottom:-2px;padding:10px 30px;min-width:100px;text-align:center;border-width:2px}.users__navbar .ui.secondary.pointing.menu>.item.active{color:#fe7300;border-color:#fe7300}.users__navbar .ui.secondary.pointing.menu>.item.active .ui.label{color:#fe7300;background:rgba(254,115,0,.2)}.users__header{margin-top:2em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__header h3{margin:0}.users__header .ui.dropdown{padding:.5em .92857em}.users__popular-projects .ui.cards{margin:0 -.5em -.5em}.users__popular-projects .ui.cards .ui.card{margin:.5em!important;padding:1em;width:calc(50% - 1em)!important;border:1px solid #dce3e8;-webkit-box-shadow:none;box-shadow:none}.users__popular-projects .ui.cards .ui.card .content{padding:0}.users__popular-projects .ui.cards .ui.card .content .popular-project-title{font-size:16px;word-break:break-all;vertical-align:middle}.users__popular-projects .ui.cards .ui.card .content .git-project-gvp-badge{margin-top:-3px}.users__popular-projects .ui.cards .ui.card .content i.iconfont{font-size:14px}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-mode-table{margin-top:1px;color:#d0d0d0;cursor:move}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-recommended{color:#fe7300;font-weight:400}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-watch{font-size:12px;vertical-align:baseline}.users__popular-projects .ui.cards .ui.card .content .description{color:#8c92a4;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}.users__popular-projects .ui.cards .ui.card .extra.content{padding-top:1em;border:none!important;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__popular-projects .ui.cards .ui.card .extra.content:after{content:none}.users__popular-projects .ui.cards .ui.card .extra.content .left .ui.small.label{padding:.4em .7em}.users__popular-projects .ui.cards .ui.card .extra.content .right a{padding:0 .2em;color:#8c92a4}.users__popular-projects .ui.cards .ui.card .extra.content .right a:hover{color:#aeb2bf}.users__popular-projects .ui.cards .ui.card .extra.content .right a:active{color:#626672}.users__popular-projects .ui.cards .ui.card.sortable-chosen{background:#fed!important}.users__contribution-panel .less{background-color:#eee}.users__contribution-panel .little{background-color:#d6e685}.users__contribution-panel .some{background-color:#8cc665}.users__contribution-panel .many{background-color:#44a340}.users__contribution-panel .much{background-color:#1e6823}.users__contribution-panel .contribution-box{padding-top:20px;height:125px;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.users__contribution-panel .contribution-box .left-side{width:32px;font-size:12px;text-align:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.users__contribution-panel .contribution-box .left-side,.users__contribution-panel .contribution-box .right-side{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.users__contribution-panel .contribution-box .right-side{position:relative;width:100%;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.users__contribution-panel .contribution-box .right-side .box{width:1.88679%;height:15px;border:1px solid #fff}.users__contribution-panel .contribution-box .right-side .box[data-content]:hover{border:1px solid #000}.users__contribution-panel .contribution-box .right-side .month{position:absolute;top:0;margin-top:-15px;margin-left:-15px;min-width:45px;font-size:12px;text-align:center}.users__contribution-panel .contribution-tip{margin-top:10px;padding-right:10px;font-size:12px;text-align:right}.users__contribution-panel .contribution-tip .word{font-size:12px;vertical-align:top;display:inline-block}.users__contribution-panel .contribution-tip .ui.horizontal.list>.item{margin:0 1px;width:12px;height:12px;vertical-align:text-bottom}.users__contribution-panel .contribution-describ p{margin:0 20px 0 0;display:inline-block}.users__contribution-panel .contribution-describ p.text-muted{margin-top:10px;display:block}.users__customize-modal .ui.form{min-height:180px}.users__customize-modal .grouped.fields{margin:.2em 0 1em!important;padding:10px 0;max-height:20em;overflow-y:auto}.users__customize-modal .grouped.fields .field{padding:5px!important}.users__customize-modal .grouped.fields .field .ui.checkbox{width:100%}.users__customize-modal .grouped.fields .field label{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__customize-modal .grouped.fields .field label span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__customize-modal .grouped.fields .field label .star-count{min-width:4em;text-align:right}.users__customize-modal .grouped.fields .field.active{background:rgba(254,115,0,.2)}.users__report-modal .appeal-success-tip{text-align:center}.users__report-modal .appeal-success-tip i.iconfont{font-size:7rem;color:#4baf50}.users__report-modal .ui.items{padding:20px;background:#f4f5f6}.users__report-modal .ui.items .ui.image{width:50px}.users__report-modal .ui.items .content .header{color:#40485b}.users__report-modal .ui.items .content .description{color:#8c92a4;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__report-modal .ui.segment.loader-block{border:0;min-height:100px}.users__report-modal .action-types .item{margin:5px;padding:10px 20px;min-width:120px;text-align:center;display:inline-block;background:#f2f2f2;border-radius:5px;cursor:pointer}.users__report-modal .action-types .item.active,.users__report-modal .action-types .item:active,.users__report-modal .action-types .item:hover{color:#fe7300}.users__report-modal .extra-content textarea{width:100%;height:5em}#user-show-detail .git-dashboard-projects-menu>.f-bold{color:#fe7300}#user-show-detail .git-codes-tags{margin-bottom:16px}#user-show-detail .git-user-twl-col>.gitee-headbread{margin-bottom:16px;margin-top:10px}#user-show-detail .git-profile-content-header .git-dashboard-projects-menu{margin-bottom:14px}#user-show-detail .git-profile-content-header .git-dashboard-projects-menu>a{font-size:14px}.recommend-container{padding:24px 0 0!important}.recommend-container .recommend-notice{background-color:#fffeed!important;margin-bottom:24px}.recommend-container .recommend-notice>.header{margin-right:8px!important}.recommend-container .ui.message{color:#40485b;padding:12px 16px;-webkit-box-shadow:0 0 0 1px #e2d8bf inset,0 0 0 0 transparent;box-shadow:inset 0 0 0 1px #e2d8bf,0 0 0 0 transparent}.recommend-container .ui.message i{position:absolute;top:0;right:0;font-size:.8em;margin-top:8px;margin-right:8px;cursor:pointer;color:#005980}.recommend-container .ui.message .header{color:#40485b;font-size:14px}.recommend-container .ui.message .content{margin-top:4px}.recommend-container .recommend-block{margin-bottom:32px}.recommend-container .recommend-block>.items{margin-top:0}.recommend-container .recommend-block .header{margin-bottom:16px}.recommend-container .recommend-block .header strong{font-size:16px}.recommend-container .recommend-block .recommend-list{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.recommend-container .recommend-block .item{margin:0}.recommend-container .recommend-user .header{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:end;-webkit-align-items:flex-end;-moz-box-align:end;-ms-flex-align:end;align-items:flex-end}.recommend-container .recommend-user .recommend-list{-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}';

(function() {
    var mycom = function mycom(props, children) {
        useMounted((function() {
            console.log("mounted1");
        }));
        useMounted((function() {
            console.log("mounted2", props);
        }));
        useUnMounted((function() {
            console.log("unmounted");
        }));
        watch(props.cccccc, console.log);
        return [ "wwwwwwwwwwww", createElement("div", null, [ "createComponent" ]), children, createElement("div", null, [ props.cccccc ]) ];
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
    document.body.appendChild(createApp(vdom, document.createElement("div")));
    setTimeout((function() {
        vdom.element.setAttribute("cccccc", "bbbbbbbbbbnnnnnnnnnnnnn");
    }), 5e3);
    document.body.appendChild(createApp(createElement(myclasscomponent, null, createElement("form", {
        id: "newsletterForm",
        class: "newsletter-form nodisable",
        name: "newsletter-form",
        action: "https://www.mozilla.org/en-US/newsletter/",
        method: "post"
    }, createElement("div", {
        class: "newsletter-head"
    }, createElement("h2", {
        class: "newsletter-teaser"
    }, "学习 Web 开发的最佳实践"), createElement("p", {
        class: "newsletter-description"
    }, "让 MDN 将最新、最棒的内容直接投递到您的邮箱。"), createElement("p", {
        class: "newsletter-lang"
    }, "目前仅提供英文版新闻报。")), createElement("div", {
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
    }, "电子邮件地址"), createElement("input", {
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
    }, "我接受 Mozilla 按照", createElement("a", {
        href: "https://www.mozilla.org/privacy/"
    }, "隐私政策"), "所述的方式处理我的信息。")), createElement("div", {
        id: "newsletterSubmit",
        class: "newsletter-group-submit"
    }, createElement("button", {
        id: "newsletter-submit",
        type: "submit",
        class: "button neutral newsletter-submit"
    }, "立即注册", createElement("svg", {
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

var css$1 = '@charset "UTF-8";@import url(https://cdn.bootcss.com/mui/3.7.1/css/mui.min.css);@import url(https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-6556dfa9be535e551ffffaadfecdad99.min.css);@import url(https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-frameworks-a2fba223d5af91496cac70d4ec3624df.min.css);@import url(https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css);pre{text-align:left!important}button,div,h1,h2,h3,h4,h5,h6,input{text-align:center}p{color:#000!important}@-webkit-keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.flowerpassword a{color:#42b983}.App-header{background-color:#fff}nav{width:100%}#图片列表200 img{min-height:150px;min-width:150px;height:auto;width:auto;max-width:100%;max-height:200px}#my导航栏 .navbar-nav li a{margin-left:2px;margin-right:2px}h1,h2{font-weight:400}ul{list-style-type:none;padding:0}li{display:inline-block;margin:0 10px}*{-webkit-user-select:text;-ms-user-select:text;user-select:text}.example{color:red}body{padding:0}*{font-family:"Microsoft Yahei,PingFangSC-Regular,arial, verdana, sans-serif"}#my导航栏{overflow:auto;max-height:100%;padding-right:0;padding-left:0}.App{text-align:center}.App-logo{-webkit-animation:App-logo-spin 20s linear infinite;animation:App-logo-spin 20s linear infinite;height:40vmin;pointer-events:none}.App-header{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:calc(10px + 2vmin)}.App-link{color:#61dafb}.flowerpassword body,.flowerpassword html{background-color:#fff}.flowerpassword body{font:14px/1.5 Tahoma,Helvetica,Arial,\\5b8b\\4f53;color:#000}.flowerpassword a,.flowerpassword a:hover{color:#09c;text-decoration:none}.flowerpassword .left{float:left}.flowerpassword .right{float:right}.flowerpassword .clear{clear:both}.flowerpassword header{text-align:left;padding:0;margin:15px auto}.flowerpassword #logo{height:39px}.flowerpassword #shortcuts{margin:15px 0 0 15px}.flowerpassword #nav{float:center;margin-top:10px}.flowerpassword #nav li{margin:0 7px}.flowerpassword #nav li a{font-size:22px;color:#09c}.flowerpassword #nav li.active a,.flowerpassword #nav li.active a:hover{background-color:#09c;color:#fff}.flowerpassword #nav li a:hover{background-color:#79c6df;color:#fff}.flowerpassword #index-box{background-color:#fff;width:940px;clear:both;box-shadow:0 0 4px 2px #ddd;border:1px solid #ddd}.flowerpassword #index-box .float-box{margin:20px 0 20px 20px;display:inline}.flowerpassword #index-box #content-nav{margin:0;width:200px}.flowerpassword #index-box #content-nav li a{background-color:#e5ecdc}.flowerpassword #index-slider{width:940px;height:200px;overflow:hidden;position:relative}.flowerpassword #index-slider ul{list-style:none;margin:0;position:absolute;top:0;left:0}.flowerpassword #index-slider li{width:940px;height:200px;float:left}.flowerpassword #index-slider #pagination{top:160px;left:800px}.flowerpassword #index-slider ul#pagination li{width:16px;height:16px;border-radius:1em;background-color:#fff;box-shadow:0 0 1px 2px #ccc;margin-right:18px;margin-top:4px}.flowerpassword #index-slider ul#pagination li.active{width:24px;height:24px;margin-top:0}.flowerpassword #index-slider ul#pagination li:hover{background-color:#ddd;cursor:pointer}.flowerpassword #index-report{width:680px;height:70px;margin-top:20px;overflow:hidden;position:relative;background-color:#e5ecdc}.flowerpassword #index-report ul{list-style:none;margin:0;position:absolute;top:0;left:0}.flowerpassword #index-report li{width:680px;height:70px;text-align:center;float:left;font-size:32px;color:#666;font-family:å¾®è½¯é›…é»‘,é»‘ä½“;line-height:70px}.flowerpassword #index-report-pagination{list-style:none;margin-left:35px;text-align:center}.flowerpassword #index-report-pagination li{height:65px;float:left;margin-right:45px;cursor:pointer}.flowerpassword #index-report-pagination li img{margin-top:30px}.flowerpassword #index-button{margin:40px 0 30px;text-align:center}.flowerpassword #index-button a{margin:0 50px}.flowerpassword #tab{margin-top:30px}.flowerpassword #tab li a{margin-right:10px;border-bottom-color:#ddd;color:#666}.flowerpassword #tab li a:hover{background-color:#f2f2f2;color:#333;border-color:#ddd #ddd transparent}.flowerpassword #tab li.active a{background-color:#f2f2f2;color:#666;border-bottom-color:transparent}.flowerpassword #content-nav{list-style:none;margin:20px 0 0}.flowerpassword #content-nav li a{color:#666;padding:11px 0 11px 60px;display:block;margin-bottom:1px;font-size:22px}.flowerpassword #content-nav li a.active,.flowerpassword #content-nav li a:hover{background-color:#09c!important;color:#fff!important}.flowerpassword h1,.flowerpassword h2{color:#09c;margin:30px 0 12px}.flowerpassword h2{font-size:22px}.flowerpassword h2 span{font-size:22px;color:#fff;margin-right:7px;background-color:#09c;width:33px;height:33px;display:inline-block;text-align:center}.flowerpassword h3{font-size:16px;color:#09c;margin:20px 0}.flowerpassword h3 span{font-size:16px;color:#fff;margin-right:6px;background-color:#09c;width:26px;display:inline-block;text-align:center}.flowerpassword #input span{color:#09c;font-weight:700;font-size:22px;margin:0 20px}.flowerpassword #input input{font-size:14px;padding:5px;margin-left:5px}.flowerpassword #input label{float:none;display:inline;padding-right:5px}.flowerpassword #input p{margin-top:16px}.flowerpassword #input p,.flowerpassword .other{font-size:12px;color:#999}.flowerpassword #code16{display:inline-block;text-align:center}.flowerpassword .code16d{border:2px solid #09c}.flowerpassword .code16d:hover{border:2px solid #ff881c}.flowerpassword #copycode16{color:#000;display:inline-block;padding:0 3px;cursor:pointer}.flowerpassword .copycode16d{background-color:#09c;border:2px solid #09c}.flowerpassword .copycode16d:hover{background-color:#ff881c;border:2px solid #ff881c}.flowerpassword p{font-size:12px;color:#666;margin:20px 0}.flowerpassword #copyOK{color:#f2f2f2;border:2px solid #f2f2f2;display:inline-block;margin-left:16px;padding:0 3px}.flowerpassword .down-button{margin:10px 20px 10px 0}.flowerpassword #get{margin-bottom:100px}.flowerpassword footer{margin:50px 0 30px}.flowerpassword footer p{margin:0 0 5px;color:#999}.flowerpassword footer p span{margin:0 10px}.flowerpassword footer p a{color:#999}.flowerpassword footer p a:hover{color:#333}.jdahd button{border-color:#000}.jdahd *{text-align:center;margin:0;box-sizing:border-box;background-color:transparent}.jdahd body{position:relative;height:100vh;text-align:center}.jdahd h1{text-align:center;margin:20px 0}.jdahd textarea{width:100%;clear:both;margin-bottom:10px;border-radius:7px;padding:15px 10px;font-size:14px;outline:none;-webkit-transition:all .2s ease-in;transition:all .2s ease-in}.jdahd input[type=button]{margin:0 auto;position:relative;vertical-align:top;width:150px;height:60px;padding:0;font-size:22px;font-weight:300;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.25);background:#2980b9;border:0;border-bottom:2px solid #2475ab;cursor:pointer;box-shadow:inset 0 -2px #2475ab}.jdahd input:active{top:1px;outline:none;box-shadow:none}.jdahd input:-ms-input-placeholder,.jdahd textarea:-ms-input-placeholder{color:#fff;font-size:20px;font-weight:300}.jdahd input::-moz-placeholder,.jdahd textarea::-moz-placeholder{color:#fff;font-size:20px;font-weight:300}.jdahd input::-webkit-input-placeholder,.jdahd textarea::-webkit-input-placeholder{color:#fff;font-size:20px;font-weight:300;box-shadow:none;-webkit-appearance:none}.jdahd footer{width:calc(100% - 40px);position:absolute;bottom:20px}.jdahd footer>p a{color:#2980b9;text-decoration:none}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}code{font-family:source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace}.jdahd #my导航栏{overflow:auto;max-height:100%;padding-right:0;padding-left:0}.jdahd *,.jdahd body{text-align:center}.jdahd h1{font-weight:300;font-size:40px}.jdahd h3{font-weight:700}.jdahd .actions,.jdahd li,.jdahd p,.jdahd textarea{width:100%}.jdahd textarea{border-color:#000;display:block;min-height:250px;margin:1em 0}.jdahd ul.pre li{white-space:pre}.jdahd .checkbox{display:inline-block}.jdahd .actions a{float:right}.jdahd .actions{clear:both}*{font-family:Microsoft Yahei}#nav{float:center}#app{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;margin-top:0}#App-logo{-webkit-animation:App-logo-spin 20s linear infinite;animation:App-logo-spin 20s linear infinite;height:40vmin;pointer-events:none}@keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}*{-webkit-user-select:text!important;-moz-user-select:text;-o-user-select:text;-ms-user-select:text!important;user-select:text!important}body,html{scroll-behavior:smooth}*{font-family:Microsoft Yahei,Helvetica,Tahoma,Arial,PingFang SC,Hiragino Sans GB,Heiti SC,MicrosoftYaHei,WenQuanYi Micro Hei,sans-serif!important}.hljs{display:block;overflow-x:auto;padding:.5em;color:#333;background:#f8f8f8;-webkit-text-size-adjust:none}.diff .hljs-header,.hljs-comment{color:#998;font-style:italic}.css .rule .hljs-keyword,.hljs-keyword,.hljs-request,.hljs-status,.hljs-subst,.hljs-winutils,.nginx .hljs-title{color:#333;font-weight:700}.hljs-hexcolor,.hljs-number,.ruby .hljs-constant{color:teal}.hljs-doctag,.hljs-string,.hljs-tag .hljs-value,.tex .hljs-formula{color:#d14}.hljs-id,.hljs-title,.scss .hljs-preprocessor{color:#900;font-weight:700}.hljs-list .hljs-keyword,.hljs-subst{font-weight:400}.hljs-class .hljs-title,.hljs-type,.tex .hljs-command,.vhdl .hljs-literal{color:#458;font-weight:700}.django .hljs-tag .hljs-keyword,.hljs-rule .hljs-property,.hljs-tag,.hljs-tag .hljs-title{color:navy;font-weight:400}.hljs-attribute,.hljs-name,.hljs-variable,.lisp .hljs-body{color:teal}.hljs-regexp{color:#009926}.clojure .hljs-keyword,.hljs-prompt,.hljs-symbol,.lisp .hljs-keyword,.ruby .hljs-symbol .hljs-string,.scheme .hljs-keyword,.tex .hljs-special{color:#990073}.hljs-built_in{color:#0086b3}.hljs-cdata,.hljs-doctype,.hljs-pi,.hljs-pragma,.hljs-preprocessor,.hljs-shebang{color:#999;font-weight:700}.hljs-deletion{background:#fdd}.hljs-addition{background:#dfd}.diff .hljs-change{background:#0086b3}.hljs-chunk{color:#aaa}#padding0{padding:0!important}@media (max-width:500px){hr#hidewidthless500{display:none}}.article-content{word-break:break-word;line-height:1.75;font-weight:400;font-size:15px;overflow-x:hidden}.article-content h1{margin:1.3rem 0;line-height:1.2}.article-content p{line-height:2.27rem}.article-content hr{border:none;border-top:1px solid #ddd;margin-top:2.7rem;margin-bottom:2.7rem}.article-content embed,.article-content iframe,.article-content img:not(.equation),.article-content video{max-width:100%!important;margin:0}.article-content img.lazyload{visibility:hidden}.article-content img.inited{background-color:#f8f9fa;background-position:50%;background-repeat:no-repeat;visibility:visible}.article-content img.loaded{background-image:none;background-color:transparent}.article-content img.equation{margin:0 .1em;max-width:100%!important;vertical-align:text-bottom}.article-content img:not(.equation){cursor:-webkit-zoom-in;cursor:zoom-in}.article-content figure{margin:2.7rem auto;text-align:center}.article-content figure figcaption{text-align:center;font-size:1rem;line-height:2.7rem;color:#909090}.article-content pre{line-height:1.93rem;overflow:auto}.article-content code,.article-content pre{font-family:Menlo,Monaco,Consolas,Courier New,monospace}.article-content code{font-size:1rem;padding:.26rem .53em;word-break:break-word;color:#4e5980;background-color:#f8f8f8;border-radius:2px;overflow-x:auto}.article-content pre>code{font-size:1rem;padding:.67rem 1.3rem;margin:0;word-break:normal;display:block}.article-content a{color:#259}.article-content a:active,.article-content a:hover{color:#275b8c}.article-content table{display:inline-block!important;font-size:1rem;width:auto;max-width:100%;overflow:auto;border:1px solid #f6f6f6}.article-content thead{background:#f6f6f6;color:#000;text-align:left}.article-content tr:nth-child(2n){background-color:#fcfcfc}.article-content td,.article-content th{padding:1rem .6rem;line-height:2rem}.article-content td{min-width:10rem}.article-content blockquote{margin:1em 0;border-left:4px solid #ddd;padding:0 1.3rem}.article-content blockquote>p{margin:.6rem 0}.article-content ol,.article-content ul{padding-left:2.7rem}.article-content ol li,.article-content ul li{margin-bottom:.6rem}.article-content ol ol,.article-content ol ul,.article-content ul ol,.article-content ul ul{margin-top:.27rem}.article-content pre>code{overflow-x:auto;-webkit-overflow-scrolling:touch;color:#333;background:#f8f8f8}.article-content .hljs-comment,.article-content .hljs-quote{color:#998}.article-content .hljs-keyword,.article-content .hljs-selector-tag,.article-content .hljs-subst{color:#333;font-weight:700}.article-content .hljs-literal,.article-content .hljs-number,.article-content .hljs-tag .hljs-attr,.article-content .hljs-template-variable,.article-content .hljs-variable{color:teal}.article-content .hljs-doctag,.article-content .hljs-string{color:#d14}.article-content .hljs-section,.article-content .hljs-selector-id,.article-content .hljs-title{color:#900;font-weight:700}.article-content .hljs-subst{font-weight:400}.article-content .hljs-class .hljs-title,.article-content .hljs-type{color:#458;font-weight:700}.article-content .hljs-attribute,.article-content .hljs-name,.article-content .hljs-tag{color:navy;font-weight:400}.article-content .hljs-link,.article-content .hljs-regexp{color:#009926}.article-content .hljs-bullet,.article-content .hljs-symbol{color:#990073}.article-content .hljs-built_in,.article-content .hljs-builtin-name{color:#0086b3}.article-content .hljs-meta{color:#999;font-weight:700}.article-content .hljs-deletion{background:#fdd}.article-content .hljs-addition{background:#dfd}.article-content .hljs-emphasis{font-style:italic}.article-content .hljs-strong{font-weight:700}.article-content p{line-height:inherit;margin-top:22px;margin-bottom:22px}.article-content img{max-height:none}.article-content a{color:#0269c8;border-bottom:1px solid #d1e9ff}.article-content code{background-color:#fff5f5;color:#ff502c;font-size:.87em;padding:.065em .4em}.article-content figure{margin:22px auto}.article-content figure figcaption{margin-top:2px;line-height:1.6}.article-content blockquote{color:#666;padding:1px 23px;margin:22px 0;border-left:4px solid #cbcbcb;background-color:#f8f8f8}.article-content blockquote:after{display:block;content:""}.article-content blockquote>p{margin:10px 0}.article-content blockquote.warning{position:relative;border-left-color:#f75151;margin-left:8px}.article-content blockquote.warning:before{position:absolute;top:14px;left:-12px;background:#f75151;border-radius:50%;content:"!";width:20px;height:20px;color:#fff;display:flex;align-items:center;justify-content:center}.article-content ol,.article-content ul{padding-left:28px}.article-content ol li,.article-content ul li{margin-bottom:0;list-style:inherit}.article-content ol li.task-list-item,.article-content ul li.task-list-item{list-style:none}.article-content ol li.task-list-item ol,.article-content ol li.task-list-item ul,.article-content ul li.task-list-item ol,.article-content ul li.task-list-item ul{margin-top:0}.article-content ol li{padding-left:6px}.article-content pre{position:relative;line-height:1.75}.article-content pre>code{padding:15px 12px}.article-content pre>code.hljs[lang]{padding:18px 15px 12px}.article-content pre>code.hljs[lang]:before{content:attr(lang);position:absolute;right:15px;top:2px;color:hsla(0,0%,54.9%,.8)}.article-content pre>code.hljs[lang][lang=bash]:before{content:""}.article-content pre>code.copyable .copy-code-btn{position:absolute;top:6px;right:15px;font-size:12px;line-height:1;cursor:pointer;color:hsla(0,0%,54.9%,.8);-webkit-transition:color .1s;transition:color .1s}.article-content pre>code.copyable .copy-code-btn:hover{color:#8c8c8c}.article-content pre>code.copyable.hljs[lang]:before{right:70px}.article-content h1,.article-content h2,.article-content h3,.article-content h4,.article-content h5,.article-content h6{color:#333;line-height:1.5;margin-top:35px;margin-bottom:10px;padding-bottom:5px}.article-content h1{font-size:30px;margin-bottom:5px}.article-content h2{padding-bottom:12px;font-size:24px;border-bottom:1px solid #ececec}.article-content h3{font-size:18px;padding-bottom:0}.article-content h4{font-size:16px}.article-content h5{font-size:15px}.article-content h6{margin-top:5px}.article-content h1.heading+h2.heading{margin-top:20px}.article-content h1.heading+h3.heading{margin-top:15px}.article-content .heading+.heading{margin-top:0}.article-content h1+:not(.heading){margin-top:25px}@media (max-width:720px){.article-content h1{font-size:24px}.article-content h2{font-size:20px}.article-content h3{font-size:18px}.article-content pre>code .copy-code-btn{display:none}.article-content pre>code.hljs[lang]:before{top:2px;right:15px}}@media (max-width:720px){.article-content pre>code.copyable.hljs[lang]:before{right:1rem}}';

var mycomapp = function mycomapp() {
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
        id: "my导航栏"
    }, createElement("nav", {
        class: "navbar navbar-default navbar navbar-expand-sm bg-light navbar-light",
        role: "navigation"
    }, createElement("div", null, createElement("a", {
        class: "navbar-brand mui-btn mui-btn-primary mui-btn-outlined",
        href: "#/"
    }, "masx200的", createElement("hr", {
        id: "hidewidthless500"
    }), "github主页"), createElement("button", {
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
    }, "基于REACT的主页")), createElement("li", null, createElement("a", {
        class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
        href: "#/react-rssreader"
    }, "rss阅读")), createElement("li", {
        id: "mynav2"
    }, createElement("a", {
        class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
        href: "#/react-about"
    }, "关于REACT")), createElement("li", {
        class: "nav-item"
    }, createElement("a", {
        class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
        href: "#/picalc"
    }, "圆周率计算多线程")), createElement("li", null, createElement("a", {
        class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
        href: "#/react-huami"
    }, "花密网页版")), createElement("li", null, createElement("a", {
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
    }, "webpack-react-vue- 极速零配置的单页面 web\n                        应用打包工具")), createElement("li", {
        class: "nav-item"
    }, createElement("a", {
        class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
        href: "#/IMPORTCJSAMDUMD动态异步加载"
    }, "动态异步加载-commonjs和umd和amd模块库")), createElement("li", {
        class: "nav-item"
    }, createElement("a", {
        class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
        href: "#/react-simple-global-state-store-hook"
    }, "适用于React的极简全局状态管理库")), createElement("li", {
        class: "nav-item"
    }, createElement("a", {
        class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
        href: "#/excellent-vscode-extensions-for-javascript"
    }, "VScode的优秀扩展推荐")), createElement("li", {
        class: "nav-item"
    }, createElement("a", {
        class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
        href: "#/vue-simple-global-state-store-manager"
    }, "适用于Vue的极简全局状态管理库")), createElement("li", null, createElement("a", {
        href: "./my-vue-router-project/index.html",
        class: "nav-link mui-btn mui-btn-primary mui-btn-outlined"
    }, "基于vue的主页")), createElement("li", null, createElement("a", {
        href: "./my-vue-router-project/index.html#/about",
        class: "nav-link mui-btn mui-btn-primary mui-btn-outlined"
    }, "关于Vue")))))), createElement("div", {
        class: "container",
        id: "my主体",
        style: "padding-top: 127.6px;"
    }, createElement("div", {
        class: "hello flowerpassword"
    }, createElement("h1", null, "花密 不一样的密码管理工具"), createElement("div", {
        id: "rong1",
        class: "container",
        style: "text-align: center;"
    }, createElement("div", {
        id: "rong2"
    }, createElement("h2", null, createElement("span", null, "1"), "输入"), createElement("div", {
        id: "input"
    }, createElement("p", null), createElement("h3", null, "记忆密码"), createElement("p", null), createElement("p", null, createElement("input", {
        "*ref": inputref,
        "@change": function change(e) {
            return console.log(e, inputref);
        },
        "@input": function input(e) {
            return console.log(e);
        },
        id: "password",
        placeholder: "输入密码",
        name: "password",
        type: "password",
        tabindex: "1",
        class: "col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control",
        value: ""
    })), createElement("p", null), createElement("span", null, "+"), createElement("h3", null, "区分代号"), createElement("p", null), createElement("p", null, createElement("input", {
        "*ref": inputref2,
        "*value": inputpassword,
        "@input": function input(e) {
            return console.log(e);
        },
        id: "key",
        placeholder: "输入代号",
        name: "key",
        type: "text",
        tabindex: "2",
        class: "col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control",
        value: ""
    }))), createElement("br", null), createElement("p", null), createElement("h2", null, createElement("span", null, "2"), "获取"), createElement("p", null), createElement("div", {
        id: "get"
    }, createElement("p", {
        id: "tuijian"
    }), createElement("p", null), createElement("h3", null, "最终密码"), createElement("p", null), createElement("span", {
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
    }, "点击复制"))), createElement("p", null, createElement("span", {
        id: "copyOK",
        style: "display: none;"
    }, "√复制成功")), createElement("p", null)))))))), createElement("script", {
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
};

mycomapp.css = css$1;

var vdom$2 = createElement(createComponent(mycomapp));

createApp(vdom$2, document.getElementById("root"));

function useMousePosition() {
    var x = createstate(0);
    var y = createstate(0);
    function update(e) {
        x.value = e.pageX;
        y.value = e.pageY;
    }
    useMounted((function() {
        window.addEventListener("mousemove", update);
    }));
    useUnMounted((function() {
        window.removeEventListener("mousemove", update);
    }));
    return {
        x: x,
        y: y
    };
}

var mycomapp$1 = function mycomapp() {
    var _useMousePosition = useMousePosition(), x = _useMousePosition.x, y = _useMousePosition.y;
    return createElement("div", null, createElement("h3", null, " 鼠标位置"), createElement("h2", null, "x:", x), createElement("h1", null, "y:", y));
};

var vdom$3 = createElement(createComponent(mycomapp$1));

document.body.appendChild(createApp(vdom$3, document.createElement("div")));
//# sourceMappingURL=index-es2015.js.map
