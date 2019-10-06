import {
  computed,
  condition,
  Fragment,
  createRef,
  html,
  MountElement,
  h,
  createElement,
  createState,
  watch,
  createComponent,
  useMounted,
  useUnMounted
} from "../dist/index.js";
const number = createState(10);
function increment() {
  number.value++;
}
function decrement() {
  number.value--;
}
const store = { number, increment, decrement };

const mycomappclass = createComponent(() => {
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
