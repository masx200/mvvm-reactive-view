export const invalid_custom_element_class = "invalid custom element class !";
// import { isclassextendsHTMLElement } from "./CustomElement/create-costum-elemet";
import { get, getPrototypeOf, has, set } from "../UtilTools/reflect";
import { isobject } from "../UtilTools/util";
import { getrandomstringandnumber } from "./getrandomstringandnumber";
import { isclassextendsHTMLElement } from "./isclassextendsHTMLElement";
if (
  //   typeof Proxy !== "function" ||
  !isobject(window.customElements) //||
  //   typeof customElements !== "object" ||

  //||
  //   typeof CustomElementRegistry !== "function"
) {
  console.error(" customElements  not supported !");
  throw new TypeError();
}

function Usevaluetoquerythekeyfromthetable(
  table: object,
  Componentstatusname: any
): string | undefined {
  const outputentrie = Object.entries(table).find(v => {
    return v[1] === Componentstatusname;
  });
  return outputentrie ? outputentrie[0] : undefined;
}

interface ElementDefinitionOptions {
  extends?: string;
}
window.CustomElementRegistry = get(
  getPrototypeOf(window.customElements),
  "constructor"
);
const elementset = Symbol.for("elementset");
const elementmap = Symbol.for("elementmap");

interface CustomElements extends CustomElementRegistry {
  [elementset]: Set<Function>;
  [elementmap]: Record<string, Function>;
}
const { CustomElementRegistry } = window;
const customElements = window.customElements as CustomElements;
// export default customElements;

if (!has(customElements, elementset)) {
  set(customElements, elementset, new Set());
  //   customElements[elementset] = new Set();
}
if (!has(customElements, elementmap)) {
  set(customElements, elementmap, {});
  //   customElements[elementmap] = {};
}
export default (initclass: Function, extendsname?: string) =>
  RandomDefineCustomElement(initclass, extendsname);

function RandomDefineCustomElement(
  initclass: Function,
  extendsname?: string,
  length = 1
): string | undefined {
  if (!isclassextendsHTMLElement(initclass)) {
    console.error(initclass);
    console.error(invalid_custom_element_class);
    throw TypeError();
  }

  //如果未注册自定义组件，则用随机名称注册，如果名称重复则重新生成新的随机名

  if (!get(customElements, elementset).has(initclass)) {
    const elementname = getrandomstringandnumber(length);

    if (customElements.get(elementname)) {
      return RandomDefineCustomElement(initclass, extendsname, length + 1);
    } else {
      if (extendsname) {
        customElements.define(elementname, initclass, { extends: extendsname });
      } else {
        customElements.define(elementname, initclass);
      }
    }

    return elementname;
  } else {
    return Usevaluetoquerythekeyfromthetable(
      get(customElements, elementmap),
      initclass
    );
  }

  //如果已经注册自定义组件，则返回注册的名称
}

/* customElements.get = function name(name) {
  return customElements[elementmap].get(name);
};
 */
customElements.define = function(
  name: string,
  constructor: Function,
  options?: ElementDefinitionOptions
): void {
  if (!isclassextendsHTMLElement(constructor)) {
    console.error(constructor);
    console.error(invalid_custom_element_class);
    throw TypeError();
  }
  if (!get(customElements, elementset).has(constructor)) {
    if (has(customElements[elementmap], name)) {
      /* 防止定义重名 */
      RandomDefineCustomElement(
        constructor,
        options ? options.extends : undefined
      );
    } else {
      CustomElementRegistry.prototype.define.call(
        customElements,
        name,
        constructor,
        options
      );
      customElements[elementset].add(constructor);
      customElements[elementmap][name] = constructor;
    }
  }
};
set(customElements, Symbol.iterator, () => {
  const entries = Object.entries(customElements[elementmap]);

  return entries[Symbol.iterator].call(entries);
});
/* customElements[Symbol.iterator] = () => {
  const entries = Object.entries(customElements[elementmap]);

  return entries[Symbol.iterator].call(entries);
}; */
