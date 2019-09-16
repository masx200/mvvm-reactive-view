import { isString, isnumber, isboolean, isundefined } from "./util";
export default function(a: any) {
  return isString(a) || isnumber(a) || isboolean(a) || isundefined(a);
}
