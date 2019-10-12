import { innerstatesymbol } from "./createComponent";
import { getdomchildren } from "./dom";
import {
  eventlistenerssymbol,
  readdlisteners,
  removelisteners
} from "./onevent";
import ReactiveState from "./reactivestate";
import { bindstatesymbol } from "./rendervdomtoreal";
import { isArray } from "./util";
import { rewatch /* , unwatch */, unwatch } from "./watch";
import { isNode } from "./MountElement";
import { has, get } from "./reflect";

export function onmounted(ele: Element | Node | Array<Node>) {
  if (isArray(ele)) {
    ele.forEach(e => {
      onmounted(e);
    });
  } else if (
    isNode(ele)
    //   ele instanceof Node
  ) {
    if (has(ele, eventlistenerssymbol)) {
      readdlisteners(ele);
    }
    //全局共享状态
    if (
      has(ele, bindstatesymbol)
      // ele[bindstatesymbol]
    ) {
      get(ele, bindstatesymbol) /*  ele[bindstatesymbol] */
        .forEach((state: ReactiveState<any>) => {
          rewatch(state);
        });
    }
    if (
      has(ele, innerstatesymbol)
      //   ele[innerstatesymbol]
    ) {
      (get(ele, innerstatesymbol) as ReactiveState<any>[]).forEach(
        (state: ReactiveState<any>) => {
          rewatch(state);
        }
      );
    }
    // readdlisteners(ele);

    onmounted(getdomchildren(ele));
  }

  //
}
export function onunmounted(ele: Element | Node | Array<Node>) {
  if (isArray(ele)) {
    ele.forEach(e => {
      onunmounted(e);
    });
  } else if (
    isNode(ele)
    //   ele instanceof Node
  ) {
    if (
      has(ele, eventlistenerssymbol)
      // ele[eventlistenerssymbol]
    ) {
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
    if (
      has(ele, innerstatesymbol)
      // ele[innerstatesymbol]
    ) {
      (get(ele, innerstatesymbol) as ReactiveState<any>[]).forEach(
        (state: ReactiveState<any>) => {
          unwatch(state);
        }
      );
    }
    onunmounted(getdomchildren(ele));
  }
}
