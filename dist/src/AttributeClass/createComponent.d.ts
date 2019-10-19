export declare const innerwatchrecords: unique symbol;
export declare const innerstatesymbol: unique symbol;
import { Custom } from "../CustomClass/customclass";
export declare const attributessymbol: unique symbol;
export interface Htmlelementconstructor {
    new (): HTMLElement;
    prototype: HTMLElement;
    defaultProps?: Record<string, any>;
    css?: string;
}
import createcomponent from "./createComponent";
export { createcomponent as createComponent };
declare const _default: (custfun: Htmlelementconstructor | Custom) => Htmlelementconstructor;
export default _default;
export declare function autocreateclass(custfun: Custom | Htmlelementconstructor): Htmlelementconstructor;
