import { querySelectorAll } from "../UtilTools/dom";
import RandomDefineCustomElement from "../CustomClass/CustomElementRegistry";
import createeleattr from "@masx200/dom-element-attribute-agent-proxy";
import {
  AttrChange,
  attributeChangedCallback,
  firstinstalledcallback,
  connectedCallback,
  disconnectedCallback
} from "./attr-change";
import computed from "../Reactivity/computed";
// import { VaildVDom } from "./conditon";
import { createComponent, Htmlelementconstructor } from "./createComponent";
import createElement from "../CreateElement/create-element";
import createstate from "../Reactivity/create-state";
import { Custom } from "../CustomClass/customclass";
import { appendchild, getdomchildren, removeNode } from "../UtilTools/dom";
import { componentsymbol } from "./iscomponent";
import mount from "../MountElement/mount-real-element";
import ReactiveState, { isReactiveState } from "../Reactivity/ReactiveState";
import { readysymbol } from "./readysymbol";
import { get, set } from "../UtilTools/reflect";
import render from "../RenderVirtual/render-vdom-to-real";
import { isArray, isfunction, isSet } from "../UtilTools/util";
import Virtualdom from "../CreateElement/VirtualElement";
import { VaildVDom } from "../CreateElement/isvalidvdom";
export { ListMap };
export default ListMap;
const listvalueattr = Symbol("listvalueattr");
// const listlengthsymbol = Symbol("listlength");
const listinnervdom = Symbol("listinnervdom");
const listinnerelement = Symbol("listinnerelement");
const cached_vdom_symbol = Symbol("cached_vdom");
const cached_realele = Symbol("cached_realele");
function ListMap(
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
  const itemclass = createComponent(
    Object.assign(
      (
        props: Record<string, ReactiveState<any>>,
        children: [(0 | undefined)?]
      ) => {
        const { value: propvalue /* , index: propindex */ } = props as {
          value: ReactiveState<any>;
          //   index: ReactiveState<any>;
        };
        // const myprops = {propvalue,}
        const value = propvalue; //myprops.value;
        const [propindex = 0] = children;
        const index = Number(propindex); //myprops.index.valueOf() as number;
        return mapfun(value, index);
      },
      { defaultProps: { /*  index: 0, */ value: undefined } }
    ) as Custom
    //,/* {defaultProps:{

    //  value
    // }} */
  );
  const itemtagname = RandomDefineCustomElement(itemclass);
  const ITEMfactory = (value: ReactiveState<any>, index: number) =>
    createElement(itemclass, { value }, index);
  //   console.log(ITEMfactory);
  class ListMap extends AttrChange {
    // /* constructor() {
    //   super();
    //   /*    const defaultProps = get(this.constructor, "defaultProps");
    //   // this.constructor["defaultProps"];
    //   const attrs: Record<string, any> = createeleattragentreadwrite(this);
    //   //   const props = {};
    //   if (isobject(defaultProps)) {
    //     Object.assign(attrs, defaultProps);
    //     // Object.assign(props, this.constructor["defaultProps"]);
    //   } */
    // } */
    static defaultProps = { value: [] };
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
          set(this[listvalueattr], "value", value);
          //  [] = ;
          const domchildren = getdomchildren(this);
          const newlength = value.length;
          const oldlength = domchildren.length;
          if (newlength > oldlength) {
            const numindexs = Array(newlength)
              .fill(undefined)
              .map((v, i) => i)
              .slice(oldlength);

            const vdomstoadd: Virtualdom<
              Htmlelementconstructor
            >[] = numindexs.map(index => {
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
            const realelementstoadd: Element[] = vdomstoadd.map(vdom => {
              const index = Number(vdom.children[0]);
              //   const index = vdom.props.index;

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
      //   onunmounted(this);
      //   super.disconnectedCallback();
      disconnectedCallback(this);
      if (itemtagname) {
        querySelectorAll(itemtagname).forEach(e => removeNode(e));
      }
    }
    [firstinstalledcallback]() {
      const attrs = createeleattr(this);
      const value: any[] = attrs["value"];

      if (!isArray(value)) {
        console.log(value);
        throw new TypeError();
      }
      /* 挂载时同步一次 */
      // this[listvalueattr]["value"] = value;
      set(this[listvalueattr], "value", value);
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
    }
    async connectedCallback() {
      /*   if (!this[readysymbol]) {
        this[readysymbol] = true;

       
        // this[listlengthsymbol] = value.length;
      } */
      //   onmounted(this);
      connectedCallback(this);
    }
  }
  return createElement(ListMap, { value: list });
}
