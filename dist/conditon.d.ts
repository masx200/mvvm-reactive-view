import ReactiveState from "./reactivestate";
import Virtualdom from "./virtualdom";
export declare type VaildVDom = Virtualdom<any> | string | number | Array<Virtualdom<any> | string | number | ReactiveState<any>> | ReactiveState<any>;
export declare const invalid_ReactiveState = "invalid ReactiveState";
export default function (conditon: ReactiveState<any> | boolean, iftrue?: VaildVDom, iffalse?: VaildVDom): Virtualdom<Function>;
