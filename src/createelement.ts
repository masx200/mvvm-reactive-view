import ReactiveState from './reactivestate';
import { isstring, isobject, isfunction } from "./util";
import Virtualdom from "./virtualdom";
export default function createElement(
  type: Function | string,
  props?: any,
  ...children: any[]
): Virtualdom;
export default function createElement(
  type: Function | string = "",
  props: any = {},
  ...children: Array<Virtualdom | string | ReactiveState>
): Virtualdom | Array<Virtualdom | string | ReactiveState> {
  // | Array<Virtualdom | string>
  // if(isarray()){}
  /* add fragment element */
  //   console.log(type, props, children);
  let typenormalized = isstring(type) || isfunction(type) ? type : "";
  const propsnormalized = isobject(props) ? props : {};
  const childrennormalized = children.flat(Infinity).filter(a=>!!a);
  if (
    isstring(typenormalized)
    //   typeof typenormalized === "string"
  ) {
    typenormalized = typenormalized.trim().toLowerCase();
  }

  if (
    //typeof typenormalized === "string" &&

    "" === typenormalized
  ) {
    return childrennormalized;
  }
  /* propsnormalized = Object.fromEntries(
    Object.entries(propsnormalized).map(([key, value]) => [
      key.trim().toLowerCase(),
      value
    ])
  ); */
  return new Virtualdom(typenormalized, propsnormalized, childrennormalized);
}
