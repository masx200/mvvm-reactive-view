import { apply } from "../UtilTools/reflect";
import Virtualdom from 'src/CreateElement/VirtualElement';
export const Localunmounted = (
    call: unknown,
    ele: Element,
    vdom: Virtualdom<any>,
    onmount: (call: () => void) => void,
    onunmount: (call: () => void) => void
): void => {
    console.log([call, ele, vdom, onmount, onunmount]);
    if (typeof call === "function") {
        apply(onunmount, undefined, [call]);
    } else {
        throw new TypeError();
    }
};
