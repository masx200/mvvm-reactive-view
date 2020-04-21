import { Condition, createState, h, MountElement, watch } from "./mvvm-view";
console.log(h);
const refarray = [];
const liststate = createState(Array(10)
    .fill(undefined)
    .map((v, i) => i));
watch(liststate, (a) => console.dir([liststate, a]));
const testlistvdom = (<div>
        <button $text="push" onclick={() => {
    liststate.push(Math.random());
}}/>
        <button $text="pop" onclick={() => {
    liststate.pop();
}}/>

        <button $text="shift" onclick={() => {
    liststate.shift();
}}/>
        <button $text="unshift" onclick={() => {
    liststate.unshift(Math.random());
}}/>
        <div $for={[
    liststate,
    (value, index) => (<div $ref={(ele) => {
        refarray.length = liststate.length;
        refarray[index] = ele;
    }}>
                        <p>{["item:", "value:", value, ",index:", index]} </p>
                    </div>)
]}/>
    </div>);
console.log("testlistvdom", testlistvdom);
const weathercondition = createState(true);
const vdom = [
    Condition(weathercondition, testlistvdom),
    <>
        <button onclick={() => {
        weathercondition.value = !weathercondition.value;
    }}>
            condition toggle
        </button>
    </>
];
console.log(vdom, refarray, liststate);
const container = document.createElement("div");
MountElement(vdom, container);
document.body.appendChild(container);
//# sourceMappingURL=index-listmap.jsx.map