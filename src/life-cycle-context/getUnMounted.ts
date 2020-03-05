import { unmountedctx } from "./Component-context";

export function getUnMounted(): (() => void)[] {
    return unmountedctx.getall();
}
