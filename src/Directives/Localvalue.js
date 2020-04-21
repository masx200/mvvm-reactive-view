import { isReactiveState } from "../Reactivity/isReactiveState";
import { model } from "./model";
import { getstatetype } from "src/Reactivity/getstatetype";
export const Localvalue = (value, element, vdom) => {
    if (isReactiveState(value)) {
        if (getstatetype(value) !== "String") {
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
//# sourceMappingURL=Localvalue.js.map
