import { isstring, isarray, isobject, isfunction } from "./util";
import Virtualdom from "./virtualdom";
import htm from "htm/dist/htm.module.js";
export function h(
  type: Function | string = "",
  props: any = {},
  ...children: Array<Virtualdom | string>
): Virtualdom | Array<Virtualdom | string> {
  // | Array<Virtualdom | string>
  // if(isarray()){}
  /* add fragment element */
  if (typeof type === "string" && "" === type) {
    return children;
  }
  return new Virtualdom(
    isstring(type) || isfunction(type) ? type : "",
    isobject(props) ? props : {},
    children
  );
}

const html = htm.bind(h);

/* 如果出现未闭合标签会产生错误的vdom */
function isvalidvdom(v: any) {
  var flag = false;
  if (isarray(v)) {
    flag = v
      .map((ele: any) => {
        return isstring(ele) || ele instanceof Virtualdom;
      })
      .includes(false)
      ? false
      : true;
  } else if (v instanceof Virtualdom) {
    flag = true;
  } else {
    if (isstring(v)) {
      flag = true;
    }
  }
  return flag;
}
function assertvalidvirtualdom(...args: any[]) {
  var vdom = html(...args);
  if (isvalidvdom(vdom)) {
    return vdom;
  } else {
    throw new TypeError(
      "invalid Virtualdom!" + "\n" + JSON.stringify(vdom, null, 4)
    );
  }
}
export default assertvalidvirtualdom;
