import { appendchild, setelehtml } from "./dom";
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
        | any
      >
    | SVGElement
    | DocumentFragment
    | HTMLElement
    | Text
    | SVGSVGElement
    | Element,
  container: HTMLElement | SVGSVGElement | SVGElement | Element
) {
  setelehtml(container, "");
  //   container.innerHTML = "";
  let eles: Array<any>;
  if (Array.isArray(ele)) {
    eles = ele;
  } else {
    // appendchild(container, ele);
    eles = [ele];
  }
  eles.forEach(e => appendchild(container, e));
  return container;
}
