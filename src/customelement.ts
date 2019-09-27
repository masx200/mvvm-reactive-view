import { invalid_custom_element_class } from "./CustomElementRegistry";

//import setlikearray from "./setlikearay";

// const customElementsarray = new Set;
import RandomDefineCustomElement from "./CustomElementRegistry";
/* function getcustomelementname(initclass: any): string {
  return customElements(initclass);
} */
import { isfunction } from "./util";
export function isclassextendsHTMLElement(initclass: {
  prototype: any;
}): initclass is Class {
  return !!(
    isfunction(initclass) &&
    initclass.prototype &&
    initclass.prototype instanceof HTMLElement
  );
}

import { construct } from "./reflect";
import { Class } from "./customclass";
// import Reflect from "./reflect";

// import { Class } from "./rendervdomtoreal";

export function createcostumelemet(
  initclass: Class | Function,
  propsjson?: object,
  children?: any[],
  options?: any
): HTMLElement {
  if (isclassextendsHTMLElement(initclass)) {
    // customElementsarray.push(initclass);
    /*   const elementname =
     getcustomelementname(initclass); */
    /* if (customElements.get(elementname) === initclass) {
    } else {
      customElements.define(elementname, initclass);
    } */
    RandomDefineCustomElement(initclass);
    return construct(initclass, [propsjson, children, options]); // (children);
  } else {
    console.error(initclass);

    throw TypeError(invalid_custom_element_class);
  }
}
