import { ctxopen, StateSet } from "./Component-context";
export function useststerecord(state) {
    if (ctxopen) {
        StateSet.add(state);
    }
}
//# sourceMappingURL=useststerecord.js.map
