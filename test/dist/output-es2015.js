(function() {
    "use strict";
    function t(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t;
    }
    function e(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
            }))), n.push.apply(n, r);
        }
        return n;
    }
    function n(n) {
        for (var r = 1; r < arguments.length; r++) {
            var o = null != arguments[r] ? arguments[r] : {};
            r % 2 ? e(o, !0).forEach((function(e) {
                t(n, e, o[e]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o)) : e(o).forEach((function(t) {
                Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(o, t));
            }));
        }
        return n;
    }
    const r = Function("return this")(), o = r, i = r, s = r, {WeakSet: c, WeakMap: a, Date: l, RegExp: u, Event: f, CustomEvent: h, requestAnimationFrame: p, URL: d, Blob: v, Element: g, Node: m, String: y, Array: b, document: w, Object: E, Reflect: C, Proxy: _, Symbol: P, Boolean: T, Promise: S, Set: x, Math: O, Error: N, TypeError: k, EventTarget: D, JSON: L, Map: j, clearTimeout: A, setTimeout: M, parseInt: R, Number: H} = r, F = new a, B = new a;
    function I(t) {
        return F.get(t);
    }
    function W(t) {
        null == t.passiveListener ? t.event.cancelable && (t.canceled = !0, "function" == typeof t.event.preventDefault && t.event.preventDefault()) : "undefined" != typeof console && console.error;
    }
    function $(t, e) {
        F.set(this, {
            eventTarget: t,
            event: e,
            eventPhase: 2,
            currentTarget: t,
            canceled: !1,
            stopped: !1,
            immediateStopped: !1,
            passiveListener: null,
            timeStamp: e.timeStamp || l.now()
        }), E.defineProperty(this, "isTrusted", {
            value: !1,
            enumerable: !0
        });
        const n = E.keys(e);
        for (let t = 0; t < n.length; ++t) {
            const e = n[t];
            e in this || E.defineProperty(this, e, K(e));
        }
    }
    function K(t) {
        return {
            get() {
                return I(this).event[t];
            },
            set(e) {
                I(this).event[t] = e;
            },
            configurable: !0,
            enumerable: !0
        };
    }
    function z(t) {
        return {
            value() {
                const e = I(this).event;
                return e[t].apply(e, arguments);
            },
            configurable: !0,
            enumerable: !0
        };
    }
    function U(t) {
        if (null == t || t === E.prototype) return $;
        let e = B.get(t);
        return null == e && (e = function(t, e) {
            const n = E.keys(e);
            if (0 === n.length) return t;
            function r(e, n) {
                t.call(this, e, n);
            }
            r.prototype = E.create(t.prototype, {
                constructor: {
                    value: r,
                    configurable: !0,
                    writable: !0
                }
            });
            for (let o = 0; o < n.length; ++o) {
                const i = n[o];
                if (!(i in t.prototype)) {
                    const t = "function" == typeof E.getOwnPropertyDescriptor(e, i).value;
                    E.defineProperty(r.prototype, i, t ? z(i) : K(i));
                }
            }
            return r;
        }(U(E.getPrototypeOf(t)), t), B.set(t, e)), e;
    }
    function V(t) {
        return I(t).immediateStopped;
    }
    function G(t, e) {
        I(t).passiveListener = e;
    }
    $.prototype = {
        get type() {
            return I(this).event.type;
        },
        get target() {
            return I(this).eventTarget;
        },
        get currentTarget() {
            return I(this).currentTarget;
        },
        composedPath() {
            const t = I(this).currentTarget;
            return null == t ? [] : [ t ];
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
            return I(this).eventPhase;
        },
        stopPropagation() {
            const t = I(this);
            t.stopped = !0, "function" == typeof t.event.stopPropagation && t.event.stopPropagation();
        },
        stopImmediatePropagation() {
            const t = I(this);
            t.stopped = !0, t.immediateStopped = !0, "function" == typeof t.event.stopImmediatePropagation && t.event.stopImmediatePropagation();
        },
        get bubbles() {
            return T(I(this).event.bubbles);
        },
        get cancelable() {
            return T(I(this).event.cancelable);
        },
        preventDefault() {
            W(I(this));
        },
        get defaultPrevented() {
            return I(this).canceled;
        },
        get composed() {
            return T(I(this).event.composed);
        },
        get timeStamp() {
            return I(this).timeStamp;
        },
        get srcElement() {
            return I(this).eventTarget;
        },
        get cancelBubble() {
            return I(this).stopped;
        },
        set cancelBubble(t) {
            if (!t) return;
            const e = I(this);
            e.stopped = !0, "boolean" == typeof e.event.cancelBubble && (e.event.cancelBubble = !0);
        },
        get returnValue() {
            return !I(this).canceled;
        },
        set returnValue(t) {
            t || W(I(this));
        },
        initEvent() {}
    }, E.defineProperty($.prototype, "constructor", {
        value: $,
        configurable: !0,
        writable: !0
    }), void 0 !== i && void 0 !== i.Event && (E.setPrototypeOf($.prototype, i.Event.prototype), 
    B.set(i.Event.prototype, $));
    const q = new a, Z = 3;
    function J(t) {
        return null !== t && "object" == typeof t;
    }
    function X(t) {
        const e = q.get(t);
        if (null == e) throw new k("'this' is expected an EventTarget object, but got another value.");
        return e;
    }
    function Q(t, e) {
        E.defineProperty(t, "on".concat(e), function(t) {
            return {
                get() {
                    let e = X(this).get(t);
                    for (;null != e; ) {
                        if (e.listenerType === Z) return e.listener;
                        e = e.next;
                    }
                    return null;
                },
                set(e) {
                    "function" == typeof e || J(e) || (e = null);
                    const n = X(this);
                    let r = null, o = n.get(t);
                    for (;null != o; ) o.listenerType === Z ? null !== r ? r.next = o.next : null !== o.next ? n.set(t, o.next) : n.delete(t) : r = o, 
                    o = o.next;
                    if (null !== e) {
                        const o = {
                            listener: e,
                            listenerType: Z,
                            passive: !1,
                            once: !1,
                            next: null
                        };
                        null === r ? n.set(t, o) : r.next = o;
                    }
                },
                configurable: !0,
                enumerable: !0
            };
        }(e));
    }
    function Y(t) {
        function e() {
            tt.call(this);
        }
        e.prototype = E.create(tt.prototype, {
            constructor: {
                value: e,
                configurable: !0,
                writable: !0
            }
        });
        for (let n = 0; n < t.length; ++n) Q(e.prototype, t[n]);
        return e;
    }
    function tt() {
        if (!(this instanceof tt)) {
            if (1 === arguments.length && b.isArray(arguments[0])) return Y(arguments[0]);
            if (arguments.length > 0) {
                const t = new b(arguments.length);
                for (let e = 0; e < arguments.length; ++e) t[e] = arguments[e];
                return Y(t);
            }
            throw new k("Cannot call a class as a function");
        }
        q.set(this, new j);
    }
    var et;
    function nt(t) {
        return lt(t) || st(t) || ct(t) || it(t) || function(t) {
            return "bigint" == typeof t;
        }(t);
    }
    function rt(t) {
        return "symbol" == typeof t;
    }
    tt.prototype = {
        addEventListener(t, e, n) {
            if (null == e) return;
            if ("function" != typeof e && !J(e)) throw new k("'listener' should be a function or an object.");
            const r = X(this), o = J(n), i = T(o ? n.capture : n) ? 1 : 2, s = {
                listener: e,
                listenerType: i,
                passive: o && T(n.passive),
                once: o && T(n.once),
                next: null
            };
            let c = r.get(t);
            if (void 0 === c) return void r.set(t, s);
            let a = null;
            for (;null != c; ) {
                if (c.listener === e && c.listenerType === i) return;
                a = c, c = c.next;
            }
            a.next = s;
        },
        removeEventListener(t, e, n) {
            if (null == e) return;
            const r = X(this), o = (J(n) ? T(n.capture) : T(n)) ? 1 : 2;
            let i = null, s = r.get(t);
            for (;null != s; ) {
                if (s.listener === e && s.listenerType === o) return void (null !== i ? i.next = s.next : null !== s.next ? r.set(t, s.next) : r.delete(t));
                i = s, s = s.next;
            }
        },
        dispatchEvent(t) {
            if (null == t || "string" != typeof t.type) throw new k('"event.type" should be a string.');
            const e = X(this), n = t.type;
            let r = e.get(n);
            if (null == r) return !0;
            const o = function(t, e) {
                return new (U(E.getPrototypeOf(e)))(t, e);
            }(this, t);
            let i = null;
            for (;null != r; ) {
                if (r.once ? null !== i ? i.next = r.next : null !== r.next ? e.set(n, r.next) : e.delete(n) : i = r, 
                G(o, r.passive ? r.listener : null), "function" == typeof r.listener) try {
                    r.listener.call(this, o);
                } catch (t) {} else r.listenerType !== Z && "function" == typeof r.listener.handleEvent && r.listener.handleEvent(o);
                if (V(o)) break;
                r = r.next;
            }
            return G(o, null), function(t, e) {
                I(t).eventPhase = e;
            }(o, 0), function(t, e) {
                I(t).currentTarget = e;
            }(o, null), !o.defaultPrevented;
        }
    }, E.defineProperty(tt.prototype, "constructor", {
        value: tt,
        configurable: !0,
        writable: !0
    }), void 0 !== i && void 0 !== i.EventTarget && E.setPrototypeOf(tt.prototype, i.EventTarget.prototype), 
    (() => {
        try {
            new D;
        } catch (t) {
            i.EventTarget = void 0;
        }
        "function" != typeof i.EventTarget && (i.EventTarget = tt);
    })(), "object" == typeof i.customElements && "function" == typeof i.CustomElementRegistry || (function() {
        var t = new x("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));
        function e(e) {
            var n = t.has(e);
            return e = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(e), !n && e;
        }
        function n(t) {
            var e = t.isConnected;
            if (void 0 !== e) return e;
            for (;t && !(t.__CE_isImportDocument || t instanceof Document); ) t = t.parentNode || (i.ShadowRoot && t instanceof ShadowRoot ? t.host : void 0);
            return !(!t || !(t.__CE_isImportDocument || t instanceof Document));
        }
        function r(t, e) {
            for (;e && e !== t && !e.nextSibling; ) e = e.parentNode;
            return e && e !== t ? e.nextSibling : null;
        }
        function o(t, e, n) {
            n = void 0 === n ? new x : n;
            for (var i = t; i; ) {
                if (i.nodeType === m.ELEMENT_NODE) {
                    var s = i;
                    e(s);
                    var c = s.localName;
                    if ("link" === c && "import" === s.getAttribute("rel")) {
                        if ((i = s.import) instanceof m && !n.has(i)) for (n.add(i), i = i.firstChild; i; i = i.nextSibling) o(i, e, n);
                        i = r(t, s);
                        continue;
                    }
                    if ("template" === c) {
                        i = r(t, s);
                        continue;
                    }
                    if (s = s.__CE_shadowRoot) for (s = s.firstChild; s; s = s.nextSibling) o(s, e, n);
                }
                i = i.firstChild ? i.firstChild : r(t, i);
            }
        }
        function s(t, e, n) {
            t[e] = n;
        }
        function c() {
            this.a = new j, this.g = new j, this.c = [], this.f = [], this.b = !1;
        }
        function a(t, e) {
            t.b && o(e, (function(e) {
                return l(t, e);
            }));
        }
        function l(t, e) {
            if (t.b && !e.__CE_patched) {
                e.__CE_patched = !0;
                for (var n = 0; n < t.c.length; n++) t.c[n](e);
                for (n = 0; n < t.f.length; n++) t.f[n](e);
            }
        }
        function u(t, e) {
            var n = [];
            for (o(e, (function(t) {
                return n.push(t);
            })), e = 0; e < n.length; e++) {
                var r = n[e];
                1 === r.__CE_state ? t.connectedCallback(r) : p(t, r);
            }
        }
        function f(t, e) {
            var n = [];
            for (o(e, (function(t) {
                return n.push(t);
            })), e = 0; e < n.length; e++) {
                var r = n[e];
                1 === r.__CE_state && t.disconnectedCallback(r);
            }
        }
        function h(t, e, n) {
            var r = (n = void 0 === n ? {} : n).u || new x, i = n.i || function(e) {
                return p(t, e);
            }, s = [];
            if (o(e, (function(e) {
                if ("link" === e.localName && "import" === e.getAttribute("rel")) {
                    var n = e.import;
                    n instanceof m && (n.__CE_isImportDocument = !0, n.__CE_hasRegistry = !0), n && "complete" === n.readyState ? n.__CE_documentLoadHandled = !0 : e.addEventListener("load", (function() {
                        var n = e.import;
                        if (!n.__CE_documentLoadHandled) {
                            n.__CE_documentLoadHandled = !0;
                            var o = new x(r);
                            o.delete(n), h(t, n, {
                                u: o,
                                i: i
                            });
                        }
                    }));
                } else s.push(e);
            }), r), t.b) for (e = 0; e < s.length; e++) l(t, s[e]);
            for (e = 0; e < s.length; e++) i(s[e]);
        }
        function p(t, e) {
            if (void 0 === e.__CE_state) {
                var r = e.ownerDocument;
                if ((r.defaultView || r.__CE_isImportDocument && r.__CE_hasRegistry) && (r = t.a.get(e.localName))) {
                    r.constructionStack.push(e);
                    var o = r.constructorFunction;
                    try {
                        try {
                            if (new o !== e) throw N("The custom element constructor did not produce the element being upgraded.");
                        } finally {
                            r.constructionStack.pop();
                        }
                    } catch (t) {
                        throw e.__CE_state = 2, t;
                    }
                    if (e.__CE_state = 1, e.__CE_definition = r, r.attributeChangedCallback) for (r = r.observedAttributes, 
                    o = 0; o < r.length; o++) {
                        var i = r[o], s = e.getAttribute(i);
                        null !== s && t.attributeChangedCallback(e, i, null, s, null);
                    }
                    n(e) && t.connectedCallback(e);
                }
            }
        }
        function d(t) {
            var e = w;
            this.c = t, this.a = e, this.b = void 0, h(this.c, this.a), "loading" === this.a.readyState && (this.b = new MutationObserver(this.f.bind(this)), 
            this.b.observe(this.a, {
                childList: !0,
                subtree: !0
            }));
        }
        function v(t) {
            t.b && t.b.disconnect();
        }
        function C() {
            var t = this;
            this.b = this.a = void 0, this.c = new S((function(e) {
                t.b = e, t.a && e(t.a);
            }));
        }
        function _(t) {
            if (t.a) throw N("Already resolved.");
            t.a = void 0, t.b && t.b(void 0);
        }
        function P(t) {
            this.c = !1, this.a = t, this.j = new j, this.f = function(t) {
                return t();
            }, this.b = !1, this.g = [], this.o = new d(t);
        }
        c.prototype.connectedCallback = function(t) {
            var e = t.__CE_definition;
            e.connectedCallback && e.connectedCallback.call(t);
        }, c.prototype.disconnectedCallback = function(t) {
            var e = t.__CE_definition;
            e.disconnectedCallback && e.disconnectedCallback.call(t);
        }, c.prototype.attributeChangedCallback = function(t, e, n, r, o) {
            var i = t.__CE_definition;
            i.attributeChangedCallback && -1 < i.observedAttributes.indexOf(e) && i.attributeChangedCallback.call(t, e, n, r, o);
        }, d.prototype.f = function(t) {
            var e = this.a.readyState;
            for ("interactive" !== e && "complete" !== e || v(this), e = 0; e < t.length; e++) for (var n = t[e].addedNodes, r = 0; r < n.length; r++) h(this.c, n[r]);
        }, P.prototype.l = function(t, n) {
            var r = this;
            if (!(n instanceof Function)) throw new k("Custom element constructors must be functions.");
            if (!e(t)) throw new SyntaxError("The element name '" + t + "' is not valid.");
            if (this.a.a.get(t)) throw N("A custom element with name '" + t + "' has already been defined.");
            if (this.c) throw N("A custom element is already being defined.");
            this.c = !0;
            try {
                var o = function o(t) {
                    var e = i[t];
                    if (void 0 !== e && !(e instanceof Function)) throw N("The '" + t + "' callback must be a function.");
                    return e;
                }, i = n.prototype;
                if (!(i instanceof E)) throw new k("The custom element constructor's prototype is not an object.");
                var s = o("connectedCallback"), c = o("disconnectedCallback"), a = o("adoptedCallback"), l = o("attributeChangedCallback"), u = n.observedAttributes || [];
            } catch (t) {
                return;
            } finally {
                this.c = !1;
            }
            n = {
                localName: t,
                constructorFunction: n,
                connectedCallback: s,
                disconnectedCallback: c,
                adoptedCallback: a,
                attributeChangedCallback: l,
                observedAttributes: u,
                constructionStack: []
            }, function(t, e, n) {
                t.a.set(e, n), t.g.set(n.constructorFunction, n);
            }(this.a, t, n), this.g.push(n), this.b || (this.b = !0, this.f((function() {
                return function(t) {
                    if (!1 !== t.b) {
                        t.b = !1;
                        for (var e = t.g, n = [], r = new j, o = 0; o < e.length; o++) r.set(e[o].localName, []);
                        for (h(t.a, w, {
                            i: function i(e) {
                                if (void 0 === e.__CE_state) {
                                    var o = e.localName, i = r.get(o);
                                    i ? i.push(e) : t.a.a.get(o) && n.push(e);
                                }
                            }
                        }), o = 0; o < n.length; o++) p(t.a, n[o]);
                        for (;0 < e.length; ) {
                            var i = e.shift();
                            o = i.localName, i = r.get(i.localName);
                            for (var s = 0; s < i.length; s++) p(t.a, i[s]);
                            (o = t.j.get(o)) && _(o);
                        }
                    }
                }(r);
            })));
        }, P.prototype.i = function(t) {
            h(this.a, t);
        }, P.prototype.get = function(t) {
            if (t = this.a.a.get(t)) return t.constructorFunction;
        }, P.prototype.m = function(t) {
            if (!e(t)) return S.reject(new SyntaxError("'" + t + "' is not a valid custom element name."));
            var n = this.j.get(t);
            return n ? n.c : (n = new C, this.j.set(t, n), this.a.a.get(t) && !this.g.some((function(e) {
                return e.localName === t;
            })) && _(n), n.c);
        }, P.prototype.s = function(t) {
            v(this.o);
            var e = this.f;
            this.f = function(n) {
                return t((function() {
                    return e(n);
                }));
            };
        }, i.CustomElementRegistry = P, P.prototype.define = P.prototype.l, P.prototype.upgrade = P.prototype.i, 
        P.prototype.get = P.prototype.get, P.prototype.whenDefined = P.prototype.m, P.prototype.polyfillWrapFlushCallback = P.prototype.s;
        var T = i.Document.prototype.createElement, O = i.Document.prototype.createElementNS, D = i.Document.prototype.importNode, L = i.Document.prototype.prepend, A = i.Document.prototype.append, M = i.DocumentFragment.prototype.prepend, R = i.DocumentFragment.prototype.append, H = i.Node.prototype.cloneNode, F = i.Node.prototype.appendChild, B = i.Node.prototype.insertBefore, I = i.Node.prototype.removeChild, W = i.Node.prototype.replaceChild, $ = E.getOwnPropertyDescriptor(i.Node.prototype, "textContent"), K = i.Element.prototype.attachShadow, z = E.getOwnPropertyDescriptor(i.Element.prototype, "innerHTML"), U = i.Element.prototype.getAttribute, V = i.Element.prototype.setAttribute, G = i.Element.prototype.removeAttribute, q = i.Element.prototype.getAttributeNS, Z = i.Element.prototype.setAttributeNS, J = i.Element.prototype.removeAttributeNS, X = i.Element.prototype.insertAdjacentElement, Q = i.Element.prototype.insertAdjacentHTML, Y = i.Element.prototype.prepend, tt = i.Element.prototype.append, et = i.Element.prototype.before, nt = i.Element.prototype.after, rt = i.Element.prototype.replaceWith, ot = i.Element.prototype.remove, it = i.HTMLElement, st = E.getOwnPropertyDescriptor(i.HTMLElement.prototype, "innerHTML"), ct = i.HTMLElement.prototype.insertAdjacentElement, at = i.HTMLElement.prototype.insertAdjacentHTML, lt = new function() {};
        function ut(t, e, r) {
            function o(e) {
                return function(r) {
                    for (var o = [], i = 0; i < arguments.length; ++i) o[i] = arguments[i];
                    i = [];
                    for (var s = [], c = 0; c < o.length; c++) {
                        var a = o[c];
                        if (a instanceof g && n(a) && s.push(a), a instanceof DocumentFragment) for (a = a.firstChild; a; a = a.nextSibling) i.push(a); else i.push(a);
                    }
                    for (e.apply(this, o), o = 0; o < s.length; o++) f(t, s[o]);
                    if (n(this)) for (o = 0; o < i.length; o++) (s = i[o]) instanceof g && u(t, s);
                };
            }
            void 0 !== r.h && (e.prepend = o(r.h)), void 0 !== r.append && (e.append = o(r.append));
        }
        var ft, ht = i.customElements;
        if (!ht || ht.forcePolyfill || "function" != typeof ht.define || "function" != typeof ht.get) {
            var pt = new c;
            ft = pt, i.HTMLElement = function() {
                function t() {
                    var t = this.constructor, e = ft.g.get(t);
                    if (!e) throw N("The custom element being constructed was not registered with `customElements`.");
                    var n = e.constructionStack;
                    if (0 === n.length) return n = T.call(w, e.localName), E.setPrototypeOf(n, t.prototype), 
                    n.__CE_state = 1, n.__CE_definition = e, l(ft, n), n;
                    var r = n[e = n.length - 1];
                    if (r === lt) throw N("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
                    return n[e] = lt, E.setPrototypeOf(r, t.prototype), l(ft, r), r;
                }
                return t.prototype = it.prototype, E.defineProperty(t.prototype, "constructor", {
                    writable: !0,
                    configurable: !0,
                    enumerable: !1,
                    value: t
                }), t;
            }(), function() {
                var t = pt;
                s(Document.prototype, "createElement", (function(e) {
                    if (this.__CE_hasRegistry) {
                        var n = t.a.get(e);
                        if (n) return new n.constructorFunction;
                    }
                    return e = T.call(this, e), l(t, e), e;
                })), s(Document.prototype, "importNode", (function(e, n) {
                    return e = D.call(this, e, !!n), this.__CE_hasRegistry ? h(t, e) : a(t, e), e;
                })), s(Document.prototype, "createElementNS", (function(e, n) {
                    if (this.__CE_hasRegistry && (null === e || "http://www.w3.org/1999/xhtml" === e)) {
                        var r = t.a.get(n);
                        if (r) return new r.constructorFunction;
                    }
                    return e = O.call(this, e, n), l(t, e), e;
                })), ut(t, Document.prototype, {
                    h: L,
                    append: A
                });
            }(), ut(pt, DocumentFragment.prototype, {
                h: M,
                append: R
            }), function() {
                function t(t, r) {
                    E.defineProperty(t, "textContent", {
                        enumerable: r.enumerable,
                        configurable: !0,
                        get: r.get,
                        set: function set(t) {
                            if (this.nodeType === m.TEXT_NODE) r.set.call(this, t); else {
                                var o = void 0;
                                if (this.firstChild) {
                                    var i = this.childNodes, s = i.length;
                                    if (0 < s && n(this)) {
                                        o = b(s);
                                        for (var c = 0; c < s; c++) o[c] = i[c];
                                    }
                                }
                                if (r.set.call(this, t), o) for (t = 0; t < o.length; t++) f(e, o[t]);
                            }
                        }
                    });
                }
                var e = pt;
                s(m.prototype, "insertBefore", (function(t, r) {
                    if (t instanceof DocumentFragment) {
                        var o = b.prototype.slice.apply(t.childNodes);
                        if (t = B.call(this, t, r), n(this)) for (r = 0; r < o.length; r++) u(e, o[r]);
                        return t;
                    }
                    return o = n(t), r = B.call(this, t, r), o && f(e, t), n(this) && u(e, t), r;
                })), s(m.prototype, "appendChild", (function(t) {
                    if (t instanceof DocumentFragment) {
                        var r = b.prototype.slice.apply(t.childNodes);
                        if (t = F.call(this, t), n(this)) for (var o = 0; o < r.length; o++) u(e, r[o]);
                        return t;
                    }
                    return r = n(t), o = F.call(this, t), r && f(e, t), n(this) && u(e, t), o;
                })), s(m.prototype, "cloneNode", (function(t) {
                    return t = H.call(this, !!t), this.ownerDocument.__CE_hasRegistry ? h(e, t) : a(e, t), 
                    t;
                })), s(m.prototype, "removeChild", (function(t) {
                    var r = n(t), o = I.call(this, t);
                    return r && f(e, t), o;
                })), s(m.prototype, "replaceChild", (function(t, r) {
                    if (t instanceof DocumentFragment) {
                        var o = b.prototype.slice.apply(t.childNodes);
                        if (t = W.call(this, t, r), n(this)) for (f(e, r), r = 0; r < o.length; r++) u(e, o[r]);
                        return t;
                    }
                    o = n(t);
                    var i = W.call(this, t, r), s = n(this);
                    return s && f(e, r), o && f(e, t), s && u(e, t), i;
                })), $ && $.get ? t(m.prototype, $) : function(t, e) {
                    t.b = !0, t.c.push(e);
                }(e, (function(e) {
                    t(e, {
                        enumerable: !0,
                        configurable: !0,
                        get: function get() {
                            for (var t = [], e = 0; e < this.childNodes.length; e++) {
                                var n = this.childNodes[e];
                                n.nodeType !== m.COMMENT_NODE && t.push(n.textContent);
                            }
                            return t.join("");
                        },
                        set: function set(t) {
                            for (;this.firstChild; ) I.call(this, this.firstChild);
                            null != t && "" !== t && F.call(this, w.createTextNode(t));
                        }
                    });
                }));
            }(), function() {
                function t(t, e) {
                    E.defineProperty(t, "innerHTML", {
                        enumerable: e.enumerable,
                        configurable: !0,
                        get: e.get,
                        set: function set(t) {
                            var r = this, s = void 0;
                            if (n(this) && (s = [], o(this, (function(t) {
                                t !== r && s.push(t);
                            }))), e.set.call(this, t), s) for (var c = 0; c < s.length; c++) {
                                var l = s[c];
                                1 === l.__CE_state && i.disconnectedCallback(l);
                            }
                            return this.ownerDocument.__CE_hasRegistry ? h(i, this) : a(i, this), t;
                        }
                    });
                }
                function e(t, e) {
                    s(t, "insertAdjacentElement", (function(t, r) {
                        var o = n(r);
                        return t = e.call(this, t, r), o && f(i, r), n(t) && u(i, r), t;
                    }));
                }
                function r(t, e) {
                    function n(t, e) {
                        for (var n = []; t !== e; t = t.nextSibling) n.push(t);
                        for (e = 0; e < n.length; e++) h(i, n[e]);
                    }
                    s(t, "insertAdjacentHTML", (function(t, r) {
                        if ("beforebegin" === (t = t.toLowerCase())) {
                            var o = this.previousSibling;
                            e.call(this, t, r), n(o || this.parentNode.firstChild, this);
                        } else if ("afterbegin" === t) o = this.firstChild, e.call(this, t, r), n(this.firstChild, o); else if ("beforeend" === t) o = this.lastChild, 
                        e.call(this, t, r), n(o || this.firstChild, null); else {
                            if ("afterend" !== t) throw new SyntaxError("The value provided (" + y(t) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
                            o = this.nextSibling, e.call(this, t, r), n(this.nextSibling, o);
                        }
                    }));
                }
                var i = pt;
                K && s(g.prototype, "attachShadow", (function(t) {
                    t = K.call(this, t);
                    var e = i;
                    if (e.b && !t.__CE_patched) {
                        t.__CE_patched = !0;
                        for (var n = 0; n < e.c.length; n++) e.c[n](t);
                    }
                    return this.__CE_shadowRoot = t;
                })), z && z.get ? t(g.prototype, z) : st && st.get ? t(HTMLElement.prototype, st) : function(t, e) {
                    t.b = !0, t.f.push(e);
                }(i, (function(e) {
                    t(e, {
                        enumerable: !0,
                        configurable: !0,
                        get: function get() {
                            return H.call(this, !0).innerHTML;
                        },
                        set: function set(t) {
                            var e = "template" === this.localName, n = e ? this.content : this, r = O.call(w, this.namespaceURI, this.localName);
                            for (r.innerHTML = t; 0 < n.childNodes.length; ) I.call(n, n.childNodes[0]);
                            for (t = e ? r.content : r; 0 < t.childNodes.length; ) F.call(n, t.childNodes[0]);
                        }
                    });
                })), s(g.prototype, "setAttribute", (function(t, e) {
                    if (1 !== this.__CE_state) return V.call(this, t, e);
                    var n = U.call(this, t);
                    V.call(this, t, e), e = U.call(this, t), i.attributeChangedCallback(this, t, n, e, null);
                })), s(g.prototype, "setAttributeNS", (function(t, e, n) {
                    if (1 !== this.__CE_state) return Z.call(this, t, e, n);
                    var r = q.call(this, t, e);
                    Z.call(this, t, e, n), n = q.call(this, t, e), i.attributeChangedCallback(this, e, r, n, t);
                })), s(g.prototype, "removeAttribute", (function(t) {
                    if (1 !== this.__CE_state) return G.call(this, t);
                    var e = U.call(this, t);
                    G.call(this, t), null !== e && i.attributeChangedCallback(this, t, e, null, null);
                })), s(g.prototype, "removeAttributeNS", (function(t, e) {
                    if (1 !== this.__CE_state) return J.call(this, t, e);
                    var n = q.call(this, t, e);
                    J.call(this, t, e);
                    var r = q.call(this, t, e);
                    n !== r && i.attributeChangedCallback(this, e, n, r, t);
                })), ct ? e(HTMLElement.prototype, ct) : X && e(g.prototype, X), at ? r(HTMLElement.prototype, at) : Q && r(g.prototype, Q), 
                ut(i, g.prototype, {
                    h: Y,
                    append: tt
                }), function(t) {
                    function e(e) {
                        return function(r) {
                            for (var o = [], i = 0; i < arguments.length; ++i) o[i] = arguments[i];
                            i = [];
                            for (var s = [], c = 0; c < o.length; c++) {
                                var a = o[c];
                                if (a instanceof g && n(a) && s.push(a), a instanceof DocumentFragment) for (a = a.firstChild; a; a = a.nextSibling) i.push(a); else i.push(a);
                            }
                            for (e.apply(this, o), o = 0; o < s.length; o++) f(t, s[o]);
                            if (n(this)) for (o = 0; o < i.length; o++) (s = i[o]) instanceof g && u(t, s);
                        };
                    }
                    var r = g.prototype;
                    void 0 !== et && (r.before = e(et)), void 0 !== et && (r.after = e(nt)), void 0 !== rt && s(r, "replaceWith", (function(e) {
                        for (var r = [], o = 0; o < arguments.length; ++o) r[o] = arguments[o];
                        o = [];
                        for (var i = [], s = 0; s < r.length; s++) {
                            var c = r[s];
                            if (c instanceof g && n(c) && i.push(c), c instanceof DocumentFragment) for (c = c.firstChild; c; c = c.nextSibling) o.push(c); else o.push(c);
                        }
                        for (s = n(this), rt.apply(this, r), r = 0; r < i.length; r++) f(t, i[r]);
                        if (s) for (f(t, this), r = 0; r < o.length; r++) (i = o[r]) instanceof g && u(t, i);
                    })), void 0 !== ot && s(r, "remove", (function() {
                        var e = n(this);
                        ot.call(this), e && f(t, this);
                    }));
                }(i);
            }(), w.__CE_hasRegistry = !0;
            var dt = new P(pt);
            E.defineProperty(i, "customElements", {
                configurable: !0,
                enumerable: !0,
                value: dt
            });
        }
    }.call(o), i.CustomElementRegistry = C.get(C.getPrototypeOf(i.customElements), "constructor")), 
    "function" != typeof b.prototype.flat && (b.prototype.flat = function t(e = 1) {
        if (e <= 1) return this.reduce((t, e) => t.concat(e), []);
        if (e > 10) return function t(e) {
            return e.reduce((e, n) => e.concat(b.isArray(n) ? t(n) : n), []);
        }(this);
        {
            let n = [ ...this ];
            for (;e >= 1; ) n = t.call(n), e--;
            return n;
        }
    }), et = function et(t) {
        for (var e = -1, n = null == t ? 0 : t.length, r = {}; ++e < n; ) {
            var o = t[e];
            r[o[0]] = o[1];
        }
        return r;
    }, "function" != typeof E.fromEntries && (E.fromEntries = et);
    const ot = t => at(t) && "Object" === ht(t);
    function it(t) {
        return !t && void 0 === t || null === t;
    }
    function st(t) {
        return "number" == typeof t;
    }
    function ct(t) {
        return "boolean" == typeof t;
    }
    function at(t) {
        return "object" == typeof t && null !== t;
    }
    function lt(t) {
        return "string" == typeof t;
    }
    function ut(t) {
        return "function" == typeof t;
    }
    function ft(t) {
        return b.isArray(t) && t instanceof b;
    }
    function ht(t) {
        return {}.toString.call(t).replace("[object ", "").replace("]", "").trim();
    }
    function pt(t) {
        return t instanceof x;
    }
    function dt(t) {
        return t instanceof j;
    }
    function vt(t) {
        return t instanceof a;
    }
    const {HTMLElement: gt, customElements: mt, Proxy: yt} = i;
    if (!ut(gt) || !ut(yt) || !at(mt)) throw new k;
    const bt = [ "input", "textarea", "option", "select" ];
    var wt = (t, e, n) => "value" === e && bt.includes(t) && "button" !== n || "selected" === e && "option" === t || "checked" === e && "input" === t || "muted" === e && "video" === t;
    const Et = /\B([A-Z])/g, Ct = t => t.replace(Et, "-$1").toLowerCase(), _t = i.String, Pt = i.Reflect, {get: Tt, set: St, ownKeys: xt} = Pt, Ot = "value";
    function Nt(t) {
        return "object" == typeof t && null !== t;
    }
    function kt(t) {
        return "string" == typeof t;
    }
    function Dt(t) {
        return t instanceof x;
    }
    const Lt = t => "input" === At(t) && ("checkbox" === Tt(t, "type") || "radio" === Tt(t, "type"));
    function jt(t) {
        !function(t) {
            if (!(t instanceof g)) throw k();
        }(t);
        var e = E.create(null);
        const r = new _(e, {
            ownKeys() {
                const e = function(t) {
                    const e = At(t);
                    return "textarea" === e || "select" === e || "input" === e && "text" === Tt(t, "type");
                }(t), n = function(t) {
                    return t.getAttributeNames();
                }(t);
                return b.from(new x([ ...n, Lt(t) ? "checked" : void 0, e ? Ot : void 0 ].flat(1 / 0).filter(t => !!t)));
            },
            get(e, n) {
                if (wt(At(t), _t(n), Tt(t, "type"))) return Tt(t, _t(n));
                {
                    const e = function(t, e) {
                        return t.getAttribute(e);
                    }(t, _t(n));
                    if ("" === e) return !0;
                    if (null === e) return;
                    if (!kt(e)) return;
                    try {
                        return L.parse(_t(e));
                    } catch (t) {
                        return e;
                    }
                }
            },
            set(e, n, r) {
                if ("function" == typeof r) throw k();
                if (wt(At(t), _t(n), Tt(t, "type"))) return St(t, _t(n), r);
                if ("style" === n) {
                    const e = kt(r) ? r : Nt(r) ? (i = r, i = L.parse(L.stringify(i)), E.entries(i).map(([t, e]) => [ Ct(t).trim(), e ]).map(([t, e]) => t + ":" + e).join(";")) : _t(r);
                    return St(Tt(t, "style"), "cssText", e.trim()), !0;
                }
                if ("class" === n && Nt(r)) {
                    const e = (o = r, b.isArray(o) ? r.join(" ") : Dt(r) ? [ ...r ].join(" ") : _t(r));
                    return Mt(t, _t(n), e), !0;
                }
                return !1 === r || null == r ? (Rt(t, _t(n)), !0) : Dt(r) ? (Mt(t, _t(n), L.stringify([ ...r ])), 
                !0) : (!0 === r && (r = ""), Mt(t, _t(n), Nt(r) ? L.stringify(r) : _t(r)), !0);
                var o, i;
            },
            deleteProperty: (e, n) => (Rt(t, _t(n)), !0),
            has: (t, e) => xt(r).includes(e),
            defineProperty: () => !1,
            getOwnPropertyDescriptor(t, e) {
                const o = {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }, i = Tt(r, e);
                return void 0 !== i ? n({
                    value: i
                }, o) : void 0;
            },
            setPrototypeOf: () => !1
        });
        return r;
    }
    function At(t) {
        return t.tagName.toLowerCase();
    }
    function Mt(t, e, n) {
        return t.setAttribute(e, n);
    }
    function Rt(t, e) {
        return t.removeAttribute(e);
    }
    var Ht = function Ht(t) {
        var e = typeof t;
        return null != t && ("object" == e || "function" == e);
    }, Ft = void 0 !== r ? r : void 0 !== i ? i : void 0 !== s ? s : void 0 !== o ? o : {}, Bt = "object" == typeof Ft && Ft && Ft.Object === E && Ft, It = "object" == typeof o && o && o.Object === E && o, Wt = Bt || It || Function("return this")(), $t = function $t() {
        return Wt.Date.now();
    }, Kt = Wt.Symbol, zt = E.prototype, Ut = zt.hasOwnProperty, Vt = zt.toString, Gt = Kt ? Kt.toStringTag : void 0;
    var qt = function qt(t) {
        var e = Ut.call(t, Gt), n = t[Gt];
        try {
            t[Gt] = void 0;
            var r = !0;
        } catch (t) {}
        var o = Vt.call(t);
        return r && (e ? t[Gt] = n : delete t[Gt]), o;
    }, Zt = E.prototype.toString;
    var Jt = function Jt(t) {
        return Zt.call(t);
    }, Xt = "[object Null]", Qt = "[object Undefined]", Yt = Kt ? Kt.toStringTag : void 0;
    var te = function te(t) {
        return null == t ? void 0 === t ? Qt : Xt : Yt && Yt in E(t) ? qt(t) : Jt(t);
    };
    var ee = function ee(t) {
        return null != t && "object" == typeof t;
    }, ne = "[object Symbol]";
    var re = function re(t) {
        return "symbol" == typeof t || ee(t) && te(t) == ne;
    }, oe = NaN, ie = /^\s+|\s+$/g, se = /^[-+]0x[0-9a-f]+$/i, ce = /^0b[01]+$/i, ae = /^0o[0-7]+$/i, le = R;
    var ue = function ue(t) {
        if ("number" == typeof t) return t;
        if (re(t)) return oe;
        if (Ht(t)) {
            var e = "function" == typeof t.valueOf ? t.valueOf() : t;
            t = Ht(e) ? e + "" : e;
        }
        if ("string" != typeof t) return 0 === t ? t : +t;
        t = t.replace(ie, "");
        var n = ce.test(t);
        return n || ae.test(t) ? le(t.slice(2), n ? 2 : 8) : se.test(t) ? oe : +t;
    }, fe = "Expected a function", he = O.max, pe = O.min;
    var de = function de(t, e, n) {
        var r, o, i, s, c, a, l = 0, u = !1, f = !1, h = !0;
        if ("function" != typeof t) throw new k(fe);
        function p(e) {
            var n = r, i = o;
            return r = o = void 0, l = e, s = t.apply(i, n);
        }
        function d(t) {
            var n = t - a;
            return void 0 === a || n >= e || n < 0 || f && t - l >= i;
        }
        function v() {
            var t = $t();
            if (d(t)) return g(t);
            c = M(v, function(t) {
                var n = e - (t - a);
                return f ? pe(n, i - (t - l)) : n;
            }(t));
        }
        function g(t) {
            return c = void 0, h && r ? p(t) : (r = o = void 0, s);
        }
        function m() {
            var t = $t(), n = d(t);
            if (r = arguments, o = this, a = t, n) {
                if (void 0 === c) return function(t) {
                    return l = t, c = M(v, e), u ? p(t) : s;
                }(a);
                if (f) return A(c), c = M(v, e), p(a);
            }
            return void 0 === c && (c = M(v, e)), s;
        }
        return e = ue(e) || 0, Ht(n) && (u = !!n.leading, i = (f = "maxWait" in n) ? he(ue(n.maxWait) || 0, e) : i, 
        h = "trailing" in n ? !!n.trailing : h), m.cancel = function() {
            void 0 !== c && A(c), l = 0, r = a = o = c = void 0;
        }, m.flush = function() {
            return void 0 === c ? s : g($t());
        }, m;
    };
    const ve = new a, ge = new a, me = new a, {apply: ye, construct: be, defineProperty: we, deleteProperty: Ee, getOwnPropertyDescriptor: Ce, getPrototypeOf: _e, has: Pe, ownKeys: Te, preventExtensions: Se} = C;
    function xe(t, e) {
        return dt(t) || vt(t) ? t.get(e) : C.get(t, e);
    }
    function Oe(t, e, n) {
        return dt(t) || vt(t) ? (t.set(e, n), !0) : C.set(t, e, n);
    }
    let Ne = [];
    let ke = !1, De = new x, Le = new x, je = new x;
    function Ae(t) {
        if (!ut(t)) throw k();
        if (!ke) throw N();
        De.add(t);
    }
    function Me(t) {
        if (!ut(t)) throw k();
        if (!ke) throw N();
        Le.add(t);
    }
    function Re() {
        ke = !1, He();
    }
    function He() {
        De = new x, Le = new x, je = new x, Ne = [];
    }
    var Fe, Be;
    const Ie = i.EventTarget, We = P("addonelistner"), $e = P("removeonelistner"), Ke = P("cancelsubscribe"), ze = P("debouncedispatch");
    function Ue(t) {
        return t instanceof Qe && "ReactiveState" === t[P.toStringTag];
    }
    const Ve = P("eventtatget"), Ge = P("memlisteners"), qe = P("dispatch"), Ze = P("subscribe"), Je = P("removeallisteners"), Xe = P("addallisteners");
    class Qe {
        constructor(t) {
            var e;
            this[P.toStringTag] = "ReactiveState", this[Fe] = new Ie, this[Be] = new x, this.valueOf = () => this.value, 
            this.value = t, we(this, "value", {
                value: t,
                configurable: !0,
                writable: !0
            }), e = this, ke && je.add(e);
            const n = de(t => {
                const e = t ? y(t) : "value";
                this[Ve].dispatchEvent(new h("value", {
                    detail: e
                }));
            });
            this[ze] = t => {
                n(t);
            };
        }
        [Je]() {
            this[Ge].forEach(t => {
                this[$e](t);
            });
        }
        [$e](t) {
            this[Ve].removeEventListener("value", t);
        }
        [We](t) {
            this[Ve].addEventListener("value", t);
        }
        [Xe]() {
            this[Ge].forEach(t => {
                this[We](t);
            });
        }
        toString() {
            const t = this.valueOf();
            return nt(t) ? y(t) : pt(t) ? L.stringify([ ...t ]) : at(t) ? L.stringify(t) : "";
        }
        [(Fe = Ve, Be = Ge, qe)](t) {
            this[ze](t);
        }
        [Ze](t) {
            let e;
            const n = ve.get(t);
            n ? e = n : (e = () => t(), ve.set(t, e)), this[Ge].add(e);
        }
        [Ke](t) {
            const e = ve.get(t);
            e && (this[Ge].delete(e), this[$e](e));
        }
        [P.toPrimitive]() {
            const t = this.valueOf();
            return nt(t) ? t : at(t) ? L.stringify(t) : void 0;
        }
    }
    function Ye(t) {
        const e = {};
        return t.forEach(([t, n]) => {
            e[t] || (e[t] = new x), n.forEach(n => {
                e[t].add(n);
            });
        }), E.entries(e).map(([t, e]) => [ t, [ ...e ] ]);
    }
    const tn = new c, en = /[A-Za-z\u4e00-\u9fa5]/;
    function nn(t) {
        return tn.has(t);
    }
    function rn(t, e = {}, n = []) {
        e = E.assign({}, e), n = n.flat(1 / 0);
        const r = E.entries(e), o = r.filter(([t]) => !(t.startsWith("@") || t.startsWith("on"))), i = o.filter(([t]) => en.test(t[0])), s = E.create(null), c = s;
        return [ "onevent", "element", "type", "props", "children", "directives", "bindattr" ].forEach(t => {
            we(s, t, {
                writable: !0
            });
        }), c.element = [], E.assign(s, {
            type: t,
            bindattr: E.fromEntries(i.filter(t => Ue(t[1]))),
            props: E.fromEntries(i.filter(t => !Ue(t[1])).map(([t, e]) => [ t, lt(e) ? e.trim() : e ])),
            children: n,
            onevent: E.fromEntries(Ye([ ...r.filter(([t]) => "@" == t[0]).map(([t, e]) => [ t.slice(1).toLowerCase().trim(), [ e ].flat(1 / 0) ]), ...r.filter(([t]) => t.startsWith("on")).map(([t, e]) => [ t.slice(2).toLowerCase().trim(), [ e ].flat(1 / 0) ]) ])),
            directives: E.fromEntries(o.filter(([t]) => "*" === t[0] || "_" === t[0] || "$" === t[0]).map(([t, e]) => [ t.slice(1).toLowerCase().trim(), e ]))
        }), we(s, P.toStringTag, {
            value: "VirtualElement"
        }), Se(s), tn.add(s), E.freeze(c), s;
    }
    function on(t) {
        if (lt(t)) return !0;
        if (st(t)) return !0;
        return ft(t) ? t.every(t => on(t)) : nn(t) ? on(t.children) : !!Ue(t);
    }
    function sn(t) {
        return !!(ut(t) && t.prototype && t.prototype instanceof HTMLElement);
    }
    function cn(t) {
        return t.map(t => t.cssText).join("\n");
    }
    const an = b(26).fill(void 0).map((t, e) => 97 + e).map(t => y.fromCharCode(t)), ln = b(16).fill(void 0).map((t, e) => e).map(t => t.toString(16)), un = [ ...new x([ ...ln, ...an ]) ];
    function fn(t = 1) {
        return b(t).fill(void 0).map(() => xe(an, O.floor(O.random() * an.length))).join("") + "-" + b(t).fill(void 0).map(() => xe(un, O.floor(O.random() * un.length))).join("");
    }
    if (!at(i.customElements)) throw new k;
    i.CustomElementRegistry = xe(_e(i.customElements), "constructor");
    const hn = P.for("elementset"), pn = P.for("elementmap"), {CustomElementRegistry: dn} = i, vn = i.customElements;
    Pe(vn, hn) || C.set(vn, hn, new x), Pe(vn, pn) || C.set(vn, pn, {});
    var gn = (t, e) => mn(t, e);
    function mn(t, e, n = 1) {
        if (!sn(t)) throw k();
        if (xe(vn, hn).has(t)) return function(t, e) {
            const n = E.entries(t).find(t => t[1] === e);
            return n ? n[0] : void 0;
        }(xe(vn, pn), t);
        {
            const r = fn(n);
            return vn.get(r) ? mn(t, e, n + 1) : (e ? vn.define(r, t, {
                extends: e
            }) : vn.define(r, t), r);
        }
    }
    vn.define = function(t, e, n) {
        if (!sn(e)) throw k();
        xe(vn, hn).has(e) || (Pe(vn[pn], t) ? mn(e, n ? n.extends : void 0) : (dn.prototype.define.call(vn, t, e, n), 
        vn[hn].add(e), vn[pn][t] = e));
    }, Oe(vn, P.iterator, () => {
        const t = E.entries(vn[pn]);
        return t[P.iterator].call(t);
    });
    const yn = P("component");
    function bn(t, e) {
        t.textContent = e;
    }
    function wn(t, e) {
        t.innerHTML = e;
    }
    function En(t, e) {
        t.appendChild(e);
    }
    function Cn() {
        return w.createDocumentFragment();
    }
    function _n(t, e) {
        return w.createElementNS(t, e);
    }
    function Pn(t) {
        return w.createTextNode(y(t));
    }
    const Tn = "http://www.w3.org/2000/svg";
    const Sn = "http://www.w3.org/1998/Math/MathML";
    function xn(t, e, n) {
        t.addEventListener(e, n);
    }
    function On(t) {
        return [ ...t.children ];
    }
    function Nn(t) {
        return [ ...t.childNodes ];
    }
    function kn(t) {
        return [ ...w.querySelectorAll(t) ];
    }
    function Dn(t) {
        return (ft(t) ? t : [ t ]).flat(1 / 0).filter(t => !it(t));
    }
    function Ln(t, e, n = !0) {
        return n && bn(e, ""), Dn(t).flat(1 / 0).forEach(t => En(e, t)), e;
    }
    function jn(t) {
        return t instanceof m;
    }
    function An(t, e) {
        if (ft(t) && !(t = t.flat(1 / 0)).length) throw new k;
        const n = e;
        if (!(n instanceof HTMLElement)) throw k();
        if (n === w.body || n === w.documentElement || n === w.head) throw N();
        const r = Dn(t);
        if (on(t)) Ln(Un(r), e); else {
            if (!(jn(t) || (o = t, ft(o) && o.length && o.every(t => jn(t))))) throw k();
            Ln(r, e);
        }
        var o;
        return e;
    }
    function Mn(t, e) {
        if (ft(t) || Ue(t)) {
            const n = Dn(t);
            if (!n.length) throw new N;
            const r = de(e), o = n.map(t => {
                const o = (() => {
                    const t = me.get(e);
                    if (t) return t;
                    {
                        const t = () => {
                            r(...n.map(t => t.valueOf()));
                        };
                        return me.set(e, t), t;
                    }
                })();
                return function(t, e) {
                    if (!Ue(t) || !ut(e)) throw k();
                    t[Ze](e), p(() => {
                        Rn(t);
                    }), function(t, e) {
                        ke && Ne.push([ t, e ]);
                    }(t, e);
                }(t, o), [ t, o ];
            });
            return () => {
                o.forEach(([t, e]) => {
                    t[Ke](e);
                });
            };
        }
        throw new k;
    }
    function Rn(t) {
        t[Xe]();
    }
    function Hn(t) {
        const e = t.isConnected;
        return ct(e) ? e : w.documentElement === function(t) {
            for (;t && t.parentNode && t.parentNode !== w; ) t = t.parentNode;
            return t;
        }(t);
    }
    function Fn(t, e) {
        return function(e, n) {
            const r = e;
            if (lt(n)) p(() => {
                t(e, n);
            }); else {
                if (!Ue(n)) throw k();
                Mn(n, () => {
                    const o = n;
                    Hn(r) && t(e, y(o));
                }), p(() => {
                    t(e, y(n));
                });
            }
        };
    }
    function Bn(t = {}) {
        if (!ot(t)) throw new k;
        return E.entries(t).forEach(([t, e]) => {
            if ("function" != typeof e) throw k();
            if (In[t]) throw new N;
            C.set(In, t, e);
        }), In;
    }
    const In = {
        ref(t, e, n) {
            if (ut(t)) ye(t, void 0, [ e ]); else {
                if (!at(t)) throw k();
                Oe(t, "value", e);
            }
        }
    };
    Bn({
        html(t, e, n) {
            Fn(wn)(e, t);
        },
        text(t, e, n) {
            Fn(bn)(e, t);
        }
    });
    const Wn = P("eventlisteners");
    function $n(t, e, n) {
        !function(t, e, n) {
            const r = t;
            n.forEach(n => {
                if (!ut(n)) throw k();
                Pe(r, Wn) || Oe(r, Wn, []), xe(t, Wn).push([ e, n ]), xn(t, e, n);
            });
        }(t, e, Dn(n));
    }
    const Kn = P("bindstate");
    function zn(t) {
        throw k();
    }
    function Un(t, e) {
        if (ft(t)) return t.map(t => Un(t)).flat(1 / 0);
        if (st(t) || lt(t)) {
            return Pn(t);
        }
        if (Ue(t)) {
            const e = t, n = Pn(y(e));
            Mn(e, () => {
                const t = e;
                Hn(r) && function(t, e) {
                    t.nodeValue = y(e);
                }(n, y(t));
            });
            const r = n;
            return Oe(r, Kn, new x), xe(r, Kn).add(e), n;
        }
        if (nn(t)) {
            let {type: o} = t;
            ut(o) && (o = Er(o));
            let i = void 0;
            if ("string" == typeof o) {
                if ("script" === o) return Cn();
                if ("svg" === o) i = _n(Tn, "svg"); else if ("math" === o) i = _n(Sn, "math"); else {
                    if ("" === o || "html" === o) {
                        const e = Cn();
                        return Ln(Un(t.children), e), e;
                    }
                    i = e ? _n(e, o) : function(t) {
                        return w.createElement(t);
                    }(o);
                }
            } else if ("function" == typeof o) {
                at(o.defaultProps) && E.assign(t.props, L.parse(L.stringify(n({}, o.defaultProps, {}, t.props))));
                const e = L.parse(L.stringify(n({}, t.props, {}, E.fromEntries(E.entries(t.bindattr).map(([t, e]) => [ t, e.value ])))));
                i = function(t, e, n) {
                    let r = t;
                    if (ut(r) && (r = Er(r)), sn(t = r)) return gn(t), be(t, [ e, n ]);
                    throw k();
                }(o, e, t.children);
            } else zn();
            return o && (ut(o) || lt(o)) && (ut(r = o) && xe(r, yn) === yn || i && Ln(t.children.map(t => "svg" === o && nn(t) ? Un(t, Tn) : "math" === o && nn(t) ? Un(t, Sn) : e && nn(t) ? Un(t, e) : Un(t)), i)), 
            i && function(t, e) {
                e.element.push(t), ((t, e) => {
                    E.entries(e.directives).forEach(([n, r]) => {
                        if (!ut(In[n])) throw new N;
                        In[n](r, t, e);
                    });
                    const n = jt(t);
                    E.assign(n, e.props), E.entries(e.bindattr).forEach(([e, r]) => {
                        n[e] = r.valueOf(), Mn(r, () => {
                            const o = r;
                            Hn(t) && (n[e] = o.valueOf());
                        });
                    }), E.entries(e.onevent).forEach(([e, n]) => {
                        $n(t, e, n);
                    });
                })(t, e), [ ...E.values(e.bindattr), ...E.values(e.directives) ].flat(1 / 0).filter(t => Ue(t)).forEach(e => {
                    Pe(t, Kn) || Oe(t, Kn, new x), xe(t, Kn).add(e);
                });
            }(i, t), i;
        }
        var r;
        zn();
    }
    const Vn = new j;
    const Gn = new j;
    function qn(t, e, n) {
        const r = t = t.toLowerCase();
        xe(Vn, r) || Oe(Vn, t, new x), e ? xe(Vn, r).add(function(t) {
            const e = Gn.get(t);
            if (e) return e;
            {
                const e = d.createObjectURL(new v([ t ], {
                    type: "text/css"
                }));
                return Gn.set(t, e), e;
            }
        }(e)) : n && xe(Vn, r).add(n);
    }
    function Zn(t, e) {
        return t.map(t => {
            if (function(t) {
                return "CSSStyleRule" === ht(t);
            }(t)) {
                return function(t, e) {
                    const n = t.selectorText, r = t.cssText.slice(n.length), o = n.split(",").map(t => {
                        let n = e + " " + t;
                        return t.startsWith("*") && (n = n + "," + t.replace("*", e)), n;
                    }).join(",");
                    return {
                        selectorText: o,
                        cssText: o + r,
                        [P.toStringTag]: "CSSStyleRule"
                    };
                }(t, e);
            }
            return function(t) {
                return "CSSMediaRule" === ht(t);
            }(t) ? function(t, e) {
                const n = Zn([ ...t.cssRules ], e), r = t.conditionText;
                return {
                    cssText: t.cssText.slice(0, 7) + r + "{" + cn(n) + "}",
                    conditionText: r,
                    cssRules: n,
                    [P.toStringTag]: "CSSMediaRule"
                };
            }(t, e) : function(t) {
                return "CSSImportRule" === ht(t);
            }(t) ? void qn(e, void 0, t.href) : t;
        }).filter(T);
    }
    function Jn(t) {
        const e = Un(Cr("style", [ t ]));
        return En(w.implementation.createHTMLDocument("").documentElement, e), b.from(xe(xe(e, "sheet"), "cssRules"));
    }
    const Xn = new j;
    function Qn(t, e) {
        qn(e, function(t, e) {
            const n = Xn.get(t);
            if (n) return n;
            {
                const n = cn(Zn(Jn(t), e).filter(T));
                return Xn.set(t, n), n;
            }
        }(t, e));
    }
    function Yn(t, e) {
        return S.all([ ...xe(Vn, t) ].map(t => kn('link[rel="stylesheet"][href="'.concat(t, '"]')).length ? S.resolve() : function(t, e) {
            return new S(n => {
                const r = () => {
                    t.onload = t.onerror = null, n();
                };
                t.onload = r, t.onerror = r, En(e, t);
            });
        }(function(t) {
            return Un(Cr("link", {
                href: t,
                rel: "stylesheet"
            }));
        }(t), e)));
    }
    function tr(t) {
        return new _(t, {
            set: () => !0,
            defineProperty: () => !1,
            deleteProperty: () => !1,
            setPrototypeOf: () => !1
        });
    }
    function er(t) {
        return S.resolve().then(() => t());
    }
    function nr(t) {
        if (ft(t)) t.forEach(t => {
            nr(t);
        }); else if (jn(t)) {
            if (function(t) {
                Pe(t, Wn) && xe(t, Wn).forEach(([e, n]) => {
                    xn(t, e, n);
                });
            }(t), Pe(t, Kn) && xe(t, Kn).forEach(t => {
                Rn(t), t[qe]();
            }), Pe(t, pr) && xe(t, pr).forEach(t => {
                Rn(t);
            }), Pe(t, hr)) {
                xe(t, hr).forEach(([t, e]) => {
                    const n = ve.get(e);
                    n && t[We](n);
                });
            }
            nr(Nn(t));
        }
    }
    function rr(t) {
        if (ft(t)) t.forEach(t => {
            rr(t);
        }); else if (jn(t)) {
            if (function(t) {
                Pe(t, Wn) && xe(t, Wn).forEach(([e, n]) => {
                    !function(t, e, n) {
                        t.removeEventListener(e, n);
                    }(t, e, n);
                });
            }(t), Pe(t, pr) && xe(t, pr).forEach(t => {
                !function(t) {
                    t[Je]();
                }(t);
            }), Pe(t, hr)) {
                xe(t, hr).forEach(([t, e]) => {
                    const n = ve.get(e);
                    n && t[$e](n);
                });
            }
            rr(Nn(t));
        }
    }
    const or = P("readystate");
    var ir;
    const sr = P("attributeChanged"), cr = P("firstinstalled");
    function ar(t) {
        ur.prototype.connectedCallback.call(t);
    }
    function lr(t) {
        ur.prototype.disconnectedCallback.call(t);
    }
    class ur extends HTMLElement {
        constructor() {
            super(), this[ir] = !1;
            const t = xe(this.constructor, "defaultProps"), e = jt(this);
            at(t) && E.assign(e, t), new MutationObserver(t => {
                t.forEach(t => {
                    if ("attributes" == t.type) {
                        const e = xe(this, sr);
                        let n = t.attributeName;
                        n && ut(e) && e.call(this, n);
                    }
                });
            }).observe(this, {
                attributes: !0
            });
        }
        disconnectedCallback() {
            er(() => {
                rr(this);
            });
        }
        connectedCallback() {
            er(() => {
                if (!this[or]) {
                    this[or] = !0;
                    const t = xe(this, cr);
                    ut(t) && er(() => {
                        t.call(this);
                    });
                }
                nr(this);
            });
        }
    }
    ir = or;
    const fr = P("waittranformcss"), hr = P("innerwatchrecord"), pr = P("innerstate"), dr = P("attributes"), vr = P("innerelement"), gr = P("innervdom"), mr = P("mounted"), yr = P("unmounted");
    function br(t) {
        var e, n, r;
        if (ut(t)) {
            const o = ge.get(t);
            if (o) return o;
            const i = xe(t, "defaultProps"), s = xe(t, "css");
            class c extends ur {
                constructor(n = {}, o = []) {
                    super(), this[e] = {}, this[r] = !1;
                    const i = xe(this.constructor, "css");
                    if (i) {
                        const t = this.tagName.toLowerCase();
                        xe(Vn, t) || (Oe(Vn, t, new x), this[fr] = () => er(() => {
                            Qn(i, t);
                        }));
                    }
                    const s = jt(this);
                    at(n) && E.assign(s, n);
                    const c = s;
                    ke = !0, He();
                    const a = E.fromEntries(E.entries(c).map(([t]) => [ t, (() => {
                        const e = jt(this), n = new Qe;
                        return we(n, "value", {
                            get: () => xe(e, t),
                            configurable: !0
                        }), n;
                    })() ]));
                    this[dr] = a;
                    const l = tr(E.fromEntries(E.entries(a).map(([t, e]) => [ t, tr(e) ])));
                    let u;
                    try {
                        u = ye(t, void 0, [ l, o.flat(1 / 0) ]);
                    } catch (t) {
                        throw Re(), t;
                    }
                    if (!on(u = Dn(u))) throw Re(), k();
                    {
                        const t = Dn(u);
                        this[gr] = t.flat(1 / 0).filter(T), this[mr] = [ ...De ], this[yr] = [ ...Le ], 
                        this[pr] = [ ...je ], this[hr] = [ ...Ne ], Re();
                    }
                }
                [(e = dr, n = yn, r = or, cr)]() {
                    const t = () => (bn(this, ""), Yn(r, w.head)), e = () => {
                        Ln(this[vr], this, !1), this[fr] = void 0;
                    };
                    if (!this[vr]) {
                        const t = this[gr];
                        t && (this[vr] = Un(t).flat(1 / 0), this[gr] = []);
                    }
                    const n = xe(this.constructor, "css"), r = this.tagName.toLowerCase();
                    if (n) {
                        const n = this[fr];
                        n ? n().then(t).then(e) : S.resolve(t).then(e);
                    } else Ln(this[vr], this);
                }
                connectedCallback() {
                    er(() => {
                        ar(this), this[mr].forEach(t => {
                            er(t);
                        });
                    });
                }
                disconnectedCallback() {
                    er(() => {
                        lr(this), this[yr].forEach(t => {
                            er(t);
                        });
                    });
                }
                [sr](t) {
                    if (this[or]) {
                        const e = this[dr][t];
                        e && e[qe]();
                    }
                }
            }
            return c[n] = yn, c.css = lt(s) && s ? s : void 0, c.defaultProps = at(i) ? L.parse(L.stringify(i)) : void 0, 
            ge.set(t, c), c;
        }
        throw k();
    }
    var wr = t => Er(t);
    function Er(t) {
        if (sn(t)) return t;
        if (ut(t)) return br(t);
        throw k();
    }
    function Cr(t, e, ...n) {
        return ut(t) && (t = Er(t)), ft(e) ? ye(_r, void 0, [ t, void 0, [ ...e, ...n ].flat(1 / 0) ]) : ye(_r, void 0, [ t, e, ...n ]);
    }
    function _r(t, e = {}, ...n) {
        let r = lt(t) || ut(t) ? t : "";
        const o = ot(e) ? e : {}, i = n.flat(1 / 0).map(t => 0 === t ? "0" : t).filter(t => !!t);
        return lt(r) && (r = r.trim().toLowerCase()), "" === r ? i : ye(rn, void 0, [ r, o, i ]);
    }
    const Pr = P("truevdom"), Tr = P("falsevdom"), Sr = P("trueele"), xr = P("falseele"), Or = P("handletrue"), Nr = P("handlefalse");
    function kr(t, e, n) {
        var r, o, i, s;
        if (!Ue(t) && !ct(t)) throw k();
        [ e, n ].forEach(t => {
            if (!it(t) && !on(t)) throw new k;
        });
        const c = {
            true: e,
            false: n
        }, a = xe(c, "true"), l = xe(c, "false");
        class u extends ur {
            constructor() {
                super(...arguments), this[o] = !1, this[i] = [ a ].flat(1 / 0).filter(T), this[s] = [ l ].flat(1 / 0).filter(T);
            }
            [(r = yn, o = or, i = Pr, s = Tr, Nr)]() {
                wn(this, ""), this[Tr] && (this[xr] || (this[xr] = Un(this[Tr]), this[Tr] = []));
                const t = this[xr];
                Ln(t, this), nr(t), this[Sr] && rr(this[Sr]);
            }
            [Or]() {
                wn(this, ""), this[Pr] && (this[Sr] || (this[Sr] = Un(this[Pr]), this[Pr] = []));
                const t = this[Sr];
                Ln(t, this), nr(t), this[xr] && rr(this[xr]);
            }
            [cr]() {
                const t = jt(this);
                !0 === t.value ? xe(this, Or).call(this) : t.value || xe(this, Nr).call(this);
            }
            connectedCallback() {
                ar(this);
            }
            disconnectedCallback() {
                lr(this);
            }
            [sr](t) {
                if (this[or] && "value" === t) {
                    const t = jt(this);
                    !0 === t.value ? this[Or]() : t.value || this[Nr]();
                }
            }
        }
        return u[r] = yn, Cr(u, {
            value: t
        });
    }
    function Dr(t) {
        return new _(t, {
            getOwnPropertyDescriptor: (t, e) => rt(e) ? void 0 : Ce(t, e),
            ownKeys(t) {
                let e = xe(t, "value");
                const n = at(e) ? e : e.__proto__;
                return b.from(new x([ ...Te(t), ...Te(n) ]));
            },
            has(t, e) {
                const n = xe(t, "value"), r = at(n) ? n : n.__proto__;
                return Pe(t, e) || Pe(r, e);
            },
            get(t, e) {
                if (Pe(t, e)) return xe(t, e);
                {
                    const n = xe(t, "value"), r = E(n);
                    if (Pe(r, e)) {
                        const t = xe(r, e);
                        return ut(t) ? t.bind(r) : t;
                    }
                }
            }
        });
    }
    function Lr(t, e, n) {
        if (!ft(t) && !Ue(t) || !ut(e)) throw k();
        const r = Dn(t);
        if (!r.length) throw new N;
        return function(t, e, n) {
            const r = new Qe, o = () => {
                const n = ye(e, void 0, t.map(t => t.valueOf())), r = Ue(n) ? n.valueOf() : n;
                if (at(r) || nt(r)) return r;
                throw k();
            };
            let i = o();
            return we(r, "value", {
                set: ut(n) ? n : void 0,
                get: o,
                configurable: !0
            }), t.forEach(t => {
                Mn(t, () => {
                    let t = o();
                    t !== i && (r[qe](), i = t);
                });
            }), Dr(r);
        }(r, e, n);
    }
    const jr = x.prototype, Ar = j.prototype;
    function Mr(t) {
        return t instanceof j;
    }
    function Rr(t) {
        return t instanceof x;
    }
    function Hr(t) {
        return b.isArray(t);
    }
    const Fr = i.Reflect, {ownKeys: Br, deleteProperty: Ir, apply: Wr, construct: $r, defineProperty: Kr, get: zr, getOwnPropertyDescriptor: Ur, getPrototypeOf: Vr, has: Gr, set: qr, setPrototypeOf: Zr} = Fr;
    function Jr(t) {
        return "object" == typeof t && null !== t;
    }
    function Xr(t) {
        return "function" == typeof t;
    }
    function Qr(t, e, n = [], r = t) {
        if (!Xr(e)) throw N();
        if (t instanceof S || function(t) {
            return t instanceof u;
        }(t) || function(t) {
            return t instanceof l;
        }(t)) return t;
        if (Xr(t) || Jr(t)) {
            let o;
            return Rr(t) ? (o = new x([ ...t ]), qr(o, "add", i => (jr.add.call(t, i), e(r, n, void 0, void 0), 
            jr.add.call(o, i))), qr(o, "delete", i => (jr.delete.call(t, i), e(r, n, void 0, void 0), 
            jr.delete.call(o, i))), qr(o, "clear", () => (jr.clear.call(t), e(r, n, void 0, void 0), 
            jr.clear.call(o)))) : Mr(t) ? (o = new j([ ...t ]), qr(o, "clear", () => (Ar.clear.call(t), 
            e(r, n, void 0, void 0), Ar.clear.call(o))), qr(o, "set", (i, s) => (Ar.set.call(t, i, s), 
            e(r, n, void 0, void 0), Ar.set.call(o, i, s))), qr(o, "delete", i => (Ar.delete.call(t, i), 
            e(r, n, void 0, void 0), Ar.delete.call(o, i)))) : o = Hr(t) ? [] : Xr(t) ? () => {} : {}, 
            Rr(t) || Mr(t) || Zr(o, null), new _(o, {
                defineProperty: (o, i, s) => (e(r, [ ...n, y(i) ], Gr(s, "value") ? s.value : Xr(s.get) ? s.get() : void 0, zr(t, i)), 
                Kr(t, i, s)),
                deleteProperty: (o, i) => (e(r, [ ...n, y(i) ], void 0, zr(t, i)), Ir(t, i)),
                ownKeys: () => Br(t),
                has: (e, n) => Gr(t, n),
                getPrototypeOf: () => Vr(t),
                setPrototypeOf: (e, n) => Zr(t, n),
                construct(e, n) {
                    if (Xr(t)) return $r(t, n);
                },
                apply(e, n, r) {
                    if (Xr(t)) return Wr(t, n, r);
                },
                getOwnPropertyDescriptor(e, n) {
                    var r = Ur(t, n);
                    return Hr(t) && "length" === n ? r : r ? (r.configurable = !0, r) : void 0;
                },
                set: (o, i, s) => (Xr(e) && e(r, [ ...n, y(i) ], s, zr(t, i)), qr(t, i, s)),
                get(r, i) {
                    var s = zr(t, i);
                    return Xr(s) && (Rr(t) || Mr(t)) ? zr(o, i).bind(o) : Xr(s) || Jr(s) ? Qr(s, e, [ ...n, y(i) ], t) : s;
                }
            });
        }
        return t;
    }
    function Yr(t, e) {
        if (!Xr(e)) throw N();
        if (!Xr(_)) throw N();
        return Xr(t) || Jr(t) ? Qr(t, e) : t;
    }
    const to = x.prototype;
    function eo(t) {
        return function t(e) {
            if (nt(e) || ut(e)) return Dr(new _(new Qe(e), {
                defineProperty: () => !1,
                deleteProperty: () => !1,
                set(t, n, r) {
                    if ("value" === n && (nt(r) && nt(e) || ut(r) && ut(e))) return t[n] !== r && (Oe(t, n, r), 
                    t[qe]()), !0;
                    throw k();
                },
                setPrototypeOf: () => !1
            }));
            if (Ue(e)) return t(e.valueOf());
            if (at(e)) return function(t) {
                const e = new Qe(t);
                let n = t;
                const r = ot(t) && E.values(t).some(t => Ue(t)), o = E.entries(t).filter(t => {
                    return Ue(t[1]);
                });
                r && (n = E.assign({}, t), o.forEach(([t, e]) => {
                    we(n, t, {
                        enumerable: !0,
                        get: () => e.valueOf(),
                        set: t => {
                            e.value = t;
                        },
                        configurable: !0
                    });
                })), r && o.forEach(([t, n]) => {
                    Mn(n, () => {
                        e[qe](y(t));
                    });
                }), e.value = n;
                const i = {
                    ownKeys: t => b.from(new x([ ...Te(t), ...Te(xe(t, "value")) ])),
                    setPrototypeOf: () => !1,
                    defineProperty: () => !1,
                    getOwnPropertyDescriptor: (t, e) => {
                        if (rt(e)) return;
                        const n = xe(t, "value"), r = Ce(t, e) || Ce(n, e);
                        return r && (r.configurable = !0), r;
                    },
                    deleteProperty: (t, e) => {
                        const n = xe(t, "value");
                        return !Pe(n, e) || (Ee(n, e), t[qe](y(e)), !0);
                    },
                    has: (t, e) => {
                        const n = xe(t, "value");
                        return Pe(t, e) || Pe(n, e);
                    },
                    get: (t, e) => {
                        const n = xe(t, "value"), r = ft(n) || ot(n);
                        if ("value" === e && r) return Yr(xe(t, e), (e, n) => {
                            t[qe](n[0]);
                        });
                        if (Pe(t, e)) return xe(t, e);
                        if (Pe(n, e)) {
                            const o = xe(n, e);
                            if (!pt(n)) return r && (ft(o) || ot(o)) ? Yr(o, () => {
                                t[qe](y(e));
                            }) : o;
                            if ("add" !== e && "clear" !== e && "delete" !== e) return ut(o) ? o.bind(n) : o;
                            switch (e) {
                              case "add":
                                return (r => {
                                    if (!to.has.call(n, r)) {
                                        const o = to[e].call(n, r);
                                        return t[qe](), o;
                                    }
                                }).bind(n);

                              case "delete":
                                return (r => {
                                    if (to.has.call(n, r)) {
                                        const o = to[e].call(n, r);
                                        return t[qe](), o;
                                    }
                                }).bind(n);

                              case "clear":
                                return (() => {
                                    if (n.size) {
                                        const r = to[e].call(n);
                                        return t[qe](), r;
                                    }
                                }).bind(n);
                            }
                        }
                    },
                    set: (e, n, r) => {
                        Ue(r) && (r = r.valueOf());
                        const o = xe(e, "value");
                        if ("value" === n && at(r) && (ft(t) && ft(r) || !ft(t) && !ft(r))) return e[n] !== r && (Oe(e, n, r), 
                        e[qe]()), !0;
                        if (Pe(e, n)) throw k();
                        return o[n] !== r && (Oe(o, n, r), e[qe](y(n))), !0;
                    }
                };
                return new _(e, i);
            }(e);
            throw N();
        }(t);
    }
    const no = P("listvalueattr"), ro = P("listinnervdom"), oo = P("listinnerelement"), io = P("cached_realele");
    function so(t, e) {
        var n, r, o, i;
        if (!ft(t) && !pt(t) && !Ue(t)) throw new k;
        if (!ut(e)) throw new k;
        const s = (t, n) => {
            const r = e(t, n);
            return function(t) {
                if (!t) throw new k;
            }(nn(r)), r;
        };
        class c extends ur {
            constructor() {
                super(...arguments), this[n] = new j, this[r] = eo([]), this[i] = !1;
            }
            [(n = io, r = no, o = yn, i = or, sr)](t) {
                if (this[or] && "value" === t) {
                    const t = jt(this).value;
                    if (!ft(t)) throw new k;
                    Oe(this[no], "value", t);
                    const e = On(this), n = t.length, r = e.length;
                    if (n > r) {
                        b(n).fill(void 0).map((t, e) => e).slice(r).map(t => {
                            const e = xe(this[io], t);
                            if (e) return e;
                            {
                                const e = Un(function(t, e) {
                                    return s(Lr(e[no], e => e[t]), t);
                                }(t, this));
                                return Oe(this[io], t, e), e;
                            }
                        }).forEach(t => En(this, t));
                    } else n < r && On(this).slice(n).forEach(t => (function(t) {
                        t.remove();
                    })(t));
                }
            }
            disconnectedCallback() {
                er(() => {
                    lr(this);
                });
            }
            [cr]() {
                const t = jt(this).value;
                if (!ft(t)) throw new k;
                Oe(this[no], "value", t), this[ro] = t.map((t, e) => s(Lr(this[no], t => t[e]), e)), 
                this[oo] = Un(this[ro]), E.entries(this[oo]).forEach(([t, e]) => {
                    Oe(this[io], H(t), e);
                }), Ln(this[oo], this), this[oo] = [], this[ro] = [];
            }
            connectedCallback() {
                ar(this);
            }
        }
        return c.defaultProps = {
            value: []
        }, c[o] = yn, Cr(c, {
            value: t
        });
    }
    const co = P("cancel_watch"), ao = P("cached_class_element"), lo = P("switch_mount");
    function uo(t) {
        var e, n, r;
        if (!Ue(t)) throw new k;
        class o extends ur {
            constructor() {
                super(...arguments), this[e] = new a, this[r] = !1;
            }
            disconnectedCallback() {
                er(() => {
                    lr(this), ut(this[co]) && this[co]();
                });
            }
            [(e = ao, n = yn, r = or, lo)](t) {
                t = Er(t);
                const e = this[ao].get(t);
                if (e) Ln(e, this); else {
                    const e = Un(Cr(t));
                    this[ao].set(t, e), Ln(e, this);
                }
            }
            [cr]() {
                const e = () => {
                    this[lo](t.valueOf());
                };
                e(), this[co] = Mn(t, () => {
                    e();
                });
            }
            connectedCallback() {
                ar(this);
            }
        }
        return o[n] = yn, Cr(o);
    }
    function fo(t) {
        return {
            value: t
        };
    }
    var vo = "function" == typeof j, go = vo ? new j : {};
    function wo(t, e, n, r, o, i) {
        if (!Ue(o)) throw k();
        if (!t.includes(i.type)) throw k();
        Oe(i.bindattr, e, o), r.forEach(t => {
            const e = Dn(i.onevent[t]);
            Oe(i.onevent, t, Dn([ ...e, t => o.value = xe(t.target, n) ]).filter(T));
        });
    }
    Bn({
        value(t, e, n) {
            wo([ "input", "textarea", "select" ], "value", "value", [ "change", "input" ], t, n);
        },
        checked(t, e, n) {
            wo([ "input" ], "checked", "checked", [ "change" ], t, n);
            const r = Dn(n.onevent.click);
            Oe(n.onevent, "click", Dn([ ...r, t => {
                const e = t.target, n = t.target.name;
                n && kn("input[name=".concat(n, "]")).filter(t => t !== e).forEach(t => {
                    t.dispatchEvent(new f("change"));
                });
            } ]).filter(T));
        }
    });
    console.log([ Cr, Cr ]);
    function useMousePosition() {
        const x = eo(0);
        const y = eo(0);
        function update(e) {
            x.value = e.pageX;
            y.value = e.pageY;
        }
        Ae(() => {
            window.addEventListener("mousemove", update);
        });
        Me(() => {
            window.removeEventListener("mousemove", update);
        });
        return {
            x: x,
            y: y
        };
    }
    const mycomapp = wr(() => {
        const {x: x, y: y} = useMousePosition();
        const plus = Lr(x, x => {
            return x + 100;
        });
        const multi = Lr([ x, y ], (x, y) => {
            return x * y;
        });
        let count = 0;
        const cancelwatch = Mn([ x, y, multi, plus ], (...args) => {
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
        return Cr("div", null, Cr("h3", null, " \u9f20\u6807\u4f4d\u7f6e"), Cr("h2", null, "x:", x), Cr("h1", null, "y:", y), Cr("p", null, "x+100 \u662f", plus), Cr("p", null, "x*y \u662f", multi));
    });
    mycomapp.css = "\n*{font-size:80px !important;}\np{color:blue !important;}\n";
    var vdom = Cr(mycomapp);
    document.body.appendChild(An(vdom, document.createElement("div")));
    const refarray = [];
    const liststate = eo(Array(10).fill(undefined).map((v, i) => i));
    Mn(liststate, a => console.dir([ liststate, a ]));
    const testlistvdom = Cr("div", null, Cr("button", {
        _text: "push",
        onclick: () => {
            liststate.push(Math.random());
        }
    }), Cr("button", {
        _text: "pop",
        onclick: () => {
            liststate.pop();
        }
    }), Cr("button", {
        _text: "shift",
        onclick: () => {
            liststate.shift();
        }
    }), Cr("button", {
        _text: "unshift",
        onclick: () => {
            liststate.unshift(Math.random());
        }
    }), so(liststate, (value, index) => Cr("div", {
        _ref: ele => {
            refarray.length = liststate.length;
            refarray[index] = ele;
        }
    }, [ "item:", "value:", value, "index:", index ])));
    const weathercondition = eo(true);
    const vdom$1 = [ kr(weathercondition, testlistvdom), Cr("", null, Cr("button", {
        onclick: () => {
            weathercondition.value = !weathercondition.value;
        }
    }, "condition toggle")) ];
    document.body.appendChild(An(vdom$1, document.createElement("div")));
    console.log(vdom$1, refarray, liststate);
    var css = '@charset "UTF-8";@import url(https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-6556dfa9be535e551ffffaadfecdad99.min.css);@import url(https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-frameworks-a2fba223d5af91496cac70d4ec3624df.min.css);@import url(https://cdn.staticfile.org/mui/3.7.1/css/mui.min.css);pre{text-align:left!important}button,div,h1,h2,h3,h4,h5,h6,input{text-align:center}p{color:#000!important}@-webkit-keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.flowerpassword a{color:#42b983}.App-header{background-color:#fff}nav{width:100%}#\u56fe\u7247\u5217\u8868200 img{min-height:150px;min-width:150px;height:auto;width:auto;max-width:100%;max-height:200px}#my\u5bfc\u822a\u680f .navbar-nav li a{margin-left:2px;margin-right:2px}h1,h2{font-weight:400}ul{list-style-type:none;padding:0}li{display:inline-block;margin:0 10px}*{-webkit-user-select:text;-ms-user-select:text;user-select:text}.example{color:red}body{padding:0}*{font-family:"Microsoft Yahei,PingFangSC-Regular,arial, verdana, sans-serif"}#my\u5bfc\u822a\u680f{overflow:auto;max-height:100%;padding-right:0;padding-left:0}.App{text-align:center}.App-logo{-webkit-animation:App-logo-spin 20s linear infinite;animation:App-logo-spin 20s linear infinite;height:40vmin;pointer-events:none}.App-header{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:calc(10px + 2vmin)}.App-link{color:#61dafb}.flowerpassword body,.flowerpassword html{background-color:#fff}.flowerpassword body{font:14px/1.5 Tahoma,Helvetica,Arial,\\5b8b\\4f53;color:#000}.flowerpassword a,.flowerpassword a:hover{color:#09c;text-decoration:none}.flowerpassword .left{float:left}.flowerpassword .right{float:right}.flowerpassword .clear{clear:both}.flowerpassword header{text-align:left;padding:0;margin:15px auto}.flowerpassword #logo{height:39px}.flowerpassword #shortcuts{margin:15px 0 0 15px}.flowerpassword #nav{float:center;margin-top:10px}.flowerpassword #nav li{margin:0 7px}.flowerpassword #nav li a{font-size:22px;color:#09c}.flowerpassword #nav li.active a,.flowerpassword #nav li.active a:hover{background-color:#09c;color:#fff}.flowerpassword #nav li a:hover{background-color:#79c6df;color:#fff}.flowerpassword #index-box{background-color:#fff;width:940px;clear:both;box-shadow:0 0 4px 2px #ddd;border:1px solid #ddd}.flowerpassword #index-box .float-box{margin:20px 0 20px 20px;display:inline}.flowerpassword #index-box #content-nav{margin:0;width:200px}.flowerpassword #index-box #content-nav li a{background-color:#e5ecdc}.flowerpassword #index-slider{width:940px;height:200px;overflow:hidden;position:relative}.flowerpassword #index-slider ul{list-style:none;margin:0;position:absolute;top:0;left:0}.flowerpassword #index-slider li{width:940px;height:200px;float:left}.flowerpassword #index-slider #pagination{top:160px;left:800px}.flowerpassword #index-slider ul#pagination li{width:16px;height:16px;border-radius:1em;background-color:#fff;box-shadow:0 0 1px 2px #ccc;margin-right:18px;margin-top:4px}.flowerpassword #index-slider ul#pagination li.active{width:24px;height:24px;margin-top:0}.flowerpassword #index-slider ul#pagination li:hover{background-color:#ddd;cursor:pointer}.flowerpassword #index-report{width:680px;height:70px;margin-top:20px;overflow:hidden;position:relative;background-color:#e5ecdc}.flowerpassword #index-report ul{list-style:none;margin:0;position:absolute;top:0;left:0}.flowerpassword #index-report li{width:680px;height:70px;text-align:center;float:left;font-size:32px;color:#666;font-family:\xe5\xbe\xae\xe8\xbd\xaf\xe9\u203a\u2026\xe9\xbb\u2018,\xe9\xbb\u2018\xe4\xbd\u201c;line-height:70px}.flowerpassword #index-report-pagination{list-style:none;margin-left:35px;text-align:center}.flowerpassword #index-report-pagination li{height:65px;float:left;margin-right:45px;cursor:pointer}.flowerpassword #index-report-pagination li img{margin-top:30px}.flowerpassword #index-button{margin:40px 0 30px;text-align:center}.flowerpassword #index-button a{margin:0 50px}.flowerpassword #tab{margin-top:30px}.flowerpassword #tab li a{margin-right:10px;border-bottom-color:#ddd;color:#666}.flowerpassword #tab li a:hover{background-color:#f2f2f2;color:#333;border-color:#ddd #ddd transparent}.flowerpassword #tab li.active a{background-color:#f2f2f2;color:#666;border-bottom-color:transparent}.flowerpassword #content-nav{list-style:none;margin:20px 0 0}.flowerpassword #content-nav li a{color:#666;padding:11px 0 11px 60px;display:block;margin-bottom:1px;font-size:22px}.flowerpassword #content-nav li a.active,.flowerpassword #content-nav li a:hover{background-color:#09c!important;color:#fff!important}.flowerpassword h1,.flowerpassword h2{color:#09c;margin:30px 0 12px}.flowerpassword h2{font-size:22px}.flowerpassword h2 span{font-size:22px;color:#fff;margin-right:7px;background-color:#09c;width:33px;height:33px;display:inline-block;text-align:center}.flowerpassword h3{font-size:16px;color:#09c;margin:20px 0}.flowerpassword h3 span{font-size:16px;color:#fff;margin-right:6px;background-color:#09c;width:26px;display:inline-block;text-align:center}.flowerpassword #input span{color:#09c;font-weight:700;font-size:22px;margin:0 20px}.flowerpassword #input input{font-size:14px;padding:5px;margin-left:5px}.flowerpassword #input label{float:none;display:inline;padding-right:5px}.flowerpassword #input p{margin-top:16px}.flowerpassword #input p,.flowerpassword .other{font-size:12px;color:#999}.flowerpassword #code16{display:inline-block;text-align:center}.flowerpassword .code16d{border:2px solid #09c}.flowerpassword .code16d:hover{border:2px solid #ff881c}.flowerpassword #copycode16{color:#000;display:inline-block;padding:0 3px;cursor:pointer}.flowerpassword .copycode16d{background-color:#09c;border:2px solid #09c}.flowerpassword .copycode16d:hover{background-color:#ff881c;border:2px solid #ff881c}.flowerpassword p{font-size:12px;color:#666;margin:20px 0}.flowerpassword #copyOK{color:#f2f2f2;border:2px solid #f2f2f2;display:inline-block;margin-left:16px;padding:0 3px}.flowerpassword .down-button{margin:10px 20px 10px 0}.flowerpassword #get{margin-bottom:100px}.flowerpassword footer{margin:50px 0 30px}.flowerpassword footer p{margin:0 0 5px;color:#999}.flowerpassword footer p span{margin:0 10px}.flowerpassword footer p a{color:#999}.flowerpassword footer p a:hover{color:#333}.jdahd button{border-color:#000}.jdahd *{text-align:center;margin:0;box-sizing:border-box;background-color:transparent}.jdahd body{position:relative;height:100vh;text-align:center}.jdahd h1{text-align:center;margin:20px 0}.jdahd textarea{width:100%;clear:both;margin-bottom:10px;border-radius:7px;padding:15px 10px;font-size:14px;outline:none;-webkit-transition:all .2s ease-in;transition:all .2s ease-in}.jdahd input[type=button]{margin:0 auto;position:relative;vertical-align:top;width:150px;height:60px;padding:0;font-size:22px;font-weight:300;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.25);background:#2980b9;border:0;border-bottom:2px solid #2475ab;cursor:pointer;box-shadow:inset 0 -2px #2475ab}.jdahd input:active{top:1px;outline:none;box-shadow:none}.jdahd input:-ms-input-placeholder,.jdahd textarea:-ms-input-placeholder{color:#fff;font-size:20px;font-weight:300}.jdahd input::-moz-placeholder,.jdahd textarea::-moz-placeholder{color:#fff;font-size:20px;font-weight:300}.jdahd input::-webkit-input-placeholder,.jdahd textarea::-webkit-input-placeholder{color:#fff;font-size:20px;font-weight:300;box-shadow:none;-webkit-appearance:none}.jdahd footer{width:calc(100% - 40px);position:absolute;bottom:20px}.jdahd footer>p a{color:#2980b9;text-decoration:none}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}code{font-family:source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace}.jdahd #my\u5bfc\u822a\u680f{overflow:auto;max-height:100%;padding-right:0;padding-left:0}.jdahd *,.jdahd body{text-align:center}.jdahd h1{font-weight:300;font-size:40px}.jdahd h3{font-weight:700}.jdahd .actions,.jdahd li,.jdahd p,.jdahd textarea{width:100%}.jdahd textarea{border-color:#000;display:block;min-height:250px;margin:1em 0}.jdahd ul.pre li{white-space:pre}.jdahd .checkbox{display:inline-block}.jdahd .actions a{float:right}.jdahd .actions{clear:both}*{font-family:Microsoft Yahei}#nav{float:center}#app{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;margin-top:0}#App-logo{-webkit-animation:App-logo-spin 20s linear infinite;animation:App-logo-spin 20s linear infinite;height:40vmin;pointer-events:none}@keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}*{-webkit-user-select:text!important;-moz-user-select:text;-o-user-select:text;-ms-user-select:text!important;user-select:text!important}body,html{scroll-behavior:smooth}*{font-family:Microsoft Yahei,Helvetica,Tahoma,Arial,PingFang SC,Hiragino Sans GB,Heiti SC,MicrosoftYaHei,WenQuanYi Micro Hei,sans-serif!important}.hljs{display:block;overflow-x:auto;padding:.5em;color:#333;background:#f8f8f8;-webkit-text-size-adjust:none}.diff .hljs-header,.hljs-comment{color:#998;font-style:italic}.css .rule .hljs-keyword,.hljs-keyword,.hljs-request,.hljs-status,.hljs-subst,.hljs-winutils,.nginx .hljs-title{color:#333;font-weight:700}.hljs-hexcolor,.hljs-number,.ruby .hljs-constant{color:teal}.hljs-doctag,.hljs-string,.hljs-tag .hljs-value,.tex .hljs-formula{color:#d14}.hljs-id,.hljs-title,.scss .hljs-preprocessor{color:#900;font-weight:700}.hljs-list .hljs-keyword,.hljs-subst{font-weight:400}.hljs-class .hljs-title,.hljs-type,.tex .hljs-command,.vhdl .hljs-literal{color:#458;font-weight:700}.django .hljs-tag .hljs-keyword,.hljs-rule .hljs-property,.hljs-tag,.hljs-tag .hljs-title{color:navy;font-weight:400}.hljs-attribute,.hljs-name,.hljs-variable,.lisp .hljs-body{color:teal}.hljs-regexp{color:#009926}.clojure .hljs-keyword,.hljs-prompt,.hljs-symbol,.lisp .hljs-keyword,.ruby .hljs-symbol .hljs-string,.scheme .hljs-keyword,.tex .hljs-special{color:#990073}.hljs-built_in{color:#0086b3}.hljs-cdata,.hljs-doctype,.hljs-pi,.hljs-pragma,.hljs-preprocessor,.hljs-shebang{color:#999;font-weight:700}.hljs-deletion{background:#fdd}.hljs-addition{background:#dfd}.diff .hljs-change{background:#0086b3}.hljs-chunk{color:#aaa}#padding0{padding:0!important}@media (max-width:500px){hr#hidewidthless500{display:none}}.article-content{word-break:break-word;line-height:1.75;font-weight:400;font-size:15px;overflow-x:hidden}.article-content h1{margin:1.3rem 0;line-height:1.2}.article-content p{line-height:2.27rem}.article-content hr{border:none;border-top:1px solid #ddd;margin-top:2.7rem;margin-bottom:2.7rem}.article-content embed,.article-content iframe,.article-content img:not(.equation),.article-content video{max-width:100%!important;margin:0}.article-content img.lazyload{visibility:hidden}.article-content img.inited{background-color:#f8f9fa;background-position:50%;background-repeat:no-repeat;visibility:visible}.article-content img.loaded{background-image:none;background-color:transparent}.article-content img.equation{margin:0 .1em;max-width:100%!important;vertical-align:text-bottom}.article-content img:not(.equation){cursor:-webkit-zoom-in;cursor:zoom-in}.article-content figure{margin:2.7rem auto;text-align:center}.article-content figure figcaption{text-align:center;font-size:1rem;line-height:2.7rem;color:#909090}.article-content pre{line-height:1.93rem;overflow:auto}.article-content code,.article-content pre{font-family:Menlo,Monaco,Consolas,Courier New,monospace}.article-content code{font-size:1rem;padding:.26rem .53em;word-break:break-word;color:#4e5980;background-color:#f8f8f8;border-radius:2px;overflow-x:auto}.article-content pre>code{font-size:1rem;padding:.67rem 1.3rem;margin:0;word-break:normal;display:block}.article-content a{color:#259}.article-content a:active,.article-content a:hover{color:#275b8c}.article-content table{display:inline-block!important;font-size:1rem;width:auto;max-width:100%;overflow:auto;border:1px solid #f6f6f6}.article-content thead{background:#f6f6f6;color:#000;text-align:left}.article-content tr:nth-child(2n){background-color:#fcfcfc}.article-content td,.article-content th{padding:1rem .6rem;line-height:2rem}.article-content td{min-width:10rem}.article-content blockquote{margin:1em 0;border-left:4px solid #ddd;padding:0 1.3rem}.article-content blockquote>p{margin:.6rem 0}.article-content ol,.article-content ul{padding-left:2.7rem}.article-content ol li,.article-content ul li{margin-bottom:.6rem}.article-content ol ol,.article-content ol ul,.article-content ul ol,.article-content ul ul{margin-top:.27rem}.article-content pre>code{overflow-x:auto;-webkit-overflow-scrolling:touch;color:#333;background:#f8f8f8}.article-content .hljs-comment,.article-content .hljs-quote{color:#998}.article-content .hljs-keyword,.article-content .hljs-selector-tag,.article-content .hljs-subst{color:#333;font-weight:700}.article-content .hljs-literal,.article-content .hljs-number,.article-content .hljs-tag .hljs-attr,.article-content .hljs-template-variable,.article-content .hljs-variable{color:teal}.article-content .hljs-doctag,.article-content .hljs-string{color:#d14}.article-content .hljs-section,.article-content .hljs-selector-id,.article-content .hljs-title{color:#900;font-weight:700}.article-content .hljs-subst{font-weight:400}.article-content .hljs-class .hljs-title,.article-content .hljs-type{color:#458;font-weight:700}.article-content .hljs-attribute,.article-content .hljs-name,.article-content .hljs-tag{color:navy;font-weight:400}.article-content .hljs-link,.article-content .hljs-regexp{color:#009926}.article-content .hljs-bullet,.article-content .hljs-symbol{color:#990073}.article-content .hljs-built_in,.article-content .hljs-builtin-name{color:#0086b3}.article-content .hljs-meta{color:#999;font-weight:700}.article-content .hljs-deletion{background:#fdd}.article-content .hljs-addition{background:#dfd}.article-content .hljs-emphasis{font-style:italic}.article-content .hljs-strong{font-weight:700}.article-content p{line-height:inherit;margin-top:22px;margin-bottom:22px}.article-content img{max-height:none}.article-content a{color:#0269c8;border-bottom:1px solid #d1e9ff}.article-content code{background-color:#fff5f5;color:#ff502c;font-size:.87em;padding:.065em .4em}.article-content figure{margin:22px auto}.article-content figure figcaption{margin-top:2px;line-height:1.6}.article-content blockquote{color:#666;padding:1px 23px;margin:22px 0;border-left:4px solid #cbcbcb;background-color:#f8f8f8}.article-content blockquote:after{display:block;content:""}.article-content blockquote>p{margin:10px 0}.article-content blockquote.warning{position:relative;border-left-color:#f75151;margin-left:8px}.article-content blockquote.warning:before{position:absolute;top:14px;left:-12px;background:#f75151;border-radius:50%;content:"!";width:20px;height:20px;color:#fff;display:flex;align-items:center;justify-content:center}.article-content ol,.article-content ul{padding-left:28px}.article-content ol li,.article-content ul li{margin-bottom:0;list-style:inherit}.article-content ol li.task-list-item,.article-content ul li.task-list-item{list-style:none}.article-content ol li.task-list-item ol,.article-content ol li.task-list-item ul,.article-content ul li.task-list-item ol,.article-content ul li.task-list-item ul{margin-top:0}.article-content ol li{padding-left:6px}.article-content pre{position:relative;line-height:1.75}.article-content pre>code{padding:15px 12px}.article-content pre>code.hljs[lang]{padding:18px 15px 12px}.article-content pre>code.hljs[lang]:before{content:attr(lang);position:absolute;right:15px;top:2px;color:hsla(0,0%,54.9%,.8)}.article-content pre>code.hljs[lang][lang=bash]:before{content:""}.article-content pre>code.copyable .copy-code-btn{position:absolute;top:6px;right:15px;font-size:12px;line-height:1;cursor:pointer;color:hsla(0,0%,54.9%,.8);-webkit-transition:color .1s;transition:color .1s}.article-content pre>code.copyable .copy-code-btn:hover{color:#8c8c8c}.article-content pre>code.copyable.hljs[lang]:before{right:70px}.article-content h1,.article-content h2,.article-content h3,.article-content h4,.article-content h5,.article-content h6{color:#333;line-height:1.5;margin-top:35px;margin-bottom:10px;padding-bottom:5px}.article-content h1{font-size:30px;margin-bottom:5px}.article-content h2{padding-bottom:12px;font-size:24px;border-bottom:1px solid #ececec}.article-content h3{font-size:18px;padding-bottom:0}.article-content h4{font-size:16px}.article-content h5{font-size:15px}.article-content h6{margin-top:5px}.article-content h1.heading+h2.heading{margin-top:20px}.article-content h1.heading+h3.heading{margin-top:15px}.article-content .heading+.heading{margin-top:0}.article-content h1+:not(.heading){margin-top:25px}@media (max-width:720px){.article-content h1{font-size:24px}.article-content h2{font-size:20px}.article-content h3{font-size:18px}.article-content pre>code .copy-code-btn{display:none}.article-content pre>code.hljs[lang]:before{top:2px;right:15px}}@media (max-width:720px){.article-content pre>code.copyable.hljs[lang]:before{right:1rem}}';
    console.log([ Cr, Cr ]);
    const mycomapp$1 = wr(() => {
        const inputpassword = eo("");
        const inputref = fo();
        const inputref2 = fo();
        console.log(inputref2);
        console.log(inputpassword);
        Mn(inputpassword, console.log);
        const vdom = [ Cr("h1", {
            style: "padding-top: 127.6px;"
        }, Cr("svg", {
            style: "\n      width: 100%;\n      height: 200px;\n  ",
            class: "octicon octicon-book",
            viewBox: "0 0 16 16",
            version: "1.1",
            width: "16",
            height: "16",
            "aria-hidden": "true"
        }, Cr("path", {
            "fill-rule": "evenodd",
            d: "M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"
        })), Cr("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 3046.7 875.7",
            style: "\n      width: 100%;\n      height: 200px;\n  "
        }, Cr("title", null, "logo-on-dark-bg"), Cr("rect", {
            Color: "#FFF",
            x: "0",
            y: "0",
            width: "3046.7",
            height: "875.7"
        }), Cr("path", {
            fill: "#FFF",
            d: "M387 0l387 218.9v437.9L387 875.7 0 656.8V218.9L387 0z"
        }), Cr("path", {
            fill: "#8ED6FB",
            d: "M704.9 641.7L399.8 814.3V679.9l190.1-104.6 115 66.4zm20.9-18.9V261.9l-111.6 64.5v232l111.6 64.4zM67.9 641.7L373 814.3V679.9L182.8 575.3 67.9 641.7zM47 622.8V261.9l111.6 64.5v232L47 622.8zm13.1-384.3L373 61.5v129.9L172.5 301.7l-1.6.9-110.8-64.1zm652.6 0l-312.9-177v129.9l200.5 110.2 1.6.9 110.8-64z"
        }), Cr("path", {
            fill: "#1C78C0",
            d: "M373 649.3L185.4 546.1V341.8L373 450.1v199.2zm26.8 0l187.6-103.1V341.8L399.8 450.1v199.2zM198.1 318.2l188.3-103.5 188.3 103.5-188.3 108.7-188.3-108.7z"
        }), Cr("path", {
            fill: "#F5FAFA",
            d: "M1164.3 576.3h82.5l84.1-280.2h-80.4l-49.8 198.8-53.1-198.8H1078l-53.6 198.8-49.3-198.8h-80.4l83.6 280.2h82.5l52-179.5 51.5 179.5zM1335.2 437c0 84.1 57.3 146.3 147.4 146.3 69.7 0 107.2-41.8 117.9-61.6l-48.8-37c-8 11.8-30 34.3-68.1 34.3-41.3 0-71.3-26.8-72.9-64.3H1608c.5-5.4.5-10.7.5-16.1 0-91.6-49.3-149.5-136.1-149.5-79.9 0-137.2 63.2-137.2 147.9zm77.7-30.6c3.2-32.1 25.7-56.8 60.6-56.8 33.8 0 58.4 22.5 60 56.8h-120.6zm223.5 169.9h69.7v-28.9c7.5 9.1 35.4 35.9 83.1 35.9 80.4 0 137.2-60.5 137.2-146.8 0-86.8-52.5-147.3-132.9-147.3-48.2 0-76.1 26.8-83.1 36.4V188.9h-73.9v387.4h-.1zm71.8-139.3c0-52.5 31.1-82.5 71.8-82.5 42.9 0 71.8 33.8 71.8 82.5 0 49.8-30 80.9-71.8 80.9-45 0-71.8-36.5-71.8-80.9zm247 239.5h73.9V547.3c7 9.1 34.8 35.9 83.1 35.9 80.4 0 132.9-60.5 132.9-147.3 0-85.7-56.8-146.8-137.2-146.8-47.7 0-75.6 26.8-83.1 36.4V296h-69.7v380.5h.1zm71.8-241.1c0-44.5 26.8-80.9 71.8-80.9 41.8 0 71.8 31.1 71.8 80.9 0 48.8-28.9 82.5-71.8 82.5-40.7 0-71.8-30-71.8-82.5zm231.5 54.1c0 58.9 48.2 93.8 105 93.8 32.2 0 53.6-9.6 68.1-25.2l4.8 18.2h65.4V398.9c0-62.7-26.8-109.8-116.8-109.8-42.9 0-85.2 16.1-110.4 33.2l27.9 50.4c20.9-10.7 46.6-19.8 74.5-19.8 32.7 0 50.9 16.6 50.9 41.3v18.2c-10.2-7-32.2-15.5-60.6-15.5-65.4-.1-108.8 37.4-108.8 92.6zm73.9-2.2c0-23 19.8-39.1 48.2-39.1s48.8 14.5 48.8 39.1c0 23.6-20.4 38.6-48.2 38.6s-48.8-15.5-48.8-38.6zm348.9 30.6c-46.6 0-79.8-33.8-79.8-81.4 0-45 29.5-82 77.2-82 31.6 0 53.1 15.5 65.4 26.8l20.9-62.2c-18.2-13.9-47.2-30-88.4-30-85.2 0-149 62.7-149 147.9s62.2 146.3 149.5 146.3c40.7 0 71.3-17.1 87.3-30l-19.8-60.5c-12.4 10.1-34.9 25.1-63.3 25.1zm110.9 58.4h73.9V431.6l93.8 144.7h86.8L2940.6 423l98.6-127h-83.1l-90 117.9v-225h-73.9v387.4z"
        }))), Cr("div", null, Cr("div", null, Cr("noscript", null, "You need to enable JavaScript to run this app."), Cr("div", {
            id: "root"
        }, Cr("div", null, Cr("div", {
            class: "container-fluid fixed-top",
            id: "my\u5bfc\u822a\u680f"
        }, Cr("nav", {
            class: "navbar navbar-default navbar navbar-expand-sm bg-light navbar-light",
            role: "navigation"
        }, Cr("div", null, Cr("a", {
            class: "navbar-brand mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/"
        }, "masx200\u7684", Cr("hr", {
            id: "hidewidthless500"
        }), "github\u4e3b\u9875"), Cr("button", {
            class: "navbar-toggler",
            type: "button",
            "data-toggle": "collapse"
        }, Cr("span", {
            class: "navbar-toggler-icon"
        }))), Cr("div", {
            class: "collapse navbar-collapse",
            id: "example-navbar-collapse",
            style: "display: none;"
        }, Cr("ul", {
            class: "nav navbar-nav",
            id: "allnavbar"
        }, Cr("li", {
            id: "mynav1"
        }, Cr("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-home"
        }, "\u57fa\u4e8eREACT\u7684\u4e3b\u9875")), Cr("li", null, Cr("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-rssreader"
        }, "rss\u9605\u8bfb")), Cr("li", {
            id: "mynav2"
        }, Cr("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-about"
        }, "\u5173\u4e8eREACT")), Cr("li", {
            class: "nav-item"
        }, Cr("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/picalc"
        }, "\u5706\u5468\u7387\u8ba1\u7b97\u591a\u7ebf\u7a0b")), Cr("li", null, Cr("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-huami"
        }, "\u82b1\u5bc6\u7f51\u9875\u7248")), Cr("li", null, Cr("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/decoder"
        }, "JSfuck-and-hieroglyphy-Decoder")), Cr("li", null, Cr("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/jsfuck"
        }, "JSfuck-ENCODER")), Cr("li", null, Cr("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/hieroglyphy"
        }, "hieroglyphy-ENCODER")), Cr("li", null, Cr("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/webpack-react-vue-spa-awesome-config"
        }, "webpack-react-vue- \u6781\u901f\u96f6\u914d\u7f6e\u7684\u5355\u9875\u9762 web\n                        \u5e94\u7528\u6253\u5305\u5de5\u5177")), Cr("li", {
            class: "nav-item"
        }, Cr("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/IMPORTCJSAMDUMD\u52a8\u6001\u5f02\u6b65\u52a0\u8f7d"
        }, "\u52a8\u6001\u5f02\u6b65\u52a0\u8f7d-commonjs\u548cumd\u548camd\u6a21\u5757\u5e93")), Cr("li", {
            class: "nav-item"
        }, Cr("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-simple-global-state-store-hook"
        }, "\u9002\u7528\u4e8eReact\u7684\u6781\u7b80\u5168\u5c40\u72b6\u6001\u7ba1\u7406\u5e93")), Cr("li", {
            class: "nav-item"
        }, Cr("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/excellent-vscode-extensions-for-javascript"
        }, "VScode\u7684\u4f18\u79c0\u6269\u5c55\u63a8\u8350")), Cr("li", {
            class: "nav-item"
        }, Cr("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/vue-simple-global-state-store-manager"
        }, "\u9002\u7528\u4e8eVue\u7684\u6781\u7b80\u5168\u5c40\u72b6\u6001\u7ba1\u7406\u5e93")), Cr("li", null, Cr("a", {
            href: "./my-vue-router-project/index.html",
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined"
        }, "\u57fa\u4e8evue\u7684\u4e3b\u9875")), Cr("li", null, Cr("a", {
            href: "./my-vue-router-project/index.html#/about",
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined"
        }, "\u5173\u4e8eVue")))))), Cr("div", {
            class: "container",
            id: "my\u4e3b\u4f53",
            style: "padding-top: 127.6px;"
        }, Cr("div", {
            class: "hello flowerpassword"
        }, Cr("h1", null, "\u82b1\u5bc6 \u4e0d\u4e00\u6837\u7684\u5bc6\u7801\u7ba1\u7406\u5de5\u5177"), Cr("div", {
            id: "rong1",
            class: "container",
            style: "text-align: center;"
        }, Cr("div", {
            id: "rong2"
        }, Cr("h2", null, Cr("span", null, "1"), "\u8f93\u5165"), Cr("div", {
            id: "input"
        }, Cr("p", null), Cr("h3", null, "\u8bb0\u5fc6\u5bc6\u7801"), Cr("p", null), Cr("p", null, Cr("input", {
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
        })), Cr("p", null), Cr("span", null, "+"), Cr("h3", null, "\u533a\u5206\u4ee3\u53f7"), Cr("p", null), Cr("p", null, Cr("input", {
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
        }))), Cr("br", null), Cr("p", null), Cr("h2", null, Cr("span", null, "2"), "\u83b7\u53d6"), Cr("p", null), Cr("div", {
            id: "get"
        }, Cr("p", {
            id: "tuijian"
        }), Cr("p", null), Cr("h3", null, "\u6700\u7ec8\u5bc6\u7801"), Cr("p", null), Cr("span", {
            id: "myhezi"
        }, Cr("p", null, Cr("input", {
            id: "cod222222222222e16",
            readonly: "",
            class: "col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control",
            value: ""
        })), Cr("br", null), Cr("p", null, Cr("button", {
            id: "copycode16",
            "data-clipboard-target": "#code16",
            class: "btn btn-lg btn copycode16d btn-info",
            style: "width: 100%;"
        }, "\u70b9\u51fb\u590d\u5236"))), Cr("p", null, Cr("span", {
            id: "copyOK",
            style: "display: none;"
        }, "\u221a\u590d\u5236\u6210\u529f")), Cr("p", null)))))))), Cr("script", {
            type: "text/javascript",
            src: "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/bundle.runtime~main.3a15bebb435b0d3fead6.js"
        }), Cr("script", {
            type: "text/javascript",
            src: "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/chunk.vendors~main.f7c5ea92c1b78a8ff211.js"
        }), Cr("script", {
            type: "text/javascript",
            src: "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/chunk.main.b9c7ffd191cff11a9b96.js"
        })), Cr("div", {
            contenteditable: false
        }, "\u4e0d\u53ef\u4ee5\u7f16\u8f91\u7684\u533a\u57df"), Cr("div", {
            contenteditable: true
        }, "\u53ef\u4ee5\u7f16\u8f91\u7684\u533a\u57df")), Cr("h1", null, Cr("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            version: "1.1",
            baseProfile: "full",
            style: "\n      width:600px;\n      height: 600px;\n  "
        }, Cr("g", {
            "fill-opacity": "0.7",
            stroke: "black",
            "stroke-width": "0.1cm"
        }, Cr("circle", {
            cx: "6cm",
            cy: "2cm",
            r: "100",
            fill: "red",
            transform: "translate(0,50)"
        }), Cr("circle", {
            cx: "6cm",
            cy: "2cm",
            r: "100",
            fill: "blue",
            transform: "translate(70,150)"
        }), Cr("circle", {
            cx: "6cm",
            cy: "2cm",
            r: "100",
            fill: "green",
            transform: "translate(-70,150)"
        }))), Cr("svg", {
            style: "\n      width: 100%;\n      height: 200px;\n  ",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 3046.7 875.7"
        }, Cr("title", null, "logo-on-dark-bg"), Cr("rect", {
            Color: "#FFF",
            x: "0",
            y: "0",
            width: "3046.7",
            height: "875.7"
        }), Cr("path", {
            fill: "#FFF",
            d: "M387 0l387 218.9v437.9L387 875.7 0 656.8V218.9L387 0z"
        }), Cr("path", {
            fill: "#8ED6FB",
            d: "M704.9 641.7L399.8 814.3V679.9l190.1-104.6 115 66.4zm20.9-18.9V261.9l-111.6 64.5v232l111.6 64.4zM67.9 641.7L373 814.3V679.9L182.8 575.3 67.9 641.7zM47 622.8V261.9l111.6 64.5v232L47 622.8zm13.1-384.3L373 61.5v129.9L172.5 301.7l-1.6.9-110.8-64.1zm652.6 0l-312.9-177v129.9l200.5 110.2 1.6.9 110.8-64z"
        }), Cr("path", {
            fill: "#1C78C0",
            d: "M373 649.3L185.4 546.1V341.8L373 450.1v199.2zm26.8 0l187.6-103.1V341.8L399.8 450.1v199.2zM198.1 318.2l188.3-103.5 188.3 103.5-188.3 108.7-188.3-108.7z"
        }), Cr("path", {
            fill: "#F5FAFA",
            d: "M1164.3 576.3h82.5l84.1-280.2h-80.4l-49.8 198.8-53.1-198.8H1078l-53.6 198.8-49.3-198.8h-80.4l83.6 280.2h82.5l52-179.5 51.5 179.5zM1335.2 437c0 84.1 57.3 146.3 147.4 146.3 69.7 0 107.2-41.8 117.9-61.6l-48.8-37c-8 11.8-30 34.3-68.1 34.3-41.3 0-71.3-26.8-72.9-64.3H1608c.5-5.4.5-10.7.5-16.1 0-91.6-49.3-149.5-136.1-149.5-79.9 0-137.2 63.2-137.2 147.9zm77.7-30.6c3.2-32.1 25.7-56.8 60.6-56.8 33.8 0 58.4 22.5 60 56.8h-120.6zm223.5 169.9h69.7v-28.9c7.5 9.1 35.4 35.9 83.1 35.9 80.4 0 137.2-60.5 137.2-146.8 0-86.8-52.5-147.3-132.9-147.3-48.2 0-76.1 26.8-83.1 36.4V188.9h-73.9v387.4h-.1zm71.8-139.3c0-52.5 31.1-82.5 71.8-82.5 42.9 0 71.8 33.8 71.8 82.5 0 49.8-30 80.9-71.8 80.9-45 0-71.8-36.5-71.8-80.9zm247 239.5h73.9V547.3c7 9.1 34.8 35.9 83.1 35.9 80.4 0 132.9-60.5 132.9-147.3 0-85.7-56.8-146.8-137.2-146.8-47.7 0-75.6 26.8-83.1 36.4V296h-69.7v380.5h.1zm71.8-241.1c0-44.5 26.8-80.9 71.8-80.9 41.8 0 71.8 31.1 71.8 80.9 0 48.8-28.9 82.5-71.8 82.5-40.7 0-71.8-30-71.8-82.5zm231.5 54.1c0 58.9 48.2 93.8 105 93.8 32.2 0 53.6-9.6 68.1-25.2l4.8 18.2h65.4V398.9c0-62.7-26.8-109.8-116.8-109.8-42.9 0-85.2 16.1-110.4 33.2l27.9 50.4c20.9-10.7 46.6-19.8 74.5-19.8 32.7 0 50.9 16.6 50.9 41.3v18.2c-10.2-7-32.2-15.5-60.6-15.5-65.4-.1-108.8 37.4-108.8 92.6zm73.9-2.2c0-23 19.8-39.1 48.2-39.1s48.8 14.5 48.8 39.1c0 23.6-20.4 38.6-48.2 38.6s-48.8-15.5-48.8-38.6zm348.9 30.6c-46.6 0-79.8-33.8-79.8-81.4 0-45 29.5-82 77.2-82 31.6 0 53.1 15.5 65.4 26.8l20.9-62.2c-18.2-13.9-47.2-30-88.4-30-85.2 0-149 62.7-149 147.9s62.2 146.3 149.5 146.3c40.7 0 71.3-17.1 87.3-30l-19.8-60.5c-12.4 10.1-34.9 25.1-63.3 25.1zm110.9 58.4h73.9V431.6l93.8 144.7h86.8L2940.6 423l98.6-127h-83.1l-90 117.9v-225h-73.9v387.4z"
        }))) ];
        console.log(vdom);
        return vdom;
    });
    mycomapp$1.css = css;
    var vdom$2 = Cr(mycomapp$1);
    An(vdom$2, document.getElementById("root"));
    console.log([ Cr, Cr ]);
    const vdom$3 = Cr("select", {
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
    }, Cr("option", {
        value: "0"
    }, "- Select version -"), Cr("option", {
        value: "94b92331-e2f4-40c6-90ee-80e203a4de3a"
    }, "Windows 10 Insider Preview 18999.1 (vb_release) [arm64]"), Cr("option", {
        value: "7268dbc9-dfe0-4947-af82-67f384e95cb6"
    }, "Windows 10 Insider Preview 18999.1 (vb_release) [x64]"), Cr("option", {
        value: "08f0d32e-c68a-46a8-b301-57e86b4e96e0"
    }, "Windows 10 Insider Preview 18999.1 (vb_release) [x86]"), Cr("option", {
        value: "9fa87c7f-75fa-4e5e-9ca3-1e19cb2c743f"
    }, "Windows 10 Insider Preview 18995.1 (vb_release) [x64]"), Cr("option", {
        value: "5173796c-11ac-47d7-9ed7-dbad6d5c9486"
    }, "Windows 10 Insider Preview 18995.1 (vb_release) [x86]"), Cr("option", {
        value: "4adf5f24-213a-472c-ae94-70f3cb81bade"
    }, "Windows 10 Insider Preview 18995.1 (vb_release) [arm64]"), Cr("option", {
        value: "9287fe5e-2cb3-4064-820f-3e336a3ddff4"
    }, "Windows 10 Insider Preview 18990.1 (vb_release) [arm64]"), Cr("option", {
        value: "5e420f0d-b3a5-424c-9b55-5c2cf939af14"
    }, "Windows 10 Insider Preview 18990.1 (vb_release) [x86]"), Cr("option", {
        value: "13e2104c-c98c-43b2-b232-9b2a4b5af2ac"
    }, "Windows 10 Insider Preview 18990.1 (vb_release) [x64]"));
    const element = document.body.appendChild(An(vdom$3, document.createElement("div")));
    console.log([ vdom$3, element ]);
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
    console.log([ Cr, Cr ]);
    const number = eo(10);
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
    const mycomappclass = wr(() => {
        Mn(store.number, number => {
            console.log(_objectSpread2({}, store), number);
        });
        const vdom = Cr("div", null, Cr("h3", null, " \u70b9\u51fb\u6570\u5b57"), Cr("h2", null, "number:", store.number), Cr("button", {
            onclick: store.increment
        }, "increment"), Cr("button", {
            onclick: store.decrement
        }, "decrement"));
        return vdom;
    });
    let vdom$4 = [ Cr(mycomappclass), Cr(mycomappclass), Cr(mycomappclass) ];
    document.body.appendChild(An(vdom$4, document.createElement("div")));
    setTimeout(() => {
        vdom$4.forEach(vdom => {
            const element = vdom.element;
            element.forEach(e => e.remove());
        });
        number.value = -50;
        vdom$4.forEach(vdom => {
            const element = vdom.element;
            element.forEach(e => document.body.appendChild(e));
        });
        vdom$4 = undefined;
    }, 5e3);
    console.log([ Cr, Cr ]);
    const lirefs = [];
    const temp_ref = fo();
    const check = eo(false);
    const check2 = eo(true);
    Mn(check2, a => console.log(a));
    const check3 = eo(true);
    Mn(check3, a => console.log(a));
    const check4 = eo(true);
    Mn(check4, a => console.log(a));
    const notcheck = Lr(check, a => !a, v => {
        console.log(notcheck, check, v);
        check.value = !v;
    });
    var list = Array(10).fill(undefined).map((v, i) => i);
    Mn(check, a => console.log(a));
    Mn(notcheck, a => console.log(a));
    var vdom$5 = Cr("", null, Cr("input", {
        type: "radio",
        _checked: check4,
        name: "myname1"
    }), Cr("input", {
        type: "radio",
        _checked: check3,
        name: "myname1"
    }), Cr("input", {
        type: "radio",
        _checked: check2,
        name: "myname2"
    }), Cr("input", {
        type: "radio",
        _checked: check4,
        name: "myname2"
    }), [ Cr("input", {
        type: "checkbox",
        _checked: check
    }), Cr("input", {
        type: "checkbox",
        _checked: notcheck
    }), Cr("", null, Cr("ul", null, list.map((a, index) => Cr("li", {
        $ref: ele => {
            lirefs[index] = ele;
            lirefs.length = list.length;
        }
    }, "item", a))), Cr("header", {
        class: "common-header fixed noborder floating",
        id: "git-header-nav",
        _ref: temp_ref
    }, Cr("div", {
        class: "ui container"
    }, Cr("div", {
        class: "ui menu header-menu"
    }, Cr("div", {
        class: "git-nav-expand-bar"
    }, Cr("i", {
        class: "iconfont icon-mode-table"
    })), Cr("div", {
        class: "gitee-nav__sidebar"
    }, Cr("div", {
        class: "gitee-nav__sidebar-container"
    }, Cr("div", {
        class: "gitee-nav__sidebar-top"
    }, Cr("div", {
        class: "gitee-nav__avatar-box"
    }, Cr("a", {
        href: "/masx200",
        onclick: e => e.preventDefault()
    }, Cr("img", {
        alt: "1081296_masx200",
        class: "ui avatar image masx200-avatar",
        src: "https://avatar.gitee.com/uploads/96/1081296_masx200.png?1566294318"
    }))), Cr("div", {
        class: "gitee-nav__info-box"
    }, Cr("a", {
        href: "/masx200"
    }, "masx200"))), Cr("div", {
        class: "gitee-nav__sidebar-middle"
    }, Cr("div", {
        class: "gitee-nav__sidebar-list"
    }, Cr("ul", null, Cr("li", {
        class: "gitee-nav__sidebar-item"
    }, Cr("a", {
        href: "/masx200"
    }, Cr("i", {
        class: "iconfont icon-ic-dashboard"
    }), Cr("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u4e2a\u4eba\u4e3b\u9875"))), Cr("li", {
        class: "gitee-nav__sidebar-item"
    }, Cr("a", {
        href: "/explore"
    }, Cr("i", {
        class: "iconfont icon-ic-discover"
    }), Cr("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u5f00\u6e90\u8f6f\u4ef6"))), Cr("li", {
        class: "gitee-nav__sidebar-item"
    }, Cr("a", {
        href: "/gists"
    }, Cr("i", {
        class: "iconfont icon-ic-gists1"
    }), Cr("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u4ee3\u7801\u7247\u6bb5"))), Cr("li", {
        class: "gitee-nav__sidebar-item"
    }, Cr("a", {
        href: "/enterprises"
    }, Cr("i", {
        class: "iconfont icon-ic-enterprise"
    }), Cr("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u4f01\u4e1a\u7248"))), Cr("li", {
        class: "gitee-nav__sidebar-item"
    }, Cr("a", {
        href: "/education"
    }, Cr("i", {
        class: "iconfont icon-ic-education"
    }), Cr("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u9ad8\u6821\u7248"))), Cr("li", {
        class: "gitee-nav__sidebar-item split-line"
    }), Cr("li", {
        class: "gitee-nav__sidebar-item"
    }, Cr("a", {
        href: "/search"
    }, Cr("i", {
        class: "iconfont icon-ic-search"
    }), Cr("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u641c\u7d22"))), Cr("li", {
        class: "gitee-nav__sidebar-item"
    }, Cr("a", {
        href: "/help"
    }, Cr("i", {
        class: "iconfont icon-help-circle"
    }), Cr("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u5e2e\u52a9\u4e2d\u5fc3"))), Cr("li", {
        class: "gitee-nav__sidebar-item"
    }, Cr("a", {
        href: "/terms"
    }, Cr("i", {
        class: "iconfont icon-file"
    }), Cr("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u4f7f\u7528\u6761\u6b3e"))), Cr("li", {
        class: "gitee-nav__sidebar-item"
    }, Cr("a", {
        href: "/about_us"
    }, Cr("i", {
        class: "iconfont icon-issuepx"
    }), Cr("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u5173\u4e8e\u6211\u4eec"))), Cr("li", {
        class: "gitee-nav__sidebar-item"
    }, Cr("a", {
        href: "/profile"
    }, Cr("i", {
        class: "iconfont icon-edit"
    }), Cr("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u8bbe\u7f6e"))), Cr("li", {
        class: "gitee-nav__sidebar-item"
    }, Cr("a", {
        href: "/logout",
        "data-method": "delete",
        rel: "nofollow"
    }, Cr("i", {
        class: "iconfont icon-ic-logout"
    }), Cr("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u9000\u51fa")))))), Cr("div", {
        class: "gitee-nav__sidebar-bottom"
    }, Cr("div", {
        class: "gitee-nav__sidebar-close-button"
    }, Cr("i", {
        class: "fa fa-angle-double-left"
    }))))), Cr("div", {
        class: "item gitosc-logo"
    }, Cr("a", {
        href: "/"
    }, Cr("img", {
        class: "ui inline image",
        height: "28",
        src: "https://gitee.com//logo.svg?20171024",
        width: "95"
    }), Cr("img", {
        class: "ui inline black image",
        height: "28",
        src: "https://gitee.com//logo-black.svg?20171024",
        width: "95"
    }))), Cr("a", {
        href: "/explore",
        class: "item ",
        title: "\u5f00\u6e90\u8f6f\u4ef6"
    }, "\u5f00\u6e90\u8f6f\u4ef6"), Cr("a", {
        href: "/enterprises",
        class: "item ",
        title: "\u4f01\u4e1a\u7248"
    }, "\u4f01\u4e1a\u7248", Cr("sup", {
        class: "ui red label"
    }, "\u7279\u60e0")), Cr("a", {
        href: "/education",
        class: "item ",
        title: "\u9ad8\u6821\u7248"
    }, "\u9ad8\u6821\u7248"), Cr("a", {
        href: "https://blog.gitee.com/",
        class: "item",
        id: "gitee-blog",
        target: "_blank",
        title: "\u535a\u5ba2"
    }, "\u535a\u5ba2"), Cr("div", {
        class: "dropdown item ui",
        id: "my-gitee-dropdown",
        tabindex: "0"
    }, Cr("a", {
        href: "/masx200/dashboard"
    }, "\u6211\u7684\u7801\u4e91"), Cr("i", {
        class: "dropdown icon"
    }), Cr("div", {
        class: "menu transition hidden",
        tabindex: "-1"
    }, Cr("div", {
        class: "header user-projects"
    }, Cr("a", {
        href: "/masx200/projects",
        class: "pull-right",
        target: "_blank"
    }, "\u5168\u90e8"), "\u4ed3\u5e93", Cr("span", {
        class: "count"
    }, "(11)")), Cr("a", {
        target: "_blank",
        href: "/masx200/mvvm-reactive-view",
        title: "masx200/mvvm-reactive-view",
        class: "item"
    }, "masx200/mvvm-reactive-view"), Cr("a", {
        target: "_blank",
        href: "/masx200/webpack-react-vue-spa-awesome-config",
        title: "masx200/webpack-react-vue-spa-awesome-config",
        class: "item"
    }, "masx200/webpack-react-vue-spa-awesome-config"), Cr("a", {
        target: "_blank",
        href: "/masx200/custom-elements-random-define",
        title: "masx200/custom-elements-random-define",
        class: "item"
    }, "masx200/custom-elements-random-define"), Cr("a", {
        target: "_blank",
        href: "/masx200/importcjsamdumd",
        title: "masx200/importcjsamdumd",
        class: "item"
    }, "masx200/importcjsamdumd"), Cr("a", {
        target: "_blank",
        href: "/masx200/dom-element-attribute-agent-proxy",
        title: "masx200/dom-element-attribute-agent-proxy",
        class: "item"
    }, "masx200/dom-element-attribute-agent-proxy"))), Cr("div", {
        class: "center responsive-logo"
    }, Cr("a", {
        href: "/"
    }, Cr("img", {
        class: "ui inline image",
        height: "24",
        src: "https://gitee.com//logo.svg?20171024",
        width: "85"
    }), Cr("img", {
        class: "ui inline black image",
        height: "24",
        src: "https://gitee.com//logo-black.svg?20171024",
        width: "85"
    }))), Cr("div", {
        class: "right menu userbar",
        id: "git-nav-user-bar"
    }, Cr("div", {
        class: "item git-nav-search-item"
    }, Cr("form", {
        "accept-charset": "UTF-8",
        action: "/search",
        autocomplete: "on",
        "data-text-filter": "\u641c\u7d22\u683c\u5f0f\u4e0d\u6b63\u786e",
        "data-text-require": "\u641c\u7d22\u5173\u952e\u5b57\u4e0d\u80fd\u5c11\u4e8e1\u4e2a",
        id: "navbar-search-form",
        method: "get"
    }, Cr("div", {
        style: "margin:0;padding:0;display:inline"
    }, Cr("input", {
        name: "utf8",
        type: "hidden",
        value: "\u2713"
    })), Cr("div", {
        class: "ui mini fluid input"
    }, Cr("input", {
        id: "navbar-search-input",
        name: "q",
        placeholder: "\u641c\u7d22\u9879\u76ee\u3001\u4ee3\u7801\u7247\u6bb5...",
        type: "text",
        value: ""
    }), Cr("input", {
        id: "navbar-search-type",
        name: "type",
        type: "hidden"
    })))), Cr("div", {
        class: "item ui dropdown empty",
        "data-count-path": "/notifications/unread_count",
        "data-enable": "",
        "data-mark-notice-path": "/notifications/mark",
        id: "notice-dropdown",
        tabindex: "0"
    }, Cr("a", {
        href: "/notifications",
        class: "remind-button"
    }, Cr("i", {
        class: "iconfont icon-remind"
    }), Cr("div", {
        class: "notice-count total"
    }, "1")), Cr("div", {
        class: "notice-dropdown-panel menu transition hidden",
        tabindex: "-1",
        style: "left: -165px;"
    }, Cr("div", {
        class: "notice-dropdown-panel-header"
    }, Cr("div", {
        class: "tab",
        "data-data-path": "/notifications/notices?scope=referer",
        "data-html-path": "/notifications/referer",
        "data-scope": "referer"
    }, Cr("div", {
        class: "content"
    }, "@ \u6211", Cr("div", {
        class: "notice-count referer"
    }))), Cr("div", {
        class: "tab active",
        "data-data-path": "/notifications/notices?scope=infos",
        "data-html-path": "/notifications/infos",
        "data-scope": "infos"
    }, Cr("div", {
        class: "content"
    }, "\u901a\u77e5", Cr("div", {
        class: "notice-count infos"
    }, "1"))), Cr("div", {
        class: "tab",
        "data-data-path": "/notifications/notices?scope=messages",
        "data-html-path": "/notifications/messages",
        "data-scope": "messages"
    }, Cr("div", {
        class: "content"
    }, "\u79c1\u4fe1", Cr("div", {
        class: "notice-count messages"
    })))), Cr("div", {
        class: "item notice-dropdown-panel-container"
    }, Cr("div", {
        class: "ui dimmer over active"
    }, Cr("div", {
        class: "ui loader"
    })), Cr("div", {
        class: "notice-list",
        style: "min-height: auto;"
    }, Cr("a", {
        class: "noti",
        href: "/masx200/mvvm-reactive-view",
        target: "_blank",
        "data-type": "project",
        "data-id": "50555275"
    }, Cr("div", {
        class: "title"
    }, "\u4f60\u7684\u4ed3\u5e93 masx200/mvvm-reactive-view \u5df2\u7ecf\u4ece https://github.com/masx200/mvvm-reactive-view.git \u540c\u6b65\u6210\u529f"), Cr("div", {
        class: "meta"
    }, Cr("time", {
        class: "timeago"
    }, "2\u5c0f\u65f6\u524d"), " \xb7", " ", Cr("span", {
        class: "namespace"
    }, "masx200/mvvm-reactive-view")))), Cr("div", {
        class: "notice-dropdown-panel-blank"
    }, "\u6682\u6ca1\u6709\u65b0\u6d88\u606f")), Cr("div", {
        class: "notice-dropdown-panel-footer"
    }, Cr("div", {
        class: "action"
    }, Cr("div", {
        class: "side left"
    }, Cr("a", {
        href: "javascript: void(0);",
        class: "mark-notices"
    }, "\u5f53\u524d\u6807\u8bb0\u4e3a\u5df2\u8bfb")), Cr("div", {
        class: "side right"
    }, Cr("a", {
        href: "/notifications/infos",
        class: "load-all",
        target: "_blank"
    }, "\u67e5\u770b\u5168\u90e8")))))), Cr("div", {
        class: "ui dropdown link item",
        id: "git-nav-create",
        tabindex: "0"
    }, Cr("i", {
        class: "iconfont icon-add-thin"
    }), Cr("div", {
        class: "right menu",
        tabindex: "-1"
    }, Cr("a", {
        href: "/projects/new",
        class: "item"
    }, Cr("i", {
        class: "add square icon"
    }), "\u65b0\u5efa\u4ed3\u5e93"), Cr("a", {
        href: "/masx200/codes/new",
        class: "item"
    }, Cr("i", {
        class: "code icon"
    }), "\u53d1\u5e03\u4ee3\u7801\u7247\u6bb5"), Cr("a", {
        href: "/organizations/new",
        class: "item"
    }, Cr("i", {
        class: "group icon"
    }), "\u521b\u5efa\u7ec4\u7ec7"), Cr("a", {
        href: "/enterprises/new",
        class: "item"
    }, Cr("i", {
        class: "icon iconfont icon-enterprise"
    }), "\u5f00\u901a\u4f01\u4e1a\u7248"), Cr("a", {
        href: "/projects/oauth_github",
        class: "item"
    }, Cr("i", {
        class: "github icon"
    }), "\u4ece GitHub \u5bfc\u5165\u4ed3\u5e93"))), Cr("div", {
        class: "ui dropdown item",
        id: "git-nav-user",
        tabindex: "0"
    }, Cr("img", {
        alt: "1081296_masx200",
        class: "ui avatar image",
        src: "https://avatar.gitee.com/uploads/96/1081296_masx200.png!avatar30?1566294318"
    }), Cr("i", {
        class: "dropdown icon"
    }), Cr("div", {
        class: "right menu",
        tabindex: "-1"
    }, Cr("a", {
        href: "/masx200",
        class: "item"
    }, Cr("i", {
        class: "iconfont icon-ic-home"
    }), "\u4e2a\u4eba\u4e3b\u9875"), Cr("a", {
        href: "/profile",
        class: "item"
    }, Cr("div", {
        class: "mayun-icon my-ic-edit my-ic-edit-dims"
    }), "\u8bbe\u7f6e"), Cr("div", {
        class: "divider"
    }), Cr("a", {
        href: "/gists",
        class: "item"
    }, Cr("div", {
        class: "iconfont icon-ic-gist"
    }), "\u4ee3\u7801\u7247\u6bb5"), Cr("a", {
        href: "https://gitee.com/help",
        class: "item",
        target: "_blank"
    }, Cr("div", {
        class: "mayun-icon my-ic-help my-ic-help-dims"
    }), "\u5e2e\u52a9"), Cr("div", {
        class: "divider"
    }), Cr("a", {
        href: "/logout",
        class: "item destroy-user-session",
        "data-method": "delete",
        rel: "nofollow"
    }, Cr("div", {
        class: "mayun-icon my-ic-exit my-ic-exit-dims"
    }), "\u9000\u51fa"))), Cr("script", null)))))) ]);
    console.log(vdom$5, temp_ref, lirefs);
    document.body.appendChild(An(vdom$5, document.createElement("div")));
    console.log([ Cr, Cr ]);
    (() => {
        var mystate = eo(true);
        console.log("mystatetest", mystate);
        var vdom = kr(mystate, "testtrue", Cr("div", undefined, "testfalese"));
        var vdom2 = kr(mystate, undefined, Cr("div", undefined, "testwwwwwwwwwfalese"));
        var vdom3 = kr(mystate, Cr("div", undefined, "testwwwwwwwtrueeeeeeeeee"), undefined);
        console.log([ vdom, vdom2, vdom3 ]);
        document.body.appendChild(An([ vdom, vdom2, vdom3 ], document.createElement("div")));
        var timer = setInterval(() => {
            mystate.value = !mystate.value;
        }, 1e3);
        setTimeout(() => {
            clearInterval(timer);
        }, 1e4);
    })();
    (() => {
        const stylestate = eo({
            display: "block",
            width: "100%"
        });
        const inputref = fo();
        const state1 = eo("hello");
        const vdom = [ Cr("div", {
            style: {
                display: "block",
                width: "100%"
            }
        }, "hello world!"), Cr("input", {
            style: "width:100%",
            "@input": e => state1.value = e.target.value,
            "*ref": inputref,
            "@change": e => state1.value = e.target.value,
            id: "co11111111111de16",
            class: "col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control",
            value: state1
        }), Cr("h1", {
            style: stylestate
        }, "mvvm-reactive-view"), Cr("button", {
            "@click": () => {
                stylestate.color = "red";
            }
        }, "red"), Cr("button", {
            "@click": () => {
                stylestate.color = "green";
            }
        }, "green") ];
        Mn(stylestate, console.log);
        Mn(state1, console.log);
        console.log(vdom);
        An(vdom, document.getElementById("app"));
    })();
    (() => {
        const vdom2 = [ Cr("div", {
            "*text": "<a>\u7ed1\u5b9atextcontent</a>"
        }), Cr("div", {
            "*html": "<a>\u7ed1\u5b9ainnerhtml</a>"
        }) ];
        console.log(vdom2);
        document.body.appendChild(An(vdom2, document.createElement("div")));
        const state1 = eo("<a>\u7ed1\u5b9atextcontent</a>");
        const state2 = eo("<a>\u7ed1\u5b9ainnerhtml</a>");
        const vdom3 = [ Cr("textarea", {
            value: state1,
            "@input": [ e => {
                state1.value = e.target.value;
            } ]
        }), Cr("input", {
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
        document.body.appendChild(An(vdom3, document.createElement("div")));
        const state3 = eo("<a>\u7ed1\u5b9ainnerhtml</a>");
        const vdom4 = Cr("", null, Cr("div", {
            _text: state3
        }), Cr("div", {
            _html: state3
        }), Cr("script", null, " "));
        Mn(state1, state => state3.value = state);
        Mn(state2, state => state1.value = state);
        console.log(state3);
        console.log(vdom4);
        document.body.appendChild(An(vdom4, document.createElement("div")));
        const objstate = eo({
            a: "w",
            6: "xxxxxxx",
            tttttttt: "true"
        });
        const objstate2 = eo('{ a: "w", 6: "xxxxxxx", tttttttt: "true" }');
        console.log(objstate);
        setTimeout(() => {
            objstate.length = 10;
            objstate2.value = 2222222222222;
        }, 2e3);
        const objstatearray = eo([ {
            a: "w",
            6: "xxxxxxx",
            tttttttt: "true"
        }, 1, true, "test" ]);
        const stylestate = eo({
            display: "block",
            width: "100%"
        });
        const classsetstate = eo(new Set([ "xxxxxxx", "wwwwwww", "eeeeeeee" ]));
        console.log("classsetstate", classsetstate);
        Mn(classsetstate, a => console.log(a));
        setTimeout(() => {
            classsetstate.add("vvvvvvvvvvv");
        }, 5e3);
        setTimeout(() => {
            classsetstate.delete("eeeeeeee");
        }, 4e3);
        const vdomobj = [ Cr("div", {
            style: {
                display: "block",
                width: "100%"
            }
        }, objstate2), Cr("div", {
            style: stylestate,
            class: new Set([ "wwwwwww", "eeeeeeee" ])
        }, objstatearray), objstate, Cr("div", {
            style: stylestate,
            class: classsetstate
        }) ];
        document.body.appendChild(An(vdomobj, document.createElement("div")));
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
        console.log([ objstate2, eo(objstate2) ]);
        console.log(Object.entries(objstate));
    })();
    (() => {
        var vdom = Cr("math", null, Cr("mrow", null, Cr("mrow", null, Cr("msup", null, Cr("mi", null, "a"), Cr("mn", null, "2")), Cr("mo", null, "+"), Cr("msup", null, Cr("mi", null, "b"), Cr("mn", null, "2"))), Cr("mo", null, "="), Cr("msup", null, Cr("mi", null, "c"), Cr("mn", null, "2"))));
        document.body.appendChild(An(vdom, document.createElement("div")));
        console.log(vdom);
    })();
    class Bqqqqqqqqq extends HTMLElement {}
    class Aqqqqqqqqq extends HTMLElement {}
    console.log(customElements, [ ...customElements ]);
    customElements.define("qqqqqqqqqq-----a", Bqqqqqqqqq);
    customElements.define("qqqqqqqqqq-----a", Aqqqqqqqqq);
    document.body.appendChild(An([ Cr(Bqqqqqqqqq), Cr(Aqqqqqqqqq) ], document.createElement("div")));
    console.log([ Cr, Cr ]);
    (() => {
        (() => {
            var _class, _temp;
            var myvdom1111111 = Cr(class extends HTMLElement {
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
            document.body.appendChild(An(myvdom1111111, document.createElement("div")));
            document.body.appendChild(An(Cr((() => {
                var Aaaaaaaaaa = class extends HTMLElement {};
                Aaaaaaaaaa.defaultProps = {
                    name: "HelloKitty",
                    myAge: 18
                };
                return Aaaaaaaaaa;
            })()), document.createElement("div")));
            const myele1 = Cr((_temp = _class = class extends HTMLElement {}, _defineProperty(_class, "defaultProps", {
                name: "aaaaaaaaaaHelloKitty",
                myAge: 0x71afd498cfffe
            }), _temp));
            console.log(myele1);
            document.body.appendChild(An(myele1, document.createElement("div")));
            document.body.appendChild(An(myele1, document.createElement("div")));
        })();
    })();
    {
        const vdom = Cr("div", [ [ Cr("html", null, "testhtml"), Cr("button", {
            onclick: [ console.log, () => {
                console.log("onclick");
            } ],
            "*text": "clicktest",
            "@click": [ console.log, () => {
                console.log("@click");
            } ]
        }), Cr("style", null) ] ]);
        document.body.appendChild(An(vdom, document.createElement("div")));
        console.log("onclick", " @click", vdom);
    }
    (async () => {
        const defaultProps = {
            cccccc: "bbbbbbb"
        };
        const css = await (await fetch("https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-6556dfa9be535e551ffffaadfecdad99.min.css")).text();
        const Hellowordclass = Object.assign(() => {
            return Cr("div", [ "hello world" ], "\u6d4b\u8bd5\u4e0d\u4f7f\u7528createComponent");
        }, {
            css: css,
            defaultProps: defaultProps
        });
        const vdom = Cr(Hellowordclass, null);
        let vdom1 = Cr(Hellowordclass);
        document.body.appendChild(An([ vdom, vdom1 ], document.createElement("div")));
        console.log([ "\u6d4b\u8bd5\u4e0d\u4f7f\u7528createComponent", Hellowordclass, vdom ]);
    })();
    (() => {
        const colortext = eo("red");
        const stylestate = eo({
            display: "block",
            width: "100%",
            color: colortext
        });
        const vdom = [ Cr("hr", null), Cr("h1", {
            style: stylestate
        }, "input color ", colortext), Cr("input", {
            _value: colortext
        }), Cr("hr", null) ];
        console.log([ vdom, colortext, stylestate ]);
        Mn([ colortext, stylestate ], (a, b) => console.log([ a, _objectSpread2({}, b) ]));
        document.body.appendChild(An(vdom, document.createElement("div")));
    })();
    (() => {
        const colortext = eo("blue");
        const stylestate = eo({
            display: "block",
            width: "100%",
            color: colortext
        });
        const vdom = [ Cr("hr", null), Cr("h1", {
            style: stylestate
        }, "input color ", colortext), Cr("input", {
            _value: colortext
        }), Cr("hr", null) ];
        var inter = setInterval(() => {
            colortext.value = "#" + (Math.random() * 16 ** 7).toString(16).slice(0, 6);
        }, 1e3);
        setTimeout(() => {
            clearInterval(inter);
        }, 1e4);
        Mn([ colortext, stylestate ], (a, b) => console.log([ a, _objectSpread2({}, b) ]));
        document.body.appendChild(An(vdom, document.createElement("div")));
    })();
    var css$1 = '@import url(https://cdn.staticfile.org/mui/3.7.1/css/mui.min.css);html{color:#444333;background:#fff;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;text-rendering:optimizelegibility}article,aside,blockquote,body,button,code,dd,details,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,input,legend,li,menu,nav,ol,p,pre,section,td,textarea,th,ul{margin:0;padding:0}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}audio,canvas,video{display:inline-block;*display:inline;*zoom:1}body,button,input,select,textarea{font:500 .875em/1.8 Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif}button,input{*width:auto;*overflow:visible;line-height:22px}table{border-collapse:collapse;border-spacing:0}th{text-align:inherit}fieldset,img{border:0}img{-ms-interpolation-mode:bicubic}iframe{display:block}blockquote{font-family:Optima,Georgia,STSong,serif;margin:1em 0;color:#999;padding:.6em 1em;background:#f8f8f8;border-left:.4em solid #ddd}blockquote blockquote{padding:0 0 0 1em;margin-left:2em}abbr,acronym{border-bottom:1px dotted;font-variant:normal}abbr{cursor:help}del{text-decoration:line-through}address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:400}ol,ul{list-style:none}caption,th{text-align:left}q:after,q:before{content:""}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:text-top\\9}:root sub,:root sup{vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}a:hover{text-decoration:underline}a,ins{text-decoration:none}.typo-u,u{text-decoration:underline}mark{background:#fffdd1}code,pre{font-family:Courier New,Courier,monospace;white-space:pre-wrap;word-wrap:break-word}pre{background:#f8f8f8;border:1px solid #ddd;padding:1em 1.5em}hr{border:none;border-bottom:1px solid #cfcfcf;margin-bottom:10px;*color:pink;*filter:chroma(color=pink);height:10px;*margin:-7px 0 2px}.typo-small,figcaption,small{font-size:.9em;color:#888}[draggable]{cursor:move}.clearfix:after,.clearfix:before{content:"";display:table}.clearfix:after{clear:both}.clearfix{zoom:1}.textwrap,.textwrap td,.textwrap th{word-wrap:break-word;word-break:break-all}.textwrap-table{table-layout:fixed}.typo-dl,.typo-form,.typo-hr,.typo-ol,.typo-p,.typo-pre,.typo-table,.typo-ul,.typo dl,.typo form,.typo hr,.typo ol,.typo p,.typo pre,.typo table,.typo ul{margin-bottom:1.2em}h1,h2,h3,h4,h5,h6{font-weight:500;*font-weight:800;font-family:Helvetica Neue,Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif;color:#333}.typo-h1,.typo-h2,.typo-h3,.typo-h4,.typo-h5,.typo-h6,.typo h1,.typo h2,.typo h3,.typo h4,.typo h5,.typo h6{margin-bottom:.4em;line-height:1.5}.typo-h1,.typo h1{font-size:1.8em}.typo-h2,.typo h2{font-size:1.6em}.typo-h3,.typo h3{font-size:1.4em}.typo-h4,.typo h4{font-size:1.2em}.typo-h5,.typo-h6,.typo h5,.typo h6{font-size:1em}.typo-ul,.typo ul{margin-left:1.3em;list-style:disc}.typo-ol,.typo ol{list-style:decimal;margin-left:1.9em}.typo-ol ol,.typo-ol ul,.typo-ul ol,.typo-ul ul,.typo li ol,.typo li ul{margin-top:0;margin-bottom:0;margin-left:2em}.typo-ol ul,.typo-ul ul,.typo li ul{list-style:circle}.typo-table td .typo table caption,.typo-table th,.typo table td,.typo table th{border:1px solid #ddd;padding:.5em 1em;color:#666}.typo-table th,.typo table th{background:#fbfbfb}.typo-table thead th,.typo table thead th{background:#f1f1f1}.typo table .caption{border-bottom:none}.typo-input,.typo-textarea{-webkit-appearance:none;border-radius:0}::-moz-selection{background:#08c;color:#fff}::selection{background:#08c;color:#fff}.typo-em,.typo em,caption,legend{font-weight:700}p{color:#0f0!important}@font-face{font-family:octicons-anchor;src:url(data:font/woff;charset=utf-8;base64,d09GRgABAAAAAAYcAA0AAAAACjQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABMAAAABwAAAAca8vGTk9TLzIAAAFMAAAARAAAAFZG1VHVY21hcAAAAZAAAAA+AAABQgAP9AdjdnQgAAAB0AAAAAQAAAAEACICiGdhc3AAAAHUAAAACAAAAAj//wADZ2x5ZgAAAdwAAADRAAABEKyikaNoZWFkAAACsAAAAC0AAAA2AtXoA2hoZWEAAALgAAAAHAAAACQHngNFaG10eAAAAvwAAAAQAAAAEAwAACJsb2NhAAADDAAAAAoAAAAKALIAVG1heHAAAAMYAAAAHwAAACABEAB2bmFtZQAAAzgAAALBAAAFu3I9x/Nwb3N0AAAF/AAAAB0AAAAvaoFvbwAAAAEAAAAAzBdyYwAAAADP2IQvAAAAAM/bz7t4nGNgZGFgnMDAysDB1Ml0hoGBoR9CM75mMGLkYGBgYmBlZsAKAtJcUxgcPsR8iGF2+O/AEMPsznAYKMwIkgMA5REMOXicY2BgYGaAYBkGRgYQsAHyGMF8FgYFIM0ChED+h5j//yEk/3KoSgZGNgYYk4GRCUgwMaACRoZhDwCs7QgGAAAAIgKIAAAAAf//AAJ4nHWMMQrCQBBF/0zWrCCIKUQsTDCL2EXMohYGSSmorScInsRGL2DOYJe0Ntp7BK+gJ1BxF1stZvjz/v8DRghQzEc4kIgKwiAppcA9LtzKLSkdNhKFY3HF4lK69ExKslx7Xa+vPRVS43G98vG1DnkDMIBUgFN0MDXflU8tbaZOUkXUH0+U27RoRpOIyCKjbMCVejwypzJJG4jIwb43rfl6wbwanocrJm9XFYfskuVC5K/TPyczNU7b84CXcbxks1Un6H6tLH9vf2LRnn8Ax7A5WQAAAHicY2BkYGAA4teL1+yI57f5ysDNwgAC529f0kOmWRiYVgEpDgYmEA8AUzEKsQAAAHicY2BkYGB2+O/AEMPCAAJAkpEBFbAAADgKAe0EAAAiAAAAAAQAAAAEAAAAAAAAKgAqACoAiAAAeJxjYGRgYGBhsGFgYgABEMkFhAwM/xn0QAIAD6YBhwB4nI1Ty07cMBS9QwKlQapQW3VXySvEqDCZGbGaHULiIQ1FKgjWMxknMfLEke2A+IJu+wntrt/QbVf9gG75jK577Lg8K1qQPCfnnnt8fX1NRC/pmjrk/zprC+8D7tBy9DHgBXoWfQ44Av8t4Bj4Z8CLtBL9CniJluPXASf0Lm4CXqFX8Q84dOLnMB17N4c7tBo1AS/Qi+hTwBH4rwHHwN8DXqQ30XXAS7QaLwSc0Gn8NuAVWou/gFmnjLrEaEh9GmDdDGgL3B4JsrRPDU2hTOiMSuJUIdKQQayiAth69r6akSSFqIJuA19TrzCIaY8sIoxyrNIrL//pw7A2iMygkX5vDj+G+kuoLdX4GlGK/8Lnlz6/h9MpmoO9rafrz7ILXEHHaAx95s9lsI7AHNMBWEZHULnfAXwG9/ZqdzLI08iuwRloXE8kfhXYAvE23+23DU3t626rbs8/8adv+9DWknsHp3E17oCf+Z48rvEQNZ78paYM38qfk3v/u3l3u3GXN2Dmvmvpf1Srwk3pB/VSsp512bA/GG5i2WJ7wu430yQ5K3nFGiOqgtmSB5pJVSizwaacmUZzZhXLlZTq8qGGFY2YcSkqbth6aW1tRmlaCFs2016m5qn36SbJrqosG4uMV4aP2PHBmB3tjtmgN2izkGQyLWprekbIntJFing32a5rKWCN/SdSoga45EJykyQ7asZvHQ8PTm6cslIpwyeyjbVltNikc2HTR7YKh9LBl9DADC0U/jLcBZDKrMhUBfQBvXRzLtFtjU9eNHKin0x5InTqb8lNpfKv1s1xHzTXRqgKzek/mb7nB8RZTCDhGEX3kK/8Q75AmUM/eLkfA+0Hi908Kx4eNsMgudg5GLdRD7a84npi+YxNr5i5KIbW5izXas7cHXIMAau1OueZhfj+cOcP3P8MNIWLyYOBuxL6DRylJ4cAAAB4nGNgYoAALjDJyIAOWMCiTIxMLDmZedkABtIBygAAAA==) format("woff")}*{color:purple!important;font-size:50px}@keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@media (max-width:720px){.article-content h1{font-size:24px}.article-content h2{font-size:20px}.article-content h3{font-size:18px}.article-content pre>code .copy-code-btn{display:none}.article-content pre>code.hljs[lang]:before{top:2px;right:15px}}@media (max-width:720px){.article-content pre>code.copyable.hljs[lang]:before{right:1rem}}@media (max-width:500px){hr#hidewidthless500{display:none}}.recommend-container .recommend-user .item{margin-bottom:16px}.recommend-container .recommend-user .ui.button{padding:3px 5px;margin-right:0}.recommend-container .recommend-user .header .pull-right{color:#005980;cursor:pointer}.recommend-container .recommend-user .header .pull-right.disabled{opacity:.7;cursor:default}.recommend-container .recommend-user .icon-reset{margin-top:-1px;height:16px;font-size:16px;margin-right:2px}.recommend-container .recommend-user__content{position:relative}.recommend-container .dimmer.active{z-index:1}.recommend-container .recommend-list__user{-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;margin-right:4px}.recommend-container .recommend-list__user strong{color:#005980}.recommend-container .recommend-list__user .recommend-list__user-info{margin:0 4px 0 8px;max-width:155px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.recommend-container .recommend-list__user .recommend-list__user-info.is-follow{max-width:125px}.recommend-container .recommend-list__user .recommend-list__user-info>div{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.recommend-container .recommend-list__flollow .disable{opacity:.5}.recommend-container .recommend-project .icon-recommended{color:#fe7300}.recommend-container .recommend-project .project-label{display:inline-block}.recommend-container .recommend-project .recommend-list{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.recommend-container .recommend-project .recommend-list>*{word-break:break-all}.recommend-container .recommend-project .recommend-list .recommend-project__describe{overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical}.recommend-container .recommend-project .item{margin-bottom:16px}.recommend-container .recommend-project .recommend-project__name{margin-bottom:4px;color:#005980}.recommend-container .recent_visits .ui.items{margin-right:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.recommend-container .recent_visits .avatar-item{margin-right:-22px!important}.recommend-container .recent_visits .item{width:20%;min-width:0;font-size:16px}.recommend-container .recent_visits .empty-visitor.item{font-size:14px;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1}.dashboard-content.twelve{padding-right:0!important}.dashboard-content .gitee-headbread .git-user-selection-dropdown{margin-right:0!important}.dashboard-content .dashboard-team .git-user-content-header{display:none}.dashboard-content .gitee-headbread{margin-bottom:24px}.dashboard-content .git-dashboard-projects-menu{margin-bottom:24px!important}.dashboard-content .git-dashboard-projects-menu .f-bold{color:#fe7300;border-bottom:2px solid #fe7300!important}.dashboard-content .git-dashboard-projects-menu>a.item{font-size:16px;padding:8px 18px!important}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input{width:150px;margin-right:10px}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input input{margin-top:-6px;font-size:12px;margin-right:10px}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input .icon-search{margin-top:-4px}.dashboard-content #event-timeline-panel h3.event-timeline-title{font-size:16px;margin-top:0;margin-bottom:16px;display:inline-block}.dashboard-content #event-timeline-panel .event-timeline.content{padding:0 0 18px 12px}.dashboard-content #event-timeline-panel .event-actionbar .dropdown.icon{margin-left:4px}.dashboard-content #event-timeline-panel .message-container .message{margin:0 0 1em}.dashboard-content .issues-filter__item{display:block;padding:0!important;color:initial!important;font-weight:500!important}.dashboard-content .issues-dropdown{margin-top:-6px!important}.dashboard-content .issues-dropdown .pl-0.f-bold{padding-left:0!important}.dashboard-content .dashboard-team .dashboard-team_info{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.dashboard-content .dashboard-team .ui.image{width:40px;height:40px;min-width:40px}.dashboard-content .dashboard-team .dashboard-team__contaniner .dashboard-team__name{font-size:16px;font-weight:700;overflow:hidden;word-break:keep-all;text-overflow:ellipsis;display:block}.dashboard-content .dashboard-team .dashboard-team__contaniner a{color:#005980!important}.dashboard-content .dashboard-team .dashboard-team__contaniner>.item:first-child{padding-top:0!important}.dashboard-content .dashboard-team .dashboard-team__contaniner .item{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.dashboard-content .dashboard-team .dashboard-team__contaniner .content{display:-webkit-box!important;display:-webkit-flex!important;display:-moz-box!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;overflow:hidden}.dashboard-content .dashboard-team .dashboard-team__contaniner .content:after{content:none}.dashboard-content .dashboard-team .dashboard-team__contaniner .content i{font-size:16px}.dashboard-content .dashboard-team .icon-enterprise-badge{margin-left:4px}.dashboard-content .dashboard-team .dashboard-team__operate{min-width:75px;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-moz-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.dashboard-content .dashboard-team .dashboard-team__operate.has-exit{min-width:150px}.recommend-project .icon-help-circle{vertical-align:baseline}.dashboard-content__show{width:608px!important;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.ui.container.user_page{width:1240px}#rc-users__container{position:relative}#rc-users__container .secondary-navigation .active{color:#fe7300!important}#rc-users__container .dashboard-content{padding-right:32px;padding-left:32px;padding-top:24px}#rc-users__container .dashboard-sidebar{padding:16px 0 0;width:280px!important;margin-left:10px}#rc-users__container .dashboard-sidebar .dashboard-group .item{margin:8px 0}#rc-users__container .dashboard-sidebar .dashboard-group:last-child{margin-bottom:0!important}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar{padding-top:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .ui.card{width:100%;margin-top:32px;margin-bottom:0;padding-bottom:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .ui.card .header{font-size:16px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name h4{font-size:14px;display:inline-block}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .description{margin-top:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .item.flex{margin-top:16px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .item.flex:first-child{margin-top:12px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .quit i{margin-top:0}#rc-users__container .has-active .content{padding-left:0 2px 0 8px}#rc-users__container .navigation .header{padding-right:8px;border-bottom:1px solid #e3e9ed;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;padding-bottom:4px}#rc-users__container .navigation .header,#rc-users__container .navigation .header .title{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}#rc-users__container .navigation .header .title{font-size:16px}#rc-users__container .navigation .header .avatar.image{margin-right:0}#rc-users__container .navigation .header strong{font-size:16px;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;max-width:120px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#rc-users__container .navigation .header strong a{color:unset}#rc-users__container .navigation .header .actions{margin-top:4px}#rc-users__container .navigation .header .actions i{color:#005980}#rc-users__container .navigation.user i{color:#989dad}#rc-users__container .navigation.user .content{padding:0 8px}#rc-users__container .navigation .items>a{color:#40485b}#rc-users__container .navigation .items>a:hover{color:#095eab}#rc-users__container .navigation .items>a:active{color:#064177}#rc-users__container .navigation .items>a:hover{color:#40485b}#rc-users__container .navigation .item:hover .content{background:#f8f8f8}#rc-users__container .navigation .item .active{color:#fe7300;background:#f8f8f8}#rc-users__container .navigation .item .active .num{color:inherit}#rc-users__container .navigation .item:hover .exit{display:inline-block}#rc-users__container .navigation .icon-add,#rc-users__container .navigation .icon-search{color:#8c92a4!important}#rc-users__container .navigation .num{font-size:12px;font-weight:500;color:#8c92a4}#rc-users__container .navigation .gray{color:#8c92a4}#rc-users__container .navigation .avatar.image{width:32px;height:32px}#rc-users__container .twitter-typeahead{width:100%}#rc-users__container .gray{color:#8c92a4}#rc-users__container .ui.container{width:1240px}#rc-users__container .contribution-events{padding-top:32px}#rc-users__container #git-footer-main{min-width:1240px}#rc-users__container .gitee-headbread .gitee-divider{display:inline-block;opacity:.5;margin:0 .2rem;color:rgba(0,0,0,.4);vertical-align:baseline}#rc-users__container .git-user-content .git-user-content-header{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:16px}#rc-users__container .ui.button.js-project-watch{background:#fff;border:1px solid rgba(140,146,164,.5);padding:2px 5px;margin:0}#rc-users__container .recommend-container{width:248px!important}.users__personal-avatar{position:relative;margin:0 auto 10px;width:160px;height:160px}.users__personal-avatar .over-avatar{position:absolute;top:0;left:0;width:100%;height:100%;color:#fff;font-size:14px;text-align:center;line-height:200px;border:4px solid #eee;border-radius:50%;background:rgba(0,0,0,.5);cursor:pointer;display:none}.users__personal-avatar .over-avatar:hover{display:block}.users__personal-avatar .ui.image.avatar{margin:0;width:100%;height:100%;border:4px solid #eee}.users__personal-avatar .ui.image.avatar:hover+.over-avatar{display:block}.users__personal-avatar .avatar-gender{position:absolute;bottom:2px;right:27px;width:32px;height:32px;border-radius:50%;color:#fff;font-size:21px;text-align:center;line-height:30px;border:2px solid #fff}.users__personal-avatar .avatar-gender.mars{background:#3eb4ff}.users__personal-avatar .avatar-gender.venus{background:#ff5bc6}.users__personal-name{text-align:center}.users__personal-name h2,.users__personal-name p{margin:8px 0 0;word-break:break-all}.users__personal-name h2 span,.users__personal-name p span{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}.users__personal-name .remark-name{color:#8c92a4;font-size:14px;font-weight:400;display:inline}.users__personal-name .ui.small.label{margin-bottom:.5em;padding:.4em .7em;font-weight:400}.users__personal-setting{margin:15px auto;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__personal-setting .ui.button{margin:0;width:45%;font-size:14px}.users__personal-setting .ui.button.basic{border:1px solid #ccc}.users__personal-socials .ui.grid{padding:0 1rem}.users__personal-socials .ui.grid .column{padding:1rem 0;text-align:center}.users__personal-socials .social-count{font-size:18px;font-weight:700}.users__personal-socials .social-name{padding-top:5px;color:#40485b;font-size:12px;display:block}.users__personal-info{padding:15px 0;color:#8c92a4}.users__personal-info .info-item{padding:3px 0;line-height:1.5;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__personal-info .info-item i.iconfont{width:20px;text-align:center}.users__personal-info .info-item i.iconfont.icon-time{font-size:12px}.users__personal-achievement{padding:10px 0}.users__personal-achievement h3{margin:0;padding-bottom:4px;border-bottom:1px solid #dce3e8}.users__personal-achievement .ui.list .item .content{line-height:1.8}.users__personal-achievement .ui.list .item .content .description{color:#7687ab}.users__personal-groups{padding:10px 0}.users__personal-groups h3{margin:0;padding-bottom:4px;border-bottom:1px solid #dce3e8}.users__personal-groups .ui.list{margin:0}.users__personal-groups .ui.list:not(.more-groups){margin-top:1em}.users__personal-groups .ui.list .item{padding:.3em 0}.users__personal-groups .ui.list .item a{color:#005980!important}.users__personal-groups .ui.list .item a:hover{color:#4c8aa6!important}.users__personal-groups .ui.list .item a:active{color:#003e59!important}.users__personal-groups .ui.list .item .content{line-height:1.8;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__personal-groups .ui.list .item .right.floated.content{color:#7687ab}.users__personal-groups .ui.list .item .right.floated.content .mr-1{width:24px;display:inline-block}.users__personal-groups .load-more-groups{margin-top:8px;display:block;color:#7687ab}.users__personal-groups .load-more-groups:hover{color:#9fabc4}.users__personal-groups .load-more-groups:active{color:#525e77}.users__navbar .ui.secondary.pointing.menu{border-bottom:2px solid #dededf}.users__navbar .ui.secondary.pointing.menu>.item{margin-bottom:-2px;padding:10px 30px;min-width:100px;text-align:center;border-width:2px}.users__navbar .ui.secondary.pointing.menu>.item.active{color:#fe7300;border-color:#fe7300}.users__navbar .ui.secondary.pointing.menu>.item.active .ui.label{color:#fe7300;background:rgba(254,115,0,.2)}.users__header{margin-top:2em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__header h3{margin:0}.users__header .ui.dropdown{padding:.5em .92857em}.users__popular-projects .ui.cards{margin:0 -.5em -.5em}.users__popular-projects .ui.cards .ui.card{margin:.5em!important;padding:1em;width:calc(50% - 1em)!important;border:1px solid #dce3e8;-webkit-box-shadow:none;box-shadow:none}.users__popular-projects .ui.cards .ui.card .content{padding:0}.users__popular-projects .ui.cards .ui.card .content .popular-project-title{font-size:16px;word-break:break-all;vertical-align:middle}.users__popular-projects .ui.cards .ui.card .content .git-project-gvp-badge{margin-top:-3px}.users__popular-projects .ui.cards .ui.card .content i.iconfont{font-size:14px}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-mode-table{margin-top:1px;color:#d0d0d0;cursor:move}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-recommended{color:#fe7300;font-weight:400}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-watch{font-size:12px;vertical-align:baseline}.users__popular-projects .ui.cards .ui.card .content .description{color:#8c92a4;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}.users__popular-projects .ui.cards .ui.card .extra.content{padding-top:1em;border:none!important;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__popular-projects .ui.cards .ui.card .extra.content:after{content:none}.users__popular-projects .ui.cards .ui.card .extra.content .left .ui.small.label{padding:.4em .7em}.users__popular-projects .ui.cards .ui.card .extra.content .right a{padding:0 .2em;color:#8c92a4}.users__popular-projects .ui.cards .ui.card .extra.content .right a:hover{color:#aeb2bf}.users__popular-projects .ui.cards .ui.card .extra.content .right a:active{color:#626672}.users__popular-projects .ui.cards .ui.card.sortable-chosen{background:#fed!important}.users__contribution-panel .less{background-color:#eee}.users__contribution-panel .little{background-color:#d6e685}.users__contribution-panel .some{background-color:#8cc665}.users__contribution-panel .many{background-color:#44a340}.users__contribution-panel .much{background-color:#1e6823}.users__contribution-panel .contribution-box{padding-top:20px;height:125px;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.users__contribution-panel .contribution-box .left-side{width:32px;font-size:12px;text-align:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.users__contribution-panel .contribution-box .left-side,.users__contribution-panel .contribution-box .right-side{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.users__contribution-panel .contribution-box .right-side{position:relative;width:100%;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.users__contribution-panel .contribution-box .right-side .box{width:1.88679%;height:15px;border:1px solid #fff}.users__contribution-panel .contribution-box .right-side .box[data-content]:hover{border:1px solid #000}.users__contribution-panel .contribution-box .right-side .month{position:absolute;top:0;margin-top:-15px;margin-left:-15px;min-width:45px;font-size:12px;text-align:center}.users__contribution-panel .contribution-tip{margin-top:10px;padding-right:10px;font-size:12px;text-align:right}.users__contribution-panel .contribution-tip .word{font-size:12px;vertical-align:top;display:inline-block}.users__contribution-panel .contribution-tip .ui.horizontal.list>.item{margin:0 1px;width:12px;height:12px;vertical-align:text-bottom}.users__contribution-panel .contribution-describ p{margin:0 20px 0 0;display:inline-block}.users__contribution-panel .contribution-describ p.text-muted{margin-top:10px;display:block}.users__customize-modal .ui.form{min-height:180px}.users__customize-modal .grouped.fields{margin:.2em 0 1em!important;padding:10px 0;max-height:20em;overflow-y:auto}.users__customize-modal .grouped.fields .field{padding:5px!important}.users__customize-modal .grouped.fields .field .ui.checkbox{width:100%}.users__customize-modal .grouped.fields .field label{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__customize-modal .grouped.fields .field label span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__customize-modal .grouped.fields .field label .star-count{min-width:4em;text-align:right}.users__customize-modal .grouped.fields .field.active{background:rgba(254,115,0,.2)}.users__report-modal .appeal-success-tip{text-align:center}.users__report-modal .appeal-success-tip i.iconfont{font-size:7rem;color:#4baf50}.users__report-modal .ui.items{padding:20px;background:#f4f5f6}.users__report-modal .ui.items .ui.image{width:50px}.users__report-modal .ui.items .content .header{color:#40485b}.users__report-modal .ui.items .content .description{color:#8c92a4;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__report-modal .ui.segment.loader-block{border:0;min-height:100px}.users__report-modal .action-types .item{margin:5px;padding:10px 20px;min-width:120px;text-align:center;display:inline-block;background:#f2f2f2;border-radius:5px;cursor:pointer}.users__report-modal .action-types .item.active,.users__report-modal .action-types .item:active,.users__report-modal .action-types .item:hover{color:#fe7300}.users__report-modal .extra-content textarea{width:100%;height:5em}#user-show-detail .git-dashboard-projects-menu>.f-bold{color:#fe7300}#user-show-detail .git-codes-tags{margin-bottom:16px}#user-show-detail .git-user-twl-col>.gitee-headbread{margin-bottom:16px;margin-top:10px}#user-show-detail .git-profile-content-header .git-dashboard-projects-menu{margin-bottom:14px}#user-show-detail .git-profile-content-header .git-dashboard-projects-menu>a{font-size:14px}.recommend-container{padding:24px 0 0!important}.recommend-container .recommend-notice{background-color:#fffeed!important;margin-bottom:24px}.recommend-container .recommend-notice>.header{margin-right:8px!important}.recommend-container .ui.message{color:#40485b;padding:12px 16px;-webkit-box-shadow:0 0 0 1px #e2d8bf inset,0 0 0 0 transparent;box-shadow:inset 0 0 0 1px #e2d8bf,0 0 0 0 transparent}.recommend-container .ui.message i{position:absolute;top:0;right:0;font-size:.8em;margin-top:8px;margin-right:8px;cursor:pointer;color:#005980}.recommend-container .ui.message .header{color:#40485b;font-size:14px}.recommend-container .ui.message .content{margin-top:4px}.recommend-container .recommend-block{margin-bottom:32px}.recommend-container .recommend-block>.items{margin-top:0}.recommend-container .recommend-block .header{margin-bottom:16px}.recommend-container .recommend-block .header strong{font-size:16px}.recommend-container .recommend-block .recommend-list{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.recommend-container .recommend-block .item{margin:0}.recommend-container .recommend-user .header{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:end;-webkit-align-items:flex-end;-moz-box-align:end;-ms-flex-align:end;align-items:flex-end}.recommend-container .recommend-user .recommend-list{-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}';
    console.log([ Cr, Cr ]);
    (() => {
        var mycom = wr(Object.assign((props, children) => {
            const number = eo(1);
            Ae(() => {
                console.log("mounted1");
            });
            Ae(() => {
                console.log("mounted2", props);
            });
            Me(() => {
                console.log("unmounted");
            });
            Mn(props.cccccc, cccccc => {
                console.log("cccccc", cccccc);
            });
            return Cr("div", {
                onclick: () => {
                    number.value++;
                }
            }, [ number, Cr("br", null), "wwwwwwwwwwww", Cr("div", [ "createComponent" ]), children, Cr("div", Cr("", null, "props cccccc ", props.cccccc)) ]);
        }, {
            defaultProps: {
                cccccc: "bbbbbbb"
            },
            css: css$1
        }));
        const myclasscomponent = mycom;
        let vdom = Cr(myclasscomponent, {
            aaaaaa: 222222222,
            tttttt: "dddddddddd"
        }, "children");
        console.log([ vdom, myclasscomponent, mycom ]);
        document.body.appendChild(An(vdom, document.createElement("div")));
        setTimeout(() => {
            vdom.element.forEach(e => {
                e.setAttribute("cccccc", "aaaaaaaaaaaaaaaaaabbbbbbbbbbnnnnnnnnnnnnn");
            });
            vdom = undefined;
        }, 5e3);
        document.body.appendChild(An(Cr(myclasscomponent, [ Cr("form", {
            id: "newsletterForm",
            class: "newsletter-form nodisable",
            name: "newsletter-form",
            action: "https://www.mozilla.org/en-US/newsletter/",
            method: "post"
        }, Cr("div", {
            class: "newsletter-head"
        }, Cr("h2", {
            class: "newsletter-teaser"
        }, "\u5b66\u4e60 Web \u5f00\u53d1\u7684\u6700\u4f73\u5b9e\u8df5"), Cr("p", {
            class: "newsletter-description"
        }, "\u8ba9 MDN \u5c06\u6700\u65b0\u3001\u6700\u68d2\u7684\u5185\u5bb9\u76f4\u63a5\u6295\u9012\u5230\u60a8\u7684\u90ae\u7bb1\u3002"), Cr("p", {
            class: "newsletter-lang"
        }, "\u76ee\u524d\u4ec5\u63d0\u4f9b\u82f1\u6587\u7248\u65b0\u95fb\u62a5\u3002")), Cr("div", {
            class: "newsletter-fields"
        }, Cr("input", {
            type: "hidden",
            id: "fmt",
            name: "fmt",
            value: "H"
        }), Cr("input", {
            type: "hidden",
            id: "newsletterNewslettersInput",
            name: "newsletters",
            value: "app-dev"
        }), Cr("div", {
            id: "newsletterErrors",
            class: "newsletter-errors"
        }), Cr("div", {
            id: "newsletterEmail",
            class: "form-group newsletter-group-email"
        }, Cr("label", {
            for: "newsletterEmailInput",
            class: "form-label offscreen"
        }, "\u7535\u5b50\u90ae\u4ef6\u5730\u5740"), Cr("input", {
            type: "email",
            id: "newsletterEmailInput",
            name: "email",
            class: "form-input newsletter-input-email",
            required: "",
            placeholder: "you@example.com",
            size: "30"
        })), Cr("div", {
            id: "newsletterPrivacy",
            class: "form-group form-group-agree newsletter-group-privacy hidden"
        }, Cr("input", {
            type: "checkbox",
            id: "newsletterPrivacyInput",
            name: "privacy",
            required: ""
        }), Cr("label", {
            for: "newsletterPrivacyInput"
        }, "\u6211\u63a5\u53d7 Mozilla \u6309\u7167", Cr("a", {
            href: "https://www.mozilla.org/privacy/"
        }, "\u9690\u79c1\u653f\u7b56"), "\u6240\u8ff0\u7684\u65b9\u5f0f\u5904\u7406\u6211\u7684\u4fe1\u606f\u3002")), Cr("div", {
            id: "newsletterSubmit",
            class: "newsletter-group-submit"
        }, Cr("button", {
            id: "newsletter-submit",
            type: "submit",
            class: "button neutral newsletter-submit"
        }, "\u7acb\u5373\u6ce8\u518c", Cr("svg", {
            class: "icon icon-arrow",
            xmlns: "http://www.w3.org/2000/svg",
            width: "23",
            height: "28",
            viewBox: "0 0 23 28",
            "aria-hidden": "true"
        }, Cr("path", {
            d: "M23 15a2.01 2.01 0 0 1-.578 1.422L12.25 26.594c-.375.359-.891.578-1.422.578s-1.031-.219-1.406-.578L8.25 25.422c-.375-.375-.594-.891-.594-1.422s.219-1.047.594-1.422L12.828 18h-11C.703 18 0 17.062 0 16v-2c0-1.062.703-2 1.828-2h11L8.25 7.406a1.96 1.96 0 0 1 0-2.812l1.172-1.172c.375-.375.875-.594 1.406-.594s1.047.219 1.422.594l10.172 10.172c.375.359.578.875.578 1.406z"
        })))))) ]), document.createElement("div")));
    })();
    setTimeout(() => {
        Object.values(Object.fromEntries(customElements)).map(c => Un(Cr(c))).forEach(e => document.body.appendChild(e));
    }, 8e3);
    setTimeout(() => {
        Object.values(Object.fromEntries(customElements)).map(c => new c).forEach(e => document.body.appendChild(e));
    }, 8e3);
    const funstate = eo(() => {});
    Mn(funstate, fun => {
        console.log([ funstate, fun ]);
    });
    requestAnimationFrame(() => {
        setTimeout(() => {
            funstate.value = class extends HTMLElement {};
        }, 50);
    });
    console.dir(funstate);
    const com1 = wr(() => {
        return Cr("h1", null, "component 1");
    });
    const com2 = wr(() => {
        return Cr("h1", null, "component 2");
    });
    const com3 = wr(() => {
        return Cr("h1", null, "component 3");
    });
    const com4 = () => {
        return Cr("h1", null, "component 4");
    };
    const mystate = eo(com1);
    const vdom$6 = uo(mystate);
    const element$1 = Un(vdom$6);
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
    Mn(mystate, state => {
        console.log([ state, element$1 ]);
    });
    document.body.appendChild(Un(Cr(() => Cr("div", null, Cr("button", {
        $text: "component 1",
        onclick: () => {
            mystate.value = com1;
        }
    }), Cr("button", {
        $text: "component 2",
        onclick: () => {
            mystate.value = com2;
        }
    }), Cr("button", {
        $text: "component 3",
        onclick: () => {
            mystate.value = com3;
        }
    }), Cr("button", {
        $text: "component 4",
        onclick: () => {
            mystate.value = com4;
        }
    })))));
})();
//# sourceMappingURL=output-es2015.js.map
