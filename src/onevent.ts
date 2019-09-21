import { domaddlisten, domremovelisten } from "./dom";
export const eventlistenerssymbol = Symbol("eventlisteners");
import { isArray } from "./util";
export default function(
  element: Element,
  eventname: string,
  callback: EventListener | Array<EventListener>
) {
  if (!element[eventlistenerssymbol]) {
    element[eventlistenerssymbol] = [];
  }
  if (typeof callback === "function") {
    firstaddlisteners(element, eventname, [callback]);
  } else if (isArray(callback)) {
    firstaddlisteners(element, eventname, callback);
  } else {
    throw TypeError("invalid EventListener");
  }
}
export function firstaddlisteners(
  ele: Element,
  event: string,
  callarray: Array<EventListener>
) {
  callarray.forEach((call: EventListener) => {
    ele[eventlistenerssymbol].push([event, call]);
    domaddlisten(ele, event, call);
  });
}
export function removelisteners(
  ele: Element | Node
  //   event: string,
  //   callarray: Array<EventListener>
) {
  if (ele[eventlistenerssymbol]) {
    ele[eventlistenerssymbol].forEach(([event, call]) => {
      //   ele[eventlistenerssymbol].push([event, call]);
      domremovelisten(ele, event, call);
    });
  }
}
export function readdlisteners(
  ele: Element | Node
  //   event: string,
  //   callarray: Array<EventListener>
) {
  if (ele[eventlistenerssymbol]) {
    ele[eventlistenerssymbol].forEach(([event, call]) => {
      //   ele[eventlistenerssymbol].push([event, call]);
      domaddlisten(ele, event, call);
    });
  }
}
