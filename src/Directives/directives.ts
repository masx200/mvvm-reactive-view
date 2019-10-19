export const { requestAnimationFrame } = window;
import ReactiveState from "../Reactivity/ReactiveState";
import { setelehtml, seteletext } from "../UtilTools/dom";
import { apply, set } from "../UtilTools/reflect";
import { isfunction, isobject } from "../UtilTools/util";
import Virtualdom from "../CreateElement/VirtualElement";
import { createhtmlandtextdirective } from "./create-html-and-text-directive";
import extenddirectives, { ExtendOptions } from "./extend-directive";
export { directive };
const directive: ExtendOptions = {
  ref(ref: object | Function, ele: Element, _vdom: Virtualdom<any>) {
    if (isfunction(ref)) {
      apply(ref as Function, undefined, [ele]);
      // ref(ele)
      //   ref.call(undefined, ele);
    } else if (isobject(ref)) {
      set(ref as object, "value", ele);
      //   ref.value = ele;
    } else {
      console.log(_vdom);
      console.error(ref);
      console.error("invalid ref");
      throw TypeError();
    }
  }
};
extenddirectives({
  html(
    html: string | ReactiveState<any>,
    ele: Element,

    _vdom: Virtualdom<any>
  ) {
    console.log(_vdom);
    createhtmlandtextdirective(setelehtml, "html")(ele, html);

    // ele.innerHTML = html;
    // console.log(ele.outerHTML);
    /*  if (typeof html == "string") {
          requestAnimationFrame(() => {
            setelehtml(ele, html);
    
            /* ele.innerHTML = html;*/
    //   console.log(ele.outerHTML);
    /*     });
        } else if (html instanceof ReactiveState) {
          //   const ReactiveState = html;
          watch(html, (state: { value: any }) => {
            /*ele.innerHTML = String(state);*/
    /*
            setelehtml(ele, String(state));
          });
          //   ReactiveState[subscribesymbol]((state: { value: any }) => {
          //     ele.innerHTML = String(state.value);
          //   });
          requestAnimationFrame(() => {
            // console.log("html");
            /*  ele.innerHTML = String(html);*/
    /*
      //      setelehtml(ele, String(html));
     //     });
      //  } else {
    
    //console.error()
      //    throw TypeError("invalid html");
     //   }
    
    */
  },
  text(
    text: string | ReactiveState<any>,
    ele: Element,
    _vdom: Virtualdom<any>
  ) {
    console.log(_vdom);
    createhtmlandtextdirective(seteletext, "text")(ele, text);

    /*
    
      // ele.textContent = text;
        // console.log(ele.outerHTML);
        if (typeof text == "string") {
          requestAnimationFrame(() => {
            seteletext(ele, text);
            /*    ele.textContent = text;*/
    /*      //   console.log(ele.outerHTML);
          });
        } else if (text instanceof ReactiveState) {
          //   const ReactiveState = text;
          watch(text, (state: { value: any }) => {
            seteletext(ele, String(state));
    
            /* ele.textContent = String(state);*/
    /*   });
          //   ReactiveState[subscribesymbol]((state: { value: any }) => {
          //     ele.textContent = String(state.value);
          //   });
          requestAnimationFrame(() => {
            // console.log("text");
            seteletext(ele, String(text));
    
            /*  ele.textContent = String(text);*/
    /*    });
       // } else {
      //    throw TypeError("invalid text");
     //   }
    
    */
  }
});

export default directive;
