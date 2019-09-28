const document = window.document;
//import { seteletext, setelehtml } from "./directives";
//export { seteletext, setelehtml };

export function seteletext(e: Element | Node, v: string) {
  e.textContent = v;
}
export function setelehtml(e: Element, v: string) {
  e.innerHTML = v;
}
export function appendchild(
  container: HTMLElement | SVGSVGElement | SVGElement | Element | Node,
  ele: HTMLElement | SVGElement | Element | Node
) {
  container.appendChild(ele);
}
export function createsvgelement() {
  return createElementNS(svgnamespace, "svg");
}
export function createnonescript() {
  return createDocumentFragment();
}
export function createDocumentFragment() {
  return document.createDocumentFragment();
}
export function createnativeelement(type: string) {
  return document.createElement(type);
}
export function createElementNS(namespace: string, name: string) {
  return document.createElementNS(namespace, name);
}
export function createtextnode(data: string | number) {
  return document.createTextNode(String(data));
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
export function createComment() {
  return document.createComment("");
}
export function removeNode(node: Element) {
  let parentNode = node.parentNode;
  if (parentNode) {
    parentNode.removeChild(node);
  }
}
export function replaceChild(newChild: Node, oldChild: Node) {
  let parentNode = oldChild.parentNode;
  if (parentNode) {
    parentNode.replaceChild(newChild, oldChild);
  }
}

export function domaddlisten(
  ele: Element | Node,
  event: string,
  call: EventListener
) {
  ele.addEventListener(event, call);
}

export function domremovelisten(
  ele: Element | Node,
  event: string,
  call: EventListener
) {
  ele.removeEventListener(event, call);
}
export function getdomchildren(ele: Element | Node) {
  return Array.from(ele.childNodes);
}
export function getAttribute(ele: Element, name: string) {
  return HTMLElementprototype.getAttribute.call(ele, name);
}
export function setAttribute(ele: Element, name: string, value: any) {
  HTMLElementprototype.setAttribute.call(ele, name, value);
}
export function removeAttribute(ele: Element, name: string) {
  HTMLElementprototype.removeAttribute.call(ele, name);
}
const HTMLElementprototype = HTMLElement.prototype;

export function insertfirst(
  container: HTMLElement | Element,
  ele: HTMLElement
) {
  container.insertBefore(ele, container.firstChild);
}
export function createanotherhtmldocument() {
  return document.implementation.createHTMLDocument("");
}
