import {apply}from "./reflect"


// declare const htm: (
//   strings?: TemplateStringsArray,
//   ...values: any[]
// ) => Virtualdom<any>;
/* declare module "htm/dist/htm.module" {
  const htm: (
    strings?: TemplateStringsArray,
    ...values: any[]
  ) => Virtualdom<any>;
  export default htm;
} */
interface HTM {
  (strings?: TemplateStringsArray, ...values: any[]): Virtualdom<any>;
}
import htm from "htm";
import { VaildVDom } from "./conditon";
// import htm from "../types/htm";
import { invalid_Virtualdom } from "./createApp";
import h from "./createelement";
import { isReactiveState } from "./reactivestate";
import { isArray, isnumber, isstring } from "./util";
import Virtualdom, { isVirtualdom } from "./virtualdom";

// const html = htm.bind(h);
function html(
strings?: TemplateStringsArray,
  ...values: any[]
): Virtualdom<any>
function html(...inargs: any[]): Virtualdom<any> {
 // return (htm as HTM).call(h, ...inargs);

return apply(htm as HTM,h,inargs)
}

/* 如果出现未闭合标签会产生错误的vdom */
export function isvalidvdom(v: any): v is VaildVDom {
  if (isnumber(v)) {
    return true;
  }
  let flag = false;
  if (isArray(v)) {
    /*flag = v
      .map((ele: any) => {
        return isvalidvdom(ele);
        //isstring(ele) || ele instanceof Virtualdom;
      })
      .includes(false)
      ? false
      : true;
    return flag;*/
    //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    //不允许空数组
return v.length&&v.every(e => isvalidvdom(e));
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
    console.error(invalid_Virtualdom);
    throw new TypeError();
  }
}
export default assertvalidvirtualdom;
