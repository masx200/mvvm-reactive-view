/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  listmap,
  computed,
  createElement,
  createRef,
  createState,
  h,
  MountElement,
  watch
} from "../../dist/index.js";
const liststate = createState(
  Array(10)
    .fill(undefined)
    .map((v, i) => i)
);
const vdom = (
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
    {listmap(liststate, (value, index) =>
      createElement("div", ["item", "value", value, "index", index])
    )}
  </div>
);
document.body.appendChild(MountElement(vdom, document.createElement("div")));
console.log(vdom);
