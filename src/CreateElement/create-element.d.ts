declare type CSSProperties = CSS.Properties<string | number>;
import CSS from "csstype/index";
import { Htmlelementconstructor } from "../AttributeClass/createComponent";
import { Custom } from "../CustomClass/customclass";
import ReactiveState from "../Reactivity/reactivestate.js";
import Virtualdom, { Vdomchildren } from "./VirtualElement";
export declare type styleprop =
    | CSSProperties
    | string
    | Record<string, string>
    | ReactiveState<CSSProperties>
    | ReactiveState<string>
    | ReactiveState<Record<string, string>>;
export declare type classprop =
    | string
    | Set<string>
    | Array<string>
    | ReactiveState<string | Set<string> | Array<string>>;
export interface ATTRFOR<T> extends Array<any> {
    0: ReactiveState<Array<T>>;
    1: (v: ReactiveState<T>, i: number) => Virtualdom<any>;
}
export interface ElementAttributes {
    style?: styleprop;
    class?: classprop;
    [key: string]: any;
    $ref?:
        | {
              value?: Element;
          }
        | ((value: Element) => void);
    $html?: string | ReactiveState<string>;
    $text?: string | ReactiveState<string>;
    $value?: ReactiveState<string>;
    $checked?: ReactiveState<boolean>;
    $mounted?: () => void;
    $unmounted?: () => void;
    $updated?: () => void;
    $created?: () => void;
    $for?: ATTRFOR<any>;
}
declare function h<T extends Htmlelementconstructor | string | Custom>(
    type: T,
    propsorchildren?: Vdomchildren,
    ...children: Vdomchildren
): Virtualdom<T>;
declare function h<T extends Vdomchildren>(
    type: "",
    propsorchildren?: T,
    ...children: T
): T;
declare function h<T extends Vdomchildren>(
    type: "",
    props?: ElementAttributes,
    ...children: T
): T;
declare function h<T extends Htmlelementconstructor | string | Custom>(
    type: T,
    props?: ElementAttributes,
    ...children: Vdomchildren
): Virtualdom<T>;
export default h;
export { h };
//# sourceMappingURL=create-element.d.ts.map
