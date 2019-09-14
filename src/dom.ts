export function appendchild(
  container: HTMLElement | SVGSVGElement | SVGElement | Element,
  ele: HTMLElement | SVGElement | Element
) {
  container.appendChild(ele);
}
export function createsvgelement() {
  return document.createElementNS(svgnamespace, "svg");
}
export function createnonescript() {
  return document.createDocumentFragment();
}
export function createnativeelement(type: string) {
  return document.createElement(type);
}
export function createElementNS(namespace: string, name: string) {
  return document.createElementNS(namespace, name);
}
export function createtextnode(data: string) {
  return document.createTextNode(data);
}
export const svgnamespace = "http://www.w3.org/2000/svg";