export function seteletext(e, v) {
    e.textContent = v;
}
export function setelehtml(e, v) {
    e.innerHTML = v;
}
export function appendchild(container, ele) {
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
export function createnativeelement(type) {
    return document.createElement(type);
}
export function createElementNS(namespace, name) {
    return document.createElementNS(namespace, name);
}
export function createtextnode(data) {
    return document.createTextNode(String(data));
}
export const svgnamespace = "http://www.w3.org/2000/svg";
export function changetext(textnode, value) {
    textnode.nodeValue = String(value);
}
export const mathnamespace = "http://www.w3.org/1998/Math/MathML";
export function createmathelement() {
    return createElementNS(mathnamespace, "math");
}
export function createComment() {
    return document.createComment("");
}
export function removeElement(element) {
    element.remove();
}
export function removeNode(node) {
    let parentNode = node.parentNode;
    if (parentNode) {
        parentNode.removeChild(node);
    }
}
export function replaceChild(newChild, oldChild) {
    let parentNode = oldChild.parentNode;
    if (parentNode) {
        parentNode.replaceChild(newChild, oldChild);
    }
}
export function domaddlisten(ele, event, call) {
    ele.addEventListener(event, call);
}
export function domremovelisten(ele, event, call) {
    ele.removeEventListener(event, call);
}
export function getchildren(ele) {
    return [...ele.children];
}
export function getchildNodes(ele) {
    return [...ele.childNodes];
}
export function getAttribute(ele, name) {
    return HTMLElementprototype.getAttribute.call(ele, name);
}
export function setAttribute(ele, name, value) {
    HTMLElementprototype.setAttribute.call(ele, name, value);
}
export function removeAttribute(ele, name) {
    HTMLElementprototype.removeAttribute.call(ele, name);
}
const HTMLElementprototype = HTMLElement.prototype;
export function insertfirst(container, ele) {
    container.insertBefore(ele, container.firstChild);
}
export function createanotherhtmldocument() {
    return document.implementation.createHTMLDocument("");
}
export function querySelectorAll(selector) {
    return [...document.querySelectorAll(selector)];
}
//# sourceMappingURL=dom.js.map
