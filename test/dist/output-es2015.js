(function() {
    "use strict";
    !(function() {
        var t;
        ("object" == typeof window.customElements &&
            "function" == typeof window.CustomElementRegistry) ||
            (function() {
                var t = new Set(
                    "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(
                        " "
                    )
                );
                function e(e) {
                    var n = t.has(e);
                    return (
                        (e = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(e)),
                        !n && e
                    );
                }
                function n(t) {
                    var e = t.isConnected;
                    if (void 0 !== e) return e;
                    for (
                        ;
                        t &&
                        !(t.__CE_isImportDocument || t instanceof Document);

                    )
                        t =
                            t.parentNode ||
                            (window.ShadowRoot && t instanceof ShadowRoot
                                ? t.host
                                : void 0);
                    return !(
                        !t ||
                        !(t.__CE_isImportDocument || t instanceof Document)
                    );
                }
                function o(t, e) {
                    for (; e && e !== t && !e.nextSibling; ) e = e.parentNode;
                    return e && e !== t ? e.nextSibling : null;
                }
                function i(t, e, n) {
                    n = void 0 === n ? new Set() : n;
                    for (var r = t; r; ) {
                        if (r.nodeType === Node.ELEMENT_NODE) {
                            var a = r;
                            e(a);
                            var c = a.localName;
                            if (
                                "link" === c &&
                                "import" === a.getAttribute("rel")
                            ) {
                                if ((r = a.import) instanceof Node && !n.has(r))
                                    for (
                                        n.add(r), r = r.firstChild;
                                        r;
                                        r = r.nextSibling
                                    )
                                        i(r, e, n);
                                r = o(t, a);
                                continue;
                            }
                            if ("template" === c) {
                                r = o(t, a);
                                continue;
                            }
                            if ((a = a.__CE_shadowRoot))
                                for (a = a.firstChild; a; a = a.nextSibling)
                                    i(a, e, n);
                        }
                        r = r.firstChild ? r.firstChild : o(t, r);
                    }
                }
                function r(t, e, n) {
                    t[e] = n;
                }
                function a() {
                    (this.a = new Map()),
                        (this.g = new Map()),
                        (this.c = []),
                        (this.f = []),
                        (this.b = !1);
                }
                function c(t, e) {
                    t.b &&
                        i(e, function(e) {
                            return l(t, e);
                        });
                }
                function l(t, e) {
                    if (t.b && !e.__CE_patched) {
                        e.__CE_patched = !0;
                        for (var n = 0; n < t.c.length; n++) t.c[n](e);
                        for (n = 0; n < t.f.length; n++) t.f[n](e);
                    }
                }
                function s(t, e) {
                    var n = [];
                    for (
                        i(e, function(t) {
                            return n.push(t);
                        }),
                            e = 0;
                        e < n.length;
                        e++
                    ) {
                        var o = n[e];
                        1 === o.__CE_state ? t.connectedCallback(o) : h(t, o);
                    }
                }
                function f(t, e) {
                    var n = [];
                    for (
                        i(e, function(t) {
                            return n.push(t);
                        }),
                            e = 0;
                        e < n.length;
                        e++
                    ) {
                        var o = n[e];
                        1 === o.__CE_state && t.disconnectedCallback(o);
                    }
                }
                function u(t, e, n) {
                    var o = (n = void 0 === n ? {} : n).u || new Set(),
                        r =
                            n.i ||
                            function(e) {
                                return h(t, e);
                            },
                        a = [];
                    if (
                        (i(
                            e,
                            function(e) {
                                if (
                                    "link" === e.localName &&
                                    "import" === e.getAttribute("rel")
                                ) {
                                    var n = e.import;
                                    n instanceof Node &&
                                        ((n.__CE_isImportDocument = !0),
                                        (n.__CE_hasRegistry = !0)),
                                        n && "complete" === n.readyState
                                            ? (n.__CE_documentLoadHandled = !0)
                                            : e.addEventListener(
                                                  "load",
                                                  function() {
                                                      var n = e.import;
                                                      if (
                                                          !n.__CE_documentLoadHandled
                                                      ) {
                                                          n.__CE_documentLoadHandled = !0;
                                                          var i = new Set(o);
                                                          i.delete(n),
                                                              u(t, n, {
                                                                  u: i,
                                                                  i: r
                                                              });
                                                      }
                                                  }
                                              );
                                } else a.push(e);
                            },
                            o
                        ),
                        t.b)
                    )
                        for (e = 0; e < a.length; e++) l(t, a[e]);
                    for (e = 0; e < a.length; e++) r(a[e]);
                }
                function h(t, e) {
                    if (void 0 === e.__CE_state) {
                        var o = e.ownerDocument;
                        if (
                            (o.defaultView ||
                                (o.__CE_isImportDocument &&
                                    o.__CE_hasRegistry)) &&
                            (o = t.a.get(e.localName))
                        ) {
                            o.constructionStack.push(e);
                            var i = o.constructorFunction;
                            try {
                                try {
                                    if (new i() !== e)
                                        throw Error(
                                            "The custom element constructor did not produce the element being upgraded."
                                        );
                                } finally {
                                    o.constructionStack.pop();
                                }
                            } catch (t) {
                                throw ((e.__CE_state = 2), t);
                            }
                            if (
                                ((e.__CE_state = 1),
                                (e.__CE_definition = o),
                                o.attributeChangedCallback)
                            )
                                for (
                                    o = o.observedAttributes, i = 0;
                                    i < o.length;
                                    i++
                                ) {
                                    var r = o[i],
                                        a = e.getAttribute(r);
                                    null !== a &&
                                        t.attributeChangedCallback(
                                            e,
                                            r,
                                            null,
                                            a,
                                            null
                                        );
                                }
                            n(e) && t.connectedCallback(e);
                        }
                    }
                }
                function p(t) {
                    var e = document;
                    (this.c = t),
                        (this.a = e),
                        (this.b = void 0),
                        u(this.c, this.a),
                        "loading" === this.a.readyState &&
                            ((this.b = new MutationObserver(this.f.bind(this))),
                            this.b.observe(this.a, {
                                childList: !0,
                                subtree: !0
                            }));
                }
                function d(t) {
                    t.b && t.b.disconnect();
                }
                function m() {
                    var t = this;
                    (this.b = this.a = void 0),
                        (this.c = new Promise(function(e) {
                            (t.b = e), t.a && e(t.a);
                        }));
                }
                function y(t) {
                    if (t.a) throw Error("Already resolved.");
                    (t.a = void 0), t.b && t.b(void 0);
                }
                function g(t) {
                    (this.c = !1),
                        (this.a = t),
                        (this.j = new Map()),
                        (this.f = function(t) {
                            return t();
                        }),
                        (this.b = !1),
                        (this.g = []),
                        (this.o = new p(t));
                }
                (a.prototype.connectedCallback = function(t) {
                    var e = t.__CE_definition;
                    e.connectedCallback && e.connectedCallback.call(t);
                }),
                    (a.prototype.disconnectedCallback = function(t) {
                        var e = t.__CE_definition;
                        e.disconnectedCallback &&
                            e.disconnectedCallback.call(t);
                    }),
                    (a.prototype.attributeChangedCallback = function(
                        t,
                        e,
                        n,
                        o,
                        i
                    ) {
                        var r = t.__CE_definition;
                        r.attributeChangedCallback &&
                            -1 < r.observedAttributes.indexOf(e) &&
                            r.attributeChangedCallback.call(t, e, n, o, i);
                    }),
                    (p.prototype.f = function(t) {
                        var e = this.a.readyState;
                        for (
                            ("interactive" !== e && "complete" !== e) ||
                                d(this),
                                e = 0;
                            e < t.length;
                            e++
                        )
                            for (
                                var n = t[e].addedNodes, o = 0;
                                o < n.length;
                                o++
                            )
                                u(this.c, n[o]);
                    }),
                    (g.prototype.l = function(t, n) {
                        var o = this;
                        if (!(n instanceof Function))
                            throw new TypeError(
                                "Custom element constructors must be functions."
                            );
                        if (!e(t))
                            throw new SyntaxError(
                                "The element name '" + t + "' is not valid."
                            );
                        if (this.a.a.get(t))
                            throw Error(
                                "A custom element with name '" +
                                    t +
                                    "' has already been defined."
                            );
                        if (this.c)
                            throw Error(
                                "A custom element is already being defined."
                            );
                        this.c = !0;
                        try {
                            var i = function(t) {
                                    var e = r[t];
                                    if (
                                        void 0 !== e &&
                                        !(e instanceof Function)
                                    )
                                        throw Error(
                                            "The '" +
                                                t +
                                                "' callback must be a function."
                                        );
                                    return e;
                                },
                                r = n.prototype;
                            if (!(r instanceof Object))
                                throw new TypeError(
                                    "The custom element constructor's prototype is not an object."
                                );
                            var a = i("connectedCallback"),
                                c = i("disconnectedCallback"),
                                l = i("adoptedCallback"),
                                s = i("attributeChangedCallback"),
                                f = n.observedAttributes || [];
                        } catch (t) {
                            return;
                        } finally {
                            this.c = !1;
                        }
                        (n = {
                            localName: t,
                            constructorFunction: n,
                            connectedCallback: a,
                            disconnectedCallback: c,
                            adoptedCallback: l,
                            attributeChangedCallback: s,
                            observedAttributes: f,
                            constructionStack: []
                        }),
                            (function(t, e, n) {
                                t.a.set(e, n),
                                    t.g.set(n.constructorFunction, n);
                            })(this.a, t, n),
                            this.g.push(n),
                            this.b ||
                                ((this.b = !0),
                                this.f(function() {
                                    return (function(t) {
                                        if (!1 !== t.b) {
                                            t.b = !1;
                                            for (
                                                var e = t.g,
                                                    n = [],
                                                    o = new Map(),
                                                    i = 0;
                                                i < e.length;
                                                i++
                                            )
                                                o.set(e[i].localName, []);
                                            for (
                                                u(t.a, document, {
                                                    i: function(e) {
                                                        if (
                                                            void 0 ===
                                                            e.__CE_state
                                                        ) {
                                                            var i = e.localName,
                                                                r = o.get(i);
                                                            r
                                                                ? r.push(e)
                                                                : t.a.a.get(
                                                                      i
                                                                  ) &&
                                                                  n.push(e);
                                                        }
                                                    }
                                                }),
                                                    i = 0;
                                                i < n.length;
                                                i++
                                            )
                                                h(t.a, n[i]);
                                            for (; 0 < e.length; ) {
                                                var r = e.shift();
                                                (i = r.localName),
                                                    (r = o.get(r.localName));
                                                for (
                                                    var a = 0;
                                                    a < r.length;
                                                    a++
                                                )
                                                    h(t.a, r[a]);
                                                (i = t.j.get(i)) && y(i);
                                            }
                                        }
                                    })(o);
                                }));
                    }),
                    (g.prototype.i = function(t) {
                        u(this.a, t);
                    }),
                    (g.prototype.get = function(t) {
                        if ((t = this.a.a.get(t))) return t.constructorFunction;
                    }),
                    (g.prototype.m = function(t) {
                        if (!e(t))
                            return Promise.reject(
                                new SyntaxError(
                                    "'" +
                                        t +
                                        "' is not a valid custom element name."
                                )
                            );
                        var n = this.j.get(t);
                        return n
                            ? n.c
                            : ((n = new m()),
                              this.j.set(t, n),
                              this.a.a.get(t) &&
                                  !this.g.some(function(e) {
                                      return e.localName === t;
                                  }) &&
                                  y(n),
                              n.c);
                    }),
                    (g.prototype.s = function(t) {
                        d(this.o);
                        var e = this.f;
                        this.f = function(n) {
                            return t(function() {
                                return e(n);
                            });
                        };
                    }),
                    (window.CustomElementRegistry = g),
                    (g.prototype.define = g.prototype.l),
                    (g.prototype.upgrade = g.prototype.i),
                    (g.prototype.get = g.prototype.get),
                    (g.prototype.whenDefined = g.prototype.m),
                    (g.prototype.polyfillWrapFlushCallback = g.prototype.s);
                var w = window.Document.prototype.createElement,
                    b = window.Document.prototype.createElementNS,
                    v = window.Document.prototype.importNode,
                    _ = window.Document.prototype.prepend,
                    E = window.Document.prototype.append,
                    C = window.DocumentFragment.prototype.prepend,
                    N = window.DocumentFragment.prototype.append,
                    S = window.Node.prototype.cloneNode,
                    k = window.Node.prototype.appendChild,
                    A = window.Node.prototype.insertBefore,
                    D = window.Node.prototype.removeChild,
                    T = window.Node.prototype.replaceChild,
                    j = Object.getOwnPropertyDescriptor(
                        window.Node.prototype,
                        "textContent"
                    ),
                    M = window.Element.prototype.attachShadow,
                    L = Object.getOwnPropertyDescriptor(
                        window.Element.prototype,
                        "innerHTML"
                    ),
                    O = window.Element.prototype.getAttribute,
                    x = window.Element.prototype.setAttribute,
                    H = window.Element.prototype.removeAttribute,
                    F = window.Element.prototype.getAttributeNS,
                    R = window.Element.prototype.setAttributeNS,
                    P = window.Element.prototype.removeAttributeNS,
                    I = window.Element.prototype.insertAdjacentElement,
                    z = window.Element.prototype.insertAdjacentHTML,
                    W = window.Element.prototype.prepend,
                    B = window.Element.prototype.append,
                    U = window.Element.prototype.before,
                    V = window.Element.prototype.after,
                    X = window.Element.prototype.replaceWith,
                    $ = window.Element.prototype.remove,
                    q = window.HTMLElement,
                    G = Object.getOwnPropertyDescriptor(
                        window.HTMLElement.prototype,
                        "innerHTML"
                    ),
                    J = window.HTMLElement.prototype.insertAdjacentElement,
                    K = window.HTMLElement.prototype.insertAdjacentHTML,
                    Q = new (function() {})();
                function Y(t, e, o) {
                    function i(e) {
                        return function(o) {
                            for (var i = [], r = 0; r < arguments.length; ++r)
                                i[r] = arguments[r];
                            r = [];
                            for (var a = [], c = 0; c < i.length; c++) {
                                var l = i[c];
                                if (
                                    (l instanceof Element && n(l) && a.push(l),
                                    l instanceof DocumentFragment)
                                )
                                    for (l = l.firstChild; l; l = l.nextSibling)
                                        r.push(l);
                                else r.push(l);
                            }
                            for (e.apply(this, i), i = 0; i < a.length; i++)
                                f(t, a[i]);
                            if (n(this))
                                for (i = 0; i < r.length; i++)
                                    (a = r[i]) instanceof Element && s(t, a);
                        };
                    }
                    void 0 !== o.h && (e.prepend = i(o.h)),
                        void 0 !== o.append && (e.append = i(o.append));
                }
                var Z,
                    tt = window.customElements;
                if (
                    !tt ||
                    tt.forcePolyfill ||
                    "function" != typeof tt.define ||
                    "function" != typeof tt.get
                ) {
                    var et = new a();
                    (Z = et),
                        (window.HTMLElement = (function() {
                            function t() {
                                var t = this.constructor,
                                    e = Z.g.get(t);
                                if (!e)
                                    throw Error(
                                        "The custom element being constructed was not registered with `customElements`."
                                    );
                                var n = e.constructionStack;
                                if (0 === n.length)
                                    return (
                                        (n = w.call(document, e.localName)),
                                        Object.setPrototypeOf(n, t.prototype),
                                        (n.__CE_state = 1),
                                        (n.__CE_definition = e),
                                        l(Z, n),
                                        n
                                    );
                                var o = n[(e = n.length - 1)];
                                if (o === Q)
                                    throw Error(
                                        "The HTMLElement constructor was either called reentrantly for this constructor or called multiple times."
                                    );
                                return (
                                    (n[e] = Q),
                                    Object.setPrototypeOf(o, t.prototype),
                                    l(Z, o),
                                    o
                                );
                            }
                            return (
                                (t.prototype = q.prototype),
                                Object.defineProperty(
                                    t.prototype,
                                    "constructor",
                                    {
                                        writable: !0,
                                        configurable: !0,
                                        enumerable: !1,
                                        value: t
                                    }
                                ),
                                t
                            );
                        })()),
                        (function() {
                            var t = et;
                            r(Document.prototype, "createElement", function(e) {
                                if (this.__CE_hasRegistry) {
                                    var n = t.a.get(e);
                                    if (n) return new n.constructorFunction();
                                }
                                return (e = w.call(this, e)), l(t, e), e;
                            }),
                                r(Document.prototype, "importNode", function(
                                    e,
                                    n
                                ) {
                                    return (
                                        (e = v.call(this, e, !!n)),
                                        this.__CE_hasRegistry
                                            ? u(t, e)
                                            : c(t, e),
                                        e
                                    );
                                }),
                                r(
                                    Document.prototype,
                                    "createElementNS",
                                    function(e, n) {
                                        if (
                                            this.__CE_hasRegistry &&
                                            (null === e ||
                                                "http://www.w3.org/1999/xhtml" ===
                                                    e)
                                        ) {
                                            var o = t.a.get(n);
                                            if (o)
                                                return new o.constructorFunction();
                                        }
                                        return (
                                            (e = b.call(this, e, n)), l(t, e), e
                                        );
                                    }
                                ),
                                Y(t, Document.prototype, {
                                    h: _,
                                    append: E
                                });
                        })(),
                        Y(et, DocumentFragment.prototype, {
                            h: C,
                            append: N
                        }),
                        (function() {
                            function t(t, o) {
                                Object.defineProperty(t, "textContent", {
                                    enumerable: o.enumerable,
                                    configurable: !0,
                                    get: o.get,
                                    set: function(t) {
                                        if (this.nodeType === Node.TEXT_NODE)
                                            o.set.call(this, t);
                                        else {
                                            var i = void 0;
                                            if (this.firstChild) {
                                                var r = this.childNodes,
                                                    a = r.length;
                                                if (0 < a && n(this)) {
                                                    i = Array(a);
                                                    for (var c = 0; c < a; c++)
                                                        i[c] = r[c];
                                                }
                                            }
                                            if ((o.set.call(this, t), i))
                                                for (t = 0; t < i.length; t++)
                                                    f(e, i[t]);
                                        }
                                    }
                                });
                            }
                            var e = et;
                            r(Node.prototype, "insertBefore", function(t, o) {
                                if (t instanceof DocumentFragment) {
                                    var i = Array.prototype.slice.apply(
                                        t.childNodes
                                    );
                                    if (((t = A.call(this, t, o)), n(this)))
                                        for (o = 0; o < i.length; o++)
                                            s(e, i[o]);
                                    return t;
                                }
                                return (
                                    (i = n(t)),
                                    (o = A.call(this, t, o)),
                                    i && f(e, t),
                                    n(this) && s(e, t),
                                    o
                                );
                            }),
                                r(Node.prototype, "appendChild", function(t) {
                                    if (t instanceof DocumentFragment) {
                                        var o = Array.prototype.slice.apply(
                                            t.childNodes
                                        );
                                        if (((t = k.call(this, t)), n(this)))
                                            for (var i = 0; i < o.length; i++)
                                                s(e, o[i]);
                                        return t;
                                    }
                                    return (
                                        (o = n(t)),
                                        (i = k.call(this, t)),
                                        o && f(e, t),
                                        n(this) && s(e, t),
                                        i
                                    );
                                }),
                                r(Node.prototype, "cloneNode", function(t) {
                                    return (
                                        (t = S.call(this, !!t)),
                                        this.ownerDocument.__CE_hasRegistry
                                            ? u(e, t)
                                            : c(e, t),
                                        t
                                    );
                                }),
                                r(Node.prototype, "removeChild", function(t) {
                                    var o = n(t),
                                        i = D.call(this, t);
                                    return o && f(e, t), i;
                                }),
                                r(Node.prototype, "replaceChild", function(
                                    t,
                                    o
                                ) {
                                    if (t instanceof DocumentFragment) {
                                        var i = Array.prototype.slice.apply(
                                            t.childNodes
                                        );
                                        if (((t = T.call(this, t, o)), n(this)))
                                            for (
                                                f(e, o), o = 0;
                                                o < i.length;
                                                o++
                                            )
                                                s(e, i[o]);
                                        return t;
                                    }
                                    i = n(t);
                                    var r = T.call(this, t, o),
                                        a = n(this);
                                    return (
                                        a && f(e, o),
                                        i && f(e, t),
                                        a && s(e, t),
                                        r
                                    );
                                }),
                                j && j.get
                                    ? t(Node.prototype, j)
                                    : (function(t, e) {
                                          (t.b = !0), t.c.push(e);
                                      })(e, function(e) {
                                          t(e, {
                                              enumerable: !0,
                                              configurable: !0,
                                              get: function() {
                                                  for (
                                                      var t = [], e = 0;
                                                      e <
                                                      this.childNodes.length;
                                                      e++
                                                  ) {
                                                      var n = this.childNodes[
                                                          e
                                                      ];
                                                      n.nodeType !==
                                                          Node.COMMENT_NODE &&
                                                          t.push(n.textContent);
                                                  }
                                                  return t.join("");
                                              },
                                              set: function(t) {
                                                  for (; this.firstChild; )
                                                      D.call(
                                                          this,
                                                          this.firstChild
                                                      );
                                                  null != t &&
                                                      "" !== t &&
                                                      k.call(
                                                          this,
                                                          document.createTextNode(
                                                              t
                                                          )
                                                      );
                                              }
                                          });
                                      });
                        })(),
                        (function() {
                            function t(t, e) {
                                Object.defineProperty(t, "innerHTML", {
                                    enumerable: e.enumerable,
                                    configurable: !0,
                                    get: e.get,
                                    set: function(t) {
                                        var o = this,
                                            r = void 0;
                                        if (
                                            (n(this) &&
                                                ((r = []),
                                                i(this, function(t) {
                                                    t !== o && r.push(t);
                                                })),
                                            e.set.call(this, t),
                                            r)
                                        )
                                            for (var l = 0; l < r.length; l++) {
                                                var s = r[l];
                                                1 === s.__CE_state &&
                                                    a.disconnectedCallback(s);
                                            }
                                        return (
                                            this.ownerDocument.__CE_hasRegistry
                                                ? u(a, this)
                                                : c(a, this),
                                            t
                                        );
                                    }
                                });
                            }
                            function e(t, e) {
                                r(t, "insertAdjacentElement", function(t, o) {
                                    var i = n(o);
                                    return (
                                        (t = e.call(this, t, o)),
                                        i && f(a, o),
                                        n(t) && s(a, o),
                                        t
                                    );
                                });
                            }
                            function o(t, e) {
                                function n(t, e) {
                                    for (var n = []; t !== e; t = t.nextSibling)
                                        n.push(t);
                                    for (e = 0; e < n.length; e++) u(a, n[e]);
                                }
                                r(t, "insertAdjacentHTML", function(t, o) {
                                    if (
                                        "beforebegin" === (t = t.toLowerCase())
                                    ) {
                                        var i = this.previousSibling;
                                        e.call(this, t, o),
                                            n(
                                                i || this.parentNode.firstChild,
                                                this
                                            );
                                    } else if ("afterbegin" === t)
                                        (i = this.firstChild),
                                            e.call(this, t, o),
                                            n(this.firstChild, i);
                                    else if ("beforeend" === t)
                                        (i = this.lastChild),
                                            e.call(this, t, o),
                                            n(i || this.firstChild, null);
                                    else {
                                        if ("afterend" !== t)
                                            throw new SyntaxError(
                                                "The value provided (" +
                                                    String(t) +
                                                    ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'."
                                            );
                                        (i = this.nextSibling),
                                            e.call(this, t, o),
                                            n(this.nextSibling, i);
                                    }
                                });
                            }
                            var a = et;
                            M &&
                                r(Element.prototype, "attachShadow", function(
                                    t
                                ) {
                                    t = M.call(this, t);
                                    var e = a;
                                    if (e.b && !t.__CE_patched) {
                                        t.__CE_patched = !0;
                                        for (var n = 0; n < e.c.length; n++)
                                            e.c[n](t);
                                    }
                                    return (this.__CE_shadowRoot = t);
                                }),
                                L && L.get
                                    ? t(Element.prototype, L)
                                    : G && G.get
                                    ? t(HTMLElement.prototype, G)
                                    : (function(t, e) {
                                          (t.b = !0), t.f.push(e);
                                      })(a, function(e) {
                                          t(e, {
                                              enumerable: !0,
                                              configurable: !0,
                                              get: function() {
                                                  return S.call(this, !0)
                                                      .innerHTML;
                                              },
                                              set: function(t) {
                                                  var e =
                                                          "template" ===
                                                          this.localName,
                                                      n = e
                                                          ? this.content
                                                          : this,
                                                      o = b.call(
                                                          document,
                                                          this.namespaceURI,
                                                          this.localName
                                                      );
                                                  for (
                                                      o.innerHTML = t;
                                                      0 < n.childNodes.length;

                                                  )
                                                      D.call(
                                                          n,
                                                          n.childNodes[0]
                                                      );
                                                  for (
                                                      t = e ? o.content : o;
                                                      0 < t.childNodes.length;

                                                  )
                                                      k.call(
                                                          n,
                                                          t.childNodes[0]
                                                      );
                                              }
                                          });
                                      }),
                                r(Element.prototype, "setAttribute", function(
                                    t,
                                    e
                                ) {
                                    if (1 !== this.__CE_state)
                                        return x.call(this, t, e);
                                    var n = O.call(this, t);
                                    x.call(this, t, e),
                                        (e = O.call(this, t)),
                                        a.attributeChangedCallback(
                                            this,
                                            t,
                                            n,
                                            e,
                                            null
                                        );
                                }),
                                r(Element.prototype, "setAttributeNS", function(
                                    t,
                                    e,
                                    n
                                ) {
                                    if (1 !== this.__CE_state)
                                        return R.call(this, t, e, n);
                                    var o = F.call(this, t, e);
                                    R.call(this, t, e, n),
                                        (n = F.call(this, t, e)),
                                        a.attributeChangedCallback(
                                            this,
                                            e,
                                            o,
                                            n,
                                            t
                                        );
                                }),
                                r(
                                    Element.prototype,
                                    "removeAttribute",
                                    function(t) {
                                        if (1 !== this.__CE_state)
                                            return H.call(this, t);
                                        var e = O.call(this, t);
                                        H.call(this, t),
                                            null !== e &&
                                                a.attributeChangedCallback(
                                                    this,
                                                    t,
                                                    e,
                                                    null,
                                                    null
                                                );
                                    }
                                ),
                                r(
                                    Element.prototype,
                                    "removeAttributeNS",
                                    function(t, e) {
                                        if (1 !== this.__CE_state)
                                            return P.call(this, t, e);
                                        var n = F.call(this, t, e);
                                        P.call(this, t, e);
                                        var o = F.call(this, t, e);
                                        n !== o &&
                                            a.attributeChangedCallback(
                                                this,
                                                e,
                                                n,
                                                o,
                                                t
                                            );
                                    }
                                ),
                                J
                                    ? e(HTMLElement.prototype, J)
                                    : I && e(Element.prototype, I),
                                K
                                    ? o(HTMLElement.prototype, K)
                                    : z && o(Element.prototype, z),
                                Y(a, Element.prototype, {
                                    h: W,
                                    append: B
                                }),
                                (function(t) {
                                    function e(e) {
                                        return function(o) {
                                            for (
                                                var i = [], r = 0;
                                                r < arguments.length;
                                                ++r
                                            )
                                                i[r] = arguments[r];
                                            r = [];
                                            for (
                                                var a = [], c = 0;
                                                c < i.length;
                                                c++
                                            ) {
                                                var l = i[c];
                                                if (
                                                    (l instanceof Element &&
                                                        n(l) &&
                                                        a.push(l),
                                                    l instanceof
                                                        DocumentFragment)
                                                )
                                                    for (
                                                        l = l.firstChild;
                                                        l;
                                                        l = l.nextSibling
                                                    )
                                                        r.push(l);
                                                else r.push(l);
                                            }
                                            for (
                                                e.apply(this, i), i = 0;
                                                i < a.length;
                                                i++
                                            )
                                                f(t, a[i]);
                                            if (n(this))
                                                for (i = 0; i < r.length; i++)
                                                    (a = r[i]) instanceof
                                                        Element && s(t, a);
                                        };
                                    }
                                    var o = Element.prototype;
                                    void 0 !== U && (o.before = e(U)),
                                        void 0 !== U && (o.after = e(V)),
                                        void 0 !== X &&
                                            r(o, "replaceWith", function(e) {
                                                for (
                                                    var o = [], i = 0;
                                                    i < arguments.length;
                                                    ++i
                                                )
                                                    o[i] = arguments[i];
                                                i = [];
                                                for (
                                                    var r = [], a = 0;
                                                    a < o.length;
                                                    a++
                                                ) {
                                                    var c = o[a];
                                                    if (
                                                        (c instanceof Element &&
                                                            n(c) &&
                                                            r.push(c),
                                                        c instanceof
                                                            DocumentFragment)
                                                    )
                                                        for (
                                                            c = c.firstChild;
                                                            c;
                                                            c = c.nextSibling
                                                        )
                                                            i.push(c);
                                                    else i.push(c);
                                                }
                                                for (
                                                    a = n(this),
                                                        X.apply(this, o),
                                                        o = 0;
                                                    o < r.length;
                                                    o++
                                                )
                                                    f(t, r[o]);
                                                if (a)
                                                    for (
                                                        f(t, this), o = 0;
                                                        o < i.length;
                                                        o++
                                                    )
                                                        (r = i[o]) instanceof
                                                            Element && s(t, r);
                                            }),
                                        void 0 !== $ &&
                                            r(o, "remove", function() {
                                                var e = n(this);
                                                $.call(this), e && f(t, this);
                                            });
                                })(a);
                        })(),
                        (document.__CE_hasRegistry = !0);
                    var nt = new g(et);
                    Object.defineProperty(window, "customElements", {
                        configurable: !0,
                        enumerable: !0,
                        value: nt
                    });
                }
            }.call(self),
            (window.CustomElementRegistry = Reflect.get(
                Reflect.getPrototypeOf(window.customElements),
                "constructor"
            ))),
            "function" != typeof Array.prototype.flat &&
                (Array.prototype.flat = function t(e = 1) {
                    if (e <= 1) return this.reduce((t, e) => t.concat(e), []);
                    if (e > 10)
                        return (function t(e) {
                            return e.reduce(
                                (e, n) => e.concat(Array.isArray(n) ? t(n) : n),
                                []
                            );
                        })(this);
                    {
                        let n = [...this];
                        for (; e >= 1; ) (n = t.call(n)), e--;
                        return n;
                    }
                }),
            (t = function(t) {
                for (
                    var e = -1, n = null == t ? 0 : t.length, o = {};
                    ++e < n;

                ) {
                    var i = t[e];
                    o[i[0]] = i[1];
                }
                return o;
            }),
            "function" != typeof Object.fromEntries && (Object.fromEntries = t);
    })();
    const t = Function("return this")(),
        e = t,
        n = t,
        r = t,
        {
            WeakSet: o,
            WeakMap: i,
            Date: s,
            RegExp: c,
            Event: u,
            CustomEvent: a,
            requestAnimationFrame: f,
            URL: l,
            Blob: h,
            Element: d,
            Node: p,
            String: v,
            Array: w,
            document: m,
            Object: y,
            Reflect: g,
            Proxy: b,
            Symbol: E,
            Boolean: P,
            Promise: O,
            Set: S,
            Math: x,
            Error: C,
            TypeError: L,
            JSON: T,
            Map: j,
            clearTimeout: k,
            setTimeout: N,
            parseInt: M,
            Number: R
        } = t;
    function A(t, e) {
        t.textContent = e;
    }
    function _(t, e) {
        t.innerHTML = e;
    }
    function D(t, e) {
        t.appendChild(e);
    }
    function $() {
        return m.createDocumentFragment();
    }
    function W(t, e) {
        return m.createElementNS(t, e);
    }
    function K(t) {
        return m.createTextNode(v(t));
    }
    const H = "http://www.w3.org/2000/svg";
    function F(t, e) {
        let n = e.parentNode;
        n && n.replaceChild(t, e);
    }
    function z(t, e, n) {
        t.addEventListener(e, n);
    }
    function B(t) {
        return [...t.childNodes];
    }
    function U(t) {
        return [...m.querySelectorAll(t)];
    }
    function q(t) {
        return (
            X(t) ||
            J(t) ||
            G(t) ||
            Z(t) ||
            (function(t) {
                return "bigint" == typeof t;
            })(t)
        );
    }
    function I(t) {
        return "symbol" == typeof t;
    }
    const V = t => Q(t) && "Object" === et(t);
    function Z(t) {
        return (!t && void 0 === t) || null === t;
    }
    function J(t) {
        return "number" == typeof t;
    }
    function G(t) {
        return "boolean" == typeof t;
    }
    function Q(t) {
        return "object" == typeof t && null !== t;
    }
    function X(t) {
        return "string" == typeof t;
    }
    function Y(t) {
        return "function" == typeof t;
    }
    function tt(t) {
        return w.isArray(t) && t instanceof w;
    }
    function et(t) {
        return {}.toString
            .call(t)
            .replace("[object ", "")
            .replace("]", "")
            .trim();
    }
    function nt(t) {
        return t instanceof S;
    }
    function rt(t) {
        return t instanceof j;
    }
    function ot(t) {
        return t instanceof i;
    }
    const {
        apply: it,
        construct: st,
        defineProperty: ct,
        deleteProperty: ut,
        getOwnPropertyDescriptor: at,
        getPrototypeOf: ft,
        has: lt,
        ownKeys: ht,
        preventExtensions: dt
    } = g;
    function pt(t, e) {
        return rt(t) || ot(t) ? t.get(e) : g.get(t, e);
    }
    function vt(t, e, n) {
        return rt(t) || ot(t) ? (t.set(e, n), !0) : g.set(t, e, n);
    }
    function wt(t) {
        return (tt(t) ? t : [t]).flat(1 / 0).filter(t => !Z(t));
    }
    class mt {
        constructor() {
            this.Listeners = new S();
        }
        addListener(t) {
            this.Listeners.add(t);
        }
        dispatch() {
            this.Listeners.forEach(t => {
                O.resolve().then(() => {
                    t();
                });
            });
        }
        removeListener(t) {
            this.Listeners.delete(t);
        }
    }
    var yt = function(t) {
            var e = typeof t;
            return null != t && ("object" == e || "function" == e);
        },
        gt =
            void 0 !== t
                ? t
                : void 0 !== n
                ? n
                : void 0 !== r
                ? r
                : void 0 !== e
                ? e
                : {},
        bt = "object" == typeof gt && gt && gt.Object === y && gt,
        Et = "object" == typeof e && e && e.Object === y && e,
        Pt = bt || Et || Function("return this")(),
        Ot = function() {
            return Pt.Date.now();
        },
        St = Pt.Symbol,
        xt = y.prototype,
        Ct = xt.hasOwnProperty,
        Lt = xt.toString,
        Tt = St ? St.toStringTag : void 0;
    var jt = function(t) {
            var e = Ct.call(t, Tt),
                n = t[Tt];
            try {
                t[Tt] = void 0;
                var r = !0;
            } catch (t) {}
            var o = Lt.call(t);
            return r && (e ? (t[Tt] = n) : delete t[Tt]), o;
        },
        kt = y.prototype.toString;
    var Nt = function(t) {
            return kt.call(t);
        },
        Mt = St ? St.toStringTag : void 0;
    var Rt = function(t) {
        return null == t
            ? void 0 === t
                ? "[object Undefined]"
                : "[object Null]"
            : Mt && Mt in y(t)
            ? jt(t)
            : Nt(t);
    };
    var At = function(t) {
        return null != t && "object" == typeof t;
    };
    var _t = function(t) {
            return (
                "symbol" == typeof t || (At(t) && "[object Symbol]" == Rt(t))
            );
        },
        Dt = /^\s+|\s+$/g,
        $t = /^[-+]0x[0-9a-f]+$/i,
        Wt = /^0b[01]+$/i,
        Kt = /^0o[0-7]+$/i,
        Ht = M;
    var Ft = function(t) {
            if ("number" == typeof t) return t;
            if (_t(t)) return NaN;
            if (yt(t)) {
                var e = "function" == typeof t.valueOf ? t.valueOf() : t;
                t = yt(e) ? e + "" : e;
            }
            if ("string" != typeof t) return 0 === t ? t : +t;
            t = t.replace(Dt, "");
            var n = Wt.test(t);
            return n || Kt.test(t)
                ? Ht(t.slice(2), n ? 2 : 8)
                : $t.test(t)
                ? NaN
                : +t;
        },
        zt = x.max,
        Bt = x.min;
    var Ut = function(t, e, n) {
        var r,
            o,
            i,
            s,
            c,
            u,
            a = 0,
            f = !1,
            l = !1,
            h = !0;
        if ("function" != typeof t) throw new L("Expected a function");
        function d(e) {
            var n = r,
                i = o;
            return (r = o = void 0), (a = e), (s = t.apply(i, n));
        }
        function p(t) {
            return (a = t), (c = N(w, e)), f ? d(t) : s;
        }
        function v(t) {
            var n = t - u;
            return void 0 === u || n >= e || n < 0 || (l && t - a >= i);
        }
        function w() {
            var t = Ot();
            if (v(t)) return m(t);
            c = N(
                w,
                (function(t) {
                    var n = e - (t - u);
                    return l ? Bt(n, i - (t - a)) : n;
                })(t)
            );
        }
        function m(t) {
            return (c = void 0), h && r ? d(t) : ((r = o = void 0), s);
        }
        function y() {
            var t = Ot(),
                n = v(t);
            if (((r = arguments), (o = this), (u = t), n)) {
                if (void 0 === c) return p(u);
                if (l) return k(c), (c = N(w, e)), d(u);
            }
            return void 0 === c && (c = N(w, e)), s;
        }
        return (
            (e = Ft(e) || 0),
            yt(n) &&
                ((f = !!n.leading),
                (i = (l = "maxWait" in n) ? zt(Ft(n.maxWait) || 0, e) : i),
                (h = "trailing" in n ? !!n.trailing : h)),
            (y.cancel = function() {
                void 0 !== c && k(c), (a = 0), (r = u = o = c = void 0);
            }),
            (y.flush = function() {
                return void 0 === c ? s : m(Ot());
            }),
            y
        );
    };
    let qt = [];
    let It = !1,
        Vt = new S(),
        Zt = new S(),
        Jt = new S();
    function Gt(t) {
        if (!Y(t)) throw L();
        if (!It) throw C();
        Vt.add(t);
    }
    function Qt(t) {
        if (!Y(t)) throw L();
        if (!It) throw C();
        Zt.add(t);
    }
    function Xt() {
        (It = !1), Yt();
    }
    function Yt() {
        (Vt = new S()), (Zt = new S()), (Jt = new S()), (qt = []);
    }
    var te, ee, ne;
    const re = E("addonelistner"),
        oe = E("removeonelistner"),
        ie = E("cancelsubscribe"),
        se = E("debouncedispatch");
    function ce(t) {
        return t instanceof pe && "ReactiveState" === t[E.toStringTag];
    }
    const ue = E("eventtatget"),
        ae = E("memlisteners"),
        fe = E("dispatch"),
        le = E("subscribe"),
        he = E("removeallisteners"),
        de = E("addallisteners");
    class pe {
        constructor(t) {
            var e;
            (this[E.toStringTag] = "ReactiveState"),
                (this[te] = (() => {
                    const t = Ut(() => {
                        this[ue].dispatch();
                    });
                    return () => {
                        t();
                    };
                })()),
                (this[ee] = new mt()),
                (this[ne] = new S()),
                (this.valueOf = () => this.value),
                (this.value = t),
                ct(this, "value", {
                    value: t,
                    configurable: !0,
                    writable: !0
                }),
                (e = this),
                It && Jt.add(e);
        }
        [((te = se), he)]() {
            this[ae].forEach(t => {
                this[oe](t);
            });
        }
        [oe](t) {
            this[ue].removeListener(t);
        }
        [re](t) {
            this[ue].addListener(t);
        }
        [de]() {
            this[ae].forEach(t => {
                this[re](t);
            });
        }
        toString() {
            const t = this.valueOf();
            return q(t)
                ? v(t)
                : nt(t)
                ? T.stringify([...t])
                : Q(t)
                ? T.stringify(t)
                : "";
        }
        [((ee = ue), (ne = ae), fe)]() {
            this[se]();
        }
        [le](t) {
            this[ae].add(t), this[re](t);
        }
        [ie](t) {
            t && (this[ae].delete(t), this[oe](t));
        }
        [E.toPrimitive]() {
            const t = this.valueOf();
            return q(t) ? t : Q(t) ? T.stringify(t) : void 0;
        }
    }
    const ve = new i(),
        we = new i(),
        me = ["input", "textarea", "option", "select"];
    var ye = (t, e, n) =>
        ("value" === e && me.includes(t) && "button" !== n) ||
        ("selected" === e && "option" === t) ||
        ("checked" === e && "input" === t) ||
        ("muted" === e && "video" === t);
    const ge = /\B([A-Z])/g,
        be = t => t.replace(ge, "-$1").toLowerCase(),
        Ee = n.String,
        Pe = n.Reflect,
        { get: Oe, set: Se, ownKeys: xe } = Pe;
    function Ce(t) {
        return "object" == typeof t && null !== t;
    }
    function Le(t) {
        return "string" == typeof t;
    }
    function Te(t) {
        return t instanceof S;
    }
    const je = t =>
        "input" === ke(t) &&
        ("checkbox" === Oe(t, "type") || "radio" === Oe(t, "type"));
    function ke(t) {
        return t.tagName.toLowerCase();
    }
    function Ne(t, e, n) {
        return t.setAttribute(e, n);
    }
    function Me(t, e) {
        return t.removeAttribute(e);
    }
    function Re(t) {
        !(function(t) {
            if (!(t instanceof d)) throw L();
        })(t);
        var e = y.create(null);
        const n = new b(e, {
            ownKeys() {
                const e = (function(t) {
                        const e = ke(t);
                        return (
                            "textarea" === e ||
                            "select" === e ||
                            ("input" === e && "text" === Oe(t, "type"))
                        );
                    })(t),
                    n = (function(t) {
                        return t.getAttributeNames();
                    })(t);
                return w.from(
                    new S(
                        [...n, je(t) ? "checked" : void 0, e ? "value" : void 0]
                            .flat(1 / 0)
                            .filter(t => !!t)
                    )
                );
            },
            get(e, n) {
                if (ye(ke(t), Ee(n), Oe(t, "type"))) return Oe(t, Ee(n));
                {
                    const e = (function(t, e) {
                        return t.getAttribute(e);
                    })(t, Ee(n));
                    if ("" === e) return !0;
                    if (null === e) return;
                    if (!Le(e)) return;
                    try {
                        return T.parse(Ee(e));
                    } catch (t) {
                        return e;
                    }
                }
            },
            set(e, n, r) {
                if ("function" == typeof r) throw L();
                if (ye(ke(t), Ee(n), Oe(t, "type"))) return Se(t, Ee(n), r);
                if ("style" === n) {
                    const e = Le(r)
                        ? r
                        : Ce(r)
                        ? ((i = r),
                          (i = T.parse(T.stringify(i))),
                          y
                              .entries(i)
                              .map(([t, e]) => [be(t).trim(), e])
                              .map(([t, e]) => t + ":" + e)
                              .join(";"))
                        : Ee(r);
                    return Se(Oe(t, "style"), "cssText", e.trim()), !0;
                }
                if ("class" === n && Ce(r)) {
                    const e =
                        ((o = r),
                        w.isArray(o)
                            ? r.join(" ")
                            : Te(r)
                            ? [...r].join(" ")
                            : Ee(r));
                    return Ne(t, Ee(n), e), !0;
                }
                return !1 === r || null == r
                    ? (Me(t, Ee(n)), !0)
                    : Te(r)
                    ? (Ne(t, Ee(n), T.stringify([...r])), !0)
                    : (!0 === r && (r = ""),
                      Ne(t, Ee(n), Ce(r) ? T.stringify(r) : Ee(r)),
                      !0);
                var o, i;
            },
            deleteProperty: (e, n) => (Me(t, Ee(n)), !0),
            has: (t, e) => xe(n).includes(e),
            defineProperty: () => !1,
            getOwnPropertyDescriptor(t, e) {
                const r = Oe(n, e);
                return void 0 !== r
                    ? {
                          value: r,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0
                      }
                    : void 0;
            },
            setPrototypeOf: () => !1
        });
        return n;
    }
    function Ae(t) {
        const e = {};
        return (
            t.forEach(([t, n]) => {
                e[t] || (e[t] = new S()),
                    n.forEach(n => {
                        e[t].add(n);
                    });
            }),
            y.entries(e).map(([t, e]) => [t, [...e]])
        );
    }
    const _e = new o(),
        De = /[A-Za-z\u4e00-\u9fa5]/;
    function $e(t) {
        return _e.has(t);
    }
    function We(t, e = {}, n = []) {
        (e = y.assign({}, e)), (n = n.flat(1 / 0));
        const r = y.entries(e),
            o = r.filter(([t]) => !(t.startsWith("@") || t.startsWith("on"))),
            i = o.filter(([t]) => De.test(t[0])),
            s = y.create(null),
            c = s;
        return (
            [
                "onevent",
                "element",
                "type",
                "props",
                "children",
                "directives",
                "bindattr"
            ].forEach(t => {
                ct(s, t, {
                    writable: !0
                });
            }),
            (c.element = []),
            y.assign(s, {
                type: t,
                bindattr: y.fromEntries(i.filter(t => ce(t[1]))),
                props: y.fromEntries(
                    i
                        .filter(t => !ce(t[1]))
                        .map(([t, e]) => [t, X(e) ? e.trim() : e])
                ),
                children: n,
                onevent: y.fromEntries(
                    Ae([
                        ...r
                            .filter(([t]) => "@" == t[0])
                            .map(([t, e]) => [
                                t
                                    .slice(1)
                                    .toLowerCase()
                                    .trim(),
                                [e].flat(1 / 0)
                            ]),
                        ...r
                            .filter(([t]) => t.startsWith("on"))
                            .map(([t, e]) => [
                                t
                                    .slice(2)
                                    .toLowerCase()
                                    .trim(),
                                [e].flat(1 / 0)
                            ])
                    ])
                ),
                directives: y.fromEntries(
                    o
                        .filter(([t]) => "*" === t[0] || "$" === t[0])
                        .map(([t, e]) => [
                            t
                                .slice(1)
                                .toLowerCase()
                                .trim(),
                            e
                        ])
                )
            }),
            ct(s, E.toStringTag, {
                value: "VirtualElement"
            }),
            dt(s),
            _e.add(s),
            y.freeze(c),
            s
        );
    }
    function Ke(t) {
        if (X(t)) return !0;
        if (J(t)) return !0;
        return tt(t) ? t.every(t => Ke(t)) : $e(t) ? Ke(t.children) : !!ce(t);
    }
    function He(t) {
        return !!(Y(t) && t.prototype && t.prototype instanceof HTMLElement);
    }
    function Fe(t, e, n = !0) {
        return (
            n && A(e, ""),
            wt(t)
                .flat(1 / 0)
                .forEach(t => D(e, t)),
            e
        );
    }
    const ze = w(26)
            .fill(void 0)
            .map((t, e) => 97 + e)
            .map(t => v.fromCharCode(t)),
        Be = w(16)
            .fill(void 0)
            .map((t, e) => e)
            .map(t => t.toString(16)),
        Ue = [...new S([...Be, ...ze])];
    function qe(t = 1) {
        return (
            w(t)
                .fill(void 0)
                .map(() => pt(ze, x.floor(x.random() * ze.length)))
                .join("") +
            "-" +
            w(t)
                .fill(void 0)
                .map(() => pt(Ue, x.floor(x.random() * Ue.length)))
                .join("")
        );
    }
    if (!Q(n.customElements)) throw new L();
    n.CustomElementRegistry = pt(ft(n.customElements), "constructor");
    const Ie = E.for("elementset"),
        Ve = E.for("elementmap"),
        { CustomElementRegistry: Ze } = n,
        Je = n.customElements;
    lt(Je, Ie) || g.set(Je, Ie, new S()), lt(Je, Ve) || g.set(Je, Ve, {});
    function Ge(t, e, n = 1) {
        if (!He(t)) throw L();
        if (pt(Je, Ie).has(t))
            return (function(t, e) {
                const n = y.entries(t).find(t => t[1] === e);
                return n ? n[0] : void 0;
            })(pt(Je, Ve), t);
        {
            const r = qe(n);
            return Je.get(r)
                ? Ge(t, e, n + 1)
                : (e
                      ? Je.define(r, t, {
                            extends: e
                        })
                      : Je.define(r, t),
                  r);
        }
    }
    function Qe(t, e, n) {
        let r = t;
        if ((Y(r) && (r = Kn(r)), He((t = r))))
            return (
                ((t, e) => {
                    Ge(t, e);
                })(t),
                st(t, [e, n])
            );
        throw L();
    }
    (Je.define = function(t, e, n) {
        if (!He(e)) throw L();
        pt(Je, Ie).has(e) ||
            (lt(Je[Ve], t)
                ? Ge(e, n ? n.extends : void 0)
                : (Ze.prototype.define.call(Je, t, e, n),
                  Je[Ie].add(e),
                  (Je[Ve][t] = e)));
    }),
        vt(Je, E.iterator, () => {
            const t = y.entries(Je[Ve]);
            return t[E.iterator].call(t);
        });
    const Xe = E("component");
    function Ye(t) {
        const e = t.isConnected;
        return G(e)
            ? e
            : m.documentElement ===
                  (function(t) {
                      for (; t && t.parentNode && t.parentNode !== m; )
                          t = t.parentNode;
                      return t;
                  })(t);
    }
    const tn = {},
        en = E("eventlisteners");
    function nn(t, e, n) {
        !(function(t, e, n) {
            const r = t;
            n.forEach(n => {
                if (!Y(n)) throw L();
                lt(r, en) || vt(r, en, []), pt(t, en).push([e, n]), z(t, e, n);
            });
        })(t, e, wt(n));
    }
    const rn = E("bindstate");
    function on(t) {
        throw L();
    }
    function sn(t, e) {
        if (tt(t)) return t.map(t => sn(t)).flat(1 / 0);
        if (J(t) || X(t)) {
            return K(t);
        }
        if (ce(t)) {
            const e = t,
                n = K(v(e));
            Gn(e, () => {
                const t = e;
                Ye(r) &&
                    (function(t, e) {
                        t.nodeValue = v(e);
                    })(n, v(t));
            });
            const r = n;
            return vt(r, rn, new S()), pt(r, rn).add(e), n;
        }
        if ($e(t)) {
            let { type: n } = t;
            Y(n) && (n = Kn(n));
            let r = void 0;
            if ("string" == typeof n) {
                if ("script" === n) return $();
                if ("svg" === n) r = W(H, "svg");
                else if ("math" === n)
                    r = W("http://www.w3.org/1998/Math/MathML", "math");
                else {
                    if ("" === n || "html" === n) {
                        const e = $();
                        return Fe(sn(t.children), e), e;
                    }
                    r = e
                        ? W(e, n)
                        : (function(t) {
                              return m.createElement(t);
                          })(n);
                }
            } else if ("function" == typeof n) {
                Q(n.defaultProps) &&
                    y.assign(
                        t.props,
                        T.parse(
                            T.stringify({
                                ...n.defaultProps,
                                ...t.props
                            })
                        )
                    );
                const e = T.parse(
                    T.stringify({
                        ...t.props,
                        ...y.fromEntries(
                            y.entries(t.bindattr).map(([t, e]) => [t, e.value])
                        )
                    })
                );
                r = Qe(n, e, t.children);
            } else on();
            return (
                n &&
                    (Y(n) || X(n)) &&
                    ((function(t) {
                        return Y(t) && pt(t, Xe) === Xe;
                    })(n) ||
                        (r &&
                            Fe(
                                t.children.map(t =>
                                    "svg" === n && $e(t)
                                        ? sn(t, H)
                                        : "math" === n && $e(t)
                                        ? sn(
                                              t,
                                              "http://www.w3.org/1998/Math/MathML"
                                          )
                                        : e && $e(t)
                                        ? sn(t, e)
                                        : sn(t)
                                ),
                                r
                            ))),
                r &&
                    (function(t, e) {
                        e.element.push(t),
                            ((t, e) => {
                                y.entries(e.directives).forEach(([n, r]) => {
                                    const o = tn[n];
                                    if (!Y(o)) throw new C();
                                    o(t, e, r);
                                });
                                const n = Re(t);
                                y.assign(n, e.props),
                                    y.entries(e.bindattr).forEach(([e, r]) => {
                                        (n[e] = r.valueOf()),
                                            Gn(r, () => {
                                                const o = r;
                                                Ye(t) && (n[e] = o.valueOf());
                                            });
                                    }),
                                    y.entries(e.onevent).forEach(([e, n]) => {
                                        nn(t, e, n);
                                    });
                            })(t, e),
                            [...y.values(e.bindattr), ...y.values(e.directives)]
                                .flat(1 / 0)
                                .filter(t => ce(t))
                                .forEach(e => {
                                    lt(t, rn) || vt(t, rn, new S()),
                                        pt(t, rn).add(e);
                                });
                    })(r, t),
                r
            );
        }
        on();
    }
    function cn(t) {
        return t instanceof p;
    }
    function un(t, e) {
        if (tt(t) && !(t = t.flat(1 / 0)).length) throw new L();
        const n = e;
        if (!(n instanceof HTMLElement)) throw L();
        if (n === m.body || n === m.documentElement || n === m.head) throw C();
        const r = wt(t);
        if (Ke(t)) Fe(sn(r), e);
        else {
            if (!(cn(t) || ((o = t), tt(o) && o.length && o.every(t => cn(t)))))
                throw L();
            Fe(r, e);
        }
        var o;
        return e;
    }
    function an(t) {
        return new b(t, {
            set: () => !0,
            defineProperty: () => !1,
            deleteProperty: () => !1,
            setPrototypeOf: () => !1
        });
    }
    const fn = new j();
    function ln(t) {
        return t.map(t => t.cssText).join("\n");
    }
    const hn = new j();
    function dn(t, e, n) {
        const r = (t = t.toLowerCase());
        pt(fn, r) || vt(fn, t, new S()),
            e
                ? pt(fn, r).add(
                      (function(t) {
                          const e = hn.get(t);
                          if (e) return e;
                          {
                              const e = l.createObjectURL(
                                  new h([t], {
                                      type: "text/css"
                                  })
                              );
                              return hn.set(t, e), e;
                          }
                      })(e)
                  )
                : n && pt(fn, r).add(n);
    }
    function pn(t, e) {
        return t
            .map(t => {
                if (
                    (function(t) {
                        return "CSSStyleRule" === et(t);
                    })(t)
                ) {
                    return (function(t, e) {
                        const n = t.selectorText,
                            r = t.cssText.slice(n.length),
                            o = n
                                .split(",")
                                .map(t => {
                                    let n = e + " " + t;
                                    return (
                                        t.startsWith("*") &&
                                            (n = n + "," + t.replace("*", e)),
                                        n
                                    );
                                })
                                .join(",");
                        return {
                            selectorText: o,
                            cssText: o + r,
                            [E.toStringTag]: "CSSStyleRule"
                        };
                    })(t, e);
                }
                return (function(t) {
                    return "CSSMediaRule" === et(t);
                })(t)
                    ? (function(t, e) {
                          const n = pn([...t.cssRules], e),
                              r = t.conditionText;
                          return {
                              cssText:
                                  t.cssText.slice(0, 7) + r + "{" + ln(n) + "}",
                              conditionText: r,
                              cssRules: n,
                              [E.toStringTag]: "CSSMediaRule"
                          };
                      })(t, e)
                    : (function(t) {
                          return "CSSImportRule" === et(t);
                      })(t)
                    ? void dn(e, void 0, t.href)
                    : t;
            })
            .filter(P);
    }
    function vn(t) {
        const e = sn(Hn("style", [t]));
        return (
            D(m.implementation.createHTMLDocument("").documentElement, e),
            w.from(pt(pt(e, "sheet"), "cssRules"))
        );
    }
    const wn = new j();
    function mn(t, e) {
        dn(
            e,
            (function(t, e) {
                const n = wn.get(t);
                if (n) return n;
                {
                    const n = ln(pn(vn(t), e).filter(P));
                    return wn.set(t, n), n;
                }
            })(t, e)
        );
    }
    function yn(t, e) {
        return O.all(
            [...pt(fn, t)].map(t => {
                return U(`link[rel="stylesheet"][href="${t}"]`).length
                    ? O.resolve()
                    : ((n = sn(
                          Hn("link", {
                              href: t,
                              rel: "stylesheet"
                          })
                      )),
                      (r = e),
                      new O(t => {
                          const e = () => {
                              (n.onload = n.onerror = null), t();
                          };
                          (n.onload = e), (n.onerror = e), D(r, n);
                      }));
                var n, r;
            })
        );
    }
    function gn(t) {
        return O.resolve().then(() => t());
    }
    function bn(t) {
        if (tt(t))
            t.forEach(t => {
                bn(t);
            });
        else if (cn(t)) {
            if (
                ((function(t) {
                    lt(t, en) &&
                        pt(t, en).forEach(([e, n]) => {
                            z(t, e, n);
                        });
                })(t),
                lt(t, rn) &&
                    pt(t, rn).forEach(t => {
                        Qn(t), t[fe]();
                    }),
                lt(t, Nn) &&
                    pt(t, Nn).forEach(t => {
                        Qn(t);
                    }),
                lt(t, kn))
            ) {
                pt(t, kn).forEach(([t, e]) => {
                    e && t[re](e);
                });
            }
            bn(B(t));
        }
    }
    function En(t) {
        if (tt(t))
            t.forEach(t => {
                En(t);
            });
        else if (cn(t)) {
            if (
                ((function(t) {
                    lt(t, en) &&
                        pt(t, en).forEach(([e, n]) => {
                            !(function(t, e, n) {
                                t.removeEventListener(e, n);
                            })(t, e, n);
                        });
                })(t),
                lt(t, Nn) &&
                    pt(t, Nn).forEach(t => {
                        !(function(t) {
                            t[he]();
                        })(t);
                    }),
                lt(t, kn))
            ) {
                pt(t, kn).forEach(([t, e]) => {
                    e && t[oe](e);
                });
            }
            En(B(t));
        }
    }
    const Pn = E("readystate");
    var On;
    const Sn = E("attributeChanged"),
        xn = E("firstinstalled");
    function Cn(t) {
        Tn.prototype.connectedCallback.call(t);
    }
    function Ln(t) {
        Tn.prototype.disconnectedCallback.call(t);
    }
    class Tn extends HTMLElement {
        constructor() {
            super(), (this[On] = !1);
            const t = pt(this.constructor, "defaultProps"),
                e = Re(this);
            Q(t) && y.assign(e, t),
                new MutationObserver(t => {
                    t.forEach(t => {
                        if ("attributes" == t.type) {
                            const e = pt(this, Sn);
                            let n = t.attributeName;
                            n && Y(e) && e.call(this, n);
                        }
                    });
                }).observe(this, {
                    attributes: !0
                });
        }
        disconnectedCallback() {
            gn(() => {
                En(this);
            });
        }
        connectedCallback() {
            gn(() => {
                if (!this[Pn]) {
                    this[Pn] = !0;
                    const t = pt(this, xn);
                    Y(t) &&
                        gn(() => {
                            t.call(this);
                        });
                }
                bn(this);
            });
        }
    }
    On = Pn;
    const jn = E("waittranformcss"),
        kn = E("innerwatchrecord"),
        Nn = E("innerstate"),
        Mn = E("attributes"),
        Rn = E("innerelement"),
        An = E("innervdom"),
        _n = E("mounted"),
        Dn = E("unmounted");
    function $n(t) {
        var e, n, r;
        if (Y(t)) {
            const o = ve.get(t);
            if (o) return o;
            const i = pt(t, "defaultProps"),
                s = pt(t, "css");
            class c extends Tn {
                constructor(n = {}, o = []) {
                    super(), (this[e] = {}), (this[r] = !1);
                    const i = pt(this.constructor, "css");
                    if (i) {
                        const t = this.tagName.toLowerCase();
                        pt(fn, t) ||
                            (vt(fn, t, new S()),
                            (this[jn] = () =>
                                gn(() => {
                                    mn(i, t);
                                })));
                    }
                    const s = Re(this);
                    Q(n) && y.assign(s, n);
                    const c = s;
                    (It = !0), Yt();
                    const u = y.fromEntries(
                        y.entries(c).map(([t]) => [
                            t,
                            (() => {
                                const e = Re(this),
                                    n = new pe();
                                return (
                                    ct(n, "value", {
                                        get: () => pt(e, t),
                                        configurable: !0
                                    }),
                                    n
                                );
                            })()
                        ])
                    );
                    this[Mn] = u;
                    const a = an(
                        y.fromEntries(y.entries(u).map(([t, e]) => [t, an(e)]))
                    );
                    let f;
                    try {
                        f = it(t, void 0, [a, o.flat(1 / 0)]);
                    } catch (t) {
                        throw (Xt(), t);
                    }
                    if (((f = wt(f)), !Ke(f))) throw (Xt(), L());
                    {
                        const t = wt(f);
                        (this[An] = t.flat(1 / 0).filter(P)),
                            (this[_n] = [...Vt]),
                            (this[Dn] = [...Zt]),
                            (this[Nn] = [...Jt]),
                            (this[kn] = [...qt]),
                            Xt();
                    }
                }
                [((e = Mn), (n = Xe), (r = Pn), xn)]() {
                    const t = () => (A(this, ""), yn(r, m.head)),
                        e = () => {
                            Fe(this[Rn], this, !1), (this[jn] = void 0);
                        };
                    if (!this[Rn]) {
                        const t = this[An];
                        t && ((this[Rn] = sn(t).flat(1 / 0)), (this[An] = []));
                    }
                    const n = pt(this.constructor, "css"),
                        r = this.tagName.toLowerCase();
                    if (n) {
                        const n = this[jn];
                        n
                            ? n()
                                  .then(t)
                                  .then(e)
                            : O.resolve(t).then(e);
                    } else Fe(this[Rn], this);
                }
                connectedCallback() {
                    gn(() => {
                        Cn(this),
                            this[_n].forEach(t => {
                                gn(t);
                            });
                    });
                }
                disconnectedCallback() {
                    gn(() => {
                        Ln(this),
                            this[Dn].forEach(t => {
                                gn(t);
                            });
                    });
                }
                [Sn](t) {
                    if (this[Pn]) {
                        const e = this[Mn][t];
                        e && e[fe]();
                    }
                }
            }
            return (
                (c[n] = Xe),
                (c.css = X(s) && s ? s : void 0),
                (c.defaultProps = Q(i) ? T.parse(T.stringify(i)) : void 0),
                ve.set(t, c),
                c
            );
        }
        throw L();
    }
    const Wn = t => Kn(t);
    function Kn(t) {
        if (He(t)) return t;
        if (Y(t)) return $n(t);
        throw L();
    }
    function Hn(t, e, ...n) {
        return (
            Y(t) && (t = Kn(t)),
            tt(e)
                ? it(Fn, void 0, [t, void 0, [...e, ...n].flat(1 / 0)])
                : it(Fn, void 0, [t, e, ...n])
        );
    }
    function Fn(t, e = {}, ...n) {
        let r = X(t) || Y(t) ? t : "";
        const o = V(e) ? e : {},
            i = n
                .flat(1 / 0)
                .map(t => (0 === t ? "0" : t))
                .filter(t => !!t);
        return (
            X(r) && (r = r.trim().toLowerCase()),
            "" === r ? i : it(We, void 0, [r, o, i])
        );
    }
    const zn = E("truevdom"),
        Bn = E("falsevdom"),
        Un = E("trueele"),
        qn = E("falseele"),
        In = E("handletrue"),
        Vn = E("handlefalse"),
        Zn = E("currentelement"),
        Jn = function(t, e, n) {
            var r, o, i, s, c;
            if (!ce(t) && !G(t)) throw L();
            [e, n].forEach(t => {
                if (!(Z(t) || $e(t) || X(t))) throw new L();
            });
            const u = e,
                a = n;
            class f extends Tn {
                constructor() {
                    super(...arguments),
                        (this[r] = this),
                        (this[i] = !1),
                        (this[s] = wt(u)),
                        (this[c] = wt(a));
                }
                [((r = Zn), (o = Xe), (i = Pn), (s = zn), (c = Bn), Vn)]() {
                    this[qn] || ((this[qn] = sn(this[Bn])), (this[Bn] = []));
                    const t = this[qn][0] || this;
                    F(t, this[Zn]), (this[Zn] = t);
                }
                [In]() {
                    this[Un] || ((this[Un] = sn(this[zn])), (this[zn] = []));
                    const t = this[Un][0] || this;
                    F(t, this[Zn]), (this[Zn] = t);
                }
                [xn]() {
                    const e = t => {
                        !0 === t
                            ? pt(this, In).call(this)
                            : t || pt(this, Vn).call(this);
                    };
                    ce(t)
                        ? (e(t.valueOf()),
                          Gn(t, t => {
                              e(t);
                          }))
                        : e(t);
                }
                connectedCallback() {
                    Cn(this);
                }
                disconnectedCallback() {
                    Ln(this);
                }
            }
            return (f[o] = Xe), Hn(f);
        };
    function Gn(t, e) {
        if (tt(t) || ce(t)) {
            const n = wt(t);
            if (!n.length) throw new C();
            const r = Ut(e),
                o = n.map(t => {
                    const o = (() => {
                        const t = we.get(e);
                        if (t) return t;
                        {
                            const t = () => {
                                r(...n.map(t => t.valueOf()));
                            };
                            return we.set(e, t), t;
                        }
                    })();
                    return (
                        (function(t, e) {
                            if (!ce(t) || !Y(e)) throw L();
                            t[le](e),
                                f(() => {
                                    Qn(t);
                                }),
                                (function(t, e) {
                                    It && qt.push([t, e]);
                                })(t, e);
                        })(t, o),
                        [t, o]
                    );
                });
            return () => {
                o.forEach(([t, e]) => {
                    t[ie](e);
                });
            };
        }
        throw new L();
    }
    function Qn(t) {
        t[de]();
    }
    function Xn(t, e) {
        return function(e, n) {
            const r = e;
            if (X(n))
                f(() => {
                    t(e, n);
                });
            else {
                if (!ce(n)) throw L();
                Gn(n, () => {
                    const o = n;
                    Ye(r) && t(e, v(o));
                }),
                    f(() => {
                        t(e, v(n));
                    });
            }
        };
    }
    function Yn(t, e) {
        if (!X(t)) throw new L();
        if ("function" != typeof e) throw L();
        if (tn[t]) throw new C();
        g.set(tn, t, e);
    }
    function tr(t, e, n, r, o, i) {
        if (!ce(o)) throw L();
        if (!t.includes(i.type)) throw L();
        vt(i.bindattr, e, o),
            r.forEach(t => {
                const e = wt(i.onevent[t]);
                vt(
                    i.onevent,
                    t,
                    wt([...e, t => (o.value = pt(t.target, n))]).filter(P)
                );
            });
    }
    Yn("ref", (t, e, n) => {
        if (Y(n)) it(n, void 0, [t]);
        else {
            if (!Q(n)) throw L();
            vt(n, "value", t);
        }
    }),
        Yn("html", (t, e, n) => {
            Xn(_)(t, n);
        }),
        Yn("text", (t, e, n) => {
            Xn(A)(t, n);
        }),
        Yn("value", (t, e, n) => {
            tr(
                ["input", "textarea", "select"],
                "value",
                "value",
                ["change", "input"],
                n,
                e
            );
        }),
        Yn("checked", (t, e, n) => {
            tr(["input"], "checked", "checked", ["change"], n, e);
            const r = wt(e.onevent.click);
            vt(
                e.onevent,
                "click",
                wt([
                    ...r,
                    t => {
                        const e = t.target,
                            n = t.target.name;
                        n &&
                            U(`input[name=${n}]`)
                                .filter(t => t !== e)
                                .forEach(t => {
                                    t.dispatchEvent(new u("change"));
                                });
                    }
                ]).filter(P)
            );
        });
    const { HTMLElement: er, customElements: nr, Proxy: rr } = n;
    if (!Y(er) || !Y(rr) || !Q(nr)) throw new L();
    const or = E("cancel_watch"),
        ir = E("cached_class_element"),
        sr = E("switch_mount");
    function cr(t) {
        var e, n, r;
        if (!ce(t)) throw new L();
        class o extends Tn {
            constructor() {
                super(...arguments), (this[e] = new i()), (this[r] = !1);
            }
            disconnectedCallback() {
                gn(() => {
                    Ln(this), Y(this[or]) && this[or]();
                });
            }
            [((e = ir), (n = Xe), (r = Pn), sr)](t) {
                t = Kn(t);
                const e = this[ir].get(t);
                if (e) Fe(e, this);
                else {
                    const e = sn(Hn(t));
                    this[ir].set(t, e), Fe(e, this);
                }
            }
            [xn]() {
                const e = () => {
                    this[sr](t.valueOf());
                };
                e(),
                    (this[or] = Gn(t, () => {
                        e();
                    }));
            }
            connectedCallback() {
                Cn(this);
            }
        }
        return (o[n] = Xe), Hn(o);
    }
    function ur(t) {
        return new b(t, {
            getOwnPropertyDescriptor: (t, e) => (I(e) ? void 0 : at(t, e)),
            ownKeys(t) {
                let e = pt(t, "value");
                const n = Q(e) ? e : e.__proto__;
                return w.from(new S([...ht(t), ...ht(n)]));
            },
            has(t, e) {
                const n = pt(t, "value"),
                    r = Q(n) ? n : n.__proto__;
                return lt(t, e) || lt(r, e);
            },
            get(t, e) {
                if (lt(t, e)) return pt(t, e);
                {
                    const n = pt(t, "value"),
                        r = y(n);
                    if (lt(r, e)) {
                        const t = pt(r, e);
                        return Y(t) ? t.bind(r) : t;
                    }
                }
            }
        });
    }
    const ar = function(t, e, n) {
        if ((!tt(t) && !ce(t)) || !Y(e)) throw L();
        const r = wt(t);
        if (!r.length) throw new C();
        return (function(t, e, n) {
            const r = new pe(),
                o = () => {
                    const n = it(
                            e,
                            void 0,
                            t.map(t => t.valueOf())
                        ),
                        r = ce(n) ? n.valueOf() : n;
                    if (Q(r) || q(r)) return r;
                    throw L();
                };
            let i = o();
            return (
                ct(r, "value", {
                    set: Y(n) ? n : void 0,
                    get: o,
                    configurable: !0
                }),
                t.forEach(t => {
                    Gn(t, () => {
                        let t = o();
                        t !== i && (r[fe](), (i = t));
                    });
                }),
                ur(r)
            );
        })(r, e, n);
    };
    function fr(t) {
        return {
            value: t
        };
    }
    const lr = S.prototype,
        hr = j.prototype;
    function dr(t) {
        return t instanceof j;
    }
    function pr(t) {
        return t instanceof S;
    }
    function vr(t) {
        return w.isArray(t);
    }
    const wr = n.Reflect,
        {
            ownKeys: mr,
            deleteProperty: yr,
            apply: gr,
            construct: br,
            defineProperty: Er,
            get: Pr,
            getOwnPropertyDescriptor: Or,
            getPrototypeOf: Sr,
            has: xr,
            set: Cr,
            setPrototypeOf: Lr
        } = wr;
    function Tr(t) {
        return "object" == typeof t && null !== t;
    }
    function jr(t) {
        return "function" == typeof t;
    }
    function kr(t, e) {
        if (!jr(e)) throw C();
        if (!jr(b)) throw C();
        return jr(t) || Tr(t)
            ? (function t(e, n, r = [], o = e) {
                  if (!jr(n)) throw C();
                  if (
                      e instanceof O ||
                      (function(t) {
                          return t instanceof c;
                      })(e) ||
                      (function(t) {
                          return t instanceof s;
                      })(e)
                  )
                      return e;
                  if (jr(e) || Tr(e)) {
                      let i;
                      return (
                          pr(e)
                              ? ((i = new S([...e])),
                                Cr(
                                    i,
                                    "add",
                                    t => (
                                        lr.add.call(e, t),
                                        n(o, r, void 0, void 0),
                                        lr.add.call(i, t)
                                    )
                                ),
                                Cr(
                                    i,
                                    "delete",
                                    t => (
                                        lr.delete.call(e, t),
                                        n(o, r, void 0, void 0),
                                        lr.delete.call(i, t)
                                    )
                                ),
                                Cr(
                                    i,
                                    "clear",
                                    () => (
                                        lr.clear.call(e),
                                        n(o, r, void 0, void 0),
                                        lr.clear.call(i)
                                    )
                                ))
                              : dr(e)
                              ? ((i = new j([...e])),
                                Cr(
                                    i,
                                    "clear",
                                    () => (
                                        hr.clear.call(e),
                                        n(o, r, void 0, void 0),
                                        hr.clear.call(i)
                                    )
                                ),
                                Cr(
                                    i,
                                    "set",
                                    (t, s) => (
                                        hr.set.call(e, t, s),
                                        n(o, r, void 0, void 0),
                                        hr.set.call(i, t, s)
                                    )
                                ),
                                Cr(
                                    i,
                                    "delete",
                                    t => (
                                        hr.delete.call(e, t),
                                        n(o, r, void 0, void 0),
                                        hr.delete.call(i, t)
                                    )
                                ))
                              : (i = vr(e) ? [] : jr(e) ? () => {} : {}),
                          pr(e) || dr(e) || Lr(i, null),
                          new b(i, {
                              defineProperty: (t, i, s) => (
                                  n(
                                      o,
                                      [...r, v(i)],
                                      xr(s, "value")
                                          ? s.value
                                          : jr(s.get)
                                          ? s.get()
                                          : void 0,
                                      Pr(e, i)
                                  ),
                                  Er(e, i, s)
                              ),
                              deleteProperty: (t, i) => (
                                  n(o, [...r, v(i)], void 0, Pr(e, i)), yr(e, i)
                              ),
                              ownKeys: () => mr(e),
                              has: (t, n) => xr(e, n),
                              getPrototypeOf: () => Sr(e),
                              setPrototypeOf: (t, n) => Lr(e, n),
                              construct(t, n) {
                                  if (jr(e)) return br(e, n);
                              },
                              apply(t, n, r) {
                                  if (jr(e)) return gr(e, n, r);
                              },
                              getOwnPropertyDescriptor(t, n) {
                                  var r = Or(e, n);
                                  return vr(e) && "length" === n
                                      ? r
                                      : r
                                      ? ((r.configurable = !0), r)
                                      : void 0;
                              },
                              set: (t, i, s) => (
                                  jr(n) && n(o, [...r, v(i)], s, Pr(e, i)),
                                  Cr(e, i, s)
                              ),
                              get(o, s) {
                                  var c = Pr(e, s);
                                  return jr(c) && (pr(e) || dr(e))
                                      ? Pr(i, s).bind(i)
                                      : jr(c) || Tr(c)
                                      ? t(c, n, [...r, v(s)], e)
                                      : c;
                              }
                          })
                      );
                  }
                  return e;
              })(t, e)
            : t;
    }
    const Nr = S.prototype;
    function Mr(t) {
        if (q(t) || Y(t))
            return ur(
                new b(new pe(t), {
                    defineProperty: () => !1,
                    deleteProperty: () => !1,
                    set(e, n, r) {
                        if ("value" === n && ((q(r) && q(t)) || (Y(r) && Y(t))))
                            return e[n] !== r && (vt(e, n, r), e[fe]()), !0;
                        throw L();
                    },
                    setPrototypeOf: () => !1
                })
            );
        if (ce(t)) return Mr(t.valueOf());
        if (Q(t))
            return (function(t) {
                const e = new pe(t);
                let n = t;
                const r = V(t) && y.values(t).some(t => ce(t)),
                    o = y.entries(t).filter(t => ce(t[1]));
                r &&
                    ((n = y.assign({}, t)),
                    o.forEach(([t, e]) => {
                        ct(n, t, {
                            enumerable: !0,
                            get: () => e.valueOf(),
                            set: t => {
                                e.value = t;
                            },
                            configurable: !0
                        });
                    })),
                    r &&
                        o.forEach(([t, n]) => {
                            Gn(n, () => {
                                e[fe]();
                            });
                        }),
                    (e.value = n);
                const i = {
                    ownKeys: t =>
                        w.from(new S([...ht(t), ...ht(pt(t, "value"))])),
                    setPrototypeOf: () => !1,
                    defineProperty: () => !1,
                    getOwnPropertyDescriptor: (t, e) => {
                        if (I(e)) return;
                        const n = pt(t, "value"),
                            r = at(t, e) || at(n, e);
                        return r && (r.configurable = !0), r;
                    },
                    deleteProperty: (t, e) => {
                        const n = pt(t, "value");
                        return !lt(n, e) || (ut(n, e), t[fe](), !0);
                    },
                    has: (t, e) => {
                        const n = pt(t, "value");
                        return lt(t, e) || lt(n, e);
                    },
                    get: (t, e) => {
                        const n = pt(t, "value"),
                            r = tt(n) || V(n);
                        if ("value" === e && r)
                            return kr(pt(t, e), (e, n) => {
                                t[fe]();
                            });
                        if (lt(t, e)) return pt(t, e);
                        if (lt(n, e)) {
                            const o = pt(n, e);
                            if (!nt(n))
                                return r && (tt(o) || V(o))
                                    ? kr(o, () => {
                                          t[fe]();
                                      })
                                    : o;
                            if ("add" !== e && "clear" !== e && "delete" !== e)
                                return Y(o) ? o.bind(n) : o;
                            switch (e) {
                                case "add":
                                    return (r => {
                                        if (!Nr.has.call(n, r)) {
                                            const o = Nr[e].call(n, r);
                                            return t[fe](), o;
                                        }
                                    }).bind(n);

                                case "delete":
                                    return (r => {
                                        if (Nr.has.call(n, r)) {
                                            const o = Nr[e].call(n, r);
                                            return t[fe](), o;
                                        }
                                    }).bind(n);

                                case "clear":
                                    return (() => {
                                        if (n.size) {
                                            const r = Nr[e].call(n);
                                            return t[fe](), r;
                                        }
                                    }).bind(n);
                            }
                        }
                    },
                    set: (e, n, r) => {
                        ce(r) && (r = r.valueOf());
                        const o = pt(e, "value");
                        if (
                            "value" === n &&
                            Q(r) &&
                            ((tt(t) && tt(r)) || (!tt(t) && !tt(r)))
                        )
                            return e[n] !== r && (vt(e, n, r), e[fe]()), !0;
                        if (lt(e, n)) throw L();
                        return o[n] !== r && (vt(o, n, r), e[fe]()), !0;
                    }
                };
                return new b(e, i);
            })(t);
        throw C();
    }
    var Ar = new j();
    console.log([Hn, Hn]);
    function useMousePosition() {
        const x = Mr(0);
        const y = Mr(0);
        function update(e) {
            x.value = e.pageX;
            y.value = e.pageY;
        }
        Gt(() => {
            window.addEventListener("mousemove", update);
        });
        Qt(() => {
            window.removeEventListener("mousemove", update);
        });
        return {
            x: x,
            y: y
        };
    }
    const mycomapp = Wn(() => {
        const { x: x, y: y } = useMousePosition();
        const plus = ar(x, x => x + 100);
        const multi = ar([x, y], (x, y) => x * y);
        let count = 0;
        const cancelwatch = Gn([x, y, multi, plus], (...args) => {
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
        return Hn(
            "div",
            null,
            Hn("h3", null, " \u9f20\u6807\u4f4d\u7f6e"),
            Hn("h2", null, "x:", x),
            Hn("h1", null, "y:", y),
            Hn("p", null, "x+100 \u662f", plus),
            Hn("p", null, "x*y \u662f", multi)
        );
    });
    mycomapp.css = `\n*{font-size:80px !important;}\np{color:blue !important;}\n`;
    var vdom = Hn(mycomapp);
    document.body.appendChild(un(vdom, document.createElement("div")));
    const refarray = [];
    const liststate = Mr(
        Array(10)
            .fill(undefined)
            .map((v, i) => i)
    );
    Gn(liststate, a => console.dir([liststate, a]));
    const testlistvdom = Hn(
        "div",
        null,
        Hn("button", {
            $text: "push",
            onclick: () => {
                liststate.push(Math.random());
            }
        }),
        Hn("button", {
            $text: "pop",
            onclick: () => {
                liststate.pop();
            }
        }),
        Hn("button", {
            $text: "shift",
            onclick: () => {
                liststate.shift();
            }
        }),
        Hn("button", {
            $text: "unshift",
            onclick: () => {
                liststate.unshift(Math.random());
            }
        })
    );
    const weathercondition = Mr(true);
    const vdom$1 = [
        Jn(weathercondition, testlistvdom),
        Hn(
            "",
            null,
            Hn(
                "button",
                {
                    onclick: () => {
                        weathercondition.value = !weathercondition.value;
                    }
                },
                "condition toggle"
            )
        )
    ];
    document.body.appendChild(un(vdom$1, document.createElement("div")));
    console.log(vdom$1, refarray, liststate);
    var css =
        '@charset "UTF-8";@import url(https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-6556dfa9be535e551ffffaadfecdad99.min.css);@import url(https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-frameworks-a2fba223d5af91496cac70d4ec3624df.min.css);@import url(https://cdn.staticfile.org/mui/3.7.1/css/mui.min.css);pre{text-align:left!important}button,div,h1,h2,h3,h4,h5,h6,input{text-align:center}p{color:#000!important}@-webkit-keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.flowerpassword a{color:#42b983}.App-header{background-color:#fff}nav{width:100%}#\u56fe\u7247\u5217\u8868200 img{min-height:150px;min-width:150px;height:auto;width:auto;max-width:100%;max-height:200px}#my\u5bfc\u822a\u680f .navbar-nav li a{margin-left:2px;margin-right:2px}h1,h2{font-weight:400}ul{list-style-type:none;padding:0}li{display:inline-block;margin:0 10px}*{-webkit-user-select:text;-ms-user-select:text;user-select:text}.example{color:red}body{padding:0}*{font-family:"Microsoft Yahei,PingFangSC-Regular,arial, verdana, sans-serif"}#my\u5bfc\u822a\u680f{overflow:auto;max-height:100%;padding-right:0;padding-left:0}.App{text-align:center}.App-logo{-webkit-animation:App-logo-spin 20s linear infinite;animation:App-logo-spin 20s linear infinite;height:40vmin;pointer-events:none}.App-header{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:calc(10px + 2vmin)}.App-link{color:#61dafb}.flowerpassword body,.flowerpassword html{background-color:#fff}.flowerpassword body{font:14px/1.5 Tahoma,Helvetica,Arial,\\5b8b\\4f53;color:#000}.flowerpassword a,.flowerpassword a:hover{color:#09c;text-decoration:none}.flowerpassword .left{float:left}.flowerpassword .right{float:right}.flowerpassword .clear{clear:both}.flowerpassword header{text-align:left;padding:0;margin:15px auto}.flowerpassword #logo{height:39px}.flowerpassword #shortcuts{margin:15px 0 0 15px}.flowerpassword #nav{float:center;margin-top:10px}.flowerpassword #nav li{margin:0 7px}.flowerpassword #nav li a{font-size:22px;color:#09c}.flowerpassword #nav li.active a,.flowerpassword #nav li.active a:hover{background-color:#09c;color:#fff}.flowerpassword #nav li a:hover{background-color:#79c6df;color:#fff}.flowerpassword #index-box{background-color:#fff;width:940px;clear:both;box-shadow:0 0 4px 2px #ddd;border:1px solid #ddd}.flowerpassword #index-box .float-box{margin:20px 0 20px 20px;display:inline}.flowerpassword #index-box #content-nav{margin:0;width:200px}.flowerpassword #index-box #content-nav li a{background-color:#e5ecdc}.flowerpassword #index-slider{width:940px;height:200px;overflow:hidden;position:relative}.flowerpassword #index-slider ul{list-style:none;margin:0;position:absolute;top:0;left:0}.flowerpassword #index-slider li{width:940px;height:200px;float:left}.flowerpassword #index-slider #pagination{top:160px;left:800px}.flowerpassword #index-slider ul#pagination li{width:16px;height:16px;border-radius:1em;background-color:#fff;box-shadow:0 0 1px 2px #ccc;margin-right:18px;margin-top:4px}.flowerpassword #index-slider ul#pagination li.active{width:24px;height:24px;margin-top:0}.flowerpassword #index-slider ul#pagination li:hover{background-color:#ddd;cursor:pointer}.flowerpassword #index-report{width:680px;height:70px;margin-top:20px;overflow:hidden;position:relative;background-color:#e5ecdc}.flowerpassword #index-report ul{list-style:none;margin:0;position:absolute;top:0;left:0}.flowerpassword #index-report li{width:680px;height:70px;text-align:center;float:left;font-size:32px;color:#666;font-family:\xe5\xbe\xae\xe8\xbd\xaf\xe9\u203a\u2026\xe9\xbb\u2018,\xe9\xbb\u2018\xe4\xbd\u201c;line-height:70px}.flowerpassword #index-report-pagination{list-style:none;margin-left:35px;text-align:center}.flowerpassword #index-report-pagination li{height:65px;float:left;margin-right:45px;cursor:pointer}.flowerpassword #index-report-pagination li img{margin-top:30px}.flowerpassword #index-button{margin:40px 0 30px;text-align:center}.flowerpassword #index-button a{margin:0 50px}.flowerpassword #tab{margin-top:30px}.flowerpassword #tab li a{margin-right:10px;border-bottom-color:#ddd;color:#666}.flowerpassword #tab li a:hover{background-color:#f2f2f2;color:#333;border-color:#ddd #ddd transparent}.flowerpassword #tab li.active a{background-color:#f2f2f2;color:#666;border-bottom-color:transparent}.flowerpassword #content-nav{list-style:none;margin:20px 0 0}.flowerpassword #content-nav li a{color:#666;padding:11px 0 11px 60px;display:block;margin-bottom:1px;font-size:22px}.flowerpassword #content-nav li a.active,.flowerpassword #content-nav li a:hover{background-color:#09c!important;color:#fff!important}.flowerpassword h1,.flowerpassword h2{color:#09c;margin:30px 0 12px}.flowerpassword h2{font-size:22px}.flowerpassword h2 span{font-size:22px;color:#fff;margin-right:7px;background-color:#09c;width:33px;height:33px;display:inline-block;text-align:center}.flowerpassword h3{font-size:16px;color:#09c;margin:20px 0}.flowerpassword h3 span{font-size:16px;color:#fff;margin-right:6px;background-color:#09c;width:26px;display:inline-block;text-align:center}.flowerpassword #input span{color:#09c;font-weight:700;font-size:22px;margin:0 20px}.flowerpassword #input input{font-size:14px;padding:5px;margin-left:5px}.flowerpassword #input label{float:none;display:inline;padding-right:5px}.flowerpassword #input p{margin-top:16px}.flowerpassword #input p,.flowerpassword .other{font-size:12px;color:#999}.flowerpassword #code16{display:inline-block;text-align:center}.flowerpassword .code16d{border:2px solid #09c}.flowerpassword .code16d:hover{border:2px solid #ff881c}.flowerpassword #copycode16{color:#000;display:inline-block;padding:0 3px;cursor:pointer}.flowerpassword .copycode16d{background-color:#09c;border:2px solid #09c}.flowerpassword .copycode16d:hover{background-color:#ff881c;border:2px solid #ff881c}.flowerpassword p{font-size:12px;color:#666;margin:20px 0}.flowerpassword #copyOK{color:#f2f2f2;border:2px solid #f2f2f2;display:inline-block;margin-left:16px;padding:0 3px}.flowerpassword .down-button{margin:10px 20px 10px 0}.flowerpassword #get{margin-bottom:100px}.flowerpassword footer{margin:50px 0 30px}.flowerpassword footer p{margin:0 0 5px;color:#999}.flowerpassword footer p span{margin:0 10px}.flowerpassword footer p a{color:#999}.flowerpassword footer p a:hover{color:#333}.jdahd button{border-color:#000}.jdahd *{text-align:center;margin:0;box-sizing:border-box;background-color:transparent}.jdahd body{position:relative;height:100vh;text-align:center}.jdahd h1{text-align:center;margin:20px 0}.jdahd textarea{width:100%;clear:both;margin-bottom:10px;border-radius:7px;padding:15px 10px;font-size:14px;outline:none;-webkit-transition:all .2s ease-in;transition:all .2s ease-in}.jdahd input[type=button]{margin:0 auto;position:relative;vertical-align:top;width:150px;height:60px;padding:0;font-size:22px;font-weight:300;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.25);background:#2980b9;border:0;border-bottom:2px solid #2475ab;cursor:pointer;box-shadow:inset 0 -2px #2475ab}.jdahd input:active{top:1px;outline:none;box-shadow:none}.jdahd input:-ms-input-placeholder,.jdahd textarea:-ms-input-placeholder{color:#fff;font-size:20px;font-weight:300}.jdahd input::-moz-placeholder,.jdahd textarea::-moz-placeholder{color:#fff;font-size:20px;font-weight:300}.jdahd input::-webkit-input-placeholder,.jdahd textarea::-webkit-input-placeholder{color:#fff;font-size:20px;font-weight:300;box-shadow:none;-webkit-appearance:none}.jdahd footer{width:calc(100% - 40px);position:absolute;bottom:20px}.jdahd footer>p a{color:#2980b9;text-decoration:none}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}code{font-family:source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace}.jdahd #my\u5bfc\u822a\u680f{overflow:auto;max-height:100%;padding-right:0;padding-left:0}.jdahd *,.jdahd body{text-align:center}.jdahd h1{font-weight:300;font-size:40px}.jdahd h3{font-weight:700}.jdahd .actions,.jdahd li,.jdahd p,.jdahd textarea{width:100%}.jdahd textarea{border-color:#000;display:block;min-height:250px;margin:1em 0}.jdahd ul.pre li{white-space:pre}.jdahd .checkbox{display:inline-block}.jdahd .actions a{float:right}.jdahd .actions{clear:both}*{font-family:Microsoft Yahei}#nav{float:center}#app{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;margin-top:0}#App-logo{-webkit-animation:App-logo-spin 20s linear infinite;animation:App-logo-spin 20s linear infinite;height:40vmin;pointer-events:none}@keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}*{-webkit-user-select:text!important;-moz-user-select:text;-o-user-select:text;-ms-user-select:text!important;user-select:text!important}body,html{scroll-behavior:smooth}*{font-family:Microsoft Yahei,Helvetica,Tahoma,Arial,PingFang SC,Hiragino Sans GB,Heiti SC,MicrosoftYaHei,WenQuanYi Micro Hei,sans-serif!important}.hljs{display:block;overflow-x:auto;padding:.5em;color:#333;background:#f8f8f8;-webkit-text-size-adjust:none}.diff .hljs-header,.hljs-comment{color:#998;font-style:italic}.css .rule .hljs-keyword,.hljs-keyword,.hljs-request,.hljs-status,.hljs-subst,.hljs-winutils,.nginx .hljs-title{color:#333;font-weight:700}.hljs-hexcolor,.hljs-number,.ruby .hljs-constant{color:teal}.hljs-doctag,.hljs-string,.hljs-tag .hljs-value,.tex .hljs-formula{color:#d14}.hljs-id,.hljs-title,.scss .hljs-preprocessor{color:#900;font-weight:700}.hljs-list .hljs-keyword,.hljs-subst{font-weight:400}.hljs-class .hljs-title,.hljs-type,.tex .hljs-command,.vhdl .hljs-literal{color:#458;font-weight:700}.django .hljs-tag .hljs-keyword,.hljs-rule .hljs-property,.hljs-tag,.hljs-tag .hljs-title{color:navy;font-weight:400}.hljs-attribute,.hljs-name,.hljs-variable,.lisp .hljs-body{color:teal}.hljs-regexp{color:#009926}.clojure .hljs-keyword,.hljs-prompt,.hljs-symbol,.lisp .hljs-keyword,.ruby .hljs-symbol .hljs-string,.scheme .hljs-keyword,.tex .hljs-special{color:#990073}.hljs-built_in{color:#0086b3}.hljs-cdata,.hljs-doctype,.hljs-pi,.hljs-pragma,.hljs-preprocessor,.hljs-shebang{color:#999;font-weight:700}.hljs-deletion{background:#fdd}.hljs-addition{background:#dfd}.diff .hljs-change{background:#0086b3}.hljs-chunk{color:#aaa}#padding0{padding:0!important}@media (max-width:500px){hr#hidewidthless500{display:none}}.article-content{word-break:break-word;line-height:1.75;font-weight:400;font-size:15px;overflow-x:hidden}.article-content h1{margin:1.3rem 0;line-height:1.2}.article-content p{line-height:2.27rem}.article-content hr{border:none;border-top:1px solid #ddd;margin-top:2.7rem;margin-bottom:2.7rem}.article-content embed,.article-content iframe,.article-content img:not(.equation),.article-content video{max-width:100%!important;margin:0}.article-content img.lazyload{visibility:hidden}.article-content img.inited{background-color:#f8f9fa;background-position:50%;background-repeat:no-repeat;visibility:visible}.article-content img.loaded{background-image:none;background-color:transparent}.article-content img.equation{margin:0 .1em;max-width:100%!important;vertical-align:text-bottom}.article-content img:not(.equation){cursor:-webkit-zoom-in;cursor:zoom-in}.article-content figure{margin:2.7rem auto;text-align:center}.article-content figure figcaption{text-align:center;font-size:1rem;line-height:2.7rem;color:#909090}.article-content pre{line-height:1.93rem;overflow:auto}.article-content code,.article-content pre{font-family:Menlo,Monaco,Consolas,Courier New,monospace}.article-content code{font-size:1rem;padding:.26rem .53em;word-break:break-word;color:#4e5980;background-color:#f8f8f8;border-radius:2px;overflow-x:auto}.article-content pre>code{font-size:1rem;padding:.67rem 1.3rem;margin:0;word-break:normal;display:block}.article-content a{color:#259}.article-content a:active,.article-content a:hover{color:#275b8c}.article-content table{display:inline-block!important;font-size:1rem;width:auto;max-width:100%;overflow:auto;border:1px solid #f6f6f6}.article-content thead{background:#f6f6f6;color:#000;text-align:left}.article-content tr:nth-child(2n){background-color:#fcfcfc}.article-content td,.article-content th{padding:1rem .6rem;line-height:2rem}.article-content td{min-width:10rem}.article-content blockquote{margin:1em 0;border-left:4px solid #ddd;padding:0 1.3rem}.article-content blockquote>p{margin:.6rem 0}.article-content ol,.article-content ul{padding-left:2.7rem}.article-content ol li,.article-content ul li{margin-bottom:.6rem}.article-content ol ol,.article-content ol ul,.article-content ul ol,.article-content ul ul{margin-top:.27rem}.article-content pre>code{overflow-x:auto;-webkit-overflow-scrolling:touch;color:#333;background:#f8f8f8}.article-content .hljs-comment,.article-content .hljs-quote{color:#998}.article-content .hljs-keyword,.article-content .hljs-selector-tag,.article-content .hljs-subst{color:#333;font-weight:700}.article-content .hljs-literal,.article-content .hljs-number,.article-content .hljs-tag .hljs-attr,.article-content .hljs-template-variable,.article-content .hljs-variable{color:teal}.article-content .hljs-doctag,.article-content .hljs-string{color:#d14}.article-content .hljs-section,.article-content .hljs-selector-id,.article-content .hljs-title{color:#900;font-weight:700}.article-content .hljs-subst{font-weight:400}.article-content .hljs-class .hljs-title,.article-content .hljs-type{color:#458;font-weight:700}.article-content .hljs-attribute,.article-content .hljs-name,.article-content .hljs-tag{color:navy;font-weight:400}.article-content .hljs-link,.article-content .hljs-regexp{color:#009926}.article-content .hljs-bullet,.article-content .hljs-symbol{color:#990073}.article-content .hljs-built_in,.article-content .hljs-builtin-name{color:#0086b3}.article-content .hljs-meta{color:#999;font-weight:700}.article-content .hljs-deletion{background:#fdd}.article-content .hljs-addition{background:#dfd}.article-content .hljs-emphasis{font-style:italic}.article-content .hljs-strong{font-weight:700}.article-content p{line-height:inherit;margin-top:22px;margin-bottom:22px}.article-content img{max-height:none}.article-content a{color:#0269c8;border-bottom:1px solid #d1e9ff}.article-content code{background-color:#fff5f5;color:#ff502c;font-size:.87em;padding:.065em .4em}.article-content figure{margin:22px auto}.article-content figure figcaption{margin-top:2px;line-height:1.6}.article-content blockquote{color:#666;padding:1px 23px;margin:22px 0;border-left:4px solid #cbcbcb;background-color:#f8f8f8}.article-content blockquote:after{display:block;content:""}.article-content blockquote>p{margin:10px 0}.article-content blockquote.warning{position:relative;border-left-color:#f75151;margin-left:8px}.article-content blockquote.warning:before{position:absolute;top:14px;left:-12px;background:#f75151;border-radius:50%;content:"!";width:20px;height:20px;color:#fff;display:flex;align-items:center;justify-content:center}.article-content ol,.article-content ul{padding-left:28px}.article-content ol li,.article-content ul li{margin-bottom:0;list-style:inherit}.article-content ol li.task-list-item,.article-content ul li.task-list-item{list-style:none}.article-content ol li.task-list-item ol,.article-content ol li.task-list-item ul,.article-content ul li.task-list-item ol,.article-content ul li.task-list-item ul{margin-top:0}.article-content ol li{padding-left:6px}.article-content pre{position:relative;line-height:1.75}.article-content pre>code{padding:15px 12px}.article-content pre>code.hljs[lang]{padding:18px 15px 12px}.article-content pre>code.hljs[lang]:before{content:attr(lang);position:absolute;right:15px;top:2px;color:hsla(0,0%,54.9%,.8)}.article-content pre>code.hljs[lang][lang=bash]:before{content:""}.article-content pre>code.copyable .copy-code-btn{position:absolute;top:6px;right:15px;font-size:12px;line-height:1;cursor:pointer;color:hsla(0,0%,54.9%,.8);-webkit-transition:color .1s;transition:color .1s}.article-content pre>code.copyable .copy-code-btn:hover{color:#8c8c8c}.article-content pre>code.copyable.hljs[lang]:before{right:70px}.article-content h1,.article-content h2,.article-content h3,.article-content h4,.article-content h5,.article-content h6{color:#333;line-height:1.5;margin-top:35px;margin-bottom:10px;padding-bottom:5px}.article-content h1{font-size:30px;margin-bottom:5px}.article-content h2{padding-bottom:12px;font-size:24px;border-bottom:1px solid #ececec}.article-content h3{font-size:18px;padding-bottom:0}.article-content h4{font-size:16px}.article-content h5{font-size:15px}.article-content h6{margin-top:5px}.article-content h1.heading+h2.heading{margin-top:20px}.article-content h1.heading+h3.heading{margin-top:15px}.article-content .heading+.heading{margin-top:0}.article-content h1+:not(.heading){margin-top:25px}@media (max-width:720px){.article-content h1{font-size:24px}.article-content h2{font-size:20px}.article-content h3{font-size:18px}.article-content pre>code .copy-code-btn{display:none}.article-content pre>code.hljs[lang]:before{top:2px;right:15px}}@media (max-width:720px){.article-content pre>code.copyable.hljs[lang]:before{right:1rem}}';
    console.log([Hn, Hn]);
    const mycomapp$1 = Wn(() => {
        const inputpassword = Mr("");
        const inputref = fr();
        const inputref2 = fr();
        console.log(inputref2);
        console.log(inputpassword);
        Gn(inputpassword, console.log);
        const vdom = [
            Hn(
                "h1",
                {
                    style: "padding-top: 127.6px;"
                },
                Hn(
                    "svg",
                    {
                        style: "\n      width: 100%;\n      height: 200px;\n  ",
                        class: "octicon octicon-book",
                        viewBox: "0 0 16 16",
                        version: "1.1",
                        width: "16",
                        height: "16",
                        "aria-hidden": "true"
                    },
                    Hn("path", {
                        "fill-rule": "evenodd",
                        d:
                            "M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"
                    })
                ),
                Hn(
                    "svg",
                    {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 3046.7 875.7",
                        style: "\n      width: 100%;\n      height: 200px;\n  "
                    },
                    Hn("title", null, "logo-on-dark-bg"),
                    Hn("rect", {
                        Color: "#FFF",
                        x: "0",
                        y: "0",
                        width: "3046.7",
                        height: "875.7"
                    }),
                    Hn("path", {
                        fill: "#FFF",
                        d:
                            "M387 0l387 218.9v437.9L387 875.7 0 656.8V218.9L387 0z"
                    }),
                    Hn("path", {
                        fill: "#8ED6FB",
                        d:
                            "M704.9 641.7L399.8 814.3V679.9l190.1-104.6 115 66.4zm20.9-18.9V261.9l-111.6 64.5v232l111.6 64.4zM67.9 641.7L373 814.3V679.9L182.8 575.3 67.9 641.7zM47 622.8V261.9l111.6 64.5v232L47 622.8zm13.1-384.3L373 61.5v129.9L172.5 301.7l-1.6.9-110.8-64.1zm652.6 0l-312.9-177v129.9l200.5 110.2 1.6.9 110.8-64z"
                    }),
                    Hn("path", {
                        fill: "#1C78C0",
                        d:
                            "M373 649.3L185.4 546.1V341.8L373 450.1v199.2zm26.8 0l187.6-103.1V341.8L399.8 450.1v199.2zM198.1 318.2l188.3-103.5 188.3 103.5-188.3 108.7-188.3-108.7z"
                    }),
                    Hn("path", {
                        fill: "#F5FAFA",
                        d:
                            "M1164.3 576.3h82.5l84.1-280.2h-80.4l-49.8 198.8-53.1-198.8H1078l-53.6 198.8-49.3-198.8h-80.4l83.6 280.2h82.5l52-179.5 51.5 179.5zM1335.2 437c0 84.1 57.3 146.3 147.4 146.3 69.7 0 107.2-41.8 117.9-61.6l-48.8-37c-8 11.8-30 34.3-68.1 34.3-41.3 0-71.3-26.8-72.9-64.3H1608c.5-5.4.5-10.7.5-16.1 0-91.6-49.3-149.5-136.1-149.5-79.9 0-137.2 63.2-137.2 147.9zm77.7-30.6c3.2-32.1 25.7-56.8 60.6-56.8 33.8 0 58.4 22.5 60 56.8h-120.6zm223.5 169.9h69.7v-28.9c7.5 9.1 35.4 35.9 83.1 35.9 80.4 0 137.2-60.5 137.2-146.8 0-86.8-52.5-147.3-132.9-147.3-48.2 0-76.1 26.8-83.1 36.4V188.9h-73.9v387.4h-.1zm71.8-139.3c0-52.5 31.1-82.5 71.8-82.5 42.9 0 71.8 33.8 71.8 82.5 0 49.8-30 80.9-71.8 80.9-45 0-71.8-36.5-71.8-80.9zm247 239.5h73.9V547.3c7 9.1 34.8 35.9 83.1 35.9 80.4 0 132.9-60.5 132.9-147.3 0-85.7-56.8-146.8-137.2-146.8-47.7 0-75.6 26.8-83.1 36.4V296h-69.7v380.5h.1zm71.8-241.1c0-44.5 26.8-80.9 71.8-80.9 41.8 0 71.8 31.1 71.8 80.9 0 48.8-28.9 82.5-71.8 82.5-40.7 0-71.8-30-71.8-82.5zm231.5 54.1c0 58.9 48.2 93.8 105 93.8 32.2 0 53.6-9.6 68.1-25.2l4.8 18.2h65.4V398.9c0-62.7-26.8-109.8-116.8-109.8-42.9 0-85.2 16.1-110.4 33.2l27.9 50.4c20.9-10.7 46.6-19.8 74.5-19.8 32.7 0 50.9 16.6 50.9 41.3v18.2c-10.2-7-32.2-15.5-60.6-15.5-65.4-.1-108.8 37.4-108.8 92.6zm73.9-2.2c0-23 19.8-39.1 48.2-39.1s48.8 14.5 48.8 39.1c0 23.6-20.4 38.6-48.2 38.6s-48.8-15.5-48.8-38.6zm348.9 30.6c-46.6 0-79.8-33.8-79.8-81.4 0-45 29.5-82 77.2-82 31.6 0 53.1 15.5 65.4 26.8l20.9-62.2c-18.2-13.9-47.2-30-88.4-30-85.2 0-149 62.7-149 147.9s62.2 146.3 149.5 146.3c40.7 0 71.3-17.1 87.3-30l-19.8-60.5c-12.4 10.1-34.9 25.1-63.3 25.1zm110.9 58.4h73.9V431.6l93.8 144.7h86.8L2940.6 423l98.6-127h-83.1l-90 117.9v-225h-73.9v387.4z"
                    })
                )
            ),
            Hn(
                "div",
                null,
                Hn(
                    "div",
                    null,
                    Hn(
                        "noscript",
                        null,
                        "You need to enable JavaScript to run this app."
                    ),
                    Hn(
                        "div",
                        {
                            id: "root"
                        },
                        Hn(
                            "div",
                            null,
                            Hn(
                                "div",
                                {
                                    class: "container-fluid fixed-top",
                                    id: "my\u5bfc\u822a\u680f"
                                },
                                Hn(
                                    "nav",
                                    {
                                        class:
                                            "navbar navbar-default navbar navbar-expand-sm bg-light navbar-light",
                                        role: "navigation"
                                    },
                                    Hn(
                                        "div",
                                        null,
                                        Hn(
                                            "a",
                                            {
                                                class:
                                                    "navbar-brand mui-btn mui-btn-primary mui-btn-outlined",
                                                href: "#/"
                                            },
                                            "masx200\u7684",
                                            Hn("hr", {
                                                id: "hidewidthless500"
                                            }),
                                            "github\u4e3b\u9875"
                                        ),
                                        Hn(
                                            "button",
                                            {
                                                class: "navbar-toggler",
                                                type: "button",
                                                "data-toggle": "collapse"
                                            },
                                            Hn("span", {
                                                class: "navbar-toggler-icon"
                                            })
                                        )
                                    ),
                                    Hn(
                                        "div",
                                        {
                                            class: "collapse navbar-collapse",
                                            id: "example-navbar-collapse",
                                            style: "display: none;"
                                        },
                                        Hn(
                                            "ul",
                                            {
                                                class: "nav navbar-nav",
                                                id: "allnavbar"
                                            },
                                            Hn(
                                                "li",
                                                {
                                                    id: "mynav1"
                                                },
                                                Hn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href: "#/react-home"
                                                    },
                                                    "\u57fa\u4e8eREACT\u7684\u4e3b\u9875"
                                                )
                                            ),
                                            Hn(
                                                "li",
                                                null,
                                                Hn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href:
                                                            "#/react-rssreader"
                                                    },
                                                    "rss\u9605\u8bfb"
                                                )
                                            ),
                                            Hn(
                                                "li",
                                                {
                                                    id: "mynav2"
                                                },
                                                Hn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href: "#/react-about"
                                                    },
                                                    "\u5173\u4e8eREACT"
                                                )
                                            ),
                                            Hn(
                                                "li",
                                                {
                                                    class: "nav-item"
                                                },
                                                Hn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href: "#/picalc"
                                                    },
                                                    "\u5706\u5468\u7387\u8ba1\u7b97\u591a\u7ebf\u7a0b"
                                                )
                                            ),
                                            Hn(
                                                "li",
                                                null,
                                                Hn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href: "#/react-huami"
                                                    },
                                                    "\u82b1\u5bc6\u7f51\u9875\u7248"
                                                )
                                            ),
                                            Hn(
                                                "li",
                                                null,
                                                Hn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href: "#/decoder"
                                                    },
                                                    "JSfuck-and-hieroglyphy-Decoder"
                                                )
                                            ),
                                            Hn(
                                                "li",
                                                null,
                                                Hn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href: "#/jsfuck"
                                                    },
                                                    "JSfuck-ENCODER"
                                                )
                                            ),
                                            Hn(
                                                "li",
                                                null,
                                                Hn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href: "#/hieroglyphy"
                                                    },
                                                    "hieroglyphy-ENCODER"
                                                )
                                            ),
                                            Hn(
                                                "li",
                                                null,
                                                Hn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href:
                                                            "#/webpack-react-vue-spa-awesome-config"
                                                    },
                                                    "webpack-react-vue-\n                                                \u6781\u901f\u96f6\u914d\u7f6e\u7684\u5355\u9875\u9762 web\n                                                \u5e94\u7528\u6253\u5305\u5de5\u5177"
                                                )
                                            ),
                                            Hn(
                                                "li",
                                                {
                                                    class: "nav-item"
                                                },
                                                Hn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href:
                                                            "#/IMPORTCJSAMDUMD\u52a8\u6001\u5f02\u6b65\u52a0\u8f7d"
                                                    },
                                                    "\u52a8\u6001\u5f02\u6b65\u52a0\u8f7d-commonjs\u548cumd\u548camd\u6a21\u5757\u5e93"
                                                )
                                            ),
                                            Hn(
                                                "li",
                                                {
                                                    class: "nav-item"
                                                },
                                                Hn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href:
                                                            "#/react-simple-global-state-store-hook"
                                                    },
                                                    "\u9002\u7528\u4e8eReact\u7684\u6781\u7b80\u5168\u5c40\u72b6\u6001\u7ba1\u7406\u5e93"
                                                )
                                            ),
                                            Hn(
                                                "li",
                                                {
                                                    class: "nav-item"
                                                },
                                                Hn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href:
                                                            "#/excellent-vscode-extensions-for-javascript"
                                                    },
                                                    "VScode\u7684\u4f18\u79c0\u6269\u5c55\u63a8\u8350"
                                                )
                                            ),
                                            Hn(
                                                "li",
                                                {
                                                    class: "nav-item"
                                                },
                                                Hn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href:
                                                            "#/vue-simple-global-state-store-manager"
                                                    },
                                                    "\u9002\u7528\u4e8eVue\u7684\u6781\u7b80\u5168\u5c40\u72b6\u6001\u7ba1\u7406\u5e93"
                                                )
                                            ),
                                            Hn(
                                                "li",
                                                null,
                                                Hn(
                                                    "a",
                                                    {
                                                        href:
                                                            "./my-vue-router-project/index.html",
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined"
                                                    },
                                                    "\u57fa\u4e8evue\u7684\u4e3b\u9875"
                                                )
                                            ),
                                            Hn(
                                                "li",
                                                null,
                                                Hn(
                                                    "a",
                                                    {
                                                        href:
                                                            "./my-vue-router-project/index.html#/about",
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined"
                                                    },
                                                    "\u5173\u4e8eVue"
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            Hn(
                                "div",
                                {
                                    class: "container",
                                    id: "my\u4e3b\u4f53",
                                    style: "padding-top: 127.6px;"
                                },
                                Hn(
                                    "div",
                                    {
                                        class: "hello flowerpassword"
                                    },
                                    Hn(
                                        "h1",
                                        null,
                                        "\u82b1\u5bc6 \u4e0d\u4e00\u6837\u7684\u5bc6\u7801\u7ba1\u7406\u5de5\u5177"
                                    ),
                                    Hn(
                                        "div",
                                        {
                                            id: "rong1",
                                            class: "container",
                                            style: "text-align: center;"
                                        },
                                        Hn(
                                            "div",
                                            {
                                                id: "rong2"
                                            },
                                            Hn(
                                                "h2",
                                                null,
                                                Hn("span", null, "1"),
                                                "\u8f93\u5165"
                                            ),
                                            Hn(
                                                "div",
                                                {
                                                    id: "input"
                                                },
                                                Hn("p", null),
                                                Hn(
                                                    "h3",
                                                    null,
                                                    "\u8bb0\u5fc6\u5bc6\u7801"
                                                ),
                                                Hn("p", null),
                                                Hn(
                                                    "p",
                                                    null,
                                                    Hn("input", {
                                                        "*ref": inputref,
                                                        "@change": e =>
                                                            console.log(
                                                                e,
                                                                inputref
                                                            ),
                                                        "@input": e =>
                                                            console.log(e),
                                                        id: "password",
                                                        placeholder:
                                                            "\u8f93\u5165\u5bc6\u7801",
                                                        name: "password",
                                                        type: "password",
                                                        tabindex: "1",
                                                        class:
                                                            "col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control",
                                                        value: ""
                                                    })
                                                ),
                                                Hn("p", null),
                                                Hn("span", null, "+"),
                                                Hn(
                                                    "h3",
                                                    null,
                                                    "\u533a\u5206\u4ee3\u53f7"
                                                ),
                                                Hn("p", null),
                                                Hn(
                                                    "p",
                                                    null,
                                                    Hn("input", {
                                                        "*ref": inputref2,
                                                        "*value": inputpassword,
                                                        "@input": e =>
                                                            console.log(e),
                                                        id: "key",
                                                        placeholder:
                                                            "\u8f93\u5165\u4ee3\u53f7",
                                                        name: "key",
                                                        type: "text",
                                                        tabindex: "2",
                                                        class:
                                                            "col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control",
                                                        value: ""
                                                    })
                                                )
                                            ),
                                            Hn("br", null),
                                            Hn("p", null),
                                            Hn(
                                                "h2",
                                                null,
                                                Hn("span", null, "2"),
                                                "\u83b7\u53d6"
                                            ),
                                            Hn("p", null),
                                            Hn(
                                                "div",
                                                {
                                                    id: "get"
                                                },
                                                Hn("p", {
                                                    id: "tuijian"
                                                }),
                                                Hn("p", null),
                                                Hn(
                                                    "h3",
                                                    null,
                                                    "\u6700\u7ec8\u5bc6\u7801"
                                                ),
                                                Hn("p", null),
                                                Hn(
                                                    "span",
                                                    {
                                                        id: "myhezi"
                                                    },
                                                    Hn(
                                                        "p",
                                                        null,
                                                        Hn("input", {
                                                            id:
                                                                "cod222222222222e16",
                                                            readonly: "",
                                                            class:
                                                                "col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control",
                                                            value: ""
                                                        })
                                                    ),
                                                    Hn("br", null),
                                                    Hn(
                                                        "p",
                                                        null,
                                                        Hn(
                                                            "button",
                                                            {
                                                                id:
                                                                    "copycode16",
                                                                "data-clipboard-target":
                                                                    "#code16",
                                                                class:
                                                                    "btn btn-lg btn copycode16d btn-info",
                                                                style:
                                                                    "width: 100%;"
                                                            },
                                                            "\u70b9\u51fb\u590d\u5236"
                                                        )
                                                    )
                                                ),
                                                Hn(
                                                    "p",
                                                    null,
                                                    Hn(
                                                        "span",
                                                        {
                                                            id: "copyOK",
                                                            style:
                                                                "display: none;"
                                                        },
                                                        "\u221a\u590d\u5236\u6210\u529f"
                                                    )
                                                ),
                                                Hn("p", null)
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    Hn("script", {
                        type: "text/javascript",
                        src:
                            "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/bundle.runtime~main.3a15bebb435b0d3fead6.js"
                    }),
                    Hn("script", {
                        type: "text/javascript",
                        src:
                            "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/chunk.vendors~main.f7c5ea92c1b78a8ff211.js"
                    }),
                    Hn("script", {
                        type: "text/javascript",
                        src:
                            "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/chunk.main.b9c7ffd191cff11a9b96.js"
                    })
                ),
                Hn(
                    "div",
                    {
                        contenteditable: false
                    },
                    "\u4e0d\u53ef\u4ee5\u7f16\u8f91\u7684\u533a\u57df"
                ),
                Hn(
                    "div",
                    {
                        contenteditable: true
                    },
                    "\u53ef\u4ee5\u7f16\u8f91\u7684\u533a\u57df"
                )
            ),
            Hn(
                "h1",
                null,
                Hn(
                    "svg",
                    {
                        xmlns: "http://www.w3.org/2000/svg",
                        "xmlns:xlink": "http://www.w3.org/1999/xlink",
                        version: "1.1",
                        baseProfile: "full",
                        style: "\n      width:600px;\n      height: 600px;\n  "
                    },
                    Hn(
                        "g",
                        {
                            "fill-opacity": "0.7",
                            stroke: "black",
                            "stroke-width": "0.1cm"
                        },
                        Hn("circle", {
                            cx: "6cm",
                            cy: "2cm",
                            r: "100",
                            fill: "red",
                            transform: "translate(0,50)"
                        }),
                        Hn("circle", {
                            cx: "6cm",
                            cy: "2cm",
                            r: "100",
                            fill: "blue",
                            transform: "translate(70,150)"
                        }),
                        Hn("circle", {
                            cx: "6cm",
                            cy: "2cm",
                            r: "100",
                            fill: "green",
                            transform: "translate(-70,150)"
                        })
                    )
                ),
                Hn(
                    "svg",
                    {
                        style: "\n      width: 100%;\n      height: 200px;\n  ",
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 3046.7 875.7"
                    },
                    Hn("title", null, "logo-on-dark-bg"),
                    Hn("rect", {
                        Color: "#FFF",
                        x: "0",
                        y: "0",
                        width: "3046.7",
                        height: "875.7"
                    }),
                    Hn("path", {
                        fill: "#FFF",
                        d:
                            "M387 0l387 218.9v437.9L387 875.7 0 656.8V218.9L387 0z"
                    }),
                    Hn("path", {
                        fill: "#8ED6FB",
                        d:
                            "M704.9 641.7L399.8 814.3V679.9l190.1-104.6 115 66.4zm20.9-18.9V261.9l-111.6 64.5v232l111.6 64.4zM67.9 641.7L373 814.3V679.9L182.8 575.3 67.9 641.7zM47 622.8V261.9l111.6 64.5v232L47 622.8zm13.1-384.3L373 61.5v129.9L172.5 301.7l-1.6.9-110.8-64.1zm652.6 0l-312.9-177v129.9l200.5 110.2 1.6.9 110.8-64z"
                    }),
                    Hn("path", {
                        fill: "#1C78C0",
                        d:
                            "M373 649.3L185.4 546.1V341.8L373 450.1v199.2zm26.8 0l187.6-103.1V341.8L399.8 450.1v199.2zM198.1 318.2l188.3-103.5 188.3 103.5-188.3 108.7-188.3-108.7z"
                    }),
                    Hn("path", {
                        fill: "#F5FAFA",
                        d:
                            "M1164.3 576.3h82.5l84.1-280.2h-80.4l-49.8 198.8-53.1-198.8H1078l-53.6 198.8-49.3-198.8h-80.4l83.6 280.2h82.5l52-179.5 51.5 179.5zM1335.2 437c0 84.1 57.3 146.3 147.4 146.3 69.7 0 107.2-41.8 117.9-61.6l-48.8-37c-8 11.8-30 34.3-68.1 34.3-41.3 0-71.3-26.8-72.9-64.3H1608c.5-5.4.5-10.7.5-16.1 0-91.6-49.3-149.5-136.1-149.5-79.9 0-137.2 63.2-137.2 147.9zm77.7-30.6c3.2-32.1 25.7-56.8 60.6-56.8 33.8 0 58.4 22.5 60 56.8h-120.6zm223.5 169.9h69.7v-28.9c7.5 9.1 35.4 35.9 83.1 35.9 80.4 0 137.2-60.5 137.2-146.8 0-86.8-52.5-147.3-132.9-147.3-48.2 0-76.1 26.8-83.1 36.4V188.9h-73.9v387.4h-.1zm71.8-139.3c0-52.5 31.1-82.5 71.8-82.5 42.9 0 71.8 33.8 71.8 82.5 0 49.8-30 80.9-71.8 80.9-45 0-71.8-36.5-71.8-80.9zm247 239.5h73.9V547.3c7 9.1 34.8 35.9 83.1 35.9 80.4 0 132.9-60.5 132.9-147.3 0-85.7-56.8-146.8-137.2-146.8-47.7 0-75.6 26.8-83.1 36.4V296h-69.7v380.5h.1zm71.8-241.1c0-44.5 26.8-80.9 71.8-80.9 41.8 0 71.8 31.1 71.8 80.9 0 48.8-28.9 82.5-71.8 82.5-40.7 0-71.8-30-71.8-82.5zm231.5 54.1c0 58.9 48.2 93.8 105 93.8 32.2 0 53.6-9.6 68.1-25.2l4.8 18.2h65.4V398.9c0-62.7-26.8-109.8-116.8-109.8-42.9 0-85.2 16.1-110.4 33.2l27.9 50.4c20.9-10.7 46.6-19.8 74.5-19.8 32.7 0 50.9 16.6 50.9 41.3v18.2c-10.2-7-32.2-15.5-60.6-15.5-65.4-.1-108.8 37.4-108.8 92.6zm73.9-2.2c0-23 19.8-39.1 48.2-39.1s48.8 14.5 48.8 39.1c0 23.6-20.4 38.6-48.2 38.6s-48.8-15.5-48.8-38.6zm348.9 30.6c-46.6 0-79.8-33.8-79.8-81.4 0-45 29.5-82 77.2-82 31.6 0 53.1 15.5 65.4 26.8l20.9-62.2c-18.2-13.9-47.2-30-88.4-30-85.2 0-149 62.7-149 147.9s62.2 146.3 149.5 146.3c40.7 0 71.3-17.1 87.3-30l-19.8-60.5c-12.4 10.1-34.9 25.1-63.3 25.1zm110.9 58.4h73.9V431.6l93.8 144.7h86.8L2940.6 423l98.6-127h-83.1l-90 117.9v-225h-73.9v387.4z"
                    })
                )
            )
        ];
        console.log(vdom);
        return vdom;
    });
    mycomapp$1.css = css;
    var vdom$2 = Hn(mycomapp$1);
    un(vdom$2, document.getElementById("root"));
    console.log([Hn, Hn]);
    const vdom$3 = Hn(
        "select",
        {
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
        },
        Hn(
            "option",
            {
                value: "0"
            },
            "- Select version -"
        ),
        Hn(
            "option",
            {
                value: "94b92331-e2f4-40c6-90ee-80e203a4de3a"
            },
            "Windows 10 Insider Preview 18999.1 (vb_release) [arm64]"
        ),
        Hn(
            "option",
            {
                value: "7268dbc9-dfe0-4947-af82-67f384e95cb6"
            },
            "Windows 10 Insider Preview 18999.1 (vb_release) [x64]"
        ),
        Hn(
            "option",
            {
                value: "08f0d32e-c68a-46a8-b301-57e86b4e96e0"
            },
            "Windows 10 Insider Preview 18999.1 (vb_release) [x86]"
        ),
        Hn(
            "option",
            {
                value: "9fa87c7f-75fa-4e5e-9ca3-1e19cb2c743f"
            },
            "Windows 10 Insider Preview 18995.1 (vb_release) [x64]"
        ),
        Hn(
            "option",
            {
                value: "5173796c-11ac-47d7-9ed7-dbad6d5c9486"
            },
            "Windows 10 Insider Preview 18995.1 (vb_release) [x86]"
        ),
        Hn(
            "option",
            {
                value: "4adf5f24-213a-472c-ae94-70f3cb81bade"
            },
            "Windows 10 Insider Preview 18995.1 (vb_release) [arm64]"
        ),
        Hn(
            "option",
            {
                value: "9287fe5e-2cb3-4064-820f-3e336a3ddff4"
            },
            "Windows 10 Insider Preview 18990.1 (vb_release) [arm64]"
        ),
        Hn(
            "option",
            {
                value: "5e420f0d-b3a5-424c-9b55-5c2cf939af14"
            },
            "Windows 10 Insider Preview 18990.1 (vb_release) [x86]"
        ),
        Hn(
            "option",
            {
                value: "13e2104c-c98c-43b2-b232-9b2a4b5af2ac"
            },
            "Windows 10 Insider Preview 18990.1 (vb_release) [x64]"
        )
    );
    const element = document.body.appendChild(
        un(vdom$3, document.createElement("div"))
    );
    console.log([vdom$3, element]);
    console.log([Hn, Hn]);
    const number = Mr(10);
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
    const mycomappclass = Wn(() => {
        Gn(store.number, number => {
            console.log(
                {
                    ...store
                },
                number
            );
        });
        const vdom = Hn(
            "div",
            null,
            Hn("h3", null, " \u70b9\u51fb\u6570\u5b57"),
            Hn("h2", null, "number:", store.number),
            Hn(
                "button",
                {
                    onclick: store.increment
                },
                "increment"
            ),
            Hn(
                "button",
                {
                    onclick: store.decrement
                },
                "decrement"
            )
        );
        return vdom;
    });
    let vdom$4 = [Hn(mycomappclass), Hn(mycomappclass), Hn(mycomappclass)];
    document.body.appendChild(un(vdom$4, document.createElement("div")));
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
    console.log([Hn, Hn]);
    const lirefs = [];
    const temp$ref = fr();
    const check = Mr(false);
    const check2 = Mr(true);
    Gn(check2, a => console.log(a));
    const check3 = Mr(true);
    Gn(check3, a => console.log(a));
    const check4 = Mr(true);
    Gn(check4, a => console.log(a));
    const notcheck = ar(
        check,
        a => !a,
        v => {
            console.log(notcheck, check, v);
            check.value = !v;
        }
    );
    var list = Array(10)
        .fill(undefined)
        .map((v, i) => i);
    Gn(check, a => console.log(a));
    Gn(notcheck, a => console.log(a));
    var vdom$5 = Hn(
        "",
        null,
        Hn("input", {
            type: "radio",
            $checked: check4,
            name: "myname1"
        }),
        Hn("input", {
            type: "radio",
            $checked: check3,
            name: "myname1"
        }),
        Hn("input", {
            type: "radio",
            $checked: check2,
            name: "myname2"
        }),
        Hn("input", {
            type: "radio",
            $checked: check4,
            name: "myname2"
        }),
        [
            Hn("input", {
                type: "checkbox",
                $checked: check
            }),
            Hn("input", {
                type: "checkbox",
                $checked: notcheck
            }),
            Hn(
                "",
                null,
                Hn(
                    "ul",
                    null,
                    list.map((a, index) =>
                        Hn(
                            "li",
                            {
                                $ref: ele => {
                                    lirefs[index] = ele;
                                    lirefs.length = list.length;
                                }
                            },
                            "item",
                            a
                        )
                    )
                ),
                Hn(
                    "header",
                    {
                        class: "common-header fixed noborder floating",
                        id: "git-header-nav",
                        $ref: temp$ref
                    },
                    Hn(
                        "div",
                        {
                            class: "ui container"
                        },
                        Hn(
                            "div",
                            {
                                class: "ui menu header-menu"
                            },
                            Hn(
                                "div",
                                {
                                    class: "git-nav-expand-bar"
                                },
                                Hn("i", {
                                    class: "iconfont icon-mode-table"
                                })
                            ),
                            Hn(
                                "div",
                                {
                                    class: "gitee-nav__sidebar"
                                },
                                Hn(
                                    "div",
                                    {
                                        class: "gitee-nav__sidebar-container"
                                    },
                                    Hn(
                                        "div",
                                        {
                                            class: "gitee-nav__sidebar-top"
                                        },
                                        Hn(
                                            "div",
                                            {
                                                class: "gitee-nav__avatar-box"
                                            },
                                            Hn(
                                                "a",
                                                {
                                                    href: "/masx200",
                                                    onclick: e =>
                                                        e.preventDefault()
                                                },
                                                Hn("img", {
                                                    alt: "1081296_masx200",
                                                    class:
                                                        "ui avatar image masx200-avatar",
                                                    src:
                                                        "https://avatar.gitee.com/uploads/96/1081296_masx200.png?1566294318"
                                                })
                                            )
                                        ),
                                        Hn(
                                            "div",
                                            {
                                                class: "gitee-nav__info-box"
                                            },
                                            Hn(
                                                "a",
                                                {
                                                    href: "/masx200"
                                                },
                                                "masx200"
                                            )
                                        )
                                    ),
                                    Hn(
                                        "div",
                                        {
                                            class: "gitee-nav__sidebar-middle"
                                        },
                                        Hn(
                                            "div",
                                            {
                                                class: "gitee-nav__sidebar-list"
                                            },
                                            Hn(
                                                "ul",
                                                null,
                                                Hn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Hn(
                                                        "a",
                                                        {
                                                            href: "/masx200"
                                                        },
                                                        Hn("i", {
                                                            class:
                                                                "iconfont icon-ic-dashboard"
                                                        }),
                                                        Hn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u4e2a\u4eba\u4e3b\u9875"
                                                        )
                                                    )
                                                ),
                                                Hn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Hn(
                                                        "a",
                                                        {
                                                            href: "/explore"
                                                        },
                                                        Hn("i", {
                                                            class:
                                                                "iconfont icon-ic-discover"
                                                        }),
                                                        Hn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u5f00\u6e90\u8f6f\u4ef6"
                                                        )
                                                    )
                                                ),
                                                Hn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Hn(
                                                        "a",
                                                        {
                                                            href: "/gists"
                                                        },
                                                        Hn("i", {
                                                            class:
                                                                "iconfont icon-ic-gists1"
                                                        }),
                                                        Hn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u4ee3\u7801\u7247\u6bb5"
                                                        )
                                                    )
                                                ),
                                                Hn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Hn(
                                                        "a",
                                                        {
                                                            href: "/enterprises"
                                                        },
                                                        Hn("i", {
                                                            class:
                                                                "iconfont icon-ic-enterprise"
                                                        }),
                                                        Hn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u4f01\u4e1a\u7248"
                                                        )
                                                    )
                                                ),
                                                Hn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Hn(
                                                        "a",
                                                        {
                                                            href: "/education"
                                                        },
                                                        Hn("i", {
                                                            class:
                                                                "iconfont icon-ic-education"
                                                        }),
                                                        Hn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u9ad8\u6821\u7248"
                                                        )
                                                    )
                                                ),
                                                Hn("li", {
                                                    class:
                                                        "gitee-nav__sidebar-item split-line"
                                                }),
                                                Hn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Hn(
                                                        "a",
                                                        {
                                                            href: "/search"
                                                        },
                                                        Hn("i", {
                                                            class:
                                                                "iconfont icon-ic-search"
                                                        }),
                                                        Hn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u641c\u7d22"
                                                        )
                                                    )
                                                ),
                                                Hn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Hn(
                                                        "a",
                                                        {
                                                            href: "/help"
                                                        },
                                                        Hn("i", {
                                                            class:
                                                                "iconfont icon-help-circle"
                                                        }),
                                                        Hn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u5e2e\u52a9\u4e2d\u5fc3"
                                                        )
                                                    )
                                                ),
                                                Hn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Hn(
                                                        "a",
                                                        {
                                                            href: "/terms"
                                                        },
                                                        Hn("i", {
                                                            class:
                                                                "iconfont icon-file"
                                                        }),
                                                        Hn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u4f7f\u7528\u6761\u6b3e"
                                                        )
                                                    )
                                                ),
                                                Hn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Hn(
                                                        "a",
                                                        {
                                                            href: "/about_us"
                                                        },
                                                        Hn("i", {
                                                            class:
                                                                "iconfont icon-issuepx"
                                                        }),
                                                        Hn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u5173\u4e8e\u6211\u4eec"
                                                        )
                                                    )
                                                ),
                                                Hn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Hn(
                                                        "a",
                                                        {
                                                            href: "/profile"
                                                        },
                                                        Hn("i", {
                                                            class:
                                                                "iconfont icon-edit"
                                                        }),
                                                        Hn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u8bbe\u7f6e"
                                                        )
                                                    )
                                                ),
                                                Hn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Hn(
                                                        "a",
                                                        {
                                                            href: "/logout",
                                                            "data-method":
                                                                "delete",
                                                            rel: "nofollow"
                                                        },
                                                        Hn("i", {
                                                            class:
                                                                "iconfont icon-ic-logout"
                                                        }),
                                                        Hn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u9000\u51fa"
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    ),
                                    Hn(
                                        "div",
                                        {
                                            class: "gitee-nav__sidebar-bottom"
                                        },
                                        Hn(
                                            "div",
                                            {
                                                class:
                                                    "gitee-nav__sidebar-close-button"
                                            },
                                            Hn("i", {
                                                class: "fa fa-angle-double-left"
                                            })
                                        )
                                    )
                                )
                            ),
                            Hn(
                                "div",
                                {
                                    class: "item gitosc-logo"
                                },
                                Hn(
                                    "a",
                                    {
                                        href: "/"
                                    },
                                    Hn("img", {
                                        class: "ui inline image",
                                        height: "28",
                                        src:
                                            "https://gitee.com//logo.svg?20171024",
                                        width: "95"
                                    }),
                                    Hn("img", {
                                        class: "ui inline black image",
                                        height: "28",
                                        src:
                                            "https://gitee.com//logo-black.svg?20171024",
                                        width: "95"
                                    })
                                )
                            ),
                            Hn(
                                "a",
                                {
                                    href: "/explore",
                                    class: "item ",
                                    title: "\u5f00\u6e90\u8f6f\u4ef6"
                                },
                                "\u5f00\u6e90\u8f6f\u4ef6"
                            ),
                            Hn(
                                "a",
                                {
                                    href: "/enterprises",
                                    class: "item ",
                                    title: "\u4f01\u4e1a\u7248"
                                },
                                "\u4f01\u4e1a\u7248",
                                Hn(
                                    "sup",
                                    {
                                        class: "ui red label"
                                    },
                                    "\u7279\u60e0"
                                )
                            ),
                            Hn(
                                "a",
                                {
                                    href: "/education",
                                    class: "item ",
                                    title: "\u9ad8\u6821\u7248"
                                },
                                "\u9ad8\u6821\u7248"
                            ),
                            Hn(
                                "a",
                                {
                                    href: "https://blog.gitee.com/",
                                    class: "item",
                                    id: "gitee-blog",
                                    target: "_blank",
                                    title: "\u535a\u5ba2"
                                },
                                "\u535a\u5ba2"
                            ),
                            Hn(
                                "div",
                                {
                                    class: "dropdown item ui",
                                    id: "my-gitee-dropdown",
                                    tabindex: "0"
                                },
                                Hn(
                                    "a",
                                    {
                                        href: "/masx200/dashboard"
                                    },
                                    "\u6211\u7684\u7801\u4e91"
                                ),
                                Hn("i", {
                                    class: "dropdown icon"
                                }),
                                Hn(
                                    "div",
                                    {
                                        class: "menu transition hidden",
                                        tabindex: "-1"
                                    },
                                    Hn(
                                        "div",
                                        {
                                            class: "header user-projects"
                                        },
                                        Hn(
                                            "a",
                                            {
                                                href: "/masx200/projects",
                                                class: "pull-right",
                                                target: "_blank"
                                            },
                                            "\u5168\u90e8"
                                        ),
                                        "\u4ed3\u5e93",
                                        Hn(
                                            "span",
                                            {
                                                class: "count"
                                            },
                                            "(11)"
                                        )
                                    ),
                                    Hn(
                                        "a",
                                        {
                                            target: "_blank",
                                            href: "/masx200/mvvm-reactive-view",
                                            title: "masx200/mvvm-reactive-view",
                                            class: "item"
                                        },
                                        "masx200/mvvm-reactive-view"
                                    ),
                                    Hn(
                                        "a",
                                        {
                                            target: "_blank",
                                            href:
                                                "/masx200/webpack-react-vue-spa-awesome-config",
                                            title:
                                                "masx200/webpack-react-vue-spa-awesome-config",
                                            class: "item"
                                        },
                                        "masx200/webpack-react-vue-spa-awesome-config"
                                    ),
                                    Hn(
                                        "a",
                                        {
                                            target: "_blank",
                                            href:
                                                "/masx200/custom-elements-random-define",
                                            title:
                                                "masx200/custom-elements-random-define",
                                            class: "item"
                                        },
                                        "masx200/custom-elements-random-define"
                                    ),
                                    Hn(
                                        "a",
                                        {
                                            target: "_blank",
                                            href: "/masx200/importcjsamdumd",
                                            title: "masx200/importcjsamdumd",
                                            class: "item"
                                        },
                                        "masx200/importcjsamdumd"
                                    ),
                                    Hn(
                                        "a",
                                        {
                                            target: "_blank",
                                            href:
                                                "/masx200/dom-element-attribute-agent-proxy",
                                            title:
                                                "masx200/dom-element-attribute-agent-proxy",
                                            class: "item"
                                        },
                                        "masx200/dom-element-attribute-agent-proxy"
                                    )
                                )
                            ),
                            Hn(
                                "div",
                                {
                                    class: "center responsive-logo"
                                },
                                Hn(
                                    "a",
                                    {
                                        href: "/"
                                    },
                                    Hn("img", {
                                        class: "ui inline image",
                                        height: "24",
                                        src:
                                            "https://gitee.com//logo.svg?20171024",
                                        width: "85"
                                    }),
                                    Hn("img", {
                                        class: "ui inline black image",
                                        height: "24",
                                        src:
                                            "https://gitee.com//logo-black.svg?20171024",
                                        width: "85"
                                    })
                                )
                            ),
                            Hn(
                                "div",
                                {
                                    class: "right menu userbar",
                                    id: "git-nav-user-bar"
                                },
                                Hn(
                                    "div",
                                    {
                                        class: "item git-nav-search-item"
                                    },
                                    Hn(
                                        "form",
                                        {
                                            "accept-charset": "UTF-8",
                                            action: "/search",
                                            autocomplete: "on",
                                            "data-text-filter":
                                                "\u641c\u7d22\u683c\u5f0f\u4e0d\u6b63\u786e",
                                            "data-text-require":
                                                "\u641c\u7d22\u5173\u952e\u5b57\u4e0d\u80fd\u5c11\u4e8e1\u4e2a",
                                            id: "navbar-search-form",
                                            method: "get"
                                        },
                                        Hn(
                                            "div",
                                            {
                                                style:
                                                    "margin:0;padding:0;display:inline"
                                            },
                                            Hn("input", {
                                                name: "utf8",
                                                type: "hidden",
                                                value: "\u2713"
                                            })
                                        ),
                                        Hn(
                                            "div",
                                            {
                                                class: "ui mini fluid input"
                                            },
                                            Hn("input", {
                                                id: "navbar-search-input",
                                                name: "q",
                                                placeholder:
                                                    "\u641c\u7d22\u9879\u76ee\u3001\u4ee3\u7801\u7247\u6bb5...",
                                                type: "text",
                                                value: ""
                                            }),
                                            Hn("input", {
                                                id: "navbar-search-type",
                                                name: "type",
                                                type: "hidden"
                                            })
                                        )
                                    )
                                ),
                                Hn(
                                    "div",
                                    {
                                        class: "item ui dropdown empty",
                                        "data-count-path":
                                            "/notifications/unread_count",
                                        "data-enable": "",
                                        "data-mark-notice-path":
                                            "/notifications/mark",
                                        id: "notice-dropdown",
                                        tabindex: "0"
                                    },
                                    Hn(
                                        "a",
                                        {
                                            href: "/notifications",
                                            class: "remind-button"
                                        },
                                        Hn("i", {
                                            class: "iconfont icon-remind"
                                        }),
                                        Hn(
                                            "div",
                                            {
                                                class: "notice-count total"
                                            },
                                            "1"
                                        )
                                    ),
                                    Hn(
                                        "div",
                                        {
                                            class:
                                                "notice-dropdown-panel menu transition hidden",
                                            tabindex: "-1",
                                            style: "left: -165px;"
                                        },
                                        Hn(
                                            "div",
                                            {
                                                class:
                                                    "notice-dropdown-panel-header"
                                            },
                                            Hn(
                                                "div",
                                                {
                                                    class: "tab",
                                                    "data-data-path":
                                                        "/notifications/notices?scope=referer",
                                                    "data-html-path":
                                                        "/notifications/referer",
                                                    "data-scope": "referer"
                                                },
                                                Hn(
                                                    "div",
                                                    {
                                                        class: "content"
                                                    },
                                                    "@ \u6211",
                                                    Hn("div", {
                                                        class:
                                                            "notice-count referer"
                                                    })
                                                )
                                            ),
                                            Hn(
                                                "div",
                                                {
                                                    class: "tab active",
                                                    "data-data-path":
                                                        "/notifications/notices?scope=infos",
                                                    "data-html-path":
                                                        "/notifications/infos",
                                                    "data-scope": "infos"
                                                },
                                                Hn(
                                                    "div",
                                                    {
                                                        class: "content"
                                                    },
                                                    "\u901a\u77e5",
                                                    Hn(
                                                        "div",
                                                        {
                                                            class:
                                                                "notice-count infos"
                                                        },
                                                        "1"
                                                    )
                                                )
                                            ),
                                            Hn(
                                                "div",
                                                {
                                                    class: "tab",
                                                    "data-data-path":
                                                        "/notifications/notices?scope=messages",
                                                    "data-html-path":
                                                        "/notifications/messages",
                                                    "data-scope": "messages"
                                                },
                                                Hn(
                                                    "div",
                                                    {
                                                        class: "content"
                                                    },
                                                    "\u79c1\u4fe1",
                                                    Hn("div", {
                                                        class:
                                                            "notice-count messages"
                                                    })
                                                )
                                            )
                                        ),
                                        Hn(
                                            "div",
                                            {
                                                class:
                                                    "item notice-dropdown-panel-container"
                                            },
                                            Hn(
                                                "div",
                                                {
                                                    class:
                                                        "ui dimmer over active"
                                                },
                                                Hn("div", {
                                                    class: "ui loader"
                                                })
                                            ),
                                            Hn(
                                                "div",
                                                {
                                                    class: "notice-list",
                                                    style: "min-height: auto;"
                                                },
                                                Hn(
                                                    "a",
                                                    {
                                                        class: "noti",
                                                        href:
                                                            "/masx200/mvvm-reactive-view",
                                                        target: "_blank",
                                                        "data-type": "project",
                                                        "data-id": "50555275"
                                                    },
                                                    Hn(
                                                        "div",
                                                        {
                                                            class: "title"
                                                        },
                                                        "\u4f60\u7684\u4ed3\u5e93 masx200/mvvm-reactive-view \u5df2\u7ecf\u4ece https://github.com/masx200/mvvm-reactive-view.git \u540c\u6b65\u6210\u529f"
                                                    ),
                                                    Hn(
                                                        "div",
                                                        {
                                                            class: "meta"
                                                        },
                                                        Hn(
                                                            "time",
                                                            {
                                                                class: "timeago"
                                                            },
                                                            "2\u5c0f\u65f6\u524d"
                                                        ),
                                                        " ",
                                                        "\xb7",
                                                        " ",
                                                        Hn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "namespace"
                                                            },
                                                            "masx200/mvvm-reactive-view"
                                                        )
                                                    )
                                                )
                                            ),
                                            Hn(
                                                "div",
                                                {
                                                    class:
                                                        "notice-dropdown-panel-blank"
                                                },
                                                "\u6682\u6ca1\u6709\u65b0\u6d88\u606f"
                                            )
                                        ),
                                        Hn(
                                            "div",
                                            {
                                                class:
                                                    "notice-dropdown-panel-footer"
                                            },
                                            Hn(
                                                "div",
                                                {
                                                    class: "action"
                                                },
                                                Hn(
                                                    "div",
                                                    {
                                                        class: "side left"
                                                    },
                                                    Hn(
                                                        "a",
                                                        {
                                                            href:
                                                                "javascript: void(0);",
                                                            class:
                                                                "mark-notices"
                                                        },
                                                        "\u5f53\u524d\u6807\u8bb0\u4e3a\u5df2\u8bfb"
                                                    )
                                                ),
                                                Hn(
                                                    "div",
                                                    {
                                                        class: "side right"
                                                    },
                                                    Hn(
                                                        "a",
                                                        {
                                                            href:
                                                                "/notifications/infos",
                                                            class: "load-all",
                                                            target: "_blank"
                                                        },
                                                        "\u67e5\u770b\u5168\u90e8"
                                                    )
                                                )
                                            )
                                        )
                                    )
                                ),
                                Hn(
                                    "div",
                                    {
                                        class: "ui dropdown link item",
                                        id: "git-nav-create",
                                        tabindex: "0"
                                    },
                                    Hn("i", {
                                        class: "iconfont icon-add-thin"
                                    }),
                                    Hn(
                                        "div",
                                        {
                                            class: "right menu",
                                            tabindex: "-1"
                                        },
                                        Hn(
                                            "a",
                                            {
                                                href: "/projects/new",
                                                class: "item"
                                            },
                                            Hn("i", {
                                                class: "add square icon"
                                            }),
                                            "\u65b0\u5efa\u4ed3\u5e93"
                                        ),
                                        Hn(
                                            "a",
                                            {
                                                href: "/masx200/codes/new",
                                                class: "item"
                                            },
                                            Hn("i", {
                                                class: "code icon"
                                            }),
                                            "\u53d1\u5e03\u4ee3\u7801\u7247\u6bb5"
                                        ),
                                        Hn(
                                            "a",
                                            {
                                                href: "/organizations/new",
                                                class: "item"
                                            },
                                            Hn("i", {
                                                class: "group icon"
                                            }),
                                            "\u521b\u5efa\u7ec4\u7ec7"
                                        ),
                                        Hn(
                                            "a",
                                            {
                                                href: "/enterprises/new",
                                                class: "item"
                                            },
                                            Hn("i", {
                                                class:
                                                    "icon iconfont icon-enterprise"
                                            }),
                                            "\u5f00\u901a\u4f01\u4e1a\u7248"
                                        ),
                                        Hn(
                                            "a",
                                            {
                                                href: "/projects/oauth_github",
                                                class: "item"
                                            },
                                            Hn("i", {
                                                class: "github icon"
                                            }),
                                            "\u4ece GitHub \u5bfc\u5165\u4ed3\u5e93"
                                        )
                                    )
                                ),
                                Hn(
                                    "div",
                                    {
                                        class: "ui dropdown item",
                                        id: "git-nav-user",
                                        tabindex: "0"
                                    },
                                    Hn("img", {
                                        alt: "1081296_masx200",
                                        class: "ui avatar image",
                                        src:
                                            "https://avatar.gitee.com/uploads/96/1081296_masx200.png!avatar30?1566294318"
                                    }),
                                    Hn("i", {
                                        class: "dropdown icon"
                                    }),
                                    Hn(
                                        "div",
                                        {
                                            class: "right menu",
                                            tabindex: "-1"
                                        },
                                        Hn(
                                            "a",
                                            {
                                                href: "/masx200",
                                                class: "item"
                                            },
                                            Hn("i", {
                                                class: "iconfont icon-ic-home"
                                            }),
                                            "\u4e2a\u4eba\u4e3b\u9875"
                                        ),
                                        Hn(
                                            "a",
                                            {
                                                href: "/profile",
                                                class: "item"
                                            },
                                            Hn("div", {
                                                class:
                                                    "mayun-icon my-ic-edit my-ic-edit-dims"
                                            }),
                                            "\u8bbe\u7f6e"
                                        ),
                                        Hn("div", {
                                            class: "divider"
                                        }),
                                        Hn(
                                            "a",
                                            {
                                                href: "/gists",
                                                class: "item"
                                            },
                                            Hn("div", {
                                                class: "iconfont icon-ic-gist"
                                            }),
                                            "\u4ee3\u7801\u7247\u6bb5"
                                        ),
                                        Hn(
                                            "a",
                                            {
                                                href: "https://gitee.com/help",
                                                class: "item",
                                                target: "_blank"
                                            },
                                            Hn("div", {
                                                class:
                                                    "mayun-icon my-ic-help my-ic-help-dims"
                                            }),
                                            "\u5e2e\u52a9"
                                        ),
                                        Hn("div", {
                                            class: "divider"
                                        }),
                                        Hn(
                                            "a",
                                            {
                                                href: "/logout",
                                                class:
                                                    "item destroy-user-session",
                                                "data-method": "delete",
                                                rel: "nofollow"
                                            },
                                            Hn("div", {
                                                class:
                                                    "mayun-icon my-ic-exit my-ic-exit-dims"
                                            }),
                                            "\u9000\u51fa"
                                        )
                                    )
                                ),
                                Hn("script", null)
                            )
                        )
                    )
                )
            )
        ]
    );
    console.log(vdom$5, temp$ref, lirefs);
    document.body.appendChild(un(vdom$5, document.createElement("div")));
    console.log([Hn, Hn]);
    (() => {
        var mystate = Mr(true);
        console.log("mystatetest", mystate);
        var vdom = Jn(mystate, "testtrue", Hn("div", undefined, "testfalese"));
        var vdom2 = Jn(
            mystate,
            undefined,
            Hn("div", undefined, "testwwwwwwwwwfalese")
        );
        var vdom3 = Jn(
            mystate,
            Hn("div", undefined, "testwwwwwwwtrueeeeeeeeee"),
            undefined
        );
        console.log([vdom, vdom2, vdom3]);
        document.body.appendChild(
            un([vdom, vdom2, vdom3], document.createElement("div"))
        );
        var timer = setInterval(() => {
            mystate.value = !mystate.value;
        }, 1e3);
        setTimeout(() => {
            clearInterval(timer);
        }, 1e4);
    })();
    (() => {
        const stylestate = Mr({
            display: "block",
            width: "100%"
        });
        const inputref = fr();
        const state1 = Mr("hello");
        const vdom = [
            Hn(
                "div",
                {
                    style: {
                        display: "block",
                        width: "100%"
                    }
                },
                "hello world!"
            ),
            Hn("input", {
                style: "width:100%",
                "@input": e => (state1.value = e.target.value),
                "*ref": inputref,
                "@change": e => (state1.value = e.target.value),
                id: "co11111111111de16",
                class:
                    "col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control",
                value: state1
            }),
            Hn(
                "h1",
                {
                    style: stylestate
                },
                "mvvm-reactive-view"
            ),
            Hn(
                "button",
                {
                    "@click": () => {
                        stylestate.color = "red";
                    }
                },
                "red"
            ),
            Hn(
                "button",
                {
                    "@click": () => {
                        stylestate.color = "green";
                    }
                },
                "green"
            )
        ];
        Gn(stylestate, console.log);
        Gn(state1, console.log);
        console.log(vdom);
        un(vdom, document.getElementById("app"));
    })();
    (() => {
        const vdom2 = [
            Hn("div", {
                "*text": "<a>\u7ed1\u5b9atextcontent</a>"
            }),
            Hn("div", {
                "*html": "<a>\u7ed1\u5b9ainnerhtml</a>"
            })
        ];
        console.log(vdom2);
        document.body.appendChild(un(vdom2, document.createElement("div")));
        const state1 = Mr("<a>\u7ed1\u5b9atextcontent</a>");
        const state2 = Mr("<a>\u7ed1\u5b9ainnerhtml</a>");
        const vdom3 = [
            Hn("textarea", {
                value: state1,
                "@input": [
                    e => {
                        state1.value = e.target.value;
                    }
                ]
            }),
            Hn("input", {
                value: state2,
                style: "width:100%",
                "@change": [
                    e => {
                        state2.value = e.target.value;
                    }
                ],
                "@input": [
                    e => {
                        state2.value = e.target.value;
                    }
                ]
            })
        ];
        console.log(vdom3);
        document.body.appendChild(un(vdom3, document.createElement("div")));
        const state3 = Mr("<a>\u7ed1\u5b9ainnerhtml</a>");
        const vdom4 = Hn(
            "",
            null,
            Hn("div", {
                $text: state3
            }),
            Hn("div", {
                $html: state3
            }),
            Hn("script", null, " ")
        );
        Gn(state1, state => (state3.value = state));
        Gn(state2, state => (state1.value = state));
        console.log(state3);
        console.log(vdom4);
        document.body.appendChild(un(vdom4, document.createElement("div")));
        const objstate = Mr({
            a: "w",
            6: "xxxxxxx",
            tttttttt: "true"
        });
        const objstate2 = Mr(`{ a: "w", 6: "xxxxxxx", tttttttt: "true" }`);
        console.log(objstate);
        setTimeout(() => {
            objstate.length = 10;
            objstate2.value = 2222222222222;
        }, 2e3);
        const objstatearray = Mr([
            {
                a: "w",
                6: "xxxxxxx",
                tttttttt: "true"
            },
            1,
            true,
            "test"
        ]);
        const stylestate = Mr({
            display: "block",
            width: "100%"
        });
        const classsetstate = Mr(new Set(["xxxxxxx", "wwwwwww", "eeeeeeee"]));
        console.log("classsetstate", classsetstate);
        Gn(classsetstate, a => console.log(a));
        setTimeout(() => {
            classsetstate.add("vvvvvvvvvvv");
        }, 5e3);
        setTimeout(() => {
            classsetstate.delete("eeeeeeee");
        }, 4e3);
        const vdomobj = [
            Hn(
                "div",
                {
                    style: {
                        display: "block",
                        width: "100%"
                    }
                },
                objstate2
            ),
            Hn(
                "div",
                {
                    style: stylestate,
                    class: new Set(["wwwwwww", "eeeeeeee"])
                },
                objstatearray
            ),
            objstate,
            Hn("div", {
                style: stylestate,
                class: classsetstate
            })
        ];
        document.body.appendChild(un(vdomobj, document.createElement("div")));
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
        console.log([objstate2, Mr(objstate2)]);
        console.log(Object.entries(objstate));
    })();
    (() => {
        var vdom = Hn(
            "math",
            null,
            Hn(
                "mrow",
                null,
                Hn(
                    "mrow",
                    null,
                    Hn("msup", null, Hn("mi", null, "a"), Hn("mn", null, "2")),
                    Hn("mo", null, "+"),
                    Hn("msup", null, Hn("mi", null, "b"), Hn("mn", null, "2"))
                ),
                Hn("mo", null, "="),
                Hn("msup", null, Hn("mi", null, "c"), Hn("mn", null, "2"))
            )
        );
        document.body.appendChild(un(vdom, document.createElement("div")));
        console.log(vdom);
    })();
    class Bqqqqqqqqq extends HTMLElement {}
    class Aqqqqqqqqq extends HTMLElement {}
    console.log(customElements, [...customElements]);
    customElements.define("qqqqqqqqqq-----a", Bqqqqqqqqq);
    customElements.define("qqqqqqqqqq-----a", Aqqqqqqqqq);
    document.body.appendChild(
        un([Hn(Bqqqqqqqqq), Hn(Aqqqqqqqqq)], document.createElement("div"))
    );
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
    console.log([Hn, Hn]);
    (() => {
        (() => {
            var _class, _temp;
            var myvdom1111111 = Hn(
                class extends HTMLElement {
                    constructor(...argwwwuments) {
                        super();
                        console.log(argwwwuments);
                    }
                },
                {
                    style: {
                        display: "block"
                    }
                },
                "hhhhhhhhhhhhtests"
            );
            console.log(myvdom1111111);
            document.body.appendChild(
                un(myvdom1111111, document.createElement("div"))
            );
            document.body.appendChild(
                un(
                    Hn(
                        (() => {
                            var Aaaaaaaaaa = class extends HTMLElement {};
                            Aaaaaaaaaa.defaultProps = {
                                name: "HelloKitty",
                                myAge: 18
                            };
                            return Aaaaaaaaaa;
                        })()
                    ),
                    document.createElement("div")
                )
            );
            const myele1 = Hn(
                ((_temp = _class = class extends HTMLElement {}),
                _defineProperty(_class, "defaultProps", {
                    name: "aaaaaaaaaaHelloKitty",
                    myAge: 0x71afd498cfffe
                }),
                _temp)
            );
            console.log(myele1);
            document.body.appendChild(
                un(myele1, document.createElement("div"))
            );
            document.body.appendChild(
                un(myele1, document.createElement("div"))
            );
        })();
    })();
    {
        const vdom = Hn("div", [
            [
                Hn("html", null, "testhtml"),
                Hn("button", {
                    onclick: [
                        console.log,
                        () => {
                            console.log("onclick");
                        }
                    ],
                    "*text": "clicktest",
                    "@click": [
                        console.log,
                        () => {
                            console.log("@click");
                        }
                    ]
                }),
                Hn("style", null)
            ]
        ]);
        document.body.appendChild(un(vdom, document.createElement("div")));
        console.log("onclick", " @click", vdom);
    }
    (async () => {
        const defaultProps = {
            cccccc: "bbbbbbb"
        };
        const css = await (
            await fetch(
                "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-6556dfa9be535e551ffffaadfecdad99.min.css"
            )
        ).text();
        const Hellowordclass = Object.assign(
            () =>
                Hn(
                    "div",
                    ["hello world"],
                    "\u6d4b\u8bd5\u4e0d\u4f7f\u7528createComponent"
                ),
            {
                css: css,
                defaultProps: defaultProps
            }
        );
        const vdom = Hn(Hellowordclass, null);
        let vdom1 = Hn(Hellowordclass);
        document.body.appendChild(
            un([vdom, vdom1], document.createElement("div"))
        );
        console.log([
            "\u6d4b\u8bd5\u4e0d\u4f7f\u7528createComponent",
            Hellowordclass,
            vdom
        ]);
    })();
    (() => {
        const colortext = Mr("red");
        const stylestate = Mr({
            display: "block",
            width: "100%",
            color: colortext
        });
        const vdom = [
            Hn("hr", null),
            Hn(
                "h1",
                {
                    style: stylestate
                },
                "input color ",
                colortext
            ),
            Hn("input", {
                $value: colortext
            }),
            Hn("hr", null)
        ];
        console.log([vdom, colortext, stylestate]);
        Gn([colortext, stylestate], (a, b) =>
            console.log([
                a,
                {
                    ...b
                }
            ])
        );
        document.body.appendChild(un(vdom, document.createElement("div")));
    })();
    (() => {
        const colortext = Mr("blue");
        const stylestate = Mr({
            display: "block",
            width: "100%",
            color: colortext
        });
        const vdom = [
            Hn("hr", null),
            Hn(
                "h1",
                {
                    style: stylestate
                },
                "input color ",
                colortext
            ),
            Hn("input", {
                $value: colortext
            }),
            Hn("hr", null)
        ];
        var inter = setInterval(() => {
            colortext.value =
                "#" + (Math.random() * 16 ** 7).toString(16).slice(0, 6);
        }, 1e3);
        setTimeout(() => {
            clearInterval(inter);
        }, 1e4);
        Gn([colortext, stylestate], (a, b) =>
            console.log([
                a,
                {
                    ...b
                }
            ])
        );
        document.body.appendChild(un(vdom, document.createElement("div")));
    })();
    var css$1 =
        '@import url(https://cdn.staticfile.org/mui/3.7.1/css/mui.min.css);html{color:#444333;background:#fff;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;text-rendering:optimizelegibility}article,aside,blockquote,body,button,code,dd,details,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,input,legend,li,menu,nav,ol,p,pre,section,td,textarea,th,ul{margin:0;padding:0}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}audio,canvas,video{display:inline-block;*display:inline;*zoom:1}body,button,input,select,textarea{font:500 .875em/1.8 Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif}button,input{*width:auto;*overflow:visible;line-height:22px}table{border-collapse:collapse;border-spacing:0}th{text-align:inherit}fieldset,img{border:0}img{-ms-interpolation-mode:bicubic}iframe{display:block}blockquote{font-family:Optima,Georgia,STSong,serif;margin:1em 0;color:#999;padding:.6em 1em;background:#f8f8f8;border-left:.4em solid #ddd}blockquote blockquote{padding:0 0 0 1em;margin-left:2em}abbr,acronym{border-bottom:1px dotted;font-variant:normal}abbr{cursor:help}del{text-decoration:line-through}address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:400}ol,ul{list-style:none}caption,th{text-align:left}q:after,q:before{content:""}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:text-top\\9}:root sub,:root sup{vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}a:hover{text-decoration:underline}a,ins{text-decoration:none}.typo-u,u{text-decoration:underline}mark{background:#fffdd1}code,pre{font-family:Courier New,Courier,monospace;white-space:pre-wrap;word-wrap:break-word}pre{background:#f8f8f8;border:1px solid #ddd;padding:1em 1.5em}hr{border:none;border-bottom:1px solid #cfcfcf;margin-bottom:10px;*color:pink;*filter:chroma(color=pink);height:10px;*margin:-7px 0 2px}.typo-small,figcaption,small{font-size:.9em;color:#888}[draggable]{cursor:move}.clearfix:after,.clearfix:before{content:"";display:table}.clearfix:after{clear:both}.clearfix{zoom:1}.textwrap,.textwrap td,.textwrap th{word-wrap:break-word;word-break:break-all}.textwrap-table{table-layout:fixed}.typo-dl,.typo-form,.typo-hr,.typo-ol,.typo-p,.typo-pre,.typo-table,.typo-ul,.typo dl,.typo form,.typo hr,.typo ol,.typo p,.typo pre,.typo table,.typo ul{margin-bottom:1.2em}h1,h2,h3,h4,h5,h6{font-weight:500;*font-weight:800;font-family:Helvetica Neue,Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif;color:#333}.typo-h1,.typo-h2,.typo-h3,.typo-h4,.typo-h5,.typo-h6,.typo h1,.typo h2,.typo h3,.typo h4,.typo h5,.typo h6{margin-bottom:.4em;line-height:1.5}.typo-h1,.typo h1{font-size:1.8em}.typo-h2,.typo h2{font-size:1.6em}.typo-h3,.typo h3{font-size:1.4em}.typo-h4,.typo h4{font-size:1.2em}.typo-h5,.typo-h6,.typo h5,.typo h6{font-size:1em}.typo-ul,.typo ul{margin-left:1.3em;list-style:disc}.typo-ol,.typo ol{list-style:decimal;margin-left:1.9em}.typo-ol ol,.typo-ol ul,.typo-ul ol,.typo-ul ul,.typo li ol,.typo li ul{margin-top:0;margin-bottom:0;margin-left:2em}.typo-ol ul,.typo-ul ul,.typo li ul{list-style:circle}.typo-table td .typo table caption,.typo-table th,.typo table td,.typo table th{border:1px solid #ddd;padding:.5em 1em;color:#666}.typo-table th,.typo table th{background:#fbfbfb}.typo-table thead th,.typo table thead th{background:#f1f1f1}.typo table .caption{border-bottom:none}.typo-input,.typo-textarea{-webkit-appearance:none;border-radius:0}::-moz-selection{background:#08c;color:#fff}::selection{background:#08c;color:#fff}.typo-em,.typo em,caption,legend{font-weight:700}p{color:#0f0!important}@font-face{font-family:octicons-anchor;src:url(data:font/woff;charset=utf-8;base64,d09GRgABAAAAAAYcAA0AAAAACjQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABMAAAABwAAAAca8vGTk9TLzIAAAFMAAAARAAAAFZG1VHVY21hcAAAAZAAAAA+AAABQgAP9AdjdnQgAAAB0AAAAAQAAAAEACICiGdhc3AAAAHUAAAACAAAAAj//wADZ2x5ZgAAAdwAAADRAAABEKyikaNoZWFkAAACsAAAAC0AAAA2AtXoA2hoZWEAAALgAAAAHAAAACQHngNFaG10eAAAAvwAAAAQAAAAEAwAACJsb2NhAAADDAAAAAoAAAAKALIAVG1heHAAAAMYAAAAHwAAACABEAB2bmFtZQAAAzgAAALBAAAFu3I9x/Nwb3N0AAAF/AAAAB0AAAAvaoFvbwAAAAEAAAAAzBdyYwAAAADP2IQvAAAAAM/bz7t4nGNgZGFgnMDAysDB1Ml0hoGBoR9CM75mMGLkYGBgYmBlZsAKAtJcUxgcPsR8iGF2+O/AEMPsznAYKMwIkgMA5REMOXicY2BgYGaAYBkGRgYQsAHyGMF8FgYFIM0ChED+h5j//yEk/3KoSgZGNgYYk4GRCUgwMaACRoZhDwCs7QgGAAAAIgKIAAAAAf//AAJ4nHWMMQrCQBBF/0zWrCCIKUQsTDCL2EXMohYGSSmorScInsRGL2DOYJe0Ntp7BK+gJ1BxF1stZvjz/v8DRghQzEc4kIgKwiAppcA9LtzKLSkdNhKFY3HF4lK69ExKslx7Xa+vPRVS43G98vG1DnkDMIBUgFN0MDXflU8tbaZOUkXUH0+U27RoRpOIyCKjbMCVejwypzJJG4jIwb43rfl6wbwanocrJm9XFYfskuVC5K/TPyczNU7b84CXcbxks1Un6H6tLH9vf2LRnn8Ax7A5WQAAAHicY2BkYGAA4teL1+yI57f5ysDNwgAC529f0kOmWRiYVgEpDgYmEA8AUzEKsQAAAHicY2BkYGB2+O/AEMPCAAJAkpEBFbAAADgKAe0EAAAiAAAAAAQAAAAEAAAAAAAAKgAqACoAiAAAeJxjYGRgYGBhsGFgYgABEMkFhAwM/xn0QAIAD6YBhwB4nI1Ty07cMBS9QwKlQapQW3VXySvEqDCZGbGaHULiIQ1FKgjWMxknMfLEke2A+IJu+wntrt/QbVf9gG75jK577Lg8K1qQPCfnnnt8fX1NRC/pmjrk/zprC+8D7tBy9DHgBXoWfQ44Av8t4Bj4Z8CLtBL9CniJluPXASf0Lm4CXqFX8Q84dOLnMB17N4c7tBo1AS/Qi+hTwBH4rwHHwN8DXqQ30XXAS7QaLwSc0Gn8NuAVWou/gFmnjLrEaEh9GmDdDGgL3B4JsrRPDU2hTOiMSuJUIdKQQayiAth69r6akSSFqIJuA19TrzCIaY8sIoxyrNIrL//pw7A2iMygkX5vDj+G+kuoLdX4GlGK/8Lnlz6/h9MpmoO9rafrz7ILXEHHaAx95s9lsI7AHNMBWEZHULnfAXwG9/ZqdzLI08iuwRloXE8kfhXYAvE23+23DU3t626rbs8/8adv+9DWknsHp3E17oCf+Z48rvEQNZ78paYM38qfk3v/u3l3u3GXN2Dmvmvpf1Srwk3pB/VSsp512bA/GG5i2WJ7wu430yQ5K3nFGiOqgtmSB5pJVSizwaacmUZzZhXLlZTq8qGGFY2YcSkqbth6aW1tRmlaCFs2016m5qn36SbJrqosG4uMV4aP2PHBmB3tjtmgN2izkGQyLWprekbIntJFing32a5rKWCN/SdSoga45EJykyQ7asZvHQ8PTm6cslIpwyeyjbVltNikc2HTR7YKh9LBl9DADC0U/jLcBZDKrMhUBfQBvXRzLtFtjU9eNHKin0x5InTqb8lNpfKv1s1xHzTXRqgKzek/mb7nB8RZTCDhGEX3kK/8Q75AmUM/eLkfA+0Hi908Kx4eNsMgudg5GLdRD7a84npi+YxNr5i5KIbW5izXas7cHXIMAau1OueZhfj+cOcP3P8MNIWLyYOBuxL6DRylJ4cAAAB4nGNgYoAALjDJyIAOWMCiTIxMLDmZedkABtIBygAAAA==) format("woff")}*{color:purple!important;font-size:50px}@keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@media (max-width:720px){.article-content h1{font-size:24px}.article-content h2{font-size:20px}.article-content h3{font-size:18px}.article-content pre>code .copy-code-btn{display:none}.article-content pre>code.hljs[lang]:before{top:2px;right:15px}}@media (max-width:720px){.article-content pre>code.copyable.hljs[lang]:before{right:1rem}}@media (max-width:500px){hr#hidewidthless500{display:none}}.recommend-container .recommend-user .item{margin-bottom:16px}.recommend-container .recommend-user .ui.button{padding:3px 5px;margin-right:0}.recommend-container .recommend-user .header .pull-right{color:#005980;cursor:pointer}.recommend-container .recommend-user .header .pull-right.disabled{opacity:.7;cursor:default}.recommend-container .recommend-user .icon-reset{margin-top:-1px;height:16px;font-size:16px;margin-right:2px}.recommend-container .recommend-user__content{position:relative}.recommend-container .dimmer.active{z-index:1}.recommend-container .recommend-list__user{-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;margin-right:4px}.recommend-container .recommend-list__user strong{color:#005980}.recommend-container .recommend-list__user .recommend-list__user-info{margin:0 4px 0 8px;max-width:155px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.recommend-container .recommend-list__user .recommend-list__user-info.is-follow{max-width:125px}.recommend-container .recommend-list__user .recommend-list__user-info>div{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.recommend-container .recommend-list__flollow .disable{opacity:.5}.recommend-container .recommend-project .icon-recommended{color:#fe7300}.recommend-container .recommend-project .project-label{display:inline-block}.recommend-container .recommend-project .recommend-list{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.recommend-container .recommend-project .recommend-list>*{word-break:break-all}.recommend-container .recommend-project .recommend-list .recommend-project__describe{overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical}.recommend-container .recommend-project .item{margin-bottom:16px}.recommend-container .recommend-project .recommend-project__name{margin-bottom:4px;color:#005980}.recommend-container .recent_visits .ui.items{margin-right:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.recommend-container .recent_visits .avatar-item{margin-right:-22px!important}.recommend-container .recent_visits .item{width:20%;min-width:0;font-size:16px}.recommend-container .recent_visits .empty-visitor.item{font-size:14px;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1}.dashboard-content.twelve{padding-right:0!important}.dashboard-content .gitee-headbread .git-user-selection-dropdown{margin-right:0!important}.dashboard-content .dashboard-team .git-user-content-header{display:none}.dashboard-content .gitee-headbread{margin-bottom:24px}.dashboard-content .git-dashboard-projects-menu{margin-bottom:24px!important}.dashboard-content .git-dashboard-projects-menu .f-bold{color:#fe7300;border-bottom:2px solid #fe7300!important}.dashboard-content .git-dashboard-projects-menu>a.item{font-size:16px;padding:8px 18px!important}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input{width:150px;margin-right:10px}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input input{margin-top:-6px;font-size:12px;margin-right:10px}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input .icon-search{margin-top:-4px}.dashboard-content #event-timeline-panel h3.event-timeline-title{font-size:16px;margin-top:0;margin-bottom:16px;display:inline-block}.dashboard-content #event-timeline-panel .event-timeline.content{padding:0 0 18px 12px}.dashboard-content #event-timeline-panel .event-actionbar .dropdown.icon{margin-left:4px}.dashboard-content #event-timeline-panel .message-container .message{margin:0 0 1em}.dashboard-content .issues-filter__item{display:block;padding:0!important;color:initial!important;font-weight:500!important}.dashboard-content .issues-dropdown{margin-top:-6px!important}.dashboard-content .issues-dropdown .pl-0.f-bold{padding-left:0!important}.dashboard-content .dashboard-team .dashboard-team_info{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.dashboard-content .dashboard-team .ui.image{width:40px;height:40px;min-width:40px}.dashboard-content .dashboard-team .dashboard-team__contaniner .dashboard-team__name{font-size:16px;font-weight:700;overflow:hidden;word-break:keep-all;text-overflow:ellipsis;display:block}.dashboard-content .dashboard-team .dashboard-team__contaniner a{color:#005980!important}.dashboard-content .dashboard-team .dashboard-team__contaniner>.item:first-child{padding-top:0!important}.dashboard-content .dashboard-team .dashboard-team__contaniner .item{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.dashboard-content .dashboard-team .dashboard-team__contaniner .content{display:-webkit-box!important;display:-webkit-flex!important;display:-moz-box!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;overflow:hidden}.dashboard-content .dashboard-team .dashboard-team__contaniner .content:after{content:none}.dashboard-content .dashboard-team .dashboard-team__contaniner .content i{font-size:16px}.dashboard-content .dashboard-team .icon-enterprise-badge{margin-left:4px}.dashboard-content .dashboard-team .dashboard-team__operate{min-width:75px;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-moz-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.dashboard-content .dashboard-team .dashboard-team__operate.has-exit{min-width:150px}.recommend-project .icon-help-circle{vertical-align:baseline}.dashboard-content__show{width:608px!important;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.ui.container.user_page{width:1240px}#rc-users__container{position:relative}#rc-users__container .secondary-navigation .active{color:#fe7300!important}#rc-users__container .dashboard-content{padding-right:32px;padding-left:32px;padding-top:24px}#rc-users__container .dashboard-sidebar{padding:16px 0 0;width:280px!important;margin-left:10px}#rc-users__container .dashboard-sidebar .dashboard-group .item{margin:8px 0}#rc-users__container .dashboard-sidebar .dashboard-group:last-child{margin-bottom:0!important}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar{padding-top:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .ui.card{width:100%;margin-top:32px;margin-bottom:0;padding-bottom:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .ui.card .header{font-size:16px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name h4{font-size:14px;display:inline-block}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .description{margin-top:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .item.flex{margin-top:16px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .item.flex:first-child{margin-top:12px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .quit i{margin-top:0}#rc-users__container .has-active .content{padding-left:0 2px 0 8px}#rc-users__container .navigation .header{padding-right:8px;border-bottom:1px solid #e3e9ed;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;padding-bottom:4px}#rc-users__container .navigation .header,#rc-users__container .navigation .header .title{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}#rc-users__container .navigation .header .title{font-size:16px}#rc-users__container .navigation .header .avatar.image{margin-right:0}#rc-users__container .navigation .header strong{font-size:16px;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;max-width:120px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#rc-users__container .navigation .header strong a{color:unset}#rc-users__container .navigation .header .actions{margin-top:4px}#rc-users__container .navigation .header .actions i{color:#005980}#rc-users__container .navigation.user i{color:#989dad}#rc-users__container .navigation.user .content{padding:0 8px}#rc-users__container .navigation .items>a{color:#40485b}#rc-users__container .navigation .items>a:hover{color:#095eab}#rc-users__container .navigation .items>a:active{color:#064177}#rc-users__container .navigation .items>a:hover{color:#40485b}#rc-users__container .navigation .item:hover .content{background:#f8f8f8}#rc-users__container .navigation .item .active{color:#fe7300;background:#f8f8f8}#rc-users__container .navigation .item .active .num{color:inherit}#rc-users__container .navigation .item:hover .exit{display:inline-block}#rc-users__container .navigation .icon-add,#rc-users__container .navigation .icon-search{color:#8c92a4!important}#rc-users__container .navigation .num{font-size:12px;font-weight:500;color:#8c92a4}#rc-users__container .navigation .gray{color:#8c92a4}#rc-users__container .navigation .avatar.image{width:32px;height:32px}#rc-users__container .twitter-typeahead{width:100%}#rc-users__container .gray{color:#8c92a4}#rc-users__container .ui.container{width:1240px}#rc-users__container .contribution-events{padding-top:32px}#rc-users__container #git-footer-main{min-width:1240px}#rc-users__container .gitee-headbread .gitee-divider{display:inline-block;opacity:.5;margin:0 .2rem;color:rgba(0,0,0,.4);vertical-align:baseline}#rc-users__container .git-user-content .git-user-content-header{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:16px}#rc-users__container .ui.button.js-project-watch{background:#fff;border:1px solid rgba(140,146,164,.5);padding:2px 5px;margin:0}#rc-users__container .recommend-container{width:248px!important}.users__personal-avatar{position:relative;margin:0 auto 10px;width:160px;height:160px}.users__personal-avatar .over-avatar{position:absolute;top:0;left:0;width:100%;height:100%;color:#fff;font-size:14px;text-align:center;line-height:200px;border:4px solid #eee;border-radius:50%;background:rgba(0,0,0,.5);cursor:pointer;display:none}.users__personal-avatar .over-avatar:hover{display:block}.users__personal-avatar .ui.image.avatar{margin:0;width:100%;height:100%;border:4px solid #eee}.users__personal-avatar .ui.image.avatar:hover+.over-avatar{display:block}.users__personal-avatar .avatar-gender{position:absolute;bottom:2px;right:27px;width:32px;height:32px;border-radius:50%;color:#fff;font-size:21px;text-align:center;line-height:30px;border:2px solid #fff}.users__personal-avatar .avatar-gender.mars{background:#3eb4ff}.users__personal-avatar .avatar-gender.venus{background:#ff5bc6}.users__personal-name{text-align:center}.users__personal-name h2,.users__personal-name p{margin:8px 0 0;word-break:break-all}.users__personal-name h2 span,.users__personal-name p span{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}.users__personal-name .remark-name{color:#8c92a4;font-size:14px;font-weight:400;display:inline}.users__personal-name .ui.small.label{margin-bottom:.5em;padding:.4em .7em;font-weight:400}.users__personal-setting{margin:15px auto;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__personal-setting .ui.button{margin:0;width:45%;font-size:14px}.users__personal-setting .ui.button.basic{border:1px solid #ccc}.users__personal-socials .ui.grid{padding:0 1rem}.users__personal-socials .ui.grid .column{padding:1rem 0;text-align:center}.users__personal-socials .social-count{font-size:18px;font-weight:700}.users__personal-socials .social-name{padding-top:5px;color:#40485b;font-size:12px;display:block}.users__personal-info{padding:15px 0;color:#8c92a4}.users__personal-info .info-item{padding:3px 0;line-height:1.5;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__personal-info .info-item i.iconfont{width:20px;text-align:center}.users__personal-info .info-item i.iconfont.icon-time{font-size:12px}.users__personal-achievement{padding:10px 0}.users__personal-achievement h3{margin:0;padding-bottom:4px;border-bottom:1px solid #dce3e8}.users__personal-achievement .ui.list .item .content{line-height:1.8}.users__personal-achievement .ui.list .item .content .description{color:#7687ab}.users__personal-groups{padding:10px 0}.users__personal-groups h3{margin:0;padding-bottom:4px;border-bottom:1px solid #dce3e8}.users__personal-groups .ui.list{margin:0}.users__personal-groups .ui.list:not(.more-groups){margin-top:1em}.users__personal-groups .ui.list .item{padding:.3em 0}.users__personal-groups .ui.list .item a{color:#005980!important}.users__personal-groups .ui.list .item a:hover{color:#4c8aa6!important}.users__personal-groups .ui.list .item a:active{color:#003e59!important}.users__personal-groups .ui.list .item .content{line-height:1.8;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__personal-groups .ui.list .item .right.floated.content{color:#7687ab}.users__personal-groups .ui.list .item .right.floated.content .mr-1{width:24px;display:inline-block}.users__personal-groups .load-more-groups{margin-top:8px;display:block;color:#7687ab}.users__personal-groups .load-more-groups:hover{color:#9fabc4}.users__personal-groups .load-more-groups:active{color:#525e77}.users__navbar .ui.secondary.pointing.menu{border-bottom:2px solid #dededf}.users__navbar .ui.secondary.pointing.menu>.item{margin-bottom:-2px;padding:10px 30px;min-width:100px;text-align:center;border-width:2px}.users__navbar .ui.secondary.pointing.menu>.item.active{color:#fe7300;border-color:#fe7300}.users__navbar .ui.secondary.pointing.menu>.item.active .ui.label{color:#fe7300;background:rgba(254,115,0,.2)}.users__header{margin-top:2em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__header h3{margin:0}.users__header .ui.dropdown{padding:.5em .92857em}.users__popular-projects .ui.cards{margin:0 -.5em -.5em}.users__popular-projects .ui.cards .ui.card{margin:.5em!important;padding:1em;width:calc(50% - 1em)!important;border:1px solid #dce3e8;-webkit-box-shadow:none;box-shadow:none}.users__popular-projects .ui.cards .ui.card .content{padding:0}.users__popular-projects .ui.cards .ui.card .content .popular-project-title{font-size:16px;word-break:break-all;vertical-align:middle}.users__popular-projects .ui.cards .ui.card .content .git-project-gvp-badge{margin-top:-3px}.users__popular-projects .ui.cards .ui.card .content i.iconfont{font-size:14px}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-mode-table{margin-top:1px;color:#d0d0d0;cursor:move}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-recommended{color:#fe7300;font-weight:400}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-watch{font-size:12px;vertical-align:baseline}.users__popular-projects .ui.cards .ui.card .content .description{color:#8c92a4;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}.users__popular-projects .ui.cards .ui.card .extra.content{padding-top:1em;border:none!important;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__popular-projects .ui.cards .ui.card .extra.content:after{content:none}.users__popular-projects .ui.cards .ui.card .extra.content .left .ui.small.label{padding:.4em .7em}.users__popular-projects .ui.cards .ui.card .extra.content .right a{padding:0 .2em;color:#8c92a4}.users__popular-projects .ui.cards .ui.card .extra.content .right a:hover{color:#aeb2bf}.users__popular-projects .ui.cards .ui.card .extra.content .right a:active{color:#626672}.users__popular-projects .ui.cards .ui.card.sortable-chosen{background:#fed!important}.users__contribution-panel .less{background-color:#eee}.users__contribution-panel .little{background-color:#d6e685}.users__contribution-panel .some{background-color:#8cc665}.users__contribution-panel .many{background-color:#44a340}.users__contribution-panel .much{background-color:#1e6823}.users__contribution-panel .contribution-box{padding-top:20px;height:125px;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.users__contribution-panel .contribution-box .left-side{width:32px;font-size:12px;text-align:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.users__contribution-panel .contribution-box .left-side,.users__contribution-panel .contribution-box .right-side{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.users__contribution-panel .contribution-box .right-side{position:relative;width:100%;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.users__contribution-panel .contribution-box .right-side .box{width:1.88679%;height:15px;border:1px solid #fff}.users__contribution-panel .contribution-box .right-side .box[data-content]:hover{border:1px solid #000}.users__contribution-panel .contribution-box .right-side .month{position:absolute;top:0;margin-top:-15px;margin-left:-15px;min-width:45px;font-size:12px;text-align:center}.users__contribution-panel .contribution-tip{margin-top:10px;padding-right:10px;font-size:12px;text-align:right}.users__contribution-panel .contribution-tip .word{font-size:12px;vertical-align:top;display:inline-block}.users__contribution-panel .contribution-tip .ui.horizontal.list>.item{margin:0 1px;width:12px;height:12px;vertical-align:text-bottom}.users__contribution-panel .contribution-describ p{margin:0 20px 0 0;display:inline-block}.users__contribution-panel .contribution-describ p.text-muted{margin-top:10px;display:block}.users__customize-modal .ui.form{min-height:180px}.users__customize-modal .grouped.fields{margin:.2em 0 1em!important;padding:10px 0;max-height:20em;overflow-y:auto}.users__customize-modal .grouped.fields .field{padding:5px!important}.users__customize-modal .grouped.fields .field .ui.checkbox{width:100%}.users__customize-modal .grouped.fields .field label{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__customize-modal .grouped.fields .field label span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__customize-modal .grouped.fields .field label .star-count{min-width:4em;text-align:right}.users__customize-modal .grouped.fields .field.active{background:rgba(254,115,0,.2)}.users__report-modal .appeal-success-tip{text-align:center}.users__report-modal .appeal-success-tip i.iconfont{font-size:7rem;color:#4baf50}.users__report-modal .ui.items{padding:20px;background:#f4f5f6}.users__report-modal .ui.items .ui.image{width:50px}.users__report-modal .ui.items .content .header{color:#40485b}.users__report-modal .ui.items .content .description{color:#8c92a4;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__report-modal .ui.segment.loader-block{border:0;min-height:100px}.users__report-modal .action-types .item{margin:5px;padding:10px 20px;min-width:120px;text-align:center;display:inline-block;background:#f2f2f2;border-radius:5px;cursor:pointer}.users__report-modal .action-types .item.active,.users__report-modal .action-types .item:active,.users__report-modal .action-types .item:hover{color:#fe7300}.users__report-modal .extra-content textarea{width:100%;height:5em}#user-show-detail .git-dashboard-projects-menu>.f-bold{color:#fe7300}#user-show-detail .git-codes-tags{margin-bottom:16px}#user-show-detail .git-user-twl-col>.gitee-headbread{margin-bottom:16px;margin-top:10px}#user-show-detail .git-profile-content-header .git-dashboard-projects-menu{margin-bottom:14px}#user-show-detail .git-profile-content-header .git-dashboard-projects-menu>a{font-size:14px}.recommend-container{padding:24px 0 0!important}.recommend-container .recommend-notice{background-color:#fffeed!important;margin-bottom:24px}.recommend-container .recommend-notice>.header{margin-right:8px!important}.recommend-container .ui.message{color:#40485b;padding:12px 16px;-webkit-box-shadow:0 0 0 1px #e2d8bf inset,0 0 0 0 transparent;box-shadow:inset 0 0 0 1px #e2d8bf,0 0 0 0 transparent}.recommend-container .ui.message i{position:absolute;top:0;right:0;font-size:.8em;margin-top:8px;margin-right:8px;cursor:pointer;color:#005980}.recommend-container .ui.message .header{color:#40485b;font-size:14px}.recommend-container .ui.message .content{margin-top:4px}.recommend-container .recommend-block{margin-bottom:32px}.recommend-container .recommend-block>.items{margin-top:0}.recommend-container .recommend-block .header{margin-bottom:16px}.recommend-container .recommend-block .header strong{font-size:16px}.recommend-container .recommend-block .recommend-list{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.recommend-container .recommend-block .item{margin:0}.recommend-container .recommend-user .header{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:end;-webkit-align-items:flex-end;-moz-box-align:end;-ms-flex-align:end;align-items:flex-end}.recommend-container .recommend-user .recommend-list{-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}';
    console.log([Hn, Hn]);
    (() => {
        var mycom = Wn(
            Object.assign(
                (props, children) => {
                    const number = Mr(1);
                    Gt(() => {
                        console.log("mounted1");
                    });
                    Gt(() => {
                        console.log("mounted2", props);
                    });
                    Qt(() => {
                        console.log("unmounted");
                    });
                    Gn(props.cccccc, cccccc => {
                        console.log("cccccc", cccccc);
                    });
                    return Hn(
                        "div",
                        {
                            onclick: () => {
                                number.value++;
                            }
                        },
                        [
                            number,
                            Hn("br", null),
                            "wwwwwwwwwwww",
                            Hn("div", ["createComponent"]),
                            children,
                            Hn(
                                "div",
                                Hn("", null, "props cccccc ", props.cccccc)
                            )
                        ]
                    );
                },
                {
                    defaultProps: {
                        cccccc: "bbbbbbb"
                    },
                    css: css$1
                }
            )
        );
        const myclasscomponent = mycom;
        let vdom = Hn(
            myclasscomponent,
            {
                aaaaaa: 222222222,
                tttttt: "dddddddddd"
            },
            "children"
        );
        console.log([vdom, myclasscomponent, mycom]);
        document.body.appendChild(un(vdom, document.createElement("div")));
        setTimeout(() => {
            vdom.element.forEach(e => {
                e.setAttribute(
                    "cccccc",
                    "aaaaaaaaaaaaaaaaaabbbbbbbbbbnnnnnnnnnnnnn"
                );
            });
            vdom = undefined;
        }, 5e3);
        document.body.appendChild(
            un(
                Hn(myclasscomponent, [
                    Hn(
                        "form",
                        {
                            id: "newsletterForm",
                            class: "newsletter-form nodisable",
                            name: "newsletter-form",
                            action: "https://www.mozilla.org/en-US/newsletter/",
                            method: "post"
                        },
                        Hn(
                            "div",
                            {
                                class: "newsletter-head"
                            },
                            Hn(
                                "h2",
                                {
                                    class: "newsletter-teaser"
                                },
                                "\u5b66\u4e60 Web \u5f00\u53d1\u7684\u6700\u4f73\u5b9e\u8df5"
                            ),
                            Hn(
                                "p",
                                {
                                    class: "newsletter-description"
                                },
                                "\u8ba9 MDN \u5c06\u6700\u65b0\u3001\u6700\u68d2\u7684\u5185\u5bb9\u76f4\u63a5\u6295\u9012\u5230\u60a8\u7684\u90ae\u7bb1\u3002"
                            ),
                            Hn(
                                "p",
                                {
                                    class: "newsletter-lang"
                                },
                                "\u76ee\u524d\u4ec5\u63d0\u4f9b\u82f1\u6587\u7248\u65b0\u95fb\u62a5\u3002"
                            )
                        ),
                        Hn(
                            "div",
                            {
                                class: "newsletter-fields"
                            },
                            Hn("input", {
                                type: "hidden",
                                id: "fmt",
                                name: "fmt",
                                value: "H"
                            }),
                            Hn("input", {
                                type: "hidden",
                                id: "newsletterNewslettersInput",
                                name: "newsletters",
                                value: "app-dev"
                            }),
                            Hn("div", {
                                id: "newsletterErrors",
                                class: "newsletter-errors"
                            }),
                            Hn(
                                "div",
                                {
                                    id: "newsletterEmail",
                                    class: "form-group newsletter-group-email"
                                },
                                Hn(
                                    "label",
                                    {
                                        for: "newsletterEmailInput",
                                        class: "form-label offscreen"
                                    },
                                    "\u7535\u5b50\u90ae\u4ef6\u5730\u5740"
                                ),
                                Hn("input", {
                                    type: "email",
                                    id: "newsletterEmailInput",
                                    name: "email",
                                    class: "form-input newsletter-input-email",
                                    required: "",
                                    placeholder: "you@example.com",
                                    size: "30"
                                })
                            ),
                            Hn(
                                "div",
                                {
                                    id: "newsletterPrivacy",
                                    class:
                                        "form-group form-group-agree newsletter-group-privacy hidden"
                                },
                                Hn("input", {
                                    type: "checkbox",
                                    id: "newsletterPrivacyInput",
                                    name: "privacy",
                                    required: ""
                                }),
                                Hn(
                                    "label",
                                    {
                                        for: "newsletterPrivacyInput"
                                    },
                                    "\u6211\u63a5\u53d7 Mozilla \u6309\u7167",
                                    Hn(
                                        "a",
                                        {
                                            href:
                                                "https://www.mozilla.org/privacy/"
                                        },
                                        "\u9690\u79c1\u653f\u7b56"
                                    ),
                                    "\u6240\u8ff0\u7684\u65b9\u5f0f\u5904\u7406\u6211\u7684\u4fe1\u606f\u3002"
                                )
                            ),
                            Hn(
                                "div",
                                {
                                    id: "newsletterSubmit",
                                    class: "newsletter-group-submit"
                                },
                                Hn(
                                    "button",
                                    {
                                        id: "newsletter-submit",
                                        type: "submit",
                                        class:
                                            "button neutral newsletter-submit"
                                    },
                                    "\u7acb\u5373\u6ce8\u518c",
                                    Hn(
                                        "svg",
                                        {
                                            class: "icon icon-arrow",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            width: "23",
                                            height: "28",
                                            viewBox: "0 0 23 28",
                                            "aria-hidden": "true"
                                        },
                                        Hn("path", {
                                            d:
                                                "M23 15a2.01 2.01 0 0 1-.578 1.422L12.25 26.594c-.375.359-.891.578-1.422.578s-1.031-.219-1.406-.578L8.25 25.422c-.375-.375-.594-.891-.594-1.422s.219-1.047.594-1.422L12.828 18h-11C.703 18 0 17.062 0 16v-2c0-1.062.703-2 1.828-2h11L8.25 7.406a1.96 1.96 0 0 1 0-2.812l1.172-1.172c.375-.375.875-.594 1.406-.594s1.047.219 1.422.594l10.172 10.172c.375.359.578.875.578 1.406z"
                                        })
                                    )
                                )
                            )
                        )
                    )
                ]),
                document.createElement("div")
            )
        );
    })();
    const funstate = Mr(() => {});
    Gn(funstate, fun => {
        console.log([funstate, fun]);
    });
    requestAnimationFrame(() => {
        setTimeout(() => {
            funstate.value = class extends HTMLElement {};
        }, 50);
    });
    console.dir(funstate);
    const com1 = Wn(() => Hn("h1", null, "component 1"));
    const com2 = Wn(() => Hn("h1", null, "component 2"));
    const com3 = Wn(() => Hn("h1", null, "component 3"));
    const com4 = () => Hn("h1", null, "component 4");
    const mystate = Mr(com1);
    const vdom$6 = cr(mystate);
    const element$1 = sn(vdom$6);
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
    console.log([vdom$6, mystate, com1, com2, com3, com4]);
    Gn(mystate, state => {
        console.log([state, element$1]);
    });
    document.body.appendChild(
        sn(
            Hn(() =>
                Hn(
                    "div",
                    null,
                    Hn("button", {
                        $text: "component 1",
                        onclick: () => {
                            mystate.value = com1;
                        }
                    }),
                    Hn("button", {
                        $text: "component 2",
                        onclick: () => {
                            mystate.value = com2;
                        }
                    }),
                    Hn("button", {
                        $text: "component 3",
                        onclick: () => {
                            mystate.value = com3;
                        }
                    }),
                    Hn("button", {
                        $text: "component 4",
                        onclick: () => {
                            mystate.value = com4;
                        }
                    })
                )
            )
        )
    );
})();
//# sourceMappingURL=output-es2015.js.map
