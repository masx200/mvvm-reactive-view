// import { mountedctx } from "./Component-context";

import { updatedctx } from "./Component-context";

// import { MountedSet } from './Component-context';
export function getupdated(): (() => void)[] {
    // return [...MountedSet];
    return updatedctx.getall();
}
