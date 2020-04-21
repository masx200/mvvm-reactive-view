import { computed, createComponent, createElement, h, MountElement, render, useUpdated, watch } from "./mvvm-view";
import { useMousePosition } from "./useMousePosition";
console.log(h);
const mycomapp = createComponent(() => {
    const { x, y } = useMousePosition();
    const plus = computed(x, (x) => {
        return x + 100;
    });
    const multi = computed([x, y], (x, y) => {
        return x * y;
    });
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
    return (<div>
            <h3> 鼠标位置</h3>
            <h2>x:{x}</h2>

            <h1>y:{y}</h1>
            <p>x+100 是{plus}</p>
            <p>x*y 是{multi}</p>
        </div>);
});
mycomapp.css = `
*{font-size:80px !important;}
p{color:blue !important;}
`;
var vdom = createElement(mycomapp);
export const container = document.createElement("div");
MountElement(vdom, container);
document.body.appendChild(container);
const removecom = () => (<button $text="移除鼠标组件当前容器元素" onClick={() => {
    container.remove();
}}/>);
document.body.appendChild(render(h(removecom)));
//# sourceMappingURL=index-compositionapi.jsx.map