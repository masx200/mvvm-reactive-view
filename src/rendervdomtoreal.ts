const svgnamespace = "http://www.w3.org/2000/svg";
function throwinvalideletype() {
  throw TypeError("invalid element type!");
}
import mount from "./mount";
import createeleattr from "dom-element-attribute-agent-proxy";
// import { isstring, isarray, isobject, isfunction } from "./util";
import Virtualdom from "./virtualdom";

export default function render(
  vdom: Virtualdom | string,
  namespace?: string
):
  | HTMLElement
  | Text
  | SVGSVGElement
  | DocumentFragment
  | SVGElement
  | Element {
  if (typeof vdom === "string") {
    return createtextnode(vdom);
  } else if (vdom instanceof Virtualdom && "type" in vdom) {
    let element: HTMLElement | SVGSVGElement | SVGElement | Element;
    if (typeof vdom.type === "string") {
      if (vdom.type === "script") {
        /* 禁止加载脚本 */

        return createnonescript();
      } else if (vdom.type === "svg") {
        /* 没想到svg的创建方式这么特别?否则显示不出svg */
        element = createsvgelement();
      } else {
        element = namespace
          ? createElementNS(namespace, vdom.type)
          : createnativeelement(vdom.type);
      }
    } else if (typeof vdom.type == "function") {
      element = createcostumelemet(vdom.type);
    } else {
      throwinvalideletype();
      // throw TypeError("invalid element type!");
    }
    var attribute1 = createeleattr(element);
    Object.assign(attribute1, vdom.props);

    mount(
      vdom.children.map(e => {
        if (vdom.type === "svg") {
          /* 没想到svg的创建方式这么特别?否则显示不出svg */
          //   element.innerHTML = element.innerHTML;
          return render(e, svgnamespace);
        } else if (namespace) {
          return render(e, namespace);
        } else {
          return render(e);
        }
      }),

      element
    );

    return element;
  } else {
    throwinvalideletype();
    // throw TypeError("invalid element type!");
  }
}
export function createnativeelement(type: string) {
  return document.createElement(type);
}
export function createElementNS(namespace: string, name: string) {
  return document.createElementNS(namespace, name);
}
export function createtextnode(data: string) {
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
export function createsvgelement() {
  return document.createElementNS(svgnamespace, "svg");
}
export function createnonescript() {
  return document.createDocumentFragment();
}
