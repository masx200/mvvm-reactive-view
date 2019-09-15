/**
 * The inverse of `_.toPairs`; this method returns an object composed
 * from key-value `pairs`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} pairs The key-value pairs.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _.fromPairs([['a', 1], ['b', 2]]);
 * // => { 'a': 1, 'b': 2 }
 */
function fromPairs(pairs) {
  var index = -1,
      length = pairs == null ? 0 : pairs.length,
      result = {};

  while (++index < length) {
    var pair = pairs[index];
    result[pair[0]] = pair[1];
  }
  return result;
}

var fromPairs_1 = fromPairs;

if ("function" !== typeof Object.fromEntries)
    Object.fromEntries = fromPairs_1;

if (typeof Array.prototype.flat !== "function") {
    Array.prototype.flat =
        arrayflat;
}
function arrayflat(depth = 1) {
    if (depth <= 1) {
        return this.reduce((acc, val) => acc.concat(val), []);
    }
    else {
        return flattenDeep(this);
    }
}
function flattenDeep(arr1) {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
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
    return typeof a === "object" && a !== null;
}
function isstring(a) {
    return typeof a === "string";
}
function isfunction(a) {
    return typeof a === "function";
}
function isarray(a) {
    return a instanceof Array && Array.isArray(a);
}
function getsymbol(a) {
    return Symbol(a);
}

function isprimitive (a) {
    return isstring(a) || isnumber(a) || isboolean(a) || isundefined(a);
}

var _a, _b, _c;
const textnodesymbol = Symbol("textnode");
const eventtargetsymbol = Symbol("eventtatget");
const memlisteners = Symbol("memlisteners");
const dispatchsymbol = getsymbol("dispatch");
const subscribesymbol = getsymbol("subscribe");
const removeallistenerssymbol = getsymbol("removeallisteners");
const addallistenerssymbol = getsymbol("addallisteners");
class ReactiveState {
    constructor(init) {
        this[_a] = undefined;
        this[_b] = new EventTarget();
        this[_c] = [];
        if (isprimitive(init) || isobject(init)) {
            this.value = init;
        }
        else {
            throw TypeError("invalid State");
        }
        Object.defineProperty(this, Symbol.toStringTag, {
            value: "ReactiveState",
            configurable: true
        });
    }
    [addallistenerssymbol]() {
        this[memlisteners].forEach(([value, callback]) => {
            this[eventtargetsymbol].addEventListener(value, callback);
        });
    }
    valueOf() {
        return this.value;
    }
    toString() {
        let value = this.value;
        return isprimitive(value)
            ? String(value)
            : isobject(value)
                ? JSON.stringify(value)
                : "";
    }
    [(_a = textnodesymbol, _b = eventtargetsymbol, _c = memlisteners, dispatchsymbol)](eventname) {
        let name = eventname ? String(eventname) : "value";
        if (name !== "value") {
            this[eventtargetsymbol].dispatchEvent(new Event(name));
        }
        this[eventtargetsymbol].dispatchEvent(new Event("value"));
    }
    [subscribesymbol](callback, eventname) {
        let name = eventname ? String(eventname) : "value";
        this[memlisteners].push([name, () => callback(this)]);
    }
    [removeallistenerssymbol]() {
        this[memlisteners].forEach(([value, callback]) => {
            this[eventtargetsymbol].removeEventListener(value, callback);
        });
    }
    [Symbol.toPrimitive]() {
        let value = this.value;
        return isprimitive(value)
            ? value
            : isobject(value)
                ? JSON.stringify(value)
                : void 0;
    }
}

class Virtualdom {
    constructor(type = "", props = {}, children = []) {
        this.element = undefined;
        this.props = {};
        this.children = [];
        this.directives = {};
        this.onevent = {};
        this.bindattr = {};
        const propsentries = Object.entries(props);
        Object.assign(this, {
            type,
            bindattr: Object.fromEntries(propsentries
                .filter(([key]) => /[A-Za-z]/.test(key[0]))
                .filter(e => e[1] instanceof ReactiveState)),
            props: Object.fromEntries(propsentries
                .filter(([key]) => /[A-Za-z]/.test(key[0]))
                .filter(e => !(e[1] instanceof ReactiveState))),
            children,
            onevent: Object.fromEntries(propsentries
                .filter(([key]) => /\@/.test(key[0]))
                .map(([key, value]) => [key.slice(1), value])),
            directives: Object.fromEntries(propsentries
                .filter(([key]) => /\*/.test(key[0]))
                .map(([key, value]) => [key.slice(1), value]))
        });
        Object.defineProperty(this, Symbol.toStringTag, {
            value: "virtualdom",
            configurable: true
        });
    }
}

var n=function(t,r,u,e){for(var p=1;p<r.length;p++){var s=r[p],h="number"==typeof s?u[s]:s,a=r[++p];1===a?e[0]=h:3===a?e[1]=Object.assign(e[1]||{},h):5===a?(e[1]=e[1]||{})[r[++p]]=h:6===a?e[1][r[++p]]+=h+"":e.push(a?t.apply(null,n(t,h,u,["",null])):h);}return e},t=function(n){for(var t,r,u=1,e="",p="",s=[0],h=function(n){1===u&&(n||(e=e.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?s.push(n||e,0):3===u&&(n||e)?(s.push(n||e,1),u=2):2===u&&"..."===e&&n?s.push(n,3):2===u&&e&&!n?s.push(!0,5,e):u>=5&&((e||!n&&5===u)&&(s.push(e,u,r),u=6),n&&(s.push(n,u,r),u=6)),e="";},a=0;a<n.length;a++){a&&(1===u&&h(),h(a));for(var f=0;f<n[a].length;f++)t=n[a][f],1===u?"<"===t?(h(),s=[s],u=3):e+=t:4===u?"--"===e&&">"===t?(u=1,e=""):e=t+e[0]:p?t===p?p="":e+=t:'"'===t||"'"===t?p=t:">"===t?(h(),u=1):u&&("="===t?(u=5,r=e,e=""):"/"===t&&(u<5||">"===n[a][f+1])?(h(),3===u&&(s=s[0]),u=s,(s=s[0]).push(u,2),u=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(h(),u=2):e+=t),3===u&&"!--"===e&&(u=4,s=s[0]);}return h(),s},r="function"==typeof Map,u=r?new Map:{},e=r?function(n){var r=u.get(n);return r||u.set(n,r=t(n)),r}:function(n){for(var r="",e=0;e<n.length;e++)r+=n[e].length+"-"+n[e];return u[r]||(u[r]=t(n))};function htm(t){var r=n(this,e(t),arguments,[]);return r.length>1?r:r[0]}

function h(type = "", props = {}, ...children) {
    var typenormalized = isstring(type) || isfunction(type) ? type : "";
    var propsnormalized = isobject(props) ? props : {};
    var childrennormalized = children.flat(1);
    if (typeof typenormalized === "string" && "" === typenormalized) {
        return childrennormalized;
    }
    return new Virtualdom(typenormalized, propsnormalized, childrennormalized);
}

const html = htm.bind(h);
function isvalidvdom(v) {
    let flag = false;
    if (Array.isArray(v)) {
        flag = v
            .map((ele) => {
            return isvalidvdom(ele);
        })
            .includes(false)
            ? false
            : true;
    }
    else if (v instanceof Virtualdom) {
        if (isvalidvdom(v.children)) {
            return true;
        }
    }
    else if (v instanceof ReactiveState) {
        return true;
    }
    else {
        if (isstring(v)) {
            return true;
        }
    }
    return flag;
}
function assertvalidvirtualdom(...args) {
    var vdom = html(...args);
    if (isvalidvdom(vdom)) {
        return vdom;
    }
    else {
        console.error(vdom);
        throw new TypeError("invalid Virtualdom!");
    }
}

function watch(state, callback, statekey) {
    if (!(state instanceof ReactiveState && isfunction(callback))) {
        throw TypeError("invalid state or callback");
    }
    if (statekey) {
        state[subscribesymbol](callback, statekey);
    }
    else {
        state[subscribesymbol](callback);
    }
    requestAnimationFrame(() => {
        state[addallistenerssymbol]();
    });
}

const requestAnimationFrame = window.requestAnimationFrame;
function seteletext(e, v) {
    e.textContent = v;
}
function setelehtml(e, v) {
    e.innerHTML = v;
}
var directives = {
    ref(ele, ref) {
        if (typeof ref == "object") {
            ref.value = ele;
        }
        else {
            throw TypeError("invalid ref");
        }
    },
    html(ele, html) {
        if (typeof html == "string") {
            requestAnimationFrame(() => {
                setelehtml(ele, html);
            });
        }
        else if (html instanceof ReactiveState) {
            watch(html, (state) => {
                setelehtml(ele, String(state));
            });
            requestAnimationFrame(() => {
                setelehtml(ele, String(html));
            });
        }
        else {
            throw TypeError("invalid html");
        }
    },
    text(ele, text) {
        if (typeof text == "string") {
            requestAnimationFrame(() => {
                seteletext(ele, text);
            });
        }
        else if (text instanceof ReactiveState) {
            watch(text, (state) => {
                seteletext(ele, String(state));
            });
            requestAnimationFrame(() => {
                seteletext(ele, String(text));
            });
        }
        else {
            throw TypeError("invalid text");
        }
    }
};

const document = window.document;
function appendchild(container, ele) {
    container.appendChild(ele);
}
function createsvgelement() {
    return document.createElementNS(svgnamespace, "svg");
}
function createnonescript() {
    return document.createDocumentFragment();
}
function createnativeelement(type) {
    return document.createElement(type);
}
function createElementNS(namespace, name) {
    return document.createElementNS(namespace, name);
}
function createtextnode(data) {
    return document.createTextNode(data);
}
const svgnamespace = "http://www.w3.org/2000/svg";
function changetext(textnode, value) {
    textnode.nodeValue = String(value);
}

const eventlistenerssymbol = Symbol("eventlisteners");
function onevent (element, eventname, callback) {
    if (typeof callback === "function") {
        addlisteners(element, eventname, [callback]);
    }
    else if (isarray(callback)) {
        addlisteners(element, eventname, callback);
    }
    else {
        throw TypeError("invalid EventListener");
    }
}
function addlisteners(ele, event, callarray) {
    callarray.forEach((call) => {
        ele[eventlistenerssymbol].push([event, call]);
        domaddlisten(ele, event, call);
    });
}
function domaddlisten(ele, event, call) {
    ele.addEventListener(event, call);
}

const Reflect = window.Reflect;
const { apply, construct, defineProperty, deleteProperty, get, getOwnPropertyDescriptor, getPrototypeOf, has, isExtensible, ownKeys, preventExtensions, set, setPrototypeOf } = Reflect;

class setlikearray extends Array {
    push(...items) {
        items.forEach(item => {
            if (isfunction(item) || isobject(item)) {
                if (!this.includes(item)) {
                    super.push(item);
                }
            }
        });
        return this.length;
    }
}

const customElementsarray = new setlikearray();
function createcostumelemet(initclass, children) {
    if (isclassextendsHTMLElement(initclass)) {
        customElementsarray.push(initclass);
        const elementname = getcustomelementname(initclass);
        if (customElements.get(elementname) === initclass) ;
        else {
            customElements.define(elementname, initclass);
        }
        return construct(initclass, [children]);
    }
    else {
        throw TypeError("invalid custom element class !");
    }
}
function getcustomelementname(initclass) {
    return "c-" + customElementsarray.indexOf(initclass);
}
function isclassextendsHTMLElement(initclass) {
    return !!(isfunction(initclass) &&
        initclass.prototype &&
        initclass.prototype instanceof HTMLElement);
}

function mount (ele, container) {
    container.innerHTML = "";
    let eles;
    if (Array.isArray(ele)) {
        eles = ele;
    }
    else {
        eles = [ele];
    }
    eles.forEach(e => appendchild(container, e));
}

const t$1 = window.Reflect,
  { get: o, ownKeys: f, set: g } = t$1,
  y = "value";
function b(t) {
  return "object" == typeof t && null !== t;
}
function S(t) {
  return "string" == typeof t;
}
function createeleattr(t) {
  !(function(t) {
    if (
      t instanceof HTMLElement ||
      t instanceof SVGElement ||
      t instanceof Element
    )
      return !0;
    throw TypeError("invalid HTMLElement!");
  })(t);
  const e =
    ("INPUT" === t.tagName && "text" === o(t, "type")) ||
    "TEXTAREA" === t.tagName;
  var r = Object.create(null);
  return new Proxy(r, {
    ownKeys() {
      const r = f(t.attributes).filter(t => !/\d/.test(String(t)[0]));
      return e ? Array.from(new Set([...r, y])) : r;
    },
    get(n) {
      if (e && n === y) return o(t, y);
      var i = t.getAttribute(String(n));
      if (i && S(i))
        try {
          return JSON.parse(String(i));
        } catch (t) {
          return i;
        }
    },
    set(n, i) {
      return e && n === y
        ? g(t, y, i)
        : "style" === n
        ? (t.setAttribute(
            String(n),
            S(i)
              ? i
              : b(i)
              ? ((o = i),
                Object.entries(o)
                  .map(([t, e]) => t + ":" + e)
                  .join(";"))
              : String(i)
          ),
          !0)
        : (t.setAttribute(String(n), b(i) ? JSON.stringify(i) : String(i)), !0);
      var o;
    },
    deleteProperty: (e, r) => (t.removeAttribute(String(r)), !0),
    has: (r, n) => !(!e || n !== y) || t.hasAttribute(String(n)),
    defineProperty: () => !1,
    getOwnPropertyDescriptor(n) {
      const i = { enumerable: !0, configurable: !0, writable: !0 };
      if (e && n === y) return { value: o(t, y), ...i };
      var s = t.getAttribute(String(n));
      return s ? { value: s, ...i } : void 0;
    }
  });
}

const reactivestatesymbol = Symbol("reactivestate");
const virtualdomsymbol = Symbol("virtualdom");
function throwinvalideletype() {
    throw TypeError("invalid element type!");
}
function render(vdom, namespace) {
    if (typeof vdom === "string") {
        return createtextnode(vdom);
    }
    else if (vdom instanceof ReactiveState) {
        const reactive = vdom;
        const textnode = createtextnode(String(reactive));
        textnode[reactivestatesymbol] = reactive;
        reactive[textnodesymbol] = textnode;
        watch(reactive, (state) => {
            changetext(textnode, String(state));
        });
        return textnode;
    }
    else if (vdom instanceof Virtualdom && "type" in vdom) {
        const { type } = vdom;
        let element;
        if (typeof type === "string") {
            if (type === "script") {
                return createnonescript();
            }
            else if (type === "svg") {
                element = createsvgelement();
            }
            else {
                element = namespace
                    ? createElementNS(namespace, type)
                    : createnativeelement(type);
            }
        }
        else if (typeof type == "function") {
            element = createcostumelemet(type, vdom.children);
        }
        else {
            throwinvalideletype();
        }
        var attribute1 = createeleattr(element);
        Object.assign(attribute1, vdom.props);
        element[virtualdomsymbol] = vdom;
        vdom.element = element;
        Object.entries(vdom.bindattr).forEach(([key, primitivestate]) => {
            attribute1[key] = primitivestate.value;
            watch(primitivestate, (state) => {
                attribute1[key] = state.value;
            });
        });
        Object.entries(vdom.directives).forEach(([name, value]) => {
            if (name in directives && typeof directives[name] === "function") {
                directives[name](element, value, vdom);
            }
            else {
                throw new Error("invalid directives " + name);
            }
        });
        if (!element[eventlistenerssymbol]) {
            element[eventlistenerssymbol] = [];
        }
        Object.entries(vdom.onevent).forEach(([event, callbacks]) => {
            onevent(element, event, callbacks);
        });
        if (typeof type !== "function") {
            mount(vdom.children.map(e => {
                if (type === "svg") {
                    return render(e, svgnamespace);
                }
                else if (namespace) {
                    return render(e, namespace);
                }
                else {
                    return render(e);
                }
            }), element);
        }
        return element;
    }
    else {
        throwinvalideletype();
    }
}

function createApp(vdom, container) {
    const el = container;
    if (!isvalidvdom(vdom)) {
        console.error(vdom);
        throw TypeError("invalid Virtualdom ");
    }
    if (!(el instanceof HTMLElement)) {
        throw TypeError("invalid container HTMLElement!");
    }
    if (el === document.body ||
        el === document.documentElement ||
        el === document.head) {
        throw Error("Do not mount  to <html> or <body> <head>.");
    }
    let elesarray;
    if (Array.isArray(vdom)) {
        elesarray = vdom;
    }
    else {
        elesarray = [vdom];
    }
    mount(elesarray.map(e => render(e)), container);
    return container;
}

function createRef(init) {
    return { value: init };
}

const t$2 = window.Reflect,
  {
    apply: e$1,
    construct: r$1,
    defineProperty: o$1,
    get: f$1,
    getOwnPropertyDescriptor: i,
    getPrototypeOf: p,
    has: u$1,
    set: l,
    setPrototypeOf: a
  } = t$2;
function P(t) {
  return "object" == typeof t && null !== t;
}
function d(t) {
  return "function" == typeof t;
}
function deepobserve(n, y) {
  if ("function" != typeof y)
    throw Error("observe callback is not valid function !");
  if ("function" != typeof Proxy) throw Error("Proxy unsupported!");
  return d(n) || P(n)
    ? (function n(y, c, s = [], w = y) {
        if ("function" != typeof c) throw Error("observe callback invalid !");
        if (d(y) || P(y)) {
          let v;
          return (
            (v = P(y) ? {} : () => {}),
            a(v, null),
            (v =>
              new Proxy(v, {
                defineProperty: (t, e, r) => o$1(y, e, r),
                deleteProperty: (e, r) => (
                  c(w, [...s, r], void 0, f$1(y, r)), t$2.deleteProperty(y, r)
                ),
                ownKeys: () => t$2.ownKeys(y),
                has: (t, e) => u$1(y, e),
                getPrototypeOf: () => p(y),
                setPrototypeOf: (t, e) => a(y, e),
                construct(e) {
                  if ("function" == typeof y) return r$1(y, e);
                },
                apply(r, o) {
                  if ("function" == typeof y) return e$1(y, r, o);
                },
                getOwnPropertyDescriptor(e) {
                  var r = i(y, e);
                  return r ? ((r.configurable = !0), r) : void 0;
                },
                set: (t, e, r) => (
                  "function" == typeof c && c(w, [...s, e], r, f$1(y, e)),
                  l(y, e, r)
                ),
                get(e) {
                  var r = f$1(y, e);
                  return d(r) || P(r) ? n(r, c, [...s, e], y) : r;
                }
              }))(v)
          );
        }
        return y;
      })(n, y, [], n)
    : n;
}

function createstate(init) {
    if (isprimitive(init)) {
        return new Proxy(new ReactiveState(init), {
            defineProperty() {
                return false;
            },
            deleteProperty() {
                return false;
            },
            set(target, key, value) {
                if (key === textnodesymbol) {
                    return set(target, key, value);
                }
                if (key === "value" && isprimitive(value)) {
                    set(target, key, value);
                    target[dispatchsymbol]();
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    }
    else if (init instanceof ReactiveState) {
        return createstate(init.value);
    }
    else if (isobject(init)) {
        return new Proxy(new ReactiveState(init), {
            defineProperty() {
                return false;
            },
            getOwnPropertyDescriptor(target, key) {
                const myvalue = get(target, "value");
                var descripter = getOwnPropertyDescriptor(target, key) ||
                    getOwnPropertyDescriptor(myvalue, key);
                descripter.configurable = true;
                return descripter;
            },
            deleteProperty(target, key) {
                const myvalue = get(target, "value");
                if (has(myvalue, key)) {
                    deleteProperty(myvalue, key);
                    target[dispatchsymbol](key);
                    return true;
                }
                else {
                    return true;
                }
            },
            has(target, key) {
                const myvalue = get(target, "value");
                return has(target, key) || has(myvalue, key);
            },
            get(target, key) {
                const value = get(target, "value");
                if (has(target, key)) {
                    return get(target, key);
                }
                else if (has(value, key)) {
                    return deepobserve(get(value, key), () => {
                        target[dispatchsymbol](key);
                    });
                }
            },
            ownKeys(target) {
                return Array.from(new Set([...ownKeys(target), ...ownKeys(get(target, "value"))]));
            },
            set(target, key, value) {
                if (key === textnodesymbol) {
                    return set(target, key, value);
                }
                const myvalue = get(target, "value");
                if (key === "value" && isobject(value)) {
                    set(target, key, value);
                    target[dispatchsymbol]();
                    return true;
                }
                else if (!has(target, key)) {
                    set(myvalue, key, value);
                    target[dispatchsymbol](key);
                }
                else if (key === "length") {
                    set(myvalue, key, value);
                    target[dispatchsymbol](key);
                }
                else {
                    return false;
                }
                return true;
            }
        });
    }
    else {
        throw TypeError("invalid State");
    }
}

export { createApp, h as createElemet, createRef, createstate as createState, h, assertvalidvirtualdom as html, watch };
//# sourceMappingURL=index.js.map
