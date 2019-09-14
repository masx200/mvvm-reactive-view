import { isArray, isFunction, isString } from "./util";
export default function(
  element: Element,
  eventname: string,
  callback: EventListener | Array<EventListener>
) {
  if (typeof callback === "function") {
    addlisteners(element, eventname, [callback]);
  } else if (isArray(callback)) {
    addlisteners(element, eventname, callback);
  } else {
    throw TypeError("invalid EventListener");
  }
}
function addlisteners(
  ele: Element,
  event: string,
  callarray: Array<EventListener>
) {
  callarray.forEach((call: EventListener) => {
    domaddlisten(ele, event, call);
  });
}
function domaddlisten(ele: Element, event: string, call: EventListener) {
  ele.addEventListener(event, call);
}
