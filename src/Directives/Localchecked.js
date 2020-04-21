import { isReactiveState } from "../Reactivity/isReactiveState";
import { querySelectorAll } from "../UtilTools/dom";
import { set } from "../UtilTools/reflect";
import { toArray } from "../UtilTools/toArray";
import { model } from "./model";
import { getstatetype } from "src/Reactivity/getstatetype";
export const Localchecked = (value, element, vdom) => {
    if (!isReactiveState(value)) {
        throw new TypeError();
    }
    if (getstatetype(value) !== "Boolean") {
        throw new TypeError();
    }
    console.log(element);
    model(["input"], "checked", "checked", ["change"], value, vdom);
    const eventname = "click";
    const origin = toArray(vdom.onevent[eventname]);
    const eventsarray = origin;
    const dispatchallsamename = (event) => {
        const inputelement = event.target;
        const name = event.target.name;
        if (name) {
            querySelectorAll(`input[name=${name}]`)
                .filter((ele) => ele !== inputelement)
                .forEach((element) => {
                    element.dispatchEvent(new Event("change"));
                });
        }
    };
    set(
        vdom.onevent,
        eventname,
        toArray([...eventsarray, dispatchallsamename]).filter(Boolean)
    );
};
//# sourceMappingURL=Localchecked.js.map
