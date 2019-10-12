import { VaildVDom } from "./conditon";
import ReactiveState from "./reactivestate";
import { Vdomchildren } from "./VirtualElement";
export interface Class {
    new (): HTMLElement;
    prototype: HTMLElement;
    defaultProps?: Record<string, any>;
    css?: string;
}
export interface Custom {
    (props?: Readonly<Record<string, Readonly<ReactiveState<any>>>>, children?: Vdomchildren): VaildVDom;
    defaultProps?: Record<string, any>;
    css?: string;
}
