import Virtualdom from "../CreateElement/VirtualElement";
import { isReactiveState } from "../Reactivity/reactivestate.js";
import { seteletext } from "../UtilTools/dom";
import { isstring } from "../UtilTools/util";
import { createhtmlandtextdirective } from "./create-html-and-text-directive";
export const Localtext = (
    text: unknown,
    ele: Element,
    _vdom: Virtualdom<any>
) => {
    if (isstring(text) || isReactiveState(text)) {
        console.log(_vdom);
        createhtmlandtextdirective(seteletext, "text", ele, text);
    } else {
        throw new TypeError();
    }
};
