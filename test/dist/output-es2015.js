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
                            var i = function i(t) {
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
                                                    i: function i(e) {
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
                                    set: function set(t) {
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
                                              get: function get() {
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
                                              set: function set(t) {
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
                                    set: function set(t) {
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
                                              get: function get() {
                                                  return S.call(this, !0)
                                                      .innerHTML;
                                              },
                                              set: function set(t) {
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
            (t = function t(_t) {
                for (
                    var e = -1, n = null == _t ? 0 : _t.length, o = {};
                    ++e < n;

                ) {
                    var i = _t[e];
                    o[i[0]] = i[1];
                }
                return o;
            }),
            "function" != typeof Object.fromEntries && (Object.fromEntries = t);
    })();
    function t(t, e, n) {
        return (
            e in t
                ? Object.defineProperty(t, e, {
                      value: n,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0
                  })
                : (t[e] = n),
            t
        );
    }
    function e(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
                (r = r.filter(function(e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable;
                })),
                n.push.apply(n, r);
        }
        return n;
    }
    function n(n) {
        for (var r = 1; r < arguments.length; r++) {
            var o = null != arguments[r] ? arguments[r] : {};
            r % 2
                ? e(Object(o), !0).forEach(function(e) {
                      t(n, e, o[e]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                      n,
                      Object.getOwnPropertyDescriptors(o)
                  )
                : e(Object(o)).forEach(function(t) {
                      Object.defineProperty(
                          n,
                          t,
                          Object.getOwnPropertyDescriptor(o, t)
                      );
                  });
        }
        return n;
    }
    const r = Function("return this")(),
        o = r,
        i = r,
        s = r,
        {
            WeakSet: c,
            WeakMap: u,
            Date: a,
            RegExp: f,
            Event: l,
            CustomEvent: h,
            requestAnimationFrame: d,
            URL: p,
            Blob: v,
            Element: w,
            Node: m,
            String: y,
            Array: g,
            document: b,
            Object: E,
            Reflect: O,
            Proxy: P,
            Symbol: S,
            Boolean: x,
            Promise: C,
            Set: j,
            Math: L,
            Error: T,
            TypeError: k,
            JSON: N,
            Map: M,
            clearTimeout: R,
            setTimeout: D,
            parseInt: _,
            Number: A
        } = r;
    function $(t) {
        return (
            U(t) ||
            F(t) ||
            z(t) ||
            H(t) ||
            (function(t) {
                return "bigint" == typeof t;
            })(t)
        );
    }
    function W(t) {
        return "symbol" == typeof t;
    }
    const K = t => B(t) && "Object" === V(t);
    function H(t) {
        return (!t && void 0 === t) || null === t;
    }
    function F(t) {
        return "number" == typeof t;
    }
    function z(t) {
        return "boolean" == typeof t;
    }
    function B(t) {
        return "object" == typeof t && null !== t;
    }
    function U(t) {
        return "string" == typeof t;
    }
    function q(t) {
        return "function" == typeof t;
    }
    function I(t) {
        return g.isArray(t) && t instanceof g;
    }
    function V(t) {
        return {}.toString
            .call(t)
            .replace("[object ", "")
            .replace("]", "")
            .trim();
    }
    function Z(t) {
        return t instanceof j;
    }
    function J(t) {
        return t instanceof M;
    }
    function G(t) {
        return t instanceof u;
    }
    const { HTMLElement: Q, customElements: X, Proxy: Y } = i;
    if (!q(Q) || !q(Y) || !B(X)) throw new k();
    var tt = function tt(t) {
            var e = typeof t;
            return null != t && ("object" == e || "function" == e);
        },
        et =
            void 0 !== r
                ? r
                : void 0 !== i
                ? i
                : void 0 !== s
                ? s
                : void 0 !== o
                ? o
                : {},
        nt = "object" == typeof et && et && et.Object === E && et,
        rt = "object" == typeof o && o && o.Object === E && o,
        ot = nt || rt || Function("return this")(),
        it = function it() {
            return ot.Date.now();
        },
        st = ot.Symbol,
        ct = E.prototype,
        ut = ct.hasOwnProperty,
        at = ct.toString,
        ft = st ? st.toStringTag : void 0;
    var lt = function lt(t) {
            var e = ut.call(t, ft),
                n = t[ft];
            try {
                t[ft] = void 0;
                var r = !0;
            } catch (t) {}
            var o = at.call(t);
            return r && (e ? (t[ft] = n) : delete t[ft]), o;
        },
        ht = E.prototype.toString;
    var dt = function dt(t) {
            return ht.call(t);
        },
        pt = st ? st.toStringTag : void 0;
    var vt = function vt(t) {
        return null == t
            ? void 0 === t
                ? "[object Undefined]"
                : "[object Null]"
            : pt && pt in E(t)
            ? lt(t)
            : dt(t);
    };
    var wt = function wt(t) {
        return null != t && "object" == typeof t;
    };
    var mt = function mt(t) {
            return (
                "symbol" == typeof t || (wt(t) && "[object Symbol]" == vt(t))
            );
        },
        yt = /^\s+|\s+$/g,
        gt = /^[-+]0x[0-9a-f]+$/i,
        bt = /^0b[01]+$/i,
        Et = /^0o[0-7]+$/i,
        Ot = _;
    var Pt = function Pt(t) {
            if ("number" == typeof t) return t;
            if (mt(t)) return NaN;
            if (tt(t)) {
                var e = "function" == typeof t.valueOf ? t.valueOf() : t;
                t = tt(e) ? e + "" : e;
            }
            if ("string" != typeof t) return 0 === t ? t : +t;
            t = t.replace(yt, "");
            var n = bt.test(t);
            return n || Et.test(t)
                ? Ot(t.slice(2), n ? 2 : 8)
                : gt.test(t)
                ? NaN
                : +t;
        },
        St = L.max,
        xt = L.min;
    var Ct = function Ct(t, e, n) {
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
        if ("function" != typeof t) throw new k("Expected a function");
        function d(e) {
            var n = r,
                i = o;
            return (r = o = void 0), (a = e), (s = t.apply(i, n));
        }
        function p(t) {
            return (a = t), (c = D(w, e)), f ? d(t) : s;
        }
        function v(t) {
            var n = t - u;
            return void 0 === u || n >= e || n < 0 || (l && t - a >= i);
        }
        function w() {
            var t = it();
            if (v(t)) return m(t);
            c = D(
                w,
                (function(t) {
                    var n = e - (t - u);
                    return l ? xt(n, i - (t - a)) : n;
                })(t)
            );
        }
        function m(t) {
            return (c = void 0), h && r ? d(t) : ((r = o = void 0), s);
        }
        function y() {
            var t = it(),
                n = v(t);
            if (((r = arguments), (o = this), (u = t), n)) {
                if (void 0 === c) return p(u);
                if (l) return R(c), (c = D(w, e)), d(u);
            }
            return void 0 === c && (c = D(w, e)), s;
        }
        return (
            (e = Pt(e) || 0),
            tt(n) &&
                ((f = !!n.leading),
                (i = (l = "maxWait" in n) ? St(Pt(n.maxWait) || 0, e) : i),
                (h = "trailing" in n ? !!n.trailing : h)),
            (y.cancel = function() {
                void 0 !== c && R(c), (a = 0), (r = u = o = c = void 0);
            }),
            (y.flush = function() {
                return void 0 === c ? s : m(it());
            }),
            y
        );
    };
    const jt = new u(),
        Lt = new u();
    let Tt = [];
    let kt = !1,
        Nt = new j(),
        Mt = new j(),
        Rt = new j();
    function Dt(t) {
        if (!q(t)) throw k();
        if (!kt) throw T();
        Nt.add(t);
    }
    function _t(t) {
        if (!q(t)) throw k();
        if (!kt) throw T();
        Mt.add(t);
    }
    function At() {
        (kt = !1), $t();
    }
    function $t() {
        (Nt = new j()), (Mt = new j()), (Rt = new j()), (Tt = []);
    }
    class Wt {
        constructor() {
            this.Listeners = new j();
        }
        addListener(t) {
            this.Listeners.add(t);
        }
        dispatch() {
            this.Listeners.forEach(t => {
                C.resolve().then(() => {
                    t();
                });
            });
        }
        removeListener(t) {
            this.Listeners.delete(t);
        }
    }
    const {
        apply: Kt,
        construct: Ht,
        defineProperty: Ft,
        deleteProperty: zt,
        getOwnPropertyDescriptor: Bt,
        getPrototypeOf: Ut,
        has: qt,
        ownKeys: It,
        preventExtensions: Vt
    } = O;
    function Zt(t, e) {
        return J(t) || G(t) ? t.get(e) : O.get(t, e);
    }
    function Jt(t, e, n) {
        return J(t) || G(t) ? (t.set(e, n), !0) : O.set(t, e, n);
    }
    var Gt, Qt;
    const Xt = S("addonelistner"),
        Yt = S("removeonelistner"),
        te = S("cancelsubscribe"),
        ee = S("debouncedispatch");
    function ne(t) {
        return t instanceof ae && "ReactiveState" === t[S.toStringTag];
    }
    const re = S("eventtatget"),
        oe = S("memlisteners"),
        ie = S("dispatch"),
        se = S("subscribe"),
        ce = S("removeallisteners"),
        ue = S("addallisteners");
    class ae {
        constructor(t) {
            var e;
            (this[S.toStringTag] = "ReactiveState"),
                (this[Gt] = new Wt()),
                (this[Qt] = new j()),
                (this.valueOf = () => this.value),
                (this.value = t),
                Ft(this, "value", {
                    value: t,
                    configurable: !0,
                    writable: !0
                }),
                (e = this),
                kt && Rt.add(e);
            const n = Ct(() => {
                this[re].dispatch();
            });
            this[ee] = () => {
                n();
            };
        }
        [ce]() {
            this[oe].forEach(t => {
                this[Yt](t);
            });
        }
        [Yt](t) {
            this[re].removeListener(t);
        }
        [Xt](t) {
            this[re].addListener(t);
        }
        [ue]() {
            this[oe].forEach(t => {
                this[Xt](t);
            });
        }
        toString() {
            const t = this.valueOf();
            return $(t)
                ? y(t)
                : Z(t)
                ? N.stringify([...t])
                : B(t)
                ? N.stringify(t)
                : "";
        }
        [((Gt = re), (Qt = oe), ie)]() {
            this[ee]();
        }
        [se](t) {
            this[oe].add(t);
        }
        [te](t) {
            t && (this[oe].delete(t), this[Yt](t));
        }
        [S.toPrimitive]() {
            const t = this.valueOf();
            return $(t) ? t : B(t) ? N.stringify(t) : void 0;
        }
    }
    function fe(t) {
        return (I(t) ? t : [t]).flat(1 / 0).filter(t => !H(t));
    }
    function le(t, e) {
        if (I(t) || ne(t)) {
            const n = fe(t);
            if (!n.length) throw new T();
            const r = Ct(e),
                o = n.map(t => {
                    const o = (() => {
                        const t = Lt.get(e);
                        if (t) return t;
                        {
                            const t = () => {
                                r(...n.map(t => t.valueOf()));
                            };
                            return Lt.set(e, t), t;
                        }
                    })();
                    return (
                        (function(t, e) {
                            if (!ne(t) || !q(e)) throw k();
                            t[se](e),
                                d(() => {
                                    he(t);
                                }),
                                (function(t, e) {
                                    kt && Tt.push([t, e]);
                                })(t, e);
                        })(t, o),
                        [t, o]
                    );
                });
            return () => {
                o.forEach(([t, e]) => {
                    t[te](e);
                });
            };
        }
        throw new k();
    }
    function he(t) {
        t[ue]();
    }
    const de = ["input", "textarea", "option", "select"];
    var pe = (t, e, n) =>
        ("value" === e && de.includes(t) && "button" !== n) ||
        ("selected" === e && "option" === t) ||
        ("checked" === e && "input" === t) ||
        ("muted" === e && "video" === t);
    const ve = /\B([A-Z])/g,
        we = i.String,
        me = i.Reflect,
        { get: ye, set: ge, ownKeys: be } = me;
    function Ee(t) {
        return "object" == typeof t && null !== t;
    }
    function Oe(t) {
        return "string" == typeof t;
    }
    function Pe(t) {
        return t instanceof j;
    }
    const Se = t =>
        "input" === Ce(t) &&
        ("checkbox" === ye(t, "type") || "radio" === ye(t, "type"));
    function xe(t) {
        !(function(t) {
            if (!(t instanceof w)) throw k();
        })(t);
        var e = E.create(null);
        const r = new P(e, {
            ownKeys() {
                const e = (function(t) {
                        const e = Ce(t);
                        return (
                            "textarea" === e ||
                            "select" === e ||
                            ("input" === e && "text" === ye(t, "type"))
                        );
                    })(t),
                    n = (function(t) {
                        return t.getAttributeNames();
                    })(t);
                return g.from(
                    new j(
                        [...n, Se(t) ? "checked" : void 0, e ? "value" : void 0]
                            .flat(1 / 0)
                            .filter(t => !!t)
                    )
                );
            },
            get(e, n) {
                if (pe(Ce(t), we(n), ye(t, "type"))) return ye(t, we(n));
                {
                    const e = (function(t, e) {
                        return t.getAttribute(e);
                    })(t, we(n));
                    if ("" === e) return !0;
                    if (null === e) return;
                    if (!Oe(e)) return;
                    try {
                        return N.parse(we(e));
                    } catch (t) {
                        return e;
                    }
                }
            },
            set(e, n, r) {
                if ("function" == typeof r) throw k();
                if (pe(Ce(t), we(n), ye(t, "type"))) return ge(t, we(n), r);
                if ("style" === n) {
                    const e = Oe(r)
                        ? r
                        : Ee(r)
                        ? ((i = r),
                          (i = N.parse(N.stringify(i))),
                          E.entries(i)
                              .map(([t, e]) => {
                                  return [
                                      ((n = t),
                                      n
                                          .replace(ve, "-$1")
                                          .toLowerCase()).trim(),
                                      e
                                  ];
                                  var n;
                              })
                              .map(([t, e]) => t + ":" + e)
                              .join(";"))
                        : we(r);
                    return ge(ye(t, "style"), "cssText", e.trim()), !0;
                }
                if ("class" === n && Ee(r)) {
                    const e =
                        ((o = r),
                        g.isArray(o)
                            ? r.join(" ")
                            : Pe(r)
                            ? [...r].join(" ")
                            : we(r));
                    return je(t, we(n), e), !0;
                }
                return !1 === r || null == r
                    ? (Le(t, we(n)), !0)
                    : Pe(r)
                    ? (je(t, we(n), N.stringify([...r])), !0)
                    : (!0 === r && (r = ""),
                      je(t, we(n), Ee(r) ? N.stringify(r) : we(r)),
                      !0);
                var o, i;
            },
            deleteProperty: (e, n) => (Le(t, we(n)), !0),
            has: (t, e) => be(r).includes(e),
            defineProperty: () => !1,
            getOwnPropertyDescriptor(t, e) {
                const o = {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    },
                    i = ye(r, e);
                return void 0 !== i
                    ? n(
                          {
                              value: i
                          },
                          o
                      )
                    : void 0;
            },
            setPrototypeOf: () => !1
        });
        return r;
    }
    function Ce(t) {
        return t.tagName.toLowerCase();
    }
    function je(t, e, n) {
        return t.setAttribute(e, n);
    }
    function Le(t, e) {
        return t.removeAttribute(e);
    }
    function Te(t) {
        const e = {};
        return (
            t.forEach(([t, n]) => {
                e[t] || (e[t] = new j()),
                    n.forEach(n => {
                        e[t].add(n);
                    });
            }),
            E.entries(e).map(([t, e]) => [t, [...e]])
        );
    }
    const ke = new c(),
        Ne = /[A-Za-z\u4e00-\u9fa5]/;
    function Me(t) {
        return ke.has(t);
    }
    function Re(t, e = {}, n = []) {
        (e = E.assign({}, e)), (n = n.flat(1 / 0));
        const r = E.entries(e),
            o = r.filter(([t]) => !(t.startsWith("@") || t.startsWith("on"))),
            i = o.filter(([t]) => Ne.test(t[0])),
            s = E.create(null),
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
                Ft(s, t, {
                    writable: !0
                });
            }),
            (c.element = []),
            E.assign(s, {
                type: t,
                bindattr: E.fromEntries(i.filter(t => ne(t[1]))),
                props: E.fromEntries(
                    i
                        .filter(t => !ne(t[1]))
                        .map(([t, e]) => [t, U(e) ? e.trim() : e])
                ),
                children: n,
                onevent: E.fromEntries(
                    Te([
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
                directives: E.fromEntries(
                    o
                        .filter(
                            ([t]) =>
                                "*" === t[0] || "_" === t[0] || "$" === t[0]
                        )
                        .map(([t, e]) => [
                            t
                                .slice(1)
                                .toLowerCase()
                                .trim(),
                            e
                        ])
                )
            }),
            Ft(s, S.toStringTag, {
                value: "VirtualElement"
            }),
            Vt(s),
            ke.add(s),
            E.freeze(c),
            s
        );
    }
    function De(t) {
        if (U(t)) return !0;
        if (F(t)) return !0;
        return I(t) ? t.every(t => De(t)) : Me(t) ? De(t.children) : !!ne(t);
    }
    function _e(t) {
        return !!(q(t) && t.prototype && t.prototype instanceof HTMLElement);
    }
    function Ae(t, e) {
        t.textContent = e;
    }
    function $e(t, e) {
        t.innerHTML = e;
    }
    function We(t, e) {
        t.appendChild(e);
    }
    function Ke() {
        return b.createDocumentFragment();
    }
    function He(t, e) {
        return b.createElementNS(t, e);
    }
    function Fe(t) {
        return b.createTextNode(y(t));
    }
    const ze = "http://www.w3.org/2000/svg";
    function Be(t, e) {
        let n = e.parentNode;
        n && n.replaceChild(t, e);
    }
    function Ue(t, e, n) {
        t.addEventListener(e, n);
    }
    function qe(t) {
        return [...t.children];
    }
    function Ie(t) {
        return [...t.childNodes];
    }
    function Ve(t) {
        return [...b.querySelectorAll(t)];
    }
    function Ze(t, e, n = !0) {
        return (
            n && Ae(e, ""),
            fe(t)
                .flat(1 / 0)
                .forEach(t => We(e, t)),
            e
        );
    }
    const Je = g(26)
            .fill(void 0)
            .map((t, e) => 97 + e)
            .map(t => y.fromCharCode(t)),
        Ge = g(16)
            .fill(void 0)
            .map((t, e) => e)
            .map(t => t.toString(16)),
        Qe = [...new j([...Ge, ...Je])];
    function Xe(t = 1) {
        return (
            g(t)
                .fill(void 0)
                .map(() => Zt(Je, L.floor(L.random() * Je.length)))
                .join("") +
            "-" +
            g(t)
                .fill(void 0)
                .map(() => Zt(Qe, L.floor(L.random() * Qe.length)))
                .join("")
        );
    }
    if (!B(i.customElements)) throw new k();
    i.CustomElementRegistry = Zt(Ut(i.customElements), "constructor");
    const Ye = S.for("elementset"),
        tn = S.for("elementmap"),
        { CustomElementRegistry: en } = i,
        nn = i.customElements;
    qt(nn, Ye) || O.set(nn, Ye, new j()), qt(nn, tn) || O.set(nn, tn, {});
    function rn(t, e, n = 1) {
        if (!_e(t)) throw k();
        if (Zt(nn, Ye).has(t))
            return (function(t, e) {
                const n = E.entries(t).find(t => t[1] === e);
                return n ? n[0] : void 0;
            })(Zt(nn, tn), t);
        {
            const r = Xe(n);
            return nn.get(r)
                ? rn(t, e, n + 1)
                : (e
                      ? nn.define(r, t, {
                            extends: e
                        })
                      : nn.define(r, t),
                  r);
        }
    }
    function on(t, e, n) {
        let r = t;
        if ((q(r) && (r = Zn(r)), _e((t = r))))
            return (
                ((t, e) => {
                    rn(t, e);
                })(t),
                Ht(t, [e, n])
            );
        throw k();
    }
    (nn.define = function(t, e, n) {
        if (!_e(e)) throw k();
        Zt(nn, Ye).has(e) ||
            (qt(nn[tn], t)
                ? rn(e, n ? n.extends : void 0)
                : (en.prototype.define.call(nn, t, e, n),
                  nn[Ye].add(e),
                  (nn[tn][t] = e)));
    }),
        Jt(nn, S.iterator, () => {
            const t = E.entries(nn[tn]);
            return t[S.iterator].call(t);
        });
    const sn = S("component");
    function cn(t) {
        const e = t.isConnected;
        return z(e)
            ? e
            : b.documentElement ===
                  (function(t) {
                      for (; t && t.parentNode && t.parentNode !== b; )
                          t = t.parentNode;
                      return t;
                  })(t);
    }
    function un(t, e) {
        return function(e, n) {
            const r = e;
            if (U(n))
                d(() => {
                    t(e, n);
                });
            else {
                if (!ne(n)) throw k();
                le(n, () => {
                    const o = n;
                    cn(r) && t(e, y(o));
                }),
                    d(() => {
                        t(e, y(n));
                    });
            }
        };
    }
    function an(t = {}) {
        if (!K(t)) throw new k();
        return (
            E.entries(t).forEach(([t, e]) => {
                if ("function" != typeof e) throw k();
                if (fn[t]) throw new T();
                O.set(fn, t, e);
            }),
            fn
        );
    }
    const fn = {
        ref(t, e, n) {
            if (q(t)) Kt(t, void 0, [e]);
            else {
                if (!B(t)) throw k();
                Jt(t, "value", e);
            }
        }
    };
    an({
        html(t, e, n) {
            un($e)(e, t);
        },
        text(t, e, n) {
            un(Ae)(e, t);
        }
    });
    const ln = S("eventlisteners");
    function hn(t, e, n) {
        !(function(t, e, n) {
            const r = t;
            n.forEach(n => {
                if (!q(n)) throw k();
                qt(r, ln) || Jt(r, ln, []), Zt(t, ln).push([e, n]), Ue(t, e, n);
            });
        })(t, e, fe(n));
    }
    const dn = S("bindstate");
    function pn(t) {
        throw k();
    }
    function vn(t, e) {
        if (I(t)) return t.map(t => vn(t)).flat(1 / 0);
        if (F(t) || U(t)) {
            return Fe(t);
        }
        if (ne(t)) {
            const e = t,
                n = Fe(y(e));
            le(e, () => {
                const t = e;
                cn(r) &&
                    (function(t, e) {
                        t.nodeValue = y(e);
                    })(n, y(t));
            });
            const r = n;
            return Jt(r, dn, new j()), Zt(r, dn).add(e), n;
        }
        if (Me(t)) {
            let { type: o } = t;
            q(o) && (o = Zn(o));
            let i = void 0;
            if ("string" == typeof o) {
                if ("script" === o) return Ke();
                if ("svg" === o) i = He(ze, "svg");
                else if ("math" === o)
                    i = He("http://www.w3.org/1998/Math/MathML", "math");
                else {
                    if ("" === o || "html" === o) {
                        const e = Ke();
                        return Ze(vn(t.children), e), e;
                    }
                    i = e
                        ? He(e, o)
                        : (function(t) {
                              return b.createElement(t);
                          })(o);
                }
            } else if ("function" == typeof o) {
                B(o.defaultProps) &&
                    E.assign(
                        t.props,
                        N.parse(N.stringify(n({}, o.defaultProps, {}, t.props)))
                    );
                const e = N.parse(
                    N.stringify(
                        n(
                            {},
                            t.props,
                            {},
                            E.fromEntries(
                                E.entries(t.bindattr).map(([t, e]) => [
                                    t,
                                    e.value
                                ])
                            )
                        )
                    )
                );
                i = on(o, e, t.children);
            } else pn();
            return (
                o &&
                    (q(o) || U(o)) &&
                    ((q((r = o)) && Zt(r, sn) === sn) ||
                        (i &&
                            Ze(
                                t.children.map(t =>
                                    "svg" === o && Me(t)
                                        ? vn(t, ze)
                                        : "math" === o && Me(t)
                                        ? vn(
                                              t,
                                              "http://www.w3.org/1998/Math/MathML"
                                          )
                                        : e && Me(t)
                                        ? vn(t, e)
                                        : vn(t)
                                ),
                                i
                            ))),
                i &&
                    (function(t, e) {
                        e.element.push(t),
                            ((t, e) => {
                                E.entries(e.directives).forEach(([n, r]) => {
                                    if (!q(fn[n])) throw new T();
                                    fn[n](r, t, e);
                                });
                                const n = xe(t);
                                E.assign(n, e.props),
                                    E.entries(e.bindattr).forEach(([e, r]) => {
                                        (n[e] = r.valueOf()),
                                            le(r, () => {
                                                const o = r;
                                                cn(t) && (n[e] = o.valueOf());
                                            });
                                    }),
                                    E.entries(e.onevent).forEach(([e, n]) => {
                                        hn(t, e, n);
                                    });
                            })(t, e),
                            [...E.values(e.bindattr), ...E.values(e.directives)]
                                .flat(1 / 0)
                                .filter(t => ne(t))
                                .forEach(e => {
                                    qt(t, dn) || Jt(t, dn, new j()),
                                        Zt(t, dn).add(e);
                                });
                    })(i, t),
                i
            );
        }
        var r;
        pn();
    }
    function wn(t) {
        return t instanceof m;
    }
    function mn(t, e) {
        if (I(t) && !(t = t.flat(1 / 0)).length) throw new k();
        const n = e;
        if (!(n instanceof HTMLElement)) throw k();
        if (n === b.body || n === b.documentElement || n === b.head) throw T();
        const r = fe(t);
        if (De(t)) Ze(vn(r), e);
        else {
            if (!(wn(t) || ((o = t), I(o) && o.length && o.every(t => wn(t)))))
                throw k();
            Ze(r, e);
        }
        var o;
        return e;
    }
    function yn(t) {
        return new P(t, {
            set: () => !0,
            defineProperty: () => !1,
            deleteProperty: () => !1,
            setPrototypeOf: () => !1
        });
    }
    const gn = new M();
    function bn(t) {
        return t.map(t => t.cssText).join("\n");
    }
    const En = new M();
    function On(t, e, n) {
        const r = (t = t.toLowerCase());
        Zt(gn, r) || Jt(gn, t, new j()),
            e
                ? Zt(gn, r).add(
                      (function(t) {
                          const e = En.get(t);
                          if (e) return e;
                          {
                              const e = p.createObjectURL(
                                  new v([t], {
                                      type: "text/css"
                                  })
                              );
                              return En.set(t, e), e;
                          }
                      })(e)
                  )
                : n && Zt(gn, r).add(n);
    }
    function Pn(t, e) {
        return t
            .map(t => {
                if ("CSSStyleRule" === V(t)) {
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
                            [S.toStringTag]: "CSSStyleRule"
                        };
                    })(t, e);
                }
                return (function(t) {
                    return "CSSMediaRule" === V(t);
                })(t)
                    ? (function(t, e) {
                          const n = Pn([...t.cssRules], e),
                              r = t.conditionText;
                          return {
                              cssText:
                                  t.cssText.slice(0, 7) + r + "{" + bn(n) + "}",
                              conditionText: r,
                              cssRules: n,
                              [S.toStringTag]: "CSSMediaRule"
                          };
                      })(t, e)
                    : (function(t) {
                          return "CSSImportRule" === V(t);
                      })(t)
                    ? void On(e, void 0, t.href)
                    : t;
            })
            .filter(x);
    }
    function Sn(t) {
        const e = vn(Jn("style", [t]));
        return (
            We(b.implementation.createHTMLDocument("").documentElement, e),
            g.from(Zt(Zt(e, "sheet"), "cssRules"))
        );
    }
    const xn = new M();
    function Cn(t, e) {
        On(
            e,
            (function(t, e) {
                const n = xn.get(t);
                if (n) return n;
                {
                    const n = bn(Pn(Sn(t), e).filter(x));
                    return xn.set(t, n), n;
                }
            })(t, e)
        );
    }
    function jn(t, e) {
        return C.all(
            [...Zt(gn, t)].map(t => {
                return Ve(`link[rel="stylesheet"][href="${t}"]`).length
                    ? C.resolve()
                    : ((n = vn(
                          Jn("link", {
                              href: t,
                              rel: "stylesheet"
                          })
                      )),
                      (r = e),
                      new C(t => {
                          const e = () => {
                              (n.onload = n.onerror = null), t();
                          };
                          (n.onload = e), (n.onerror = e), We(r, n);
                      }));
                var n, r;
            })
        );
    }
    function Ln(t) {
        return C.resolve().then(() => t());
    }
    function Tn(t) {
        if (I(t))
            t.forEach(t => {
                Tn(t);
            });
        else if (wn(t)) {
            if (
                ((function(t) {
                    qt(t, ln) &&
                        Zt(t, ln).forEach(([e, n]) => {
                            Ue(t, e, n);
                        });
                })(t),
                qt(t, dn) &&
                    Zt(t, dn).forEach(t => {
                        he(t), t[ie]();
                    }),
                qt(t, Hn) &&
                    Zt(t, Hn).forEach(t => {
                        he(t);
                    }),
                qt(t, Kn))
            ) {
                Zt(t, Kn).forEach(([t, e]) => {
                    e && t[Xt](e);
                });
            }
            Tn(Ie(t));
        }
    }
    function kn(t) {
        if (I(t))
            t.forEach(t => {
                kn(t);
            });
        else if (wn(t)) {
            if (
                ((function(t) {
                    qt(t, ln) &&
                        Zt(t, ln).forEach(([e, n]) => {
                            !(function(t, e, n) {
                                t.removeEventListener(e, n);
                            })(t, e, n);
                        });
                })(t),
                qt(t, Hn) &&
                    Zt(t, Hn).forEach(t => {
                        !(function(t) {
                            t[ce]();
                        })(t);
                    }),
                qt(t, Kn))
            ) {
                Zt(t, Kn).forEach(([t, e]) => {
                    e && t[Yt](e);
                });
            }
            kn(Ie(t));
        }
    }
    const Nn = S("readystate");
    var Mn;
    const Rn = S("attributeChanged"),
        Dn = S("firstinstalled");
    function _n(t) {
        $n.prototype.connectedCallback.call(t);
    }
    function An(t) {
        $n.prototype.disconnectedCallback.call(t);
    }
    class $n extends HTMLElement {
        constructor() {
            super(), (this[Mn] = !1);
            const t = Zt(this.constructor, "defaultProps"),
                e = xe(this);
            B(t) && E.assign(e, t),
                new MutationObserver(t => {
                    t.forEach(t => {
                        if ("attributes" == t.type) {
                            const e = Zt(this, Rn);
                            let n = t.attributeName;
                            n && q(e) && e.call(this, n);
                        }
                    });
                }).observe(this, {
                    attributes: !0
                });
        }
        disconnectedCallback() {
            Ln(() => {
                kn(this);
            });
        }
        connectedCallback() {
            Ln(() => {
                if (!this[Nn]) {
                    this[Nn] = !0;
                    const t = Zt(this, Dn);
                    q(t) &&
                        Ln(() => {
                            t.call(this);
                        });
                }
                Tn(this);
            });
        }
    }
    Mn = Nn;
    const Wn = S("waittranformcss"),
        Kn = S("innerwatchrecord"),
        Hn = S("innerstate"),
        Fn = S("attributes"),
        zn = S("innerelement"),
        Bn = S("innervdom"),
        Un = S("mounted"),
        qn = S("unmounted");
    function In(t) {
        var e, n, r;
        if (q(t)) {
            const o = jt.get(t);
            if (o) return o;
            const i = Zt(t, "defaultProps"),
                s = Zt(t, "css");
            class c extends $n {
                constructor(n = {}, o = []) {
                    super(), (this[e] = {}), (this[r] = !1);
                    const i = Zt(this.constructor, "css");
                    if (i) {
                        const t = this.tagName.toLowerCase();
                        Zt(gn, t) ||
                            (Jt(gn, t, new j()),
                            (this[Wn] = () =>
                                Ln(() => {
                                    Cn(i, t);
                                })));
                    }
                    const s = xe(this);
                    B(n) && E.assign(s, n);
                    const c = s;
                    (kt = !0), $t();
                    const u = E.fromEntries(
                        E.entries(c).map(([t]) => [
                            t,
                            (() => {
                                const e = xe(this),
                                    n = new ae();
                                return (
                                    Ft(n, "value", {
                                        get: () => Zt(e, t),
                                        configurable: !0
                                    }),
                                    n
                                );
                            })()
                        ])
                    );
                    this[Fn] = u;
                    const a = yn(
                        E.fromEntries(E.entries(u).map(([t, e]) => [t, yn(e)]))
                    );
                    let f;
                    try {
                        f = Kt(t, void 0, [a, o.flat(1 / 0)]);
                    } catch (t) {
                        throw (At(), t);
                    }
                    if (((f = fe(f)), !De(f))) throw (At(), k());
                    {
                        const t = fe(f);
                        (this[Bn] = t.flat(1 / 0).filter(x)),
                            (this[Un] = [...Nt]),
                            (this[qn] = [...Mt]),
                            (this[Hn] = [...Rt]),
                            (this[Kn] = [...Tt]),
                            At();
                    }
                }
                [((e = Fn), (n = sn), (r = Nn), Dn)]() {
                    const t = () => (Ae(this, ""), jn(r, b.head)),
                        e = () => {
                            Ze(this[zn], this, !1), (this[Wn] = void 0);
                        };
                    if (!this[zn]) {
                        const t = this[Bn];
                        t && ((this[zn] = vn(t).flat(1 / 0)), (this[Bn] = []));
                    }
                    const n = Zt(this.constructor, "css"),
                        r = this.tagName.toLowerCase();
                    if (n) {
                        const n = this[Wn];
                        n
                            ? n()
                                  .then(t)
                                  .then(e)
                            : C.resolve(t).then(e);
                    } else Ze(this[zn], this);
                }
                connectedCallback() {
                    Ln(() => {
                        _n(this),
                            this[Un].forEach(t => {
                                Ln(t);
                            });
                    });
                }
                disconnectedCallback() {
                    Ln(() => {
                        An(this),
                            this[qn].forEach(t => {
                                Ln(t);
                            });
                    });
                }
                [Rn](t) {
                    if (this[Nn]) {
                        const e = this[Fn][t];
                        e && e[ie]();
                    }
                }
            }
            return (
                (c[n] = sn),
                (c.css = U(s) && s ? s : void 0),
                (c.defaultProps = B(i) ? N.parse(N.stringify(i)) : void 0),
                jt.set(t, c),
                c
            );
        }
        throw k();
    }
    const Vn = t => Zn(t);
    function Zn(t) {
        if (_e(t)) return t;
        if (q(t)) return In(t);
        throw k();
    }
    function Jn(t, e, ...n) {
        return (
            q(t) && (t = Zn(t)),
            I(e)
                ? Kt(Gn, void 0, [t, void 0, [...e, ...n].flat(1 / 0)])
                : Kt(Gn, void 0, [t, e, ...n])
        );
    }
    function Gn(t, e = {}, ...n) {
        let r = U(t) || q(t) ? t : "";
        const o = K(e) ? e : {},
            i = n
                .flat(1 / 0)
                .map(t => (0 === t ? "0" : t))
                .filter(t => !!t);
        return (
            U(r) && (r = r.trim().toLowerCase()),
            "" === r ? i : Kt(Re, void 0, [r, o, i])
        );
    }
    const Qn = S("truevdom"),
        Xn = S("falsevdom"),
        Yn = S("trueele"),
        tr = S("falseele"),
        er = S("handletrue"),
        nr = S("handlefalse"),
        rr = S("currentelement"),
        or = function or(t, e, n) {
            var r, o, i, s, c;
            if (!ne(t) && !z(t)) throw k();
            [e, n].forEach(t => {
                if (!(H(t) || Me(t) || U(t))) throw new k();
            });
            const u = e,
                a = n;
            class f extends $n {
                constructor() {
                    super(...arguments),
                        (this[r] = this),
                        (this[i] = !1),
                        (this[s] = fe(u)),
                        (this[c] = fe(a));
                }
                [((r = rr), (o = sn), (i = Nn), (s = Qn), (c = Xn), nr)]() {
                    this[tr] || ((this[tr] = vn(this[Xn])), (this[Xn] = []));
                    const t = this[tr][0] || this;
                    Be(t, this[rr]), (this[rr] = t);
                }
                [er]() {
                    this[Yn] || ((this[Yn] = vn(this[Qn])), (this[Qn] = []));
                    const t = this[Yn][0] || this;
                    Be(t, this[rr]), (this[rr] = t);
                }
                [Dn]() {
                    const e = t => {
                        !0 === t
                            ? Zt(this, er).call(this)
                            : t || Zt(this, nr).call(this);
                    };
                    ne(t)
                        ? (e(t.valueOf()),
                          le(t, t => {
                              e(t);
                          }))
                        : e(t);
                }
                connectedCallback() {
                    _n(this);
                }
                disconnectedCallback() {
                    An(this);
                }
            }
            return (f[o] = sn), Jn(f);
        };
    function ir(t) {
        return new P(t, {
            getOwnPropertyDescriptor: (t, e) => (W(e) ? void 0 : Bt(t, e)),
            ownKeys(t) {
                let e = Zt(t, "value");
                const n = B(e) ? e : e.__proto__;
                return g.from(new j([...It(t), ...It(n)]));
            },
            has(t, e) {
                const n = Zt(t, "value"),
                    r = B(n) ? n : n.__proto__;
                return qt(t, e) || qt(r, e);
            },
            get(t, e) {
                if (qt(t, e)) return Zt(t, e);
                {
                    const n = Zt(t, "value"),
                        r = E(n);
                    if (qt(r, e)) {
                        const t = Zt(r, e);
                        return q(t) ? t.bind(r) : t;
                    }
                }
            }
        });
    }
    const sr = function sr(t, e, n) {
        if ((!I(t) && !ne(t)) || !q(e)) throw k();
        const r = fe(t);
        if (!r.length) throw new T();
        return (function(t, e, n) {
            const r = new ae(),
                o = () => {
                    const n = Kt(
                            e,
                            void 0,
                            t.map(t => t.valueOf())
                        ),
                        r = ne(n) ? n.valueOf() : n;
                    if (B(r) || $(r)) return r;
                    throw k();
                };
            let i = o();
            return (
                Ft(r, "value", {
                    set: q(n) ? n : void 0,
                    get: o,
                    configurable: !0
                }),
                t.forEach(t => {
                    le(t, () => {
                        let t = o();
                        t !== i && (r[ie](), (i = t));
                    });
                }),
                ir(r)
            );
        })(r, e, n);
    };
    const cr = j.prototype,
        ur = M.prototype;
    function ar(t) {
        return t instanceof M;
    }
    function fr(t) {
        return t instanceof j;
    }
    function lr(t) {
        return g.isArray(t);
    }
    const hr = i.Reflect,
        {
            ownKeys: dr,
            deleteProperty: pr,
            apply: vr,
            construct: wr,
            defineProperty: mr,
            get: yr,
            getOwnPropertyDescriptor: gr,
            getPrototypeOf: br,
            has: Er,
            set: Or,
            setPrototypeOf: Pr
        } = hr;
    function Sr(t) {
        return "object" == typeof t && null !== t;
    }
    function xr(t) {
        return "function" == typeof t;
    }
    function Cr(t, e, n = [], r = t) {
        if (!xr(e)) throw T();
        if (
            t instanceof C ||
            (function(t) {
                return t instanceof f;
            })(t) ||
            (function(t) {
                return t instanceof a;
            })(t)
        )
            return t;
        if (xr(t) || Sr(t)) {
            let o;
            return (
                fr(t)
                    ? ((o = new j([...t])),
                      Or(
                          o,
                          "add",
                          i => (
                              cr.add.call(t, i),
                              e(r, n, void 0, void 0),
                              cr.add.call(o, i)
                          )
                      ),
                      Or(
                          o,
                          "delete",
                          i => (
                              cr.delete.call(t, i),
                              e(r, n, void 0, void 0),
                              cr.delete.call(o, i)
                          )
                      ),
                      Or(
                          o,
                          "clear",
                          () => (
                              cr.clear.call(t),
                              e(r, n, void 0, void 0),
                              cr.clear.call(o)
                          )
                      ))
                    : ar(t)
                    ? ((o = new M([...t])),
                      Or(
                          o,
                          "clear",
                          () => (
                              ur.clear.call(t),
                              e(r, n, void 0, void 0),
                              ur.clear.call(o)
                          )
                      ),
                      Or(
                          o,
                          "set",
                          (i, s) => (
                              ur.set.call(t, i, s),
                              e(r, n, void 0, void 0),
                              ur.set.call(o, i, s)
                          )
                      ),
                      Or(
                          o,
                          "delete",
                          i => (
                              ur.delete.call(t, i),
                              e(r, n, void 0, void 0),
                              ur.delete.call(o, i)
                          )
                      ))
                    : (o = lr(t) ? [] : xr(t) ? () => {} : {}),
                fr(t) || ar(t) || Pr(o, null),
                new P(o, {
                    defineProperty: (o, i, s) => (
                        e(
                            r,
                            [...n, y(i)],
                            Er(s, "value")
                                ? s.value
                                : xr(s.get)
                                ? s.get()
                                : void 0,
                            yr(t, i)
                        ),
                        mr(t, i, s)
                    ),
                    deleteProperty: (o, i) => (
                        e(r, [...n, y(i)], void 0, yr(t, i)), pr(t, i)
                    ),
                    ownKeys: () => dr(t),
                    has: (e, n) => Er(t, n),
                    getPrototypeOf: () => br(t),
                    setPrototypeOf: (e, n) => Pr(t, n),
                    construct(e, n) {
                        if (xr(t)) return wr(t, n);
                    },
                    apply(e, n, r) {
                        if (xr(t)) return vr(t, n, r);
                    },
                    getOwnPropertyDescriptor(e, n) {
                        var r = gr(t, n);
                        return lr(t) && "length" === n
                            ? r
                            : r
                            ? ((r.configurable = !0), r)
                            : void 0;
                    },
                    set: (o, i, s) => (
                        xr(e) && e(r, [...n, y(i)], s, yr(t, i)), Or(t, i, s)
                    ),
                    get(r, i) {
                        var s = yr(t, i);
                        return xr(s) && (fr(t) || ar(t))
                            ? yr(o, i).bind(o)
                            : xr(s) || Sr(s)
                            ? Cr(s, e, [...n, y(i)], t)
                            : s;
                    }
                })
            );
        }
        return t;
    }
    function jr(t, e) {
        if (!xr(e)) throw T();
        if (!xr(P)) throw T();
        return xr(t) || Sr(t) ? Cr(t, e) : t;
    }
    const Lr = j.prototype;
    function Tr(t) {
        if ($(t) || q(t))
            return ir(
                new P(new ae(t), {
                    defineProperty: () => !1,
                    deleteProperty: () => !1,
                    set(e, n, r) {
                        if ("value" === n && (($(r) && $(t)) || (q(r) && q(t))))
                            return e[n] !== r && (Jt(e, n, r), e[ie]()), !0;
                        throw k();
                    },
                    setPrototypeOf: () => !1
                })
            );
        if (ne(t)) return Tr(t.valueOf());
        if (B(t))
            return (function(t) {
                const e = new ae(t);
                let n = t;
                const r = K(t) && E.values(t).some(t => ne(t)),
                    o = E.entries(t).filter(t => ne(t[1]));
                r &&
                    ((n = E.assign({}, t)),
                    o.forEach(([t, e]) => {
                        Ft(n, t, {
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
                            le(n, () => {
                                e[ie]();
                            });
                        }),
                    (e.value = n);
                const i = {
                    ownKeys: t =>
                        g.from(new j([...It(t), ...It(Zt(t, "value"))])),
                    setPrototypeOf: () => !1,
                    defineProperty: () => !1,
                    getOwnPropertyDescriptor: (t, e) => {
                        if (W(e)) return;
                        const n = Zt(t, "value"),
                            r = Bt(t, e) || Bt(n, e);
                        return r && (r.configurable = !0), r;
                    },
                    deleteProperty: (t, e) => {
                        const n = Zt(t, "value");
                        return !qt(n, e) || (zt(n, e), t[ie](), !0);
                    },
                    has: (t, e) => {
                        const n = Zt(t, "value");
                        return qt(t, e) || qt(n, e);
                    },
                    get: (t, e) => {
                        const n = Zt(t, "value"),
                            r = I(n) || K(n);
                        if ("value" === e && r)
                            return jr(Zt(t, e), (e, n) => {
                                t[ie]();
                            });
                        if (qt(t, e)) return Zt(t, e);
                        if (qt(n, e)) {
                            const o = Zt(n, e);
                            if (!Z(n))
                                return r && (I(o) || K(o))
                                    ? jr(o, () => {
                                          t[ie]();
                                      })
                                    : o;
                            if ("add" !== e && "clear" !== e && "delete" !== e)
                                return q(o) ? o.bind(n) : o;
                            switch (e) {
                                case "add":
                                    return (r => {
                                        if (!Lr.has.call(n, r)) {
                                            const o = Lr[e].call(n, r);
                                            return t[ie](), o;
                                        }
                                    }).bind(n);

                                case "delete":
                                    return (r => {
                                        if (Lr.has.call(n, r)) {
                                            const o = Lr[e].call(n, r);
                                            return t[ie](), o;
                                        }
                                    }).bind(n);

                                case "clear":
                                    return (() => {
                                        if (n.size) {
                                            const r = Lr[e].call(n);
                                            return t[ie](), r;
                                        }
                                    }).bind(n);
                            }
                        }
                    },
                    set: (e, n, r) => {
                        ne(r) && (r = r.valueOf());
                        const o = Zt(e, "value");
                        if (
                            "value" === n &&
                            B(r) &&
                            ((I(t) && I(r)) || (!I(t) && !I(r)))
                        )
                            return e[n] !== r && (Jt(e, n, r), e[ie]()), !0;
                        if (qt(e, n)) throw k();
                        return o[n] !== r && (Jt(o, n, r), e[ie]()), !0;
                    }
                };
                return new P(e, i);
            })(t);
        throw T();
    }
    const kr = S("listvalueattr"),
        Nr = S("listinnervdom"),
        Mr = S("listinnerelement"),
        Rr = S("cached_realele");
    function Dr(t, e) {
        var n, r, o, i;
        if (!I(t) && !Z(t) && !ne(t)) throw new k();
        if (!q(e)) throw new k();
        const s = (t, n) => {
            const r = e(t, n);
            return (
                (function(t) {
                    if (!t) throw new k();
                })(Me(r) || U(r)),
                r
            );
        };
        class c extends $n {
            constructor() {
                super(...arguments),
                    (this[n] = new M()),
                    (this[r] = Tr([])),
                    (this[i] = !1);
            }
            [((n = Rr), (r = kr), (o = sn), (i = Nn), Rn)](t) {
                if (this[Nn] && "value" === t) {
                    const t = xe(this).value;
                    if (!I(t)) throw new k();
                    Jt(this[kr], "value", t);
                    const e = qe(this),
                        n = t.length,
                        r = e.length;
                    if (n > r) {
                        g(n)
                            .fill(void 0)
                            .map((t, e) => e)
                            .slice(r)
                            .map(t => {
                                const e = Zt(this[Rr], t);
                                if (e) return e;
                                {
                                    const e = vn(
                                        (function(t, e) {
                                            return s(
                                                sr(e[kr], e => e[t]),
                                                t
                                            );
                                        })(t, this)
                                    );
                                    return Jt(this[Rr], t, e), e;
                                }
                            })
                            .forEach(t => We(this, t));
                    } else
                        n < r &&
                            qe(this)
                                .slice(n)
                                .forEach(t =>
                                    (function(t) {
                                        t.remove();
                                    })(t)
                                );
                }
            }
            disconnectedCallback() {
                Ln(() => {
                    An(this);
                });
            }
            [Dn]() {
                const t = xe(this).value;
                if (!I(t)) throw new k();
                Jt(this[kr], "value", t),
                    (this[Nr] = t.map((t, e) =>
                        s(
                            sr(this[kr], t => t[e]),
                            e
                        )
                    )),
                    (this[Mr] = vn(this[Nr])),
                    E.entries(this[Mr]).forEach(([t, e]) => {
                        Jt(this[Rr], A(t), e);
                    }),
                    Ze(this[Mr], this),
                    (this[Mr] = []),
                    (this[Nr] = []);
            }
            connectedCallback() {
                _n(this);
            }
        }
        return (
            (c.defaultProps = {
                value: []
            }),
            (c[o] = sn),
            Jn(c, {
                value: t
            })
        );
    }
    const _r = S("cancel_watch"),
        Ar = S("cached_class_element"),
        $r = S("switch_mount");
    function Wr(t) {
        var e, n, r;
        if (!ne(t)) throw new k();
        class o extends $n {
            constructor() {
                super(...arguments), (this[e] = new u()), (this[r] = !1);
            }
            disconnectedCallback() {
                Ln(() => {
                    An(this), q(this[_r]) && this[_r]();
                });
            }
            [((e = Ar), (n = sn), (r = Nn), $r)](t) {
                t = Zn(t);
                const e = this[Ar].get(t);
                if (e) Ze(e, this);
                else {
                    const e = vn(Jn(t));
                    this[Ar].set(t, e), Ze(e, this);
                }
            }
            [Dn]() {
                const e = () => {
                    this[$r](t.valueOf());
                };
                e(),
                    (this[_r] = le(t, () => {
                        e();
                    }));
            }
            connectedCallback() {
                _n(this);
            }
        }
        return (o[n] = sn), Jn(o);
    }
    function Kr(t) {
        return {
            value: t
        };
    }
    var zr = "function" == typeof M,
        Br = zr ? new M() : {};
    function Vr(t, e, n, r, o, i) {
        if (!ne(o)) throw k();
        if (!t.includes(i.type)) throw k();
        Jt(i.bindattr, e, o),
            r.forEach(t => {
                const e = fe(i.onevent[t]);
                Jt(
                    i.onevent,
                    t,
                    fe([...e, t => (o.value = Zt(t.target, n))]).filter(x)
                );
            });
    }
    an({
        value(t, e, n) {
            Vr(
                ["input", "textarea", "select"],
                "value",
                "value",
                ["change", "input"],
                t,
                n
            );
        },
        checked(t, e, n) {
            Vr(["input"], "checked", "checked", ["change"], t, n);
            const r = fe(n.onevent.click);
            Jt(
                n.onevent,
                "click",
                fe([
                    ...r,
                    t => {
                        const e = t.target,
                            n = t.target.name;
                        n &&
                            Ve(`input[name=${n}]`)
                                .filter(t => t !== e)
                                .forEach(t => {
                                    t.dispatchEvent(new l("change"));
                                });
                    }
                ]).filter(x)
            );
        }
    });
    console.log([Jn, Jn]);
    function useMousePosition() {
        const x = Tr(0);
        const y = Tr(0);
        function update(e) {
            x.value = e.pageX;
            y.value = e.pageY;
        }
        Dt(() => {
            window.addEventListener("mousemove", update);
        });
        _t(() => {
            window.removeEventListener("mousemove", update);
        });
        return {
            x: x,
            y: y
        };
    }
    const mycomapp = Vn(() => {
        const { x: x, y: y } = useMousePosition();
        const plus = sr(x, x => x + 100);
        const multi = sr([x, y], (x, y) => x * y);
        let count = 0;
        const cancelwatch = le([x, y, multi, plus], (...args) => {
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
        return Jn(
            "div",
            null,
            Jn("h3", null, " \u9f20\u6807\u4f4d\u7f6e"),
            Jn("h2", null, "x:", x),
            Jn("h1", null, "y:", y),
            Jn("p", null, "x+100 \u662f", plus),
            Jn("p", null, "x*y \u662f", multi)
        );
    });
    mycomapp.css = `\n*{font-size:80px !important;}\np{color:blue !important;}\n`;
    var vdom = Jn(mycomapp);
    document.body.appendChild(mn(vdom, document.createElement("div")));
    const refarray = [];
    const liststate = Tr(
        Array(10)
            .fill(undefined)
            .map((v, i) => i)
    );
    le(liststate, a => console.dir([liststate, a]));
    const testlistvdom = Jn(
        "div",
        null,
        Jn("button", {
            _text: "push",
            onclick: () => {
                liststate.push(Math.random());
            }
        }),
        Jn("button", {
            _text: "pop",
            onclick: () => {
                liststate.pop();
            }
        }),
        Jn("button", {
            _text: "shift",
            onclick: () => {
                liststate.shift();
            }
        }),
        Jn("button", {
            _text: "unshift",
            onclick: () => {
                liststate.unshift(Math.random());
            }
        }),
        Dr(liststate, (value, index) =>
            Jn(
                "div",
                {
                    _ref: ele => {
                        refarray.length = liststate.length;
                        refarray[index] = ele;
                    }
                },
                ["item:", "value:", value, "index:", index]
            )
        )
    );
    const weathercondition = Tr(true);
    const vdom$1 = [
        or(weathercondition, testlistvdom),
        Jn(
            "",
            null,
            Jn(
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
    document.body.appendChild(mn(vdom$1, document.createElement("div")));
    console.log(vdom$1, refarray, liststate);
    var css =
        '@charset "UTF-8";@import url(https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-6556dfa9be535e551ffffaadfecdad99.min.css);@import url(https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-frameworks-a2fba223d5af91496cac70d4ec3624df.min.css);@import url(https://cdn.staticfile.org/mui/3.7.1/css/mui.min.css);pre{text-align:left!important}button,div,h1,h2,h3,h4,h5,h6,input{text-align:center}p{color:#000!important}@-webkit-keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.flowerpassword a{color:#42b983}.App-header{background-color:#fff}nav{width:100%}#\u56fe\u7247\u5217\u8868200 img{min-height:150px;min-width:150px;height:auto;width:auto;max-width:100%;max-height:200px}#my\u5bfc\u822a\u680f .navbar-nav li a{margin-left:2px;margin-right:2px}h1,h2{font-weight:400}ul{list-style-type:none;padding:0}li{display:inline-block;margin:0 10px}*{-webkit-user-select:text;-ms-user-select:text;user-select:text}.example{color:red}body{padding:0}*{font-family:"Microsoft Yahei,PingFangSC-Regular,arial, verdana, sans-serif"}#my\u5bfc\u822a\u680f{overflow:auto;max-height:100%;padding-right:0;padding-left:0}.App{text-align:center}.App-logo{-webkit-animation:App-logo-spin 20s linear infinite;animation:App-logo-spin 20s linear infinite;height:40vmin;pointer-events:none}.App-header{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:calc(10px + 2vmin)}.App-link{color:#61dafb}.flowerpassword body,.flowerpassword html{background-color:#fff}.flowerpassword body{font:14px/1.5 Tahoma,Helvetica,Arial,\\5b8b\\4f53;color:#000}.flowerpassword a,.flowerpassword a:hover{color:#09c;text-decoration:none}.flowerpassword .left{float:left}.flowerpassword .right{float:right}.flowerpassword .clear{clear:both}.flowerpassword header{text-align:left;padding:0;margin:15px auto}.flowerpassword #logo{height:39px}.flowerpassword #shortcuts{margin:15px 0 0 15px}.flowerpassword #nav{float:center;margin-top:10px}.flowerpassword #nav li{margin:0 7px}.flowerpassword #nav li a{font-size:22px;color:#09c}.flowerpassword #nav li.active a,.flowerpassword #nav li.active a:hover{background-color:#09c;color:#fff}.flowerpassword #nav li a:hover{background-color:#79c6df;color:#fff}.flowerpassword #index-box{background-color:#fff;width:940px;clear:both;box-shadow:0 0 4px 2px #ddd;border:1px solid #ddd}.flowerpassword #index-box .float-box{margin:20px 0 20px 20px;display:inline}.flowerpassword #index-box #content-nav{margin:0;width:200px}.flowerpassword #index-box #content-nav li a{background-color:#e5ecdc}.flowerpassword #index-slider{width:940px;height:200px;overflow:hidden;position:relative}.flowerpassword #index-slider ul{list-style:none;margin:0;position:absolute;top:0;left:0}.flowerpassword #index-slider li{width:940px;height:200px;float:left}.flowerpassword #index-slider #pagination{top:160px;left:800px}.flowerpassword #index-slider ul#pagination li{width:16px;height:16px;border-radius:1em;background-color:#fff;box-shadow:0 0 1px 2px #ccc;margin-right:18px;margin-top:4px}.flowerpassword #index-slider ul#pagination li.active{width:24px;height:24px;margin-top:0}.flowerpassword #index-slider ul#pagination li:hover{background-color:#ddd;cursor:pointer}.flowerpassword #index-report{width:680px;height:70px;margin-top:20px;overflow:hidden;position:relative;background-color:#e5ecdc}.flowerpassword #index-report ul{list-style:none;margin:0;position:absolute;top:0;left:0}.flowerpassword #index-report li{width:680px;height:70px;text-align:center;float:left;font-size:32px;color:#666;font-family:\xe5\xbe\xae\xe8\xbd\xaf\xe9\u203a\u2026\xe9\xbb\u2018,\xe9\xbb\u2018\xe4\xbd\u201c;line-height:70px}.flowerpassword #index-report-pagination{list-style:none;margin-left:35px;text-align:center}.flowerpassword #index-report-pagination li{height:65px;float:left;margin-right:45px;cursor:pointer}.flowerpassword #index-report-pagination li img{margin-top:30px}.flowerpassword #index-button{margin:40px 0 30px;text-align:center}.flowerpassword #index-button a{margin:0 50px}.flowerpassword #tab{margin-top:30px}.flowerpassword #tab li a{margin-right:10px;border-bottom-color:#ddd;color:#666}.flowerpassword #tab li a:hover{background-color:#f2f2f2;color:#333;border-color:#ddd #ddd transparent}.flowerpassword #tab li.active a{background-color:#f2f2f2;color:#666;border-bottom-color:transparent}.flowerpassword #content-nav{list-style:none;margin:20px 0 0}.flowerpassword #content-nav li a{color:#666;padding:11px 0 11px 60px;display:block;margin-bottom:1px;font-size:22px}.flowerpassword #content-nav li a.active,.flowerpassword #content-nav li a:hover{background-color:#09c!important;color:#fff!important}.flowerpassword h1,.flowerpassword h2{color:#09c;margin:30px 0 12px}.flowerpassword h2{font-size:22px}.flowerpassword h2 span{font-size:22px;color:#fff;margin-right:7px;background-color:#09c;width:33px;height:33px;display:inline-block;text-align:center}.flowerpassword h3{font-size:16px;color:#09c;margin:20px 0}.flowerpassword h3 span{font-size:16px;color:#fff;margin-right:6px;background-color:#09c;width:26px;display:inline-block;text-align:center}.flowerpassword #input span{color:#09c;font-weight:700;font-size:22px;margin:0 20px}.flowerpassword #input input{font-size:14px;padding:5px;margin-left:5px}.flowerpassword #input label{float:none;display:inline;padding-right:5px}.flowerpassword #input p{margin-top:16px}.flowerpassword #input p,.flowerpassword .other{font-size:12px;color:#999}.flowerpassword #code16{display:inline-block;text-align:center}.flowerpassword .code16d{border:2px solid #09c}.flowerpassword .code16d:hover{border:2px solid #ff881c}.flowerpassword #copycode16{color:#000;display:inline-block;padding:0 3px;cursor:pointer}.flowerpassword .copycode16d{background-color:#09c;border:2px solid #09c}.flowerpassword .copycode16d:hover{background-color:#ff881c;border:2px solid #ff881c}.flowerpassword p{font-size:12px;color:#666;margin:20px 0}.flowerpassword #copyOK{color:#f2f2f2;border:2px solid #f2f2f2;display:inline-block;margin-left:16px;padding:0 3px}.flowerpassword .down-button{margin:10px 20px 10px 0}.flowerpassword #get{margin-bottom:100px}.flowerpassword footer{margin:50px 0 30px}.flowerpassword footer p{margin:0 0 5px;color:#999}.flowerpassword footer p span{margin:0 10px}.flowerpassword footer p a{color:#999}.flowerpassword footer p a:hover{color:#333}.jdahd button{border-color:#000}.jdahd *{text-align:center;margin:0;box-sizing:border-box;background-color:transparent}.jdahd body{position:relative;height:100vh;text-align:center}.jdahd h1{text-align:center;margin:20px 0}.jdahd textarea{width:100%;clear:both;margin-bottom:10px;border-radius:7px;padding:15px 10px;font-size:14px;outline:none;-webkit-transition:all .2s ease-in;transition:all .2s ease-in}.jdahd input[type=button]{margin:0 auto;position:relative;vertical-align:top;width:150px;height:60px;padding:0;font-size:22px;font-weight:300;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.25);background:#2980b9;border:0;border-bottom:2px solid #2475ab;cursor:pointer;box-shadow:inset 0 -2px #2475ab}.jdahd input:active{top:1px;outline:none;box-shadow:none}.jdahd input:-ms-input-placeholder,.jdahd textarea:-ms-input-placeholder{color:#fff;font-size:20px;font-weight:300}.jdahd input::-moz-placeholder,.jdahd textarea::-moz-placeholder{color:#fff;font-size:20px;font-weight:300}.jdahd input::-webkit-input-placeholder,.jdahd textarea::-webkit-input-placeholder{color:#fff;font-size:20px;font-weight:300;box-shadow:none;-webkit-appearance:none}.jdahd footer{width:calc(100% - 40px);position:absolute;bottom:20px}.jdahd footer>p a{color:#2980b9;text-decoration:none}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}code{font-family:source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace}.jdahd #my\u5bfc\u822a\u680f{overflow:auto;max-height:100%;padding-right:0;padding-left:0}.jdahd *,.jdahd body{text-align:center}.jdahd h1{font-weight:300;font-size:40px}.jdahd h3{font-weight:700}.jdahd .actions,.jdahd li,.jdahd p,.jdahd textarea{width:100%}.jdahd textarea{border-color:#000;display:block;min-height:250px;margin:1em 0}.jdahd ul.pre li{white-space:pre}.jdahd .checkbox{display:inline-block}.jdahd .actions a{float:right}.jdahd .actions{clear:both}*{font-family:Microsoft Yahei}#nav{float:center}#app{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;margin-top:0}#App-logo{-webkit-animation:App-logo-spin 20s linear infinite;animation:App-logo-spin 20s linear infinite;height:40vmin;pointer-events:none}@keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}*{-webkit-user-select:text!important;-moz-user-select:text;-o-user-select:text;-ms-user-select:text!important;user-select:text!important}body,html{scroll-behavior:smooth}*{font-family:Microsoft Yahei,Helvetica,Tahoma,Arial,PingFang SC,Hiragino Sans GB,Heiti SC,MicrosoftYaHei,WenQuanYi Micro Hei,sans-serif!important}.hljs{display:block;overflow-x:auto;padding:.5em;color:#333;background:#f8f8f8;-webkit-text-size-adjust:none}.diff .hljs-header,.hljs-comment{color:#998;font-style:italic}.css .rule .hljs-keyword,.hljs-keyword,.hljs-request,.hljs-status,.hljs-subst,.hljs-winutils,.nginx .hljs-title{color:#333;font-weight:700}.hljs-hexcolor,.hljs-number,.ruby .hljs-constant{color:teal}.hljs-doctag,.hljs-string,.hljs-tag .hljs-value,.tex .hljs-formula{color:#d14}.hljs-id,.hljs-title,.scss .hljs-preprocessor{color:#900;font-weight:700}.hljs-list .hljs-keyword,.hljs-subst{font-weight:400}.hljs-class .hljs-title,.hljs-type,.tex .hljs-command,.vhdl .hljs-literal{color:#458;font-weight:700}.django .hljs-tag .hljs-keyword,.hljs-rule .hljs-property,.hljs-tag,.hljs-tag .hljs-title{color:navy;font-weight:400}.hljs-attribute,.hljs-name,.hljs-variable,.lisp .hljs-body{color:teal}.hljs-regexp{color:#009926}.clojure .hljs-keyword,.hljs-prompt,.hljs-symbol,.lisp .hljs-keyword,.ruby .hljs-symbol .hljs-string,.scheme .hljs-keyword,.tex .hljs-special{color:#990073}.hljs-built_in{color:#0086b3}.hljs-cdata,.hljs-doctype,.hljs-pi,.hljs-pragma,.hljs-preprocessor,.hljs-shebang{color:#999;font-weight:700}.hljs-deletion{background:#fdd}.hljs-addition{background:#dfd}.diff .hljs-change{background:#0086b3}.hljs-chunk{color:#aaa}#padding0{padding:0!important}@media (max-width:500px){hr#hidewidthless500{display:none}}.article-content{word-break:break-word;line-height:1.75;font-weight:400;font-size:15px;overflow-x:hidden}.article-content h1{margin:1.3rem 0;line-height:1.2}.article-content p{line-height:2.27rem}.article-content hr{border:none;border-top:1px solid #ddd;margin-top:2.7rem;margin-bottom:2.7rem}.article-content embed,.article-content iframe,.article-content img:not(.equation),.article-content video{max-width:100%!important;margin:0}.article-content img.lazyload{visibility:hidden}.article-content img.inited{background-color:#f8f9fa;background-position:50%;background-repeat:no-repeat;visibility:visible}.article-content img.loaded{background-image:none;background-color:transparent}.article-content img.equation{margin:0 .1em;max-width:100%!important;vertical-align:text-bottom}.article-content img:not(.equation){cursor:-webkit-zoom-in;cursor:zoom-in}.article-content figure{margin:2.7rem auto;text-align:center}.article-content figure figcaption{text-align:center;font-size:1rem;line-height:2.7rem;color:#909090}.article-content pre{line-height:1.93rem;overflow:auto}.article-content code,.article-content pre{font-family:Menlo,Monaco,Consolas,Courier New,monospace}.article-content code{font-size:1rem;padding:.26rem .53em;word-break:break-word;color:#4e5980;background-color:#f8f8f8;border-radius:2px;overflow-x:auto}.article-content pre>code{font-size:1rem;padding:.67rem 1.3rem;margin:0;word-break:normal;display:block}.article-content a{color:#259}.article-content a:active,.article-content a:hover{color:#275b8c}.article-content table{display:inline-block!important;font-size:1rem;width:auto;max-width:100%;overflow:auto;border:1px solid #f6f6f6}.article-content thead{background:#f6f6f6;color:#000;text-align:left}.article-content tr:nth-child(2n){background-color:#fcfcfc}.article-content td,.article-content th{padding:1rem .6rem;line-height:2rem}.article-content td{min-width:10rem}.article-content blockquote{margin:1em 0;border-left:4px solid #ddd;padding:0 1.3rem}.article-content blockquote>p{margin:.6rem 0}.article-content ol,.article-content ul{padding-left:2.7rem}.article-content ol li,.article-content ul li{margin-bottom:.6rem}.article-content ol ol,.article-content ol ul,.article-content ul ol,.article-content ul ul{margin-top:.27rem}.article-content pre>code{overflow-x:auto;-webkit-overflow-scrolling:touch;color:#333;background:#f8f8f8}.article-content .hljs-comment,.article-content .hljs-quote{color:#998}.article-content .hljs-keyword,.article-content .hljs-selector-tag,.article-content .hljs-subst{color:#333;font-weight:700}.article-content .hljs-literal,.article-content .hljs-number,.article-content .hljs-tag .hljs-attr,.article-content .hljs-template-variable,.article-content .hljs-variable{color:teal}.article-content .hljs-doctag,.article-content .hljs-string{color:#d14}.article-content .hljs-section,.article-content .hljs-selector-id,.article-content .hljs-title{color:#900;font-weight:700}.article-content .hljs-subst{font-weight:400}.article-content .hljs-class .hljs-title,.article-content .hljs-type{color:#458;font-weight:700}.article-content .hljs-attribute,.article-content .hljs-name,.article-content .hljs-tag{color:navy;font-weight:400}.article-content .hljs-link,.article-content .hljs-regexp{color:#009926}.article-content .hljs-bullet,.article-content .hljs-symbol{color:#990073}.article-content .hljs-built_in,.article-content .hljs-builtin-name{color:#0086b3}.article-content .hljs-meta{color:#999;font-weight:700}.article-content .hljs-deletion{background:#fdd}.article-content .hljs-addition{background:#dfd}.article-content .hljs-emphasis{font-style:italic}.article-content .hljs-strong{font-weight:700}.article-content p{line-height:inherit;margin-top:22px;margin-bottom:22px}.article-content img{max-height:none}.article-content a{color:#0269c8;border-bottom:1px solid #d1e9ff}.article-content code{background-color:#fff5f5;color:#ff502c;font-size:.87em;padding:.065em .4em}.article-content figure{margin:22px auto}.article-content figure figcaption{margin-top:2px;line-height:1.6}.article-content blockquote{color:#666;padding:1px 23px;margin:22px 0;border-left:4px solid #cbcbcb;background-color:#f8f8f8}.article-content blockquote:after{display:block;content:""}.article-content blockquote>p{margin:10px 0}.article-content blockquote.warning{position:relative;border-left-color:#f75151;margin-left:8px}.article-content blockquote.warning:before{position:absolute;top:14px;left:-12px;background:#f75151;border-radius:50%;content:"!";width:20px;height:20px;color:#fff;display:flex;align-items:center;justify-content:center}.article-content ol,.article-content ul{padding-left:28px}.article-content ol li,.article-content ul li{margin-bottom:0;list-style:inherit}.article-content ol li.task-list-item,.article-content ul li.task-list-item{list-style:none}.article-content ol li.task-list-item ol,.article-content ol li.task-list-item ul,.article-content ul li.task-list-item ol,.article-content ul li.task-list-item ul{margin-top:0}.article-content ol li{padding-left:6px}.article-content pre{position:relative;line-height:1.75}.article-content pre>code{padding:15px 12px}.article-content pre>code.hljs[lang]{padding:18px 15px 12px}.article-content pre>code.hljs[lang]:before{content:attr(lang);position:absolute;right:15px;top:2px;color:hsla(0,0%,54.9%,.8)}.article-content pre>code.hljs[lang][lang=bash]:before{content:""}.article-content pre>code.copyable .copy-code-btn{position:absolute;top:6px;right:15px;font-size:12px;line-height:1;cursor:pointer;color:hsla(0,0%,54.9%,.8);-webkit-transition:color .1s;transition:color .1s}.article-content pre>code.copyable .copy-code-btn:hover{color:#8c8c8c}.article-content pre>code.copyable.hljs[lang]:before{right:70px}.article-content h1,.article-content h2,.article-content h3,.article-content h4,.article-content h5,.article-content h6{color:#333;line-height:1.5;margin-top:35px;margin-bottom:10px;padding-bottom:5px}.article-content h1{font-size:30px;margin-bottom:5px}.article-content h2{padding-bottom:12px;font-size:24px;border-bottom:1px solid #ececec}.article-content h3{font-size:18px;padding-bottom:0}.article-content h4{font-size:16px}.article-content h5{font-size:15px}.article-content h6{margin-top:5px}.article-content h1.heading+h2.heading{margin-top:20px}.article-content h1.heading+h3.heading{margin-top:15px}.article-content .heading+.heading{margin-top:0}.article-content h1+:not(.heading){margin-top:25px}@media (max-width:720px){.article-content h1{font-size:24px}.article-content h2{font-size:20px}.article-content h3{font-size:18px}.article-content pre>code .copy-code-btn{display:none}.article-content pre>code.hljs[lang]:before{top:2px;right:15px}}@media (max-width:720px){.article-content pre>code.copyable.hljs[lang]:before{right:1rem}}';
    console.log([Jn, Jn]);
    const mycomapp$1 = Vn(() => {
        const inputpassword = Tr("");
        const inputref = Kr();
        const inputref2 = Kr();
        console.log(inputref2);
        console.log(inputpassword);
        le(inputpassword, console.log);
        const vdom = [
            Jn(
                "h1",
                {
                    style: "padding-top: 127.6px;"
                },
                Jn(
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
                    Jn("path", {
                        "fill-rule": "evenodd",
                        d:
                            "M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"
                    })
                ),
                Jn(
                    "svg",
                    {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 3046.7 875.7",
                        style: "\n      width: 100%;\n      height: 200px;\n  "
                    },
                    Jn("title", null, "logo-on-dark-bg"),
                    Jn("rect", {
                        Color: "#FFF",
                        x: "0",
                        y: "0",
                        width: "3046.7",
                        height: "875.7"
                    }),
                    Jn("path", {
                        fill: "#FFF",
                        d:
                            "M387 0l387 218.9v437.9L387 875.7 0 656.8V218.9L387 0z"
                    }),
                    Jn("path", {
                        fill: "#8ED6FB",
                        d:
                            "M704.9 641.7L399.8 814.3V679.9l190.1-104.6 115 66.4zm20.9-18.9V261.9l-111.6 64.5v232l111.6 64.4zM67.9 641.7L373 814.3V679.9L182.8 575.3 67.9 641.7zM47 622.8V261.9l111.6 64.5v232L47 622.8zm13.1-384.3L373 61.5v129.9L172.5 301.7l-1.6.9-110.8-64.1zm652.6 0l-312.9-177v129.9l200.5 110.2 1.6.9 110.8-64z"
                    }),
                    Jn("path", {
                        fill: "#1C78C0",
                        d:
                            "M373 649.3L185.4 546.1V341.8L373 450.1v199.2zm26.8 0l187.6-103.1V341.8L399.8 450.1v199.2zM198.1 318.2l188.3-103.5 188.3 103.5-188.3 108.7-188.3-108.7z"
                    }),
                    Jn("path", {
                        fill: "#F5FAFA",
                        d:
                            "M1164.3 576.3h82.5l84.1-280.2h-80.4l-49.8 198.8-53.1-198.8H1078l-53.6 198.8-49.3-198.8h-80.4l83.6 280.2h82.5l52-179.5 51.5 179.5zM1335.2 437c0 84.1 57.3 146.3 147.4 146.3 69.7 0 107.2-41.8 117.9-61.6l-48.8-37c-8 11.8-30 34.3-68.1 34.3-41.3 0-71.3-26.8-72.9-64.3H1608c.5-5.4.5-10.7.5-16.1 0-91.6-49.3-149.5-136.1-149.5-79.9 0-137.2 63.2-137.2 147.9zm77.7-30.6c3.2-32.1 25.7-56.8 60.6-56.8 33.8 0 58.4 22.5 60 56.8h-120.6zm223.5 169.9h69.7v-28.9c7.5 9.1 35.4 35.9 83.1 35.9 80.4 0 137.2-60.5 137.2-146.8 0-86.8-52.5-147.3-132.9-147.3-48.2 0-76.1 26.8-83.1 36.4V188.9h-73.9v387.4h-.1zm71.8-139.3c0-52.5 31.1-82.5 71.8-82.5 42.9 0 71.8 33.8 71.8 82.5 0 49.8-30 80.9-71.8 80.9-45 0-71.8-36.5-71.8-80.9zm247 239.5h73.9V547.3c7 9.1 34.8 35.9 83.1 35.9 80.4 0 132.9-60.5 132.9-147.3 0-85.7-56.8-146.8-137.2-146.8-47.7 0-75.6 26.8-83.1 36.4V296h-69.7v380.5h.1zm71.8-241.1c0-44.5 26.8-80.9 71.8-80.9 41.8 0 71.8 31.1 71.8 80.9 0 48.8-28.9 82.5-71.8 82.5-40.7 0-71.8-30-71.8-82.5zm231.5 54.1c0 58.9 48.2 93.8 105 93.8 32.2 0 53.6-9.6 68.1-25.2l4.8 18.2h65.4V398.9c0-62.7-26.8-109.8-116.8-109.8-42.9 0-85.2 16.1-110.4 33.2l27.9 50.4c20.9-10.7 46.6-19.8 74.5-19.8 32.7 0 50.9 16.6 50.9 41.3v18.2c-10.2-7-32.2-15.5-60.6-15.5-65.4-.1-108.8 37.4-108.8 92.6zm73.9-2.2c0-23 19.8-39.1 48.2-39.1s48.8 14.5 48.8 39.1c0 23.6-20.4 38.6-48.2 38.6s-48.8-15.5-48.8-38.6zm348.9 30.6c-46.6 0-79.8-33.8-79.8-81.4 0-45 29.5-82 77.2-82 31.6 0 53.1 15.5 65.4 26.8l20.9-62.2c-18.2-13.9-47.2-30-88.4-30-85.2 0-149 62.7-149 147.9s62.2 146.3 149.5 146.3c40.7 0 71.3-17.1 87.3-30l-19.8-60.5c-12.4 10.1-34.9 25.1-63.3 25.1zm110.9 58.4h73.9V431.6l93.8 144.7h86.8L2940.6 423l98.6-127h-83.1l-90 117.9v-225h-73.9v387.4z"
                    })
                )
            ),
            Jn(
                "div",
                null,
                Jn(
                    "div",
                    null,
                    Jn(
                        "noscript",
                        null,
                        "You need to enable JavaScript to run this app."
                    ),
                    Jn(
                        "div",
                        {
                            id: "root"
                        },
                        Jn(
                            "div",
                            null,
                            Jn(
                                "div",
                                {
                                    class: "container-fluid fixed-top",
                                    id: "my\u5bfc\u822a\u680f"
                                },
                                Jn(
                                    "nav",
                                    {
                                        class:
                                            "navbar navbar-default navbar navbar-expand-sm bg-light navbar-light",
                                        role: "navigation"
                                    },
                                    Jn(
                                        "div",
                                        null,
                                        Jn(
                                            "a",
                                            {
                                                class:
                                                    "navbar-brand mui-btn mui-btn-primary mui-btn-outlined",
                                                href: "#/"
                                            },
                                            "masx200\u7684",
                                            Jn("hr", {
                                                id: "hidewidthless500"
                                            }),
                                            "github\u4e3b\u9875"
                                        ),
                                        Jn(
                                            "button",
                                            {
                                                class: "navbar-toggler",
                                                type: "button",
                                                "data-toggle": "collapse"
                                            },
                                            Jn("span", {
                                                class: "navbar-toggler-icon"
                                            })
                                        )
                                    ),
                                    Jn(
                                        "div",
                                        {
                                            class: "collapse navbar-collapse",
                                            id: "example-navbar-collapse",
                                            style: "display: none;"
                                        },
                                        Jn(
                                            "ul",
                                            {
                                                class: "nav navbar-nav",
                                                id: "allnavbar"
                                            },
                                            Jn(
                                                "li",
                                                {
                                                    id: "mynav1"
                                                },
                                                Jn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href: "#/react-home"
                                                    },
                                                    "\u57fa\u4e8eREACT\u7684\u4e3b\u9875"
                                                )
                                            ),
                                            Jn(
                                                "li",
                                                null,
                                                Jn(
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
                                            Jn(
                                                "li",
                                                {
                                                    id: "mynav2"
                                                },
                                                Jn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href: "#/react-about"
                                                    },
                                                    "\u5173\u4e8eREACT"
                                                )
                                            ),
                                            Jn(
                                                "li",
                                                {
                                                    class: "nav-item"
                                                },
                                                Jn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href: "#/picalc"
                                                    },
                                                    "\u5706\u5468\u7387\u8ba1\u7b97\u591a\u7ebf\u7a0b"
                                                )
                                            ),
                                            Jn(
                                                "li",
                                                null,
                                                Jn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href: "#/react-huami"
                                                    },
                                                    "\u82b1\u5bc6\u7f51\u9875\u7248"
                                                )
                                            ),
                                            Jn(
                                                "li",
                                                null,
                                                Jn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href: "#/decoder"
                                                    },
                                                    "JSfuck-and-hieroglyphy-Decoder"
                                                )
                                            ),
                                            Jn(
                                                "li",
                                                null,
                                                Jn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href: "#/jsfuck"
                                                    },
                                                    "JSfuck-ENCODER"
                                                )
                                            ),
                                            Jn(
                                                "li",
                                                null,
                                                Jn(
                                                    "a",
                                                    {
                                                        class:
                                                            "nav-link mui-btn mui-btn-primary mui-btn-outlined",
                                                        href: "#/hieroglyphy"
                                                    },
                                                    "hieroglyphy-ENCODER"
                                                )
                                            ),
                                            Jn(
                                                "li",
                                                null,
                                                Jn(
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
                                            Jn(
                                                "li",
                                                {
                                                    class: "nav-item"
                                                },
                                                Jn(
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
                                            Jn(
                                                "li",
                                                {
                                                    class: "nav-item"
                                                },
                                                Jn(
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
                                            Jn(
                                                "li",
                                                {
                                                    class: "nav-item"
                                                },
                                                Jn(
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
                                            Jn(
                                                "li",
                                                {
                                                    class: "nav-item"
                                                },
                                                Jn(
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
                                            Jn(
                                                "li",
                                                null,
                                                Jn(
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
                                            Jn(
                                                "li",
                                                null,
                                                Jn(
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
                            Jn(
                                "div",
                                {
                                    class: "container",
                                    id: "my\u4e3b\u4f53",
                                    style: "padding-top: 127.6px;"
                                },
                                Jn(
                                    "div",
                                    {
                                        class: "hello flowerpassword"
                                    },
                                    Jn(
                                        "h1",
                                        null,
                                        "\u82b1\u5bc6 \u4e0d\u4e00\u6837\u7684\u5bc6\u7801\u7ba1\u7406\u5de5\u5177"
                                    ),
                                    Jn(
                                        "div",
                                        {
                                            id: "rong1",
                                            class: "container",
                                            style: "text-align: center;"
                                        },
                                        Jn(
                                            "div",
                                            {
                                                id: "rong2"
                                            },
                                            Jn(
                                                "h2",
                                                null,
                                                Jn("span", null, "1"),
                                                "\u8f93\u5165"
                                            ),
                                            Jn(
                                                "div",
                                                {
                                                    id: "input"
                                                },
                                                Jn("p", null),
                                                Jn(
                                                    "h3",
                                                    null,
                                                    "\u8bb0\u5fc6\u5bc6\u7801"
                                                ),
                                                Jn("p", null),
                                                Jn(
                                                    "p",
                                                    null,
                                                    Jn("input", {
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
                                                Jn("p", null),
                                                Jn("span", null, "+"),
                                                Jn(
                                                    "h3",
                                                    null,
                                                    "\u533a\u5206\u4ee3\u53f7"
                                                ),
                                                Jn("p", null),
                                                Jn(
                                                    "p",
                                                    null,
                                                    Jn("input", {
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
                                            Jn("br", null),
                                            Jn("p", null),
                                            Jn(
                                                "h2",
                                                null,
                                                Jn("span", null, "2"),
                                                "\u83b7\u53d6"
                                            ),
                                            Jn("p", null),
                                            Jn(
                                                "div",
                                                {
                                                    id: "get"
                                                },
                                                Jn("p", {
                                                    id: "tuijian"
                                                }),
                                                Jn("p", null),
                                                Jn(
                                                    "h3",
                                                    null,
                                                    "\u6700\u7ec8\u5bc6\u7801"
                                                ),
                                                Jn("p", null),
                                                Jn(
                                                    "span",
                                                    {
                                                        id: "myhezi"
                                                    },
                                                    Jn(
                                                        "p",
                                                        null,
                                                        Jn("input", {
                                                            id:
                                                                "cod222222222222e16",
                                                            readonly: "",
                                                            class:
                                                                "col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control",
                                                            value: ""
                                                        })
                                                    ),
                                                    Jn("br", null),
                                                    Jn(
                                                        "p",
                                                        null,
                                                        Jn(
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
                                                Jn(
                                                    "p",
                                                    null,
                                                    Jn(
                                                        "span",
                                                        {
                                                            id: "copyOK",
                                                            style:
                                                                "display: none;"
                                                        },
                                                        "\u221a\u590d\u5236\u6210\u529f"
                                                    )
                                                ),
                                                Jn("p", null)
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    Jn("script", {
                        type: "text/javascript",
                        src:
                            "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/bundle.runtime~main.3a15bebb435b0d3fead6.js"
                    }),
                    Jn("script", {
                        type: "text/javascript",
                        src:
                            "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/chunk.vendors~main.f7c5ea92c1b78a8ff211.js"
                    }),
                    Jn("script", {
                        type: "text/javascript",
                        src:
                            "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/chunk.main.b9c7ffd191cff11a9b96.js"
                    })
                ),
                Jn(
                    "div",
                    {
                        contenteditable: false
                    },
                    "\u4e0d\u53ef\u4ee5\u7f16\u8f91\u7684\u533a\u57df"
                ),
                Jn(
                    "div",
                    {
                        contenteditable: true
                    },
                    "\u53ef\u4ee5\u7f16\u8f91\u7684\u533a\u57df"
                )
            ),
            Jn(
                "h1",
                null,
                Jn(
                    "svg",
                    {
                        xmlns: "http://www.w3.org/2000/svg",
                        "xmlns:xlink": "http://www.w3.org/1999/xlink",
                        version: "1.1",
                        baseProfile: "full",
                        style: "\n      width:600px;\n      height: 600px;\n  "
                    },
                    Jn(
                        "g",
                        {
                            "fill-opacity": "0.7",
                            stroke: "black",
                            "stroke-width": "0.1cm"
                        },
                        Jn("circle", {
                            cx: "6cm",
                            cy: "2cm",
                            r: "100",
                            fill: "red",
                            transform: "translate(0,50)"
                        }),
                        Jn("circle", {
                            cx: "6cm",
                            cy: "2cm",
                            r: "100",
                            fill: "blue",
                            transform: "translate(70,150)"
                        }),
                        Jn("circle", {
                            cx: "6cm",
                            cy: "2cm",
                            r: "100",
                            fill: "green",
                            transform: "translate(-70,150)"
                        })
                    )
                ),
                Jn(
                    "svg",
                    {
                        style: "\n      width: 100%;\n      height: 200px;\n  ",
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 3046.7 875.7"
                    },
                    Jn("title", null, "logo-on-dark-bg"),
                    Jn("rect", {
                        Color: "#FFF",
                        x: "0",
                        y: "0",
                        width: "3046.7",
                        height: "875.7"
                    }),
                    Jn("path", {
                        fill: "#FFF",
                        d:
                            "M387 0l387 218.9v437.9L387 875.7 0 656.8V218.9L387 0z"
                    }),
                    Jn("path", {
                        fill: "#8ED6FB",
                        d:
                            "M704.9 641.7L399.8 814.3V679.9l190.1-104.6 115 66.4zm20.9-18.9V261.9l-111.6 64.5v232l111.6 64.4zM67.9 641.7L373 814.3V679.9L182.8 575.3 67.9 641.7zM47 622.8V261.9l111.6 64.5v232L47 622.8zm13.1-384.3L373 61.5v129.9L172.5 301.7l-1.6.9-110.8-64.1zm652.6 0l-312.9-177v129.9l200.5 110.2 1.6.9 110.8-64z"
                    }),
                    Jn("path", {
                        fill: "#1C78C0",
                        d:
                            "M373 649.3L185.4 546.1V341.8L373 450.1v199.2zm26.8 0l187.6-103.1V341.8L399.8 450.1v199.2zM198.1 318.2l188.3-103.5 188.3 103.5-188.3 108.7-188.3-108.7z"
                    }),
                    Jn("path", {
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
    var vdom$2 = Jn(mycomapp$1);
    mn(vdom$2, document.getElementById("root"));
    console.log([Jn, Jn]);
    const vdom$3 = Jn(
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
        Jn(
            "option",
            {
                value: "0"
            },
            "- Select version -"
        ),
        Jn(
            "option",
            {
                value: "94b92331-e2f4-40c6-90ee-80e203a4de3a"
            },
            "Windows 10 Insider Preview 18999.1 (vb_release) [arm64]"
        ),
        Jn(
            "option",
            {
                value: "7268dbc9-dfe0-4947-af82-67f384e95cb6"
            },
            "Windows 10 Insider Preview 18999.1 (vb_release) [x64]"
        ),
        Jn(
            "option",
            {
                value: "08f0d32e-c68a-46a8-b301-57e86b4e96e0"
            },
            "Windows 10 Insider Preview 18999.1 (vb_release) [x86]"
        ),
        Jn(
            "option",
            {
                value: "9fa87c7f-75fa-4e5e-9ca3-1e19cb2c743f"
            },
            "Windows 10 Insider Preview 18995.1 (vb_release) [x64]"
        ),
        Jn(
            "option",
            {
                value: "5173796c-11ac-47d7-9ed7-dbad6d5c9486"
            },
            "Windows 10 Insider Preview 18995.1 (vb_release) [x86]"
        ),
        Jn(
            "option",
            {
                value: "4adf5f24-213a-472c-ae94-70f3cb81bade"
            },
            "Windows 10 Insider Preview 18995.1 (vb_release) [arm64]"
        ),
        Jn(
            "option",
            {
                value: "9287fe5e-2cb3-4064-820f-3e336a3ddff4"
            },
            "Windows 10 Insider Preview 18990.1 (vb_release) [arm64]"
        ),
        Jn(
            "option",
            {
                value: "5e420f0d-b3a5-424c-9b55-5c2cf939af14"
            },
            "Windows 10 Insider Preview 18990.1 (vb_release) [x86]"
        ),
        Jn(
            "option",
            {
                value: "13e2104c-c98c-43b2-b232-9b2a4b5af2ac"
            },
            "Windows 10 Insider Preview 18990.1 (vb_release) [x64]"
        )
    );
    const element = document.body.appendChild(
        mn(vdom$3, document.createElement("div"))
    );
    console.log([vdom$3, element]);
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
            if (enumerableOnly)
                symbols = symbols.filter(function(sym) {
                    return Object.getOwnPropertyDescriptor(
                        object,
                        sym
                    ).enumerable;
                });
            keys.push.apply(keys, symbols);
        }
        return keys;
    }
    function _objectSpread2(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            if (i % 2) {
                ownKeys(Object(source), true).forEach(function(key) {
                    _defineProperty(target, key, source[key]);
                });
            } else if (Object.getOwnPropertyDescriptors) {
                Object.defineProperties(
                    target,
                    Object.getOwnPropertyDescriptors(source)
                );
            } else {
                ownKeys(Object(source)).forEach(function(key) {
                    Object.defineProperty(
                        target,
                        key,
                        Object.getOwnPropertyDescriptor(source, key)
                    );
                });
            }
        }
        return target;
    }
    console.log([Jn, Jn]);
    const number = Tr(10);
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
    const mycomappclass = Vn(() => {
        le(store.number, number => {
            console.log(_objectSpread2({}, store), number);
        });
        const vdom = Jn(
            "div",
            null,
            Jn("h3", null, " \u70b9\u51fb\u6570\u5b57"),
            Jn("h2", null, "number:", store.number),
            Jn(
                "button",
                {
                    onclick: store.increment
                },
                "increment"
            ),
            Jn(
                "button",
                {
                    onclick: store.decrement
                },
                "decrement"
            )
        );
        return vdom;
    });
    let vdom$4 = [Jn(mycomappclass), Jn(mycomappclass), Jn(mycomappclass)];
    document.body.appendChild(mn(vdom$4, document.createElement("div")));
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
    console.log([Jn, Jn]);
    const lirefs = [];
    const temp_ref = Kr();
    const check = Tr(false);
    const check2 = Tr(true);
    le(check2, a => console.log(a));
    const check3 = Tr(true);
    le(check3, a => console.log(a));
    const check4 = Tr(true);
    le(check4, a => console.log(a));
    const notcheck = sr(
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
    le(check, a => console.log(a));
    le(notcheck, a => console.log(a));
    var vdom$5 = Jn(
        "",
        null,
        Jn("input", {
            type: "radio",
            _checked: check4,
            name: "myname1"
        }),
        Jn("input", {
            type: "radio",
            _checked: check3,
            name: "myname1"
        }),
        Jn("input", {
            type: "radio",
            _checked: check2,
            name: "myname2"
        }),
        Jn("input", {
            type: "radio",
            _checked: check4,
            name: "myname2"
        }),
        [
            Jn("input", {
                type: "checkbox",
                _checked: check
            }),
            Jn("input", {
                type: "checkbox",
                _checked: notcheck
            }),
            Jn(
                "",
                null,
                Jn(
                    "ul",
                    null,
                    list.map((a, index) =>
                        Jn(
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
                Jn(
                    "header",
                    {
                        class: "common-header fixed noborder floating",
                        id: "git-header-nav",
                        _ref: temp_ref
                    },
                    Jn(
                        "div",
                        {
                            class: "ui container"
                        },
                        Jn(
                            "div",
                            {
                                class: "ui menu header-menu"
                            },
                            Jn(
                                "div",
                                {
                                    class: "git-nav-expand-bar"
                                },
                                Jn("i", {
                                    class: "iconfont icon-mode-table"
                                })
                            ),
                            Jn(
                                "div",
                                {
                                    class: "gitee-nav__sidebar"
                                },
                                Jn(
                                    "div",
                                    {
                                        class: "gitee-nav__sidebar-container"
                                    },
                                    Jn(
                                        "div",
                                        {
                                            class: "gitee-nav__sidebar-top"
                                        },
                                        Jn(
                                            "div",
                                            {
                                                class: "gitee-nav__avatar-box"
                                            },
                                            Jn(
                                                "a",
                                                {
                                                    href: "/masx200",
                                                    onclick: e =>
                                                        e.preventDefault()
                                                },
                                                Jn("img", {
                                                    alt: "1081296_masx200",
                                                    class:
                                                        "ui avatar image masx200-avatar",
                                                    src:
                                                        "https://avatar.gitee.com/uploads/96/1081296_masx200.png?1566294318"
                                                })
                                            )
                                        ),
                                        Jn(
                                            "div",
                                            {
                                                class: "gitee-nav__info-box"
                                            },
                                            Jn(
                                                "a",
                                                {
                                                    href: "/masx200"
                                                },
                                                "masx200"
                                            )
                                        )
                                    ),
                                    Jn(
                                        "div",
                                        {
                                            class: "gitee-nav__sidebar-middle"
                                        },
                                        Jn(
                                            "div",
                                            {
                                                class: "gitee-nav__sidebar-list"
                                            },
                                            Jn(
                                                "ul",
                                                null,
                                                Jn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Jn(
                                                        "a",
                                                        {
                                                            href: "/masx200"
                                                        },
                                                        Jn("i", {
                                                            class:
                                                                "iconfont icon-ic-dashboard"
                                                        }),
                                                        Jn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u4e2a\u4eba\u4e3b\u9875"
                                                        )
                                                    )
                                                ),
                                                Jn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Jn(
                                                        "a",
                                                        {
                                                            href: "/explore"
                                                        },
                                                        Jn("i", {
                                                            class:
                                                                "iconfont icon-ic-discover"
                                                        }),
                                                        Jn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u5f00\u6e90\u8f6f\u4ef6"
                                                        )
                                                    )
                                                ),
                                                Jn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Jn(
                                                        "a",
                                                        {
                                                            href: "/gists"
                                                        },
                                                        Jn("i", {
                                                            class:
                                                                "iconfont icon-ic-gists1"
                                                        }),
                                                        Jn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u4ee3\u7801\u7247\u6bb5"
                                                        )
                                                    )
                                                ),
                                                Jn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Jn(
                                                        "a",
                                                        {
                                                            href: "/enterprises"
                                                        },
                                                        Jn("i", {
                                                            class:
                                                                "iconfont icon-ic-enterprise"
                                                        }),
                                                        Jn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u4f01\u4e1a\u7248"
                                                        )
                                                    )
                                                ),
                                                Jn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Jn(
                                                        "a",
                                                        {
                                                            href: "/education"
                                                        },
                                                        Jn("i", {
                                                            class:
                                                                "iconfont icon-ic-education"
                                                        }),
                                                        Jn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u9ad8\u6821\u7248"
                                                        )
                                                    )
                                                ),
                                                Jn("li", {
                                                    class:
                                                        "gitee-nav__sidebar-item split-line"
                                                }),
                                                Jn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Jn(
                                                        "a",
                                                        {
                                                            href: "/search"
                                                        },
                                                        Jn("i", {
                                                            class:
                                                                "iconfont icon-ic-search"
                                                        }),
                                                        Jn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u641c\u7d22"
                                                        )
                                                    )
                                                ),
                                                Jn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Jn(
                                                        "a",
                                                        {
                                                            href: "/help"
                                                        },
                                                        Jn("i", {
                                                            class:
                                                                "iconfont icon-help-circle"
                                                        }),
                                                        Jn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u5e2e\u52a9\u4e2d\u5fc3"
                                                        )
                                                    )
                                                ),
                                                Jn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Jn(
                                                        "a",
                                                        {
                                                            href: "/terms"
                                                        },
                                                        Jn("i", {
                                                            class:
                                                                "iconfont icon-file"
                                                        }),
                                                        Jn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u4f7f\u7528\u6761\u6b3e"
                                                        )
                                                    )
                                                ),
                                                Jn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Jn(
                                                        "a",
                                                        {
                                                            href: "/about_us"
                                                        },
                                                        Jn("i", {
                                                            class:
                                                                "iconfont icon-issuepx"
                                                        }),
                                                        Jn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u5173\u4e8e\u6211\u4eec"
                                                        )
                                                    )
                                                ),
                                                Jn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Jn(
                                                        "a",
                                                        {
                                                            href: "/profile"
                                                        },
                                                        Jn("i", {
                                                            class:
                                                                "iconfont icon-edit"
                                                        }),
                                                        Jn(
                                                            "span",
                                                            {
                                                                class:
                                                                    "gitee-nav__sidebar-name"
                                                            },
                                                            "\u8bbe\u7f6e"
                                                        )
                                                    )
                                                ),
                                                Jn(
                                                    "li",
                                                    {
                                                        class:
                                                            "gitee-nav__sidebar-item"
                                                    },
                                                    Jn(
                                                        "a",
                                                        {
                                                            href: "/logout",
                                                            "data-method":
                                                                "delete",
                                                            rel: "nofollow"
                                                        },
                                                        Jn("i", {
                                                            class:
                                                                "iconfont icon-ic-logout"
                                                        }),
                                                        Jn(
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
                                    Jn(
                                        "div",
                                        {
                                            class: "gitee-nav__sidebar-bottom"
                                        },
                                        Jn(
                                            "div",
                                            {
                                                class:
                                                    "gitee-nav__sidebar-close-button"
                                            },
                                            Jn("i", {
                                                class: "fa fa-angle-double-left"
                                            })
                                        )
                                    )
                                )
                            ),
                            Jn(
                                "div",
                                {
                                    class: "item gitosc-logo"
                                },
                                Jn(
                                    "a",
                                    {
                                        href: "/"
                                    },
                                    Jn("img", {
                                        class: "ui inline image",
                                        height: "28",
                                        src:
                                            "https://gitee.com//logo.svg?20171024",
                                        width: "95"
                                    }),
                                    Jn("img", {
                                        class: "ui inline black image",
                                        height: "28",
                                        src:
                                            "https://gitee.com//logo-black.svg?20171024",
                                        width: "95"
                                    })
                                )
                            ),
                            Jn(
                                "a",
                                {
                                    href: "/explore",
                                    class: "item ",
                                    title: "\u5f00\u6e90\u8f6f\u4ef6"
                                },
                                "\u5f00\u6e90\u8f6f\u4ef6"
                            ),
                            Jn(
                                "a",
                                {
                                    href: "/enterprises",
                                    class: "item ",
                                    title: "\u4f01\u4e1a\u7248"
                                },
                                "\u4f01\u4e1a\u7248",
                                Jn(
                                    "sup",
                                    {
                                        class: "ui red label"
                                    },
                                    "\u7279\u60e0"
                                )
                            ),
                            Jn(
                                "a",
                                {
                                    href: "/education",
                                    class: "item ",
                                    title: "\u9ad8\u6821\u7248"
                                },
                                "\u9ad8\u6821\u7248"
                            ),
                            Jn(
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
                            Jn(
                                "div",
                                {
                                    class: "dropdown item ui",
                                    id: "my-gitee-dropdown",
                                    tabindex: "0"
                                },
                                Jn(
                                    "a",
                                    {
                                        href: "/masx200/dashboard"
                                    },
                                    "\u6211\u7684\u7801\u4e91"
                                ),
                                Jn("i", {
                                    class: "dropdown icon"
                                }),
                                Jn(
                                    "div",
                                    {
                                        class: "menu transition hidden",
                                        tabindex: "-1"
                                    },
                                    Jn(
                                        "div",
                                        {
                                            class: "header user-projects"
                                        },
                                        Jn(
                                            "a",
                                            {
                                                href: "/masx200/projects",
                                                class: "pull-right",
                                                target: "_blank"
                                            },
                                            "\u5168\u90e8"
                                        ),
                                        "\u4ed3\u5e93",
                                        Jn(
                                            "span",
                                            {
                                                class: "count"
                                            },
                                            "(11)"
                                        )
                                    ),
                                    Jn(
                                        "a",
                                        {
                                            target: "_blank",
                                            href: "/masx200/mvvm-reactive-view",
                                            title: "masx200/mvvm-reactive-view",
                                            class: "item"
                                        },
                                        "masx200/mvvm-reactive-view"
                                    ),
                                    Jn(
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
                                    Jn(
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
                                    Jn(
                                        "a",
                                        {
                                            target: "_blank",
                                            href: "/masx200/importcjsamdumd",
                                            title: "masx200/importcjsamdumd",
                                            class: "item"
                                        },
                                        "masx200/importcjsamdumd"
                                    ),
                                    Jn(
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
                            Jn(
                                "div",
                                {
                                    class: "center responsive-logo"
                                },
                                Jn(
                                    "a",
                                    {
                                        href: "/"
                                    },
                                    Jn("img", {
                                        class: "ui inline image",
                                        height: "24",
                                        src:
                                            "https://gitee.com//logo.svg?20171024",
                                        width: "85"
                                    }),
                                    Jn("img", {
                                        class: "ui inline black image",
                                        height: "24",
                                        src:
                                            "https://gitee.com//logo-black.svg?20171024",
                                        width: "85"
                                    })
                                )
                            ),
                            Jn(
                                "div",
                                {
                                    class: "right menu userbar",
                                    id: "git-nav-user-bar"
                                },
                                Jn(
                                    "div",
                                    {
                                        class: "item git-nav-search-item"
                                    },
                                    Jn(
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
                                        Jn(
                                            "div",
                                            {
                                                style:
                                                    "margin:0;padding:0;display:inline"
                                            },
                                            Jn("input", {
                                                name: "utf8",
                                                type: "hidden",
                                                value: "\u2713"
                                            })
                                        ),
                                        Jn(
                                            "div",
                                            {
                                                class: "ui mini fluid input"
                                            },
                                            Jn("input", {
                                                id: "navbar-search-input",
                                                name: "q",
                                                placeholder:
                                                    "\u641c\u7d22\u9879\u76ee\u3001\u4ee3\u7801\u7247\u6bb5...",
                                                type: "text",
                                                value: ""
                                            }),
                                            Jn("input", {
                                                id: "navbar-search-type",
                                                name: "type",
                                                type: "hidden"
                                            })
                                        )
                                    )
                                ),
                                Jn(
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
                                    Jn(
                                        "a",
                                        {
                                            href: "/notifications",
                                            class: "remind-button"
                                        },
                                        Jn("i", {
                                            class: "iconfont icon-remind"
                                        }),
                                        Jn(
                                            "div",
                                            {
                                                class: "notice-count total"
                                            },
                                            "1"
                                        )
                                    ),
                                    Jn(
                                        "div",
                                        {
                                            class:
                                                "notice-dropdown-panel menu transition hidden",
                                            tabindex: "-1",
                                            style: "left: -165px;"
                                        },
                                        Jn(
                                            "div",
                                            {
                                                class:
                                                    "notice-dropdown-panel-header"
                                            },
                                            Jn(
                                                "div",
                                                {
                                                    class: "tab",
                                                    "data-data-path":
                                                        "/notifications/notices?scope=referer",
                                                    "data-html-path":
                                                        "/notifications/referer",
                                                    "data-scope": "referer"
                                                },
                                                Jn(
                                                    "div",
                                                    {
                                                        class: "content"
                                                    },
                                                    "@ \u6211",
                                                    Jn("div", {
                                                        class:
                                                            "notice-count referer"
                                                    })
                                                )
                                            ),
                                            Jn(
                                                "div",
                                                {
                                                    class: "tab active",
                                                    "data-data-path":
                                                        "/notifications/notices?scope=infos",
                                                    "data-html-path":
                                                        "/notifications/infos",
                                                    "data-scope": "infos"
                                                },
                                                Jn(
                                                    "div",
                                                    {
                                                        class: "content"
                                                    },
                                                    "\u901a\u77e5",
                                                    Jn(
                                                        "div",
                                                        {
                                                            class:
                                                                "notice-count infos"
                                                        },
                                                        "1"
                                                    )
                                                )
                                            ),
                                            Jn(
                                                "div",
                                                {
                                                    class: "tab",
                                                    "data-data-path":
                                                        "/notifications/notices?scope=messages",
                                                    "data-html-path":
                                                        "/notifications/messages",
                                                    "data-scope": "messages"
                                                },
                                                Jn(
                                                    "div",
                                                    {
                                                        class: "content"
                                                    },
                                                    "\u79c1\u4fe1",
                                                    Jn("div", {
                                                        class:
                                                            "notice-count messages"
                                                    })
                                                )
                                            )
                                        ),
                                        Jn(
                                            "div",
                                            {
                                                class:
                                                    "item notice-dropdown-panel-container"
                                            },
                                            Jn(
                                                "div",
                                                {
                                                    class:
                                                        "ui dimmer over active"
                                                },
                                                Jn("div", {
                                                    class: "ui loader"
                                                })
                                            ),
                                            Jn(
                                                "div",
                                                {
                                                    class: "notice-list",
                                                    style: "min-height: auto;"
                                                },
                                                Jn(
                                                    "a",
                                                    {
                                                        class: "noti",
                                                        href:
                                                            "/masx200/mvvm-reactive-view",
                                                        target: "_blank",
                                                        "data-type": "project",
                                                        "data-id": "50555275"
                                                    },
                                                    Jn(
                                                        "div",
                                                        {
                                                            class: "title"
                                                        },
                                                        "\u4f60\u7684\u4ed3\u5e93 masx200/mvvm-reactive-view \u5df2\u7ecf\u4ece https://github.com/masx200/mvvm-reactive-view.git \u540c\u6b65\u6210\u529f"
                                                    ),
                                                    Jn(
                                                        "div",
                                                        {
                                                            class: "meta"
                                                        },
                                                        Jn(
                                                            "time",
                                                            {
                                                                class: "timeago"
                                                            },
                                                            "2\u5c0f\u65f6\u524d"
                                                        ),
                                                        " ",
                                                        "\xb7",
                                                        " ",
                                                        Jn(
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
                                            Jn(
                                                "div",
                                                {
                                                    class:
                                                        "notice-dropdown-panel-blank"
                                                },
                                                "\u6682\u6ca1\u6709\u65b0\u6d88\u606f"
                                            )
                                        ),
                                        Jn(
                                            "div",
                                            {
                                                class:
                                                    "notice-dropdown-panel-footer"
                                            },
                                            Jn(
                                                "div",
                                                {
                                                    class: "action"
                                                },
                                                Jn(
                                                    "div",
                                                    {
                                                        class: "side left"
                                                    },
                                                    Jn(
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
                                                Jn(
                                                    "div",
                                                    {
                                                        class: "side right"
                                                    },
                                                    Jn(
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
                                Jn(
                                    "div",
                                    {
                                        class: "ui dropdown link item",
                                        id: "git-nav-create",
                                        tabindex: "0"
                                    },
                                    Jn("i", {
                                        class: "iconfont icon-add-thin"
                                    }),
                                    Jn(
                                        "div",
                                        {
                                            class: "right menu",
                                            tabindex: "-1"
                                        },
                                        Jn(
                                            "a",
                                            {
                                                href: "/projects/new",
                                                class: "item"
                                            },
                                            Jn("i", {
                                                class: "add square icon"
                                            }),
                                            "\u65b0\u5efa\u4ed3\u5e93"
                                        ),
                                        Jn(
                                            "a",
                                            {
                                                href: "/masx200/codes/new",
                                                class: "item"
                                            },
                                            Jn("i", {
                                                class: "code icon"
                                            }),
                                            "\u53d1\u5e03\u4ee3\u7801\u7247\u6bb5"
                                        ),
                                        Jn(
                                            "a",
                                            {
                                                href: "/organizations/new",
                                                class: "item"
                                            },
                                            Jn("i", {
                                                class: "group icon"
                                            }),
                                            "\u521b\u5efa\u7ec4\u7ec7"
                                        ),
                                        Jn(
                                            "a",
                                            {
                                                href: "/enterprises/new",
                                                class: "item"
                                            },
                                            Jn("i", {
                                                class:
                                                    "icon iconfont icon-enterprise"
                                            }),
                                            "\u5f00\u901a\u4f01\u4e1a\u7248"
                                        ),
                                        Jn(
                                            "a",
                                            {
                                                href: "/projects/oauth_github",
                                                class: "item"
                                            },
                                            Jn("i", {
                                                class: "github icon"
                                            }),
                                            "\u4ece GitHub \u5bfc\u5165\u4ed3\u5e93"
                                        )
                                    )
                                ),
                                Jn(
                                    "div",
                                    {
                                        class: "ui dropdown item",
                                        id: "git-nav-user",
                                        tabindex: "0"
                                    },
                                    Jn("img", {
                                        alt: "1081296_masx200",
                                        class: "ui avatar image",
                                        src:
                                            "https://avatar.gitee.com/uploads/96/1081296_masx200.png!avatar30?1566294318"
                                    }),
                                    Jn("i", {
                                        class: "dropdown icon"
                                    }),
                                    Jn(
                                        "div",
                                        {
                                            class: "right menu",
                                            tabindex: "-1"
                                        },
                                        Jn(
                                            "a",
                                            {
                                                href: "/masx200",
                                                class: "item"
                                            },
                                            Jn("i", {
                                                class: "iconfont icon-ic-home"
                                            }),
                                            "\u4e2a\u4eba\u4e3b\u9875"
                                        ),
                                        Jn(
                                            "a",
                                            {
                                                href: "/profile",
                                                class: "item"
                                            },
                                            Jn("div", {
                                                class:
                                                    "mayun-icon my-ic-edit my-ic-edit-dims"
                                            }),
                                            "\u8bbe\u7f6e"
                                        ),
                                        Jn("div", {
                                            class: "divider"
                                        }),
                                        Jn(
                                            "a",
                                            {
                                                href: "/gists",
                                                class: "item"
                                            },
                                            Jn("div", {
                                                class: "iconfont icon-ic-gist"
                                            }),
                                            "\u4ee3\u7801\u7247\u6bb5"
                                        ),
                                        Jn(
                                            "a",
                                            {
                                                href: "https://gitee.com/help",
                                                class: "item",
                                                target: "_blank"
                                            },
                                            Jn("div", {
                                                class:
                                                    "mayun-icon my-ic-help my-ic-help-dims"
                                            }),
                                            "\u5e2e\u52a9"
                                        ),
                                        Jn("div", {
                                            class: "divider"
                                        }),
                                        Jn(
                                            "a",
                                            {
                                                href: "/logout",
                                                class:
                                                    "item destroy-user-session",
                                                "data-method": "delete",
                                                rel: "nofollow"
                                            },
                                            Jn("div", {
                                                class:
                                                    "mayun-icon my-ic-exit my-ic-exit-dims"
                                            }),
                                            "\u9000\u51fa"
                                        )
                                    )
                                ),
                                Jn("script", null)
                            )
                        )
                    )
                )
            )
        ]
    );
    console.log(vdom$5, temp_ref, lirefs);
    document.body.appendChild(mn(vdom$5, document.createElement("div")));
    console.log([Jn, Jn]);
    (() => {
        var mystate = Tr(true);
        console.log("mystatetest", mystate);
        var vdom = or(mystate, "testtrue", Jn("div", undefined, "testfalese"));
        var vdom2 = or(
            mystate,
            undefined,
            Jn("div", undefined, "testwwwwwwwwwfalese")
        );
        var vdom3 = or(
            mystate,
            Jn("div", undefined, "testwwwwwwwtrueeeeeeeeee"),
            undefined
        );
        console.log([vdom, vdom2, vdom3]);
        document.body.appendChild(
            mn([vdom, vdom2, vdom3], document.createElement("div"))
        );
        var timer = setInterval(() => {
            mystate.value = !mystate.value;
        }, 1e3);
        setTimeout(() => {
            clearInterval(timer);
        }, 1e4);
    })();
    (() => {
        const stylestate = Tr({
            display: "block",
            width: "100%"
        });
        const inputref = Kr();
        const state1 = Tr("hello");
        const vdom = [
            Jn(
                "div",
                {
                    style: {
                        display: "block",
                        width: "100%"
                    }
                },
                "hello world!"
            ),
            Jn("input", {
                style: "width:100%",
                "@input": e => (state1.value = e.target.value),
                "*ref": inputref,
                "@change": e => (state1.value = e.target.value),
                id: "co11111111111de16",
                class:
                    "col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control",
                value: state1
            }),
            Jn(
                "h1",
                {
                    style: stylestate
                },
                "mvvm-reactive-view"
            ),
            Jn(
                "button",
                {
                    "@click": () => {
                        stylestate.color = "red";
                    }
                },
                "red"
            ),
            Jn(
                "button",
                {
                    "@click": () => {
                        stylestate.color = "green";
                    }
                },
                "green"
            )
        ];
        le(stylestate, console.log);
        le(state1, console.log);
        console.log(vdom);
        mn(vdom, document.getElementById("app"));
    })();
    (() => {
        const vdom2 = [
            Jn("div", {
                "*text": "<a>\u7ed1\u5b9atextcontent</a>"
            }),
            Jn("div", {
                "*html": "<a>\u7ed1\u5b9ainnerhtml</a>"
            })
        ];
        console.log(vdom2);
        document.body.appendChild(mn(vdom2, document.createElement("div")));
        const state1 = Tr("<a>\u7ed1\u5b9atextcontent</a>");
        const state2 = Tr("<a>\u7ed1\u5b9ainnerhtml</a>");
        const vdom3 = [
            Jn("textarea", {
                value: state1,
                "@input": [
                    e => {
                        state1.value = e.target.value;
                    }
                ]
            }),
            Jn("input", {
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
        document.body.appendChild(mn(vdom3, document.createElement("div")));
        const state3 = Tr("<a>\u7ed1\u5b9ainnerhtml</a>");
        const vdom4 = Jn(
            "",
            null,
            Jn("div", {
                _text: state3
            }),
            Jn("div", {
                _html: state3
            }),
            Jn("script", null, " ")
        );
        le(state1, state => (state3.value = state));
        le(state2, state => (state1.value = state));
        console.log(state3);
        console.log(vdom4);
        document.body.appendChild(mn(vdom4, document.createElement("div")));
        const objstate = Tr({
            a: "w",
            6: "xxxxxxx",
            tttttttt: "true"
        });
        const objstate2 = Tr(`{ a: "w", 6: "xxxxxxx", tttttttt: "true" }`);
        console.log(objstate);
        setTimeout(() => {
            objstate.length = 10;
            objstate2.value = 2222222222222;
        }, 2e3);
        const objstatearray = Tr([
            {
                a: "w",
                6: "xxxxxxx",
                tttttttt: "true"
            },
            1,
            true,
            "test"
        ]);
        const stylestate = Tr({
            display: "block",
            width: "100%"
        });
        const classsetstate = Tr(new Set(["xxxxxxx", "wwwwwww", "eeeeeeee"]));
        console.log("classsetstate", classsetstate);
        le(classsetstate, a => console.log(a));
        setTimeout(() => {
            classsetstate.add("vvvvvvvvvvv");
        }, 5e3);
        setTimeout(() => {
            classsetstate.delete("eeeeeeee");
        }, 4e3);
        const vdomobj = [
            Jn(
                "div",
                {
                    style: {
                        display: "block",
                        width: "100%"
                    }
                },
                objstate2
            ),
            Jn(
                "div",
                {
                    style: stylestate,
                    class: new Set(["wwwwwww", "eeeeeeee"])
                },
                objstatearray
            ),
            objstate,
            Jn("div", {
                style: stylestate,
                class: classsetstate
            })
        ];
        document.body.appendChild(mn(vdomobj, document.createElement("div")));
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
        console.log([objstate2, Tr(objstate2)]);
        console.log(Object.entries(objstate));
    })();
    (() => {
        var vdom = Jn(
            "math",
            null,
            Jn(
                "mrow",
                null,
                Jn(
                    "mrow",
                    null,
                    Jn("msup", null, Jn("mi", null, "a"), Jn("mn", null, "2")),
                    Jn("mo", null, "+"),
                    Jn("msup", null, Jn("mi", null, "b"), Jn("mn", null, "2"))
                ),
                Jn("mo", null, "="),
                Jn("msup", null, Jn("mi", null, "c"), Jn("mn", null, "2"))
            )
        );
        document.body.appendChild(mn(vdom, document.createElement("div")));
        console.log(vdom);
    })();
    class Bqqqqqqqqq extends HTMLElement {}
    class Aqqqqqqqqq extends HTMLElement {}
    console.log(customElements, [...customElements]);
    customElements.define("qqqqqqqqqq-----a", Bqqqqqqqqq);
    customElements.define("qqqqqqqqqq-----a", Aqqqqqqqqq);
    document.body.appendChild(
        mn([Jn(Bqqqqqqqqq), Jn(Aqqqqqqqqq)], document.createElement("div"))
    );
    console.log([Jn, Jn]);
    (() => {
        (() => {
            var _class, _temp;
            var myvdom1111111 = Jn(
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
                mn(myvdom1111111, document.createElement("div"))
            );
            document.body.appendChild(
                mn(
                    Jn(
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
            const myele1 = Jn(
                ((_temp = _class = class extends HTMLElement {}),
                _defineProperty(_class, "defaultProps", {
                    name: "aaaaaaaaaaHelloKitty",
                    myAge: 0x71afd498cfffe
                }),
                _temp)
            );
            console.log(myele1);
            document.body.appendChild(
                mn(myele1, document.createElement("div"))
            );
            document.body.appendChild(
                mn(myele1, document.createElement("div"))
            );
        })();
    })();
    {
        const vdom = Jn("div", [
            [
                Jn("html", null, "testhtml"),
                Jn("button", {
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
                Jn("style", null)
            ]
        ]);
        document.body.appendChild(mn(vdom, document.createElement("div")));
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
                Jn(
                    "div",
                    ["hello world"],
                    "\u6d4b\u8bd5\u4e0d\u4f7f\u7528createComponent"
                ),
            {
                css: css,
                defaultProps: defaultProps
            }
        );
        const vdom = Jn(Hellowordclass, null);
        let vdom1 = Jn(Hellowordclass);
        document.body.appendChild(
            mn([vdom, vdom1], document.createElement("div"))
        );
        console.log([
            "\u6d4b\u8bd5\u4e0d\u4f7f\u7528createComponent",
            Hellowordclass,
            vdom
        ]);
    })();
    (() => {
        const colortext = Tr("red");
        const stylestate = Tr({
            display: "block",
            width: "100%",
            color: colortext
        });
        const vdom = [
            Jn("hr", null),
            Jn(
                "h1",
                {
                    style: stylestate
                },
                "input color ",
                colortext
            ),
            Jn("input", {
                _value: colortext
            }),
            Jn("hr", null)
        ];
        console.log([vdom, colortext, stylestate]);
        le([colortext, stylestate], (a, b) =>
            console.log([a, _objectSpread2({}, b)])
        );
        document.body.appendChild(mn(vdom, document.createElement("div")));
    })();
    (() => {
        const colortext = Tr("blue");
        const stylestate = Tr({
            display: "block",
            width: "100%",
            color: colortext
        });
        const vdom = [
            Jn("hr", null),
            Jn(
                "h1",
                {
                    style: stylestate
                },
                "input color ",
                colortext
            ),
            Jn("input", {
                _value: colortext
            }),
            Jn("hr", null)
        ];
        var inter = setInterval(() => {
            colortext.value =
                "#" + (Math.random() * 16 ** 7).toString(16).slice(0, 6);
        }, 1e3);
        setTimeout(() => {
            clearInterval(inter);
        }, 1e4);
        le([colortext, stylestate], (a, b) =>
            console.log([a, _objectSpread2({}, b)])
        );
        document.body.appendChild(mn(vdom, document.createElement("div")));
    })();
    var css$1 =
        '@import url(https://cdn.staticfile.org/mui/3.7.1/css/mui.min.css);html{color:#444333;background:#fff;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;text-rendering:optimizelegibility}article,aside,blockquote,body,button,code,dd,details,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,input,legend,li,menu,nav,ol,p,pre,section,td,textarea,th,ul{margin:0;padding:0}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}audio,canvas,video{display:inline-block;*display:inline;*zoom:1}body,button,input,select,textarea{font:500 .875em/1.8 Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif}button,input{*width:auto;*overflow:visible;line-height:22px}table{border-collapse:collapse;border-spacing:0}th{text-align:inherit}fieldset,img{border:0}img{-ms-interpolation-mode:bicubic}iframe{display:block}blockquote{font-family:Optima,Georgia,STSong,serif;margin:1em 0;color:#999;padding:.6em 1em;background:#f8f8f8;border-left:.4em solid #ddd}blockquote blockquote{padding:0 0 0 1em;margin-left:2em}abbr,acronym{border-bottom:1px dotted;font-variant:normal}abbr{cursor:help}del{text-decoration:line-through}address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:400}ol,ul{list-style:none}caption,th{text-align:left}q:after,q:before{content:""}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:text-top\\9}:root sub,:root sup{vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}a:hover{text-decoration:underline}a,ins{text-decoration:none}.typo-u,u{text-decoration:underline}mark{background:#fffdd1}code,pre{font-family:Courier New,Courier,monospace;white-space:pre-wrap;word-wrap:break-word}pre{background:#f8f8f8;border:1px solid #ddd;padding:1em 1.5em}hr{border:none;border-bottom:1px solid #cfcfcf;margin-bottom:10px;*color:pink;*filter:chroma(color=pink);height:10px;*margin:-7px 0 2px}.typo-small,figcaption,small{font-size:.9em;color:#888}[draggable]{cursor:move}.clearfix:after,.clearfix:before{content:"";display:table}.clearfix:after{clear:both}.clearfix{zoom:1}.textwrap,.textwrap td,.textwrap th{word-wrap:break-word;word-break:break-all}.textwrap-table{table-layout:fixed}.typo-dl,.typo-form,.typo-hr,.typo-ol,.typo-p,.typo-pre,.typo-table,.typo-ul,.typo dl,.typo form,.typo hr,.typo ol,.typo p,.typo pre,.typo table,.typo ul{margin-bottom:1.2em}h1,h2,h3,h4,h5,h6{font-weight:500;*font-weight:800;font-family:Helvetica Neue,Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif;color:#333}.typo-h1,.typo-h2,.typo-h3,.typo-h4,.typo-h5,.typo-h6,.typo h1,.typo h2,.typo h3,.typo h4,.typo h5,.typo h6{margin-bottom:.4em;line-height:1.5}.typo-h1,.typo h1{font-size:1.8em}.typo-h2,.typo h2{font-size:1.6em}.typo-h3,.typo h3{font-size:1.4em}.typo-h4,.typo h4{font-size:1.2em}.typo-h5,.typo-h6,.typo h5,.typo h6{font-size:1em}.typo-ul,.typo ul{margin-left:1.3em;list-style:disc}.typo-ol,.typo ol{list-style:decimal;margin-left:1.9em}.typo-ol ol,.typo-ol ul,.typo-ul ol,.typo-ul ul,.typo li ol,.typo li ul{margin-top:0;margin-bottom:0;margin-left:2em}.typo-ol ul,.typo-ul ul,.typo li ul{list-style:circle}.typo-table td .typo table caption,.typo-table th,.typo table td,.typo table th{border:1px solid #ddd;padding:.5em 1em;color:#666}.typo-table th,.typo table th{background:#fbfbfb}.typo-table thead th,.typo table thead th{background:#f1f1f1}.typo table .caption{border-bottom:none}.typo-input,.typo-textarea{-webkit-appearance:none;border-radius:0}::-moz-selection{background:#08c;color:#fff}::selection{background:#08c;color:#fff}.typo-em,.typo em,caption,legend{font-weight:700}p{color:#0f0!important}@font-face{font-family:octicons-anchor;src:url(data:font/woff;charset=utf-8;base64,d09GRgABAAAAAAYcAA0AAAAACjQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABMAAAABwAAAAca8vGTk9TLzIAAAFMAAAARAAAAFZG1VHVY21hcAAAAZAAAAA+AAABQgAP9AdjdnQgAAAB0AAAAAQAAAAEACICiGdhc3AAAAHUAAAACAAAAAj//wADZ2x5ZgAAAdwAAADRAAABEKyikaNoZWFkAAACsAAAAC0AAAA2AtXoA2hoZWEAAALgAAAAHAAAACQHngNFaG10eAAAAvwAAAAQAAAAEAwAACJsb2NhAAADDAAAAAoAAAAKALIAVG1heHAAAAMYAAAAHwAAACABEAB2bmFtZQAAAzgAAALBAAAFu3I9x/Nwb3N0AAAF/AAAAB0AAAAvaoFvbwAAAAEAAAAAzBdyYwAAAADP2IQvAAAAAM/bz7t4nGNgZGFgnMDAysDB1Ml0hoGBoR9CM75mMGLkYGBgYmBlZsAKAtJcUxgcPsR8iGF2+O/AEMPsznAYKMwIkgMA5REMOXicY2BgYGaAYBkGRgYQsAHyGMF8FgYFIM0ChED+h5j//yEk/3KoSgZGNgYYk4GRCUgwMaACRoZhDwCs7QgGAAAAIgKIAAAAAf//AAJ4nHWMMQrCQBBF/0zWrCCIKUQsTDCL2EXMohYGSSmorScInsRGL2DOYJe0Ntp7BK+gJ1BxF1stZvjz/v8DRghQzEc4kIgKwiAppcA9LtzKLSkdNhKFY3HF4lK69ExKslx7Xa+vPRVS43G98vG1DnkDMIBUgFN0MDXflU8tbaZOUkXUH0+U27RoRpOIyCKjbMCVejwypzJJG4jIwb43rfl6wbwanocrJm9XFYfskuVC5K/TPyczNU7b84CXcbxks1Un6H6tLH9vf2LRnn8Ax7A5WQAAAHicY2BkYGAA4teL1+yI57f5ysDNwgAC529f0kOmWRiYVgEpDgYmEA8AUzEKsQAAAHicY2BkYGB2+O/AEMPCAAJAkpEBFbAAADgKAe0EAAAiAAAAAAQAAAAEAAAAAAAAKgAqACoAiAAAeJxjYGRgYGBhsGFgYgABEMkFhAwM/xn0QAIAD6YBhwB4nI1Ty07cMBS9QwKlQapQW3VXySvEqDCZGbGaHULiIQ1FKgjWMxknMfLEke2A+IJu+wntrt/QbVf9gG75jK577Lg8K1qQPCfnnnt8fX1NRC/pmjrk/zprC+8D7tBy9DHgBXoWfQ44Av8t4Bj4Z8CLtBL9CniJluPXASf0Lm4CXqFX8Q84dOLnMB17N4c7tBo1AS/Qi+hTwBH4rwHHwN8DXqQ30XXAS7QaLwSc0Gn8NuAVWou/gFmnjLrEaEh9GmDdDGgL3B4JsrRPDU2hTOiMSuJUIdKQQayiAth69r6akSSFqIJuA19TrzCIaY8sIoxyrNIrL//pw7A2iMygkX5vDj+G+kuoLdX4GlGK/8Lnlz6/h9MpmoO9rafrz7ILXEHHaAx95s9lsI7AHNMBWEZHULnfAXwG9/ZqdzLI08iuwRloXE8kfhXYAvE23+23DU3t626rbs8/8adv+9DWknsHp3E17oCf+Z48rvEQNZ78paYM38qfk3v/u3l3u3GXN2Dmvmvpf1Srwk3pB/VSsp512bA/GG5i2WJ7wu430yQ5K3nFGiOqgtmSB5pJVSizwaacmUZzZhXLlZTq8qGGFY2YcSkqbth6aW1tRmlaCFs2016m5qn36SbJrqosG4uMV4aP2PHBmB3tjtmgN2izkGQyLWprekbIntJFing32a5rKWCN/SdSoga45EJykyQ7asZvHQ8PTm6cslIpwyeyjbVltNikc2HTR7YKh9LBl9DADC0U/jLcBZDKrMhUBfQBvXRzLtFtjU9eNHKin0x5InTqb8lNpfKv1s1xHzTXRqgKzek/mb7nB8RZTCDhGEX3kK/8Q75AmUM/eLkfA+0Hi908Kx4eNsMgudg5GLdRD7a84npi+YxNr5i5KIbW5izXas7cHXIMAau1OueZhfj+cOcP3P8MNIWLyYOBuxL6DRylJ4cAAAB4nGNgYoAALjDJyIAOWMCiTIxMLDmZedkABtIBygAAAA==) format("woff")}*{color:purple!important;font-size:50px}@keyframes App-logo-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@media (max-width:720px){.article-content h1{font-size:24px}.article-content h2{font-size:20px}.article-content h3{font-size:18px}.article-content pre>code .copy-code-btn{display:none}.article-content pre>code.hljs[lang]:before{top:2px;right:15px}}@media (max-width:720px){.article-content pre>code.copyable.hljs[lang]:before{right:1rem}}@media (max-width:500px){hr#hidewidthless500{display:none}}.recommend-container .recommend-user .item{margin-bottom:16px}.recommend-container .recommend-user .ui.button{padding:3px 5px;margin-right:0}.recommend-container .recommend-user .header .pull-right{color:#005980;cursor:pointer}.recommend-container .recommend-user .header .pull-right.disabled{opacity:.7;cursor:default}.recommend-container .recommend-user .icon-reset{margin-top:-1px;height:16px;font-size:16px;margin-right:2px}.recommend-container .recommend-user__content{position:relative}.recommend-container .dimmer.active{z-index:1}.recommend-container .recommend-list__user{-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;margin-right:4px}.recommend-container .recommend-list__user strong{color:#005980}.recommend-container .recommend-list__user .recommend-list__user-info{margin:0 4px 0 8px;max-width:155px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.recommend-container .recommend-list__user .recommend-list__user-info.is-follow{max-width:125px}.recommend-container .recommend-list__user .recommend-list__user-info>div{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.recommend-container .recommend-list__flollow .disable{opacity:.5}.recommend-container .recommend-project .icon-recommended{color:#fe7300}.recommend-container .recommend-project .project-label{display:inline-block}.recommend-container .recommend-project .recommend-list{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.recommend-container .recommend-project .recommend-list>*{word-break:break-all}.recommend-container .recommend-project .recommend-list .recommend-project__describe{overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical}.recommend-container .recommend-project .item{margin-bottom:16px}.recommend-container .recommend-project .recommend-project__name{margin-bottom:4px;color:#005980}.recommend-container .recent_visits .ui.items{margin-right:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.recommend-container .recent_visits .avatar-item{margin-right:-22px!important}.recommend-container .recent_visits .item{width:20%;min-width:0;font-size:16px}.recommend-container .recent_visits .empty-visitor.item{font-size:14px;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1}.dashboard-content.twelve{padding-right:0!important}.dashboard-content .gitee-headbread .git-user-selection-dropdown{margin-right:0!important}.dashboard-content .dashboard-team .git-user-content-header{display:none}.dashboard-content .gitee-headbread{margin-bottom:24px}.dashboard-content .git-dashboard-projects-menu{margin-bottom:24px!important}.dashboard-content .git-dashboard-projects-menu .f-bold{color:#fe7300;border-bottom:2px solid #fe7300!important}.dashboard-content .git-dashboard-projects-menu>a.item{font-size:16px;padding:8px 18px!important}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input{width:150px;margin-right:10px}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input input{margin-top:-6px;font-size:12px;margin-right:10px}.dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input .icon-search{margin-top:-4px}.dashboard-content #event-timeline-panel h3.event-timeline-title{font-size:16px;margin-top:0;margin-bottom:16px;display:inline-block}.dashboard-content #event-timeline-panel .event-timeline.content{padding:0 0 18px 12px}.dashboard-content #event-timeline-panel .event-actionbar .dropdown.icon{margin-left:4px}.dashboard-content #event-timeline-panel .message-container .message{margin:0 0 1em}.dashboard-content .issues-filter__item{display:block;padding:0!important;color:initial!important;font-weight:500!important}.dashboard-content .issues-dropdown{margin-top:-6px!important}.dashboard-content .issues-dropdown .pl-0.f-bold{padding-left:0!important}.dashboard-content .dashboard-team .dashboard-team_info{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.dashboard-content .dashboard-team .ui.image{width:40px;height:40px;min-width:40px}.dashboard-content .dashboard-team .dashboard-team__contaniner .dashboard-team__name{font-size:16px;font-weight:700;overflow:hidden;word-break:keep-all;text-overflow:ellipsis;display:block}.dashboard-content .dashboard-team .dashboard-team__contaniner a{color:#005980!important}.dashboard-content .dashboard-team .dashboard-team__contaniner>.item:first-child{padding-top:0!important}.dashboard-content .dashboard-team .dashboard-team__contaniner .item{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.dashboard-content .dashboard-team .dashboard-team__contaniner .content{display:-webkit-box!important;display:-webkit-flex!important;display:-moz-box!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;overflow:hidden}.dashboard-content .dashboard-team .dashboard-team__contaniner .content:after{content:none}.dashboard-content .dashboard-team .dashboard-team__contaniner .content i{font-size:16px}.dashboard-content .dashboard-team .icon-enterprise-badge{margin-left:4px}.dashboard-content .dashboard-team .dashboard-team__operate{min-width:75px;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-moz-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.dashboard-content .dashboard-team .dashboard-team__operate.has-exit{min-width:150px}.recommend-project .icon-help-circle{vertical-align:baseline}.dashboard-content__show{width:608px!important;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.ui.container.user_page{width:1240px}#rc-users__container{position:relative}#rc-users__container .secondary-navigation .active{color:#fe7300!important}#rc-users__container .dashboard-content{padding-right:32px;padding-left:32px;padding-top:24px}#rc-users__container .dashboard-sidebar{padding:16px 0 0;width:280px!important;margin-left:10px}#rc-users__container .dashboard-sidebar .dashboard-group .item{margin:8px 0}#rc-users__container .dashboard-sidebar .dashboard-group:last-child{margin-bottom:0!important}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar{padding-top:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .ui.card{width:100%;margin-top:32px;margin-bottom:0;padding-bottom:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .ui.card .header{font-size:16px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name h4{font-size:14px;display:inline-block}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .description{margin-top:0}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .item.flex{margin-top:16px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .item.flex:first-child{margin-top:12px}#rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .quit i{margin-top:0}#rc-users__container .has-active .content{padding-left:0 2px 0 8px}#rc-users__container .navigation .header{padding-right:8px;border-bottom:1px solid #e3e9ed;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;padding-bottom:4px}#rc-users__container .navigation .header,#rc-users__container .navigation .header .title{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}#rc-users__container .navigation .header .title{font-size:16px}#rc-users__container .navigation .header .avatar.image{margin-right:0}#rc-users__container .navigation .header strong{font-size:16px;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;max-width:120px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#rc-users__container .navigation .header strong a{color:unset}#rc-users__container .navigation .header .actions{margin-top:4px}#rc-users__container .navigation .header .actions i{color:#005980}#rc-users__container .navigation.user i{color:#989dad}#rc-users__container .navigation.user .content{padding:0 8px}#rc-users__container .navigation .items>a{color:#40485b}#rc-users__container .navigation .items>a:hover{color:#095eab}#rc-users__container .navigation .items>a:active{color:#064177}#rc-users__container .navigation .items>a:hover{color:#40485b}#rc-users__container .navigation .item:hover .content{background:#f8f8f8}#rc-users__container .navigation .item .active{color:#fe7300;background:#f8f8f8}#rc-users__container .navigation .item .active .num{color:inherit}#rc-users__container .navigation .item:hover .exit{display:inline-block}#rc-users__container .navigation .icon-add,#rc-users__container .navigation .icon-search{color:#8c92a4!important}#rc-users__container .navigation .num{font-size:12px;font-weight:500;color:#8c92a4}#rc-users__container .navigation .gray{color:#8c92a4}#rc-users__container .navigation .avatar.image{width:32px;height:32px}#rc-users__container .twitter-typeahead{width:100%}#rc-users__container .gray{color:#8c92a4}#rc-users__container .ui.container{width:1240px}#rc-users__container .contribution-events{padding-top:32px}#rc-users__container #git-footer-main{min-width:1240px}#rc-users__container .gitee-headbread .gitee-divider{display:inline-block;opacity:.5;margin:0 .2rem;color:rgba(0,0,0,.4);vertical-align:baseline}#rc-users__container .git-user-content .git-user-content-header{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:16px}#rc-users__container .ui.button.js-project-watch{background:#fff;border:1px solid rgba(140,146,164,.5);padding:2px 5px;margin:0}#rc-users__container .recommend-container{width:248px!important}.users__personal-avatar{position:relative;margin:0 auto 10px;width:160px;height:160px}.users__personal-avatar .over-avatar{position:absolute;top:0;left:0;width:100%;height:100%;color:#fff;font-size:14px;text-align:center;line-height:200px;border:4px solid #eee;border-radius:50%;background:rgba(0,0,0,.5);cursor:pointer;display:none}.users__personal-avatar .over-avatar:hover{display:block}.users__personal-avatar .ui.image.avatar{margin:0;width:100%;height:100%;border:4px solid #eee}.users__personal-avatar .ui.image.avatar:hover+.over-avatar{display:block}.users__personal-avatar .avatar-gender{position:absolute;bottom:2px;right:27px;width:32px;height:32px;border-radius:50%;color:#fff;font-size:21px;text-align:center;line-height:30px;border:2px solid #fff}.users__personal-avatar .avatar-gender.mars{background:#3eb4ff}.users__personal-avatar .avatar-gender.venus{background:#ff5bc6}.users__personal-name{text-align:center}.users__personal-name h2,.users__personal-name p{margin:8px 0 0;word-break:break-all}.users__personal-name h2 span,.users__personal-name p span{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}.users__personal-name .remark-name{color:#8c92a4;font-size:14px;font-weight:400;display:inline}.users__personal-name .ui.small.label{margin-bottom:.5em;padding:.4em .7em;font-weight:400}.users__personal-setting{margin:15px auto;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__personal-setting .ui.button{margin:0;width:45%;font-size:14px}.users__personal-setting .ui.button.basic{border:1px solid #ccc}.users__personal-socials .ui.grid{padding:0 1rem}.users__personal-socials .ui.grid .column{padding:1rem 0;text-align:center}.users__personal-socials .social-count{font-size:18px;font-weight:700}.users__personal-socials .social-name{padding-top:5px;color:#40485b;font-size:12px;display:block}.users__personal-info{padding:15px 0;color:#8c92a4}.users__personal-info .info-item{padding:3px 0;line-height:1.5;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__personal-info .info-item i.iconfont{width:20px;text-align:center}.users__personal-info .info-item i.iconfont.icon-time{font-size:12px}.users__personal-achievement{padding:10px 0}.users__personal-achievement h3{margin:0;padding-bottom:4px;border-bottom:1px solid #dce3e8}.users__personal-achievement .ui.list .item .content{line-height:1.8}.users__personal-achievement .ui.list .item .content .description{color:#7687ab}.users__personal-groups{padding:10px 0}.users__personal-groups h3{margin:0;padding-bottom:4px;border-bottom:1px solid #dce3e8}.users__personal-groups .ui.list{margin:0}.users__personal-groups .ui.list:not(.more-groups){margin-top:1em}.users__personal-groups .ui.list .item{padding:.3em 0}.users__personal-groups .ui.list .item a{color:#005980!important}.users__personal-groups .ui.list .item a:hover{color:#4c8aa6!important}.users__personal-groups .ui.list .item a:active{color:#003e59!important}.users__personal-groups .ui.list .item .content{line-height:1.8;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__personal-groups .ui.list .item .right.floated.content{color:#7687ab}.users__personal-groups .ui.list .item .right.floated.content .mr-1{width:24px;display:inline-block}.users__personal-groups .load-more-groups{margin-top:8px;display:block;color:#7687ab}.users__personal-groups .load-more-groups:hover{color:#9fabc4}.users__personal-groups .load-more-groups:active{color:#525e77}.users__navbar .ui.secondary.pointing.menu{border-bottom:2px solid #dededf}.users__navbar .ui.secondary.pointing.menu>.item{margin-bottom:-2px;padding:10px 30px;min-width:100px;text-align:center;border-width:2px}.users__navbar .ui.secondary.pointing.menu>.item.active{color:#fe7300;border-color:#fe7300}.users__navbar .ui.secondary.pointing.menu>.item.active .ui.label{color:#fe7300;background:rgba(254,115,0,.2)}.users__header{margin-top:2em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__header h3{margin:0}.users__header .ui.dropdown{padding:.5em .92857em}.users__popular-projects .ui.cards{margin:0 -.5em -.5em}.users__popular-projects .ui.cards .ui.card{margin:.5em!important;padding:1em;width:calc(50% - 1em)!important;border:1px solid #dce3e8;-webkit-box-shadow:none;box-shadow:none}.users__popular-projects .ui.cards .ui.card .content{padding:0}.users__popular-projects .ui.cards .ui.card .content .popular-project-title{font-size:16px;word-break:break-all;vertical-align:middle}.users__popular-projects .ui.cards .ui.card .content .git-project-gvp-badge{margin-top:-3px}.users__popular-projects .ui.cards .ui.card .content i.iconfont{font-size:14px}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-mode-table{margin-top:1px;color:#d0d0d0;cursor:move}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-recommended{color:#fe7300;font-weight:400}.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-watch{font-size:12px;vertical-align:baseline}.users__popular-projects .ui.cards .ui.card .content .description{color:#8c92a4;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}.users__popular-projects .ui.cards .ui.card .extra.content{padding-top:1em;border:none!important;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__popular-projects .ui.cards .ui.card .extra.content:after{content:none}.users__popular-projects .ui.cards .ui.card .extra.content .left .ui.small.label{padding:.4em .7em}.users__popular-projects .ui.cards .ui.card .extra.content .right a{padding:0 .2em;color:#8c92a4}.users__popular-projects .ui.cards .ui.card .extra.content .right a:hover{color:#aeb2bf}.users__popular-projects .ui.cards .ui.card .extra.content .right a:active{color:#626672}.users__popular-projects .ui.cards .ui.card.sortable-chosen{background:#fed!important}.users__contribution-panel .less{background-color:#eee}.users__contribution-panel .little{background-color:#d6e685}.users__contribution-panel .some{background-color:#8cc665}.users__contribution-panel .many{background-color:#44a340}.users__contribution-panel .much{background-color:#1e6823}.users__contribution-panel .contribution-box{padding-top:20px;height:125px;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.users__contribution-panel .contribution-box .left-side{width:32px;font-size:12px;text-align:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.users__contribution-panel .contribution-box .left-side,.users__contribution-panel .contribution-box .right-side{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.users__contribution-panel .contribution-box .right-side{position:relative;width:100%;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.users__contribution-panel .contribution-box .right-side .box{width:1.88679%;height:15px;border:1px solid #fff}.users__contribution-panel .contribution-box .right-side .box[data-content]:hover{border:1px solid #000}.users__contribution-panel .contribution-box .right-side .month{position:absolute;top:0;margin-top:-15px;margin-left:-15px;min-width:45px;font-size:12px;text-align:center}.users__contribution-panel .contribution-tip{margin-top:10px;padding-right:10px;font-size:12px;text-align:right}.users__contribution-panel .contribution-tip .word{font-size:12px;vertical-align:top;display:inline-block}.users__contribution-panel .contribution-tip .ui.horizontal.list>.item{margin:0 1px;width:12px;height:12px;vertical-align:text-bottom}.users__contribution-panel .contribution-describ p{margin:0 20px 0 0;display:inline-block}.users__contribution-panel .contribution-describ p.text-muted{margin-top:10px;display:block}.users__customize-modal .ui.form{min-height:180px}.users__customize-modal .grouped.fields{margin:.2em 0 1em!important;padding:10px 0;max-height:20em;overflow-y:auto}.users__customize-modal .grouped.fields .field{padding:5px!important}.users__customize-modal .grouped.fields .field .ui.checkbox{width:100%}.users__customize-modal .grouped.fields .field label{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.users__customize-modal .grouped.fields .field label span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__customize-modal .grouped.fields .field label .star-count{min-width:4em;text-align:right}.users__customize-modal .grouped.fields .field.active{background:rgba(254,115,0,.2)}.users__report-modal .appeal-success-tip{text-align:center}.users__report-modal .appeal-success-tip i.iconfont{font-size:7rem;color:#4baf50}.users__report-modal .ui.items{padding:20px;background:#f4f5f6}.users__report-modal .ui.items .ui.image{width:50px}.users__report-modal .ui.items .content .header{color:#40485b}.users__report-modal .ui.items .content .description{color:#8c92a4;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users__report-modal .ui.segment.loader-block{border:0;min-height:100px}.users__report-modal .action-types .item{margin:5px;padding:10px 20px;min-width:120px;text-align:center;display:inline-block;background:#f2f2f2;border-radius:5px;cursor:pointer}.users__report-modal .action-types .item.active,.users__report-modal .action-types .item:active,.users__report-modal .action-types .item:hover{color:#fe7300}.users__report-modal .extra-content textarea{width:100%;height:5em}#user-show-detail .git-dashboard-projects-menu>.f-bold{color:#fe7300}#user-show-detail .git-codes-tags{margin-bottom:16px}#user-show-detail .git-user-twl-col>.gitee-headbread{margin-bottom:16px;margin-top:10px}#user-show-detail .git-profile-content-header .git-dashboard-projects-menu{margin-bottom:14px}#user-show-detail .git-profile-content-header .git-dashboard-projects-menu>a{font-size:14px}.recommend-container{padding:24px 0 0!important}.recommend-container .recommend-notice{background-color:#fffeed!important;margin-bottom:24px}.recommend-container .recommend-notice>.header{margin-right:8px!important}.recommend-container .ui.message{color:#40485b;padding:12px 16px;-webkit-box-shadow:0 0 0 1px #e2d8bf inset,0 0 0 0 transparent;box-shadow:inset 0 0 0 1px #e2d8bf,0 0 0 0 transparent}.recommend-container .ui.message i{position:absolute;top:0;right:0;font-size:.8em;margin-top:8px;margin-right:8px;cursor:pointer;color:#005980}.recommend-container .ui.message .header{color:#40485b;font-size:14px}.recommend-container .ui.message .content{margin-top:4px}.recommend-container .recommend-block{margin-bottom:32px}.recommend-container .recommend-block>.items{margin-top:0}.recommend-container .recommend-block .header{margin-bottom:16px}.recommend-container .recommend-block .header strong{font-size:16px}.recommend-container .recommend-block .recommend-list{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.recommend-container .recommend-block .item{margin:0}.recommend-container .recommend-user .header{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:end;-webkit-align-items:flex-end;-moz-box-align:end;-ms-flex-align:end;align-items:flex-end}.recommend-container .recommend-user .recommend-list{-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}';
    console.log([Jn, Jn]);
    (() => {
        var mycom = Vn(
            Object.assign(
                (props, children) => {
                    const number = Tr(1);
                    Dt(() => {
                        console.log("mounted1");
                    });
                    Dt(() => {
                        console.log("mounted2", props);
                    });
                    _t(() => {
                        console.log("unmounted");
                    });
                    le(props.cccccc, cccccc => {
                        console.log("cccccc", cccccc);
                    });
                    return Jn(
                        "div",
                        {
                            onclick: () => {
                                number.value++;
                            }
                        },
                        [
                            number,
                            Jn("br", null),
                            "wwwwwwwwwwww",
                            Jn("div", ["createComponent"]),
                            children,
                            Jn(
                                "div",
                                Jn("", null, "props cccccc ", props.cccccc)
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
        let vdom = Jn(
            myclasscomponent,
            {
                aaaaaa: 222222222,
                tttttt: "dddddddddd"
            },
            "children"
        );
        console.log([vdom, myclasscomponent, mycom]);
        document.body.appendChild(mn(vdom, document.createElement("div")));
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
            mn(
                Jn(myclasscomponent, [
                    Jn(
                        "form",
                        {
                            id: "newsletterForm",
                            class: "newsletter-form nodisable",
                            name: "newsletter-form",
                            action: "https://www.mozilla.org/en-US/newsletter/",
                            method: "post"
                        },
                        Jn(
                            "div",
                            {
                                class: "newsletter-head"
                            },
                            Jn(
                                "h2",
                                {
                                    class: "newsletter-teaser"
                                },
                                "\u5b66\u4e60 Web \u5f00\u53d1\u7684\u6700\u4f73\u5b9e\u8df5"
                            ),
                            Jn(
                                "p",
                                {
                                    class: "newsletter-description"
                                },
                                "\u8ba9 MDN \u5c06\u6700\u65b0\u3001\u6700\u68d2\u7684\u5185\u5bb9\u76f4\u63a5\u6295\u9012\u5230\u60a8\u7684\u90ae\u7bb1\u3002"
                            ),
                            Jn(
                                "p",
                                {
                                    class: "newsletter-lang"
                                },
                                "\u76ee\u524d\u4ec5\u63d0\u4f9b\u82f1\u6587\u7248\u65b0\u95fb\u62a5\u3002"
                            )
                        ),
                        Jn(
                            "div",
                            {
                                class: "newsletter-fields"
                            },
                            Jn("input", {
                                type: "hidden",
                                id: "fmt",
                                name: "fmt",
                                value: "H"
                            }),
                            Jn("input", {
                                type: "hidden",
                                id: "newsletterNewslettersInput",
                                name: "newsletters",
                                value: "app-dev"
                            }),
                            Jn("div", {
                                id: "newsletterErrors",
                                class: "newsletter-errors"
                            }),
                            Jn(
                                "div",
                                {
                                    id: "newsletterEmail",
                                    class: "form-group newsletter-group-email"
                                },
                                Jn(
                                    "label",
                                    {
                                        for: "newsletterEmailInput",
                                        class: "form-label offscreen"
                                    },
                                    "\u7535\u5b50\u90ae\u4ef6\u5730\u5740"
                                ),
                                Jn("input", {
                                    type: "email",
                                    id: "newsletterEmailInput",
                                    name: "email",
                                    class: "form-input newsletter-input-email",
                                    required: "",
                                    placeholder: "you@example.com",
                                    size: "30"
                                })
                            ),
                            Jn(
                                "div",
                                {
                                    id: "newsletterPrivacy",
                                    class:
                                        "form-group form-group-agree newsletter-group-privacy hidden"
                                },
                                Jn("input", {
                                    type: "checkbox",
                                    id: "newsletterPrivacyInput",
                                    name: "privacy",
                                    required: ""
                                }),
                                Jn(
                                    "label",
                                    {
                                        for: "newsletterPrivacyInput"
                                    },
                                    "\u6211\u63a5\u53d7 Mozilla \u6309\u7167",
                                    Jn(
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
                            Jn(
                                "div",
                                {
                                    id: "newsletterSubmit",
                                    class: "newsletter-group-submit"
                                },
                                Jn(
                                    "button",
                                    {
                                        id: "newsletter-submit",
                                        type: "submit",
                                        class:
                                            "button neutral newsletter-submit"
                                    },
                                    "\u7acb\u5373\u6ce8\u518c",
                                    Jn(
                                        "svg",
                                        {
                                            class: "icon icon-arrow",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            width: "23",
                                            height: "28",
                                            viewBox: "0 0 23 28",
                                            "aria-hidden": "true"
                                        },
                                        Jn("path", {
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
    const funstate = Tr(() => {});
    le(funstate, fun => {
        console.log([funstate, fun]);
    });
    requestAnimationFrame(() => {
        setTimeout(() => {
            funstate.value = class extends HTMLElement {};
        }, 50);
    });
    console.dir(funstate);
    const com1 = Vn(() => Jn("h1", null, "component 1"));
    const com2 = Vn(() => Jn("h1", null, "component 2"));
    const com3 = Vn(() => Jn("h1", null, "component 3"));
    const com4 = () => Jn("h1", null, "component 4");
    const mystate = Tr(com1);
    const vdom$6 = Wr(mystate);
    const element$1 = vn(vdom$6);
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
    le(mystate, state => {
        console.log([state, element$1]);
    });
    document.body.appendChild(
        vn(
            Jn(() =>
                Jn(
                    "div",
                    null,
                    Jn("button", {
                        $text: "component 1",
                        onclick: () => {
                            mystate.value = com1;
                        }
                    }),
                    Jn("button", {
                        $text: "component 2",
                        onclick: () => {
                            mystate.value = com2;
                        }
                    }),
                    Jn("button", {
                        $text: "component 3",
                        onclick: () => {
                            mystate.value = com3;
                        }
                    }),
                    Jn("button", {
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
