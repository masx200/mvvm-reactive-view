import Virtualdom from "../CreateElement/VirtualElement";
import { Custom } from "../CustomClass/customclass";
import ReactiveState from "../Reactivity/ReactiveState";
import { Htmlelementconstructor } from "./createComponent";
export { Switchable };
declare function Switchable(funstate: ReactiveState<Htmlelementconstructor | Custom>): Virtualdom<Htmlelementconstructor>;
export default Switchable;
