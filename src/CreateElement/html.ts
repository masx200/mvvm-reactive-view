import htm from "htm";
// import htm from "../types/htm";
import { invalid_Virtualdom } from "../MountElement/MountElement";
import { apply } from "../UtilTools/reflect";
import { toArray } from "../UtilTools/toArray";
import Virtualdom, { Vdomchildren } from "./VirtualElement";
import h from "./create-element";
import { isvalidvdom } from "./isvalidvdom";

// const html = htm.bind(h);
// function html(
//   strings?: TemplateStringsArray,
//   ...values: any[]
// ): Virtualdom<any>;
function html(...inargs: any[]): Virtualdom<any> | Vdomchildren {
  // return (htm as HTM).call(h, ...inargs);

  return apply(htm /* as HTM */, h, inargs);
}

/* 如果出现未闭合标签会产生错误的vdom */

export default function(
  strings?: TemplateStringsArray,
  ...values: any[]
): Virtualdom<any> | Vdomchildren;
export default function(...args: any[]) {
  const prevdom = toArray(html(...args));

  const vdom = prevdom.length === 1 ? prevdom[0] : prevdom;
  if (isvalidvdom(vdom)) {
    return vdom;
  } else {
    console.error(vdom);
    console.error(invalid_Virtualdom);
    throw new TypeError();
  }
}

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
/* interface HTM {
  (strings?: TemplateStringsArray, ...values: any[]): Virtualdom<any>;
} */
