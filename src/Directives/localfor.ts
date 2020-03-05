import Virtualdom from "src/CreateElement/VirtualElement";
import { isReactiveState } from "src/Reactivity/reactivestate";
import { isfunction, isarray } from "src/UtilTools/util";
import { computed } from "src/Reactivity/computed";
import { watch } from "src/Reactivity/watch";
import render from "src/RenderVirtual/render-vdom-to-real";

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
    if (!Array.isArray(value)) {
        throw TypeError();
    }
    const [list, fun] = value;
    if (!isReactiveState(list) || !isfunction(fun)) {
        throw TypeError();
    }

    vdom.children.length = 0;
    const changecallback = () => {
        const data = list.valueOf();
        if (!isarray(data)) {
            throw TypeError();
        }

        const childs = new Array(data.length).map((v, index) => {
            return Reflect.apply(fun, undefined, [
                computed(list, (arr) => arr[index]),
                index
            ]);
        });

        const nodes = render(childs);
        ele.childNodes.forEach((n) => {
            ele.removeChild(n);
        });
        nodes.forEach((n) => {
            ele.appendChild(n);
        });
    };

    console.log(value, ele, vdom, onmount, onunmount, onupdated);
    onmount(changecallback);
    watch(list, changecallback);
};