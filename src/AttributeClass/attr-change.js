var _a;
import createeleattragentreadwrite from "@masx200/dom-element-attribute-agent-proxy";
import {
    onmounted,
    onunmounted
} from "../life-cycle-context/element-onmount-unmount";
import { get } from "../UtilTools/reflect";
import { isFunction, isfunction, isobject } from "../UtilTools/util";
import { readysymbol } from "./readysymbol";
import { setimmediate } from "src/UtilTools/setimmediate";
export const attributeChangedCallback = Symbol("attributeChanged");
export const firstinstalledcallback = Symbol("firstinstalled");
export function connectedCallback(componentelement) {
    AttrChange.prototype.connectedCallback.call(componentelement);
}
export function disconnectedCallback(componentelement) {
    AttrChange.prototype.disconnectedCallback.call(componentelement);
}
export class AttrChange extends HTMLElement {
    constructor() {
        super();
        this[_a] = false;
        const defaultProps = get(this.constructor, "defaultProps");
        const attrs = createeleattragentreadwrite(this);
        if (isobject(defaultProps)) {
            Object.assign(attrs, defaultProps);
        }
        new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type == "attributes") {
                    console.log(
                        "The " +
                            mutation.attributeName +
                            " attribute was modified."
                    );
                    const callback = get(this, attributeChangedCallback);
                    let qualifiedName = mutation.attributeName;
                    if (qualifiedName && isFunction(callback)) {
                        callback.call(this, qualifiedName);
                    }
                }
            });
        }).observe(this, { attributes: true });
    }
    disconnectedCallback() {
        setimmediate(() => {
            onunmounted(this);
        });
    }
    connectedCallback() {
        setimmediate(() => {
            if (!this[readysymbol]) {
                this[readysymbol] = true;
                const callback = get(this, firstinstalledcallback);
                if (isfunction(callback)) {
                    setimmediate(() => {
                        callback.call(this);
                    });
                }
            }
            onmounted(this);
        });
    }
}
_a = readysymbol;
//# sourceMappingURL=attr-change.js.map
