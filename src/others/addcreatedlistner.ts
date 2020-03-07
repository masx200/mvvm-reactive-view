import { createdeventname } from "./mutationobserverwatch";
export function addcreatedlistner(ele: Element, call: () => void) {
    ele.addEventListener(createdeventname, call, { once: true });
}
