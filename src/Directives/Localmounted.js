import { apply } from "../UtilTools/reflect";
export const Localmounted = (call, ele, vdom, onmount, onunmount) => {
    console.log([call, ele, vdom, onmount, onunmount]);
    if (typeof call === "function") {
        apply(onmount, undefined, [call]);
    } else {
        throw new TypeError();
    }
};
//# sourceMappingURL=Localmounted.js.map
