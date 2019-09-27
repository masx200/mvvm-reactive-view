import ReactiveState from "./primitivestate";
import {
  eventlistenerssymbol,
  removelisteners,
  readdlisteners
} from "./onevent";
import { bindstatesymbol } from "./rendervdomtoreal";
import { rewatch, unwatch } from "./watch";
import { isArray } from "./util";
import { getdomchildren } from "./dom";

export function onmounted(ele: Element | Node | Array<Node>) {
  if (isArray(ele)) {
    ele.forEach(e => {
      onmounted(e);
    });
  } else if (ele instanceof Node) {
    if (ele[eventlistenerssymbol]) {
      readdlisteners(ele);
    }
    if (ele[bindstatesymbol]) {
      ele[bindstatesymbol].forEach((state: ReactiveState) => {
        rewatch(state);
      });

      // readdlisteners(ele);
    }
    onmounted(getdomchildren(ele));
  }

  //
}
export function onunmounted(ele: Element | Node | Array<Node>) {
  if (isArray(ele)) {
    ele.forEach(e => {
      onunmounted(e);
    });
  } else if (ele instanceof Node) {
    if (ele[eventlistenerssymbol]) {
      removelisteners(ele);
    }
    /*   if (ele[bindstatesymbol]) {
      ele[bindstatesymbol].forEach((state: ReactiveState) => {
        unwatch(state);
      });
 */
    // readdlisteners(ele);
    // }
    //
    onunmounted(getdomchildren(ele));
  }
}
