import { Htmlelementconstructor } from "../AttributeClass/createComponent";
import { Listener } from "../Reactivity/custom-observer-target";
import { gettercallback } from "../Reactivity/gettercallback";

export const cached_create_componet = new WeakMap<
    Function,
    Htmlelementconstructor
>();
export const cached_callback_debounced_watchs = new WeakMap<
    gettercallback<void, any[]>,
    Listener
>();
