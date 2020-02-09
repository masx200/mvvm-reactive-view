import { Htmlelementconstructor, Custom } from "./customclass";

import RandomDefineCustomElement, {
    invalid_custom_element_class
} from "./CustomElementRegistry";
import { construct } from "../UtilTools/reflect";
import { isclassextendsHTMLElement } from "./isclassextendsHTMLElement";
import { autocreateclass } from "../AttributeClass/createComponent";
import { isfunction } from "../UtilTools/util";

export function createcostumelemet(
    initclass: Htmlelementconstructor | Custom,
    propsjson?: object,
    children?: any[]
): HTMLElement {
    let type = initclass;
    if (isfunction(type)) {
        type = autocreateclass(type);
    }
    initclass = type;
    if (isclassextendsHTMLElement(initclass)) {
        /*   const elementname =
     getcustomelementname(initclass); */
        /* if (customElements.get(elementname) === initclass) {
    } else {
      customElements.define(elementname, initclass);
    } */
        RandomDefineCustomElement(initclass);
        return construct(initclass, [propsjson, children /* , options */]);
    } else {
        console.error(initclass);
        console.error(invalid_custom_element_class);
        throw TypeError();
    }
}
