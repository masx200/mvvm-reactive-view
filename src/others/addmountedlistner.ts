import { connectedeventname } from "./addlistener-mount-unmount-updated";
export function addmountedlistner(ele: Element, call: () => void) {
    ele.addEventListener(connectedeventname, call);
}
