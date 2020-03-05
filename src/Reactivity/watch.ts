import debounce from "lodash/debounce";
import { cached_callback_debounced_watchs } from "../others/cached-map";
import { invalid_ReactiveState } from "../AttributeClass/conditon";
import { invalid_Function } from "../life-cycle-context/Component-context";
import { usewatch } from "../life-cycle-context/usewatchrecord";
import ReactiveState, {
    addallistenerssymbol,
    cancelsubscribe,
    isReactiveState,
    removeallistenerssymbol,
    subscribesymbol
} from "./reactivestate.js";
import { toArray } from "../UtilTools/toArray";

import { isarray, isFunction } from "../UtilTools/util";
import { Listener } from "./custom-observer-target";
export type CancelWatchfun = () => void;
export type UnwrapedState = any;

export interface gettercallback /* <
  
> */ {
    (...args: UnwrapedState[]): any;
}

export function watch<T extends UnwrapedState>(
    state: ReactiveState<T> | Array<ReactiveState<T>>,

    callback: gettercallback
): CancelWatchfun {
    if (isarray(state) || isReactiveState(state)) {
        const statearray: ReactiveState<any>[] = toArray(state);
        if (!statearray.length) {
            console.error("Empty array not allowed");
            throw new Error();
        }
        /* 给watch的callback自动防抖 */
        const debouncedcallback = debounce(callback);
        const stateandlisteners: [
            ReactiveState<any>,
            Listener
        ][] = statearray.map(state1 => {
            const listener = (() => {
                /* 缓存callback和listener */
                const cachedfun = cached_callback_debounced_watchs.get(
                    callback
                );
                if (cachedfun) {
                    return cachedfun;
                } else {
                    const listenfun = () => {
                        debouncedcallback(...statearray.map(r => r.valueOf()));
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

function watchsingle(state: ReactiveState<any>, callback: Listener) {
    if (!(isReactiveState(state) && isFunction(callback))) {
        console.error(state);
        console.error(callback);
        console.error(invalid_ReactiveState + invalid_Function);

        throw TypeError();
    }

    state[subscribesymbol](callback);

    requestAnimationFrame(() => {
        rewatch(state);
    });

    usewatch(state, callback);
}
export function unwatch(state: ReactiveState<any>): void {
    state[removeallistenerssymbol]();
}

export function rewatch(state: ReactiveState<any>): void {
    state[addallistenerssymbol]();
}
export default watch;
