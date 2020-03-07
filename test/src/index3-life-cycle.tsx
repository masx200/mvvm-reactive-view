/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    createComponent,
    createElement,
    //   createElement,
    createState,
    h,
    MountElement,
    render,
    useCreated,
    useMounted,
    useUnMounted,
    useUpdated,
    watch
} from "./mvvm-view";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mycss from "./test.css";
import ReactiveState from "src/Reactivity/reactivestate";
import { Vdomchildren } from "src/CreateElement/VirtualElement";
// console.log([h, createElement]);

var mycom = createComponent(
    Object.assign(
        (
            props: Record<string, ReactiveState<string>>,
            children: Vdomchildren
        ) => {
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
            return (
                <div
                    onclick={() => {
                        // @ts-ignore
                        number.value++;
                    }}
                >
                    life-cycle-test
                    {[
                        number,
                        <br />,
                        "wwwwwwwwwwww",
                        createElement("div", ["createComponent"]),
                        children,
                        createElement("div", <>props cccccc {props.cccccc}</>)
                    ]}
                </div>
            );
        },
        { defaultProps: { cccccc: "bbbbbbb" }, css: mycss }
    )
);
//   /* mycom.defaultProps = { cccccc: "bbbbbbb" };
//   mycom.css = mycss; /* css``; */ */
export const myclasscomponent = mycom;
let vdom = createElement(
    myclasscomponent,
    {
        aaaaaa: 222222222,
        tttttt: "dddddddddd"
    },
    "children"
);
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
