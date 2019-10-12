import "./assetbrowser";
import computed from "./computed";
import condition from "./conditon";
import { useMounted, useUnMounted } from "./context-mounted-unmounted";
import { createComponent } from "./createComponent";
import createElement from "./createelement";
import createRef from "./createref";
import createState from "./createstate";
import "./CustomElementRegistry";
import extendDirectives from "./extend-directive";
import html from "./html";

import "./model-input-textarea-value-directive-binding";
import MountElement from "./MountElement";
import render from "./render-vdom-to-real";
import { watch } from "./watch";
export { render };
export { computed };
export { useMounted, useUnMounted };
export { createComponent };
export { html };
export { createElement, createElement as h };
export { MountElement };
export { createRef };
export { createState };
export { watch };
export { extendDirectives };
export { condition };

//请自行使用babel-preset-env和core-js 3
//import "./Object-fromEntries";
// import "./setImmediate";
//import "./array-prototype-flat";
// export const Fragment = "";
// import { isobject, isfunction } from "./util";
