import { Htmlelementconstructor } from "./createComponent";
import ReactiveState from "./reactivestate";
import Virtualdom from "./VirtualElement";
declare function switchable(funstate: ReactiveState<Function>): Virtualdom<Htmlelementconstructor>;
export default switchable;
