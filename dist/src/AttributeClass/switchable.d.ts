import { Htmlelementconstructor } from "./createComponent";
import ReactiveState from "../Reactivity/ReactiveState";
import Virtualdom from "../CreateElement/VirtualElement";
export { Switchable };
declare function Switchable(funstate: ReactiveState<Htmlelementconstructor>): Virtualdom<Htmlelementconstructor>;
export default Switchable;
