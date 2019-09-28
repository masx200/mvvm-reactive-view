import ReactiveState from "./primitivestate";
import {
  eventlistenerssymbol,
  removelisteners,
  readdlisteners
} from "./onevent";
import { bindstatesymbol } from "./rendervdomtoreal";
import { rewatch /* , unwatch */, unwatch } from "./watch";
import { isArray } from "./util";
import { getdomchildren } from "./dom";
import { innerstatesymbol } from "./createComponent";

export function onmounted(ele: Element | Node | Array<Node>) {
  if (isArray(ele)) {
    ele.forEach(e => {
      onmounted(e);
    });
  } else if (ele instanceof Node) {
    if (ele[eventlistenerssymbol]) {
      readdlisteners(ele);
    }
    //全局共享状态
    if (ele[bindstatesymbol]) {
      ele[bindstatesymbol].forEach((state: ReactiveState) => {
        rewatch(state);
      });

      if (ele[innerstatesymbol]) {
        ele[innerstatesymbol].forEach((state: ReactiveState) => {
          rewatch(state);
        });
      }
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
    /* 组件卸载时unwatch组件内部的 ReactiveState*/
    if (ele[innerstatesymbol]) {
      ele[innerstatesymbol].forEach((state: ReactiveState) => {
        unwatch(state);
      });
    }
    onunmounted(getdomchildren(ele));
  }
}
