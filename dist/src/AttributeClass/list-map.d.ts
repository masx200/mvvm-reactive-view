import { VaildVDom } from "./conditon";
import { Htmlelementconstructor } from "./createComponent";
import ReactiveState from "../Reactivity/ReactiveState";
import Virtualdom from "../CreateElement/VirtualElement";
export { listmap as listMap };
declare function listmap(list: any[] | Set<any> | ReactiveState<any[] | Set<any>>, mapfun: (value: ReactiveState<any>, index: number) => VaildVDom): Virtualdom<Htmlelementconstructor>;
export default listmap;
