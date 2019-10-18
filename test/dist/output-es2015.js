(function() {
    "use strict";
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
    var {Date: t, RegExp: e, Event: n, CustomEvent: r, requestAnimationFrame: i, URL: o, Blob: s, Element: c, Node: u, String: a, Array: f, document: l, Object: h, Reflect: d, Proxy: v, Symbol: p, Boolean: m, Promise: w, Set: y, Math: g, Error: b, TypeError: E, EventTarget: P, JSON: S, Map: O, window: x, clearTimeout: C, setTimeout: L, parseInt: T, globalThis: j, self: k, global: A} = Function("return this")();
    function R(t) {
        return _(t) || $(t) || H(t) || D(t) || "bigint" == typeof t;
    }
    function M(t) {
        return "symbol" == typeof t;
    }
    var N = t => K(t) && "Object" === q(t);
    function D(t) {
        return !t && void 0 === t || null === t;
    }
    function $(t) {
        return "number" == typeof t;
    }
    function H(t) {
        return "boolean" == typeof t;
    }
    function K(t) {
        return "object" == typeof t && null !== t;
    }
    function _(t) {
        return "string" == typeof t;
    }
    function W(t) {
        return "function" == typeof t;
    }
    function F(t) {
        return t instanceof f && f.isArray(t) && "Array" === q(t);
    }
    function q(t) {
        return {}.toString.call(t).replace("[object ", "").replace("]", "").trim();
    }
    function B(t) {
        return "Set" === q(t) && t instanceof y;
    }
    var {HTMLElement: U, customElements: z, Proxy: I} = x;
    if (!W(U) || !W(I) || !K(z)) throw new E;
    var V = x.Reflect, {apply: Z, construct: J, defineProperty: G, deleteProperty: Q, get: X, getOwnPropertyDescriptor: Y, getPrototypeOf: tt, has: et, ownKeys: nt, set: rt} = V;
    function it(t) {
        return !!(W(t) && t.prototype && t.prototype instanceof HTMLElement);
    }
    if (!K(x.customElements)) throw new E;
    x.CustomElementRegistry = X(tt(x.customElements), "constructor");
    var ot = p.for("elementset"), st = p.for("elementmap"), {CustomElementRegistry: ct} = x, ut = x.customElements;
    et(ut, ot) || rt(ut, ot, new y), et(ut, st) || rt(ut, st, {});
    var at = (t, e) => ft(t, e);
    function ft(t, e) {
        var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        if (!it(t)) throw E();
        if (X(ut, ot).has(t)) return function(t, e) {
            var n = h.entries(t).find(t => t[1] === e);
            return n ? n[0] : void 0;
        }(X(ut, st), t);
        {
            var _r = function() {
                var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
                return f(t).fill(void 0).map(() => X(lt, g.floor(g.random() * lt.length))).join("") + "-" + f(t).fill(void 0).map(() => X(dt, g.floor(g.random() * dt.length))).join("");
            }(n);
            return ut.get(_r) ? ft(t, e, n + 1) : (e ? ut.define(_r, t, {
                extends: e
            }) : ut.define(_r, t), _r);
        }
    }
    ut.define = function(t, e, n) {
        if (!it(e)) throw E();
        X(ut, ot).has(e) || (et(ut[st], t) ? ft(e, n ? n.extends : void 0) : (ct.prototype.define.call(ut, t, e, n), 
        ut[ot].add(e), ut[st][t] = e));
    }, rt(ut, p.iterator, () => {
        var t = h.entries(ut[st]);
        return t[p.iterator].call(t);
    });
    var lt = f(26).fill(void 0).map((t, e) => 97 + e).map(t => a.fromCharCode(t)), ht = f(16).fill(void 0).map((t, e) => e).map(t => t.toString(16)), dt = [ ...new y([ ...ht, ...lt ]) ];
    var vt = /\B([A-Z])/g, pt = t => t.replace(vt, "-$1").toLowerCase(), mt = x.String, wt = x.Reflect, {get: yt, set: gt, ownKeys: bt} = wt, Et = "value";
    function Pt(t) {
        return "object" == typeof t && null !== t;
    }
    function St(t) {
        return "string" == typeof t;
    }
    function Ot(t) {
        return t instanceof y;
    }
    var xt = t => "input" === Lt(t) && ("checkbox" === yt(t, "type") || "radio" === yt(t, "type"));
    function Ct(t) {
        !function(t) {
            if (!(t instanceof c)) throw E();
        }(t);
        var e = h.create(null);
        var n = new v(e, {
            ownKeys() {
                var e = kt(t), n = function(t) {
                    return t.getAttributeNames();
                }(t);
                return f.from(new y([ ...n, xt(t) ? "checked" : void 0, e ? Et : void 0 ].flat(1 / 0).filter(t => !!t)));
            },
            get(e, n) {
                var r = kt(t);
                if (xt(t) && "checked" === n) return yt(t, "checked");
                if (r && n === Et) return yt(t, Et);
                {
                    var _e2 = function(t, e) {
                        return t.getAttribute(e);
                    }(t, mt(n));
                    if ("" === _e2) return !0;
                    if (null === _e2) return;
                    if (!St(_e2)) return;
                    try {
                        return S.parse(mt(_e2));
                    } catch (t) {
                        return _e2;
                    }
                }
            },
            set(e, n, r) {
                var i = kt(t);
                if ("function" == typeof r) throw E();
                if ("input" === Lt(t) && "checked" === n) return gt(t, n, r), !0;
                if (i && n === Et) return gt(t, Et, mt(r));
                if ("style" === n) {
                    var _e3 = St(r) ? r : Pt(r) ? (s = r, s = S.parse(S.stringify(s)), h.entries(s).map(_ref => {
                        var [t, e] = _ref;
                        return [ pt(t).trim(), e ];
                    }).map(_ref2 => {
                        var [t, e] = _ref2;
                        return t + ":" + e;
                    }).join(";")) : mt(r);
                    return gt(yt(t, "style"), "cssText", _e3.trim()), !0;
                }
                if ("class" === n && Pt(r)) {
                    var _e4 = (o = r, f.isArray(o) ? r.join(" ") : Ot(r) ? [ ...r ].join(" ") : mt(r));
                    return Tt(t, mt(n), _e4), !0;
                }
                return !1 === r || null == r ? (jt(t, mt(n)), !0) : Ot(r) ? (Tt(t, mt(n), S.stringify([ ...r ])), 
                !0) : (!0 === r && (r = ""), Tt(t, mt(n), Pt(r) ? S.stringify(r) : mt(r)), !0);
                var o, s;
            },
            deleteProperty: (e, n) => (jt(t, mt(n)), !0),
            has: (t, e) => bt(n).includes(e),
            defineProperty: () => !1,
            getOwnPropertyDescriptor(t, e) {
                var r = {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }, i = yt(n, e);
                return void 0 !== i ? _objectSpread2({
                    value: i
                }, r) : void 0;
            },
            setPrototypeOf: () => !1
        });
        return n;
    }
    function Lt(t) {
        return t.tagName.toLowerCase();
    }
    function Tt(t, e, n) {
        return t.setAttribute(e, n);
    }
    function jt(t, e) {
        return t.removeAttribute(e);
    }
    function kt(t) {
        var e = Lt(t);
        return "textarea" === e || "select" === e || "input" === e && "text" === yt(t, "type");
    }
    var At = x.document;
    function Rt(t, e) {
        t.textContent = e;
    }
    function Mt(t, e) {
        t.innerHTML = e;
    }
    function Nt(t, e) {
        t.appendChild(e);
    }
    function Dt() {
        return At.createDocumentFragment();
    }
    function $t(t, e) {
        return At.createElementNS(t, e);
    }
    function Ht(t) {
        return At.createTextNode(a(t));
    }
    var Kt = "http://www.w3.org/2000/svg";
    var _t = "http://www.w3.org/1998/Math/MathML";
    function Wt(t, e, n) {
        t.addEventListener(e, n);
    }
    function Ft(t) {
        return [ ...t.childNodes ];
    }
    function qt(t, e) {
        return Bt.getAttribute.call(t, e);
    }
    var Bt = HTMLElement.prototype;
    var Ut = "attributeChangedCallback";
    class zt extends HTMLElement {
        constructor() {
            super();
            var t = X(this.constructor, "defaultProps"), e = Ct(this);
            K(t) && h.assign(e, t);
        }
        setAttribute(t, e) {
            var n = X(this, Ut), r = qt(this, t);
            r !== e && (!function(t, e, n) {
                Bt.setAttribute.call(t, e, n);
            }(this, t, e), W(n) && n.call(this, t, r, e));
        }
        removeAttribute(t) {
            var e = X(this, Ut), n = qt(this, t);
            var r, i;
            null !== n && (r = this, i = t, Bt.removeAttribute.call(r, i), W(e) && e.call(this, t, n, void 0));
        }
    }
    var Zt = "function" == typeof O, Jt = Zt ? new O : {};
    function Xt(t) {
        var e = {};
        return t.forEach(_ref3 => {
            var [t, n] = _ref3;
            e[t] || (e[t] = new y), n.forEach(n => {
                e[t].add(n);
            });
        }), h.entries(e).map(_ref4 => {
            var [t, e] = _ref4;
            return [ t, [ ...e ] ];
        });
    }
    var Yt = function Yt(t) {
        var e = typeof t;
        return null != t && ("object" == e || "function" == e);
    }, te = void 0 !== j ? j : void 0 !== x ? x : void 0 !== A ? A : void 0 !== k ? k : {}, ee = "object" == typeof te && te && te.Object === h && te, ne = "object" == typeof k && k && k.Object === h && k, re = ee || ne || Function("return this")(), ie = function ie() {
        return re.Date.now();
    }, oe = re.Symbol, se = h.prototype, ce = se.hasOwnProperty, ue = se.toString, ae = oe ? oe.toStringTag : void 0;
    var fe = function fe(t) {
        var e = ce.call(t, ae), n = t[ae];
        try {
            t[ae] = void 0;
            var r = !0;
        } catch (t) {}
        var i = ue.call(t);
        return r && (e ? t[ae] = n : delete t[ae]), i;
    }, le = h.prototype.toString;
    var he = function he(t) {
        return le.call(t);
    }, de = "[object Null]", ve = "[object Undefined]", pe = oe ? oe.toStringTag : void 0;
    var me = function me(t) {
        return null == t ? void 0 === t ? ve : de : pe && pe in h(t) ? fe(t) : he(t);
    };
    var we = function we(t) {
        return null != t && "object" == typeof t;
    }, ye = "[object Symbol]";
    var ge = function ge(t) {
        return "symbol" == typeof t || we(t) && me(t) == ye;
    }, be = NaN, Ee = /^\s+|\s+$/g, Pe = /^[-+]0x[0-9a-f]+$/i, Se = /^0b[01]+$/i, Oe = /^0o[0-7]+$/i, xe = T;
    var Ce = function Ce(t) {
        if ("number" == typeof t) return t;
        if (ge(t)) return be;
        if (Yt(t)) {
            var e = "function" == typeof t.valueOf ? t.valueOf() : t;
            t = Yt(e) ? e + "" : e;
        }
        if ("string" != typeof t) return 0 === t ? t : +t;
        t = t.replace(Ee, "");
        var n = Se.test(t);
        return n || Oe.test(t) ? xe(t.slice(2), n ? 2 : 8) : Pe.test(t) ? be : +t;
    }, Le = "Expected a function", Te = g.max, je = g.min;
    var ke = function ke(t, e, n) {
        var r, i, o, s, c, u, a = 0, f = !1, l = !1, h = !0;
        if ("function" != typeof t) throw new E(Le);
        function d(e) {
            var n = r, o = i;
            return r = i = void 0, a = e, s = t.apply(o, n);
        }
        function v(t) {
            var n = t - u;
            return void 0 === u || n >= e || n < 0 || l && t - a >= o;
        }
        function p() {
            var t = ie();
            if (v(t)) return m(t);
            c = L(p, function(t) {
                var n = e - (t - u);
                return l ? je(n, o - (t - a)) : n;
            }(t));
        }
        function m(t) {
            return c = void 0, h && r ? d(t) : (r = i = void 0, s);
        }
        function w() {
            var t = ie(), n = v(t);
            if (r = arguments, i = this, u = t, n) {
                if (void 0 === c) return function(t) {
                    return a = t, c = L(p, e), f ? d(t) : s;
                }(u);
                if (l) return C(c), c = L(p, e), d(u);
            }
            return void 0 === c && (c = L(p, e)), s;
        }
        return e = Ce(e) || 0, Yt(n) && (f = !!n.leading, o = (l = "maxWait" in n) ? Te(Ce(n.maxWait) || 0, e) : o, 
        h = "trailing" in n ? !!n.trailing : h), w.cancel = function() {
            void 0 !== c && C(c), a = 0, r = u = i = c = void 0;
        }, w.flush = function() {
            return void 0 === c ? s : m(ie());
        }, w;
    };
    var Ae = new O, Re = new O, Me = new O;
    var Ne, De;
    var $e = p("addonelistner"), He = p("removeonelistner"), Ke = p("cancelsubscribe"), _e = p("debouncedispatch");
    function We(t) {
        return t instanceof Ve && "ReactiveState" === q(t);
    }
    var Fe = p("eventtatget"), qe = p("memlisteners"), Be = p("dispatch"), Ue = p("subscribe"), ze = p("removeallisteners"), Ie = p("addallisteners");
    class Ve {
        constructor(t) {
            this[p.toStringTag] = "ReactiveState", this[Ne] = new P, this[De] = new y, this.valueOf = () => this.value, 
            this.value = t, G(this, "value", {
                value: t,
                configurable: !0,
                writable: !0
            });
            var e = ke(t => {
                var e = t ? a(t) : "value";
                this[Fe].dispatchEvent(new r("value", {
                    detail: e
                }));
            });
            this[_e] = t => {
                e(t);
            };
        }
        [ze]() {
            this[qe].forEach(t => {
                this[He](t);
            });
        }
        [He](t) {
            this[Fe].removeEventListener("value", t);
        }
        [$e](t) {
            this[Fe].addEventListener("value", t);
        }
        [Ie]() {
            this[qe].forEach(t => {
                this[$e](t);
            });
        }
        toString() {
            var t = this.valueOf();
            return R(t) ? a(t) : B(t) ? S.stringify([ ...t ]) : K(t) ? S.stringify(t) : "";
        }
        [(Ne = Fe, De = qe, Be)](t) {
            this[_e](t);
        }
        [Ue](t) {
            var e;
            var n = Ae.get(t);
            n ? e = n : (e = () => t(), Ae.set(t, e)), this[qe].add(e);
        }
        [Ke](t) {
            var e = Ae.get(t);
            e && (this[qe].delete(e), this[He](e));
        }
        [p.toPrimitive]() {
            var t = this.valueOf();
            return R(t) ? t : K(t) ? S.stringify(t) : void 0;
        }
    }
    var Ze = /[A-Za-z\u4e00-\u9fa5]/;
    function Je(t) {
        return K(t) && X(t, Ge) === Ge;
    }
    var Ge = p("isvirtualelement");
    function Qe(t) {
        var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        e = h.assign({}, e), n = n.flat(1 / 0);
        var r = h.entries(e), i = r.filter(_ref5 => {
            var [t] = _ref5;
            return !(t.startsWith("@") || t.startsWith("on"));
        }), o = i.filter(_ref6 => {
            var [t] = _ref6;
            return Ze.test(t[0]);
        }), s = h.create(null);
        return [ "onevent", "element", "type", "props", "children", "directives", "bindattr" ].forEach(t => {
            G(s, t, {
                writable: !0
            });
        }), h.assign(s, {
            type: t,
            bindattr: h.fromEntries(o.filter(t => We(t[1]))),
            props: h.fromEntries(o.filter(t => !We(t[1]))),
            children: n,
            onevent: h.fromEntries(Xt([ ...r.filter(_ref7 => {
                var [t] = _ref7;
                return "@" == t[0];
            }).map(_ref8 => {
                var [t, e] = _ref8;
                return [ t.slice(1).toLowerCase().trim(), [ e ].flat(1 / 0) ];
            }), ...r.filter(_ref9 => {
                var [t] = _ref9;
                return t.startsWith("on");
            }).map(_ref10 => {
                var [t, e] = _ref10;
                return [ t.slice(2).toLowerCase().trim(), [ e ].flat(1 / 0) ];
            }) ])),
            directives: h.fromEntries(i.filter(_ref11 => {
                var [t] = _ref11;
                return "*" === t[0] || "_" === t[0] || "$" === t[0];
            }).map(_ref12 => {
                var [t, e] = _ref12;
                return [ t.slice(1).toLowerCase().trim(), e ];
            }))
        }), G(s, p.toStringTag, {
            value: "VirtualElement"
        }), G(s, Ge, {
            value: Ge
        }), s;
    }
    function Xe(t, e) {
        for (var _len = arguments.length, n = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            n[_key - 2] = arguments[_key];
        }
        return F(e) ? Z(Ye, void 0, [ t, void 0, [ ...e, ...n ].flat(1 / 0) ]) : Z(Ye, void 0, arguments);
    }
    function Ye(t) {
        var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var r = _(t) || W(t) ? t : "";
        for (var _len2 = arguments.length, n = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            n[_key2 - 2] = arguments[_key2];
        }
        var i = N(e) ? e : {}, o = n.flat(1 / 0).map(t => 0 === t ? "0" : t).filter(t => !!t);
        return _(r) && (r = r.trim().toLowerCase()), "" === r ? o : Z(Qe, void 0, [ r, i, o ]);
    }
    function tn(t) {
        return (F(t) ? t : [ t ]).flat(1 / 0).filter(t => !D(t));
    }
    function en(t) {
        if (_(t)) return !0;
        if ($(t)) return !0;
        return F(t) ? t.every(t => en(t)) : Je(t) ? en(t.children) : !!We(t);
    }
    function rn(t, e) {
        var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
        return n && Rt(e, ""), tn(t).flat(1 / 0).forEach(t => Nt(e, t)), e;
    }
    function on(t) {
        return l.documentElement === function(t) {
            for (;t && t.parentNode && t.parentNode !== l; ) {
                t = t.parentNode;
            }
            return t;
        }(t);
    }
    var sn = [];
    var cn = !1, un = new y, an = new y, fn = new y;
    function ln(t) {
        cn && fn.add(t);
    }
    function hn(t) {
        if (!W(t)) throw E();
        if (!cn) throw b();
        un.add(t);
    }
    function dn(t) {
        if (!W(t)) throw E();
        if (!cn) throw b();
        an.add(t);
    }
    function vn() {
        cn = !1, pn();
    }
    function pn() {
        un = new y, an = new y, fn = new y, sn = [];
    }
    function mn(t, e) {
        if (F(t) || We(t)) {
            var _n2 = tn(t);
            if (!_n2.length) throw new b;
            var _r2 = ke(e), _o = _n2.map(t => {
                var o = (() => {
                    var t = Me.get(e);
                    if (t) return t;
                    {
                        var _t2 = () => {
                            _r2(..._n2.map(t => t.valueOf()));
                        };
                        return Me.set(e, _t2), _t2;
                    }
                })();
                return function(t, e) {
                    if (!We(t) || !W(e)) throw E();
                    t[Ue](e), i(() => {
                        wn(t);
                    }), function(t, e) {
                        cn && sn.push([ t, e ]);
                    }(t, e);
                }(t, o), [ t, o ];
            });
            return () => {
                _o.forEach(_ref13 => {
                    var [t, e] = _ref13;
                    t[Ke](e);
                });
            };
        }
        throw new E;
    }
    function wn(t) {
        t[Ie]();
    }
    function yn() {
        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        if (!N(t)) throw new E;
        return h.entries(t).forEach(_ref14 => {
            var [t, e] = _ref14;
            if ("function" != typeof e) throw E();
            if (bn[t]) throw new b;
            d.set(bn, t, e);
        }), bn;
    }
    var {requestAnimationFrame: gn} = x, bn = {
        ref(t, e, n) {
            if (W(t)) Z(t, void 0, [ e ]); else {
                if (!K(t)) throw E();
                rt(t, "value", e);
            }
        }
    };
    function En(t, e) {
        return function(e, n) {
            var r = e;
            if (_(n)) gn(() => {
                t(e, n);
            }); else {
                if (!We(n)) throw E();
                mn(n, () => {
                    var i = n;
                    on(r) && t(e, a(i));
                }), gn(() => {
                    t(e, a(n));
                });
            }
        };
    }
    yn({
        html(t, e, n) {
            En(Mt)(e, t);
        },
        text(t, e, n) {
            En(Rt)(e, t);
        }
    });
    var Pn = p("component");
    var Sn = p("eventlisteners");
    function On(t, e, n) {
        !function(t, e, n) {
            var r = t;
            n.forEach(n => {
                if (!W(n)) throw E();
                et(r, Sn) || rt(r, Sn, []), X(t, Sn).push([ e, n ]), Wt(t, e, n);
            });
        }(t, e, tn(n));
    }
    var xn = p("bindstate"), Cn = p("virtualelement");
    function Ln(t) {
        throw E();
    }
    function Tn(t, e) {
        if (F(t)) return t.map(t => Tn(t)).flat(1 / 0);
        if ($(t) || _(t)) {
            var _e5 = Ht(t);
            return rt(_e5, Cn, t), _e5;
        }
        if (We(t)) {
            var _e6 = t, _n3 = Ht(a(_e6));
            rt(_n3, Cn, t), mn(_e6, () => {
                var t = _e6;
                on(_r3) && function(t, e) {
                    t.nodeValue = a(e);
                }(_n3, a(t));
            });
            var _r3 = _n3;
            return rt(_r3, xn, new y), X(_r3, xn).add(_e6), _n3;
        }
        if (Je(t)) {
            var {type: _r4} = t;
            var _i = void 0;
            if ("string" == typeof _r4) {
                if ("script" === _r4) return Dt();
                if ("svg" === _r4) _i = $t(Kt, "svg"); else if ("math" === _r4) _i = $t(_t, "math"); else {
                    if ("" === _r4 || "html" === _r4) {
                        var _e7 = Dt();
                        return rn(Tn(t.children), _e7), _e7;
                    }
                    _i = e ? $t(e, _r4) : function(t) {
                        return At.createElement(t);
                    }(_r4);
                }
            } else if ("function" == typeof _r4) {
                K(_r4.defaultProps) && (t.props = S.parse(S.stringify(_objectSpread2({}, _r4.defaultProps, {}, t.props))));
                var _e8 = S.parse(S.stringify(_objectSpread2({}, t.props, {}, h.fromEntries(h.entries(t.bindattr).map(_ref15 => {
                    var [t, e] = _ref15;
                    return [ t, e.value ];
                })))));
                _i = function(t, e, n) {
                    if (it(t)) return at(t), J(t, [ e, n ]);
                    throw E();
                }(_r4, _e8, t.children);
            } else Ln();
            return _r4 && (W(_r4) || _(_r4)) && (W(n = _r4) && X(n, Pn) === Pn || _i && rn(t.children.map(t => "svg" === _r4 && Je(t) ? Tn(t, Kt) : "math" === _r4 && Je(t) ? Tn(t, _t) : e && Je(t) ? Tn(t, e) : Tn(t)), _i)), 
            _i && function(t, e) {
                ((t, e) => {
                    h.entries(e.directives).forEach(_ref16 => {
                        var [n, r] = _ref16;
                        if (!W(bn[n])) throw new b;
                        bn[n](r, t, e);
                    });
                    var n = Ct(t);
                    h.assign(n, e.props), rt(t, Cn, e), e.element = t, h.entries(e.bindattr).forEach(_ref17 => {
                        var [e, r] = _ref17;
                        n[e] = r.valueOf(), mn(r, () => {
                            var i = r;
                            on(t) && (n[e] = i.valueOf());
                        });
                    }), h.entries(e.onevent).forEach(_ref18 => {
                        var [e, n] = _ref18;
                        On(t, e, n);
                    });
                })(t, e), [ ...h.values(e.bindattr), ...h.values(e.directives) ].flat(1 / 0).filter(t => We(t)).forEach(e => {
                    et(t, xn) || rt(t, xn, new y), X(t, xn).add(e);
                });
            }(_i, t), _i;
        }
        var n;
        throw Ln(), new b;
    }
    function jn(t, e) {
        if (F(t) && !(t = t.flat(1 / 0)).length) throw new E;
        var n = e;
        if (!(n instanceof HTMLElement)) throw E();
        if (n === At.body || n === At.documentElement || n === At.head) throw b();
        var r = tn(t);
        if (en(t)) rn(Tn(r), e); else {
            if (!(kn(t) || (i = t, F(i) && i.length && i.every(t => kn(t))))) throw E();
            rn(r, e);
        }
        var i;
        return e;
    }
    function kn(t) {
        return t instanceof u;
    }
    function An(t) {
        return new v(t, {
            set: () => !0,
            defineProperty: () => !1,
            deleteProperty: () => !1,
            setPrototypeOf: () => !1
        });
    }
    function Rn(t, e) {
        if (!F(t) && !We(t) || !W(e)) throw E();
        var n = tn(t);
        if (!n.length) throw new b;
        var r = function(t, e) {
            var n = new Ve, r = () => {
                var n = Z(e, void 0, t.map(t => t.valueOf())), r = We(n) ? n.valueOf() : n;
                if (K(r) || R(r)) return r;
                throw E();
            };
            var i = r();
            return G(n, "value", {
                get: r,
                configurable: !0
            }), t.forEach(t => {
                mn(t, () => {
                    var t = r();
                    t !== i && (n[Be](), i = t);
                });
            }), An(Nn(n));
        }(n, e);
        return ln(r), r;
    }
    var Mn = "__proto__";
    function Nn(t) {
        return new v(t, {
            getOwnPropertyDescriptor: (t, e) => M(e) ? void 0 : Y(t, e),
            ownKeys(t) {
                var e = X(t, "value");
                var n = K(e) ? e : e[Mn];
                return f.from(new y([ ...nt(t), ...nt(n) ]));
            },
            has(t, e) {
                var n = X(t, "value"), r = K(n) ? n : n[Mn];
                return et(t, e) || et(r, e);
            },
            get(t, e) {
                if (et(t, e)) return X(t, e);
                {
                    var _n4 = X(t, "value"), _r5 = K(_n4) ? _n4 : h(_n4);
                    if (et(_r5, e)) {
                        var _t3 = X(_r5, e);
                        return W(_t3) ? _t3.bind(_r5) : _t3;
                    }
                }
            }
        });
    }
    var Dn = y.prototype, $n = O.prototype;
    function Hn(t) {
        return t instanceof O;
    }
    function Kn(t) {
        return t instanceof y;
    }
    function _n(t) {
        return f.isArray(t);
    }
    var Wn = x.Reflect, {ownKeys: Fn, deleteProperty: qn, apply: Bn, construct: Un, defineProperty: zn, get: In, getOwnPropertyDescriptor: Vn, getPrototypeOf: Zn, has: Jn, set: Gn, setPrototypeOf: Qn} = Wn;
    function Xn(t) {
        return "object" == typeof t && null !== t;
    }
    function Yn(t) {
        return "function" == typeof t;
    }
    function tr(n, r) {
        var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var o = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : n;
        if (!Yn(r)) throw b();
        if (n instanceof w || function(t) {
            return t instanceof e;
        }(n) || function(e) {
            return e instanceof t;
        }(n)) return n;
        if (Yn(n) || Xn(n)) {
            var _t4;
            return Kn(n) ? (_t4 = new y([ ...n ]), Gn(_t4, "add", e => (Dn.add.call(n, e), r(o, i, void 0, void 0), 
            Dn.add.call(_t4, e))), Gn(_t4, "delete", e => (Dn.delete.call(n, e), r(o, i, void 0, void 0), 
            Dn.delete.call(_t4, e))), Gn(_t4, "clear", () => (Dn.clear.call(n), r(o, i, void 0, void 0), 
            Dn.clear.call(_t4)))) : Hn(n) ? (_t4 = new O([ ...n ]), Gn(_t4, "clear", () => ($n.clear.call(n), 
            r(o, i, void 0, void 0), $n.clear.call(_t4))), Gn(_t4, "set", (e, s) => ($n.set.call(n, e, s), 
            r(o, i, void 0, void 0), $n.set.call(_t4, e, s))), Gn(_t4, "delete", e => ($n.delete.call(n, e), 
            r(o, i, void 0, void 0), $n.delete.call(_t4, e)))) : _t4 = _n(n) ? [] : Yn(n) ? () => {} : {}, 
            Kn(n) || Hn(n) || Qn(_t4, null), new v(_t4, {
                defineProperty: (t, e, s) => (r(o, [ ...i, a(e) ], Jn(s, "value") ? s.value : Yn(s.get) ? s.get() : void 0, In(n, e)), 
                zn(n, e, s)),
                deleteProperty: (t, e) => (r(o, [ ...i, a(e) ], void 0, In(n, e)), qn(n, e)),
                ownKeys: () => Fn(n),
                has: (t, e) => Jn(n, e),
                getPrototypeOf: () => Zn(n),
                setPrototypeOf: (t, e) => Qn(n, e),
                construct(t, e) {
                    if (Yn(n)) return Un(n, e);
                },
                apply(t, e, r) {
                    if (Yn(n)) return Bn(n, e, r);
                },
                getOwnPropertyDescriptor(t, e) {
                    var r = Vn(n, e);
                    return _n(n) && "length" === e ? r : r ? (r.configurable = !0, r) : void 0;
                },
                set: (t, e, s) => (Yn(r) && r(o, [ ...i, a(e) ], s, In(n, e)), Gn(n, e, s)),
                get(e, o) {
                    var s = In(n, o);
                    return Yn(s) && (Kn(n) || Hn(n)) ? In(_t4, o).bind(_t4) : Yn(s) || Xn(s) ? tr(s, r, [ ...i, a(o) ], n) : s;
                }
            });
        }
        return n;
    }
    function er(t, e) {
        if (!Yn(e)) throw b();
        if (!Yn(v)) throw b();
        return Yn(t) || Xn(t) ? tr(t, e) : t;
    }
    var nr = y.prototype;
    function rr(t) {
        var e = function t(e) {
            if (R(e) || W(e)) return Nn(new v(new Ve(e), {
                defineProperty: () => !1,
                deleteProperty: () => !1,
                set(t, n, r) {
                    if ("value" === n && (R(r) && R(e) || W(r) && W(e))) return t[n] !== r && (rt(t, n, r), 
                    t[Be]()), !0;
                    throw E();
                },
                setPrototypeOf: () => !1
            }));
            if (We(e)) return t(e.valueOf());
            if (K(e)) return function(t) {
                var e = t;
                var n = N(t) && h.values(t).some(t => We(t)), r = h.entries(t).filter(t => {
                    return We(t[1]);
                });
                n && (e = _objectSpread2({}, t), r.forEach(_ref19 => {
                    var [t, n] = _ref19;
                    G(e, t, {
                        enumerable: !0,
                        get: () => n.valueOf(),
                        configurable: !0
                    });
                }));
                var i = new Ve(e);
                n && r.forEach(_ref20 => {
                    var [t, e] = _ref20;
                    mn(e, () => {
                        i[Be](a(t));
                    });
                });
                var o = {
                    ownKeys: t => f.from(new y([ ...nt(t), ...nt(X(t, "value")) ])),
                    setPrototypeOf: () => !1,
                    defineProperty: () => !1,
                    getOwnPropertyDescriptor: (t, e) => {
                        if (M(e)) return;
                        var n = X(t, "value"), r = Y(t, e) || Y(n, e);
                        return r && (r.configurable = !0), r;
                    },
                    deleteProperty: (t, e) => {
                        var n = X(t, "value");
                        return !et(n, e) || (Q(n, e), t[Be](a(e)), !0);
                    },
                    has: (t, e) => {
                        var n = X(t, "value");
                        return et(t, e) || et(n, e);
                    },
                    get: (t, e) => {
                        var n = X(t, "value");
                        if ("value" === e && (F(n) || N(n))) return er(X(t, e), (e, n) => {
                            t[Be](n[0]);
                        });
                        if (et(t, e)) return X(t, e);
                        if (et(n, e)) {
                            if (!B(n) || "add" !== e && "clear" !== e && "delete" !== e) return K(n) ? er(X(n, e), () => {
                                t[Be](a(e));
                            }) : X(n, e);
                            switch (e) {
                              case "add":
                                return (r => {
                                    if (!nr.has.call(n, r)) {
                                        var _i2 = nr[e].call(n, r);
                                        return t[Be](), _i2;
                                    }
                                }).bind(n);

                              case "delete":
                                return (r => {
                                    if (nr.has.call(n, r)) {
                                        var _i3 = nr[e].call(n, r);
                                        return t[Be](), _i3;
                                    }
                                }).bind(n);

                              case "clear":
                                return (() => {
                                    if (n.size) {
                                        var _r6 = nr[e].call(n);
                                        return t[Be](), _r6;
                                    }
                                }).bind(n);
                            }
                        }
                    },
                    set: (e, n, r) => {
                        We(r) && (r = r.valueOf());
                        var i = X(e, "value");
                        if ("value" === n && K(r) && (F(t) && F(r) || !F(t) && !F(r))) return rt(e, n, r), 
                        e[Be](), !0;
                        if (et(e, n)) throw E();
                        return rt(i, n, r), e[Be](a(n)), !0;
                    }
                };
                return new v(i, o);
            }(e);
            throw b();
        }(t);
        return ln(e), e;
    }
    function ir(t) {
        var e = Tn(Xe("style", [ t ]));
        return Nt(At.implementation.createHTMLDocument("").documentElement, e), f.from(X(X(e, "sheet"), "cssRules"));
    }
    function or(t, e) {
        return t.map(t => {
            if (function(t) {
                return "CSSStyleRule" === q(t);
            }(t)) {
                return function(t, e) {
                    var n = t.selectorText, r = t.cssText.slice(n.length), i = n.split(",").map(t => {
                        var n = e + " " + t;
                        return t.startsWith("*") && (n = n + "," + t.replace("*", e)), n;
                    }).join(",");
                    return {
                        type: t.type,
                        parentRule: t.parentRule,
                        parentStyleSheet: t.parentStyleSheet,
                        style: t.style,
                        styleMap: X(t, "styleMap"),
                        selectorText: i,
                        cssText: i + r,
                        [p.toStringTag]: "CSSStyleRule"
                    };
                }(t, e);
            }
            return function(t) {
                return "CSSMediaRule" === q(t);
            }(t) ? (or([ ...t.cssRules ], e), t) : function(t) {
                return "CSSImportRule" === q(t);
            }(t) ? void cr(e, void 0, t.href) : t;
        }).filter(m);
    }
    var sr = {};
    function cr(t, e, n) {
        var r;
        t = t.toLowerCase(), sr[t] || (sr[t] = new y), e ? sr[t].add((r = e, o.createObjectURL(new s([ r ], {
            type: "text/css"
        })))) : n && sr[t].add(n);
    }
    function ur(t, e) {
        cr(e, function(t, e) {
            return or(ir(t), e).filter(m).map(t => t.cssText).join("\n");
        }(t, e));
    }
    function ar(_x, _x2) {
        return _ar.apply(this, arguments);
    }
    function _ar() {
        _ar = _asyncToGenerator((function*(t, e) {
            yield w.all([ ...sr[t] ].map(t => (function(t, e) {
                return new w(n => {
                    var r = () => {
                        t.onload = t.onerror = null, n();
                    };
                    t.onload = r, t.onerror = r, Nt(e, t);
                });
            })(function(t) {
                return Tn(Xe("link", {
                    href: t,
                    rel: "stylesheet"
                }));
            }(t), e)));
        }));
        return _ar.apply(this, arguments);
    }
    var fr = p("readystate");
    function lr(t) {
        return w.resolve().then(() => t());
    }
    var hr = p("innerwatchrecord"), dr = p("innerstate"), vr = p("attributes"), pr = p("innerelement"), mr = p("innervdom"), wr = p("mounted"), yr = p("unmounted");
    function gr(t) {
        var e, n, r;
        if (W(t)) {
            var _i4 = Re.get(t);
            if (_i4) return _i4;
            var _o2 = X(t, "defaultProps"), _s = X(t, "css");
            class _c extends zt {
                constructor() {
                    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                    var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
                    super(), this[e] = {}, this[r] = !1;
                    var o = X(this.constructor, "css");
                    if (o) {
                        var _t5 = this.tagName.toLowerCase();
                        sr[_t5] || ur(o, _t5);
                    }
                    var s = Ct(this);
                    K(n) && h.assign(s, n);
                    var c = s;
                    cn = !0, pn();
                    var u = h.fromEntries(h.entries(c).map(_ref21 => {
                        var [t, e] = _ref21;
                        return [ t, rr(e) ];
                    }));
                    this[vr] = u;
                    var a = An(h.fromEntries(h.entries(u).map(_ref22 => {
                        var [t, e] = _ref22;
                        return [ t, An(e) ];
                    })));
                    var f;
                    try {
                        f = Z(t, void 0, [ a, i.flat(1 / 0) ]);
                    } catch (t) {
                        throw vn(), t;
                    }
                    if (F(f) && (f = f.flat(1 / 0).filter(m)), !en(f)) throw vn(), E();
                    {
                        var _t6 = tn(f);
                        this[mr] = _t6.flat(1 / 0).filter(m), this[wr] = [ ...un ], this[yr] = [ ...an ], 
                        this[dr] = [ ...fn ], this[hr] = [ ...sn ], vn();
                    }
                }
                connectedCallback() {
                    var _this = this;
                    return _asyncToGenerator((function*() {
                        if (_this[pr] || (_this[pr] = Tn(_this[mr]).flat(1 / 0)), !_this[fr]) {
                            _this[fr] = !0;
                            var _t7 = X(_this.constructor, "css"), _e9 = _this.tagName.toLowerCase();
                            _t7 && sr[_e9] ? (Rt(_this, ""), ar(_e9, _this).then(() => {
                                rn(_this[pr], _this, !1);
                            })) : rn(_this[pr], _this);
                        }
                        _this[wr].forEach(t => {
                            lr(t);
                        }), br(_this);
                    }))();
                }
                disconnectedCallback() {
                    var _this2 = this;
                    return _asyncToGenerator((function*() {
                        _this2[yr].forEach(t => {
                            lr(t);
                        }), Er(_this2);
                    }))();
                }
                [(e = vr, n = Pn, r = fr, Ut)](t) {
                    if (this[fr]) {
                        var _e10 = this[vr][t], _n5 = Ct(this);
                        _e10 && (_e10.value = _n5[t]);
                    }
                }
            }
            return _c[n] = Pn, _c.css = _(_s) && _s ? _s : void 0, _c.defaultProps = K(_o2) ? S.parse(S.stringify(_o2)) : void 0, 
            Re.set(t, _c), _c;
        }
        throw E();
    }
    function br(t) {
        if (F(t)) t.forEach(t => {
            br(t);
        }); else if (kn(t)) {
            if (function(t) {
                et(t, Sn) && X(t, Sn).forEach(_ref23 => {
                    var [e, n] = _ref23;
                    Wt(t, e, n);
                });
            }(t), et(t, xn) && X(t, xn).forEach(t => {
                wn(t), t[Be]();
            }), et(t, dr) && X(t, dr).forEach(t => {
                wn(t);
            }), et(t, hr)) {
                X(t, hr).forEach(_ref24 => {
                    var [t, e] = _ref24;
                    var n = Ae.get(e);
                    n && t[$e](n);
                });
            }
            br(Ft(t));
        }
    }
    function Er(t) {
        if (F(t)) t.forEach(t => {
            Er(t);
        }); else if (kn(t)) {
            if (function(t) {
                et(t, Sn) && X(t, Sn).forEach(_ref25 => {
                    var [e, n] = _ref25;
                    !function(t, e, n) {
                        t.removeEventListener(e, n);
                    }(t, e, n);
                });
            }(t), et(t, dr) && X(t, dr).forEach(t => {
                !function(t) {
                    t[ze]();
                }(t);
            }), et(t, hr)) {
                X(t, hr).forEach(_ref26 => {
                    var [t, e] = _ref26;
                    var n = Ae.get(e);
                    n && t[He](n);
                });
            }
            Er(Ft(t));
        }
    }
    var Pr = p("truevdom"), Sr = p("falsevdom"), Or = p("trueele"), xr = p("falseele"), Cr = p("handletrue"), Lr = p("handlefalse");
    function Tr(t, e, n) {
        var r, i;
        if (!We(t) && !H(t)) throw E();
        [ e, n ].forEach(t => {
            if (!D(t) && !en(t)) throw new E;
        });
        var o = {
            true: e,
            false: n
        };
        class s extends zt {
            constructor() {
                super(), this[i] = !1;
                var t = X(o, "true"), e = X(o, "false");
                this[Pr] = [ t ].flat(1 / 0).filter(m), this[Sr] = [ e ].flat(1 / 0).filter(m);
            }
            [(r = Pn, i = fr, Lr)]() {
                if (Mt(this, ""), this[Sr]) {
                    this[xr] || (this[xr] = Tn(this[Sr]));
                    var _t8 = this[xr];
                    rn(_t8, this), _t8.forEach(t => br(t)), this[Or] && this[Or].forEach(t => Er(t));
                }
            }
            [Cr]() {
                if (Mt(this, ""), this[Pr]) {
                    this[Or] || (this[Or] = Tn(this[Pr]));
                    var _t9 = this[Or];
                    rn(_t9, this), _t9.forEach(t => br(t)), this[xr] && this[xr].forEach(t => Er(t));
                }
            }
            connectedCallback() {
                var _this3 = this;
                return _asyncToGenerator((function*() {
                    if (!_this3[fr]) {
                        _this3[fr] = !0;
                        var _t10 = Ct(_this3);
                        !0 === _t10.value && X(_this3, Cr).call(_this3), !1 === _t10.value && X(_this3, Lr).call(_this3);
                    }
                    br(_this3);
                }))();
            }
            disconnectedCallback() {
                var _this4 = this;
                return _asyncToGenerator((function*() {
                    Er(_this4);
                }))();
            }
            [Ut](t) {
                if (this[fr] && "value" === t) {
                    var _t11 = Ct(this);
                    !0 === _t11.value && this[Cr](), !1 === _t11.value && this[Lr]();
                }
            }
        }
        return s[r] = Pn, Xe(s, {
            value: t
        });
    }
    function jr(t, e, n, r, i, o) {
        if (!We(i)) throw E();
        if (!t.includes(o.type)) throw E();
        rt(o.bindattr, e, i), r.forEach(t => {
            var e = tn(o.onevent[t]);
            rt(o.onevent, t, tn([ ...e, t => i.value = X(t.target, n) ]).filter(m));
        });
    }
    function kr(t) {
        return {
            value: t
        };
    }
    yn({
        value(t, e, n) {
            jr([ "input", "textarea", "select" ], "value", "value", [ "change", "input" ], t, n);
        },
        checked(t, e, r) {
            jr([ "input" ], "checked", "checked", [ "change", "click" ], t, r);
            var i = tn(r.onevent.click);
            rt(r.onevent, "click", tn([ ...i, t => {
                var e = t.target, r = t.target.name;
                r && function(t) {
                    return [ ...At.querySelectorAll(t) ];
                }("input[name=".concat(r, "]")).filter(t => t !== e).forEach(t => {
                    t.dispatchEvent(new n("change"));
                });
            } ]).filter(m));
        }
    });
    var Ar = p("listvalueattr"), Rr = p("listinnervdom"), Mr = p("listinnerelement"), Nr = p("cached_vdom"), Dr = p("cached_realele");
    function $r(t, e) {
        var n, r, i, o, s;
        if (!F(t) && !B(t) && !We(t)) throw new E;
        if (!W(e)) throw new E;
        var c = gr(h.assign(t => {
            var {value: n, index: r} = t, i = n, o = r.valueOf();
            return e(i, o);
        }, {
            defaultProps: {
                index: 0,
                value: void 0
            }
        })), u = (t, e) => Xe(c, {
            value: t,
            index: e
        });
        class a extends zt {
            constructor() {
                super(), this[n] = {}, this[r] = {}, this[i] = rr([]), this[s] = !1;
            }
            [(n = Nr, r = Dr, i = Ar, o = Pn, s = fr, Ut)](t) {
                if (this[fr] && "value" === t) {
                    var _t12 = Ct(this).value;
                    if (!F(_t12)) throw new E;
                    rt(this[Ar], "value", _t12);
                    var _e11 = Ft(this), _n6 = _t12.length, _r7 = _e11.length;
                    if (_n6 > _r7) {
                        var _t13 = f(_n6).fill(void 0).map((t, e) => e).slice(_r7).map(t => {
                            var e = X(this[Nr], t);
                            if (e) return e;
                            {
                                var _e13 = u(Rn(this[Ar], e => e[t]), t);
                                return rt(this[Nr], t, _e13), _e13;
                            }
                        }), _e12 = _t13.map(t => {
                            var e = t.props.index, n = X(this[Dr], e);
                            if (n) return n;
                            {
                                var _n7 = Tn(t);
                                return rt(this[Dr], e, _n7), _n7;
                            }
                        });
                        this[Rr].push(..._t13), this[Mr].push(..._e12), _e12.forEach(t => Nt(this, t));
                    } else _n6 < _r7 && (this[Rr] = this[Rr].slice(0, _n6), this[Mr] = this[Mr].slice(0, _n6), 
                    Ft(this).slice(_n6).forEach(t => (function(t) {
                        var e = t.parentNode;
                        e && e.removeChild(t);
                    })(t)));
                }
            }
            disconnectedCallback() {
                var _this5 = this;
                return _asyncToGenerator((function*() {
                    Er(_this5);
                }))();
            }
            connectedCallback() {
                var _this6 = this;
                return _asyncToGenerator((function*() {
                    if (!_this6[fr]) {
                        _this6[fr] = !0;
                        var _t14 = Ct(_this6).value;
                        if (!F(_t14)) throw new E;
                        rt(_this6[Ar], "value", _t14), _this6[Rr] = _t14.map((t, e) => u(Rn(_this6[Ar], t => t[e]), e)), 
                        _this6[Mr] = Tn(_this6[Rr]), h.assign(_this6[Nr], _this6[Rr]), h.assign(_this6[Dr], _this6[Mr]), 
                        rn(_this6[Mr], _this6);
                    }
                    br(_this6);
                }))();
            }
        }
        return a.defaultProps = {
            value: []
        }, a[o] = Pn, Xe(a, {
            value: t
        });
    }
    console.log([ Xe, Xe ]);
    function useMousePosition() {
        var x = rr(0);
        var y = rr(0);
        function update(e) {
            x.value = e.pageX;
            y.value = e.pageY;
        }
        hn(() => {
            window.addEventListener("mousemove", update);
        });
        dn(() => {
            window.removeEventListener("mousemove", update);
        });
        return {
            x: x,
            y: y
        };
    }
    var mycomapp = gr(() => {
        var {x: x, y: y} = useMousePosition();
        var plus = Rn(x, x => {
            return x + 100;
        });
        var multi = Rn([ x, y ], (x, y) => {
            return x * y;
        });
        var count = 0;
        var cancelwatch = mn([ x, y, multi, plus ], (function() {
            if (count === 0) {
                console.time("watchmousemove50");
            }
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            console.log(count, args);
            count++;
            if (count > 50) {
                cancelwatch();
                console.timeEnd("watchmousemove50");
            }
        }));
        return Xe("div", null, Xe("h3", null, " \u9f20\u6807\u4f4d\u7f6e"), Xe("h2", null, "x:", x), Xe("h1", null, "y:", y), Xe("p", null, "x+100 \u662f", plus), Xe("p", null, "x*y \u662f", multi));
    });
    mycomapp.css = "\n*{font-size:80px !important;}\np{color:blue !important;}\n";
    var vdom = Xe(mycomapp);
    document.body.appendChild(jn(vdom, document.createElement("div")));
    var refarray = [];
    var liststate = rr(Array(10).fill(undefined).map((v, i) => i));
    mn(liststate, a => console.dir([ liststate, a ]));
    var vdom$1 = Xe("div", null, Xe("button", {
        _text: "push",
        onclick: () => {
            liststate.push(Math.random());
        }
    }), Xe("button", {
        _text: "pop",
        onclick: () => {
            liststate.pop();
        }
    }), Xe("button", {
        _text: "shift",
        onclick: () => {
            liststate.shift();
        }
    }), Xe("button", {
        _text: "unshift",
        onclick: () => {
            liststate.unshift(Math.random());
        }
    }), $r(liststate, (value, index) => Xe("div", {
        _ref: ele => {
            refarray.length = liststate.length;
            refarray[index] = ele;
        }
    }, [ "item:", "value:", value, "index:", index ])));
    document.body.appendChild(jn(vdom$1, document.createElement("div")));
    console.log(vdom$1, refarray, liststate);
    var css = '@charset "UTF-8";@import url(https://cdn.bootcss.com/mui/3.7.1/css/mui.min.css);@import url(https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-6556dfa9be535e551ffffaadfecdad99.min.css);@import url(https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-frameworks-a2fba223d5af91496cac70d4ec3624df.min.css);@import url(https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css);pre{text-align:left!important}button,div,h1,h2,h3,h4,h5,h6,input{text-align:center}p{color:#000!important}@-webkit-keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.flowerpassword a{color:#42b983}.App-header{background-color:#fff}nav{width:100%}#\u56fe\u7247\u5217\u8868200 img{min-height:150px;min-width:150px;height:auto;width:auto;max-width:100%;max-height:200px}#my\u5bfc\u822a\u680f .navbar-nav li a{margin-left:2px;margin-right:2px}h1,h2{font-weight:400}ul{list-style-type:none;padding:0}li{display:inline-block;margin:0 10px}*{-webkit-user-select:text;-ms-user-select:text;user-select:text}.example{color:red}body{padding:0}*{font-family:"Microsoft Yahei,PingFangSC-Regular,arial, verdana, sans-serif"}#my\u5bfc\u822a\u680f{overflow:auto;max-height:100%;padding-right:0;padding-left:0}.App{text-align:center}.App-logo{-webkit-animation:App-logo-spin 20s linear infinite;animation:App-logo-spin 20s linear infinite;height:40vmin;pointer-events:none}.App-header{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:calc(10px + 2vmin)}.App-link{color:#61dafb}.flowerpassword body,.flowerpassword html{background-color:#fff}.flowerpassword body{font:14px/1.5 Tahoma,Helvetica,Arial,\\5b8b\\4f53;color:#000}.flowerpassword a,.flowerpassword a:hover{color:#09c;text-decoration:none}.flowerpassword .left{float:left}.flowerpassword .right{float:right}.flowerpassword .clear{clear:both}.flowerpassword header{text-align:left;padding:0;margin:15px auto}.flowerpassword #logo{height:39px}.flowerpassword #shortcuts{margin:15px 0 0 15px}.flowerpassword #nav{float:center;margin-top:10px}.flowerpassword #nav li{margin:0 7px}.flowerpassword #nav li a{font-size:22px;color:#09c}.flowerpassword #nav li.active a,.flowerpassword #nav li.active a:hover{background-color:#09c;color:#fff}.flowerpassword #nav li a:hover{background-color:#79c6df;color:#fff}.flowerpassword #index-box{background-color:#fff;width:940px;clear:both;box-shadow:0 0 4px 2px #ddd;border:1px solid #ddd}.flowerpassword #index-box .float-box{margin:20px 0 20px 20px;display:inline}.flowerpassword #index-box #content-nav{margin:0;width:200px}.flowerpassword #index-box #content-nav li a{background-color:#e5ecdc}.flowerpassword #index-slider{width:940px;height:200px;overflow:hidden;position:relative}.flowerpassword #index-slider ul{list-style:none;margin:0;position:absolute;top:0;left:0}.flowerpassword #index-slider li{width:940px;height:200px;float:left}.flowerpassword #index-slider #pagination{top:160px;left:800px}.flowerpassword #index-slider ul#pagination li{width:16px;height:16px;border-radius:1em;background-color:#fff;box-shadow:0 0 1px 2px #ccc;margin-right:18px;margin-top:4px}.flowerpassword #index-slider ul#pagination li.active{width:24px;height:24px;margin-top:0}.flowerpassword #index-slider ul#pagination li:hover{background-color:#ddd;cursor:pointer}.flowerpassword #index-report{width:680px;height:70px;margin-top:20px;overflow:hidden;position:relative;background-color:#e5ecdc}.flowerpassword #index-report ul{list-style:none;margin:0;position:absolute;top:0;left:0}.flowerpassword #index-report li{width:680px;height:70px;text-align:center;float:left;font-size:32px;color:#666;font-family:\xe5\xbe\xae\xe8\xbd\xaf\xe9\u203a\u2026\xe9\xbb\u2018,\xe9\xbb\u2018\xe4\xbd\u201c;line-height:70px}.flowerpassword #index-report-pagination{list-style:none;margin-left:35px;text-align:center}.flowerpassword #index-report-pagination li{height:65px;float:left;margin-right:45px;cursor:pointer}.flowerpassword #index-report-pagination li img{margin-top:30px}.flowerpassword #index-button{margin:40px 0 30px;text-align:center}.flowerpassword #index-button a{margin:0 50px}.flowerpassword #tab{margin-top:30px}.flowerpassword #tab li a{margin-right:10px;border-bottom-color:#ddd;color:#666}.flowerpassword #tab li a:hover{background-color:#f2f2f2;color:#333;border-color:#ddd #ddd transparent}.flowerpassword #tab li.active a{background-color:#f2f2f2;color:#666;border-bottom-color:transparent}.flowerpassword #content-nav{list-style:none;margin:20px 0 0}.flowerpassword #content-nav li a{color:#666;padding:11px 0 11px 60px;display:block;margin-bottom:1px;font-size:22px}.flowerpassword #content-nav li a.active,.flowerpassword #content-nav li a:hover{background-color:#09c!important;color:#fff!important}.flowerpassword h1,.flowerpassword h2{color:#09c;margin:30px 0 12px}.flowerpassword h2{font-size:22px}.flowerpassword h2 span{font-size:22px;color:#fff;margin-right:7px;background-color:#09c;width:33px;height:33px;display:inline-block;text-align:center}.flowerpassword h3{font-size:16px;color:#09c;margin:20px 0}.flowerpassword h3 span{font-size:16px;color:#fff;margin-right:6px;background-color:#09c;width:26px;display:inline-block;text-align:center}.flowerpassword #input span{color:#09c;font-weight:700;font-size:22px;margin:0 20px}.flowerpassword #input input{font-size:14px;padding:5px;margin-left:5px}.flowerpassword #input label{float:none;display:inline;padding-right:5px}.flowerpassword #input p{margin-top:16px}.flowerpassword #input p,.flowerpassword .other{font-size:12px;color:#999}.flowerpassword #code16{display:inline-block;text-align:center}.flowerpassword .code16d{border:2px solid #09c}.flowerpassword .code16d:hover{border:2px solid #ff881c}.flowerpassword #copycode16{color:#000;display:inline-block;padding:0 3px;cursor:pointer}.flowerpassword .copycode16d{background-color:#09c;border:2px solid #09c}.flowerpassword .copycode16d:hover{background-color:#ff881c;border:2px solid #ff881c}.flowerpassword p{font-size:12px;color:#666;margin:20px 0}.flowerpassword #copyOK{color:#f2f2f2;border:2px solid #f2f2f2;display:inline-block;margin-left:16px;padding:0 3px}.flowerpassword .down-button{margin:10px 20px 10px 0}.flowerpassword #get{margin-bottom:100px}.flowerpassword footer{margin:50px 0 30px}.flowerpassword footer p{margin:0 0 5px;color:#999}.flowerpassword footer p span{margin:0 10px}.flowerpassword footer p a{color:#999}.flowerpassword footer p a:hover{color:#333}.jdahd button{border-color:#000}.jdahd *{text-align:center;margin:0;box-sizing:border-box;background-color:transparent}.jdahd body{position:relative;height:100vh;text-align:center}.jdahd h1{text-align:center;margin:20px 0}.jdahd textarea{width:100%;clear:both;margin-bottom:10px;border-radius:7px;padding:15px 10px;font-size:14px;outline:none;-webkit-transition:all .2s ease-in;transition:all .2s ease-in}.jdahd input[type=button]{margin:0 auto;position:relative;vertical-align:top;width:150px;height:60px;padding:0;font-size:22px;font-weight:300;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.25);background:#2980b9;border:0;border-bottom:2px solid #2475ab;cursor:pointer;box-shadow:inset 0 -2px #2475ab}.jdahd input:active{top:1px;outline:none;box-shadow:none}.jdahd input:-ms-input-placeholder,.jdahd textarea:-ms-input-placeholder{color:#fff;font-size:20px;font-weight:300}.jdahd input::-moz-placeholder,.jdahd textarea::-moz-placeholder{color:#fff;font-size:20px;font-weight:300}.jdahd input::-webkit-input-placeholder,.jdahd textarea::-webkit-input-placeholder{color:#fff;font-size:20px;font-weight:300;box-shadow:none;-webkit-appearance:none}.jdahd footer{width:calc(100% - 40px);position:absolute;bottom:20px}.jdahd footer>p a{color:#2980b9;text-decoration:none}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}code{font-family:source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace}.jdahd #my\u5bfc\u822a\u680f{overflow:auto;max-height:100%;padding-right:0;padding-left:0}.jdahd *,.jdahd body{text-align:center}.jdahd h1{font-weight:300;font-size:40px}.jdahd h3{font-weight:700}.jdahd .actions,.jdahd li,.jdahd p,.jdahd textarea{width:100%}.jdahd textarea{border-color:#000;display:block;min-height:250px;margin:1em 0}.jdahd ul.pre li{white-space:pre}.jdahd .checkbox{display:inline-block}.jdahd .actions a{float:right}.jdahd .actions{clear:both}*{font-family:Microsoft Yahei}#nav{float:center}#app{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;margin-top:0}#App-logo{-webkit-animation:App-logo-spin 20s linear infinite;animation:App-logo-spin 20s linear infinite;height:40vmin;pointer-events:none}@keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}*{-webkit-user-select:text!important;-moz-user-select:text;-o-user-select:text;-ms-user-select:text!important;user-select:text!important}body,html{scroll-behavior:smooth}*{font-family:Microsoft Yahei,Helvetica,Tahoma,Arial,PingFang SC,Hiragino Sans GB,Heiti SC,MicrosoftYaHei,WenQuanYi Micro Hei,sans-serif!important}.hljs{display:block;overflow-x:auto;padding:.5em;color:#333;background:#f8f8f8;-webkit-text-size-adjust:none}.diff .hljs-header,.hljs-comment{color:#998;font-style:italic}.css .rule .hljs-keyword,.hljs-keyword,.hljs-request,.hljs-status,.hljs-subst,.hljs-winutils,.nginx .hljs-title{color:#333;font-weight:700}.hljs-hexcolor,.hljs-number,.ruby .hljs-constant{color:teal}.hljs-doctag,.hljs-string,.hljs-tag .hljs-value,.tex .hljs-formula{color:#d14}.hljs-id,.hljs-title,.scss .hljs-preprocessor{color:#900;font-weight:700}.hljs-list .hljs-keyword,.hljs-subst{font-weight:400}.hljs-class .hljs-title,.hljs-type,.tex .hljs-command,.vhdl .hljs-literal{color:#458;font-weight:700}.django .hljs-tag .hljs-keyword,.hljs-rule .hljs-property,.hljs-tag,.hljs-tag .hljs-title{color:navy;font-weight:400}.hljs-attribute,.hljs-name,.hljs-variable,.lisp .hljs-body{color:teal}.hljs-regexp{color:#009926}.clojure .hljs-keyword,.hljs-prompt,.hljs-symbol,.lisp .hljs-keyword,.ruby .hljs-symbol .hljs-string,.scheme .hljs-keyword,.tex .hljs-special{color:#990073}.hljs-built_in{color:#0086b3}.hljs-cdata,.hljs-doctype,.hljs-pi,.hljs-pragma,.hljs-preprocessor,.hljs-shebang{color:#999;font-weight:700}.hljs-deletion{background:#fdd}.hljs-addition{background:#dfd}.diff .hljs-change{background:#0086b3}.hljs-chunk{color:#aaa}#padding0{padding:0!important}@media (max-width:500px){hr#hidewidthless500{display:none}}.article-content{word-break:break-word;line-height:1.75;font-weight:400;font-size:15px;overflow-x:hidden}.article-content h1{margin:1.3rem 0;line-height:1.2}.article-content p{line-height:2.27rem}.article-content hr{border:none;border-top:1px solid #ddd;margin-top:2.7rem;margin-bottom:2.7rem}.article-content embed,.article-content iframe,.article-content img:not(.equation),.article-content video{max-width:100%!important;margin:0}.article-content img.lazyload{visibility:hidden}.article-content img.inited{background-color:#f8f9fa;background-position:50%;background-repeat:no-repeat;visibility:visible}.article-content img.loaded{background-image:none;background-color:transparent}.article-content img.equation{margin:0 .1em;max-width:100%!important;vertical-align:text-bottom}.article-content img:not(.equation){cursor:-webkit-zoom-in;cursor:zoom-in}.article-content figure{margin:2.7rem auto;text-align:center}.article-content figure figcaption{text-align:center;font-size:1rem;line-height:2.7rem;color:#909090}.article-content pre{line-height:1.93rem;overflow:auto}.article-content code,.article-content pre{font-family:Menlo,Monaco,Consolas,Courier New,monospace}.article-content code{font-size:1rem;padding:.26rem .53em;word-break:break-word;color:#4e5980;background-color:#f8f8f8;border-radius:2px;overflow-x:auto}.article-content pre>code{font-size:1rem;padding:.67rem 1.3rem;margin:0;word-break:normal;display:block}.article-content a{color:#259}.article-content a:active,.article-content a:hover{color:#275b8c}.article-content table{display:inline-block!important;font-size:1rem;width:auto;max-width:100%;overflow:auto;border:1px solid #f6f6f6}.article-content thead{background:#f6f6f6;color:#000;text-align:left}.article-content tr:nth-child(2n){background-color:#fcfcfc}.article-content td,.article-content th{padding:1rem .6rem;line-height:2rem}.article-content td{min-width:10rem}.article-content blockquote{margin:1em 0;border-left:4px solid #ddd;padding:0 1.3rem}.article-content blockquote>p{margin:.6rem 0}.article-content ol,.article-content ul{padding-left:2.7rem}.article-content ol li,.article-content ul li{margin-bottom:.6rem}.article-content ol ol,.article-content ol ul,.article-content ul ol,.article-content ul ul{margin-top:.27rem}.article-content pre>code{overflow-x:auto;-webkit-overflow-scrolling:touch;color:#333;background:#f8f8f8}.article-content .hljs-comment,.article-content .hljs-quote{color:#998}.article-content .hljs-keyword,.article-content .hljs-selector-tag,.article-content .hljs-subst{color:#333;font-weight:700}.article-content .hljs-literal,.article-content .hljs-number,.article-content .hljs-tag .hljs-attr,.article-content .hljs-template-variable,.article-content .hljs-variable{color:teal}.article-content .hljs-doctag,.article-content .hljs-string{color:#d14}.article-content .hljs-section,.article-content .hljs-selector-id,.article-content .hljs-title{color:#900;font-weight:700}.article-content .hljs-subst{font-weight:400}.article-content .hljs-class .hljs-title,.article-content .hljs-type{color:#458;font-weight:700}.article-content .hljs-attribute,.article-content .hljs-name,.article-content .hljs-tag{color:navy;font-weight:400}.article-content .hljs-link,.article-content .hljs-regexp{color:#009926}.article-content .hljs-bullet,.article-content .hljs-symbol{color:#990073}.article-content .hljs-built_in,.article-content .hljs-builtin-name{color:#0086b3}.article-content .hljs-meta{color:#999;font-weight:700}.article-content .hljs-deletion{background:#fdd}.article-content .hljs-addition{background:#dfd}.article-content .hljs-emphasis{font-style:italic}.article-content .hljs-strong{font-weight:700}.article-content p{line-height:inherit;margin-top:22px;margin-bottom:22px}.article-content img{max-height:none}.article-content a{color:#0269c8;border-bottom:1px solid #d1e9ff}.article-content code{background-color:#fff5f5;color:#ff502c;font-size:.87em;padding:.065em .4em}.article-content figure{margin:22px auto}.article-content figure figcaption{margin-top:2px;line-height:1.6}.article-content blockquote{color:#666;padding:1px 23px;margin:22px 0;border-left:4px solid #cbcbcb;background-color:#f8f8f8}.article-content blockquote:after{display:block;content:""}.article-content blockquote>p{margin:10px 0}.article-content blockquote.warning{position:relative;border-left-color:#f75151;margin-left:8px}.article-content blockquote.warning:before{position:absolute;top:14px;left:-12px;background:#f75151;border-radius:50%;content:"!";width:20px;height:20px;color:#fff;display:flex;align-items:center;justify-content:center}.article-content ol,.article-content ul{padding-left:28px}.article-content ol li,.article-content ul li{margin-bottom:0;list-style:inherit}.article-content ol li.task-list-item,.article-content ul li.task-list-item{list-style:none}.article-content ol li.task-list-item ol,.article-content ol li.task-list-item ul,.article-content ul li.task-list-item ol,.article-content ul li.task-list-item ul{margin-top:0}.article-content ol li{padding-left:6px}.article-content pre{position:relative;line-height:1.75}.article-content pre>code{padding:15px 12px}.article-content pre>code.hljs[lang]{padding:18px 15px 12px}.article-content pre>code.hljs[lang]:before{content:attr(lang);position:absolute;right:15px;top:2px;color:hsla(0,0%,54.9%,.8)}.article-content pre>code.hljs[lang][lang=bash]:before{content:""}.article-content pre>code.copyable .copy-code-btn{position:absolute;top:6px;right:15px;font-size:12px;line-height:1;cursor:pointer;color:hsla(0,0%,54.9%,.8);-webkit-transition:color .1s;transition:color .1s}.article-content pre>code.copyable .copy-code-btn:hover{color:#8c8c8c}.article-content pre>code.copyable.hljs[lang]:before{right:70px}.article-content h1,.article-content h2,.article-content h3,.article-content h4,.article-content h5,.article-content h6{color:#333;line-height:1.5;margin-top:35px;margin-bottom:10px;padding-bottom:5px}.article-content h1{font-size:30px;margin-bottom:5px}.article-content h2{padding-bottom:12px;font-size:24px;border-bottom:1px solid #ececec}.article-content h3{font-size:18px;padding-bottom:0}.article-content h4{font-size:16px}.article-content h5{font-size:15px}.article-content h6{margin-top:5px}.article-content h1.heading+h2.heading{margin-top:20px}.article-content h1.heading+h3.heading{margin-top:15px}.article-content .heading+.heading{margin-top:0}.article-content h1+:not(.heading){margin-top:25px}@media (max-width:720px){.article-content h1{font-size:24px}.article-content h2{font-size:20px}.article-content h3{font-size:18px}.article-content pre>code .copy-code-btn{display:none}.article-content pre>code.hljs[lang]:before{top:2px;right:15px}}@media (max-width:720px){.article-content pre>code.copyable.hljs[lang]:before{right:1rem}}';
    console.log([ Xe, Xe ]);
    var mycomapp$1 = gr(() => {
        var inputpassword = rr("");
        var inputref = kr();
        var inputref2 = kr();
        console.log(inputref2);
        console.log(inputpassword);
        mn(inputpassword, console.log);
        var vdom = [ Xe("h1", {
            style: "padding-top: 127.6px;"
        }, Xe("svg", {
            style: "\n      width: 100%;\n      height: 200px;\n  ",
            class: "octicon octicon-book",
            viewBox: "0 0 16 16",
            version: "1.1",
            width: "16",
            height: "16",
            "aria-hidden": "true"
        }, Xe("path", {
            "fill-rule": "evenodd",
            d: "M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"
        })), Xe("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 3046.7 875.7",
            style: "\n      width: 100%;\n      height: 200px;\n  "
        }, Xe("title", null, "logo-on-dark-bg"), Xe("rect", {
            Color: "#FFF",
            x: "0",
            y: "0",
            width: "3046.7",
            height: "875.7"
        }), Xe("path", {
            fill: "#FFF",
            d: "M387 0l387 218.9v437.9L387 875.7 0 656.8V218.9L387 0z"
        }), Xe("path", {
            fill: "#8ED6FB",
            d: "M704.9 641.7L399.8 814.3V679.9l190.1-104.6 115 66.4zm20.9-18.9V261.9l-111.6 64.5v232l111.6 64.4zM67.9 641.7L373 814.3V679.9L182.8 575.3 67.9 641.7zM47 622.8V261.9l111.6 64.5v232L47 622.8zm13.1-384.3L373 61.5v129.9L172.5 301.7l-1.6.9-110.8-64.1zm652.6 0l-312.9-177v129.9l200.5 110.2 1.6.9 110.8-64z"
        }), Xe("path", {
            fill: "#1C78C0",
            d: "M373 649.3L185.4 546.1V341.8L373 450.1v199.2zm26.8 0l187.6-103.1V341.8L399.8 450.1v199.2zM198.1 318.2l188.3-103.5 188.3 103.5-188.3 108.7-188.3-108.7z"
        }), Xe("path", {
            fill: "#F5FAFA",
            d: "M1164.3 576.3h82.5l84.1-280.2h-80.4l-49.8 198.8-53.1-198.8H1078l-53.6 198.8-49.3-198.8h-80.4l83.6 280.2h82.5l52-179.5 51.5 179.5zM1335.2 437c0 84.1 57.3 146.3 147.4 146.3 69.7 0 107.2-41.8 117.9-61.6l-48.8-37c-8 11.8-30 34.3-68.1 34.3-41.3 0-71.3-26.8-72.9-64.3H1608c.5-5.4.5-10.7.5-16.1 0-91.6-49.3-149.5-136.1-149.5-79.9 0-137.2 63.2-137.2 147.9zm77.7-30.6c3.2-32.1 25.7-56.8 60.6-56.8 33.8 0 58.4 22.5 60 56.8h-120.6zm223.5 169.9h69.7v-28.9c7.5 9.1 35.4 35.9 83.1 35.9 80.4 0 137.2-60.5 137.2-146.8 0-86.8-52.5-147.3-132.9-147.3-48.2 0-76.1 26.8-83.1 36.4V188.9h-73.9v387.4h-.1zm71.8-139.3c0-52.5 31.1-82.5 71.8-82.5 42.9 0 71.8 33.8 71.8 82.5 0 49.8-30 80.9-71.8 80.9-45 0-71.8-36.5-71.8-80.9zm247 239.5h73.9V547.3c7 9.1 34.8 35.9 83.1 35.9 80.4 0 132.9-60.5 132.9-147.3 0-85.7-56.8-146.8-137.2-146.8-47.7 0-75.6 26.8-83.1 36.4V296h-69.7v380.5h.1zm71.8-241.1c0-44.5 26.8-80.9 71.8-80.9 41.8 0 71.8 31.1 71.8 80.9 0 48.8-28.9 82.5-71.8 82.5-40.7 0-71.8-30-71.8-82.5zm231.5 54.1c0 58.9 48.2 93.8 105 93.8 32.2 0 53.6-9.6 68.1-25.2l4.8 18.2h65.4V398.9c0-62.7-26.8-109.8-116.8-109.8-42.9 0-85.2 16.1-110.4 33.2l27.9 50.4c20.9-10.7 46.6-19.8 74.5-19.8 32.7 0 50.9 16.6 50.9 41.3v18.2c-10.2-7-32.2-15.5-60.6-15.5-65.4-.1-108.8 37.4-108.8 92.6zm73.9-2.2c0-23 19.8-39.1 48.2-39.1s48.8 14.5 48.8 39.1c0 23.6-20.4 38.6-48.2 38.6s-48.8-15.5-48.8-38.6zm348.9 30.6c-46.6 0-79.8-33.8-79.8-81.4 0-45 29.5-82 77.2-82 31.6 0 53.1 15.5 65.4 26.8l20.9-62.2c-18.2-13.9-47.2-30-88.4-30-85.2 0-149 62.7-149 147.9s62.2 146.3 149.5 146.3c40.7 0 71.3-17.1 87.3-30l-19.8-60.5c-12.4 10.1-34.9 25.1-63.3 25.1zm110.9 58.4h73.9V431.6l93.8 144.7h86.8L2940.6 423l98.6-127h-83.1l-90 117.9v-225h-73.9v387.4z"
        }))), Xe("div", null, Xe("div", null, Xe("noscript", null, "You need to enable JavaScript to run this app."), Xe("div", {
            id: "root"
        }, Xe("div", null, Xe("div", {
            class: "container-fluid fixed-top",
            id: "my\u5bfc\u822a\u680f"
        }, Xe("nav", {
            class: "navbar navbar-default navbar navbar-expand-sm bg-light navbar-light",
            role: "navigation"
        }, Xe("div", null, Xe("a", {
            class: "navbar-brand mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/"
        }, "masx200\u7684", Xe("hr", {
            id: "hidewidthless500"
        }), "github\u4e3b\u9875"), Xe("button", {
            class: "navbar-toggler",
            type: "button",
            "data-toggle": "collapse"
        }, Xe("span", {
            class: "navbar-toggler-icon"
        }))), Xe("div", {
            class: "collapse navbar-collapse",
            id: "example-navbar-collapse",
            style: "display: none;"
        }, Xe("ul", {
            class: "nav navbar-nav",
            id: "allnavbar"
        }, Xe("li", {
            id: "mynav1"
        }, Xe("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-home"
        }, "\u57fa\u4e8eREACT\u7684\u4e3b\u9875")), Xe("li", null, Xe("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-rssreader"
        }, "rss\u9605\u8bfb")), Xe("li", {
            id: "mynav2"
        }, Xe("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-about"
        }, "\u5173\u4e8eREACT")), Xe("li", {
            class: "nav-item"
        }, Xe("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/picalc"
        }, "\u5706\u5468\u7387\u8ba1\u7b97\u591a\u7ebf\u7a0b")), Xe("li", null, Xe("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-huami"
        }, "\u82b1\u5bc6\u7f51\u9875\u7248")), Xe("li", null, Xe("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/decoder"
        }, "JSfuck-and-hieroglyphy-Decoder")), Xe("li", null, Xe("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/jsfuck"
        }, "JSfuck-ENCODER")), Xe("li", null, Xe("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/hieroglyphy"
        }, "hieroglyphy-ENCODER")), Xe("li", null, Xe("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/webpack-react-vue-spa-awesome-config"
        }, "webpack-react-vue- \u6781\u901f\u96f6\u914d\u7f6e\u7684\u5355\u9875\u9762 web\n                        \u5e94\u7528\u6253\u5305\u5de5\u5177")), Xe("li", {
            class: "nav-item"
        }, Xe("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/IMPORTCJSAMDUMD\u52a8\u6001\u5f02\u6b65\u52a0\u8f7d"
        }, "\u52a8\u6001\u5f02\u6b65\u52a0\u8f7d-commonjs\u548cumd\u548camd\u6a21\u5757\u5e93")), Xe("li", {
            class: "nav-item"
        }, Xe("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/react-simple-global-state-store-hook"
        }, "\u9002\u7528\u4e8eReact\u7684\u6781\u7b80\u5168\u5c40\u72b6\u6001\u7ba1\u7406\u5e93")), Xe("li", {
            class: "nav-item"
        }, Xe("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/excellent-vscode-extensions-for-javascript"
        }, "VScode\u7684\u4f18\u79c0\u6269\u5c55\u63a8\u8350")), Xe("li", {
            class: "nav-item"
        }, Xe("a", {
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined",
            href: "#/vue-simple-global-state-store-manager"
        }, "\u9002\u7528\u4e8eVue\u7684\u6781\u7b80\u5168\u5c40\u72b6\u6001\u7ba1\u7406\u5e93")), Xe("li", null, Xe("a", {
            href: "./my-vue-router-project/index.html",
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined"
        }, "\u57fa\u4e8evue\u7684\u4e3b\u9875")), Xe("li", null, Xe("a", {
            href: "./my-vue-router-project/index.html#/about",
            class: "nav-link mui-btn mui-btn-primary mui-btn-outlined"
        }, "\u5173\u4e8eVue")))))), Xe("div", {
            class: "container",
            id: "my\u4e3b\u4f53",
            style: "padding-top: 127.6px;"
        }, Xe("div", {
            class: "hello flowerpassword"
        }, Xe("h1", null, "\u82b1\u5bc6 \u4e0d\u4e00\u6837\u7684\u5bc6\u7801\u7ba1\u7406\u5de5\u5177"), Xe("div", {
            id: "rong1",
            class: "container",
            style: "text-align: center;"
        }, Xe("div", {
            id: "rong2"
        }, Xe("h2", null, Xe("span", null, "1"), "\u8f93\u5165"), Xe("div", {
            id: "input"
        }, Xe("p", null), Xe("h3", null, "\u8bb0\u5fc6\u5bc6\u7801"), Xe("p", null), Xe("p", null, Xe("input", {
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
        })), Xe("p", null), Xe("span", null, "+"), Xe("h3", null, "\u533a\u5206\u4ee3\u53f7"), Xe("p", null), Xe("p", null, Xe("input", {
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
        }))), Xe("br", null), Xe("p", null), Xe("h2", null, Xe("span", null, "2"), "\u83b7\u53d6"), Xe("p", null), Xe("div", {
            id: "get"
        }, Xe("p", {
            id: "tuijian"
        }), Xe("p", null), Xe("h3", null, "\u6700\u7ec8\u5bc6\u7801"), Xe("p", null), Xe("span", {
            id: "myhezi"
        }, Xe("p", null, Xe("input", {
            id: "cod222222222222e16",
            readonly: "",
            class: "col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control",
            value: ""
        })), Xe("br", null), Xe("p", null, Xe("button", {
            id: "copycode16",
            "data-clipboard-target": "#code16",
            class: "btn btn-lg btn copycode16d btn-info",
            style: "width: 100%;"
        }, "\u70b9\u51fb\u590d\u5236"))), Xe("p", null, Xe("span", {
            id: "copyOK",
            style: "display: none;"
        }, "\u221a\u590d\u5236\u6210\u529f")), Xe("p", null)))))))), Xe("script", {
            type: "text/javascript",
            src: "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/bundle.runtime~main.3a15bebb435b0d3fead6.js"
        }), Xe("script", {
            type: "text/javascript",
            src: "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/chunk.vendors~main.f7c5ea92c1b78a8ff211.js"
        }), Xe("script", {
            type: "text/javascript",
            src: "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/chunk.main.b9c7ffd191cff11a9b96.js"
        })), Xe("div", {
            contenteditable: false
        }, "\u4e0d\u53ef\u4ee5\u7f16\u8f91\u7684\u533a\u57df"), Xe("div", {
            contenteditable: true
        }, "\u53ef\u4ee5\u7f16\u8f91\u7684\u533a\u57df")), Xe("h1", null, Xe("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            version: "1.1",
            baseProfile: "full",
            style: "\n      width:600px;\n      height: 600px;\n  "
        }, Xe("g", {
            "fill-opacity": "0.7",
            stroke: "black",
            "stroke-width": "0.1cm"
        }, Xe("circle", {
            cx: "6cm",
            cy: "2cm",
            r: "100",
            fill: "red",
            transform: "translate(0,50)"
        }), Xe("circle", {
            cx: "6cm",
            cy: "2cm",
            r: "100",
            fill: "blue",
            transform: "translate(70,150)"
        }), Xe("circle", {
            cx: "6cm",
            cy: "2cm",
            r: "100",
            fill: "green",
            transform: "translate(-70,150)"
        }))), Xe("svg", {
            style: "\n      width: 100%;\n      height: 200px;\n  ",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 3046.7 875.7"
        }, Xe("title", null, "logo-on-dark-bg"), Xe("rect", {
            Color: "#FFF",
            x: "0",
            y: "0",
            width: "3046.7",
            height: "875.7"
        }), Xe("path", {
            fill: "#FFF",
            d: "M387 0l387 218.9v437.9L387 875.7 0 656.8V218.9L387 0z"
        }), Xe("path", {
            fill: "#8ED6FB",
            d: "M704.9 641.7L399.8 814.3V679.9l190.1-104.6 115 66.4zm20.9-18.9V261.9l-111.6 64.5v232l111.6 64.4zM67.9 641.7L373 814.3V679.9L182.8 575.3 67.9 641.7zM47 622.8V261.9l111.6 64.5v232L47 622.8zm13.1-384.3L373 61.5v129.9L172.5 301.7l-1.6.9-110.8-64.1zm652.6 0l-312.9-177v129.9l200.5 110.2 1.6.9 110.8-64z"
        }), Xe("path", {
            fill: "#1C78C0",
            d: "M373 649.3L185.4 546.1V341.8L373 450.1v199.2zm26.8 0l187.6-103.1V341.8L399.8 450.1v199.2zM198.1 318.2l188.3-103.5 188.3 103.5-188.3 108.7-188.3-108.7z"
        }), Xe("path", {
            fill: "#F5FAFA",
            d: "M1164.3 576.3h82.5l84.1-280.2h-80.4l-49.8 198.8-53.1-198.8H1078l-53.6 198.8-49.3-198.8h-80.4l83.6 280.2h82.5l52-179.5 51.5 179.5zM1335.2 437c0 84.1 57.3 146.3 147.4 146.3 69.7 0 107.2-41.8 117.9-61.6l-48.8-37c-8 11.8-30 34.3-68.1 34.3-41.3 0-71.3-26.8-72.9-64.3H1608c.5-5.4.5-10.7.5-16.1 0-91.6-49.3-149.5-136.1-149.5-79.9 0-137.2 63.2-137.2 147.9zm77.7-30.6c3.2-32.1 25.7-56.8 60.6-56.8 33.8 0 58.4 22.5 60 56.8h-120.6zm223.5 169.9h69.7v-28.9c7.5 9.1 35.4 35.9 83.1 35.9 80.4 0 137.2-60.5 137.2-146.8 0-86.8-52.5-147.3-132.9-147.3-48.2 0-76.1 26.8-83.1 36.4V188.9h-73.9v387.4h-.1zm71.8-139.3c0-52.5 31.1-82.5 71.8-82.5 42.9 0 71.8 33.8 71.8 82.5 0 49.8-30 80.9-71.8 80.9-45 0-71.8-36.5-71.8-80.9zm247 239.5h73.9V547.3c7 9.1 34.8 35.9 83.1 35.9 80.4 0 132.9-60.5 132.9-147.3 0-85.7-56.8-146.8-137.2-146.8-47.7 0-75.6 26.8-83.1 36.4V296h-69.7v380.5h.1zm71.8-241.1c0-44.5 26.8-80.9 71.8-80.9 41.8 0 71.8 31.1 71.8 80.9 0 48.8-28.9 82.5-71.8 82.5-40.7 0-71.8-30-71.8-82.5zm231.5 54.1c0 58.9 48.2 93.8 105 93.8 32.2 0 53.6-9.6 68.1-25.2l4.8 18.2h65.4V398.9c0-62.7-26.8-109.8-116.8-109.8-42.9 0-85.2 16.1-110.4 33.2l27.9 50.4c20.9-10.7 46.6-19.8 74.5-19.8 32.7 0 50.9 16.6 50.9 41.3v18.2c-10.2-7-32.2-15.5-60.6-15.5-65.4-.1-108.8 37.4-108.8 92.6zm73.9-2.2c0-23 19.8-39.1 48.2-39.1s48.8 14.5 48.8 39.1c0 23.6-20.4 38.6-48.2 38.6s-48.8-15.5-48.8-38.6zm348.9 30.6c-46.6 0-79.8-33.8-79.8-81.4 0-45 29.5-82 77.2-82 31.6 0 53.1 15.5 65.4 26.8l20.9-62.2c-18.2-13.9-47.2-30-88.4-30-85.2 0-149 62.7-149 147.9s62.2 146.3 149.5 146.3c40.7 0 71.3-17.1 87.3-30l-19.8-60.5c-12.4 10.1-34.9 25.1-63.3 25.1zm110.9 58.4h73.9V431.6l93.8 144.7h86.8L2940.6 423l98.6-127h-83.1l-90 117.9v-225h-73.9v387.4z"
        }))) ];
        console.log(vdom);
        return vdom;
    });
    mycomapp$1.css = css;
    var vdom$2 = Xe(mycomapp$1);
    jn(vdom$2, document.getElementById("root"));
    console.log([ Xe, Xe ]);
    var vdom$3 = Xe("select", {
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
    }, Xe("option", {
        value: "0"
    }, "- Select version -"), Xe("option", {
        value: "94b92331-e2f4-40c6-90ee-80e203a4de3a"
    }, "Windows 10 Insider Preview 18999.1 (vb_release) [arm64]"), Xe("option", {
        value: "7268dbc9-dfe0-4947-af82-67f384e95cb6"
    }, "Windows 10 Insider Preview 18999.1 (vb_release) [x64]"), Xe("option", {
        value: "08f0d32e-c68a-46a8-b301-57e86b4e96e0"
    }, "Windows 10 Insider Preview 18999.1 (vb_release) [x86]"), Xe("option", {
        value: "9fa87c7f-75fa-4e5e-9ca3-1e19cb2c743f"
    }, "Windows 10 Insider Preview 18995.1 (vb_release) [x64]"), Xe("option", {
        value: "5173796c-11ac-47d7-9ed7-dbad6d5c9486"
    }, "Windows 10 Insider Preview 18995.1 (vb_release) [x86]"), Xe("option", {
        value: "4adf5f24-213a-472c-ae94-70f3cb81bade"
    }, "Windows 10 Insider Preview 18995.1 (vb_release) [arm64]"), Xe("option", {
        value: "9287fe5e-2cb3-4064-820f-3e336a3ddff4"
    }, "Windows 10 Insider Preview 18990.1 (vb_release) [arm64]"), Xe("option", {
        value: "5e420f0d-b3a5-424c-9b55-5c2cf939af14"
    }, "Windows 10 Insider Preview 18990.1 (vb_release) [x86]"), Xe("option", {
        value: "13e2104c-c98c-43b2-b232-9b2a4b5af2ac"
    }, "Windows 10 Insider Preview 18990.1 (vb_release) [x64]"));
    var element = document.body.appendChild(jn(vdom$3, document.createElement("div")));
    console.log([ vdom$3, element ]);
    console.log([ Xe, Xe ]);
    var number = rr(10);
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
    var timer = setInterval(() => {
        increment();
    }, 2e3);
    setTimeout(() => {
        clearInterval(timer);
    }, 8e3);
    var mycomappclass = gr(() => {
        mn(store.number, number => {
            console.log(_objectSpread2({}, store), number);
        });
        var vdom = Xe("div", null, Xe("h3", null, " \u70b9\u51fb\u6570\u5b57"), Xe("h2", null, "number:", store.number), Xe("button", {
            onclick: store.increment
        }, "increment"), Xe("button", {
            onclick: store.decrement
        }, "decrement"));
        return vdom;
    });
    var vdom$4 = [ Xe(mycomappclass), Xe(mycomappclass), Xe(mycomappclass) ];
    document.body.appendChild(jn(vdom$4, document.createElement("div")));
    setTimeout(() => {
        vdom$4.forEach(vdom => {
            var element = vdom.element;
            element.parentNode.removeChild(element);
        });
        number.value = -50;
        vdom$4.forEach(vdom => {
            var element = vdom.element;
            document.body.appendChild(element);
        });
    }, 5e3);
    console.log([ Xe, Xe ]);
    var lirefs = [];
    var temp_ref = kr();
    var check = rr(false);
    var check2 = rr(true);
    mn(check2, a => console.log(a));
    var check3 = rr(true);
    mn(check3, a => console.log(a));
    var check4 = rr(true);
    mn(check4, a => console.log(a));
    var notcheck = Rn(check, a => !a);
    var list = Array(10).fill(undefined).map((v, i) => i);
    mn(check, a => console.log(a));
    mn(notcheck, a => console.log(a));
    var vdom$5 = Xe("", null, Xe("input", {
        type: "radio",
        _checked: check,
        name: "myname1"
    }), Xe("input", {
        type: "radio",
        _checked: check3,
        name: "myname1"
    }), Xe("input", {
        type: "radio",
        _checked: check2,
        name: "myname2"
    }), Xe("input", {
        type: "radio",
        _checked: check4,
        name: "myname2"
    }), [ Xe("input", {
        type: "checkbox",
        _checked: check
    }), Xe("input", {
        type: "checkbox",
        _checked: notcheck
    }), Xe("", null, Xe("ul", null, list.map((a, index) => Xe("li", {
        $ref: ele => {
            lirefs[index] = ele;
            lirefs.length = list.length;
        }
    }, "item", a))), Xe("header", {
        class: "common-header fixed noborder floating",
        id: "git-header-nav",
        _ref: temp_ref
    }, Xe("div", {
        class: "ui container"
    }, Xe("div", {
        class: "ui menu header-menu"
    }, Xe("div", {
        class: "git-nav-expand-bar"
    }, Xe("i", {
        class: "iconfont icon-mode-table"
    })), Xe("div", {
        class: "gitee-nav__sidebar"
    }, Xe("div", {
        class: "gitee-nav__sidebar-container"
    }, Xe("div", {
        class: "gitee-nav__sidebar-top"
    }, Xe("div", {
        class: "gitee-nav__avatar-box"
    }, Xe("a", {
        href: "/masx200",
        onclick: e => e.preventDefault()
    }, Xe("img", {
        alt: "1081296_masx200",
        class: "ui avatar image masx200-avatar",
        src: "https://avatar.gitee.com/uploads/96/1081296_masx200.png?1566294318"
    }))), Xe("div", {
        class: "gitee-nav__info-box"
    }, Xe("a", {
        href: "/masx200"
    }, "masx200"))), Xe("div", {
        class: "gitee-nav__sidebar-middle"
    }, Xe("div", {
        class: "gitee-nav__sidebar-list"
    }, Xe("ul", null, Xe("li", {
        class: "gitee-nav__sidebar-item"
    }, Xe("a", {
        href: "/masx200"
    }, Xe("i", {
        class: "iconfont icon-ic-dashboard"
    }), Xe("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u4e2a\u4eba\u4e3b\u9875"))), Xe("li", {
        class: "gitee-nav__sidebar-item"
    }, Xe("a", {
        href: "/explore"
    }, Xe("i", {
        class: "iconfont icon-ic-discover"
    }), Xe("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u5f00\u6e90\u8f6f\u4ef6"))), Xe("li", {
        class: "gitee-nav__sidebar-item"
    }, Xe("a", {
        href: "/gists"
    }, Xe("i", {
        class: "iconfont icon-ic-gists1"
    }), Xe("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u4ee3\u7801\u7247\u6bb5"))), Xe("li", {
        class: "gitee-nav__sidebar-item"
    }, Xe("a", {
        href: "/enterprises"
    }, Xe("i", {
        class: "iconfont icon-ic-enterprise"
    }), Xe("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u4f01\u4e1a\u7248"))), Xe("li", {
        class: "gitee-nav__sidebar-item"
    }, Xe("a", {
        href: "/education"
    }, Xe("i", {
        class: "iconfont icon-ic-education"
    }), Xe("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u9ad8\u6821\u7248"))), Xe("li", {
        class: "gitee-nav__sidebar-item split-line"
    }), Xe("li", {
        class: "gitee-nav__sidebar-item"
    }, Xe("a", {
        href: "/search"
    }, Xe("i", {
        class: "iconfont icon-ic-search"
    }), Xe("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u641c\u7d22"))), Xe("li", {
        class: "gitee-nav__sidebar-item"
    }, Xe("a", {
        href: "/help"
    }, Xe("i", {
        class: "iconfont icon-help-circle"
    }), Xe("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u5e2e\u52a9\u4e2d\u5fc3"))), Xe("li", {
        class: "gitee-nav__sidebar-item"
    }, Xe("a", {
        href: "/terms"
    }, Xe("i", {
        class: "iconfont icon-file"
    }), Xe("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u4f7f\u7528\u6761\u6b3e"))), Xe("li", {
        class: "gitee-nav__sidebar-item"
    }, Xe("a", {
        href: "/about_us"
    }, Xe("i", {
        class: "iconfont icon-issuepx"
    }), Xe("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u5173\u4e8e\u6211\u4eec"))), Xe("li", {
        class: "gitee-nav__sidebar-item"
    }, Xe("a", {
        href: "/profile"
    }, Xe("i", {
        class: "iconfont icon-edit"
    }), Xe("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u8bbe\u7f6e"))), Xe("li", {
        class: "gitee-nav__sidebar-item"
    }, Xe("a", {
        href: "/logout",
        "data-method": "delete",
        rel: "nofollow"
    }, Xe("i", {
        class: "iconfont icon-ic-logout"
    }), Xe("span", {
        class: "gitee-nav__sidebar-name"
    }, "\u9000\u51fa")))))), Xe("div", {
        class: "gitee-nav__sidebar-bottom"
    }, Xe("div", {
        class: "gitee-nav__sidebar-close-button"
    }, Xe("i", {
        class: "fa fa-angle-double-left"
    }))))), Xe("div", {
        class: "item gitosc-logo"
    }, Xe("a", {
        href: "/"
    }, Xe("img", {
        class: "ui inline image",
        height: "28",
        src: "https://gitee.com//logo.svg?20171024",
        width: "95"
    }), Xe("img", {
        class: "ui inline black image",
        height: "28",
        src: "https://gitee.com//logo-black.svg?20171024",
        width: "95"
    }))), Xe("a", {
        href: "/explore",
        class: "item ",
        title: "\u5f00\u6e90\u8f6f\u4ef6"
    }, "\u5f00\u6e90\u8f6f\u4ef6"), Xe("a", {
        href: "/enterprises",
        class: "item ",
        title: "\u4f01\u4e1a\u7248"
    }, "\u4f01\u4e1a\u7248", Xe("sup", {
        class: "ui red label"
    }, "\u7279\u60e0")), Xe("a", {
        href: "/education",
        class: "item ",
        title: "\u9ad8\u6821\u7248"
    }, "\u9ad8\u6821\u7248"), Xe("a", {
        href: "https://blog.gitee.com/",
        class: "item",
        id: "gitee-blog",
        target: "_blank",
        title: "\u535a\u5ba2"
    }, "\u535a\u5ba2"), Xe("div", {
        class: "dropdown item ui",
        id: "my-gitee-dropdown",
        tabindex: "0"
    }, Xe("a", {
        href: "/masx200/dashboard"
    }, "\u6211\u7684\u7801\u4e91"), Xe("i", {
        class: "dropdown icon"
    }), Xe("div", {
        class: "menu transition hidden",
        tabindex: "-1"
    }, Xe("div", {
        class: "header user-projects"
    }, Xe("a", {
        href: "/masx200/projects",
        class: "pull-right",
        target: "_blank"
    }, "\u5168\u90e8"), "\u4ed3\u5e93", Xe("span", {
        class: "count"
    }, "(11)")), Xe("a", {
        target: "_blank",
        href: "/masx200/mvvm-reactive-view",
        title: "masx200/mvvm-reactive-view",
        class: "item"
    }, "masx200/mvvm-reactive-view"), Xe("a", {
        target: "_blank",
        href: "/masx200/webpack-react-vue-spa-awesome-config",
        title: "masx200/webpack-react-vue-spa-awesome-config",
        class: "item"
    }, "masx200/webpack-react-vue-spa-awesome-config"), Xe("a", {
        target: "_blank",
        href: "/masx200/custom-elements-random-define",
        title: "masx200/custom-elements-random-define",
        class: "item"
    }, "masx200/custom-elements-random-define"), Xe("a", {
        target: "_blank",
        href: "/masx200/importcjsamdumd",
        title: "masx200/importcjsamdumd",
        class: "item"
    }, "masx200/importcjsamdumd"), Xe("a", {
        target: "_blank",
        href: "/masx200/dom-element-attribute-agent-proxy",
        title: "masx200/dom-element-attribute-agent-proxy",
        class: "item"
    }, "masx200/dom-element-attribute-agent-proxy"))), Xe("div", {
        class: "center responsive-logo"
    }, Xe("a", {
        href: "/"
    }, Xe("img", {
        class: "ui inline image",
        height: "24",
        src: "https://gitee.com//logo.svg?20171024",
        width: "85"
    }), Xe("img", {
        class: "ui inline black image",
        height: "24",
        src: "https://gitee.com//logo-black.svg?20171024",
        width: "85"
    }))), Xe("div", {
        class: "right menu userbar",
        id: "git-nav-user-bar"
    }, Xe("div", {
        class: "item git-nav-search-item"
    }, Xe("form", {
        "accept-charset": "UTF-8",
        action: "/search",
        autocomplete: "on",
        "data-text-filter": "\u641c\u7d22\u683c\u5f0f\u4e0d\u6b63\u786e",
        "data-text-require": "\u641c\u7d22\u5173\u952e\u5b57\u4e0d\u80fd\u5c11\u4e8e1\u4e2a",
        id: "navbar-search-form",
        method: "get"
    }, Xe("div", {
        style: "margin:0;padding:0;display:inline"
    }, Xe("input", {
        name: "utf8",
        type: "hidden",
        value: "\u2713"
    })), Xe("div", {
        class: "ui mini fluid input"
    }, Xe("input", {
        id: "navbar-search-input",
        name: "q",
        placeholder: "\u641c\u7d22\u9879\u76ee\u3001\u4ee3\u7801\u7247\u6bb5...",
        type: "text",
        value: ""
    }), Xe("input", {
        id: "navbar-search-type",
        name: "type",
        type: "hidden"
    })))), Xe("div", {
        class: "item ui dropdown empty",
        "data-count-path": "/notifications/unread_count",
        "data-enable": "",
        "data-mark-notice-path": "/notifications/mark",
        id: "notice-dropdown",
        tabindex: "0"
    }, Xe("a", {
        href: "/notifications",
        class: "remind-button"
    }, Xe("i", {
        class: "iconfont icon-remind"
    }), Xe("div", {
        class: "notice-count total"
    }, "1")), Xe("div", {
        class: "notice-dropdown-panel menu transition hidden",
        tabindex: "-1",
        style: "left: -165px;"
    }, Xe("div", {
        class: "notice-dropdown-panel-header"
    }, Xe("div", {
        class: "tab",
        "data-data-path": "/notifications/notices?scope=referer",
        "data-html-path": "/notifications/referer",
        "data-scope": "referer"
    }, Xe("div", {
        class: "content"
    }, "@ \u6211", Xe("div", {
        class: "notice-count referer"
    }))), Xe("div", {
        class: "tab active",
        "data-data-path": "/notifications/notices?scope=infos",
        "data-html-path": "/notifications/infos",
        "data-scope": "infos"
    }, Xe("div", {
        class: "content"
    }, "\u901a\u77e5", Xe("div", {
        class: "notice-count infos"
    }, "1"))), Xe("div", {
        class: "tab",
        "data-data-path": "/notifications/notices?scope=messages",
        "data-html-path": "/notifications/messages",
        "data-scope": "messages"
    }, Xe("div", {
        class: "content"
    }, "\u79c1\u4fe1", Xe("div", {
        class: "notice-count messages"
    })))), Xe("div", {
        class: "item notice-dropdown-panel-container"
    }, Xe("div", {
        class: "ui dimmer over active"
    }, Xe("div", {
        class: "ui loader"
    })), Xe("div", {
        class: "notice-list",
        style: "min-height: auto;"
    }, Xe("a", {
        class: "noti",
        href: "/masx200/mvvm-reactive-view",
        target: "_blank",
        "data-type": "project",
        "data-id": "50555275"
    }, Xe("div", {
        class: "title"
    }, "\u4f60\u7684\u4ed3\u5e93 masx200/mvvm-reactive-view \u5df2\u7ecf\u4ece https://github.com/masx200/mvvm-reactive-view.git \u540c\u6b65\u6210\u529f"), Xe("div", {
        class: "meta"
    }, Xe("time", {
        class: "timeago"
    }, "2\u5c0f\u65f6\u524d"), " \xb7", " ", Xe("span", {
        class: "namespace"
    }, "masx200/mvvm-reactive-view")))), Xe("div", {
        class: "notice-dropdown-panel-blank"
    }, "\u6682\u6ca1\u6709\u65b0\u6d88\u606f")), Xe("div", {
        class: "notice-dropdown-panel-footer"
    }, Xe("div", {
        class: "action"
    }, Xe("div", {
        class: "side left"
    }, Xe("a", {
        href: "javascript: void(0);",
        class: "mark-notices"
    }, "\u5f53\u524d\u6807\u8bb0\u4e3a\u5df2\u8bfb")), Xe("div", {
        class: "side right"
    }, Xe("a", {
        href: "/notifications/infos",
        class: "load-all",
        target: "_blank"
    }, "\u67e5\u770b\u5168\u90e8")))))), Xe("div", {
        class: "ui dropdown link item",
        id: "git-nav-create",
        tabindex: "0"
    }, Xe("i", {
        class: "iconfont icon-add-thin"
    }), Xe("div", {
        class: "right menu",
        tabindex: "-1"
    }, Xe("a", {
        href: "/projects/new",
        class: "item"
    }, Xe("i", {
        class: "add square icon"
    }), "\u65b0\u5efa\u4ed3\u5e93"), Xe("a", {
        href: "/masx200/codes/new",
        class: "item"
    }, Xe("i", {
        class: "code icon"
    }), "\u53d1\u5e03\u4ee3\u7801\u7247\u6bb5"), Xe("a", {
        href: "/organizations/new",
        class: "item"
    }, Xe("i", {
        class: "group icon"
    }), "\u521b\u5efa\u7ec4\u7ec7"), Xe("a", {
        href: "/enterprises/new",
        class: "item"
    }, Xe("i", {
        class: "icon iconfont icon-enterprise"
    }), "\u5f00\u901a\u4f01\u4e1a\u7248"), Xe("a", {
        href: "/projects/oauth_github",
        class: "item"
    }, Xe("i", {
        class: "github icon"
    }), "\u4ece GitHub \u5bfc\u5165\u4ed3\u5e93"))), Xe("div", {
        class: "ui dropdown item",
        id: "git-nav-user",
        tabindex: "0"
    }, Xe("img", {
        alt: "1081296_masx200",
        class: "ui avatar image",
        src: "https://avatar.gitee.com/uploads/96/1081296_masx200.png!avatar30?1566294318"
    }), Xe("i", {
        class: "dropdown icon"
    }), Xe("div", {
        class: "right menu",
        tabindex: "-1"
    }, Xe("a", {
        href: "/masx200",
        class: "item"
    }, Xe("i", {
        class: "iconfont icon-ic-home"
    }), "\u4e2a\u4eba\u4e3b\u9875"), Xe("a", {
        href: "/profile",
        class: "item"
    }, Xe("div", {
        class: "mayun-icon my-ic-edit my-ic-edit-dims"
    }), "\u8bbe\u7f6e"), Xe("div", {
        class: "divider"
    }), Xe("a", {
        href: "/gists",
        class: "item"
    }, Xe("div", {
        class: "iconfont icon-ic-gist"
    }), "\u4ee3\u7801\u7247\u6bb5"), Xe("a", {
        href: "https://gitee.com/help",
        class: "item",
        target: "_blank"
    }, Xe("div", {
        class: "mayun-icon my-ic-help my-ic-help-dims"
    }), "\u5e2e\u52a9"), Xe("div", {
        class: "divider"
    }), Xe("a", {
        href: "/logout",
        class: "item destroy-user-session",
        "data-method": "delete",
        rel: "nofollow"
    }, Xe("div", {
        class: "mayun-icon my-ic-exit my-ic-exit-dims"
    }), "\u9000\u51fa"))), Xe("script", null)))))) ]);
    console.log(vdom$5, temp_ref, lirefs);
    document.body.appendChild(jn(vdom$5, document.createElement("div")));
    console.log([ Xe, Xe ]);
    (() => {
        var mystate = rr(true);
        console.log("mystatetest", mystate);
        var vdom = Tr(mystate, "testtrue", Xe("div", undefined, "testfalese"));
        var vdom2 = Tr(mystate, undefined, Xe("div", undefined, "testwwwwwwwwwfalese"));
        var vdom3 = Tr(mystate, Xe("div", undefined, "testwwwwwwwtrueeeeeeeeee"), undefined);
        console.log([ vdom, vdom2, vdom3 ]);
        document.body.appendChild(jn([ vdom, vdom2, vdom3 ], document.createElement("div")));
        var timer = setInterval(() => {
            mystate.value = !mystate.value;
        }, 1e3);
        setTimeout(() => {
            clearInterval(timer);
        }, 1e4);
    })();
    (() => {
        var stylestate = rr({
            display: "block",
            width: "100%"
        });
        var inputref = kr();
        var state1 = rr("hello");
        var vdom = [ Xe("div", {
            style: {
                display: "block",
                width: "100%"
            }
        }, "hello world!"), Xe("input", {
            style: "width:100%",
            "@input": e => state1.value = e.target.value,
            "*ref": inputref,
            "@change": e => state1.value = e.target.value,
            id: "co11111111111de16",
            class: "col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control",
            value: state1
        }), Xe("h1", {
            style: stylestate
        }, "mvvm-reactive-view"), Xe("button", {
            "@click": () => {
                stylestate.color = "red";
            }
        }, "red"), Xe("button", {
            "@click": () => {
                stylestate.color = "green";
            }
        }, "green") ];
        mn(stylestate, console.log);
        mn(state1, console.log);
        console.log(vdom);
        jn(vdom, document.getElementById("app"));
    })();
    (() => {
        var vdom2 = [ Xe("div", {
            "*text": "<a>\u7ed1\u5b9atextcontent</a>"
        }), Xe("div", {
            "*html": "<a>\u7ed1\u5b9ainnerhtml</a>"
        }) ];
        console.log(vdom2);
        document.body.appendChild(jn(vdom2, document.createElement("div")));
        var state1 = rr("<a>\u7ed1\u5b9atextcontent</a>");
        var state2 = rr("<a>\u7ed1\u5b9ainnerhtml</a>");
        var vdom3 = [ Xe("textarea", {
            value: state1,
            "@input": [ e => {
                state1.value = e.target.value;
            } ]
        }), Xe("input", {
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
        document.body.appendChild(jn(vdom3, document.createElement("div")));
        var state3 = rr("<a>\u7ed1\u5b9ainnerhtml</a>");
        var vdom4 = Xe("", null, Xe("div", {
            _text: state3
        }), Xe("div", {
            _html: state3
        }), Xe("script", null, " "));
        mn(state1, state => state3.value = state);
        mn(state2, state => state1.value = state);
        console.log(state3);
        console.log(vdom4);
        document.body.appendChild(jn(vdom4, document.createElement("div")));
        var objstate = rr({
            a: "w",
            6: "xxxxxxx",
            tttttttt: "true"
        });
        var objstate2 = rr('{ a: "w", 6: "xxxxxxx", tttttttt: "true" }');
        console.log(objstate);
        setTimeout(() => {
            objstate.length = 10;
            objstate2.value = 2222222222222;
        }, 2e3);
        var objstatearray = rr([ {
            a: "w",
            6: "xxxxxxx",
            tttttttt: "true"
        }, 1, true, "test" ]);
        var stylestate = rr({
            display: "block",
            width: "100%"
        });
        var classsetstate = rr(new Set([ "xxxxxxx", "wwwwwww", "eeeeeeee" ]));
        console.log("classsetstate", classsetstate);
        mn(classsetstate, a => console.log(a));
        setTimeout(() => {
            classsetstate.add("vvvvvvvvvvv");
        }, 5e3);
        setTimeout(() => {
            classsetstate.delete("eeeeeeee");
        }, 4e3);
        var vdomobj = [ Xe("div", {
            style: {
                display: "block",
                width: "100%"
            }
        }, objstate2), Xe("div", {
            style: stylestate,
            class: new Set([ "wwwwwww", "eeeeeeee" ])
        }, objstatearray), objstate, Xe("div", {
            style: stylestate,
            class: classsetstate
        }) ];
        document.body.appendChild(jn(vdomobj, document.createElement("div")));
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
        console.log([ objstate2, rr(objstate2) ]);
        console.log(Object.entries(objstate));
    })();
    (() => {
        var vdom = Xe("math", null, Xe("mrow", null, Xe("mrow", null, Xe("msup", null, Xe("mi", null, "a"), Xe("mn", null, "2")), Xe("mo", null, "+"), Xe("msup", null, Xe("mi", null, "b"), Xe("mn", null, "2"))), Xe("mo", null, "="), Xe("msup", null, Xe("mi", null, "c"), Xe("mn", null, "2"))));
        document.body.appendChild(jn(vdom, document.createElement("div")));
        console.log(vdom);
    })();
    class Bqqqqqqqqq extends HTMLElement {}
    class Aqqqqqqqqq extends HTMLElement {}
    console.log(customElements, [ ...customElements ]);
    customElements.define("qqqqqqqqqq-----a", Bqqqqqqqqq);
    customElements.define("qqqqqqqqqq-----a", Aqqqqqqqqq);
    document.body.appendChild(jn([ Xe(Bqqqqqqqqq), Xe(Aqqqqqqqqq) ], document.createElement("div")));
    console.log([ Xe, Xe ]);
    (() => {
        (() => {
            var _class, _temp;
            var myvdom1111111 = Xe(class extends HTMLElement {
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
            document.body.appendChild(jn(myvdom1111111, document.createElement("div")));
            document.body.appendChild(jn(Xe((() => {
                var Aaaaaaaaaa = class extends HTMLElement {};
                Aaaaaaaaaa.defaultProps = {
                    name: "HelloKitty",
                    myAge: 18
                };
                return Aaaaaaaaaa;
            })()), document.createElement("div")));
            var myele1 = Xe((_temp = _class = class extends HTMLElement {}, _defineProperty(_class, "defaultProps", {
                name: "aaaaaaaaaaHelloKitty",
                myAge: 0x71afd498cfffe
            }), _temp));
            console.log(myele1);
            document.body.appendChild(jn(myele1, document.createElement("div")));
            document.body.appendChild(jn(myele1, document.createElement("div")));
        })();
    })();
    {
        var vdom$6 = Xe("div", [ [ Xe("html", null, "testhtml"), Xe("button", {
            onclick: [ console.log, () => {
                console.log("onclick");
            } ],
            "*text": "clicktest",
            "@click": [ console.log, () => {
                console.log("@click");
            } ]
        }), Xe("style", null) ] ]);
        document.body.appendChild(jn(vdom$6, document.createElement("div")));
        console.log("onclick", " @click", vdom$6);
    }
    _asyncToGenerator((function*() {
        var defaultProps = {
            cccccc: "bbbbbbb"
        };
        var css = yield (yield fetch("https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-6556dfa9be535e551ffffaadfecdad99.min.css")).text();
        var Hellowordclass = gr(Object.assign(() => {
            return Xe("div", undefined, "hello world");
        }, {
            css: css,
            defaultProps: defaultProps
        }));
        document.body.appendChild(jn(Xe(Hellowordclass), document.createElement("div")));
    }))();
    (() => {
        var colortext = rr("red");
        var stylestate = rr({
            display: "block",
            width: "100%",
            color: colortext
        });
        var vdom = [ Xe("hr", null), Xe("h1", {
            style: stylestate
        }, "input color ", colortext), Xe("input", {
            _value: colortext
        }), Xe("hr", null) ];
        console.log([ vdom, colortext, stylestate ]);
        mn([ colortext, stylestate ], (a, b) => console.log([ a, _objectSpread2({}, b) ]));
        document.body.appendChild(jn(vdom, document.createElement("div")));
    })();
    (() => {
        var colortext = rr("blue");
        var stylestate = rr({
            display: "block",
            width: "100%",
            color: colortext
        });
        var vdom = [ Xe("hr", null), Xe("h1", {
            style: stylestate
        }, "input color ", colortext), Xe("input", {
            _value: colortext
        }), Xe("hr", null) ];
        var inter = setInterval(() => {
            colortext.value = "#" + (Math.random() * 16 ** 7).toString(16).slice(0, 6);
        }, 1e3);
        setTimeout(() => {
            clearInterval(inter);
        }, 1e4);
        mn([ colortext, stylestate ], (a, b) => console.log([ a, _objectSpread2({}, b) ]));
        document.body.appendChild(jn(vdom, document.createElement("div")));
    })();
    var css$1 = '@import url(https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css);html{color:#444333;background:#fff;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;text-rendering:optimizelegibility}article,aside,blockquote,body,button,code,dd,details,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,input,legend,li,menu,nav,ol,p,pre,section,td,textarea,th,ul{margin:0;padding:0}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}audio,canvas,video{display:inline-block;*display:inline;*zoom:1}body,button,input,select,textarea{font:500 .875em/1.8 Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif}button,input{*width:auto;*overflow:visible;line-height:22px}table{border-collapse:collapse;border-spacing:0}th{text-align:inherit}fieldset,img{border:0}img{-ms-interpolation-mode:bicubic}iframe{display:block}blockquote{font-family:Optima,Georgia,STSong,serif;margin:1em 0;color:#999;padding:.6em 1em;background:#f8f8f8;border-left:.4em solid #ddd}blockquote blockquote{padding:0 0 0 1em;margin-left:2em}abbr,acronym{border-bottom:1px dotted;font-variant:normal}abbr{cursor:help}del{text-decoration:line-through}address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:400}ol,ul{list-style:none}caption,th{text-align:left}q:after,q:before{content:""}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:text-top\\9}:root sub,:root sup{vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}a:hover{text-decoration:underline}a,ins{text-decoration:none}.typo-u,u{text-decoration:underline}mark{background:#fffdd1}code,pre{font-family:Courier New,Courier,monospace;white-space:pre-wrap;word-wrap:break-word}pre{background:#f8f8f8;border:1px solid #ddd;padding:1em 1.5em}hr{border:none;border-bottom:1px solid #cfcfcf;margin-bottom:10px;*color:pink;*filter:chroma(color=pink);height:10px;*margin:-7px 0 2px}.typo-small,figcaption,small{font-size:.9em;color:#888}[draggable]{cursor:move}.clearfix:after,.clearfix:before{content:"";display:table}.clearfix:after{clear:both}.clearfix{zoom:1}.textwrap,.textwrap td,.textwrap th{word-wrap:break-word;word-break:break-all}.textwrap-table{table-layout:fixed}.typo-dl,.typo-form,.typo-hr,.typo-ol,.typo-p,.typo-pre,.typo-table,.typo-ul,.typo dl,.typo form,.typo hr,.typo ol,.typo p,.typo pre,.typo table,.typo ul{margin-bottom:1.2em}h1,h2,h3,h4,h5,h6{font-weight:500;*font-weight:800;font-family:Helvetica Neue,Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif;color:#333}.typo-h1,.typo-h2,.typo-h3,.typo-h4,.typo-h5,.typo-h6,.typo h1,.typo h2,.typo h3,.typo h4,.typo h5,.typo h6{margin-bottom:.4em;line-height:1.5}.typo-h1,.typo h1{font-size:1.8em}.typo-h2,.typo h2{font-size:1.6em}.typo-h3,.typo h3{font-size:1.4em}.typo-h4,.typo h4{font-size:1.2em}.typo-h5,.typo-h6,.typo h5,.typo h6{font-size:1em}.typo-ul,.typo ul{margin-left:1.3em;list-style:disc}.typo-ol,.typo ol{list-style:decimal;margin-left:1.9em}.typo-ol ol,.typo-ol ul,.typo-ul ol,.typo-ul ul,.typo li ol,.typo li ul{margin-top:0;margin-bottom:0;margin-left:2em}.typo-ol ul,.typo-ul ul,.typo li ul{list-style:circle}.typo-table td .typo table caption,.typo-table th,.typo table td,.typo table th{border:1px solid #ddd;padding:.5em 1em;color:#666}.typo-table th,.typo table th{background:#fbfbfb}.typo-table thead th,.typo table thead th{background:#f1f1f1}.typo table .caption{border-bottom:none}.typo-input,.typo-textarea{-webkit-appearance:none;border-radius:0}::-moz-selection{background:#08c;color:#fff}::selection{background:#08c;color:#fff}.typo-em,.typo em,caption,legend{font-weight:700}p{color:#0f0!important}@font-face{font-family:octicons-anchor;src:url(data:font/woff;charset=utf-8;base64,d09GRgABAAAAAAYcAA0AAAAACjQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABMAAAABwAAAAca8vGTk9TLzIAAAFMAAAARAAAAFZG1VHVY21hcAAAAZAAAAA+AAABQgAP9AdjdnQgAAAB0AAAAAQAAAAEACICiGdhc3AAAAHUAAAACAAAAAj//wADZ2x5ZgAAAdwAAADRAAABEKyikaNoZWFkAAACsAAAAC0AAAA2AtXoA2hoZWEAAALgAAAAHAAAACQHngNFaG10eAAAAvwAAAAQAAAAEAwAACJsb2NhAAADDAAAAAoAAAAKALIAVG1heHAAAAMYAAAAHwAAACABEAB2bmFtZQAAAzgAAALBAAAFu3I9x/Nwb3N0AAAF/AAAAB0AAAAvaoFvbwAAAAEAAAAAzBdyYwAAAADP2IQvAAAAAM/bz7t4nGNgZGFgnMDAysDB1Ml0hoGBoR9CM75mMGLkYGBgYmBlZsAKAtJcUxgcPsR8iGF2+O/AEMPsznAYKMwIkgMA5REMOXicY2BgYGaAYBkGRgYQsAHyGMF8FgYFIM0ChED+h5j//yEk/3KoSgZGNgYYk4GRCUgwMaACRoZhDwCs7QgGAAAAIgKIAAAAAf//AAJ4nHWMMQrCQBBF/0zWrCCIKUQsTDCL2EXMohYGSSmorScInsRGL2DOYJe0Ntp7BK+gJ1BxF1stZvjz/v8DRghQzEc4kIgKwiAppcA9LtzKLSkdNhKFY3HF4lK69ExKslx7Xa+vPRVS43G98vG1DnkDMIBUgFN0MDXflU8tbaZOUkXUH0+U27RoRpOIyCKjbMCVejwypzJJG4jIwb43rfl6wbwanocrJm9XFYfskuVC5K/TPyczNU7b84CXcbxks1Un6H6tLH9vf2LRnn8Ax7A5WQAAAHicY2BkYGAA4teL1+yI57f5ysDNwgAC529f0kOmWRiYVgEpDgYmEA8AUzEKsQAAAHicY2BkYGB2+O/AEMPCAAJAkpEBFbAAADgKAe0EAAAiAAAAAAQAAAAEAAAAAAAAKgAqACoAiAAAeJxjYGRgYGBhsGFgYgABEMkFhAwM/xn0QAIAD6YBhwB4nI1Ty07cMBS9QwKlQapQW3VXySvEqDCZGbGaHULiIQ1FKgjWMxknMfLEke2A+IJu+wntrt/QbVf9gG75jK577Lg8K1qQPCfnnnt8fX1NRC/pmjrk/zprC+8D7tBy9DHgBXoWfQ44Av8t4Bj4Z8CLtBL9CniJluPXASf0Lm4CXqFX8Q84dOLnMB17N4c7tBo1AS/Qi+hTwBH4rwHHwN8DXqQ30XXAS7QaLwSc0Gn8NuAVWou/gFmnjLrEaEh9GmDdDGgL3B4JsrRPDU2hTOiMSuJUIdKQQayiAth69r6akSSFqIJuA19TrzCIaY8sIoxyrNIrL//pw7A2iMygkX5vDj+G+kuoLdX4GlGK/8Lnlz6/h9MpmoO9rafrz7ILXEHHaAx95s9lsI7AHNMBWEZHULnfAXwG9/ZqdzLI08iuwRloXE8kfhXYAvE23+23DU3t626rbs8/8adv+9DWknsHp3E17oCf+Z48rvEQNZ78paYM38qfk3v/u3l3u3GXN2Dmvmvpf1Srwk3pB/VSsp512bA/GG5i2WJ7wu430yQ5K3nFGiOqgtmSB5pJVSizwaacmUZzZhXLlZTq8qGGFY2YcSkqbth6aW1tRmlaCFs2016m5qn36SbJrqosG4uMV4aP2PHBmB3tjtmgN2izkGQyLWprekbIntJFing32a5rKWCN/SdSoga45EJykyQ7asZvHQ8PTm6cslIpwyeyjbVltNikc2HTR7YKh9LBl9DADC0U/jLcBZDKrMhUBfQBvXRzLtFtjU9eNHKin0x5InTqb8lNpfKv1s1xHzTXRqgKzek/mb7nB8RZTCDhGEX3kK/8Q75AmUM/eLkfA+0Hi908Kx4eNsMgudg5GLdRD7a84npi+YxNr5i5KIbW5izXas7cHXIMAau1OueZhfj+cOcP3P8MNIWLyYOBuxL6DRylJ4cAAAB4nGNgYoAALjDJyIAOWMCiTIxMLDmZedkABtIBygAAAA==) format("woff")}*{color:purple!important;font-size:50px}@keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@media (max-width:720px){.article-content h1{font-size:24px}.article-content h2{font-size:20px}.article-content h3{font-size:18px}.article-content pre>code .copy-code-btn{display:none}.article-content pre>code.hljs[lang]:before{top:2px;right:15px}}@media (max-width:720px){.article-content pre>code.copyable.hljs[lang]:before{right:1rem}}@media (max-width:500px){hr#hidewidthless500{display:none}}.recommend-container .recommend-user .item{margin-bottom:16px}.recommend-container .recommend-user .ui.button{padding:3px 5px;margin-right:0}.recommend-container .recommend-user .header .pull-right{color:#005980;cursor:pointer}.recommend-container .recommend-user .header .pull-right.disabled{opacity:.7;cursor:default}.recommend-container .recommend-user .icon-reset{margin-top:-1px;height:16px;font-size:16px;margin-right:2px}.recommend-container .recommend-user__content{position:relative}.recommend-container .dimmer.active{z-index:1}.recommend-container .recommend-list__user{-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;margin-right:4px}.recommend-container .recommend-list__user strong{color:#005980}.recommend-container .recommend-list__user .recommend-list__user-info{margin:0 4px 0 8px;max-width:155px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.recommend-container .recommend-list__user .recommend-list__user-info.is-follow{max-width:125px}.recommend-container .recommend-list__user .recommend-list__user-info>div{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.recommend-container .recommend-list__flollow .disable{opacity:.5}.recommend-container .recommend-project .icon-recommended{color:#fe7300}.recommend-container .recommend-project .project-label{display:inline-block}.recommend-container .recommend-project .recommend-list{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.recommend-container .recommend-project .recommend-list>*{word-break:break-all}.recommend-container .recommend-project .recommend-list .recommend-project__describe{overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical}.recommend-container .recommend-project .item{margin-bottom:16px}.recommend-container .recommend-project .recommend-project__name{margin-bottom:4px;color:#005980}.recommend-container .recent_visits .ui.items{margin-right:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.recommend-container .recent_visits .avatar-item{margin-right:-22px!important}.recommend-container .recent_visits .item{width:20%;min-width:0;font-size:16px}.recommend-container .recent_visits .empty-visitor.item{font-size:14px;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1}.dashboard-content.twelve{padding-right:0!important}.dashboard-content .gitee-headbread .git-user-selection-dropdown{margin-right:0!important}.dashboard-content .dashboard-team .git-user-content-header{display:none}.dashboard-content .gitee-headbread{margin-bottom:24px}.dashboard-content .git-dashboard-projects-menu{margin-bottom:24px!important}.dashboard-content .git-dashboard-projects-menu .f-bold{color:#fe7300;border-bottom:2px solid #fe7300!important}.dashboard-content .git-dashboard-projects-menu>a.item{font-size:16px;padding:8px 18px!important}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input{width:150px;margin-right:10px}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input input{margin-top:-6px;font-size:12px;margin-right:10px}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input .icon-search{margin-top:-4px}.dashboard-content #event-timeline-panel h3.event-timeline-title{font-size:16px;margin-top:0;margin-bottom:16px;display:inline-block}.dashboard-content #event-timeline-panel .event-timeline.content{padding:0 0 18px 12px}.dashboard-content #event-timeline-panel .event-actionbar .dropdown.icon{margin-left:4px}.dashboard-content #event-timeline-panel .message-container .message{margin:0 0 1em}.dashboard-content .issues-filter__item{display:block;padding:0!important;color:initial!important;font-weight:500!important}.dashboard-content .issues-dropdown{margin-top:-6px!important}.dashboard-content .issues-dropdown .pl-0.f-bold{padding-left:0!important}.dashboard-content .dashboard-team .dashboard-team_info{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.dashboard-content .dashboard-team .ui.image{width:40px;height:40px;min-width:40px}.dashboard-content .dashboard-team .dashboard-team__contaniner .dashboard-team__name{font-size:16px;font-weight:700;overflow:hidden;word-break:keep-all;text-overflow:ellipsis;display:block}.dashboard-content .dashboard-team .dashboard-team__contaniner a{color:#005980!important}.dashboard-content .dashboard-team .dashboard-team__contaniner>.item:first-child{padding-top:0!important}.dashboard-content .dashboard-team .dashboard-team__contaniner .item{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.dashboard-content .dashboard-team .dashboard-team__contaniner .content{display:-webkit-box!important;display:-webkit-flex!important;display:-moz-box!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;overflow:hidden}.dashboard-content .dashboard-team .dashboard-team__contaniner .content:after{content:none}.dashboard-content .dashboard-team .dashboard-team__contaniner .content i{font-size:16px}.dashboard-content .dashboard-team .icon-enterprise-badge{margin-left:4px}.dashboard-content .dashboard-team .dashboard-team__operate{min-width:75px;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-moz-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.dashboard-content .dashboard-team .dashboard-team__operate.has-exit{min-width:150px}.recommend-project .icon-help-circle{vertical-align:baseline}.dashboard-content__show{width:608px!important;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.ui.container.user_page{width:1240px}#rc-users__container{position:relative}#rc-users__container .secondary-navigation .active{color:#fe7300!important}#rc-users__container .dashboard-content{padding-right:32px;padding-left:32px;padding-top:24px}#rc-users__container .dashboard-sidebar{padding:16px 0 0;width:280px!important;margin-left:10px}#rc-users__container .dashboard-sidebar .dashboard-group .item{margin:8px 0}#rc-users__container .dashboard-sidebar .dashboard-group:last-child{margin-bottom:0!important}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar{padding-top:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .ui.card{width:100%;margin-top:32px;margin-bottom:0;padding-bottom:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .ui.card .header{font-size:16px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name h4{font-size:14px;display:inline-block}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .description{margin-top:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .item.flex{margin-top:16px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .item.flex:first-child{margin-top:12px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .quit i{margin-top:0}#rc-users__container .has-active .content{padding-left:0 2px 0 8px}#rc-users__container .navigation .header{padding-right:8px;border-bottom:1px solid #e3e9ed;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;padding-bottom:4px}#rc-users__container .navigation .header,#rc-users__container .navigation .header .title{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}#rc-users__container .navigation .header .title{font-size:16px}#rc-users__container .navigation .header .avatar.image{margin-right:0}#rc-users__container .navigation .header strong{font-size:16px;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;max-width:120px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#rc-users__container .navigation .header strong a{color:unset}#rc-users__container .navigation .header .actions{margin-top:4px}#rc-users__container .navigation .header .actions i{color:#005980}#rc-users__container .navigation.user i{color:#989dad}#rc-users__container .navigation.user .content{padding:0 8px}#rc-users__container .navigation .items>a{color:#40485b}#rc-users__container .navigation .items>a:hover{color:#095eab}#rc-users__container .navigation .items>a:active{color:#064177}#rc-users__container .navigation .items>a:hover{color:#40485b}#rc-users__container .navigation .item:hover .content{background:#f8f8f8}#rc-users__container .navigation .item .active{color:#fe7300;background:#f8f8f8}#rc-users__container .navigation .item .active .num{color:inherit}#rc-users__container .navigation .item:hover .exit{display:inline-block}#rc-users__container .navigation .icon-add,#rc-users__container .navigation .icon-search{color:#8c92a4!important}#rc-users__container .navigation .num{font-size:12px;font-weight:500;color:#8c92a4}#rc-users__container .navigation .gray{color:#8c92a4}#rc-users__container .navigation .avatar.image{width:32px;height:32px}#rc-users__container .twitter-typeahead{width:100%}#rc-users__container .gray{color:#8c92a4}#rc-users__container .ui.container{width:1240px}#rc-users__container .contribution-events{padding-top:32px}#rc-users__container #git-footer-main{min-width:1240px}#rc-users__container .gitee-headbread .gitee-divider{display:inline-block;opacity:.5;margin:0 .2rem;color:rgba(0,0,0,.4);vertical-align:baseline}#rc-users__container .git-user-content .git-user-content-header{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:16px}#rc-users__container .ui.button.js-project-watch{background:#fff;border:1px solid rgba(140,146,164,.5);padding:2px 5px;margin:0}#rc-users__container .recommend-container{width:248px!important}.users__personal-avatar{position:relative;margin:0 auto 10px;width:160px;height:160px}.users__personal-avatar .over-avatar{position:absolute;top:0;left:0;width:100%;height:100%;color:#fff;font-size:14px;text-align:center;line-height:200px;border:4px solid #eee;border-radius:50%;background:rgba(0,0,0,.5);cursor:pointer;display:none}.users__personal-avatar .over-avatar:hover{display:block}.users__personal-avatar .ui.image.avatar{margin:0;width:100%;height:100%;border:4px solid #eee}.users__personal-avatar .ui.image.avatar:hover+.over-avatar{display:block}.users__personal-avatar .avatar-gender{position:absolute;bottom:2px;right:27px;width:32px;height:32px;border-radius:50%;color:#fff;font-size:21px;text-align:center;line-height:30px;border:2px solid #fff}.users__personal-avatar .avatar-gender.mars{background:#3eb4ff}.users__personal-avatar .avatar-gender.venus{background:#ff5bc6}.users__personal-name{text-align:center}.users__personal-name h2,.users__personal-name p{margin:8px 0 0;word-break:break-all}.users__personal-name h2 span,.users__personal-name p span{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}.users__personal-name .remark-name{color:#8c92a4;font-size:14px;font-weight:400;display:inline}.users__personal-name .ui.small.label{margin-bottom:.5em;padding:.4em .7em;font-weight:400}.users__personal-setting{margin:15px auto;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__personal-setting .ui.button{margin:0;width:45%;font-size:14px}.users__personal-setting .ui.button.basic{border:1px solid #ccc}.users__personal-socials .ui.grid{padding:0 1rem}.users__personal-socials .ui.grid .column{padding:1rem 0;text-align:center}.users__personal-socials .social-count{font-size:18px;font-weight:700}.users__personal-socials .social-name{padding-top:5px;color:#40485b;font-size:12px;display:block}.users__personal-info{padding:15px 0;color:#8c92a4}.users__personal-info .info-item{padding:3px 0;line-height:1.5;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__personal-info .info-item i.iconfont{width:20px;text-align:center}.users__personal-info .info-item i.iconfont.icon-time{font-size:12px}.users__personal-achievement{padding:10px 0}.users__personal-achievement h3{margin:0;padding-bottom:4px;border-bottom:1px solid #dce3e8}.users__personal-achievement .ui.list .item .content{line-height:1.8}.users__personal-achievement .ui.list .item .content .description{color:#7687ab}.users__personal-groups{padding:10px 0}.users__personal-groups h3{margin:0;padding-bottom:4px;border-bottom:1px solid #dce3e8}.users__personal-groups .ui.list{margin:0}.users__personal-groups .ui.list:not(.more-groups){margin-top:1em}.users__personal-groups .ui.list .item{padding:.3em 0}.users__personal-groups .ui.list .item a{color:#005980!important}.users__personal-groups .ui.list .item a:hover{color:#4c8aa6!important}.users__personal-groups .ui.list .item a:active{color:#003e59!important}.users__personal-groups .ui.list .item .content{line-height:1.8;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__personal-groups .ui.list .item .right.floated.content{color:#7687ab}.users__personal-groups .ui.list .item .right.floated.content .mr-1{width:24px;display:inline-block}.users__personal-groups .load-more-groups{margin-top:8px;display:block;color:#7687ab}.users__personal-groups .load-more-groups:hover{color:#9fabc4}.users__personal-groups .load-more-groups:active{color:#525e77}.users__navbar .ui.secondary.pointing.menu{border-bottom:2px solid #dededf}.users__navbar .ui.secondary.pointing.menu>.item{margin-bottom:-2px;padding:10px 30px;min-width:100px;text-align:center;border-width:2px}.users__navbar .ui.secondary.pointing.menu>.item.active{color:#fe7300;border-color:#fe7300}.users__navbar .ui.secondary.pointing.menu>.item.active .ui.label{color:#fe7300;background:rgba(254,115,0,.2)}.users__header{margin-top:2em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__header h3{margin:0}.users__header .ui.dropdown{padding:.5em .92857em}.users__popular-projects .ui.cards{margin:0 -.5em -.5em}.users__popular-projects .ui.cards .ui.card{margin:.5em!important;padding:1em;width:calc(50% - 1em)!important;border:1px solid #dce3e8;-webkit-box-shadow:none;box-shadow:none}.users__popular-projects .ui.cards .ui.card .content{padding:0}.users__popular-projects .ui.cards .ui.card .content .popular-project-title{font-size:16px;word-break:break-all;vertical-align:middle}.users__popular-projects .ui.cards .ui.card .content .git-project-gvp-badge{margin-top:-3px}.users__popular-projects .ui.cards .ui.card .content i.iconfont{font-size:14px}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-mode-table{margin-top:1px;color:#d0d0d0;cursor:move}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-recommended{color:#fe7300;font-weight:400}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-watch{font-size:12px;vertical-align:baseline}.users__popular-projects .ui.cards .ui.card .content .description{color:#8c92a4;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}.users__popular-projects .ui.cards .ui.card .extra.content{padding-top:1em;border:none!important;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__popular-projects .ui.cards .ui.card .extra.content:after{content:none}.users__popular-projects .ui.cards .ui.card .extra.content .left .ui.small.label{padding:.4em .7em}.users__popular-projects .ui.cards .ui.card .extra.content .right a{padding:0 .2em;color:#8c92a4}.users__popular-projects .ui.cards .ui.card .extra.content .right a:hover{color:#aeb2bf}.users__popular-projects .ui.cards .ui.card .extra.content .right a:active{color:#626672}.users__popular-projects .ui.cards .ui.card.sortable-chosen{background:#fed!important}.users__contribution-panel .less{background-color:#eee}.users__contribution-panel .little{background-color:#d6e685}.users__contribution-panel .some{background-color:#8cc665}.users__contribution-panel .many{background-color:#44a340}.users__contribution-panel .much{background-color:#1e6823}.users__contribution-panel .contribution-box{padding-top:20px;height:125px;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.users__contribution-panel .contribution-box .left-side{width:32px;font-size:12px;text-align:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.users__contribution-panel .contribution-box .left-side,.users__contribution-panel .contribution-box .right-side{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.users__contribution-panel .contribution-box .right-side{position:relative;width:100%;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.users__contribution-panel .contribution-box .right-side .box{width:1.88679%;height:15px;border:1px solid #fff}.users__contribution-panel .contribution-box .right-side .box[data-content]:hover{border:1px solid #000}.users__contribution-panel .contribution-box .right-side .month{position:absolute;top:0;margin-top:-15px;margin-left:-15px;min-width:45px;font-size:12px;text-align:center}.users__contribution-panel .contribution-tip{margin-top:10px;padding-right:10px;font-size:12px;text-align:right}.users__contribution-panel .contribution-tip .word{font-size:12px;vertical-align:top;display:inline-block}.users__contribution-panel .contribution-tip .ui.horizontal.list>.item{margin:0 1px;width:12px;height:12px;vertical-align:text-bottom}.users__contribution-panel .contribution-describ p{margin:0 20px 0 0;display:inline-block}.users__contribution-panel .contribution-describ p.text-muted{margin-top:10px;display:block}.users__customize-modal .ui.form{min-height:180px}.users__customize-modal .grouped.fields{margin:.2em 0 1em!important;padding:10px 0;max-height:20em;overflow-y:auto}.users__customize-modal .grouped.fields .field{padding:5px!important}.users__customize-modal .grouped.fields .field .ui.checkbox{width:100%}.users__customize-modal .grouped.fields .field label{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__customize-modal .grouped.fields .field label span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__customize-modal .grouped.fields .field label .star-count{min-width:4em;text-align:right}.users__customize-modal .grouped.fields .field.active{background:rgba(254,115,0,.2)}.users__report-modal .appeal-success-tip{text-align:center}.users__report-modal .appeal-success-tip i.iconfont{font-size:7rem;color:#4baf50}.users__report-modal .ui.items{padding:20px;background:#f4f5f6}.users__report-modal .ui.items .ui.image{width:50px}.users__report-modal .ui.items .content .header{color:#40485b}.users__report-modal .ui.items .content .description{color:#8c92a4;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__report-modal .ui.segment.loader-block{border:0;min-height:100px}.users__report-modal .action-types .item{margin:5px;padding:10px 20px;min-width:120px;text-align:center;display:inline-block;background:#f2f2f2;border-radius:5px;cursor:pointer}.users__report-modal .action-types .item.active,.users__report-modal .action-types .item:active,.users__report-modal .action-types .item:hover{color:#fe7300}.users__report-modal .extra-content textarea{width:100%;height:5em}#user-show-detail .git-dashboard-projects-menu>.f-bold{color:#fe7300}#user-show-detail .git-codes-tags{margin-bottom:16px}#user-show-detail .git-user-twl-col>.gitee-headbread{margin-bottom:16px;margin-top:10px}#user-show-detail .git-profile-content-header .git-dashboard-projects-menu{margin-bottom:14px}#user-show-detail .git-profile-content-header .git-dashboard-projects-menu>a{font-size:14px}.recommend-container{padding:24px 0 0!important}.recommend-container .recommend-notice{background-color:#fffeed!important;margin-bottom:24px}.recommend-container .recommend-notice>.header{margin-right:8px!important}.recommend-container .ui.message{color:#40485b;padding:12px 16px;-webkit-box-shadow:0 0 0 1px #e2d8bf inset,0 0 0 0 transparent;box-shadow:inset 0 0 0 1px #e2d8bf,0 0 0 0 transparent}.recommend-container .ui.message i{position:absolute;top:0;right:0;font-size:.8em;margin-top:8px;margin-right:8px;cursor:pointer;color:#005980}.recommend-container .ui.message .header{color:#40485b;font-size:14px}.recommend-container .ui.message .content{margin-top:4px}.recommend-container .recommend-block{margin-bottom:32px}.recommend-container .recommend-block>.items{margin-top:0}.recommend-container .recommend-block .header{margin-bottom:16px}.recommend-container .recommend-block .header strong{font-size:16px}.recommend-container .recommend-block .recommend-list{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.recommend-container .recommend-block .item{margin:0}.recommend-container .recommend-user .header{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:end;-webkit-align-items:flex-end;-moz-box-align:end;-ms-flex-align:end;align-items:flex-end}.recommend-container .recommend-user .recommend-list{-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}';
    console.log([ Xe, Xe ]);
    (() => {
        var mycom = gr(Object.assign((props, children) => {
            var number = rr(1);
            hn(() => {
                console.log("mounted1");
            });
            hn(() => {
                console.log("mounted2", props);
            });
            dn(() => {
                console.log("unmounted");
            });
            mn(props.cccccc, cccccc => {
                console.log("cccccc", cccccc);
            });
            return Xe("div", {
                onclick: () => {
                    number.value++;
                }
            }, [ number, Xe("br", null), "wwwwwwwwwwww", Xe("div", [ "createComponent" ]), children, Xe("div", Xe("", null, "props cccccc ", props.cccccc)) ]);
        }, {
            defaultProps: {
                cccccc: "bbbbbbb"
            },
            css: css$1
        }));
        var myclasscomponent = mycom;
        var vdom = Xe(myclasscomponent, {
            aaaaaa: 222222222,
            tttttt: "dddddddddd"
        }, "children");
        console.log([ vdom, myclasscomponent, mycom ]);
        document.body.appendChild(jn(vdom, document.createElement("div")));
        setTimeout(() => {
            vdom.element.setAttribute("cccccc", "aaaaaaaaaaaaaaaaaabbbbbbbbbbnnnnnnnnnnnnn");
        }, 5e3);
        document.body.appendChild(jn(Xe(myclasscomponent, [ Xe("form", {
            id: "newsletterForm",
            class: "newsletter-form nodisable",
            name: "newsletter-form",
            action: "https://www.mozilla.org/en-US/newsletter/",
            method: "post"
        }, Xe("div", {
            class: "newsletter-head"
        }, Xe("h2", {
            class: "newsletter-teaser"
        }, "\u5b66\u4e60 Web \u5f00\u53d1\u7684\u6700\u4f73\u5b9e\u8df5"), Xe("p", {
            class: "newsletter-description"
        }, "\u8ba9 MDN \u5c06\u6700\u65b0\u3001\u6700\u68d2\u7684\u5185\u5bb9\u76f4\u63a5\u6295\u9012\u5230\u60a8\u7684\u90ae\u7bb1\u3002"), Xe("p", {
            class: "newsletter-lang"
        }, "\u76ee\u524d\u4ec5\u63d0\u4f9b\u82f1\u6587\u7248\u65b0\u95fb\u62a5\u3002")), Xe("div", {
            class: "newsletter-fields"
        }, Xe("input", {
            type: "hidden",
            id: "fmt",
            name: "fmt",
            value: "H"
        }), Xe("input", {
            type: "hidden",
            id: "newsletterNewslettersInput",
            name: "newsletters",
            value: "app-dev"
        }), Xe("div", {
            id: "newsletterErrors",
            class: "newsletter-errors"
        }), Xe("div", {
            id: "newsletterEmail",
            class: "form-group newsletter-group-email"
        }, Xe("label", {
            for: "newsletterEmailInput",
            class: "form-label offscreen"
        }, "\u7535\u5b50\u90ae\u4ef6\u5730\u5740"), Xe("input", {
            type: "email",
            id: "newsletterEmailInput",
            name: "email",
            class: "form-input newsletter-input-email",
            required: "",
            placeholder: "you@example.com",
            size: "30"
        })), Xe("div", {
            id: "newsletterPrivacy",
            class: "form-group form-group-agree newsletter-group-privacy hidden"
        }, Xe("input", {
            type: "checkbox",
            id: "newsletterPrivacyInput",
            name: "privacy",
            required: ""
        }), Xe("label", {
            for: "newsletterPrivacyInput"
        }, "\u6211\u63a5\u53d7 Mozilla \u6309\u7167", Xe("a", {
            href: "https://www.mozilla.org/privacy/"
        }, "\u9690\u79c1\u653f\u7b56"), "\u6240\u8ff0\u7684\u65b9\u5f0f\u5904\u7406\u6211\u7684\u4fe1\u606f\u3002")), Xe("div", {
            id: "newsletterSubmit",
            class: "newsletter-group-submit"
        }, Xe("button", {
            id: "newsletter-submit",
            type: "submit",
            class: "button neutral newsletter-submit"
        }, "\u7acb\u5373\u6ce8\u518c", Xe("svg", {
            class: "icon icon-arrow",
            xmlns: "http://www.w3.org/2000/svg",
            width: "23",
            height: "28",
            viewBox: "0 0 23 28",
            "aria-hidden": "true"
        }, Xe("path", {
            d: "M23 15a2.01 2.01 0 0 1-.578 1.422L12.25 26.594c-.375.359-.891.578-1.422.578s-1.031-.219-1.406-.578L8.25 25.422c-.375-.375-.594-.891-.594-1.422s.219-1.047.594-1.422L12.828 18h-11C.703 18 0 17.062 0 16v-2c0-1.062.703-2 1.828-2h11L8.25 7.406a1.96 1.96 0 0 1 0-2.812l1.172-1.172c.375-.375.875-.594 1.406-.594s1.047.219 1.422.594l10.172 10.172c.375.359.578.875.578 1.406z"
        })))))) ]), document.createElement("div")));
    })();
    setTimeout(() => {
        Object.values(Object.fromEntries(customElements)).map(c => Tn(Xe(c))).forEach(e => document.body.appendChild(e));
    }, 8e3);
    setTimeout(() => {
        Object.values(Object.fromEntries(customElements)).map(c => new c).forEach(e => document.body.appendChild(e));
    }, 8e3);
    var funstate = rr(() => {});
    mn(funstate, fun => {
        console.log([ funstate, fun ]);
    });
    requestAnimationFrame(() => {
        setTimeout(() => {
            funstate.value = class extends HTMLElement {};
        }, 50);
    });
    console.dir(funstate);
})();
//# sourceMappingURL=output-es2015.js.map
