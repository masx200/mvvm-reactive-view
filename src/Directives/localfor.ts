import Virtualdom, { isVirtualdom } from "src/CreateElement/VirtualElement";
import { computed } from "src/Reactivity/computed";
import ReactiveState, { isReactiveState } from "src/Reactivity/reactivestate";
import { watch } from "src/Reactivity/watch";
import render from "src/RenderVirtual/render-vdom-to-real";
import { removeNode } from "src/UtilTools/dom";
import { isarray, isfunction } from "src/UtilTools/util";

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
    // const childs = generatechildrenvdoms(list, fun);
    // childs.forEach((vd) => {
    //     vdom.children.push(vd);
    // });
    const changecallback = () => {
        const data = list.valueOf();
        if (!isarray(data)) {
            throw TypeError();
        }
        const oldlength = ele.childNodes.length;
        const newlength = data.length;
        const minlength = Math.min(oldlength, newlength);

        if (newlength < oldlength) {
            ele.childNodes.forEach((n, i) => {
                if (i > minlength - 1) {
                    removeNode(n);
                }
            });
        } else if (newlength > oldlength) {
            const childs = generatechildrenvdoms(list, fun);

            const nodes = render(childs.slice(minlength));

            nodes.forEach((n, i) => {
                
                    ele.appendChild(n);
                
            });
        }
    };

    console.log(value, ele, vdom, onmount, onunmount, onupdated);
    onmount(changecallback);
    onmount(() => {
        const cancel = watch(list, changecallback);
        onunmount(cancel);
    });
};
function generatechildrenvdoms(
    liststate: ReactiveState<Array<any>>,
    fun: (v: ReactiveState<any>, i: number) => Virtualdom<any>
) {
    const data = liststate.valueOf();

    const childs = new Array(data.length).fill(undefined).map((v, index) => {
        const vdom = Reflect.apply(fun, undefined, [
            computed(liststate, (arr) => arr[index]),
            index
        ]);
        if (!isVirtualdom(vdom)) {
            throw new TypeError();
        }
        return vdom;
    });
    return childs;
}
