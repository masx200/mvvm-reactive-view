import {
  innerstatesymbol,
  innerwatchrecords
} from "../AttributeClass/createComponent";
import { cached_callback_eventlistner } from "../cached-map";
import { isNode } from "../MountElement/isNodeArray";
// import { isNode } from "./MountElement/MountElement";
import ReactiveState, {
  addonelistner,
  dispatchsymbol,
  //   callbackmap,
  removeonelistner
} from "../Reactivity/ReactiveState";
import { rewatch /* , unwatch */, unwatch } from "../Reactivity/watch";
import {
  readdlisteners,
  removelisteners
} from "../RenderVirtual/handle-onevent";
import { bindstatesymbol } from "../RenderVirtual/render-vdom-to-real";
import { getchildNodes } from "../UtilTools/dom";
import { get, has } from "../UtilTools/reflect";
import { isArray } from "../UtilTools/util";

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
        const eventlistener = cached_callback_eventlistner.get(callback);
        /*   if (!eventlistener) {
          throw new Error();
        } */
        if (eventlistener) {
          state[addonelistner](eventlistener);
        }
      });
    }
    onmounted(getchildNodes(ele));
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
        const eventlistener = cached_callback_eventlistner.get(callback);
        /*  if (!eventlistener) {
          throw new Error();
        } */
        if (eventlistener) {
          state[removeonelistner](eventlistener);
        }
      });
    }
    onunmounted(getchildNodes(ele));
  }
}
