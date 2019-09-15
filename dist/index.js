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

var Reflect = window.Reflect;

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
const textnodesymbol = Symbol("textnode");
const eventtargetsymbol = Symbol("eventtatget");
const memlisteners = Symbol("memlisteners");
const dispatchsymbol = getsymbol("dispatch");
const subscribesymbol = getsymbol("subscribe");
const removeallistenerssymbol = getsymbol("removeallisteners");
const addallistenerssymbol = getsymbol("addallisteners");
const forkarryaprototype = {};
Reflect.ownKeys(Array.prototype).forEach(key => {
    forkarryaprototype[key] = Array.prototype[key];
});
class forkarray {
}
Object.assign(forkarray.prototype, forkarryaprototype);
forkarray.prototype.constructor = forkarray;
Reflect.deleteProperty(forkarray.prototype, "length");
class ReactiveState extends forkarray {
    constructor(init) {
        super();
        this[_a] = new EventTarget();
        this[_b] = [];
        if (isprimitive(init) || isobject(init)) {
            this.value = init;
        }
        else {
            throw TypeError("invalid State");
        }
        Object.defineProperty(this, Symbol.toStringTag, {
            value: "ReactiveState"
        });
    }
    [(_a = eventtargetsymbol, _b = memlisteners, Symbol.toPrimitive)]() {
        let value = this.value;
        return isprimitive(value)
            ? value
            : isobject(value)
                ? JSON.stringify(value)
                : void 0;
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
    [dispatchsymbol](eventname) {
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
        Object.defineProperty(this, Symbol.toStringTag, { value: "virtualdom" });
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
        throw new TypeError("invalid Virtualdom!" + "\n" + JSON.stringify(vdom, null, 4));
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
        else if (html instanceof ReactiveState) {
            watch(html, (state) => {
                ele.innerHTML = String(state.value);
            });
            requestAnimationFrame(() => {
                ele.innerHTML = String(html.value);
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
        else if (text instanceof ReactiveState) {
            watch(text, (state) => {
                ele.textContent = String(state.value);
            });
            requestAnimationFrame(() => {
                ele.textContent = String(text.value);
            });
        }
        else {
            throw TypeError("invalid text");
        }
    }
};

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
function changetext(textnode, value) {
    textnode.nodeValue = String(value);
}

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

const t$1=window.Reflect,e$1="value";function r$1(t){return "object"==typeof t&&null!==t}function n$1(t){return "string"==typeof t}function createeleattr(i){!function(t){if(t instanceof HTMLElement||t instanceof SVGElement||t instanceof Element)return !0;throw TypeError("invalid HTMLElement!")}(i);const o="INPUT"===i.tagName&&"text"===t$1.get(i,"type")||"TEXTAREA"===i.tagName;var u=Object.create(null);return new Proxy(u,{ownKeys(){const r=t$1.ownKeys(i.attributes).filter(t=>!/\d/.test(String(t)[0]));return o?Array.from(new Set([...r,e$1])):r},get(r,u){if(o&&u===e$1)return t$1.get(i,e$1);var a=i.getAttribute(String(u));if(a&&n$1(a))try{return JSON.parse(String(a))}catch(t){return a}},set(u,a,s){return o&&a===e$1?t$1.set(i,e$1,s):"style"===a?(i.setAttribute(String(a),n$1(s)?s:r$1(s)?(g=s,Object.entries(g).map(([t,e])=>t+":"+e).join(";")):String(s)),!0):(i.setAttribute(String(a),r$1(s)?JSON.stringify(s):String(s)),!0);var g;},deleteProperty:(t,e)=>(i.removeAttribute(String(e)),!0),has:(t,r)=>!(!o||r!==e$1)||i.hasAttribute(String(r)),defineProperty:()=>!1,getOwnPropertyDescriptor(r,n){const u={enumerable:!0,configurable:!0,writable:!0};if(o&&n===e$1)return {value:t$1.get(i,e$1),...u};var a=i.getAttribute(String(n));return a?{value:a,...u}:void 0}})}

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

function createApp(vdom, container) {
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

function createRef(init) {
    return { value: init };
}

const t$2=window.Reflect;function e$2(t){return "object"==typeof t&&null!==t}function o(t){return "function"==typeof t}function deepobserve(r,n){if("function"!=typeof n)throw Error("observe callback is not valid function !");return "function"!=typeof Proxy?(setTimeout(()=>{throw Error("\u4e0d\u652f\u6301Proxy!")},0),r):o(r)||e$2(r)?function r(n,f,i=[],u=n){if("function"!=typeof f)throw Error("observe callback is not valid function !");if(o(n)||e$2(n)){let c;return c=e$2(n)?{}:()=>{},t$2.setPrototypeOf(c,null),(c=>new Proxy(c,{defineProperty:(e,o,r)=>t$2.defineProperty(n,o,r),deleteProperty:(e,o)=>(f(u,[...i,o],void 0,t$2.get(n,o)),t$2.deleteProperty(n,o)),ownKeys:()=>t$2.ownKeys(n),has:(e,o)=>t$2.has(n,o),getPrototypeOf:()=>t$2.getPrototypeOf(n),setPrototypeOf:(e,o)=>t$2.setPrototypeOf(n,o),construct(e,o){if("function"==typeof n)return t$2.construct(n,o)},apply(e,o,r){if("function"==typeof n)return t$2.apply(n,o,r)},getOwnPropertyDescriptor(e,o){var r=t$2.getOwnPropertyDescriptor(n,o);return r?(r.configurable=!0,r):void 0},set:(e,o,r)=>("function"==typeof f&&f(u,[...i,o],r,t$2.get(n,o)),t$2.set(n,o,r)),get(u,c){var p=t$2.get(n,c);return o(p)||e$2(p)?r(p,f,[...i,c],n):p}}))(c)}return n}(r,n,[],r):r}

function createstate(init) {
    if (isprimitive(init)) {
        return new Proxy(new ReactiveState(init), {
            set(target, key, value) {
                if (key === textnodesymbol) {
                    return Reflect.set(target, key, value);
                }
                if (key === "value" && isprimitive(value)) {
                    Reflect.set(target, key, value);
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
            deleteProperty(target, key) {
                const myvalue = Reflect.get(target, "value");
                if (Reflect.has(myvalue, key)) {
                    Reflect.deleteProperty(myvalue, key);
                    target[dispatchsymbol](key);
                    return true;
                }
                else {
                    return true;
                }
            },
            has(target, key) {
                const myvalue = Reflect.get(target, "value");
                return Reflect.has(target, key) || Reflect.has(myvalue, key);
            },
            get(target, key) {
                const value = Reflect.get(target, "value");
                if (Reflect.has(target, key)) {
                    return Reflect.get(target, key);
                }
                else if (Reflect.has(value, key)) {
                    return deepobserve(Reflect.get(value, key), () => {
                        target[dispatchsymbol](key);
                    });
                }
            },
            ownKeys(target) {
                return Array.from(new Set([
                    ...Reflect.ownKeys(target),
                    ...Reflect.ownKeys(Reflect.get(target, "value"))
                ]));
            },
            set(target, key, value) {
                if (key === textnodesymbol) {
                    return Reflect.set(target, key, value);
                }
                const myvalue = Reflect.get(target, "value");
                if (key === "value" && isobject(value)) {
                    Reflect.set(target, key, value);
                    target[dispatchsymbol]();
                    return true;
                }
                else if (!Reflect.has(target, key)) {
                    Reflect.set(myvalue, key, value);
                    target[dispatchsymbol](key);
                }
                else if (key === "length") {
                    Reflect.set(myvalue, key, value);
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
