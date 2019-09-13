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
export function appendchild(
  container: HTMLElement | SVGSVGElement | SVGElement | Element,
  ele: HTMLElement | SVGElement | Element
) {
  container.appendChild(ele);
}
