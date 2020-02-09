import { createState, watch } from "./mvvm-view";

const funstate = createState(() => {});
watch(funstate, fun => {
    console.log([funstate, fun]);
});
requestAnimationFrame(() => {
    setTimeout(() => {
        funstate.value = class extends HTMLElement {};
    }, 50);
});
console.dir(funstate);
