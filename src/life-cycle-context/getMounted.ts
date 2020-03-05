import { mountedctx } from "./Component-context";

export function getMounted(): (() => void)[] {
    return mountedctx.getall();
}
