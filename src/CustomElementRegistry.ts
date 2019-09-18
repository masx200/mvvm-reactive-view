import { get, getPrototypeOf } from "./reflect";
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
export default function RandomDefineCustomElement(
  initclass: Function,
  extendsname?: string
): string {
  //如果未注册自定义组件，则用随机名称注册，如果名称重复则重新生成新的随机名
  
  if (!customElements[elementset].has(initclass)) {

const elementname = getrandomstringandnumber();


    if (customElements.get(elementname)) {
      return RandomDefineCustomElement(initclass,extendsname);
    } else {
      if (extendsname) {
        customElements.define(elementname, initclass, { extends: extendsname });
      } else {
        customElements.define(elementname, initclass);
      }
    }

return elementname;



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
  CustomElementRegistry.prototype.define.call(
    customElements,
    name,
    constructor,
    options
  );
  customElements[elementset].add(constructor);
  customElements[elementmap][name]=constructor;
};

customElements[Symbol.iterator] = () => {
  return Object.entries(customElements[elementmap])[Symbol.iterator]()
  );
};
function getrandomcharactor() {
  return get(
    Array(26)
      .fill(undefined)
      .map((v, i) => 97 + i)
      .map(n => String.fromCharCode(n)),
    Math.floor(Math.random() * 26)
  );

  // [Math.floor(Math.random() * 26)];
}
function getrandomhexnumber() {
  return get(
    Array(16)
      .fill(undefined)
      .map((v, i) => i),
    Math.floor(Math.random() * 16)
  ).toString(16);

  /*  Array(16)
    .fill(undefined)
    .map((v, i) => i)
    [Math.floor(Math.random() * 16)].toString(16); */
}
function getrandomstringandnumber(length?:number=1) {
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
