export declare let StateSet: Set<ReactiveState<any>>;
export declare let watchrecord: [ReactiveState<any>, Function][];
import ReactiveState from "../Reactivity/reactivestate.js";
export declare function getwatchrecords(): [ReactiveState<any>, Function][];
export declare const invalid_Function = "invalid Function";
export declare const errormessage =
    "invalid useMounted or useUnMounted out of createComponent";
export declare let ctxopen: boolean;
export declare function getstates(): ReactiveState<any>[];
export declare function openctx(): void;
export declare function closectx(): void;
export declare const mountedctx: {
    add: (fun: () => void) => void;
    getall: () => (() => void)[];
    clear: () => void;
};
export declare const unmountedctx: {
    add: (fun: () => void) => void;
    getall: () => (() => void)[];
    clear: () => void;
};
export declare const updatedctx: {
    add: (fun: () => void) => void;
    getall: () => (() => void)[];
    clear: () => void;
};
export declare const createdctx: {
    add: (fun: () => void) => void;
    getall: () => (() => void)[];
    clear: () => void;
};
//# sourceMappingURL=Component-context.d.ts.map
