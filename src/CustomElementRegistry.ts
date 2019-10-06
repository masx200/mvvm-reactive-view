export const invalid_custom_element_class = "invalid custom element class !";
import { isobject } from "./util";
if (
  //   typeof Proxy !== "function" ||
  !isobject(window.customElements) //||
  //   typeof customElements !== "object" ||

  //||
  //   typeof CustomElementRegistry !== "function"
) {
console.error(" customElements  not supported !")
  throw new TypeError();
}
import { isclassextendsHTMLElement } from "./customelement";

function 使用value从表中查询key(表: object, 组件状态名: any) {
  return Object.entries(表).find(v => {
    return v[1] === 组件状态名;
  })[0];
}

import { get, getPrototypeOf, has } from "./reflect";
interface ElementDefinitionOptions {
  extends?: string;
}
window.CustomElementRegistry = get(
  getPrototypeOf(window.customElements),
  "constructor"
);
const { customElements, CustomElementRegistry } = window;

// export default customElements;
const elementset = Symbol.for("elementset");
const elementmap = Symbol.for("elementmap");
export default (initclass: Function, extendsname?: string) =>
  RandomDefineCustomElement(initclass, extendsname);

function RandomDefineCustomElement(
  initclass: Function,
  extendsname?: string,
  length = 1
): string {
  if (!isclassextendsHTMLElement(initclass)) {
console.error(initclass)
console.error(invalid_custom_element_class)
    throw TypeError();
  }

  //如果未注册自定义组件，则用随机名称注册，如果名称重复则重新生成新的随机名

  if (!customElements[elementset].has(initclass)) {
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
    return 使用value从表中查询key(customElements[elementmap], initclass);
  }

  //如果已经注册自定义组件，则返回注册的名称
}
if (!customElements[elementset]) {
  customElements[elementset] = new Set();
}
if (!customElements[elementmap]) {
  customElements[elementmap] = {};
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
console.error(invalid_custom_element_class)
    throw TypeError();
  }
  if (!customElements[elementset].has(constructor)) {
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

customElements[Symbol.iterator] = () => {
  const entries = Object.entries(customElements[elementmap]);

  return entries[Symbol.iterator].call(entries);
};

const 
charactorlist=Array(26)
      .fill(undefined)
      .map((v, i) => 97 + i)
      .map(n => String.fromCharCode(n))

const 
hexnumberlist=Array(16)
      .fill(undefined)
      .map((v, i) => i).map(a=>a.toString(16))
   
function getrandomcharactor() {
  return get(
  //  Array(26)
    //  .fill(undefined)
    //  .map((v, i) => 97 + i)
     // .map(n => String.fromCharCode(n))
charactorlist
,
    Math.floor(Math.random() * 26)
  );

  
}
function getrandomhexnumber() {
  return get(
   // Array(16)
    //  .fill(undefined)
     // .map((v, i) => i)
hexnumberlist
,
    Math.floor(Math.random() * 16)
  )

//.toString(16);

  
}
function getrandomstringandnumber(length = 1) {
  return (
    Array(length)
      .fill(undefined)
      .map(() => getrandomcharactor())

      .join("") +
    "-" +
    Array(length)
      .fill(undefined)
      .map(() => getrandomhexnumber())
      .join("")
  );
}
