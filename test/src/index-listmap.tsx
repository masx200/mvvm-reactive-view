/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Condition,
    createState,
    // @ts-ignore
    h,
    MountElement,
    // @ts-ignore
    watch
} from "./mvvm-view";
const refarray = [];
const liststate = createState(
    Array(10)
        .fill(undefined)
        // @ts-ignore
        .map((v, i) => i)
);
watch(liststate, (a) => console.dir([liststate, a]));
const testlistvdom = (
    <div>
        <button
            $text="push"
            onclick={() => {
                // @ts-ignore
                liststate.push(Math.random());
            }}
        />
        <button
            $text="pop"
            onclick={() => {
                // @ts-ignore
                liststate.pop();
            }}
        />

        <button
            $text="shift"
            onclick={() => {
                // @ts-ignore
                liststate.shift();
            }}
        />
        <button
            $text="unshift"
            onclick={() => {
                // @ts-ignore
                liststate.unshift(Math.random());
            }}
        />
        <div
            $for={[
                liststate,
                (value, index) => (
                    <div
                        $ref={(ele) => {
                            // @ts-ignore
                            refarray.length = liststate.length;
                            refarray[index] = ele;
                        }}
                    >
                        <p>{["item:", "value:", value, ",index:", index]} </p>
                    </div>
                )
            ]}
        />
    </div>
);
console.log("testlistvdom", testlistvdom);
const weathercondition = createState(true);
const vdom = [
    Condition(weathercondition, testlistvdom),
    <>
        <button
            onclick={() => {
                weathercondition.value = !weathercondition.value;
            }}
        >
            condition toggle
        </button>
    </>
];

console.log(vdom, refarray, liststate);
const container = document.createElement("div");
MountElement(vdom, container);
document.body.appendChild(container);
