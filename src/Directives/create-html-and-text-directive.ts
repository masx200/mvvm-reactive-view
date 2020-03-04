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
                /*    ele.textContent = text;*/
            });
        } else if (isReactiveState(text)) {
            watch(text, (/* state: { value: any } */) => {
                const state = text;
                if (isconnected(element)) {
                    seteletext(ele, String(state));
                }
                /* ele.textContent = String(state);*/
            });

            requestAnimationFrame(() => {
                seteletext(ele, String(text));

                /*  ele.textContent = String(text);*/
            });
        } else {
            console.error(text);
            console.error("invalid " + errorname);
            throw TypeError();
        }
    }
}
