import { isArray, isnumber, isstring } from "src/UtilTools/util";
import { VaildVDom } from "src/AttributeClass/conditon";
import { isVirtualdom } from "src/VirtualElement";
import { isReactiveState } from "src/Reactivity/reactivestate";

export function isvalidvdom(v: any): v is VaildVDom {
  if (isstring(v)) {
    return true;
  }
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
    /* children可能为空数组 */
    return /* !! */ /* v.length */ /* && */ v.every(e => isvalidvdom(e));
  } else if (
    isVirtualdom(v)
    // v instanceof Virtualdom
  ) {
    return isvalidvdom(v.children);
    /*  if (isvalidvdom(v.children)) {
        return true;
      } */
  } else if (
    isReactiveState(v)
    //  v instanceof ReactiveState
  ) {
    return true;
  }
  /*  else {
    } */
  return flag;
}
