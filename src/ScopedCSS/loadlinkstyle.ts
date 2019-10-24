import { appendchild } from "src/UtilTools/dom";

export function loadlinkstyle(
  stylelinkelement: HTMLElement,
  container: HTMLElement | Element | SVGSVGElement | SVGElement
): Promise<void> {
  return new Promise(rs => {
    const loaderrorfun = () => {
      stylelinkelement.onload = stylelinkelement.onerror = null;
      rs();
      //   console.log(stylelinkelement.href);
    };
    stylelinkelement.onload = loaderrorfun;
    stylelinkelement.onerror = loaderrorfun;
    appendchild(container, stylelinkelement);
  });
}
