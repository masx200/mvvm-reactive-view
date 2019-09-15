import Reflect from "./reflect";
import { isfunction } from "./util";
import { Class } from "./rendervdomtoreal";
import setlikearray from "./setlikearay";
const customElementsarray = new setlikearray();
export function createcostumelemet(
  initclass: Class | Function,

  children?: any[]
): HTMLElement {
  if (isclassextendsHTMLElement(initclass)) {
    customElementsarray.push(initclass);
    const elementname = getcustomelementname(initclass);
    if (customElements.get(elementname) === initclass) {
    } else {
      customElements.define(elementname, initclass);
    }

    return Reflect.construct(initclass, [children]); // (children);
  } else {
    throw TypeError("invalid custom element class !");
  }
}
function getcustomelementname(initclass: any) {
  return "c-" + customElementsarray.indexOf(initclass);
}
export function isclassextendsHTMLElement(initclass: { prototype: any }) {
  return !!(
    isfunction(initclass) &&
    initclass.prototype &&
    initclass.prototype instanceof HTMLElement
  );
}
