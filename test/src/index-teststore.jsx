import { createComponent, createElement, createState, h, MountElement, watch } from "./mvvm-view";
console.log(h);
const number = createState(10);
function increment() {
    number.value++;
}
function decrement() {
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
    watch(store.number, (number) => {
        console.log({ ...store }, number);
    });
    const vdom = (<div>
            <h3> 点击数字</h3>
            <h2>number:{store.number}</h2>

            <button onclick={store.increment}>increment</button>
            <button onclick={store.decrement}>decrement</button>
        </div>);
    return vdom;
});
let vdom = [
    createElement(mycomappclass),
    createElement(mycomappclass),
    createElement(mycomappclass)
];
const container = document.createElement("div");
MountElement(vdom, container);
document.body.appendChild(container);
setTimeout(() => {
    number.value = Math.round(Math.random() * 100);
}, 5000);
//# sourceMappingURL=index-teststore.jsx.map