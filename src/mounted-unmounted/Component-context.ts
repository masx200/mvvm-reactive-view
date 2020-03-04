let watchrecord: [ReactiveState<any>, Function][] = [];
/* 记录组件中使用的watch的state和callback,
组件卸载时removeeventlistener,
组件挂载时addeventlistener
*/
import ReactiveState from "../Reactivity/reactivestate.js";
import { isFunction } from "../UtilTools/util";
export function getwatchrecords() {
    return [...watchrecord];
}
export function usewatch(state: ReactiveState<any>, callback: Function) {
    if (ctxopen) {
        watchrecord.push([state, callback]);
    }
}
function clearwatch() {
    watchrecord = [];
}
export const invalid_Function = "invalid Function";
const errormessage =
    "invalid useMounted or useUnMounted out of createComponent";
let ctxopen = false;
let MountedSet: Set<() => void> = new Set();
let UnMountedSet: Set<() => void> = new Set();
let StateSet: Set<ReactiveState<any>> = new Set();
/* 收集组件内部创建的 ReactiveState*/

export function getstates() {
    return [...StateSet];
}
export function recordusestste(state: ReactiveState<any>) {
    if (ctxopen) {
        StateSet.add(state);
    }
}
export function getMounted(): (() => void)[] {
    return [...MountedSet];
}
export function getUnMounted(): (() => void)[] {
    return [...UnMountedSet];
}
export function useMounted(fun: () => void) {
    if (isFunction(fun)) {
        if (ctxopen) {
            MountedSet.add(fun);
        } else {
            console.error(errormessage);
            throw Error();
        }
    } else {
        console.error(fun);
        console.error(invalid_Function);
        throw TypeError();
    }
}

export function useUnMounted(fun: () => void) {
    if (isFunction(fun)) {
        if (ctxopen) {
            UnMountedSet.add(fun);
        } else {
            console.error(errormessage);
            throw Error();
        }
    } else {
        console.error(fun);
        console.error(invalid_Function);
        throw TypeError();
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
    clearwatch();
}
