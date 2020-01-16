import createeleattragentreadwrite from "@masx200/dom-element-attribute-agent-proxy";
import { setimmediate } from "src/UtilTools/setimmediate";
import {
  onmounted,
  onunmounted
} from "../mounted-unmounted/element-onmount-unmount";
import { get } from "../UtilTools/reflect";
import { isFunction, isfunction, isobject } from "../UtilTools/util";
import { readysymbol } from "./readysymbol";
export const attributeChangedCallback = Symbol("attributeChanged");
export const firstinstalledcallback = Symbol("firstinstalled");
/* 

 super.disconnectedCallback();

 被babel转换之后这句就没了?

  connectedCallback() {
            
                ))();
            }
            disconnectedCallback() {
               
                ))();
            }
*/
export function connectedCallback(componentelement: HTMLElement) {
  AttrChange.prototype.connectedCallback.call(componentelement);
}

export function disconnectedCallback(componentelement: HTMLElement) {
  AttrChange.prototype.disconnectedCallback.call(componentelement);
}
export class AttrChange extends HTMLElement {
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
  [readysymbol] = false;

  constructor() {
    super();
    const defaultProps = get(this.constructor, "defaultProps");

    const attrs: Record<string, any> = createeleattragentreadwrite(this);

    if (isobject(defaultProps)) {
      /*     if (!this[attributessymbol]) {
        this[attributessymbol] = {};
      } */
      Object.assign(attrs, defaultProps);
    }

    new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type == "attributes") {
          console.log(
            "The " + mutation.attributeName + " attribute was modified."
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

  /*  defaultProps?: { [key: string]: any } | undefined;
  css?: string | undefined; */
  /* constructor() {
    super();
  } */

  /* 跟seteletext发生冲突,清空children */

  /* _name?: any, _oldValue?: any, _newValue?: any */

  //

  /* constructor() {
    super();
  } */

  /* disconnectedCallback() {
  
} */
  /* connectedCallback() {
  
  updateStyle(this);
} */
  //

  /* attributeChangedCallback(name, oldValue, newValue) {
  
  updateStyle(this);
} */
}
