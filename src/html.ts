import ReactiveState, { dispatchsymbol } from "./primitivestate";
import Reflect from "./reflect";
import { isstring, isarray, isobject, isfunction } from "./util";
import Virtualdom from "./virtualdom";
import htm from "htm/dist/htm.module.js";
import h from "./createelement";

const html = htm.bind(h);

/* 如果出现未闭合标签会产生错误的vdom */
export function isvalidvdom(v: any) {
  let flag = false;
  if (Array.isArray(v)) {
    flag = v
      .map((ele: any) => {
        return isvalidvdom(ele);
        //isstring(ele) || ele instanceof Virtualdom;
      })
      .includes(false)
      ? false
      : true;
  } else if (v instanceof Virtualdom) {
    if (isvalidvdom(v.children)) {
      return true;
    }
  } else if (v instanceof ReactiveState) {
    return true;
  } else {
    if (isstring(v)) {
      return true;
    }
  }
  return flag;
}
function assertvalidvirtualdom(...args: any[]) {
  var vdom = html(...args);
  if (isvalidvdom(vdom)) {
    return vdom;
  } else {
    throw new TypeError("invalid Virtualdom!");
    console.error(vdom);
  }
}
export default assertvalidvirtualdom;
