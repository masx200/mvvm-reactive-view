/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    useUpdated,
    watch,
    computed,
    createComponent,
    createElement,
    //   createElement,
    createState,
    h,
    MountElement,
    useMounted,
    useUnMounted,
    render
} from "./mvvm-view";
console.log([h, createElement]);
function useMousePosition() {
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

const mycomapp = createComponent(() => {
    const { x, y } = useMousePosition();
    const plus = computed(x, (x) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return x + 100;
    });
    // other logic...

    const multi = computed([x, y], (x, y) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return x * y;
    });
    //   console.log(plus, multi);
    let count = 0;
    const cancelwatch = watch([x, y, multi, plus], (...args) => {
        if (count === 0) {
            console.time("watchmousemove50");
        }
        console.log(count, args);
        count++;
        if (count > 50) {
            cancelwatch();
            console.timeEnd("watchmousemove50");
        }
    });
    useUpdated(() => {
        if (count < 50) {
            console.log("鼠标组件更新");
        }
    });
    return (
        <div>
            <h3> 鼠标位置</h3>
            <h2>x:{x}</h2>

            <h1>y:{y}</h1>
            <p>x+100 是{plus}</p>
            <p>x*y 是{multi}</p>
        </div>
    );
});
mycomapp.css = `
*{font-size:80px !important;}
p{color:blue !important;}
`;
var vdom = createElement(mycomapp);
// MountElement(vdom, document.getElementById("root"));
const container = document.createElement("div");
document.body.appendChild(MountElement(vdom, container));
const removecom = () => (
    <button
        $text="移除当前容器元素"
        onClick={() => {
            container.remove();
        }}
    />
);
document.body.appendChild(render(h(removecom)));
