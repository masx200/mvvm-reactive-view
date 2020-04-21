import { isboolean, isnumber, isString, isundefined } from "./util";
export default function(a) {
    return (
        isString(a) ||
        isnumber(a) ||
        isboolean(a) ||
        isundefined(a) ||
        isbigint(a)
    );
}
export function isbigint(a) {
    return typeof a === "bigint";
}
//# sourceMappingURL=isprimitive.js.map
