import { version } from "package.json";
import "./assetbrowser";
import computed from "./computed";
import Condition from "./conditon";
import { useMounted, useUnMounted } from "./context-mounted-unmounted";
import createComponent from "./createComponent";
import h from "./createelement";
import createRef from "./createref";
import createState from "./createstate";
import "./CustomElementRegistry";
import Directives from "./extend-directive";
import html from "./html";
//请自行使用babel-preset-env和core-js 3
//import "./Object-fromEntries";
// import "./setImmediate";
//import "./array-prototype-flat";
// export const Fragment = "";
// import { isobject, isfunction } from "./util";
import ListMap from "./listmap";
import "./model-input-textarea-value-directive-binding";
import MountElement from "./MountElement";
import render from "./render-vdom-to-real";
import Switchable from "./switchable";
import watch from "./watch";

export { render };
export { computed };
export { useMounted, useUnMounted };
export { createComponent };
export { html };
export { h, h as createElement };
export { MountElement };
export { createRef };
export { createState };
export { watch };
export { Directives };
export { Condition };
export { ListMap };
export { version };
export { Switchable };
