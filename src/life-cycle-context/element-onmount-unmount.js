import {
    innerstatesymbol,
    innerwatchrecords
} from "../AttributeClass/createComponent";
import { isNode } from "../MountElement/isNodeArray";
import {
    addonelistner,
    dispatchsymbol,
    removeonelistner
} from "../Reactivity/reactivestate.js";
import { rewatch } from "../Reactivity/rewatch";
import { unwatch } from "../Reactivity/unwatch";
import {
    readdlisteners,
    removelisteners
} from "../RenderVirtual/handle-onevent";
import { bindstatesymbol } from "../RenderVirtual/render-vdom-to-real";
import { getchildNodes } from "../UtilTools/dom";
import { get, has } from "../UtilTools/reflect";
import { isArray } from "../UtilTools/util";
export function onmounted(ele) {
    if (isArray(ele)) {
        ele.forEach((e) => {
            onmounted(e);
        });
    } else if (isNode(ele)) {
        readdlisteners(ele);
        if (has(ele, bindstatesymbol)) {
            get(ele, bindstatesymbol).forEach((state) => {
                rewatch(state);
                state[dispatchsymbol]();
            });
        }
        if (has(ele, innerstatesymbol)) {
            get(ele, innerstatesymbol).forEach((state) => {
                rewatch(state);
            });
        }
        if (has(ele, innerwatchrecords)) {
            const watchrecords = get(ele, innerwatchrecords);
            watchrecords.forEach(([state, eventlistener]) => {
                if (eventlistener) {
                    state[addonelistner](eventlistener);
                }
            });
        }
        onmounted(getchildNodes(ele));
    }
}
export function onunmounted(ele) {
    if (isArray(ele)) {
        ele.forEach((e) => {
            onunmounted(e);
        });
    } else if (isNode(ele)) {
        removelisteners(ele);
        if (has(ele, innerstatesymbol)) {
            get(ele, innerstatesymbol).forEach((state) => {
                unwatch(state);
            });
        }
        if (has(ele, innerwatchrecords)) {
            const watchrecords = get(ele, innerwatchrecords);
            watchrecords.forEach(([state, eventlistener]) => {
                if (eventlistener) {
                    state[removeonelistner](eventlistener);
                }
            });
        }
        onunmounted(getchildNodes(ele));
    }
}
//# sourceMappingURL=element-onmount-unmount.js.map
