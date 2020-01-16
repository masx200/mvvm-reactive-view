import createeleattr from "@masx200/dom-element-attribute-agent-proxy";
import { asserttype } from "src/asserttype";
import { setimmediate } from "src/UtilTools/setimmediate";
import createElement from "../CreateElement/create-element";
import Virtualdom, { isVirtualdom } from "../CreateElement/VirtualElement";
import mount from "../MountElement/mount-real-element";
import computed from "../Reactivity/computed";
import createstate from "../Reactivity/create-state";
import ReactiveState, { isReactiveState } from "../Reactivity/ReactiveState";
import render from "../RenderVirtual/render-vdom-to-real";
import { appendchild, getchildren, removeElement } from "../UtilTools/dom";
import { get, set } from "../UtilTools/reflect";
import { isArray, isfunction, isSet } from "../UtilTools/util";
import {
  AttrChange,
  attributeChangedCallback,
  connectedCallback,
  disconnectedCallback,
  firstinstalledcallback
} from "./attr-change";

import { Htmlelementconstructor } from "./createComponent";
import { componentsymbol } from "./iscomponent";
import { readysymbol } from "./readysymbol";
export { ListMap };
export default ListMap;
const listvalueattr = Symbol("listvalueattr");

const listinnervdom = Symbol("listinnervdom");
const listinnerelement = Symbol("listinnerelement");
/* 不需要中间缓存了 */

const cached_realele = Symbol("cached_realele");
function ListMap(
  list: any[] | Set<any> | ReactiveState<any[] | Set<any>>,
  mapfun: (value: ReactiveState<any>, index: number) => Virtualdom<any>
): Virtualdom<Htmlelementconstructor> {
  if (!isArray(list) && !isSet(list) && !isReactiveState(list)) {
    console.error(list);
    throw new TypeError();
  }
  if (!isfunction(mapfun)) {
    console.error(mapfun);
    throw new TypeError();
  }

  const ITEMfactory = (value: ReactiveState<any>, index: number) => {
    const possiblevdom = mapfun(value, index);
    asserttype(isVirtualdom(possiblevdom));
    return possiblevdom;
  };
  function indextovdom(index: number, thiscom: ListMap) {
    /* 只要缓存从index到element就够了,不需要中间缓存了 */

    /* const cached_vdom1 = get(thiscom[cached_vdom_symbol], index);
    if (cached_vdom1) {
      return cached_vdom1;
    } else { */
    const vdom = ITEMfactory(
      computed(thiscom[listvalueattr], v => (v as any[])[index] as any),

      index
    );

    return vdom;
  }

  /* 没有必要创建一个class */

  class ListMap extends AttrChange {
    static defaultProps = { value: [] };

    [cached_realele]: Map<number, Element> = new Map();
    [listvalueattr] = createstate([]);

    [listinnerelement]: Array<Element | Node>;
    [listinnervdom]: Array<Virtualdom<any>>;
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

          /* 状态变化时同步一次 */
          set(this[listvalueattr], "value", value);

          const domchildren = getchildren(this);
          const newlength = value.length;
          const oldlength = domchildren.length;
          if (newlength > oldlength) {
            const numindexs = Array(newlength)
              .fill(undefined)
              .map((v, i) => i)
              .slice(oldlength);

            const realelementstoadd: Element[] = numindexs.map(index => {
              const cached_element = get(this[cached_realele], index);
              /* 直接从缓存中获取element */
              if (cached_element) {
                return cached_element;
              } else {
                const vdom = indextovdom(index, this);
                const element = render(vdom);
                set(this[cached_realele], index, element);
                return element;
              }
            });
            /* this[listinnervdom].push(...vdomstoadd);
            this[listinnerelement].push(...realelementstoadd); */
            realelementstoadd.forEach(element => appendchild(this, element));
          } else if (newlength < oldlength) {
            /* 把旧的清除掉 */
            /*  this[listinnervdom] = this[listinnervdom].slice(0, newlength);
            this[listinnerelement] = this[listinnerelement].slice(0, newlength); */
            getchildren(this)
              .slice(newlength)
              .forEach(element => removeElement(element));
          }
        }
      }
    }
    disconnectedCallback() {
      setimmediate(() => {
        disconnectedCallback(this);
        /* if (itemtagname) {
          querySelectorAll(itemtagname).forEach(e => removeNode(e));
        } */
      });
    }
    [firstinstalledcallback]() {
      const attrs = createeleattr(this);
      const value: any[] = attrs["value"];

      if (!isArray(value)) {
        console.log(value);
        throw new TypeError();
      }
      /* 挂载时同步一次 */

      set(this[listvalueattr], "value", value);
      this[listinnervdom] = value.map((v, index) =>
        ITEMfactory(
          computed(this[listvalueattr], v => (v as any[])[index] as any),

          index
        )
      );
      this[listinnerelement] = render(this[listinnervdom]);

      Object.entries(this[listinnerelement]).forEach(([key, value]) => {
        /* this[cached_realele] 已经改成Map类型了
         */
        set(this[cached_realele], Number(key), value);
      });

      mount(this[listinnerelement], this);

      /* 清除不使用的变量引用,垃圾回收 */
      this[listinnerelement] = [];
      this[listinnervdom] = [];
    }
    connectedCallback() {
      /*   if (!this[readysymbol]) {
        this[readysymbol] = true;

       
        
      } */

      connectedCallback(this);
    }
  }
  return createElement(ListMap, { value: list });
}
