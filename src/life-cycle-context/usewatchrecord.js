import { ctxopen, watchrecord } from "./Component-context";
export function usewatch(state, callback) {
    if (ctxopen) {
        watchrecord.push([state, callback]);
    }
}
//# sourceMappingURL=usewatchrecord.js.map
