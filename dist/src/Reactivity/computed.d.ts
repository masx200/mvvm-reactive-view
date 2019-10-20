import computed from "./computed";
import ReactiveState from "./ReactiveState";
import { CallbackReactiveState, UnwrapedState } from "./watch";
export default function <T extends UnwrapedState>(state: ReactiveState<T> | Array<ReactiveState<T>>, callback: CallbackReactiveState, setter?: SetterFun): ReactiveState<any>;
declare type SetterFun = (v: any) => void;
export { computed };
