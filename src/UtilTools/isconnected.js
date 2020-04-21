import { isboolean } from "./util";
export function isconnected(element) {
    const isConnectedstate = element.isConnected;
    if (isboolean(isConnectedstate)) {
        return isConnectedstate;
    } else {
        return document.documentElement === getancestornode(element);
    }
}
function getancestornode(node) {
    while (node && node.parentNode && node.parentNode !== document) {
        node = node.parentNode;
    }
    return node;
}
//# sourceMappingURL=isconnected.js.map
