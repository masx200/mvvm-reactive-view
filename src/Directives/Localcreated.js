export const Localcreated = (
    call,
    ele,
    vdom,
    onmount,
    onunmount,
    onupdated
) => {
    console.log([call, ele, vdom, onmount, onunmount, onupdated]);
    if (typeof call === "function") {
        call();
    } else {
        throw new TypeError();
    }
};
//# sourceMappingURL=Localcreated.js.map
