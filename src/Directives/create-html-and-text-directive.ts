import ReactiveState, { isReactiveState } from "../Reactivity/reactivestate.js";
import { watch } from "../Reactivity/watch";
import { isconnected } from "../UtilTools/isconnected";
import { isstring } from "../UtilTools/util";

export { createhtmlandtextdirective };
function createhtmlandtextdirective(
    seteletext: Function,
    errorname: string,
    ele: Element,
    text: string | ReactiveState<any>
) {
    {
        const element = ele;
        if (isstring(text)) {
            requestAnimationFrame(() => {
                seteletext(ele, text);
            });
        } else if (isReactiveState(text)) {
            watch(text, () => {
                const state = text;
                if (isconnected(element)) {
                    seteletext(ele, String(state));
                }
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
