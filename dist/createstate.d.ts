import ReactiveState from "./reactivestate";
import { UnwrapedState } from "./watch";
export declare const set_prototype: Set<any>;
export default function <T extends UnwrapedState>(init: ReactiveState<T>): ReactiveState<T>;
export default function <T extends UnwrapedState>(init: T): ReactiveState<T>;
