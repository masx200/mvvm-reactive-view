import { disconnectedeventname } from "./mutationobserverwatch";
export function addunmountedlistner(ele: Element | Node, call: () => void) {
    ele.addEventListener(disconnectedeventname, call);
}
