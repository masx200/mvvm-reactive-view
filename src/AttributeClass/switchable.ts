import { setimmediate } from "src/UtilTools/setimmediate";
import { h } from "../CreateElement/create-element";
import Virtualdom from "../CreateElement/VirtualElement";
import { Custom } from "../CustomClass/customclass";
// import { isclassextendsHTMLElement } from "../CustomElement/create-costum-elemet";
import { mountrealelement } from "../MountElement/mount-real-element";
import ReactiveState, { isReactiveState } from "../Reactivity/ReactiveState";
import { CancelWatchfun, watch } from "../Reactivity/watch";
import render from "../RenderVirtual/render-vdom-to-real";
import { isfunction } from "../UtilTools/util";
import {
  AttrChange,
  connectedCallback,
  disconnectedCallback,
  firstinstalledcallback
} from "./attr-change";
import { autocreateclass, Htmlelementconstructor } from "./createComponent";
import { componentsymbol } from "./iscomponent";
import { readysymbol } from "./readysymbol";
const cancel_watch_symbol = Symbol("cancel_watch");
const cached_class_element = Symbol("cached_class_element");
const switch_mount_symbol = Symbol("switch_mount");
// const current_element_class = Symbol("current_element_class");
export { Switchable };
function Switchable(
  funstate: ReactiveState<Htmlelementconstructor | Custom>
): Virtualdom<Htmlelementconstructor> {
  if (!isReactiveState(funstate)) {
    console.error(funstate);
    throw new TypeError();
  }
  class Switchable extends AttrChange {
    // [current_element_class]: Htmlelementconstructor;
    [cached_class_element] = new WeakMap<Htmlelementconstructor, Element>();
    disconnectedCallback() {
      //   onunmounted(this);
      //   super.disconnectedCallback();
      setimmediate(() => {
        disconnectedCallback(this);
        if (isfunction(this[cancel_watch_symbol])) {
          this[cancel_watch_symbol]();
        }
      });
    }
    [cancel_watch_symbol]: CancelWatchfun;
    static [componentsymbol] = componentsymbol;
    [readysymbol] = false;
    [switch_mount_symbol](eleclass: Custom | Htmlelementconstructor) {
      eleclass = autocreateclass(eleclass);
      /*  if (!isclassextendsHTMLElement(eleclass)) {
        console.error(eleclass);
        throw new TypeError();
      } */
      //   this[current_element_class] = eleclass;
      const eleme = this[cached_class_element].get(eleclass);
      if (eleme) {
        mountrealelement(eleme, this);
        // return;
      } else {
        const elementreal = render(h(eleclass));

        this[cached_class_element].set(eleclass, elementreal);
        mountrealelement(elementreal, this);
        // return;
      }
    }
    [firstinstalledcallback]() {
      const callmountswitch = () => {
        this[switch_mount_symbol](funstate.valueOf() as
          | Custom
          | Htmlelementconstructor);
      };
      callmountswitch();
      this[cancel_watch_symbol] = watch(funstate, () => {
        callmountswitch();
      });
    }
    connectedCallback() {
      connectedCallback(this);
      /* if (!this[readysymbol]) {
        this[readysymbol] = true;
      } */
      //   onmounted(this);
    }
  }
  return h(Switchable);
}
export default Switchable;
