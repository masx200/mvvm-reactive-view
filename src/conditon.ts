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
import mount from "./mount";
import { isarray, getsymbol } from "./util";
class Condition extends AttrChange {
  [falseelesymbol]: any[];
  [trueelesymbol]: any[];
  [truevdomsymbol]: any[];
  [falsevdomsymbol]: any[];
  //   [readysymbol] = false;
  [handlefalse]() {
    if (this[falsevdomsymbol]) {
      if (!this[falseelesymbol]) {
        // } else {
        this[falseelesymbol] = this[falsevdomsymbol].map(e => render(e));
      }
      mount(this[falseelesymbol], this);
      this[falseelesymbol].forEach(e => onmounted(e));
      if (this[trueelesymbol]) {
        this[trueelesymbol].forEach(e => onunmounted(e));
      }
    }
  }
  [handletrue]() {
    if (this[truevdomsymbol]) {
      if (!this[trueelesymbol]) {
        this[trueelesymbol] = this[truevdomsymbol].map(e => render(e));
      }
      //
      mount(this[trueelesymbol], this);
      this[trueelesymbol].forEach(e => onmounted(e));
      if (this[falseelesymbol]) {
        this[falseelesymbol].forEach(e => onunmounted(e));
      }
    }
  }
  connectedCallback() {
    const attrs = createeleattr(this);
    // console.log(attrs);
    if (true === attrs["value"]) {
      this[handletrue]();
    }
    if (false === attrs["value"]) {
      this[handlefalse]();
      //
    }

    //
  }
  /* disconnectedCallback() {
    //
  } */
  constructor(propsjson?: object, children?: any[], options?: any) {
    super();
    this[truevdomsymbol] = isarray(options.true)
      ? options.true
      : [options.true];
    this[falsevdomsymbol] = isarray(options.false)
      ? options.false
      : [options.false];
    // options.false;
  }
  attributeChangedCallback(name: string /* , oldValue: any, newValue: any */) {
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
export default function(
  conditon: ReactiveState,
  iftrue:
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
    throw TypeError("invalid ReactiveState");
  }
  const vdom = new Virtualdom(Condition, { value: conditon });
  vdom.options = { true: iftrue, false: iffalse };
  return vdom;
  /*  */
}
