import { appendchild, /* setelehtml,  */ seteletext } from "./dom";
import { toArray } from "./toArray";
export default function(
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
  container: HTMLElement | SVGSVGElement | SVGElement | Element | Node
) {
  seteletext(container, "");
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
