import { h } from "../CreateElement/create-element";
import Virtualdom from "../CreateElement/VirtualElement";
import { Custom } from "../CustomClass/customclass";
import { mountrealelement } from "../MountElement/mount-real-element";
import ReactiveState, { isReactiveState } from "../Reactivity/reactivestate.ts";
import { CancelWatchfun, watch } from "../Reactivity/watch";
import render from "../RenderVirtual/render-vdom-to-real";
import { setimmediate } from "../UtilTools/setimmediate";
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

export { Switchable };
function Switchable(
  funstate: ReactiveState<Htmlelementconstructor | Custom>
): Virtualdom<Htmlelementconstructor> {
  if (!isReactiveState(funstate)) {
    console.error(funstate);
    throw new TypeError();
  }
  class Switchable extends AttrChange {
    [cached_class_element] = new WeakMap<
      Htmlelementconstructor,
      Element | Node
    >();
    disconnectedCallback() {
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

      const eleme = this[cached_class_element].get(eleclass);
      if (eleme) {
        mountrealelement(eleme, this);
      } else {
        const elementreal = render(h(eleclass));

        this[cached_class_element].set(eleclass, elementreal);
        mountrealelement(elementreal, this);
      }
    }
    [firstinstalledcallback]() {
      const callmountswitch = () => {
        this[switch_mount_symbol](
          funstate.valueOf() as Custom | Htmlelementconstructor
        );
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
    }
  }
  return h(Switchable);
}
export default Switchable;
