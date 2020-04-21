import { createComponent, createElement, createState, h, MountElement, render, useCreated, useMounted, useUnMounted, useUpdated, watch } from "./mvvm-view";
import mycss from "./test.css";
console.log(h);
var mycom = createComponent(Object.assign((props, children) => {
    const number = createState(1);
    useCreated(() => {
        console.log("life-cycle-created");
    });
    useUpdated(() => {
        console.log("life-cycle-updated");
    });
    useMounted(() => {
        console.log("life-cycle-mounted1");
    });
    useMounted(() => {
        console.log("mounted2", props);
    });
    useUnMounted(() => {
        console.log("life-cycle-unmounted");
    });
    watch(props.cccccc, (cccccc) => {
        console.log("cccccc", cccccc);
    });
    return (<div onclick={() => {
        number.value++;
    }}>
                    life-cycle-test
                    {[
        number,
        <br />,
        "wwwwwwwwwwww",
        createElement("div", ["createComponent"]),
        children,
        createElement("div", <>props cccccc {props.cccccc}</>)
    ]}
                </div>);
}, { defaultProps: { cccccc: "bbbbbbb" }, css: mycss }));
export const myclasscomponent = mycom;
let vdom = createElement(myclasscomponent, {
    aaaaaa: 222222222,
    tttttt: "dddddddddd"
}, "children");
console.log([vdom, myclasscomponent, mycom]);
const realele = render(vdom);
const container = document.createElement("div");
MountElement(realele, container);
document.body.appendChild(container);
setTimeout(() => {
    {
        let e = realele;
        e.setAttribute("cccccc", "aaaaaaaaaaaaaaaaaabbbbbbbbbbnnnnnnnnnnnnn");
    }
}, 5000);
//# sourceMappingURL=index3-life-cycle.jsx.map