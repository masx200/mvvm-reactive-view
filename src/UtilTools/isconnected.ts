// import { getparentNode } from "./dom";

export function isconnected(element: Node) {
  return document.documentElement === getancestornode(element);
}
function getancestornode(node: Node) {
  while (
    node &&
    node.parentNode &&
    node.parentNode !== document
    /*  getparentNode(node) &&
    getparentNode(node) !== node &&
    getparentNode(node) !== document */
  ) {
    //   if(getparentNode(node)){}
    node = node.parentNode; // getparentNode(node);
  }
  return node;
}
