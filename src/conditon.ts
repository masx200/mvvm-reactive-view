export type VaildVDom =
  | Virtualdom<any>
  | string
  | number
  | Array<Virtualdom<any> | string | number | ReactiveState<any>>
  | ReactiveState<any>;
import createeleattr from "@masx200/dom-element-attribute-agent-proxy";
import { AttrChange } from "./attrchange";
import createApp, { invalid_Virtualdom } from "./createApp";
import createElement from "./createelement";
import { setelehtml } from "./dom";
// const readysymbol = Symbol("ready");
import { onmounted, onunmounted } from "./elementonmountandunmount";
import { isvalidvdom } from "./html";
import { componentsymbol } from "./iscomponent";
import ReactiveState, { isReactiveState } from "./reactivestate";
import { readysymbol } from "./readysymbol";
import { get } from "./reflect";
import render from "./rendervdomtoreal";
// import mount from "./mount";
import { isboolean, isundefined } from "./util";
// import createElement from "./createelement";
import Virtualdom from "./virtualdom";
// import { readysymbol } from "./createComponent";
export const invalid_ReactiveState = "invalid ReactiveState";
const truevdomsymbol = Symbol("truevdom");
const falsevdomsymbol = Symbol("falsevdom");
const trueelesymbol = Symbol("trueele");
const falseelesymbol = Symbol("falseele");
const handletrue = Symbol("handletrue");
const handlefalse = Symbol("handlefalse");

export default function(
  conditon: ReactiveState<any> | boolean,
  iftrue?: VaildVDom,
  iffalse?: VaildVDom
): Virtualdom<any> {
  if (!(isReactiveState(conditon) || isboolean(conditon))) {
    console.error(conditon);
    console.error(invalid_ReactiveState);
    throw TypeError();
  }
  [iftrue, iffalse].forEach(a => {
    if (!(isundefined(a) || isvalidvdom(a))) {
      console.error(a);
      console.error(invalid_Virtualdom);
      throw new TypeError();
    }
  });
  const options = { true: iftrue, false: iffalse };
  class Condition extends AttrChange {
    static [componentsymbol] = true;
    [readysymbol] = false;
    constructor(/* propsjson?: object, children?: any[], options: object = {} */) {
      super();
      // if(){}
      const optionstrue = get(options, "true");
      const optionsfalse = get(options, "false");
      this[truevdomsymbol] =
        /*isarray(optionstrue)
        ? optionstrue.filter(Boolean)
        : */
        [optionstrue].flat(1 / 0).filter(Boolean);
      this[falsevdomsymbol] =
        /* isarray(optionsfalse)
        ? optionsfalse.filter(Boolean)
        : */

        [optionsfalse].flat(1 / 0).filter(Boolean);
      // optionsfalse;
    }
    [falseelesymbol]: any[];
    [trueelesymbol]: any[];
    [truevdomsymbol]: any[];
    [falsevdomsymbol]: any[];
    //   [readysymbol] = false;
    [handlefalse]() {
      setelehtml(this, "");
      if (this[falsevdomsymbol]) {
        if (!this[falseelesymbol]) {
          // } else {
          this[falseelesymbol] = render(this[falsevdomsymbol]);
          // this[falsevdomsymbol].map(e => render(e));
        }
        //   mount(this[falseelesymbol], this);
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
          // this[truevdomsymbol].map(e => render(e));
        }
        //
        //   mount(this[trueelesymbol], this);
        const elementtomount = this[trueelesymbol];
        createApp(elementtomount, this);
        elementtomount.forEach(e => onmounted(e));
        if (this[falseelesymbol]) {
          this[falseelesymbol].forEach(e => onunmounted(e));
        }
      }
    }
    connectedCallback() {
      if (!this[readysymbol]) {
        // createApp(this[elementsymbol], this);
        this[readysymbol] = true;

        const attrs: { [key: string]: any } = createeleattr(this);
        // console.log(attrs);
        if (true === attrs["value"]) {
          get(this, handletrue).call(this);
        }
        if (false === attrs["value"]) {
          get(this, handlefalse).call(this);
          //
        }
      }
      onmounted(this);
      //
    }
    disconnectedCallback() {
      onunmounted(this);
    }

    attributeChangedCallback(
      name: string /* , oldValue: any, newValue: any */
    ) {
      if (this[readysymbol]) {
        // console.log(name, oldValue, newValue);
        if (name === "value") {
          const attrs: { [key: string]: any } = createeleattr(this);
          //   console.log(attrs);
          if (true === attrs["value"]) {
            this[handletrue]();
            //
          }
          if (false === attrs["value"]) {
            this[handlefalse]();
            //
          }
        }

        //
      }
    }
  }
  /* vdom.options = { true: iftrue, false: iffalse }; */
  const vdom = createElement(Condition, { value: conditon });
  return vdom;
  /*  */
}
