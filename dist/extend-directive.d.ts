import Virtualdom from "./virtualdom";
import ReactiveState from "./reactivestate";
export interface Extendfun {
    (element: Element, value: any | ReactiveState<any>, vdom: Virtualdom<any>): void;
}
export interface ExtendOptions {
    [s: string]: Extendfun;
}
export default function extenddirectives(options?: ExtendOptions): ExtendOptions;
