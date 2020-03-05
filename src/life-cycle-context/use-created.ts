import { createdctx } from "./Component-context";

export function useCreated(fun: () => void) {
    createdctx.add(fun);
}
