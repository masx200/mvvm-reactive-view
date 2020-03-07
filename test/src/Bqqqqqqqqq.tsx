import { createElement, h, MountElement } from "./mvvm-view.ts";
class Bqqqqqqqqq extends HTMLElement {}
class Aqqqqqqqqq extends HTMLElement {}
console.log(customElements, [...customElements]);
customElements.define("qqqqqqqqqq-----a", Bqqqqqqqqq);
customElements.define("qqqqqqqqqq-----a", Aqqqqqqqqq);
document.body.appendChild(
    MountElement(
        [h(Bqqqqqqqqq), createElement(Aqqqqqqqqq)],
        document.createElement("div")
    )
);
