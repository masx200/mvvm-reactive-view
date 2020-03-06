import Virtualdom, { isVirtualdom } from "src/CreateElement/VirtualElement";
import computed from "src/Reactivity/computed";
import ReactiveState from "src/Reactivity/reactivestate";
export function generatechildrenvdoms(liststate: ReactiveState<Array<any>>, fun: (v: ReactiveState<any>, i: number) => Virtualdom<any>) {
    const data = liststate.valueOf();
    const childs = new Array(data.length).fill(undefined).map((v, index) => {
        const vdom = Reflect.apply(fun, undefined, [
            computed(liststate, (arr: any[]) => arr[index]),
            index
        ]);
        if (!isVirtualdom(vdom)) {
            throw new TypeError();
        }
        return vdom;
    });
    return childs;
}
