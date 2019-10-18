import {
  Switchable,
  createComponent,
  createState,
  render,
  h,
  watch
} from "./mvvm-view";
// import { watch } from "../../dist";
const com1 = createComponent(() => {
  return <h1>component 1</h1>;
});
const com2 = createComponent(() => {
  return <h1>component 2</h1>;
});
const com3 = createComponent(() => {
  return <h1>component 3</h1>;
});
const mystate = createState(com1);
const vdom = Switchable(mystate);
const element = render(vdom);
document.body.appendChild(element);
setTimeout(() => {
  mystate.value = com2;
  setTimeout(() => {
    mystate.value = com3;
  }, 2000);
}, 2000);
console.log([mystate, com1, com2, com3]);
watch(mystate, state => {
  console.log(state, element);
});
