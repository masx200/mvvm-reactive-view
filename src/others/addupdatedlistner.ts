import { updatedeventname } from './addlistener-mount-unmount-updated';
export function addupdatedlistner(ele: Element, call: () => void) {
    ele.addEventListener(updatedeventname, call);
}
