import { getAttribute, setAttribute, removeAttribute } from "./dom";
const attributeChangedCallback = "attributeChangedCallback";
import { isFunction } from "./util";
export class AttrChange extends HTMLElement {
set textContent(){}
set innerHTML(){}
set innerText(){}
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
    const oldValue = getAttribute(this, qualifiedName);
    // super.getAttribute(qualifiedName);

    if (oldValue !== value) {
      setAttribute(this, qualifiedName, value);
      //   super.setAttribute(qualifiedName, value);
      if (isFunction(this[attributeChangedCallback])) {
        this[attributeChangedCallback](qualifiedName, oldValue, value);
      }
    }
  }
  removeAttribute(qualifiedName: string) {
    const oldValue = getAttribute(this, qualifiedName);

    if (null !== oldValue) {
      //   super.removeAttribute(qualifiedName);
      removeAttribute(this, qualifiedName);
      if (isFunction(this[attributeChangedCallback])) {
        this[attributeChangedCallback](qualifiedName, oldValue, undefined);
      }
    }
  }
}
