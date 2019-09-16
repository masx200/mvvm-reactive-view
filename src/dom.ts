const document = window.document;
//import { seteletext, setelehtml } from "./directives";
//export { seteletext, setelehtml };

export function seteletext(e: Element, v: string) {
  e.textContent = v;
}
export function setelehtml(e: Element, v: string) {
  e.innerHTML = v;
}
export function appendchild(
  container: HTMLElement | SVGSVGElement | SVGElement | Element,
  ele: HTMLElement | SVGElement | Element
) {
  container.appendChild(ele);
}
export function createsvgelement() {
  return createElementNS(svgnamespace, "svg");
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
export function changetext(textnode: Text, value: string) {
  textnode.nodeValue = String(value);
}
export default document;

export const mathnamespace = "http://www.w3.org/1998/Math/MathML";

export function createmathelement() {
  return createElementNS(mathnamespace, "math");
}
