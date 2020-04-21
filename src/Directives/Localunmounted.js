import { apply } from "../UtilTools/reflect";
export const Localunmounted = (call, ele, vdom, onmount, onunmount) => {
    console.log([call, ele, vdom, onmount, onunmount]);
    if (typeof call === "function") {
        apply(onunmount, undefined, [call]);
    } else {
        throw new TypeError();
    }
};
//# sourceMappingURL=Localunmounted.js.map
