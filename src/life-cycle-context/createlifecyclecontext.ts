import { checkctxandcallbck } from "./checkctxandcallbck";

export function createlifecyclecontext() {
    let callbackset = new Set<() => void>();
    const getall = () => {
        return [...callbackset];
    };
    const clear = () => {
        callbackset = new Set();
    };
    const add = (fun: () => void) => {
        checkctxandcallbck(fun);
        callbackset.add(fun);
    };
    return { add, getall, clear };
}
