/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createComponent,
  createElement,
  //   createElement,
  createState,
  h,
  MountElement,
  watch
} from "../../dist/index.js";
console.log([h, createElement]);
const number = createState(10);
function increment() {
  // @ts-ignore
  number.value++;
}
function decrement() {
  // @ts-ignore
  number.value--;
}
const store = { number, increment, decrement };
let timer = setInterval(() => {
  increment();
}, 2000);
setTimeout(() => {
  clearInterval(timer);
}, 8000);
const mycomappclass = createComponent(() => {
  watch(store.number, number => {
    // console.trace();
    console.log({ ...store }, number);
  });
  const vdom = (
    <div>
      <h3> 点击数字</h3>
      <h2>number:{store.number}</h2>

      <button onclick={store.increment}>increment</button>
      <button onclick={store.decrement}>decrement</button>
    </div>
  );
  return vdom;
});
const vdom = [
  createElement(mycomappclass),
  createElement(mycomappclass),
  createElement(mycomappclass)
];

document.body.appendChild(MountElement(vdom, document.createElement("div")));

setTimeout(() => {
  vdom.forEach(vdom => {
    const element = vdom.element;
    element.parentNode.removeChild(element);
  });
  // @ts-ignore
  number.value = -50;

  vdom.forEach(vdom => {
    const element = vdom.element;
    document.body.appendChild(element);
  });
}, 5000);
