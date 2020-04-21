import { invalid_ReactiveState } from "../AttributeClass/conditon";
import { invalid_Virtualdom } from "../MountElement/MountElement";
import { isReactiveState } from "../Reactivity/isReactiveState";
import { get, set } from "../UtilTools/reflect";
import { toArray } from "../UtilTools/toArray";
export function model(types, bindattribute, domprop, eventnames, value, vdom) {
    if (!isReactiveState(value)) {
        console.error(value);
        console.error(invalid_ReactiveState + invalid_Virtualdom);
        throw TypeError();
    }
    if (types.includes(vdom.type)) {
        set(vdom.bindattr, bindattribute, value);
        eventnames.forEach((eventname) => {
            const origin = vdom.onevent[eventname];
            const eventsarray = toArray(origin);
            set(
                vdom.onevent,
                eventname,
                toArray([
                    ...eventsarray,
                    (e) => {
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
//# sourceMappingURL=model.js.map
