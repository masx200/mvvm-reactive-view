import { createState, watch } from "../../dist/index.min";

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
