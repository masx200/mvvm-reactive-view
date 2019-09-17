function fromPairs(pairs) {
    var index = -1, length = pairs == null ? 0 : pairs.length, result = {};
    while (++index < length) {
        var pair = pairs[index];
        result[pair[0]] = pair[1];
    }
    return result;
}

var fromPairs_1 = fromPairs;

if ("function" !== typeof Object.fromEntries) Object.fromEntries = fromPairs_1;

function flattenDeep(arr1) {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}

function arrayflat(depth = 1) {
    if (depth <= 1) {
        return this.reduce((acc, val) => acc.concat(val), []);
    } else {
        return flattenDeep(this);
    }
}

if (typeof Array.prototype.flat !== "function") {
    Array.prototype.flat = arrayflat;
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
    return a instanceof Array && Array.isArray(a) && gettagtype(a) === "array";
}

function getsymbol(a) {
    return Symbol(a);
}

function gettagtype(a) {
    return {}.toString.call(a).replace("[object ", "").replace("]", "").toLowerCase();
}

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
        return isprimitive(value) ? String(value) : isobject(value) ? JSON.stringify(value) : "";
    }
    [(_a = textnodesymbol, _b = eventtargetsymbol, _c = memlisteners, dispatchsymbol)](eventname) {
        const name = eventname ? String(eventname) : "value";
        if (name !== "value") {
            this[eventtargetsymbol].dispatchEvent(new Event(name));
        }
        this[eventtargetsymbol].dispatchEvent(new Event("value"));
    }
    [subscribesymbol](callback, eventname) {
        const name = eventname ? String(eventname) : "value";
        this[memlisteners].push([ name, () => callback(this) ]);
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

function watch(state, callback, statekey) {
    if (!(isReactiveState(state) && isfunction(callback))) {
        throw TypeError("invalid state or callback");
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

function extenddirectives(options) {
    Object.entries(options).forEach(([key, value]) => {
        if (typeof value !== "function") {
            throw TypeError("invalid directive");
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
            throw TypeError("invalid ReactiveState or element");
        }
    }
});

function isVirtualdom(a) {
    return a instanceof Virtualdom;
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

function h(type = "", props = {}, ...children) {
    let typenormalized = isstring(type) || isfunction(type) ? type : "";
    const propsnormalized = isobject(props) ? props : {};
    const childrennormalized = children.flat(1);
    if (isstring(typenormalized)) {
        typenormalized = typenormalized.trim().toLowerCase();
    }
    if ("" === typenormalized) {
        return childrennormalized;
    }
    return new Virtualdom(typenormalized, propsnormalized, childrennormalized);
}

const html = htm.bind(h);

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
        throw new TypeError("invalid Virtualdom!");
    }
}

const eventlistenerssymbol = Symbol("eventlisteners");

function onevent(element, eventname, callback) {
    if (!element[eventlistenerssymbol]) {
        element[eventlistenerssymbol] = [];
    }
    if (typeof callback === "function") {
        addlisteners(element, eventname, [ callback ]);
    } else if (isarray(callback)) {
        addlisteners(element, eventname, callback);
    } else {
        throw TypeError("invalid EventListener");
    }
}

function addlisteners(ele, event, callarray) {
    callarray.forEach(call => {
        ele[eventlistenerssymbol].push([ event, call ]);
        domaddlisten(ele, event, call);
    });
}

function domaddlisten(ele, event, call) {
    ele.addEventListener(event, call);
}

class Setlikearray extends Array {
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

const Reflect$1 = window.Reflect;

const {apply: apply, construct: construct, defineProperty: defineProperty, deleteProperty: deleteProperty, get: get, getOwnPropertyDescriptor: getOwnPropertyDescriptor, getPrototypeOf: getPrototypeOf, has: has, isExtensible: isExtensible, ownKeys: ownKeys, preventExtensions: preventExtensions, set: set, setPrototypeOf: setPrototypeOf} = Reflect$1;

const customElementsarray = new Setlikearray;

function getcustomelementname(initclass) {
    return "c-" + customElementsarray.indexOf(initclass);
}

function isclassextendsHTMLElement(initclass) {
    return !!(isfunction(initclass) && initclass.prototype && initclass.prototype instanceof HTMLElement);
}

function createcostumelemet(initclass, propsjson, children) {
    if (isclassextendsHTMLElement(initclass)) {
        customElementsarray.push(initclass);
        const elementname = getcustomelementname(initclass);
        if (customElements.get(elementname) === initclass) ; else {
            customElements.define(elementname, initclass);
        }
        return construct(initclass, [ propsjson, children ]);
    } else {
        throw TypeError("invalid custom element class !");
    }
}

function mount(ele, container) {
    container.innerHTML = "";
    let eles;
    if (Array.isArray(ele)) {
        eles = ele;
    } else {
        eles = [ ele ];
    }
    eles.forEach(e => appendchild(container, e));
    return container;
}

const Reflect$2 = window.Reflect;

const {get: get$1, ownKeys: ownKeys$1, set: set$1} = Reflect$2;

const valuestring = "value";

function isobject$1(a) {
    return typeof a === "object" && a !== null;
}

function isstring$1(a) {
    return typeof a === "string";
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
    return new Proxy(temp, {
        ownKeys() {
            const keys = attributesownkeys(ele);
            return isinputtextortextareaflag ? Array.from(new Set([ ...keys, valuestring ])) : keys;
        },
        get(target, key) {
            if (isinputtextortextareaflag && key === valuestring) {
                return get$1(ele, valuestring);
            } else {
                var v = getattribute(ele, String(key));
                if (!v) {
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
            } else {
                setattribute(ele, String(key), isobject$1(v) ? JSON.stringify(v) : String(v));
                return true;
            }
        },
        deleteProperty(t, k) {
            removeAttribute(ele, String(k));
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
            if (isinputtextortextareaflag && key === valuestring) {
                return {
                    value: get$1(ele, valuestring),
                    ...otherdescipter
                };
            } else {
                var attr = getattribute(ele, String(key));
                if (attr) {
                    return {
                        value: attr,
                        ...otherdescipter
                    };
                } else {
                    return;
                }
            }
        }
    });
}

function attributesownkeys(ele) {
    return ownKeys$1(ele.attributes).filter(k => !/\d/.test(String(k)[0]));
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

function removeAttribute(ele, key) {
    return ele.removeAttribute(key);
}

function hasAttribute(ele, key) {
    return ele.hasAttribute(key);
}

function isinputtextortextarea(ele) {
    const tagname = geteletagname(ele);
    return tagname === "input" && get$1(ele, "type") === "text" || tagname === "textarea";
}

const bindstatesymbol = Symbol("bindstate");

const reactivestatesymbol = Symbol("reactivestate");

const virtualdomsymbol = Symbol("virtualdom");

function throwinvalideletype() {
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
            } else {
                element = namespace ? createElementNS(namespace, type) : createnativeelement(type);
            }
        } else if (typeof type == "function") {
            const propsjson = JSON.parse(JSON.stringify({
                ...vdom.props,
                ...Object.fromEntries(Object.entries(vdom.bindattr).map(([key, value]) => {
                    return [ key, value.value ];
                }))
            }));
            element = createcostumelemet(type, propsjson, vdom.children);
        } else {
            throwinvalideletype();
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
    } else {
        throwinvalideletype();
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

function createApp(vdom, container) {
    const el = container;
    if (!isvalidvdom(vdom)) {
        console.error(vdom);
        throw TypeError("invalid Virtualdom ");
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
    mount(elesarray.map(e => render(e)), container);
    return container;
}

function createRef(init) {
    return {
        value: init
    };
}

const Reflect$3 = window.Reflect;

const {ownKeys: ownKeys$2, deleteProperty: deleteProperty$1, apply: apply$1, construct: construct$1, defineProperty: defineProperty$1, get: get$2, getOwnPropertyDescriptor: getOwnPropertyDescriptor$1, getPrototypeOf: getPrototypeOf$1, has: has$1, set: set$2, setPrototypeOf: setPrototypeOf$1} = Reflect$3;

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
        setPrototypeOf$1(fakeobj, null);
        return (fakeobj => {
            return new Proxy(fakeobj, {
                defineProperty(t, p, a) {
                    return defineProperty$1(target, p, a);
                },
                deleteProperty(t, p) {
                    callback(ancestor, [ ...patharray, p ], undefined, get$2(target, p));
                    return deleteProperty$1(target, p);
                },
                ownKeys() {
                    return ownKeys$2(target);
                },
                has(t, p) {
                    return has$1(target, p);
                },
                getPrototypeOf() {
                    return getPrototypeOf$1(target);
                },
                setPrototypeOf(t, v) {
                    return setPrototypeOf$1(target, v);
                },
                construct(t, argumentslist) {
                    if (typeof target === "function") {
                        return construct$1(target, argumentslist);
                    }
                },
                apply(t, thisarg, argarray) {
                    if (typeof target === "function") {
                        return apply$1(target, thisarg, argarray);
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
                    return observedeepagent(get(value, key), () => {
                        target[dispatchsymbol](key);
                    });
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

export { createApp, h as createElemet, createRef, createstate as createState, extenddirectives as directives, h, assertvalidvirtualdom as html, watch };
//# sourceMappingURL=index.js.map
