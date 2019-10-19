import { invalid_Function } from "../context-mounted-unmounted";
import directives from "./directives";
import { isplainobject } from "../UtilTools/util";
import Virtualdom from "../VirtualElement";
export interface Extendfun {
  (
    value: any,
    element: Element,

    vdom: Virtualdom<any>
  ): void;
}
export interface ExtendOptions {
  [s: string]: Extendfun;
}
export default function extenddirectives(options: ExtendOptions = {}) {
  if (!isplainobject(options)) {
    console.error(options);
    throw new TypeError();
  }
  Object.entries(options).forEach(([key, value]) => {
    if (typeof value !== "function") {
      console.error(value);
      console.error(invalid_Function);
      throw TypeError();
    } else {
      if (!directives[key]) {
        Reflect.set(directives, key, value);
      } else {
        console.error(directives);
        console.error("do not extend existing directive");
        throw new Error();
      }
    }
  });
  return directives;
}
