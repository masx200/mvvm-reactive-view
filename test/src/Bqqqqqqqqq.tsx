import { createElement, h, MountElement } from "./mvvm-view";
class Bqqqqqqqqq extends HTMLElement {}
class Aqqqqqqqqq extends HTMLElement {}
console.log(
    customElements,
    Reflect.apply(Object.fromEntries, undefined, [customElements])
);
customElements.define("qqqqqqqqqq-----a", Bqqqqqqqqq);
customElements.define("qqqqqqqqqq-----a", Aqqqqqqqqq);
document.body.appendChild(
    MountElement(
        [h(Bqqqqqqqqq), createElement(Aqqqqqqqqq)],
        document.createElement("div")
    )
);
