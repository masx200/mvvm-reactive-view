import { updatedeventname } from "./mutationobserverwatch";
export function addupdatedlistner(ele, call) {
    ele.addEventListener(updatedeventname, call);
}
export function addstopupdatelistener(ele) {
    ele.addEventListener(updatedeventname, (e) => {
        if (e.target !== ele && ele.tagName.includes("-")) {
            e.stopPropagation();
        }
    });
}
//# sourceMappingURL=addupdatedlistner.js.map
