export const innerstatesymbol = Symbol("innerstate");

import { readysymbol } from "./readysymbol";
import render from "./rendervdomtoreal";
import readonlyproxy from "./readonlyproxy";
import ReactiveState /* , { dispatchsymbol } */ from "./primitivestate";
import createstate from "./createstate";
const attributessymbol = Symbol("attributes");
const elementsymbol = Symbol("innerelement");
const vdomsymbol = Symbol("innervdom");
const mountedsymbol = Symbol("mounted");
const unmountedsymbol = Symbol("unmounted");

import { AttrChange } from "./attrchange";
import {
  openctx,
  closectx,
  getMounted,
  getUnMounted,
  invalid_Function,
  getstates
} from "./context-mounted-unmounted-";

// import { Class } from "./rendervdomtoreal";

import Virtualdom from "./virtualdom";
import createeleattragentreadwrite from "dom-element-attribute-agent-proxy";
import { isobject, isArray, isfunction, isstring } from "./util";
import { onunmounted, onmounted } from "./elementonmountandunmount";
import { isvalidvdom } from "./html";
import { /* createApp, */ invalid_Virtualdom } from "./createApp";
import { toArray } from "./toArray";
import { Custom, Class } from "./customclass";
import {
  /* parsecsstext,
  prefixcssrules,
  cssrulestocsstext, */
  //   savestyleblob,
  componentsstylesheet,
  //   createlinkstylesheet,
  //   transformcsstext,
  registercssprefix,
  loadlinkstyle,
  createlinkstylesheet
  //   savestyleblob
} from "./parsecss";
// import { insertfirst } from "./dom";
import mount from "./mount";
import { seteletext } from "./dom";
// import { Promise } from "q";
// import { inflate } from "zlib";
import { componentsymbol } from "./iscomponent";
export function createComponent(custfun: Custom): Class {
  if (isfunction(custfun)) {
    const defaultProps = custfun["defaultProps"];
    const css = custfun["css"];
    return class Component extends AttrChange {
      [innerstatesymbol]: Array<ReactiveState>;
      static [componentsymbol] = true;
      static css = isstring(css) && css ? css : undefined;
      [readysymbol] = false;
      [mountedsymbol]: Array<Function>;
      [unmountedsymbol]: Array<Function>;
      static defaultProps = isobject(defaultProps)
        ? JSON.parse(JSON.stringify(defaultProps))
        : undefined;
      [attributessymbol]: { [s: string]: ReactiveState } | object = {};
      [elementsymbol]: Array<Node>;
      [vdomsymbol]: Array<Virtualdom | ReactiveState | string>;
      constructor(
        propsjson: object = {},
        children: any[] = [] /* , options?: any */
      ) {
        super();

        const css = this.constructor["css"];

        if (css) {
          const prefix = this.tagName.toLowerCase();
          if (!componentsstylesheet[prefix]) {
            registercssprefix(css, prefix);
            /* 把css文本先解析成cssom ,然后添加前缀,然后转成字符串,生成blob,再生成link-stylesheet,添加*/
            /* const cssomold = parsecsstext(css);
            const cssomnew = prefixcssrules(cssomold, prefix);
            //   console.log([css, prefix, cssomold, cssomnew]);
            const cssnewtext = cssrulestocsstext(cssomnew); */
            // const cssnewtext = transformcsstext(css, prefix);
            // savestyleblob(prefix, cssnewtext);
            // console.log(cssnewtext, componentsstylesheet);
          }
        }
        const defaultProps = this.constructor["defaultProps"];
        const attrs = createeleattragentreadwrite(this);
        //   const props = {};
        if (isobject(defaultProps)) {
          Object.assign(attrs, defaultProps);
          // Object.assign(props, this.constructor["defaultProps"]);
        }
        if (isobject(propsjson)) {
          Object.assign(attrs, propsjson);
          // Object.assign(props, propsjson);
        }
        //   this[attributessymbol] = createeleattragentreadwrite(this);
        // const props = createeleattragentreadwrite(this);/
        const props = attrs;
        const thisattributess = Object.fromEntries(
          Object.entries(props).map(([key, value]) => [key, createstate(value)])
        );
        this[attributessymbol] = readonlyproxy(thisattributess);

        /*  */
        openctx();
        let possiblyvirtualdom:
          | string
          | Virtualdom
          | ReactiveState
          | (string | Virtualdom | ReactiveState)[]
          | any;
        try {
          possiblyvirtualdom = custfun.call(
            undefined,
            //让组件里面无法修改props的reactivestate的value
            // readonlyproxy(thisattributess),

            readonlyproxy(
              Object.fromEntries(
                Object.entries(thisattributess).map(([key, value]) => [
                  key,
                  readonlyproxy(value)
                ])
              )
            ),
            children
          );
        } catch (error) {
          closectx();
          throw error;
        }

        if (isArray(possiblyvirtualdom)) {
          possiblyvirtualdom = possiblyvirtualdom
            .flat(Infinity)
            .filter(Boolean);
        }
        if (isvalidvdom(possiblyvirtualdom)) {
          const thisvdomsymbol /* isArray(possiblyvirtualdom)
            ? possiblyvirtualdom
            : [possiblyvirtualdom]; */ = toArray(
            possiblyvirtualdom
          );
          //
          this[vdomsymbol] = thisvdomsymbol.flat(Infinity).filter(Boolean);
          this[mountedsymbol] = getMounted();
          this[unmountedsymbol] = getUnMounted();
          this[innerstatesymbol] = getstates();
          closectx();
        } else {
          closectx();
          console.error(possiblyvirtualdom);
          throw Error(invalid_Virtualdom);
        }

        //   this[mountedsymbol] = getMounted();
        //   this[unmountedsymbol] = getUnMounted();
      }

      connectedCallback() {
        if (!this[elementsymbol]) {
          this[elementsymbol] = render(this[vdomsymbol]).flat(Infinity);
        }
        if (!this[readysymbol]) {
          this[readysymbol] = true;
          /* 这段代码只在初始化时执行一次 */
          //   mount(this[elementsymbol], this, false);

          const css = this.constructor["css"];
          const prefix = this.tagName.toLowerCase();
          if (css && componentsstylesheet[prefix]) {
            /* 先清空当前组件 的children */

            seteletext(this, "");
            /* 应该要等待css加载完成之后再渲染出来,否则会有页面跳动 */
            /* 是css里面的@import导致的 */
            /* 挂载样式到组件最前面 */
            //   console.log(componentsstylesheet[prefix]);
            // if (componentsstylesheet[prefix]) {
            /* const stylelinkelement = createlinkstylesheet(
              componentsstylesheet[prefix]
            ); */
            /*   stylelinkelement.onload = () => {
              mount(this[elementsymbol], this, false);
            };
            stylelinkelement.onerror = () => {
              mount(this[elementsymbol], this, false);
            }; */
            // insertfirst(this, stylelinkelement);
            // }
            Promise.all(
              [...componentsstylesheet[prefix]].map(styleurl =>
                loadlinkstyle(createlinkstylesheet(styleurl), this)
              )
            ).then(() => {
              //   console.log("style load all");
              //   console.log("mount1");
              mount(this[elementsymbol], this, false);
            });
          } else {
            // console.log("mount2");
            mount(this[elementsymbol], this);
          }
        }

        this[mountedsymbol].forEach(f => f());
        onmounted(this);
      }
      disconnectedCallback() {
        this[unmountedsymbol].forEach(f => f());
        onunmounted(this);
      }
      attributeChangedCallback(
        name: string /* , oldValue: any, newValue: any */
      ) {
        // console.log(this[attributessymbol]);
        if (this[attributessymbol][name]) {
          /* 当属性改变时要跟ReactiveState同步状态 */
          this[attributessymbol][name].value = createeleattragentreadwrite(
            this
          )[name];
          //   this[attributessymbol][name][dispatchsymbol]();
        }
      }
    };
  } else {
    console.error(custfun);
    throw TypeError(invalid_Function);
  }
}
