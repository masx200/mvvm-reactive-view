export declare const innerwatchrecords: unique symbol;
export declare const innerstatesymbol: unique symbol;
import { Custom } from "./customclass";
export declare const attributessymbol: unique symbol;
export interface Htmlelementconstructor {
    new (): HTMLElement;
    prototype: HTMLElement;
    defaultProps?: Record<string, any>;
    css?: string;
}
export declare function createComponent(custfun: Custom): Htmlelementconstructor;
export default createComponent;
