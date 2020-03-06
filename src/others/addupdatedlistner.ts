import { updatedeventname } from "./addlistener-mount-unmount-updated";
export function addupdatedlistner(ele: Element, call: () => void) {
    ele.addEventListener(updatedeventname, call);
}
export function addstopupdatelistener(ele: Element) {
    ele.addEventListener(updatedeventname, (e) => {
        if (e.target !== ele && ele.tagName.includes("-")) {
            e.stopPropagation();
        }
    });
}
