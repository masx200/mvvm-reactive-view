import { isFunction } from "../UtilTools/util";
import { ctxopen, errormessage, invalid_Function } from "./Component-context";
export function checkctxandcallbck(callback: () => void) {
    if (isFunction(callback)) {
        if (ctxopen) {
        } else {
            console.error(errormessage);
            throw Error();
        }
    } else {
        console.error(callback);
        console.error(invalid_Function);
        throw TypeError();
    }
}
