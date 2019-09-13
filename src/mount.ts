export default function(
  ele:
    | HTMLElement
    | Text
    | Array<HTMLElement | Text | SVGSVGElement>
    | SVGSVGElement,
  container: HTMLElement | SVGSVGElement
) {
  container.innerHTML = "";
  if (ele instanceof Array) {
    ele.forEach(e => container.appendChild(e));
  } else {
    container.appendChild(ele);
  }
}
