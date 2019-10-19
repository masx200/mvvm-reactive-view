import { isboolean } from "./util";

// import { getparentNode } from "./dom";

export function isconnected(element: Node) {
  /* 除了edge浏览器不支持  element.isConnected属性之外,其他现代浏览器都支持了*/
  const isConnectedstate = element.isConnected;
  if (isboolean(isConnectedstate)) {
    return isConnectedstate;
  } else {
    return document.documentElement === getancestornode(element);
  }
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
