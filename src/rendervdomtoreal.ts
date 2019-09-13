import mount from "./mount";
import createeleattr from "dom-element-attribute-agent-proxy";
// import { isstring, isarray, isobject, isfunction } from "./util";
import Virtualdom from "./virtualdom";

export default function render(vdom: Virtualdom | string): HTMLElement | Text {
  if (typeof vdom === "string") {
    return createtextnode(vdom);
  } else if (vdom instanceof Virtualdom && "type" in vdom) {
    let element: HTMLElement;
    if (typeof vdom.type === "string") {
      if (vdom.type === "script") {
        /* 禁止加载脚本 */
        return createtextnode("");
      }
      element = createnativeelement(vdom.type);
    } else if (typeof vdom.type == "function") {
      element = createcostumelemet(vdom.type);
    } else {
      throw TypeError("invalid element type!");
    }
    var attribute1 = createeleattr(element);
    Object.assign(attribute1, vdom.props);
    mount(
      vdom.children.map(e => render(e)),

      element
    );

    return element;
  } else {
    throw TypeError("invalid element type!");
  }
}
function createnativeelement(type: string) {
  return document.createElement(type);
}
function createtextnode(data: string) {
  return document.createTextNode(data);
}
export interface Class {
  new (): object;
  (): object;
}
import setlikearray from "./setlikearay";
const customElementsarray = new setlikearray();
function createcostumelemet(initclass: Class | Function): HTMLElement {
  customElementsarray.push(initclass);
  customElements.define(
    "c-" + customElementsarray.indexOf(initclass),
    initclass
  );
  return new initclass();
}
