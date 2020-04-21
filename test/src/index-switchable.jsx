import { createComponent, createState, h, render, Switchable, watch } from "./mvvm-view";
console.log(h);
const com1 = createComponent(() => {
    return <h1>component 1</h1>;
});
const com2 = createComponent(() => {
    return <h1>component 2</h1>;
});
const com3 = createComponent(() => {
    return <h1>component 3</h1>;
});
const com4 = createComponent(() => {
    return <h1>component 4</h1>;
});
const mystate = createState(com1);
const vdom = Switchable(mystate);
const element = render(vdom);
document.body.appendChild(element);
setTimeout(() => {
    mystate.value = com2;
    setTimeout(() => {
        mystate.value = com3;
        setTimeout(() => {
            mystate.value = com4;
        }, 2000);
    }, 2000);
}, 2000);
console.log([vdom, mystate, com1, com2, com3, com4]);
watch(mystate, (state) => {
    console.log([state, element]);
});
document.body.appendChild(render(h(() => (<div>
                <button $text="component 1" onclick={() => {
    mystate.value = com1;
}}/>
                <button $text="component 2" onclick={() => {
    mystate.value = com2;
}}/>
                <button $text="component 3" onclick={() => {
    mystate.value = com3;
}}/>
                <button $text="component 4" onclick={() => {
    mystate.value = com4;
}}/>
            </div>))));
//# sourceMappingURL=index-switchable.jsx.map