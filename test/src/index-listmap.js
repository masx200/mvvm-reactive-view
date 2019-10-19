/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Condition,
  ListMap,
  // @ts-ignore
  computed,
  // @ts-ignore
  createElement,
  createRef,
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
watch(liststate, a => console.dir([liststate, a]));
const testlistvdom = (
  <div>
    <button
      _text="push"
      onclick={() => {
        // @ts-ignore
        liststate.push(Math.random());
      }}
    />
    <button
      _text="pop"
      onclick={() => {
        // @ts-ignore
        liststate.pop();
      }}
    />

    <button
      _text="shift"
      onclick={() => {
        // @ts-ignore
        liststate.shift();
      }}
    />
    <button
      _text="unshift"
      onclick={() => {
        // @ts-ignore
        liststate.unshift(Math.random());
      }}
    />
    {ListMap(liststate, (value, index) => (
      <div
        _ref={ele => {
          // @ts-ignore
          refarray.length = liststate.length;
          refarray[index] = ele;
        }}
      >
        {["item:", "value:", value, "index:", index]}
      </div>
    ))}
  </div>
);
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

document.body.appendChild(MountElement(vdom, document.createElement("div")));
console.log(vdom, refarray, liststate);
