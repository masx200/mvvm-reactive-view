import { connectedeventname } from "./mutationobserverwatch";
export function addmountedlistner(ele: Element | Node, call: () => void) {
    ele.addEventListener(connectedeventname, call);
}
