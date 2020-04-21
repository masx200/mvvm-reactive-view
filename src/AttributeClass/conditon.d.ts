import Virtualdom from "../CreateElement/VirtualElement";
import ReactiveState from "../Reactivity/reactivestate.js";
import { Htmlelementconstructor } from "./createComponent";
export declare const invalid_ReactiveState = "invalid ReactiveState";
declare const Condition: (
    conditon: ReactiveState<boolean>,
    iftrue?: string | Virtualdom<any> | undefined,
    iffalse?: string | Virtualdom<any> | undefined
) => Virtualdom<Htmlelementconstructor>;
export default Condition;
export { Condition };
//# sourceMappingURL=conditon.d.ts.map
