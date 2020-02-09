import { isboolean, isnumber, isString, isundefined } from "./util";
export type Primitivetype = string | number | boolean | undefined | bigint;
export default function(a: any): a is Primitivetype {
    return (
        isString(a) ||
        isnumber(a) ||
        isboolean(a) ||
        isundefined(a) ||
        isbigint(a)
    );
}
export function isbigint(a: any): a is bigint {
    return typeof a === "bigint";
}
