import { appendchild, /* setelehtml,  */ seteletext } from "./UtilTools/dom";
import { toArray } from "./UtilTools/toArray";
export default function<
  T extends HTMLElement | SVGSVGElement | SVGElement | Element | Node
>(
  ele:
    | Node
    | Array<
        | HTMLElement
        | Text
        | SVGSVGElement
        | DocumentFragment
        | SVGElement
        | Element
        | Node
      >
    | SVGElement
    | DocumentFragment
    | HTMLElement
    | Text
    | SVGSVGElement
    | Element,
  container: T,
  clear: boolean = true
): T {
  if (clear) {
    seteletext(container, "");
  }
  //   container.innerHTML = "";
  /*  let eles: Array<any>;
  if (Array.isArray(ele)) {
    eles = ele;
  } else {
    // appendchild(container, ele);
    eles = [ele];
  } */
  const eles = toArray(ele).flat(Infinity);
  eles.forEach((e: Node | HTMLElement | Element | SVGElement) =>
    appendchild(container, e)
  );
  return container;
}
import mountrealelement from "./mount-real-element";
export { mountrealelement };
