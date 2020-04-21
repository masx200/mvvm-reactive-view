import CSS from "csstype";
import { GetParentType, Listener } from "lib";
import Condition from "./AttributeClass/conditon";
import createComponent from "./AttributeClass/createComponent";
import Switchable from "./AttributeClass/switchable";
import h, {
    ATTRFOR,
    classprop,
    ElementAttributes,
    styleprop
} from "./CreateElement/create-element";
import html from "./CreateElement/html";
import { VaildVDom } from "./CreateElement/isvalidvdom";
import Virtualdom, { Vdomchildren } from "./CreateElement/VirtualElement";
import { Custom, Htmlelementconstructor } from "./CustomClass/customclass";
import "./CustomClass/CustomElementRegistry";
import "./Directives/built-in-directs";
import Directives, {
    extenddirectives,
    Extendfun
} from "./Directives/extend-directive";
import { useCreated } from "./life-cycle-context/use-created";
import { useUpdated } from "./life-cycle-context/use-updated";
import { useMounted } from "./life-cycle-context/useMounted";
import { useUnMounted } from "./life-cycle-context/useUnMounted";
import MountElement from "./MountElement/MountElement";
import "./others/assetbrowser";
import createRef, { Ref } from "./others/createref";
import computed, { SetterFun } from "./Reactivity/computed";
import createState, { StateType } from "./Reactivity/create-state";
import { gettercallback } from "./Reactivity/gettercallback";
import ReactiveState from "./Reactivity/reactivestate";
import { UnWrapArray } from "./Reactivity/UnWrapArray";
import { UnWrapState } from "./Reactivity/unwrapstate";
import watch, { CancelWatchfun } from "./Reactivity/watch";
import render from "./RenderVirtual/render-vdom-to-real";
import { Primitivetype } from "./UtilTools/isprimitive";
export { Custom };
export { StateType };
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
export { Switchable };
export { useUpdated, useCreated };
export { Htmlelementconstructor };
export { Vdomchildren };
export { Virtualdom };
export { Extendfun };
export { Ref };
export { ElementAttributes };
export {
    VaildVDom,
    styleprop,
    classprop,
    ATTRFOR,
    extenddirectives,
    ReactiveState,
    gettercallback,
    UnWrapState,
    SetterFun,
    UnWrapArray,
    GetParentType,
    CancelWatchfun,
    Listener,
    Primitivetype,
    CSSProperties
};
type CSSProperties = CSS.Properties<string | number>;
