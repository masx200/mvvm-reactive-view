import Virtualdom from "../CreateElement/VirtualElement";
import { isReactiveState } from "../Reactivity/reactivestate.js";
import { setelehtml } from "../UtilTools/dom";
import { isstring } from "../UtilTools/util";
import { createhtmlandtextdirective } from "./create-html-and-text-directive";
export const Localhtml = (
    html: unknown,
    ele: Element,
    vdom: Virtualdom<any>
) => {
    if (isstring(html) || isReactiveState(html)) {
        console.log(vdom);
        vdom.children.length = 0;
        createhtmlandtextdirective(setelehtml, "html", ele, html);
    } else {
        throw new TypeError();
    }
};