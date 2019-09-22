import { readysymbol } from "./readysymbol";
// import { readysymbol } from "./createComponent";
export const invalid_ReactiveState = "invalid ReactiveState";
import { get } from "./reflect";
import render from "./rendervdomtoreal";
import createeleattr from "dom-element-attribute-agent-proxy";
import { AttrChange } from "./attrchange";
// import createElement from "./createelement";
import Virtualdom from "./virtualdom";
import ReactiveState, { isReactiveState } from "./primitivestate";
const truevdomsymbol = Symbol("truevdom");
const falsevdomsymbol = Symbol("falsevdom");
const trueelesymbol = Symbol("trueele");
const falseelesymbol = Symbol("falseele");
const handletrue = getsymbol("handletrue");
const handlefalse = getsymbol("handlefalse");
// const readysymbol = Symbol("ready");
import { onmounted, onunmounted } from "./elementonmountandunmount";
// import mount from "./mount";
import { isarray, getsymbol, isundefined } from "./util";
import createApp, { invalid_Virtualdom } from "./createApp";
import { setelehtml } from "./dom";
import { isvalidvdom } from "./html";
class Condition extends AttrChange {
  [readysymbol] = false;
  constructor(propsjson?: object, children?: any[], options: object = {}) {
    super();
    // if(){}
    const optionstrue = get(options, "true");
    const optionsfalse = get(options, "false");
    this[truevdomsymbol] = isarray(optionstrue)
      ? optionstrue.filter(Boolean)
      : [optionstrue].filter(Boolean);
    this[falsevdomsymbol] = isarray(optionsfalse)
      ? optionsfalse.filter(Boolean)
      : [optionsfalse].filter(Boolean);
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

      const attrs = createeleattr(this);
      // console.log(attrs);
      if (true === attrs["value"]) {
        this[handletrue]();
      }
      if (false === attrs["value"]) {
        this[handlefalse]();
        //
      }
    }
    onmounted(this);
    //
  }
  disconnectedCallback() {
    onunmounted(this);
  }

  attributeChangedCallback(name: string /* , oldValue: any, newValue: any */) {
    if (this[readysymbol]) {
      // console.log(name, oldValue, newValue);
      if (name === "value") {
        const attrs = createeleattr(this);
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
export default function(
  conditon: ReactiveState,
  iftrue?:
    | Virtualdom
    | string
    | Array<Virtualdom | string | ReactiveState>
    | ReactiveState,
  iffalse?:
    | Virtualdom
    | string
    | Array<Virtualdom | string | ReactiveState>
    | ReactiveState
): Virtualdom {
  if (!isReactiveState(conditon)) {
    throw TypeError(invalid_ReactiveState);
  }
  [iftrue, iffalse].forEach(a => {
    if (!(isundefined(a) || isvalidvdom(a))) {
      throw new TypeError(invalid_Virtualdom);
    }
  });
  const vdom = new Virtualdom(Condition, { value: conditon });
  vdom.options = { true: iftrue, false: iffalse };
  return vdom;
  /*  */
}
