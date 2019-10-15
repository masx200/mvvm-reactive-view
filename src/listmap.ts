import createeleattr from "@masx200/dom-element-attribute-agent-proxy";
import { AttrChange, attributeChangedCallback } from "./attrchange";
import computed from "./computed";
import { VaildVDom } from "./conditon";
import { createComponent, Htmlelementconstructor } from "./createComponent";
import createElement from "./createelement";
import createstate from "./createstate";
import { appendchild, getdomchildren, removeNode } from "./dom";
import { onmounted, onunmounted } from "./element-onmount-unmount";
import { componentsymbol } from "./iscomponent";
import mount from "./mount-real-element";
import ReactiveState, { isReactiveState } from "./reactivestate";
import { readysymbol } from "./readysymbol";
import render from "./render-vdom-to-real";
import { isArray, isfunction, isSet } from "./util";
import Virtualdom from "./VirtualElement";
import { get, set } from "./reflect";
export { listmap as listMap };
const listvalueattr = Symbol("listvalueattr");
// const listlengthsymbol = Symbol("listlength");
const listinnervdom = Symbol("listinnervdom");
const listinnerelement = Symbol("listinnerelement");
const cached_vdom_symbol = Symbol("cached_vdom");
const cached_realele = Symbol("cached_realele");
function listmap(
  list: any[] | Set<any> | ReactiveState<any[] | Set<any>>,
  mapfun: (value: ReactiveState<any>, index: number) => VaildVDom
): Virtualdom<Htmlelementconstructor> {
  if (!isArray(list) && !isSet(list) && !isReactiveState(list)) {
    console.error(list);
    throw new TypeError();
  }
  if (!isfunction(mapfun)) {
    console.error(mapfun);
    throw new TypeError();
  }
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
    [cached_vdom_symbol]: Record<
      number,
      Virtualdom<Htmlelementconstructor>
    > = {};
    [cached_realele]: Record<number, Element> = {};
    [listvalueattr] = createstate([]);
    // [listlengthsymbol]: number;
    [listinnerelement]: Array<Element | Node>;
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
          // this[listlengthsymbol] = value.length;
          /* 状态变化时同步一次 */
          this[listvalueattr]["value"] = value;
          const domchildren = getdomchildren(this);
          const newlength = value.length;
          const oldlength = domchildren.length;
          if (newlength > oldlength) {
            const numindexs = Array(newlength)
              .fill(undefined)
              .map((v, i) => i)
              .slice(oldlength);

            const vdomstoadd = numindexs.map(index => {
              const cached_vdom1 = get(this[cached_vdom_symbol], index);
              if (cached_vdom1) {
                return cached_vdom1;
              } else {
                const vdom = ITEMfactory(
                  computed(
                    this[listvalueattr],
                    v => (v as any[])[index] as any
                  ),

                  index
                );
                set(this[cached_vdom_symbol], index, vdom);
                return vdom;
              }
            });
            const realelementstoadd = vdomstoadd.map(vdom => {
              const index = vdom.props.index;
              const cached_element = get(this[cached_realele], index);
              if (cached_element) {
                return cached_element;
              } else {
                const element = render(vdom);
                set(this[cached_realele], index, element);
                return element;
              }
            });
            this[listinnervdom].push(...vdomstoadd);
            this[listinnerelement].push(...realelementstoadd);
            realelementstoadd.forEach(element => appendchild(this, element));
          } else if (newlength < oldlength) {
            /* 把旧的清除掉 */
            this[listinnervdom] = this[listinnervdom].slice(0, newlength);
            this[listinnerelement] = this[listinnerelement].slice(0, newlength);
            getdomchildren(this)
              .slice(newlength)
              .forEach(element => removeNode(element));
          }
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
        /* 挂载时同步一次 */
        this[listvalueattr]["value"] = value;
        this[listinnervdom] = value.map((v, index) =>
          ITEMfactory(
            computed(this[listvalueattr], v => (v as any[])[index] as any),

            index
          )
        );
        this[listinnerelement] = render(this[listinnervdom]);

        Object.assign(this[cached_vdom_symbol], this[listinnervdom]);
        Object.assign(this[cached_realele], this[listinnerelement]);
        mount(this[listinnerelement], this);
        // this[listlengthsymbol] = value.length;
      }
      onmounted(this);
    }
  }
  return createElement(ListMap, { value: list });
}
