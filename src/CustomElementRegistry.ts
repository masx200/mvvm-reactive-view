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
  //
  const elementname = getrandomstringandnumber();
  if (!customElements[elementset].has(initclass)) {
    if (customElements.get(elementname)) {
      return RandomDefineCustomElement(initclass);
    } else {
      if (extendsname) {
        customElements.define(elementname, initclass, { extends: extendsname });
      } else {
        customElements.define(elementname, initclass);
      }
    }
  }
  return elementname;
}
if (!customElements[elementset]) {
  customElements[elementset] = new Set();
}
if (!customElements[elementmap]) {
  customElements[elementmap] = new Map();
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
  customElements[elementmap].set(name, constructor);
};

customElements[Symbol.iterator] = () => {
  return customElements[elementmap][Symbol.iterator].call(
    customElements[elementmap]
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
function getrandomstringandnumber() {
  return (
    Array(16)
      .fill(undefined)
      .map(() => getrandomcharactor())

      .join("") +
    "-" +
    Array(16)
      .fill(undefined)
      .map(() => getrandomhexnumber())
      .join("")
  );
}
