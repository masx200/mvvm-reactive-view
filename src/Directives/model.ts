import { invalid_ReactiveState } from "../AttributeClass/conditon";
import { invalid_Virtualdom } from "../MountElement/MountElement";
import ReactiveState, { isReactiveState } from "../Reactivity/reactivestate.js";
import { get, set } from "../UtilTools/reflect";
import { toArray } from "../UtilTools/toArray";
import Virtualdom from "../CreateElement/VirtualElement";
export function model(
    types: string[],
    bindattribute: string,
    domprop: string,
    eventnames: string[],
    value: ReactiveState<any>,
    vdom: Virtualdom<any>
) {
    if (!isReactiveState(value)) {
        console.error(value);
        console.error(invalid_ReactiveState + invalid_Virtualdom);
        throw TypeError();
    }
    if (types.includes(vdom.type)) {
        set(vdom.bindattr, bindattribute, value);
        /*  [
      
      "change",
      "input"
    ]. */
        eventnames.forEach(eventname => {
            const origin = vdom.onevent[eventname];
            const eventsarray = toArray(origin);
            set(
                vdom.onevent,
                eventname,
                toArray([
                    ...eventsarray,
                    (e: any) => {
                        return (value.value = get(e.target, domprop));
                    }
                ]).filter(Boolean)
            );
        });
    } else {
        console.error(vdom);
        console.error(invalid_ReactiveState + invalid_Virtualdom);
        throw TypeError();
    }
}
