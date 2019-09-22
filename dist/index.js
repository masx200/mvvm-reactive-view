const Reflect$1 = window.Reflect;

const {construct: construct, deleteProperty: deleteProperty, get: get, getOwnPropertyDescriptor: getOwnPropertyDescriptor, getPrototypeOf: getPrototypeOf, has: has, ownKeys: ownKeys, set: set} = Reflect$1;

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
    return a instanceof Array && Array.isArray(a) && gettagtype(a) === "array";
}

function getsymbol(a) {
    return Symbol(a);
}

function gettagtype(a) {
    return {}.toString.call(a).replace("[object ", "").replace("]", "").toLowerCase();
}

function isSet(a) {
    return gettagtype(a) === "set" && a instanceof Set;
}

const invalid_Function = "invalid Function";

const message = "invalid useMounted or useUnMounted out of createComponent";

let ctxopen = false;

let Mounted = [];

let UnMounted = [];

function getMounted() {
    return [ ...Mounted ];
}

function getUnMounted() {
    return [ ...UnMounted ];
}

function useMounted(fun) {
    if (isfunction(fun)) {
        if (ctxopen) {
            Mounted.push(fun);
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
            UnMounted.push(fun);
        } else {
            throw Error(message);
        }
    } else {
        throw TypeError(invalid_Function);
    }
}

function clearMounted() {
    Mounted = [];
}

function clearUnMounted() {
    UnMounted = [];
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

const document = window.document;

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

const mathnamespace = "http://www.w3.org/1998/Math/MathML";

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

function setAttribute(ele, name, value) {
    HTMLElementprototype.setAttribute.call(ele, name, value);
}

function removeAttribute(ele, name) {
    HTMLElementprototype.removeAttribute.call(ele, name);
}

const HTMLElementprototype = HTMLElement.prototype;

function isprimitive(a) {
    return isstring(a) || isnumber(a) || isboolean(a) || isundefined(a);
}

var _a, _b, _c;

function isReactiveState(a) {
    return a instanceof ReactiveState;
}

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
    [addallistenerssymbol]() {
        this[memlisteners].forEach(([value, callback]) => {
            this[eventtargetsymbol].addEventListener(value, callback);
        });
    }
    valueOf() {
        return this.value;
    }
    toString() {
        const value = this.value;
        return isprimitive(value) ? String(value) : isSet(value) ? JSON.stringify([ ...value ]) : isobject(value) ? JSON.stringify(value) : "";
    }
    [(_a = textnodesymbol, _b = eventtargetsymbol, _c = memlisteners, dispatchsymbol)](eventname) {
        const name = eventname ? String(eventname) : "value";
        if (name !== "value") {
            this[eventtargetsymbol].dispatchEvent(new CustomEvent(name, {
                detail: name
            }));
        }
        this[eventtargetsymbol].dispatchEvent(new CustomEvent("value", {
            detail: name
        }));
    }
    [subscribesymbol](callback, eventname) {
        const name = eventname ? String(eventname) : "value";
        this[memlisteners].push([ name, event => callback(this, event.detail) ]);
    }
    [removeallistenerssymbol]() {
        this[memlisteners].forEach(([value, callback]) => {
            this[eventtargetsymbol].removeEventListener(value, callback);
        });
    }
    [Symbol.toPrimitive]() {
        const value = this.value;
        return isprimitive(value) ? value : isobject(value) ? JSON.stringify(value) : void 0;
    }
}

const requestAnimationFrame = window.requestAnimationFrame;

var directives = {
    ref(ele, ref) {
        if (typeof ref == "object") {
            ref.value = ele;
        } else {
            throw TypeError("invalid ref");
        }
    },
    html(ele, html) {
        createhtmlandtextdirective(setelehtml, "html")(ele, html);
    },
    text(ele, text) {
        createhtmlandtextdirective(seteletext, "text")(ele, text);
    }
};

function createhtmlandtextdirective(seteletext, errorname) {
    return function(ele, text) {
        if (typeof text == "string") {
            requestAnimationFrame(() => {
                seteletext(ele, text);
            });
        } else if (isReactiveState(text)) {
            watch(text, state => {
                seteletext(ele, String(state));
            });
            requestAnimationFrame(() => {
                seteletext(ele, String(text));
            });
        } else {
            throw TypeError("invalid " + errorname);
        }
    };
}

const Reflect$2 = window.Reflect;

const {get: get$1, set: set$1} = Reflect$2;

const valuestring = "value";

function isobject$1(a) {
    return typeof a === "object" && a !== null;
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
    return Object.entries(o).map(([key, value]) => key + ":" + value).join(";");
}

function asserthtmlelement(ele) {
    if (!(ele instanceof Element)) {
        throw TypeError("invalid HTMLElement!");
    } else return true;
}

function createeleattragentreadwrite(ele) {
    asserthtmlelement(ele);
    const isinputtextortextareaflag = isinputtextortextarea(ele);
    var temp = Object.create(null);
    const outputattrs = new Proxy(temp, {
        ownKeys() {
            const keys = attributesownkeys(ele);
            return isinputtextortextareaflag ? Array.from(new Set([ ...keys, valuestring ])) : keys;
        },
        get(target, key) {
            if (isinputtextortextareaflag && key === valuestring) {
                return get$1(ele, valuestring);
            } else {
                const v = getattribute(ele, String(key));
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
        set(t, key, v) {
            if (isinputtextortextareaflag && key === valuestring) {
                return set$1(ele, valuestring, v);
            } else if (key === "style") {
                setattribute(ele, String(key), isstring$1(v) ? v : isobject$1(v) ? objtostylestring(v) : String(v));
                return true;
            } else if (key === "class" && isobject$1(v)) {
                if (isArray(v)) {
                    setattribute(ele, String(key), v.join(" "));
                } else if (isSet$1(v)) {
                    setattribute(ele, String(key), [ ...v ].join(" "));
                } else {
                    setattribute(ele, String(key), JSON.stringify(v));
                }
            } else {
                if (isSet$1(v)) {
                    setattribute(ele, String(key), JSON.stringify([ ...v ]));
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
        deleteProperty(t, k) {
            removeAttribute$1(ele, String(k));
            return true;
        },
        has(target, key) {
            if (isinputtextortextareaflag && key === valuestring) {
                return true;
            } else {
                return hasAttribute(ele, String(key));
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
            const myvalue = get$1(outputattrs, key);
            if (typeof myvalue !== "undefined") {
                return {
                    value: myvalue,
                    ...otherdescipter
                };
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
    const tagname = geteletagname(ele);
    return tagname === "input" && get$1(ele, "type") === "text" || tagname === "textarea";
}

const attributeChangedCallback = "attributeChangedCallback";

class AttrChange extends HTMLElement {
    setAttribute(qualifiedName, value) {
        const oldValue = getAttribute(this, qualifiedName);
        if (oldValue !== value) {
            setAttribute(this, qualifiedName, value);
            if (isfunction(this[attributeChangedCallback])) {
                this[attributeChangedCallback](qualifiedName, oldValue, value);
            }
        }
    }
    removeAttribute(qualifiedName) {
        const oldValue = getAttribute(this, qualifiedName);
        if (null !== oldValue) {
            removeAttribute(this, qualifiedName);
            if (isfunction(this[attributeChangedCallback])) {
                this[attributeChangedCallback](qualifiedName, oldValue, undefined);
            }
        }
    }
}

function isVirtualdom(a) {
    return a instanceof Virtualdom;
}

class Virtualdom {
    constructor(type = "", props = {}, children = []) {
        this.options = undefined;
        this.element = undefined;
        this.props = {};
        this.children = [];
        this.directives = {};
        this.onevent = {};
        this.bindattr = {};
        const propsentries = Object.entries(props);
        Object.assign(this, {
            type: type,
            bindattr: Object.fromEntries(propsentries.filter(([key]) => /[A-Za-z]/.test(key[0])).filter(e => isReactiveState(e[1]))),
            props: Object.fromEntries(propsentries.filter(([key]) => /[A-Za-z]/.test(key[0])).filter(e => !isReactiveState(e[1]))),
            children: children,
            onevent: Object.fromEntries(propsentries.filter(([key]) => /\@/.test(key[0])).map(([key, value]) => [ key.slice(1), value ])),
            directives: Object.fromEntries(propsentries.filter(([key]) => /\*/.test(key[0])).map(([key, value]) => [ key.slice(1), value ]))
        });
        Object.defineProperty(this, Symbol.toStringTag, {
            value: "virtualdom",
            configurable: true
        });
    }
}

const eventlistenerssymbol = Symbol("eventlisteners");

function onevent(element, eventname, callback) {
    if (!element[eventlistenerssymbol]) {
        element[eventlistenerssymbol] = [];
    }
    if (isfunction(callback)) {
        firstaddlisteners(element, eventname, [ callback ]);
    } else if (isarray(callback)) {
        firstaddlisteners(element, eventname, callback);
    } else {
        console.error(callback);
        throw TypeError(invalid_Function);
    }
}

function firstaddlisteners(ele, event, callarray) {
    callarray.forEach(call => {
        ele[eventlistenerssymbol].push([ event, call ]);
        domaddlisten(ele, event, call);
    });
}

function removelisteners(ele) {
    if (ele[eventlistenerssymbol]) {
        ele[eventlistenerssymbol].forEach(([event, call]) => {
            domremovelisten(ele, event, call);
        });
    }
}

function readdlisteners(ele) {
    if (ele[eventlistenerssymbol]) {
        ele[eventlistenerssymbol].forEach(([event, call]) => {
            domaddlisten(ele, event, call);
        });
    }
}

function onmounted(ele) {
    if (isarray(ele)) {
        ele.forEach(e => {
            onmounted(e);
        });
    } else if (ele instanceof Node) {
        if (ele[eventlistenerssymbol]) {
            readdlisteners(ele);
        }
        if (ele[bindstatesymbol]) {
            ele[bindstatesymbol].forEach(state => {
                rewatch(state);
            });
        }
        onmounted(getdomchildren(ele));
    }
}

function onunmounted(ele) {
    if (isarray(ele)) {
        ele.forEach(e => {
            onunmounted(e);
        });
    } else if (ele instanceof Node) {
        if (ele[eventlistenerssymbol]) {
            removelisteners(ele);
        }
        if (ele[bindstatesymbol]) {
            ele[bindstatesymbol].forEach(state => {
                unwatch(state);
            });
        }
        onunmounted(getdomchildren(ele));
    }
}

var n = function(t, r, u, e) {
    for (var p = 1; p < r.length; p++) {
        var s = r[p], h = "number" == typeof s ? u[s] : s, a = r[++p];
        1 === a ? e[0] = h : 3 === a ? e[1] = Object.assign(e[1] || {}, h) : 5 === a ? (e[1] = e[1] || {})[r[++p]] = h : 6 === a ? e[1][r[++p]] += h + "" : e.push(a ? t.apply(null, n(t, h, u, [ "", null ])) : h);
    }
    return e;
}, t = function(n) {
    for (var t, r, u = 1, e = "", p = "", s = [ 0 ], h = function(n) {
        1 === u && (n || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? s.push(n || e, 0) : 3 === u && (n || e) ? (s.push(n || e, 1), 
        u = 2) : 2 === u && "..." === e && n ? s.push(n, 3) : 2 === u && e && !n ? s.push(!0, 5, e) : u >= 5 && ((e || !n && 5 === u) && (s.push(e, u, r), 
        u = 6), n && (s.push(n, u, r), u = 6)), e = "";
    }, a = 0; a < n.length; a++) {
        a && (1 === u && h(), h(a));
        for (var f = 0; f < n[a].length; f++) t = n[a][f], 1 === u ? "<" === t ? (h(), s = [ s ], 
        u = 3) : e += t : 4 === u ? "--" === e && ">" === t ? (u = 1, e = "") : e = t + e[0] : p ? t === p ? p = "" : e += t : '"' === t || "'" === t ? p = t : ">" === t ? (h(), 
        u = 1) : u && ("=" === t ? (u = 5, r = e, e = "") : "/" === t && (u < 5 || ">" === n[a][f + 1]) ? (h(), 
        3 === u && (s = s[0]), u = s, (s = s[0]).push(u, 2), u = 0) : " " === t || "\t" === t || "\n" === t || "\r" === t ? (h(), 
        u = 2) : e += t), 3 === u && "!--" === e && (u = 4, s = s[0]);
    }
    return h(), s;
}, r = "function" == typeof Map, u = r ? new Map : {}, e = r ? function(n) {
    var r = u.get(n);
    return r || u.set(n, r = t(n)), r;
} : function(n) {
    for (var r = "", e = 0; e < n.length; e++) r += n[e].length + "-" + n[e];
    return u[r] || (u[r] = t(n));
};

function htm(t) {
    var r = n(this, e(t), arguments, []);
    return r.length > 1 ? r : r[0];
}

function createElement(type = "", props = {}, ...children) {
    let typenormalized = isstring(type) || isfunction(type) ? type : "";
    const propsnormalized = isobject(props) ? props : {};
    const childrennormalized = children.flat(Infinity);
    if (isstring(typenormalized)) {
        typenormalized = typenormalized.trim().toLowerCase();
    }
    if ("" === typenormalized) {
        return childrennormalized;
    }
    return new Virtualdom(typenormalized, propsnormalized, childrennormalized);
}

const html = htm.bind(createElement);

function isvalidvdom(v) {
    let flag = false;
    if (isarray(v)) {
        flag = v.map(ele => {
            return isvalidvdom(ele);
        }).includes(false) ? false : true;
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

function assertvalidvirtualdom(...args) {
    const vdom = html(...args);
    if (isvalidvdom(vdom)) {
        return vdom;
    } else {
        console.error(vdom);
        throw new TypeError(invalid_Virtualdom);
    }
}

function mount(ele, container) {
    setelehtml(container, "");
    let eles;
    if (Array.isArray(ele)) {
        eles = ele;
    } else {
        eles = [ ele ];
    }
    eles.forEach(e => appendchild(container, e));
    return container;
}

const invalid_Virtualdom = "invalid Virtualdom ";

function createApp(vdom, container) {
    if (isarray(vdom)) {
        vdom = vdom.flat(Infinity);
    }
    const el = container;
    if (!(isvalidvdom(vdom) || vdom instanceof Node || isarray(vdom) && isNodeArray(vdom))) {
        console.error(vdom);
        throw TypeError(invalid_Virtualdom);
    }
    if (!(el instanceof HTMLElement)) {
        throw TypeError("invalid container HTMLElement!");
    }
    if (el === document.body || el === document.documentElement || el === document.head) {
        throw Error("Do not mount  to <html> or <body> <head>.");
    }
    let elesarray;
    if (Array.isArray(vdom)) {
        elesarray = vdom;
    } else {
        elesarray = [ vdom ];
    }
    if (isvalidvdom(vdom)) {
        mount(elesarray.map(e => render(e)), container);
    } else if (vdom instanceof Node || isarray(vdom)) {
        mount(elesarray, container);
    }
    return container;
}

function isNodeArray(array) {
    return isarray(array) && !array.map(e => e instanceof Node).includes(false);
}

const invalid_ReactiveState = "invalid ReactiveState";

const truevdomsymbol = Symbol("truevdom");

const falsevdomsymbol = Symbol("falsevdom");

const trueelesymbol = Symbol("trueele");

const falseelesymbol = Symbol("falseele");

const handletrue = getsymbol("handletrue");

const handlefalse = getsymbol("handlefalse");

class Condition extends AttrChange {
    constructor(propsjson, children, options = {}) {
        super();
        const optionstrue = get(options, "true");
        const optionsfalse = get(options, "false");
        this[truevdomsymbol] = isarray(optionstrue) ? optionstrue.filter(Boolean) : [ optionstrue ].filter(Boolean);
        this[falsevdomsymbol] = isarray(optionsfalse) ? optionsfalse.filter(Boolean) : [ optionsfalse ].filter(Boolean);
    }
    [handlefalse]() {
        setelehtml(this, "");
        if (this[falsevdomsymbol]) {
            if (!this[falseelesymbol]) {
                this[falseelesymbol] = render(this[falsevdomsymbol]);
            }
            const elementtomount = this[falseelesymbol];
            createApp(elementtomount, this);
            elementtomount.forEach(e => onmounted(e));
            if (this[trueelesymbol]) {
                this[trueelesymbol].forEach(e => onunmounted(e));
            }
        }
    }
    [handletrue]() {
        setelehtml(this, "");
        if (this[truevdomsymbol]) {
            if (!this[trueelesymbol]) {
                this[trueelesymbol] = render(this[truevdomsymbol]);
            }
            const elementtomount = this[trueelesymbol];
            createApp(elementtomount, this);
            elementtomount.forEach(e => onmounted(e));
            if (this[falseelesymbol]) {
                this[falseelesymbol].forEach(e => onunmounted(e));
            }
        }
    }
    connectedCallback() {
        const attrs = createeleattragentreadwrite(this);
        if (true === attrs["value"]) {
            this[handletrue]();
        }
        if (false === attrs["value"]) {
            this[handlefalse]();
        }
    }
    disconnectedCallback() {
        onunmounted(this);
    }
    attributeChangedCallback(name) {
        if (name === "value") {
            const attrs = createeleattragentreadwrite(this);
            if (true === attrs["value"]) {
                this[handletrue]();
            }
            if (false === attrs["value"]) {
                this[handlefalse]();
            }
        }
    }
}

function conditon(conditon, iftrue, iffalse) {
    if (!isReactiveState(conditon)) {
        throw TypeError(invalid_ReactiveState);
    }
    [ iftrue, iffalse ].forEach(a => {
        if (!(isundefined(a) || isvalidvdom(a))) {
            throw new TypeError(invalid_Virtualdom);
        }
    });
    const vdom = new Virtualdom(Condition, {
        value: conditon
    });
    vdom.options = {
        true: iftrue,
        false: iffalse
    };
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
    requestAnimationFrame(() => {
        state[addallistenerssymbol]();
    });
}

function unwatch(state) {
    state[removeallistenerssymbol]();
}

function rewatch(state) {
    state[addallistenerssymbol]();
}

const invalid_custom_element_class = "invalid custom element class !";

if (!isobject(window.customElements)) {
    throw new TypeError(" customElements  not supported !");
}

function 使用value从表中查询key(表, 组件状态名) {
    return Object.entries(表).find(v => {
        return v[1] === 组件状态名;
    })[0];
}

window.CustomElementRegistry = get(getPrototypeOf(window.customElements), "constructor");

const {customElements: customElements, CustomElementRegistry: CustomElementRegistry} = window;

const elementset = Symbol.for("elementset");

const elementmap = Symbol.for("elementmap");

var RandomDefineCustomElement = (initclass, extendsname) => RandomDefineCustomElement$1(initclass, extendsname);

function RandomDefineCustomElement$1(initclass, extendsname, length = 1) {
    if (!isclassextendsHTMLElement(initclass)) {
        throw TypeError(invalid_custom_element_class);
    }
    if (!customElements[elementset].has(initclass)) {
        const elementname = getrandomstringandnumber(length);
        if (customElements.get(elementname)) {
            return RandomDefineCustomElement$1(initclass, extendsname, length + 1);
        } else {
            if (extendsname) {
                customElements.define(elementname, initclass, {
                    extends: extendsname
                });
            } else {
                customElements.define(elementname, initclass);
            }
        }
        return elementname;
    } else {
        return 使用value从表中查询key(customElements[elementmap], initclass);
    }
}

if (!customElements[elementset]) {
    customElements[elementset] = new Set;
}

if (!customElements[elementmap]) {
    customElements[elementmap] = {};
}

customElements.define = function(name, constructor, options) {
    if (!isclassextendsHTMLElement(constructor)) {
        console.error(constructor);
        throw TypeError(invalid_custom_element_class);
    }
    if (!customElements[elementset].has(constructor)) {
        if (has(customElements[elementmap], name)) {
            RandomDefineCustomElement$1(constructor, options ? options.extends : undefined);
        } else {
            CustomElementRegistry.prototype.define.call(customElements, name, constructor, options);
            customElements[elementset].add(constructor);
            customElements[elementmap][name] = constructor;
        }
    }
};

customElements[Symbol.iterator] = () => {
    const entries = Object.entries(customElements[elementmap]);
    return entries[Symbol.iterator].call(entries);
};

function getrandomcharactor() {
    return get(Array(26).fill(undefined).map((v, i) => 97 + i).map(n => String.fromCharCode(n)), Math.floor(Math.random() * 26));
}

function getrandomhexnumber() {
    return get(Array(16).fill(undefined).map((v, i) => i), Math.floor(Math.random() * 16)).toString(16);
}

function getrandomstringandnumber(length = 4) {
    return Array(length).fill(undefined).map(() => getrandomcharactor()).join("") + "-" + Array(length).fill(undefined).map(() => getrandomhexnumber()).join("");
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

const bindstatesymbol = Symbol("bindstate");

const reactivestatesymbol = Symbol("reactive");

const virtualdomsymbol = Symbol("virtualdom");

function throwinvalideletype(type) {
    console.error(type);
    throw TypeError("invalid element type!");
}

function render(vdom, namespace) {
    if (typeof vdom === "string") {
        return createtextnode(vdom);
    } else if (vdom instanceof ReactiveState) {
        const reactive = vdom;
        const textnode = createtextnode(String(reactive));
        textnode[reactivestatesymbol] = reactive;
        reactive[textnodesymbol] = textnode;
        watch(reactive, state => {
            changetext(textnode, String(state));
        });
        const element = textnode;
        element[bindstatesymbol] = new Set;
        element[bindstatesymbol].add(reactive);
        return textnode;
    } else if (vdom instanceof Virtualdom && "type" in vdom) {
        const {type: type} = vdom;
        let element;
        if (typeof type === "string") {
            if (type === "script") {
                return createnonescript();
            } else if (type === "svg") {
                element = createsvgelement();
            } else if (type === "math") {
                element = createmathelement();
            } else if ("" === type) {
                return render(vdom.children);
            } else {
                element = namespace ? createElementNS(namespace, type) : createnativeelement(type);
            }
        } else if (typeof type == "function") {
            if (isobject(type["defaultProps"])) {
                vdom.props = JSON.parse(JSON.stringify({
                    ...type["defaultProps"],
                    ...vdom.props
                }));
            }
            const propsjson = JSON.parse(JSON.stringify({
                ...vdom.props,
                ...Object.fromEntries(Object.entries(vdom.bindattr).map(([key, value]) => {
                    return [ key, value.value ];
                }))
            }));
            element = createcostumelemet(type, propsjson, vdom.children, vdom.options);
        } else {
            throwinvalideletype(vdom);
        }
        handleprops(element, vdom);
        if (typeof type !== "function") {
            mount(vdom.children.map(e => {
                if (type === "svg") {
                    return render(e, svgnamespace);
                } else if (type === "math") {
                    return render(e, mathnamespace);
                } else if (namespace) {
                    return render(e, namespace);
                } else {
                    return render(e);
                }
            }), element);
        }
        return element;
    } else if (isarray(vdom)) {
        return vdom.map(a => render(a));
    } else {
        throwinvalideletype(vdom);
    }
}

function handleprops(element, vdom) {
    ((element, vdom) => {
        Object.entries(vdom.directives).forEach(([name, value]) => {
            if (name in directives && typeof directives[name] === "function") {
                directives[name](element, value, vdom);
            } else {
                throw new Error("invalid directives " + name);
            }
        });
        const attribute1 = createeleattragentreadwrite(element);
        Object.assign(attribute1, vdom.props);
        element[virtualdomsymbol] = vdom;
        vdom.element = element;
        Object.entries(vdom.bindattr).forEach(([key, primitivestate]) => {
            attribute1[key] = primitivestate.value;
            watch(primitivestate, state => {
                attribute1[key] = state.value;
            });
        });
        if (!element[eventlistenerssymbol]) {
            element[eventlistenerssymbol] = [];
        }
        Object.entries(vdom.onevent).forEach(([event, callbacks]) => {
            onevent(element, event, callbacks);
        });
    })(element, vdom);
    if (!element[bindstatesymbol]) {
        element[bindstatesymbol] = new Set;
    }
    [ Object.values(vdom.bindattr), Object.values(vdom.directives) ].flat().filter(e => isReactiveState(e)).forEach(e => element[bindstatesymbol].add(e));
}

function readonlyproxy(target) {
    return new Proxy(target, {
        set() {
            return false;
        },
        defineProperty() {
            return false;
        },
        deleteProperty() {
            return false;
        }
    });
}

const Reflect$3 = window.Reflect;

const {ownKeys: ownKeys$1, deleteProperty: deleteProperty$1, apply: apply, construct: construct$1, defineProperty: defineProperty, get: get$2, getOwnPropertyDescriptor: getOwnPropertyDescriptor$1, getPrototypeOf: getPrototypeOf$1, has: has$1, set: set$2, setPrototypeOf: setPrototypeOf} = Reflect$3;

function isobject$2(a) {
    return typeof a === "object" && a !== null;
}

function isfunction$1(a) {
    return typeof a === "function";
}

function deepobserveaddpath(target, callback, patharray = [], ancestor = target) {
    if (typeof callback !== "function") {
        throw Error("observe callback invalid !");
    }
    if (isfunction$1(target) || isobject$2(target)) {
        let fakeobj;
        if (isobject$2(target)) {
            fakeobj = {};
        } else {
            fakeobj = () => {};
        }
        setPrototypeOf(fakeobj, null);
        return (fakeobj => {
            return new Proxy(fakeobj, {
                defineProperty(t, p, a) {
                    return defineProperty(target, p, a);
                },
                deleteProperty(t, p) {
                    callback(ancestor, [ ...patharray, p ], undefined, get$2(target, p));
                    return deleteProperty$1(target, p);
                },
                ownKeys() {
                    return ownKeys$1(target);
                },
                has(t, p) {
                    return has$1(target, p);
                },
                getPrototypeOf() {
                    return getPrototypeOf$1(target);
                },
                setPrototypeOf(t, v) {
                    return setPrototypeOf(target, v);
                },
                construct(t, argumentslist) {
                    if (typeof target === "function") {
                        return construct$1(target, argumentslist);
                    }
                },
                apply(t, thisarg, argarray) {
                    if (typeof target === "function") {
                        return apply(target, thisarg, argarray);
                    }
                },
                getOwnPropertyDescriptor(t, k) {
                    var descripter = getOwnPropertyDescriptor$1(target, k);
                    if (descripter) {
                        descripter.configurable = true;
                        return descripter;
                    } else {
                        return;
                    }
                },
                set(t, k, v) {
                    if (typeof callback === "function") {
                        callback(ancestor, [ ...patharray, k ], v, get$2(target, k));
                    }
                    return set$2(target, k, v);
                },
                get(t, k) {
                    var value = get$2(target, k);
                    if (isfunction$1(value) || isobject$2(value)) {
                        return deepobserveaddpath(value, callback, [ ...patharray, k ], target);
                    } else {
                        return value;
                    }
                }
            });
        })(fakeobj);
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
                } else {
                    return false;
                }
            }
        });
    } else if (isReactiveState(init)) {
        return createstate(init.value);
    } else if (isobject(init)) {
        return new Proxy(new ReactiveState(init), {
            defineProperty() {
                return false;
            },
            getOwnPropertyDescriptor(target, key) {
                const myvalue = get(target, "value");
                const descripter = getOwnPropertyDescriptor(target, key) || getOwnPropertyDescriptor(myvalue, key);
                if (descripter) {
                    descripter.configurable = true;
                }
                return descripter;
            },
            deleteProperty(target, key) {
                const myvalue = get(target, "value");
                if (has(myvalue, key)) {
                    deleteProperty(myvalue, key);
                    target[dispatchsymbol](key);
                    return true;
                } else {
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
                } else if (has(value, key)) {
                    if (isSet(value) && (key === "add" || key === "delete")) {
                        const myvalue = value;
                        if (key === "add") {
                            return add => {
                                if (!Set.prototype.has.call(myvalue, add)) {
                                    const returnvalue = Set.prototype[key].call(myvalue, add);
                                    target[dispatchsymbol]();
                                    return returnvalue;
                                }
                            };
                        } else if (key === "delete") {
                            return dele => {
                                if (Set.prototype.has.call(myvalue, dele)) {
                                    const returnvalue = Set.prototype[key].call(myvalue, dele);
                                    target[dispatchsymbol]();
                                    return returnvalue;
                                }
                            };
                        }
                    } else {
                        return observedeepagent(get(value, key), () => {
                            target[dispatchsymbol](key);
                        });
                    }
                }
            },
            ownKeys(target) {
                return Array.from(new Set([ ...ownKeys(target), ...ownKeys(get(target, "value")) ]));
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
                } else if (!has(target, key)) {
                    set(myvalue, key, value);
                    target[dispatchsymbol](key);
                } else if (key === "length") {
                    set(myvalue, key, value);
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

const attributessymbol = Symbol("attributes");

const elementsymbol = Symbol("element");

const vdomsymbol = Symbol("componentinnervdom");

const mountedsymbol = Symbol("mounted");

const unmountedsymbol = Symbol("unmounted");

const readysymbol = Symbol("ready");

function createComponent(custfun) {
    var _a, _b, _c;
    if (isfunction(custfun)) {
        const defaultProps = custfun["defaultProps"];
        return _c = class extends AttrChange {
            constructor(propsjson = {}, children = []) {
                super();
                this[_a] = false;
                this[_b] = {};
                const attrs = createeleattragentreadwrite(this);
                if (isobject(this.constructor["defaultProps"])) {
                    Object.assign(attrs, this.constructor["defaultProps"]);
                }
                if (isobject(propsjson)) {
                    Object.assign(attrs, propsjson);
                }
                const props = createeleattragentreadwrite(this);
                const thisattributess = Object.fromEntries(Object.entries(props).map(([key, value]) => [ key, createstate(value) ]));
                this[attributessymbol] = readonlyproxy(thisattributess);
                openctx();
                let possiblyvirtualdom;
                try {
                    possiblyvirtualdom = custfun(readonlyproxy(thisattributess), children);
                } catch (error) {
                    closectx();
                    throw error;
                }
                if (isarray(possiblyvirtualdom)) {
                    possiblyvirtualdom = possiblyvirtualdom.flat(Infinity).filter(Boolean);
                }
                if (isvalidvdom(possiblyvirtualdom)) {
                    this[vdomsymbol] = isarray(possiblyvirtualdom) ? possiblyvirtualdom : [ possiblyvirtualdom ];
                    this[vdomsymbol] = this[vdomsymbol].flat(Infinity).filter(Boolean);
                    this[mountedsymbol] = getMounted();
                    this[unmountedsymbol] = getUnMounted();
                    closectx();
                } else {
                    closectx();
                    console.error(possiblyvirtualdom);
                    throw Error(invalid_Virtualdom);
                }
            }
            connectedCallback() {
                if (!this[elementsymbol]) {
                    this[elementsymbol] = render(this[vdomsymbol]).flat(Infinity);
                }
                if (!this[readysymbol]) {
                    createApp(this[elementsymbol], this);
                    this[readysymbol] = true;
                }
                this[mountedsymbol].forEach(f => f());
                onmounted(this);
            }
            disconnectedCallback() {
                this[unmountedsymbol].forEach(f => f());
                onunmounted(this);
            }
            attributeChangedCallback(name) {
                if (this[attributessymbol][name]) {
                    this[attributessymbol][name].value = createeleattragentreadwrite(this)[name];
                }
            }
        }, _a = readysymbol, _b = attributessymbol, _c.defaultProps = isobject(defaultProps) ? JSON.parse(JSON.stringify(defaultProps)) : undefined, 
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
    Object.entries(options).forEach(([key, value]) => {
        if (typeof value !== "function") {
            throw TypeError(invalid_Function);
        } else {
            directives[key] = value;
        }
    });
}

extenddirectives({
    value(element, value, vdom) {
        if (isReactiveState(value) && (vdom.type === "input" || vdom.type === "textarea")) {
            vdom.bindattr["value"] = value;
            [ "change", "input" ].forEach(eventname => {
                const origin = vdom.onevent[eventname];
                const eventsarray = [ origin ].flat(Infinity);
                Reflect.set(vdom.onevent, eventname, eventsarray.concat([ e => {
                    return value.value = e.target.value;
                } ]).filter(Boolean));
            });
        } else {
            console.error(value);
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

const Fragment = "";

export { Fragment, conditon as condition, createApp, createComponent, createElement, createRef, createstate as createState, extenddirectives as directives, createElement as h, assertvalidvirtualdom as html, useMounted, useUnMounted, watch };
//# sourceMappingURL=index.js.map
