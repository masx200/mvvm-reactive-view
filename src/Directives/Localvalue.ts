import { isReactiveState } from "../Reactivity/isReactiveState";
import { model } from "./model";
import Virtualdom from "src/CreateElement/VirtualElement.js";
import { getstatetype } from "src/Reactivity/getstatetype";
import { TagType } from "src/Reactivity/TagType";
export const Localvalue = (
    value: unknown,
    element: Element,
    vdom: Virtualdom<any>
): void => {
    if (isReactiveState(value)) {
        if (getstatetype(value) !== TagType.String) {
            throw new TypeError();
        }
        console.log(element);
        model(
            ["input", "textarea", "select"],
            "value",
            "value",
            ["change", "input"],
            value,
            vdom
        );
    } else {
        throw new TypeError();
    }
};
