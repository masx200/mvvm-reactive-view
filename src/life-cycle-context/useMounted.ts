import { mountedctx } from "./Component-context";

export function useMounted(fun: () => void) {
    mountedctx.add(fun);
}
