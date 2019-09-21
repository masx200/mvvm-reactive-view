import ReactiveState from "./primitivestate";
import {
  eventlistenerssymbol,
  removelisteners,
  readdlisteners
} from "./onevent";
import { bindstatesymbol } from "./rendervdomtoreal";
import { rewatch, unwatch } from "./watch";

export function onmounted(ele: Element) {
  if (ele[eventlistenerssymbol]) {
    readdlisteners(ele);
  }
  if (ele[bindstatesymbol]) {
    ele[bindstatesymbol].forEach((state: ReactiveState) => {
      rewatch(state);
    });

    // readdlisteners(ele);
  }
  //
}
export function onunmounted(ele: Element) {
  if (ele[eventlistenerssymbol]) {
    removelisteners(ele);
  }
  if (ele[bindstatesymbol]) {
    ele[bindstatesymbol].forEach((state: ReactiveState) => {
      unwatch(state);
    });

    // readdlisteners(ele);
  }
  //
}
