import ReactiveState from "./ReactiveState";
import { UnwrapedState } from "./watch";
export declare const set_prototype: Set<any>;
export default function <T extends UnwrapedState>(init: ReactiveState<T>): ReactiveState<T>;
export default function <T extends UnwrapedState>(init: Exclude<T, ReactiveState<any>> | undefined): ReactiveState<T>;
