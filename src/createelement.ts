import Reflect from "./reflect";
import { isstring, isarray, isobject, isfunction } from "./util";
import Virtualdom from "./virtualdom";
export default function h(
  type: Function | string = "",
  props: any = {},
  ...children: Array<Virtualdom | string>
): Virtualdom | Array<Virtualdom | string> {
  // | Array<Virtualdom | string>
  // if(isarray()){}
  /* add fragment element */
  var typenormalized = isstring(type) || isfunction(type) ? type : "";
  var propsnormalized = isobject(props) ? props : {};
  var childrennormalized = children.flat(Infinity);
  if (typeof typenormalized === "string" && "" === typenormalized) {
    return childrennormalized;
  }
  return new Virtualdom(typenormalized, propsnormalized, childrennormalized);
}
