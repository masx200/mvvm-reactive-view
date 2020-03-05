import { unmountedctx } from "./Component-context";

export function clearUnMounted() {
    // UnMountedSet = new Set();
    unmountedctx.clear();
}
