import Virtualdom from "../CreateElement/VirtualElement";
import { isReactiveState } from "../Reactivity/isReactiveState";
import { seteletext } from "../UtilTools/dom";
import { isstring } from "../UtilTools/util";
import { createhtmlandtextdirective } from "./create-html-and-text-directive";
export const Localtext = (
    text: unknown,
    ele: Element,
    vdom: Virtualdom<any>,
    onmount: (call: () => void) => void,
    onunmount: (call: () => void) => void
) => {
    if (isstring(text) || isReactiveState(text)) {
        console.log(vdom);
        vdom.children.length = 0;

        createhtmlandtextdirective(
            seteletext,
            "text",
            ele,
            text,
            onmount,
            onunmount
        );
    } else {
        throw new TypeError();
    }
};
