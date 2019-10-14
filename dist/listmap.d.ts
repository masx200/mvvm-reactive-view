import { VaildVDom } from "./conditon";
import { Htmlelementconstructor } from "./createComponent";
import Virtualdom from "./VirtualElement";
export { listmap };
declare function listmap(list: any[] | Set<any>, mapfun: (value: any, index: number) => VaildVDom): Virtualdom<Htmlelementconstructor>;
