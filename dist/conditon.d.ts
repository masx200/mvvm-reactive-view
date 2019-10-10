import ReactiveState from "./reactivestate";
import Virtualdom, { Vdomchildren } from "./virtualdom";
import { Htmlelementconstructor } from "./createComponent";
export declare type VaildVDom = Virtualdom<any> | string | number | Vdomchildren | ReactiveState<any>;
export declare const invalid_ReactiveState = "invalid ReactiveState";
export default function (conditon: ReactiveState<any> | boolean, iftrue?: VaildVDom, iffalse?: VaildVDom): Virtualdom<Htmlelementconstructor>;
