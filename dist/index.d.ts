interface Htmlelementconstructor {
    new (): HTMLElement;
    prototype: HTMLElement;
    defaultProps?: Record<string, any>;
    css?: string;
}
declare const createComponent: (custfun: Htmlelementconstructor | Custom) => Htmlelementconstructor;
declare class ObserverTarget {
    Listeners: Set<Listener>;
    addListener(listener: Listener): void;
    dispatch(): void;
    removeListener(listener: Listener): void;
}
interface Listener {
    (): any;
}
type Primitivetype = string | number | boolean | undefined | bigint;
type CancelWatchfun = () => void;
type UnwrapedState = any;
interface gettercallback {
    (...args: UnwrapedState[]): any;
}
declare function watch<T extends UnwrapedState>(state: ReactiveState<T> | Array<ReactiveState<T>>, callback: gettercallback): CancelWatchfun;
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
declare class ReactiveState<T extends UnwrapedState> {
    value: T extends Array<any> ? Array<any> : T extends Function ? Function : T extends Primitivetype ? Primitivetype : object;
    readonly [Symbol.toStringTag] = "ReactiveState";
    constructor(init?: T);
    [debouncedispatch]: () => void;
    [removeallistenerssymbol](): void;
    [removeonelistner](callback: Listener): void;
    [addonelistner](callback: Listener): void;
    [addallistenerssymbol](): void;
    [Targetsymbol]: ObserverTarget;
    [memlisteners]: Set<Listener>;
    valueOf: () => T extends any[] ? any[] : T extends Function ? Function : T extends Primitivetype ? Primitivetype : object;
    toString(): string;
    [dispatchsymbol](): void;
    [subscribesymbol](eventlistener: Listener): void;
    [cancelsubscribe](eventlistener: Listener): void;
    [Symbol.toPrimitive](): string | undefined | Primitivetype;
}
type VaildVDom = Virtualdom<any> | string | number | Vdomchildren | ReactiveState<any>;
interface Custom {
    (props?: Record<string, ReactiveState<any>>, children?: Vdomchildren): VaildVDom;
    defaultProps?: Record<string, any>;
    css?: string;
}
type styleprop = string | object | ReactiveState<string> | ReactiveState<object>;
type classprop = string | Set<string> | Array<string> | ReactiveState<string | Set<string> | Array<string>>;
interface ElementAttrs {
    style?: styleprop;
    class?: classprop;
    [key: string]: any;
}
declare function h<T extends Htmlelementconstructor | string | Custom>(type: T, propsorchildren?: Vdomchildren, ...children: Vdomchildren): Virtualdom<T>;
declare function h<T extends Vdomchildren>(type: "", propsorchildren?: T, ...children: T): T;
declare function h<T extends Vdomchildren>(type: "", props?: ElementAttrs, ...children: T): T;
declare function h<T extends Htmlelementconstructor | string | Custom>(type: T, props?: ElementAttrs, ...children: Vdomchildren): Virtualdom<T>;
type Vdomchildren = Array<VaildVDom>;
interface Virtualdom<T extends Htmlelementconstructor | string | Function> {
    readonly [Symbol.toStringTag]: "VirtualElement";
    readonly element: Element[];
    readonly type: T;
    readonly props: ElementAttrs;
    readonly children: Vdomchildren;
    readonly directives: Record<string, any>;
    readonly onevent: Record<string, Array<EventListener>>;
    readonly bindattr: Record<string, ReactiveState<any>>;
}
declare const Condition: (conditon: boolean | ReactiveState<boolean>, iftrue?: string | Virtualdom<any> | undefined, iffalse?: string | Virtualdom<any> | undefined) => Virtualdom<Htmlelementconstructor>;
declare function Switchable(funstate: ReactiveState<Htmlelementconstructor | Custom>): Virtualdom<Htmlelementconstructor>;
declare const computed: <T extends any>(state: ReactiveState<T> | ReactiveState<T>[], callback: gettercallback, setter?: SetterFun | undefined) => ReactiveState<any>;
type SetterFun = (v: any) => void;
declare function useMounted(fun: Function): void;
declare function useUnMounted(fun: Function): void;
interface Ref<T = any | undefined> {
    value: T | undefined;
}
declare function createRef<T = any | undefined>(value?: T): Ref<T>;
declare function createState<T extends UnwrapedState>(init: ReactiveState<T>): ReactiveState<T>;
declare function createState<T extends UnwrapedState>(init: Exclude<T, ReactiveState<any>> | undefined): ReactiveState<T>;
interface Extendfun {
    (element: Element, vdom: Virtualdom<any>, value: any): void;
}
declare function extenddirectives(name: string, fun: Extendfun): void;
declare const Directives: typeof extenddirectives;
declare function html(...args: any[]): Virtualdom<any> | Vdomchildren | string | number | ReactiveState<any>;
declare function MountElement<T extends Element>(vdom: VaildVDom | Node | Element | Array<Node | Element>, container: T): T;
declare function render(vdom: Virtualdom<any> | string, namespace?: string): Node;
declare function render(vdom: Virtualdom<string | Function>, namespace?: string): Element;
declare function render(vdom: Virtualdom<"script" | "" | "html">, namespace?: string): Node;
declare function render(vdom: Vdomchildren, namespace?: string): Array<Node | Element>;
declare function render(vdom: string | ReactiveState<any> | number, namespace?: string): Node;
declare function render(vdom: Array<Virtualdom<any>>, namespace?: string): Array<Element>;
declare function render(vdom: Array<string | ReactiveState<any> | number>, namespace?: string): Array<Node>;
export { render, computed, useMounted, useUnMounted, createComponent, html, h, h as createElement, MountElement, createRef, createState, watch, Directives, Condition, Switchable };
