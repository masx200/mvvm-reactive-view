import { VaildVDom } from "./conditon";
import Virtualdom from "./virtualdom";
export declare function isvalidvdom(v: any): v is VaildVDom;
declare function assertvalidvirtualdom(...args: any[]): Virtualdom<any>;
export default assertvalidvirtualdom;
