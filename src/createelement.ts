import ReactiveState, { dispatchsymbol } from "./primitivestate";
import Reflect from "./reflect";
import { isstring, isarray, isobject, isfunction } from "./util";
import Virtualdom from "./virtualdom";
export default function h(
  type: Function | string = "",
  props: any = {},
  ...children: Array<Virtualdom | string | ReactiveState>
): Virtualdom | Array<Virtualdom | string | ReactiveState> {
  // | Array<Virtualdom | string>
  // if(isarray()){}
  /* add fragment element */
  //   console.log(type, props, children);
  var typenormalized = isstring(type) || isfunction(type) ? type : "";
  var propsnormalized = isobject(props) ? props : {};
  var childrennormalized = children.flat(1);
  if (typeof typenormalized === "string" && "" === typenormalized) {
    return childrennormalized;
  }
  return new Virtualdom(typenormalized.toLowerCase(), propsnormalized, childrennormalized);
}
