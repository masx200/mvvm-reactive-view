import { VaildVDom } from "./conditon";
import { Htmlelementconstructor } from "./createComponent";
import ReactiveState from "./reactivestate";
import Virtualdom from "./VirtualElement";
export { listmap };
declare function listmap(list: any[] | Set<any> | ReactiveState<any[] | Set<any>>, mapfun: (value: ReactiveState<any>, index: number) => VaildVDom): Virtualdom<Htmlelementconstructor>;
