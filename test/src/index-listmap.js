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
const vdom = listmap(liststate, (value, index) =>
  createElement("div", ["item", "value", value, "index", index])
);
document.body.appendChild(MountElement(vdom, document.createElement("div")));
console.log(vdom);
