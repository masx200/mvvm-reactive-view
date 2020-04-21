import { isfunction } from "../UtilTools/util";
export function isclassextendsHTMLElement(initclass) {
    return !!(
        isfunction(initclass) &&
        initclass.prototype &&
        initclass.prototype instanceof HTMLElement
    );
}
//# sourceMappingURL=isclassextendsHTMLElement.js.map
