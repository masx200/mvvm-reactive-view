export declare const invalid_Virtualdom = "invalid Virtualdom ";
import { VaildVDom } from "../CreateElement/isvalidvdom";
export default function MountElement<T extends Element>(vdom: VaildVDom | Node | Element | Array<Node | Element>, container: T): T;
