import { appendchild } from "../UtilTools/dom";
export function loadlinkstyle(stylelinkelement, container) {
    return new Promise((rs) => {
        const loaderrorfun = () => {
            stylelinkelement.onload = stylelinkelement.onerror = null;
            rs();
        };
        stylelinkelement.onload = loaderrorfun;
        stylelinkelement.onerror = loaderrorfun;
        appendchild(container, stylelinkelement);
    });
}
//# sourceMappingURL=loadlinkstyle.js.map
