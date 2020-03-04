// import { mountedctx } from './Component-context';

import { createdctx } from './Component-context';

export function clearcreated() {
    // MountedSet = new Set();
    createdctx.clear()
}
