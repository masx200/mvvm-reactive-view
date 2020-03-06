import watch from "src/Reactivity/watch";
import { get } from "src/UtilTools/reflect";
import { toArray } from "src/UtilTools/toArray";

import createElement from "../CreateElement/create-element";
import Virtualdom, { isVirtualdom } from "../CreateElement/VirtualElement";
import { invalid_Virtualdom } from "../MountElement/MountElement";
import ReactiveState from "../Reactivity/reactivestate.js";
import { isReactiveState } from "../Reactivity/isReactiveState";
import render from "../RenderVirtual/render-vdom-to-real";
import { replaceChild } from "../UtilTools/dom";
import { isboolean, isstring, isundefined } from "../UtilTools/util";
import {
    AttrChange,
    connectedCallback,
    disconnectedCallback,
    firstinstalledcallback
} from "./attr-change";
import { Htmlelementconstructor } from "./createComponent";
import { componentsymbol } from "./iscomponent";
import { readysymbol } from "./readysymbol";

export const invalid_ReactiveState = "invalid ReactiveState";
const truevdomsymbol = Symbol("truevdom");
const falsevdomsymbol = Symbol("falsevdom");
const trueelesymbol = Symbol("trueele");
const falseelesymbol = Symbol("falseele");
const handletrue = Symbol("handletrue");
const handlefalse = Symbol("handlefalse");
const currentelementsymbol = Symbol("currentelement");

const Condition = function(
    conditon: ReactiveState<boolean> | boolean,
    iftrue?: Virtualdom<any> | string,
    iffalse?: Virtualdom<any> | string
): Virtualdom<Htmlelementconstructor> {
    if (!(isReactiveState(conditon) || isboolean(conditon))) {
        console.error(conditon);
        console.error(invalid_ReactiveState);
        throw TypeError();
    }
    [iftrue, iffalse].forEach((a) => {
        if (!(isundefined(a) || isVirtualdom(a) || isstring(a))) {
            console.error(a);
            console.error(invalid_Virtualdom);
            throw new TypeError();
        }
    });

    const optionstrue = iftrue;
    const optionsfalse = iffalse;
    class Condition extends AttrChange {
        [currentelementsymbol]: Node = this;
        static [componentsymbol] = componentsymbol;
        [readysymbol] = false;
        [truevdomsymbol]: (Virtualdom<any> | string)[] = toArray(optionstrue);

        /*isarray(optionstrue)
    ? optionstrue.filter(Boolean)
    : */

        [falsevdomsymbol]: (Virtualdom<any> | string)[] = toArray(optionsfalse);

        /* isarray(optionsfalse)
    ? optionsfalse.filter(Boolean)
    : */

        [falseelesymbol]: Node[];
        [trueelesymbol]: Node[];

        [handlefalse]() {
            if (!this[falseelesymbol]) {
                this[falseelesymbol] = render(this[falsevdomsymbol]);

                this[falsevdomsymbol] = [];
            }

            const elementtomount = this[falseelesymbol][0] || this;
            replaceChild(elementtomount, this[currentelementsymbol]);
            this[currentelementsymbol] = elementtomount;
        }
        [handletrue]() {
            if (!this[trueelesymbol]) {
                this[trueelesymbol] = render(this[truevdomsymbol]);

                this[truevdomsymbol] = [];
            }
            //
            const elementtomount = this[trueelesymbol][0] || this;

            replaceChild(elementtomount, this[currentelementsymbol]);
            this[currentelementsymbol] = elementtomount;
        }
        [firstinstalledcallback]() {
            const handleconditionchange = (trueorfalse: boolean) => {
                if (true === trueorfalse) {
                    get(this, handletrue).call(this);
                } else if (!trueorfalse) {
                    get(this, handlefalse).call(this);
                }
            };

            if (isReactiveState(conditon)) {
                handleconditionchange(conditon.valueOf() as boolean);
                watch(conditon, (trueorfalse: boolean) => {
                    handleconditionchange(trueorfalse);
                });
            } else {
                handleconditionchange(conditon);
            }
        }
        connectedCallback() {
            connectedCallback(this);

            /*   if (!this[readysymbol]) {
        
        this[readysymbol] = true;

        const attrs: { [key: string]: any } = createeleattr(this);
        
        if (true === attrs["value"]) {
          get(this, handletrue).call(this);
        }
        if (false === attrs["value"]) {
          get(this, handlefalse).call(this);
          //
        }
      } */

            //
        }
        disconnectedCallback() {
            disconnectedCallback(this);
        }
    }

    const vdom = createElement(Condition);

    return vdom;
};
export default Condition;
export { Condition };
