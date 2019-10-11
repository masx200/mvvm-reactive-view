export declare function isCSSMediaRule(a: any): a is CSSMediaRule;
export declare function isCSSImportRule(a: any): a is CSSImportRule;
export declare function parsecsstext(text: string): Array<CSSRule>;
export declare function isCSSStyleRule(a: any): a is CSSStyleRule;
export declare function selectoraddprefix(cssstylerule: CSSStyleRule, prefix: string): CSSStyleRule;
export declare function prefixcssrules(cssRulesarray: Array<CSSRule>, prefix: string): Array<CSSRule>;
declare const componentsstylesheet: {
    [key: string]: Set<string>;
};
export { componentsstylesheet };
export declare function savestyleblob(tagname: string, csstext?: string, urltext?: string): void;
export declare function cssrulestocsstext(cssrules: Array<CSSRule>): string;
export declare function createlinkstylesheet(url: string): HTMLLinkElement;
export declare function transformcsstext(text: string, prefix: string): string;
export declare function registercssprefix(text: string, prefix: string): Promise<void>;
export declare function loadlinkstyle(stylelinkelement: HTMLElement, container: HTMLElement | Element | SVGSVGElement | SVGElement): Promise<void>;
export declare function waitloadallstyle(prefix: string, _this: Element | HTMLElement | SVGSVGElement | SVGElement): Promise<void>;
