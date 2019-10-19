import { Htmlelementconstructor } from "./createComponent";
import ReactiveState from "../Reactivity/ReactiveState";
import Virtualdom from "../CreateElement/VirtualElement";
import { VaildVDom } from "src/CreateElement/isvalidvdom";
export { ListMap };
export default ListMap;
declare function ListMap(list: any[] | Set<any> | ReactiveState<any[] | Set<any>>, mapfun: (value: ReactiveState<any>, index: number) => VaildVDom): Virtualdom<Htmlelementconstructor>;
