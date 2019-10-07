import { VaildVDom } from "./conditon";

export interface Class {
  new (propsjson?: object, children?: any[] /* , options?: any */): HTMLElement;
  prototype: HTMLElement;
  defaultProps?: { [key: string]: any };
  css?: string;
}
export interface Custom {
  (props?: object, children?: Array<any>): VaildVDom;
  defaultProps?: { [key: string]: any };
  css?: string;
}
