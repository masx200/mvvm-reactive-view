import {
  AttrChange,
  firstinstalledcallback,
  connectedCallback,
  disconnectedCallback
} from "./attrchange";
import { Htmlelementconstructor } from "./createComponent";
import { h } from "../createelement";
import { componentsymbol } from "../iscomponent";
import ReactiveState, { isReactiveState } from "../Reactivity/reactivestate";
import { readysymbol } from "../readysymbol";
import Virtualdom from "../VirtualElement";
import { watch, CancelWatchfun } from "../Reactivity/watch";
import { isclassextendsHTMLElement } from "../createcostumelemet";
import { mountrealelement } from "../mount-real-element";
import render from "../render-vdom-to-real";
import { isfunction } from "../UtilTools/util";
const cancel_watch_symbol = Symbol("cancel_watch");
const cached_class_element = Symbol("cached_class_element");
const switch_mount_symbol = Symbol("switch_mount");
function switchable(
  funstate: ReactiveState<Htmlelementconstructor>
): Virtualdom<Htmlelementconstructor> {
  if (!isReactiveState(funstate)) {
    console.error(funstate);
    throw new TypeError();
  }
  class Switchable extends AttrChange {
    [cached_class_element] = new Map<Htmlelementconstructor, Element>();
    async disconnectedCallback() {
      //   onunmounted(this);
      //   super.disconnectedCallback();
      disconnectedCallback(this);
      if (isfunction(this[cancel_watch_symbol])) {
        this[cancel_watch_symbol]();
      }
    }
    [cancel_watch_symbol]: CancelWatchfun;
    static [componentsymbol] = componentsymbol;
    [readysymbol] = false;
    [switch_mount_symbol](eleclass: Function) {
      if (!isclassextendsHTMLElement(eleclass)) {
        console.error(eleclass);
        throw new TypeError();
      }
      const eleme = this[cached_class_element].get(eleclass);
      if (eleme) {
        mountrealelement(eleme, this);
        return;
      } else {
        const elementreal = render(h(eleclass));

        this[cached_class_element].set(eleclass, elementreal);
        mountrealelement(elementreal, this);
        return;
      }
    }
    [firstinstalledcallback]() {
      const callmountswitch = () => {
        this[switch_mount_symbol](funstate.valueOf());
      };
      callmountswitch();
      this[cancel_watch_symbol] = watch(funstate, () => {
        callmountswitch();
      });
    }
    async connectedCallback() {
      connectedCallback(this);
      /* if (!this[readysymbol]) {
        this[readysymbol] = true;
      } */
      //   onmounted(this);
    }
  }
  return h(Switchable);
}
export default switchable;
