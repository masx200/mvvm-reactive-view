// import { mountedctx } from "./Component-context";

import { createdctx } from './Component-context';

// import { MountedSet } from './Component-context';
export function getcreated(): (() => void)[] {
    // return [...MountedSet];
    return createdctx.getall();
}
