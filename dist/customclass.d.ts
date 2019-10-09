import { VaildVDom } from "./conditon";
export interface Class extends HTMLElement {
    new (...args: any[]): HTMLElement;
    prototype: HTMLElement;
    defaultProps?: {
        [key: string]: any;
    };
    css?: string;
}
export interface Custom {
    (props?: object, children?: Array<any>): VaildVDom;
    defaultProps?: {
        [key: string]: any;
    };
    css?: string;
}
