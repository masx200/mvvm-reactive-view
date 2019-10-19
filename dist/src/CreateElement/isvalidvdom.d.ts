export declare type VaildVDom = Virtualdom<any> | string | number | Vdomchildren | ReactiveState<any>;
import Virtualdom, { Vdomchildren } from "../CreateElement/VirtualElement";
import ReactiveState from "../Reactivity/ReactiveState";
export declare function isvalidvdom(v: any): v is VaildVDom;
