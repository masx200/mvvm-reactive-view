// import { mountedctx } from './Component-context';

import { updatedctx } from "./Component-context";

export function clearupdated() {
    // MountedSet = new Set();
    updatedctx.clear();
}
