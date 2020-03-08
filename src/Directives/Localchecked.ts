import Virtualdom from "../CreateElement/VirtualElement";
import { isReactiveState } from "../Reactivity/isReactiveState";
import { querySelectorAll } from "../UtilTools/dom";
import { set } from "../UtilTools/reflect";
import { toArray } from "../UtilTools/toArray";
import { model } from "./model";
import { getstatetype } from "src/Reactivity/getstatetype";
import { TagType } from "src/Reactivity/TagType";
export const Localchecked = (
    value: unknown,

    element: Element,
    vdom: Virtualdom<any>
): void => {
    if (!isReactiveState(value)) {
        throw new TypeError();
    }
    if (getstatetype(value) !== TagType.Boolean) {
        throw new TypeError();
    }
    console.log(element);
    model(["input"], "checked", "checked", ["change"], value, vdom);

    const eventname = "click";
    const origin = toArray(vdom.onevent[eventname]);
    const eventsarray = origin;
    const dispatchallsamename: EventListener = (event: Event) => {
        const inputelement = event.target as HTMLInputElement;
        const name = (event.target as HTMLInputElement).name;
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
