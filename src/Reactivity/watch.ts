import debounce from "lodash/debounce";
import { invalid_ReactiveState } from "../AttributeClass/conditon";
import { invalid_Function } from "../life-cycle-context/Component-context";
import { cached_callback_debounced_watchs } from "../others/cached-map";
import { toArray } from "../UtilTools/toArray";
import { isarray } from "../UtilTools/util";
import { Listener } from "./custom-observer-target";
import { gettercallback } from "./gettercallback";
import ReactiveState, { addallistenerssymbol, cancelsubscribe, isReactiveState, removeallistenerssymbol } from "./reactivestate.js";
import { watchsingle } from "./watchsingle";

export type CancelWatchfun = () => void;

export function watch<T extends any>(
    state: ReactiveState<T> | Array<ReactiveState<T>>,

    callback: gettercallback<void>
): CancelWatchfun {
    if (isarray(state) || isReactiveState(state)) {
        const statearray: ReactiveState<any>[] = toArray(state);
        if (!statearray.length) {
            console.error("Empty array not allowed");
            throw new Error();
        }

        const debouncedcallback = debounce(callback);
        const stateandlisteners: [
            ReactiveState<any>,
            Listener
        ][] = statearray.map((state1) => {
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
            watchsingle(
                state1,

                listener
            );

            return [state1, listener];
        });

        const cancelWatch: CancelWatchfun = () => {
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

export function unwatch(state: ReactiveState<any>): void {
    state[removeallistenerssymbol]();
}

export function rewatch(state: ReactiveState<any>): void {
    state[addallistenerssymbol]();
}
export default watch;
