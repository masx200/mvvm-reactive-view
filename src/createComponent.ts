import render from "./rendervdomtoreal";
import readonlyproxy from "./readonlyproxy";
import ReactiveState /* , { dispatchsymbol } */ from "./primitivestate";
import createstate from "./createstate";
const attributessymbol = Symbol("attributes");
const elementsymbol = Symbol("element");
const vdomsymbol = Symbol("componentinnervdom");
const mountedsymbol = Symbol("mounted");
const unmountedsymbol = Symbol("unmounted");
const readysymbol = Symbol("ready");
import { AttrChange } from "./attrchange";
import {
  openctx,
  closectx,
  getMounted,
  getUnMounted
} from "./context-mounted-unmounted-";
export interface Custom {
  (props?: object, children?: Array<any>):
    | Virtualdom
    | string
    | ReactiveState
    | Array<Virtualdom | ReactiveState | string>;
}
import { Class } from "./rendervdomtoreal";
import Virtualdom from "./virtualdom";
import createeleattragentreadwrite from "dom-element-attribute-agent-proxy";
import { isobject, isArray, isfunction } from "./util";
import { onunmounted, onmounted } from "./elementonmountandunmount";
import { isvalidvdom } from "./html";
import createApp from "./createApp";
// import { inflate } from "zlib";
export function createComponent(custfun: Custom): Class {
  if (isfunction(custfun)) {
    return class extends AttrChange {
      [readysymbol] = false;
      [mountedsymbol]: Array<Function>;
      [unmountedsymbol]: Array<Function>;
      static defaultProps = custfun["defaultProps"];
      [attributessymbol]: { [s: string]: ReactiveState } | object = {};
      [elementsymbol]: Array<Node>;
      [vdomsymbol]: Array<Virtualdom | ReactiveState | string>;
      constructor(propsjson?: object, children?: any[] /* , options?: any */) {
        super();
        const attrs = createeleattragentreadwrite(this);
        //   const props = {};
        if (isobject(this.constructor["defaultProps"])) {
          Object.assign(attrs, this.constructor["defaultProps"]);
          // Object.assign(props, this.constructor["defaultProps"]);
        }
        if (isobject(propsjson)) {
          Object.assign(attrs, propsjson);
          // Object.assign(props, propsjson);
        }
        //   this[attributessymbol] = createeleattragentreadwrite(this);
        const props = createeleattragentreadwrite(this);
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
          possiblyvirtualdom = custfun(
            readonlyproxy(thisattributess),
            children
          );
        } catch (error) {
          closectx();
          throw error;
        }

        if (isvalidvdom(possiblyvirtualdom)) {
          this[vdomsymbol] = isArray(possiblyvirtualdom)
            ? possiblyvirtualdom
            : [possiblyvirtualdom];
          this[vdomsymbol] = this[vdomsymbol].flat(Infinity);
          this[mountedsymbol] = getMounted();
          this[unmountedsymbol] = getUnMounted();
          closectx();
        } else {
          closectx();
          throw Error("invalid Virtualdom");
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
    throw TypeError("invalid component");
  }
}
