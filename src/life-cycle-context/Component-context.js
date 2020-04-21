export let StateSet = new Set();
export let watchrecord = [];
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
//# sourceMappingURL=Component-context.js.map
