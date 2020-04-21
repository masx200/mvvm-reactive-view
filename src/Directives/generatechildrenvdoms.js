import { isVirtualdom } from "src/CreateElement/VirtualElement";
import computed from "src/Reactivity/computed";
export function generatechildrenvdoms(liststate, fun) {
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
//# sourceMappingURL=generatechildrenvdoms.js.map
