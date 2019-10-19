import { version } from "package.json";
import "./assetbrowser";
import Condition from "./AttributeClass/conditon";
import createComponent from "./AttributeClass/createComponent";
//请自行使用babel-preset-env和core-js 3
//import "./Object-fromEntries";
// import "./setImmediate";
//import "./array-prototype-flat";
// export const Fragment = "";
// import { isobject, isfunction } from "./UtilTools/util";
import ListMap from "./AttributeClass/list-map";
import Switchable from "./AttributeClass/switchable";
import computed from "./Reactivity/computed";
import {
  useMounted,
  useUnMounted
} from "./mounted-unmounted/Component-context";
import h from "./CreateElement/create-element";
import createRef from "./createref";
import createState from "./Reactivity/create-state";
import "./CustomClass/CustomElementRegistry";
import Directives from "./Directives/extend-directive";
import html from "./CreateElement/html";
import "./Directives/model-input-textarea-value-directive-binding";
import MountElement from "./MountElement/MountElement";
import render from "./RenderVirtual/render-vdom-to-real";
import watch from "./Reactivity/watch";

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
