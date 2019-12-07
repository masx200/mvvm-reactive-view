import event_target from "event-target-shim/dist/event-target-shim";
(() => {
  try {
    new EventTarget();
  } catch (e) {
    // Reflect.set()
    window.EventTarget = undefined;
  }
  //   if ("function" != typeof EventTarget) {
  (() => {
    if ("function" != typeof window.EventTarget) {
      window.EventTarget = event_target;
      // Reflect.set(window, "EventTarget", event_target);
      //   window.EventTarget = (event_target as unknown) as EventTarget;
    }
  })();
  //   }
})();
