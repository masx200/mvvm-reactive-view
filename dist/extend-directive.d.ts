import Virtualdom from "./VirtualElement";
export interface Extendfun {
    (value: any, element: Element, vdom: Virtualdom<any>): void;
}
export interface ExtendOptions {
    [s: string]: Extendfun;
}
export default function extenddirectives(options?: ExtendOptions): ExtendOptions;
