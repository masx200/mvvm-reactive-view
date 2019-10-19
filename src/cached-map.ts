import { Htmlelementconstructor } from "./AttributeClass/createComponent";
import { CallbackReactiveState } from "./Reactivity/watch";

export const cached_callback_eventlistner = new WeakMap<
  Function,
  EventListener
>();
export const cached_create_componet = new WeakMap<
  Function,
  Htmlelementconstructor
>();
export const cached_callback_debounced_watchs = new WeakMap<
  CallbackReactiveState,
  Function
>();
