import setlikearray from "./setlikearay";
const customElementsarray = new setlikearray();
function getcustomelementname(initclass: any): string {
  return "c-" + customElementsarray.indexOf(initclass);
}
import { isfunction } from "./util";
export function isclassextendsHTMLElement(initclass: {
  prototype: any;
}): boolean {
  return !!(
    isfunction(initclass) &&
    initclass.prototype &&
    initclass.prototype instanceof HTMLElement
  );
}

import { construct } from "./reflect";
// import Reflect from "./reflect";

import { Class } from "./rendervdomtoreal";

export function createcostumelemet(
  initclass: Class | Function,
  propsjson?: object,
  children?: any[]
): HTMLElement {
  if (isclassextendsHTMLElement(initclass)) {
    customElementsarray.push(initclass);
    const elementname = getcustomelementname(initclass);
    if (customElements.get(elementname) === initclass) {
    } else {
      customElements.define(elementname, initclass);
    }

    return construct(initclass, [propsjson, children]); // (children);
  } else {
    throw TypeError("invalid custom element class !");
  }
}
