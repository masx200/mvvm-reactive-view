import { isReactiveState } from "../Reactivity/reactivestate.js";
import { model } from "./model";
import Virtualdom from "src/CreateElement/VirtualElement.js";
export const Localvalue = (
    value: unknown, //ReactiveState<any>,
    element: Element,
    vdom: Virtualdom<any>
): void => {
    if (isReactiveState(value)) {
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
