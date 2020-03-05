import { updatedctx } from "./Component-context";

export function useUpdated(fun: () => void) {
    updatedctx.add(fun);
}
