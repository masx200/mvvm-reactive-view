import watch from "src/Reactivity/watch";
import { get } from "src/UtilTools/reflect";
import { toArray } from "src/UtilTools/toArray";
import createElement from "../CreateElement/create-element";
import { isVirtualdom } from "../CreateElement/VirtualElement";
import { invalid_Virtualdom } from "../MountElement/MountElement";
import { isReactiveState } from "../Reactivity/isReactiveState";
import { getstatetype } from "../Reactivity/getstatetype";
import render from "../RenderVirtual/render-vdom-to-real";
import { replaceChild } from "../UtilTools/dom";
import { isstring, isundefined } from "../UtilTools/util";
import {
    AttrChange,
    connectedCallback,
    disconnectedCallback,
    firstinstalledcallback
} from "./attr-change";
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
const Condition = function(conditon, iftrue, iffalse) {
    var _a, _b, _c, _d, _e;
    if (!isReactiveState(conditon)) {
        console.error(conditon);
        console.error(invalid_ReactiveState);
        throw TypeError();
    }
    if (getstatetype(conditon) !== "Boolean") {
        throw new TypeError();
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
        constructor() {
            super(...arguments);
            this[_a] = this;
            this[_c] = false;
            this[_d] = toArray(optionstrue);
            this[_e] = toArray(optionsfalse);
        }
        [((_a = currentelementsymbol),
        (_b = componentsymbol),
        (_c = readysymbol),
        (_d = truevdomsymbol),
        (_e = falsevdomsymbol),
        handlefalse)]() {
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
            const elementtomount = this[trueelesymbol][0] || this;
            replaceChild(elementtomount, this[currentelementsymbol]);
            this[currentelementsymbol] = elementtomount;
        }
        [firstinstalledcallback]() {
            const handleconditionchange = (trueorfalse) => {
                if (true === trueorfalse) {
                    get(this, handletrue).call(this);
                } else if (!trueorfalse) {
                    get(this, handlefalse).call(this);
                }
            };
            if (isReactiveState(conditon)) {
                handleconditionchange(conditon.valueOf());
                watch(conditon, (trueorfalse) => {
                    handleconditionchange(trueorfalse);
                });
            } else {
                handleconditionchange(conditon);
            }
        }
        connectedCallback() {
            connectedCallback(this);
        }
        disconnectedCallback() {
            disconnectedCallback(this);
        }
    }
    Condition[_b] = componentsymbol;
    const vdom = createElement(Condition);
    return vdom;
};
export default Condition;
export { Condition };
//# sourceMappingURL=conditon.js.map
