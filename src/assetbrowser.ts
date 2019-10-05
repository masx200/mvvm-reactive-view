import { isobject, isfunction } from "./util";
const{HTMLElement,customElements,Proxy}=window
if (
  !isfunction(HTMLElement) ||
  //   typeof HTMLElement !== "function" ||
  !isfunction(Proxy) ||
  //   typeof Proxy !== "function" ||
  !isobject(customElements) 
/*||
  //   typeof customElements !== "object" ||
  !isfunction(window.CustomElementRegistry)
  //||
  //   typeof CustomElementRegistry !== "function"

*/
) {

console.error("Proxy,HTMLElement ,customElements ,browser not supported !")
  throw new TypeError();
}
