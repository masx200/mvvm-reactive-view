import { Class } from "./customclass";
//import setlikearray from "./setlikearay";
// const customElementsarray = new Set;
import RandomDefineCustomElement, {
  invalid_custom_element_class
} from "./CustomElementRegistry";
import { construct } from "../UtilTools/reflect";
import { isclassextendsHTMLElement } from "./isclassextendsHTMLElement";

// import Reflect from "./reflect";

// import { Class } from "./rendervdomtoreal";

export function createcostumelemet(
  initclass: Class | Function,
  propsjson?: object,
  children?: any[]
  //   options?: any
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
    return construct(initclass, [propsjson, children /* , options */]); // (children);
  } else {
    console.error(initclass);
    console.error(invalid_custom_element_class);
    throw TypeError();
  }
}
