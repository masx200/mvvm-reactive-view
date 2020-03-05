import { mountedctx } from "./Component-context";

export function clearMounted() {
    // MountedSet = new Set();
    mountedctx.clear();
}
