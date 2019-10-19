import { get } from "../UtilTools/reflect";
import { isFunction } from "../UtilTools/util";
const componentsymbol = Symbol("component");
export { componentsymbol };
export function iscomponent(a: any) {
  return (
    isFunction(a) &&
    //  has(a, componentsymbol) &&
    get(a, componentsymbol) === componentsymbol
  );
}
