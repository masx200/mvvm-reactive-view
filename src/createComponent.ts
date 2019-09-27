import { readysymbol } from "./readysymbol";
import render from "./rendervdomtoreal";
import readonlyproxy from "./readonlyproxy";
import ReactiveState /* , { dispatchsymbol } */ from "./primitivestate";
import createstate from "./createstate";
const attributessymbol = Symbol("attributes");
const elementsymbol = Symbol("element");
const vdomsymbol = Symbol("componentinnervdom");
const mountedsymbol = Symbol("mounted");
const unmountedsymbol = Symbol("unmounted");

import { AttrChange } from "./attrchange";
import {
  openctx,
  closectx,
  getMounted,
  getUnMounted,
  invalid_Function
} from "./context-mounted-unmounted-";
export interface Custom {
  (props?: object, children?: Array<any>):
    | Virtualdom
    | string
    | ReactiveState
    | Array<Virtualdom | ReactiveState | string>;
  defaultProps?: object;
  css?: string;
}
import { Class } from "./rendervdomtoreal";
import Virtualdom from "./virtualdom";
import createeleattragentreadwrite from "dom-element-attribute-agent-proxy";
import { isobject, isArray, isfunction, isstring } from "./util";
import { onunmounted, onmounted } from "./elementonmountandunmount";
import { isvalidvdom } from "./html";
import createApp, { invalid_Virtualdom } from "./createApp";
import { toArray } from "./toArray";
// import { inflate } from "zlib";
export function createComponent(custfun: Custom): Class {
  if (isfunction(custfun)) {
    const defaultProps = custfun["defaultProps"];
    const css = custfun["css"];
    return class Component extends AttrChange {
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
