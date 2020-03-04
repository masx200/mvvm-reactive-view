const container = document.createElement("div");
import { Directives, MountElement, h, createRef } from "./mvvm-view";
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
const eleref = createRef();
let vdom = (
    <>
        <div
            $ref={eleref}
            $mounted={() => console.log("mounted")}
            $unmounted={() => console.log("unmounted")}
            $updated={() => console.log("updated")}
            $created={() => console.log("created")}
        >
            测试mounted,unmounted,updated,created
        </div>
        <button
            $text="更新当前元素"
            onclick={() => {
                eleref.value.appendChild(new Text(Math.random().toString()));
            }}
        />
        <button
            $text="移除当前容器元素"
            onClick={() => {
                container.remove();
            }}
        />
    </>
);
document.body.appendChild(MountElement(vdom, container));
