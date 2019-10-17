import ReactiveState from "./reactivestate";
import { CallbackReactiveState, UnwrapedState } from "./watch";
export default function <T extends UnwrapedState>(state: ReactiveState<T> | Array<ReactiveState<T>>, callback: CallbackReactiveState): ReactiveState<any>;
export declare function getproperyreadproxy<T extends object>(a: T): T;
