// import { VaildVDom } from "../AttributeClass/conditon";
import { Htmlelementconstructor } from "../AttributeClass/createComponent";
import ReactiveState from "../Reactivity/ReactiveState";
import { Vdomchildren } from "../CreateElement/VirtualElement";
import { VaildVDom } from "../CreateElement/isvalidvdom";
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
