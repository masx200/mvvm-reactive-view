import Virtualdom from "../CreateElement/VirtualElement";
export interface Extendfun {
    (value: any, element: Element, vdom: Virtualdom<any>): void;
}
export interface ExtendOptions {
    [s: string]: Extendfun;
}
export { extenddirectives };
export default function extenddirectives(options?: ExtendOptions): ExtendOptions;
