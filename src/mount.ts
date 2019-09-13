export default function(
  ele:
     HTMLElement
    | Text
    | Array<HTMLElement | Text | SVGSVGElement>
    | SVGSVGElement,
  container: HTMLElement | SVGSVGElement
) {
  container.innerHTML = "";
  if (ele instanceof Array) {
    ele.forEach(e => appendchild(container,e));
  } else {
    appendchild(container,ele);
  }
}
function appendchild(container,ele){
container.appendChild(ele);
}
