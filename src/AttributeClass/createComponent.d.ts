import { Custom } from "../CustomClass/customclass";
export declare const innerwatchrecords: unique symbol;
export declare const innerstatesymbol: unique symbol;
export declare const attributessymbol: unique symbol;
export interface Htmlelementconstructor {
    new (): HTMLElement;
    prototype: HTMLElement;
    defaultProps?: Record<string, any>;
    css?: string;
}
declare const createComponent: (
    custfun: Custom,
    options?:
        | {
              defaultProps?: Record<string, any> | undefined;
              css?: string | undefined;
          }
        | undefined
) => Htmlelementconstructor;
export default createComponent;
export declare function autocreateclass(
    custfun: Custom | Htmlelementconstructor,
    options?: {
        defaultProps?: Record<string, any>;
        css?: string;
    }
): Htmlelementconstructor;
export { createComponent };
//# sourceMappingURL=createComponent.d.ts.map
