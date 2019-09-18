if (
  typeof HTMLElement !== "function" ||
  typeof Proxy !== "function" ||
  typeof customElements !== "object" ||
  typeof CustomElementRegistry !== "function"
) {
  throw new TypeError(" browser not supported !");
}

import "./Object-fromEntries";
// import "./setImmediate";
import "./array-prototype-flat";
import "./input-textarea-value-directive-Bidirectional-binding";

import RandomDefineCustomElement from "./CustomElementRegistry";
import html from "./html";
import h from "./createelement";
export { html };
export { h as createElemet, h };
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
export { RandomDefineCustomElement };
