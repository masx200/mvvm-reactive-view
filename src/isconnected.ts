export function isconnected(element: Node) {
  return document.documentElement === getancestornode(element);
}
function getancestornode(node: Node) {
  while (node.parentNode && node.parentNode !== document) {
    node = node.parentNode;
  }
  return node;
}
