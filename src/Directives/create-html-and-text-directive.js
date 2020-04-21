import { isReactiveState } from "../Reactivity/isReactiveState";
import watch from "../Reactivity/watch";
import { isconnected } from "../UtilTools/isconnected";
import { isstring } from "../UtilTools/util";
import { getstatetype } from "src/Reactivity/getstatetype.js";
export { createhtmlandtextdirective };
function createhtmlandtextdirective(
    seteletext,
    errorname,
    ele,
    text,
    onmount,
    onunmount
) {
    {
        const element = ele;
        if (isstring(text)) {
            requestAnimationFrame(() => {
                seteletext(ele, text);
            });
        } else if (isReactiveState(text)) {
            if (getstatetype(text) !== "String") {
                throw new TypeError();
            }
            let cancel;
            onmount(() => {
                cancel = watch(text, () => {
                    const state = text;
                    if (isconnected(element)) {
                        seteletext(ele, String(state));
                    }
                });
            });
            onunmount(() => {
                cancel && cancel();
            });
            requestAnimationFrame(() => {
                seteletext(ele, String(text));
            });
        } else {
            console.error(text);
            console.error("invalid " + errorname);
            throw TypeError();
        }
    }
}
//# sourceMappingURL=create-html-and-text-directive.js.map
