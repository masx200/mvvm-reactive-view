import { mountedctx } from "./Component-context";

// import { MountedSet } from './Component-context';
export function getMounted(): (() => void)[] {
    // return [...MountedSet];
    return mountedctx.getall();
}
