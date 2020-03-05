import Virtualdom from "../CreateElement/VirtualElement";
import { isReactiveState } from "../Reactivity/reactivestate.js";
import { setelehtml } from "../UtilTools/dom";
import { isstring } from "../UtilTools/util";
import { createhtmlandtextdirective } from "./create-html-and-text-directive";
export const Localhtml = (
    html: unknown, //string | ReactiveState<any>,
    ele: Element,
    _vdom: Virtualdom<any>
    // onmounted
) => {
    if (isstring(html) || isReactiveState(html)) {
        console.log(_vdom);
        createhtmlandtextdirective(setelehtml, "html", ele, html);
    } else {
        throw new TypeError();
    }
};
