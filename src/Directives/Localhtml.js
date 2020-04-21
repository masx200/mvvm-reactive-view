import { isReactiveState } from "../Reactivity/isReactiveState";
import { setelehtml } from "../UtilTools/dom";
import { isstring } from "../UtilTools/util";
import { createhtmlandtextdirective } from "./create-html-and-text-directive";
export const Localhtml = (html, ele, vdom, onmount, onunmount) => {
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
//# sourceMappingURL=Localhtml.js.map
