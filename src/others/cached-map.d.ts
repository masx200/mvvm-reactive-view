import { Htmlelementconstructor } from "../AttributeClass/createComponent";
import { Listener } from "../Reactivity/custom-observer-target";
import { gettercallback } from "../Reactivity/gettercallback";
export declare const cached_create_componet: WeakMap<
    Function,
    Htmlelementconstructor
>;
export declare const cached_callback_debounced_watchs: WeakMap<
    gettercallback<void, any[]>,
    Listener
>;
//# sourceMappingURL=cached-map.d.ts.map
