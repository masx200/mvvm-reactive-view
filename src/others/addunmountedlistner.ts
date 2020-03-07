import { disconnectedeventname } from "./addlistener-mount-unmount-updated";
export function addunmountedlistner(ele: Element|Node, call: () => void) {
    ele.addEventListener(disconnectedeventname, call);
}
