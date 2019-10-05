export const Fragment = "";
import render from "./rendervdomtoreal";
export{render}
// import { isobject, isfunction } from "./util";
import "./assetbrowser";
import computed from "./computed";
import condition from "./conditon";
import { useMounted, useUnMounted } from "./context-mounted-unmounted-";
import MountElement from "./createApp";
import { createComponent } from "./createComponent";
import createElement from "./createelement";
import createRef from "./createref";
import createState from "./createstate";
import "./CustomElementRegistry";
import directives from "./extend-directive";
import html from "./html";
//请自行使用babel-preset-env和core-js 3
//import "./Object-fromEntries";
// import "./setImmediate";
//import "./array-prototype-flat";
import "./input-textarea-value-directive-Bidirectional-binding";
import { watch } from "./watch";
export { computed };
export { useMounted, useUnMounted };
export { createComponent };
export { html };
export { createElement, createElement as h };
export { MountElement };
export { createRef };
export { createState };
export { watch };
export { directives };
export { condition };



