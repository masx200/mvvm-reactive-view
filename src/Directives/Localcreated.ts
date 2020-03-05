import Virtualdom from "src/CreateElement/VirtualElement";

export const Localcreated = (
    call: unknown,
    ele: Element,
    vdom: Virtualdom<any>,
    onmount: (call: () => void) => void,
    onunmount: (call: () => void) => void,
    onupdated: (call: () => void) => void
): void => {
    console.log([call, ele, vdom, onmount, onunmount, onupdated]);
    if (typeof call === "function") {
        call();
    } else {
        throw new TypeError();
    }
};
