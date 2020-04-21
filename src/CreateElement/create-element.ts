type CSSProperties = CSS.Properties<string | number>;

import CSS from "csstype/index";
import {
    autocreateclass,
    Htmlelementconstructor
} from "../AttributeClass/createComponent";
import { Custom } from "../CustomClass/customclass";
import ReactiveState from "../Reactivity/reactivestate.js";
import { apply } from "../UtilTools/reflect";
import {
    isarray,
    isfunction,
    isplainobject,
    isstring
} from "../UtilTools/util";
import Virtualdom, {
    createVirtualElement,
    Vdomchildren
} from "./VirtualElement";
export type styleprop =
    | CSSProperties
    | string
    | Record<string, string>
    | ReactiveState<CSSProperties>
    | ReactiveState<string>
    | ReactiveState<Record<string, string>>;
export type classprop =
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
    $ref?: { value?: Element } | ((value: Element) => void);
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

function h<T extends Htmlelementconstructor | string | Custom>(
    type: T,
    propsorchildren?: Vdomchildren,
    ...children: Vdomchildren
): Virtualdom<T>;
function h<T extends Vdomchildren>(
    type: "",
    propsorchildren?: T,
    ...children: T
): T;
function h<T extends Vdomchildren>(
    type: "",
    props?: ElementAttributes,
    ...children: T
): T;
function h<T extends Htmlelementconstructor | string | Custom>(
    type: T,
    props?: ElementAttributes,
    ...children: Vdomchildren
): Virtualdom<T>;

function h(
    type?: Htmlelementconstructor | string | Custom,
    propsorchildren?: Vdomchildren | ElementAttributes,
    ...children: Vdomchildren
) {
    if (isfunction(type)) {
        type = autocreateclass(type);
    }

    if (isarray(propsorchildren)) {
        return apply(createElement, undefined, [
            type,
            undefined,
            [...propsorchildren, ...children].flat(1 / 0)
        ]);
        /*   createElement(
      type,
      undefined,
      [...propsorchildren, ...children].flat(1 / 0)
    ); */
    } else {
        return apply(createElement, undefined, [
            type,
            propsorchildren,
            ...children
        ]);
    }
}
function createElement<T extends Vdomchildren>(
    type: "",
    props?: ElementAttributes,
    ...children: T
): T;
function createElement<T extends Function | string>(
    type: T,
    props?: ElementAttributes,
    ...children: Vdomchildren
): Virtualdom<T>;

function createElement<T extends Function | string | Htmlelementconstructor>(
    type?: T,
    props: ElementAttributes = {},
    ...children: Vdomchildren
): Virtualdom<T> | Vdomchildren {
    let typenormalized: "" | Function | string =
        isstring(type) || isfunction(type) ? type : "";
    const propsnormalized = isplainobject(props) ? props : {};
    const childrennormalized: Vdomchildren = children
        .flat(Infinity)
        .map((a) => (a === 0 ? "0" : a))
        .filter((a) => !!a);
    if (isstring(typenormalized)) {
        typenormalized = typenormalized.trim().toLowerCase();
    }

    if ("" === typenormalized) {
        return childrennormalized;
    } else {
        /* propsnormalized = Object.fromEntries(
    Object.entries(propsnormalized).map(([key, value]) => [
      key.trim().toLowerCase(),
      value
    ])
  ); */

        /* return new Virtualdom(
      typenormalized,
      propsnormalized,
      childrennormalized
    ) as Virtualdom<any>;
*/
        return apply(createVirtualElement, undefined, [
            typenormalized,
            propsnormalized,
            childrennormalized
        ]) as Virtualdom<T>;

        /*  createVirtualElement(
     
    ); */
    }
}
export default h;

export { h };
