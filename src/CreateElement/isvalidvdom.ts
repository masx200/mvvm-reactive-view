export type VaildVDom =
    | Virtualdom<any>
    | string
    | number
    | Vdomchildren
    | ReactiveState<any>;

import Virtualdom, {
    isVirtualdom,
    Vdomchildren
} from "../CreateElement/VirtualElement";
import ReactiveState, { isReactiveState } from "../Reactivity/reactivestate.js";
import { isArray, isnumber, isstring } from "../UtilTools/util";

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
          
        })
        .includes(false)
        ? false
        : true;
      return flag;*/

        return v.every(e => isvalidvdom(e));
    } else if (isVirtualdom(v)) {
        return isvalidvdom(v.children);
        /*  if (isvalidvdom(v.children)) {
        return true;
      } */
    } else if (isReactiveState(v)) {
        return true;
    }
    /*  else {
    } */
    return flag;
}
