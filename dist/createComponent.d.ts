export declare const innerstatesymbol: unique symbol;
import { Custom } from "./customclass";
export interface Htmlelementconstructor {
    new (): HTMLElement;
}
export declare function createComponent(custfun: Custom): Htmlelementconstructor;
