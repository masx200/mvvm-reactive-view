import createeleattragentreadwrite from "@masx200/dom-element-attribute-agent-proxy";
import { getcreated } from "src/life-cycle-context/created-get";
import { getupdated } from "src/life-cycle-context/updated-get";
import { addcreatedlistner } from "src/others/addcreatedlistner";
import { addmountedlistner } from "src/others/addmountedlistner";
import { addunmountedlistner } from "src/others/addunmountedlistner";
import {
    addstopupdatelistener,
    addupdatedlistner
} from "src/others/addupdatedlistner";
import { isvalidvdom } from "../CreateElement/isvalidvdom";
import Virtualdom, { Vdomchildren } from "../CreateElement/VirtualElement";
import { Custom } from "../CustomClass/customclass";
import { isclassextendsHTMLElement } from "../CustomClass/isclassextendsHTMLElement";
import {
    closectx,
    getstates,
    getwatchrecords,
    invalid_Function,
    openctx
} from "../life-cycle-context/Component-context";
import { getMounted } from "../life-cycle-context/getMounted";
import { getUnMounted } from "../life-cycle-context/getUnMounted";
import mount from "../MountElement/mount-real-element";
import { invalid_Virtualdom } from "../MountElement/MountElement";
import { cached_create_componet } from "../others/cached-map";
import ReactiveState, { dispatchsymbol } from "../Reactivity/reactivestate.js";
import readonlyproxy from "../Reactivity/readonly-proxy";
import render from "../RenderVirtual/render-vdom-to-real";
import { componentsstylesheet } from "../ScopedCSS/parsecss-transformcss";
import { registercssprefix } from "../ScopedCSS/registercssprefix";
import { waitloadallstyle } from "../ScopedCSS/waitloadallstyle";
import { seteletext } from "../UtilTools/dom";
import { apply, get, set } from "../UtilTools/reflect";
import { setimmediate } from "../UtilTools/setimmediate";
import { toArray } from "../UtilTools/toArray";
import { isfunction, isobject, isstring } from "../UtilTools/util";
import {
    AttrChange,
    attributeChangedCallback,
    connectedCallback,
    disconnectedCallback,
    firstinstalledcallback
} from "./attr-change";
import { componentsymbol } from "./iscomponent";
import { readysymbol } from "./readysymbol";

const waittranformcsssymbol = Symbol("waittranformcss");
export const innerwatchrecords = Symbol("innerwatchrecord");
export const innerstatesymbol = Symbol("innerstate");
export const attributessymbol = Symbol("attributes");
const elementsymbol = Symbol("innerelement");
const inner_vdom_symbol = Symbol("innervdom");

export interface Htmlelementconstructor {
    new (): HTMLElement;
    prototype: HTMLElement;
    defaultProps?: Record<string, any>;
    css?: string;
}
function createComponentold(
    custfun: Custom,
    options?: { defaultProps?: Record<string, any>; css?: string }
): Htmlelementconstructor {
    if (isfunction(custfun)) {
        const cached_class = cached_create_componet.get(custfun);
        if (cached_class) {
            return cached_class;
        }

        const defaultProps =
            options?.defaultProps ?? get(custfun, "defaultProps");
        const css = options?.css ?? get(custfun, "css");
        class Component extends AttrChange {
            [innerwatchrecords]: [ReactiveState<any>, Function][];
            [attributessymbol]: Record<string, ReactiveState<any>> = {};

            [waittranformcsssymbol]: undefined | (() => Promise<void>);
            constructor(
                propsjson: Record<string, any> = {},
                children: Vdomchildren = []
            ) {
                super();

                const css = get(this.constructor, "css");

                if (css) {
                    const prefix = this.tagName.toLowerCase();
                    if (!get(componentsstylesheet, prefix)) {
                        set(componentsstylesheet, prefix, new Set());

                        this[waittranformcsssymbol] = () => {
                            return setimmediate(() => {
                                registercssprefix(css, prefix);
                            });
                        };
                    }
                }

                const attrs: Record<string, any> = createeleattragentreadwrite(
                    this
                );

                if (isobject(propsjson)) {
                    Object.assign(attrs, propsjson);
                }

                const props = attrs;
                openctx();

                const propattributess = Object.fromEntries(
                    Object.entries(props).map(([key]) => [
                        key,
                        (() => {
                            const attributes = createeleattragentreadwrite(
                                this
                            ) as Record<string, any>;
                            const state = new ReactiveState({
                                get() {
                                    return get(attributes, key);
                                }
                            });
                            // defineProperty(state, "value", {
                            //     get() {
                            //         return get(attributes, key);
                            //     }
                            // });

                            return state;
                        })()
                    ])
                );
                this[attributessymbol] = propattributess;

                const readonlyprop = readonlyproxy(
                    Object.fromEntries(
                        Object.entries(propattributess).map(([key, value]) => [
                            key,
                            readonlyproxy(value)
                        ])
                    )
                );

                let possiblyvirtualdom:
                    | string
                    | Virtualdom<any>
                    | ReactiveState<any>
                    | (string | Virtualdom<any> | ReactiveState<any>)[]
                    | any;
                try {
                    possiblyvirtualdom = apply(custfun, undefined, [
                        readonlyprop,
                        children.flat(1 / 0)
                    ]);
                } catch (error) {
                    closectx();
                    console.error("error in component");
                    throw error;
                }

                possiblyvirtualdom = toArray(possiblyvirtualdom);
                if (isvalidvdom(possiblyvirtualdom)) {
                    const vdomarray = toArray(possiblyvirtualdom);
                    //
                    this[inner_vdom_symbol] = vdomarray
                        .flat(Infinity)
                        .filter(Boolean);
                    const mountedcallbacks = getMounted();
                    const unmountedcallbacks = getUnMounted();
                    const createdcallbacks = getcreated();
                    const updatedcallbacks = getupdated();
                    this[innerstatesymbol] = getstates();
                    this[innerwatchrecords] = getwatchrecords();
                    closectx();
                    mountedcallbacks.forEach((callback) => {
                        addmountedlistner(this, callback);
                    });
                    unmountedcallbacks.forEach((callback) => {
                        addunmountedlistner(this, callback);
                    });
                    createdcallbacks.forEach((callback) => {
                        addcreatedlistner(this, callback);
                    });
                    updatedcallbacks.forEach((callback) => {
                        addupdatedlistner(this, callback);
                    });
                    addstopupdatelistener(this);
                } else {
                    closectx();
                    console.error(possiblyvirtualdom);
                    console.error(invalid_Virtualdom);
                    throw TypeError();
                }
            }

            [innerstatesymbol]: Array<ReactiveState<any>>;
            static [componentsymbol] = componentsymbol;
            static css = !!(css && isstring(css)) ? css : undefined;
            [readysymbol] = false;

            static defaultProps = isobject(defaultProps)
                ? JSON.parse(JSON.stringify(defaultProps))
                : undefined;

            [elementsymbol]: Array<Node>;
            [inner_vdom_symbol]: Array<
                Virtualdom<any> | ReactiveState<any> | string | number
            >;

            [firstinstalledcallback]() {
                const thencallbackfirst = () => {
                    seteletext(this, "");

                    return waitloadallstyle(prefix, document.head);
                };
                const thencallbacksecond = () => {
                    mount(this[elementsymbol], this, false);
                    this[waittranformcsssymbol] = undefined;
                };
                if (!this[elementsymbol]) {
                    const innervdom = this[inner_vdom_symbol];
                    if (innervdom) {
                        this[elementsymbol] = render(innervdom).flat(Infinity);
                        this[inner_vdom_symbol] = [];
                    }
                }

                const css = get(this.constructor, "css");
                const prefix = this.tagName.toLowerCase();
                if (css) {
                    const waitcallback = this[waittranformcsssymbol];
                    if (waitcallback) {
                        waitcallback()
                            .then(thencallbackfirst)
                            .then(thencallbacksecond);
                    } else {
                        Promise.resolve(thencallbackfirst).then(
                            thencallbacksecond
                        );
                    }
                } else {
                    mount(this[elementsymbol], this);
                }
            }
            connectedCallback() {
                setimmediate(() => {
                    connectedCallback(this);
                });
            }
            disconnectedCallback() {
                setimmediate(() => {
                    disconnectedCallback(this);
                });
            }
            [attributeChangedCallback](name: string) {
                if (this[readysymbol]) {
                    {
                        const propreactivestate = this[attributessymbol][name];

                        if (propreactivestate) {
                            propreactivestate[dispatchsymbol]();
                        }
                    }
                }
            }
        }
        cached_create_componet.set(custfun, Component);
        return Component;
    } else {
        console.error(custfun);
        console.error(invalid_Function);
        throw TypeError();
    }
}

const createComponent = function(
    custfun: Custom,
    options?: { defaultProps?: Record<string, any>; css?: string }
): Htmlelementconstructor {
    return autocreateclass(custfun, options);
};
export default createComponent;
export function autocreateclass(
    custfun: Custom | Htmlelementconstructor,
    options?: { defaultProps?: Record<string, any>; css?: string }
): Htmlelementconstructor {
    if (isclassextendsHTMLElement(custfun)) {
        if (options) {
            return Object.assign(custfun, options);
        } else {
            return custfun;
        }
    } else if (isfunction(custfun)) {
        return createComponentold(custfun, options);
    } else {
        throw TypeError();
    }
}
export { createComponent };
