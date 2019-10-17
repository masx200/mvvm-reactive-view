import { Htmlelementconstructor } from "./createComponent";
import { CallbackReactiveState } from "./watch";

export const cached_callback_eventlistner = new Map<Function, EventListener>();
export const cached_create_componet = new Map<
  Function,
  Htmlelementconstructor
>();
export const cached_callback_debounced_watchs = new Map<
  CallbackReactiveState,
  Function
>();
