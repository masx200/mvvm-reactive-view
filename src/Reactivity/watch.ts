import debounce from "src/UtilTools/debounce";
// import debounce from "lodash/debounce";
import { invalid_ReactiveState } from "../AttributeClass/conditon";
import { invalid_Function } from "../life-cycle-context/Component-context";
import { cached_callback_debounced_watchs } from "../others/cached-map";
import { toArray } from "../UtilTools/toArray";
import { isarray } from "../UtilTools/util";
import { Listener } from "./custom-observer-target";
import { gettercallback } from "./gettercallback";
import ReactiveState, { cancelsubscribe } from "./reactivestate.js";
import { isReactiveState } from "./isReactiveState";
import { watchsingle } from "./watchsingle";
import { UnWrapState } from "./unwrapstate";
import { UnWrapArray } from "./UnWrapArray";

export type CancelWatchfun = () => void;
function watch<T extends any, Y extends ReactiveState<T>>(
    state: Y,

    callback: gettercallback<void, [UnWrapState<Y>]>
): CancelWatchfun;
function watch<T extends any, Y extends Array<ReactiveState<T>>>(
    state: Y,

    callback: gettercallback<void, UnWrapState<UnWrapArray<Y>>[]>
): CancelWatchfun;
function watch(
    state: ReactiveState<any> | Array<ReactiveState<any>>,

    callback: gettercallback<any, any[]>
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

export default watch;
Array.prototype.map;
