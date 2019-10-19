import ReactiveState, { isReactiveState } from "../Reactivity/ReactiveState";
import { watch } from "src/Reactivity/watch";
import { isconnected } from "src/UtilTools/isconnected";
import { isstring } from "src/UtilTools/util";

export { createhtmlandtextdirective };
function createhtmlandtextdirective(seteletext: Function, errorname: string) {
  return function(ele: Element, text: string | ReactiveState<any>) {
    const element = ele;
    if (
      isstring(text)
      //typeof text == "string"
    ) {
      requestAnimationFrame(() => {
        seteletext(ele, text);
        /*    ele.textContent = text;*/
        //   console.log(ele.outerHTML);
      });
    } else if (
      isReactiveState(text)
      //  text instanceof ReactiveState
    ) {
      //   const ReactiveState = text;
      watch(text, (/* state: { value: any } */) => {
        const state = text;
        if (isconnected(element)) {
          seteletext(ele, String(state));
        }
        /* ele.textContent = String(state);*/
      });
      //   ReactiveState[subscribesymbol]((state: { value: any }) => {
      //     ele.textContent = String(state.value);
      //   });
      requestAnimationFrame(() => {
        // console.log("text");
        seteletext(ele, String(text));

        /*  ele.textContent = String(text);*/
      });
    } else {
      console.error(text);
      console.error("invalid " + errorname);
      throw TypeError();
    }
  };
}
