import Virtualdom from "./virtualdom";
interface Extendfun {
  (element: Element, value: any, vdom: Virtualdom): void;
}
import directives from "./directives";
export default function extenddirectives(options: {
  [s: string]: Extendfun;
}): void {
  Object.entries(options).forEach(([key, value]) => {
    if (typeof value !== "function") {
      throw TypeError("invalid directive");
    } else {
      directives[key] = value;
    }
  });
}
