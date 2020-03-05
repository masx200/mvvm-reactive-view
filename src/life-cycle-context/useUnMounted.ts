import { unmountedctx } from "./Component-context";

export function useUnMounted(fun: () => void) {
    unmountedctx.add(fun);
}
