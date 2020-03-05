import { createdeventname } from "./addlistener-mount-unmount-updated";
export function addcreatedlistner(ele: Element, call: () => void) {
    ele.addEventListener(createdeventname, call, { once: true });
}
