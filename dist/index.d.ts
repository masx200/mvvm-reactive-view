import { default as CSS_2 } from "csstype/index";

declare const addallistenerssymbol: unique symbol;

declare const addonelistner: unique symbol;

export declare interface ATTRFOR<T> extends Array<any> {
    0: ReactiveState<Array<T>>;
    1: (v: ReactiveState<T>, i: number) => Virtualdom<any>;
}

declare const cancelsubscribe: unique symbol;

export declare type CancelWatchfun = () => void;

export declare type classprop =
    | string
    | Set<string>
    | Array<string>
    | ReactiveState<string | Set<string> | Array<string>>;

export declare function computed<T extends any, Y extends ReactiveState<any>>(
    state: Y,
    callback: gettercallback<T, [UnWrapState<Y>]>,
    setter?: SetterFun
): StateType<T>;

export declare function computed<T extends any, Y extends ReactiveState<any>[]>(
    state: Y,
    callback: gettercallback<T, UnWrapState<UnWrapArray<Y>>[]>,
    setter?: SetterFun
): StateType<T>;

export declare const Condition: (
    conditon: ReactiveState<boolean>,
    iftrue?: string | Virtualdom<any> | undefined,
    iffalse?: string | Virtualdom<any> | undefined
) => Virtualdom<Htmlelementconstructor>;

export declare const createComponent: (
    custfun: Custom,
    options?:
        | {
              defaultProps?: Record<string, any> | undefined;
              css?: string | undefined;
          }
        | undefined
) => Htmlelementconstructor;

export declare function createRef<T = any | undefined>(value?: T): Ref<T>;

export declare function createState<T extends Exclude<any, ReactiveState<any>>>(
    init: T
): StateType<T>;

export declare type CSSProperties = CSS_2.Properties<string | number>;

export declare interface Custom {
    (
        props: Record<string, ReactiveState<string>>,
        children: Vdomchildren
    ): VaildVDom;
    defaultProps?: Record<string, string>;
    css?: string;
}

declare const debouncedispatch: unique symbol;

export declare const Directives: typeof extenddirectives;

declare const dispatchsymbol: unique symbol;

export declare interface ElementAttributes {
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

export declare function extenddirectives(name: string, fun: Extendfun): void;

export declare interface Extendfun {
    (
        value: unknown,
        element: Element,
        vdom: Virtualdom<any>,
        onmounted: (call: () => void) => void,
        onunmounted: (call: () => void) => void,
        onupdated: (call: () => void) => void
    ): void;
}

export declare type GetParentType<T> = T extends Custom
    ? Custom
    : T extends Htmlelementconstructor
    ? Htmlelementconstructor
    : T extends Array<any>
    ? Array<any>
    : T extends Function
    ? Function
    : T extends string
    ? string
    : T extends number
    ? number
    : T extends boolean
    ? boolean
    : T extends void
    ? void
    : T extends symbol
    ? symbol
    : T extends bigint
    ? bigint
    : T extends object
    ? T
    : never;

export declare interface gettercallback<T, P extends Array<any>> {
    (...args: P): T;
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
export { h as createElement };
export { h };

export declare function html(
    ...args: any[]
): Virtualdom<any> | Vdomchildren | string | number | ReactiveState<any>;

export declare interface Htmlelementconstructor {
    new (): HTMLElement;
    prototype: HTMLElement;
    defaultProps?: Record<string, any>;
    css?: string;
}

export declare interface Listener {
    (): void;
}

declare const memlisteners: unique symbol;

export declare function MountElement<T extends Element>(
    vdom: VaildVDom | Node | Element | Array<Node | Element>,
    container: T
): T;

export declare type Primitivetype =
    | string
    | number
    | boolean
    | undefined
    | bigint;

export declare class ReactiveState<T> {
    constructor(init: { value: T });
    constructor(init: { get: () => T; set?: (v: T) => void });
    [tagtypesym]: string;
    value: T;
    readonly [Symbol.toStringTag] = "ReactiveState";
    private [debouncedispatch];
    [removeallistenerssymbol](): void;
    [removeonelistner](callback: Listener): void;
    [addonelistner](callback: Listener): void;
    [addallistenerssymbol](): void;
    private [Targetsymbol];
    private [memlisteners];
    valueOf: () => T;
    toString(): string;
    [dispatchsymbol](): void;
    [subscribesymbol](eventlistener: Listener): void;
    [cancelsubscribe](eventlistener: Listener): void;
    [Symbol.toPrimitive](): string | undefined | Primitivetype;
}

export declare interface Ref<T = any | undefined> {
    value: T | undefined;
}

declare const removeallistenerssymbol: unique symbol;

declare const removeonelistner: unique symbol;

export declare function render(vdom: Virtualdom<"">, namespace?: string): Node;

export declare function render(
    vdom: string | ReactiveState<any> | number,
    namespace?: string
): Node;

export declare function render(
    vdom: Virtualdom<string | Function>,
    namespace?: string
): Element;

export declare function render(
    vdom: Vdomchildren,
    namespace?: string
): Array<Node | Element>;

export declare function render(
    vdom: Array<string | ReactiveState<any> | number | Virtualdom<"">>,
    namespace?: string
): Array<Node>;

export declare function render(
    vdom: Array<Virtualdom<any>>,
    namespace?: string
): Array<Element>;

export declare type SetterFun = (v: any) => void;

export declare type StateType<T> = ReactiveState<GetParentType<T>> &
    GetParentType<T>;

export declare type styleprop =
    | CSSProperties
    | string
    | Record<string, string>
    | ReactiveState<CSSProperties>
    | ReactiveState<string>
    | ReactiveState<Record<string, string>>;

declare const subscribesymbol: unique symbol;

export declare function Switchable(
    funstate: ReactiveState<Htmlelementconstructor | Custom>
): Virtualdom<Htmlelementconstructor>;

declare const tagtypesym: unique symbol;

declare const Targetsymbol: unique symbol;

export declare type UnWrapArray<T extends Array<any>> = T extends Array<infer R>
    ? R
    : never;

export declare type UnWrapState<
    T extends ReactiveState<any>
> = T extends ReactiveState<infer R> ? R : never;

export declare function useCreated(fun: () => void): void;

export declare function useMounted(fun: () => void): void;

export declare function useUnMounted(fun: () => void): void;

export declare function useUpdated(fun: () => void): void;

export declare type VaildVDom =
    | Virtualdom<any>
    | string
    | number
    | Vdomchildren
    | ReactiveState<any>;

export declare type Vdomchildren = Array<VaildVDom>;

export declare interface Virtualdom<
    T extends Htmlelementconstructor | string | Function
> {
    readonly [Symbol.toStringTag]: "VirtualElement";
    readonly type: T;
    readonly props: Record<string, any>;
    readonly children: Vdomchildren;
    readonly directives: Record<string, any>;
    readonly onevent: Record<string, Array<EventListener>>;
    readonly bindattr: Record<string, ReactiveState<any>>;
}

export declare function watch<T extends any, Y extends ReactiveState<T>>(
    state: Y,
    callback: gettercallback<void, [UnWrapState<Y>]>
): CancelWatchfun;

export declare function watch<T extends any, Y extends Array<ReactiveState<T>>>(
    state: Y,
    callback: gettercallback<void, UnWrapState<UnWrapArray<Y>>[]>
): CancelWatchfun;

export {};
