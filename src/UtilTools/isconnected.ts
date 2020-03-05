import { isboolean } from "./util";

export function isconnected(element: Node) {
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
        node = node.parentNode;
    }
    return node;
}
