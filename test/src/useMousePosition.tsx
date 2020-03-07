import {
    //   createElement,
    createState,
    useMounted,
    useUnMounted
} from "./mvvm-view";
// console.log([h, createElement]);
export function useMousePosition() {
    const x = createState(0);
    const y = createState(0);
    function update(e) {
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
