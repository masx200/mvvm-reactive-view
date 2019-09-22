import Virtualdom from "./virtualdom";
import ReactiveState from "./primitivestate";
import { isReactiveState } from "./primitivestate";
import { isstring, isArray } from "./util";
import { isVirtualdom } from "./virtualdom";
import htm from "htm/dist/htm.module.js";
import h from "./createelement";
import { invalid_Virtualdom } from "./createApp";

const html = htm.bind(h);

/* 如果出现未闭合标签会产生错误的vdom */
export function isvalidvdom(
  v: any
): v is
  | string
  | Virtualdom
  | ReactiveState
  | (string | Virtualdom | ReactiveState)[] {
  let flag = false;
  if (isArray(v)) {
    flag = v
      .map((ele: any) => {
        return isvalidvdom(ele);
        //isstring(ele) || ele instanceof Virtualdom;
      })
      .includes(false)
      ? false
      : true;
    return flag;
  } else if (
    isVirtualdom(v)
    // v instanceof Virtualdom
  ) {
    if (isvalidvdom(v.children)) {
      return true;
    }
  } else if (
    isReactiveState(v)
    //  v instanceof ReactiveState
  ) {
    return true;
  } else {
    if (isstring(v)) {
      return true;
    }
  }
  return flag;
}
function assertvalidvirtualdom(...args: any[]) {
  const vdom = html(...args);
  if (isvalidvdom(vdom)) {
    return vdom;
  } else {
    console.error(vdom);
    throw new TypeError(invalid_Virtualdom);
  }
}
export default assertvalidvirtualdom;
