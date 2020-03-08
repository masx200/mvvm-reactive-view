import { h } from "../CreateElement/create-element";
import Virtualdom from "../CreateElement/VirtualElement";
import { Custom } from "../CustomClass/customclass";
import { mountrealelement } from "../MountElement/mount-real-element";
import { isReactiveState } from "../Reactivity/isReactiveState";
import ReactiveState from "../Reactivity/reactivestate.js";
import watch, { CancelWatchfun } from "../Reactivity/watch";
import render from "../RenderVirtual/render-vdom-to-real";
import { setimmediate } from "../UtilTools/setimmediate";
import { isfunction } from "../UtilTools/util";
import {
    AttrChange,
    connectedCallback,
    disconnectedCallback,
    firstinstalledcallback
} from "./attr-change";
import { autocreateclass, Htmlelementconstructor } from "./createComponent";
import { componentsymbol } from "./iscomponent";
import { readysymbol } from "./readysymbol";
import { getstatetype } from "src/Reactivity/getstatetype";
import { TagType } from "src/Reactivity/TagType";

const cancel_watch_symbol = Symbol("cancel_watch");
const cached_class_element = Symbol("cached_class_element");
const switch_mount_symbol = Symbol("switch_mount");

export { Switchable };
function Switchable(
    funstate: ReactiveState<Htmlelementconstructor | Custom>
): Virtualdom<Htmlelementconstructor> {
    if (!isReactiveState(funstate)) {
        console.error(funstate);
        throw new TypeError();
    }
    if (getstatetype(funstate) !== TagType.Function) {
        throw new TypeError();
    }
    class Switchable extends AttrChange {
        [cached_class_element] = new WeakMap<
            Htmlelementconstructor,
            Element | Node
        >();
        disconnectedCallback() {
            setimmediate(() => {
                disconnectedCallback(this);
                if (isfunction(this[cancel_watch_symbol])) {
                    this[cancel_watch_symbol]();
                }
            });
        }
        [cancel_watch_symbol]: CancelWatchfun;
        static [componentsymbol] = componentsymbol;
        [readysymbol] = false;
        [switch_mount_symbol](eleclass: Custom | Htmlelementconstructor) {
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
                this[switch_mount_symbol](
                    funstate.valueOf() as Custom | Htmlelementconstructor
                );
            };
            callmountswitch();
            this[cancel_watch_symbol] = watch(funstate, () => {
                callmountswitch();
            });
        }
        connectedCallback() {
            connectedCallback(this);
            /* if (!this[readysymbol]) {
        this[readysymbol] = true;
      } */
        }
    }
    return h(Switchable);
}
export default Switchable;
