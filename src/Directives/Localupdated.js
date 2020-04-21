import { apply } from "../UtilTools/reflect";
export const Localupdated = (
    call,
    ele,
    vdom,
    onmount,
    onunmount,
    onupdated
) => {
    console.log([call, ele, vdom, onmount, onunmount]);
    if (typeof call === "function") {
        apply(onupdated, undefined, [call]);
    } else {
        throw new TypeError();
    }
};
//# sourceMappingURL=Localupdated.js.map
