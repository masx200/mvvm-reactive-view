import { isobject, isfunction } from "./util";
if (
  !isfunction(window.HTMLElement) ||
  //   typeof HTMLElement !== "function" ||
  !isfunction(window.Proxy) ||
  //   typeof Proxy !== "function" ||
  !isobject(window.customElements) 
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
