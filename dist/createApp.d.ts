export declare const invalid_Virtualdom = "invalid Virtualdom ";
import { VaildVDom } from "./conditon";
export default function MountElement<T extends Element>(vdom: VaildVDom | Node | Element | Array<Node | Element>, container: T): T;
export declare function isNodeArray(array: any[]): array is Node[];
export declare function isNode(a: any): a is Node;
