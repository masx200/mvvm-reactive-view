import ReactiveState from "../Reactivity/reactivestate.js";
import { isReactiveState } from "../Reactivity/isReactiveState";
import watch from "../Reactivity/watch";
import { isconnected } from "../UtilTools/isconnected";
import { isstring } from "../UtilTools/util";
import { getstatetype } from "src/Reactivity/getstatetype.js";
import { TagType } from "src/Reactivity/TagType.js";

export { createhtmlandtextdirective };
function createhtmlandtextdirective(
    seteletext: (e: Element, v: string) => void,
    errorname: string,
    ele: Element,
    text: string | ReactiveState<any>,
    onmount: (call: () => void) => void,
    onunmount: (call: () => void) => void
) {
    {
        const element = ele;
        if (isstring(text)) {
            requestAnimationFrame(() => {
                seteletext(ele, text);
            });
        } else if (isReactiveState(text)) {
            if (getstatetype(text) !== TagType.String) {
                throw new TypeError();
            }
            let cancel: undefined | (() => void);
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
