// export let MountedSet: Set<() => void> = new Set();
// export let UnMountedSet: Set<() => void> = new Set();
export let StateSet: Set<ReactiveState<any>> = new Set();
export let watchrecord: [ReactiveState<any>, Function][] = [];
/* 记录组件中使用的watch的state和callback,
组件卸载时removeeventlistener,
组件挂载时addeventlistener
*/
import ReactiveState from "../Reactivity/reactivestate.js";
import { clearMounted } from "./clearMounted";
import { clearUnMounted } from "./clearUnMounted";
import { createlifecyclecontext } from "./createlifecyclecontext.js";
import { clearupdated } from "./updated-clear.js";
import { clearcreated } from "./created-clear.js";
export function getwatchrecords() {
    return [...watchrecord];
}
function clearwatch() {
    watchrecord = [];
}
export const invalid_Function = "invalid Function";
export const errormessage =
    "invalid useMounted or useUnMounted out of createComponent";
export let ctxopen = false;

export function getstates() {
    return [...StateSet];
}
function clearstate() {
    StateSet = new Set();
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
    clearcreated();
    clearupdated();
    clearMounted();
    clearUnMounted();
    clearstate();
    clearwatch();
}
export const mountedctx = createlifecyclecontext();
export const unmountedctx = createlifecyclecontext();
export const updatedctx = createlifecyclecontext();
export const createdctx = createlifecyclecontext();
