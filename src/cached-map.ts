import { Htmlelementconstructor } from "./createComponent";

export const cached_callback_eventlistner = new Map<Function, EventListener>();
export const cached_create_componet = new Map<
  Function,
  Htmlelementconstructor
>();
