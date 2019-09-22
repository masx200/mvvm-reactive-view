import "./CustomElementRegistry";
import { isobject, isfunction } from "./util";
if (
  !isfunction(HTMLElement) ||
  //   typeof HTMLElement !== "function" ||
  !isfunction(Proxy) ||
  //   typeof Proxy !== "function" ||
  !isobject(customElements) ||
  //   typeof customElements !== "object" ||
  !isfunction(CustomElementRegistry)
  //||
  //   typeof CustomElementRegistry !== "function"
) {
  throw new TypeError(" browser not supported !");
}

//请自行使用babel-preset-env和core-js 3
//import "./Object-fromEntries";
// import "./setImmediate";
//import "./array-prototype-flat";
import "./input-textarea-value-directive-Bidirectional-binding";

import html from "./html";
import createElement from "./createelement";
export { html };
export { createElement, createElement as h };
import createApp from "./createApp";
export { createApp };
import createRef from "./createref";
export { createRef };
import createState from "./createstate";
export { createState };
import { watch } from "./watch";
export { watch };
import directives from "./extend-directive";

export { directives };
//export { RandomDefine };
export const Fragment = "";
import condition from "./conditon";
export { condition };
