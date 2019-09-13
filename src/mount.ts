export default function(
  ele:
    | SVGElement
    | DocumentFragment
    | HTMLElement
    | Text
    | Array<HTMLElement | Text | SVGSVGElement | DocumentFragment | SVGElement>
    | SVGSVGElement,
  container: HTMLElement | SVGSVGElement
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
  container: HTMLElement | SVGSVGElement,
  ele: HTMLElement | SVGElement
) {
  container.appendChild(ele);
}
