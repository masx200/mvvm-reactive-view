import debounce from "src/UtilTools/debounce";
import { invalid_ReactiveState } from "../AttributeClass/conditon";
import { invalid_Function } from "../life-cycle-context/Component-context";
import { cached_callback_debounced_watchs } from "../others/cached-map";
import { toArray } from "../UtilTools/toArray";
import { isarray } from "../UtilTools/util";
import { cancelsubscribe } from "./reactivestate.js";
import { isReactiveState } from "./isReactiveState";
import { watchsingle } from "./watchsingle";
function watch(state, callback) {
    if (isarray(state) || isReactiveState(state)) {
        const statearray = toArray(state);
        if (!statearray.length) {
            console.error("Empty array not allowed");
            throw new Error();
        }
        const debouncedcallback = debounce(callback);
        const stateandlisteners = statearray.map((state1) => {
            const listener = (() => {
                const cachedfun = cached_callback_debounced_watchs.get(
                    callback
                );
                if (cachedfun) {
                    return cachedfun;
                } else {
                    const listenfun = () => {
                        debouncedcallback(
                            ...statearray.map((r) => r.valueOf())
                        );
                    };
                    cached_callback_debounced_watchs.set(callback, listenfun);
                    return listenfun;
                }
            })();
            watchsingle(state1, listener);
            return [state1, listener];
        });
        const cancelWatch = () => {
            stateandlisteners.forEach(([state, listener]) => {
                state[cancelsubscribe](listener);
            });
        };
        return cancelWatch;
    } else {
        console.error(state);
        console.error(callback);
        console.error(invalid_ReactiveState + invalid_Function);
        throw new TypeError();
    }
}
export default watch;
Array.prototype.map;
//# sourceMappingURL=watch.js.map
