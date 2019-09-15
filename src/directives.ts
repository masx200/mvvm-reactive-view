import { watch } from "./watch";
import { subscribesymbol, addallistenerssymbol } from "./primitivestate";
import Virtualdom from "./virtualdom";
import Primitivestate from "./primitivestate";
export default {
  ref(ele: Element, ref: { value: any }, vdom: any) {
    if (typeof ref == "object") {
      ref.value = ele;
    } else {
      throw TypeError("invalid ref");
    }
  },
  html(ele: Element, html: string | Primitivestate, vdom: any) {
    // ele.innerHTML = html;
    // console.log(ele.outerHTML);
    if (typeof html == "string") {
      requestAnimationFrame(() => {
        ele.innerHTML = html;
        //   console.log(ele.outerHTML);
      });
    } else if (html instanceof Primitivestate) {
      //   const primitivestate = html;
      watch(html, (state: { value: any }) => {
        ele.innerHTML = String(state.value);
      });
      //   primitivestate[subscribesymbol]((state: { value: any }) => {
      //     ele.innerHTML = String(state.value);
      //   });
      requestAnimationFrame(() => {
        // console.log("html");
        ele.innerHTML = String(html.value);
      });
    } else {
      throw TypeError("invalid html");
    }
  },
  text(ele: Element, text: string | Primitivestate, vdom: any) {
    // ele.textContent = text;
    // console.log(ele.outerHTML);
    if (typeof text == "string") {
      requestAnimationFrame(() => {
        ele.textContent = text;
        //   console.log(ele.outerHTML);
      });
    } else if (text instanceof Primitivestate) {
      //   const primitivestate = text;
      watch(text, (state: { value: any }) => {
        ele.textContent = String(state.value);
      });
      //   primitivestate[subscribesymbol]((state: { value: any }) => {
      //     ele.textContent = String(state.value);
      //   });
      requestAnimationFrame(() => {
        // console.log("text");
        ele.textContent = String(text.value);
      });
    } else {
      throw TypeError("invalid text");
    }
  }
};