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
const vdom = listmap(
  Array(10)
    .fill(undefined)
    .map((v, i) => i),
  value => createElement("div", [value])
);
document.body.appendChild(MountElement(vdom, document.createElement("div")));
console.log(vdom);
