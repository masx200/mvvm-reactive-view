import { appendchild } from "../UtilTools/dom";

export function loadlinkstyle(
    stylelinkelement: HTMLElement,
    container: HTMLElement | Element | SVGSVGElement | SVGElement
): Promise<void> {
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
