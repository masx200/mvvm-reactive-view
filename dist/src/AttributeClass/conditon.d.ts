import { VaildVDom } from "../CreateElement/isvalidvdom";
import Virtualdom from "../CreateElement/VirtualElement";
import ReactiveState from "../Reactivity/ReactiveState";
import { Htmlelementconstructor } from "./createComponent";
export declare const invalid_ReactiveState = "invalid ReactiveState";
export default function (conditon: ReactiveState<boolean> | boolean, iftrue?: VaildVDom, iffalse?: VaildVDom): Virtualdom<Htmlelementconstructor>;
