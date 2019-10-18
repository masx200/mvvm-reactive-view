import { isboolean, isnumber, isString, isundefined } from "./util";
export type Primitivetype = string | number | boolean | undefined | bigint;
export default function(a: any): a is Primitivetype {
  return (
    isString(a) ||
    isnumber(a) ||
    isboolean(a) ||
    isundefined(a) ||
    typeof a === "bigint"
  );
}
