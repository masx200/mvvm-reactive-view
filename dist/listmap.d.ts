import { VaildVDom } from "./conditon";
import { Htmlelementconstructor } from "./createComponent";
import Virtualdom from "./VirtualElement";
import ReactiveState from "./reactivestate";
export { listmap };
declare function listmap(list: any[] | Set<any>, mapfun: (value: ReactiveState<any>, index: number) => VaildVDom): Virtualdom<Htmlelementconstructor>;
