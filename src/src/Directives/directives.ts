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
    } else if (isobject(ref)) {
      set(ref as object, "value", ele);
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

    /*  if (typeof html == "string") {
          requestAnimationFrame(() => {
            setelehtml(ele, html);
    
            /* ele.innerHTML = html;*/

    /*     });
        } else if (html instanceof ReactiveState) {
          
          watch(html, (state: { value: any }) => {
            /*ele.innerHTML = String(state);*/
    /*
            setelehtml(ele, String(state));
          });
          
          
          
          requestAnimationFrame(() => {
            
            /*  ele.innerHTML = String(html);*/
    /*
      
     
      
    
    
      
     
    
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
    
      
        
        if (typeof text == "string") {
          requestAnimationFrame(() => {
            seteletext(ele, text);
            /*    ele.textContent = text;*/
    /*      
          });
        } else if (text instanceof ReactiveState) {
          
          watch(text, (state: { value: any }) => {
            seteletext(ele, String(state));
    
            /* ele.textContent = String(state);*/
    /*   });
          
          
          
          requestAnimationFrame(() => {
            
            seteletext(ele, String(text));
    
            /*  ele.textContent = String(text);*/
    /*    });
       
      
     
    
    */
  }
});

export default directive;
