import { VaildVDom } from "./conditon";
import ReactiveState from "./reactivestate";
import { Vdomchildren } from "./virtualdom";

export interface Class extends HTMLElement {
  new (): HTMLElement;
  //   new (propsjson?: object, children?: any[] /* , options?: any */): HTMLElement;
  prototype: HTMLElement;
  defaultProps?: { [key: string]: any };
  css?: string;
}
export interface Custom {
  (
    props?: { [key: string]: ReactiveState<any> },
    children?: Vdomchildren
  ): VaildVDom;
  defaultProps?: { [key: string]: any };
  css?: string;
}
