import { isReactiveState } from "src/Reactivity/isReactiveState";
import watch from "src/Reactivity/watch";
import render from "src/RenderVirtual/render-vdom-to-real";
import { removeNode } from "src/UtilTools/dom";
import { isarray, isfunction } from "src/UtilTools/util";
import { generatechildrenvdoms } from "./generatechildrenvdoms";
import { getstatetype } from "src/Reactivity/getstatetype";
export const localfor = (value, ele, vdom, onmount, onunmount, onupdated) => {
    if (!Array.isArray(value)) {
        throw TypeError();
    }
    const [list, fun] = value;
    if (!isReactiveState(list) || !isfunction(fun)) {
        throw TypeError();
    }
    if (getstatetype(list) !== "Array") {
        throw new TypeError();
    }
    vdom.children.length = 0;
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
//# sourceMappingURL=localfor.js.map
