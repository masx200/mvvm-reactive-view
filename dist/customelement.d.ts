import { Class } from "./customclass";
export declare function isclassextendsHTMLElement(initclass: {
    prototype: any;
}): initclass is Class;
export declare function createcostumelemet(initclass: Class | Function, propsjson?: object, children?: any[]): HTMLElement;
