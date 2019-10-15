import mount from "./mount-real-element";
import createeleattr from "@masx200/dom-element-attribute-agent-proxy";
import { VaildVDom } from "./conditon";
import createElement from "./createelement";
import { AttrChange, attributeChangedCallback } from "./attrchange";
import { Htmlelementconstructor, createComponent } from "./createComponent";
import Virtualdom from "./VirtualElement";
import ReactiveState from "./reactivestate";
import { readysymbol } from "./readysymbol";
import { componentsymbol } from "./iscomponent";
import { onunmounted, onmounted } from "./element-onmount-unmount";
import { isArray } from "./util";
import render from "./render-vdom-to-real";
import computed from "./computed";
import createstate from "./createstate";
export { listmap };
const listvalueattr = Symbol("listvalueattr");
const listlengthsymbol = Symbol("listlength");
const listinnervdom = Symbol("listinnervdom");
const listinnerelement = Symbol("listinnerelement");
function listmap(
  list: any[] | Set<any> | ReactiveState<any[] | Set<any>>,
  mapfun: (value: ReactiveState<any>, index: number) => VaildVDom
): Virtualdom<Htmlelementconstructor> {
  const itemclass = createComponent(props => {
    const myprops = props as {
      value: ReactiveState<any>;
      index: ReactiveState<any>;
    };
    const value = myprops.value;
    const index = myprops.index.valueOf() as number;
    return mapfun(value, index);
  });
  const ITEMfactory = (value: ReactiveState<any>, index: number) =>
    createElement(itemclass, { value, index });
  //   console.log(ITEMfactory);
  class ListMap extends AttrChange {
    [listvalueattr] = createstate(createeleattr(this)["value"]);
    [listlengthsymbol]: number;
    [listinnerelement]: Element | Node[];
    [listinnervdom]: Virtualdom<Htmlelementconstructor>[];
    static [componentsymbol] = componentsymbol;
    [readysymbol] = false;
    [attributeChangedCallback](name: string) {
      if (this[readysymbol]) {
        if (name === "value") {
          const attrs = createeleattr(this);
          const value = attrs["value"];

          if (!isArray(value)) {
            console.log(value);
            throw new TypeError();
          }
          this[listlengthsymbol] = value.length;
          this[listvalueattr]["value"] = value;
          // if(){}
        }
      }
    }
    async disconnectedCallback() {
      onunmounted(this);
    }
    async connectedCallback() {
      if (!this[readysymbol]) {
        this[readysymbol] = true;

        const attrs = createeleattr(this);
        const value: any[] = attrs["value"];

        if (!isArray(value)) {
          console.log(value);
          throw new TypeError();
        }

        this[listinnervdom] = value.map((v, i) =>
          ITEMfactory(
            computed(this[listvalueattr], v => (v as any[])[i] as any),

            i
          )
        );
        this[listinnerelement] = render(this[listinnervdom]);
        mount(this[listinnerelement], this);
        this[listlengthsymbol] = value.length;
      }
      onmounted(this);
    }
  }
  return createElement(ListMap, { value: list });
}
