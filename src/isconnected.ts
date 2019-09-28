import { getparentNode } from "./dom";

export function isconnected(element: Node) {
  return document.documentElement === getancestornode(element);
}
function getancestornode(node: Node) {
  while (getparentNode(node) && getparentNode(node) !== document) {
    node = node.parentNode;
  }
  return node;
}
