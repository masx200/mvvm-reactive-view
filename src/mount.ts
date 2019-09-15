import Reflect from "./reflect";
import { appendchild } from "./dom";
export default function(
  ele:
    | Array<
        | HTMLElement
        | Text
        | SVGSVGElement
        | DocumentFragment
        | SVGElement
        | Element
      >
    | SVGElement
    | DocumentFragment
    | HTMLElement
    | Text
    | SVGSVGElement
    | Element,
  container: HTMLElement | SVGSVGElement | SVGElement | Element
) {
  container.innerHTML = "";
  let eles: Array<any>;
  if (ele instanceof Array) {
    eles = ele;
  } else {
    // appendchild(container, ele);
    eles = [ele];
  }
  eles.forEach(e => appendchild(container, e));
}
