import { checkctxandcallbck } from "./checkctxandcallbck";
export function createlifecyclecontext() {
    let callbackset = new Set();
    const getall = () => {
        return [...callbackset];
    };
    const clear = () => {
        callbackset = new Set();
    };
    const add = (fun) => {
        checkctxandcallbck(fun);
        callbackset.add(fun);
    };
    return { add, getall, clear };
}
//# sourceMappingURL=createlifecyclecontext.js.map
