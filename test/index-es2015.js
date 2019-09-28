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

function insertfirst(container, ele) {
    container.insertBefore(ele, container.firstChild);
}

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
    seteletext(container, "");
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
    var _a;
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
            _this4[_a] = false;
            var optionstrue = _get(options, "true");
            var optionsfalse = _get(options, "false");
            _this4[truevdomsymbol] = isarray(optionstrue) ? optionstrue.filter(Boolean) : [ optionstrue ].filter(Boolean);
            _this4[falsevdomsymbol] = isarray(optionsfalse) ? optionsfalse.filter(Boolean) : [ optionsfalse ].filter(Boolean);
            return _this4;
        }
        _createClass(Condition, [ {
            key: (_a = readysymbol, handlefalse),
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
    if (typeof vdom === "string") {
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
        if (type && isfunction(type) || isstring(type)) {
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
        } else {
            return cssrule;
        }
    }));
}

var componentsstylesheet = {};

function savestyleblob(tagname, text) {
    tagname = tagname.toLowerCase();
    if (!componentsstylesheet[tagname]) {
        componentsstylesheet[tagname] = createcssBlob(text);
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
    var cssomnew = prefixcssrules(cssomold, prefix);
    var cssnewtext = cssrulestocsstext(cssomnew);
    return cssnewtext;
}

function registercssprefix(text, prefix) {
    var css = text;
    var cssnewtext = transformcsstext(css, prefix);
    savestyleblob(prefix, cssnewtext);
}

var attributessymbol = Symbol("attributes");

var elementsymbol = Symbol("element");

var vdomsymbol = Symbol("componentinnervdom");

var mountedsymbol = Symbol("mounted");

var unmountedsymbol = Symbol("unmounted");

function createComponent(custfun) {
    var _a, _b, _c;
    if (isfunction(custfun)) {
        var defaultProps = custfun["defaultProps"];
        var css = custfun["css"];
        return _c = function(_AttrChange2) {
            _inherits(Component, _AttrChange2);
            function Component() {
                var _this5;
                var propsjson = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
                _classCallCheck(this, Component);
                _this5 = _possibleConstructorReturn(this, _getPrototypeOf(Component).call(this));
                _this5[_a] = false;
                _this5[_b] = {};
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
                    if (!this[elementsymbol]) {
                        this[elementsymbol] = render(this[vdomsymbol]).flat(Infinity);
                    }
                    if (!this[readysymbol]) {
                        createApp(this[elementsymbol], this);
                        this[readysymbol] = true;
                    }
                    var css = this.constructor["css"];
                    if (css) {
                        var prefix = this.tagName.toLowerCase();
                        if (componentsstylesheet[prefix]) {
                            var stylelinkelement = createlinkstylesheet(componentsstylesheet[prefix]);
                            insertfirst(this, stylelinkelement);
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
        }(AttrChange), _a = readysymbol, _b = attributessymbol, _c.css = isstring(css) && css ? css : undefined, 
        _c.defaultProps = isobject(defaultProps) ? JSON.parse(JSON.stringify(defaultProps)) : undefined, 
        _c;
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
    var inputpassword = createstate("");
    var inputref = createRef();
    var inputref2 = createRef();
    console.log(inputref2);
    console.log(inputpassword);
    watch(inputpassword, console.log);
    var vdom = [ createElement("h1", {
        style: "padding-top: 127.6px;"
    }, createElement("svg", {
        style: "\n    width: 100%;\n    height: 200px;\n",
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
        style: "\n    width: 100%;\n    height: 200px;\n"
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
        "*ref": inputref,
        "@change": function change(e) {
            return console.log(e, inputref);
        },
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
        style: "\n    width:600px;\n    height: 600px;\n"
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
        style: "\n    width: 100%;\n    height: 200px;\n",
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
    createApp(vdom, document.getElementById("root"));
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

var vdom = createElement(Fragment, null, createElement("header", {
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
}, "2小时前"), " · ", createElement("span", {
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

var css = '@charset "UTF-8";\r\n@import url(https://cdn.staticfile.org/typo.css/1.1/typo.css);\r\n@import url(https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css);\r\n/* import必须放最顶上,否则就没了! */\r\n@font-face {\r\n  font-family: octicons-anchor;\r\n  src: url(data:font/woff;charset=utf-8;base64,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)\r\n    format("woff");\r\n}\r\n\r\n* {\r\n  color: purple !important;\r\n\r\n  font-size: 50px;\r\n}\r\n\r\n@keyframes App-logo-spin {\r\n  0% {\r\n    -webkit-transform: rotate(0deg);\r\n    transform: rotate(0deg);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: rotate(1turn);\r\n    transform: rotate(1turn);\r\n  }\r\n}\r\n\r\n@media (max-width: 720px) {\r\n  .article-content h1 {\r\n    font-size: 24px;\r\n  }\r\n\r\n  .article-content h2 {\r\n    font-size: 20px;\r\n  }\r\n\r\n  .article-content h3 {\r\n    font-size: 18px;\r\n  }\r\n\r\n  .article-content pre > code .copy-code-btn {\r\n    display: none;\r\n  }\r\n\r\n  .article-content pre > code.hljs[lang]:before {\r\n    top: 2px;\r\n    right: 15px;\r\n  }\r\n}\r\n\r\n@media (max-width: 720px) {\r\n  .article-content pre > code.copyable.hljs[lang]:before {\r\n    right: 1rem;\r\n  }\r\n}\r\n\r\n@media (max-width: 500px) {\r\n  hr#hidewidthless500 {\r\n    display: none;\r\n  }\r\n}\r\n\r\n.recommend-container .recommend-user .item {\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.recommend-container .recommend-user .ui.button {\r\n  padding: 3px 5px;\r\n  margin-right: 0;\r\n}\r\n\r\n.recommend-container .recommend-user .header .pull-right {\r\n  color: #005980;\r\n  cursor: pointer;\r\n}\r\n\r\n.recommend-container .recommend-user .header .pull-right.disabled {\r\n  opacity: 0.7;\r\n  cursor: default;\r\n}\r\n\r\n.recommend-container .recommend-user .icon-reset {\r\n  margin-top: -1px;\r\n  height: 16px;\r\n  font-size: 16px;\r\n  margin-right: 2px;\r\n}\r\n\r\n.recommend-container .recommend-user__content {\r\n  position: relative;\r\n}\r\n\r\n.recommend-container .dimmer.active {\r\n  z-index: 1;\r\n}\r\n\r\n.recommend-container .recommend-list__user {\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n  -moz-box-flex: 1;\r\n  -ms-flex: 1;\r\n  flex: 1;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n  -moz-box-align: center;\r\n  -ms-flex-align: center;\r\n  align-items: center;\r\n  margin-right: 4px;\r\n}\r\n\r\n.recommend-container .recommend-list__user strong {\r\n  color: #005980;\r\n}\r\n\r\n.recommend-container .recommend-list__user .recommend-list__user-info {\r\n  margin: 0 4px 0 8px;\r\n  max-width: 155px;\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.recommend-container\r\n  .recommend-list__user\r\n  .recommend-list__user-info.is-follow {\r\n  max-width: 125px;\r\n}\r\n\r\n.recommend-container .recommend-list__user .recommend-list__user-info > div {\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.recommend-container .recommend-list__flollow .disable {\r\n  opacity: 0.5;\r\n}\r\n\r\n.recommend-container .recommend-project .icon-recommended {\r\n  color: #fe7300;\r\n}\r\n\r\n.recommend-container .recommend-project .project-label {\r\n  display: inline-block;\r\n}\r\n\r\n.recommend-container .recommend-project .recommend-list {\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n  -webkit-flex-direction: column;\r\n  -moz-box-orient: vertical;\r\n  -moz-box-direction: normal;\r\n  -ms-flex-direction: column;\r\n  flex-direction: column;\r\n}\r\n\r\n.recommend-container .recommend-project .recommend-list > * {\r\n  word-break: break-all;\r\n}\r\n\r\n.recommend-container\r\n  .recommend-project\r\n  .recommend-list\r\n  .recommend-project__describe {\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  -webkit-line-clamp: 3;\r\n  display: -webkit-box;\r\n  -webkit-box-orient: vertical;\r\n}\r\n\r\n.recommend-container .recommend-project .item {\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.recommend-container .recommend-project .recommend-project__name {\r\n  margin-bottom: 4px;\r\n  color: #005980;\r\n}\r\n\r\n.recommend-container .recent_visits .ui.items {\r\n  margin-right: 0;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n}\r\n\r\n.recommend-container .recent_visits .avatar-item {\r\n  margin-right: -22px !important;\r\n}\r\n\r\n.recommend-container .recent_visits .item {\r\n  width: 20%;\r\n  min-width: initial;\r\n  font-size: 16px;\r\n}\r\n\r\n.recommend-container .recent_visits .empty-visitor.item {\r\n  font-size: 14px;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n  -moz-box-flex: 1;\r\n  -ms-flex: 1;\r\n  flex: 1;\r\n}\r\n\r\n.dashboard-content.twelve {\r\n  padding-right: 0 !important;\r\n}\r\n\r\n.dashboard-content .gitee-headbread .git-user-selection-dropdown {\r\n  margin-right: 0 !important;\r\n}\r\n\r\n.dashboard-content .dashboard-team .git-user-content-header {\r\n  display: none;\r\n}\r\n\r\n.dashboard-content .gitee-headbread {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.dashboard-content .git-dashboard-projects-menu {\r\n  margin-bottom: 24px !important;\r\n}\r\n\r\n.dashboard-content .git-dashboard-projects-menu .f-bold {\r\n  color: #fe7300;\r\n  border-bottom: 2px solid #fe7300 !important;\r\n}\r\n\r\n.dashboard-content .git-dashboard-projects-menu > a.item {\r\n  font-size: 16px;\r\n  padding: 8px 18px !important;\r\n}\r\n\r\n.dashboard-content\r\n  .git-dashboard-projects-menu\r\n  #search-form\r\n  .ui.search\r\n  .ui.input {\r\n  width: 150px;\r\n  margin-right: 10px;\r\n}\r\n\r\n.dashboard-content\r\n  .git-dashboard-projects-menu\r\n  #search-form\r\n  .ui.search\r\n  .ui.input\r\n  input {\r\n  margin-top: -6px;\r\n  font-size: 12px;\r\n  margin-right: 10px;\r\n}\r\n\r\n.dashboard-content\r\n  .git-dashboard-projects-menu\r\n  #search-form\r\n  .ui.search\r\n  .ui.input\r\n  .icon-search {\r\n  margin-top: -4px;\r\n}\r\n\r\n.dashboard-content #event-timeline-panel h3.event-timeline-title {\r\n  font-size: 16px;\r\n  margin-top: 0;\r\n  margin-bottom: 16px;\r\n  display: inline-block;\r\n}\r\n\r\n.dashboard-content #event-timeline-panel .event-timeline.content {\r\n  padding: 0 0 18px 12px;\r\n}\r\n\r\n.dashboard-content #event-timeline-panel .event-actionbar .dropdown.icon {\r\n  margin-left: 4px;\r\n}\r\n\r\n.dashboard-content #event-timeline-panel .message-container .message {\r\n  margin: 0;\r\n  margin-bottom: 1em;\r\n}\r\n\r\n.dashboard-content .issues-filter__item {\r\n  display: block;\r\n  padding: 0 !important;\r\n  color: initial !important;\r\n  font-weight: 500 !important;\r\n}\r\n\r\n.dashboard-content .issues-dropdown {\r\n  margin-top: -6px !important;\r\n}\r\n\r\n.dashboard-content .issues-dropdown .pl-0.f-bold {\r\n  padding-left: 0 !important;\r\n}\r\n\r\n.dashboard-content .dashboard-team .dashboard-team_info {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n}\r\n\r\n.dashboard-content .dashboard-team .ui.image {\r\n  width: 40px;\r\n  height: 40px;\r\n  min-width: 40px;\r\n}\r\n\r\n.dashboard-content\r\n  .dashboard-team\r\n  .dashboard-team__contaniner\r\n  .dashboard-team__name {\r\n  font-size: 16px;\r\n  font-weight: bold;\r\n  overflow: hidden;\r\n  word-break: keep-all;\r\n  text-overflow: ellipsis;\r\n  display: block;\r\n}\r\n\r\n.dashboard-content .dashboard-team .dashboard-team__contaniner a {\r\n  color: #005980 !important;\r\n}\r\n\r\n.dashboard-content\r\n  .dashboard-team\r\n  .dashboard-team__contaniner\r\n  > .item:first-child {\r\n  padding-top: 0 !important;\r\n}\r\n\r\n.dashboard-content .dashboard-team .dashboard-team__contaniner .item {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n}\r\n\r\n.dashboard-content .dashboard-team .dashboard-team__contaniner .content {\r\n  display: -webkit-box !important;\r\n  display: -webkit-flex !important;\r\n  display: -moz-box !important;\r\n  display: -ms-flexbox !important;\r\n  display: flex !important;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n  -webkit-flex-direction: column;\r\n  -moz-box-orient: vertical;\r\n  -moz-box-direction: normal;\r\n  -ms-flex-direction: column;\r\n  flex-direction: column;\r\n  -webkit-box-pack: justify;\r\n  -webkit-justify-content: space-between;\r\n  -moz-box-pack: justify;\r\n  -ms-flex-pack: justify;\r\n  justify-content: space-between;\r\n  overflow: hidden;\r\n}\r\n\r\n.dashboard-content .dashboard-team .dashboard-team__contaniner .content::after {\r\n  content: none;\r\n}\r\n\r\n.dashboard-content .dashboard-team .dashboard-team__contaniner .content i {\r\n  font-size: 16px;\r\n}\r\n\r\n.dashboard-content .dashboard-team .icon-enterprise-badge {\r\n  margin-left: 4px;\r\n}\r\n\r\n.dashboard-content .dashboard-team .dashboard-team__operate {\r\n  min-width: 75px;\r\n  -webkit-align-self: center;\r\n  -ms-flex-item-align: center;\r\n  align-self: center;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n  -moz-box-flex: 1;\r\n  -ms-flex: 1;\r\n  flex: 1;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: end;\r\n  -webkit-justify-content: flex-end;\r\n  -moz-box-pack: end;\r\n  -ms-flex-pack: end;\r\n  justify-content: flex-end;\r\n}\r\n\r\n.dashboard-content .dashboard-team .dashboard-team__operate.has-exit {\r\n  min-width: 150px;\r\n}\r\n\r\n.recommend-project .icon-help-circle {\r\n  vertical-align: baseline;\r\n}\r\n\r\n.dashboard-content__show {\r\n  width: 608px !important;\r\n  -webkit-box-sizing: content-box;\r\n  -moz-box-sizing: content-box;\r\n  box-sizing: content-box;\r\n}\r\n\r\n.ui.container.user_page {\r\n  width: 1240px;\r\n}\r\n\r\n#rc-users__container {\r\n  position: relative;\r\n}\r\n\r\n#rc-users__container .secondary-navigation .active {\r\n  color: #fe7300 !important;\r\n}\r\n\r\n#rc-users__container .dashboard-content {\r\n  padding-right: 32px;\r\n  padding-left: 32px;\r\n  padding-top: 24px;\r\n}\r\n\r\n#rc-users__container .dashboard-sidebar {\r\n  padding: 16px 0 0 0;\r\n  width: 280px !important;\r\n  margin-left: 10px;\r\n}\r\n\r\n#rc-users__container .dashboard-sidebar .dashboard-group .item {\r\n  margin: 8px 0;\r\n}\r\n\r\n#rc-users__container .dashboard-sidebar .dashboard-group:last-child {\r\n  margin-bottom: 0 !important;\r\n}\r\n\r\n#rc-users__container .dashboard-sidebar .user-dashboard-sidebar {\r\n  padding-top: 0;\r\n}\r\n\r\n#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .ui.card {\r\n  width: 100%;\r\n  margin-top: 32px;\r\n  margin-bottom: 0;\r\n  padding-bottom: 0;\r\n}\r\n\r\n#rc-users__container\r\n  .dashboard-sidebar\r\n  .user-dashboard-sidebar\r\n  .ui.card\r\n  .header {\r\n  font-size: 16px;\r\n}\r\n\r\n#rc-users__container\r\n  .dashboard-sidebar\r\n  .user-dashboard-sidebar\r\n  .enterprise-name\r\n  h4 {\r\n  font-size: 14px;\r\n  display: inline-block;\r\n}\r\n\r\n#rc-users__container\r\n  .dashboard-sidebar\r\n  .user-dashboard-sidebar\r\n  .enterprise-name\r\n  .description {\r\n  margin-top: 0;\r\n}\r\n\r\n#rc-users__container\r\n  .dashboard-sidebar\r\n  .user-dashboard-sidebar\r\n  .enterprise-name\r\n  .item.flex {\r\n  margin-top: 16px;\r\n}\r\n\r\n#rc-users__container\r\n  .dashboard-sidebar\r\n  .user-dashboard-sidebar\r\n  .enterprise-name\r\n  .item.flex:first-child {\r\n  margin-top: 12px;\r\n}\r\n\r\n#rc-users__container\r\n  .dashboard-sidebar\r\n  .user-dashboard-sidebar\r\n  .enterprise-name\r\n  .quit\r\n  i {\r\n  margin-top: 0;\r\n}\r\n\r\n#rc-users__container .has-active .content {\r\n  padding-left: 0 2px 0 8px;\r\n}\r\n\r\n#rc-users__container .navigation .header {\r\n  padding-right: 8px;\r\n  border-bottom: 1px solid #e3e9ed;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: justify;\r\n  -webkit-justify-content: space-between;\r\n  -moz-box-pack: justify;\r\n  -ms-flex-pack: justify;\r\n  justify-content: space-between;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n  -moz-box-align: center;\r\n  -ms-flex-align: center;\r\n  align-items: center;\r\n  padding-bottom: 4px;\r\n}\r\n\r\n#rc-users__container .navigation .header .title {\r\n  font-size: 16px;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n}\r\n\r\n#rc-users__container .navigation .header .avatar.image {\r\n  margin-right: 0;\r\n}\r\n\r\n#rc-users__container .navigation .header strong {\r\n  font-size: 16px;\r\n  -webkit-align-self: center;\r\n  -ms-flex-item-align: center;\r\n  align-self: center;\r\n  max-width: 120px;\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n#rc-users__container .navigation .header strong a {\r\n  color: unset;\r\n}\r\n\r\n#rc-users__container .navigation .header .actions {\r\n  margin-top: 4px;\r\n}\r\n\r\n#rc-users__container .navigation .header .actions i {\r\n  color: #005980;\r\n}\r\n\r\n#rc-users__container .navigation.user i {\r\n  color: #989dad;\r\n}\r\n\r\n#rc-users__container .navigation.user .content {\r\n  padding: 0 8px;\r\n}\r\n\r\n#rc-users__container .navigation .items > a {\r\n  color: #40485b;\r\n}\r\n\r\n#rc-users__container .navigation .items > a:hover {\r\n  color: #095eab;\r\n}\r\n\r\n#rc-users__container .navigation .items > a:active {\r\n  color: #064177;\r\n}\r\n\r\n#rc-users__container .navigation .items > a:hover {\r\n  color: #40485b;\r\n}\r\n\r\n#rc-users__container .navigation .item:hover .content {\r\n  background: #f8f8f8;\r\n}\r\n\r\n#rc-users__container .navigation .item .active {\r\n  color: #fe7300;\r\n  background: #f8f8f8;\r\n}\r\n\r\n#rc-users__container .navigation .item .active .num {\r\n  color: inherit;\r\n}\r\n\r\n#rc-users__container .navigation .item:hover .exit {\r\n  display: inline-block;\r\n}\r\n\r\n#rc-users__container .navigation .icon-add,\r\n#rc-users__container .navigation .icon-search {\r\n  color: #8c92a4 !important;\r\n}\r\n\r\n#rc-users__container .navigation .num {\r\n  font-size: 12px;\r\n  font-weight: 500;\r\n  color: #8c92a4;\r\n}\r\n\r\n#rc-users__container .navigation .gray {\r\n  color: #8c92a4;\r\n}\r\n\r\n#rc-users__container .navigation .avatar.image {\r\n  width: 32px;\r\n  height: 32px;\r\n}\r\n\r\n#rc-users__container .twitter-typeahead {\r\n  width: 100%;\r\n}\r\n\r\n#rc-users__container .gray {\r\n  color: #8c92a4;\r\n}\r\n\r\n#rc-users__container .ui.container {\r\n  width: 1240px;\r\n}\r\n\r\n#rc-users__container .contribution-events {\r\n  padding-top: 32px;\r\n}\r\n\r\n#rc-users__container #git-footer-main {\r\n  min-width: 1240px;\r\n}\r\n\r\n#rc-users__container .gitee-headbread .gitee-divider {\r\n  display: inline-block;\r\n  opacity: 0.5;\r\n  margin: 0em 0.2rem 0em;\r\n  color: rgba(0, 0, 0, 0.4);\r\n  vertical-align: baseline;\r\n}\r\n\r\n#rc-users__container .git-user-content .git-user-content-header {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: justify;\r\n  -webkit-justify-content: space-between;\r\n  -moz-box-pack: justify;\r\n  -ms-flex-pack: justify;\r\n  justify-content: space-between;\r\n  margin-bottom: 16px;\r\n}\r\n\r\n#rc-users__container .ui.button.js-project-watch {\r\n  background: #fff;\r\n  border: 1px solid rgba(140, 146, 164, 0.5);\r\n  padding: 2px 5px;\r\n  margin: 0;\r\n}\r\n\r\n#rc-users__container .recommend-container {\r\n  width: 248px !important;\r\n}\r\n\r\n.users__personal-avatar {\r\n  position: relative;\r\n  margin: 0 auto 10px;\r\n  width: 160px;\r\n  height: 160px;\r\n}\r\n\r\n.users__personal-avatar .over-avatar {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #fff;\r\n  font-size: 14px;\r\n  text-align: center;\r\n  line-height: 200px;\r\n  border: 4px solid #eee;\r\n  border-radius: 50%;\r\n  background: rgba(0, 0, 0, 0.5);\r\n  cursor: pointer;\r\n  display: none;\r\n}\r\n\r\n.users__personal-avatar .over-avatar:hover {\r\n  display: block;\r\n}\r\n\r\n.users__personal-avatar .ui.image.avatar {\r\n  margin: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  border: 4px solid #eee;\r\n}\r\n\r\n.users__personal-avatar .ui.image.avatar:hover + .over-avatar {\r\n  display: block;\r\n}\r\n\r\n.users__personal-avatar .avatar-gender {\r\n  position: absolute;\r\n  bottom: 2px;\r\n  right: 27px;\r\n  width: 32px;\r\n  height: 32px;\r\n  border-radius: 50%;\r\n  color: #fff;\r\n  font-size: 21px;\r\n  text-align: center;\r\n  line-height: 30px;\r\n  border: 2px solid #fff;\r\n}\r\n\r\n.users__personal-avatar .avatar-gender.mars {\r\n  background: #3eb4ff;\r\n}\r\n\r\n.users__personal-avatar .avatar-gender.venus {\r\n  background: #ff5bc6;\r\n}\r\n\r\n.users__personal-name {\r\n  text-align: center;\r\n}\r\n\r\n.users__personal-name h2,\r\n.users__personal-name p {\r\n  margin: 8px 0 0;\r\n  word-break: break-all;\r\n}\r\n\r\n.users__personal-name h2 span,\r\n.users__personal-name p span {\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  display: -webkit-box;\r\n  -webkit-line-clamp: 3;\r\n  -webkit-box-orient: vertical;\r\n}\r\n\r\n.users__personal-name .remark-name {\r\n  color: #8c92a4;\r\n  font-size: 14px;\r\n  font-weight: normal;\r\n  display: inline;\r\n}\r\n\r\n.users__personal-name .ui.small.label {\r\n  margin-bottom: 0.5em;\r\n  padding: 0.4em 0.7em;\r\n  font-weight: normal;\r\n}\r\n\r\n.users__personal-setting {\r\n  margin: 15px auto;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-justify-content: space-around;\r\n  -ms-flex-pack: distribute;\r\n  justify-content: space-around;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n  -moz-box-align: center;\r\n  -ms-flex-align: center;\r\n  align-items: center;\r\n}\r\n\r\n.users__personal-setting .ui.button {\r\n  margin: 0;\r\n  width: 45%;\r\n  font-size: 14px;\r\n}\r\n\r\n.users__personal-setting .ui.button.basic {\r\n  border: 1px solid #ccc;\r\n}\r\n\r\n.users__personal-socials .ui.grid {\r\n  padding: 0 1rem;\r\n}\r\n\r\n.users__personal-socials .ui.grid .column {\r\n  padding: 1rem 0;\r\n  text-align: center;\r\n}\r\n\r\n.users__personal-socials .social-count {\r\n  font-size: 18px;\r\n  font-weight: bold;\r\n}\r\n\r\n.users__personal-socials .social-name {\r\n  padding-top: 5px;\r\n  color: #40485b;\r\n  font-size: 12px;\r\n  display: block;\r\n}\r\n\r\n.users__personal-info {\r\n  padding: 15px 0;\r\n  color: #8c92a4;\r\n}\r\n\r\n.users__personal-info .info-item {\r\n  padding: 3px 0;\r\n  line-height: 1.5;\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.users__personal-info .info-item i.iconfont {\r\n  width: 20px;\r\n  text-align: center;\r\n}\r\n\r\n.users__personal-info .info-item i.iconfont.icon-time {\r\n  font-size: 12px;\r\n}\r\n\r\n.users__personal-achievement {\r\n  padding: 10px 0;\r\n}\r\n\r\n.users__personal-achievement h3 {\r\n  margin: 0;\r\n  padding-bottom: 4px;\r\n  border-bottom: 1px solid #dce3e8;\r\n}\r\n\r\n.users__personal-achievement .ui.list .item .content {\r\n  line-height: 1.8;\r\n}\r\n\r\n.users__personal-achievement .ui.list .item .content .description {\r\n  color: #7687ab;\r\n}\r\n\r\n.users__personal-groups {\r\n  padding: 10px 0;\r\n}\r\n\r\n.users__personal-groups h3 {\r\n  margin: 0;\r\n  padding-bottom: 4px;\r\n  border-bottom: 1px solid #dce3e8;\r\n}\r\n\r\n.users__personal-groups .ui.list {\r\n  margin: 0;\r\n}\r\n\r\n.users__personal-groups .ui.list:not(.more-groups) {\r\n  margin-top: 1em;\r\n}\r\n\r\n.users__personal-groups .ui.list .item {\r\n  padding: 0.3em 0;\r\n}\r\n\r\n.users__personal-groups .ui.list .item a {\r\n  color: #005980 !important;\r\n}\r\n\r\n.users__personal-groups .ui.list .item a:hover {\r\n  color: #4c8aa6 !important;\r\n}\r\n\r\n.users__personal-groups .ui.list .item a:active {\r\n  color: #003e59 !important;\r\n}\r\n\r\n.users__personal-groups .ui.list .item .content {\r\n  line-height: 1.8;\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.users__personal-groups .ui.list .item .right.floated.content {\r\n  color: #7687ab;\r\n}\r\n\r\n.users__personal-groups .ui.list .item .right.floated.content .mr-1 {\r\n  width: 24px;\r\n  display: inline-block;\r\n}\r\n\r\n.users__personal-groups .load-more-groups {\r\n  margin-top: 8px;\r\n  display: block;\r\n  color: #7687ab;\r\n}\r\n\r\n.users__personal-groups .load-more-groups:hover {\r\n  color: #9fabc4;\r\n}\r\n\r\n.users__personal-groups .load-more-groups:active {\r\n  color: #525e77;\r\n}\r\n\r\n.users__navbar .ui.secondary.pointing.menu {\r\n  border-bottom: 2px solid #dededf;\r\n}\r\n\r\n.users__navbar .ui.secondary.pointing.menu > .item {\r\n  margin-bottom: -2px;\r\n  padding: 10px 30px;\r\n  min-width: 100px;\r\n  text-align: center;\r\n  border-width: 2px;\r\n}\r\n\r\n.users__navbar .ui.secondary.pointing.menu > .item.active {\r\n  color: #fe7300;\r\n  border-color: #fe7300;\r\n}\r\n\r\n.users__navbar .ui.secondary.pointing.menu > .item.active .ui.label {\r\n  color: #fe7300;\r\n  background: rgba(254, 115, 0, 0.2);\r\n}\r\n\r\n.users__header {\r\n  margin-top: 2em;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: justify;\r\n  -webkit-justify-content: space-between;\r\n  -moz-box-pack: justify;\r\n  -ms-flex-pack: justify;\r\n  justify-content: space-between;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n  -moz-box-align: center;\r\n  -ms-flex-align: center;\r\n  align-items: center;\r\n}\r\n\r\n.users__header h3 {\r\n  margin: 0;\r\n}\r\n\r\n.users__header .ui.dropdown {\r\n  padding: 0.5em 0.92857em;\r\n}\r\n\r\n.users__popular-projects .ui.cards {\r\n  margin: 0 -0.5em -0.5em;\r\n}\r\n\r\n.users__popular-projects .ui.cards .ui.card {\r\n  margin: 0.5em !important;\r\n  padding: 1em;\r\n  width: calc(50% - 1em) !important;\r\n  border: 1px solid #dce3e8;\r\n  -webkit-box-shadow: none;\r\n  box-shadow: none;\r\n}\r\n\r\n.users__popular-projects .ui.cards .ui.card .content {\r\n  padding: 0;\r\n}\r\n\r\n.users__popular-projects .ui.cards .ui.card .content .popular-project-title {\r\n  font-size: 16px;\r\n  word-break: break-all;\r\n  vertical-align: middle;\r\n}\r\n\r\n.users__popular-projects .ui.cards .ui.card .content .git-project-gvp-badge {\r\n  margin-top: -3px;\r\n}\r\n\r\n.users__popular-projects .ui.cards .ui.card .content i.iconfont {\r\n  font-size: 14px;\r\n}\r\n\r\n.users__popular-projects\r\n  .ui.cards\r\n  .ui.card\r\n  .content\r\n  i.iconfont.icon-mode-table {\r\n  margin-top: 1px;\r\n  color: #d0d0d0;\r\n  cursor: move;\r\n}\r\n\r\n.users__popular-projects\r\n  .ui.cards\r\n  .ui.card\r\n  .content\r\n  i.iconfont.icon-recommended {\r\n  color: #fe7300;\r\n  font-weight: normal;\r\n}\r\n\r\n.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-watch {\r\n  font-size: 12px;\r\n  vertical-align: baseline;\r\n}\r\n\r\n.users__popular-projects .ui.cards .ui.card .content .description {\r\n  color: #8c92a4;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  display: -webkit-box;\r\n  -webkit-line-clamp: 3;\r\n  -webkit-box-orient: vertical;\r\n}\r\n\r\n.users__popular-projects .ui.cards .ui.card .extra.content {\r\n  padding-top: 1em;\r\n  border: none !important;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: justify;\r\n  -webkit-justify-content: space-between;\r\n  -moz-box-pack: justify;\r\n  -ms-flex-pack: justify;\r\n  justify-content: space-between;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n  -moz-box-align: center;\r\n  -ms-flex-align: center;\r\n  align-items: center;\r\n}\r\n\r\n.users__popular-projects .ui.cards .ui.card .extra.content:after {\r\n  content: none;\r\n}\r\n\r\n.users__popular-projects\r\n  .ui.cards\r\n  .ui.card\r\n  .extra.content\r\n  .left\r\n  .ui.small.label {\r\n  padding: 0.4em 0.7em;\r\n}\r\n\r\n.users__popular-projects .ui.cards .ui.card .extra.content .right a {\r\n  padding: 0 0.2em;\r\n  color: #8c92a4;\r\n}\r\n\r\n.users__popular-projects .ui.cards .ui.card .extra.content .right a:hover {\r\n  color: #aeb2bf;\r\n}\r\n\r\n.users__popular-projects .ui.cards .ui.card .extra.content .right a:active {\r\n  color: #626672;\r\n}\r\n\r\n.users__popular-projects .ui.cards .ui.card.sortable-chosen {\r\n  background: #fed !important;\r\n}\r\n\r\n.users__contribution-panel .less {\r\n  background-color: #eeeeee;\r\n}\r\n\r\n.users__contribution-panel .little {\r\n  background-color: #d6e685;\r\n}\r\n\r\n.users__contribution-panel .some {\r\n  background-color: #8cc665;\r\n}\r\n\r\n.users__contribution-panel .many {\r\n  background-color: #44a340;\r\n}\r\n\r\n.users__contribution-panel .much {\r\n  background-color: #1e6823;\r\n}\r\n\r\n.users__contribution-panel .contribution-box {\r\n  padding-top: 20px;\r\n  height: 125px;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n}\r\n\r\n.users__contribution-panel .contribution-box .left-side {\r\n  width: 32px;\r\n  font-size: 12px;\r\n  text-align: center;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n  -webkit-flex-direction: column;\r\n  -moz-box-orient: vertical;\r\n  -moz-box-direction: normal;\r\n  -ms-flex-direction: column;\r\n  flex-direction: column;\r\n  -webkit-box-pack: justify;\r\n  -webkit-justify-content: space-between;\r\n  -moz-box-pack: justify;\r\n  -ms-flex-pack: justify;\r\n  justify-content: space-between;\r\n}\r\n\r\n.users__contribution-panel .contribution-box .right-side {\r\n  position: relative;\r\n  width: 100%;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n  -webkit-flex-direction: column;\r\n  -moz-box-orient: vertical;\r\n  -moz-box-direction: normal;\r\n  -ms-flex-direction: column;\r\n  flex-direction: column;\r\n  -webkit-flex-wrap: wrap;\r\n  -ms-flex-wrap: wrap;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.users__contribution-panel .contribution-box .right-side .box {\r\n  width: 1.88679%;\r\n  height: 15px;\r\n  border: 1px solid #fff;\r\n}\r\n\r\n.users__contribution-panel\r\n  .contribution-box\r\n  .right-side\r\n  .box[data-content]:hover {\r\n  border: 1px solid #000;\r\n}\r\n\r\n.users__contribution-panel .contribution-box .right-side .month {\r\n  position: absolute;\r\n  top: 0;\r\n  margin-top: -15px;\r\n  margin-left: -15px;\r\n  min-width: 45px;\r\n  font-size: 12px;\r\n  text-align: center;\r\n}\r\n\r\n.users__contribution-panel .contribution-tip {\r\n  margin-top: 10px;\r\n  padding-right: 10px;\r\n  font-size: 12px;\r\n  text-align: right;\r\n}\r\n\r\n.users__contribution-panel .contribution-tip .word {\r\n  font-size: 12px;\r\n  vertical-align: top;\r\n  display: inline-block;\r\n}\r\n\r\n.users__contribution-panel .contribution-tip .ui.horizontal.list > .item {\r\n  margin: 0 1px;\r\n  width: 12px;\r\n  height: 12px;\r\n  vertical-align: text-bottom;\r\n}\r\n\r\n.users__contribution-panel .contribution-describ p {\r\n  margin: 0;\r\n  margin-right: 20px;\r\n  display: inline-block;\r\n}\r\n\r\n.users__contribution-panel .contribution-describ p.text-muted {\r\n  margin-top: 10px;\r\n  display: block;\r\n}\r\n\r\n.users__customize-modal .ui.form {\r\n  min-height: 180px;\r\n}\r\n\r\n.users__customize-modal .grouped.fields {\r\n  margin: 0.2em 0em 1em !important;\r\n  padding: 10px 0;\r\n  max-height: 20em;\r\n  overflow-y: auto;\r\n}\r\n\r\n.users__customize-modal .grouped.fields .field {\r\n  padding: 5px !important;\r\n}\r\n\r\n.users__customize-modal .grouped.fields .field .ui.checkbox {\r\n  width: 100%;\r\n}\r\n\r\n.users__customize-modal .grouped.fields .field label {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: justify;\r\n  -webkit-justify-content: space-between;\r\n  -moz-box-pack: justify;\r\n  -ms-flex-pack: justify;\r\n  justify-content: space-between;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n  -moz-box-align: center;\r\n  -ms-flex-align: center;\r\n  align-items: center;\r\n}\r\n\r\n.users__customize-modal .grouped.fields .field label span {\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.users__customize-modal .grouped.fields .field label .star-count {\r\n  min-width: 4em;\r\n  text-align: right;\r\n}\r\n\r\n.users__customize-modal .grouped.fields .field.active {\r\n  background: rgba(254, 115, 0, 0.2);\r\n}\r\n\r\n.users__report-modal .appeal-success-tip {\r\n  text-align: center;\r\n}\r\n\r\n.users__report-modal .appeal-success-tip i.iconfont {\r\n  font-size: 7rem;\r\n  color: #4baf50;\r\n}\r\n\r\n.users__report-modal .ui.items {\r\n  padding: 20px;\r\n  background: #f4f5f6;\r\n}\r\n\r\n.users__report-modal .ui.items .ui.image {\r\n  width: 50px;\r\n}\r\n\r\n.users__report-modal .ui.items .content .header {\r\n  color: #40485b;\r\n}\r\n\r\n.users__report-modal .ui.items .content .description {\r\n  color: #8c92a4;\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.users__report-modal .ui.segment.loader-block {\r\n  border: 0;\r\n  min-height: 100px;\r\n}\r\n\r\n.users__report-modal .action-types .item {\r\n  margin: 5px;\r\n  padding: 10px 20px;\r\n  min-width: 120px;\r\n  text-align: center;\r\n  display: inline-block;\r\n  background: #f2f2f2;\r\n  border-radius: 5px;\r\n  cursor: pointer;\r\n}\r\n\r\n.users__report-modal .action-types .item:hover,\r\n.users__report-modal .action-types .item:active,\r\n.users__report-modal .action-types .item.active {\r\n  color: #fe7300;\r\n}\r\n\r\n.users__report-modal .extra-content textarea {\r\n  width: 100%;\r\n  height: 5em;\r\n}\r\n\r\n#user-show-detail .git-dashboard-projects-menu > .f-bold {\r\n  color: #fe7300;\r\n}\r\n\r\n#user-show-detail .git-codes-tags {\r\n  margin-bottom: 16px;\r\n}\r\n\r\n#user-show-detail .git-user-twl-col > .gitee-headbread {\r\n  margin-bottom: 16px;\r\n  margin-top: 10px;\r\n}\r\n\r\n#user-show-detail .git-profile-content-header .git-dashboard-projects-menu {\r\n  margin-bottom: 14px;\r\n}\r\n\r\n#user-show-detail .git-profile-content-header .git-dashboard-projects-menu > a {\r\n  font-size: 14px;\r\n}\r\n\r\n.recommend-container {\r\n  padding: 24px 0 0 0 !important;\r\n}\r\n\r\n.recommend-container .recommend-notice {\r\n  background-color: #fffeed !important;\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.recommend-container .recommend-notice > .header {\r\n  margin-right: 8px !important;\r\n}\r\n\r\n.recommend-container .ui.message {\r\n  color: #40485b;\r\n  padding: 12px 16px;\r\n  -webkit-box-shadow: 0px 0px 0px 1px #e2d8bf inset,\r\n    0px 0px 0px 0px rgba(0, 0, 0, 0);\r\n  box-shadow: 0px 0px 0px 1px #e2d8bf inset, 0px 0px 0px 0px rgba(0, 0, 0, 0);\r\n}\r\n\r\n.recommend-container .ui.message i {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  font-size: 0.8em;\r\n  margin-top: 8px;\r\n  margin-right: 8px;\r\n  cursor: pointer;\r\n  color: #005980;\r\n}\r\n\r\n.recommend-container .ui.message .header {\r\n  color: #40485b;\r\n  font-size: 14px;\r\n}\r\n\r\n.recommend-container .ui.message .content {\r\n  margin-top: 4px;\r\n}\r\n\r\n.recommend-container .recommend-block {\r\n  margin-bottom: 32px;\r\n}\r\n\r\n.recommend-container .recommend-block > .items {\r\n  margin-top: 0;\r\n}\r\n\r\n.recommend-container .recommend-block .header {\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.recommend-container .recommend-block .header strong {\r\n  font-size: 16px;\r\n}\r\n\r\n.recommend-container .recommend-block .recommend-list {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n}\r\n\r\n.recommend-container .recommend-block .item {\r\n  margin: 0;\r\n}\r\n\r\n.recommend-container .recommend-user .header {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: justify;\r\n  -webkit-justify-content: space-between;\r\n  -moz-box-pack: justify;\r\n  -ms-flex-pack: justify;\r\n  justify-content: space-between;\r\n  -webkit-box-align: end;\r\n  -webkit-align-items: flex-end;\r\n  -moz-box-align: end;\r\n  -ms-flex-align: end;\r\n  align-items: flex-end;\r\n}\r\n\r\n.recommend-container .recommend-user .recommend-list {\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n  -moz-box-align: center;\r\n  -ms-flex-align: center;\r\n  align-items: center;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,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Q0UseUJBQXlCO0VBQ3pCLDJCQUEyQjtFQUMzQixzQkFBc0I7RUFDdEIsc0JBQXNCO0VBQ3RCLG1CQUFtQjtBQUNyQiIsImZpbGUiOiJ0ZXN0LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIkBjaGFyc2V0IFwiVVRGLThcIjtcclxuQGltcG9ydCB1cmwoaHR0cHM6Ly9jZG4uc3RhdGljZmlsZS5vcmcvdHlwby5jc3MvMS4xL3R5cG8uY3NzKTtcclxuQGltcG9ydCB1cmwoaHR0cHM6Ly9jZG4uYm9vdGNzcy5jb20vdHdpdHRlci1ib290c3RyYXAvNC4zLjEvY3NzL2Jvb3RzdHJhcC5taW4uY3NzKTtcclxuLyogaW1wb3J05b+F6aG75pS+5pyA6aG25LiKLOWQpuWImeWwseayoeS6hiEgKi9cclxuQGZvbnQtZmFjZSB7XHJcbiAgZm9udC1mYW1pbHk6IG9jdGljb25zLWFuY2hvcjtcclxuICBzcmM6IHVybChkYXRhOmZvbnQvd29mZjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxkMDlHUmdBQkFBQUFBQVljQUEwQUFBQUFDalFBQVFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQkdSbFJOQUFBQk1BQUFBQndBQUFBY2E4dkdUazlUTHpJQUFBRk1BQUFBUkFBQUFGWkcxVkhWWTIxaGNBQUFBWkFBQUFBK0FBQUJRZ0FQOUFkamRuUWdBQUFCMEFBQUFBUUFBQUFFQUNJQ2lHZGhjM0FBQUFIVUFBQUFDQUFBQUFqLy93QURaMng1WmdBQUFkd0FBQURSQUFBQkVLeWlrYU5vWldGa0FBQUNzQUFBQUMwQUFBQTJBdFhvQTJob1pXRUFBQUxnQUFBQUhBQUFBQ1FIbmdORmFHMTBlQUFBQXZ3QUFBQVFBQUFBRUF3QUFDSnNiMk5oQUFBRERBQUFBQW9BQUFBS0FMSUFWRzFoZUhBQUFBTVlBQUFBSHdBQUFDQUJFQUIyYm1GdFpRQUFBemdBQUFMQkFBQUZ1M0k5eC9Od2IzTjBBQUFGL0FBQUFCMEFBQUF2YW9GdmJ3QUFBQUVBQUFBQXpCZHlZd0FBQUFEUDJJUXZBQUFBQU0vYno3dDRuR05nWkdGZ25NREF5c0RCMU1sMGhvR0JvUjlDTTc1bU1HTGtZR0JnWW1CbFpzQUtBdEpjVXhnY1BzUjhpR0YyK08vQUVNUHN6bkFZS013SWtnTUE1UkVNT1hpY1kyQmdZR2FBWUJrR1JnWVFzQUh5R01GOEZnWUZJTTBDaEVEK2g1ai8veUVrLzNLb1NnWkdOZ1lZazRHUkNVZ3dNYUFDUm9aaER3Q3M3UWdHQUFBQUlnS0lBQUFBQWYvL0FBSjRuSFdNTVFyQ1FCQkYvMHpXckNDSUtVUXNURENMMkVYTW9oWUdTU21vclNjSW5zUkdMMkRPWUplME50cDdCSytnSjFCeEYxc3Radmp6L3Y4RFJnaFF6RWM0a0lnS3dpQXBwY0E5THR6S0xTa2ROaEtGWTNIRjRsSzY5RXhLc2x4N1hhK3ZQUlZTNDNHOTh2RzFEbmtETUlCVWdGTjBNRFhmbFU4dGJhWk9Va1hVSDArVTI3Um9ScE9JeUNLamJNQ1Zland5cHpKSkc0akl3YjQzcmZsNndid2Fub2NySm05WEZZZnNrdVZDNUsvVFB5Y3pOVTdiODRDWGNieGtzMVVuNkg2dExIOXZmMkxSbm44QXg3QTVXUUFBQUhpY1kyQmtZR0FBNHRlTDEreUk1N2Y1eXNETndnQUM1MjlmMGtPbVdSaVlWZ0VwRGdZbUVBOEFVekVLc1FBQUFIaWNZMkJrWUdCMitPL0FFTVBDQUFKQWtwRUJGYkFBQURnS0FlMEVBQUFpQUFBQUFBUUFBQUFFQUFBQUFBQUFLZ0FxQUNvQWlBQUFlSnhqWUdSZ1lHQmhzR0ZnWWdBQkVNa0ZoQXdNL3huMFFBSUFENllCaHdCNG5JMVR5MDdjTUJTOVF3S2xRYXBRVzNWWHlTdkVxRENaR2JHYUhVTGlJUTFGS2dqV014a25NZkxFa2UyQStJSnUrd250cnQvUWJWZjlnRzc1aks1NzdMZzhLMXFRUENmbm5udDhmWDFOUkMvcG1qcmsvenByQys4RDd0Qnk5REhnQlhvV2ZRNDRBdjh0NEJqNFo4Q0x0Qkw5Q25pSmx1UFhBU2YwTG00Q1hxRlg4UTg0ZE9Mbk1CMTdONGM3dEJvMUFTL1FpK2hUd0JINHJ3SEh3TjhEWHFRMzBYWEFTN1FhTHdTYzBHbjhOdUFWV291L2dGbW5qTHJFYUVoOUdtRGRER2dMM0I0SnNyUlBEVTJoVE9pTVN1SlVJZEtRUWF5aUF0aDY5cjZha1NTRnFJSnVBMTlUcnpDSWFZOHNJb3h5ck5JckwvL3B3N0EyaU15Z2tYNXZEaitHK2t1b0xkWDRHbEdLLzhMbmx6Ni9oOU1wbW9POXJhZnJ6N0lMWEVISGFBeDk1czlsc0k3QUhOTUJXRVpIVUxuZkFYd0c5L1pxZHpMSTA4aXV3UmxvWEU4a2ZoWFlBdkUyMysyM0RVM3Q2MjZyYnM4LzhhZHYrOURXa25zSHAzRTE3b0NmK1o0OHJ2RVFOWjc4cGFZTTM4cWZrM3YvdTNsM3UzR1hOMkRtdm12cGYxU3J3azNwQi9WU3NwNTEyYkEvR0c1aTJXSjd3dTQzMHlRNUszbkZHaU9xZ3RtU0I1cEpWU2l6d2FhY21VWnpaaFhMbFpUcThxR0dGWTJZY1NrcWJ0aDZhVzF0Um1sYUNGczIwMTZtNXFuMzZTYkpycW9zRzR1TVY0YVAyUEhCbUIzdGp0bWdOMml6a0dReUxXcHJla2JJbnRKRmluZzMyYTVyS1dDTi9TZFNvZ2E0NUVKeWt5UTdhc1p2SFE4UFRtNmNzbElwd3lleWpiVmx0TmlrYzJIVFI3WUtoOUxCbDlEQURDMFUvakxjQlpES3JNaFVCZlFCdlhSekx0RnRqVTllTkhLaW4weDVJblRxYjhsTnBmS3YxczF4SHpUWFJxZ0t6ZWsvbWI3bkI4UlpUQ0RoR0VYM2tLLzhRNzVBbVVNL2VMa2ZBKzBIaTkwOEt4NGVOc01ndWRnNUdMZFJEN2E4NG5waStZeE5yNWk1S0liVzVpelhhczdjSFhJTUFhdTFPdWVaaGZqK2NPY1AzUDhNTklXTHlZT0J1eEw2RFJ5bEo0Y0FBQUI0bkdOZ1lvQUFMakRKeUlBT1dNQ2lUSXhNTERtWmVka0FCdElCeWdBQUFBPT0pXHJcbiAgICBmb3JtYXQoXCJ3b2ZmXCIpO1xyXG59XHJcblxyXG4qIHtcclxuICBjb2xvcjogcHVycGxlICFpbXBvcnRhbnQ7XHJcblxyXG4gIGZvbnQtc2l6ZTogNTBweDtcclxufVxyXG5cclxuQGtleWZyYW1lcyBBcHAtbG9nby1zcGluIHtcclxuICAwJSB7XHJcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XHJcbiAgfVxyXG5cclxuICB0byB7XHJcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDF0dXJuKTtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlKDF0dXJuKTtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3MjBweCkge1xyXG4gIC5hcnRpY2xlLWNvbnRlbnQgaDEge1xyXG4gICAgZm9udC1zaXplOiAyNHB4O1xyXG4gIH1cclxuXHJcbiAgLmFydGljbGUtY29udGVudCBoMiB7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgfVxyXG5cclxuICAuYXJ0aWNsZS1jb250ZW50IGgzIHtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICB9XHJcblxyXG4gIC5hcnRpY2xlLWNvbnRlbnQgcHJlID4gY29kZSAuY29weS1jb2RlLWJ0biB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gIH1cclxuXHJcbiAgLmFydGljbGUtY29udGVudCBwcmUgPiBjb2RlLmhsanNbbGFuZ106YmVmb3JlIHtcclxuICAgIHRvcDogMnB4O1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNzIwcHgpIHtcclxuICAuYXJ0aWNsZS1jb250ZW50IHByZSA+IGNvZGUuY29weWFibGUuaGxqc1tsYW5nXTpiZWZvcmUge1xyXG4gICAgcmlnaHQ6IDFyZW07XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcclxuICBociNoaWRld2lkdGhsZXNzNTAwIHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG59XHJcblxyXG4ucmVjb21tZW5kLWNvbnRhaW5lciAucmVjb21tZW5kLXVzZXIgLml0ZW0ge1xyXG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XHJcbn1cclxuXHJcbi5yZWNvbW1lbmQtY29udGFpbmVyIC5yZWNvbW1lbmQtdXNlciAudWkuYnV0dG9uIHtcclxuICBwYWRkaW5nOiAzcHggNXB4O1xyXG4gIG1hcmdpbi1yaWdodDogMDtcclxufVxyXG5cclxuLnJlY29tbWVuZC1jb250YWluZXIgLnJlY29tbWVuZC11c2VyIC5oZWFkZXIgLnB1bGwtcmlnaHQge1xyXG4gIGNvbG9yOiAjMDA1OTgwO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLnJlY29tbWVuZC1jb250YWluZXIgLnJlY29tbWVuZC11c2VyIC5oZWFkZXIgLnB1bGwtcmlnaHQuZGlzYWJsZWQge1xyXG4gIG9wYWNpdHk6IDAuNztcclxuICBjdXJzb3I6IGRlZmF1bHQ7XHJcbn1cclxuXHJcbi5yZWNvbW1lbmQtY29udGFpbmVyIC5yZWNvbW1lbmQtdXNlciAuaWNvbi1yZXNldCB7XHJcbiAgbWFyZ2luLXRvcDogLTFweDtcclxuICBoZWlnaHQ6IDE2cHg7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIG1hcmdpbi1yaWdodDogMnB4O1xyXG59XHJcblxyXG4ucmVjb21tZW5kLWNvbnRhaW5lciAucmVjb21tZW5kLXVzZXJfX2NvbnRlbnQge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxuLnJlY29tbWVuZC1jb250YWluZXIgLmRpbW1lci5hY3RpdmUge1xyXG4gIHotaW5kZXg6IDE7XHJcbn1cclxuXHJcbi5yZWNvbW1lbmQtY29udGFpbmVyIC5yZWNvbW1lbmQtbGlzdF9fdXNlciB7XHJcbiAgLXdlYmtpdC1ib3gtZmxleDogMTtcclxuICAtd2Via2l0LWZsZXg6IDE7XHJcbiAgLW1vei1ib3gtZmxleDogMTtcclxuICAtbXMtZmxleDogMTtcclxuICBmbGV4OiAxO1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcclxuICBkaXNwbGF5OiAtbW96LWJveDtcclxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XHJcbiAgLXdlYmtpdC1hbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIC1tb3otYm94LWFsaWduOiBjZW50ZXI7XHJcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIG1hcmdpbi1yaWdodDogNHB4O1xyXG59XHJcblxyXG4ucmVjb21tZW5kLWNvbnRhaW5lciAucmVjb21tZW5kLWxpc3RfX3VzZXIgc3Ryb25nIHtcclxuICBjb2xvcjogIzAwNTk4MDtcclxufVxyXG5cclxuLnJlY29tbWVuZC1jb250YWluZXIgLnJlY29tbWVuZC1saXN0X191c2VyIC5yZWNvbW1lbmQtbGlzdF9fdXNlci1pbmZvIHtcclxuICBtYXJnaW46IDAgNHB4IDAgOHB4O1xyXG4gIG1heC13aWR0aDogMTU1cHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG59XHJcblxyXG4ucmVjb21tZW5kLWNvbnRhaW5lclxyXG4gIC5yZWNvbW1lbmQtbGlzdF9fdXNlclxyXG4gIC5yZWNvbW1lbmQtbGlzdF9fdXNlci1pbmZvLmlzLWZvbGxvdyB7XHJcbiAgbWF4LXdpZHRoOiAxMjVweDtcclxufVxyXG5cclxuLnJlY29tbWVuZC1jb250YWluZXIgLnJlY29tbWVuZC1saXN0X191c2VyIC5yZWNvbW1lbmQtbGlzdF9fdXNlci1pbmZvID4gZGl2IHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbn1cclxuXHJcbi5yZWNvbW1lbmQtY29udGFpbmVyIC5yZWNvbW1lbmQtbGlzdF9fZmxvbGxvdyAuZGlzYWJsZSB7XHJcbiAgb3BhY2l0eTogMC41O1xyXG59XHJcblxyXG4ucmVjb21tZW5kLWNvbnRhaW5lciAucmVjb21tZW5kLXByb2plY3QgLmljb24tcmVjb21tZW5kZWQge1xyXG4gIGNvbG9yOiAjZmU3MzAwO1xyXG59XHJcblxyXG4ucmVjb21tZW5kLWNvbnRhaW5lciAucmVjb21tZW5kLXByb2plY3QgLnByb2plY3QtbGFiZWwge1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG5cclxuLnJlY29tbWVuZC1jb250YWluZXIgLnJlY29tbWVuZC1wcm9qZWN0IC5yZWNvbW1lbmQtbGlzdCB7XHJcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcclxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcclxuICAtd2Via2l0LWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgLW1vei1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcclxuICAtbW96LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcclxuICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG4ucmVjb21tZW5kLWNvbnRhaW5lciAucmVjb21tZW5kLXByb2plY3QgLnJlY29tbWVuZC1saXN0ID4gKiB7XHJcbiAgd29yZC1icmVhazogYnJlYWstYWxsO1xyXG59XHJcblxyXG4ucmVjb21tZW5kLWNvbnRhaW5lclxyXG4gIC5yZWNvbW1lbmQtcHJvamVjdFxyXG4gIC5yZWNvbW1lbmQtbGlzdFxyXG4gIC5yZWNvbW1lbmQtcHJvamVjdF9fZGVzY3JpYmUge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgLXdlYmtpdC1saW5lLWNsYW1wOiAzO1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xyXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XHJcbn1cclxuXHJcbi5yZWNvbW1lbmQtY29udGFpbmVyIC5yZWNvbW1lbmQtcHJvamVjdCAuaXRlbSB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxufVxyXG5cclxuLnJlY29tbWVuZC1jb250YWluZXIgLnJlY29tbWVuZC1wcm9qZWN0IC5yZWNvbW1lbmQtcHJvamVjdF9fbmFtZSB7XHJcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xyXG4gIGNvbG9yOiAjMDA1OTgwO1xyXG59XHJcblxyXG4ucmVjb21tZW5kLWNvbnRhaW5lciAucmVjZW50X3Zpc2l0cyAudWkuaXRlbXMge1xyXG4gIG1hcmdpbi1yaWdodDogMDtcclxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcclxuICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XHJcbiAgZGlzcGxheTogLW1vei1ib3g7XHJcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XHJcbiAgZGlzcGxheTogZmxleDtcclxufVxyXG5cclxuLnJlY29tbWVuZC1jb250YWluZXIgLnJlY2VudF92aXNpdHMgLmF2YXRhci1pdGVtIHtcclxuICBtYXJnaW4tcmlnaHQ6IC0yMnB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5yZWNvbW1lbmQtY29udGFpbmVyIC5yZWNlbnRfdmlzaXRzIC5pdGVtIHtcclxuICB3aWR0aDogMjAlO1xyXG4gIG1pbi13aWR0aDogaW5pdGlhbDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbn1cclxuXHJcbi5yZWNvbW1lbmQtY29udGFpbmVyIC5yZWNlbnRfdmlzaXRzIC5lbXB0eS12aXNpdG9yLml0ZW0ge1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICAtd2Via2l0LWJveC1mbGV4OiAxO1xyXG4gIC13ZWJraXQtZmxleDogMTtcclxuICAtbW96LWJveC1mbGV4OiAxO1xyXG4gIC1tcy1mbGV4OiAxO1xyXG4gIGZsZXg6IDE7XHJcbn1cclxuXHJcbi5kYXNoYm9hcmQtY29udGVudC50d2VsdmUge1xyXG4gIHBhZGRpbmctcmlnaHQ6IDAgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmRhc2hib2FyZC1jb250ZW50IC5naXRlZS1oZWFkYnJlYWQgLmdpdC11c2VyLXNlbGVjdGlvbi1kcm9wZG93biB7XHJcbiAgbWFyZ2luLXJpZ2h0OiAwICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5kYXNoYm9hcmQtY29udGVudCAuZGFzaGJvYXJkLXRlYW0gLmdpdC11c2VyLWNvbnRlbnQtaGVhZGVyIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4uZGFzaGJvYXJkLWNvbnRlbnQgLmdpdGVlLWhlYWRicmVhZCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcclxufVxyXG5cclxuLmRhc2hib2FyZC1jb250ZW50IC5naXQtZGFzaGJvYXJkLXByb2plY3RzLW1lbnUge1xyXG4gIG1hcmdpbi1ib3R0b206IDI0cHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLmRhc2hib2FyZC1jb250ZW50IC5naXQtZGFzaGJvYXJkLXByb2plY3RzLW1lbnUgLmYtYm9sZCB7XHJcbiAgY29sb3I6ICNmZTczMDA7XHJcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNmZTczMDAgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmRhc2hib2FyZC1jb250ZW50IC5naXQtZGFzaGJvYXJkLXByb2plY3RzLW1lbnUgPiBhLml0ZW0ge1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBwYWRkaW5nOiA4cHggMThweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uZGFzaGJvYXJkLWNvbnRlbnRcclxuICAuZ2l0LWRhc2hib2FyZC1wcm9qZWN0cy1tZW51XHJcbiAgI3NlYXJjaC1mb3JtXHJcbiAgLnVpLnNlYXJjaFxyXG4gIC51aS5pbnB1dCB7XHJcbiAgd2lkdGg6IDE1MHB4O1xyXG4gIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG5cclxuLmRhc2hib2FyZC1jb250ZW50XHJcbiAgLmdpdC1kYXNoYm9hcmQtcHJvamVjdHMtbWVudVxyXG4gICNzZWFyY2gtZm9ybVxyXG4gIC51aS5zZWFyY2hcclxuICAudWkuaW5wdXRcclxuICBpbnB1dCB7XHJcbiAgbWFyZ2luLXRvcDogLTZweDtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG59XHJcblxyXG4uZGFzaGJvYXJkLWNvbnRlbnRcclxuICAuZ2l0LWRhc2hib2FyZC1wcm9qZWN0cy1tZW51XHJcbiAgI3NlYXJjaC1mb3JtXHJcbiAgLnVpLnNlYXJjaFxyXG4gIC51aS5pbnB1dFxyXG4gIC5pY29uLXNlYXJjaCB7XHJcbiAgbWFyZ2luLXRvcDogLTRweDtcclxufVxyXG5cclxuLmRhc2hib2FyZC1jb250ZW50ICNldmVudC10aW1lbGluZS1wYW5lbCBoMy5ldmVudC10aW1lbGluZS10aXRsZSB7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIG1hcmdpbi10b3A6IDA7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi5kYXNoYm9hcmQtY29udGVudCAjZXZlbnQtdGltZWxpbmUtcGFuZWwgLmV2ZW50LXRpbWVsaW5lLmNvbnRlbnQge1xyXG4gIHBhZGRpbmc6IDAgMCAxOHB4IDEycHg7XHJcbn1cclxuXHJcbi5kYXNoYm9hcmQtY29udGVudCAjZXZlbnQtdGltZWxpbmUtcGFuZWwgLmV2ZW50LWFjdGlvbmJhciAuZHJvcGRvd24uaWNvbiB7XHJcbiAgbWFyZ2luLWxlZnQ6IDRweDtcclxufVxyXG5cclxuLmRhc2hib2FyZC1jb250ZW50ICNldmVudC10aW1lbGluZS1wYW5lbCAubWVzc2FnZS1jb250YWluZXIgLm1lc3NhZ2Uge1xyXG4gIG1hcmdpbjogMDtcclxuICBtYXJnaW4tYm90dG9tOiAxZW07XHJcbn1cclxuXHJcbi5kYXNoYm9hcmQtY29udGVudCAuaXNzdWVzLWZpbHRlcl9faXRlbSB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgcGFkZGluZzogMCAhaW1wb3J0YW50O1xyXG4gIGNvbG9yOiBpbml0aWFsICFpbXBvcnRhbnQ7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uZGFzaGJvYXJkLWNvbnRlbnQgLmlzc3Vlcy1kcm9wZG93biB7XHJcbiAgbWFyZ2luLXRvcDogLTZweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uZGFzaGJvYXJkLWNvbnRlbnQgLmlzc3Vlcy1kcm9wZG93biAucGwtMC5mLWJvbGQge1xyXG4gIHBhZGRpbmctbGVmdDogMCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uZGFzaGJvYXJkLWNvbnRlbnQgLmRhc2hib2FyZC10ZWFtIC5kYXNoYm9hcmQtdGVhbV9pbmZvIHtcclxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcclxuICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XHJcbiAgZGlzcGxheTogLW1vei1ib3g7XHJcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XHJcbiAgZGlzcGxheTogZmxleDtcclxufVxyXG5cclxuLmRhc2hib2FyZC1jb250ZW50IC5kYXNoYm9hcmQtdGVhbSAudWkuaW1hZ2Uge1xyXG4gIHdpZHRoOiA0MHB4O1xyXG4gIGhlaWdodDogNDBweDtcclxuICBtaW4td2lkdGg6IDQwcHg7XHJcbn1cclxuXHJcbi5kYXNoYm9hcmQtY29udGVudFxyXG4gIC5kYXNoYm9hcmQtdGVhbVxyXG4gIC5kYXNoYm9hcmQtdGVhbV9fY29udGFuaW5lclxyXG4gIC5kYXNoYm9hcmQtdGVhbV9fbmFtZSB7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgd29yZC1icmVhazoga2VlcC1hbGw7XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbi5kYXNoYm9hcmQtY29udGVudCAuZGFzaGJvYXJkLXRlYW0gLmRhc2hib2FyZC10ZWFtX19jb250YW5pbmVyIGEge1xyXG4gIGNvbG9yOiAjMDA1OTgwICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5kYXNoYm9hcmQtY29udGVudFxyXG4gIC5kYXNoYm9hcmQtdGVhbVxyXG4gIC5kYXNoYm9hcmQtdGVhbV9fY29udGFuaW5lclxyXG4gID4gLml0ZW06Zmlyc3QtY2hpbGQge1xyXG4gIHBhZGRpbmctdG9wOiAwICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5kYXNoYm9hcmQtY29udGVudCAuZGFzaGJvYXJkLXRlYW0gLmRhc2hib2FyZC10ZWFtX19jb250YW5pbmVyIC5pdGVtIHtcclxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcclxuICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XHJcbiAgZGlzcGxheTogLW1vei1ib3g7XHJcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XHJcbiAgZGlzcGxheTogZmxleDtcclxufVxyXG5cclxuLmRhc2hib2FyZC1jb250ZW50IC5kYXNoYm9hcmQtdGVhbSAuZGFzaGJvYXJkLXRlYW1fX2NvbnRhbmluZXIgLmNvbnRlbnQge1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94ICFpbXBvcnRhbnQ7XHJcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4ICFpbXBvcnRhbnQ7XHJcbiAgZGlzcGxheTogLW1vei1ib3ggIWltcG9ydGFudDtcclxuICBkaXNwbGF5OiAtbXMtZmxleGJveCAhaW1wb3J0YW50O1xyXG4gIGRpc3BsYXk6IGZsZXggIWltcG9ydGFudDtcclxuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xyXG4gIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xyXG4gIC13ZWJraXQtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAtbW96LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xyXG4gIC1tb3otYm94LWRpcmVjdGlvbjogbm9ybWFsO1xyXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgLXdlYmtpdC1ib3gtcGFjazoganVzdGlmeTtcclxuICAtd2Via2l0LWp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAtbW96LWJveC1wYWNrOiBqdXN0aWZ5O1xyXG4gIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5kYXNoYm9hcmQtY29udGVudCAuZGFzaGJvYXJkLXRlYW0gLmRhc2hib2FyZC10ZWFtX19jb250YW5pbmVyIC5jb250ZW50OjphZnRlciB7XHJcbiAgY29udGVudDogbm9uZTtcclxufVxyXG5cclxuLmRhc2hib2FyZC1jb250ZW50IC5kYXNoYm9hcmQtdGVhbSAuZGFzaGJvYXJkLXRlYW1fX2NvbnRhbmluZXIgLmNvbnRlbnQgaSB7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG59XHJcblxyXG4uZGFzaGJvYXJkLWNvbnRlbnQgLmRhc2hib2FyZC10ZWFtIC5pY29uLWVudGVycHJpc2UtYmFkZ2Uge1xyXG4gIG1hcmdpbi1sZWZ0OiA0cHg7XHJcbn1cclxuXHJcbi5kYXNoYm9hcmQtY29udGVudCAuZGFzaGJvYXJkLXRlYW0gLmRhc2hib2FyZC10ZWFtX19vcGVyYXRlIHtcclxuICBtaW4td2lkdGg6IDc1cHg7XHJcbiAgLXdlYmtpdC1hbGlnbi1zZWxmOiBjZW50ZXI7XHJcbiAgLW1zLWZsZXgtaXRlbS1hbGlnbjogY2VudGVyO1xyXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcclxuICAtd2Via2l0LWJveC1mbGV4OiAxO1xyXG4gIC13ZWJraXQtZmxleDogMTtcclxuICAtbW96LWJveC1mbGV4OiAxO1xyXG4gIC1tcy1mbGV4OiAxO1xyXG4gIGZsZXg6IDE7XHJcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XHJcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xyXG4gIGRpc3BsYXk6IC1tb3otYm94O1xyXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgLXdlYmtpdC1ib3gtcGFjazogZW5kO1xyXG4gIC13ZWJraXQtanVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuICAtbW96LWJveC1wYWNrOiBlbmQ7XHJcbiAgLW1zLWZsZXgtcGFjazogZW5kO1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbn1cclxuXHJcbi5kYXNoYm9hcmQtY29udGVudCAuZGFzaGJvYXJkLXRlYW0gLmRhc2hib2FyZC10ZWFtX19vcGVyYXRlLmhhcy1leGl0IHtcclxuICBtaW4td2lkdGg6IDE1MHB4O1xyXG59XHJcblxyXG4ucmVjb21tZW5kLXByb2plY3QgLmljb24taGVscC1jaXJjbGUge1xyXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcclxufVxyXG5cclxuLmRhc2hib2FyZC1jb250ZW50X19zaG93IHtcclxuICB3aWR0aDogNjA4cHggIWltcG9ydGFudDtcclxuICAtd2Via2l0LWJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4gIC1tb3otYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbn1cclxuXHJcbi51aS5jb250YWluZXIudXNlcl9wYWdlIHtcclxuICB3aWR0aDogMTI0MHB4O1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lciB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lciAuc2Vjb25kYXJ5LW5hdmlnYXRpb24gLmFjdGl2ZSB7XHJcbiAgY29sb3I6ICNmZTczMDAgIWltcG9ydGFudDtcclxufVxyXG5cclxuI3JjLXVzZXJzX19jb250YWluZXIgLmRhc2hib2FyZC1jb250ZW50IHtcclxuICBwYWRkaW5nLXJpZ2h0OiAzMnB4O1xyXG4gIHBhZGRpbmctbGVmdDogMzJweDtcclxuICBwYWRkaW5nLXRvcDogMjRweDtcclxufVxyXG5cclxuI3JjLXVzZXJzX19jb250YWluZXIgLmRhc2hib2FyZC1zaWRlYmFyIHtcclxuICBwYWRkaW5nOiAxNnB4IDAgMCAwO1xyXG4gIHdpZHRoOiAyODBweCAhaW1wb3J0YW50O1xyXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lciAuZGFzaGJvYXJkLXNpZGViYXIgLmRhc2hib2FyZC1ncm91cCAuaXRlbSB7XHJcbiAgbWFyZ2luOiA4cHggMDtcclxufVxyXG5cclxuI3JjLXVzZXJzX19jb250YWluZXIgLmRhc2hib2FyZC1zaWRlYmFyIC5kYXNoYm9hcmQtZ3JvdXA6bGFzdC1jaGlsZCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lciAuZGFzaGJvYXJkLXNpZGViYXIgLnVzZXItZGFzaGJvYXJkLXNpZGViYXIge1xyXG4gIHBhZGRpbmctdG9wOiAwO1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lciAuZGFzaGJvYXJkLXNpZGViYXIgLnVzZXItZGFzaGJvYXJkLXNpZGViYXIgLnVpLmNhcmQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1hcmdpbi10b3A6IDMycHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMDtcclxuICBwYWRkaW5nLWJvdHRvbTogMDtcclxufVxyXG5cclxuI3JjLXVzZXJzX19jb250YWluZXJcclxuICAuZGFzaGJvYXJkLXNpZGViYXJcclxuICAudXNlci1kYXNoYm9hcmQtc2lkZWJhclxyXG4gIC51aS5jYXJkXHJcbiAgLmhlYWRlciB7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lclxyXG4gIC5kYXNoYm9hcmQtc2lkZWJhclxyXG4gIC51c2VyLWRhc2hib2FyZC1zaWRlYmFyXHJcbiAgLmVudGVycHJpc2UtbmFtZVxyXG4gIGg0IHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lclxyXG4gIC5kYXNoYm9hcmQtc2lkZWJhclxyXG4gIC51c2VyLWRhc2hib2FyZC1zaWRlYmFyXHJcbiAgLmVudGVycHJpc2UtbmFtZVxyXG4gIC5kZXNjcmlwdGlvbiB7XHJcbiAgbWFyZ2luLXRvcDogMDtcclxufVxyXG5cclxuI3JjLXVzZXJzX19jb250YWluZXJcclxuICAuZGFzaGJvYXJkLXNpZGViYXJcclxuICAudXNlci1kYXNoYm9hcmQtc2lkZWJhclxyXG4gIC5lbnRlcnByaXNlLW5hbWVcclxuICAuaXRlbS5mbGV4IHtcclxuICBtYXJnaW4tdG9wOiAxNnB4O1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lclxyXG4gIC5kYXNoYm9hcmQtc2lkZWJhclxyXG4gIC51c2VyLWRhc2hib2FyZC1zaWRlYmFyXHJcbiAgLmVudGVycHJpc2UtbmFtZVxyXG4gIC5pdGVtLmZsZXg6Zmlyc3QtY2hpbGQge1xyXG4gIG1hcmdpbi10b3A6IDEycHg7XHJcbn1cclxuXHJcbiNyYy11c2Vyc19fY29udGFpbmVyXHJcbiAgLmRhc2hib2FyZC1zaWRlYmFyXHJcbiAgLnVzZXItZGFzaGJvYXJkLXNpZGViYXJcclxuICAuZW50ZXJwcmlzZS1uYW1lXHJcbiAgLnF1aXRcclxuICBpIHtcclxuICBtYXJnaW4tdG9wOiAwO1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lciAuaGFzLWFjdGl2ZSAuY29udGVudCB7XHJcbiAgcGFkZGluZy1sZWZ0OiAwIDJweCAwIDhweDtcclxufVxyXG5cclxuI3JjLXVzZXJzX19jb250YWluZXIgLm5hdmlnYXRpb24gLmhlYWRlciB7XHJcbiAgcGFkZGluZy1yaWdodDogOHB4O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTNlOWVkO1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcclxuICBkaXNwbGF5OiAtbW96LWJveDtcclxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIC13ZWJraXQtYm94LXBhY2s6IGp1c3RpZnk7XHJcbiAgLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgLW1vei1ib3gtcGFjazoganVzdGlmeTtcclxuICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xyXG4gIC13ZWJraXQtYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAtbW96LWJveC1hbGlnbjogY2VudGVyO1xyXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwYWRkaW5nLWJvdHRvbTogNHB4O1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lciAubmF2aWdhdGlvbiAuaGVhZGVyIC50aXRsZSB7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcclxuICBkaXNwbGF5OiAtbW96LWJveDtcclxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lciAubmF2aWdhdGlvbiAuaGVhZGVyIC5hdmF0YXIuaW1hZ2Uge1xyXG4gIG1hcmdpbi1yaWdodDogMDtcclxufVxyXG5cclxuI3JjLXVzZXJzX19jb250YWluZXIgLm5hdmlnYXRpb24gLmhlYWRlciBzdHJvbmcge1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICAtd2Via2l0LWFsaWduLXNlbGY6IGNlbnRlcjtcclxuICAtbXMtZmxleC1pdGVtLWFsaWduOiBjZW50ZXI7XHJcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xyXG4gIG1heC13aWR0aDogMTIwcHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lciAubmF2aWdhdGlvbiAuaGVhZGVyIHN0cm9uZyBhIHtcclxuICBjb2xvcjogdW5zZXQ7XHJcbn1cclxuXHJcbiNyYy11c2Vyc19fY29udGFpbmVyIC5uYXZpZ2F0aW9uIC5oZWFkZXIgLmFjdGlvbnMge1xyXG4gIG1hcmdpbi10b3A6IDRweDtcclxufVxyXG5cclxuI3JjLXVzZXJzX19jb250YWluZXIgLm5hdmlnYXRpb24gLmhlYWRlciAuYWN0aW9ucyBpIHtcclxuICBjb2xvcjogIzAwNTk4MDtcclxufVxyXG5cclxuI3JjLXVzZXJzX19jb250YWluZXIgLm5hdmlnYXRpb24udXNlciBpIHtcclxuICBjb2xvcjogIzk4OWRhZDtcclxufVxyXG5cclxuI3JjLXVzZXJzX19jb250YWluZXIgLm5hdmlnYXRpb24udXNlciAuY29udGVudCB7XHJcbiAgcGFkZGluZzogMCA4cHg7XHJcbn1cclxuXHJcbiNyYy11c2Vyc19fY29udGFpbmVyIC5uYXZpZ2F0aW9uIC5pdGVtcyA+IGEge1xyXG4gIGNvbG9yOiAjNDA0ODViO1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lciAubmF2aWdhdGlvbiAuaXRlbXMgPiBhOmhvdmVyIHtcclxuICBjb2xvcjogIzA5NWVhYjtcclxufVxyXG5cclxuI3JjLXVzZXJzX19jb250YWluZXIgLm5hdmlnYXRpb24gLml0ZW1zID4gYTphY3RpdmUge1xyXG4gIGNvbG9yOiAjMDY0MTc3O1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lciAubmF2aWdhdGlvbiAuaXRlbXMgPiBhOmhvdmVyIHtcclxuICBjb2xvcjogIzQwNDg1YjtcclxufVxyXG5cclxuI3JjLXVzZXJzX19jb250YWluZXIgLm5hdmlnYXRpb24gLml0ZW06aG92ZXIgLmNvbnRlbnQge1xyXG4gIGJhY2tncm91bmQ6ICNmOGY4Zjg7XHJcbn1cclxuXHJcbiNyYy11c2Vyc19fY29udGFpbmVyIC5uYXZpZ2F0aW9uIC5pdGVtIC5hY3RpdmUge1xyXG4gIGNvbG9yOiAjZmU3MzAwO1xyXG4gIGJhY2tncm91bmQ6ICNmOGY4Zjg7XHJcbn1cclxuXHJcbiNyYy11c2Vyc19fY29udGFpbmVyIC5uYXZpZ2F0aW9uIC5pdGVtIC5hY3RpdmUgLm51bSB7XHJcbiAgY29sb3I6IGluaGVyaXQ7XHJcbn1cclxuXHJcbiNyYy11c2Vyc19fY29udGFpbmVyIC5uYXZpZ2F0aW9uIC5pdGVtOmhvdmVyIC5leGl0IHtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbiNyYy11c2Vyc19fY29udGFpbmVyIC5uYXZpZ2F0aW9uIC5pY29uLWFkZCxcclxuI3JjLXVzZXJzX19jb250YWluZXIgLm5hdmlnYXRpb24gLmljb24tc2VhcmNoIHtcclxuICBjb2xvcjogIzhjOTJhNCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lciAubmF2aWdhdGlvbiAubnVtIHtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBjb2xvcjogIzhjOTJhNDtcclxufVxyXG5cclxuI3JjLXVzZXJzX19jb250YWluZXIgLm5hdmlnYXRpb24gLmdyYXkge1xyXG4gIGNvbG9yOiAjOGM5MmE0O1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lciAubmF2aWdhdGlvbiAuYXZhdGFyLmltYWdlIHtcclxuICB3aWR0aDogMzJweDtcclxuICBoZWlnaHQ6IDMycHg7XHJcbn1cclxuXHJcbiNyYy11c2Vyc19fY29udGFpbmVyIC50d2l0dGVyLXR5cGVhaGVhZCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbiNyYy11c2Vyc19fY29udGFpbmVyIC5ncmF5IHtcclxuICBjb2xvcjogIzhjOTJhNDtcclxufVxyXG5cclxuI3JjLXVzZXJzX19jb250YWluZXIgLnVpLmNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IDEyNDBweDtcclxufVxyXG5cclxuI3JjLXVzZXJzX19jb250YWluZXIgLmNvbnRyaWJ1dGlvbi1ldmVudHMge1xyXG4gIHBhZGRpbmctdG9wOiAzMnB4O1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lciAjZ2l0LWZvb3Rlci1tYWluIHtcclxuICBtaW4td2lkdGg6IDEyNDBweDtcclxufVxyXG5cclxuI3JjLXVzZXJzX19jb250YWluZXIgLmdpdGVlLWhlYWRicmVhZCAuZ2l0ZWUtZGl2aWRlciB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIG9wYWNpdHk6IDAuNTtcclxuICBtYXJnaW46IDBlbSAwLjJyZW0gMGVtO1xyXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7XHJcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lciAuZ2l0LXVzZXItY29udGVudCAuZ2l0LXVzZXItY29udGVudC1oZWFkZXIge1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcclxuICBkaXNwbGF5OiAtbW96LWJveDtcclxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIC13ZWJraXQtYm94LXBhY2s6IGp1c3RpZnk7XHJcbiAgLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgLW1vei1ib3gtcGFjazoganVzdGlmeTtcclxuICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lciAudWkuYnV0dG9uLmpzLXByb2plY3Qtd2F0Y2gge1xyXG4gIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgxNDAsIDE0NiwgMTY0LCAwLjUpO1xyXG4gIHBhZGRpbmc6IDJweCA1cHg7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG4jcmMtdXNlcnNfX2NvbnRhaW5lciAucmVjb21tZW5kLWNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IDI0OHB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi51c2Vyc19fcGVyc29uYWwtYXZhdGFyIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgbWFyZ2luOiAwIGF1dG8gMTBweDtcclxuICB3aWR0aDogMTYwcHg7XHJcbiAgaGVpZ2h0OiAxNjBweDtcclxufVxyXG5cclxuLnVzZXJzX19wZXJzb25hbC1hdmF0YXIgLm92ZXItYXZhdGFyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbGluZS1oZWlnaHQ6IDIwMHB4O1xyXG4gIGJvcmRlcjogNHB4IHNvbGlkICNlZWU7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC41KTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuLnVzZXJzX19wZXJzb25hbC1hdmF0YXIgLm92ZXItYXZhdGFyOmhvdmVyIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxuLnVzZXJzX19wZXJzb25hbC1hdmF0YXIgLnVpLmltYWdlLmF2YXRhciB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBib3JkZXI6IDRweCBzb2xpZCAjZWVlO1xyXG59XHJcblxyXG4udXNlcnNfX3BlcnNvbmFsLWF2YXRhciAudWkuaW1hZ2UuYXZhdGFyOmhvdmVyICsgLm92ZXItYXZhdGFyIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxuLnVzZXJzX19wZXJzb25hbC1hdmF0YXIgLmF2YXRhci1nZW5kZXIge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBib3R0b206IDJweDtcclxuICByaWdodDogMjdweDtcclxuICB3aWR0aDogMzJweDtcclxuICBoZWlnaHQ6IDMycHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIGZvbnQtc2l6ZTogMjFweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XHJcbiAgYm9yZGVyOiAycHggc29saWQgI2ZmZjtcclxufVxyXG5cclxuLnVzZXJzX19wZXJzb25hbC1hdmF0YXIgLmF2YXRhci1nZW5kZXIubWFycyB7XHJcbiAgYmFja2dyb3VuZDogIzNlYjRmZjtcclxufVxyXG5cclxuLnVzZXJzX19wZXJzb25hbC1hdmF0YXIgLmF2YXRhci1nZW5kZXIudmVudXMge1xyXG4gIGJhY2tncm91bmQ6ICNmZjViYzY7XHJcbn1cclxuXHJcbi51c2Vyc19fcGVyc29uYWwtbmFtZSB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4udXNlcnNfX3BlcnNvbmFsLW5hbWUgaDIsXHJcbi51c2Vyc19fcGVyc29uYWwtbmFtZSBwIHtcclxuICBtYXJnaW46IDhweCAwIDA7XHJcbiAgd29yZC1icmVhazogYnJlYWstYWxsO1xyXG59XHJcblxyXG4udXNlcnNfX3BlcnNvbmFsLW5hbWUgaDIgc3BhbixcclxuLnVzZXJzX19wZXJzb25hbC1uYW1lIHAgc3BhbiB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcclxuICAtd2Via2l0LWxpbmUtY2xhbXA6IDM7XHJcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcclxufVxyXG5cclxuLnVzZXJzX19wZXJzb25hbC1uYW1lIC5yZW1hcmstbmFtZSB7XHJcbiAgY29sb3I6ICM4YzkyYTQ7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgZGlzcGxheTogaW5saW5lO1xyXG59XHJcblxyXG4udXNlcnNfX3BlcnNvbmFsLW5hbWUgLnVpLnNtYWxsLmxhYmVsIHtcclxuICBtYXJnaW4tYm90dG9tOiAwLjVlbTtcclxuICBwYWRkaW5nOiAwLjRlbSAwLjdlbTtcclxuICBmb250LXdlaWdodDogbm9ybWFsO1xyXG59XHJcblxyXG4udXNlcnNfX3BlcnNvbmFsLXNldHRpbmcge1xyXG4gIG1hcmdpbjogMTVweCBhdXRvO1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcclxuICBkaXNwbGF5OiAtbW96LWJveDtcclxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIC13ZWJraXQtanVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgLW1zLWZsZXgtcGFjazogZGlzdHJpYnV0ZTtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xyXG4gIC13ZWJraXQtYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAtbW96LWJveC1hbGlnbjogY2VudGVyO1xyXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLnVzZXJzX19wZXJzb25hbC1zZXR0aW5nIC51aS5idXR0b24ge1xyXG4gIG1hcmdpbjogMDtcclxuICB3aWR0aDogNDUlO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG5cclxuLnVzZXJzX19wZXJzb25hbC1zZXR0aW5nIC51aS5idXR0b24uYmFzaWMge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbn1cclxuXHJcbi51c2Vyc19fcGVyc29uYWwtc29jaWFscyAudWkuZ3JpZCB7XHJcbiAgcGFkZGluZzogMCAxcmVtO1xyXG59XHJcblxyXG4udXNlcnNfX3BlcnNvbmFsLXNvY2lhbHMgLnVpLmdyaWQgLmNvbHVtbiB7XHJcbiAgcGFkZGluZzogMXJlbSAwO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLnVzZXJzX19wZXJzb25hbC1zb2NpYWxzIC5zb2NpYWwtY291bnQge1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLnVzZXJzX19wZXJzb25hbC1zb2NpYWxzIC5zb2NpYWwtbmFtZSB7XHJcbiAgcGFkZGluZy10b3A6IDVweDtcclxuICBjb2xvcjogIzQwNDg1YjtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbi51c2Vyc19fcGVyc29uYWwtaW5mbyB7XHJcbiAgcGFkZGluZzogMTVweCAwO1xyXG4gIGNvbG9yOiAjOGM5MmE0O1xyXG59XHJcblxyXG4udXNlcnNfX3BlcnNvbmFsLWluZm8gLmluZm8taXRlbSB7XHJcbiAgcGFkZGluZzogM3B4IDA7XHJcbiAgbGluZS1oZWlnaHQ6IDEuNTtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbn1cclxuXHJcbi51c2Vyc19fcGVyc29uYWwtaW5mbyAuaW5mby1pdGVtIGkuaWNvbmZvbnQge1xyXG4gIHdpZHRoOiAyMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLnVzZXJzX19wZXJzb25hbC1pbmZvIC5pbmZvLWl0ZW0gaS5pY29uZm9udC5pY29uLXRpbWUge1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxufVxyXG5cclxuLnVzZXJzX19wZXJzb25hbC1hY2hpZXZlbWVudCB7XHJcbiAgcGFkZGluZzogMTBweCAwO1xyXG59XHJcblxyXG4udXNlcnNfX3BlcnNvbmFsLWFjaGlldmVtZW50IGgzIHtcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZy1ib3R0b206IDRweDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RjZTNlODtcclxufVxyXG5cclxuLnVzZXJzX19wZXJzb25hbC1hY2hpZXZlbWVudCAudWkubGlzdCAuaXRlbSAuY29udGVudCB7XHJcbiAgbGluZS1oZWlnaHQ6IDEuODtcclxufVxyXG5cclxuLnVzZXJzX19wZXJzb25hbC1hY2hpZXZlbWVudCAudWkubGlzdCAuaXRlbSAuY29udGVudCAuZGVzY3JpcHRpb24ge1xyXG4gIGNvbG9yOiAjNzY4N2FiO1xyXG59XHJcblxyXG4udXNlcnNfX3BlcnNvbmFsLWdyb3VwcyB7XHJcbiAgcGFkZGluZzogMTBweCAwO1xyXG59XHJcblxyXG4udXNlcnNfX3BlcnNvbmFsLWdyb3VwcyBoMyB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIHBhZGRpbmctYm90dG9tOiA0cHg7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkY2UzZTg7XHJcbn1cclxuXHJcbi51c2Vyc19fcGVyc29uYWwtZ3JvdXBzIC51aS5saXN0IHtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi51c2Vyc19fcGVyc29uYWwtZ3JvdXBzIC51aS5saXN0Om5vdCgubW9yZS1ncm91cHMpIHtcclxuICBtYXJnaW4tdG9wOiAxZW07XHJcbn1cclxuXHJcbi51c2Vyc19fcGVyc29uYWwtZ3JvdXBzIC51aS5saXN0IC5pdGVtIHtcclxuICBwYWRkaW5nOiAwLjNlbSAwO1xyXG59XHJcblxyXG4udXNlcnNfX3BlcnNvbmFsLWdyb3VwcyAudWkubGlzdCAuaXRlbSBhIHtcclxuICBjb2xvcjogIzAwNTk4MCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4udXNlcnNfX3BlcnNvbmFsLWdyb3VwcyAudWkubGlzdCAuaXRlbSBhOmhvdmVyIHtcclxuICBjb2xvcjogIzRjOGFhNiAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4udXNlcnNfX3BlcnNvbmFsLWdyb3VwcyAudWkubGlzdCAuaXRlbSBhOmFjdGl2ZSB7XHJcbiAgY29sb3I6ICMwMDNlNTkgIWltcG9ydGFudDtcclxufVxyXG5cclxuLnVzZXJzX19wZXJzb25hbC1ncm91cHMgLnVpLmxpc3QgLml0ZW0gLmNvbnRlbnQge1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG59XHJcblxyXG4udXNlcnNfX3BlcnNvbmFsLWdyb3VwcyAudWkubGlzdCAuaXRlbSAucmlnaHQuZmxvYXRlZC5jb250ZW50IHtcclxuICBjb2xvcjogIzc2ODdhYjtcclxufVxyXG5cclxuLnVzZXJzX19wZXJzb25hbC1ncm91cHMgLnVpLmxpc3QgLml0ZW0gLnJpZ2h0LmZsb2F0ZWQuY29udGVudCAubXItMSB7XHJcbiAgd2lkdGg6IDI0cHg7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG59XHJcblxyXG4udXNlcnNfX3BlcnNvbmFsLWdyb3VwcyAubG9hZC1tb3JlLWdyb3VwcyB7XHJcbiAgbWFyZ2luLXRvcDogOHB4O1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIGNvbG9yOiAjNzY4N2FiO1xyXG59XHJcblxyXG4udXNlcnNfX3BlcnNvbmFsLWdyb3VwcyAubG9hZC1tb3JlLWdyb3Vwczpob3ZlciB7XHJcbiAgY29sb3I6ICM5ZmFiYzQ7XHJcbn1cclxuXHJcbi51c2Vyc19fcGVyc29uYWwtZ3JvdXBzIC5sb2FkLW1vcmUtZ3JvdXBzOmFjdGl2ZSB7XHJcbiAgY29sb3I6ICM1MjVlNzc7XHJcbn1cclxuXHJcbi51c2Vyc19fbmF2YmFyIC51aS5zZWNvbmRhcnkucG9pbnRpbmcubWVudSB7XHJcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNkZWRlZGY7XHJcbn1cclxuXHJcbi51c2Vyc19fbmF2YmFyIC51aS5zZWNvbmRhcnkucG9pbnRpbmcubWVudSA+IC5pdGVtIHtcclxuICBtYXJnaW4tYm90dG9tOiAtMnB4O1xyXG4gIHBhZGRpbmc6IDEwcHggMzBweDtcclxuICBtaW4td2lkdGg6IDEwMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBib3JkZXItd2lkdGg6IDJweDtcclxufVxyXG5cclxuLnVzZXJzX19uYXZiYXIgLnVpLnNlY29uZGFyeS5wb2ludGluZy5tZW51ID4gLml0ZW0uYWN0aXZlIHtcclxuICBjb2xvcjogI2ZlNzMwMDtcclxuICBib3JkZXItY29sb3I6ICNmZTczMDA7XHJcbn1cclxuXHJcbi51c2Vyc19fbmF2YmFyIC51aS5zZWNvbmRhcnkucG9pbnRpbmcubWVudSA+IC5pdGVtLmFjdGl2ZSAudWkubGFiZWwge1xyXG4gIGNvbG9yOiAjZmU3MzAwO1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU0LCAxMTUsIDAsIDAuMik7XHJcbn1cclxuXHJcbi51c2Vyc19faGVhZGVyIHtcclxuICBtYXJnaW4tdG9wOiAyZW07XHJcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XHJcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xyXG4gIGRpc3BsYXk6IC1tb3otYm94O1xyXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgLXdlYmtpdC1ib3gtcGFjazoganVzdGlmeTtcclxuICAtd2Via2l0LWp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAtbW96LWJveC1wYWNrOiBqdXN0aWZ5O1xyXG4gIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XHJcbiAgLXdlYmtpdC1hbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIC1tb3otYm94LWFsaWduOiBjZW50ZXI7XHJcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4udXNlcnNfX2hlYWRlciBoMyB7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG4udXNlcnNfX2hlYWRlciAudWkuZHJvcGRvd24ge1xyXG4gIHBhZGRpbmc6IDAuNWVtIDAuOTI4NTdlbTtcclxufVxyXG5cclxuLnVzZXJzX19wb3B1bGFyLXByb2plY3RzIC51aS5jYXJkcyB7XHJcbiAgbWFyZ2luOiAwIC0wLjVlbSAtMC41ZW07XHJcbn1cclxuXHJcbi51c2Vyc19fcG9wdWxhci1wcm9qZWN0cyAudWkuY2FyZHMgLnVpLmNhcmQge1xyXG4gIG1hcmdpbjogMC41ZW0gIWltcG9ydGFudDtcclxuICBwYWRkaW5nOiAxZW07XHJcbiAgd2lkdGg6IGNhbGMoNTAlIC0gMWVtKSAhaW1wb3J0YW50O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2UzZTg7XHJcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBub25lO1xyXG4gIGJveC1zaGFkb3c6IG5vbmU7XHJcbn1cclxuXHJcbi51c2Vyc19fcG9wdWxhci1wcm9qZWN0cyAudWkuY2FyZHMgLnVpLmNhcmQgLmNvbnRlbnQge1xyXG4gIHBhZGRpbmc6IDA7XHJcbn1cclxuXHJcbi51c2Vyc19fcG9wdWxhci1wcm9qZWN0cyAudWkuY2FyZHMgLnVpLmNhcmQgLmNvbnRlbnQgLnBvcHVsYXItcHJvamVjdC10aXRsZSB7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcclxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG59XHJcblxyXG4udXNlcnNfX3BvcHVsYXItcHJvamVjdHMgLnVpLmNhcmRzIC51aS5jYXJkIC5jb250ZW50IC5naXQtcHJvamVjdC1ndnAtYmFkZ2Uge1xyXG4gIG1hcmdpbi10b3A6IC0zcHg7XHJcbn1cclxuXHJcbi51c2Vyc19fcG9wdWxhci1wcm9qZWN0cyAudWkuY2FyZHMgLnVpLmNhcmQgLmNvbnRlbnQgaS5pY29uZm9udCB7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcblxyXG4udXNlcnNfX3BvcHVsYXItcHJvamVjdHNcclxuICAudWkuY2FyZHNcclxuICAudWkuY2FyZFxyXG4gIC5jb250ZW50XHJcbiAgaS5pY29uZm9udC5pY29uLW1vZGUtdGFibGUge1xyXG4gIG1hcmdpbi10b3A6IDFweDtcclxuICBjb2xvcjogI2QwZDBkMDtcclxuICBjdXJzb3I6IG1vdmU7XHJcbn1cclxuXHJcbi51c2Vyc19fcG9wdWxhci1wcm9qZWN0c1xyXG4gIC51aS5jYXJkc1xyXG4gIC51aS5jYXJkXHJcbiAgLmNvbnRlbnRcclxuICBpLmljb25mb250Lmljb24tcmVjb21tZW5kZWQge1xyXG4gIGNvbG9yOiAjZmU3MzAwO1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbn1cclxuXHJcbi51c2Vyc19fcG9wdWxhci1wcm9qZWN0cyAudWkuY2FyZHMgLnVpLmNhcmQgLmNvbnRlbnQgaS5pY29uZm9udC5pY29uLXdhdGNoIHtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xyXG59XHJcblxyXG4udXNlcnNfX3BvcHVsYXItcHJvamVjdHMgLnVpLmNhcmRzIC51aS5jYXJkIC5jb250ZW50IC5kZXNjcmlwdGlvbiB7XHJcbiAgY29sb3I6ICM4YzkyYTQ7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcclxuICAtd2Via2l0LWxpbmUtY2xhbXA6IDM7XHJcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcclxufVxyXG5cclxuLnVzZXJzX19wb3B1bGFyLXByb2plY3RzIC51aS5jYXJkcyAudWkuY2FyZCAuZXh0cmEuY29udGVudCB7XHJcbiAgcGFkZGluZy10b3A6IDFlbTtcclxuICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDtcclxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcclxuICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XHJcbiAgZGlzcGxheTogLW1vei1ib3g7XHJcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICAtd2Via2l0LWJveC1wYWNrOiBqdXN0aWZ5O1xyXG4gIC13ZWJraXQtanVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIC1tb3otYm94LXBhY2s6IGp1c3RpZnk7XHJcbiAgLW1zLWZsZXgtcGFjazoganVzdGlmeTtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcclxuICAtd2Via2l0LWFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgLW1vei1ib3gtYWxpZ246IGNlbnRlcjtcclxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi51c2Vyc19fcG9wdWxhci1wcm9qZWN0cyAudWkuY2FyZHMgLnVpLmNhcmQgLmV4dHJhLmNvbnRlbnQ6YWZ0ZXIge1xyXG4gIGNvbnRlbnQ6IG5vbmU7XHJcbn1cclxuXHJcbi51c2Vyc19fcG9wdWxhci1wcm9qZWN0c1xyXG4gIC51aS5jYXJkc1xyXG4gIC51aS5jYXJkXHJcbiAgLmV4dHJhLmNvbnRlbnRcclxuICAubGVmdFxyXG4gIC51aS5zbWFsbC5sYWJlbCB7XHJcbiAgcGFkZGluZzogMC40ZW0gMC43ZW07XHJcbn1cclxuXHJcbi51c2Vyc19fcG9wdWxhci1wcm9qZWN0cyAudWkuY2FyZHMgLnVpLmNhcmQgLmV4dHJhLmNvbnRlbnQgLnJpZ2h0IGEge1xyXG4gIHBhZGRpbmc6IDAgMC4yZW07XHJcbiAgY29sb3I6ICM4YzkyYTQ7XHJcbn1cclxuXHJcbi51c2Vyc19fcG9wdWxhci1wcm9qZWN0cyAudWkuY2FyZHMgLnVpLmNhcmQgLmV4dHJhLmNvbnRlbnQgLnJpZ2h0IGE6aG92ZXIge1xyXG4gIGNvbG9yOiAjYWViMmJmO1xyXG59XHJcblxyXG4udXNlcnNfX3BvcHVsYXItcHJvamVjdHMgLnVpLmNhcmRzIC51aS5jYXJkIC5leHRyYS5jb250ZW50IC5yaWdodCBhOmFjdGl2ZSB7XHJcbiAgY29sb3I6ICM2MjY2NzI7XHJcbn1cclxuXHJcbi51c2Vyc19fcG9wdWxhci1wcm9qZWN0cyAudWkuY2FyZHMgLnVpLmNhcmQuc29ydGFibGUtY2hvc2VuIHtcclxuICBiYWNrZ3JvdW5kOiAjZmVkICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi51c2Vyc19fY29udHJpYnV0aW9uLXBhbmVsIC5sZXNzIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVlO1xyXG59XHJcblxyXG4udXNlcnNfX2NvbnRyaWJ1dGlvbi1wYW5lbCAubGl0dGxlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDZlNjg1O1xyXG59XHJcblxyXG4udXNlcnNfX2NvbnRyaWJ1dGlvbi1wYW5lbCAuc29tZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzhjYzY2NTtcclxufVxyXG5cclxuLnVzZXJzX19jb250cmlidXRpb24tcGFuZWwgLm1hbnkge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM0NGEzNDA7XHJcbn1cclxuXHJcbi51c2Vyc19fY29udHJpYnV0aW9uLXBhbmVsIC5tdWNoIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWU2ODIzO1xyXG59XHJcblxyXG4udXNlcnNfX2NvbnRyaWJ1dGlvbi1wYW5lbCAuY29udHJpYnV0aW9uLWJveCB7XHJcbiAgcGFkZGluZy10b3A6IDIwcHg7XHJcbiAgaGVpZ2h0OiAxMjVweDtcclxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcclxuICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XHJcbiAgZGlzcGxheTogLW1vei1ib3g7XHJcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XHJcbiAgZGlzcGxheTogZmxleDtcclxufVxyXG5cclxuLnVzZXJzX19jb250cmlidXRpb24tcGFuZWwgLmNvbnRyaWJ1dGlvbi1ib3ggLmxlZnQtc2lkZSB7XHJcbiAgd2lkdGg6IDMycHg7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcclxuICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XHJcbiAgZGlzcGxheTogLW1vei1ib3g7XHJcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xyXG4gIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xyXG4gIC13ZWJraXQtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAtbW96LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xyXG4gIC1tb3otYm94LWRpcmVjdGlvbjogbm9ybWFsO1xyXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgLXdlYmtpdC1ib3gtcGFjazoganVzdGlmeTtcclxuICAtd2Via2l0LWp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAtbW96LWJveC1wYWNrOiBqdXN0aWZ5O1xyXG4gIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcblxyXG4udXNlcnNfX2NvbnRyaWJ1dGlvbi1wYW5lbCAuY29udHJpYnV0aW9uLWJveCAucmlnaHQtc2lkZSB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcclxuICBkaXNwbGF5OiAtbW96LWJveDtcclxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XHJcbiAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XHJcbiAgLXdlYmtpdC1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIC1tb3otYm94LW9yaWVudDogdmVydGljYWw7XHJcbiAgLW1vei1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XHJcbiAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAtd2Via2l0LWZsZXgtd3JhcDogd3JhcDtcclxuICAtbXMtZmxleC13cmFwOiB3cmFwO1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxufVxyXG5cclxuLnVzZXJzX19jb250cmlidXRpb24tcGFuZWwgLmNvbnRyaWJ1dGlvbi1ib3ggLnJpZ2h0LXNpZGUgLmJveCB7XHJcbiAgd2lkdGg6IDEuODg2NzklO1xyXG4gIGhlaWdodDogMTVweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZmZmO1xyXG59XHJcblxyXG4udXNlcnNfX2NvbnRyaWJ1dGlvbi1wYW5lbFxyXG4gIC5jb250cmlidXRpb24tYm94XHJcbiAgLnJpZ2h0LXNpZGVcclxuICAuYm94W2RhdGEtY29udGVudF06aG92ZXIge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XHJcbn1cclxuXHJcbi51c2Vyc19fY29udHJpYnV0aW9uLXBhbmVsIC5jb250cmlidXRpb24tYm94IC5yaWdodC1zaWRlIC5tb250aCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMDtcclxuICBtYXJnaW4tdG9wOiAtMTVweDtcclxuICBtYXJnaW4tbGVmdDogLTE1cHg7XHJcbiAgbWluLXdpZHRoOiA0NXB4O1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi51c2Vyc19fY29udHJpYnV0aW9uLXBhbmVsIC5jb250cmlidXRpb24tdGlwIHtcclxuICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xyXG59XHJcblxyXG4udXNlcnNfX2NvbnRyaWJ1dGlvbi1wYW5lbCAuY29udHJpYnV0aW9uLXRpcCAud29yZCB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG59XHJcblxyXG4udXNlcnNfX2NvbnRyaWJ1dGlvbi1wYW5lbCAuY29udHJpYnV0aW9uLXRpcCAudWkuaG9yaXpvbnRhbC5saXN0ID4gLml0ZW0ge1xyXG4gIG1hcmdpbjogMCAxcHg7XHJcbiAgd2lkdGg6IDEycHg7XHJcbiAgaGVpZ2h0OiAxMnB4O1xyXG4gIHZlcnRpY2FsLWFsaWduOiB0ZXh0LWJvdHRvbTtcclxufVxyXG5cclxuLnVzZXJzX19jb250cmlidXRpb24tcGFuZWwgLmNvbnRyaWJ1dGlvbi1kZXNjcmliIHAge1xyXG4gIG1hcmdpbjogMDtcclxuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG59XHJcblxyXG4udXNlcnNfX2NvbnRyaWJ1dGlvbi1wYW5lbCAuY29udHJpYnV0aW9uLWRlc2NyaWIgcC50ZXh0LW11dGVkIHtcclxuICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4udXNlcnNfX2N1c3RvbWl6ZS1tb2RhbCAudWkuZm9ybSB7XHJcbiAgbWluLWhlaWdodDogMTgwcHg7XHJcbn1cclxuXHJcbi51c2Vyc19fY3VzdG9taXplLW1vZGFsIC5ncm91cGVkLmZpZWxkcyB7XHJcbiAgbWFyZ2luOiAwLjJlbSAwZW0gMWVtICFpbXBvcnRhbnQ7XHJcbiAgcGFkZGluZzogMTBweCAwO1xyXG4gIG1heC1oZWlnaHQ6IDIwZW07XHJcbiAgb3ZlcmZsb3cteTogYXV0bztcclxufVxyXG5cclxuLnVzZXJzX19jdXN0b21pemUtbW9kYWwgLmdyb3VwZWQuZmllbGRzIC5maWVsZCB7XHJcbiAgcGFkZGluZzogNXB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi51c2Vyc19fY3VzdG9taXplLW1vZGFsIC5ncm91cGVkLmZpZWxkcyAuZmllbGQgLnVpLmNoZWNrYm94IHtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLnVzZXJzX19jdXN0b21pemUtbW9kYWwgLmdyb3VwZWQuZmllbGRzIC5maWVsZCBsYWJlbCB7XHJcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XHJcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xyXG4gIGRpc3BsYXk6IC1tb3otYm94O1xyXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgLXdlYmtpdC1ib3gtcGFjazoganVzdGlmeTtcclxuICAtd2Via2l0LWp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAtbW96LWJveC1wYWNrOiBqdXN0aWZ5O1xyXG4gIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XHJcbiAgLXdlYmtpdC1hbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIC1tb3otYm94LWFsaWduOiBjZW50ZXI7XHJcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4udXNlcnNfX2N1c3RvbWl6ZS1tb2RhbCAuZ3JvdXBlZC5maWVsZHMgLmZpZWxkIGxhYmVsIHNwYW4ge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxufVxyXG5cclxuLnVzZXJzX19jdXN0b21pemUtbW9kYWwgLmdyb3VwZWQuZmllbGRzIC5maWVsZCBsYWJlbCAuc3Rhci1jb3VudCB7XHJcbiAgbWluLXdpZHRoOiA0ZW07XHJcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbn1cclxuXHJcbi51c2Vyc19fY3VzdG9taXplLW1vZGFsIC5ncm91cGVkLmZpZWxkcyAuZmllbGQuYWN0aXZlIHtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NCwgMTE1LCAwLCAwLjIpO1xyXG59XHJcblxyXG4udXNlcnNfX3JlcG9ydC1tb2RhbCAuYXBwZWFsLXN1Y2Nlc3MtdGlwIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi51c2Vyc19fcmVwb3J0LW1vZGFsIC5hcHBlYWwtc3VjY2Vzcy10aXAgaS5pY29uZm9udCB7XHJcbiAgZm9udC1zaXplOiA3cmVtO1xyXG4gIGNvbG9yOiAjNGJhZjUwO1xyXG59XHJcblxyXG4udXNlcnNfX3JlcG9ydC1tb2RhbCAudWkuaXRlbXMge1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbiAgYmFja2dyb3VuZDogI2Y0ZjVmNjtcclxufVxyXG5cclxuLnVzZXJzX19yZXBvcnQtbW9kYWwgLnVpLml0ZW1zIC51aS5pbWFnZSB7XHJcbiAgd2lkdGg6IDUwcHg7XHJcbn1cclxuXHJcbi51c2Vyc19fcmVwb3J0LW1vZGFsIC51aS5pdGVtcyAuY29udGVudCAuaGVhZGVyIHtcclxuICBjb2xvcjogIzQwNDg1YjtcclxufVxyXG5cclxuLnVzZXJzX19yZXBvcnQtbW9kYWwgLnVpLml0ZW1zIC5jb250ZW50IC5kZXNjcmlwdGlvbiB7XHJcbiAgY29sb3I6ICM4YzkyYTQ7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG59XHJcblxyXG4udXNlcnNfX3JlcG9ydC1tb2RhbCAudWkuc2VnbWVudC5sb2FkZXItYmxvY2sge1xyXG4gIGJvcmRlcjogMDtcclxuICBtaW4taGVpZ2h0OiAxMDBweDtcclxufVxyXG5cclxuLnVzZXJzX19yZXBvcnQtbW9kYWwgLmFjdGlvbi10eXBlcyAuaXRlbSB7XHJcbiAgbWFyZ2luOiA1cHg7XHJcbiAgcGFkZGluZzogMTBweCAyMHB4O1xyXG4gIG1pbi13aWR0aDogMTIwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBiYWNrZ3JvdW5kOiAjZjJmMmYyO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi51c2Vyc19fcmVwb3J0LW1vZGFsIC5hY3Rpb24tdHlwZXMgLml0ZW06aG92ZXIsXHJcbi51c2Vyc19fcmVwb3J0LW1vZGFsIC5hY3Rpb24tdHlwZXMgLml0ZW06YWN0aXZlLFxyXG4udXNlcnNfX3JlcG9ydC1tb2RhbCAuYWN0aW9uLXR5cGVzIC5pdGVtLmFjdGl2ZSB7XHJcbiAgY29sb3I6ICNmZTczMDA7XHJcbn1cclxuXHJcbi51c2Vyc19fcmVwb3J0LW1vZGFsIC5leHRyYS1jb250ZW50IHRleHRhcmVhIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDVlbTtcclxufVxyXG5cclxuI3VzZXItc2hvdy1kZXRhaWwgLmdpdC1kYXNoYm9hcmQtcHJvamVjdHMtbWVudSA+IC5mLWJvbGQge1xyXG4gIGNvbG9yOiAjZmU3MzAwO1xyXG59XHJcblxyXG4jdXNlci1zaG93LWRldGFpbCAuZ2l0LWNvZGVzLXRhZ3Mge1xyXG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XHJcbn1cclxuXHJcbiN1c2VyLXNob3ctZGV0YWlsIC5naXQtdXNlci10d2wtY29sID4gLmdpdGVlLWhlYWRicmVhZCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxuICBtYXJnaW4tdG9wOiAxMHB4O1xyXG59XHJcblxyXG4jdXNlci1zaG93LWRldGFpbCAuZ2l0LXByb2ZpbGUtY29udGVudC1oZWFkZXIgLmdpdC1kYXNoYm9hcmQtcHJvamVjdHMtbWVudSB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTRweDtcclxufVxyXG5cclxuI3VzZXItc2hvdy1kZXRhaWwgLmdpdC1wcm9maWxlLWNvbnRlbnQtaGVhZGVyIC5naXQtZGFzaGJvYXJkLXByb2plY3RzLW1lbnUgPiBhIHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbi5yZWNvbW1lbmQtY29udGFpbmVyIHtcclxuICBwYWRkaW5nOiAyNHB4IDAgMCAwICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5yZWNvbW1lbmQtY29udGFpbmVyIC5yZWNvbW1lbmQtbm90aWNlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZWVkICFpbXBvcnRhbnQ7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcclxufVxyXG5cclxuLnJlY29tbWVuZC1jb250YWluZXIgLnJlY29tbWVuZC1ub3RpY2UgPiAuaGVhZGVyIHtcclxuICBtYXJnaW4tcmlnaHQ6IDhweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ucmVjb21tZW5kLWNvbnRhaW5lciAudWkubWVzc2FnZSB7XHJcbiAgY29sb3I6ICM0MDQ4NWI7XHJcbiAgcGFkZGluZzogMTJweCAxNnB4O1xyXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDBweCAwcHggMXB4ICNlMmQ4YmYgaW5zZXQsXHJcbiAgICAwcHggMHB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwKTtcclxuICBib3gtc2hhZG93OiAwcHggMHB4IDBweCAxcHggI2UyZDhiZiBpbnNldCwgMHB4IDBweCAwcHggMHB4IHJnYmEoMCwgMCwgMCwgMCk7XHJcbn1cclxuXHJcbi5yZWNvbW1lbmQtY29udGFpbmVyIC51aS5tZXNzYWdlIGkge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgZm9udC1zaXplOiAwLjhlbTtcclxuICBtYXJnaW4tdG9wOiA4cHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiA4cHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGNvbG9yOiAjMDA1OTgwO1xyXG59XHJcblxyXG4ucmVjb21tZW5kLWNvbnRhaW5lciAudWkubWVzc2FnZSAuaGVhZGVyIHtcclxuICBjb2xvcjogIzQwNDg1YjtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbi5yZWNvbW1lbmQtY29udGFpbmVyIC51aS5tZXNzYWdlIC5jb250ZW50IHtcclxuICBtYXJnaW4tdG9wOiA0cHg7XHJcbn1cclxuXHJcbi5yZWNvbW1lbmQtY29udGFpbmVyIC5yZWNvbW1lbmQtYmxvY2sge1xyXG4gIG1hcmdpbi1ib3R0b206IDMycHg7XHJcbn1cclxuXHJcbi5yZWNvbW1lbmQtY29udGFpbmVyIC5yZWNvbW1lbmQtYmxvY2sgPiAuaXRlbXMge1xyXG4gIG1hcmdpbi10b3A6IDA7XHJcbn1cclxuXHJcbi5yZWNvbW1lbmQtY29udGFpbmVyIC5yZWNvbW1lbmQtYmxvY2sgLmhlYWRlciB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxufVxyXG5cclxuLnJlY29tbWVuZC1jb250YWluZXIgLnJlY29tbWVuZC1ibG9jayAuaGVhZGVyIHN0cm9uZyB7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG59XHJcblxyXG4ucmVjb21tZW5kLWNvbnRhaW5lciAucmVjb21tZW5kLWJsb2NrIC5yZWNvbW1lbmQtbGlzdCB7XHJcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XHJcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xyXG4gIGRpc3BsYXk6IC1tb3otYm94O1xyXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbn1cclxuXHJcbi5yZWNvbW1lbmQtY29udGFpbmVyIC5yZWNvbW1lbmQtYmxvY2sgLml0ZW0ge1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG5cclxuLnJlY29tbWVuZC1jb250YWluZXIgLnJlY29tbWVuZC11c2VyIC5oZWFkZXIge1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcclxuICBkaXNwbGF5OiAtbW96LWJveDtcclxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIC13ZWJraXQtYm94LXBhY2s6IGp1c3RpZnk7XHJcbiAgLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgLW1vei1ib3gtcGFjazoganVzdGlmeTtcclxuICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAtd2Via2l0LWJveC1hbGlnbjogZW5kO1xyXG4gIC13ZWJraXQtYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gIC1tb3otYm94LWFsaWduOiBlbmQ7XHJcbiAgLW1zLWZsZXgtYWxpZ246IGVuZDtcclxuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbn1cclxuXHJcbi5yZWNvbW1lbmQtY29udGFpbmVyIC5yZWNvbW1lbmQtdXNlciAucmVjb21tZW5kLWxpc3Qge1xyXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XHJcbiAgLXdlYmtpdC1hbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIC1tb3otYm94LWFsaWduOiBjZW50ZXI7XHJcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbiJdfQ== */';

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
//# sourceMappingURL=index-es2015.js.map
