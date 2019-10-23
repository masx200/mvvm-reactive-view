export declare function parsecsstext(text: string): Array<CSSRule>;
declare const componentsstylesheet: Map<string, Set<string>>;
export { componentsstylesheet };
export declare function savestyleblob(tagname: string, csstext?: string, urltext?: string): void;
export declare function createlinkstylesheet(url: string): HTMLLinkElement;
export declare function registercssprefix(text: string, prefix: string): void;
export declare function loadlinkstyle(stylelinkelement: HTMLElement, container: HTMLElement | Element | SVGSVGElement | SVGElement): Promise<void>;
export declare function waitloadallstyle(prefix: string, containerthis: Element | HTMLElement | SVGSVGElement | SVGElement): Promise<void[]>;
