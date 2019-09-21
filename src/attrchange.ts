const attributeChangedCallback = "attributeChangedCallback";
import { isFunction } from "./util";
export class AttrChange extends HTMLElement {
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
    const oldValue = super.getAttribute(qualifiedName);
    super.setAttribute(qualifiedName, value);
    if (isFunction(this[attributeChangedCallback])) {
      this[attributeChangedCallback](qualifiedName, oldValue, value);
    }
  }
  removeAttribute(qualifiedName: string) {
    const oldValue = super.getAttribute(qualifiedName);
    super.removeAttribute(qualifiedName);
    if (isFunction(this[attributeChangedCallback])) {
      this[attributeChangedCallback](qualifiedName, oldValue, undefined);
    }
  }
}
