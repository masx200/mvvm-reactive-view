if (
  typeof HTMLElement !== "function" ||
  typeof Proxy !== "function" ||
  typeof customElements !== "object" ||
  typeof CustomElementRegistry !== "function"
) {
  throw new TypeError(" browser not supported !");
}

//请自行使用babel-preset-env和core-js 3
//import "./Object-fromEntries";
// import "./setImmediate";
//import "./array-prototype-flat";
import "./input-textarea-value-directive-Bidirectional-binding";

import "./CustomElementRegistry";
import html from "./html";
import h from "./createelement";
export { html };
export { h as createElement, h };
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
