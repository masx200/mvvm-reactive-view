export const innerstatesymbol = Symbol("innerstate");
import createeleattragentreadwrite from "@masx200/dom-element-attribute-agent-proxy";
import { AttrChange, attributeChangedCallback } from "./attrchange";
import {
  closectx,
  getMounted,
  getstates,
  getUnMounted,
  invalid_Function,
  openctx
} from "./context-mounted-unmounted-";
import { /* createApp, */ invalid_Virtualdom } from "./createApp";
import createstate from "./createstate";
import { Custom } from "./customclass";
import { seteletext } from "./dom";
import { onmounted, onunmounted } from "./elementonmountandunmount";
import { isvalidvdom } from "./html";
// import { Promise } from "q";
// import { inflate } from "zlib";
import { componentsymbol } from "./iscomponent";
// import { insertfirst } from "./dom";
import mount from "./mount";
import {
  /* parsecsstext,
        prefixcssrules,
        cssrulestocsstext, */
  //   savestyleblob,
  componentsstylesheet,
  //   createlinkstylesheet,
  //   transformcsstext,
  registercssprefix,
  /*  loadlinkstyle,
        createlinkstylesheet */
  //   savestyleblob
  waitloadallstyle
} from "./parsecss";
import ReactiveState /* , { dispatchsymbol } */ from "./reactivestate";
import readonlyproxy from "./readonlyproxy";
import { readysymbol } from "./readysymbol";
import { get, set } from "./reflect";
import render from "./rendervdomtoreal";
import { setimmediate } from "./setimmediate";
import { toArray } from "./toArray";
import { isArray, isfunction, isobject, isstring } from "./util";
// import { Class } from "./rendervdomtoreal";
import Virtualdom from "./virtualdom";
const attributessymbol = Symbol("attributes");
const elementsymbol = Symbol("innerelement");
const vdomsymbol = Symbol("innervdom");
const mountedsymbol = Symbol("mounted");
const unmountedsymbol = Symbol("unmounted");

export function createComponent(custfun: Custom): Function {
  if (isfunction(custfun)) {
    const defaultProps = get(custfun, "defaultProps"); //custfun["defaultProps"];
    const css = get(custfun, "css");
    class Component extends AttrChange {
      // new (propsjson?: object | undefined, children?: any[] | undefined): HTMLElement

      //   constructor(...args: any[]);
      constructor(
        propsjson: object = {},
        children: any[] = [] /* , options?: any */ //   : HTMLElement;
      ) {
        super();

        const css = get(this.constructor, "css");

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
        const defaultProps = get(this.constructor, "defaultProps");
        // this.constructor["defaultProps"];
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
        openctx();
        const props = attrs;
        const thisattributess = Object.fromEntries(
          Object.entries(props).map(([key, value]) => [key, createstate(value)])
        );
        this[attributessymbol] = readonlyproxy(thisattributess);

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
          possiblyvirtualdom = custfun.call(
            undefined,
            //让组件里面无法修改props的reactivestate的value
            // readonlyproxy(thisattributess),
            readonlyprop,
            children
          );
        } catch (error) {
          closectx();
          console.error(error);
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
          console.error(invalid_Virtualdom);
          throw TypeError();
        }

        //   this[mountedsymbol] = getMounted();
        //   this[unmountedsymbol] = getUnMounted();
      }
   //   prototype!: HTMLElement;
   //   defaultProps?: { [key: string]: any } | undefined;
    //  css?: string | undefined;
      [innerstatesymbol]: Array<ReactiveState<any>>;
      static [componentsymbol] = componentsymbol;
      static css = isstring(css) && css ? css : undefined;
      [readysymbol] = false;
      [mountedsymbol]: Array<Function>;
      [unmountedsymbol]: Array<Function>;
      static defaultProps = isobject(defaultProps)
        ? JSON.parse(JSON.stringify(defaultProps))
        : undefined;
      [attributessymbol]: { [s: string]: ReactiveState<any> } | object = {};
      [elementsymbol]: Array<Node>;
      [vdomsymbol]: Array<
        Virtualdom<any> | ReactiveState<any> | string | number
      >;

   async   connectedCallback() {
        if (!this[elementsymbol]) {
          this[elementsymbol] = render(this[vdomsymbol]).flat(Infinity);
        }
        if (!this[readysymbol]) {
          this[readysymbol] = true;
          /* 这段代码只在初始化时执行一次 */
          //   mount(this[elementsymbol], this, false);

          const css = get(this.constructor, "css");
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
            /*  Promise.all(
              [...componentsstylesheet[prefix]].map(styleurl =>
                loadlinkstyle(createlinkstylesheet(styleurl), this)
              )
            )
*/
            waitloadallstyle(prefix, this).then(() => {
              //   console.log("style load all");
              //   console.log("mount1");
              mount(this[elementsymbol], this, false);
            });
          } else {
            // console.log("mount2");
            mount(this[elementsymbol], this);
          }
        }
        //把mounted callback 异步执行
        this[mountedsymbol].forEach(f => {
          setimmediate(f);
        });
        onmounted(this);
      }
    async  disconnectedCallback() {
        this[unmountedsymbol].forEach(f => {
          setimmediate(f);
        });
      
  onunmounted(this);
      }
   async   [attributeChangedCallback](
        name: string /* , oldValue: any, newValue: any */
      ) {
        // console.log(this[attributessymbol]);
        if (get(this, attributessymbol)[name]) {
          /* 当属性改变时要跟ReactiveState同步状态 */
          set(
            get(this, attributessymbol)[name],
            "value,",
            (createeleattragentreadwrite(this) as { [key: string]: any })[
              name
            ] as any
          );
          /*   this[attributessymbol][name].value = createeleattragentreadwrite(
            this
          )[name]; */
          //   this[attributessymbol][name][dispatchsymbol]();
        }
      }
    }

    return Component;
  } else {
    console.error(custfun);
    console.error(invalid_Function);
    throw TypeError();
  }
}
