import { Class, Custom } from "./customclass";
//import setlikearray from "./setlikearay";
// const customElementsarray = new Set;
import RandomDefineCustomElement, {
  invalid_custom_element_class
} from "./CustomElementRegistry";
import { construct } from "../UtilTools/reflect";
import { isclassextendsHTMLElement } from "./isclassextendsHTMLElement";
import { autocreateclass } from "src/AttributeClass/createComponent";
import { isfunction } from "src/UtilTools/util";

// import Reflect from "./reflect";

// import { Class } from "./rendervdomtoreal";

export function createcostumelemet(
  initclass: Class | Custom,
  propsjson?: object,
  children?: any[]
  //   options?: any
): HTMLElement {
  let type = initclass;
  if (isfunction(type)) {
    type = autocreateclass(type);
    // debugger;
  }
  initclass = type;
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
