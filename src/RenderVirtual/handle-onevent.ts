import onevent from "./handle-onevent";
export { onevent };
import { invalid_Function } from "../life-cycle-context/Component-context";
import { domaddlisten, domremovelisten } from "../UtilTools/dom";
import { get, has, set } from "../UtilTools/reflect";
import { toArray } from "../UtilTools/toArray";
import { isfunction } from "../UtilTools/util";
export const eventlistenerssymbol = Symbol("eventlisteners");
export default function(
    element: Element | Node,
    eventname: string,
    callback: EventListener | Array<EventListener>
) {
    firstaddlisteners(element, eventname, toArray(callback));
}
export function firstaddlisteners(
    ele: Element | Node,
    event: string,
    callarray: Array<EventListener>
) {
    const element = ele;
    callarray.forEach((call: EventListener) => {
        if (!isfunction(call)) {
            console.error(call);
            console.error(invalid_Function);
            throw TypeError();
        }

        if (!has(element, eventlistenerssymbol)) {
            set(element, eventlistenerssymbol, []);
        }
        (get(ele, eventlistenerssymbol) as [string, EventListener][]).push([
            event,
            call
        ]);
        domaddlisten(ele, event, call);
    });
}
export function removelisteners(ele: Element | Node) {
    if (has(ele, eventlistenerssymbol)) {
        (get(ele, eventlistenerssymbol) as [string, EventListener][]).forEach(
            ([event, call]) => {
                domremovelisten(ele, event, call);
            }
        );
    }
}
export function readdlisteners(ele: Element | Node) {
    if (has(ele, eventlistenerssymbol)) {
        (get(ele, eventlistenerssymbol) as [string, EventListener][]).forEach(
            ([event, call]) => {
                domaddlisten(ele, event, call);
            }
        );
    }
}
