import { getAttribute, removeAttribute, setAttribute } from "./dom";
import { get } from "./reflect";
import { isFunction } from "./util";
export const attributeChangedCallback = "attributeChangedCallback";
export class AttrChange extends HTMLElement {
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
