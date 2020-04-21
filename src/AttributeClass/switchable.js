import { h } from "../CreateElement/create-element";
import { mountrealelement } from "../MountElement/mount-real-element";
import { isReactiveState } from "../Reactivity/isReactiveState";
import watch from "../Reactivity/watch";
import render from "../RenderVirtual/render-vdom-to-real";
import { setimmediate } from "../UtilTools/setimmediate";
import { isfunction } from "../UtilTools/util";
import {
    AttrChange,
    connectedCallback,
    disconnectedCallback,
    firstinstalledcallback
} from "./attr-change";
import { autocreateclass } from "./createComponent";
import { componentsymbol } from "./iscomponent";
import { readysymbol } from "./readysymbol";
import { getstatetype } from "src/Reactivity/getstatetype";
const cancel_watch_symbol = Symbol("cancel_watch");
const cached_class_element = Symbol("cached_class_element");
const switch_mount_symbol = Symbol("switch_mount");
export { Switchable };
function Switchable(funstate) {
    var _a, _b, _c;
    if (!isReactiveState(funstate)) {
        console.error(funstate);
        throw new TypeError();
    }
    if (getstatetype(funstate) !== "Function") {
        throw new TypeError();
    }
    class Switchable extends AttrChange {
        constructor() {
            super(...arguments);
            this[_a] = new WeakMap();
            this[_c] = false;
        }
        disconnectedCallback() {
            setimmediate(() => {
                disconnectedCallback(this);
                if (isfunction(this[cancel_watch_symbol])) {
                    this[cancel_watch_symbol]();
                }
            });
        }
        [((_a = cached_class_element),
        (_b = componentsymbol),
        (_c = readysymbol),
        switch_mount_symbol)](eleclass) {
            const eleclassconstructor = autocreateclass(eleclass);
            const eleme = this[cached_class_element].get(eleclassconstructor);
            if (eleme) {
                mountrealelement(eleme, this);
            } else {
                const elementreal = render(h(eleclassconstructor));
                this[cached_class_element].set(
                    eleclassconstructor,
                    elementreal
                );
                mountrealelement(elementreal, this);
            }
        }
        [firstinstalledcallback]() {
            const callmountswitch = () => {
                this[switch_mount_symbol](funstate.valueOf());
            };
            callmountswitch();
            this[cancel_watch_symbol] = watch(funstate, () => {
                callmountswitch();
            });
        }
        connectedCallback() {
            connectedCallback(this);
        }
    }
    Switchable[_b] = componentsymbol;
    return h(Switchable);
}
export default Switchable;
//# sourceMappingURL=switchable.js.map
