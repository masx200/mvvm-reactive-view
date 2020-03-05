import { Htmlelementconstructor } from "../AttributeClass/createComponent";
import { gettercallback } from "../Reactivity/watch";
import { Listener } from "../Reactivity/custom-observer-target";

export const cached_create_componet = new WeakMap<
    Function,
    Htmlelementconstructor
>();
export const cached_callback_debounced_watchs = new WeakMap<
    gettercallback,
    Listener
>();
