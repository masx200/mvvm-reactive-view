import { innerstatesymbol, innerwatchrecords } from "./createComponent";
import { getdomchildren } from "./dom";
import { readdlisteners, removelisteners } from "./handle-onevent";
import { isNode } from "./MountElement";
import ReactiveState, {
  addonelistner,
  callbackmap,
  removeonelistner,
  dispatchsymbol
} from "./reactivestate";
import { get, has } from "./reflect";
import { bindstatesymbol } from "./render-vdom-to-real";
import { isArray } from "./util";
import { rewatch /* , unwatch */, unwatch } from "./watch";

export function onmounted(ele: Element | Node | Array<Node>) {
  if (isArray(ele)) {
    ele.forEach(e => {
      onmounted(e);
    });
  } else if (
    isNode(ele)
    //   ele instanceof Node
  ) {
    // if (has(ele, eventlistenerssymbol)) {
    readdlisteners(ele);
    // }
    //全局共享状态
    if (
      has(ele, bindstatesymbol)
      // ele[bindstatesymbol]
    ) {
      (get(ele, bindstatesymbol) as ReactiveState<any>[])

        /*  ele[bindstatesymbol] */
        .forEach((state: ReactiveState<any>) => {
          rewatch(state);

          /* 当组件挂载时把状态跟dom元素同步一次 */
          state[dispatchsymbol]();
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
    /* 记录组件中使用的watch的state和callback,
组件卸载时removeeventlistener,
组件挂载时addeventlistener
*/
    if (has(ele, innerwatchrecords)) {
      const watchrecords = get(ele, innerwatchrecords) as [
        ReactiveState<any>,
        Function
      ][];
      watchrecords.forEach(([state, callback]) => {
        const eventlistener = state[callbackmap].get(callback);
        if (!eventlistener) {
          throw new Error();
        }
        state[addonelistner](eventlistener);
      });
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
  } else if (
    isNode(ele)
    //   ele instanceof Node
  ) {
    // if (
    //   has(ele, eventlistenerssymbol)
    //   // ele[eventlistenerssymbol]
    // ) {
    removelisteners(ele);
    // }
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
    if (has(ele, innerwatchrecords)) {
      const watchrecords = get(ele, innerwatchrecords) as [
        ReactiveState<any>,
        Function
      ][];
      watchrecords.forEach(([state, callback]) => {
        const eventlistener = state[callbackmap].get(callback);
        if (!eventlistener) {
          throw new Error();
        }
        state[removeonelistner](eventlistener);
      });
    }
    onunmounted(getdomchildren(ele));
  }
}
