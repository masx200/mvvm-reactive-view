import { Htmlelementconstructor } from "./createComponent";
import ReactiveState from "../Reactivity/ReactiveState";
import Virtualdom, { Vdomchildren } from "../CreateElement/VirtualElement";
export declare type VaildVDom = Virtualdom<any> | string | number | Vdomchildren | ReactiveState<any>;
export declare const invalid_ReactiveState = "invalid ReactiveState";
export default function (conditon: ReactiveState<any> | boolean, iftrue?: VaildVDom, iffalse?: VaildVDom): Virtualdom<Htmlelementconstructor>;
