interface ElementDefinitionOptions {
  extends?: string;
}
const { customElements, CustomElementRegistry } = window;

// export default customElements;
const elementset = Symbol.for("elementset");
const elementmap = Symbol.for("elementmap");
export default function RandomDefineElement(initclass: Function): void {
  //
  if (!customElements[elementset].has(initclass)) {
    customElements.define(getrandomstringandnumber(), initclass);
  }
}
if (!customElements[elementset]) {
  customElements[elementset] = new Set();
}
if (!customElements[elementmap]) {
  customElements[elementmap] = new Map();
}
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
function getrandomstringandnumber() {
  return (
    Object.keys(Array(26).fill(undefined))
      .map((v, i) => 97 + i)
      .map(n => String.fromCharCode(n))[Math.floor(Math.random() * 26)] +
    "-" +
    Array.from(String(Math.random()))
      .filter(a => /\d/.test(a))
      .join("")
  );
}
customElements[Symbol.iterator] = () => {
  return customElements[elementmap][Symbol.iterator].call(
    customElements[elementmap]
  );
};
