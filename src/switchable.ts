import { AttrChange, firstinstalledcallback } from "./attrchange";
import { Htmlelementconstructor } from "./createComponent";
import { h } from "./createelement";
import { componentsymbol } from "./iscomponent";
import ReactiveState from "./reactivestate";
import { readysymbol } from "./readysymbol";
import Virtualdom from "./VirtualElement";

function switchable(
  funstate: ReactiveState<Function>
): Virtualdom<Htmlelementconstructor> {
  class Switchable extends AttrChange {
    async disconnectedCallback() {
      //   onunmounted(this);
      super.disconnectedCallback();
    }
    static [componentsymbol] = componentsymbol;
    [readysymbol] = false;
    [firstinstalledcallback]() {}
    async connectedCallback() {
      super.connectedCallback();
      /* if (!this[readysymbol]) {
        this[readysymbol] = true;
      } */
      //   onmounted(this);
    }
  }
  return h(Switchable);
}
export default switchable;
