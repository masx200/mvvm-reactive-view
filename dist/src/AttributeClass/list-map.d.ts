import Virtualdom from "../CreateElement/VirtualElement";
import ReactiveState from "../Reactivity/ReactiveState";
import { Htmlelementconstructor } from "./createComponent";
export { ListMap };
export default ListMap;
declare function ListMap(list: any[] | Set<any> | ReactiveState<any[] | Set<any>>, mapfun: (value: ReactiveState<any>, index: number) => Virtualdom<any>): Virtualdom<Htmlelementconstructor>;
