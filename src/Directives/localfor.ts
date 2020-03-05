import Virtualdom from "src/CreateElement/VirtualElement";
/* interface attrfor<T> extends Array<any> {
    0: ReactiveState<Array<T>>;
    1: (v: ReactiveState<T>, i: number) => Virtualdom<any>;
} */
export const localfor = (
    value: unknown,
    ele: Element,
    vdom: Virtualdom<any>,
    onmount: (call: () => void) => void,
    onunmount: (call: () => void) => void,
    onupdated: (call: () => void) => void
) => {
    console.log(value, ele, vdom, onmount, onunmount, onupdated);
};
