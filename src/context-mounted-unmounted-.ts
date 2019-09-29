import { isFunction } from "./util";
import ReactiveState from './reactivestate';
export const invalid_Function = "invalid Function";
const errormessage =
  "invalid useMounted or useUnMounted out of createComponent";
let ctxopen = false;
let MountedSet: Set<Function> = new Set();
let UnMountedSet: Set<Function> = new Set();
let StateSet: Set<ReactiveState> = new Set();
/* 收集组件内部创建的 ReactiveState*/
export function getstates() {
  return [...StateSet];
}
export function usestste(state: ReactiveState) {
  if (ctxopen) {
    StateSet.add(state);
  }
}
export function getMounted() {
  return [...MountedSet];
}
export function getUnMounted() {
  return [...UnMountedSet];
}
export function useMounted(fun: Function) {
  if (isFunction(fun)) {
    if (ctxopen) {
      MountedSet.add(fun);
    } else {
      throw Error(errormessage);
    }
  } else {
    throw TypeError(invalid_Function);
  }
}

export function useUnMounted(fun: Function) {
  if (isFunction(fun)) {
    if (ctxopen) {
      UnMountedSet.add(fun);
    } else {
      throw Error(errormessage);
    }
  } else {
    throw TypeError(invalid_Function);
  }
}
export function clearMounted() {
  MountedSet = new Set();
}

function clearstate() {
  StateSet = new Set();
}
export function clearUnMounted() {
  UnMountedSet = new Set();
}
export function openctx() {
  ctxopen = true;
  clearall();
}
export function closectx() {
  ctxopen = false;
  clearall();
}
function clearall() {
  clearMounted();
  clearUnMounted();
  clearstate();
}
