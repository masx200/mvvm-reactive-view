import { createdctx } from "./Component-context";

export function getcreated(): (() => void)[] {
    return createdctx.getall();
}
