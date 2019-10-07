import { getAttribute, removeAttribute, setAttribute } from "./dom";
import { isFunction } from "./util";
import { get } from "./reflect";
const attributeChangedCallback = "attributeChangedCallback";
export class AttrChange extends HTMLElement {
  constructor() {
    super();
  }
  set textContent(a: string) {
    return;
  }
  set innerHTML(a: string) {
    return;
  }
  set innerText(a: string) {
    return;
  }
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
        callback.call(this, qualifiedName, oldValue, value);
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
        callback.call(this, qualifiedName, oldValue, undefined);
      }
    }
  }
}
