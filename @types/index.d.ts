import CSS from "csstype/index";
interface Htmlelementconstructor {
    new (): HTMLElement;
    prototype: HTMLElement;
    defaultProps?: Record<string, any>;
    css?: string;
}
declare const createComponent: (custfun: Custom, options?: {
    defaultProps?: Record<string, any> | undefined;
    css?: string | undefined;
} | undefined) => Htmlelementconstructor;
type Primitivetype = string | number | boolean | undefined | bigint;
interface Listener {
    (): void;
}
declare const addonelistner: unique symbol;
declare const removeonelistner: unique symbol;
declare const cancelsubscribe: unique symbol;
declare const debouncedispatch: unique symbol;
declare const Targetsymbol: unique symbol;
declare const memlisteners: unique symbol;
declare const dispatchsymbol: unique symbol;
declare const subscribesymbol: unique symbol;
declare const removeallistenerssymbol: unique symbol;
declare const addallistenerssymbol: unique symbol;
declare const tagtypesym: unique symbol;
declare class ReactiveState<T> {
    constructor(init: {
        value: T;
    });
    constructor(init: {
        get: () => T;
        set?: (v: T) => void;
    });
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
type VaildVDom = Virtualdom<any> | string | number | Vdomchildren | ReactiveState<any>;
interface Custom {
    (props: Record<string, ReactiveState<string>>, children: Vdomchildren): VaildVDom;
    defaultProps?: Record<string, string>;
    css?: string;
}
type CSSProperties = CSS.Properties<string | number>;
type styleprop = CSSProperties | string | Record<string, string> | ReactiveState<CSSProperties> | ReactiveState<string> | ReactiveState<Record<string, string>>;
type classprop = string | Set<string> | Array<string> | ReactiveState<string | Set<string> | Array<string>>;
interface attrfor<T> extends Array<any> {
    0: ReactiveState<Array<T>>;
    1: (v: ReactiveState<T>, i: number) => Virtualdom<any>;
}
interface ElementAttributes {
    style?: styleprop;
    class?: classprop;
    [key: string]: any;
    $ref?: {
        value?: Element;
    } | ((value: Element) => void);
    $html?: string | ReactiveState<string>;
    $text?: string | ReactiveState<string>;
    $value?: ReactiveState<string>;
    $checked?: ReactiveState<boolean>;
    $mounted?: () => void;
    $unmounted?: () => void;
    $updated?: () => void;
    $created?: () => void;
    $for?: attrfor<any>;
}
declare function h<T extends Htmlelementconstructor | string | Custom>(type: T, propsorchildren?: Vdomchildren, ...children: Vdomchildren): Virtualdom<T>;
declare function h<T extends Vdomchildren>(type: "", propsorchildren?: T, ...children: T): T;
declare function h<T extends Vdomchildren>(type: "", props?: ElementAttributes, ...children: T): T;
declare function h<T extends Htmlelementconstructor | string | Custom>(type: T, props?: ElementAttributes, ...children: Vdomchildren): Virtualdom<T>;
type Vdomchildren = Array<VaildVDom>;
interface Virtualdom<T extends Htmlelementconstructor | string | Function> {
    readonly [Symbol.toStringTag]: "VirtualElement";
    readonly type: T;
    readonly props: ElementAttributes;
    readonly children: Vdomchildren;
    readonly directives: Record<string, any>;
    readonly onevent: Record<string, Array<EventListener>>;
    readonly bindattr: Record<string, ReactiveState<any>>;
}
declare const Condition: (conditon: ReactiveState<boolean>, iftrue?: string | Virtualdom<any> | undefined, iffalse?: string | Virtualdom<any> | undefined) => Virtualdom<Htmlelementconstructor>;
declare function Switchable(funstate: ReactiveState<Htmlelementconstructor | Custom>): Virtualdom<Htmlelementconstructor>;
declare function html(...args: any[]): Virtualdom<any> | Vdomchildren | string | number | ReactiveState<any>;
interface Extendfun {
    (value: unknown, element: Element, vdom: Virtualdom<any>, onmounted: (call: () => void) => void, onunmounted: (call: () => void) => void, onupdated: (call: () => void) => void): void;
}
declare function extenddirectives(name: string, fun: Extendfun): void;
declare const Directives: typeof extenddirectives;
declare function useCreated(fun: () => void): void;
declare function useUpdated(fun: () => void): void;
declare function useMounted(fun: () => void): void;
declare function useUnMounted(fun: () => void): void;
declare function MountElement<T extends Element>(vdom: VaildVDom | Node | Element | Array<Node | Element>, container: T): T;
interface Ref<T = any | undefined> {
    value: T | undefined;
}
declare function createRef<T = any | undefined>(value?: T): Ref<T>;
interface gettercallback<T, P extends Array<any>> {
    (...args: P): T;
}
type UnWrapState<T extends ReactiveState<any>> = T extends ReactiveState<infer R> ? R : never;
type UnWrapArray<T extends Array<any>> = T extends Array<infer R> ? R : never;
declare function computed<T extends any, Y extends ReactiveState<any>>(state: Y, callback: gettercallback<T, [UnWrapState<Y>]>, setter?: SetterFun): StateType<T>;
declare function computed<T extends any, Y extends ReactiveState<any>[]>(state: Y, callback: gettercallback<T, UnWrapState<UnWrapArray<Y>>[]>, setter?: SetterFun): StateType<T>;
type SetterFun = (v: any) => void;
type GetParentType<T> = T extends Custom ? Custom : T extends Htmlelementconstructor ? Htmlelementconstructor : T extends Array<any> ? Array<any> : T extends Function ? Function : T extends string ? string : T extends number ? number : T extends boolean ? boolean : T extends void ? void : T extends symbol ? symbol : T extends bigint ? bigint : T extends object ? T : never;
type StateType<T> = ReactiveState<GetParentType<T>> & GetParentType<T>;
declare function createState<T extends Exclude<any, ReactiveState<any>>>(init: T): StateType<T>;
type CancelWatchfun = () => void;
declare function watch<T extends any, Y extends ReactiveState<T>>(state: Y, callback: gettercallback<void, [UnWrapState<Y>]>): CancelWatchfun;
declare function watch<T extends any, Y extends Array<ReactiveState<T>>>(state: Y, callback: gettercallback<void, UnWrapState<UnWrapArray<Y>>[]>): CancelWatchfun;
declare function render(vdom: Virtualdom<"">, namespace?: string): Node;
declare function render(vdom: string | ReactiveState<any> | number, namespace?: string): Node;
declare function render(vdom: Virtualdom<string | Function>, namespace?: string): Element;
declare function render(vdom: Vdomchildren, namespace?: string): Array<Node | Element>;
declare function render(vdom: Array<string | ReactiveState<any> | number | Virtualdom<"">>, namespace?: string): Array<Node>;
declare function render(vdom: Array<Virtualdom<any>>, namespace?: string): Array<Element>;
export { Custom, StateType, render, computed, useMounted, useUnMounted, createComponent, html, h, h as createElement, MountElement, createRef, createState, watch, Directives, Condition, Switchable, useUpdated, useCreated, Htmlelementconstructor, Vdomchildren, Virtualdom, Extendfun, Ref, ElementAttributes };
