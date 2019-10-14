import { VaildVDom } from "./conditon";
import { Htmlelementconstructor } from "./createComponent";
import ReactiveState from "./reactivestate";
import { Vdomchildren } from "./VirtualElement";
export { Htmlelementconstructor as Class };

// /* export interface Class {
//   new (): HTMLElement;
//   //   new (propsjson?: object, children?: any[] /* , options?: any */): HTMLElement;
//   prototype: HTMLElement;
//   defaultProps?: Record<string, any>;
//   css?: string;
// } */
export interface Custom {
  (
    props?: Record<string, ReactiveState<any>>,
    //  { [key: string]: ReactiveState<any> },
    children?: Vdomchildren
  ): VaildVDom;
  defaultProps?: Record<string, any>;
  css?: string;
}
