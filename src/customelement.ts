import { Class } from "./rendervdomtoreal";
import setlikearray from "./setlikearay";
const customElementsarray = new setlikearray();
export function createcostumelemet(initclass: Class | Function): HTMLElement {
  customElementsarray.push(initclass);
  const elementname = getcustomelementname(initclass);
  if (customElements.get(elementname) === initclass) {
  } else {
    customElements.define(elementname, initclass);
  }

  return new initclass();
}
function getcustomelementname(initclass: any) {
  return "c-" + customElementsarray.indexOf(initclass);
}
