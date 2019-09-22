import { isFunction } from "./util";

const message = "invalid useMounted or useUnMounted out of createComponent";
let ctxopen = false;
let Mounted = [];
let UnMounted = [];
export function getMounted() {
  return [...Mounted];
}
export function getUnMounted() {
  return [...UnMounted];
}
export function useMounted(fun: Function) {
  if (isFunction(fun)) {
    if (ctxopen) {
      Mounted.push(fun);
    } else {
      throw Error(message);
    }
  } else {
    throw TypeError("invalid Function");
  }
}

export function useUnMounted(fun: Function) {
  if (isFunction(fun)) {
    if (ctxopen) {
      UnMounted.push(fun);
    } else {
      throw Error(message);
    }
  } else {
    throw TypeError("invalid Function");
  }
}
export function clearMounted() {
  Mounted = [];
}
export function clearUnMounted() {
  UnMounted = [];
}
export function openctx() {
  ctxopen = true;
  clearMounted();
  clearUnMounted();
}
export function closectx() {
  ctxopen = false;
  clearMounted();
  clearUnMounted();
}
