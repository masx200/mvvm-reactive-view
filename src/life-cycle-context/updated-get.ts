import { updatedctx } from "./Component-context";

export function getupdated(): (() => void)[] {
    return updatedctx.getall();
}
