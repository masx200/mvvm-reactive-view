import { get } from "./reflect";
import { isFunction } from "./util";
const componentsymbol = Symbol("component");
export { componentsymbol };
export function iscomponent(a: any) {
  return (
    isFunction(a) &&
    //  has(a, componentsymbol) &&
    get(a, componentsymbol) === componentsymbol
  );
}
