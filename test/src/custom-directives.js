const container = document.createElement("div");
import { Directives, MountElement, h } from "./mvvm-view";
// Directives("mounted", (call, ele, vdom, onmount, onunmount) => {
//     console.log([call, ele, vdom, onmount, onunmount]);
//     if (typeof call === "function") {
//         // @ts-ignore
//         onmount(call);
//     }
// });
// Directives("unmounted", (call, ele, vdom, onmount, onunmount) => {
//     console.log([call, ele, vdom, onmount, onunmount]);
//     if (typeof call === "function") {
//         // @ts-ignore
//         onunmount(call);
//     }
// });
let vdom = (
    <>
        <div
            $mounted={() => console.log("mounted")}
            $unmounted={() => console.log("unmounted")}
        >
            测试mounted,unmounted
        </div>
        <button
            $text="移除当前容器元素"
            onClick={() => {
                container.remove();
            }}
        />
    </>
);
document.body.appendChild(MountElement(vdom, container));
