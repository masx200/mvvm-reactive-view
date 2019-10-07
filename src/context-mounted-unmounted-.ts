import ReactiveState from "./reactivestate";
import { isFunction } from "./util";
export const invalid_Function = "invalid Function";
const errormessage =
  "invalid useMounted or useUnMounted out of createComponent";
let ctxopen = false;
let MountedSet: Set<Function> = new Set();
let UnMountedSet: Set<Function> = new Set();
let StateSet: Set<ReactiveState<any>> = new Set();
/* 收集组件内部创建的 ReactiveState*/
export function getstates(): Array<ReactiveState<any>> {
  return [...StateSet];
}
export function usestste(state: ReactiveState<any>) {
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
      //console.error()
      console.error(errormessage);
      throw Error();
    }
  } else {
    console.error(fun);
    console.error(invalid_Function);
    throw TypeError();
  }
}

export function useUnMounted(fun: Function) {
  if (isFunction(fun)) {
    if (ctxopen) {
      UnMountedSet.add(fun);
    } else {
      console.error(errormessage);
      throw Error();
      //throw Error(errormessage);
    }
  } else {
    console.error(fun);
    console.error(invalid_Function);
    throw TypeError();
    //throw TypeError(invalid_Function);
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
