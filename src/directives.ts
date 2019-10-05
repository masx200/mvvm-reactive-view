export const{ requestAnimationFrame} = window
import { seteletext, setelehtml } from "./dom";

import { watch } from "./watch";
import ReactiveState, { isReactiveState } from './reactivestate';
import { isconnected } from "./isconnected";
import { isobject,isfunction } from "./util";

import {ExtendOptions}from"./extend-directive"
const directive:ExtendOptions= {
  ref(ele: Element, ref: { value: any }|Function) {
    if (isobject(ref)) {
      ref.value = ele;
    }else if(isfunction(ref)){

ref.call(undefined,ele)
}

 else {
      throw TypeError("invalid ref");
    }
  },
  html(ele: Element, html: string | ReactiveState) {
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
        setelehtml(ele, String(html));
      });
    } else {
      throw TypeError("invalid html");
    }

*/
  },
  text(ele: Element, text: string | ReactiveState) {
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
    } else {
      throw TypeError("invalid text");
    }

*/
  }
};
function createhtmlandtextdirective(seteletext: Function, errorname: string) {
  return function(ele: Element, text: string | ReactiveState) {
    const element = ele;
    if (typeof text == "string") {
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
      watch(text, (state: { value: any }) => {
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
      throw TypeError("invalid " + errorname);
    }
  };
}
export default directive
