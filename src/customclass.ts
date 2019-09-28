import Virtualdom from "./virtualdom";
import ReactiveState from "./primitivestate";

export interface Class {
  new (propsjson?: object, children?: any[] /* , options?: any */): HTMLElement;
  prototype: HTMLElement;
  defaultProps?: object;
  css?: string;
}
export interface Custom {
  (props?: object, children?: Array<any>):
    | Virtualdom
    | string
    | ReactiveState
    | number
    | Array<Virtualdom | ReactiveState | string | number>;
  defaultProps?: object;
  css?: string;
}
