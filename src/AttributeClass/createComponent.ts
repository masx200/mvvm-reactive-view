import createeleattragentreadwrite from "@masx200/dom-element-attribute-agent-proxy";

import { cached_create_componet } from "../cached-map";
import { isvalidvdom } from "../CreateElement/isvalidvdom";
import Virtualdom, { Vdomchildren } from "../CreateElement/VirtualElement";
import { Custom } from "../CustomClass/customclass";
import { isclassextendsHTMLElement } from "../CustomClass/isclassextendsHTMLElement";
import {
    closectx,
    getMounted,
    getstates,
    getUnMounted,
    getwatchrecords,
    invalid_Function,
    openctx
} from "../mounted-unmounted/Component-context";
import mount from "../MountElement/mount-real-element";
import { invalid_Virtualdom } from "../MountElement/MountElement";
import ReactiveState, { dispatchsymbol } from "../Reactivity/reactivestate.js";
import readonlyproxy from "../Reactivity/readonly-proxy";
import render from "../RenderVirtual/render-vdom-to-real";
import { componentsstylesheet } from "../ScopedCSS/parsecss-transformcss";
import { registercssprefix } from "../ScopedCSS/registercssprefix";
import { waitloadallstyle } from "../ScopedCSS/waitloadallstyle";
import { seteletext } from "../UtilTools/dom";
import { apply, defineProperty, get, set } from "../UtilTools/reflect";
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
const mountedsymbol = Symbol("mounted");
const unmountedsymbol = Symbol("unmounted");
export interface Htmlelementconstructor {
    new (): HTMLElement;
    prototype: HTMLElement;
    defaultProps?: Record<string, any>;
    css?: string;
}
function createComponentold(custfun: Custom): Htmlelementconstructor {
    if (isfunction(custfun)) {
        const cached_class = cached_create_componet.get(custfun);
        if (cached_class) {
            return cached_class;
        }

        const defaultProps = get(custfun, "defaultProps");
        const css = get(custfun, "css");
        class Component extends AttrChange {
            [innerwatchrecords]: [ReactiveState<any>, Function][];
            [attributessymbol]: Record<string, ReactiveState<any>> = {};

            [waittranformcsssymbol]: undefined | (() => Promise<void>);
            constructor(
                propsjson: Record<string, any> = {},
                children: Vdomchildren = [] /* , options?: any */
            ) {
                super();

                const css = get(this.constructor, "css");

                if (css) {
                    const prefix = this.tagName.toLowerCase();
                    if (
                        !get(componentsstylesheet, prefix)
                        /*  componentsstylesheet[prefix] */
                    ) {
                        set(componentsstylesheet, prefix, new Set());
                        /* 改成异步解析css转换 */

                        this[waittranformcsssymbol] = () => {
                            return setimmediate(() => {
                                registercssprefix(css, prefix);
                            });
                        };

                        /* 把css文本先解析成cssom ,然后添加前缀,然后转成字符串,生成blob,再生成link-stylesheet,添加*/
                        /* const cssomold = parsecsstext(css);
                const cssomnew = prefixcssrules(cssomold, prefix);
                
                const cssnewtext = cssrulestocsstext(cssomnew); */
                    }
                }

                const attrs: Record<string, any> = createeleattragentreadwrite(
                    this
                );

                /*    if (isobject(defaultProps)) {
          Object.assign(attrs, defaultProps);
          
        } */
                if (isobject(propsjson)) {
                    Object.assign(attrs, propsjson);
                }

                const props = attrs;
                openctx();

                const thisattributess = Object.fromEntries(
                    Object.entries(props).map(([key]) => [
                        key,
                        (() => {
                            /* 使用getter来保证每次访问到最新的attribute */
                            const attributes = createeleattragentreadwrite(
                                this
                            ) as Record<string, any>;
                            const state = new ReactiveState();
                            defineProperty(state, "value", {
                                get() {
                                    return get(attributes, key);
                                },
                                configurable: true
                            });

                            return state;
                        })()
                    ])
                );
                this[attributessymbol] = thisattributess;

                /* 把attributes的reactivestates也放进innerstates中 */
                const readonlyprop = readonlyproxy(
                    Object.fromEntries(
                        Object.entries(thisattributess).map(([key, value]) => [
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
                    /* custfun.call(
            undefined,
            
            
            readonlyprop,
            children */
                } catch (error) {
                    closectx();
                    console.error("error in component");
                    throw error;
                }
                /* 
        if (isArray(possiblyvirtualdom)) {
          possiblyvirtualdom = possiblyvirtualdom
            .flat(Infinity)
            .filter(Boolean);
        } */
                possiblyvirtualdom = toArray(possiblyvirtualdom);
                if (isvalidvdom(possiblyvirtualdom)) {
                    const vdomarray /* isArray(possiblyvirtualdom)
                ? possiblyvirtualdom
                : [possiblyvirtualdom]; */ = toArray(
                        possiblyvirtualdom
                    );
                    //
                    this[inner_vdom_symbol] = vdomarray
                        .flat(Infinity)
                        .filter(Boolean);
                    this[mountedsymbol] = getMounted();
                    this[unmountedsymbol] = getUnMounted();
                    this[innerstatesymbol] = getstates();
                    this[innerwatchrecords] = getwatchrecords();
                    closectx();
                } else {
                    closectx();
                    console.error(possiblyvirtualdom);
                    console.error(invalid_Virtualdom);
                    throw TypeError();
                }
            }

            [innerstatesymbol]: Array<ReactiveState<any>>;
            static [componentsymbol] = componentsymbol;
            static css = isstring(css) && css ? css : undefined;
            [readysymbol] = false;
            [mountedsymbol]: Array<Function>;
            [unmountedsymbol]: Array<Function>;
            static defaultProps = isobject(defaultProps)
                ? JSON.parse(JSON.stringify(defaultProps))
                : undefined;

            [elementsymbol]: Array<Node>;
            [inner_vdom_symbol]: Array<
                Virtualdom<any> | ReactiveState<any> | string | number
            >;

            [firstinstalledcallback]() {
                const thencallbackfirst = () => {
                    /* 异步解析转换css */
                    seteletext(this, "");
                    /* 挂载link style sheet到head上 */
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
                        /*清除不再使用的引用, 垃圾回收 */
                    }
                }

                const css = get(this.constructor, "css");
                const prefix = this.tagName.toLowerCase();
                if (css /*  && componentsstylesheet[prefix] */) {
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

                    /* 先清空当前组件 的children */

                    /* 应该要等待css加载完成之后再渲染出来,否则会有页面跳动 */
                    /* 是css里面的@import导致的 */
                    /* 挂载样式到组件最前面 */

                    /* const stylelinkelement = createlinkstylesheet(
              componentsstylesheet[prefix]
            ); */
                    /*   stylelinkelement.onload = () => {
              mount(this[elementsymbol], this, false);
            };
            stylelinkelement.onerror = () => {
              mount(this[elementsymbol], this, false);
            }; */

                    /*  Promise.all(
              [...componentsstylesheet[prefix]].map(styleurl =>
                loadlinkstyle(createlinkstylesheet(styleurl), this)
              )
            )
*/
                } else {
                    mount(this[elementsymbol], this);
                }
            }
            connectedCallback() {
                setimmediate(() => {
                    connectedCallback(this);

                    this[mountedsymbol].forEach(f => {
                        setimmediate(f);
                    });
                });
            }
            disconnectedCallback() {
                setimmediate(() => {
                    disconnectedCallback(this);
                    this[unmountedsymbol].forEach(f => {
                        setimmediate(f);
                    });
                });
            }
            [attributeChangedCallback](
                name: string /* , oldValue: any, newValue: any */
            ) {
                if (this[readysymbol]) {
                    {
                        const propreactivestate = this[attributessymbol][name];
                        /*   const attributes = createeleattragentreadwrite(this) as Record<
              string,
              any
            >; */
                        if (propreactivestate) {
                            /* 使用getter来保证每次访问到最新的attribute */
                            propreactivestate[dispatchsymbol]();

                            /* 当属性改变时要跟ReactiveState同步状态 */
                            /*   set(
            get(this, attributessymbol)[name],
            "value,",
            (createeleattragentreadwrite(this) as { [key: string]: any })[
              name
            ] as any */

                            /*   this[attributessymbol][name].value = createeleattragentreadwrite(
            this
          )[name]; */
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

const createComponent = (custfun: Custom | Htmlelementconstructor) =>
    autocreateclass(custfun);
export default createComponent;
export function autocreateclass(
    custfun: Custom | Htmlelementconstructor
): Htmlelementconstructor {
    if (isclassextendsHTMLElement(custfun)) {
        return custfun;
    } else if (isfunction(custfun)) {
        return createComponentold(custfun);
    } else {
        throw TypeError();
    }
}
export { createComponent };
