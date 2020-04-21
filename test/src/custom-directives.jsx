import { createRef, h, MountElement } from "./mvvm-view";
console.log(h);
const container = document.createElement("div");
const eleref = createRef();
let vdom = (<>
        <div $ref={eleref} $mounted={() => console.log("mounted")} $unmounted={() => console.log("unmounted")} $updated={() => console.log("updated")} $created={() => console.log("created")}>
            测试mounted,unmounted,updated,created
        </div>
        <button $text="更新当前元素" onclick={() => {
    eleref.value.appendChild(new Text(Math.random().toString()));
}}/>
        <button $text="移除当前容器元素" onClick={() => {
    container.remove();
}}/>
    </>);
MountElement(vdom, container);
document.body.appendChild(container);
const updatedeventname = Symbol("updated").toString();
document.body.addEventListener(updatedeventname, () => {
    console.log("body subtree updated");
});
//# sourceMappingURL=custom-directives.jsx.map