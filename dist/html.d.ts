import { VaildVDom } from "./conditon";
import Virtualdom from "./VirtualElement";
export declare function isvalidvdom(v: any): v is VaildVDom;
export default function (strings?: TemplateStringsArray, ...values: any[]): Virtualdom<any>;
