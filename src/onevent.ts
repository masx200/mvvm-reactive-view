import { toArray } from "./toArray";
import { invalid_Function } from "./context-mounted-unmounted-";
import { domaddlisten, domremovelisten } from "./dom";
export const eventlistenerssymbol = Symbol("eventlisteners");
import { /* isArray, */ isfunction } from "./util";
export default function(
  element: Element | Node,
  eventname: string,
  callback: EventListener | Array<EventListener>
) {
  /* if (!element[eventlistenerssymbol]) {
    element[eventlistenerssymbol] = [];
  }
*/
  firstaddlisteners(element, eventname, toArray(callback));
  /*
//  if (isfunction(callback)) {
//    firstaddlisteners(element, eventname, [callback]);
//  } else if (isArray(callback)) {
//    firstaddlisteners(element, eventname, callback);
 // } else {
 //   console.error(callback);
 //   throw TypeError(invalid_Function);
 // }
*/
}
export function firstaddlisteners(
  ele: Element | Node,
  event: string,
  callarray: Array<EventListener>
) {
  const element = ele;
  callarray.forEach((call: EventListener) => {
    if (!isfunction(call)) {
      console.error(call);
console.error(invalid_Function)
      throw TypeError();
    }

    if (!element[eventlistenerssymbol]) {
      element[eventlistenerssymbol] = [];
    }

    ele[eventlistenerssymbol].push([event, call]);
    domaddlisten(ele, event, call);
  });
}
export function removelisteners(
  ele: Element | Node
  //   event: string,
  //   callarray: Array<EventListener>
) {
  // const element = ele;
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
