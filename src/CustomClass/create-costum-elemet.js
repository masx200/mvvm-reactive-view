import RandomDefineCustomElement, {
    invalid_custom_element_class
} from "./CustomElementRegistry";
import { construct } from "../UtilTools/reflect";
import { isclassextendsHTMLElement } from "./isclassextendsHTMLElement";
import { autocreateclass } from "../AttributeClass/createComponent";
import { isfunction } from "../UtilTools/util";
export function createcostumelemet(initclass, propsjson, children) {
    let type = initclass;
    if (isfunction(type)) {
        type = autocreateclass(type);
    }
    initclass = type;
    if (isclassextendsHTMLElement(initclass)) {
        RandomDefineCustomElement(initclass);
        return construct(initclass, [propsjson, children]);
    } else {
        console.error(initclass);
        console.error(invalid_custom_element_class);
        throw TypeError();
    }
}
//# sourceMappingURL=create-costum-elemet.js.map
