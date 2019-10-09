import { VaildVDom } from "./conditon";
import { Vdomchildren } from "./virtualdom";
import { ElementAttrs } from "./createelement";

export interface Class extends HTMLElement {
  new (...args: any[]): HTMLElement;
  //   new (propsjson?: object, children?: any[] /* , options?: any */): HTMLElement;
  prototype: HTMLElement;
  defaultProps?: { [key: string]: any };
  css?: string;
}
export interface Custom {
  (props?: ElementAttrs, children?: Vdomchildren): VaildVDom;
  defaultProps?: { [key: string]: any };
  css?: string;
}
