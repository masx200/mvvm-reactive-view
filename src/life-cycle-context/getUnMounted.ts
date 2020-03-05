import { unmountedctx } from "./Component-context";

// import { UnMountedSet } from './Component-context';
export function getUnMounted(): (() => void)[] {
    // return [...UnMountedSet];
    return unmountedctx.getall();
}
