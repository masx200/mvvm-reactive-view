import { isFunction } from "./util";
import { get, has } from "./reflect";
const componentsymbol = Symbol("component");
export { componentsymbol };
export function iscomponent(a: any) {
  return (
    isFunction(a) &&
  //  has(a, componentsymbol) &&
    get(a, componentsymbol) === componentsymbol
  );
}
