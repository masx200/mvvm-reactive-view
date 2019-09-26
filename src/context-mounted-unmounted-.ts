import { isFunction } from "./util";
export const invalid_Function = "invalid Function";
const message = "invalid useMounted or useUnMounted out of createComponent";
let ctxopen = false;
let Mounted: Set<Function> = new Set();
let UnMounted: Set<Function> = new Set();
export function getMounted() {
  return [...Mounted];
}
export function getUnMounted() {
  return [...UnMounted];
}
export function useMounted(fun: Function) {
  if (isFunction(fun)) {
    if (ctxopen) {
      Mounted.add(fun);
    } else {
      throw Error(message);
    }
  } else {
    throw TypeError(invalid_Function);
  }
}

export function useUnMounted(fun: Function) {
  if (isFunction(fun)) {
    if (ctxopen) {
      UnMounted.add(fun);
    } else {
      throw Error(message);
    }
  } else {
    throw TypeError(invalid_Function);
  }
}
export function clearMounted() {
  Mounted = new Set();
}
export function clearUnMounted() {
  UnMounted = new Set();
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
