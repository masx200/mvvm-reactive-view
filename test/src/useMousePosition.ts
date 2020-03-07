import {
    //   createElement,
    createState,
    useMounted,
    useUnMounted,
    StateType
} from "./mvvm-view";
// import type ReactiveState from "src/Reactivity/reactivestate";
// console.log([h, createElement]);
export function useMousePosition(): {
    x: StateType<number>;
    y: StateType<number>;
} {
    const x = createState(0);
    const y = createState(0);
    function update(e: MouseEvent) {
        x.value = e.pageX;
        y.value = e.pageY;
    }
    useMounted(() => {
        window.addEventListener("mousemove", update);
    });
    useUnMounted(() => {
        window.removeEventListener("mousemove", update);
    });
    return { x, y };
}
