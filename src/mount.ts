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
): void {
  container.innerHTML = "";
  let eles: Array<any>;
  if (Array.isArray(ele)) {
    eles = ele;
  } else {
    // appendchild(container, ele);
    eles = [ele];
  }
  eles.forEach(e => appendchild(container, e));
}
