import createeleattragentreadwrite from "@masx200/dom-element-attribute-agent-proxy";
import { getAttribute, removeAttribute, setAttribute } from "../UtilTools/dom";
import { get } from "../UtilTools/reflect";
import { isFunction, isobject, isfunction } from "../UtilTools/util";
import { readysymbol } from "./readysymbol";
import {
  onunmounted,
  onmounted
} from "../mounted-unmounted/element-onmount-unmount";
import { setimmediate } from "src/UtilTools/setimmediate";
export const attributeChangedCallback = Symbol("attributeChanged");
export const firstinstalledcallback = Symbol("firstinstalled");
/* 

 super.disconnectedCallback();

 被babel转换之后这句就没了?

  connectedCallback() {
            //    return _asyncToGenerator((function*() {}
                ))();
            }
            disconnectedCallback() {
               // return _asyncToGenerator((function*() {}
                ))();
            }
*/
export function connectedCallback(componentelement: HTMLElement) {
  AttrChange.prototype.connectedCallback.call(componentelement);
}

export function disconnectedCallback(componentelement: HTMLElement) {
  AttrChange.prototype.disconnectedCallback.call(componentelement);
}
export class AttrChange extends HTMLElement {
  //   abstract [firstinstalledcallback]();
  disconnectedCallback() {
    setimmediate(() => {
      onunmounted(this);
    });
  }
  connectedCallback() {
    setimmediate(() => {
      if (!this[readysymbol]) {
        this[readysymbol] = true;
        const callback = get(this, firstinstalledcallback);
        if (isfunction(callback)) {
          // get(this,firstinstalledcallback)
          setimmediate(() => {
            callback.call(this);
          });
        }
      }
      onmounted(this);
    });

    // onmounted(this);
  }
  [readysymbol] = false;
  // [attributessymbol]: Record<string, ReactiveState<any>>;
  constructor() {
    super();
    const defaultProps = get(this.constructor, "defaultProps");
    // this.constructor["defaultProps"];
    const attrs: Record<string, any> = createeleattragentreadwrite(this);
    //   const props = {};
    if (isobject(defaultProps)) {
      /*     if (!this[attributessymbol]) {
        this[attributessymbol] = {};
      } */
      Object.assign(attrs, defaultProps);
      // Object.assign(props, this.constructor["defaultProps"]);
    }
  }
  //   [attributeChangedCallback](name?: string): void;
  // prototype!: HTMLElement;
  /*  defaultProps?: { [key: string]: any } | undefined;
  css?: string | undefined; */
  /* constructor() {
    super();
  } */

  /* 跟seteletext发生冲突,清空children */
  //   get textContent() {
  //     return String(super.textContent || "");
  //   }
  //   set textContent(_a: string) {
  //     console.trace();
  //     // return;
  //   }
  //   get innerHTML() {
  //     return super.innerHTML;
  //   }
  //   set innerHTML(_a: string) {
  //     // return;
  //   }
  //   get innerText() {
  //     return super.innerText;
  //   }
  //   set innerText(_a: string) {
  //     // return;
  //   }
  // [attributeChangedCallback](
  //   name: string

  /* _name?: any, _oldValue?: any, _newValue?: any */
  // ) {
  //   noop(name);
  //
  //  }
  /* constructor() {
    super();
  } */

  //禁止设置innerhtml，innertext，textcontent
  /* disconnectedCallback() {
  console.log('Custom square element removed from page.');
} */
  /* connectedCallback() {
  console.log('Custom square element added to page.');
  updateStyle(this);
} */
  //
  //   connectedCallback(){}
  /* attributeChangedCallback(name, oldValue, newValue) {
  console.log('Custom square element attributes changed.');
  updateStyle(this);
} */
  setAttribute(qualifiedName: string, value: string) {
    const callback = get(this, attributeChangedCallback);
    const oldValue = getAttribute(this, qualifiedName);
    // super.getAttribute(qualifiedName);

    if (oldValue !== value) {
      setAttribute(this, qualifiedName, value);
      //   super.setAttribute(qualifiedName, value);
      if (
        isFunction(
          callback
          // this[attributeChangedCallback]
        )
      ) {
        // setimmediate(() => {
        callback.call(this, qualifiedName, oldValue, value);
        // });
      }
    }
  }
  removeAttribute(qualifiedName: string) {
    const callback = get(this, attributeChangedCallback);
    const oldValue = getAttribute(this, qualifiedName);

    if (null !== oldValue) {
      //   super.removeAttribute(qualifiedName);
      removeAttribute(this, qualifiedName);
      if (isFunction(callback)) {
        // setimmediate(() => {
        callback.call(this, qualifiedName, oldValue, undefined);
        // });
      }
    }
  }
}
