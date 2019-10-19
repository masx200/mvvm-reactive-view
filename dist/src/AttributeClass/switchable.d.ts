import { Htmlelementconstructor } from "./createComponent";
import ReactiveState from "../Reactivity/ReactiveState";
import Virtualdom from "../CreateElement/VirtualElement";
import { Custom } from "../CustomClass/customclass";
export { Switchable };
declare function Switchable(funstate: ReactiveState<Htmlelementconstructor | Custom>): Virtualdom<Htmlelementconstructor>;
export default Switchable;
