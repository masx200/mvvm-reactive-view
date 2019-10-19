import { Htmlelementconstructor } from "./AttributeClass/createComponent";
import { CallbackReactiveState } from "./Reactivity/watch";
export declare const cached_callback_eventlistner: WeakMap<Function, EventListener>;
export declare const cached_create_componet: WeakMap<Function, Htmlelementconstructor>;
export declare const cached_callback_debounced_watchs: WeakMap<CallbackReactiveState, Function>;
