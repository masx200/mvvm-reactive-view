import Virtualdom from "../CreateElement/VirtualElement";
import { isReactiveState } from "../Reactivity/reactivestate.js";
import { setelehtml } from "../UtilTools/dom";
import { isstring } from "../UtilTools/util";
import { createhtmlandtextdirective } from "./create-html-and-text-directive";
export const Localhtml = (
    html: unknown,
    ele: Element,
    vdom: Virtualdom<any>,
    onmount: (call: () => void) => void,
    onunmount: (call: () => void) => void
) => {
    if (isstring(html) || isReactiveState(html)) {
        console.log(vdom);
        vdom.children.length = 0;
        createhtmlandtextdirective(
            setelehtml,
            "html",
            ele,
            html,
            onmount,
            onunmount
        );
    } else {
        throw new TypeError();
    }
};
