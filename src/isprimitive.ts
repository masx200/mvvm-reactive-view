import { isString, isnumber, isboolean, isundefined } from "./util";
type Primitive = string | number | boolean | undefined | bigint;
export default function(a: any): a is Primitive {
  return (
    isString(a) ||
    isnumber(a) ||
    isboolean(a) ||
    isundefined(a) ||
    typeof a === "bigint"
  );
}
