import ReactiveState from "./reactivestate.js";
import { GetParentType } from "./GetParentType";
export declare type StateType<T> = ReactiveState<GetParentType<T>> &
    GetParentType<T>;
export declare const set_prototype: Set<any>;
export default createState;
export { createState };
declare function createState<T extends Exclude<any, ReactiveState<any>>>(
    init: T
): StateType<T>;
//# sourceMappingURL=create-state.d.ts.map
