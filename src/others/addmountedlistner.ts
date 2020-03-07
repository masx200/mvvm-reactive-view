import { connectedeventname } from "./addlistener-mount-unmount-updated";
export function addmountedlistner(ele: Element|Node, call: () => void) {
    ele.addEventListener(connectedeventname, call);
}
