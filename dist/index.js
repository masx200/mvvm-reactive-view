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

var _a, _b;
const eventtargetsymbol = Symbol("eventtatget");
const memlisteners = Symbol("memlisteners");
const dispatchsymbol = getsymbol("dispatch");
const subscribesymbol = getsymbol("subscribe");
const removeallistenerssymbol = getsymbol("removeallisteners");
const addallistenerssymbol = getsymbol("addallisteners");
class primitivestate {
    constructor(init) {
        this[_a] = new EventTarget();
        this[_b] = [];
        if (isprimitive(init)) {
            this.value = init;
        }
        else {
            throw TypeError("invalid primitive");
        }
        Object.defineProperty(this, Symbol.toStringTag, {
            value: "primitivestate"
        });
    }
    [(_a = eventtargetsymbol, _b = memlisteners, Symbol.toPrimitive)]() {
        return this.value;
    }
    valueOf() {
        return this.value;
    }
    toString() {
        return String(this.value);
    }
    [dispatchsymbol]() {
        this[eventtargetsymbol].dispatchEvent(new Event("value"));
    }
    [subscribesymbol](callback) {
        this[memlisteners].push(["value", callback]);
    }
    [removeallistenerssymbol]() {
        this[memlisteners].forEach(([value, callback]) => {
            this[eventtargetsymbol].removeEventListener(value, callback);
        });
    }
    [addallistenerssymbol]() {
        this[memlisteners].forEach(([value, callback]) => {
            this[eventtargetsymbol].addEventListener(value, callback);
        });
    }
}

class Virtualdom {
    constructor(type = "", props = {}, children = []) {
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
                .filter(e => e[1] instanceof primitivestate)),
            props: Object.fromEntries(propsentries
                .filter(([key]) => /[A-Za-z]/.test(key[0]))
                .filter(e => !(e[1] instanceof primitivestate))),
            children,
            onevent: Object.fromEntries(propsentries
                .filter(([key]) => /\@/.test(key[0]))
                .map(([key, value]) => [key.slice(1), value])),
            directives: Object.fromEntries(propsentries
                .filter(([key]) => /\*/.test(key[0]))
                .map(([key, value]) => [key.slice(1), value]))
        });
        Object.defineProperty(this, Symbol.toStringTag, { value: "virtualdom" });
    }
}

var n=function(t,r,u,e){for(var p=1;p<r.length;p++){var s=r[p],h="number"==typeof s?u[s]:s,a=r[++p];1===a?e[0]=h:3===a?e[1]=Object.assign(e[1]||{},h):5===a?(e[1]=e[1]||{})[r[++p]]=h:6===a?e[1][r[++p]]+=h+"":e.push(a?t.apply(null,n(t,h,u,["",null])):h);}return e},t=function(n){for(var t,r,u=1,e="",p="",s=[0],h=function(n){1===u&&(n||(e=e.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?s.push(n||e,0):3===u&&(n||e)?(s.push(n||e,1),u=2):2===u&&"..."===e&&n?s.push(n,3):2===u&&e&&!n?s.push(!0,5,e):u>=5&&((e||!n&&5===u)&&(s.push(e,u,r),u=6),n&&(s.push(n,u,r),u=6)),e="";},a=0;a<n.length;a++){a&&(1===u&&h(),h(a));for(var f=0;f<n[a].length;f++)t=n[a][f],1===u?"<"===t?(h(),s=[s],u=3):e+=t:4===u?"--"===e&&">"===t?(u=1,e=""):e=t+e[0]:p?t===p?p="":e+=t:'"'===t||"'"===t?p=t:">"===t?(h(),u=1):u&&("="===t?(u=5,r=e,e=""):"/"===t&&(u<5||">"===n[a][f+1])?(h(),3===u&&(s=s[0]),u=s,(s=s[0]).push(u,2),u=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(h(),u=2):e+=t),3===u&&"!--"===e&&(u=4,s=s[0]);}return h(),s},r="function"==typeof Map,u=r?new Map:{},e=r?function(n){var r=u.get(n);return r||u.set(n,r=t(n)),r}:function(n){for(var r="",e=0;e<n.length;e++)r+=n[e].length+"-"+n[e];return u[r]||(u[r]=t(n))};function htm(t){var r=n(this,e(t),arguments,[]);return r.length>1?r:r[0]}

function h(type = "", props = {}, ...children) {
    var typenormalized = isstring(type) || isfunction(type) ? type : "";
    var propsnormalized = isobject(props) ? props : {};
    var childrennormalized = children.flat(Infinity);
    if (typeof typenormalized === "string" && "" === typenormalized) {
        return childrennormalized;
    }
    return new Virtualdom(typenormalized, propsnormalized, childrennormalized);
}

const html = htm.bind(h);
function isvalidvdom(v) {
    var flag = false;
    if (isarray(v)) {
        flag = v
            .map((ele) => {
            return isstring(ele) || ele instanceof Virtualdom;
        })
            .includes(false)
            ? false
            : true;
    }
    else if (v instanceof Virtualdom) {
        if (isvalidvdom(v.children)) {
            flag = true;
        }
    }
    else {
        if (isstring(v)) {
            flag = true;
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
        throw new TypeError("invalid Virtualdom!" + "\n" + JSON.stringify(vdom, null, 4));
    }
}

var directives = {
    ref(ele, ref, vdom) {
        if (typeof ref == "object") {
            ref.value = ele;
        }
        else {
            throw TypeError("invalid ref");
        }
    },
    html(ele, html, vdom) {
        if (typeof html == "string") {
            requestAnimationFrame(() => {
                ele.innerHTML = html;
            });
        }
        else {
            throw TypeError("invalid html");
        }
    },
    text(ele, text, vdom) {
        if (typeof text == "string") {
            requestAnimationFrame(() => {
                ele.textContent = text;
            });
        }
        else {
            throw TypeError("invalid text");
        }
    }
};

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
        domaddlisten(ele, event, call);
    });
}
function domaddlisten(ele, event, call) {
    ele.addEventListener(event, call);
}

class setlikearray extends Array {
    constructor() {
        super();
        Object.defineProperty(this, Symbol.toStringTag, { value: "setlikearray" });
    }
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
        return Reflect.construct(initclass, [children]);
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

function mount (ele, container) {
    container.innerHTML = "";
    let eles;
    if (ele instanceof Array) {
        eles = ele;
    }
    else {
        eles = [ele];
    }
    eles.forEach(e => appendchild(container, e));
}

function isobject$1(a) {
    return typeof a === "object" && a !== null;
}
function isstring$1(a) {
    return typeof a === "string";
}
function asserthtmlelement(ele) {
    if (!(ele instanceof HTMLElement ||
        ele instanceof SVGElement ||
        ele instanceof Element)) {
        throw TypeError("invalid HTMLElement!");
    }
    else
        return true;
}
function createeleattragentreadwrite(ele) {
    asserthtmlelement(ele);
    const isinputtextortextarea = (ele.tagName === "INPUT" && Reflect.get(ele, "type") === "text") ||
        ele.tagName === "TEXTAREA";
    var temp = Object.create(null);
    return new Proxy(temp, {
        ownKeys() {
            const keys = Reflect.ownKeys(ele.attributes).filter(k => !/\d/.test(String(k)[0]));
            return isinputtextortextarea
                ? Array.from(new Set([...keys, "value"]))
                : keys;
        },
        get(target, key) {
            if (isinputtextortextarea && key === "value") {
                return Reflect.get(ele, "value");
            }
            else {
                var v = ele.getAttribute(String(key));
                if (!v) {
                    return;
                }
                if (isstring$1(v)) {
                    try {
                        return JSON.parse(String(v));
                    }
                    catch (error) {
                        return v;
                    }
                }
                else
                    return;
            }
        },
        set(t, key, v) {
            if (isinputtextortextarea && key === "value") {
                return Reflect.set(ele, "value", v);
            }
            else {
                ele.setAttribute(String(key), isobject$1(v) ? JSON.stringify(v) : String(v));
                return true;
            }
        },
        deleteProperty(t, k) {
            ele.removeAttribute(String(k));
            return true;
        },
        has(target, key) {
            if (isinputtextortextarea && key === "value") {
                return true;
            }
            else {
                return ele.hasAttribute(String(key));
            }
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
            if (isinputtextortextarea && key === "value") {
                return {
                    value: Reflect.get(ele, "value"),
                    ...otherdescipter
                };
            }
            else {
                var attr = ele.getAttribute(String(key));
                if (attr) {
                    return {
                        value: attr,
                        ...otherdescipter
                    };
                }
                else {
                    return;
                }
            }
        },
        setPrototypeOf() {
            return false;
        },
        getPrototypeOf() {
            return null;
        }
    });
}

function throwinvalideletype() {
    throw TypeError("invalid element type!");
}
function render(vdom, namespace) {
    if (typeof vdom === "string") {
        return createtextnode(vdom);
    }
    else if (vdom instanceof Virtualdom && "type" in vdom) {
        let element;
        if (typeof vdom.type === "string") {
            if (vdom.type === "script") {
                return createnonescript();
            }
            else if (vdom.type === "svg") {
                element = createsvgelement();
            }
            else {
                element = namespace
                    ? createElementNS(namespace, vdom.type)
                    : createnativeelement(vdom.type);
            }
        }
        else if (typeof vdom.type == "function") {
            element = createcostumelemet(vdom.type, vdom.children);
        }
        else {
            throwinvalideletype();
        }
        var attribute1 = createeleattragentreadwrite(element);
        Object.assign(attribute1, vdom.props);
        Object.entries(vdom.bindattr).forEach(([key, primitivestate]) => {
            attribute1[key] = primitivestate.value;
            primitivestate[subscribesymbol](() => {
                attribute1[key] = primitivestate.value;
            });
            requestAnimationFrame(() => {
                primitivestate[addallistenerssymbol]();
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
        Object.entries(vdom.onevent).forEach(([event, callbacks]) => {
            onevent(element, event, callbacks);
        });
        if (typeof vdom.type !== "function") {
            mount(vdom.children.map(e => {
                if (vdom.type === "svg") {
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

function createApp (vdom, container) {
    const el = container;
    if (!isvalidvdom(vdom)) {
        throw TypeError("invalid Virtualdom " + "\n" + JSON.stringify(vdom, null, 4));
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
    if (vdom instanceof Array) {
        elesarray = vdom;
    }
    else {
        elesarray = [vdom];
    }
    mount(elesarray.map(e => render(e)), container);
    return container;
}

function createref (init) {
    return { value: init };
}

function createstate (init) {
    return new Proxy(new primitivestate(init), {
        set(target, key, value) {
            if (key === "value" && isprimitive(value)) {
                if (target[key] !== value) {
                    target[dispatchsymbol]();
                }
                return Reflect.set(target, key, value);
            }
            else {
                return false;
            }
        }
    });
}

export { createApp, h as createElemet, createref as createRef, createstate as createState, h, assertvalidvirtualdom as html };
//# sourceMappingURL=index.js.map
